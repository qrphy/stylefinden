// Merkezi buton sistemi — projede kullanılan tüm buton varyantları buradan yönetilir.
//
// variant  → primary | outline | ghost
// size     → sm | md | lg  (ghost için geçersiz)
// arrow    → ghost varyantında ok simgesi ekler
// arrowDir → 'right' (→ varsayılan) veya 'left' (← geri linkleri)
// invert   → Siyah arka plan üzerindeki primary buton (beyaz dolgu, siyah metin)
// href     → Verilirse <a> / Link olarak render edilir, verilmezse <button>
// external → Yeni sekmede aç (href zorunlu)

import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"

type Variant = "primary" | "outline" | "ghost"
type Size    = "sm" | "md" | "lg"

type CommonProps = {
  variant?:  Variant
  size?:     Size
  arrow?:    boolean
  arrowDir?: "left" | "right"
  invert?:   boolean
  className?: string
  children:  React.ReactNode
}

type AsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined
    external?: never
  }

type AsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    href: string
    external?: boolean
  }

type Props = AsButton | AsLink

// ── Stil kataloğu ─────────────────────────────────────────────────────────────

const BASE = "text-xs font-semibold tracking-widest uppercase transition-colors duration-200 inline-flex items-center justify-center"

const VARIANT_STYLES: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed",
  outline: "border border-black text-black hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
  ghost:   "gap-2 text-gray-500 hover:text-black group",
}

const INVERT_STYLES: Record<Variant, string> = {
  primary: "bg-white text-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed",
  outline: "border border-white text-white hover:bg-white hover:text-black disabled:opacity-60 disabled:cursor-not-allowed",
  ghost:   "gap-2 text-white/60 hover:text-white group",
}

const SIZE_STYLES: Record<Size, string> = {
  sm: "px-5 py-2.5",
  md: "px-8 py-3",
  lg: "px-10 py-3",
}

function ArrowIcon({ dir = "right" }: { dir?: "left" | "right" }) {
  const isLeft = dir === "left"
  return (
    <svg
      viewBox="0 0 24 24"
      className={[
        "size-4 stroke-current",
        isLeft
          ? "rotate-180 group-hover:-translate-x-1"
          : "translate-x-0 group-hover:translate-x-1",
        "transition-transform duration-200",
      ].join(" ")}
      fill="none"
      strokeWidth={2}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Button(props: Props) {
  const {
    variant  = "primary",
    size     = "md",
    arrow    = false,
    arrowDir = "right",
    invert   = false,
    className = "",
    children,
    ...rest
  } = props

  const variantClass = invert ? INVERT_STYLES[variant] : VARIANT_STYLES[variant]
  const sizeClass    = variant !== "ghost" ? SIZE_STYLES[size] : ""
  const classes      = [BASE, variantClass, sizeClass, className].filter(Boolean).join(" ")

  const content = (
    <>
      {arrow && arrowDir === "left" && <ArrowIcon dir="left" />}
      {children}
      {arrow && arrowDir === "right" && <ArrowIcon dir="right" />}
    </>
  )

  if ("href" in rest && rest.href !== undefined) {
    const { href, external, ...anchorRest } = rest as AsLink
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...(anchorRest as ComponentPropsWithoutRef<"a">)}>
        {content}
      </Link>
    )
  }

  const { ...buttonRest } = rest as AsButton
  return (
    <button className={classes} {...buttonRest}>
      {content}
    </button>
  )
}
