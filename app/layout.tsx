import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics"

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
    "find style"
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
    icon: 'stylefinden-logo.png',
    shortcut: 'stylefinden-logo.png',
    apple: 'stylefinden-logo.png',
    other: {
      rel: 'icon',
      url: 'stylefinden-logo.png',
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
        {children}
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
