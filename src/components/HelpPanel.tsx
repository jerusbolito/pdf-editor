import { X, MousePointerClick, PenLine, Download, Trash2, ZoomIn, ZoomOut, Undo2, Redo2, Move } from 'lucide-react';

interface HelpPanelProps {
  onClose: () => void;
}

export function HelpPanel({ onClose }: HelpPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">How to use the PDF Editor</h2>
          <button onClick={onClose} className="rounded p-2 text-gray-500 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <p>
            Edit your PDFs directly in your browser. Your files stay on your device — nothing is uploaded to our servers.
          </p>

          <section className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
              <MousePointerClick className="h-4 w-4 text-blue-600" /> Adding annotations
            </h3>
            <ul className="ml-6 list-disc space-y-1">
              <li>Click anywhere on the PDF page to open the annotation menu.</li>
              <li>Choose <strong>Text</strong>, <strong>Date</strong>, <strong>Checkbox</strong>, <strong>Image</strong>, or <strong>Signature</strong>.</li>
              <li>The annotation will be placed at the spot you clicked.</li>
            </ul>
          </section>

          <section className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
              <Move className="h-4 w-4 text-blue-600" /> Selecting, moving, and resizing
            </h3>
            <ul className="ml-6 list-disc space-y-1">
              <li>Click an annotation to select it and open its options.</li>
              <li>Drag the body of a selected annotation to move it.</li>
              <li>Drag the blue corner handles on images and signatures to resize them.</li>
            </ul>
          </section>

          <section className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
              <PenLine className="h-4 w-4 text-blue-600" /> Tools
            </h3>
            <ul className="ml-6 list-disc space-y-1">
              <li><strong>Text</strong> — add editable text anywhere.</li>
              <li><strong>Date</strong> — inserts today's date.</li>
              <li><strong>Checkbox</strong> — click it to toggle checked/unchecked.</li>
              <li><strong>Image</strong> — upload a PNG or JPG; then use <em>Transparent background</em> to remove white backing.</li>
              <li><strong>Signature</strong> — draw your signature with the mouse or touch.</li>
            </ul>
          </section>

          <section className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
              <ZoomIn className="h-4 w-4 text-blue-600" /> Toolbar & shortcuts
            </h3>
            <ul className="ml-6 list-disc space-y-1">
              <li><ZoomIn className="inline h-3 w-3" /> / <ZoomOut className="inline h-3 w-3" /> — zoom in or out.</li>
              <li><Undo2 className="inline h-3 w-3" /> / <Redo2 className="inline h-3 w-3" /> — undo and redo (also <strong>Ctrl+Z</strong> / <strong>Ctrl+Y</strong>).</li>
              <li><Trash2 className="inline h-3 w-3" /> — delete the selected annotation (also <strong>Delete</strong> key).</li>
              <li><Download className="inline h-3 w-3" /> — download the edited PDF.</li>
              <li><strong>Ctrl+O</strong> — open a PDF.</li>
            </ul>
          </section>

          <p className="text-xs text-gray-500">
            If you encounter any issues, try opening the app in an incognito window with browser extensions disabled.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
