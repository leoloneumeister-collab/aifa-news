import Link from 'next/link';

export default function Imprint() {
  return (
    <div className="min-h-screen bg-white max-w-3xl mx-auto px-6 py-24 sm:py-32">
      <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-bold text-sm mb-8 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Imprint (Impressum)</h1>
      
      <div className="prose prose-gray max-w-none space-y-8 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Information pursuant to § 5 TMG</h2>
          <p>
            <strong>Student Council CODE UG</strong><br />
            Donaustr. 44<br />
            12043 Berlin<br />
            Germany
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Represented by</h2>
          <p>
            The Managing Directors (Geschäftsführer)<br />
            Leolo Yubero Neumeister
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
          <p>
            Email: leoloneumeister@gmail.com<br />
            Phone: 017620131287
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Register Entry</h2>
          <p>
            Entry in the Commercial Register (Handelsregister).<br />
            Registering court: District Court Charlottenburg (Amtsgericht Charlottenburg)<br />
            Registration number: HRB 270764 B<br />
            EUID: DEF1103R.HRB270764B
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">VAT ID</h2>
          <p>
            Value Added Tax Identification Number according to § 27 a of the Value Added Tax Act:<br />
            DE450251130
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Consumer dispute resolution/universal arbitration board</h2>
          <p>
            We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </section>
      </div>
    </div>
  );
}
