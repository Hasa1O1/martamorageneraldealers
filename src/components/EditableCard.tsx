import { Edit3, Trash2 } from "lucide-react";

interface EditableCardProps {
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

export default function EditableCard({
  isAdmin,
  onEdit,
  onDelete,
  children,
}: EditableCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl">
      {children}
      {isAdmin && (onEdit || onDelete) && (
        <div className="absolute right-3 top-3 z-20 flex gap-2">
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition hover:scale-105 hover:bg-blue-600"
              aria-label="Edit card"
              title="Edit"
            >
              <Edit3 className="h-5 w-5" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:scale-105 hover:bg-red-600"
              aria-label="Delete card"
              title="Delete"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
