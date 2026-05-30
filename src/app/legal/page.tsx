import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and disclosure for Stylefinden — website operator, contact information and liability.",
}

export default function LegalPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-black mb-8 uppercase tracking-tight">Legal Notice</h1>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Website Operator</h2>
      <p className="text-gray-700 leading-relaxed">
        Stylefinden&#8482;
        <br />
        Mersin, Turkey
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Contact</h2>
      <p className="text-gray-700 leading-relaxed">
        Email:{" "}
        <a
          href="mailto:contact@stylefinden.com"
          className="underline underline-offset-2 hover:text-black transition-colors"
        >
          contact@stylefinden.com
        </a>
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Responsible for Content</h2>
      <p className="text-gray-700 leading-relaxed">
        Stylefinden&#8482; Editorial Team
        <br />
        contact@stylefinden.com
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Affiliate Disclosure</h2>
      <p className="text-gray-700 leading-relaxed">
        Stylefinden&#8482; participates in affiliate programs, including the{" "}
        <strong>Awin</strong> affiliate network. Some links on this website are affiliate
        links — if you click through and make a purchase, Stylefinden&#8482; may earn a
        commission at no additional cost to you. Affiliate links are clearly identified
        as partner or advertising links. Editorial content and styling recommendations
        are independent of commercial relationships.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">AI-Generated Content</h2>
      <p className="text-gray-700 leading-relaxed">
        Stylefinden&#8482; uses artificial intelligence tools to support content
        creation. Outfit styling images are produced using{" "}
        <strong>Fashn AI</strong> virtual try-on technology with synthetic models —
        no real person is depicted. Some outfit descriptions and editorial text are
        generated or assisted by the <strong>Claude API</strong> (Anthropic, PBC).
        AI-assisted content is reviewed and curated by our editorial team before
        publication. Images are for styling inspiration only; the actual appearance
        of garments may differ.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Liability for Content</h2>
      <p className="text-gray-700 leading-relaxed">
        The contents of our pages have been created with the utmost care.
        However, we cannot guarantee the accuracy, completeness or
        up-to-date nature of the content.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Liability for Links</h2>
      <p className="text-gray-700 leading-relaxed">
        Our website contains links to external third-party websites over
        whose content we have no control. We therefore accept no liability
        for such external content.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Copyright</h2>
      <p className="text-gray-700 leading-relaxed">
        The name <strong>Stylefinden&#8482;</strong> and all content, editorial text,
        and visual assets created by the site operators are subject to copyright.
        Reproduction, editing, distribution or any kind of exploitation beyond the
        limits of copyright requires the written consent of the respective author or
        creator.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">Privacy</h2>
      <p className="text-gray-700 leading-relaxed">
        For information on how Stylefinden&#8482; processes personal data, please refer
        to our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-black transition-colors">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="text-xs text-gray-400 mt-12">Last updated: May 2026</p>
    </main>
  )
}
