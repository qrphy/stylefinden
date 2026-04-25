import Link from "next/link";

export default function Header() {
  return (
    <header>
      <style>{`
        details .icon-hamburger { display: block; }
        details .icon-close     { display: none;  }
        details[open] .icon-hamburger { display: none;  }
        details[open] .icon-close     { display: block; }
      `}</style>

      {/* Desktop Navigation*/}
      <div className="hidden md:flex items-center bg-white w-full border-b border-gray-200 shadow-sm relative
                      h-14 px-4
                      lg:h-20 lg:px-6
                      xl:h-20 xl:px-8">

        {/* Logo */}
        <Link rel="stylesheet" href="/" className="flex items-center gap-1 rounded-xl">
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
          <a href="/outfits"
            className="font-medium uppercase text-gray-600 hover:text-black transition-colors duration-200
                       text-sm tracking-widest
                       lg:text-sm lg:tracking-widest
                       xl:text-sm xl:tracking-widest">
            Outfits
          </a>
          <a href="/hairstyles"
            className="font-medium uppercase text-gray-600 hover:text-black transition-colors duration-200
                       text-sm tracking-widest
                       lg:text-sm lg:tracking-widest
                       xl:text-sm xl:tracking-widest">
            Hairstyles
          </a>
          <a href="/accessories"
            className="font-medium uppercase text-gray-600 hover:text-black transition-colors duration-200
                       text-sm tracking-widest
                       lg:text-sm lg:tracking-widest
                       xl:text-sm xl:tracking-widest">
            Accessories
          </a>
          <a href="/trends"
            className="font-medium uppercase text-gray-600 hover:text-black transition-colors duration-200
                       text-sm tracking-widest
                       lg:text-sm lg:tracking-widest
                       xl:text-sm xl:tracking-widest">
            Trends
          </a>
          <a href="/blog"
            className="font-medium uppercase text-gray-600 hover:text-black transition-colors duration-200
                       text-sm tracking-widest
                       lg:text-sm lg:tracking-widest
                       xl:text-sm xl:tracking-widest">
            Blog
          </a>
          <a href="/style-guide"
            className="font-medium uppercase text-gray-600 hover:text-black transition-colors duration-200
                       text-sm tracking-widest
                       lg:text-sm lg:tracking-widest
                       xl:text-sm xl:tracking-widest">
            Style Guide
          </a>
        </div>
      </div>

      {/* Mobil Navigation */}
      <details className="relative md:hidden">
        <summary className="list-none relative flex items-center p-4 bg-white border-b border-gray-200 shadow-sm w-full">

          {/* Hamburger Menu Icon */}
          <svg
            viewBox="0 0 24 24"
            className="icon-hamburger h-6 w-6 stroke-black/70 shrink-0 z-10"
            fill="none"
            strokeWidth={1.5}
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>

          {/* X Icon */}
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
          <a href="/outfits" className="block px-4 py-2 text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Outfits
          </a>
          <a href="/hairstyles" className="block px-4 py-2 text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Hairstyles
          </a>
          <a href="/accessories" className="block px-4 py-2 text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Accessories
          </a>
          <a href="/trends" className="block px-4 py-2 text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Trends
          </a>
          <a href="/blog" className="block px-4 py-2 text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Blog
          </a>
          <a href="/style-guide" className="block px-4 py-2 text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Style Guide
          </a>
        </div>
      </details>
    </header>
  );
}
