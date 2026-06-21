import { useRef, useState } from 'react';

interface SignaturePadProps {
  onDone: (dataUrl: string) => void;
  onCancel: () => void;
}

export function SignaturePad({ onDone, onCancel }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);

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
        <div className="mt-3 flex justify-end gap-2">
          <button onClick={onCancel} className="rounded px-3 py-1 text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button onClick={clear} className="rounded px-3 py-1 text-gray-600 hover:bg-gray-100">
            Clear
          </button>
          <button onClick={done} className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
