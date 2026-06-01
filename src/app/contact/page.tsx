// İletişim sayfası — e-posta adresi, yanıt süresi ve yasal sayfalara bağlantılar içerir.
// Form yoktur; doğrudan e-posta yönlendirmesi kullanılır.
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Contact STYLEFINDEN — Questions, Feedback & Collaboration",
  description: "Get in touch with STYLEFINDEN for questions, feedback or collaboration inquiries about fashion, outfits and style. We respond within 1–3 business days.",
  alternates: { canonical: "https://stylefinden.com/contact" },
  openGraph: {
    title: "Contact STYLEFINDEN — Questions, Feedback & Collaboration",
    description: "Reach out to STYLEFINDEN for questions, feedback or collaboration. Fashion platform for outfit ideas, hairstyles and style trends.",
    url: "https://stylefinden.com/contact",
    type: "website",
    siteName: "STYLEFINDEN",
    locale: "en_US",
    images: [{ url: "/stylefinden-logo.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact STYLEFINDEN",
    description: "Get in touch for questions, feedback or collaboration.",
    images: ["/stylefinden-logo.png"],
  },
}

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-black mb-4 uppercase tracking-tight">Contact</h1>
      <p className="text-gray-500 mb-12">
        Do you have questions, suggestions or would you like to collaborate?
        Just send us an email — we&apos;ll get back to you as soon as possible.
      </p>

      <div className="border border-gray-200 p-8">
        <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">
          Email
        </p>
        <a
          href="mailto:contact@stylefinden.com"
          className="text-lg font-semibold text-black hover:text-gray-600 transition-colors duration-200"
        >
          contact@stylefinden.com
        </a>

        <hr className="border-gray-100 my-8" />

        <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">
          Response Time
        </p>
        <p className="text-sm text-gray-600">
          We typically respond within 1–3 business days.
        </p>

        <hr className="border-gray-100 my-8" />

        <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">
          Legal
        </p>
        <p className="text-sm text-gray-600">
          For more information please see our{" "}
          <Link href="/legal" className="underline underline-offset-2 hover:text-black transition-colors duration-200">
            Legal Notice
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-black transition-colors duration-200">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
