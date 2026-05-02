import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { ACCESSORY_QUERY } from "@/lib/queries"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder"

type Props = { params: Promise<{ slug: string }> }

const typeLabel: Record<string, string> = {
  bags: "Bags", jewelry: "Jewelry", shoes: "Shoes", belts: "Belts",
  scarves: "Scarves", hats: "Hats", sunglasses: "Sunglasses", watches: "Watches",
}
const occasionLabel: Record<string, string> = {
  everyday: "Everyday", work: "Work", evening: "Evening", casual: "Casual", special: "Special Occasion",
}

export async function generateStaticParams() {
  const slugs = await client.withConfig({ useCdn: false }).fetch<{ slug: string }[]>(
    `*[_type == "accessory" && defined(slug.current)]{"slug": slug.current}`
  )
  return slugs
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = await client.fetch(ACCESSORY_QUERY, { slug })
  if (!item) return {}
  return {
    title: item.title,
    description: item.description ?? `Discover the ${item.title} accessory on STYLEFINDEN.`,
    alternates: { canonical: `https://stylefinden.com/accessories/${slug}` },
  }
}

export default async function AccessoryPage({ params }: Props) {
  const { slug } = await params
  const item = await client.fetch(ACCESSORY_QUERY, { slug })
  if (!item) notFound()

  const imageUrl = item.image ? urlFor(item.image).width(800).height(1000).url() : undefined

  return (
    <main>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 pt-8 pb-2">
        <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href="/accessories" className="hover:text-black transition-colors">Accessories</a>
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{item.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 xl:gap-16">
          <div className="relative aspect-[4/5] w-full bg-gray-100 overflow-hidden">
            <ImgPlaceholder src={imageUrl} alt={item.title} className="absolute inset-0 w-full h-full" />
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div className="flex flex-wrap gap-2">
              {item.type && (
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-black text-white">
                  {typeLabel[item.type] ?? item.type}
                </span>
              )}
              {item.occasion && (
                <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-gray-100 text-gray-700">
                  {occasionLabel[item.occasion] ?? item.occasion}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-black text-black tracking-tight leading-tight">
              {item.title}
            </h1>
            {item.description && (
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">{item.description}</p>
            )}
            {item.pairingTip && (
              <div className="flex flex-col gap-2 p-5 bg-gray-50 border border-gray-100">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Styling tip</span>
                <p className="text-sm text-gray-700 leading-relaxed italic">✦ {item.pairingTip}</p>
              </div>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {item.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium tracking-widest uppercase bg-white text-gray-700 border border-gray-200">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <a
              href="/accessories"
              className="self-start mt-2 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gray-500 hover:text-black transition-colors duration-200 group"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-current rotate-180 group-hover:-translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
              Back to Accessories
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8 xl:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Complete your look</span>
            <span className="text-lg font-black text-black tracking-tight">Find matching outfits</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="/outfits" className="px-8 py-3 bg-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-200">
              Browse Outfits
            </a>
            <a href="/accessories" className="px-8 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200">
              All Accessories
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
