export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image_url: string;
  bio?: string;
  specialties?: string[];
  social_url_a?: string;
  social_url_b?: string;
  social_url_c?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: string;
  features: string[];
  coverImage?: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  is_popular: boolean;
  display_order?: number;
  updated_at?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_images: string[];
  category_name: string;
  aspect_ratio?: string;
  technologies: string[];
  url?: string;
  github_url?: string;
}

export interface PortfolioCategory {
  id: number;
  name: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  business_hours?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

// Aligned with backend HomePageContent model
export interface HomePageContent {
  hero_title?: string;
  hero_subtitle?: string;
  hero_description?: string;
  cta_title?: string;
  cta_subtitle?: string;
}

// Aligned with backend HeroImageOut model
export interface HeroImage {
  id: number;
  image_url: string;
  display_order: number;
}

// Aligned with backend HomeStatOut model
export interface HomeStat {
  id: number;
  number: string;
  label: string;
  icon?: string; // Changed from icon_name to icon
  display_order: number; // Changed from order to display_order
}

// Aligned with backend HomeServicePreviewOut model
export interface HomeServicePreview {
  id: number;
  title: string;
  description?: string;
  image_url?: string;
  display_order: number; // Changed from order to display_order
}

// Aligned with backend FullHomePage model
export interface FullHomePage {
  content: HomePageContent;
  hero_images: HeroImage[];
  stats: HomeStat[];
  services_preview: HomeServicePreview[];
}

export interface Review {
  id: string;
  name: string;
  designation: string;
  company: string;
  company_url: string;
  project: string;
  rating: number;
  review: string;
  image_url: string;
  approved: boolean;
  created_at: string;
}

export interface ReviewsStat {
  id: string;
  number: string;
  label: string;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  received_at: string;
}