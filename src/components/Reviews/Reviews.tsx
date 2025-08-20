'use client';

import { useState, useEffect } from 'react';
import config from '@/lib/config';

export default function Reviews() {
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-advance reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => 
        prev === config.reviews.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextReview = () => {
    setCurrentReview((prev) => 
      prev === config.reviews.length - 1 ? 0 : prev + 1
    );
  };

  const prevReview = () => {
    setCurrentReview((prev) => 
      prev === 0 ? config.reviews.length - 1 : prev - 1
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {config.navigation.reviews}
          </h2>
          <div className="w-20 h-1 bg-emerald-700 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sprawdź, co mówią nasi klienci o naszych usługach. 
            Ich zadowolenie jest dla nas najważniejsze.
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden min-h-[300px] flex flex-col">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-100 rounded-full -translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-50 rounded-full translate-x-16 translate-y-16"></div>
            
            {/* Quote icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <svg className="w-16 h-16 text-emerald-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>

            {/* Review Content */}
            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {renderStars(config.reviews[currentReview].rating)}
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{config.reviews[currentReview].text}&rdquo;
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {config.reviews[currentReview].name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(config.reviews[currentReview].date)}
                    </p>
                  </div>
                  {config.reviews[currentReview].verified && (
                    <div className="flex items-center space-x-1 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span className="text-sm font-medium">Zweryfikowana</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevReview}
                  className="p-3 rounded-full bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700 transition-colors"
                  aria-label="Poprzednia opinia"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Dots indicator */}
                <div className="flex space-x-2">
                  {config.reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentReview(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentReview 
                          ? 'bg-emerald-700' 
                          : 'bg-gray-300 hover:bg-emerald-300'
                      }`}
                      aria-label={`Przejdź do opinii ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextReview}
                  className="p-3 rounded-full bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-700 transition-colors"
                  aria-label="Następna opinia"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Zadowolonych klientów</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">15</h3>
            <p className="text-gray-600">lat doświadczenia</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24h</h3>
            <p className="text-gray-600">Maksymalny czas oczekiwania</p>
          </div>
        </div>
      </div>
    </section>
  );
}