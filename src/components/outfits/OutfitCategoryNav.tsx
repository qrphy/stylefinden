'use client'

import { useState, useRef, useCallback } from 'react'

type Tab = "all" | "season" | "occasion" | "style" | "trend" | "color"

type Props = { active: Tab }

type DropdownItem = { label: string; value: string }

type TabConfig = {
  key: Tab
  label: string
  href: string
  queryKey: string
  items: DropdownItem[]
}

const SEASONS: DropdownItem[] = [
  { label: "Spring",      value: "spring"     },
  { label: "Summer",      value: "summer"     },
  { label: "Autumn",      value: "autumn"     },
  { label: "Winter",      value: "winter"     },
  { label: "All Seasons", value: "all-season" },
]

const OCCASIONS: DropdownItem[] = [
  { label: "Everyday",  value: "casual"         },
  { label: "Office",    value: "office"         },
  { label: "Evening",   value: "evening"        },
  { label: "Date Night",value: "date-night"     },
  { label: "Party",     value: "party-night-out"},
  { label: "School",    value: "school"         },
  { label: "Travel",    value: "travel"         },
  { label: "Sport",     value: "sport"          },
  { label: "Beach",     value: "beach"          },
  { label: "Festival",  value: "festival"       },
  { label: "Wedding",   value: "wedding"        },
]

const STYLES: DropdownItem[] = [
  { label: "Casual",       value: "casual"      },
  { label: "Street Style", value: "streetstyle" },
  { label: "Elegant",      value: "elegant"     },
  { label: "Boho",         value: "boho"        },
  { label: "Sporty",       value: "sporty"      },
  { label: "Minimalist",   value: "minimalist"  },
  { label: "Classic",      value: "classic"     },
  { label: "Vintage",      value: "vintage"     },
  { label: "Formal",       value: "formal"      },
  { label: "Western",      value: "western"     },
]

const TRENDS: DropdownItem[] = [
  { label: "Y2K",            value: "y2k"             },
  { label: "Old Money",      value: "old-money"       },
  { label: "Clean Girl",     value: "clean-girl"      },
  { label: "Korean Fashion", value: "korean-fashion"  },
  { label: "Coquette",       value: "cute-coquette"   },
  { label: "Dark",           value: "black-dark"      },
  { label: "Retro Vintage",  value: "retro-vintage"   },
  { label: "Sienna Vibe",    value: "sienna-vibe"     },
]

const COLORS: DropdownItem[] = [
  { label: "Black",    value: "black"    },
  { label: "White",    value: "white"    },
  { label: "Beige",    value: "beige"    },
  { label: "Grey",     value: "grey"     },
  { label: "Navy",     value: "navy"     },
  { label: "Blue",     value: "blue"     },
  { label: "Pink",     value: "pink"     },
  { label: "Red",      value: "red"      },
  { label: "Burgundy", value: "burgundy" },
  { label: "Green",    value: "green"    },
  { label: "Khaki",    value: "khaki"    },
  { label: "Brown",    value: "brown"    },
]

const TAB_CONFIG: TabConfig[] = [
  { key: "season",   label: "By Season",   href: "/outfits?tab=season",   queryKey: "season",   items: SEASONS   },
  { key: "occasion", label: "By Occasion", href: "/outfits?tab=occasion", queryKey: "occasion", items: OCCASIONS },
  { key: "style",    label: "By Style",    href: "/outfits?tab=style",    queryKey: "style",    items: STYLES    },
  { key: "trend",    label: "By Trend",    href: "/outfits?tab=trend",    queryKey: "trend",    items: TRENDS    },
  { key: "color",    label: "By Color",    href: "/outfits?tab=color",    queryKey: "color",    items: COLORS    },
]

export default function OutfitCategoryNav({ active }: Props) {
  const [openDropdown, setOpenDropdown] = useState<Tab | null>(null)
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  const openMenu = useCallback((tab: Tab) => {
    clearTimeout(closeTimeout.current)
    setOpenDropdown(tab)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 120)
  }, [])

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimeout.current)
  }, [])

  const activeConfig = TAB_CONFIG.find((t) => t.key === active)

  const tabCls = (key: Tab) =>
    `shrink-0 flex items-center gap-1 px-5 py-3 text-[10px] font-semibold tracking-widest uppercase border-b-2 -mb-px transition-colors duration-200 whitespace-nowrap ${
      active === key
        ? "border-black text-black"
        : "border-transparent text-gray-400 hover:text-black"
    }`

  return (
    <div className="relative mb-10">
      {/* Tab row */}
      <nav className="flex items-center border-b border-gray-200 overflow-x-auto">
        <a href="/outfits" className={tabCls("all").replace("flex items-center gap-1 ", "")}>
          All Looks
        </a>

        {TAB_CONFIG.map((tab) => (
          <div
            key={tab.key}
            onMouseEnter={() => openMenu(tab.key)}
            onMouseLeave={scheduleClose}
          >
            <a href={tab.href} className={tabCls(tab.key)}>
              {tab.label}
              <svg width="7" height="4" viewBox="0 0 7 4" fill="currentColor" className="opacity-40 shrink-0 mt-px">
                <path d="M0 0l3.5 4L7 0z" />
              </svg>
            </a>
          </div>
        ))}
      </nav>

      {/* Desktop dropdown panel */}
      {openDropdown && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="absolute left-0 right-0 top-full z-50 bg-white border border-t-0 border-gray-200 hidden md:flex flex-wrap"
        >
          {TAB_CONFIG.find((t) => t.key === openDropdown)?.items.map((item) => (
            <a
              key={item.value}
              href={`/outfits?${TAB_CONFIG.find((t) => t.key === openDropdown)!.queryKey}=${item.value}`}
              className="px-5 py-3 text-[10px] font-semibold tracking-widest uppercase text-gray-500 hover:bg-gray-50 hover:text-black transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Mobile chip row — visible when a tab is active */}
      {activeConfig && (
        <div className="flex gap-2 flex-wrap mt-4 md:hidden">
          {activeConfig.items.map((item) => (
            <a
              key={item.value}
              href={`/outfits?${activeConfig.queryKey}=${item.value}`}
              className="px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase border border-gray-200 text-gray-500 hover:border-black hover:text-black transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
