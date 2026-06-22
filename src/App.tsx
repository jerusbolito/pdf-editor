import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EditPdfPage } from './pages/EditPdfPage';
import { MergePdfPage } from './pages/MergePdfPage';
import { SplitPdfPage } from './pages/SplitPdfPage';
import { CompressPdfPage } from './pages/CompressPdfPage';
import { ImagesToPdfPage } from './pages/ImagesToPdfPage';
import { PdfToImagesPage } from './pages/PdfToImagesPage';
import { PdfOrganizePage } from './pages/PdfOrganizePage';
import { PdfPasswordPage } from './pages/PdfPasswordPage';
import { PdfWatermarkPage } from './pages/PdfWatermarkPage';
import { PdfToTextPage } from './pages/PdfToTextPage';
import { ChangelogPage } from './pages/ChangelogPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/edit-pdf" element={<EditPdfPage />} />
      <Route path="/merge-pdf" element={<MergePdfPage />} />
      <Route path="/split-pdf" element={<SplitPdfPage />} />
      <Route path="/compress-pdf" element={<CompressPdfPage />} />
      <Route path="/images-to-pdf" element={<ImagesToPdfPage />} />
      <Route path="/pdf-to-images" element={<PdfToImagesPage />} />
      <Route path="/organize-pdf" element={<PdfOrganizePage />} />
      <Route path="/unlock-pdf" element={<PdfPasswordPage />} />
      <Route path="/watermark-pdf" element={<PdfWatermarkPage />} />
      <Route path="/pdf-to-text" element={<PdfToTextPage />} />
      <Route path="/changelog" element={<ChangelogPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
