const posts = [
  { id: 1, slug: "capsule-wardrobe-guide",      category: "Styling Tipps", title: "Capsule Wardrobe: 10 Teile, 30 Outfits",              excerpt: "Wie du mit wenigen hochwertigen Basics eine Garderobe aufbaust, die für jede Situation passt – und dabei Geld sparst.",                                                                        date: "12. April 2025", readTime: "5 Min", image: "/blog/capsule-wardrobe.jpg",  featured: true  },
  { id: 2, slug: "fruehling-trendfarben-2025",  category: "Trends",        title: "Die Trendfarben des Frühlings 2025",                  excerpt: "Von zartem Mintgrün bis zu kräftigem Terrakotta – welche Farben diesen Frühling dominieren und wie du sie kombinierst.",                                                               date: "8. April 2025",  readTime: "4 Min", image: "/blog/fruehling-farben.jpg",  featured: false },
  { id: 3, slug: "accessoires-weniger-ist-mehr",category: "Accessoires",   title: "Weniger ist mehr: Accessoires richtig einsetzen",      excerpt: "Das perfekte Accessoire kann ein Outfit komplett verändern. Wir zeigen dir, wann du weniger und wann du mehr einsetzen solltest.",                                                       date: "3. April 2025",  readTime: "3 Min", image: "/blog/accessories-guide.jpg", featured: false },
  { id: 4, slug: "business-casual-guide",       category: "Outfit Guide",  title: "Business Casual: Die goldene Mitte",                  excerpt: "Zwischen zu formell und zu lässig – so findest du den perfekten Look für moderne Arbeitsumgebungen.",                                                                                   date: "28. März 2025",  readTime: "6 Min", image: "/blog/business-casual.jpg",   featured: false },
];

const categoryColor: Record<string, string> = {
  "Styling Tipps": "bg-black text-white",
  "Trends":        "bg-white text-black border border-black",
  "Accessoires":   "bg-gray-100 text-gray-700",
  "Outfit Guide":  "bg-gray-900 text-white",
};

const featuredPost = posts.find((p) => p.featured)!;
const regularPosts = posts.filter((p) => !p.featured);

export default function LatestArticles() {
  return (
    <section className="w-full bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Aus dem Blog</span>
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
              Inspiration & <span className="italic font-light">Styling Wissen.</span>
            </h2>
          </div>
          <a href="/blog" className="self-start sm:self-auto flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 group shrink-0">
            Alle Beiträge
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          <a href={`/blog/${featuredPost.slug}`} className="group xl:col-span-2 flex flex-col overflow-hidden border border-gray-100 hover:border-gray-300 transition-colors duration-200">
            <div className="relative overflow-hidden bg-gray-100 aspect-[16/9]">
              <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
              <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold tracking-widest uppercase ${categoryColor[featuredPost.category] ?? "bg-gray-100 text-gray-700"}`}>
                {featuredPost.category}
              </span>
            </div>
            <div className="flex flex-col gap-3 p-6 flex-1">
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-widest uppercase text-gray-400">{featuredPost.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-xs tracking-widest uppercase text-gray-400">{featuredPost.readTime} Lesedauer</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-black tracking-tight leading-tight group-hover:text-gray-600 transition-colors duration-200">
                {featuredPost.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{featuredPost.excerpt}</p>
              <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black group-hover:gap-3 transition-all duration-200 mt-auto pt-2 border-t border-gray-100">
                Weiterlesen
                <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current" fill="none" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </a>

          <div className="flex flex-col gap-5">
            {regularPosts.map((post) => (
              <a key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4 border border-gray-100 hover:border-gray-300 transition-colors duration-200 overflow-hidden">
                <div className="relative w-28 flex-shrink-0 aspect-square overflow-hidden bg-gray-100">
                  <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
                </div>
                <div className="flex flex-col justify-center gap-2 py-4 pr-4 flex-1 min-w-0">
                  <span className={`self-start px-2 py-0.5 text-xs font-semibold tracking-widest uppercase ${categoryColor[post.category] ?? "bg-gray-100 text-gray-700"}`}>
                    {post.category}
                  </span>
                  <h3 className="text-sm font-black text-black tracking-tight leading-tight group-hover:text-gray-600 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs tracking-widest uppercase text-gray-400">{post.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                    <span className="text-xs tracking-widest uppercase text-gray-400">{post.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>

        <div className="flex justify-center mt-12">
          <a href="/blog" className="px-10 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200">
            Alle Beiträge lesen
          </a>
        </div>

      </div>
    </section>
  );
}
