import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface ImageUploaderProps {
  value?: string;
  onUpload: (url: string) => void;
}

export default function ImageUploader({ value, onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(value ?? '');

  useEffect(() => {
    setPreview(value ?? '');
  }, [value]);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    setError('');
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    const cleanedName = file.name.replace(/\s+/g, '_');
    const filePath = `assets/${Date.now()}_${cleanedName}`;

    try {
      const { error: uploadError } = await supabase.storage.from('assets').upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('assets').getPublicUrl(filePath);
      if (!data?.publicUrl) {
        throw new Error('Unable to generate public URL for uploaded image.');
      }

      setPreview(data.publicUrl);
      onUpload(data.publicUrl);
    } catch (uploadError) {
      const message = uploadError instanceof Error ? uploadError.message : String(uploadError);
      setError(`Image upload failed: ${message}`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Calibri, sans-serif' }}>
        Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-full file:border-0 file:bg-green-500 file:px-4 file:py-2 file:text-white"
      />
      {uploading && (
        <p className="text-sm text-gray-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
          Uploading image...
        </p>
      )}
      {preview && (
        <div className="rounded-3xl overflow-hidden border border-gray-200">
          <img src={preview} alt="Uploaded preview" className="h-48 w-full object-cover" />
        </div>
      )}
      {error && (
        <p className="text-sm text-red-600" style={{ fontFamily: 'Calibri, sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  );
}
