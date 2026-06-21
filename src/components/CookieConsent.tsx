import { useEffect, useState } from 'react';
import { getStoredConsent, setStoredConsent, type Consent } from '../utils/consent';

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>('pending');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setConsent(getStoredConsent());
  }, []);

  const handleDecision = (value: Consent) => {
    setStoredConsent(value);
    setConsent(value);
  };

  if (consent !== 'pending') return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-lg border border-gray-200 bg-white p-4 shadow-lg sm:bottom-6 sm:left-6 sm:right-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 text-sm text-gray-700">
          <p className="font-semibold text-gray-900">We value your privacy</p>
          <p className="mt-1">
            This site uses cookies to analyze traffic and improve your experience. You can accept or decline tracking cookies.
          </p>
          {showDetails && (
            <p className="mt-2 text-xs text-gray-500">
              Essential cookies are always active. Analytics cookies help us understand how visitors use the editor. We do not store or process your PDFs on our servers.
            </p>
          )}
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="h-9 rounded px-3 text-sm text-gray-600 hover:bg-gray-100"
          >
            {showDetails ? 'Less' : 'Details'}
          </button>
          <button
            onClick={() => handleDecision('denied')}
            className="h-9 rounded border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Decline
          </button>
          <button
            onClick={() => handleDecision('granted')}
            className="h-9 rounded bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
