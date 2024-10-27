import React, { useState, useRef, useEffect } from 'react';
import { Message, DietaryRestriction, MenuItem, Location, Restaurant } from './types';
import { ChatMessage } from './components/ChatMessage';
import { DietarySelector } from './components/DietarySelector';
import { MenuDisplay } from './components/MenuDisplay';
import { LocationSelector } from './components/LocationSelector';
import { RestaurantList } from './components/RestaurantList';
import { restaurants } from './data/restaurants';
import { Send, UtensilsCrossed } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "👋 Welcome! I'm your personal food assistant. Let me help you find restaurants near you. Would you like to share your location?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedRestrictions, setSelectedRestrictions] = useState<DietaryRestriction[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleLocationSelect = (location: Location) => {
    setIsLoadingLocation(true);
    setUserLocation(location);
    
    // Simulate getting nearby restaurants with distances
    const nearbyRestaurants = restaurants.map(restaurant => ({
      ...restaurant,
      distance: calculateDistance(
        location.latitude,
        location.longitude,
        // Simulate restaurant locations around the user
        location.latitude + (Math.random() - 0.5) * 0.1,
        location.longitude + (Math.random() - 0.5) * 0.1
      )
    })).sort((a, b) => (a.distance || 0) - (b.distance || 0));

    setIsLoadingLocation(false);
    
    const botMessage: Message = {
      id: Date.now().toString(),
      content: "I've found several restaurants near you. You can browse them in the list or ask me about specific cuisines or dietary requirements.",
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowMenu(true);
    
    const botMessage: Message = {
      id: Date.now().toString(),
      content: `Great choice! ${restaurant.name} is known for their ${restaurant.cuisine.toLowerCase()} cuisine. Would you like to see their menu?`,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      let botResponse: Message;
      const lowercaseInput = input.toLowerCase();

      if (lowercaseInput.includes('menu')) {
        setShowMenu(true);
        botResponse = {
          id: (Date.now() + 1).toString(),
          content: selectedRestaurant
            ? `Here's the menu for ${selectedRestaurant.name}. They have several options that match your preferences!`
            : "Please select a restaurant first to view their menu.",
          sender: 'bot',
          timestamp: new Date(),
        };
      } else if (lowercaseInput.includes('location') || lowercaseInput.includes('near')) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content: "You can use the location selector above to find restaurants near you. Would you like to share your location?",
          sender: 'bot',
          timestamp: new Date(),
        };
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content: "I can help you find restaurants and navigate their menus. Would you like to search by location, cuisine type, or dietary restrictions?",
          sender: 'bot',
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  const handleRestrictionSelect = (restriction: DietaryRestriction) => {
    setSelectedRestrictions((prev) =>
      prev.includes(restriction)
        ? prev.filter((r) => r !== restriction)
        : [...prev, restriction]
    );
  };

  const handleItemSelect = (item: MenuItem) => {
    setSelectedItems((prev) => [...prev, item]);
    const message: Message = {
      id: Date.now().toString(),
      content: `Added ${item.name} to your order!`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex items-center gap-3">
              <UtensilsCrossed className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Restaurant Finder</h1>
            </div>
            <p className="mt-2 text-blue-100">Discover great restaurants near you</p>
          </div>

          <LocationSelector
            onLocationSelect={handleLocationSelect}
            isLoading={isLoadingLocation}
          />
          
          <DietarySelector
            selectedRestrictions={selectedRestrictions}
            onSelect={handleRestrictionSelect}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-[500px] overflow-y-auto p-4 space-y-4 border-r">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="h-[500px] overflow-y-auto p-4">
              {userLocation ? (
                showMenu && selectedRestaurant ? (
                  <MenuDisplay
                    items={selectedRestaurant.menu.filter((item) =>
                      selectedRestrictions.every((restriction) =>
                        item.dietaryRestrictions.includes(restriction)
                      )
                    )}
                    onItemSelect={handleItemSelect}
                    selectedItems={selectedItems}
                  />
                ) : (
                  <RestaurantList
                    restaurants={restaurants}
                    onSelectRestaurant={handleRestaurantSelect}
                    selectedRestaurantId={selectedRestaurant?.id}
                  />
                )
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Share your location to discover nearby restaurants</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              <button
                onClick={handleSend}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Send size={20} />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;