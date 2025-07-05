import { 
  Service, 
  Package, 
  TeamMember, 
  Review, 
  PortfolioItem, 
  ContactMessage,
  Order,
  HomeContent,
  ContactInfo,
  SectionImages
} from '../types';
import { generateOrderId } from './orderUtils';

const STORAGE_KEYS = {
  SERVICES: 'admin_services',
  PACKAGES: 'admin_packages',
  TEAM: 'admin_team',
  REVIEWS: 'admin_reviews',
  PORTFOLIO: 'admin_portfolio',
  MESSAGES: 'admin_messages',
  ORDERS: 'admin_orders',
  HOME_CONTENT: 'admin_home_content',
  CONTACT_INFO: 'admin_contact_info',
  SECTION_IMAGES: 'admin_section_images'
};

// Generic storage functions
export const saveToStorage = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

// Services
export const saveServices = (services: Service[]): void => {
  saveToStorage(STORAGE_KEYS.SERVICES, services);
};

export const getServices = (): Service[] => {
  return getFromStorage(STORAGE_KEYS.SERVICES, []);
};

// Packages
export const savePackages = (packages: Package[]): void => {
  saveToStorage(STORAGE_KEYS.PACKAGES, packages);
};

export const getPackages = (): Package[] => {
  return getFromStorage(STORAGE_KEYS.PACKAGES, []);
};

// Team
export const saveTeam = (team: TeamMember[]): void => {
  saveToStorage(STORAGE_KEYS.TEAM, team);
};

export const getTeam = (): TeamMember[] => {
  return getFromStorage(STORAGE_KEYS.TEAM, []);
};

// Reviews
export const saveReviews = (reviews: Review[]): void => {
  saveToStorage(STORAGE_KEYS.REVIEWS, reviews);
};

export const getReviews = (): Review[] => {
  return getFromStorage(STORAGE_KEYS.REVIEWS, []);
};

// Portfolio
export const savePortfolio = (portfolio: PortfolioItem[]): void => {
  saveToStorage(STORAGE_KEYS.PORTFOLIO, portfolio);
};

export const getPortfolio = (): PortfolioItem[] => {
  return getFromStorage(STORAGE_KEYS.PORTFOLIO, []);
};

// Contact Messages
export const saveMessages = (messages: ContactMessage[]): void => {
  saveToStorage(STORAGE_KEYS.MESSAGES, messages);
};

export const getMessages = (): ContactMessage[] => {
  return getFromStorage(STORAGE_KEYS.MESSAGES, []);
};

// Orders
export const saveOrders = (orders: Order[]): void => {
  saveToStorage(STORAGE_KEYS.ORDERS, orders);
};

export const getOrders = (): Order[] => {
  return getFromStorage(STORAGE_KEYS.ORDERS, []);
};

// Home Content
export const saveHomeContent = (content: HomeContent): void => {
  saveToStorage(STORAGE_KEYS.HOME_CONTENT, content);
};

export const getHomeContent = (): HomeContent => {
  return getFromStorage(STORAGE_KEYS.HOME_CONTENT, {
    heroTitle: 'Creative Digital Solutions for Your Business',
    heroSubtitle: 'We transform ideas into powerful digital experiences that drive growth and success.',
    heroImage: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    aboutText: 'At MiniMind Creatives, we are passionate about creating innovative digital solutions that help businesses thrive in the modern world. Our team combines creativity with technical expertise to deliver exceptional results.',
    featuredServices: ['1', '2']
  });
};

// Contact Info
export const saveContactInfo = (info: ContactInfo): void => {
  saveToStorage(STORAGE_KEYS.CONTACT_INFO, info);
};

export const getContactInfo = (): ContactInfo => {
  return getFromStorage(STORAGE_KEYS.CONTACT_INFO, {
    email: 'info@minimindcreatives.com',
    phone: '+880 1234-567890',
    address: 'Dhaka, Bangladesh',
    businessHours: 'Sun-Thu 9AM-6PM',
    socialLinks: {
      facebook: 'https://facebook.com/minimindcreatives',
      linkedin: 'https://linkedin.com/company/minimindcreatives',
      instagram: 'https://instagram.com/minimindcreatives'
    }
  });
};

// Section Images
export const saveSectionImages = (images: SectionImages): void => {
  saveToStorage(STORAGE_KEYS.SECTION_IMAGES, images);
};

export const getSectionImages = (): SectionImages => {
  return getFromStorage(STORAGE_KEYS.SECTION_IMAGES, {
    homeHero: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    servicesHero: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    packagesHero: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    teamHero: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    portfolioHero: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    contactHero: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  });
};

// Add new message (for contact form integration)
export const addMessage = (message: Omit<ContactMessage, 'id' | 'createdAt'>): void => {
  const messages = getMessages();
  const newMessage: ContactMessage = {
    ...message,
    id: Date.now().toString(),
    read: false,
    createdAt: new Date()
  };
  saveMessages([...messages, newMessage]);
};

// Add new order (for package order integration)
export const addOrder = (order: Omit<Order, 'id' | 'orderDate'>): void => {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: generateOrderId(),
    orderDate: new Date(),
    status: 'pending'
  };
  saveOrders([...orders, newOrder]);
};

// Initialize with sample data
export const initializeSampleData = (): void => {
  if (getServices().length === 0) {
    const sampleServices: Service[] = [
      {
        id: '1',
        title: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies like React, Next.js, and Node.js',
        icon: 'Globe',
        price: 'Starting from $1,500',
        features: ['Responsive Design', 'SEO Optimized', 'Mobile Friendly', 'Fast Loading', 'Modern UI/UX'],
        createdAt: new Date()
      },
      {
        id: '2',
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android',
        icon: 'Smartphone',
        price: 'Starting from $3,000',
        features: ['iOS & Android', 'Cloud Integration', 'Push Notifications', 'Offline Support', 'App Store Deployment'],
        createdAt: new Date()
      },
      {
        id: '3',
        title: 'UI/UX Design',
        description: 'Beautiful and intuitive user interface and experience design',
        icon: 'Monitor',
        price: 'Starting from $800',
        features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Usability Testing'],
        createdAt: new Date()
      },
      {
        id: '4',
        title: 'Digital Marketing',
        description: 'Comprehensive digital marketing strategies to grow your online presence',
        icon: 'Zap',
        price: 'Starting from $500/month',
        features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy', 'PPC Campaigns', 'Analytics & Reporting'],
        createdAt: new Date()
      }
    ];
    saveServices(sampleServices);
  }

  if (getPackages().length === 0) {
    const samplePackages: Package[] = [
      {
        id: '1',
        name: 'Starter Package',
        description: 'Perfect for small businesses and startups looking to establish their online presence',
        price: '$1,999',
        duration: '2-3 weeks',
        features: ['5-Page Website', 'Mobile Responsive', 'Basic SEO', 'Contact Form', '1 Month Support'],
        popular: false,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Professional Package',
        description: 'Comprehensive solution for growing businesses with advanced features',
        price: '$3,999',
        duration: '4-6 weeks',
        features: ['10-Page Website', 'CMS Integration', 'Advanced SEO', 'E-commerce Ready', 'Analytics Setup', '3 Months Support'],
        popular: true,
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Enterprise Package',
        description: 'Full-scale solution for large businesses with custom requirements',
        price: '$7,999',
        duration: '8-12 weeks',
        features: ['Unlimited Pages', 'Custom Development', 'API Integration', 'Advanced Security', 'Performance Optimization', '6 Months Support'],
        popular: false,
        createdAt: new Date()
      }
    ];
    savePackages(samplePackages);
  }

  if (getTeam().length === 0) {
    const sampleTeam: TeamMember[] = [
      {
        id: '1',
        name: 'Ahmed Rahman',
        position: 'CEO & Founder',
        bio: 'Experienced leader with 8+ years in web development and digital marketing. Passionate about creating innovative solutions.',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        email: 'ahmed@minimindcreatives.com',
        social: {
          linkedin: 'https://linkedin.com/in/ahmedrahman',
          twitter: 'https://twitter.com/ahmedrahman'
        },
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Fatima Khan',
        position: 'Lead Designer',
        bio: 'Creative UI/UX designer with expertise in modern design trends and user experience optimization.',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        email: 'fatima@minimindcreatives.com',
        social: {
          linkedin: 'https://linkedin.com/in/fatimakhan',
          github: 'https://github.com/fatimakhan'
        },
        createdAt: new Date()
      }
    ];
    saveTeam(sampleTeam);
  }

  if (getReviews().length === 0) {
    const sampleReviews: Review[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        company: 'Tech Solutions Inc.',
        rating: 5,
        comment: 'MiniMind Creatives delivered an exceptional website that exceeded our expectations. Their attention to detail and professional approach made the entire process smooth and enjoyable.',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        approved: true,
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Michael Chen',
        company: 'Digital Ventures',
        rating: 5,
        comment: 'Outstanding work on our mobile app development. The team was responsive, creative, and delivered on time. Highly recommended!',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        approved: true,
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Emily Rodriguez',
        company: 'Creative Agency',
        rating: 4,
        comment: 'Great experience working with MiniMind Creatives. They understood our vision and brought it to life with excellent execution.',
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
        approved: true,
        createdAt: new Date()
      }
    ];
    saveReviews(sampleReviews);
  }

  if (getPortfolio().length === 0) {
    const samplePortfolio: PortfolioItem[] = [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'Modern online store with advanced features including payment integration, inventory management, and customer analytics.',
        coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1',
        projectImages: [
          'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1',
          'https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1'
        ],
        category: 'Web Development',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
        url: 'https://example-ecommerce.com',
        githubUrl: 'https://github.com/minimind/ecommerce',
        createdAt: new Date()
      },
      {
        id: '2',
        title: 'Restaurant Mobile App',
        description: 'Cross-platform mobile application for restaurant ordering with real-time tracking and payment integration.',
        coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1',
        projectImages: [
          'https://images.pexels.com/photos/3184361/pexels-photo-3184361.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1'
        ],
        category: 'Mobile Development',
        technologies: ['React Native', 'Firebase', 'Redux', 'Stripe'],
        url: 'https://play.google.com/store/apps/details?id=com.restaurant',
        createdAt: new Date()
      },
      {
        id: '3',
        title: 'Corporate Website',
        description: 'Professional corporate website with modern design, CMS integration, and SEO optimization.',
        coverImage: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1',
        projectImages: [
          'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1',
          'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1'
        ],
        category: 'Web Development',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS'],
        url: 'https://example-corporate.com',
        createdAt: new Date()
      }
    ];
    savePortfolio(samplePortfolio);
  }

  if (getMessages().length === 0) {
    const sampleMessages: ContactMessage[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        subject: 'Website Development Inquiry',
        message: 'Hi, I am interested in developing a new website for my business. Could you please provide more information about your services and pricing?',
        read: false,
        createdAt: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: '2',
        name: 'Lisa Wang',
        email: 'lisa@techstartup.com',
        subject: 'Mobile App Development',
        message: 'We are a tech startup looking to develop a mobile app. Would love to discuss our requirements and get a quote.',
        read: true,
        createdAt: new Date(Date.now() - 172800000) // 2 days ago
      }
    ];
    saveMessages(sampleMessages);
  }

  if (getOrders().length === 0) {
    const sampleOrders: Order[] = [
      {
        id: generateOrderId(),
        customerName: 'John Smith',
        customerEmail: 'john@example.com',
        customerPhone: '+1-555-0123',
        packageId: '2',
        packageName: 'Professional Package',
        packagePrice: '$3,999',
        status: 'confirmed',
        orderDate: new Date(Date.now() - 86400000), // 1 day ago
        notes: 'Customer wants to start ASAP. Prefers modern design with blue color scheme.'
      },
      {
        id: generateOrderId(),
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah@techsolutions.com',
        customerPhone: '+1-555-0456',
        packageId: '3',
        packageName: 'Enterprise Package',
        packagePrice: '$7,999',
        status: 'in-progress',
        orderDate: new Date(Date.now() - 604800000), // 1 week ago
        notes: 'Large project with custom API integrations required.'
      },
      {
        id: generateOrderId(),
        customerName: 'Mike Wilson',
        customerEmail: 'mike@startup.com',
        customerPhone: '+1-555-0789',
        packageId: '1',
        packageName: 'Starter Package',
        packagePrice: '$1,999',
        status: 'pending',
        orderDate: new Date(Date.now() - 3600000), // 1 hour ago
        notes: 'New startup, needs simple but professional website.'
      }
    ];
    saveOrders(sampleOrders);
  }
};