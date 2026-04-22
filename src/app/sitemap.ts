import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://stylefinden.com";

  return [
    { url: base,                              lastModified: new Date(), changeFrequency: "daily",   priority: 1 },
    { url: `${base}/outfits`,                 lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/outfits/season/summer`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/outfits/season/winter`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/outfits/season/herbst`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/outfits/season/fruehling`,lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/outfits/style/boho`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/style/minimalist`,lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/style/streetstyle`,lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/outfits/style/classic`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/buero`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/abend`,  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/casual`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/strand`, lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/festival`,lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/outfits/occasion/date-night`,lastModified: new Date(), changeFrequency: "weekly",priority: 0.7 },
    { url: `${base}/frisuren`,                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/accessoires`,             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/trends`,                  lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/blog`,                    lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
  ];
}
