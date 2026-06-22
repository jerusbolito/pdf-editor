import { useState, useRef } from 'react';
import { FileUp, ArrowLeft, Lock, Unlock, Loader2 } from 'lucide-react';
import { unlockPdf } from '../tools/pdfPassword';
import { useSeo } from '../hooks/useSeo';

interface PdfPasswordToolProps {
  onBack: () => void;
}

export function PdfPasswordTool({ onBack }: PdfPasswordToolProps) {
  useSeo({
    title: 'Unlock PDF - Remove Password Online | MyPDFSigner',
    description: 'Remove PDF password restrictions online for free. Works in your browser without uploading to servers.',
  });

  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
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

  const handleUnlock = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    try {
      const result = await unlockPdf(file);
      const blob = new Blob([result.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, '-unlocked.pdf');
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unlock PDF');
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
          <h1 className="text-2xl font-bold text-gray-900">Unlock PDF</h1>
          <p className="mt-2 text-gray-600">Remove password restrictions from a PDF. If you know the password, enter it below. Otherwise leave it blank to try removing the owner password.</p>

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
            <p className="mt-2 text-sm text-gray-500">Select a password-protected PDF</p>
          </div>

          {file && (
            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-700">{file.name}</span>
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (optional)"
                  className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
                />
                <button
                  onClick={handleUnlock}
                  disabled={processing}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Unlock className="h-4 w-4" />}
                  {processing ? 'Unlocking...' : 'Unlock & Download'}
                </button>
              </div>
              {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
            </div>
          )}

          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
            <p className="flex items-center gap-2">
              <Unlock className="h-4 w-4" />
              <span><strong>Note:</strong> Full password protection (adding a password) is not yet available because the current PDF library does not support encryption. We will enable it as soon as the library adds support.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
