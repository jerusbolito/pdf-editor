import { PDFDocument } from 'pdf-lib';

export async function unlockPdf(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  return pdf.save({
    updateFieldAppearances: false,
  });
}
