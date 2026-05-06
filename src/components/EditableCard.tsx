import { Edit3, Trash2 } from 'lucide-react';

interface EditableCardProps {
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

export default function EditableCard({ isAdmin, onEdit, onDelete, children }: EditableCardProps) {
  return (
    <div className="relative">
      {children}
      {isAdmin && (onEdit || onDelete) && (
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition hover:bg-white"
              aria-label="Edit card"
            >
              <Edit3 className="h-5 w-5" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition hover:bg-white"
              aria-label="Delete card"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
