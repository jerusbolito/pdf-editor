import { PDFDocument } from 'pdf-lib';

export async function compressPdf(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer, { updateMetadata: false });

  const compressed = await pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  return compressed;
}
