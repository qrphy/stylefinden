'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { detectSeason } from '@/lib/detect-season'

// Q1 — What is your main goal when getting dressed?
const GOAL_OPTIONS = [
  {
    value: 'office',
    label: 'Work & Professional',
    description: 'Meetings, office, presentations',
  },
  {
    value: 'casual',
    label: 'Everyday Comfort',
    description: 'Errands, coffee, casual hangouts',
  },
  {
    value: 'date-evening',
    label: 'Date Night',
    description: 'Dinner, romantic evenings, shows',
  },
  {
    value: 'party-night-out',
    label: 'Going Out',
    description: 'Parties, clubs, night events',
  },
  {
    value: 'travel',
    label: 'Travel & Adventure',
    description: 'Trips, exploring, on-the-go',
  },
  {
    value: 'wedding',
    label: 'Special Occasion',
    description: 'Weddings, galas, ceremonies',
  },
]

// Q2 — How adventurous is your style?
type Adventure = 'classic' | 'balanced' | 'bold'

const ADVENTURE_OPTIONS: { value: Adventure; label: string; description: string }[] = [
  { value: 'classic', label: 'Keep it timeless', description: 'Clean lines, neutral palette, nothing trendy' },
  { value: 'balanced', label: 'Mix classic & fresh', description: 'A few trends, mostly wearable pieces' },
  { value: 'bold',    label: 'Stand out',           description: 'Statement pieces, color, personality' },
]

// Q2 result → style candidates
const ADVENTURE_STYLES: Record<Adventure, string[]> = {
  classic:  ['minimalist', 'clean-girl', 'classic', 'old-money', 'formal'],
  balanced: ['elegant', 'casual', 'retro-vintage', 'sienna-vibe', 'korean-fashion', 'boho'],
  bold:     ['y2k', 'streetstyle', 'cute-coquette', 'black-dark', 'western', 'festival'],
}

// Q2 occasion override for better style matching
const OCCASION_ADVENTURE_OVERRIDE: Record<string, Partial<Record<Adventure, string[]>>> = {
  office:            { classic: ['minimalist', 'classic', 'formal', 'old-money'], balanced: ['elegant', 'clean-girl'], bold: ['old-money', 'elegant'] },
  'date-evening':    { classic: ['minimalist', 'classic', 'old-money'], balanced: ['elegant', 'retro-vintage', 'sienna-vibe'], bold: ['y2k', 'cute-coquette', 'black-dark'] },
  'party-night-out': { classic: ['elegant', 'old-money'], balanced: ['retro-vintage', 'cute-coquette'], bold: ['y2k', 'streetstyle', 'black-dark'] },
}

// Q3 — Season
const SEASON_OPTIONS = [
  { value: 'spring',  label: 'Spring',  description: 'Mar – May' },
  { value: 'summer',  label: 'Summer',  description: 'Jun – Aug' },
  { value: 'autumn',  label: 'Autumn',  description: 'Sep – Nov' },
  { value: 'winter',  label: 'Winter',  description: 'Dec – Feb' },
  { value: 'any',     label: 'Any',     description: 'No preference' },
]


type Step = 1 | 2 | 3

export default function StyleQuiz() {
  const { push } = useRouter()
  const [step, setStep]     = useState<Step>(1)
  const [season, setSeason] = useState<string>(detectSeason)
  const occasionRef         = useRef<string | null>(null)
  const adventureRef        = useRef<Adventure | null>(null)

  function handleGoal(v: string) {
    occasionRef.current = v
    setStep(2)
  }

  function handleAdventure(v: Adventure) {
    adventureRef.current = v
    setStep(3)
  }

  function handleFinish() {
    const occasion = occasionRef.current
    const adventure = adventureRef.current
    if (!occasion || !adventure) return
    const overrides = OCCASION_ADVENTURE_OVERRIDE[occasion]?.[adventure]
    const styles = overrides ?? ADVENTURE_STYLES[adventure]
    const pickedStyle = styles[0] // most representative

    const params = new URLSearchParams({ occasion })
    if (season && season !== 'any') params.set('season', season)
    params.set('style', pickedStyle)
    push(`/outfits?${params.toString()}`)
  }

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100

  return (
    <div className="max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-12">
        <span className="eyebrow">Style Quiz</span>
        <h1 className="section-title-lg mt-2">What's your look?</h1>
        <p className="text-sm text-gray-400 mt-3 tracking-wide">
          3 quick questions. Personalized outfit results.
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-px bg-gray-100 mb-10 relative">
        <div
          className="absolute inset-y-0 left-0 bg-black transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicator */}
      <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-300 mb-6">
        Step {step} of 3
      </p>

      {/* Q1 */}
      {step === 1 && (
        <QuizStep question="What are you getting dressed for?">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleGoal(opt.value)}
                className="group flex flex-col gap-1 p-4 border border-gray-200 text-left hover:border-black transition-colors duration-150"
              >
                <span className="text-sm font-semibold tracking-tight text-black">{opt.label}</span>
                <span className="text-xs text-gray-400">{opt.description}</span>
              </button>
            ))}
          </div>
        </QuizStep>
      )}

      {/* Q2 */}
      {step === 2 && (
        <QuizStep question="How adventurous is your style?">
          <div className="flex flex-col gap-3">
            {ADVENTURE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAdventure(opt.value)}
                className="group flex items-center justify-between p-5 border border-gray-200 text-left hover:border-black transition-colors duration-150"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold tracking-tight text-black">{opt.label}</span>
                  <span className="text-xs text-gray-400">{opt.description}</span>
                </div>
                <svg viewBox="0 0 24 24" className="size-3.5 stroke-gray-300 group-hover:stroke-black transition-colors duration-150 shrink-0" fill="none" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            ))}
          </div>
          <BackButton onClick={() => setStep(1)} />
        </QuizStep>
      )}

      {/* Q3 */}
      {step === 3 && (
        <QuizStep question="Any season in mind?">
          <div className="flex flex-wrap gap-2 mb-8">
            {SEASON_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSeason(opt.value)}
                className={`px-4 py-2.5 text-[10px] font-semibold tracking-widest uppercase border transition-colors duration-150
                  ${season === opt.value
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
                  }`}
              >
                {opt.label}
                <span className="block text-[8px] font-normal tracking-normal normal-case opacity-60 mt-0.5">
                  {opt.description}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <button
              onClick={handleFinish}
              className="group flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-400 transition-colors duration-200"
            >
              Show my outfits
              <svg viewBox="0 0 24 24" className="size-3 stroke-current group-hover:translate-x-0.5 transition-transform duration-200" fill="none" strokeWidth={2}>
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <BackButton onClick={() => setStep(2)} />
          </div>
        </QuizStep>
      )}

    </div>
  )
}

function QuizStep({ question, children }: { question: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold tracking-tight text-black">{question}</h2>
      {children}
    </div>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-[10px] font-semibold tracking-widest uppercase text-gray-300 hover:text-black transition-colors duration-200"
    >
      &larr; Back
    </button>
  )
}
