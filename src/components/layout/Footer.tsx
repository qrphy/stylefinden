// Site alt bilgisi — logo, Discover linkleri, Legal linkleri ve sosyal medya ikonları.
// Mobilde her bölüm <details> akordiyonu olarak açılır/kapanır (CSS-only, JavaScript gerektirmez).
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <style>{`
        .footer-accordion > .accordion-content {
          display: none;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 0.5rem;
        }
        .footer-accordion[open] > .accordion-content {
          display: flex;
        }
        .chevron {
          transition: transform 0.2s ease;
        }
        .footer-accordion[open] .chevron {
          transform: rotate(180deg);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">

          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <img
              src="/stylefinden-logo.png"
              alt="STYLEFINDEN"
              className="h-20 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
            <p className="brand-logo text-xl">stylefinden</p>
            <p className="meta-label">
              The Style Platform
            </p>
          </div>

          {/* Desktop — Discover */}
          <div className="hidden md:flex flex-col gap-3">
            <span className="footer-heading mb-1">Discover</span>
            <a href="/outfits"     className="footer-link">Outfits</a>
            <a href="/hairstyles"  className="footer-link">Hairstyles</a>
            <a href="/accessories" className="footer-link">Accessories</a>
            <a href="/trends"      className="footer-link">Trends</a>
            <a href="/blog"        className="footer-link">Blog</a>
            <a href="/style-guide" className="footer-link">Style Guide</a>
          </div>

          {/* Mobile accordion — Discover */}
          <details className="footer-accordion md:hidden">
            <summary className="list-none flex items-center justify-between cursor-pointer py-3 border-b border-gray-100">
              <span className="footer-heading font-bold">Discover</span>
              <svg viewBox="0 0 24 24" className="chevron h-4 w-4 stroke-gray-400" fill="none" strokeWidth={2}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="accordion-content flex-col gap-3">
              <a href="/outfits"     className="footer-link">Outfits</a>
              <a href="/hairstyles"  className="footer-link">Hairstyles</a>
              <a href="/accessories" className="footer-link">Accessories</a>
              <a href="/trends"      className="footer-link">Trends</a>
              <a href="/blog"        className="footer-link">Blog</a>
              <a href="/style-guide" className="footer-link">Style Guide</a>
            </div>
          </details>

          {/* Desktop — Legal */}
          <div className="hidden md:flex flex-col gap-3">
            <span className="footer-heading mb-1">Legal</span>
            <a href="/legal"   className="footer-link">Legal Notice</a>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/contact" className="footer-link">Contact</a>
          </div>

          {/* Mobile accordion — Legal */}
          <details className="footer-accordion md:hidden">
            <summary className="list-none flex items-center justify-between cursor-pointer py-3 border-b border-gray-100">
              <span className="footer-heading font-bold">Legal</span>
              <svg viewBox="0 0 24 24" className="chevron h-4 w-4 stroke-gray-400" fill="none" strokeWidth={2}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="accordion-content flex-col gap-3">
              <a href="/legal"   className="footer-link">Legal Notice</a>
              <a href="/privacy" className="footer-link">Privacy Policy</a>
              <a href="/contact" className="footer-link">Contact</a>
            </div>
          </details>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="footer-heading">
              Follow Us
            </span>
            <div className="flex items-center gap-4">

              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-500 hover:text-black transition-colors duration-200">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <a href="https://pinterest.com" aria-label="Pinterest" className="text-gray-500 hover:text-black transition-colors duration-200">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>

              <a href="https://tiktok.com" aria-label="TikTok" className="text-gray-500 hover:text-black transition-colors duration-200">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                </svg>
              </a>

            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-100 px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="meta-label">The Style Platform</span>
        <span className="meta-label">© {new Date().getFullYear()} Stylefinden</span>
      </div>

    </footer>
  );
}
