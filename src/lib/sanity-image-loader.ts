import type { ImageLoader } from "next/image"

export const sanityImageLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src)
  url.searchParams.set("w", String(width))
  url.searchParams.set("q", String(quality ?? 90))
  url.searchParams.set("auto", "format")
  url.searchParams.set("fit", "max")
  return url.toString()
}
