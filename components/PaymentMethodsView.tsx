
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight,
  Lock,
  Info,
  Smartphone
} from 'lucide-react';
import { Card } from '../types';

interface PaymentMethodsViewProps {
  cards: Card[];
  selectedCardId: string | null;
  onSelectCard: (id: string) => void;
  onAddCard: (card: Omit<Card, 'id'>) => void;
  onDeleteCard: (id: string) => void;
  onClose: () => void;
}

const PaymentMethodsView: React.FC<PaymentMethodsViewProps> = ({
  cards,
  selectedCardId,
  onSelectCard,
  onAddCard,
  onDeleteCard,
  onClose
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    holder: '',
    brand: 'visa' as 'visa' | 'mastercard' | 'mir'
  });

  const formatCardNumber = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) return parts.join(' ');
    return v;
  };

  const formatExpiry = (val: string) => {
    return val.replace(/^([0-9]{2})([0-9]{2})$/g, '$1/$2').substr(0, 5);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCard.number.length < 16) return;
    
    onAddCard({
      last4: newCard.number.slice(-4),
      brand: newCard.brand,
      expiry: newCard.expiry,
      holderName: newCard.holder.toUpperCase() || 'CARD HOLDER',
      color: 'bg-gradient-to-br from-gray-800 to-black'
    });
    setIsAdding(false);
    setNewCard({ number: '', expiry: '', cvv: '', holder: '', brand: 'visa' });
  };

  return (
    <div className="fixed inset-0 z-[160] bg-[#F9F4E8] flex flex-col overflow-hidden animate-in slide-in-from-right duration-500">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-[#D62300]/5 blur-[120px] rounded-full -z-10"></div>
      
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white/80 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose} 
            className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-sm text-[#3E2723] active:scale-90 transition-all"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
          <h2 className="text-lg font-black text-[#3E2723] accent-font uppercase tracking-tight">Карты и оплата</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6 pb-32">
        {!isAdding ? (
          <>
            {/* Saved Cards List */}
            <section className="space-y-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.2em]">Ваши карты</h3>
                <span className="text-[9px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase flex items-center gap-1">
                  <ShieldCheck size={10} /> Verified
                </span>
              </div>

              {cards.map((card) => (
                <div 
                  key={card.id}
                  onClick={() => onSelectCard(card.id)}
                  className={`relative group h-52 rounded-[32px] p-6 text-white overflow-hidden shadow-xl transition-all active:scale-95 cursor-pointer ${card.color} ${selectedCardId === card.id ? 'ring-4 ring-[#D62300] ring-offset-4 ring-offset-[#F9F4E8]' : ''}`}
                >
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                      <div className="uppercase font-black text-[10px] tracking-widest opacity-60">{card.brand} Gold</div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteCard(card.id); }}
                        className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Card Number</p>
                      <p className="text-2xl font-black accent-font tracking-[0.2em]">•••• •••• •••• {card.last4}</p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">Holder</p>
                        <p className="text-xs font-black uppercase tracking-tight">{card.holderName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">Expires</p>
                        <p className="text-xs font-black uppercase tracking-tight">{card.expiry}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Selected Badge */}
                  {selectedCardId === card.id && (
                    <div className="absolute top-6 right-6 bg-white text-[#3E2723] w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle2 size={20} fill="currentColor" className="text-green-500" />
                    </div>
                  )}

                  {/* Glassmorphic Overlays */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16 blur-2xl"></div>
                </div>
              ))}

              {/* Add New Card Trigger */}
              <button 
                onClick={() => setIsAdding(true)}
                className="w-full h-24 bg-white rounded-[32px] border-2 border-dashed border-gray-200 flex items-center justify-center gap-3 text-[#3E2723] hover:border-[#D62300]/20 hover:bg-[#D62300]/5 transition-all group active:scale-95"
              >
                <div className="w-10 h-10 bg-[#F9F4E8] rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                  <Plus size={20} strokeWidth={3} className="text-[#D62300]" />
                </div>
                <span className="text-sm font-black uppercase tracking-tight">Добавить карту</span>
              </button>
            </section>

            {/* Other Payment Methods */}
            <section className="space-y-4">
              <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.2em] px-1">Другие способы</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-50 flex items-center justify-between group active:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#3E2723]">Apple Pay / Google Pay</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-0.5">Быстрая оплата в одно касание</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-200" />
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Add Card Form Section */
          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="space-y-4">
               <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.2em] px-1">Новая карта</h3>
               {/* Animated Card Preview */}
               <div className="h-52 rounded-[32px] p-6 text-white overflow-hidden shadow-2xl bg-gradient-to-br from-[#3E2723] to-[#1A0F0D] relative">
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="flex justify-between items-start">
                      <div className="uppercase font-black text-[10px] tracking-widest opacity-60">
                        {newCard.brand.toUpperCase()} DIGITAL
                      </div>
                      <div className="w-12 h-8 bg-white/10 rounded-md backdrop-blur-md"></div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Card Number</p>
                      <p className="text-2xl font-black accent-font tracking-[0.2em]">
                        {newCard.number ? formatCardNumber(newCard.number) : '•••• •••• •••• ••••'}
                      </p>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex-1">
                        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">Holder</p>
                        <p className="text-xs font-black uppercase tracking-tight truncate pr-4">
                          {newCard.holder || 'CARD HOLDER'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">Expires</p>
                        <p className="text-xs font-black uppercase tracking-tight">
                          {newCard.expiry || 'MM/YY'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
               </div>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Номер карты</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="0000 0000 0000 0000"
                    value={formatCardNumber(newCard.number)}
                    onChange={(e) => setNewCard({...newCard, number: e.target.value.replace(/\s/g, '')})}
                    className="w-full h-18 px-6 bg-white rounded-[24px] border-2 border-transparent focus:border-[#D62300]/20 shadow-sm text-sm font-bold text-[#3E2723] outline-none transition-all"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 opacity-20" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 opacity-20" alt="Mastercard" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Срок</label>
                  <input 
                    type="text" 
                    placeholder="ММ/ГГ"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard({...newCard, expiry: formatExpiry(e.target.value)})}
                    className="w-full h-18 px-6 bg-white rounded-[24px] border-2 border-transparent focus:border-[#D62300]/20 shadow-sm text-sm font-bold text-[#3E2723] outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">CVV</label>
                  <input 
                    type="password" 
                    maxLength={3}
                    placeholder="•••"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                    className="w-full h-18 px-6 bg-white rounded-[24px] border-2 border-transparent focus:border-[#D62300]/20 shadow-sm text-sm font-bold text-[#3E2723] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Имя держателя</label>
                <input 
                  type="text" 
                  placeholder="IVAN IVANOV"
                  value={newCard.holder}
                  onChange={(e) => setNewCard({...newCard, holder: e.target.value})}
                  className="w-full h-18 px-6 bg-white rounded-[24px] border-2 border-transparent focus:border-[#D62300]/20 shadow-sm text-sm font-bold text-[#3E2723] outline-none transition-all uppercase"
                />
              </div>

              <div className="bg-orange-50/50 p-4 rounded-[24px] flex gap-3 items-start border border-orange-100">
                <Lock size={16} className="text-[#F58025] shrink-0 mt-0.5" />
                <p className="text-[10px] font-bold text-[#F58025] leading-relaxed uppercase tracking-tighter">
                  Ваши данные защищены по стандарту PCI DSS. Мы не храним полный номер карты и CVV на наших серверах.
                </p>
              </div>
            </form>
          </section>
        )}
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pb-10 bg-gradient-to-t from-[#F9F4E8] via-[#F9F4E8] to-transparent z-[170]">
        {!isAdding ? (
          <button 
            onClick={onClose}
            className="w-full h-20 bg-[#3E2723] text-white rounded-[32px] font-black text-lg shadow-xl active:scale-95 transition-all uppercase tracking-tight"
          >
            Готово
          </button>
        ) : (
          <div className="flex gap-3">
            <button 
              onClick={() => setIsAdding(false)}
              className="flex-1 h-20 bg-white text-[#3E2723] rounded-[32px] font-black text-sm border-2 border-gray-100 active:scale-95 transition-all uppercase tracking-tight"
            >
              Отмена
            </button>
            <button 
              onClick={handleAddSubmit}
              disabled={newCard.number.length < 13}
              className="flex-[2] h-20 bg-[#D62300] text-white rounded-[32px] font-black text-lg shadow-xl shadow-red-200 active:scale-95 transition-all uppercase tracking-tight disabled:opacity-50"
            >
              Сохранить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsView;
