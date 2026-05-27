import { type ReactNode } from "react";
import CollectionCard, { type CollectionItem } from "./CollectionCard";

export type CollectionGroup = {
  label: string;
  description?: string;
  basePath: string;
  gridCols?: string;
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
  topNav?: ReactNode;
};

export default function SectionMainPage({ hero, breadcrumb, collections, topNav }: Props) {
  return (
    <main className="flex-1 bg-white">

      {/* ── Breadcrumb ── */}
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="container-page pt-8 pb-2">
          <nav className="breadcrumb-nav">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="breadcrumb-link">
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
        <div className="container-page py-14 md:py-20">
          <div className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto">
            <span className="eyebrow">
              {hero.eyebrow}
            </span>
            <h1 className="hero-heading">
              {hero.heading} <br />
              <span className="italic font-light">{hero.headingItalic}</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── Top Nav (optional) ── */}
      {topNav && (
        <div className="container-page pt-8">
          {topNav}
        </div>
      )}

      {/* ── Collection Groups ── */}
      {collections.map((group, i) => (
        <section key={group.label} className={`w-full ${i > 0 ? "border-t border-gray-100" : ""}`}>
          <div className="container-page py-12 md:py-16">

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <span className="eyebrow">{group.label}</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              {group.description && (
                <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{group.description}</p>
              )}
            </div>

            <div className={`grid gap-5 md:gap-7 ${group.gridCols ?? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"}`}>
              {group.items.map((item) => (
                <CollectionCard
                  key={item.slug}
                  item={item}
                  href={`${group.basePath}/${item.slug}`}
                />
              ))}
            </div>

          </div>
        </section>
      ))}

    </main>
  );
}
