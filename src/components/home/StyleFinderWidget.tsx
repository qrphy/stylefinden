'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import ImgPlaceholder from '@/components/shared/ImgPlaceholder'
import { detectSeason } from '@/lib/detect-season'

const LS_FINDER_KEY = 'sf_finder'
const LS_HISTORY_KEY = 'sf_history'

const OCCASIONS = [
  {
    value: 'casual',
    label: 'Everyday',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=75&fit=crop&auto=format',
  },
  {
    value: 'office',
    label: 'Office',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=75&fit=crop&auto=format',
  },
  {
    value: 'date-evening',
    label: 'Date / Evening',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=75&fit=crop&auto=format',
  },
  {
    value: 'party-night-out',
    label: 'Party',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=75&fit=crop&auto=format',
  },
  {
    value: 'school',
    label: 'School',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=75&fit=crop&auto=format',
  },
  {
    value: 'travel',
    label: 'Travel',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=75&fit=crop&auto=format',
  },
  {
    value: 'sport',
    label: 'Sport',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=75&fit=crop&auto=format',
  },
  {
    value: 'beach',
    label: 'Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=75&fit=crop&auto=format',
  },
  {
    value: 'festival',
    label: 'Festival',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=75&fit=crop&auto=format',
  },
  {
    value: 'wedding',
    label: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&q=75&fit=crop&auto=format',
  },
]

const SEASONS = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
  { value: 'any',    label: 'Any'    },
]

const ALL_STYLES = [
  { value: 'minimalist',     label: 'Minimal'     },
  { value: 'boho',           label: 'Boho'         },
  { value: 'streetstyle',    label: 'Street'       },
  { value: 'old-money',      label: 'Old Money'    },
  { value: 'elegant',        label: 'Elegant'      },
  { value: 'y2k',            label: 'Y2K'          },
  { value: 'retro-vintage',  label: 'Vintage'      },
  { value: 'casual',         label: 'Casual'       },
  { value: 'clean-girl',     label: 'Clean Girl'   },
  { value: 'cute-coquette',  label: 'Coquette'     },
  { value: 'korean-fashion', label: 'Korean'       },
  { value: 'black-dark',     label: 'Dark'         },
  { value: 'sienna-vibe',    label: 'Sienna Vibe'  },
  { value: 'formal',         label: 'Formal'       },
  { value: 'classic',        label: 'Classic'      },
  { value: 'sporty',         label: 'Sporty'       },
  { value: 'western',        label: 'Western'      },
]

const OCCASION_STYLES: Record<string, string[]> = {
  casual:            ['minimalist', 'boho', 'streetstyle', 'casual', 'clean-girl', 'retro-vintage', 'y2k', 'old-money', 'korean-fashion', 'sienna-vibe'],
  office:            ['minimalist', 'old-money', 'elegant', 'clean-girl', 'formal', 'classic'],
  'date-evening':    ['elegant', 'old-money', 'y2k', 'cute-coquette', 'clean-girl', 'minimalist', 'retro-vintage', 'sienna-vibe', 'formal', 'classic', 'black-dark'],
  'party-night-out': ['y2k', 'streetstyle', 'old-money', 'elegant', 'cute-coquette', 'retro-vintage', 'black-dark'],
  school:            ['casual', 'clean-girl', 'minimalist', 'streetstyle', 'y2k', 'cute-coquette', 'korean-fashion'],
  travel:            ['casual', 'minimalist', 'boho', 'streetstyle', 'clean-girl', 'old-money'],
  sport:             ['sporty', 'casual', 'streetstyle'],
  beach:             ['boho', 'casual', 'y2k', 'cute-coquette', 'retro-vintage'],
  festival:          ['boho', 'y2k', 'retro-vintage', 'streetstyle', 'cute-coquette', 'western'],
  wedding:           ['elegant', 'formal', 'classic', 'old-money', 'minimalist', 'cute-coquette'],
}


type HistoryEntry = { occasion?: string; style?: string; ts: number }

type Props = {
  occasionCounts?: Record<string, number>
}

export default function StyleFinderWidget({ occasionCounts }: Props) {
  const router = useRouter()
  const [occasion, setOccasion] = useState<string | null>(null)
  const [season, setSeason]     = useState<string | null>(null)
  const [style, setStyle]       = useState<string | null>(null)
  const [hasRestored, setHasRestored] = useState(false)
  const [historyHint, setHistoryHint] = useState<{ occasion: string; label: string } | null>(null)
  const skipNextPersistRef = useRef(false)

  // Item 3 + 7: Restore last selection & read browsing history on mount
  useEffect(() => {
    // Restore saved selection
    try {
      const saved = JSON.parse(localStorage.getItem(LS_FINDER_KEY) ?? 'null') as {
        occasion?: string; season?: string; style?: string
      } | null
      if (saved?.occasion) {
        skipNextPersistRef.current = true
        setOccasion(saved.occasion)
        setSeason(saved.season ?? null)
        setStyle(saved.style ?? null)
        setHasRestored(true)
      }
    } catch {}

    // Item 7: Suggest based on browsing history (needs ≥3 entries)
    try {
      const history = JSON.parse(localStorage.getItem(LS_HISTORY_KEY) ?? '[]') as HistoryEntry[]
      if (history.length >= 3) {
        const occCount: Record<string, number> = {}
        history.forEach(h => { if (h.occasion) occCount[h.occasion] = (occCount[h.occasion] || 0) + 1 })
        const topOcc = Object.entries(occCount).reduce<[string, number] | null>(
          (max, cur) => !max || cur[1] > max[1] ? cur : max, null
        )?.[0]
        if (topOcc) {
          const label = OCCASIONS.find(o => o.value === topOcc)?.label ?? topOcc
          setHistoryHint({ occasion: topOcc, label })
        }
      }
    } catch {}
  }, [])

  // Item 3: Persist selections to localStorage whenever they change
  useEffect(() => {
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false
      return
    }
    if (occasion === null && season === null && style === null) return
    try {
      localStorage.setItem(LS_FINDER_KEY, JSON.stringify({ occasion, season, style }))
    } catch {}
  }, [occasion, season, style])

  const showSeason = occasion !== null
  const showStyle  = showSeason && season !== null

  const filteredStyles = [
    ...(occasion && OCCASION_STYLES[occasion]
      ? ALL_STYLES.filter((s) => OCCASION_STYLES[occasion].includes(s.value))
      : ALL_STYLES),
    { value: 'any', label: 'Any' },
  ]

  function handleFind() {
    const params = new URLSearchParams()
    if (occasion)                    params.set('occasion', occasion)
    if (season && season !== 'any')  params.set('season', season)
    if (style  && style  !== 'any')  params.set('style',  style)
    router.push(`/outfits?${params.toString()}`)
  }

  // Item 5: Navigate to a random occasion+style combination
  function handleSurprise() {
    const randomOcc   = OCCASIONS[Math.floor(Math.random() * OCCASIONS.length)]
    const compatible  = OCCASION_STYLES[randomOcc.value] ?? ALL_STYLES.map(s => s.value)
    const randomStyle = compatible[Math.floor(Math.random() * compatible.length)]
    router.push(`/outfits?occasion=${randomOcc.value}&style=${randomStyle}`)
  }

  function selectOccasion(v: string | null) {
    setOccasion(v)
    setStyle(null)
    if (v !== null) {
      // Item 2: Auto-detect season, but keep if user already chose one
      setSeason(prev => prev ?? detectSeason())
    } else {
      setSeason(null)
    }
  }

  function selectSeason(v: string | null) {
    setSeason(v)
    setStyle(null)
  }

  function clearAll() {
    setOccasion(null)
    setSeason(null)
    setStyle(null)
    setHasRestored(false)
    try { localStorage.removeItem(LS_FINDER_KEY) } catch {}
  }

  return (
    <section className="w-full bg-white border-t border-gray-100 scroll-reveal">
      <div className="container-page py-14 md:py-16">

        <div className="section-header mb-8">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">Style Finder</span>
            <h2 className="section-title-lg">Find your look.</h2>
          </div>
          {/* Item 7: Browsing history hint — shown only when no active selection */}
          {historyHint && !occasion && (
            <button
              onClick={() => selectOccasion(historyHint.occasion)}
              className="self-start mt-1 text-[10px] font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
            >
              Based on your browsing: <span className="text-black">{historyHint.label}</span> &rarr;
            </button>
          )}
        </div>

        {/* Item 3: Restored session banner */}
        {hasRestored && (
          <div className="flex items-center gap-4 mb-8 py-2.5 px-3 border border-gray-100 bg-gray-50">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">
              Continuing from your last visit
            </span>
            <button
              onClick={clearAll}
              className="ml-auto text-[10px] font-semibold tracking-widest uppercase text-gray-300 hover:text-black transition-colors duration-200"
            >
              Clear &times;
            </button>
          </div>
        )}

        <div className="flex flex-col gap-8">

          <FinderStep number={1} question="What are you getting dressed for?">
            <OccasionGrid
              options={OCCASIONS}
              selected={occasion}
              onSelect={(v) => selectOccasion(occasion === v ? null : v)}
              counts={occasionCounts}
            />
          </FinderStep>

          {showSeason && (
            <FinderStep number={2} question="Any season in mind?">
              <PillGroup
                options={SEASONS}
                selected={season}
                onSelect={selectSeason}
                allowDeselect
              />
            </FinderStep>
          )}

          {showStyle && (
            <FinderStep number={3} question="What's your vibe?">
              <PillGroup
                options={filteredStyles}
                selected={style}
                onSelect={(v) => setStyle(v)}
                allowDeselect
              />
            </FinderStep>
          )}

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
            <div className="flex items-center gap-6">
              {occasion && (
                <button
                  onClick={handleFind}
                  className="group flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-400 transition-colors duration-200"
                >
                  Find Outfits
                  <svg viewBox="0 0 24 24" className="size-3 stroke-current group-hover:translate-x-0.5 transition-transform duration-200" fill="none" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              )}
              <button
                onClick={handleSurprise}
                className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
              >
                Surprise me
              </button>
            </div>
            <div className="flex items-center gap-6 sm:ml-auto">
              <a
                href="/style-quiz"
                className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
              >
                Take the quiz
              </a>
              <a
                href="/outfits"
                className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
              >
                {occasion ? 'Skip' : 'Show me everything'}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function FinderStep({ number, question, children }: {
  number: number
  question: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-300">0{number}</span>
        <p className="text-sm font-semibold tracking-tight text-black">{question}</p>
      </div>
      {children}
    </div>
  )
}

function OccasionGrid({ options, selected, onSelect, counts }: {
  options: { value: string; label: string; image: string }[]
  selected: string | null
  onSelect: (v: string) => void
  counts?: Record<string, number>
}) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-2.5">
      {options.map((opt) => {
        const active = selected === opt.value
        const count  = counts?.[opt.value]
        return (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`relative overflow-hidden aspect-[3/2] group border-2 transition-colors duration-200 ${
              active
                ? 'border-black'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <div className="absolute inset-0">
              <ImgPlaceholder
                src={opt.image}
                alt={opt.label}
                className="absolute inset-0 w-full h-full object-cover object-center"
                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            </div>
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-200 ${
                active
                  ? 'opacity-25'
                  : 'opacity-55 group-hover:opacity-40'
              }`}
            />
            {/* Item 6: Outfit count */}
            <div className="absolute bottom-2 left-2.5 right-2 flex items-end justify-between gap-1">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-white leading-none">
                {opt.label}
              </span>
              {count !== undefined && count > 0 && (
                <span className="text-[8px] font-semibold text-white/60 leading-none shrink-0">
                  {count}
                </span>
              )}
            </div>
            {active && (
              <div className="absolute top-2 right-2 size-4 bg-white flex items-center justify-center">
                <svg viewBox="0 0 12 12" className="size-2.5" fill="none" strokeWidth={2.5} stroke="currentColor">
                  <path d="M2 6l3 3 5-5" />
                </svg>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

function PillGroup({ options, selected, onSelect, allowDeselect = false }: {
  options: { value: string; label: string }[]
  selected: string | null
  onSelect: (v: string | null) => void
  allowDeselect?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = selected === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => {
              if (active && allowDeselect) onSelect(null)
              else onSelect(opt.value)
            }}
            className={`px-4 py-2.5 text-[10px] font-semibold tracking-widest uppercase border transition-colors duration-150
              ${active
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'
              }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
