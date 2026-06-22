import { FileText, Merge, Scissors, Minimize2, Image as ImageIcon } from 'lucide-react';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
}

const tools = [
  { id: 'editor', title: 'PDF Editor', description: 'Sign, fill, edit, and annotate PDFs in your browser.', icon: <FileText className="h-6 w-6" />, badge: 'Popular' },
  { id: 'merge', title: 'PDF Merge', description: 'Combine multiple PDFs into a single document.', icon: <Merge className="h-6 w-6" /> },
  { id: 'split', title: 'PDF Split', description: 'Extract pages from a PDF into separate files.', icon: <Scissors className="h-6 w-6" /> },
  { id: 'compress', title: 'PDF Compress', description: 'Reduce PDF file size while maintaining quality.', icon: <Minimize2 className="h-6 w-6" /> },
  { id: 'images-to-pdf', title: 'Images to PDF', description: 'Convert images into a single PDF document.', icon: <ImageIcon className="h-6 w-6" /> },
];

export function HomePage({ onSelectTool }: HomePageProps) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="border-b border-gray-200 bg-white px-4 py-6 shadow-sm">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold text-gray-900">MyPDFSigner</h1>
          <p className="mt-2 text-gray-600">Free online PDF tools. No upload to servers, privacy-first.</p>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 p-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">PDF Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="group relative flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
              >
                {tool.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                    {tool.badge}
                  </span>
                )}
                <div className="rounded-lg bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-100 transition-colors">
                  {tool.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{tool.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
