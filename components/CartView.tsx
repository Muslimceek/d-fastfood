
import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ChevronRight, 
  Ticket, 
  Info,
  Flame,
  X
} from 'lucide-react';
// Add Language import
import { CartItem, Product, Language } from '../types';
import { PRODUCTS } from '../constants';

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddToCart: (id: string, quantity?: number) => void;
  onClose: () => void;
  onCheckout: () => void;
  // Add language to props
  language: Language;
}

const CartView: React.FC<CartViewProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onAddToCart,
  onClose, 
  onCheckout,
  language
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const subtotal = useMemo(() => 
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  [items]);

  const deliveryFee = subtotal > 1500 ? 0 : 149;
  const serviceFee = items.length > 0 ? 29 : 0;
  const discount = isPromoApplied ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee + serviceFee - discount;

  const suggestedItems = useMemo(() => {
    const cartIds = new Set(items.map(i => i.product.id));
    return PRODUCTS.filter(p => !cartIds.has(p.id)).slice(0, 5);
  }, [items]);

  return (
    <div className="fixed inset-0 z-[150] flex items-end justify-center select-none overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500"
      ></div>

      {/* Modern Modal Bottom Sheet */}
      <div className="relative w-full max-w-md h-[92vh] bg-[#F9F4E8] rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex flex-col animate-in slide-in-from-bottom duration-700">
        
        {/* Handle Bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-200 rounded-full z-10"></div>
        
        {/* Modal Header */}
        <div className="px-6 pt-10 pb-6 flex items-center justify-between bg-white border-b border-gray-50 rounded-t-[50px]">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="w-10 h-10 bg-[#F9F4E8] rounded-full flex items-center justify-center text-[#3E2723] active:scale-90 transition-all">
              <X size={20} />
            </button>
            <div>
              <h2 className="text-xl font-black text-[#3E2723] accent-font uppercase tracking-tight">Корзина</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{items.length} товара</p>
            </div>
          </div>
          {items.length > 0 && (
            <button 
              onClick={() => items.forEach(i => onRemoveItem(i.product.id))}
              className="text-[9px] font-black text-red-400 uppercase tracking-[0.15em] hover:text-red-600 transition-colors bg-red-50 px-3 py-1.5 rounded-full"
            >
              Очистить
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center mb-10 shadow-xl relative">
              <ShoppingBag size={64} strokeWidth={1} className="text-gray-200" />
              <div className="absolute top-2 right-2 w-10 h-10 bg-[#D62300] rounded-full flex items-center justify-center text-white shadow-lg rotate-12">
                <Plus size={20} strokeWidth={4} />
              </div>
            </div>
            <h2 className="text-2xl font-black text-[#3E2723] accent-font mb-4 uppercase tracking-tighter">Корзина пуста</h2>
            <p className="text-gray-400 text-sm mb-12 leading-relaxed max-w-xs font-medium">
              Добавьте что-нибудь вкусненькое, чтобы ваш вечер стал ярче!
            </p>
            <button 
              onClick={onClose}
              className="w-full bg-[#D62300] text-white py-6 rounded-[30px] font-black shadow-[0_15px_30px_-5px_rgba(214,35,0,0.3)] active:scale-95 transition-all uppercase tracking-widest text-xs"
            >
              Перейти к меню
            </button>
          </div>
        ) : (
          /* Cart Content */
          <>
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-8 py-6">
              {/* Items Section */}
              <section className="bg-white rounded-[40px] mx-4 p-4 divide-y divide-gray-50 shadow-sm border border-white">
                {items.map((item) => (
                  <div key={item.product.id} className="py-6 flex gap-4 first:pt-2 last:pb-2">
                    <div className="w-24 h-24 rounded-[24px] overflow-hidden bg-[#F9F4E8] shrink-0 border border-gray-50 shadow-sm">
                      {/* Fix: Access localized product name for alt text */}
                      <img src={item.product.image} className="w-full h-full object-cover" alt={item.product.name[language]} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-black text-[#3E2723] text-xs uppercase leading-tight tracking-tight">
                            {/* Fix: Access localized product name */}
                            {item.product.name[language]}
                          </h3>
                          <button onClick={() => onRemoveItem(item.product.id)} className="text-gray-200 hover:text-red-400 p-1 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-[9px] text-gray-400 font-black uppercase mt-1 tracking-widest">🔥 {item.product.calories} ккал</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center bg-[#F9F4E8] rounded-2xl p-0.5 border border-white">
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-[#3E2723] active:scale-75 transition-transform"
                          >
                            <Minus size={16} strokeWidth={3} />
                          </button>
                          <span className="w-8 text-center font-black text-sm text-[#3E2723]">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#3E2723] active:scale-75 transition-transform"
                          >
                            <Plus size={16} strokeWidth={3} />
                          </button>
                        </div>
                        <p className="text-[#3E2723] font-black text-base accent-font">₽{item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* Upsell Row */}
              <section className="px-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Flame size={14} className="text-[#F58025]" />
                    Часто заказывают с этим
                  </h3>
                </div>
                <div className="flex overflow-x-auto no-scrollbar gap-4 pb-2">
                  {suggestedItems.map((product) => (
                    <div key={product.id} className="min-w-[140px] bg-white rounded-[32px] p-3 shadow-sm border border-white shrink-0 active:scale-95 transition-transform">
                      <div className="h-24 rounded-2xl bg-[#F9F4E8] overflow-hidden mb-3">
                        {/* Fix: Access localized product name for alt text */}
                        <img src={product.image} className="w-full h-full object-cover" alt={product.name[language]} />
                      </div>
                      {/* Fix: Access localized product name */}
                      <h4 className="text-[9px] font-black text-[#3E2723] uppercase line-clamp-1 mb-1 tracking-tight">{product.name[language]}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-[#D62300]">₽{product.price}</span>
                        <button onClick={() => onAddToCart(product.id, 1)} className="w-7 h-7 bg-[#3E2723] text-white rounded-xl flex items-center justify-center active:scale-90 transition-all">
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Promocode */}
              <section className="px-6">
                <div className="bg-white p-4 rounded-[32px] shadow-sm border border-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F9F4E8] flex items-center justify-center text-[#F58025] shrink-0">
                    <Ticket size={20} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="ПРОМОКОД"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 bg-transparent text-xs font-black uppercase tracking-widest text-[#3E2723] outline-none"
                  />
                  <button 
                    onClick={() => promoCode && setIsPromoApplied(!isPromoApplied)}
                    className={`px-4 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      isPromoApplied ? 'bg-green-500 text-white' : 'bg-[#D62300] text-white'
                    }`}
                  >
                    {isPromoApplied ? 'Применен' : 'ОК'}
                  </button>
                </div>
              </section>

              {/* Bill Details */}
              <section className="px-6 pb-40">
                <div className="bg-[#3E2723] rounded-[45px] p-8 text-white shadow-2xl relative overflow-hidden">
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      <span>Сумма заказа</span>
                      <span className="text-white">₽{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-widest">
                      <span>Доставка</span>
                      <span className={deliveryFee === 0 ? 'text-green-400' : 'text-white'}>
                        {deliveryFee === 0 ? 'FREE' : `₽${deliveryFee}`}
                      </span>
                    </div>
                    {isPromoApplied && (
                      <div className="flex justify-between items-center text-[10px] font-black text-orange-400 uppercase tracking-widest">
                        <span>Скидка</span>
                        <span>-₽{discount}</span>
                      </div>
                    )}
                    <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] mb-1">Итого</p>
                        <h4 className="text-4xl font-black accent-font text-white leading-none">₽{total}</h4>
                      </div>
                      <div className="text-right">
                         <span className="text-[9px] font-black text-green-400 bg-green-400/10 px-3 py-1.5 rounded-full uppercase tracking-widest">
                           + {Math.floor(total * 0.05)} Б
                         </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                </div>
              </section>
            </div>

            {/* Float Checkout Button */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-12 bg-gradient-to-t from-[#F9F4E8] via-[#F9F4E8]/95 to-transparent z-20">
              <button 
                onClick={onCheckout}
                className="w-full bg-[#D62300] text-white py-6 rounded-[30px] font-black text-lg shadow-[0_20px_40px_-10px_rgba(214,35,0,0.5)] active:scale-95 transition-all flex items-center justify-center gap-4 group uppercase tracking-tight"
              >
                <span>Оформить заказ</span>
                <div className="w-px h-6 bg-white/20"></div>
                <span className="accent-font text-2xl">₽{total}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartView;
