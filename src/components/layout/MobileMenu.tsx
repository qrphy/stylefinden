// Mobil navigasyon — logo <details> dışında <a> olarak ana sayfaya yönlendirir.
// CSS-only hamburger toggle; dropdown z-50 ile sayfa içeriğinin üzerinde görünür.
import { navLinks } from "@/constants/navigation"

export default function MobileMenu() {
  return (
    <div className="relative md:hidden flex items-center h-14 px-4 bg-white border-b border-gray-200">
      <style>{`
        details .icon-hamburger { display: block; }
        details .icon-close     { display: none;  }
        details[open] .icon-hamburger { display: none;  }
        details[open] .icon-close     { display: block; }
      `}</style>

      {/* Hamburger — z-10 ile logonun tıklama alanının üstünde */}
      <details className="relative z-10">
        <summary className="list-none flex items-center p-1 cursor-pointer">
          <svg viewBox="0 0 24 24" className="icon-hamburger h-6 w-6 stroke-black/70 shrink-0" fill="none" strokeWidth={1.5}>
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg viewBox="0 0 24 24" className="icon-close h-6 w-6 stroke-black/70 shrink-0" fill="none" strokeWidth={1.5}>
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </summary>

        {/* Dropdown — z-50 ile sayfa içeriği üzerinde */}
        <div className="absolute left-0 top-full z-50 w-44 border border-black/10 bg-white">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200 border-b border-gray-50 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      </details>

      {/* Logo — <details> dışında, <a> olarak ana sayfaya yönlendirir */}
      <a
        href="/"
        className="absolute inset-x-0 flex justify-center items-center h-14 text-2xl font-black text-black tracking-tight hover:text-gray-700 transition-colors duration-200"
      >
        STYLEFINDEN
      </a>
    </div>
  )
}
