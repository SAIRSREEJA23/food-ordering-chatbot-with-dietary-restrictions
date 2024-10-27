import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Location } from '../types';

interface LocationSelectorProps {
  onLocationSelect: (location: Location) => void;
  isLoading: boolean;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationSelect,
  isLoading
}) => {
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button
          onClick={handleGetLocation}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Navigation size={18} />
          <span>{isLoading ? 'Getting location...' : 'Use my location'}</span>
        </button>
        <div className="relative flex-1">
          <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Or enter your address..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};