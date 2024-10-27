export type DietaryRestriction = 'vegan' | 'vegetarian' | 'gluten-free' | 'dairy-free' | 'none';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  dietaryRestrictions: DietaryRestriction[];
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  image: string;
  address: string;
  distance?: number;
  menu: MenuItem[];
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}