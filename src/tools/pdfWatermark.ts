import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';

export interface WatermarkOptions {
  text: string;
  fontSize: number;
  color: { r: number; g: number; b: number };
  opacity: number;
  rotation: number;
  pages: 'all' | 'first' | 'last';
}

export interface PageNumberOptions {
  enabled: boolean;
  startFrom: number;
  position: 'bottom-center' | 'bottom-left' | 'bottom-right';
  fontSize: number;
  color: { r: number; g: number; b: number };
}

export async function addWatermarkAndPageNumbers(
  file: File,
  watermark: WatermarkOptions,
  pageNumbers: PageNumberOptions,
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  pages.forEach((page, index) => {
    const { width, height } = page.getSize();

    if (watermark.text) {
      const shouldAddWatermark =
        watermark.pages === 'all' ||
        (watermark.pages === 'first' && index === 0) ||
        (watermark.pages === 'last' && index === pages.length - 1);

      if (shouldAddWatermark) {
        const textWidth = font.widthOfTextAtSize(watermark.text, watermark.fontSize);
        const x = (width - textWidth) / 2;
        const y = height / 2;
        page.drawText(watermark.text, {
          x,
          y,
          size: watermark.fontSize,
          font,
          color: rgb(watermark.color.r, watermark.color.g, watermark.color.b),
          rotate: degrees(watermark.rotation),
          opacity: watermark.opacity,
        });
      }
    }

    if (pageNumbers.enabled) {
      const pageNumber = `${pageNumbers.startFrom + index}`;
      const textWidth = font.widthOfTextAtSize(pageNumber, pageNumbers.fontSize);
      const margin = 24;
      let x = margin;
      const y = margin;

      if (pageNumbers.position === 'bottom-center') {
        x = (width - textWidth) / 2;
      } else if (pageNumbers.position === 'bottom-right') {
        x = width - textWidth - margin;
      }

      page.drawText(pageNumber, {
        x,
        y,
        size: pageNumbers.fontSize,
        font,
        color: rgb(pageNumbers.color.r, pageNumbers.color.g, pageNumbers.color.b),
      });
    }
  });

  return pdf.save();
}
