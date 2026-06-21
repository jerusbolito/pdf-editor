import type { Tool } from '../types';

interface PageMenuProps {
  x: number;
  y: number;
  tools: Tool[];
  onSelect: (tool: Tool) => void;
  onClose: () => void;
}

export function PageMenu({ x, y, tools, onSelect, onClose }: PageMenuProps) {
  return (
    <>
      <div className="fixed inset-0 z-20" onPointerDown={onClose} />
      <div
        className="fixed z-30 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
        style={{ left: x, top: y }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-100 bg-gray-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Add annotation
        </div>
        <div className="p-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onSelect(tool)}
                className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                <Icon className="h-4 w-4" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
