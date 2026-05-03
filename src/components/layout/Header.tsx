// Site üst navigasyon çubuğu — masaüstünde logo + ortalanmış nav linkleri, mobilde MobileMenu bileşeni görünür.
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { navLinks } from "@/constants/navigation";

export default function Header() {
  return (
    <header>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center bg-white w-full border-b border-gray-200 shadow-sm relative
                      h-14 px-4
                      lg:h-20 lg:px-6
                      xl:h-20 xl:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 rounded-xl">
          <img
            src="/stylefinden-logo.png"
            alt="STYLEFINDEN"
            className="w-auto object-contain z-10
                       h-10
                       lg:h-14
                       xl:h-16"
          />
        </Link>

        {/* Nav Links */}
        <div className="absolute inset-x-0 flex justify-center items-center
                        gap-6
                        lg:gap-10
                        xl:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-medium uppercase text-gray-600 hover:text-black transition-colors duration-200
                         text-sm tracking-widest"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu />

    </header>
  );
}
