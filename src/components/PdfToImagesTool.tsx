import { useState, useRef } from 'react';
import { FileUp, Download, ArrowLeft, Image as ImageIcon, Loader2 } from 'lucide-react';
import { pdfToImages, downloadImage, type ImageFormat } from '../tools/pdfToImages';
import { useSeo } from '../hooks/useSeo';

interface PdfToImagesToolProps {
  onBack: () => void;
}

export function PdfToImagesTool({ onBack }: PdfToImagesToolProps) {
  useSeo({
    title: 'PDF to Images - Convert PDF Pages to JPG/PNG | MyPDFSigner',
    description: 'Convert PDF pages to high-quality JPG or PNG images in your browser. No upload to servers, privacy-first.',
  });

  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<{ pageNumber: number; dataUrl: string; width: number; height: number }[]>([]);
  const [format, setFormat] = useState<ImageFormat>('png');
  const [scale, setScale] = useState(2);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
      setImages([]);
      setError(null);
    }
    e.target.value = '';
  };

  const handleConvert = async () => {
    if (!file) return;
    setConverting(true);
    setError(null);
    try {
      const results = await pdfToImages(file, format, scale);
      setImages(results.map((r) => ({ pageNumber: r.pageNumber, dataUrl: r.dataUrl, width: r.width, height: r.height })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert PDF');
    } finally {
      setConverting(false);
    }
  };

  const handleDownloadAll = async () => {
    if (!file || images.length === 0) return;
    const baseName = file.name.replace(/\.pdf$/i, '');
    for (const image of images) {
      const ext = format === 'jpeg' ? 'jpg' : format;
      downloadImage(
        { ...image, blob: await (await fetch(image.dataUrl)).blob() },
        `${baseName}-page-${image.pageNumber}.${ext}`,
      );
    }
  };

  const handleDownloadOne = async (image: { pageNumber: number; dataUrl: string; width: number; height: number }) => {
    if (!file) return;
    const baseName = file.name.replace(/\.pdf$/i, '');
    const ext = format === 'jpeg' ? 'jpg' : format;
    downloadImage(
      { ...image, blob: await (await fetch(image.dataUrl)).blob() },
      `${baseName}-page-${image.pageNumber}.${ext}`,
    );
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
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-900">PDF to Images</h1>
          <p className="mt-2 text-gray-600">Convert each PDF page into a JPG or PNG image.</p>

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
            <p className="mt-2 text-sm text-gray-500">Select a PDF to convert its pages to images</p>
          </div>

          {file && (
            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{file.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Format:</label>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value as ImageFormat)}
                    className="rounded border border-gray-300 px-2 py-1 text-sm"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Quality:</label>
                  <select
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="rounded border border-gray-300 px-2 py-1 text-sm"
                  >
                    <option value={1}>Standard (1x)</option>
                    <option value={2}>High (2x)</option>
                    <option value={3}>Ultra (3x)</option>
                  </select>
                </div>
                <button
                  onClick={handleConvert}
                  disabled={converting}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {converting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  {converting ? 'Converting...' : 'Convert to Images'}
                </button>
              </div>
            </div>
          )}

          {error && <p className="mt-4 text-red-500">{error}</p>}

          {images.length > 0 && (
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{images.length} page{images.length > 1 ? 's' : ''} converted</h2>
                <button
                  onClick={handleDownloadAll}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  Download All
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
                  <div key={image.pageNumber} className="rounded-lg border border-gray-200 bg-white p-3">
                    <img
                      src={image.dataUrl}
                      alt={`Page ${image.pageNumber}`}
                      className="mb-2 w-full rounded border border-gray-100"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Page {image.pageNumber}</span>
                      <button
                        onClick={() => handleDownloadOne(image)}
                        className="rounded p-1 text-gray-500 hover:text-blue-600"
                        title="Download this page"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
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
