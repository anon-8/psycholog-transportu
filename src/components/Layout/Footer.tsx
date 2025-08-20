import Link from 'next/link';
import config from '@/lib/config';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              {config.psychologist.name}
            </h3>
            <p className="text-gray-400 mb-4">
              {config.psychologist.title} • {config.psychologist.experience}
            </p>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Profesjonalne badania psychologiczne dla kierowców w Przemyślu. 
              Zapewniamy wysoką jakość usług zgodnie z obowiązującymi przepisami.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href={`tel:${config.contact.phone}`} className="text-gray-400 hover:text-white transition-colors">
                  {config.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href={`mailto:${config.contact.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {config.contact.email}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-emerald-400 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-gray-400">{config.contact.address.full}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Szybkie linki</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {config.navigation.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {config.navigation.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('reviews')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {config.navigation.reviews}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {config.navigation.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Usługi</h4>
            <ul className="space-y-3">
              {config.services.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              {config.footer.copyright}
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                href="/polityka-prywatnosci" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {config.footer.privacyPolicy}
              </Link>
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <span>Powered by</span>
                <span className="text-emerald-400 font-medium">Next.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}