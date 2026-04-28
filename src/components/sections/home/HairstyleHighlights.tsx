import ImgPlaceholder from "@/components/shared/ImgPlaceholder";
import { TEST_IMG } from "@/constants/site";

const filters = [
  { label: "All Hairstyles", href: "/hairstyles" },
  { label: "Short Hair",     href: "/hairstyles?type=short" },
  { label: "Bob & Lob",      href: "/hairstyles?type=bob" },
  { label: "Long Hair",      href: "/hairstyles?type=long" },
  { label: "Curls",          href: "/hairstyles?type=curls" },
  { label: "Updo",           href: "/hairstyles?type=updo" },
];

const hairstyles = [
  { id: 1, name: "Classic Bob",     type: "Bob",      length: "Short–Medium", mood: "Elegant & Timeless",    image: "seasons/sfold.png", featured: true  },
  { id: 2, name: "Beachy Waves",    type: "Long Hair", length: "Long",        mood: "Casual & Romantic",     image: "seasons/sfold.png", featured: false },
  { id: 3, name: "Pixie Cut",       type: "Short Hair",length: "Short",       mood: "Modern & Bold",         image: "seasons/sfold.png", featured: false },
  { id: 4, name: "Sleek Ponytail",  type: "Updo",      length: "Medium–Long", mood: "Clean & Stylish",       image: "seasons/sfold.png", featured: false },
  { id: 5, name: "Curly Mane",      type: "Curls",     length: "Long",        mood: "Playful & Natural",     image: "seasons/sfold.png", featured: false },
  { id: 6, name: "French Braid",    type: "Updo",      length: "Medium–Long", mood: "Feminine & Everyday",   image: "seasons/sfold.png", featured: false },
];

const featured = hairstyles.filter((h) => h.featured);
const rest     = hairstyles.filter((h) => !h.featured);

export default function HairstyleHighlights() {
  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
              Hairstyle Inspiration
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
              Find your perfect <br className="hidden md:block" />
              <span className="italic font-light">haircut.</span>
            </h2>
          </div>
          <a href="/hairstyles" className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 group">
            All Hairstyles
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f, i) => (
            <a
              key={f.label}
              href={f.href}
              className={["px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-colors duration-200",
                i === 0 ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-black hover:text-white"].join(" ")}
            >
              {f.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">

          {featured.map((h) => (
            <a
              key={h.id}
              href={`/hairstyles/${h.id}`}
              className="group relative md:col-span-1 xl:col-span-2 overflow-hidden bg-gray-100 aspect-[3/4] md:aspect-auto md:row-span-2 flex flex-col justify-end"
            >
              <ImgPlaceholder src={TEST_IMG} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/100 to-black/50 -z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/50 transition-all duration-300" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-white text-black">Tip of the Week</span>
              </div>
              <div className="relative z-10 p-6 md:p-8 flex flex-col gap-2">
                <span className="text-xs tracking-widest uppercase text-white/60">{h.mood}</span>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">{h.name}</h3>
                    <p className="text-xs tracking-widest uppercase text-white/70 mt-1">{h.type} · {h.length}</p>
                  </div>
                  <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-white shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </a>
          ))}

          {rest.map((h) => (
            <a key={h.id} href={`/hairstyles/${h.id}`} className="group flex flex-col gap-3">
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                <img src={h.image} alt={h.name} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200 -z-10" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase bg-white/90 text-gray-700">{h.type}</span>
              </div>
              <div className="flex flex-col gap-0.5 px-0.5">
                <h3 className="text-sm font-black text-black tracking-tight group-hover:text-gray-500 transition-colors duration-200">{h.name}</h3>
                <p className="text-xs tracking-widest uppercase text-gray-400">{h.length} · {h.mood}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <a href="/hairstyles" className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200">
            Discover All Hairstyles
          </a>
        </div>

      </div>
    </section>
  );
}
