import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktiere uns bei Fragen, Anregungen oder Kooperationsanfragen.",
}

export default function KontaktPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Kontakt</h1>
      <p className="text-gray-500 mb-12">
        Hast du Fragen, Anregungen oder möchtest du mit uns zusammenarbeiten?
        Schreib uns einfach eine E-Mail – wir melden uns so schnell wie möglich.
      </p>

      <div className="border border-gray-200 p-8">
        <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">
          E-Mail
        </p>
        <a
          href="mailto:contact@stylefinden.com"
          className="text-lg font-medium text-black hover:text-gray-600 transition-colors duration-200"
        >
          contact@stylefinden.com
        </a>

        <hr className="border-gray-100 my-8" />

        <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">
          Antwortzeit
        </p>
        <p className="text-sm text-gray-600">
          Wir antworten in der Regel innerhalb von 1–3 Werktagen.
        </p>

        <hr className="border-gray-100 my-8" />

        <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-4">
          Rechtliches
        </p>
        <p className="text-sm text-gray-600">
          Weitere Informationen findest du in unserem{" "}
          <a href="/impressum" className="underline underline-offset-2 hover:text-black transition-colors duration-200">
            Impressum
          </a>{" "}
          und unserer{" "}
          <a href="/datenschutz" className="underline underline-offset-2 hover:text-black transition-colors duration-200">
            Datenschutzerklärung
          </a>
          .
        </p>
      </div>
    </main>
  )
}
