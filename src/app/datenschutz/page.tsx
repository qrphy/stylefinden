import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Stylefinden – Informationen zur Datenverarbeitung, Cookies und Ihren Rechten.",
}

export default function DatenschutzPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Allgemeine Hinweise</h2>
      <p className="text-gray-700 leading-relaxed">
        Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. In dieser
        Datenschutzerklärung informieren wir Sie darüber, welche Daten wir auf unserer
        Website erfassen, wie wir diese verwenden und welche Rechte Sie haben.
        Verantwortlich im Sinne der DSGVO ist der im Impressum genannte Betreiber.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Hosting</h2>
      <p className="text-gray-700 leading-relaxed">
        Diese Website wird bei <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701,
        San Francisco, CA 94104, USA gehostet. Beim Aufruf unserer Website werden
        automatisch technische Daten (IP-Adresse, Browsertyp, Betriebssystem,
        Referrer-URL, Datum und Uhrzeit) in Server-Log-Dateien gespeichert.
        Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse am sicheren Betrieb der Website).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Cookies und lokaler Speicher</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Unsere Website verwendet Cookies sowie den lokalen Speicher (localStorage)
        des Browsers. Die folgende Tabelle gibt einen Überblick über die eingesetzten
        Technologien:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 border-b border-gray-200 font-semibold">Name</th>
              <th className="text-left px-4 py-3 border-b border-gray-200 font-semibold">Anbieter</th>
              <th className="text-left px-4 py-3 border-b border-gray-200 font-semibold">Zweck</th>
              <th className="text-left px-4 py-3 border-b border-gray-200 font-semibold">Speicherdauer</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-mono text-xs">sf_cookie_consent</td>
              <td className="px-4 py-3">Stylefinden</td>
              <td className="px-4 py-3">Speichert Ihre Cookie-Einwilligung</td>
              <td className="px-4 py-3">Bis zur Löschung</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-mono text-xs">_ga, _ga_*</td>
              <td className="px-4 py-3">Google Analytics</td>
              <td className="px-4 py-3">Unterscheidung von Besuchern (Statistik)</td>
              <td className="px-4 py-3">2 Jahre</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">va_*</td>
              <td className="px-4 py-3">Vercel Analytics</td>
              <td className="px-4 py-3">Anonyme Seitenaufruf-Statistik</td>
              <td className="px-4 py-3">Session</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-700 leading-relaxed mt-4">
        Analyse-Cookies werden nur nach Ihrer Einwilligung gesetzt (Art. 6 Abs. 1 lit. a DSGVO).
        Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie den lokalen Speicher
        Ihres Browsers löschen (Browsereinstellungen → Daten löschen).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Google Analytics</h2>
      <p className="text-gray-700 leading-relaxed">
        Mit Ihrer Einwilligung verwenden wir <strong>Google Analytics 4</strong>, einen
        Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street,
        Dublin 4, Irland. Google Analytics erfasst Ihr Nutzungsverhalten auf unserer
        Website (aufgerufene Seiten, Verweildauer, ungefährer Standort) und übermittelt
        diese Daten an Server von Google, die sich auch in den USA befinden können.
        Google ist unter dem EU-US Data Privacy Framework zertifiziert.
      </p>
      <p className="text-gray-700 leading-relaxed mt-3">
        Die IP-Anonymisierung ist standardmäßig in GA4 aktiviert. Die Daten werden
        nach 2 Jahren gelöscht. Sie können der Datenerfassung durch Google Analytics
        widersprechen, indem Sie das{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-black transition-colors"
        >
          Browser-Add-on von Google
        </a>{" "}
        installieren.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Vercel Analytics</h2>
      <p className="text-gray-700 leading-relaxed">
        Wir nutzen <strong>Vercel Web Analytics</strong> der Vercel Inc. Dieser Dienst
        erfasst Seitenaufrufe und Performance-Daten in anonymisierter Form – es werden
        keine personenbezogenen Daten gespeichert und keine Cookies gesetzt.
        Die Analyse erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an der technischen Optimierung der Website).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Google AdSense</h2>
      <p className="text-gray-700 leading-relaxed">
        Diese Website plant die Nutzung von <strong>Google AdSense</strong>, einem
        Werbedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
        Irland. Google AdSense verwendet Cookies und ähnliche Technologien, um
        personalisierte oder nicht personalisierte Werbung anzuzeigen. Die durch
        Cookies erzeugten Informationen über Ihre Nutzung dieser Website können an
        Server von Google in den USA übertragen werden. Sie können die Personalisierung
        von Werbung unter{" "}
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-black transition-colors"
        >
          adssettings.google.com
        </a>{" "}
        deaktivieren.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Affiliate-Links</h2>
      <p className="text-gray-700 leading-relaxed">
        Diese Website enthält bzw. plant die Einbindung von Affiliate-Links. Wenn Sie
        über einen solchen Link einen Kauf tätigen, erhalten wir eine Provision des
        Anbieters. Für Sie entstehen dadurch keine zusätzlichen Kosten. Affiliate-Links
        sind als Werbung oder Partnerlink gekennzeichnet. Durch das Anklicken eines
        Affiliate-Links können Cookies des jeweiligen Anbieters in Ihrem Browser
        gesetzt werden, die Ihrem Besuch zugeordnet werden.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Ihre Rechte</h2>
      <p className="text-gray-700 leading-relaxed mb-3">
        Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Recht auf Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        <li>Beschwerderecht bei der zuständigen Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">9. Kontakt</h2>
      <p className="text-gray-700 leading-relaxed">
        Bei Fragen zum Datenschutz wenden Sie sich bitte an die im{" "}
        <a href="/impressum" className="underline underline-offset-2 hover:text-black transition-colors">
          Impressum
        </a>{" "}
        angegebene E-Mail-Adresse.
      </p>

      <p className="text-xs text-gray-400 mt-12">Stand: {new Date().getFullYear()}</p>
    </main>
  )
}
