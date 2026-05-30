// Blog yazısı detay layout bileşeni — /blog/[slug]/page.tsx tarafından kullanılır.
// PortableText body, hero görsel, ilgili içerikler ve breadcrumb render eder.
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import { urlFor } from "@/sanity/lib/image"
import { formatDate } from "@/lib/formatDate"
import ReadingProgressBar from "@/components/blog/ReadingProgressBar"

type SanityImg = { asset?: object; hotspot?: object; crop?: object; lqip?: string }
type RelatedItem = { _id: string; title: string; slug: string; image?: SanityImg }

export type BlogPost = {
  _id: string
  title: string
  slug: string
  excerpt?: string | null
  heroImage?: SanityImg | null
  category: string
  publishedAt?: string | null
  body?: unknown[] | null
  tags?: string[] | null
  relatedOutfits?: (RelatedItem & { style?: string; occasion?: string })[] | null
  relatedAccessories?: (RelatedItem & { type?: string })[] | null
  relatedHairstyles?: (RelatedItem & { type?: string; length?: string })[] | null
}

const categoryLabel: Record<string, string> = {
  "accessories-guides": "Accessories",
  "hairstyle-guides":   "Hairstyle",
  "occasion-guides":    "Occasion Guide",
  "seasonal-guides":    "Seasonal",
  "trend-reports":      "Trends",
}

const categoryColor: Record<string, string> = {
  "accessories-guides": "bg-gray-100 text-gray-700",
  "hairstyle-guides":   "bg-black text-white",
  "occasion-guides":    "bg-gray-900 text-white",
  "seasonal-guides":    "bg-white text-black border border-black",
  "trend-reports":      "bg-white text-black border border-black",
}

export default function BlogPostDetail({ post }: { post: BlogPost }) {
  const heroUrl = post.heroImage ? urlFor(post.heroImage).url() : undefined
  const heroLqip = post.heroImage?.lqip
  const categoryHref = post.category ? `/blog/${post.category}` : "/blog"

  return (
    <main>
      <ReadingProgressBar />

      {/* ── Hero görsel ── */}
      <section className="w-full bg-white">
        <div className="relative overflow-hidden bg-gray-100 w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/7] md:max-h-[520px]">
          <ImgPlaceholder src={heroUrl} alt={post.title} priority sizes="100vw" blurDataURL={heroLqip} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>
      </section>

      {/* ── Makale ── */}
      <article className="max-w-3xl mx-auto px-6 md:px-8 py-10 md:py-14">

        {/* Breadcrumb */}
        <nav className="breadcrumb-nav mb-8">
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span>/</span>
          <Link href="/blog" className="breadcrumb-link">Blog</Link>
          <span>/</span>
          <Link href={categoryHref} className="breadcrumb-link">
            {categoryLabel[post.category] ?? post.category}
          </Link>
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Başlık + meta */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={categoryHref}
              className={`badge-md hover:opacity-80 transition-opacity duration-200 ${categoryColor[post.category] ?? "bg-gray-100 text-gray-700"}`}
            >
              {categoryLabel[post.category] ?? post.category}
            </Link>
            {post.publishedAt && (
              <span className="text-xs tracking-widest uppercase text-gray-400">
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>
          <h1 className="page-heading">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-base md:text-lg text-gray-500 leading-relaxed border-l-2 border-black pl-4">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* İçerik */}
        {post.body && (
          <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-black prose-a:underline prose-strong:text-black prose-img:rounded-none">
            <PortableText value={post.body as Parameters<typeof PortableText>[0]["value"]} />
          </div>
        )}

        {/* Etiketler */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-8 mt-8 border-t border-gray-100">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="tag"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* ── İlgili içerikler ── */}
      {((post.relatedOutfits?.length ?? 0) > 0 ||
        (post.relatedAccessories?.length ?? 0) > 0 ||
        (post.relatedHairstyles?.length ?? 0) > 0) && (
        <section className="section-divider">
          <div className="container-page py-12 md:py-16 flex flex-col gap-12">

            {post.relatedOutfits && post.relatedOutfits.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-black tracking-tight mb-6">Related Outfits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {post.relatedOutfits.map((outfit) => (
                    <Link key={outfit._id} href={`/outfits/${outfit.slug}`} className="group flex flex-col gap-2">
                      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                        <ImgPlaceholder
                          src={outfit.image ? urlFor(outfit.image).width(1400).height(1867).url() : undefined}
                          alt={outfit.title}
                          blurDataURL={outfit.image?.lqip}
                        />
                        <div className="card-overlay" />
                      </div>
                      <span className="card-title px-0.5">
                        {outfit.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {post.relatedAccessories && post.relatedAccessories.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-black tracking-tight mb-6">Related Accessories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {post.relatedAccessories.map((item) => (
                    <Link key={item._id} href={`/accessories/${item.slug}`} className="group flex flex-col gap-2">
                      <div className="relative overflow-hidden bg-gray-100 aspect-square">
                        <ImgPlaceholder
                          src={item.image ? urlFor(item.image).width(1400).height(1400).url() : undefined}
                          alt={item.title}
                          blurDataURL={item.image?.lqip}
                        />
                        <div className="card-overlay" />
                      </div>
                      <span className="card-title px-0.5">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {post.relatedHairstyles && post.relatedHairstyles.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-black tracking-tight mb-6">Related Hairstyles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {post.relatedHairstyles.map((h) => (
                    <Link key={h._id} href={`/hairstyles/${h.slug}`} className="group flex flex-col gap-2">
                      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                        <ImgPlaceholder
                          src={h.image ? urlFor(h.image).width(1400).height(1867).url() : undefined}
                          alt={h.title}
                          blurDataURL={h.image?.lqip}
                        />
                        <div className="card-overlay" />
                      </div>
                      <span className="card-title px-0.5">
                        {h.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ── Geri dön ── */}
      <div className="section-divider">
        <div className="container-page py-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-black transition-colors duration-200 group w-fit"
          >
            <svg viewBox="0 0 24 24" className="size-4 stroke-current rotate-180 group-hover:-translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            Back to Blog
          </Link>
          {post.category && (
            <Link
              href={categoryHref}
              className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-black transition-colors duration-200 group w-fit"
            >
              More {categoryLabel[post.category] ?? post.category}
              <svg viewBox="0 0 24 24" className="size-4 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          )}
        </div>
      </div>

    </main>
  )
}
