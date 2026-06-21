import type { PDFPageProxy } from 'pdfjs-dist';
import type { Annotation, PageInfo } from '../types';
import { PdfPage } from './PdfPage';

interface PdfViewerProps {
  pages: PDFPageProxy[];
  infos: PageInfo[];
  scale: number;
  annotations: Annotation[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onChange: (id: string, patch: Partial<Annotation> | ((a: Annotation) => Annotation)) => void;
  onDelete: (id: string) => void;
  onAdd: (annotation: Omit<Annotation, 'id'>) => void;
  onPageClick?: (pageIndex: number, x: number, y: number) => void;
  onShowPageMenu?: (pageIndex: number, x: number, y: number, clientX: number, clientY: number) => void;
  onShowAnnotationMenu?: (id: string, clientX: number, clientY: number) => void;
}

export function PdfViewer({
  pages,
  infos,
  scale,
  annotations,
  selectedId,
  onSelect,
  onChange,
  onDelete,
  onAdd,
  onPageClick,
  onShowPageMenu,
  onShowAnnotationMenu,
}: PdfViewerProps) {
  return (
    <div className="flex h-full flex-col items-center overflow-auto p-4">
      {pages.map((page, i) => (
        <PdfPage
          key={i}
          page={page}
          pageInfo={infos[i]}
          pageIndex={i}
          scale={scale}
          annotations={annotations}
          selectedId={selectedId}
          onSelect={onSelect}
          onChange={onChange}
          onDelete={onDelete}
          onAdd={onAdd}
          onPageClick={onPageClick}
          onShowPageMenu={onShowPageMenu}
          onShowAnnotationMenu={onShowAnnotationMenu}
        />
      ))}
    </div>
  );
}
