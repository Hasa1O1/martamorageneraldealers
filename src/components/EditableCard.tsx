import { Edit3, Trash2 } from 'lucide-react';

interface EditableCardProps {
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

export default function EditableCard({ isAdmin, onEdit, onDelete, children }: EditableCardProps) {
  return (
    <div className="relative group">
      {children}
      {isAdmin && (onEdit || onDelete) && (
        <div className="absolute right-3 top-3 z-[999] flex gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-xl transition hover:shadow-2xl hover:scale-110"
              aria-label="Edit card"
              title="Edit"
            >
              <Edit3 className="h-6 w-6" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow-xl transition hover:shadow-2xl hover:scale-110"
              aria-label="Delete card"
              title="Delete"
            >
              <Trash2 className="h-6 w-6" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
