
import React from 'react';
import { Plus } from 'lucide-react';
import { Product, Language } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (id: string) => void;
  onProductClick: (id: string) => void;
  language: Language;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onProductClick, language }) => {
  return (
    <section className="px-5 mb-10">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            onClick={() => onProductClick(product.id)}
            className="bg-white rounded-3xl p-3 shadow-sm flex flex-col group transition-all hover:shadow-md border border-gray-50 active:scale-[0.98]"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F9F4E8] mb-3">
              <img 
                src={product.image} 
                alt={product.name[language]} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-gray-500 flex items-center">
                🔥 {product.calories} ккал
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <h4 className="text-sm font-bold text-[#3E2723] mb-1 line-clamp-2 min-h-[40px] leading-tight">
                {product.name[language]}
              </h4>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="text-[#D62300] font-black text-lg">₽{product.price}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product.id);
                  }}
                  className="bg-[#D62300] text-white p-2.5 rounded-xl shadow-lg hover:bg-[#B51E00] active:scale-90 transition-all"
                  aria-label="Add to cart"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
