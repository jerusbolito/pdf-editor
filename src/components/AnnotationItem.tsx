import { useRef, useState } from 'react';
import type { Annotation, PageInfo, Tool } from '../types';
import { pdfToCss, cssToPdf } from '../utils/coords';

type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se';

interface AnnotationItemProps {
  annotation: Annotation;
  tool: Tool;
  pageInfo: PageInfo;
  scale: number;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<Annotation> | ((a: Annotation) => Annotation)) => void;
  onDelete: () => void;
  onShowMenu: (clientX: number, clientY: number) => void;
}

export function AnnotationItem({
  annotation,
  tool,
  pageInfo,
  scale,
  isSelected,
  onSelect,
  onChange,
  onShowMenu,
}: AnnotationItemProps) {
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragStart = useRef<{ x: number; y: number; clientX: number; clientY: number } | null>(null);
  const resizeHandle = useRef<ResizeHandle | null>(null);
  const resizeStart = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
    clientX: number;
    clientY: number;
  } | null>(null);
  const css = pdfToCss(annotation, pageInfo, scale);

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      onSelect();
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    if (!isSelected) return;
    const { clientX, clientY } = e;
    dragStart.current = {
      x: css.x,
      y: css.y,
      clientX,
      clientY,
    };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragging && dragStart.current) {
      e.preventDefault();
      const start = dragStart.current;
      const newCssX = start.x + (e.clientX - start.clientX);
      const newCssY = start.y + (e.clientY - start.clientY);
      const pdf = cssToPdf(newCssX, newCssY, pageInfo, scale, css.width, css.height);
      onChange({ x: Math.max(0, pdf.x), y: Math.max(0, pdf.y) });
      return;
    }
    if (resizing && resizeStart.current && resizeHandle.current) {
      e.preventDefault();
      const start = resizeStart.current;
      const handle = resizeHandle.current;
      const dx = e.clientX - start.clientX;
      const dy = e.clientY - start.clientY;
      let newCssX = start.x;
      let newCssY = start.y;
      let newCssWidth = start.width;
      let newCssHeight = start.height;
      if (handle === 'se') {
        newCssWidth = Math.max(10, start.width + dx);
        newCssHeight = Math.max(10, start.height + dy);
      } else if (handle === 'sw') {
        newCssWidth = Math.max(10, start.width - dx);
        newCssHeight = Math.max(10, start.height + dy);
        newCssX = start.x + (start.width - newCssWidth);
      } else if (handle === 'ne') {
        newCssWidth = Math.max(10, start.width + dx);
        newCssHeight = Math.max(10, start.height - dy);
        newCssY = start.y + (start.height - newCssHeight);
      } else if (handle === 'nw') {
        newCssWidth = Math.max(10, start.width - dx);
        newCssHeight = Math.max(10, start.height - dy);
        newCssX = start.x + (start.width - newCssWidth);
        newCssY = start.y + (start.height - newCssHeight);
      }
      const pdf = cssToPdf(newCssX, newCssY, pageInfo, scale, newCssWidth, newCssHeight);
      onChange({
        x: Math.max(0, pdf.x),
        y: Math.max(0, pdf.y),
        width: pdf.width,
        height: pdf.height,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragging) {
      e.preventDefault();
      setDragging(false);
      dragStart.current = null;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      return;
    }
    if (resizing) {
      e.preventDefault();
      setResizing(false);
      resizeHandle.current = null;
      resizeStart.current = null;
      return;
    }
    onShowMenu(e.clientX, e.clientY);
  };

  const handleResizeDown = (e: React.PointerEvent) => {
    const handle = (e.currentTarget as HTMLElement).dataset.handle as ResizeHandle | undefined;
    if (!handle) return;
    e.preventDefault();
    e.stopPropagation();
    onSelect();
    resizeHandle.current = handle;
    resizeStart.current = {
      x: css.x,
      y: css.y,
      width: css.width,
      height: css.height,
      clientX: e.clientX,
      clientY: e.clientY,
    };
    setResizing(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const isResizable = annotation.type === 'image' || annotation.type === 'signature';
  const Content = tool.render;

  return (
    <div
      className={`absolute overflow-hidden border-2 ${
        isSelected ? 'border-blue-500' : 'border-transparent'
      } bg-white/5`}
      style={{
        left: css.x,
        top: css.y,
        width: css.width,
        height: css.height,
        cursor: dragging ? 'grabbing' : isSelected ? 'grab' : 'pointer',
        touchAction: 'none',
        pointerEvents: 'auto',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <Content
        annotation={annotation}
        scale={scale}
        isSelected={isSelected}
        onChange={onChange}
        onSelect={onSelect}
        onDelete={() => {}}
      />
      {isSelected && isResizable && (
        <>
          <ResizeHandleDot position="nw" onPointerDown={handleResizeDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} />
          <ResizeHandleDot position="ne" onPointerDown={handleResizeDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} />
          <ResizeHandleDot position="sw" onPointerDown={handleResizeDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} />
          <ResizeHandleDot position="se" onPointerDown={handleResizeDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} />
        </>
      )}
    </div>
  );
}

function ResizeHandleDot({
  position,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: {
  position: ResizeHandle;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
}) {
  const style: React.CSSProperties = {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'white',
    border: '2px solid #3b82f6',
    zIndex: 10,
  };
  if (position.includes('n')) style.top = -5;
  else style.bottom = -5;
  if (position.includes('w')) style.left = -5;
  else style.right = -5;
  const cursor = `${position}-resize`;
  return <div data-handle={position} style={{ ...style, cursor }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} />;
}
