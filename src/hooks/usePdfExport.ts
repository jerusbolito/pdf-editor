import { useState, useCallback } from 'react';
import { exportAnnotations } from '../utils/pdfExport';
import type { Annotation } from '../types';

export function usePdfExport(fileName: string, source: Uint8Array | null, annotations: Annotation[]) {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = useCallback(async () => {
    if (!source) return;
    setExporting(true);
    setError(null);
    try {
      console.log('[pdf export] source length:', source.length, 'header:', source.slice(0, 8));
      const bytes = await exportAnnotations(source, annotations);
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.replace(/\.pdf$/i, '') + '-signed.pdf';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 200);
    } catch (err) {
      console.error('PDF export failed:', err);
      setError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setExporting(false);
    }
  }, [source, annotations, fileName]);

  return { exporting, error, download };
}
