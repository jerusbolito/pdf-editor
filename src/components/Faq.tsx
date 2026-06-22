import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
}

export function Faq({ items, title = 'Frequently asked questions', subtitle }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-white px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-2 text-center text-gray-600">{subtitle}</p>}
        <div className="mt-8 space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </div>
    </section>
  );
}
