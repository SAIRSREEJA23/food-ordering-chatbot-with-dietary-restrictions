import React from 'react';
import { DietaryRestriction } from '../types';
import { Leaf, Wheat, Milk } from 'lucide-react';

interface DietarySelectorProps {
  selectedRestrictions: DietaryRestriction[];
  onSelect: (restriction: DietaryRestriction) => void;
}

export const DietarySelector: React.FC<DietarySelectorProps> = ({
  selectedRestrictions,
  onSelect,
}) => {
  const restrictions: { value: DietaryRestriction; label: string; icon: React.ReactNode }[] = [
    { value: 'vegan', label: 'Vegan', icon: <Leaf className="w-4 h-4" /> },
    { value: 'vegetarian', label: 'Vegetarian', icon: <Leaf className="w-4 h-4" /> },
    { value: 'gluten-free', label: 'Gluten-Free', icon: <Wheat className="w-4 h-4" /> },
    { value: 'dairy-free', label: 'Dairy-Free', icon: <Milk className="w-4 h-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {restrictions.map(({ value, label, icon }) => (
        <button
          key={value}
          onClick={() => onSelect(value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              selectedRestrictions.includes(value)
                ? 'bg-green-100 text-green-800 border-2 border-green-500'
                : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
            }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};