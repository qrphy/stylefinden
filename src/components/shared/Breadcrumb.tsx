// Navigasyon kırıntısı — Home / Bölüm / Kategori / Sayfa hiyerarşisini gösterir.
// href olmayan son öge aktif sayfa olarak siyah yazıyla gösterilir.
type BreadcrumbItem = { label: string; href?: string };

type Props = { items: BreadcrumbItem[] };

export default function Breadcrumb({ items }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-6 pb-0">
      <nav className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-gray-400">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {item.href ? (
              <a href={item.href} className="hover:text-black transition-colors duration-200">
                {item.label}
              </a>
            ) : (
              <span className="text-black">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}
