
import React, { useState } from 'react';
import { 
  User, 
  History, 
  CreditCard, 
  MapPin, 
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Bell,
  Globe
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { Language } from '../types';
import { translations } from '../translations';

interface MoreViewProps {
  userName: string;
  avatar: string;
  loyaltyPoints: number;
  currentLanguage: Language;
  onEditProfile: () => void;
  onOpenLoyalty: () => void;
  onLanguageChange: (lang: Language) => void;
}

const MoreView: React.FC<MoreViewProps> = ({ 
  userName, 
  avatar, 
  loyaltyPoints, 
  currentLanguage,
  onEditProfile, 
  onOpenLoyalty,
  onLanguageChange
}) => {
  const [showLangPicker, setShowLangPicker] = useState(false);
  const t = translations[currentLanguage];

  const menuSections = [
    {
      title: t.language,
      items: [
        { 
          icon: Globe, 
          label: currentLanguage === 'ru' ? 'Русский' : currentLanguage === 'en' ? 'English' : 'Oʻzbekcha', 
          color: 'text-green-500', 
          action: () => setShowLangPicker(true) 
        },
      ]
    },
    {
      title: t.settings,
      items: [
        { icon: Bell, label: 'Уведомления', color: 'text-yellow-500', action: () => {} },
        { icon: ShieldCheck, label: 'Безопасность', color: 'text-blue-500', action: () => {} },
      ]
    }
  ];

  return (
    <div className="animate-in slide-in-from-right-4 duration-500 pb-28">
      <div className="px-5 mt-4 mb-6">
        <h2 className="text-2xl font-black text-[#3E2723] accent-font">{t.more}</h2>
      </div>

      {/* Profile Header */}
      <div className="px-5 mb-8">
        <div className="bg-white rounded-[32px] p-6 shadow-sm flex items-center border border-gray-50">
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#F9F4E8] shadow-sm">
            <img src={avatar} alt={userName} className="w-full h-full object-cover" />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-xl font-bold text-[#3E2723]">{userName}</h3>
            <p className="text-sm text-gray-400">+7 (999) 123-45-67</p>
            <button 
              onClick={onEditProfile}
              className="mt-2 text-[#D62300] text-xs font-bold flex items-center gap-1"
            >
              {t.profile} <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Loyalty Card */}
      <div className="px-5 mb-8">
        <button 
          onClick={onOpenLoyalty}
          className="w-full bg-gradient-to-br from-[#3E2723] to-[#1A0F0D] rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl text-left active:scale-[0.98] transition-all group"
        >
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-wider mb-1">{t.total}</p>
              <h4 className="text-3xl font-black accent-font italic">{loyaltyPoints} <span className="text-[#F58025]">{t.loyalty_coins}</span></h4>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl group-hover:bg-[#F58025] transition-colors">
              <User size={24} className="text-[#F58025] group-hover:text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">FoodFlow Premium</p>
            <ChevronRight size={14} className="text-[#F58025]" />
          </div>
        </button>
      </div>

      <div className="px-5 space-y-8">
        {menuSections.map((section, sIndex) => (
          <div key={sIndex}>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">
              {section.title}
            </h4>
            <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50">
              {section.items.map((item, iIndex) => {
                const Icon = item.icon;
                return (
                  <button 
                    key={iIndex}
                    onClick={() => item.action()}
                    className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors ${
                      iIndex !== section.items.length - 1 ? 'border-b border-gray-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-2xl bg-[#F9F4E8] flex items-center justify-center ${item.color}`}>
                        <Icon size={20} />
                      </div>
                      <span className="text-sm font-bold text-[#3E2723]">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-200" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-10">
        <button className="w-full flex items-center justify-center gap-2 py-5 bg-white rounded-[32px] shadow-sm border border-red-50 text-[#D62300] font-bold text-sm active:scale-95 transition-all">
          <LogOut size={20} />
          {t.logout}
        </button>
      </div>

      {showLangPicker && (
        <LanguageSelector 
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
          onClose={() => setShowLangPicker(false)}
        />
      )}
    </div>
  );
};

export default MoreView;
