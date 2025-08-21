'use client';

import config from '@/lib/config';

export default function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {config.navigation.services}
          </h2>
          <div className="w-20 h-1 bg-teal-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Badania psychologiczne w zakresie psychologii transportu i medycyny pracy.
            Gabinet otwarty od poniedziałku do piątku.
          </p>
        </div>

        {/* Services Grid - Mobile Optimized */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {config.services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              {/* Service Header */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
                  {service.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center space-x-1 text-teal-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span className="text-sm font-medium">{service.price}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-teal-100">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm">{service.duration}</span>
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-4 h-4 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg
                          className="w-2.5 h-2.5 text-teal-600"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={scrollToContact}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-700 transition-colors text-sm"
                >
                  Zadzwoń: 576 804 375
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Pracownia Psychologiczna
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Profesjonalizm</h4>
                <p className="text-sm text-gray-600">Badania zgodnie z przepisami medycyny pracy</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Dostępność</h4>
                <p className="text-sm text-gray-600">Poniedziałek - Piątek (godziny popołudniowe)</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Rejestracja</h4>
                <p className="text-sm text-gray-600">Telefoniczna: 576 804 375</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}