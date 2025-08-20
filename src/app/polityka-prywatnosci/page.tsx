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
      <header className="bg-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-emerald-200 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Powrót do strony głównej
            </Link>
          </div>
          <h1 className="text-4xl font-bold">Polityka Prywatności</h1>
          <p className="text-xl text-emerald-100 mt-4">
            Informacje o przetwarzaniu danych osobowych
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-gray max-w-none">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-emerald-800 mb-0">
              <strong>Ostatnia aktualizacja:</strong> {new Date().toLocaleDateString('pl-PL')}
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Administrator danych</h2>
            <p className="text-gray-700 leading-relaxed">
              Administratorem Twoich danych osobowych jest <strong>{config.psychologist.name}</strong>, 
              prowadząca gabinet psychologa transportu pod adresem {config.contact.address.full}.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="text-gray-700 mb-2"><strong>Kontakt:</strong></p>
              <ul className="text-gray-700 space-y-1">
                <li>Telefon: {config.contact.phone}</li>
                <li>Email: {config.contact.email}</li>
                <li>Adres: {config.contact.address.full}</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Jakie dane przetwarzamy</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dane kontaktowe:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Imię i nazwisko</li>
                  <li>Adres email</li>
                  <li>Numer telefonu</li>
                  <li>Treść wiadomości</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dane medyczne:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Wyniki badań psychologicznych</li>
                  <li>Informacje o stanie zdrowia psychicznego</li>
                  <li>Historia leczenia (jeśli dotyczy)</li>
                  <li>Dokumentacja medyczna</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cele przetwarzania danych</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <h3 className="font-semibold text-gray-900">Świadczenie usług medycznych</h3>
                <p className="text-gray-700">
                  Przeprowadzanie badań psychologicznych, konsultacji i wydawanie zaświadczeń zgodnie z przepisami prawa.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Podstawa prawna:</strong> Art. 9 ust. 2 lit. h RODO (ochrona zdrowia)
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900">Kontakt z klientami</h3>
                <p className="text-gray-700">
                  Odpowiadanie na zapytania, umawianie wizyt, przekazywanie informacji o usługach.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes)
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900">Obowiązki prawne</h3>
                <p className="text-gray-700">
                  Przechowywanie dokumentacji medycznej zgodnie z obowiązującymi przepisami.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Podstawa prawna:</strong> Art. 6 ust. 1 lit. c RODO (obowiązek prawny)
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Okres przechowywania danych</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between">
                  <span><strong>Dokumentacja medyczna:</strong></span>
                  <span>20 lat od ostatniej wizyty</span>
                </li>
                <li className="flex justify-between">
                  <span><strong>Dane kontaktowe:</strong></span>
                  <span>3 lata od ostatniego kontaktu</span>
                </li>
                <li className="flex justify-between">
                  <span><strong>Dane z formularza kontaktowego:</strong></span>
                  <span>1 rok od wysłania</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Twoje prawa</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-lg p-4">
                <h3 className="font-semibold text-emerald-900 mb-2">Prawo dostępu</h3>
                <p className="text-emerald-800 text-sm">
                  Możesz uzyskać informację o tym, jakie Twoje dane przetwarzamy.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Prawo do sprostowania</h3>
                <p className="text-blue-800 text-sm">
                  Możesz żądać poprawienia nieprawidłowych danych.
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-2">Prawo do usunięcia</h3>
                <p className="text-purple-800 text-sm">
                  W określonych przypadkach możesz żądać usunięcia danych.
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-2">Prawo do ograniczenia</h3>
                <p className="text-orange-800 text-sm">
                  Możesz ograniczyć przetwarzanie swoich danych.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Bezpieczeństwo danych</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800 leading-relaxed">
                Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych osobowych 
                przed nieautoryzowanym dostępem, utratą, zniszczeniem lub ujawnieniem. Dokumentacja medyczna 
                jest przechowywana w zamkniętych szafach, a dane elektroniczne są zabezpieczone hasłami.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies i technologie śledzące</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nasza strona internetowa używa plików cookies wyłącznie w celach technicznych, 
              niezbędnych do prawidłowego funkcjonowania witryny. Nie używamy cookies marketingowych 
              ani analitycznych bez Twojej zgody.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Zmiany w polityce prywatności</h2>
            <p className="text-gray-700 leading-relaxed">
              Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce prywatności. 
              O wszelkich istotnych zmianach będziemy informować na stronie internetowej.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Kontakt w sprawie danych osobowych</h2>
            <div className="bg-emerald-50 rounded-lg p-6">
              <p className="text-emerald-800 mb-4">
                W sprawach dotyczących przetwarzania danych osobowych możesz skontaktować się z nami:
              </p>
              <div className="space-y-2 text-emerald-800">
                <p><strong>Email:</strong> {config.contact.email}</p>
                <p><strong>Telefon:</strong> {config.contact.phone}</p>
                <p><strong>Adres:</strong> {config.contact.address.full}</p>
              </div>
              <p className="text-emerald-700 mt-4 text-sm">
                Masz również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}