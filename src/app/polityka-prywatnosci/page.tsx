import Link from 'next/link';
import type { Metadata } from 'next';
import config from '@/lib/config';

export const metadata: Metadata = {
  title: `Polityka Prywatności - ${config.site.title}`,
  description: 'Polityka prywatności gabinetu psychologa transportu w Przemyślu. Informacje o przetwarzaniu danych osobowych.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Powrót do strony głównej
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Polityka Prywatności – Pracownia Psychologiczna {config.psychologist.name}
          </h1>

          <p className="text-gray-700">
            <strong>Ostatnia aktualizacja:</strong> {new Date().toLocaleDateString('pl-PL')}
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Administrator danych:</h2>
              <div className="text-gray-700 space-y-1">
                <p>{config.psychologist.name}, {config.contact.address.full}</p>
                <p>Email: {config.contact.email} | Tel: {config.contact.phone}</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Dane zbierane na stronie:</h2>
              <p className="text-gray-700">
                Strona nie zbiera danych osobowych ani nie posiada formularzy kontaktowych. 
                Używane są wyłącznie niezbędne pliki cookies techniczne, potrzebne do prawidłowego działania strony.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Prawa użytkownika:</h2>
              <p className="text-gray-700">
                W przypadku pytań dotyczących przetwarzania danych osobowych można kontaktować się pod powyższym adresem email lub telefonicznie.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}