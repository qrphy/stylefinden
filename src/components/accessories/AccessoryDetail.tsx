import ImgPlaceholder from "@/components/shared/ImgPlaceholder"
import JsonLd from "@/components/seo/JsonLd"
import Button from "@/components/shared/Button"
import OutfitsWithAccessory from "@/components/accessories/OutfitsWithAccessory"
import { urlFor } from "@/sanity/lib/image"
import { accessoryTypeLabel, accessoryOccasionLabel } from "@/lib/accessory-labels"

const BASE = "https://stylefinden.com"

export type AccessoryDetailData = {
  _id: string
  title: string
  slug: string
  description?: string
  image?: object
  type?: string
  occasion?: string
  pairingTip?: string
  tags?: string[]
}

type OutfitCard = {
  _id: string
  title: string
  slug: string
  image?: object
  style?: string
  occasion?: string
}

type Props = {
  item: AccessoryDetailData
  outfits?: OutfitCard[]
}

export default function AccessoryDetail({ item, outfits = [] }: Props) {
  const imageUrl = item.image
    ? urlFor(item.image).width(800).height(1000).url()
    : undefined

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    ...(item.description ? { description: item.description } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    url: `${BASE}/accessories/${item.slug}`,
    brand: { "@type": "Brand", name: "STYLEFINDEN" },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",        item: BASE },
      { "@type": "ListItem", position: 2, name: "Accessories", item: `${BASE}/accessories` },
      { "@type": "ListItem", position: 3, name: item.title },
    ],
  }

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
    <main>
      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <div className="px-3 md:px-5 pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span>/</span>
          <a href="/accessories" className="hover:text-black transition-colors">Accessories</a>
          <span>/</span>
          <span className="text-black truncate max-w-[200px]">{item.title}</span>
        </nav>
      </div>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="py-5 md:py-7">
        <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] items-start">

          {/* Sol — Ana görsel */}
          <div className="pl-2 pr-3 md:pl-3 md:pr-5">
            <div className="relative aspect-[4/5] w-full bg-gray-100 overflow-hidden md:sticky md:top-6">
              <ImgPlaceholder
                src={imageUrl}
                alt={item.title}
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Sağ — Detaylar */}
          <div className="px-4 md:px-6 pr-4 md:pr-5 flex flex-col gap-3">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5">
              {item.type && (
                <span className="px-2 py-1 text-xs font-semibold tracking-widest uppercase bg-black text-white">
                  {accessoryTypeLabel[item.type] ?? item.type}
                </span>
              )}
              {item.occasion && (
                <span className="px-2 py-1 text-xs font-semibold tracking-widest uppercase bg-gray-100 text-gray-700">
                  {accessoryOccasionLabel[item.occasion] ?? item.occasion}
                </span>
              )}
            </div>

            {/* Başlık */}
            <h1 className="text-xl md:text-2xl font-black text-black tracking-tight leading-tight">
              {item.title}
            </h1>

            {/* Açıklama */}
            {item.description && (
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.description}
              </p>
            )}

            {/* Styling tip */}
            {item.pairingTip && (
              <div className="flex flex-col gap-1.5 p-4 bg-gray-50 border border-gray-100">
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Styling tip</span>
                <p className="text-xs text-gray-700 leading-relaxed italic">✦ {item.pairingTip}</p>
              </div>
            )}

            {/* Back link */}
            <Button variant="ghost" href="/accessories" arrow arrowDir="left" className="self-start mt-2">
              Back to Accessories
            </Button>
          </div>
        </div>
      </section>

      {/* ── Outfits featuring this accessory ────────────────────────────────── */}
      <OutfitsWithAccessory outfits={outfits} />

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100">
        <div className="px-3 md:px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Complete your look</span>
            <span className="text-lg font-black text-black tracking-tight">Find matching outfits</span>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="primary" href="/outfits">Browse Outfits</Button>
            <Button variant="outline" href="/accessories">All Accessories</Button>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
