import { useState } from 'react';
import { PdfSplitTool } from '../components/PdfSplitTool';
import { ToolPage } from '../components/ToolPage';

const faq = [
  {
    question: 'How do I split a PDF online?',
    answer: 'Upload your PDF, select the pages you want to extract, and click Split. Each range becomes a separate downloadable PDF.',
  },
  {
    question: 'Can I split a PDF into individual pages?',
    answer: 'Yes. Choose one page per range, and the tool will create one PDF file for each selected page.',
  },
  {
    question: 'Is my PDF uploaded to a server?',
    answer: 'No. Splitting is done locally in your browser using PDF-lib. Your document stays private.',
  },
  {
    question: 'What page ranges are supported?',
    answer: 'You can split by single pages, ranges (e.g., 1-5), or any combination you need.',
  },
  {
    question: 'Is the PDF splitter free?',
    answer: 'Yes. MyPDFSigner split tool is free and does not require an account.',
  },
];

export function SplitPdfPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToolPage
      shortTitle="PDF Split"
      metaTitle="Split PDF Online Free - Extract Pages Instantly"
      metaDescription="Extract pages from a PDF online for free. Split PDFs into individual pages or custom ranges in your browser. No upload, no signup."
      metaKeywords="split PDF online, extract PDF pages, separate PDF pages, free PDF splitter, split PDF by pages, PDF page extractor"
      canonicalPath="/split-pdf"
      heroHeading="Extract pages from any PDF"
      heroSubheading="Split PDFs online for free. Choose single pages or page ranges, and download each part as a separate PDF file in seconds."
      benefits={[
        'Split by single pages or custom ranges',
        'Download each split as a separate PDF',
        'No upload to servers — split locally in your browser',
        'No registration, no watermark',
        'Works on desktop and mobile browsers',
      ]}
      faq={faq}
      toolId="split"
      onStart={() => setIsActive(true)}
      isActive={isActive}
      toolInterface={
        isActive ? (
          <PdfSplitTool onBack={() => setIsActive(false)} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">Upload a PDF and extract the pages you need.</p>
            <button
              onClick={() => setIsActive(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start Splitting PDF
            </button>
          </div>
        )
      }
    />
  );
}
