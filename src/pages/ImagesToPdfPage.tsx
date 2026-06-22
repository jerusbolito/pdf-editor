import { useState } from 'react';
import { ImagesToPdfTool } from '../components/ImagesToPdfTool';
import { ToolPage } from '../components/ToolPage';

const faq = [
  {
    question: 'How do I convert images to PDF online?',
    answer: 'Upload JPG or PNG images, arrange them in the desired order, and click Convert. The tool creates a single PDF with one page per image.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'MyPDFSigner supports JPG, JPEG, and PNG images. Each image becomes a page in the output PDF.',
  },
  {
    question: 'Are my images uploaded to a server?',
    answer: 'No. Images are converted to PDF locally in your browser using PDF-lib. Your images stay private.',
  },
  {
    question: 'Can I rearrange images before converting?',
    answer: 'Yes. Drag and drop the uploaded images to change the page order in the final PDF.',
  },
  {
    question: 'Is the images-to-PDF converter free?',
    answer: 'Yes. The tool is free and does not require an account or watermark.',
  },
];

export function ImagesToPdfPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToolPage
      shortTitle="Images to PDF"
      metaTitle="Images to PDF Online Free - Convert JPG/PNG to PDF"
      metaDescription="Convert JPG and PNG images to PDF online for free. Combine images into one PDF in your browser. No upload, no signup, no watermark."
      metaKeywords="images to PDF online, convert JPG to PDF, PNG to PDF, combine images to PDF, free image to PDF converter, make PDF from images"
      canonicalPath="/images-to-pdf"
      heroHeading="Convert images to PDF online"
      heroSubheading="Turn JPG and PNG images into a single PDF for free. Upload images, reorder them, and download your PDF in seconds. No upload, no watermark."
      benefits={[
        'Convert JPG and PNG images to PDF',
        'Reorder images before converting',
        'One image per page in the output PDF',
        'No upload to servers — convert locally in your browser',
        'No registration, no watermark',
      ]}
      faq={faq}
      toolId="images-to-pdf"
      onStart={() => setIsActive(true)}
      isActive={isActive}
      toolInterface={
        isActive ? (
          <ImagesToPdfTool onBack={() => setIsActive(false)} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">Upload images and turn them into a single PDF.</p>
            <button
              onClick={() => setIsActive(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Convert Images to PDF
            </button>
          </div>
        )
      }
    />
  );
}
