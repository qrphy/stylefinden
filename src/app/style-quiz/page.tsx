import type { Metadata } from 'next'
import StyleQuiz from './StyleQuiz'

export const metadata: Metadata = {
  title: 'Style Quiz — Find Your Perfect Outfit | STYLEFINDEN',
  description: 'Answer 3 quick questions and discover outfits curated for your lifestyle, mood, and style personality.',
  alternates: { canonical: 'https://stylefinden.com/style-quiz' },
}

export default function StyleQuizPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container-page py-16 md:py-24">
        <StyleQuiz />
      </div>
    </main>
  )
}
