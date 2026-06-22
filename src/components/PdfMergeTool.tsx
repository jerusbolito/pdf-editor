import { useState, useRef } from 'react';
import { FileUp, Download, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { mergePdfs } from '../tools/pdfMerge';
import { useSeo } from '../hooks/useSeo';

interface PdfMergeToolProps {
  onBack: () => void;
}

export function PdfMergeTool({ onBack }: PdfMergeToolProps) {
  useSeo({
    title: 'PDF Merge - Combine Multiple PDFs | MyPDFSigner',
    description: 'Free online PDF merge tool. Combine multiple PDF files into a single document. No upload to servers, privacy-first. Works in your browser.',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []).filter(f => f.type === 'application/pdf');
    setFiles(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setMerging(true);
    try {
      const merged = await mergePdfs(files);
      const blob = new Blob([merged.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Merge failed:', err);
    } finally {
      setMerging(false);
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
          <h1 className="text-2xl font-bold text-gray-900">PDF Merge</h1>
          <p className="mt-2 text-gray-600">Combine multiple PDFs into a single document.</p>

          <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <input
              type="file"
              accept="application/pdf"
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
              Add PDFs
            </button>
            <p className="mt-2 text-sm text-gray-500">Select multiple PDF files to merge</p>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3"
                >
                  <div className="flex items-center gap-3">
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
          )}

          {files.length >= 2 && (
            <div className="mt-6">
              <button
                onClick={handleMerge}
                disabled={merging}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
              >
                <Download className="h-5 w-5" />
                {merging ? 'Merging...' : 'Merge & Download'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
