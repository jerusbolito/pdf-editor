import * as pdfjs from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

console.log('[pdf] worker url:', pdfWorkerUrl);
const worker = new window.Worker(pdfWorkerUrl, { type: 'module' });
worker.onerror = (e) => console.error('[pdf] worker error:', e);
worker.onmessageerror = (e) => console.error('[pdf] worker message error:', e);
pdfjs.GlobalWorkerOptions.workerPort = worker;

export { pdfjs };
export default pdfjs;
