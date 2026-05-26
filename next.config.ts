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
      { source: "/outfits/white-lace-crop-patchwork-tiered-ruffle-skirt",    destination: "/outfits/white-lace-patchwork-mini",          permanent: true },
      { source: "/outfits/pink-puff-sleeve-corset-fairycore-ruffle-skirt",   destination: "/outfits/pink-fairycore-corset-skirt",         permanent: true },
      { source: "/outfits/vintage-gingham-summer",                           destination: "/outfits/vintage-gingham-flare-jeans",         permanent: true },
      { source: "/outfits/sporty-tennis-court-outfit",                       destination: "/outfits/tenniscore-polo-outfit",              permanent: true },
      { source: "/outfits/brown-leather-moto-fringe-cowboy",                 destination: "/outfits/western-moto-jacket-fringe-boots",    permanent: true },
      { source: "/outfits/wild-west-rodeo-tee-wide-leg",                     destination: "/outfits/western-rodeo-tee-wide-leg-jeans",    permanent: true },
      { source: "/outfits/pink-floral-crop-white-floral-layered-mini",       destination: "/outfits/pink-floral-crop-tiered-mini-skirt",  permanent: true },
      { source: "/outfits/daisy-bodysuit-floral-embroidered-flare-jeans",    destination: "/outfits/daisy-bodysuit-embroidered-flare-jeans", permanent: true },
      { source: "/outfits/pink-linen-corset-crop-tiered-ruffle-skirt",       destination: "/outfits/pink-corset-top-ruffle-mini-skirt",   permanent: true },
      { source: "/outfits/embroidered-floral-cardigan-white-lace-mini",      destination: "/outfits/floral-cardigan-lace-mini-skirt",     permanent: true },
      { source: "/outfits/yellow-daisy-floral-coord-set",                    destination: "/outfits/yellow-daisy-coord-set",              permanent: true },
      { source: "/outfits/ivory-lace-ruffle-tie-front-coord",                destination: "/outfits/ivory-lace-ruffle-coord-set",         permanent: true },
      { source: "/outfits/brown-lace-crop-bell-bottom",                      destination: "/outfits/brown-lace-crop-bell-bottom-jeans",   permanent: true },
      { source: "/outfits/grey-moto-jacket-khaki-mini",                      destination: "/outfits/grey-moto-jacket-khaki-mini-skirt",   permanent: true },
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
