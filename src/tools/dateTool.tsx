/* eslint-disable react-refresh/only-export-components */
import { Calendar } from 'lucide-react';
import type { AnnotationRenderProps, Tool } from '../types';

function DateAnnotation({ annotation }: AnnotationRenderProps) {
  const text = annotation.payload.text ?? new Date().toLocaleDateString();
  const size = annotation.payload.fontSize ?? 14;
  return (
    <div
      className="flex h-full w-full items-center overflow-hidden px-1"
      style={{ fontSize: size, color: annotation.payload.color ?? '#000000' }}
    >
      {text}
    </div>
  );
}

export const dateTool: Tool = {
  id: 'date',
  label: 'Date',
  icon: Calendar,
  cursor: 'text',
  render: DateAnnotation,
  onPageClick: (e, pageIndex, _pageInfo, scale, addAnnotation) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    addAnnotation({
      type: 'date',
      page: pageIndex,
      x,
      y,
      width: 120,
      height: 24,
      payload: { text: new Date().toLocaleDateString(), fontSize: 14, color: '#000000' },
    });
  },
};
