// Blog yazısı detay sayfası — Sanity'den tek bir post'u slug ile çeker.
// İçeriği PortableText ile render eder; ilgili outfit/aksesuar/saç stili linkleri de gösterilir.
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { POST_QUERY } from "@/lib/queries"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"

type Props = { params: Promise<{ slug: string }> }

// Blog kategori slug'larını okunabilir etiketlere çevirir
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

// Build zamanında Sanity'deki tüm blog post slug'larını SSG ile üretir
export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

// Post başlığını ve excerpt'ini SEO metadata'sına çevirir; og:article type kullanır
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(POST_QUERY, { slug })
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? `Read ${post.title} on STYLEFINDEN.`,
    alternates: { canonical: `https://stylefinden.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "",
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch(POST_QUERY, { slug })
  if (!post) notFound()

  const heroUrl = post.heroImage ? urlFor(post.heroImage).width(1200).height(630).url() : undefined

  return (
    <main>
      {/* Hero */}
      <section className="w-full bg-white">
        <div className="relative overflow-hidden bg-gray-100 w-full aspect-[16/7] max-h-[520px]">
          <ImgPlaceholder src={heroUrl} alt={post.title} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        </div>
      </section>

      {/* Article header */}
      <article className="max-w-3xl mx-auto px-6 md:px-8 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400 mb-8">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href="/blog" className="hover:text-black transition-colors">Blog</a>
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{post.title}</span>
        </nav>

        <div className="flex flex-col gap-4 mb-10">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`px-3 py-1 text-xs font-semibold tracking-widest uppercase ${categoryColor[post.category] ?? "bg-gray-100 text-gray-700"}`}>
              {categoryLabel[post.category] ?? post.category}
            </span>
            {post.publishedAt && (
              <span className="text-xs tracking-widest uppercase text-gray-400">{formatDate(post.publishedAt)}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-black text-black tracking-tight leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-base md:text-lg text-gray-500 leading-relaxed border-l-2 border-black pl-4">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Body */}
        {post.body && (
          <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-black prose-a:underline prose-strong:text-black prose-img:rounded-none">
            <PortableText value={post.body} />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-8 mt-8 border-t border-gray-100">
            {post.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* Related content */}
      {((post.relatedOutfits?.length ?? 0) > 0 ||
        (post.relatedAccessories?.length ?? 0) > 0 ||
        (post.relatedHairstyles?.length ?? 0) > 0) && (
        <section className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 md:py-16 flex flex-col gap-12">

            {post.relatedOutfits && post.relatedOutfits.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-black tracking-tight mb-6">Related Outfits</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {post.relatedOutfits.map((outfit: { _id: string; title: string; slug: string; image?: object }) => (
                    <a key={outfit._id} href={`/outfits/${outfit.slug}`} className="group flex flex-col gap-2">
                      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                        <ImgPlaceholder
                          src={outfit.image ? urlFor(outfit.image).width(300).url() : undefined}
                          alt={outfit.title}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <span className="text-sm font-black text-black tracking-tight group-hover:text-gray-600 transition-colors duration-200 px-0.5">
                        {outfit.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {post.relatedAccessories && post.relatedAccessories.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-black tracking-tight mb-6">Related Accessories</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {post.relatedAccessories.map((item: { _id: string; title: string; slug: string; image?: object }) => (
                    <a key={item._id} href={`/accessories/${item.slug}`} className="group flex flex-col gap-2">
                      <div className="relative overflow-hidden bg-gray-100 aspect-square">
                        <ImgPlaceholder
                          src={item.image ? urlFor(item.image).width(300).height(300).url() : undefined}
                          alt={item.title}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <span className="text-sm font-black text-black tracking-tight group-hover:text-gray-600 transition-colors duration-200 px-0.5">
                        {item.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {post.relatedHairstyles && post.relatedHairstyles.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-black tracking-tight mb-6">Related Hairstyles</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {post.relatedHairstyles.map((h: { _id: string; title: string; slug: string; image?: object }) => (
                    <a key={h._id} href={`/hairstyles/${h.slug}`} className="group flex flex-col gap-2">
                      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
                        <ImgPlaceholder
                          src={h.image ? urlFor(h.image).width(300).url() : undefined}
                          alt={h.title}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <span className="text-sm font-black text-black tracking-tight group-hover:text-gray-600 transition-colors duration-200 px-0.5">
                        {h.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* Back link */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-8">
          <a href="/blog" className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-black transition-colors duration-200 group w-fit">
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current rotate-180 group-hover:-translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
            Back to Blog
          </a>
        </div>
      </div>
    </main>
  )
}
