import config from '@/lib/config';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-w-4 aspect-h-5 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-xl">
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <p className="text-sm font-medium">Profesjonalne zdjęcie</p>
                  <p className="text-sm">{config.psychologist.name}</p>
                </div>
              </div>
            </div>
            {/* Decorative background */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-emerald-100 rounded-2xl -z-10"></div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {config.navigation.about}
              </h2>
              <div className="w-20 h-1 bg-emerald-700"></div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {config.psychologist.name}
                </h3>
                <p className="text-lg text-emerald-700 font-medium mb-4">
                  {config.psychologist.title}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {config.psychologist.bio}
                </p>
              </div>

              {/* Experience badge */}
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="font-medium">{config.psychologist.experience}</span>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Kwalifikacje i certyfikaty
                </h4>
                <ul className="space-y-3">
                  {config.psychologist.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg
                          className="w-4 h-4 text-emerald-700"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Profesjonalizm</h5>
                      <p className="text-sm text-gray-600">Zgodnie z wymogami prawa</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Szybko</h5>
                      <p className="text-sm text-gray-600">Wydawanie zaświadczeń</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}