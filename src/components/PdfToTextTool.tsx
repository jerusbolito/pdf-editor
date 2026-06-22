import { useState, useRef } from 'react';
import { FileUp, Download, ArrowLeft, Loader2, Copy, Check } from 'lucide-react';
import { pdfToText, downloadText } from '../tools/pdfToText';
import { useSeo } from '../hooks/useSeo';

interface PdfToTextToolProps {
  onBack: () => void;
}

export function PdfToTextTool({ onBack }: PdfToTextToolProps) {
  useSeo({
    title: 'PDF to Text - Extract Text Online | MyPDFSigner',
    description: 'Extract text from PDFs online for free. Convert PDF pages to plain text in your browser without uploading to servers.',
  });

  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected || selected.type !== 'application/pdf') {
      e.target.value = '';
      return;
    }
    setFileName(selected.name);
    setError(null);
    setText('');
    setExtracting(true);
    try {
      const result = await pdfToText(selected);
      setText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract text');
    } finally {
      setExtracting(false);
    }
    e.target.value = '';
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!fileName) return;
    const baseName = fileName.replace(/\.pdf$/i, '');
    downloadText(text, `${baseName}.txt`);
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
          <h1 className="text-2xl font-bold text-gray-900">PDF to Text</h1>
          <p className="mt-2 text-gray-600">Extract text from any PDF and copy or download it as a plain text file.</p>

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
            <p className="mt-2 text-sm text-gray-500">Select a PDF to extract text</p>
          </div>

          {extracting && (
            <div className="mt-6 flex items-center gap-2 text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Extracting text...
            </div>
          )}
          {error && <p className="mt-4 text-red-500">{error}</p>}

          {text && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-gray-600">{text.length} characters extracted</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1 rounded bg-green-600 px-3 py-1.5 text-sm text-white hover:bg-green-700"
                  >
                    <Download className="h-4 w-4" />
                    Download .txt
                  </button>
                </div>
              </div>
              <textarea
                readOnly
                value={text}
                className="h-96 w-full rounded-lg border border-gray-200 bg-white p-4 font-mono text-sm text-gray-700"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
