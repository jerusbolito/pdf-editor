import { useState } from 'react';
import { PdfMergeTool } from '../components/PdfMergeTool';
import { ToolPage } from '../components/ToolPage';

const faq = [
  {
    question: 'How do I merge PDFs online for free?',
    answer: 'Upload two or more PDFs, arrange them in the order you want, and click Merge. Download the combined PDF instantly.',
  },
  {
    question: 'Is there a file size or page limit?',
    answer: 'Because everything is processed in your browser, the limit depends on your device memory. Most users can merge PDFs with dozens of pages.',
  },
  {
    question: 'Are merged PDFs uploaded to a server?',
    answer: 'No. PDFs are combined locally using PDF-lib. Your files never leave your device.',
  },
  {
    question: 'Can I rearrange the order before merging?',
    answer: 'Yes. Drag and drop the uploaded files into the order you want before merging.',
  },
  {
    question: 'Is MyPDFSigner merge tool free?',
    answer: 'Yes. The PDF merger is completely free and does not require an account.',
  },
];

export function MergePdfPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToolPage
      shortTitle="PDF Merge"
      metaTitle="Merge PDFs Online Free - Combine PDF Files Instantly"
      metaDescription="Combine multiple PDF files into one online for free. Merge PDFs in your browser with no upload, no signup, and no watermarks."
      metaKeywords="merge PDF online, combine PDF files, free PDF merger, join PDFs, merge PDF without upload, PDF combiner online"
      canonicalPath="/merge-pdf"
      heroHeading="Combine PDFs into one file"
      heroSubheading="Merge multiple PDFs online for free. Upload your files, arrange them in the right order, and download the combined PDF in seconds."
      benefits={[
        'Merge unlimited PDFs for free',
        'Drag and drop to reorder files before merging',
        'No upload to servers — merge locally in your browser',
        'No registration, no watermark',
        'Works on desktop and mobile browsers',
      ]}
      faq={faq}
      toolId="merge"
      onStart={() => setIsActive(true)}
      isActive={isActive}
      toolInterface={
        isActive ? (
          <PdfMergeTool onBack={() => setIsActive(false)} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">Upload two or more PDFs and combine them into one.</p>
            <button
              onClick={() => setIsActive(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Start Merging PDFs
            </button>
          </div>
        )
      }
    />
  );
}
