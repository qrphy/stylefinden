import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy of Stylefinden — information on data processing, cookies, affiliate links and your rights.",
  alternates: { canonical: "https://stylefinden.com/privacy" },
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 md:px-8 py-10 md:py-16">
      <h1 className="text-2xl md:text-3xl font-black mb-6 md:mb-8 uppercase tracking-tight">Privacy Policy</h1>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">1. General Information</h2>
      <p className="text-gray-700 leading-relaxed">
        The protection of your personal data is important to us. This Privacy Policy explains
        what data we collect on our website, how we use it, and what rights you have.
        The responsible party under the GDPR is the operator named in the{" "}
        <Link href="/legal" className="underline underline-offset-2 hover:text-black transition-colors">
          Legal Notice
        </Link>
        .
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">2. Hosting</h2>
      <p className="text-gray-700 leading-relaxed">
        This website is hosted by <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701,
        San Francisco, CA 94104, USA. When you visit our website, technical data
        (IP address, browser type, operating system, referrer URL, date and time) is
        automatically stored in server log files. Processing is based on Art. 6(1)(f) GDPR
        (legitimate interest in secure operation of the website). We also temporarily process
        IP addresses for rate-limiting purposes to protect our services from abuse; this data
        is not stored persistently.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">3. Cookies and Local Storage</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Our website uses cookies and the browser&apos;s local storage to provide core
        functionality and, with your consent, analytics. The table below gives an overview:
      </p>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
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
              <td className="px-4 py-3">Stores your cookie consent choice</td>
              <td className="px-4 py-3">Until deleted</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-mono text-xs">_ga, _ga_*</td>
              <td className="px-4 py-3">Google Analytics</td>
              <td className="px-4 py-3">Distinguishes visitors (statistics)</td>
              <td className="px-4 py-3">2 years</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-mono text-xs">va_*</td>
              <td className="px-4 py-3">Vercel Analytics</td>
              <td className="px-4 py-3">Anonymous page view statistics</td>
              <td className="px-4 py-3">Session</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-xs">ca-pub-*, IDE, __gads</td>
              <td className="px-4 py-3">Google AdSense</td>
              <td className="px-4 py-3">Personalized ad display (planned — not yet active)</td>
              <td className="px-4 py-3">1–2 years</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="sm:hidden flex flex-col gap-3">
        {[
          { name: "sf_cookie_consent", provider: "Stylefinden", purpose: "Stores your cookie consent choice", duration: "Until deleted" },
          { name: "_ga, _ga_*", provider: "Google Analytics", purpose: "Distinguishes visitors (statistics)", duration: "2 years" },
          { name: "va_*", provider: "Vercel Analytics", purpose: "Anonymous page view statistics", duration: "Session" },
          { name: "ca-pub-*, IDE, __gads", provider: "Google AdSense", purpose: "Personalized ad display (planned — not yet active)", duration: "1–2 years" },
        ].map((row) => (
          <div key={row.name} className="border border-gray-200 p-3 text-sm text-gray-700">
            <p className="font-mono text-xs text-black mb-1">{row.name}</p>
            <p><span className="font-semibold">Provider:</span> {row.provider}</p>
            <p><span className="font-semibold">Purpose:</span> {row.purpose}</p>
            <p><span className="font-semibold">Duration:</span> {row.duration}</p>
          </div>
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed mt-4">
        Analytics cookies are only set with your consent (Art. 6(1)(a) GDPR). You can
        withdraw your consent at any time by clearing your browser&apos;s local storage
        (browser settings → clear site data).
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">4. Google Analytics</h2>
      <p className="text-gray-700 leading-relaxed">
        With your consent we use <strong>Google Analytics 4</strong>, a web analytics service
        by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.
        Google Analytics collects your usage behavior (pages visited, time spent, approximate
        location) and transfers this data to Google servers, which may also be located in the
        USA. Google is certified under the EU–US Data Privacy Framework. IP anonymization is
        enabled by default in GA4. Data is deleted after 2 years. You can opt out by
        installing the{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-black transition-colors"
        >
          Google Analytics opt-out browser add-on
        </a>
        .
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">5. Vercel Analytics</h2>
      <p className="text-gray-700 leading-relaxed">
        We use <strong>Vercel Web Analytics</strong> by Vercel Inc. This service collects
        page views and performance data in anonymized form — no personal data is stored and
        no cookies are set. Processing is based on Art. 6(1)(f) GDPR (legitimate interest
        in technical optimization of the website).
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">6. Newsletter</h2>
      <p className="text-gray-700 leading-relaxed">
        If you subscribe to our newsletter, we collect your email address and store it in
        our mailing list managed by <strong>Resend Inc.</strong>, 2261 Market Street #5039,
        San Francisco, CA 94114, USA. Your email is used solely to send you style updates
        and editorial content from Stylefinden. We do not share your email address with
        any third party for marketing purposes.
      </p>
      <p className="text-gray-700 leading-relaxed mt-3">
        Legal basis: Art. 6(1)(a) GDPR (your consent). You may unsubscribe at any time
        by clicking the unsubscribe link included in every newsletter email. Your email
        address will be removed from our list within 48 hours of your request.
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">7. Affiliate Links & Click Tracking</h2>
      <p className="text-gray-700 leading-relaxed">
        This website contains affiliate links provided through the <strong>Awin</strong>{" "}
        affiliate network (Awin Ltd, 1 Carey Lane, London EC2V 8AE, United Kingdom).
        When you click an affiliate link we record a click event in our database
        (Supabase, operated by Supabase Inc., USA) containing the product ID and a
        timestamp — no personal data or IP address is stored in this click log.
      </p>
      <p className="text-gray-700 leading-relaxed mt-3">
        After clicking you are redirected to the retailer&apos;s website. The retailer and
        Awin may set their own tracking cookies in your browser in accordance with their
        respective privacy policies. If you make a purchase through such a link, we may
        receive a commission at no additional cost to you. All affiliate links are
        disclosed as advertising or partner links.
      </p>
      <p className="text-gray-700 leading-relaxed mt-3">
        Legal basis for click logging: Art. 6(1)(f) GDPR (legitimate interest in
        measuring affiliate performance).
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">8. AI-Generated Content</h2>
      <p className="text-gray-700 leading-relaxed">
        Outfit styling images on this website are created using{" "}
        <strong>Fashn AI</strong> (fashn.ai), a virtual try-on service. A synthetic
        model is used — no real person is depicted — and actual garments are
        digitally placed on that model. Images are intended for styling inspiration
        only; the actual appearance of a garment on a real person may differ.
        Fashn AI&apos;s privacy policy applies to image processing:{" "}
        <a
          href="https://fashn.ai/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-black transition-colors"
        >
          fashn.ai/privacy
        </a>
        .
      </p>
      <p className="text-gray-700 leading-relaxed mt-3">
        Some outfit descriptions and editorial text are generated or assisted by
        artificial intelligence using the <strong>Claude API</strong> by Anthropic,
        PBC, 548 Market Street #72220, San Francisco, CA 94104, USA. Text generation
        is based on editorial data (outfit names, style tags, season context) — no
        visitor personal data is sent to Anthropic. Anthropic&apos;s privacy policy
        applies to API usage:{" "}
        <a
          href="https://www.anthropic.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-black transition-colors"
        >
          anthropic.com/privacy
        </a>
        .
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">9. Google AdSense</h2>
      <p className="text-gray-700 leading-relaxed">
        This website plans to use <strong>Google AdSense</strong>, an advertising service
        by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.
        Google AdSense uses cookies and similar technologies to display personalized or
        non-personalized ads. Information generated by cookies about your use of this
        website may be transferred to Google servers in the USA. You can manage ad
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

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">10. Data Transfers Outside the EEA</h2>
      <p className="text-gray-700 leading-relaxed">
        Some of the third-party services listed above (Vercel, Google, Resend, Supabase,
        Anthropic) are based in the United States. Where data is transferred outside the
        European Economic Area, we rely on the EU–US Data Privacy Framework certification
        of the respective provider, or on Standard Contractual Clauses adopted by the
        European Commission (Art. 46(2)(c) GDPR).
      </p>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">11. Your Rights</h2>
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
        <li>Right to lodge a complaint with a supervisory authority (Art. 77 GDPR)</li>
      </ul>

      <h2 className="text-sm font-black uppercase tracking-widest mt-10 mb-3">12. Contact</h2>
      <p className="text-gray-700 leading-relaxed">
        For any privacy-related questions please contact us at the email address provided
        in the{" "}
        <Link href="/legal" className="underline underline-offset-2 hover:text-black transition-colors">
          Legal Notice
        </Link>
        .
      </p>

      <p className="text-xs text-gray-400 mt-12">Last updated: May 2026</p>
    </main>
  )
}
