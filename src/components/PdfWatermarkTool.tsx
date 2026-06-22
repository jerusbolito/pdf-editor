import { useState, useRef } from 'react';
import { FileUp, Download, ArrowLeft, Type, Hash, Loader2 } from 'lucide-react';
import { addWatermarkAndPageNumbers } from '../tools/pdfWatermark';
import { useSeo } from '../hooks/useSeo';

interface PdfWatermarkToolProps {
  onBack: () => void;
}

export function PdfWatermarkTool({ onBack }: PdfWatermarkToolProps) {
  useSeo({
    title: 'Watermark PDF & Add Page Numbers Online | MyPDFSigner',
    description: 'Add text watermarks and page numbers to PDFs online for free. Works in your browser without uploading to servers.',
  });

  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkSize, setWatermarkSize] = useState(48);
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [watermarkRotation, setWatermarkRotation] = useState(-45);
  const [watermarkPages, setWatermarkPages] = useState<'all' | 'first' | 'last'>('all');
  const [pageNumbersEnabled, setPageNumbersEnabled] = useState(false);
  const [pageNumberStart, setPageNumberStart] = useState(1);
  const [pageNumberPosition, setPageNumberPosition] = useState<'bottom-center' | 'bottom-left' | 'bottom-right'>('bottom-center');
  const [pageNumberSize, setPageNumberSize] = useState(12);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setError(null);
    }
    e.target.value = '';
  };

  const handleDownload = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const result = await addWatermarkAndPageNumbers(
        file,
        {
          text: watermarkText,
          fontSize: watermarkSize,
          color: { r: 0.5, g: 0.5, b: 0.5 },
          opacity: watermarkOpacity,
          rotation: watermarkRotation,
          pages: watermarkPages,
        },
        {
          enabled: pageNumbersEnabled,
          startFrom: pageNumberStart,
          position: pageNumberPosition,
          fontSize: pageNumberSize,
          color: { r: 0, g: 0, b: 0 },
        },
      );
      const blob = new Blob([result.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, '-watermarked.pdf');
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add watermark');
    } finally {
      setProcessing(false);
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
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-bold text-gray-900">Watermark & Page Numbers</h1>
          <p className="mt-2 text-gray-600">Add text watermarks and page numbers to your PDF.</p>

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
            <p className="mt-2 text-sm text-gray-500">Select a PDF to watermark or add page numbers</p>
          </div>

          {file && (
            <div className="mt-6 space-y-6 rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <Type className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{file.name}</span>
              </div>

              <section>
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Type className="h-5 w-5" /> Watermark
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-gray-600">Text</label>
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Pages</label>
                    <select
                      value={watermarkPages}
                      onChange={(e) => setWatermarkPages(e.target.value as 'all' | 'first' | 'last')}
                      className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="all">All pages</option>
                      <option value="first">First page only</option>
                      <option value="last">Last page only</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Size ({watermarkSize}px)</label>
                    <input
                      type="range"
                      min={12}
                      max={120}
                      value={watermarkSize}
                      onChange={(e) => setWatermarkSize(Number(e.target.value))}
                      className="mt-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Opacity ({watermarkOpacity})</label>
                    <input
                      type="range"
                      min={0.1}
                      max={1}
                      step={0.1}
                      value={watermarkOpacity}
                      onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                      className="mt-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Rotation ({watermarkRotation}°)</label>
                    <input
                      type="range"
                      min={-90}
                      max={90}
                      value={watermarkRotation}
                      onChange={(e) => setWatermarkRotation(Number(e.target.value))}
                      className="mt-1 w-full"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Hash className="h-5 w-5" /> Page Numbers
                </h2>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pageNumbersEnabled}
                    onChange={(e) => setPageNumbersEnabled(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Add page numbers</span>
                </label>
                {pageNumbersEnabled && (
                  <div className="mt-3 grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="text-sm text-gray-600">Start from</label>
                      <input
                        type="number"
                        min={1}
                        value={pageNumberStart}
                        onChange={(e) => setPageNumberStart(Math.max(1, Number(e.target.value)))}
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Position</label>
                      <select
                        value={pageNumberPosition}
                        onChange={(e) => setPageNumberPosition(e.target.value as 'bottom-center' | 'bottom-left' | 'bottom-right')}
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      >
                        <option value="bottom-center">Bottom center</option>
                        <option value="bottom-left">Bottom left</option>
                        <option value="bottom-right">Bottom right</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Size ({pageNumberSize}px)</label>
                      <input
                        type="range"
                        min={8}
                        max={32}
                        value={pageNumberSize}
                        onChange={(e) => setPageNumberSize(Number(e.target.value))}
                        className="mt-1 w-full"
                      />
                    </div>
                  </div>
                )}
              </section>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                onClick={handleDownload}
                disabled={processing}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                {processing ? 'Processing...' : 'Download PDF'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
