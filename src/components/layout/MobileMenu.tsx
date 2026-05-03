// Mobil navigasyon menüsü — <details> HTML elementi ile CSS-only aç/kapa.
// details[open] durumuna göre hamburger/X ikonu değiştirilir; JavaScript state kullanılmaz.
import { navLinks } from "@/constants/navigation";

export default function MobileMenu() {
  return (
    <details className="relative md:hidden">
      <style>{`
        details .icon-hamburger { display: block; }
        details .icon-close     { display: none;  }
        details[open] .icon-hamburger { display: none;  }
        details[open] .icon-close     { display: block; }
      `}</style>

      <summary className="list-none relative flex items-center p-4 bg-white border-b border-gray-200 shadow-sm w-full">
        {/* Hamburger Icon */}
        <svg
          viewBox="0 0 24 24"
          className="icon-hamburger h-6 w-6 stroke-black/70 shrink-0 z-10"
          fill="none"
          strokeWidth={1.5}
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>

        {/* Close Icon */}
        <svg
          viewBox="0 0 24 24"
          className="icon-close h-6 w-6 stroke-black/70 shrink-0 z-10"
          fill="none"
          strokeWidth={1.5}
        >
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>

        <h1 className="absolute inset-x-0 text-3xl font-black text-black text-center pointer-events-none">
          STYLEFINDEN
        </h1>
      </summary>

      <div className="absolute left-0 w-40 border border-black/10 bg-white shadow-md">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block px-4 py-2 text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </details>
  );
}
