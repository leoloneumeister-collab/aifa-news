import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white max-w-3xl mx-auto px-6 py-24 sm:py-32">
      <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-bold text-sm mb-8 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Terms of Service (AGB)</h1>
      
      <div className="prose prose-gray max-w-none space-y-8 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. Scope of Application</h2>
          <p>
            These General Terms and Conditions (GTC) apply to all services provided by Student Council CODE UG (hereinafter "Provider", "we", or "us") to users of the AIFA NEWS platform. By accessing or using our services, you agree to be bound by these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
          <p>
            AIFA NEWS provides an aggregated financial news dashboard. We utilize third-party APIs (including Finlight.me) to curate, summarize, and display relevant financial articles and data. The service operates strictly as an informational tool and does not provide financial or legal advice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">3. No Investment Advice</h2>
          <p>
            The content provided through AIFA NEWS is for informational purposes only. You should not construe any such information or other material as legal, tax, investment, financial, or other advice. Nothing contained on our site constitutes a solicitation, recommendation, endorsement, or offer by the Provider or any third party service provider to buy or sell any securities or other financial instruments.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">4. Liability</h2>
          <p>
            To the maximum extent permitted by applicable law in Germany, Student Council CODE UG shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the service, or for the cost of procurement of substitute services. We do not guarantee the accuracy, completeness, or timeliness of the information aggregated.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
          <p>
            The AIFA NEWS software, structure, and associated proprietary content are the intellectual property of Student Council CODE UG. News articles and summaries remain the property of their respective copyright holders, aggregated under applicable legal frameworks.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">6. Jurisdiction and Applicable Law</h2>
          <p>
            These Terms of Service are governed by the laws of the Federal Republic of Germany. For merchants, corporate bodies under public law, or special funds under public law, the place of jurisdiction for all disputes arising from this contract is Berlin, Germany (Charlottenburg).
          </p>
        </section>
      </div>
    </div>
  );
}
