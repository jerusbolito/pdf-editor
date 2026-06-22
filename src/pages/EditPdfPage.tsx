import { useState } from 'react';
import { EditorApp } from '../EditorApp';
import { ToolPage } from '../components/ToolPage';

const faq = [
  {
    question: 'Is MyPDFSigner PDF editor free?',
    answer: 'Yes. You can sign, edit, fill, and annotate PDFs without paying or creating an account.',
  },
  {
    question: 'Do my PDFs get uploaded to your servers?',
    answer: 'No. All processing happens in your browser using PDF.js and PDF-lib. Your files stay on your device.',
  },
  {
    question: 'What annotations can I add?',
    answer: 'You can add signatures, text boxes, dates, checkboxes, and image stamps. Everything is draggable and resizable.',
  },
  {
    question: 'Can I use this on my phone?',
    answer: 'Yes. The editor is responsive and works on iOS, Android, and desktop browsers.',
  },
  {
    question: 'How do I download the edited PDF?',
    answer: 'After editing, click the green Download button in the toolbar. The file is saved directly to your device.',
  },
];

export function EditPdfPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToolPage
      shortTitle="PDF Editor"
      metaTitle="Free PDF Editor Online - Sign, Fill & Annotate PDFs"
      metaDescription="Edit PDFs for free in your browser. Sign, fill forms, add text, dates, checkboxes, and images. No upload, no signup, no watermark."
      metaKeywords="free PDF editor, edit PDF online, sign PDF online, fill PDF form, annotate PDF, PDF signer online, no upload PDF editor"
      canonicalPath="/edit-pdf"
      heroHeading="Edit PDFs online for free"
      heroSubheading="Sign, fill, and annotate PDFs directly in your browser. No uploads, no registration, no watermarks — just open your file and start editing."
      benefits={[
        'Add signatures, text, dates, checkboxes, and images',
        'Drag and drop annotations anywhere on the page',
        'Undo, redo, zoom, and resize with ease',
        'Download your edited PDF in seconds',
        '100% client-side: your files never leave your device',
      ]}
      faq={faq}
      toolId="editor"
      onStart={() => setIsActive(true)}
      isActive={isActive}
      toolInterface={
        isActive ? (
          <EditorApp onBackToHome={() => setIsActive(false)} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">Open your PDF and start adding annotations in seconds.</p>
            <button
              onClick={() => setIsActive(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Open PDF Editor
            </button>
          </div>
        )
      }
    />
  );
}
