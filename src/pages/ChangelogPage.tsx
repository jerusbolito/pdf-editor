import { PageLayout } from '../components/PageLayout';
import { Seo } from '../components/Seo';

const releases = [
  {
    version: '1.1.0',
    date: 'June 2026',
    changes: [
      'Added PDF to Images, Organize PDF, Unlock PDF, Watermark PDF, and PDF to Text tools.',
      'New dedicated landing pages for every tool with SEO meta tags and FAQ schema.',
      'Saved signatures panel in the PDF editor.',
      'Fillable PDF form detection notice.',
      'Mobile bottom toolbar in the editor.',
    ],
  },
  {
    version: '1.0.0',
    date: 'Launch',
    changes: [
      'Initial release with PDF Editor, Merge, Split, Compress, and Images to PDF.',
      'Client-side processing with PDF.js and PDF-lib.',
      'Privacy-first: no server uploads.',
    ],
  },
];

export function ChangelogPage() {
  return (
    <PageLayout>
      <Seo
        title="Changelog - MyPDFSigner"
        description="Track the latest updates and new PDF tools added to MyPDFSigner."
        canonicalPath="/changelog"
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Changelog</h1>
        <p className="mt-2 text-gray-600">See what is new and what has improved.</p>

        <div className="mt-8 space-y-8">
          {releases.map((release) => (
            <div key={release.version} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Version {release.version}</h2>
                <span className="text-sm text-gray-500">{release.date}</span>
              </div>
              <ul className="list-disc space-y-2 pl-5 text-gray-700">
                {release.changes.map((change, index) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
