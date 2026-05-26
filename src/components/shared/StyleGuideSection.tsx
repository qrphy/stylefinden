// Kategori sayfalarının altındaki Style Guide + SSS bölümü — sol tarafta rehber linki, sağda SSS kartları.
import type { Faq } from "@/types/outfit-category";
import JsonLd from "@/components/seo/JsonLd";

type Props = {
  faqs: Faq[];
  label: string;
  description: string;
  styleGuideHref: string;
  styleGuideSuffix?: string;
};

export default function StyleGuideSection({
  faqs,
  label,
  description,
  styleGuideHref,
  styleGuideSuffix = "find & style",
}: Props) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <section className="w-full section-divider bg-gray-50">
      <JsonLd data={faqSchema} />
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16">

          <div className="flex flex-col gap-5">
            <span className="eyebrow">Style Guide</span>
            <h2 className="section-title">
              {label} <span className="italic font-light">{styleGuideSuffix}</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            <a
              href={styleGuideHref}
              className="self-start flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-600 transition-colors duration-200 group"
            >
              View Style Guide
              <svg viewBox="0 0 24 24" className="size-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <span className="eyebrow">Frequently Asked Questions</span>
            {faqs.map((faq, i) => (
              <div key={i} className="flex flex-col gap-2 pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                <h3 className="text-sm font-semibold text-black tracking-tight">{faq.q}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
