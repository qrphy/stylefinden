// İletişim sayfası — e-posta adresi, yanıt süresi ve yasal sayfalara bağlantılar içerir.
// Form yoktur; doğrudan e-posta yönlendirmesi kullanılır.
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with us for questions, feedback or collaboration inquiries.",
}

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
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
          className="text-lg font-medium text-black hover:text-gray-600 transition-colors duration-200"
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
          <a href="/legal" className="underline underline-offset-2 hover:text-black transition-colors duration-200">
            Legal Notice
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-black transition-colors duration-200">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  )
}
