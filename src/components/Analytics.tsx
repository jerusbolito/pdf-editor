import { useEffect } from 'react';
import { getStoredConsent } from '../utils/consent';

const GA_MEASUREMENT_ID = 'G-PKH81BV7LX';

export function Analytics() {
  useEffect(() => {
    if (getStoredConsent() !== 'granted') return;

    const existing = document.getElementById('ga-script');
    if (existing) return;

    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    const inline = document.createElement('script');
    inline.id = 'ga-inline';
    inline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
    `;
    document.head.appendChild(inline);
  }, []);

  return null;
}
