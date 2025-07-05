export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
  features: string[];
  createdAt: Date;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
  popular: boolean;
  createdAt: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  email: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  createdAt: Date;
}

export interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  image: string;
  approved: boolean;
  createdAt: Date;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  projectImages: string[];
  category: string;
  technologies: string[];
  url?: string;
  githubUrl?: string;
  createdAt: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageId: string;
  packageName: string;
  packagePrice: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  orderDate: Date;
  notes?: string;
  deliveryDate?: Date;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  aboutText: string;
  featuredServices: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  businessHours: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface SectionImages {
  homeHero: string;
  servicesHero: string;
  packagesHero: string;
  teamHero: string;
  portfolioHero: string;
  contactHero: string;
}