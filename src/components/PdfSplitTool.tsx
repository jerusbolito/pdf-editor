import { useState, useRef } from 'react';
import { FileUp, Download, Check, ArrowLeft } from 'lucide-react';
import { splitPdf } from '../tools/pdfSplit';
import { useSeo } from '../hooks/useSeo';

interface PdfSplitToolProps {
  onBack: () => void;
}

export function PdfSplitTool({ onBack }: PdfSplitToolProps) {
  useSeo({
    title: 'PDF Split - Extract Pages | MyPDFSigner',
    description: 'Free online PDF split tool. Extract pages from PDF files into separate documents. No upload to servers, privacy-first. Works in your browser.',
  });
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [splitting, setSplitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setSelectedPages(new Set());
      setPageCount(0);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const { PDFDocument } = await import('pdf-lib');
        const pdf = await PDFDocument.load(arrayBuffer);
        setPageCount(pdf.getPageCount());
      };
      reader.readAsArrayBuffer(selectedFile);
    }
    e.target.value = '';
  };

  const togglePage = (pageIndex: number) => {
    setSelectedPages(prev => {
      const next = new Set(prev);
      if (next.has(pageIndex)) {
        next.delete(pageIndex);
      } else {
        next.add(pageIndex);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i)));
  };

  const clearSelection = () => {
    setSelectedPages(new Set());
  };

  const handleSplit = async () => {
    if (!file || selectedPages.size === 0) return;
    setSplitting(true);
    try {
      const ranges = Array.from(selectedPages).map(p => [p]);
      const results = await splitPdf(file, ranges);
      for (const result of results) {
        const blob = new Blob([result.data.buffer as ArrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = result.filename;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Split failed:', err);
    } finally {
      setSplitting(false);
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
          <h1 className="text-2xl font-bold text-gray-900">PDF Split</h1>
          <p className="mt-2 text-gray-600">Extract pages from a PDF into separate files.</p>

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
              <p className="mt-2 text-sm text-gray-500">{file.name} ({pageCount} pages)</p>
            )}
          </div>

          {file && pageCount > 0 && (
            <>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={selectAll}
                    className="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearSelection}
                    className="rounded px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    Clear
                  </button>
                </div>
                <span className="text-sm text-gray-500">{selectedPages.size} selected</span>
              </div>

              <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
                {Array.from({ length: pageCount }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => togglePage(i)}
                    className={`relative aspect-square rounded-lg border-2 p-2 text-sm font-medium transition-colors ${
                      selectedPages.has(i)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {i + 1}
                    {selectedPages.has(i) && (
                      <Check className="absolute right-1 top-1 h-3 w-3 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>

              {selectedPages.size > 0 && (
                <div className="mt-6">
                  <button
                    onClick={handleSplit}
                    disabled={splitting}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    <Download className="h-5 w-5" />
                    {splitting ? 'Splitting...' : `Split & Download (${selectedPages.size} file${selectedPages.size > 1 ? 's' : ''})`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
