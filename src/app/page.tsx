'use client';

import Header from '@/components/Layout/Header';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Reviews from '@/components/Reviews/Reviews';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
