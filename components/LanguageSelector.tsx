
import React from 'react';
import { Language } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onLanguageChange, onClose }) => {
  const languages: { id: Language; label: string; flag: string; native: string }[] = [
    { id: 'ru', label: 'Русский', flag: '🇷🇺', native: 'Русский' },
    { id: 'en', label: 'English', flag: '🇺🇸', native: 'English' },
    { id: 'uz', label: 'Oʻzbek', flag: '🇺🇿', native: 'Oʻzbekcha' },
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-end justify-center select-none overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500"></div>
      
      <div className="relative w-full max-w-md bg-[#F9F4E8] rounded-t-[50px] p-8 pb-12 animate-in slide-in-from-bottom duration-700">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>
        
        <h3 className="text-2xl font-black text-[#3E2723] accent-font uppercase mb-8 text-center tracking-tight">
          {currentLanguage === 'ru' ? 'Выберите язык' : currentLanguage === 'en' ? 'Select Language' : 'Tilni tanlang'}
        </h3>
        
        <div className="space-y-4">
          {languages.map((lang) => (
            <button 
              key={lang.id}
              onClick={() => { onLanguageChange(lang.id); onClose(); }}
              className={`w-full p-6 rounded-[32px] border-2 transition-all flex items-center justify-between text-left ${
                currentLanguage === lang.id 
                  ? 'bg-white border-[#D62300] shadow-xl shadow-red-100' 
                  : 'bg-white/50 border-transparent grayscale hover:grayscale-0'
              }`}
            >
              <div className="flex items-center gap-5">
                <span className="text-4xl">{lang.flag}</span>
                <div>
                   <p className="text-sm font-black text-[#3E2723] uppercase tracking-tight">{lang.label}</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{lang.native}</p>
                </div>
              </div>
              {currentLanguage === lang.id && <CheckCircle2 size={24} className="text-[#D62300]" fill="currentColor" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
