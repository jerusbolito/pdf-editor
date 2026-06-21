import { Trash2, Image as ImageIcon } from 'lucide-react';

interface AnnotationPopupProps {
  x: number;
  y: number;
  onDelete: () => void;
  onClose: () => void;
  onMakeTransparent?: (() => void) | null;
}

export function AnnotationPopup({ x, y, onDelete, onClose, onMakeTransparent }: AnnotationPopupProps) {
  return (
    <>
      <div className="fixed inset-0 z-20" onPointerDown={onClose} />
      <div
        className="fixed z-30 flex flex-col gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
        style={{ left: x, top: y }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {onMakeTransparent && (
          <button
            onClick={onMakeTransparent}
            className="flex items-center gap-1 rounded px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
          >
            <ImageIcon className="h-4 w-4" />
            <span>Transparent background</span>
          </button>
        )}
        <button
          onClick={onDelete}
          className="flex items-center gap-1 rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
    </>
  );
}
