import siteConfig from '@/config/site.json';

export interface Contact {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    full: string;
  };
  hours: {
    [key: string]: string;
  };
  googleMapsUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface SiteConfig {
  site: {
    title: string;
    description: string;
    keywords: string;
  };
  psychologist: {
    name: string;
    title: string;
    experience: string;
    bio: string;
    certifications: string[];
  };
  contact: Contact;
  services: Service[];
  reviews: Review[];
  cta: {
    primary: string;
    secondary: string;
    phoneCall: string;
  };
  navigation: {
    [key: string]: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    features: string[];
  };
  footer: {
    copyright: string;
    privacyPolicy: string;
  };
}

export const config: SiteConfig = siteConfig;

export default config;