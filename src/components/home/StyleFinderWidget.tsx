'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const OCCASIONS = [
  { value: 'casual',          label: 'Everyday'  },
  { value: 'office',          label: 'Office'    },
  { value: 'evening',         label: 'Evening'   },
  { value: 'date-night',      label: 'Date Night'},
  { value: 'party-night-out', label: 'Party'     },
  { value: 'school',          label: 'School'    },
  { value: 'travel',          label: 'Travel'    },
  { value: 'sport',           label: 'Sport'     },
  { value: 'beach',           label: 'Beach'     },
  { value: 'festival',        label: 'Festival'  },
  { value: 'wedding',         label: 'Wedding'   },
]

const SEASONS = [
  { value: 'spring', label: 'Spring' },
  { value: 'summer', label: 'Summer' },
  { value: 'autumn', label: 'Autumn' },
  { value: 'winter', label: 'Winter' },
  { value: 'any',    label: 'Any'    },
]

const STYLES = [
  { value: 'minimalist',    label: 'Minimal'    },
  { value: 'boho',          label: 'Boho'        },
  { value: 'streetstyle',   label: 'Street'      },
  { value: 'old-money',     label: 'Old Money'   },
  { value: 'elegant',       label: 'Elegant'     },
  { value: 'y2k',           label: 'Y2K'         },
  { value: 'retro-vintage', label: 'Vintage'     },
  { value: 'casual',        label: 'Casual'      },
  { value: 'clean-girl',    label: 'Clean Girl'  },
  { value: 'any',           label: 'Any'         },
]

export default function StyleFinderWidget() {
  const router = useRouter()
  const [occasion, setOccasion] = useState<string | null>(null)
  const [season, setSeason]     = useState<string | null>(null)
  const [style, setStyle]       = useState<string | null>(null)

  const showSeason = occasion !== null
  const showStyle  = showSeason && season !== null

  function handleFind() {
    const params = new URLSearchParams()
    if (occasion)              params.set('occasion', occasion)
    if (season && season !== 'any') params.set('season', season)
    if (style  && style  !== 'any') params.set('style',  style)
    router.push(`/outfits?${params.toString()}`)
  }

  function selectOccasion(v: string | null) {
    setOccasion(v)
    setSeason(null)
    setStyle(null)
  }

  function selectSeason(v: string | null) {
    setSeason(v)
    setStyle(null)
  }

  return (
    <section className="w-full bg-white border-t border-gray-100 scroll-reveal">
      <div className="container-page py-14 md:py-16">

        <div className="section-header mb-10">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">Style Finder</span>
            <h2 className="section-title-lg">Find your look.</h2>
          </div>
        </div>

        <div className="flex flex-col gap-8">

          <FinderStep number={1} question="What are you getting dressed for?">
            <PillGroup
              options={OCCASIONS}
              selected={occasion}
              onSelect={selectOccasion}
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
                options={STYLES}
                selected={style}
                onSelect={(v) => setStyle(v)}
                allowDeselect
              />
            </FinderStep>
          )}

          <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
            {occasion && (
              <button
                onClick={handleFind}
                className="group flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black hover:text-gray-400 transition-colors duration-200"
              >
                Find Outfits
                <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-current group-hover:translate-x-0.5 transition-transform duration-200" fill="none" strokeWidth={2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            )}
            <a
              href="/outfits"
              className="text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors duration-200"
            >
              {occasion ? 'Skip' : 'Show me everything'}
            </a>
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
            className={`px-4 py-2 text-[10px] font-semibold tracking-widest uppercase border transition-colors duration-150
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
