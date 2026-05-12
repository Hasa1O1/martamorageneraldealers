import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import EditModal from './EditModal';
import ImageUploader from './ImageUploader';

type Mode = 'products' | 'gallery_items' | 'home_features';

interface AddCardFormProps {
  mode: Mode;
  onSaved: () => void | Promise<void>;
}

export default function AddCardForm({ mode, onSaved }: AddCardFormProps) {
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [features, setFeatures] = useState('');
  const [error, setError] = useState('');

  if (!isAdmin) {
    return null;
  }

  const modeLabel = mode === 'products' ? 'Product' : mode === 'gallery_items' ? 'Gallery Item' : 'Feature Card';
  const showImageUpload = mode !== 'home_features';
  const nameLabel = mode === 'products' ? 'Product Name' : mode === 'gallery_items' ? 'Gallery Title' : 'Card Title';
  const sectionPlaceholder = mode === 'products' ? 'Supplements' : mode === 'gallery_items' ? 'Products' : 'Features';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (!name.trim()) {
        setError('Title is required.');
        return;
      }

      if (mode === 'home_features') {
        const section = `home_feature_${crypto.randomUUID()}`;
        const { error: insertError } = await supabase.from('site_content').insert({
          page: 'home',
          section,
          content: JSON.stringify({ title: name.trim(), description: description.trim() }),
        });
        if (insertError) {
          throw insertError;
        }
      } else if (mode === 'products') {
        const { error: insertError } = await supabase
          .from('products')
          .insert({
            name: name.trim(),
            description: description.trim(),
            category: category.trim() || 'General',
            image_url: imageUrl.trim(),
            features: features.split('\n').map((item) => item.trim()).filter(Boolean),
            is_featured: false,
            display_order: 0,
          });

        if (insertError) {
          throw insertError;
        }
      } else {
        const { error: insertError } = await supabase
          .from('gallery_items')
          .insert({
            title: name.trim(),
            description: description.trim(),
            category: category.trim() || 'General',
            image_url: imageUrl.trim(),
            display_order: 0,
          });

        if (insertError) {
          throw insertError;
        }
      }

      setName('');
      setDescription('');
      setCategory('');
      setImageUrl('');
      setFeatures('');
      setOpen(false);
      await onSaved();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : 'Unable to save. Please check your connection and try again.';
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-40 inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-2xl transition hover:bg-green-600"
        style={{ fontFamily: 'Calibri, sans-serif' }}
      >
        <Plus className="h-5 w-5" />
        Add {modeLabel}
      </button>

      <EditModal
        open={open}
        title={`Add ${modeLabel}`}
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
              onClick={() => formRef.current?.requestSubmit()}
              disabled={saving}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:bg-green-300"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </>
        }
      >
        <form ref={formRef} id="add-card-form" onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Calibri, sans-serif' }}>
              {nameLabel}
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              style={{ fontFamily: 'Calibri, sans-serif' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Calibri, sans-serif' }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="w-full resize-none rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              style={{ fontFamily: 'Calibri, sans-serif' }}
            />
          </div>

          {showImageUpload && (
            <div>
              <ImageUploader value={imageUrl} onUpload={setImageUrl} />
              <p className="mt-2 text-sm text-gray-500" style={{ fontFamily: 'Calibri, sans-serif' }}>
                You can upload a file or enter a direct image URL manually.
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Calibri, sans-serif' }}>
              Category
            </label>
            <input
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder={sectionPlaceholder}
              className="w-full rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
              style={{ fontFamily: 'Calibri, sans-serif' }}
            />
          </div>

          {mode === 'products' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Calibri, sans-serif' }}>
                Features (one per line)
              </label>
              <textarea
                value={features}
                onChange={(event) => setFeatures(event.target.value)}
                rows={3}
                className="w-full resize-none rounded-3xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                style={{ fontFamily: 'Calibri, sans-serif' }}
              />
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
              {error}
            </p>
          )}
        </form>
      </EditModal>
    </>
  );
}
