// Blog kategori listeleme sayfası bileşeni — tüm blog kategori sayfaları bu bileşeni kullanır.
// Breadcrumb, hero, post grid ve boş durum bölümlerini içerir.
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { POSTS_BY_CATEGORY_QUERY } from "@/lib/queries"
import type { BlogCategoryConfig } from "@/lib/blog-category-config"
import Link from "next/link"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"

type Props = {
  category: string
  config: BlogCategoryConfig
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default async function BlogCategoryPage({ category, config }: Props) {
  const posts = await client.fetch(
    POSTS_BY_CATEGORY_QUERY,
    { category },
    { next: { revalidate: 3600, tags: ["post"] } },
  )

  return (
    <main className="flex-1 bg-white">

      {/* ── Breadcrumb ── */}
      <div className="container-page pt-8 pb-2">
        <nav className="breadcrumb-nav">
          {[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: config.label },
          ].map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="breadcrumb-link">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-black">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="w-full border-b border-gray-100">
        <div className="container-page py-12 md:py-16 xl:py-20">
          <div className="flex flex-col gap-5 max-w-2xl">
            <span className="eyebrow">
              Blog
            </span>
            <h1 className="hero-heading">
              {config.label}
            </h1>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
              {config.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── Posts Grid ── */}
      <section className="w-full">
        <div className="container-page py-12 md:py-16">

          <div className="flex items-center gap-4 mb-8">
            <span className="eyebrow">
              {posts.length > 0 ? `${posts.length} Article${posts.length !== 1 ? "s" : ""}` : "Articles"}
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {posts.map((post: {
                _id: string
                title: string
                slug: string
                excerpt?: string
                heroImage?: object
                category?: string
                publishedAt?: string
                tags?: string[]
              }) => {
                const imgSrc = post.heroImage
                  ? urlFor(post.heroImage).width(1400).height(788).url()
                  : undefined

                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col border border-gray-100 hover:border-gray-300 transition-colors duration-200 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-gray-100 aspect-[16/9]">
                      <ImgPlaceholder src={imgSrc} alt={post.title} />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
                      {post.category && (
                        <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase bg-black text-white">
                          {config.label}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 p-5 flex-1">
                      {post.publishedAt && (
                        <span className="text-xs tracking-widest uppercase text-gray-400">
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                      <h2 className="text-base font-black text-black tracking-tight leading-snug group-hover:text-gray-600 transition-colors duration-200">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black group-hover:gap-3 transition-[gap] duration-200 mt-auto pt-4 border-t border-gray-100">
                        Read More
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth={2}>
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-20 border border-gray-100">
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-300">
                Coming Soon
              </span>
              <p className="text-sm text-gray-500 leading-relaxed text-center max-w-xs">
                No posts yet — check back soon.
              </p>
              <Link
                href="/blog"
                className="mt-2 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-500 transition-colors duration-200"
              >
                All Articles
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          )}

        </div>
      </section>

    </main>
  )
}
