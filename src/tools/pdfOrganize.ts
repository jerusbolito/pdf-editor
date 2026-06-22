import { PDFDocument, degrees } from 'pdf-lib';

export type Rotation = 0 | 90 | 180 | 270;

export interface PageOperation {
  index: number;
  rotation: Rotation;
  deleted: boolean;
}

export async function organizePdf(
  file: File,
  operations: PageOperation[],
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  const newPdf = await PDFDocument.create();
  const activeOps = operations.filter((op) => !op.deleted);
  const pageIndices = activeOps.map((op) => op.index);
  const copied = await newPdf.copyPages(pdf, pageIndices);

  for (let i = 0; i < copied.length; i++) {
    const page = copied[i];
    const rotation = activeOps[i].rotation;
    if (rotation !== 0) {
      page.setRotation(degrees(rotation));
    }
    newPdf.addPage(page);
  }

  return newPdf.save();
}

export function rotatePage(rotation: Rotation): Rotation {
  return ((rotation + 90) % 360) as Rotation;
}
