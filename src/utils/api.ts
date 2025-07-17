import { HomePageContentDB, HeroImage, HomeStat, HomeService, Review, ContactInfo, ReviewsStat, ContactMessage, FullHomePage } from '../types';

export const API_URL = import.meta.env.VITE_API_URL;

export const getFullHomePage = async (): Promise<FullHomePage> => {
  const response = await fetch(`${API_URL}/home-page`);
  if (!response.ok) {
    throw new Error('Failed to fetch home page data');
  }
  return response.json();
};

export const getHomePageContent = async (): Promise<HomePageContentDB | null> => {
  try {
    const response = await fetch(`${API_URL}/home-content`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
    return null;
  }
};

export const getHeroImages = async (): Promise<HeroImage[]> => {
  try {
    const response = await fetch(`${API_URL}/hero-images`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
    return [];
  }
};

export const getHomeStats = async (): Promise<HomeStat[]> => {
  try {
    const response = await fetch(`${API_URL}/home-stats`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
    return [];
  }
};

export const getHomeServices = async (): Promise<HomeService[]> => {
  try {
    const response = await fetch(`${API_URL}/home-services`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
    return [];
  }
};

export const getReviews = async (): Promise<Review[]> => {
  try {
    const response = await fetch(`${API_URL}/reviews`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
    return [];
  }
};

export const addReview = async (review: Omit<Review, 'id' | 'approved' | 'created_at'>): Promise<Review | null> => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
    return null;
  }
};

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/images/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    
    throw error;
  }
};

export const getReviewsStats = async (): Promise<ReviewsStat[]> => {
  try {
    const response = await fetch(`${API_URL}/reviews-stats`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
    return [];
  }
};

export const getContactInfo = async (): Promise<ContactInfo | null> => {
  try {
    const response = await fetch(`${API_URL}/contact-info`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
    return null;
  }
};

export const sendMessage = async (message: Omit<ContactMessage, 'id' | 'read'>): Promise<ContactMessage | null> => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    
    return null;
  }
};