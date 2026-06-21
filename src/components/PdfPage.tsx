import { useEffect, useRef } from 'react';
import type { PDFPageProxy } from 'pdfjs-dist';
import type { Annotation, PageInfo, Tool } from '../types';
import { AnnotationLayer } from './AnnotationLayer';

interface PdfPageProps {
  page: PDFPageProxy;
  pageInfo: PageInfo;
  pageIndex: number;
  scale: number;
  annotations: Annotation[];
  selectedId: string | null;
  activeTool?: Tool | null;
  onSelect: (id: string | null) => void;
  onChange: (id: string, patch: Partial<Annotation> | ((a: Annotation) => Annotation)) => void;
  onDelete: (id: string) => void;
  onAdd: (annotation: Omit<Annotation, 'id'>) => void;
  onPageClick?: (pageIndex: number, x: number, y: number) => void;
  onShowPageMenu?: (pageIndex: number, x: number, y: number, clientX: number, clientY: number) => void;
  onShowAnnotationMenu?: (id: string, clientX: number, clientY: number) => void;
}

export function PdfPage({
  page,
  pageInfo,
  pageIndex,
  scale,
  annotations,
  activeTool,
  selectedId,
  onSelect,
  onChange,
  onDelete,
  onAdd,
  onPageClick,
  onShowPageMenu,
  onShowAnnotationMenu,
}: PdfPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    const viewport = page.getViewport({ scale });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const renderTask = page.render({ canvasContext: ctx, viewport, canvas });
    renderTask.promise
      .then(() => {
        if (cancelled) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      })
      .catch(() => {
        // render was cancelled; ignore
      });
    return () => {
      cancelled = true;
      renderTask.cancel();
    };
  }, [page, scale]);

  return (
    <div className="relative mb-4 bg-white shadow-sm">
      <canvas ref={canvasRef} className="block" />
      <AnnotationLayer
        pageIndex={pageIndex}
        pageInfo={pageInfo}
        scale={scale}
        annotations={annotations}
        activeTool={activeTool}
        selectedId={selectedId}
        onSelect={onSelect}
        onChange={onChange}
        onDelete={onDelete}
        onAdd={onAdd}
        onPageClick={onPageClick}
        onShowPageMenu={onShowPageMenu}
        onShowAnnotationMenu={onShowAnnotationMenu}
      />
    </div>
  );
}
