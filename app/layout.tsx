import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

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
  description: "STYLEFINDEN ist eine Plattform für das Finden des besten Stils für Sie.",
  keywords: [
    "STYLEFINDEN",
    "stylefinden",
    "style",
    "finden",
    "stylefinden.com",
    "find style",
    "styling",
    "outfit",
    "clothes"
  ],
  openGraph: {
    title: "STYLEFINDEN",
    description: "STYLEFINDEN",
    url: "https://stylefinden.com",
    siteName: "STYLEFINDEN",
    locale: "de_DE",
    type: "website",
  },
  icons: {
    icon: '/stylefinden-icon.ico',
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
    
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        <Footer />
      </body>
    </html>
  );
}
