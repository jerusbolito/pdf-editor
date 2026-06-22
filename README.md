# PDF Editor

A free, client-side, mobile-friendly PDF editor built with React, Vite, PDF.js, and PDF-lib. Everything runs in the browser — no PDFs or data are uploaded to a server.

## Features

- Open PDF files from your device
- Add signatures, text, dates, checkboxes, and image stamps
- Drag to position annotations
- Undo/redo
- Zoom in/out
- Download the edited PDF
- Mobile-friendly responsive layout

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- pdfjs-dist (PDF rendering)
- pdf-lib (PDF manipulation)
- lucide-react (icons)

## Getting Started

`ash
npm install
npm run dev
`

Then open http://localhost:5173.

## Build for Production

`ash
npm run build
`

The dist folder can be deployed to any static host. Because the app uses `react-router-dom` with `BrowserRouter`, configure your host to serve `index.html` for all routes:

- **Netlify**: `public/_redirects` is included.
- **Vercel**: `public/vercel.json` is included.
- **Cloudflare Pages**: enable SPA fallback in the Pages settings.
- **GitHub Pages**: either enable hash-based routing or configure a `404.html` fallback.

## Pages & SEO

Each tool has a dedicated, SEO-optimized landing page:

- `/` — homepage
- `/edit-pdf` — PDF editor
- `/merge-pdf` — merge PDFs
- `/split-pdf` — split PDFs
- `/compress-pdf` — compress PDFs
- `/images-to-pdf` — convert images to PDF

Page titles, descriptions, and canonical URLs are updated at runtime via `src/components/Seo.tsx`. FAQ sections on each page include schema.org `FAQPage` JSON-LD markup.

## Customization

### Add or remove tools

Tools are registered in src/tools/toolRegistry.ts. Each tool is a plain object with an icon, cursor, render component, and an optional page-click handler.

To disable a tool, remove it from the llTools array. To add a new tool, create a file in src/tools/, implement the Tool interface, and import it into the registry.

### Theme

Colors and spacing live in CSS variables in src/index.css. Edit the :root block to change the look.

## Privacy

All PDF processing happens locally in your browser. The original PDF bytes, annotations, and exported PDF never leave the device.
