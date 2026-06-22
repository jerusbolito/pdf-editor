import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Zap, Smartphone, FileText, Merge, Scissors, Minimize2, Image as ImageIcon, Images, Layers, KeyRound, Stamp, AlignLeft } from 'lucide-react';
import { Seo } from './Seo';
import { Faq, type FaqItem } from './Faq';
import { PageLayout } from './PageLayout';
import { ShareButtons } from './ShareButtons';

export interface ToolPageProps {
  shortTitle: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalPath: string;
  heroHeading: string;
  heroSubheading: string;
  benefits: string[];
  faq: FaqItem[];
  toolId: 'editor' | 'merge' | 'split' | 'compress' | 'images-to-pdf' | 'pdf-to-images' | 'organize-pdf' | 'unlock-pdf' | 'watermark-pdf' | 'pdf-to-text';
  onStart: () => void;
  isActive: boolean;
  toolInterface: ReactNode;
}

const toolLinks = [
  { id: 'editor', path: '/edit-pdf', title: 'PDF Editor', icon: FileText },
  { id: 'merge', path: '/merge-pdf', title: 'PDF Merge', icon: Merge },
  { id: 'split', path: '/split-pdf', title: 'PDF Split', icon: Scissors },
  { id: 'compress', path: '/compress-pdf', title: 'PDF Compress', icon: Minimize2 },
  { id: 'images-to-pdf', path: '/images-to-pdf', title: 'Images to PDF', icon: ImageIcon },
  { id: 'pdf-to-images', path: '/pdf-to-images', title: 'PDF to Images', icon: Images },
  { id: 'organize-pdf', path: '/organize-pdf', title: 'Organize PDF', icon: Layers },
  { id: 'unlock-pdf', path: '/unlock-pdf', title: 'Unlock PDF', icon: KeyRound },
  { id: 'watermark-pdf', path: '/watermark-pdf', title: 'Watermark PDF', icon: Stamp },
  { id: 'pdf-to-text', path: '/pdf-to-text', title: 'PDF to Text', icon: AlignLeft },
];

export function ToolPage({
  shortTitle,
  metaTitle,
  metaDescription,
  metaKeywords,
  canonicalPath,
  heroHeading,
  heroSubheading,
  benefits,
  faq,
  toolId,
  onStart,
  isActive,
  toolInterface,
}: ToolPageProps) {
  const otherTools = toolLinks.filter((t) => t.id !== toolId);

  return (
    <PageLayout>
      <Seo
        title={metaTitle}
        description={metaDescription}
        canonicalPath={canonicalPath}
        keywords={metaKeywords}
      />

      <div className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all tools
          </Link>

          <div className="mt-6">
            {!isActive ? (
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{heroHeading}</h1>
                  <p className="mt-4 text-lg text-gray-600">{heroSubheading}</p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      onClick={onStart}
                      className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
                    >
                      Start {shortTitle} Now
                    </button>
                    <span className="text-sm text-gray-500">No signup · Free · Privacy-first</span>
                  </div>

                  <div className="mt-4">
                    <ShareButtons title={`${shortTitle} - Free Online | MyPDFSigner`} />
                  </div>

                  <ul className="mt-8 space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 rounded-full bg-green-100 p-1 text-green-600">
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-blue-600" />
                      Files stay on your device
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                      Works on mobile & desktop
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">{shortTitle}</h2>
                  <div className="h-[70vh] min-h-[400px] overflow-auto rounded-xl bg-white p-4 shadow-sm">
                    {toolInterface}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">{shortTitle}</h2>
                  <button
                    onClick={onStart}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    <Zap className="h-4 w-4" />
                    Tool active
                  </button>
                </div>
                <div className="h-[80vh] min-h-[500px] overflow-auto rounded-xl bg-white shadow-sm">
                  {toolInterface}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Faq items={faq} title={`Common questions about ${shortTitle}`} />

      <section className="bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-gray-900">More free PDF tools</h2>
          <p className="mt-2 text-center text-gray-600">Everything you need to manage PDFs in one place.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-900">{tool.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
