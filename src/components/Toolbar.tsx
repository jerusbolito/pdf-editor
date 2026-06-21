import { Undo2, Redo2, Download, Trash2, ZoomIn, ZoomOut, FileUp, FileText, HelpCircle } from 'lucide-react';

interface ToolbarProps {
  fileName: string;
  pageCount: number;
  onUpload: () => void;
  onDownload: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onDelete: () => void;
  onShowHelp: () => void;
  canUndo: boolean;
  canRedo: boolean;
  hasSelection: boolean;
  scale: number;
  onScaleChange: (scale: number) => void;
}

export function Toolbar({
  fileName,
  pageCount,
  onUpload,
  onDownload,
  onUndo,
  onRedo,
  onDelete,
  onShowHelp,
  canUndo,
  canRedo,
  hasSelection,
  scale,
  onScaleChange,
}: ToolbarProps) {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onUpload}
          className="flex items-center gap-1.5 rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          title="Open PDF (Ctrl+O)"
        >
          <FileUp className="h-4 w-4" />
          <span className="hidden sm:inline">Open PDF</span>
        </button>
        {fileName && (
          <div className="hidden items-center gap-2 text-sm text-gray-600 md:flex">
            <FileText className="h-4 w-4" />
            <span className="max-w-[200px] truncate font-medium">{fileName}</span>
            <span className="text-gray-400">{pageCount} page{pageCount !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onScaleChange(Math.max(0.5, scale - 0.25))}
          className="rounded p-2 text-gray-600 hover:bg-gray-100"
          title="Zoom out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <span className="w-12 text-center text-sm font-medium text-gray-700">{Math.round(scale * 100)}%</span>
        <button
          onClick={() => onScaleChange(Math.min(3, scale + 0.25))}
          className="rounded p-2 text-gray-600 hover:bg-gray-100"
          title="Zoom in"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <div className="mx-1 h-6 w-px bg-gray-200" />
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="rounded p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="h-4 w-4" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="rounded p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          disabled={!hasSelection}
          className="rounded p-2 text-red-600 hover:bg-red-50 disabled:opacity-40"
          title="Delete selected (Delete)"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button
          onClick={onShowHelp}
          className="rounded p-2 text-gray-600 hover:bg-gray-100"
          title="Help"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
        <div className="mx-1 h-6 w-px bg-gray-200" />
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 rounded bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
          title="Download signed PDF"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download</span>
        </button>
      </div>
    </div>
  );
}
