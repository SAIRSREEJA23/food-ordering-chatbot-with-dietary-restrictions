import { Restaurant } from '../types';
import { menuItems } from './menu';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Green Garden Bistro',
    description: 'Farm-to-table restaurant specializing in organic and sustainable dishes',
    cuisine: 'Modern American',
    rating: 4.8,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    address: '123 Maple Street, Downtown',
    menu: menuItems.filter(item => ['vegan', 'gluten-free'].some(r => item.dietaryRestrictions.includes(r as any)))
  },
  {
    id: '2',
    name: 'Mediterranean Nights',
    description: 'Authentic Mediterranean cuisine with a modern twist',
    cuisine: 'Mediterranean',
    rating: 4.6,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    address: '456 Ocean Drive, Seaside District',
    menu: menuItems
  },
  {
    id: '3',
    name: 'Zen Kitchen',
    description: 'Contemporary Asian fusion with emphasis on healthy eating',
    cuisine: 'Asian Fusion',
    rating: 4.7,
    priceRange: '$$$',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    address: '789 Cherry Blossom Lane, East Side',
    menu: menuItems.filter(item => item.dietaryRestrictions.includes('vegan'))
  },
  {
    id: '4',
    name: 'The Healthy Bowl',
    description: 'Nutritious bowls and smoothies for health-conscious diners',
    cuisine: 'Health Food',
    rating: 4.5,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1540914124281-342587941389?auto=format&fit=crop&w=800&q=80',
    address: '321 Wellness Way, Fitness District',
    menu: menuItems.filter(item => ['vegan', 'gluten-free'].some(r => item.dietaryRestrictions.includes(r as any)))
  },
  {
    id: '5',
    name: 'Rustic Table',
    description: 'Farm-fresh ingredients in a cozy atmosphere',
    cuisine: 'American',
    rating: 4.4,
    priceRange: '$$',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80',
    address: '567 Farmstead Road, West End',
    menu: menuItems
  }
];