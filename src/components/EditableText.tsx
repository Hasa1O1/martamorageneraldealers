import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import { supabase } from '../lib/supabase';
import EditModal from './EditModal';
import { useAuth } from '../context/AuthContext';

interface EditableTextProps {
  page: string;
  section: string;
  defaultValue: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
}

export default function EditableText({ page, section, defaultValue, tag = 'p', className, style }: EditableTextProps) {
  const { isAdmin } = useAuth();
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchContent() {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('page', page)
        .eq('section', section)
        .maybeSingle();

      if (!error && data?.content) {
        setValue(data.content);
        setDraft(data.content);
      } else {
        setValue(defaultValue);
        setDraft(defaultValue);
      }
      setLoading(false);
    }

    fetchContent();
  }, [page, section, defaultValue]);

  async function saveContent() {
    const payload = {
      page,
      section,
      content: draft,
    };

    await supabase.from('site_content').upsert(payload, { onConflict: ['page', 'section'] });
    setValue(draft);
    setEditing(false);
  }

  const Tag = tag as any;

  return (
    <div className="relative" style={{ minWidth: 0 }}>
      <Tag className={className} style={style}>{value}</Tag>
      {isAdmin && (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="absolute top-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition hover:bg-white"
          aria-label={`Edit ${section}`}
        >
          <Pencil className="h-5 w-5" />
        </button>
      )}

      <EditModal
        open={editing}
        title={`Edit ${section.replace(/_/g, ' ')}`}
        onClose={() => {
          setEditing(false);
          setDraft(value);
        }}
        actions={
          <>
            <button
              type="button"
              onClick={() => {
                setDraft(value);
                setEditing(false);
              }}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveContent}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
            >
              Save
            </button>
          </>
        }
      >
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={8}
          className="w-full resize-none rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
          style={{ fontFamily: 'Calibri, sans-serif' }}
        />
      </EditModal>
    </div>
  );
}
