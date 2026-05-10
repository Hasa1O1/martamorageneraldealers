import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Leaf, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import EditableCard from "../components/EditableCard";
import EditModal from "../components/EditModal";
import AddCardForm from "../components/AddCardForm";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image_url: string;
  features: string[];
  is_featured: boolean;
  display_order?: number;
}

interface ProductsProps {
  adminMode?: boolean;
}

export default function Products({ adminMode = false }: ProductsProps) {
  const { isAdmin } = useAuth();
  const showAdminControls = isAdmin && adminMode;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [draftProduct, setDraftProduct] = useState({
    name: "",
    description: "",
    category: "",
    image_url: "",
    features: "",
  });

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          fetchProducts();
        },
      );

    void channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  function openProductModal(product: Product) {
    setEditingProduct(product);
    setDraftProduct({
      name: product.name,
      description: product.description,
      category: product.category,
      image_url: product.image_url,
      features: product.features?.join("\n") || "",
    });
    setIsEditOpen(true);
  }

  async function saveProduct() {
    if (!editingProduct) return;

    try {
      await supabase.from("products").upsert(
        {
          id: editingProduct.id,
          name: draftProduct.name.trim(),
          description: draftProduct.description.trim(),
          category: draftProduct.category.trim() || "General",
          image_url: draftProduct.image_url.trim(),
          features: draftProduct.features
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
          display_order: editingProduct.display_order || 0,
        },
        { onConflict: "id" },
      );
      await fetchProducts();
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;

    try {
      await supabase.from("products").delete().eq("id", id);
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const sampleProducts = [
    {
      id: "1",
      name: "Herbal Tea Blend",
      category: "Teas",
      description:
        "A soothing blend of premium herbs for relaxation and wellness.",
      image_url:
        "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["100% Natural", "No Additives", "Traditional Recipe"],
      is_featured: true,
      display_order: 0,
    },
    {
      id: "2",
      name: "Herbal Supplements",
      category: "Supplements",
      description:
        "Premium quality herbal supplements for daily wellness support.",
      image_url:
        "https://images.pexels.com/photos/4021763/pexels-photo-4021763.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Lab Tested", "Pure Ingredients", "Effective Formula"],
      is_featured: true,
      display_order: 0,
    },
    {
      id: "3",
      name: "Essential Oils",
      category: "Oils",
      description:
        "Pure essential oils extracted from the finest botanical sources.",
      image_url:
        "https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Cold Pressed", "Organic", "Therapeutic Grade"],
      is_featured: true,
      display_order: 0,
    },
    {
      id: "4",
      name: "Herbal Powders",
      category: "Powders",
      description:
        "Finely ground herbal powders for versatile wellness applications.",
      image_url:
        "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=800",
      features: ["Fresh Ground", "No Fillers", "High Potency"],
      is_featured: false,
      display_order: 0,
    },
  ];

  const displayProducts =
    products.length > 0 ? filteredProducts : sampleProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-80 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1920)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/80"></div>
        <div className="relative z-10 text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            Our Products
          </h1>
          <p
            className="text-xl text-gray-100"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            Premium Herbal Products for Natural Wellness
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
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-green-50"
                }`}
                style={{ fontFamily: "Calibri, sans-serif" }}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
              <p
                className="mt-4 text-gray-600"
                style={{ fontFamily: "Calibri, sans-serif" }}
              >
                Loading products...
              </p>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p
                className="text-xl text-gray-600"
                style={{ fontFamily: "Calibri, sans-serif" }}
              >
                No products found in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((product) => {
                const card = (
                  <div className="bg-white rounded-xl shadow-lg overflow-visible hover:shadow-2xl transition-all transform hover:-translate-y-2 flex flex-col h-full">
                    <div className="h-64 w-full overflow-hidden flex-shrink-0">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span
                          className="text-sm text-green-600 font-medium truncate"
                          style={{ fontFamily: "Calibri, sans-serif" }}
                          title={product.category}
                        >
                          {product.category.length > 20
                            ? `${product.category.substring(0, 20)}...`
                            : product.category}
                        </span>
                      </div>
                      <h3
                        className="text-lg font-bold mb-2 line-clamp-2"
                        style={{
                          fontFamily: "Times New Roman, serif",
                          color: "#754C29",
                        }}
                        title={product.name}
                      >
                        {product.name.length > 40
                          ? `${product.name.substring(0, 40)}...`
                          : product.name}
                      </h3>
                      <p
                        className="text-gray-600 mb-3 text-sm line-clamp-3 flex-grow"
                        style={{
                          fontFamily: "Calibri, sans-serif",
                          lineHeight: "1.4",
                        }}
                        title={product.description}
                      >
                        {product.description.length > 100
                          ? `${product.description.substring(0, 100)}...`
                          : product.description}
                      </p>
                      {product.features && product.features.length > 0 && (
                        <div className="space-y-1 mb-3">
                          {product.features.slice(0, 2).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                              <span
                                className="text-xs text-gray-600 truncate"
                                style={{ fontFamily: "Calibri, sans-serif" }}
                                title={feature}
                              >
                                {feature.length > 45
                                  ? `${feature.substring(0, 45)}...`
                                  : feature}
                              </span>
                            </div>
                          ))}
                          {product.features.length > 2 && (
                            <p
                              className="text-xs text-gray-500"
                              style={{ fontFamily: "Calibri, sans-serif" }}
                            >
                              +{product.features.length - 2} more
                            </p>
                          )}
                        </div>
                      )}
                      {product.features && product.features.length > 0 && (
                        <button
                          onClick={() => {
                            setDetailsProduct(product);
                            setIsDetailsOpen(true);
                          }}
                          className="text-xs font-semibold text-green-600 hover:text-green-700 transition self-start"
                          style={{ fontFamily: "Calibri, sans-serif" }}
                        >
                          Read More →
                        </button>
                      )}
                    </div>
                  </div>
                );

                return showAdminControls ? (
                  <EditableCard
                    key={product.id}
                    isAdmin={isAdmin}
                    onEdit={() => openProductModal(product)}
                    onDelete={() => deleteProduct(product.id)}
                  >
                    {card}
                  </EditableCard>
                ) : (
                  <div key={product.id}>{card}</div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ fontFamily: "Times New Roman, serif", color: "#754C29" }}
          >
            Interested in Our Products?
          </h2>
          <p
            className="text-lg text-gray-600 mb-8"
            style={{ fontFamily: "Calibri, sans-serif", lineHeight: "1.5" }}
          >
            Contact us to learn more about our premium herbal products and how
            they can support your wellness journey.
          </p>
          <button
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            style={{ fontFamily: "Calibri, sans-serif" }}
          >
            Get in Touch
          </button>
        </div>
      </section>

      {showAdminControls && (
        <AddCardForm mode="products" onSaved={fetchProducts} />
      )}

      <EditModal
        open={isEditOpen}
        title="Edit Product"
        onClose={() => setIsEditOpen(false)}
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
              onClick={saveProduct}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
            >
              Save
            </button>
          </>
        }
      >
        <div className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Product Name
            </label>
            <input
              value={draftProduct.name}
              onChange={(e) =>
                setDraftProduct((prev) => ({ ...prev, name: e.target.value }))
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
              value={draftProduct.description}
              onChange={(e) =>
                setDraftProduct((prev) => ({
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
              value={draftProduct.category}
              onChange={(e) =>
                setDraftProduct((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
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
              value={draftProduct.image_url}
              onChange={(e) =>
                setDraftProduct((prev) => ({
                  ...prev,
                  image_url: e.target.value,
                }))
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
              Features (one line each)
            </label>
            <textarea
              value={draftProduct.features}
              onChange={(e) =>
                setDraftProduct((prev) => ({
                  ...prev,
                  features: e.target.value,
                }))
              }
              rows={3}
              className="w-full resize-none rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              style={{ fontFamily: "Calibri, sans-serif" }}
            />
          </div>
        </div>
      </EditModal>

      {detailsProduct && isDetailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
              <h2
                className="text-xl font-semibold text-gray-900"
                style={{ fontFamily: "Times New Roman, serif" }}
              >
                {detailsProduct.name}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsDetailsOpen(false);
                  setDetailsProduct(null);
                }}
                className="rounded-full bg-white p-2 text-gray-700 transition hover:bg-gray-100"
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-5 overflow-y-auto flex-1 space-y-4">
              <div>
                <img
                  src={detailsProduct.image_url}
                  alt={detailsProduct.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <div>
                <h3
                  className="text-sm font-semibold text-gray-700 mb-1"
                  style={{ fontFamily: "Calibri, sans-serif" }}
                >
                  Category
                </h3>
                <p
                  className="text-gray-600"
                  style={{ fontFamily: "Calibri, sans-serif" }}
                >
                  {detailsProduct.category}
                </p>
              </div>
              <div>
                <h3
                  className="text-sm font-semibold text-gray-700 mb-1"
                  style={{ fontFamily: "Calibri, sans-serif" }}
                >
                  Description
                </h3>
                <p
                  className="text-gray-600"
                  style={{
                    fontFamily: "Calibri, sans-serif",
                    lineHeight: "1.5",
                  }}
                >
                  {detailsProduct.description}
                </p>
              </div>
              {detailsProduct.features &&
                detailsProduct.features.length > 0 && (
                  <div>
                    <h3
                      className="text-sm font-semibold text-gray-700 mb-3"
                      style={{ fontFamily: "Calibri, sans-serif" }}
                    >
                      Features
                    </h3>
                    <div className="space-y-2">
                      {detailsProduct.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                          <span
                            className="text-gray-600"
                            style={{ fontFamily: "Calibri, sans-serif" }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            <div className="sticky bottom-0 z-10 flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
              <button
                type="button"
                onClick={() => {
                  setIsDetailsOpen(false);
                  setDetailsProduct(null);
                }}
                className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
