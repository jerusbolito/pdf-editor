export type AnnotationType = 'signature' | 'text' | 'date' | 'checkbox' | 'image';

export interface AnnotationPayload {
  signature?: string; // data URL
  text?: string;
  checked?: boolean;
  image?: string; // data URL
  fontSize?: number;
  color?: string;
}

export interface Annotation {
  id: string;
  type: AnnotationType;
  page: number;
  x: number; // PDF points, top-left origin
  y: number;
  width: number;
  height: number;
  payload: AnnotationPayload;
}

export interface Point {
  x: number;
  y: number;
}

export interface PageInfo {
  width: number; // PDF points
  height: number;
  rotation: number;
}

export interface AnnotationRenderProps {
  annotation: Annotation;
  scale: number;
  isSelected: boolean;
  onChange: (patch: Partial<Annotation> | ((a: Annotation) => Annotation)) => void;
  onSelect: () => void;
  onDelete: () => void;
}

export interface Tool {
  id: AnnotationType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  cursor: string;
  render: React.ComponentType<AnnotationRenderProps>;
  onPageClick?: (
    e: React.PointerEvent,
    pageIndex: number,
    pageInfo: PageInfo,
    scale: number,
    addAnnotation: (annotation: Omit<Annotation, 'id'>) => void,
  ) => void;
  onFileSelect?: (
    file: File,
    addAnnotation: (annotation: Omit<Annotation, 'id'>) => void,
  ) => void;
}
