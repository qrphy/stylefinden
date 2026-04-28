import ImgPlaceholder from "./ImgPlaceholder";
import { TEST_IMG } from "@/constants/site";

export type CollectionItem = {
  slug: string;
  label: string;
  description: string;
  tags: string[];
  badge: string;
  accent: string;
  accentText: string;
  active: boolean;
};

const badgeColors: Record<string, string> = {
  New:  "bg-black text-white",
  Soon: "bg-gray-100 text-gray-500",
};

type Props = { item: CollectionItem; href: string };

export default function CollectionCard({ item, href }: Props) {
  const safeAccentText = item.accentText === "text-white" ? "text-gray-300" : item.accentText;

  if (!item.active) {
    return (
      <div className="relative flex flex-col opacity-60 cursor-not-allowed">
        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
          <ImgPlaceholder src={TEST_IMG} />
          <div className="absolute inset-0 bg-white/40" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
          <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${badgeColors[item.badge] ?? "bg-gray-100 text-gray-500"}`}>
            {item.badge}
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-lg font-black text-black tracking-tight leading-tight">{item.label}</h2>
          </div>
        </div>
        <div className={`flex flex-col gap-3 p-5 ${item.accent}`}>
          <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs font-medium tracking-widest uppercase bg-white/70 text-gray-500 border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
          <span className="self-start text-xs font-semibold tracking-widest uppercase text-gray-400">
            Coming Soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <a href={href} className="group relative overflow-hidden flex flex-col">
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        <ImgPlaceholder />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10" />
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${badgeColors[item.badge] ?? "bg-black text-white"}`}>
          {item.badge}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="text-lg font-black text-white tracking-tight leading-tight">{item.label}</h2>
        </div>
      </div>
      <div className={`flex flex-col gap-3 p-5 ${item.accent}`}>
        <p className={`text-xs leading-relaxed ${safeAccentText === "text-gray-300" ? "text-gray-300" : "text-gray-700"}`}>
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs font-medium tracking-widest uppercase bg-white text-gray-600 border border-gray-200">
              {tag}
            </span>
          ))}
        </div>
        <span className={`self-start flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase ${safeAccentText} group-hover:gap-3 transition-all duration-200`}>
          Discover
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth={2.5}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </a>
  );
}
