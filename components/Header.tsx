
import React from 'react';
import { MapPin, ChevronDown, ShoppingCart, Clock } from 'lucide-react';
import { DeliveryType, Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  userName: string;
  avatar: string;
  location: string;
  deliveryType: DeliveryType;
  deliveryTime: string;
  cartCount: number;
  language: Language;
  onToggleDelivery: (type: DeliveryType) => void;
  onOpenCart: () => void;
  onOpenLocation: () => void;
  onOpenProfile: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  userName, 
  avatar, 
  location, 
  deliveryType, 
  deliveryTime,
  cartCount,
  language,
  onToggleDelivery,
  onOpenCart,
  onOpenLocation,
  onOpenProfile
}) => {
  const t = translations[language];

  return (
    <header className="px-5 pt-8 pb-6 bg-white rounded-b-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-b border-gray-50 sticky top-0 z-[60]">
      <div className="flex justify-between items-center mb-6">
        <div onClick={onOpenProfile} className="flex items-center gap-3 active:scale-95 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-[18px] overflow-hidden border-2 border-[#F9F4E8] shadow-md group-hover:border-[#D62300] transition-colors">
            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.15em] leading-none mb-1">{t.welcome}, 👋</h2>
            <h1 className="text-[#3E2723] text-base font-black accent-font tracking-tight">{userName}!</h1>
          </div>
        </div>
        
        <button onClick={onOpenCart} className="relative w-14 h-14 bg-[#F9F4E8] rounded-2xl flex items-center justify-center text-[#3E2723] active:scale-90 transition-all">
          <ShoppingCart size={22} strokeWidth={2.5} />
          {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-[#D62300] text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between bg-[#F9F4E8] p-1.5 rounded-[22px]">
          <button 
            onClick={() => onToggleDelivery('delivery')}
            className={`flex-1 py-3 px-4 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all ${
              deliveryType === 'delivery' ? 'bg-[#D62300] text-white shadow-lg' : 'text-gray-400'
            }`}
          >
            {t.delivery}
          </button>
          <button 
            onClick={() => onToggleDelivery('pickup')}
            className={`flex-1 py-3 px-4 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all ${
              deliveryType === 'pickup' ? 'bg-[#D62300] text-white shadow-lg' : 'text-gray-400'
            }`}
          >
            {t.pickup}
          </button>
        </div>

        <div onClick={onOpenLocation} className="flex items-center justify-between px-2 cursor-pointer">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#D62300] shrink-0">
              <MapPin size={16} strokeWidth={3} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] font-black text-[#3E2723] truncate">{location}</span>
              <div className="flex items-center gap-1 text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                <Clock size={10} />
                <span>{deliveryTime === 'ASAP' ? t.asap : deliveryTime}</span>
              </div>
            </div>
          </div>
          <span className="text-[9px] font-black text-[#F58025] uppercase tracking-widest">{t.change} →</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
