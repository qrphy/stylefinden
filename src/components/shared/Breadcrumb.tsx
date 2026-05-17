// Navigasyon kırıntısı — Home / Bölüm / Kategori / Sayfa hiyerarşisini gösterir.
// href olmayan son öge aktif sayfa olarak siyah yazıyla gösterilir.
type BreadcrumbItem = { label: string; href?: string };

type Props = { items: BreadcrumbItem[] };

export default function Breadcrumb({ items }: Props) {
  return (
    <div className="container-page pt-6 pb-0">
      <nav className="breadcrumb-nav font-medium">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {item.href ? (
              <a href={item.href} className="breadcrumb-link">
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
