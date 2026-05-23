// Navigasyon kırıntısı — Home / Bölüm / Kategori / Sayfa hiyerarşisini gösterir.
// href olmayan son öge aktif sayfa olarak siyah yazıyla gösterilir.
type BreadcrumbItem = { label: string; href?: string };

type Props = { items: BreadcrumbItem[]; className?: string };

export default function Breadcrumb({ items, className = "" }: Props) {
  return (
    <nav aria-label="breadcrumb" className={`breadcrumb-nav ${className}`}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5 md:gap-2">
          {i > 0 && <span aria-hidden>›</span>}
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
  );
}
