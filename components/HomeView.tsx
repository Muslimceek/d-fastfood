
import React from 'react';
import HeroBanner from './HeroBanner';
import ProductGrid from './ProductGrid';
import { Product, Language } from '../types';

interface HomeViewProps {
  popularProducts: Product[];
  onAddToCart: (id: string) => void;
  onProductClick: (id: string) => void;
  onShowMenu: () => void;
  language: Language;
}

const HomeView: React.FC<HomeViewProps> = ({ popularProducts, onAddToCart, onProductClick, onShowMenu, language }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <HeroBanner />
      
      <div className="px-5 flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-[#3E2723]">Популярное</h2>
        <button 
          onClick={onShowMenu}
          className="text-[#D62300] text-sm font-semibold hover:underline"
        >
          В меню
        </button>
      </div>

      <ProductGrid 
        products={popularProducts.slice(0, 4)} 
        onAddToCart={onAddToCart} 
        onProductClick={onProductClick}
        language={language}
      />
      
      <div className="px-5 pb-20">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-50 text-center">
          <h3 className="text-lg font-bold text-[#3E2723] mb-2">Хотите больше?</h3>
          <p className="text-sm text-gray-500 mb-4">Откройте наше полное меню, чтобы увидеть все доступные блюда и напитки.</p>
          <button 
            onClick={onShowMenu}
            className="w-full bg-[#D62300] text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-100 transition-transform active:scale-95"
          >
            Открыть полное меню
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
