import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description: "Stylefinden is an AI-assisted fashion editorial platform curating outfits, hairstyles and accessories for everyday style inspiration.",
}

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-black mb-4 uppercase tracking-tight">About</h1>
      <p className="text-gray-500 mb-12">
        Stylefinden is a fashion editorial platform built to make everyday style decisions easier —
        whether you&apos;re looking for outfit ideas, accessory pairings, or seasonal trend guidance.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">What We Do</h2>
      <p className="text-gray-700 leading-relaxed">
        We curate outfits, hairstyles, accessories and trend reports organised by occasion, season
        and personal style. Every piece of content is structured to help you find looks that
        actually fit your life — not just runway editorials.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Editorial Approach</h2>
      <p className="text-gray-700 leading-relaxed">
        Stylefinden&#8482; uses artificial intelligence to support content creation at scale —
        including outfit descriptions, trend analysis and styling suggestions. All AI-assisted
        content is reviewed and curated by our editorial team before publication. Outfit styling
        images are produced using Fashn AI virtual try-on technology with synthetic models;
        no real person is depicted. Images are for inspiration only — the actual appearance
        of garments may differ.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Independence</h2>
      <p className="text-gray-700 leading-relaxed">
        Some links on this site are affiliate links. If you click through and make a purchase,
        Stylefinden&#8482; may earn a small commission at no extra cost to you. Our editorial
        selections and style recommendations are made independently — commercial relationships
        do not influence which looks we feature or how we describe them.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Get in Touch</h2>
      <p className="text-gray-700 leading-relaxed">
        For questions, feedback or collaboration enquiries, visit our{" "}
        <Link href="/contact" className="underline underline-offset-2 hover:text-black transition-colors duration-200">
          Contact
        </Link>{" "}
        page or email us at{" "}
        <a
          href="mailto:contact@stylefinden.com"
          className="underline underline-offset-2 hover:text-black transition-colors duration-200"
        >
          contact@stylefinden.com
        </a>
        .
      </p>

      <p className="text-xs text-gray-400 mt-12">Last updated: May 2026</p>
    </main>
  )
}
