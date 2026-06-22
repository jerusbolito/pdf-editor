import { useState, useRef } from 'react';
import { FileUp, Download, Trash2, Plus, GripVertical, ArrowLeft } from 'lucide-react';
import { imagesToPdf } from '../tools/imagesToPdf';
import { useSeo } from '../hooks/useSeo';

interface ImagesToPdfToolProps {
  onBack: () => void;
}

export function ImagesToPdfTool({ onBack }: ImagesToPdfToolProps) {
  useSeo({
    title: 'Images to PDF - Convert Images | MyPDFSigner',
    description: 'Free online images to PDF converter. Convert PNG, JPG images to PDF documents. No upload to servers, privacy-first. Works in your browser.',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'));
    setFiles(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    setFiles(prev => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setConverting(true);
    try {
      const pdf = await imagesToPdf(files);
      const blob = new Blob([pdf.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Convert failed:', err);
    } finally {
      setConverting(false);
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
          <h1 className="text-2xl font-bold text-gray-900">Images to PDF</h1>
          <p className="mt-2 text-gray-600">Convert images into a single PDF document.</p>

          <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleAddFiles}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Add Images
            </button>
            <p className="mt-2 text-sm text-gray-500">Select PNG or JPG images to convert</p>
          </div>

          {files.length > 0 && (
            <>
              <div className="mt-6 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
                  >
                    <button
                      onClick={() => moveFile(index, Math.max(0, index - 1))}
                      disabled={index === 0}
                      className="rounded p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                    <div className="flex-1 flex items-center gap-3">
                      <FileUp className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="rounded p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={handleConvert}
                  disabled={converting}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  <Download className="h-5 w-5" />
                  {converting ? 'Converting...' : 'Convert & Download'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
