import { useState } from 'react';
import { PdfOrganizeTool } from '../components/PdfOrganizeTool';
import { ToolPage } from '../components/ToolPage';

const faq = [
  {
    question: 'How do I rotate a PDF page online?',
    answer: 'Upload your PDF, click the rotate button on any page thumbnail, and download the reorganized PDF.',
  },
  {
    question: 'Can I reorder pages in a PDF?',
    answer: 'Yes. Drag and drop page thumbnails into the order you want, then download the new PDF.',
  },
  {
    question: 'Can I delete pages from a PDF?',
    answer: 'Yes. Click the trash icon on any page thumbnail to remove it. Click again to restore it before downloading.',
  },
  {
    question: 'Is my PDF uploaded to a server?',
    answer: 'No. Page organization happens locally in your browser using PDF-lib. Your file stays private.',
  },
  {
    question: 'Is the PDF organizer free?',
    answer: 'Yes. MyPDFSigner organize tool is free and does not require an account.',
  },
];

export function PdfOrganizePage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToolPage
      shortTitle="Organize PDF"
      metaTitle="Organize PDF Pages Online Free - Rotate, Reorder, Delete"
      metaDescription="Rotate, reorder, and delete PDF pages online for free. Organize your PDF in your browser with no upload, no signup, no watermark."
      metaKeywords="organize PDF pages, rotate PDF online, reorder PDF pages, delete PDF pages, PDF page organizer, rearrange PDF pages"
      canonicalPath="/organize-pdf"
      heroHeading="Organize PDF pages in your browser"
      heroSubheading="Rotate, reorder, and delete pages from any PDF for free. Upload your file, make changes, and download the organized PDF in seconds."
      benefits={[
        'Rotate individual pages 90° at a time',
        'Drag and drop to reorder pages',
        'Delete pages you no longer need',
        'No upload to servers — organize locally in your browser',
        'No registration, no watermark',
      ]}
      faq={faq}
      toolId="editor"
      onStart={() => setIsActive(true)}
      isActive={isActive}
      toolInterface={
        isActive ? (
          <PdfOrganizeTool onBack={() => setIsActive(false)} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">Upload a PDF and start organizing its pages.</p>
            <button
              onClick={() => setIsActive(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Organize PDF Pages
            </button>
          </div>
        )
      }
    />
  );
}
