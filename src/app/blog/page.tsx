// Blog ana sayfası — Editor's Picks (featured) + Latest Posts (Sanity) + kategori linkleri.
import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { FEATURED_POSTS_QUERY, LATEST_POSTS_QUERY } from "@/lib/queries"
import { BLOG_CATEGORY_CONFIGS } from "@/lib/blog-category-config"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Fashion Blog – How to Style, Trend Reports & Outfit Guides",
  description: "Fashion tips, how-to-style guides, trend reports and hairstyle inspiration — practical outfit ideas and seasonal fashion advice for women.",
  keywords: [
    "how to style",
    "fashion tips",
    "outfit guides",
    "trend reports",
    "style guide women",
    "hairstyle guides",
    "outfit inspiration",
    "fashion blog",
    "what to wear",
    "seasonal fashion",
    "capsule wardrobe",
    "how to dress",
  ],
  alternates: { canonical: "https://stylefinden.com/blog" },
  openGraph: {
    title: "Fashion Blog – How to Style, Trend Reports & Outfit Guides | STYLEFINDEN",
    description: "Fashion tips, how-to-style guides, trend reports and seasonal outfit inspiration for women.",
    url: "https://stylefinden.com/blog",
    type: "website",
    siteName: "STYLEFINDEN",
    locale: "en_US",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Blog – How to Style, Trend Reports & Outfit Guides | STYLEFINDEN",
    description: "Fashion tips, how-to-style guides, trend reports and seasonal outfit inspiration for women.",
    images: ["/stylefinden-logo.png"],
  },
}

const categoryColor: Record<string, string> = {
  "accessories-guides": "bg-gray-100 text-gray-700",
  "hairstyle-guides":   "bg-black text-white",
  "occasion-guides":    "bg-gray-900 text-white",
  "seasonal-guides":    "bg-white text-black border border-black",
  "trend-reports":      "bg-white text-black border border-black",
}

const categoryLabel: Record<string, string> = {
  "accessories-guides": "Accessories",
  "hairstyle-guides":   "Hairstyle",
  "occasion-guides":    "Occasion Guide",
  "seasonal-guides":    "Seasonal",
  "trend-reports":      "Trends",
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string | null
  heroImage?: object | null
  category: string
  publishedAt?: string | null
  tags?: string[] | null
}

export default async function BlogPage() {
  const [featuredPosts, latestPosts] = await Promise.all([
    client.fetch<Post[]>(FEATURED_POSTS_QUERY, {}, { next: { revalidate: 3600, tags: ["post"] } }),
    client.fetch<Post[]>(LATEST_POSTS_QUERY, {}, { next: { revalidate: 3600, tags: ["post"] } }),
  ])

  const categories = Object.entries(BLOG_CATEGORY_CONFIGS).map(([slug, cfg]) => ({
    slug,
    label: cfg.label,
    description: cfg.description.split(" — ")[0],
  }))

  return (
    <main>

      {/* Hero */}
      <section className="w-full border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Blog</span>
            <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
              Inspiration &{" "}
              <span className="italic font-light">Style Knowledge.</span>
            </h1>
            <p className="text-base text-gray-500 leading-relaxed">
              Trend reports, hairstyle guides, accessories tips and seasonal
              inspiration — everything you need for your personal style.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 block mb-6">
            Categories
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/blog/${cat.slug}`}
                className="group flex flex-col gap-2 border border-gray-200 hover:border-black p-5 transition-colors duration-200"
              >
                <span className="text-xs tracking-widest uppercase text-gray-400 group-hover:text-gray-600 transition-colors duration-200 line-clamp-2">
                  {cat.description}
                </span>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-sm font-black text-black tracking-tight leading-tight">
                    {cat.label}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 stroke-black opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-200 shrink-0"
                    fill="none"
                    strokeWidth={2}
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Picks — sadece featured == true post varsa göster */}
      {featuredPosts.length > 0 && (
        <section className="w-full bg-black">
          <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                  Editor&apos;s Picks
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                  Selected by our editors.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {featuredPosts.map((post, i) => {
                const imgUrl = post.heroImage ? urlFor(post.heroImage).width(1400).height(788).url() : undefined
                const isHero = i === 0 && featuredPosts.length >= 2
                return (
                  <a
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className={`group flex flex-col overflow-hidden border border-gray-700 hover:border-gray-400 transition-colors duration-200 ${isHero ? "md:col-span-2" : ""}`}
                  >
                    <div className={`relative overflow-hidden bg-gray-800 ${isHero ? "aspect-[16/7]" : "aspect-[16/9]"}`}>
                      <ImgPlaceholder src={imgUrl} alt={post.title} sizes={isHero ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"} />
                    </div>
                    <div className="flex flex-col gap-3 p-6 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-2 py-0.5 text-xs font-semibold tracking-widest uppercase ${categoryColor[post.category] ?? "bg-gray-100 text-gray-700"}`}>
                          {categoryLabel[post.category] ?? post.category}
                        </span>
                        {post.publishedAt && (
                          <span className="text-xs tracking-widest uppercase text-gray-500">
                            {formatDate(post.publishedAt)}
                          </span>
                        )}
                      </div>
                      <h3 className={`font-black text-white tracking-tight leading-tight group-hover:text-gray-300 transition-colors duration-200 ${isHero ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-gray-400 leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                      )}
                      <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-400 group-hover:text-white group-hover:gap-3 transition-[gap,color] duration-200 mt-auto pt-4 border-t border-gray-700">
                        Read Article
                        <svg viewBox="0 0 24 24" className="size-4 stroke-current" fill="none" strokeWidth={2}>
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts — Sanity'den en son tüm yazılar */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-16 md:py-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
                Latest Posts
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
                Recently published.
              </h2>
            </div>
          </div>

          {latestPosts.length === 0 ? (
            <p className="text-sm text-gray-400 tracking-wide">No posts published yet. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {latestPosts.map((post) => {
                const imgUrl = post.heroImage ? urlFor(post.heroImage).width(1400).height(788).url() : undefined
                return (
                  <a
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col overflow-hidden border border-gray-100 hover:border-gray-300 transition-colors duration-200"
                  >
                    <div className="relative overflow-hidden bg-gray-100 aspect-[16/9]">
                      <ImgPlaceholder src={imgUrl} alt={post.title} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                    </div>
                    <div className="flex flex-col gap-3 p-5 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-2 py-0.5 text-xs font-semibold tracking-widest uppercase ${categoryColor[post.category] ?? "bg-gray-100 text-gray-700"}`}>
                          {categoryLabel[post.category] ?? post.category}
                        </span>
                        {post.publishedAt && (
                          <span className="text-xs tracking-widest uppercase text-gray-400">
                            {formatDate(post.publishedAt)}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-black text-black tracking-tight leading-tight group-hover:text-gray-600 transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                      )}
                      <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black group-hover:gap-3 transition-[gap] duration-200 mt-auto pt-3 border-t border-gray-100">
                        Read More
                        <svg viewBox="0 0 24 24" className="size-4 stroke-current" fill="none" strokeWidth={2}>
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </section>

    </main>
  )
}
