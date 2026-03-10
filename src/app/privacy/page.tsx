import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white max-w-3xl mx-auto px-6 py-24 sm:py-32">
      <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-bold text-sm mb-8 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Privacy Policy (Datenschutzerklärung)</h1>
      
      <div className="prose prose-gray max-w-none space-y-8 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. An overview of data protection</h2>
          <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">General information</h3>
          <p>
            The following information will provide you with an easy to navigate overview of what will happen with your personal data when you visit this website. The term "personal data" comprises all data that can be used to personally identify you. For detailed information about the subject matter of data protection, please consult our Data Protection Declaration, which we have included beneath this copy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. General information and mandatory information</h2>
          <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">Data protection</h3>
          <p>
            The operators of this website take the protection of your personal data very seriously. We treat your personal data as confidential and in accordance with the statutory data protection regulations and this Data Protection Declaration.
          </p>
          <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">Information about the responsible party (referred to as the "controller" in the GDPR)</h3>
          <p>
            The data processing controller on this website is:
            <br /><br />
            <strong>Student Council CODE UG</strong><br />
            Donaustr. 44<br />
            12043 Berlin<br />
            Germany
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">3. Data collection on this website</h2>
          <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4">Server log files</h3>
          <p>
            The provider of this website and its pages automatically collects and stores information in so-called server log files, which your browser communicates to us automatically. The information comprises:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>The type and version of browser used</li>
            <li>The used operating system</li>
            <li>Referrer URL</li>
            <li>The hostname of the accessing computer</li>
            <li>The time of the server inquiry</li>
            <li>The IP address</li>
          </ul>
          <p className="mt-4">
            This data is not merged with other data sources.
            This data is recorded on the basis of Art. 6(1)(f) GDPR. The operator of the website has a legitimate interest in the technically error free depiction and the optimization of the operator's website. In order to achieve this, server log files must be recorded.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">4. Usage of Cookies & External APIs</h2>
          <p>
            Our website uses the Finlight API to retrieve dynamically generated global finance summaries and map them effectively. In doing so, anonymous request structures might be transmitted. We do not actively track analytics or invasive personal telemetry.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
          <p>
            Under the GDPR, you have the right to request information about your stored personal data, its origin, its recipients, and the purpose of its collection at no charge. You also have the right to request that it be corrected, blocked, or deleted.
          </p>
        </section>
      </div>
    </div>
  );
}
