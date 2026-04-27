import type { Faq } from "@/types/outfit-category";

type Props = {
  faqs: Faq[];
  label: string;
  description: string;
  styleGuideHref: string;
  styleGuideSuffix?: string;
};

export default function FaqSection({
  faqs,
  label,
  description,
  styleGuideHref,
  styleGuideSuffix = "find & style",
}: Props) {
  return (
    <section className="w-full border-t border-gray-100 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16">

          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Style Guide</span>
            <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">
              {label} <span className="italic font-light">{styleGuideSuffix}</span>
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            <a
              href={styleGuideHref}
              className="self-start flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-600 transition-colors duration-200 group"
            >
              View Style Guide
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Frequently Asked Questions</span>
            {faqs.map((faq, i) => (
              <div key={i} className="flex flex-col gap-2 pb-6 border-b border-gray-200 last:border-0 last:pb-0">
                <h3 className="text-sm font-black text-black tracking-tight">{faq.q}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
