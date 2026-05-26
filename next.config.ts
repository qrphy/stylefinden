import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/frisuren",                         destination: "/hairstyles",              permanent: true },
      { source: "/frisuren/:slug",                   destination: "/hairstyles/:slug",        permanent: true },
      { source: "/accessoires",                      destination: "/accessories",             permanent: true },
      { source: "/accessoires/:slug",                destination: "/accessories/:slug",       permanent: true },
      { source: "/datenschutz",                      destination: "/privacy",                 permanent: true },
      { source: "/kontakt",                          destination: "/contact",                 permanent: true },
      { source: "/stylingleitfaden",                 destination: "/style-guide",             permanent: true },
      { source: "/blog/frisuren-guides",             destination: "/blog/hairstyle-guides",   permanent: true },
      { source: "/blog/frisuren-guides/:slug",       destination: "/blog/hairstyle-guides/:slug", permanent: true },
      { source: "/blog/accessoires-guides",          destination: "/blog/accessories-guides", permanent: true },
      { source: "/blog/accessoires-guides/:slug",    destination: "/blog/accessories-guides/:slug", permanent: true },
      { source: "/outfits/season/herbst",            destination: "/outfits/season/autumn",   permanent: true },
      { source: "/outfits/season/fruehling",         destination: "/outfits/season/spring",   permanent: true },
      { source: "/outfits/occasion/buero",           destination: "/outfits/occasion/office",  permanent: true },
      { source: "/outfits/occasion/abend",           destination: "/outfits/occasion/evening", permanent: true },
      { source: "/outfits/occasion/strand",          destination: "/outfits/occasion/beach",   permanent: true },
      { source: "/impressum",                         destination: "/legal",                    permanent: true },
      { source: "/outfits/white-lace-crop-patchwork-tiered-ruffle-skirt", destination: "/outfits/white-lace-patchwork-mini",   permanent: true },
      { source: "/outfits/pink-puff-sleeve-corset-fairycore-ruffle-skirt", destination: "/outfits/pink-fairycore-corset-skirt", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;
