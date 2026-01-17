
import React, { useState } from 'react';
import { Copy, Check, Clock, Info } from 'lucide-react';
import { PROMOTIONS } from '../constants';
import { Language } from '../types';

interface PromoViewProps {
  language: Language;
}

const PromoView: React.FC<PromoViewProps> = ({ language }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-500 pb-20">
      <div className="px-5 mt-4 mb-6">
        <h2 className="text-2xl font-black text-[#3E2723] accent-font">Акции и бонусы</h2>
        <p className="text-sm text-gray-500">Самые выгодные предложения для вас</p>
      </div>

      <div className="px-5 space-y-6">
        {PROMOTIONS.map((promo) => (
          <div key={promo.id} className="group relative bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="relative h-44 overflow-hidden">
              <img 
                src={promo.image} 
                alt={promo.title[language]} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-white font-black text-sm shadow-lg
                ${promo.color === 'red' ? 'bg-[#D62300]' : promo.color === 'orange' ? 'bg-[#F58025]' : 'bg-green-500'}`}>
                {promo.discountTag}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-[#3E2723] leading-tight">{promo.title[language]}</h3>
                <div className="flex items-center text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md shrink-0 ml-2">
                  <Clock size={12} className="mr-1" />
                  {promo.expiryDate[language]}
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                {promo.description[language]}
              </p>

              {promo.code ? (
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center justify-between bg-[#F9F4E8] border-2 border-dashed border-gray-200 px-4 py-3 rounded-2xl">
                    <span className="font-mono font-black text-[#3E2723] tracking-wider">{promo.code}</span>
                    <button 
                      onClick={() => handleCopyCode(promo.id, promo.code!)}
                      className="text-[#D62300] hover:bg-white p-1.5 rounded-lg transition-colors"
                    >
                      {copiedId === promo.id ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                  {copiedId === promo.id && (
                    <span className="absolute bottom-6 right-6 bg-black text-white text-[10px] py-1 px-3 rounded-full animate-bounce">
                      Скопировано!
                    </span>
                  )}
                </div>
              ) : (
                <button className="w-full bg-[#D62300] text-white py-4 rounded-2xl font-bold shadow-lg shadow-red-100 active:scale-95 transition-all">
                  Применить акцию
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 mt-10">
        <div className="bg-[#3E2723] rounded-[32px] p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
              <Info size={24} className="text-white" />
            </div>
            <h4 className="text-lg font-bold mb-1">Бонусная программа</h4>
            <p className="text-sm text-white/70 mb-4">Накапливайте баллы с каждого заказа и оплачивайте ими до 50% стоимости.</p>
            <button className="text-xs font-bold border-b border-white/40 pb-0.5 hover:text-white/100 transition-colors">
              Узнать подробнее
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default PromoView;
