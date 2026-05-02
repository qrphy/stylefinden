import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { HOME_ACCESSORIES_QUERY } from "@/lib/queries";
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";

const categories = [
  { label: "Jewelry",    value: "jewelry",    href: "/accessories?type=jewelry",    icon: "◈" },
  { label: "Bags",       value: "bags",       href: "/accessories?type=bags",       icon: "◻" },
  { label: "Sunglasses", value: "sunglasses", href: "/accessories?type=sunglasses", icon: "◉" },
];

const badgeStyle: Record<string, string> = {
  Classic:           "bg-black text-white",
  Trending:          "bg-white text-black border border-black",
  Statement:         "bg-gray-900 text-white",
  "Daily Essential": "bg-black text-white",
  Iconic:            "bg-gray-900 text-white",
  "90s Revival":     "bg-white text-black border border-black",
  Timeless:          "bg-gray-100 text-gray-700",
};

type AccessoryItem = {
  _id: string;
  title: string;
  slug: string;
  image?: object;
  type?: string;
  occasion?: string;
  pairingTip?: string;
  tags?: string[];
  featured?: boolean;
};

export default async function AccessoriesHighlights() {
  const allAccessories: AccessoryItem[] = await client.fetch(HOME_ACCESSORIES_QUERY, {}, { next: { revalidate: 3600, tags: ['accessory'] } });

  const grouped = categories.map((cat) => ({
    ...cat,
    featured: allAccessories.find((a) => a.type === cat.value && a.featured) ?? allAccessories.find((a) => a.type === cat.value),
    items: allAccessories.filter((a) => a.type === cat.value && !a.featured).slice(0, 2),
  }));

  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Accessories</span>
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
              Details that <span className="italic font-light">change everything.</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mt-1 max-w-lg">
              Timeless classics and current trends — jewelry, bags and sunglasses that complement every outfit.
            </p>
          </div>
          <a href="/accessories" className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 group shrink-0">
            All Accessories
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="flex gap-2 mb-10 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <a key={cat.label} href={cat.href} className="flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-widest uppercase bg-gray-100 text-gray-600 hover:bg-black hover:text-white transition-colors duration-200 shrink-0">
              <span>{cat.icon}</span>
              {cat.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-16">
          {grouped.map((cat, ci) => (
            <div key={cat.label}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">{cat.label}</span>
                <div className="flex-1 h-px bg-gray-100" />
                <a href={cat.href} className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200">All →</a>
              </div>

              <div className={`flex flex-col md:flex-row gap-4 md:gap-5 ${ci % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                {cat.featured && (
                  <a href={`/accessories/${cat.featured.slug}`} className="group relative overflow-hidden bg-gray-100 flex-shrink-0 w-full md:w-2/5 aspect-[4/5]">
                    <ImgPlaceholder src={cat.featured.image ? urlFor(cat.featured.image).width(600).height(750).url() : undefined} alt={cat.featured.title} />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent group-hover:from-black/45 transition-all duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 text-xs font-semibold tracking-widest uppercase ${cat.featured.featured ? badgeStyle["Trending"] : badgeStyle["Classic"]}`}>
                        {cat.featured.featured ? "Trending" : "New"}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-1">
                      <span className="text-xs tracking-widest uppercase text-white/60">{cat.featured.pairingTip}</span>
                      <div className="flex items-end justify-between gap-2">
                        <h3 className="text-xl font-black text-white leading-tight">{cat.featured.title}</h3>
                        <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-white shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" strokeWidth={2}>
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </div>
                      <span className="text-xs tracking-widest uppercase text-white/50 mt-0.5">{cat.featured.occasion}</span>
                    </div>
                  </a>
                )}

                <div className="flex flex-col gap-4 flex-1">
                  {cat.items.map((item) => (
                    <a key={item._id} href={`/accessories/${item.slug}`} className="group flex items-stretch gap-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 overflow-hidden">
                      <div className="relative w-28 md:w-36 flex-shrink-0 aspect-square overflow-hidden bg-gray-100">
                        <ImgPlaceholder src={item.image ? urlFor(item.image).width(200).height(200).url() : undefined} alt={item.title} />
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
                      </div>
                      <div className="flex flex-col justify-center gap-2 py-4 pr-4 flex-1">
                        <span className={`self-start px-2 py-0.5 text-xs font-semibold tracking-widest uppercase ${badgeStyle["Trending"]}`}>
                          New
                        </span>
                        <h3 className="text-sm font-black text-black tracking-tight leading-tight group-hover:text-gray-600 transition-colors duration-200">{item.title}</h3>
                        <p className="text-xs tracking-widest uppercase text-gray-400">{item.pairingTip}</p>
                        <span className="text-xs text-gray-500 italic mt-0.5">✦ {item.occasion}</span>
                      </div>
                      <div className="flex items-center pr-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-gray-400" fill="none" strokeWidth={2}>
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <a href="/accessories" className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200">
            Discover All Accessories
          </a>
        </div>

      </div>
    </section>
  );
}
