const STORAGE_KEY = 'mypdfsigner-signatures';

export interface SavedSignature {
  id: string;
  name: string;
  dataUrl: string;
  createdAt: number;
}

export function getSavedSignatures(): SavedSignature[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as SavedSignature[]) : [];
  } catch {
    return [];
  }
}

export function saveSignature(name: string, dataUrl: string): SavedSignature {
  const signatures = getSavedSignatures();
  const signature: SavedSignature = {
    id: crypto.randomUUID(),
    name,
    dataUrl,
    createdAt: Date.now(),
  };
  const next = [signature, ...signatures].slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return signature;
}

export function deleteSignature(id: string) {
  const signatures = getSavedSignatures().filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(signatures));
}
