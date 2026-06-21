/* eslint-disable react-refresh/only-export-components */
import { Pen } from 'lucide-react';
import type { Annotation, AnnotationRenderProps, Tool } from '../types';

function SignatureAnnotation({ annotation }: AnnotationRenderProps) {
  const { signature } = annotation.payload;
  if (!signature) return null;
  return (
    <img
      src={signature}
      alt="Signature"
      draggable={false}
      className="pointer-events-none block h-full w-full select-none object-contain"
    />
  );
}

export const signatureTool: Tool = {
  id: 'signature',
  label: 'Signature',
  icon: Pen,
  cursor: 'crosshair',
  render: SignatureAnnotation,
};

export function createSignatureAnnotation(
  signature: string,
  pageIndex: number,
  x: number,
  y: number,
): Annotation {
  return {
    id: '',
    type: 'signature',
    page: pageIndex,
    x,
    y,
    width: 200,
    height: 75,
    payload: { signature },
  };
}
