import ImgPlaceholder from "./ImgPlaceholder";

export type CollectionItem = {
  slug: string;
  label: string;
  description: string;
  tags: string[];
  badge: string;
  accent: string;
  accentText: string;
  active: boolean;
  image?: string;
  priority?: boolean;
  sizes?: string;
};

const badgeColors: Record<string, string> = {
  New:  "bg-black text-white",
  Soon: "bg-gray-100 text-gray-500",
};

type Props = { item: CollectionItem; href: string };

export default function CollectionCard({ item, href }: Props) {

  if (!item.active) {
    return (
      <div className="flex flex-col opacity-60 cursor-not-allowed">
        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
          <ImgPlaceholder src={item.image} alt={item.label} priority={item.priority} sizes={item.sizes} />
          <div className="absolute inset-0 bg-white/40" />
          <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${badgeColors[item.badge] ?? "bg-gray-100 text-gray-500"}`}>
            {item.badge}
          </span>
        </div>
        <div className="flex flex-col gap-3 pt-4 bg-white">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-black leading-tight">{item.label}</h2>
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{item.description}</p>
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Coming Soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <a href={href} className="group flex flex-col">
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        <ImgPlaceholder
          src={item.image}
          alt={item.label}
          priority={item.priority}
          sizes={item.sizes}
          className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${badgeColors[item.badge] ?? "bg-black text-white"}`}>
          {item.badge}
        </span>
      </div>
      <div className="flex flex-col gap-3 pt-4 bg-white">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-black leading-tight">{item.label}</h2>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
        <span className="self-start flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-black transition-colors duration-200">
          Discover
          <svg viewBox="0 0 24 24" className="size-3.5 stroke-current group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeWidth={2.5}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </a>
  );
}
