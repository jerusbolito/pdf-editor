import { Link, useLocation } from 'react-router-dom';
import { FileText, Shield, Lock, Globe } from 'lucide-react';
import { CookieConsent } from './CookieConsent';
import { Analytics } from './Analytics';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

export function PageLayout({ children, hideHeader = false }: PageLayoutProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {!hideHeader && (
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-900">
              <FileText className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold">MyPDFSigner</span>
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 sm:flex">
              <Link to="/edit-pdf" className="hover:text-blue-600">Edit PDF</Link>
              <Link to="/merge-pdf" className="hover:text-blue-600">Merge</Link>
              <Link to="/split-pdf" className="hover:text-blue-600">Split</Link>
              <Link to="/compress-pdf" className="hover:text-blue-600">Compress</Link>
              <Link to="/images-to-pdf" className="hover:text-blue-600">Images to PDF</Link>
              <Link to="/pdf-to-images" className="hover:text-blue-600">PDF to Images</Link>
              <Link to="/organize-pdf" className="hover:text-blue-600">Organize</Link>
              <Link to="/unlock-pdf" className="hover:text-blue-600">Unlock</Link>
              <Link to="/watermark-pdf" className="hover:text-blue-600">Watermark</Link>
              <Link to="/pdf-to-text" className="hover:text-blue-600">Text</Link>
            </nav>
            <Link
              to="/edit-pdf"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Start Editing
            </Link>
          </div>
        </header>
      )}

      <main className="flex-1">{children}</main>

      {isHome && (
        <section className="border-t border-gray-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Privacy-first</h3>
                  <p className="mt-1 text-sm text-gray-600">All PDF processing happens in your browser. Your files are never uploaded to our servers.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Lock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">No registration</h3>
                  <p className="mt-1 text-sm text-gray-600">Use every tool without creating an account, providing an email, or entering a password.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Works everywhere</h3>
                  <p className="mt-1 text-sm text-gray-600">Free PDF tools on Windows, Mac, Linux, iOS, and Android. Just open your browser.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-gray-200 bg-white px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>© {new Date().getFullYear()} MyPDFSigner. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <Link to="/edit-pdf" className="hover:text-blue-600">Edit PDF</Link>
              <Link to="/merge-pdf" className="hover:text-blue-600">Merge PDF</Link>
              <Link to="/split-pdf" className="hover:text-blue-600">Split PDF</Link>
              <Link to="/compress-pdf" className="hover:text-blue-600">Compress PDF</Link>
              <Link to="/images-to-pdf" className="hover:text-blue-600">Images to PDF</Link>
              <Link to="/pdf-to-images" className="hover:text-blue-600">PDF to Images</Link>
              <Link to="/organize-pdf" className="hover:text-blue-600">Organize PDF</Link>
              <Link to="/unlock-pdf" className="hover:text-blue-600">Unlock PDF</Link>
              <Link to="/watermark-pdf" className="hover:text-blue-600">Watermark PDF</Link>
              <Link to="/pdf-to-text" className="hover:text-blue-600">PDF to Text</Link>
              <Link to="/changelog" className="hover:text-blue-600">Changelog</Link>
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent />
      <Analytics />
    </div>
  );
}
