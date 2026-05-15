import CollectionCard, { type CollectionItem } from "./CollectionCard";

export type CollectionGroup = {
  label: string;
  basePath: string;
  gridCols?: string;
  cardVariant?: "default" | "editorial";
  items: CollectionItem[];
};

type BreadcrumbItem = { label: string; href?: string };

type Props = {
  hero: {
    eyebrow: string;
    heading: string;
    headingItalic: string;
    description: string;
  };
  breadcrumb?: BreadcrumbItem[];
  collections: CollectionGroup[];
};

export default function SectionMainPage({ hero, breadcrumb, collections }: Props) {
  return (
    <main className="flex-1 bg-white">

      {/* ── Breadcrumb ── */}
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-8 pb-2">
          <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-black transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-black">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="w-full border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-14 md:py-20">
          <div className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              {hero.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-black leading-tight tracking-tight">
              {hero.heading} <br />
              <span className="italic font-light">{hero.headingItalic}</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── Collection Groups ── */}
      {collections.map((group, i) => (
        <section key={group.label} className={`w-full ${i > 0 ? "border-t border-gray-100" : ""}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16">

            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                {group.label}
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className={`grid ${group.cardVariant === "editorial" ? "gap-x-8 gap-y-16 md:gap-x-10 md:gap-y-20" : "gap-5 md:gap-7"} ${group.gridCols ?? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"}`}>
              {group.items.map((item) => (
                <CollectionCard
                  key={item.slug}
                  item={item}
                  href={`${group.basePath}/${item.slug}`}
                  variant={group.cardVariant}
                />
              ))}
            </div>

          </div>
        </section>
      ))}

    </main>
  );
}
