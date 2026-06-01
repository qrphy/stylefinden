import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import StyleQuiz from './StyleQuiz'
import { STYLE_PROFILES } from '@/lib/style-profiles'

const BASE = 'https://stylefinden.com'

export const metadata: Metadata = {
  title: 'Style Finder Quiz — Discover Your Personal Style | STYLEFINDEN',
  description:
    'Free style quiz to find your personal style in 3 questions. Discover your look — minimalist, boho, Y2K, old money & more. Instant outfit recommendations.',
  alternates: { canonical: `${BASE}/style-quiz` },
  openGraph: {
    title: 'Style Finder Quiz — Discover Your Personal Style',
    description:
      'Take the free STYLEFINDEN quiz. 3 questions. 17 style personalities. Instant outfit recommendations.',
    url: `${BASE}/style-quiz`,
    images: [{ url: `${BASE}/api/og/quiz-result?style=minimalist`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Style Finder Quiz — Discover Your Personal Style',
    description: 'Take the free STYLEFINDEN quiz. 3 questions. 17 style personalities.',
    images: [`${BASE}/api/og/quiz-result?style=minimalist`],
  },
}

const styleNames = Object.values(STYLE_PROFILES)
  .map((p) => p.name)
  .join(', ')

const FAQ_ITEMS = [
  {
    q: 'What is a style finder quiz?',
    a: "A style finder quiz helps you discover your personal style in minutes. Answer a few questions about your lifestyle and preferences, and the tool matches you to a style personality — like Minimalist, Clean Girl, Boho, or Y2K. STYLEFINDEN's style finder then shows real outfit recommendations curated for your result.",
  },
  {
    q: 'How do I discover my personal style?',
    a: "To discover your personal style, start by identifying how you want to dress — for everyday comfort, work, date nights, or special occasions. Then think about how bold or classic you feel. STYLEFINDEN's free style quiz combines these answers to match you to one of 17 style personalities and shows outfits that bring your look to life.",
  },
  {
    q: 'How does the style quiz work?',
    a: "The quiz has 3 quick steps. First, choose what you're dressing for — casual, office, date night, and more. Second, rate how adventurous your style is: classic, balanced, or bold. Third, pick a season. The quiz then finds your style match and shows curated outfit inspiration.",
  },
  {
    q: 'What style personalities can I get?',
    a: `The quiz covers 17 style personalities: ${styleNames}.`,
  },
  {
    q: 'Is the style quiz free?',
    a: 'Yes — the STYLEFINDEN style quiz and style finder are completely free. No sign-up required. Take the quiz and get instant outfit recommendations for your personal style.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'STYLEFINDEN Style Finder Quiz',
  applicationCategory: 'LifestyleApplication',
  description:
    'Free personal style quiz that matches you to one of 17 style personalities and shows curated outfit recommendations.',
  url: `${BASE}/style-quiz`,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  operatingSystem: 'Web',
}

export default function StyleQuizPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={faqSchema} />
      <JsonLd data={webAppSchema} />

      <div className="container-page py-16 md:py-24">
        {/* SEO intro — server-rendered, keyword-rich */}
        <div className="mb-12 md:mb-16">
          <span className="eyebrow mb-2 block">Free Style Quiz</span>
          <h1 className="section-title-lg mt-2">Style Finder</h1>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed max-w-sm">
            Discover your personal style in 3 questions — minimalist, boho, Y2K,
            old money, and 13 more looks.
          </p>
        </div>

        <StyleQuiz />
      </div>

      {/* FAQ — static, crawlable content targeting key search queries */}
      <section className="section-divider">
        <div className="container-page py-12 md:py-16">
          <h2 className="section-title mb-10">About This Quiz</h2>
          <div className="max-w-2xl divide-y divide-gray-100">
            {FAQ_ITEMS.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="list-none flex items-start justify-between gap-4 cursor-pointer text-sm font-semibold tracking-tight text-black">
                  {q}
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 stroke-gray-400 shrink-0 mt-0.5 group-open:rotate-180 transition-transform duration-200"
                    fill="none"
                    strokeWidth={1.5}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p className="text-sm text-gray-500 mt-3 leading-relaxed pr-8">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
