export type StyleProfile = {
  name: string
  tagline: string
  description: string
  traits: string[]
}

export const STYLE_PROFILES: Record<string, StyleProfile> = {
  minimalist: {
    name: 'Minimalist',
    tagline: 'Less, but better.',
    description: 'You believe that a well-chosen piece speaks louder than a full closet. Clean silhouettes, monochrome palettes, and the confidence to let simplicity do the talking.',
    traits: ['Monochrome', 'Clean Lines', 'Capsule Wardrobe', 'Effortless'],
  },
  'clean-girl': {
    name: 'Clean Girl',
    tagline: 'Effortlessly put-together.',
    description: 'Slicked-back bun, gold hoops, dewy skin — your style is the aesthetic equivalent of a Sunday morning that somehow looks editorial. Minimal product, maximum impact.',
    traits: ['Dewy Skin', 'Gold Accents', 'Effortless', 'Natural Palette'],
  },
  classic: {
    name: 'Classic',
    tagline: 'Timeless by design.',
    description: "You reach for the pieces that were fashionable thirty years ago and will be fashionable thirty years from now. A trench coat is not a trend — it's a conviction.",
    traits: ['Trench Coats', 'Investment Dressing', 'Neutral Palette', 'Enduring'],
  },
  'old-money': {
    name: 'Old Money',
    tagline: 'Quiet luxury, loud presence.',
    description: 'Your wardrobe tells a story without shouting it. Tailored blazers, cashmere, and neutral tones that look expensive because they are — or because you wear them like they are.',
    traits: ['Tailored', 'Investment Pieces', 'Neutral Palette', 'Understated'],
  },
  formal: {
    name: 'Classic Formal',
    tagline: 'Dressed to be remembered.',
    description: "Structure, polish, and the quiet authority of a well-cut suit or gown. When the occasion calls for it, you don't just meet the dress code — you redefine it.",
    traits: ['Structured', 'Tailored', 'Occasion-Ready', 'Polished'],
  },
  elegant: {
    name: 'Elegant',
    tagline: "Dressed for the moment you want, not the moment you're in.",
    description: 'Refined without being rigid, your style is about proportion, texture, and the right heel. You walk into rooms, not just enter them.',
    traits: ['Silk', 'Tailored', 'Evening Ready', 'Refined'],
  },
  casual: {
    name: 'Casual Cool',
    tagline: 'Comfort is your aesthetic.',
    description: "You've mastered the art of looking like you tried without trying. Relaxed fits, favourite denim, and layers that work morning to evening without a costume change.",
    traits: ['Relaxed Fit', 'Layering', 'Everyday Wearable', 'Versatile'],
  },
  'retro-vintage': {
    name: 'Retro Vintage',
    tagline: 'The past had better fashion.',
    description: 'Curated, not costume. Your thrift-eye is sharp and your references run deep — from 70s boho to 90s grunge, you borrow the best from every decade.',
    traits: ['Thrifted', 'Decades-Spanning', 'Curated', 'Unique'],
  },
  'sienna-vibe': {
    name: 'Sienna Vibe',
    tagline: 'Sun-warmed and effortlessly chic.',
    description: 'Terracotta, camel, burnt orange — your palette is warm earth and late afternoon light. Borrowed from Mediterranean summers and worn like it was always yours.',
    traits: ['Warm Tones', 'Terracotta', 'Sun-Kissed', 'Effortless'],
  },
  'korean-fashion': {
    name: 'Korean Fashion',
    tagline: 'Soft, structured, and endlessly wearable.',
    description: 'Oversized blazers, schoolgirl silhouettes, and the kind of effortless cool that makes everything look intentional. K-fashion is your reference and your mood.',
    traits: ['Oversized', 'Structured', 'Pastel Tones', 'Proportional Play'],
  },
  boho: {
    name: 'Bohemian',
    tagline: 'Free-spirited, always.',
    description: "Flowy layers, earthy tones, and the instinct to add one more ring. Your style has an artist's soul — textural, wandering, and deeply personal.",
    traits: ['Flowy', 'Earthy Tones', 'Layered Jewelry', 'Textural'],
  },
  y2k: {
    name: 'Y2K',
    tagline: 'Turn back the clock — but make it fashion.',
    description: "Low-rise, butterfly clips, and an unapologetic love of early 2000s pop culture. Your style is a love letter to the internet's first era, rewritten for now.",
    traits: ['Low-Rise', 'Nostalgia', 'Bold Prints', 'Statement Bags'],
  },
  streetstyle: {
    name: 'Street Style',
    tagline: 'The sidewalk is your runway.',
    description: 'Sneakers with everything, graphic layers, and a silhouette that reads confident from a block away. Your looks translate from sidewalk to editorial shoot without adjustment.',
    traits: ['Graphic Layers', 'Sneaker Culture', 'Oversized', 'Statement'],
  },
  'cute-coquette': {
    name: 'Coquette',
    tagline: 'Bows, lace, and an air of mystery.',
    description: 'Feminine with an edge. Your aesthetic lives between innocent and knowing — satin ribbons, soft pink, and just enough mischief to keep it interesting.',
    traits: ['Ribbon Details', 'Satin', 'Soft Pink', 'Feminine Edge'],
  },
  'black-dark': {
    name: 'Dark Aesthetic',
    tagline: 'All black. Always.',
    description: "Your wardrobe is a statement: considered, deliberate, and unapologetically dark. Monochromatic black isn't a color choice — it's a philosophy.",
    traits: ['Monochrome Black', 'Structured', 'Minimal Color', 'Confident'],
  },
  western: {
    name: 'Western',
    tagline: 'The frontier, reimagined.',
    description: "Cowboy boots, fringe, and denim that tells a story. Your style draws on Americana and frontier energy — not costume, but character.",
    traits: ['Cowboy Boots', 'Denim', 'Fringe', 'Americana'],
  },
  festival: {
    name: 'Festival',
    tagline: 'Made for the main stage.',
    description: 'Sequins at noon, statement boots, and layers that somehow work in any weather. Your style is celebratory by nature — built for experiences, not just occasions.',
    traits: ['Sequins', 'Statement Boots', 'Layered', 'Celebratory'],
  },
}
