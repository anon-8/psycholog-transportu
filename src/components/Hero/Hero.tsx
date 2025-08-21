"use client";

import Image from "next/image";
import config from "@/lib/config";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="pt-16 bg-gradient-to-br from-teal-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {config.hero.headline}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">{config.hero.subheadline}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.hero.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-teal-700"
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
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("contact")}
                className="group bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                {config.cta.primary}
                <svg
                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
              <a
                href={`tel:${config.contact.phone}`}
                className="group bg-white text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-teal-50 transition-all duration-300 text-center flex items-center justify-center transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {config.cta.phoneCall}
              </a>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <span>{config.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>{config.contact.address.city}</span>
              </div>
            </div>
          </div>

          {/* Driver Examination Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="aspect-[4/5] w-full rounded-2xl shadow-2xl overflow-hidden bg-white">
                <Image
                  src="/images/hero.png"
                  alt="Badania psychologiczne kierowców - transport i medycyna pracy"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-300 rounded-full opacity-15 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
