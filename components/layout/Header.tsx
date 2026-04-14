export default function Header() {
    return (
      <header>
        <style>{`
          details .icon-hamburger { display: block; }
          details .icon-close     { display: none;  }
          details[open] .icon-hamburger { display: none;  }
          details[open] .icon-close     { display: block; }
        `}</style>
  
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-white w-full h-20 border-b border-gray-200 shadow-sm px-8 relative">

          {/* Logo */}
          <img  
            src="/stylefinden-logo.png"
            alt="STYLEFINDEN"
            className="h-20 w-auto object-contain z-10"
          />

          {/* Nav Links */}
          <div className="absolute inset-x-0 flex justify-center items-center gap-10">
            <a href="/outfits" className="text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Outfits
            </a>
            <a href="/frisuren" className="text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Frisuren
            </a>
            <a href="/accessoires" className="text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
              Accessoires
            </a>
            <a href="/trends" className="text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
              Trends
            </a>
            <a href="/blog" className="text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
              Blog
              </a>
              <a href="/stylingleitfaden" className="text-sm font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Styling Leitfaden
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

            {/* X Icon*/}
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
  
          <div className="absolute left-0 w-40 h-66 border border-black/10 bg-white shadow-md">
            <a href="/outfits" className="block px-4 py-2 text-md font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Outfits
            </a>
            <a href="/frisuren" className="block px-4 py-2 text-md font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Frisuren
            </a>
            <a href="/accessories" className="block px-4 py-2 text-md font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Accessoires
            </a>
            <a href="/trends" className="block px-4 py-2 text-md font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
              Trends
            </a>
            <a href="/blog" className="block px-4 py-2 text-md font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Blog
            </a>
            <a href="/stylingleitfaden" className="block px-4 py-2 text-md font-medium tracking-widest uppercase text-gray-600 hover:text-black transition-colors duration-200">
            Styling Leitfaden
            </a>
          </div>
        </details>
      </header>
    );
  }
  