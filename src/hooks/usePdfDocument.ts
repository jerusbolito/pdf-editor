import { useState, useCallback } from 'react';
import * as pdfjs from 'pdfjs-dist';
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';
import type { PageInfo } from '../types';

console.log('[pdf] worker url:', pdfWorkerUrl);
const worker = new window.Worker(pdfWorkerUrl, { type: 'module' });
worker.onerror = (e) => console.error('[pdf] worker error:', e);
worker.onmessageerror = (e) => console.error('[pdf] worker message error:', e);
pdfjs.GlobalWorkerOptions.workerPort = worker;

export interface PdfDocumentState {
  pdf: PDFDocumentProxy | null;
  pages: PDFPageProxy[];
  infos: PageInfo[];
  source: Uint8Array | null;
  fileName: string;
  loading: boolean;
  error: string | null;
}

export function usePdfDocument() {
  const [state, setState] = useState<PdfDocumentState>({
    pdf: null,
    pages: [],
    infos: [],
    source: null,
    fileName: '',
    loading: false,
    error: null,
  });

  const loadFile = useCallback(async (file: File) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(bytes) }).promise;
      const pages: PDFPageProxy[] = [];
      const infos: PageInfo[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1 });
        pages.push(page);
        infos.push({
          width: viewport.width,
          height: viewport.height,
          rotation: viewport.rotation,
        });
      }
      setState({
        pdf,
        pages,
        infos,
        source: bytes,
        fileName: file.name,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load PDF',
      }));
    }
  }, []);

  const unload = useCallback(() => {
    setState({
      pdf: null,
      pages: [],
      infos: [],
      source: null,
      fileName: '',
      loading: false,
      error: null,
    });
  }, []);

  return { ...state, loadFile, unload };
}
