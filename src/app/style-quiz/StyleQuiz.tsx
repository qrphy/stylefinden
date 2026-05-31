'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { detectSeason } from '@/lib/detect-season'

// Q1 — What are you getting dressed for?
const GOAL_OPTIONS = [
  { value: 'casual',          label: 'Everyday Comfort',    description: 'Errands, coffee, casual hangouts' },
  { value: 'office',          label: 'Work & Professional', description: 'Meetings, office, presentations' },
  { value: 'date-night',       label: 'Date Night',          description: 'Dinner, romantic evenings, shows' },
  { value: 'party-night-out', label: 'Going Out',           description: 'Parties, clubs, night events' },
  { value: 'school',          label: 'School / Campus',     description: 'Classes, campus, study days' },
  { value: 'travel',          label: 'Travel & Adventure',  description: 'Trips, exploring, on-the-go' },
  { value: 'sport',           label: 'Sport & Active',      description: 'Gym, outdoors, athleisure' },
  { value: 'beach',           label: 'Beach & Vacation',    description: 'Sun, sea, resort looks' },
  { value: 'festival',        label: 'Festival & Events',   description: 'Concerts, festivals, outdoor events' },
  { value: 'wedding',         label: 'Special Occasion',    description: 'Weddings, galas, ceremonies' },
]

// Q2 — How adventurous is your style?
type Adventure = 'classic' | 'balanced' | 'bold'

const ADVENTURE_OPTIONS: { value: Adventure; label: string; description: string }[] = [
  { value: 'classic',  label: 'Keep it timeless',    description: 'Clean lines, neutral palette, nothing trendy' },
  { value: 'balanced', label: 'Mix classic & fresh',  description: 'A few trends, mostly wearable pieces' },
  { value: 'bold',     label: 'Stand out',            description: 'Statement pieces, color, personality' },
]

// Per occasion × adventure → one specific style result
const STYLE_MAP: Record<string, Record<Adventure, string>> = {
  casual:            { classic: 'minimalist',    balanced: 'casual',         bold: 'streetstyle'   },
  office:            { classic: 'minimalist',    balanced: 'old-money',      bold: 'elegant'       },
  'date-night':      { classic: 'minimalist',    balanced: 'elegant',        bold: 'cute-coquette' },
  'party-night-out': { classic: 'old-money',     balanced: 'retro-vintage',  bold: 'y2k'           },
  school:            { classic: 'clean-girl',    balanced: 'korean-fashion', bold: 'y2k'           },
  travel:            { classic: 'minimalist',    balanced: 'casual',         bold: 'streetstyle'   },
  sport:             { classic: 'clean-girl',    balanced: 'casual',         bold: 'streetstyle'   },
  beach:             { classic: 'minimalist',    balanced: 'boho',           bold: 'festival'      },
  festival:          { classic: 'boho',          balanced: 'retro-vintage',  bold: 'festival'      },
  wedding:           { classic: 'formal',        balanced: 'elegant',        bold: 'cute-coquette' },
}

// Q3 — Season
const SEASON_OPTIONS = [
  { value: 'spring', label: 'Spring', description: 'Mar – May' },
  { value: 'summer', label: 'Summer', description: 'Jun – Aug' },
  { value: 'autumn', label: 'Autumn', description: 'Sep – Nov' },
  { value: 'winter', label: 'Winter', description: 'Dec – Feb' },
  { value: 'any',    label: 'Any',    description: 'No preference' },
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

    const pickedStyle = STYLE_MAP[occasion]?.[adventure] ?? 'minimalist'

    const params = new URLSearchParams({ style: pickedStyle, occasion })
    if (season && season !== 'any') params.set('season', season)
    push(`/style-quiz/result?${params.toString()}`)
  }

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100

  return (
    <div className="max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-12">
        <span className="eyebrow">Style Quiz</span>
        <h1 className="section-title-lg mt-2">What&apos;s your look?</h1>
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
