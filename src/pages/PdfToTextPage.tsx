import { useState } from 'react';
import { PdfToTextTool } from '../components/PdfToTextTool';
import { ToolPage } from '../components/ToolPage';

const faq = [
  {
    question: 'How do I extract text from a PDF?',
    answer: 'Upload your PDF and the tool will automatically extract all readable text. You can copy it or download it as a .txt file.',
  },
  {
    question: 'Can I extract text from scanned PDFs?',
    answer: 'This tool extracts embedded text. Scanned PDFs without OCR will not contain extractable text.',
  },
  {
    question: 'Is my PDF uploaded to a server?',
    answer: 'No. Text extraction happens locally in your browser using PDF.js. Your PDF stays on your device.',
  },
  {
    question: 'What format is the extracted text?',
    answer: 'The output is plain text. Page breaks are marked with --- Page N --- separators.',
  },
  {
    question: 'Is the PDF to Text tool free?',
    answer: 'Yes. The tool is free and does not require an account or watermark.',
  },
];

export function PdfToTextPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToolPage
      shortTitle="PDF to Text"
      metaTitle="PDF to Text Online Free - Extract Text from PDF"
      metaDescription="Extract text from PDFs online for free. Convert PDF to plain text in your browser. No upload, no signup, no watermark."
      metaKeywords="PDF to text, extract text from PDF, PDF text extractor, convert PDF to text, free PDF to text, online PDF text extraction"
      canonicalPath="/pdf-to-text"
      heroHeading="Extract text from PDFs"
      heroSubheading="Convert any PDF to plain text for free. Extract readable text, copy it to your clipboard, or download as a .txt file in seconds."
      benefits={[
        'Extract text from every PDF page',
        'Copy text directly to your clipboard',
        'Download extracted text as a .txt file',
        'No upload to servers — extract locally in your browser',
        'No registration, no watermark',
      ]}
      faq={faq}
      toolId="editor"
      onStart={() => setIsActive(true)}
      isActive={isActive}
      toolInterface={
        isActive ? (
          <PdfToTextTool onBack={() => setIsActive(false)} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">Upload a PDF and extract its text instantly.</p>
            <button
              onClick={() => setIsActive(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Extract PDF Text
            </button>
          </div>
        )
      }
    />
  );
}
