import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
}

const SITE_NAME = 'MyPDFSigner';
const BASE_URL = 'https://mypdfsigner.net';

export function Seo({ title, description, canonicalPath, keywords }: SeoProps) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', nameOrProperty);
        } else {
          meta.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMeta('description', description);
    if (keywords) setMeta('keywords', keywords);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);

    if (canonicalPath) {
      const canonicalUrl = `${BASE_URL}${canonicalPath}`;
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
      setMeta('og:url', canonicalUrl, true);
    }
  }, [title, description, canonicalPath, keywords]);

  return null;
}
