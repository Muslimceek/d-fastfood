
import React from 'react';
import { Home, UtensilsCrossed, Tag, MapPin, MoreHorizontal } from 'lucide-react';
import { TabType, Language } from '../types';
import { translations } from '../translations';

interface BottomNavProps {
  activeTab: TabType;
  cartCount: number;
  language: Language;
  onTabChange: (tab: TabType) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, cartCount, language, onTabChange }) => {
  const t = translations[language];

  const tabs: { id: TabType; icon: any; label: string }[] = [
    { id: 'home', icon: Home, label: t.home },
    { id: 'menu', icon: UtensilsCrossed, label: t.menu },
    { id: 'promo', icon: Tag, label: t.promo },
    { id: 'restaurants', icon: MapPin, label: t.where },
    { id: 'more', icon: MoreHorizontal, label: t.more },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 rounded-t-[32px] shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button 
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all relative ${
              isActive ? 'text-[#D62300] scale-110' : 'text-gray-400'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-80'}`}>
              {tab.label}
            </span>
            {isActive && <span className="absolute -bottom-2 w-1.5 h-1.5 bg-[#D62300] rounded-full"></span>}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
