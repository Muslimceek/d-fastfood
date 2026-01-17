
import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { RESTAURANTS } from '../constants';

const RestaurantsView: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-right-4 duration-500 pb-28">
      <div className="px-5 mt-4 mb-6">
        <h2 className="text-2xl font-black text-[#3E2723] accent-font">Наши рестораны</h2>
        <p className="text-sm text-gray-500">Найдите ближайший к вам FoodFlow</p>
      </div>

      <div className="px-5 space-y-4">
        {RESTAURANTS.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 flex flex-col group transition-all hover:shadow-md">
            <div className="h-40 relative">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#3E2723] shadow-sm">
                {restaurant.distance}
              </div>
              <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-white text-[10px] font-bold shadow-md flex items-center gap-1.5 ${
                restaurant.status === 'open' ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                {restaurant.status === 'open' ? 'Открыто' : 'Закрыто'}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-bold text-[#3E2723] mb-3">{restaurant.name}</h3>
              
              <div className="space-y-2.5 mb-5">
                <div className="flex items-start text-sm text-gray-500">
                  <MapPin size={16} className="text-[#D62300] mr-2 shrink-0 mt-0.5" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={16} className="text-[#D62300] mr-2 shrink-0" />
                  <span>{restaurant.hours}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone size={16} className="text-[#D62300] mr-2 shrink-0" />
                  <span>{restaurant.phone}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-[#F9F4E8] text-[#3E2723] py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <Navigation size={14} className="text-[#D62300]" />
                  Маршрут
                </button>
                <button className="flex-1 bg-[#D62300] text-white py-3 rounded-2xl text-xs font-bold active:scale-95 transition-all shadow-lg shadow-red-50">
                  В меню
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-8">
        <button className="w-full h-24 bg-[#3E2723] rounded-[32px] p-1 flex items-center shadow-lg relative overflow-hidden group">
          <div className="w-20 h-full rounded-[28px] overflow-hidden bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=150&q=80" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
              alt="Map"
            />
          </div>
          <div className="flex-1 text-left pl-4 text-white">
            <h4 className="font-bold text-sm">Посмотреть на карте</h4>
            <p className="text-[10px] text-white/60">Все 15 филиалов в вашем городе</p>
          </div>
          <div className="pr-6">
            <Navigation className="text-[#D62300]" size={20} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default RestaurantsView;
