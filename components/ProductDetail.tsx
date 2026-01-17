
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Minus, 
  Plus, 
  Heart, 
  Share2, 
  Flame, 
  Zap, 
  Info,
  ChevronRight,
  ShieldCheck,
  Star,
  Leaf
} from 'lucide-react';
import { Product, Language } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (id: string, quantity: number) => void;
  language: Language;
}

interface Ingredient {
  id: string;
  name: string;
  price: number;
  icon: string;
  removable: boolean;
  added: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart, language }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 'i1', name: 'Томаты', price: 0, icon: '🍅', removable: true, added: true },
    { id: 'i2', name: 'Маринованные огурцы', price: 0, icon: '🥒', removable: true, added: true },
    { id: 'i3', name: 'Лук красный', price: 0, icon: '🧅', removable: true, added: true },
    { id: 'i4', name: 'Сыр Чеддер', price: 59, icon: '🧀', removable: false, added: false },
    { id: 'i5', name: 'Бекон гриль', price: 89, icon: '🥓', removable: false, added: false },
    { id: 'i6', name: 'Халапеньо', price: 49, icon: '🌶️', removable: false, added: false },
  ]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const opacity = Math.min(1, scrollTop / 200);
    setScrollOpacity(opacity);
  };

  const toggleIngredient = (id: string) => {
    setIngredients(prev => prev.map(ing => 
      ing.id === id ? { ...ing, added: !ing.added } : ing
    ));
  };

  const extraCost = ingredients
    .filter(ing => ing.added && ing.price > 0)
    .reduce((sum, ing) => sum + ing.price, 0);

  const finalPrice = (product.price + extraCost) * quantity;

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="fixed inset-0 z-[200] bg-[#F9F4E8] overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-700 select-none"
    >
      <div 
        className="fixed top-0 left-0 right-0 z-[210] px-6 py-10 flex justify-between items-center transition-all duration-300"
        style={{ 
          backgroundColor: `rgba(255, 255, 255, ${scrollOpacity})`,
          backdropFilter: `blur(${scrollOpacity * 20}px)`,
          borderBottom: `1px solid rgba(0,0,0,${scrollOpacity * 0.05})`
        }}
      >
        <button 
          onClick={onClose}
          className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-[#3E2723] active:scale-90 transition-all border border-gray-50"
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        
        <div 
          className="flex-1 px-4 text-center transition-all duration-300"
          style={{ opacity: scrollOpacity, transform: `translateY(${(1 - scrollOpacity) * 20}px)` }}
        >
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Детали продукта</p>
          <h2 className="text-sm font-black text-[#3E2723] uppercase truncate">{product.name[language]}</h2>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all border border-gray-50 ${isLiked ? 'bg-red-50 text-[#D62300]' : 'bg-white text-[#3E2723]'}`}
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="relative h-[55vh] w-full overflow-hidden bg-white">
        <img 
          src={product.image} 
          alt={product.name[language]} 
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9F4E8] via-transparent to-transparent"></div>
        
        <div className="absolute bottom-12 left-6 right-6 flex items-center justify-between">
           <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl border border-white/50">
              <Flame size={16} className="text-[#F58025]" />
              <span className="text-xs font-black text-[#3E2723] uppercase tracking-tight">{product.calories} ккал</span>
           </div>
           <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl border border-white/50">
              <Star size={16} className="text-yellow-500" fill="currentColor" />
              <span className="text-xs font-black text-[#3E2723] uppercase tracking-tight">4.9 (1.2k)</span>
           </div>
        </div>
      </div>

      <div className="relative z-10 bg-[#F9F4E8] px-6 pt-2 pb-44 space-y-10">
        <div className="flex justify-between items-start">
          <div className="max-w-[70%]">
            <div className="flex items-center gap-2 mb-2">
               <span className="bg-[#D62300] text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Bestseller</span>
               <span className="bg-green-100 text-green-700 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md flex items-center gap-1">
                 <Leaf size={10} /> 100% Натурально
               </span>
            </div>
            <h1 className="text-4xl font-black text-[#3E2723] accent-font leading-[0.9] tracking-tighter uppercase">{product.name[language]}</h1>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Цена за шт</p>
             <span className="text-3xl font-black text-[#D62300] accent-font italic">₽{product.price}</span>
          </div>
        </div>

        <section className="space-y-4">
          <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.25em] px-1">Энергетическая ценность</h3>
          <div className="grid grid-cols-12 gap-3">
             <div className="col-span-4 bg-white p-4 rounded-[32px] shadow-sm border border-white flex flex-col items-center justify-center">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Белки</p>
                <p className="text-xl font-black text-[#3E2723]">{product.proteins}г</p>
                <div className="w-full h-1 bg-blue-50 rounded-full mt-2 overflow-hidden">
                   <div className="w-[60%] h-full bg-blue-400"></div>
                </div>
             </div>
             <div className="col-span-4 bg-white p-4 rounded-[32px] shadow-sm border border-white flex flex-col items-center justify-center">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Жиры</p>
                <p className="text-xl font-black text-[#3E2723]">{product.fats}г</p>
                <div className="w-full h-1 bg-yellow-50 rounded-full mt-2 overflow-hidden">
                   <div className="w-[45%] h-full bg-yellow-400"></div>
                </div>
             </div>
             <div className="col-span-4 bg-white p-4 rounded-[32px] shadow-sm border border-white flex flex-col items-center justify-center">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Углеводы</p>
                <p className="text-xl font-black text-[#3E2723]">{product.carbs}г</p>
                <div className="w-full h-1 bg-green-50 rounded-full mt-2 overflow-hidden">
                   <div className="w-[80%] h-full bg-green-400"></div>
                </div>
             </div>
          </div>
        </section>

        <section className="space-y-4">
           <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.25em] px-1">О блюде</h3>
           <div className="bg-white p-6 rounded-[40px] shadow-sm border border-white relative overflow-hidden">
              <p className="text-sm text-gray-500 leading-relaxed font-medium">
                {product.description[language]}
              </p>
              <div className="mt-6 flex items-center gap-3 pt-6 border-t border-gray-50">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#F58025]">
                  <Zap size={20} />
                </div>
                <div>
                   <p className="text-xs font-black text-[#3E2723] uppercase">Супер-сочно!</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Говядина Black Angus</p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50/30 rounded-full blur-3xl"></div>
           </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.25em]">Конфигуратор</h3>
            <span className="text-[9px] font-black text-[#D62300] uppercase tracking-widest bg-red-50 px-2 py-1 rounded-full">Можно убрать</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
             {ingredients.map((ing) => (
               <button 
                 key={ing.id}
                 onClick={() => toggleIngredient(ing.id)}
                 className={`relative p-4 rounded-[32px] border-2 transition-all duration-300 flex items-center gap-3 text-left group active:scale-95 ${
                   ing.added 
                    ? 'bg-white border-[#D62300] shadow-md' 
                    : 'bg-white/50 border-transparent opacity-60 grayscale'
                 }`}
               >
                 <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-inner transition-colors ${ing.added ? 'bg-red-50' : 'bg-gray-100'}`}>
                    {ing.icon}
                 </div>
                 <div className="flex-1 overflow-hidden">
                    <p className="text-[10px] font-black text-[#3E2723] uppercase truncate leading-tight">{ing.name}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                      {ing.price > 0 ? `+ ₽${ing.price}` : 'В составе'}
                    </p>
                 </div>
                 {ing.added && (
                   <div className="absolute -top-1 -right-1 bg-[#D62300] text-white w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-in zoom-in">
                      <Plus size={12} strokeWidth={4} className={ing.price === 0 ? "rotate-45" : ""} />
                   </div>
                 )}
               </button>
             ))}
          </div>
        </section>

        <section className="bg-[#3E2723] rounded-[35px] p-6 text-white flex items-center gap-4 shadow-xl">
           <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-green-400">
             <ShieldCheck size={28} />
           </div>
           <div>
              <p className="text-xs font-black uppercase tracking-widest">Контроль качества 2026</p>
              <p className="text-[9px] text-white/40 font-bold uppercase mt-1">Проверено шеф-поваром перед отправкой</p>
           </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 pb-12 bg-gradient-to-t from-[#F9F4E8] via-[#F9F4E8]/90 to-transparent z-[220]">
        <div className="max-w-md mx-auto flex items-center gap-4">
           <div className="bg-white rounded-[30px] p-1.5 flex items-center shadow-2xl border border-gray-100">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-[#F9F4E8] rounded-2xl flex items-center justify-center text-[#3E2723] active:scale-75 transition-transform"
              >
                <Minus size={20} strokeWidth={3} />
              </button>
              <span className="w-12 text-center font-black text-xl text-[#3E2723] accent-font">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 bg-[#F9F4E8] rounded-2xl flex items-center justify-center text-[#3E2723] active:scale-75 transition-transform"
              >
                <Plus size={20} strokeWidth={3} />
              </button>
           </div>

           <button 
             onClick={() => onAddToCart(product.id, quantity)}
             className="flex-1 h-[72px] bg-[#D62300] text-white rounded-[32px] font-black text-lg shadow-[0_20px_40px_-10px_rgba(214,35,0,0.5)] active:scale-[0.97] transition-all flex items-center justify-between px-8 group relative overflow-hidden"
           >
             <div className="flex items-center gap-3 relative z-10">
                <span className="uppercase tracking-tight">Добавить</span>
                <div className="w-px h-6 bg-white/20"></div>
                <span className="accent-font text-2xl">₽{finalPrice}</span>
             </div>
             <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-500 relative z-10" />
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
           </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}} />
    </div>
  );
};

export default ProductDetail;
