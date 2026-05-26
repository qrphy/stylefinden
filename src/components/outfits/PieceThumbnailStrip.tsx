import ImgPlaceholder from "@/components/shared/ImgPlaceholder"

type PieceThumbnail = {
  key: string
  name: string
  image?: string
}

type Props = {
  pieces?: PieceThumbnail[]
  max?: number
}

export default function PieceThumbnailStrip({ pieces, max = 4 }: Props) {
  if (!pieces || pieces.length === 0) return null

  const visible = pieces.slice(0, max)
  const overflow = pieces.length - max

  return (
    <div className="flex items-center gap-1 pt-1.5 border-t border-gray-100">
      {visible.map((piece) => (
        <div
          key={piece.key}
          className="shrink-0 size-8 relative bg-gray-100 border border-gray-200 overflow-hidden"
          title={piece.name}
        >
          <ImgPlaceholder src={piece.image} alt={piece.name} sizes="32px" />
        </div>
      ))}
      {overflow > 0 && (
        <div className="shrink-0 size-8 bg-gray-100 border border-gray-200 flex items-center justify-center">
          <span className="text-[9px] font-semibold text-gray-400 leading-none">+{overflow}</span>
        </div>
      )}
    </div>
  )
}
