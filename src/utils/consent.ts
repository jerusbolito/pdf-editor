export type Consent = 'granted' | 'denied' | 'pending';

const STORAGE_KEY = 'pdf-editor-cookie-consent';

export function getStoredConsent(): Consent {
  if (typeof window === 'undefined') return 'pending';
  return (localStorage.getItem(STORAGE_KEY) as Consent) || 'pending';
}

export function setStoredConsent(consent: Consent) {
  localStorage.setItem(STORAGE_KEY, consent);
}
