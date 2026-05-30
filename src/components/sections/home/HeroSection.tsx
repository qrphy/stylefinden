// Ana sayfa hero bölümü — editöryal tam-yükseklik layout
// Editorial meta bar + 7/5 grid: devasa başlık sola, dikey görsel sağa
// Grid container-page dışında — sağ görsel viewport kenarına kadar uzanır (full-bleed)
import Link from "next/link"
import ImgPlaceholder from "@/components/shared/ImgPlaceholder";

export default function HeroSection() {
  return (
    <section className="w-full bg-white overflow-hidden flex flex-col min-h-[100svh]">

      {/* Editorial meta bar */}
      <div className="border-b border-gray-100 shrink-0">
        <div className="container-page py-3 flex items-center justify-center">
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-400">
            Outfit Ideas · Hairstyles · Accessories · Trends
          </span>
        </div>
      </div>

      {/* Main editorial grid — full viewport width, sağ görsel viewport kenarına uzanır */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12">

        {/* Left column — container-page padding ile eşleştirildi */}
        <div className="md:col-span-7 flex flex-col justify-between py-10 md:py-14 xl:py-16
                        pl-6 md:pl-8 xl:pl-12
                        pr-6 md:pr-10 xl:pr-16">

          <h1 className="font-display text-[clamp(52px,9vw,128px)] font-normal text-black leading-[0.9] tracking-tight">
            Find your<br />
            next<br />
            <span className="italic font-light">perfect</span><br />
            look.
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed mt-6 max-w-xs">
            Curated outfits for every occasion and style — updated weekly.
          </p>

          <div className="flex items-center gap-6 pt-8 border-t border-gray-100 mt-6 md:mt-0">
            <Link
              href="/outfits"
              className="group flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-400 transition-colors duration-200"
            >
              Explore the Collection
              <svg viewBox="0 0 24 24" className="size-3 stroke-current group-hover:translate-x-0.5 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <span className="w-px h-4 bg-gray-200" />
            <Link
              href="/trends"
              className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
            >
              Summer 2026 Trends
            </Link>
          </div>
        </div>

        {/* Right column — iç padding kaldırıldı, görsel viewport sağ kenarına kadar uzanır */}
        <div className="hidden md:block md:col-span-5 relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-100" />
          <div className="absolute inset-0">
            <div className="relative h-full overflow-hidden bg-white">
              <ImgPlaceholder
                src="https://cdn.sanity.io/images/29dp442n/production/666e85f82cb0fbfa5affe8d7b1ff7d62b6ce1225-1772x2368.webp"
                alt="Brown Lace Crop & Sequin Mini Skirt"
                blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAbABQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAIDBQYHCP/EACYQAAICAgEDAgcAAAAAAAAAAAECAwQAEQUGEjEHYQgTIUFCUZH/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EABcRAQEBAQAAAAAAAAAAAAAAAAEAEQL/2gAMAwEAAhEDEQA/AOieSlFetNM3iNC38GZ96e9bp1SbMMwCWYyWVQNbTestfW/JDjumOTtdhf5cLEKPv9Mx34e+2ZeQtvA8EjMdB/JHt7Zj2ul0cAittWGJ7xhiihudsJe4+zWm7WjkQqw3lN6N5KFbyVKsaxlITsfvR1kyyK5IYbBxujxlKvejmhrokoBHcvnWJNdqHDKxCxLr8cMbXxhhTf/Z"
                sizes="(max-width: 768px) 0px, 42vw"
                objectFit="contain"
                objectPosition="center"
                priority
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Mobile image strip */}
      <div className="md:hidden">
        <div className="container-page pb-10">
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <ImgPlaceholder
              src="https://cdn.sanity.io/images/29dp442n/production/666e85f82cb0fbfa5affe8d7b1ff7d62b6ce1225-1772x2368.webp"
              alt="Brown Lace Crop & Sequin Mini Skirt"
              blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAbABQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAIDBQYHCP/EACYQAAICAgEDAgcAAAAAAAAAAAECAwQAEQUGEjEHYQgTIUFCUZH/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EABcRAQEBAQAAAAAAAAAAAAAAAAEAEQL/2gAMAwEAAhEDEQA/AOieSlFetNM3iNC38GZ96e9bp1SbMMwCWYyWVQNbTestfW/JDjumOTtdhf5cLEKPv9Mx34e+2ZeQtvA8EjMdB/JHt7Zj2ul0cAittWGJ7xhiihudsJe4+zWm7WjkQqw3lN6N5KFbyVKsaxlITsfvR1kyyK5IYbBxujxlKvejmhrokoBHcvnWJNdqHDKxCxLr8cMbXxhhTf/Z"
              sizes="100vw"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
