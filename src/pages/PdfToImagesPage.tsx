import { useState } from 'react';
import { PdfToImagesTool } from '../components/PdfToImagesTool';
import { ToolPage } from '../components/ToolPage';

const faq = [
  {
    question: 'How do I convert PDF pages to images?',
    answer: 'Upload a PDF, choose PNG or JPEG, select the quality, and click Convert. Each page becomes a separate image you can preview and download.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'You can convert PDF pages to PNG or JPEG images.',
  },
  {
    question: 'Is my PDF uploaded to a server?',
    answer: 'No. Conversion happens locally in your browser using PDF.js. Your PDF stays on your device.',
  },
  {
    question: 'Can I download all pages at once?',
    answer: 'Yes. After conversion, click Download All to save every page as an image.',
  },
  {
    question: 'Is the PDF to Images converter free?',
    answer: 'Yes. The tool is free and does not require an account or watermark.',
  },
];

export function PdfToImagesPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToolPage
      shortTitle="PDF to Images"
      metaTitle="PDF to Images Online Free - Convert PDF Pages to JPG/PNG"
      metaDescription="Convert PDF pages to JPG or PNG images online for free. Extract every page as an image in your browser. No upload, no signup, no watermark."
      metaKeywords="PDF to images, PDF to JPG, PDF to PNG, convert PDF pages to images, free PDF image extractor, export PDF pages as images"
      canonicalPath="/pdf-to-images"
      heroHeading="Convert PDF pages to images"
      heroSubheading="Turn every page of a PDF into a JPG or PNG image for free. Choose the quality, preview results, and download in seconds. No upload, no watermark."
      benefits={[
        'Convert PDF pages to PNG or JPEG',
        'Choose image quality (1x, 2x, 3x)',
        'Download all pages at once or one by one',
        'No upload to servers — convert locally in your browser',
        'No registration, no watermark',
      ]}
      faq={faq}
      toolId="editor"
      onStart={() => setIsActive(true)}
      isActive={isActive}
      toolInterface={
        isActive ? (
          <PdfToImagesTool onBack={() => setIsActive(false)} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">Upload a PDF and convert each page to an image.</p>
            <button
              onClick={() => setIsActive(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Convert PDF to Images
            </button>
          </div>
        )
      }
    />
  );
}
