import { FileText, Merge, Scissors, Minimize2, Image as ImageIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
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

export const tools = [
  {
    id: 'editor',
    title: 'PDF Editor',
    description: 'Sign, fill, edit, and annotate PDFs in your browser.',
    icon: <FileText className="h-6 w-6" />,
    badge: 'Popular',
  },
  {
    id: 'merge',
    title: 'PDF Merge',
    description: 'Combine multiple PDFs into a single document.',
    icon: <Merge className="h-6 w-6" />,
  },
  {
    id: 'split',
    title: 'PDF Split',
    description: 'Extract pages from a PDF into separate files.',
    icon: <Scissors className="h-6 w-6" />,
  },
  {
    id: 'compress',
    title: 'PDF Compress',
    description: 'Reduce PDF file size while maintaining quality.',
    icon: <Minimize2 className="h-6 w-6" />,
  },
  {
    id: 'images-to-pdf',
    title: 'Images to PDF',
    description: 'Convert images into a single PDF document.',
    icon: <ImageIcon className="h-6 w-6" />,
  },
];
