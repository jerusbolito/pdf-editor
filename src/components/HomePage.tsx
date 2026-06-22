import { ToolCard, tools } from './ToolCard';

interface HomePageProps {
  onSelectTool: (toolId: string) => void;
}

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
              <ToolCard
                key={tool.id}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                badge={tool.badge}
                onClick={() => onSelectTool(tool.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
