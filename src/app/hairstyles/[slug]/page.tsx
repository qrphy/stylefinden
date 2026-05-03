// Saç stili detay sayfası — Sanity'den tek bir hairstyle'ı slug ile çeker.
// Sanity'de bulunamazsa notFound() ile 404 döndürür; statik fallback yoktur.
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { HAIRSTYLE_QUERY } from "@/lib/queries"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"

type Props = { params: Promise<{ slug: string }> }

// UI etiketleri — schema value'larıyla eşleşmeli
const typeLabel: Record<string, string> = {
  straight: "Straight", wavy: "Wavy", curly: "Curly", coily: "Coily",
}
const lengthLabel: Record<string, string> = {
  short: "Short", medium: "Medium", long: "Long",
}
const moodLabel: Record<string, string> = {
  casual: "Casual", formal: "Formal", editorial: "Editorial", romantic: "Romantic",
}
const occasionLabel: Record<string, string> = {
  everyday: "Everyday", work: "Work", evening: "Evening", special: "Special Occasion", bridal: "Bridal",
}

// Build zamanında Sanity'deki tüm hairstyle slug'larını SSG ile üretir
export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "hairstyle" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const hairstyle = await client.fetch(HAIRSTYLE_QUERY, { slug })
  if (!hairstyle) return {}
  return {
    title: hairstyle.title,
    description: hairstyle.description ?? `Discover the ${hairstyle.title} hairstyle on STYLEFINDEN.`,
    alternates: { canonical: `https://stylefinden.com/hairstyles/${slug}` },
  }
}

export default async function HairstylePage({ params }: Props) {
  const { slug } = await params
  const hairstyle = await client.fetch(HAIRSTYLE_QUERY, { slug })
  if (!hairstyle) notFound()

  const imageUrl = hairstyle.image ? urlFor(hairstyle.image).width(800).height(1067).url() : undefined

  return (
    <main>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-8 pb-2">
        <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href="/hairstyles" className="hover:text-black transition-colors">Hairstyles</a>
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{hairstyle.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 xl:gap-16">
          <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
            <ImgPlaceholder src={imageUrl} alt={hairstyle.title} className="absolute inset-0 w-full h-full" />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-wrap gap-2">
              {hairstyle.type && (
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-black text-white">
                  {typeLabel[hairstyle.type] ?? hairstyle.type}
                </span>
              )}
              {hairstyle.length && (
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-gray-100 text-gray-700">
                  {lengthLabel[hairstyle.length] ?? hairstyle.length}
                </span>
              )}
              {hairstyle.mood && (
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-gray-200 text-gray-600">
                  {moodLabel[hairstyle.mood] ?? hairstyle.mood}
                </span>
              )}
              {hairstyle.occasion && (
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-gray-50 text-gray-500">
                  {occasionLabel[hairstyle.occasion] ?? hairstyle.occasion}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-black text-black tracking-tight leading-tight">
              {hairstyle.title}
            </h1>
            {hairstyle.description && (
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">{hairstyle.description}</p>
            )}
            {hairstyle.tags && hairstyle.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {hairstyle.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <a
              href="/hairstyles"
              className="self-start mt-2 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-black transition-colors duration-200 group"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current rotate-180 group-hover:-translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              Back to Hairstyles
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Style your look</span>
            <span className="text-lg font-black text-black tracking-tight">Find matching outfits</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/outfits" className="px-8 py-3 bg-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-200">
              Browse Outfits
            </a>
            <a href="/hairstyles" className="px-8 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200">
              All Hairstyles
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
