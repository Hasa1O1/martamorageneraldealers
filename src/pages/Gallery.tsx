import { useEffect, useState } from "react";
import { publicSupabase, supabase } from "../lib/supabase";
import { Image as ImageIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import EditableCard from "../components/EditableCard";
import EditModal from "../components/EditModal";
import AddCardForm from "../components/AddCardForm";
import ImageUploader from "../components/ImageUploader";
import EditableBackgroundImage from "../components/EditableBackgroundImage";
import { useSiteContentField } from "../hooks/useSiteContentField";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  display_order?: number;
}

interface GalleryProps {
  adminMode?: boolean;
}

export default function Gallery({ adminMode = false }: GalleryProps) {
  const { isAdmin } = useAuth();
  const showAdminControls = isAdmin && adminMode;
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [draftItem, setDraftItem] = useState({
    title: "",
    description: "",
    category: "",
    image_url: "",
  });
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const heroBackgroundImage = useSiteContentField(
    "gallery",
    "gallery_hero_bg",
    "https://images.pexels.com/photos/4021521/pexels-photo-4021521.jpeg?auto=compress&cs=tinysrgb&w=1920",
  );

  useEffect(() => {
    fetchGalleryItems();

    const channel = publicSupabase
      .channel("gallery-items-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "gallery_items" },
        () => {
          fetchGalleryItems();
        },
      );

    void channel.subscribe();

    return () => {
      void publicSupabase.removeChannel(channel);
    };
  }, []);

  async function fetchGalleryItems() {
    try {
      const { data, error } = await publicSupabase
        .from("gallery_items")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  }

  function openGalleryModal(item: GalleryItem) {
    setEditingItem(item);
    setDraftItem({
      title: item.title,
      description: item.description,
      category: item.category,
      image_url: item.image_url,
    });
    setIsEditOpen(true);
  }

  async function saveGalleryItem() {
    if (!editingItem) return;

    try {
      setSaveError("");
      const updatedItem: GalleryItem = {
        ...editingItem,
        title: draftItem.title.trim(),
        description: draftItem.description.trim(),
        category: draftItem.category.trim() || "General",
        image_url: draftItem.image_url.trim(),
        display_order: editingItem.display_order || 0,
      };
      const { data: affectedRows, error } = await supabase.rpc("admin_update_gallery_item", {
        p_id: editingItem.id,
        p_title: updatedItem.title,
        p_description: updatedItem.description,
        p_category: updatedItem.category,
        p_image_url: updatedItem.image_url,
        p_display_order: updatedItem.display_order,
      });
      if (error) {
        throw error;
      }
      if (!affectedRows) {
        throw new Error("No gallery item was updated. Please refresh and confirm this gallery item still exists.");
      }
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === editingItem.id ? updatedItem : item,
        ),
      );
      await fetchGalleryItems();
      setIsEditOpen(false);
      setEditingItem(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown save error.";
      setSaveError(message);
      console.error("Error saving gallery item:", error);
    }
  }

  async function confirmDeleteGalleryItem() {
    if (!pendingDeleteId) return;

    try {
      setDeleting(true);
      const { data: affectedRows, error } = await supabase.rpc("admin_delete_gallery_item", {
        p_id: pendingDeleteId,
      });
      if (error) {
        throw error;
      }
      if (!affectedRows) {
        throw new Error("No gallery item was deleted. Please refresh and confirm this gallery item still exists.");
      }
      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== pendingDeleteId),
      );
      await fetchGalleryItems();
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      window.alert(
        `Unable to delete gallery item. ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    } finally {
      setDeleting(false);
      setPendingDeleteId(null);
    }
  }

  const displayItems = items;
  const categories = [
    "All",
    ...Array.from(new Set(displayItems.map((i) => i.category))),
  ];
  const filteredItems =
    selectedCategory === "All"
      ? displayItems
      : displayItems.filter((i) => i.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBackgroundImage})`,
        }}
      >
        <EditableBackgroundImage
          page="gallery"
          section="gallery_hero_bg"
          adminMode={adminMode}
          currentValue={heroBackgroundImage}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-green-900/80"></div>
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Our Gallery
          </h1>
          <p
            className="text-xl text-gray-100"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            Explore Our Products and Process
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
                style={{ fontFamily: "Calibri, sans-serif" }}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p
                className="mt-4 text-gray-600"
                style={{ fontFamily: "Calibri, sans-serif" }}
              >
                Loading gallery...
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p
                className="text-xl text-gray-600"
                style={{ fontFamily: "Calibri, sans-serif" }}
              >
                No gallery items found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => {
                const card = (
                  <div className="group relative overflow-visible rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="mb-2">
                          <span
                            className="inline-block px-3 py-1 bg-green-500 rounded-full text-xs font-medium"
                            style={{ fontFamily: "Calibri, sans-serif" }}
                          >
                            {item.category}
                          </span>
                        </div>
                        <h3
                          className="text-xl font-bold mb-2"
                          style={{ fontFamily: "Times New Roman, serif" }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-sm text-gray-200"
                          style={{ fontFamily: "Calibri, sans-serif" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );

                return showAdminControls ? (
                  <EditableCard
                    key={item.id}
                    isAdmin={isAdmin}
                    onEdit={() => openGalleryModal(item)}
                    onDelete={() => setPendingDeleteId(item.id)}
                  >
                    {card}
                  </EditableCard>
                ) : (
                  <div key={item.id}>{card}</div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {showAdminControls && (
        <AddCardForm mode="gallery_items" onSaved={fetchGalleryItems} />
      )}

      <EditModal
        open={isEditOpen}
        title="Edit Gallery Item"
        onClose={() => {
          setIsEditOpen(false);
          setSaveError("");
        }}
        actions={
          <>
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveGalleryItem}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
            >
              Save
            </button>
          </>
        }
      >
        <div className="space-y-5">
          {saveError && (
            <p
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              {saveError}
            </p>
          )}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Title
            </label>
            <input
              value={draftItem.title}
              onChange={(e) =>
                setDraftItem((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              style={{ fontFamily: "Calibri, sans-serif" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Description
            </label>
            <textarea
              value={draftItem.description}
              onChange={(e) =>
                setDraftItem((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="w-full resize-none rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              style={{ fontFamily: "Calibri, sans-serif" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Category
            </label>
            <input
              value={draftItem.category}
              onChange={(e) =>
                setDraftItem((prev) => ({ ...prev, category: e.target.value }))
              }
              className="w-full rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              style={{ fontFamily: "Calibri, sans-serif" }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Image URL
            </label>
            <input
              value={draftItem.image_url}
              onChange={(e) =>
                setDraftItem((prev) => ({ ...prev, image_url: e.target.value }))
              }
              className="w-full rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              style={{ fontFamily: "Calibri, sans-serif" }}
            />
            <div className="mt-4">
              <ImageUploader
                value={draftItem.image_url}
                onUpload={(url) =>
                  setDraftItem((prev) => ({ ...prev, image_url: url }))
                }
              />
            </div>
          </div>
        </div>
      </EditModal>

      <EditModal
        open={pendingDeleteId !== null}
        title="Delete gallery item?"
        onClose={() => setPendingDeleteId(null)}
        actions={
          <>
            <button
              type="button"
              onClick={() => setPendingDeleteId(null)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void confirmDeleteGalleryItem()}
              disabled={deleting}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:bg-red-300"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </>
        }
      >
        <p
          className="text-gray-600"
          style={{ fontFamily: "Calibri, sans-serif", lineHeight: "1.5" }}
        >
          This will permanently remove this image from the gallery. This action cannot
          be undone.
        </p>
      </EditModal>
    </div>
  );
}
