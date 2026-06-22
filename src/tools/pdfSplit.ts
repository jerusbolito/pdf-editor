import { PDFDocument } from 'pdf-lib';

export async function splitPdf(file: File, pageRanges: number[][]): Promise<{ filename: string; data: Uint8Array }[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const results: { filename: string; data: Uint8Array }[] = [];

  for (const range of pageRanges) {
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdf, range);
    pages.forEach((page) => newPdf.addPage(page));
    const pdfBytes = await newPdf.save();
    const filename = range.length === 1
      ? `${file.name.replace('.pdf', '')}-page-${range[0] + 1}.pdf`
      : `${file.name.replace('.pdf', '')}-pages-${range[0] + 1}-${range[range.length - 1] + 1}.pdf`;
    results.push({ filename, data: pdfBytes });
  }

  return results;
}
