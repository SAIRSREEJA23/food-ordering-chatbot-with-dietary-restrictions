import React from 'react';
import { Restaurant } from '../types';
import { Star, DollarSign, MapPin } from 'lucide-react';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
  selectedRestaurantId?: string;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onSelectRestaurant,
  selectedRestaurantId
}) => {
  const renderPriceRange = (range: string) => {
    return Array(range.length)
      .fill(null)
      .map((_, i) => (
        <DollarSign key={i} size={14} className="text-green-600" />
      ));
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <Star size={16} className="text-yellow-400 fill-current" />
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Nearby Restaurants</h2>
      <div className="grid gap-4">
        {restaurants.map((restaurant) => (
          <button
            key={restaurant.id}
            onClick={() => onSelectRestaurant(restaurant)}
            className={`w-full text-left ${
              selectedRestaurantId === restaurant.id
                ? 'ring-2 ring-blue-500'
                : ''
            }`}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
                <div className="w-32 h-32">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                    <div className="flex items-center gap-2">
                      {renderRating(restaurant.rating)}
                      <div className="flex">{renderPriceRange(restaurant.priceRange)}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={14} />
                    <span>{restaurant.address}</span>
                    {restaurant.distance && (
                      <span className="text-blue-600">
                        {restaurant.distance.toFixed(1)} km away
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};