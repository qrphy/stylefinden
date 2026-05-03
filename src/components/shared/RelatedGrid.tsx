// "Similar Categories" bölümü — kategori sayfalarının altında benzer kategorilere yönlendiren kart grid'i.
import type { RelatedCategory } from "@/types/outfit-category";

type Props = {
  items: RelatedCategory[];
  title?: string;
};

export default function RelatedGrid({ items, title = "Similar Categories" }: Props) {
  return (
    <section className="w-full border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">You Might Also Like</span>
          <h2 className="text-2xl md:text-3xl font-black text-black tracking-tight">{title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {items.map((cat) => (
            <a
              key={cat.label}
              href={cat.href}
              className={`group flex flex-col justify-between gap-6 p-6 md:p-8 ${cat.accent} hover:opacity-90 transition-opacity duration-200`}
            >
              <span className={`text-xs font-semibold tracking-widest uppercase ${cat.accentText}`}>Discover</span>
              <div className="flex items-end justify-between">
                <h3 className="text-sm md:text-base font-black text-black tracking-tight leading-tight">{cat.label}</h3>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current text-black opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0 ml-2"
                  fill="none"
                  strokeWidth={2}
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
