import { Share2, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  url?: string;
  title?: string;
}

export function ShareButtons({
  url = typeof window !== 'undefined' ? window.location.href : 'https://mypdfsigner.net',
  title = 'MyPDFSigner - Free PDF Tools Online',
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Twitter',
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-sky-50 hover:text-sky-600',
    },
    {
      name: 'Facebook',
      label: 'FB',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-50 hover:text-blue-600',
    },
    {
      name: 'LinkedIn',
      label: 'in',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-50 hover:text-blue-700',
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 text-sm text-gray-600">
        <Share2 className="h-4 w-4" /> Share
      </span>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded px-2 py-1 text-xs font-semibold text-gray-500 transition-colors ${link.color}`}
          title={`Share on ${link.name}`}
        >
          {link.label}
        </a>
      ))}
      <button
        onClick={handleCopy}
        className="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        title="Copy link"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
