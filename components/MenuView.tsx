
import React from 'react';
import { Product, Language } from '../types';
import ProductGrid from './ProductGrid';
import { CATEGORIES } from '../constants';

interface MenuViewProps {
  products: Product[];
  selectedCategoryId: string;
  onAddToCart: (id: string) => void;
  onProductClick: (id: string) => void;
  language: Language;
}

const MenuView: React.FC<MenuViewProps> = ({ products, selectedCategoryId, onAddToCart, onProductClick, language }) => {
  const category = CATEGORIES.find(c => c.id === selectedCategoryId);
  const currentCategoryName = category 
    ? category.name[language] 
    : (language === 'ru' ? 'Все товары' : language === 'en' ? 'All products' : 'Barcha mahsulotlar');

  return (
    <div className="animate-in slide-in-from-right-4 duration-500">
      <div className="px-5 mt-4 mb-2">
        <h2 className="text-2xl font-black text-[#3E2723] accent-font">Меню</h2>
        <p className="text-sm text-gray-500">{currentCategoryName} — {products.length} позиций</p>
      </div>
      
      {products.length > 0 ? (
        <ProductGrid 
          products={products} 
          onAddToCart={onAddToCart} 
          onProductClick={onProductClick} 
          language={language}
        />
      ) : (
        <div className="px-5 py-20 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-bold text-[#3E2723]">Ничего не найдено</h3>
          <p className="text-sm text-gray-500">Попробуйте выбрать другую категорию</p>
        </div>
      )}
    </div>
  );
};

export default MenuView;
