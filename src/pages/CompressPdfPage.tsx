import { useState } from 'react';
import { PdfCompressTool } from '../components/PdfCompressTool';
import { ToolPage } from '../components/ToolPage';

const faq = [
  {
    question: 'How do I compress a PDF online for free?',
    answer: 'Upload your PDF and click Compress. The tool rebuilds the file with smaller objects and streams, then downloads the optimized PDF.',
  },
  {
    question: 'Does compressing a PDF reduce quality?',
    answer: 'No content is re-encoded, so text and vector graphics stay sharp. Compression mainly removes redundant metadata and optimizes the PDF structure.',
  },
  {
    question: 'Is my PDF uploaded to a server?',
    answer: 'No. PDF compression runs entirely in your browser. Your file stays on your device.',
  },
  {
    question: 'How much can I reduce the file size?',
    answer: 'Results vary by PDF. Files with repeated images or unused metadata can shrink significantly. The tool shows the before and after sizes.',
  },
  {
    question: 'Is the PDF compressor free?',
    answer: 'Yes. MyPDFSigner compress tool is free and does not require an account.',
  },
];

export function CompressPdfPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToolPage
      shortTitle="PDF Compress"
      metaTitle="Compress PDF Online Free - Reduce File Size Instantly"
      metaDescription="Reduce PDF file size online for free. Compress PDFs in your browser without uploading to servers. No signup, no watermark."
      metaKeywords="compress PDF online, reduce PDF size, free PDF compressor, shrink PDF file, optimize PDF online, make PDF smaller"
      canonicalPath="/compress-pdf"
      heroHeading="Make PDFs smaller online"
      heroSubheading="Compress PDFs for free in your browser. Reduce file size while keeping text and images clear. No upload, no registration, no watermark."
      benefits={[
        'Reduce PDF file size quickly',
        'Keep text and images intact',
        'See before and after file sizes',
        'No upload to servers — compress locally in your browser',
        'No registration, no watermark',
      ]}
      faq={faq}
      toolId="compress"
      onStart={() => setIsActive(true)}
      isActive={isActive}
      toolInterface={
        isActive ? (
          <PdfCompressTool onBack={() => setIsActive(false)} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">Upload a PDF and reduce its file size instantly.</p>
            <button
              onClick={() => setIsActive(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Compress PDF Now
            </button>
          </div>
        )
      }
    />
  );
}
