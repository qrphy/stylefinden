// Ana sayfa kategori navigasyonu — editöryal indeks şeridi
// Görsel kutular yerine numaralı metin linkleri, dergi içindekiler listesi hissi
const categories = [
  { slug: "outfits",     label: "Outfits",     description: "Complete looks for every occasion" },
  { slug: "hairstyles",  label: "Hairstyles",  description: "Current styles & cuts"             },
  { slug: "accessories", label: "Accessories", description: "Bags, jewelry & more"              },
  { slug: "trends",      label: "Trends",      description: "What's trending now"               },
  { slug: "blog",        label: "Blog",        description: "Tips, guides & inspiration"        },
  { slug: "style-guide", label: "Style Guide", description: "Your personal style guide"         },
];

export default function FeaturedCategories() {
  return (
    <section className="w-full bg-white border-t border-gray-100 scroll-reveal">
      <div className="container-page">

        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <span className="eyebrow">Explore</span>
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-300">
            06 Sections
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <a
              key={cat.slug}
              href={`/${cat.slug}`}
              className="group flex flex-col gap-2 py-7 px-4 lg:px-5 lg:first:pl-0 border-b border-gray-100 lg:border-b-0 lg:border-r lg:last:border-r-0 hover:opacity-60 transition-opacity duration-200"
            >
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-300">
                0{i + 1}
              </span>
              <span className="text-sm md:text-base font-semibold text-black tracking-tight">
                {cat.label}
              </span>
              <span className="text-[11px] text-gray-400 leading-relaxed">
                {cat.description}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
