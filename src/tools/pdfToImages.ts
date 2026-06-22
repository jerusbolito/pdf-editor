import { pdfjs } from '../utils/pdfWorker';

export type ImageFormat = 'png' | 'jpeg';

export interface PdfImage {
  pageNumber: number;
  dataUrl: string;
  blob: Blob;
  width: number;
  height: number;
}

export async function pdfToImages(
  file: File,
  format: ImageFormat = 'png',
  scale: number = 2,
): Promise<PdfImage[]> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data: bytes }).promise;
  const images: PdfImage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2d context');

    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, 0.92);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error('Failed to create image blob'));
        },
        mimeType,
        0.92,
      );
    });

    images.push({
      pageNumber: i,
      dataUrl,
      blob,
      width: canvas.width,
      height: canvas.height,
    });
  }

  return images;
}

export function downloadImage(image: PdfImage, fileName: string) {
  const url = URL.createObjectURL(image.blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
