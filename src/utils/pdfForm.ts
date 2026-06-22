import { PDFDocument } from 'pdf-lib';

export interface PdfFormInfo {
  hasForm: boolean;
  fieldCount: number;
}

export async function detectFormInfo(file: File): Promise<PdfFormInfo> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  try {
    const form = pdf.getForm();
    const fields = form.getFields();
    return {
      hasForm: fields.length > 0,
      fieldCount: fields.length,
    };
  } catch {
    return { hasForm: false, fieldCount: 0 };
  }
}
