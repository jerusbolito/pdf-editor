import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
}

export function useSeo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    return () => {
      // Cleanup - restore default SEO when component unmounts
      document.title = 'MyPDFSigner | Free PDF Tools Online';
      if (metaDescription) {
        metaDescription.setAttribute('content', 'MyPDFSigner is a free online PDF tools suite. Sign, fill, edit, merge, split, compress PDFs and convert images to PDF in your browser. No upload to servers, privacy-first.');
      }
    };
  }, [title, description]);
}
