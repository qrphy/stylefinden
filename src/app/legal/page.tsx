// Yasal uyarı (impressum) sayfası — site operatörü bilgileri, sorumluluk reddi
// ve telif hakkı bildirimini içerir.
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal notice and disclosure for Stylefinden — website operator, contact information and liability.",
}

export default function LegalPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Legal Notice</h1>

      <h2 className="text-xl font-semibold mt-8 mb-3">Website Operator</h2>
      <p className="text-gray-700 leading-relaxed">
        Furkan XXXXX
        <br />
        Çağatay XXXXX
        <br />
        Mersin, Turkey
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>
      <p className="text-gray-700 leading-relaxed">
        Email:{" "}
        <a
          href="mailto:contact@stylefinden.com"
          className="underline underline-offset-2 hover:text-black transition-colors"
        >
          contact@stylefinden.com
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Responsible for Content</h2>
      <p className="text-gray-700 leading-relaxed">
        Furkan XXXXX
        <br />
        Çağatay XXXXX
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Liability for Content</h2>
      <p className="text-gray-700 leading-relaxed">
        The contents of our pages have been created with the utmost care.
        However, we cannot guarantee the accuracy, completeness or
        up-to-date nature of the content.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Liability for Links</h2>
      <p className="text-gray-700 leading-relaxed">
        Our website contains links to external third-party websites over
        whose content we have no control. We therefore accept no liability
        for such external content.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">Copyright</h2>
      <p className="text-gray-700 leading-relaxed">
        The content and works created by the site operators on these pages
        are subject to copyright. Reproduction, editing, distribution or
        any kind of exploitation beyond the limits of copyright requires
        the written consent of the respective author or creator.
      </p>

      <p className="text-xs text-gray-400 mt-12" suppressHydrationWarning>Last updated: {new Date().getFullYear()}</p>
    </main>
  )
}
