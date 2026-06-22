import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Merge, Scissors, Minimize2, Image as ImageIcon, ArrowRight, Shield, Zap, Lock, Upload, MousePointerClick, Download, Images, Layers, KeyRound, Stamp, AlignLeft } from 'lucide-react';
import { Seo } from '../components/Seo';
import { Faq } from '../components/Faq';
import { PageLayout } from '../components/PageLayout';
import { ShareButtons } from '../components/ShareButtons';

const tools = [
  {
    id: 'editor',
    path: '/edit-pdf',
    title: 'PDF Editor',
    description: 'Sign, fill, edit, and annotate PDFs in your browser.',
    icon: FileText,
    badge: 'Popular',
  },
  {
    id: 'merge',
    path: '/merge-pdf',
    title: 'PDF Merge',
    description: 'Combine multiple PDFs into a single document.',
    icon: Merge,
  },
  {
    id: 'split',
    path: '/split-pdf',
    title: 'PDF Split',
    description: 'Extract pages from a PDF into separate files.',
    icon: Scissors,
  },
  {
    id: 'compress',
    path: '/compress-pdf',
    title: 'PDF Compress',
    description: 'Reduce PDF file size while maintaining quality.',
    icon: Minimize2,
  },
  {
    id: 'images-to-pdf',
    path: '/images-to-pdf',
    title: 'Images to PDF',
    description: 'Convert images into a single PDF document.',
    icon: ImageIcon,
  },
  {
    id: 'pdf-to-images',
    path: '/pdf-to-images',
    title: 'PDF to Images',
    description: 'Convert PDF pages into JPG or PNG images.',
    icon: Images,
  },
  {
    id: 'organize-pdf',
    path: '/organize-pdf',
    title: 'Organize PDF',
    description: 'Rotate, reorder, and delete pages from any PDF.',
    icon: Layers,
  },
  {
    id: 'unlock-pdf',
    path: '/unlock-pdf',
    title: 'Unlock PDF',
    description: 'Remove password restrictions from PDFs.',
    icon: KeyRound,
  },
  {
    id: 'watermark-pdf',
    path: '/watermark-pdf',
    title: 'Watermark PDF',
    description: 'Add text watermarks and page numbers to PDFs.',
    icon: Stamp,
  },
  {
    id: 'pdf-to-text',
    path: '/pdf-to-text',
    title: 'PDF to Text',
    description: 'Extract text from PDFs into a text file.',
    icon: AlignLeft,
  },
];

const steps = [
  {
    icon: Upload,
    title: 'Upload your file',
    description: 'Drag and drop your PDF or image. Nothing is sent to a server.',
  },
  {
    icon: MousePointerClick,
    title: 'Edit in your browser',
    description: 'Sign, merge, split, compress, or convert with simple, fast tools.',
  },
  {
    icon: Download,
    title: 'Download instantly',
    description: 'Save your finished PDF to your device in seconds.',
  },
];

const faq = [
  {
    question: 'Is MyPDFSigner completely free?',
    answer: 'Yes. Every tool is free to use. No credit card, no account, and no subscription is required.',
  },
  {
    question: 'Are my files uploaded to a server?',
    answer: 'No. All processing happens locally in your browser. Your PDFs and images never leave your device.',
  },
  {
    question: 'What tools are available?',
    answer: 'PDF Editor, PDF Merge, PDF Split, PDF Compress, Images to PDF, PDF to Images, Organize PDF, Unlock PDF, Watermark PDF, and PDF to Text.',
  },
  {
    question: 'Can I use MyPDFSigner on my phone?',
    answer: 'Yes. The site is responsive and works on iOS, Android, and desktop browsers.',
  },
  {
    question: 'Will my PDFs have a watermark?',
    answer: 'No. We do not add watermarks to any downloaded files.',
  },
  {
    question: 'What browsers are supported?',
    answer: 'Chrome, Firefox, Safari, Edge, and other modern browsers.',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  return (
    <PageLayout hideHeader>
      <Seo
        title="MyPDFSigner | Free PDF Tools Online - Edit, Merge, Split, Compress"
        description="Free online PDF tools suite. Edit, sign, merge, split, compress PDFs, and convert images to PDF in your browser. No upload, no signup, no watermark."
        canonicalPath="/"
        keywords="PDF editor, PDF merge, PDF split, PDF compress, images to PDF, online PDF tools, sign PDF, fill PDF, annotate PDF, free PDF editor, no upload PDF"
      />

      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <Shield className="h-4 w-4" />
            <span>Privacy-first PDF tools</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Free PDF tools that work in your browser
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Edit, sign, merge, split, compress, and convert PDFs instantly. No uploads, no signup, no watermarks — your files stay on your device.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate('/edit-pdf')}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-md hover:bg-blue-50 transition-colors"
            >
              <FileText className="h-5 w-5" />
              Edit a PDF
            </button>
            <button
              onClick={() => navigate('/merge-pdf')}
              className="flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-blue-400 transition-colors"
            >
              <Merge className="h-5 w-5" />
              Merge PDFs
            </button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-blue-100">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="h-4 w-4" /> No server upload
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4" /> Instant download
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Shield className="h-4 w-4" /> No watermark
            </span>
          </div>
          <div className="mt-6 flex justify-center">
            <ShareButtons title="MyPDFSigner - Free PDF Tools Online" />
          </div>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">All PDF tools in one place</h2>
            <p className="mt-2 text-gray-600">Choose the tool you need and start working immediately.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="group relative flex flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                >
                  {tool.badge && (
                    <span className="absolute right-4 top-4 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {tool.badge}
                    </span>
                  )}
                  <div className={`rounded-lg p-3 transition-colors ${hoveredTool === tool.id ? 'bg-blue-100 text-blue-700' : 'bg-blue-50 text-blue-600'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{tool.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Use {tool.title} <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">How it works</h2>
            <p className="mt-2 text-gray-600">Get your PDF work done in three simple steps.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Popular use cases</h2>
            <p className="mt-2 text-gray-600">Jump to the right tool for common PDF tasks.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Sign a contract', path: '/edit-pdf', icon: FileText },
              { title: 'Fill a form', path: '/edit-pdf', icon: FileText },
              { title: 'Combine reports', path: '/merge-pdf', icon: Merge },
              { title: 'Extract pages', path: '/split-pdf', icon: Scissors },
              { title: 'Shrink a file', path: '/compress-pdf', icon: Minimize2 },
              { title: 'Make a photo PDF', path: '/images-to-pdf', icon: ImageIcon },
              { title: 'Export slides', path: '/pdf-to-images', icon: Images },
              { title: 'Rotate pages', path: '/organize-pdf', icon: Layers },
            ].map((template, index) => {
              const Icon = template.icon;
              return (
                <Link
                  key={index}
                  to={template.path}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
                >
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium text-gray-900">{template.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Faq items={faq} />
    </PageLayout>
  );
}
