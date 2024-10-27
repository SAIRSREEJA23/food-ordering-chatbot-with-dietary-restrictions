import React from 'react';
import { MenuItem } from '../types';
import { Plus, Check } from 'lucide-react';

interface MenuDisplayProps {
  items: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
  selectedItems: MenuItem[];
}

export const MenuDisplay: React.FC<MenuDisplayProps> = ({ items, onItemSelect, selectedItems }) => {
  const isItemSelected = (item: MenuItem) => 
    selectedItems.some(selectedItem => selectedItem.id === item.id);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Menu</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No items match your dietary preferences. Try adjusting your filters.
        </p>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <span className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {item.dietaryRestrictions.map((restriction) => (
                      <span
                        key={restriction}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                      >
                        {restriction}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onItemSelect(item)}
                    disabled={isItemSelected(item)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isItemSelected(item)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isItemSelected(item) ? (
                      <>
                        <Check size={16} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};