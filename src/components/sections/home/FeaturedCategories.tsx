import ImgPlaceholder from "@/components/shared/ImgPlaceholder";
import { TEST_IMG } from "@/constants/site";

const categories = [
  {
    slug: "outfits",
    label: "Outfits",
    description: "Complete looks for every occasion",
    image: "/categories/outfits.jpg",
    size: "large",
  },
  {
    slug: "hairstyles",
    label: "Hairstyles",
    description: "Current styles & cuts",
    image: "/categories/hairstyles.jpg",
    size: "normal",
  },
  {
    slug: "accessories",
    label: "Accessories",
    description: "Bags, jewelry & more",
    image: "/categories/accessories.jpg",
    size: "normal",
  },
  {
    slug: "trends",
    label: "Trends",
    description: "What's trending now",
    image: "/categories/trends.jpg",
    size: "normal",
  },
  {
    slug: "blog",
    label: "Blog",
    description: "Tips, guides & inspiration",
    image: "/categories/blog.jpg",
    size: "normal",
  },
  {
    slug: "style-guide",
    label: "Style Guide",
    description: "Your personal style guide",
    image: "/categories/style-guide.jpg",
    size: "large",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20">

        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            What interests you?
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4 md:gap-5">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/${cat.slug}`}
              className={[
                "group relative overflow-hidden bg-gray-100",
                "flex flex-col justify-end",
                cat.size === "large"
                  ? "xl:col-span-2 aspect-[4/3]"
                  : "aspect-square",
              ].join(" ")}
            >
              <ImgPlaceholder src={TEST_IMG} />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 -z-10" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

              <div className="relative z-10 p-5 md:p-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-white/70 mb-1">
                  {cat.description}
                </p>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-black text-white tracking-tight">
                    {cat.label}
                  </h3>
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 stroke-white opacity-0 -translate-x-2
                               group-hover:opacity-100 group-hover:translate-x-0
                               transition-all duration-300"
                    fill="none"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
