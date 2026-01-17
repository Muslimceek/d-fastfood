
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Banknote, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  MessageSquare, 
  Utensils,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  Info,
  Edit2
} from 'lucide-react';
import { PaymentMethod, CartItem, DeliveryType, Card } from '../types';

interface CheckoutViewProps {
  items: CartItem[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  paymentMethod: PaymentMethod;
  location: string;
  deliveryType: DeliveryType;
  deliveryTime: string;
  savedCards: Card[];
  selectedCardId: string | null;
  onSetPaymentMethod: (method: PaymentMethod) => void;
  onEditLocation: () => void;
  onEditPayment: () => void;
  onBack: () => void;
  onComplete: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ 
  items,
  total, 
  subtotal,
  deliveryFee,
  serviceFee,
  paymentMethod, 
  location,
  deliveryType,
  deliveryTime,
  savedCards,
  selectedCardId,
  onSetPaymentMethod, 
  onEditLocation,
  onEditPayment,
  onBack, 
  onComplete 
}) => {
  const [needCutlery, setNeedCutlery] = useState(true);
  const [comment, setComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedCard = savedCards.find(c => c.id === selectedCardId);

  const handleFinalSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-[#F9F4E8] flex flex-col overflow-hidden select-none">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-[#D62300]/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white/80 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-sm text-[#3E2723] active:scale-90 transition-all"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
          <div>
            <h2 className="text-lg font-black text-[#3E2723] accent-font uppercase tracking-tight leading-none">Оформление</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Проверка данных</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full border-2 border-white ${i <= 2 ? 'bg-[#D62300]' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-5 pb-44">
        
        {/* Delivery Bento Section */}
        <section className={`transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.2em]">Локация и время</h3>
            <button 
              onClick={onEditLocation}
              className="text-[10px] font-black text-[#D62300] flex items-center gap-1 bg-red-50 px-3 py-1 rounded-full active:scale-90 transition-all"
            >
              <Edit2 size={10} /> ИЗМЕНИТЬ
            </button>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <button 
              onClick={onEditLocation}
              className="col-span-12 bg-white p-5 rounded-[32px] shadow-sm border border-gray-50 flex items-center gap-4 relative overflow-hidden group active:bg-gray-50 transition-colors text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-[#F58025] shrink-0 shadow-inner">
                <MapPin size={28} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-[#3E2723]">{location}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-tight mt-0.5">
                  {deliveryType === 'delivery' ? 'Курьер приедет сюда' : 'Ваш ресторан'}
                </p>
              </div>
              <ChevronRight size={20} className="text-gray-200 group-hover:text-[#D62300] transition-colors" />
            </button>
          </div>
        </section>

        {/* Payment Methods Section - Enhanced for Card Management */}
        <section className={`transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-3 px-1">
             <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.2em]">Способ оплаты</h3>
             <button 
                onClick={onEditPayment}
                className="text-[10px] font-black text-[#D62300] flex items-center gap-1 bg-red-50 px-3 py-1 rounded-full active:scale-90 transition-all uppercase"
              >
                <Edit2 size={10} /> {paymentMethod === 'card' ? 'Выбрать карту' : 'Изменить'}
              </button>
          </div>

          <div className="space-y-3">
            {/* Quick Card Selection / Display */}
            <button 
              onClick={() => onSetPaymentMethod('card')}
              className={`w-full p-6 rounded-[32px] border-2 transition-all flex items-center justify-between text-left relative overflow-hidden ${
                paymentMethod === 'card' 
                  ? 'bg-white border-[#D62300] shadow-xl shadow-red-100/50' 
                  : 'bg-white/50 border-transparent grayscale opacity-70'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  paymentMethod === 'card' ? 'bg-[#D62300] text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  <CreditCard size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-black text-[#3E2723]">
                    {selectedCard ? `•••• ${selectedCard.last4}` : 'Банковской картой'}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">
                    {selectedCard ? `${selectedCard.brand.toUpperCase()} • ${selectedCard.expiry}` : 'Оплата онлайн'}
                  </p>
                </div>
              </div>
              {/* Fixed: Consolidated duplicate className and redundant style attributes */}
              {paymentMethod === 'card' && <CheckCircle2 size={24} className="text-[#D62300] relative z-10" fill="currentColor" />}
              {paymentMethod === 'card' && <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-red-50 to-transparent"></div>}
            </button>

            <button 
              onClick={() => onSetPaymentMethod('cash')}
              className={`w-full p-6 rounded-[32px] border-2 transition-all flex items-center justify-between text-left relative overflow-hidden ${
                paymentMethod === 'cash' 
                  ? 'bg-white border-[#D62300] shadow-xl shadow-red-100/50' 
                  : 'bg-white/50 border-transparent grayscale opacity-70'
              }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  paymentMethod === 'cash' ? 'bg-[#D62300] text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  <Banknote size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-black text-[#3E2723]">Наличными</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">Оплата при получении</p>
                </div>
              </div>
              {paymentMethod === 'cash' && <CheckCircle2 size={24} className="text-[#D62300] relative z-10" fill="currentColor" />}
            </button>
          </div>
        </section>

        {/* Price Detail Breakdown */}
        <section className={`transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#3E2723] rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Итоговый чек</h3>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                  <Sparkles size={12} className="text-yellow-400" />
                  <span className="text-[10px] font-black uppercase">+{Math.floor(total * 0.05)} Coins</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/50 font-bold uppercase text-[10px] tracking-widest">Товары</span>
                  <span className="font-black tabular-nums">₽{subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/50 font-bold uppercase text-[10px] tracking-widest">Доставка</span>
                  <span className={`font-black tabular-nums ${deliveryFee === 0 ? 'text-green-400' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : `₽${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/50 font-bold uppercase text-[10px] tracking-widest">Сервисы</span>
                  <span className="font-black tabular-nums">₽{serviceFee}</span>
                </div>
                
                <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] block mb-1">Сумма заказа</span>
                    <span className="text-4xl font-black accent-font text-white leading-none tracking-tight">₽{total}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 mb-1">
                       <Lock size={10} className="text-white/30" />
                       <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Secure Pay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          </div>
        </section>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pb-10 bg-gradient-to-t from-[#F9F4E8] via-[#F9F4E8]/95 to-transparent z-[120]">
        <div className="max-w-md mx-auto relative">
          {isProcessing && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md rounded-[32px] z-10 flex flex-col items-center justify-center animate-in fade-in duration-300">
               <div className="w-10 h-10 border-4 border-[#D62300]/10 border-t-[#D62300] rounded-full animate-spin mb-3"></div>
               <p className="text-[10px] font-black text-[#D62300] uppercase tracking-widest">Обработка заказа...</p>
            </div>
          )}

          <button 
            disabled={isProcessing || (paymentMethod === 'card' && !selectedCardId)}
            onClick={handleFinalSubmit}
            className={`w-full h-20 bg-[#D62300] text-white rounded-[32px] font-black text-lg shadow-[0_20px_40px_-10px_rgba(214,35,0,0.4)] active:scale-95 transition-all flex items-center justify-between px-8 group relative overflow-hidden ${isProcessing ? 'opacity-50' : ''}`}
          >
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <CheckCircle2 size={24} fill="currentColor" className="text-white" />
               </div>
               <span className="uppercase tracking-tight">
                {paymentMethod === 'card' && !selectedCardId ? 'Выберите карту' : 'Оформить'}
               </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-8 w-px bg-white/20"></div>
              <span className="text-2xl font-black accent-font">₽{total}</span>
              <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform duration-500" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
