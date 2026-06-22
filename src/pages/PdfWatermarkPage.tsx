import { useState } from 'react';
import { PdfWatermarkTool } from '../components/PdfWatermarkTool';
import { ToolPage } from '../components/ToolPage';

const faq = [
  {
    question: 'How do I add a watermark to a PDF?',
    answer: 'Upload your PDF, enter the watermark text, adjust size, opacity, and rotation, and click Download. The watermark is applied to all pages or only the first/last page.',
  },
  {
    question: 'Can I add page numbers to a PDF?',
    answer: 'Yes. Enable page numbers, choose the starting number, position, and size, then download the PDF with page numbers added.',
  },
  {
    question: 'Is my PDF uploaded to a server?',
    answer: 'No. Watermarks and page numbers are added locally in your browser using PDF-lib. Your PDF stays on your device.',
  },
  {
    question: 'Can I add an image watermark?',
    answer: 'Currently only text watermarks are supported. Image watermarks may be added in a future update.',
  },
  {
    question: 'Is the watermark tool free?',
    answer: 'Yes. The tool is free and does not require an account or watermark.',
  },
];

export function PdfWatermarkPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToolPage
      shortTitle="Watermark PDF"
      metaTitle="Watermark PDF Online Free - Add Text & Page Numbers"
      metaDescription="Add text watermarks and page numbers to PDFs online for free. Works in your browser without uploading to servers. No signup, no watermark."
      metaKeywords="watermark PDF online, add page numbers PDF, free PDF watermark, PDF text watermark, PDF page number tool, add watermark to PDF"
      canonicalPath="/watermark-pdf"
      heroHeading="Add watermarks and page numbers"
      heroSubheading="Add text watermarks and page numbers to your PDF for free. Customize the text, size, opacity, rotation, and position, then download in seconds."
      benefits={[
        'Add text watermarks to all or selected pages',
        'Customize watermark size, opacity, and rotation',
        'Add page numbers with starting number and position',
        'No upload to servers — process locally in your browser',
        'No registration, no watermark',
      ]}
      faq={faq}
      toolId="editor"
      onStart={() => setIsActive(true)}
      isActive={isActive}
      toolInterface={
        isActive ? (
          <PdfWatermarkTool onBack={() => setIsActive(false)} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">Upload a PDF and add watermarks or page numbers.</p>
            <button
              onClick={() => setIsActive(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Watermark PDF
            </button>
          </div>
        )
      }
    />
  );
}
