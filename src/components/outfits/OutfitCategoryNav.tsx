type Tab = "all" | "season" | "occasion" | "style"

type Props = { active: Tab }

const TABS: { key: Tab; label: string; href: string }[] = [
  { key: "all",      label: "All Looks",    href: "/outfits" },
  { key: "season",   label: "By Season",    href: "/outfits/season" },
  { key: "occasion", label: "By Occasion",  href: "/outfits/occasion" },
  { key: "style",    label: "By Style",     href: "/outfits/style" },
]

export default function OutfitCategoryNav({ active }: Props) {
  return (
    <nav className="flex items-center gap-0 border-b border-gray-200 mb-10 overflow-x-auto">
      {TABS.map((tab) => (
        <a
          key={tab.key}
          href={tab.href}
          className={`shrink-0 px-5 py-3 text-[10px] font-semibold tracking-widest uppercase border-b-2 -mb-px transition-colors duration-200 ${
            active === tab.key
              ? "border-black text-black"
              : "border-transparent text-gray-400 hover:text-black"
          }`}
        >
          {tab.label}
        </a>
      ))}
    </nav>
  )
}
