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

type Props = { item: CollectionItem; href: string; variant?: "default" | "editorial" };

function EditorialCard({ item, href }: { item: CollectionItem; href: string }) {
  if (!item.active) {
    return (
      <div className="flex flex-col opacity-50 cursor-not-allowed">
        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
          <ImgPlaceholder src={item.image} alt={item.label} priority={item.priority} sizes={item.sizes} />
          <div className="absolute inset-0 bg-white/30" />
        </div>
        <div className="flex flex-col gap-2 pt-4">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-black leading-snug">{item.label}</h2>
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{item.description}</p>
          {item.tags.length > 0 && (
            <p className="text-xs text-gray-300 tracking-widest uppercase">{item.tags.slice(0, 4).join(" · ")}</p>
          )}
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400 mt-1">Coming Soon</span>
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 group-hover:to-black/20 transition-all duration-300" />
        {item.badge === "New" && (
          <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase bg-black text-white">
            New
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-black leading-snug flex-1">{item.label}</h2>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 mt-0.5 shrink-0 stroke-current text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-200" fill="none" strokeWidth={2.5}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
        {item.tags.length > 0 && (
          <p className="text-xs text-gray-400 tracking-widest uppercase">{item.tags.slice(0, 4).join(" · ")}</p>
        )}
      </div>
    </a>
  );
}

export default function CollectionCard({ item, href, variant = "default" }: Props) {
  if (variant === "editorial") return <EditorialCard item={item} href={href} />;

  if (!item.active) {
    return (
      <div className="flex flex-col opacity-60 cursor-not-allowed border border-gray-100">
        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
          <ImgPlaceholder src={item.image} alt={item.label} priority={item.priority} sizes={item.sizes} />
          <div className="absolute inset-0 bg-white/40" />
          <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${badgeColors[item.badge] ?? "bg-gray-100 text-gray-500"}`}>
            {item.badge}
          </span>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="font-display text-lg font-light text-black tracking-tight leading-tight">{item.label}</h2>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-3 p-5 bg-white">
          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{item.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs font-medium tracking-widest uppercase bg-gray-50 text-gray-400 border border-gray-200">
                {tag}
              </span>
            ))}
          </div>
          <span className="mt-auto self-start text-xs font-semibold tracking-widest uppercase text-gray-400">
            Coming Soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <a href={href} className="group flex flex-col border border-gray-100 hover:border-gray-300 transition-colors duration-200">
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        <ImgPlaceholder
          src={item.image}
          alt={item.label}
          priority={item.priority}
          sizes={item.sizes}
          className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold tracking-widest uppercase ${badgeColors[item.badge] ?? "bg-black text-white"}`}>
          {item.badge}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="font-display text-lg font-light text-white tracking-tight leading-tight">{item.label}</h2>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-3 p-5 bg-white">
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs font-medium tracking-widest uppercase bg-gray-50 text-gray-600 border border-gray-200">
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-auto self-start flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-black group-hover:gap-3 transition-all duration-200">
          Discover
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-current" fill="none" strokeWidth={2.5}>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </a>
  );
}
