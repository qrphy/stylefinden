// Kategori sayfalarındaki filtre çubuğu — ilk filtre aktif (siyah), diğerleri URL query param ekleyerek filtreler.
type Props = {
  filters: string[];
  basePath: string;
  slug: string;
};

export default function FilterBar({ filters, basePath, slug }: Props) {
  return (
    <section className="w-full section-divider">
      <div className="container-page py-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="eyebrow mr-2">Filter:</span>
          {filters.map((filter, i) => (
            <a
              key={filter}
              href={i === 0 ? `${basePath}/${slug}` : `${basePath}/${slug}?filter=${filter.toLowerCase()}`}
              className={[
                "px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200",
                i === 0 ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-black hover:text-white",
              ].join(" ")}
            >
              {filter}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
