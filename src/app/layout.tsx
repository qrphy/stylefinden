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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    "women fashion"
  ],
  openGraph: {
    title: "STYLEFINDEN",
    description: "Your fashion platform for outfits, hairstyles and style inspiration.",
    url: "https://stylefinden.com",
    siteName: "STYLEFINDEN",
    locale: "en_US",
    type: "website",
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
        <Header />
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        <CookieBanner />
        <NewsletterForm />
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
