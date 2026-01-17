
import React from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES } from '../constants';
// Add Language import
import { Language } from '../types';

interface SearchFiltersProps {
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  onOpenFullSearch: () => void;
  // Add language to props
  language: Language;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ selectedCategory, onSelectCategory, onOpenFullSearch, language }) => {
  return (
    <div className="sticky top-[156px] z-40 bg-[#F9F4E8]/90 backdrop-blur-md pt-4 pb-2">
      <div className="px-5 mb-4">
        <div 
          onClick={onOpenFullSearch}
          className="relative group cursor-pointer"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D62300] transition-colors" size={20} />
          <div className="w-full h-14 pl-12 pr-4 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center text-gray-300 font-medium transition-all group-active:scale-95">
            Что вы хотите поесть?
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-[#D62300] animate-pulse"></div>
             <span className="text-[8px] font-black text-[#D62300] uppercase tracking-widest">Live</span>
          </div>
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-3 px-5 pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 ${
              selectedCategory === cat.id
                ? 'bg-[#D62300] text-white shadow-md scale-105'
                : 'bg-white text-gray-600 border border-gray-100'
            }`}
          >
            <span className="text-lg">{cat.icon}</span>
            {/* Fix: Access localized category name */}
            <span className="text-sm font-semibold">{cat.name[language]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilters;
