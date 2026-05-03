// Bulunamayan sayfa (404) — Next.js bu bileşeni geçersiz rotalar için otomatik render eder.
export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center bg-white px-6 py-24 md:py-32">
      <div className="flex flex-col items-center text-center gap-8 max-w-md">

        <span className="text-[9rem] md:text-[12rem] font-black text-black leading-none tracking-tighter select-none">
          404
        </span>

        <div className="w-12 h-px bg-gray-300" />

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Page not found
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-black tracking-tight leading-tight">
            This page{" "}
            <span className="italic font-light">doesn&apos;t exist.</span>
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            The page you&apos;re looking for may have been moved, renamed,
            or no longer exists. Let our categories inspire you again.
          </p>
        </div>

        {/* Ana sayfa ve Outfits'e birincil yönlendirme butonları */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <a
            href="/"
            className="w-full sm:w-auto px-8 py-3 bg-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-gray-800 transition-colors duration-200 text-center"
          >
            Go to Homepage
          </a>
          <a
            href="/outfits"
            className="w-full sm:w-auto px-8 py-3 border border-black text-black text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200 text-center"
          >
            Discover Outfits
          </a>
        </div>

        {/* Tüm ana kategorilere hızlı erişim linkleri */}
        <div className="flex flex-col gap-3 w-full pt-2 border-t border-gray-100">
          <span className="text-xs tracking-widest uppercase text-gray-400">
            Or go directly to
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Hairstyles",  href: "/hairstyles" },
              { label: "Accessories", href: "/accessories" },
              { label: "Trends",      href: "/trends" },
              { label: "Blog",        href: "/blog" },
              { label: "Style Guide", href: "/style-guide" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
