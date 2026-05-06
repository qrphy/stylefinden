// Tüm sayfaları saran kök düzen — her sayfada tekrar eden yapıyı (Header, Footer, analytics, newsletter) tek yerden yönetir.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import CookieBanner from "@/components/analytics/CookieBanner"
import Header from "@/components/layout/Header"
import NewsletterForm from "@/components/shared/NewsletterForm"
import Footer from "@/components/layout/Footer"
import ScrollToTop from "@/components/shared/ScrollToTop"
import { SanityLive } from "@/sanity/lib/live"

// Geist yazı tipi ailesini CSS değişkeni olarak tanımla; tüm sayfalar bu değişkeni kullanır.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Sitenin varsayılan SEO metadata'sı — her sayfada override edilebilir, edilmezse bu değerler kullanılır.
export const metadata: Metadata = {
  metadataBase: new URL("https://stylefinden.com"),
  alternates: {
    canonical: "https://stylefinden.com",
  },
  title: {
    default: "STYLEFINDEN",
    template: "%s | STYLEFINDEN",
  },
  description: "STYLEFINDEN is your fashion platform for outfits, hairstyles, accessories and style inspiration — curated for modern women.",
  keywords: [
    "STYLEFINDEN",
    "stylefinden",
    "fashion",
    "style",
    "outfits",
    "hairstyles",
    "accessories",
    "trends",
    "style guide",
    "women fashion",
    "fashion inspiration",
    "fashion ideas",
    "fashion trends",
    "fashion guide",
    "fashion blog",
    "fashion tips",
    "fashion inspiration",
    "fashion ideas",
    "style finder",
    "style find",
    "find a style",
    "find a outfit",
    "outfit finder",
    "trend clothes",
    "trend hairstyle",
    "trend fashion",
    "still finder",
    "still find",
    "find a still",
  ],
  openGraph: {
    title: "STYLEFINDEN",
    description: "Your fashion platform for outfits, hairstyles and style inspiration.",
    url: "https://stylefinden.com",
    siteName: "STYLEFINDEN",
    locale: "en_US",
    type: "website",
    images: [{ url: "/stylefinden-logo.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "STYLEFINDEN",
    description: "Your fashion platform for outfits, hairstyles and style inspiration.",
    images: ["/stylefinden-logo.png"],
  },
  icons: {
    icon: '/stylefinden-icon.ico',
    shortcut: '/stylefinden-icon.ico',
    apple: '/stylefinden-icon.ico',
    other: {
      rel: 'icon',
      url: 'stylefinden-icon.ico',
    },
  },
  authors: [{ name: "STYLEFINDEN", url: "https://stylefinden.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html

      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Üst navigasyon çubuğu — tüm sayfalarda sabit */}
        <Header />
        {/* Sayfanın kendi içeriği burada render edilir */}
        {children}
        {/* Vercel Analytics ve Speed Insights — performans ve kullanım takibi */}
        <Analytics />
        <SpeedInsights />
        {/* Google Analytics — cookie onayı alındıktan sonra aktif olur */}
        <GoogleAnalytics />
        {/* GDPR uyumlu cookie onay bandı */}
        <CookieBanner />
        {/* Newsletter bölümü — footer'dan önce her sayfada görünür */}
        <NewsletterForm />
        <ScrollToTop />
        <Footer />
        {/* Sanity Live Preview — Sanity Studio'dan gerçek zamanlı içerik güncellemelerini dinler */}
        <SanityLive />
      </body>
    </html>
  );
}
