/* eslint-disable react-refresh/only-export-components */
import { Image as ImageIcon } from 'lucide-react';
import type { Annotation, AnnotationRenderProps, Tool } from '../types';

function ImageAnnotation({ annotation }: AnnotationRenderProps) {
  const src = annotation.payload.image;
  if (!src) return null;
  return (
    <img
      src={src}
      alt="Stamp"
      draggable={false}
      className="pointer-events-none block h-full w-full select-none object-contain"
    />
  );
}

export const imageTool: Tool = {
  id: 'image',
  label: 'Image',
  icon: ImageIcon,
  cursor: 'crosshair',
  render: ImageAnnotation,
};

export async function createImageAnnotation(
  file: File,
  pageIndex: number,
  x: number,
  y: number,
): Promise<Annotation> {
  const dataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const maxWidth = 200;
      const scale = Math.min(1, maxWidth / img.naturalWidth);
      const width = img.naturalWidth * scale;
      const height = img.naturalHeight * scale;
      resolve({
        id: '',
        type: 'image',
        page: pageIndex,
        x,
        y,
        width,
        height,
        payload: { image: dataUrl },
      });
    };
    img.src = dataUrl;
  });
}

export async function makeBackgroundTransparent(dataUrl: string, tolerance = 30): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i] >= 255 - tolerance && data[i + 1] >= 255 - tolerance && data[i + 2] >= 255 - tolerance) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = dataUrl;
  });
}
