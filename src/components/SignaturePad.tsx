import { useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { getSavedSignatures, saveSignature, deleteSignature, type SavedSignature } from '../utils/signatures';

interface SignaturePadProps {
  onDone: (dataUrl: string) => void;
  onCancel: () => void;
}

export function SignaturePad({ onDone, onCancel }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [saved, setSaved] = useState<SavedSignature[]>(() => getSavedSignatures());
  const [saveName, setSaveName] = useState('');
  const [showSave, setShowSave] = useState(false);

  const getPoint = (e: React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const start = (e: React.PointerEvent) => {
    e.preventDefault();
    setDrawing(true);
    const ctx = canvasRef.current!.getContext('2d')!;
    const { x, y } = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const move = (e: React.PointerEvent) => {
    e.preventDefault();
    if (!drawing) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const { x, y } = getPoint(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const end = (e: React.PointerEvent) => {
    e.preventDefault();
    setDrawing(false);
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.closePath();
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const done = () => {
    const canvas = canvasRef.current!;
    const dataUrl = canvas.toDataURL('image/png');
    onDone(dataUrl);
  };

  const handleSave = () => {
    const canvas = canvasRef.current!;
    const dataUrl = canvas.toDataURL('image/png');
    const name = saveName.trim() || `Signature ${saved.length + 1}`;
    saveSignature(name, dataUrl);
    setSaved(getSavedSignatures());
    setSaveName('');
    setShowSave(false);
  };

  const handleDelete = (id: string) => {
    deleteSignature(id);
    setSaved(getSavedSignatures());
  };

  const handleSelect = (signature: SavedSignature) => {
    onDone(signature.dataUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <h3 className="mb-2 text-lg font-semibold">Draw signature</h3>
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          className="w-full touch-none rounded border border-gray-300"
          style={{ touchAction: 'none' }}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />
        <div className="mt-3 flex flex-wrap items-center justify-end gap-2">
          <button onClick={onCancel} className="rounded px-3 py-1 text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button onClick={clear} className="rounded px-3 py-1 text-gray-600 hover:bg-gray-100">
            Clear
          </button>
          <button onClick={done} className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
            Done
          </button>
          <button
            onClick={() => setShowSave(!showSave)}
            className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
          >
            Save
          </button>
        </div>

        {showSave && (
          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Signature name"
              className="flex-1 rounded border border-gray-300 px-3 py-1 text-sm"
            />
            <button onClick={handleSave} className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
              Save Signature
            </button>
          </div>
        )}

        {saved.length > 0 && (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium text-gray-700">Saved signatures</h4>
            <div className="flex flex-wrap gap-2">
              {saved.map((signature) => (
                <div
                  key={signature.id}
                  className="group relative flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm"
                >
                  <button
                    onClick={() => handleSelect(signature)}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={signature.dataUrl}
                      alt={signature.name}
                      className="h-8 w-16 rounded border border-gray-100 object-contain"
                    />
                    <span className="text-sm text-gray-700">{signature.name}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(signature.id)}
                    className="rounded p-1 text-gray-400 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
