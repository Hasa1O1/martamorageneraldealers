import type { ReactNode } from 'react';

interface EditModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode;
}

export default function EditModal({ open, title, onClose, children, actions }: EditModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: 'Times New Roman, serif' }}>
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white p-2 text-gray-700 transition hover:bg-gray-100"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>
        {actions && (
          <div className="sticky bottom-0 z-10 flex flex-wrap gap-3 justify-end border-t border-gray-200 bg-gray-50 px-6 py-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
