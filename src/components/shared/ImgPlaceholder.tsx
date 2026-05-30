"use client";

import Image from "next/image";
import { sanityImageLoader } from "@/lib/sanity-image-loader";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  blurDataURL?: string;
  quality?: number;
  objectFit?: "cover" | "contain";
  objectPosition?: "top" | "center" | "bottom";
};

export default function ImgPlaceholder({
  src,
  alt = "",
  className = "absolute inset-0 w-full h-full",
  priority = false,
  sizes = "(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw",
  blurDataURL,
  quality = 85,
  objectFit = "cover",
  objectPosition = "top",
}: Props) {
  if (src) {
    const isSanity = src.startsWith("https://cdn.sanity.io");
    const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";
    const posClass = { top: "object-top", center: "object-center", bottom: "object-bottom" }[objectPosition];
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        loader={isSanity ? sanityImageLoader : undefined}
        className={`${className} ${fitClass} ${posClass}`}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
      />
    );
  }

  return (
    <div className={`${className} flex items-center justify-center bg-gray-100`}>
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-300 select-none">
        Soon
      </span>
    </div>
  );
}
