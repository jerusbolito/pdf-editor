import { useState, useRef, useEffect } from 'react';
import { FileUp } from 'lucide-react';
import { usePdfDocument } from './hooks/usePdfDocument';
import { useAnnotations } from './hooks/useAnnotations';
import { usePdfExport } from './hooks/usePdfExport';
import { PdfViewer } from './components/PdfViewer';
import { Toolbar } from './components/Toolbar';
import { SignaturePad } from './components/SignaturePad';
import { PageMenu } from './components/PageMenu';
import { AnnotationPopup } from './components/AnnotationPopup';
import { CookieConsent } from './components/CookieConsent';
import { Analytics } from './components/Analytics';
import { HelpPanel } from './components/HelpPanel';
import { Toast } from './components/Toast';
import { HomePage } from './components/HomePage';
import { PdfMergeTool } from './components/PdfMergeTool';
import { PdfSplitTool } from './components/PdfSplitTool';
import { PdfCompressTool } from './components/PdfCompressTool';
import { ImagesToPdfTool } from './components/ImagesToPdfTool';
import { allTools } from './tools/toolRegistry';
import { createSignatureAnnotation } from './tools/signatureTool';
import { createImageAnnotation, makeBackgroundTransparent } from './tools/imageTool';
import type { Tool } from './types';

function App() {
  const { pages, infos, source, fileName, loading, error, loadFile } = usePdfDocument();
  const { annotations, addAnnotation, updateAnnotation, deleteAnnotation, undo, redo, canUndo, canRedo, clear } =
    useAnnotations();
  const { download } = usePdfExport(fileName, source, annotations);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scale, setScale] = useState(1.5);
  const [signaturePending, setSignaturePending] = useState<{ pageIndex: number; x: number; y: number } | null>(null);
  const [pageMenu, setPageMenu] = useState<{ pageIndex: number; x: number; y: number; clientX: number; clientY: number } | null>(null);
  const [annotationMenu, setAnnotationMenu] = useState<{ id: string; clientX: number; clientY: number } | null>(null);
  const [imagePending, setImagePending] = useState<{ pageIndex: number; x: number; y: number } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [toast, setToast] = useState<{ message: string } | null>(null);
  const [currentTool, setCurrentTool] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => fileInputRef.current?.click();

  const handleBackToHome = () => {
    setCurrentTool(null);
    clear();
    setSelectedId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    clear();
    setSelectedId(null);
    loadFile(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      clear();
      setSelectedId(null);
      loadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSignatureDone = (dataUrl: string) => {
    if (!signaturePending) return;
    addAnnotation(createSignatureAnnotation(dataUrl, signaturePending.pageIndex, signaturePending.x, signaturePending.y));
    setSignaturePending(null);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || infos.length === 0) {
      setImagePending(null);
      return;
    }
    const pageIndex = imagePending?.pageIndex ?? 0;
    const pageInfo = infos[pageIndex];
    const x = imagePending?.x ?? (pageInfo.width - 200) / 2;
    const y = imagePending?.y ?? (pageInfo.height - 200) / 2;
    const annotation = await createImageAnnotation(file, pageIndex, x, y);
    addAnnotation(annotation);
    setImagePending(null);
    e.target.value = '';
  };

  const handleDelete = () => {
    if (selectedId) {
      deleteAnnotation(selectedId);
      setSelectedId(null);
      setToast({ message: 'Annotation deleted' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Delete' && selectedId) {
        e.preventDefault();
        handleDelete();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
          setToast({ message: 'Redone' });
        } else {
          undo();
          setToast({ message: 'Undone' });
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
        setToast({ message: 'Redone' });
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        handleUpload();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, undo, redo, handleDelete]);

  const handleShowPageMenu = (pageIndex: number, x: number, y: number, clientX: number, clientY: number) => {
    setPageMenu({ pageIndex, x, y, clientX, clientY });
  };

  const handleShowAnnotationMenu = (id: string, clientX: number, clientY: number) => {
    setSelectedId(id);
    setAnnotationMenu({ id, clientX, clientY });
  };

  const handlePageMenuSelect = (tool: Tool) => {
    if (!pageMenu) return;
    const { pageIndex, x, y } = pageMenu;
    setPageMenu(null);
    if (tool.id === 'signature') {
      setSignaturePending({ pageIndex, x, y });
    } else if (tool.id === 'image') {
      setImagePending({ pageIndex, x, y });
      imageInputRef.current?.click();
    } else if (tool.id === 'text') {
      addAnnotation({ type: 'text', page: pageIndex, x, y, width: 120, height: 24, payload: { text: 'Text', fontSize: 14, color: '#000000' } });
    } else if (tool.id === 'date') {
      addAnnotation({ type: 'date', page: pageIndex, x, y, width: 120, height: 24, payload: { text: new Date().toLocaleDateString(), fontSize: 14, color: '#000000' } });
    } else if (tool.id === 'checkbox') {
      addAnnotation({ type: 'checkbox', page: pageIndex, x, y, width: 20, height: 20, payload: { checked: false } });
    }
  };

  const handleAnnotationMenuDelete = (id: string) => {
    deleteAnnotation(id);
    setAnnotationMenu(null);
    setSelectedId(null);
  };

  const handleMakeTransparent = async (id: string) => {
    const annotation = annotations.find((a) => a.id === id);
    if (!annotation || annotation.type !== 'image') return;
    const image = annotation.payload.image;
    if (!image) return;
    try {
      const transparent = await makeBackgroundTransparent(image);
      updateAnnotation(id, { payload: { ...annotation.payload, image: transparent } });
      setAnnotationMenu(null);
    } catch {
      // ignore processing errors
    }
  };

  const hasPdf = pages.length > 0;

  return (
    <div className="flex h-full flex-col">
      {currentTool === null ? (
        <HomePage onSelectTool={(toolId) => setCurrentTool(toolId)} />
      ) : currentTool === 'merge' ? (
        <PdfMergeTool onBack={handleBackToHome} />
      ) : currentTool === 'split' ? (
        <PdfSplitTool onBack={handleBackToHome} />
      ) : currentTool === 'compress' ? (
        <PdfCompressTool onBack={handleBackToHome} />
      ) : currentTool === 'images-to-pdf' ? (
        <ImagesToPdfTool onBack={handleBackToHome} />
      ) : (
        <>
          <Toolbar
            fileName={fileName}
            pageCount={pages.length}
            onUpload={handleUpload}
            onDownload={download}
            onUndo={undo}
            onRedo={redo}
            onDelete={handleDelete}
            onShowHelp={() => setShowHelp(true)}
            onBackToHome={handleBackToHome}
            canUndo={canUndo}
            canRedo={canRedo}
            hasSelection={!!selectedId}
            scale={scale}
            onScaleChange={setScale}
          />

          <div className="flex-1 overflow-hidden">
            {!hasPdf ? (
          <div
            className="flex h-full flex-col items-center justify-center gap-8 p-8 text-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-sm">
              <FileUp className="mx-auto h-16 w-16 text-blue-600" />
            </div>
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold text-gray-900">MyPDFSigner</h1>
              <p className="mt-3 text-lg text-gray-600">
                Free online PDF editor. Sign, fill, edit, and annotate PDFs in your browser.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">✓ Signatures</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">✓ Text & Dates</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">✓ Images</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">✓ Privacy-first</span>
              </div>
            </div>
            <button
              onClick={handleUpload}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-md hover:bg-blue-700 transition-colors"
            >
              <FileUp className="h-6 w-6" />
              Open PDF
            </button>
            <p className="text-sm text-gray-400">Drag and drop a PDF here, or press Ctrl+O</p>
            {loading && <p className="text-gray-500">Loading PDF...</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        ) : (
          <PdfViewer
            pages={pages}
            infos={infos}
            scale={scale}
            annotations={annotations}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onChange={updateAnnotation}
            onDelete={deleteAnnotation}
            onAdd={addAnnotation}
            onShowPageMenu={handleShowPageMenu}
            onShowAnnotationMenu={handleShowAnnotationMenu}
          />
        )}
      </div>

      <input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        className="hidden"
        onChange={handleImageChange}
      />

      {signaturePending && (
        <SignaturePad
          onDone={handleSignatureDone}
          onCancel={() => {
            setSignaturePending(null);
          }}
        />
      )}

      {pageMenu && (
        <PageMenu
          x={pageMenu.clientX}
          y={pageMenu.clientY}
          tools={allTools}
          onSelect={handlePageMenuSelect}
          onClose={() => setPageMenu(null)}
        />
      )}

      {annotationMenu && (
        <AnnotationPopup
          x={annotationMenu.clientX}
          y={annotationMenu.clientY}
          onDelete={() => handleAnnotationMenuDelete(annotationMenu.id)}
          onClose={() => setAnnotationMenu(null)}
          onMakeTransparent={
            annotations.find((a) => a.id === annotationMenu.id)?.type === 'image'
              ? () => handleMakeTransparent(annotationMenu.id)
              : null
          }
        />
      )}

      {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
      <CookieConsent />
      <Analytics />
        </>
      )}
    </div>
  );
}

export default App;
