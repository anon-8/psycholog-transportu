'use client';

import { useState } from 'react';
import config from '@/lib/config';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              {config.psychologist.name}
            </button>
            <span className="ml-2 text-sm text-gray-600 hidden sm:block">
              {config.psychologist.title}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-emerald-700 transition-colors"
            >
              {config.navigation.about}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-emerald-700 transition-colors"
            >
              {config.navigation.services}
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-gray-700 hover:text-emerald-700 transition-colors"
            >
              {config.navigation.reviews}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-emerald-700 transition-colors"
            >
              {config.navigation.contact}
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${config.contact.phone}`}
              className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
            >
              {config.contact.phone}
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-emerald-700 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              {config.cta.primary}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-emerald-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50 transition-colors rounded-md"
            >
              {config.navigation.about}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50 transition-colors rounded-md"
            >
              {config.navigation.services}
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50 transition-colors rounded-md"
            >
              {config.navigation.reviews}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-emerald-700 hover:bg-gray-50 transition-colors rounded-md"
            >
              {config.navigation.contact}
            </button>
            <div className="px-3 py-2 space-y-3 border-t border-gray-100 mt-2">
              <a
                href={`tel:${config.contact.phone}`}
                className="block text-emerald-700 font-medium text-center py-2"
              >
                {config.contact.phone}
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-800 transition-colors font-medium"
              >
                {config.cta.primary}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}