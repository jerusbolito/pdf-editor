import { useState, useRef } from 'react';
import { FileUp, Download, ArrowLeft } from 'lucide-react';
import { compressPdf } from '../tools/pdfCompress';
import { useSeo } from '../hooks/useSeo';

interface PdfCompressToolProps {
  onBack: () => void;
}

export function PdfCompressTool({ onBack }: PdfCompressToolProps) {
  useSeo({
    title: 'PDF Compress - Reduce File Size | MyPDFSigner',
    description: 'Free online PDF compress tool. Reduce PDF file size while maintaining quality. No upload to servers, privacy-first. Works in your browser.',
  });
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [compressing, setCompressing] = useState(false);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressedSize(0);
    }
    e.target.value = '';
  };

  const handleCompress = async () => {
    if (!file) return;
    setCompressing(true);
    try {
      const compressed = await compressPdf(file);
      setCompressedSize(compressed.length);
      const blob = new Blob([compressed.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace('.pdf', '')}-compressed.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Compress failed:', err);
    } finally {
      setCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  const savings = originalSize > 0 && compressedSize > 0
    ? ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
    : '0';

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
          <h1 className="text-2xl font-bold text-gray-900">PDF Compress</h1>
          <p className="mt-2 text-gray-600">Reduce PDF file size while maintaining quality.</p>

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
              {file ? 'Change PDF' : 'Select PDF'}
            </button>
            {file && (
              <p className="mt-2 text-sm text-gray-500">{file.name} ({formatSize(originalSize)})</p>
            )}
          </div>

          {file && (
            <>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Compression Level</label>
                <div className="mt-2 flex gap-3">
                  {(['low', 'medium', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setQuality(level)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
                        quality === level
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  {quality === 'low' ? 'Maximum compression, lower quality' : quality === 'medium' ? 'Balanced compression and quality' : 'Minimum compression, higher quality'}
                </p>
              </div>

              {compressedSize > 0 && (
                <div className="mt-6 rounded-lg bg-green-50 p-4">
                  <p className="text-sm text-green-800">
                    Original: {formatSize(originalSize)} → Compressed: {formatSize(compressedSize)}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-green-700">
                    Saved {savings}%
                  </p>
                </div>
              )}

              <div className="mt-6">
                <button
                  onClick={handleCompress}
                  disabled={compressing}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  <Download className="h-5 w-5" />
                  {compressing ? 'Compressing...' : 'Compress & Download'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
