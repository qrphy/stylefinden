// Tüm blog kategori verilerinin tek kaynağı — BlogCategoryPage bu dosyadan okur.

export type BlogCategoryConfig = {
  label: string
  description: string
  seo: { title: string; description: string; keywords: string[] }
}

export const BLOG_CATEGORY_CONFIGS: Record<string, BlogCategoryConfig> = {
  "trend-reports": {
    label: "Trend Reports",
    description:
      "In-depth coverage of the season's biggest fashion movements — from runway analysis and key silhouettes to colour stories and the pieces worth investing in.",
    seo: {
      title: "Trend Reports – In-Depth Fashion Trend Analysis",
      description:
        "Read in-depth fashion trend reports: runway analysis, seasonal colour stories, key silhouettes and the pieces defining fashion right now.",
      keywords: [
        "Fashion Trend Reports",
        "Runway Analysis",
        "Fashion Trend Analysis",
        "Season Fashion Trends",
        "Key Pieces Fashion",
        "Colour Story Fashion",
        "Fashion Forecasting",
        "Style Trend Coverage",
      ],
    },
  },

  "hairstyle-guides": {
    label: "Hairstyle Guides",
    description:
      "Expert guidance on cuts, colours and styling techniques — from the season's trending looks to step-by-step tutorials and care advice for every hair type.",
    seo: {
      title: "Hairstyle Guides – Cuts, Colours & Styling Tutorials",
      description:
        "Discover hairstyle guides: trending cuts, colour techniques, styling tutorials and expert hair care advice for every hair type and texture.",
      keywords: [
        "Hairstyle Guides",
        "Hair Tutorials",
        "Haircut Guide",
        "Hair Colour Guide",
        "Hair Styling Tips",
        "Best Hairstyles",
        "Hair Care Advice",
        "Hairstyle Trends Guide",
      ],
    },
  },

  "accessories-guides": {
    label: "Accessories Guides",
    description:
      "Everything you need to know about bags, shoes and jewellery — how to choose, layer and style the finishing touches that complete every look.",
    seo: {
      title: "Accessories Guides – Bags, Shoes & Jewellery Styling Tips",
      description:
        "Read accessories guides: how to choose and style bags, shoes and jewellery — layering tips, seasonal must-haves and the finishing touches that elevate every outfit.",
      keywords: [
        "Accessories Guides",
        "Bag Styling Guide",
        "Shoe Guide",
        "Jewellery Styling Tips",
        "How to Style Accessories",
        "Accessories Fashion",
        "Statement Accessories Guide",
        "Fashion Accessories Advice",
      ],
    },
  },

  "occasion-guides": {
    label: "Occasion Guides",
    description:
      "Curated styling advice for every event and moment — from office dressing and wedding guest looks to date night outfits and festival fashion.",
    seo: {
      title: "Occasion Guides – What to Wear for Every Event",
      description:
        "Discover occasion guides: expert styling advice on what to wear for work, weddings, dates, parties, festivals and every special moment.",
      keywords: [
        "Occasion Dressing Guide",
        "What to Wear Guide",
        "Event Outfit Guide",
        "Wedding Guest Outfit",
        "Date Night Guide",
        "Office Dressing Guide",
        "Party Outfit Guide",
        "Festival Style Guide",
      ],
    },
  },

  "seasonal-guides": {
    label: "Seasonal Guides",
    description:
      "How to dress beautifully through every season — capsule wardrobe building, transitional layering, body type tips and the key pieces to shop each season.",
    seo: {
      title: "Seasonal Guides – How to Dress for Every Season",
      description:
        "Read seasonal style guides: capsule wardrobes, body type advice, transitional layering tips and the key pieces to build your wardrobe each season.",
      keywords: [
        "Seasonal Style Guide",
        "Capsule Wardrobe Guide",
        "How to Dress for Winter",
        "Summer Style Guide",
        "Transitional Dressing Guide",
        "Body Type Guide",
        "Wardrobe Building Guide",
        "Seasonal Fashion Advice",
      ],
    },
  },
}

export function getBlogCategoryConfig(category: string): BlogCategoryConfig {
  return (
    BLOG_CATEGORY_CONFIGS[category] ?? {
      label: category
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      description: `Browse our curated collection of ${category.replace(/-/g, " ")} articles.`,
      seo: {
        title: `${category
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")} – Fashion Guides`,
        description: `Read our curated ${category.replace(/-/g, " ")} guides and articles.`,
        keywords: [category.replace(/-/g, " ")],
      },
    }
  )
}
