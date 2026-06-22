import type { ReactNode } from 'react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  badge?: string;
}

export function ToolCard({ title, description, icon, onClick, badge }: ToolCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
    >
      {badge && (
        <span className="absolute right-4 top-4 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          {badge}
        </span>
      )}
      <div className="rounded-lg bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-100 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </button>
  );
}
