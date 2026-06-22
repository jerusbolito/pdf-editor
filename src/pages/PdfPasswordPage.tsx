import { useState } from 'react';
import { PdfPasswordTool } from '../components/PdfPasswordTool';
import { ToolPage } from '../components/ToolPage';

const faq = [
  {
    question: 'How do I unlock a PDF online?',
    answer: 'Upload the PDF, enter the password if you have one, and click Unlock. The tool will remove the password and download the unlocked PDF.',
  },
  {
    question: 'Can I unlock a PDF without the password?',
    answer: 'This tool attempts to remove owner-password restrictions. If the PDF is protected with a strong user password, you will need to provide it.',
  },
  {
    question: 'Is my PDF uploaded to a server?',
    answer: 'No. Unlocking happens locally in your browser. Your PDF stays on your device.',
  },
  {
    question: 'Can I add a password to a PDF?',
    answer: 'Full password protection is not yet available because the current PDF library does not support encryption. We will add it as soon as the library supports it.',
  },
  {
    question: 'Is the PDF unlock tool free?',
    answer: 'Yes. The tool is free and does not require an account.',
  },
];

export function PdfPasswordPage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <ToolPage
      shortTitle="Unlock PDF"
      metaTitle="Unlock PDF Online Free - Remove Password Restrictions"
      metaDescription="Remove PDF password restrictions online for free. Unlock PDFs in your browser without uploading to servers. No signup, no watermark."
      metaKeywords="unlock PDF online, remove PDF password, PDF password remover, free PDF unlock, unlock PDF without upload, PDF decryption online"
      canonicalPath="/unlock-pdf"
      heroHeading="Unlock PDFs online"
      heroSubheading="Remove password restrictions from PDFs for free. Enter the password if needed, and download the unlocked PDF in seconds. No upload, no watermark."
      benefits={[
        'Remove owner-password restrictions',
        'Optionally enter a user password',
        'Download the unlocked PDF instantly',
        'No upload to servers — unlock locally in your browser',
        'No registration, no watermark',
      ]}
      faq={faq}
      toolId="editor"
      onStart={() => setIsActive(true)}
      isActive={isActive}
      toolInterface={
        isActive ? (
          <PdfPasswordTool onBack={() => setIsActive(false)} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-4 text-center">
            <p className="text-gray-600">Upload a password-protected PDF and remove its restrictions.</p>
            <button
              onClick={() => setIsActive(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Unlock PDF
            </button>
          </div>
        )
      }
    />
  );
}
