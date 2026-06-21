import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { Annotation } from '../types';

function hexToRgb(color: string = '#000000') {
  const c = color.replace('#', '');
  const bigint = parseInt(c, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
}

async function dataUrlToBytes(dataUrl: string): Promise<Uint8Array> {
  const res = await fetch(dataUrl);
  return new Uint8Array(await res.arrayBuffer());
}

export async function exportAnnotations(
  sourceBytes: Uint8Array,
  annotations: Annotation[],
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(sourceBytes);
  const pdfPages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Pre-load images
  const imageCache = new Map<string, ReturnType<PDFDocument['embedPng']> | ReturnType<PDFDocument['embedJpg']>>();

  for (const annotation of annotations) {
    const page = pdfPages[annotation.page];
    if (!page) continue;

    const { height } = page.getSize();
    const pdfX = annotation.x;
    const pdfY = height - annotation.y - annotation.height;

    switch (annotation.type) {
      case 'signature':
      case 'image': {
        const dataUrl = annotation.payload.signature || annotation.payload.image;
        if (!dataUrl) continue;
        let image = imageCache.get(dataUrl);
        if (!image) {
          const bytes = await dataUrlToBytes(dataUrl);
          if (dataUrl.startsWith('data:image/png')) {
            image = pdfDoc.embedPng(bytes);
          } else {
            image = pdfDoc.embedJpg(bytes);
          }
          imageCache.set(dataUrl, image);
        }
        const img = await image;
        page.drawImage(img, {
          x: pdfX,
          y: pdfY,
          width: annotation.width,
          height: annotation.height,
        });
        break;
      }
      case 'text':
      case 'date': {
        const text = annotation.payload.text ?? '';
        const size = annotation.payload.fontSize ?? 12;
        const color = hexToRgb(annotation.payload.color ?? '#000000');
        page.drawText(text, {
          x: pdfX,
          y: pdfY + annotation.height - size,
          size,
          font,
          color: rgb(color.r, color.g, color.b),
        });
        break;
      }
      case 'checkbox': {
        const checked = annotation.payload.checked ?? false;
        const size = Math.min(annotation.width, annotation.height);
        page.drawRectangle({
          x: pdfX,
          y: pdfY,
          width: size,
          height: size,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
          color: rgb(1, 1, 1),
        });
        if (checked) {
          page.drawText('✓', {
            x: pdfX + size * 0.15,
            y: pdfY + size * 0.15,
            size: size * 0.8,
            font,
          });
        }
        break;
      }
    }
  }

  return await pdfDoc.save();
}
