// Tüm sayfaları saran kök düzen — her sayfada tekrar eden yapıyı (Header, Footer, analytics, newsletter) tek yerden yönetir.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import CookieBanner from "@/components/analytics/CookieBanner"
import Header from "@/components/layout/Header"
import NewsletterForm from "@/components/shared/NewsletterForm"
import Footer from "@/components/layout/Footer"
import ScrollToTop from "@/components/shared/ScrollToTop"
import NewsletterPopup from "@/components/shared/NewsletterPopup"
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

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash-display",
  weight: "200 700",
});

const poppins = localFont({
  src: "./fonts/Poppins-Variable.woff2",
  variable: "--font-poppins",
  weight: "100 900",
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
  description: "STYLEFINDEN is your fashion platform for outfit ideas, hairstyles, accessories and style trends — curated for modern women.",
  keywords: [
    "STYLEFINDEN",
    "outfit ideas for women",
    "women outfit ideas",
    "casual outfits",
    "cute outfits",
    "party outfit ideas",
    "summer outfits",
    "winter outfits",
    "aesthetic outfits",
    "street style",
    "fashion trends 2026",
    "hairstyle ideas",
    "hair style women",
    "accessories ideas",
    "jewelry trends",
    "style inspiration",
    "women fashion",
    "fashion blog",
    "outfit inspiration",
    "style guide",
    "Stylefinden",
    "style finden",
    "style finden blog",
    "stylefinder",
    "stylefinder blog",
    "stylefinder guide",
    "stylefinder inspiration",
    "stylefinder outfits",
    "stylefinder hairstyles",
    "stylefinder accessories",
    "stylefinder trends",
    "stylefinder blog",
    "stylefinder guide",
    "stylefinder inspiration",
    "stylefinder outfits",
    "stylefinder hairstyles",
    "stylefinder accessories",
    "stylefinder trends",
    "stylefinder blog",
    "stylefinder guide",
    "stylefinder inspiration",
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
      className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} ${poppins.variable} h-full antialiased`}
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
        {/* Newsletter popup — 8 sn sonra açılır, localStorage ile tekrar rahatsız etmez */}
        <NewsletterPopup />
        <Footer />
        {/* Sanity Live Preview — Sanity Studio'dan gerçek zamanlı içerik güncellemelerini dinler */}
        <SanityLive />
      </body>
    </html>
  );
}
