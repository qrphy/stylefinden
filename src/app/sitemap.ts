import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://stylefinden.com";

  return [
    { url: base,                                    lastModified: new Date(), changeFrequency: "daily",   priority: 1 },
    { url: `${base}/outfits`,                       lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${base}/outfits/season/summer`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/outfits/season/winter`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/outfits/season/autumn`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/outfits/season/spring`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/outfits/style/boho`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/style/minimalist`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/style/streetstyle`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/style/classic`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/office`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/evening`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/casual`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/beach`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/festival`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/outfits/occasion/date-night`,   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/hairstyles`,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/accessories`,                   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/trends`,                        lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/blog`,                          lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/blog/trend-reports`,            lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/blog/hairstyle-guides`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/blog/accessories-guides`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/blog/occasion-guides`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/blog/seasonal-guides`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/style-guide`,                   lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal`,                          lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/privacy`,                       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/contact`,                       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
  ];
}
