import type { Annotation, PageInfo, Tool } from '../types';
import { toolsById } from '../tools/toolRegistry';
import { AnnotationItem } from './AnnotationItem';

interface AnnotationLayerProps {
  pageIndex: number;
  pageInfo: PageInfo;
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

export function AnnotationLayer({
  pageIndex,
  pageInfo,
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
}: AnnotationLayerProps) {
  const pageAnnotations = annotations.filter((a) => a.page === pageIndex);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.defaultPrevented) return;
    onSelect(null);
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    if (activeTool) {
      if (activeTool.onPageClick) {
        activeTool.onPageClick(e, pageIndex, pageInfo, scale, onAdd);
      } else if (onPageClick) {
        onPageClick(pageIndex, x, y);
      }
    } else if (onShowPageMenu) {
      onShowPageMenu(pageIndex, x, y, e.clientX, e.clientY);
    }
  };

  return (
    <div
      className="absolute inset-0 z-10"
      style={{
        width: pageInfo.width * scale,
        height: pageInfo.height * scale,
        touchAction: 'none',
        pointerEvents: 'auto',
      }}
      onPointerDown={handlePointerDown}
    >
      {pageAnnotations.map((a) => {
        const tool = toolsById[a.type] ?? activeTool;
        if (!tool) return null;
        return (
          <AnnotationItem
            key={a.id}
            annotation={a}
            tool={tool}
            pageInfo={pageInfo}
            scale={scale}
            isSelected={selectedId === a.id}
            onSelect={() => onSelect(a.id)}
            onChange={(patch) => onChange(a.id, patch)}
            onDelete={() => onDelete(a.id)}
            onShowMenu={(clientX, clientY) => onShowAnnotationMenu?.(a.id, clientX, clientY)}
          />
        );
      })}
    </div>
  );
}
