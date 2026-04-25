import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy of Stylefinden — information on data processing, cookies and your rights.",
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. General Information</h2>
      <p className="text-gray-700 leading-relaxed">
        The protection of your personal data is important to us. In this Privacy Policy
        we inform you about what data we collect on our website, how we use it and what
        rights you have. The responsible party under the GDPR is the operator named in
        the <a href="/legal" className="underline underline-offset-2 hover:text-black transition-colors">Legal Notice</a>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. Hosting</h2>
      <p className="text-gray-700 leading-relaxed">
        This website is hosted by <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701,
        San Francisco, CA 94104, USA. When you visit our website, technical data
        (IP address, browser type, operating system, referrer URL, date and time) is
        automatically stored in server log files. Processing is based on Art. 6(1)(f) GDPR
        (legitimate interest in secure operation of the website).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Cookies and Local Storage</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Our website uses cookies and the browser&apos;s local storage (localStorage).
        The table below gives an overview of the technologies used:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 border-b border-gray-200 font-semibold">Name</th>
              <th className="text-left px-4 py-3 border-b border-gray-200 font-semibold">Provider</th>
              <th className="text-left px-4 py-3 border-b border-gray-200 font-semibold">Purpose</th>
              <th className="text-left px-4 py-3 border-b border-gray-200 font-semibold">Duration</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-mono text-xs">sf_cookie_consent</td>
              <td className="px-4 py-3">Stylefinden</td>
              <td className="px-4 py-3">Stores your cookie consent</td>
              <td className="px-4 py-3">Until deleted</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-mono text-xs">_ga, _ga_*</td>
              <td className="px-4 py-3">Google Analytics</td>
              <td className="px-4 py-3">Distinguishes visitors (statistics)</td>
              <td className="px-4 py-3">2 years</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">va_*</td>
              <td className="px-4 py-3">Vercel Analytics</td>
              <td className="px-4 py-3">Anonymous page view statistics</td>
              <td className="px-4 py-3">Session</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-gray-700 leading-relaxed mt-4">
        Analytics cookies are only set with your consent (Art. 6(1)(a) GDPR).
        You can withdraw your consent at any time by clearing your browser&apos;s local
        storage (browser settings → clear data).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Google Analytics</h2>
      <p className="text-gray-700 leading-relaxed">
        With your consent we use <strong>Google Analytics 4</strong>, a web analytics service
        by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.
        Google Analytics collects your usage behavior on our website (pages visited,
        time spent, approximate location) and transfers this data to Google servers,
        which may also be located in the USA. Google is certified under the EU–US
        Data Privacy Framework.
      </p>
      <p className="text-gray-700 leading-relaxed mt-3">
        IP anonymization is enabled by default in GA4. Data is deleted after 2 years.
        You can opt out of Google Analytics data collection by installing the{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-black transition-colors"
        >
          Google browser add-on
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Vercel Analytics</h2>
      <p className="text-gray-700 leading-relaxed">
        We use <strong>Vercel Web Analytics</strong> by Vercel Inc. This service collects
        page views and performance data in anonymized form — no personal data is stored
        and no cookies are set. Processing is based on Art. 6(1)(f) GDPR (legitimate
        interest in the technical optimization of the website).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Google AdSense</h2>
      <p className="text-gray-700 leading-relaxed">
        This website plans to use <strong>Google AdSense</strong>, an advertising service
        by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.
        Google AdSense uses cookies and similar technologies to display personalized or
        non-personalized ads. Information generated by cookies about your use of this
        website may be transferred to Google servers in the USA. You can disable ad
        personalization at{" "}
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-black transition-colors"
        >
          adssettings.google.com
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Affiliate Links</h2>
      <p className="text-gray-700 leading-relaxed">
        This website contains or plans to include affiliate links. If you make a purchase
        through such a link, we may receive a commission from the provider. This does not
        incur any additional costs for you. Affiliate links are marked as advertising or
        partner links. Clicking an affiliate link may set cookies from the respective
        provider in your browser that are associated with your visit.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">8. Your Rights</h2>
      <p className="text-gray-700 leading-relaxed mb-3">
        You have the following rights regarding your personal data:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>Right of access (Art. 15 GDPR)</li>
        <li>Right to rectification (Art. 16 GDPR)</li>
        <li>Right to erasure (Art. 17 GDPR)</li>
        <li>Right to restriction of processing (Art. 18 GDPR)</li>
        <li>Right to data portability (Art. 20 GDPR)</li>
        <li>Right to object to processing (Art. 21 GDPR)</li>
        <li>Right to withdraw consent (Art. 7(3) GDPR)</li>
        <li>Right to lodge a complaint with the competent supervisory authority (Art. 77 GDPR)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">9. Contact</h2>
      <p className="text-gray-700 leading-relaxed">
        For any privacy-related questions please contact us at the email address
        provided in the{" "}
        <a href="/legal" className="underline underline-offset-2 hover:text-black transition-colors">
          Legal Notice
        </a>
        .
      </p>

      <p className="text-xs text-gray-400 mt-12">Last updated: {new Date().getFullYear()}</p>
    </main>
  )
}
