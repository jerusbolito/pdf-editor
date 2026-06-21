/* eslint-disable react-refresh/only-export-components */
import { CheckSquare } from 'lucide-react';
import type { AnnotationRenderProps, Tool } from '../types';

function CheckboxAnnotation({ annotation, isSelected, onChange }: AnnotationRenderProps) {
  const checked = annotation.payload.checked ?? false;
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange({ payload: { ...annotation.payload, checked: e.target.checked } })}
      className="pointer-events-auto h-full w-full accent-blue-600"
      style={{ pointerEvents: isSelected ? 'auto' : 'none' }}
    />
  );
}

export const checkboxTool: Tool = {
  id: 'checkbox',
  label: 'Checkbox',
  icon: CheckSquare,
  cursor: 'crosshair',
  render: CheckboxAnnotation,
  onPageClick: (e, pageIndex, _pageInfo, scale, addAnnotation) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    addAnnotation({
      type: 'checkbox',
      page: pageIndex,
      x,
      y,
      width: 20,
      height: 20,
      payload: { checked: false },
    });
  },
};
