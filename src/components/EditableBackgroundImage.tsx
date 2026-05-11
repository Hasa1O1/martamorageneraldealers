import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import EditModal from "./EditModal";
import ImageUploader from "./ImageUploader";

interface EditableBackgroundImageProps {
  page: string;
  section: string;
  adminMode?: boolean;
  currentValue: string;
}

export default function EditableBackgroundImage({
  page,
  section,
  adminMode = false,
  currentValue,
}: EditableBackgroundImageProps) {
  const { isAdmin } = useAuth();
  const showEditing = isAdmin && adminMode;
  const [open, setOpen] = useState(false);
  const [draftUrl, setDraftUrl] = useState(currentValue);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setDraftUrl(currentValue);
    }
  }, [currentValue, open]);

  async function saveBackground() {
    setError("");
    setSaving(true);

    try {
      const payload = {
        page,
        section,
        content: draftUrl.trim(),
      };

      const { error: upsertError } = await supabase
        .from("site_content")
        .upsert(payload, { onConflict: "page,section" });

      if (upsertError) {
        throw upsertError;
      }

      setOpen(false);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save background image.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (!showEditing) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute right-6 top-6 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition hover:bg-white hover:scale-105"
        aria-label="Change background image"
        title="Change background image"
      >
        <Camera className="h-6 w-6" />
      </button>

      <EditModal
        open={open}
        title="Update Background Image"
        onClose={() => setOpen(false)}
        actions={
          <>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void saveBackground()}
              disabled={saving}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:bg-green-300"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              Image URL
            </label>
            <input
              value={draftUrl}
              onChange={(event) => setDraftUrl(event.target.value)}
              className="w-full rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              style={{ fontFamily: "Calibri, sans-serif" }}
            />
          </div>

          <ImageUploader value={draftUrl} onUpload={setDraftUrl} />

          {error && (
            <p
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              style={{ fontFamily: "Calibri, sans-serif" }}
            >
              {error}
            </p>
          )}
        </div>
      </EditModal>
    </>
  );
}
