/* eslint-disable react-refresh/only-export-components */
import { Type } from 'lucide-react';
import { useState } from 'react';
import type { AnnotationRenderProps, Tool } from '../types';

function TextAnnotation({ annotation, isSelected, onChange }: AnnotationRenderProps) {
  const [editing, setEditing] = useState(false);
  const text = annotation.payload.text ?? 'Text';
  const size = annotation.payload.fontSize ?? 14;

  if (editing || isSelected) {
    return (
      <input
        type="text"
        autoFocus
        value={text}
        onChange={(e) => onChange({ payload: { ...annotation.payload, text: e.target.value } })}
        onBlur={() => setEditing(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setEditing(false);
        }}
        className="h-full w-full bg-transparent px-1 outline-none"
        style={{ fontSize: size, color: annotation.payload.color ?? '#000000' }}
      />
    );
  }

  return (
    <div
      className="flex h-full w-full items-center overflow-hidden px-1"
      style={{ fontSize: size, color: annotation.payload.color ?? '#000000' }}
      onDoubleClick={() => setEditing(true)}
    >
      {text}
    </div>
  );
}

export const textTool: Tool = {
  id: 'text',
  label: 'Text',
  icon: Type,
  cursor: 'text',
  render: TextAnnotation,
  onPageClick: (e, pageIndex, _pageInfo, scale, addAnnotation) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    addAnnotation({
      type: 'text',
      page: pageIndex,
      x,
      y,
      width: 120,
      height: 24,
      payload: { text: 'Text', fontSize: 14, color: '#000000' },
    });
  },
};
