import { useState, useRef, useEffect } from 'react';
import { FileUp, Download, ArrowLeft, RotateCw, Trash2, GripVertical, Loader2, Check } from 'lucide-react';
import { usePdfDocument } from '../hooks/usePdfDocument';
import { organizePdf, rotatePage, type Rotation } from '../tools/pdfOrganize';
import { useSeo } from '../hooks/useSeo';

interface PdfOrganizeToolProps {
  onBack: () => void;
}

interface PageState {
  id: number;
  rotation: Rotation;
  deleted: boolean;
  thumbnail: string | null;
}

export function PdfOrganizeTool({ onBack }: PdfOrganizeToolProps) {
  useSeo({
    title: 'Organize PDF Pages - Rotate, Reorder, Delete | MyPDFSigner',
    description: 'Rotate, reorder, and delete PDF pages online for free. Organize your PDF in your browser without uploading to servers.',
  });

  const { pages, infos, fileName, loading, error, loadFile } = usePdfDocument();
  const [pageStates, setPageStates] = useState<PageState[]>([]);
  const [organizing, setOrganizing] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pages.length === 0) {
      // Reset page state when the PDF is unloaded.
      setPageStates([]); // eslint-disable-line react-hooks/set-state-in-effect
      return;
    }
    // Reset page state when a new PDF is loaded (pages.length changed).
    setPageStates((prev) => {
      if (prev.length === pages.length) return prev;
      return pages.map((_, i) => ({ id: i, rotation: 0, deleted: false, thumbnail: null }));
    });
  }, [pages]);

  useEffect(() => {
    if (pages.length === 0) return;
    let cancelled = false;
    const renderThumbnails = async () => {
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        await page.render({ canvasContext: ctx, viewport, canvas }).promise;
        if (cancelled) return;
        const dataUrl = canvas.toDataURL('image/png');
        setPageStates((prev) => prev.map((s, idx) => (idx === i ? { ...s, thumbnail: dataUrl } : s)));
      }
    };
    renderThumbnails();
    return () => {
      cancelled = true;
    };
  }, [pages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      loadFile(selected);
      setPageStates([]);
    }
    e.target.value = '';
  };

  const handleRotate = (index: number) => {
    setPageStates((prev) => prev.map((s, i) => (i === index ? { ...s, rotation: rotatePage(s.rotation) } : s)));
  };

  const handleDelete = (index: number) => {
    setPageStates((prev) => prev.map((s, i) => (i === index ? { ...s, deleted: !s.deleted } : s)));
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    setPageStates((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setDragIndex(null);
  };

  const handleDownload = async () => {
    if (!fileName || pages.length === 0) return;
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    setOrganizing(true);
    try {
      const operations = pageStates.map((s) => ({ index: s.id, rotation: s.rotation, deleted: s.deleted }));
      const result = await organizePdf(file, operations);
      const blob = new Blob([result.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.replace(/\.pdf$/i, '-organized.pdf');
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Organize failed:', err);
    } finally {
      setOrganizing(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </button>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-gray-900">Organize PDF Pages</h1>
          <p className="mt-2 text-gray-600">Rotate, reorder, and delete pages before downloading.</p>

          <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <FileUp className="h-5 w-5" />
              Choose PDF
            </button>
            <p className="mt-2 text-sm text-gray-500">Select a PDF to rotate, reorder, or delete pages</p>
          </div>

          {loading && <p className="mt-4 text-gray-500">Loading PDF...</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}

          {pages.length > 0 && (
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {pageStates.filter((s) => !s.deleted).length} of {pages.length} pages selected
                </span>
                <button
                  onClick={handleDownload}
                  disabled={organizing || pageStates.every((s) => s.deleted)}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {organizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  {organizing ? 'Saving...' : 'Download PDF'}
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pageStates.map((state, index) => (
                  <div
                    key={state.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    className={`relative rounded-lg border bg-white p-3 shadow-sm ${state.deleted ? 'border-red-200 opacity-50' : 'border-gray-200'}`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
                        <GripVertical className="h-4 w-4 cursor-grab text-gray-400" />
                        Page {index + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleRotate(index)}
                          className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                          title="Rotate"
                        >
                          <RotateCw className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className={`rounded p-1 ${state.deleted ? 'text-green-600 hover:bg-green-50' : 'text-red-500 hover:bg-red-50'}`}
                          title={state.deleted ? 'Restore' : 'Delete'}
                        >
                          {state.deleted ? <Check className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div
                      className="relative overflow-hidden rounded border border-gray-100 bg-gray-50"
                      style={{
                        transform: `rotate(${state.rotation}deg)`,
                        transition: 'transform 0.2s',
                      }}
                    >
                      {state.thumbnail ? (
                        <img
                          src={state.thumbnail}
                          alt={`Page ${index + 1}`}
                          className="w-full"
                        />
                      ) : (
                        <div className="flex aspect-[3/4] items-center justify-center text-gray-400">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      )}
                    </div>
                    {infos[index] && (
                      <p className="mt-2 text-xs text-gray-500">
                        {Math.round(infos[index].width)} × {Math.round(infos[index].height)} pt
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
