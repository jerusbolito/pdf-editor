import type { Annotation, PageInfo } from '../types';

export function cssToPdf(
  cssX: number,
  cssY: number,
  _pageInfo: PageInfo,
  scale: number,
  width: number,
  height: number,
): Pick<Annotation, 'x' | 'y' | 'width' | 'height'> {
  const pdfX = cssX / scale;
  const pdfY = cssY / scale;
  return {
    x: pdfX,
    y: pdfY,
    width: width / scale,
    height: height / scale,
  };
}

export function pdfToCss(
  annotation: Pick<Annotation, 'x' | 'y' | 'width' | 'height'>,
  _pageInfo: PageInfo,
  scale: number,
) {
  return {
    x: annotation.x * scale,
    y: annotation.y * scale,
    width: annotation.width * scale,
    height: annotation.height * scale,
  };
}

export function getPointerPos(
  e: React.PointerEvent,
  container: HTMLElement,
  scale: number,
): { x: number; y: number } {
  const rect = container.getBoundingClientRect();
  const x = (e.clientX - rect.left) / scale;
  const y = (e.clientY - rect.top) / scale;
  return { x, y };
}
