import config from "@/lib/config";

export default function Contact() {
  const formatPhoneForDisplay = (phone: string) => {
    return phone.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{config.navigation.contact}</h2>
          <div className="w-20 h-1 bg-teal-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            <strong className="text-teal-600">Badania psychologiczne umawiamy wyłącznie telefonicznie.</strong>
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Zadzwoń, aby umówić badanie lub uzyskać więcej informacji.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8 mb-12">
            {/* Phone Contact */}
            <div className="bg-teal-50 rounded-2xl p-6 md:p-8 md:col-span-2 lg:col-span-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Telefon</h3>
                <a
                  href={`tel:${config.contact.phone}`}
                  className="text-xl md:text-2xl font-bold text-teal-600 hover:text-teal-700 block mb-2"
                >
                  {formatPhoneForDisplay(config.contact.phone)}
                </a>
                <p className="text-sm text-teal-800 font-medium bg-teal-100 px-3 py-1 rounded-full inline-block">
                  Rejestracja telefoniczna
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Adres gabinetu</h3>
                <p className="text-gray-600 font-medium">{config.contact.address.full}</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white border-2 border-teal-100 rounded-2xl p-6 md:p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Godziny otwarcia</h3>
                <span className="text-xs text-green-300">Rejstracja wyłącznie telefoniczna</span>
                <div className="space-y-3">
                  <div className="bg-teal-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium text-sm">Pon - Czw</span>
                      <span className="text-teal-600 font-bold">{config.contact.hours.monday}</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium text-sm">Piątek</span>
                      <span className="text-gray-900 font-bold">{config.contact.hours.friday}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lokalizacja gabinetu</h3>
              <p className="text-gray-600">Znajdź nas w Przemyślu</p>
            </div>
            <div className="aspect-w-16 aspect-h-12">
              <iframe
                src={config.contact.googleMapsUrl}
                className="w-full h-80 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja gabinetu psychologa transportu w Przemyślu"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
