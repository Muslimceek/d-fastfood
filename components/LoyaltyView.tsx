
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Crown, 
  Gift, 
  History, 
  Info, 
  ChevronRight, 
  Zap, 
  Star, 
  TrendingUp, 
  Trophy,
  QrCode,
  Flame,
  Coffee,
  Ticket
} from 'lucide-react';

interface LoyaltyViewProps {
  points: number;
  userName: string;
  onClose: () => void;
}

const LoyaltyView: React.FC<LoyaltyViewProps> = ({ points, userName, onClose }) => {
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const duration = 1500;
    const start = 0;
    const end = points;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    let current = start;
    const timer = setInterval(() => {
      current += Math.ceil(end / 60);
      if (current >= end) {
        setAnimatedPoints(end);
        clearInterval(timer);
      } else {
        setAnimatedPoints(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [points]);

  const rewards = [
    { id: 'r1', name: 'Кофе за баллы', cost: 150, icon: <Coffee size={24} />, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=200&q=80', color: 'bg-brown-500' },
    { id: 'r2', name: 'Пирожок с вишней', cost: 300, icon: <Flame size={24} />, image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=200&q=80', color: 'bg-red-500' },
    { id: 'r3', name: 'Биг Роял Даром', cost: 800, icon: <Trophy size={24} />, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80', color: 'bg-orange-500' },
  ];

  const history = [
    { id: 'h1', title: 'Заказ №3942', date: 'Вчера, 18:20', points: '+124', type: 'earn' },
    { id: 'h2', title: 'Списание на Кофе', date: '20 мая, 12:05', points: '-150', type: 'spend' },
    { id: 'h3', title: 'Заказ №3811', date: '18 мая, 14:10', points: '+86', type: 'earn' },
  ];

  return (
    <div className="fixed inset-0 z-[180] bg-[#F9F4E8] flex flex-col overflow-hidden animate-in slide-in-from-right duration-500 select-none">
      {/* Dynamic Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white/80 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose} 
            className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-sm text-[#3E2723] active:scale-90 transition-all"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
          <h2 className="text-lg font-black text-[#3E2723] accent-font uppercase tracking-tight">FoodFlow Coins</h2>
        </div>
        <button 
          onClick={() => setShowQR(true)}
          className="w-11 h-11 bg-[#3E2723] text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
        >
          <QrCode size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-10 pb-32">
        
        {/* The 2026 Virtual Tier Card */}
        <section className="relative perspective-1000">
           <div className="relative h-64 w-full bg-[#3E2723] rounded-[45px] p-8 text-white shadow-2xl overflow-hidden group">
              {/* Card Holographic Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <div>
                       <div className="flex items-center gap-2 mb-1">
                          <Crown size={16} className="text-[#F58025]" />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Silver Tier Member</span>
                       </div>
                       <h3 className="text-xl font-black accent-font uppercase tracking-tight">{userName}</h3>
                    </div>
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                       <Gift size={28} className="text-[#F58025]" />
                    </div>
                 </div>

                 <div>
                    <div className="flex items-baseline gap-2 mb-2">
                       <span className="text-6xl font-black accent-font italic leading-none">{animatedPoints}</span>
                       <span className="text-2xl font-black text-[#F58025] accent-font uppercase">Coins</span>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                          <span>Progress to Gold</span>
                          <span>75%</span>
                       </div>
                       <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                          <div className="h-full bg-gradient-to-r from-[#F58025] to-[#D62300] rounded-full w-[75%] shadow-[0_0_15px_rgba(245,128,37,0.5)]"></div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#F58025]/20 rounded-full blur-[80px]"></div>
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-[60px]"></div>
           </div>
        </section>

        {/* Action Grid Bento */}
        <section className="grid grid-cols-2 gap-4">
           <div className="bg-white p-6 rounded-[35px] shadow-sm border border-white flex flex-col gap-3 group active:scale-95 transition-all text-left">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[#F58025]">
                 <TrendingUp size={24} />
              </div>
              <div>
                 <p className="text-sm font-black text-[#3E2723] uppercase leading-tight">Как копить</p>
                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">Правила системы</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[35px] shadow-sm border border-white flex flex-col gap-3 group active:scale-95 transition-all text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                 <Zap size={24} />
              </div>
              <div>
                 <p className="text-sm font-black text-[#3E2723] uppercase leading-tight">Множитель</p>
                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">X1.5 в выходные</p>
              </div>
           </div>
        </section>

        {/* Rewards Market */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.2em]">Обмен баллов</h3>
              <span className="text-[9px] font-black text-[#D62300] uppercase tracking-widest bg-red-50 px-2 py-1 rounded-full">Маркет лояльности</span>
           </div>
           
           <div className="flex overflow-x-auto no-scrollbar gap-4 pb-2">
              {rewards.map((reward) => (
                <div key={reward.id} className="min-w-[160px] bg-white rounded-[40px] p-4 shadow-sm border border-white relative overflow-hidden group active:scale-95 transition-transform">
                   <div className="aspect-square rounded-[28px] overflow-hidden mb-4 shadow-inner bg-[#F9F4E8]">
                      <img src={reward.image} alt={reward.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-[11px] font-black text-[#3E2723] uppercase leading-tight line-clamp-2 min-h-[2rem] tracking-tight">{reward.name}</h4>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-1">
                            <Star size={12} className="text-[#F58025]" fill="currentColor" />
                            <span className="text-sm font-black text-[#D62300] accent-font">{reward.cost}</span>
                         </div>
                         <button 
                           disabled={points < reward.cost}
                           className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                             points >= reward.cost ? 'bg-[#3E2723] text-white shadow-lg' : 'bg-gray-100 text-gray-300'
                           }`}
                         >
                            <Ticket size={18} />
                         </button>
                      </div>
                   </div>
                   {points < reward.cost && (
                      <div className="absolute top-2 right-2">
                         <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                      </div>
                   )}
                </div>
              ))}
           </div>
        </section>

        {/* Points History */}
        <section className="space-y-4">
           <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.2em] px-1">История транзакций</h3>
           <div className="bg-white rounded-[40px] p-4 space-y-1 shadow-sm border border-white">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-3xl hover:bg-[#F9F4E8]/50 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.type === 'earn' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                         {item.type === 'earn' ? <History size={20} /> : <Gift size={20} />}
                      </div>
                      <div>
                         <p className="text-sm font-black text-[#3E2723] uppercase tracking-tight">{item.title}</p>
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{item.date}</p>
                      </div>
                   </div>
                   <span className={`text-base font-black accent-font italic ${item.type === 'earn' ? 'text-green-500' : 'text-red-500'}`}>
                      {item.points}
                   </span>
                </div>
              ))}
           </div>
        </section>

        {/* Tier Benefits */}
        <section className="bg-[#3E2723] rounded-[45px] p-10 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 text-center space-y-6">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                 <Trophy size={40} className="text-[#F58025]" />
              </div>
              <div>
                 <h4 className="text-2xl font-black accent-font uppercase tracking-tight mb-2">Привилегии Silver</h4>
                 <p className="text-xs text-white/50 font-medium leading-relaxed max-w-[200px] mx-auto">
                    Бесплатная доставка каждого 5-го заказа и секретные предложения каждую пятницу.
                 </p>
              </div>
              <button className="w-full bg-white text-[#3E2723] py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl active:scale-95 transition-all">
                 Все уровни статуса
              </button>
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#F58025]/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        </section>
      </div>

      {/* QR Code Modal (BK Style) */}
      {showQR && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-xl flex items-center justify-center p-10 animate-in fade-in duration-300">
           <div className="w-full max-w-xs bg-white rounded-[50px] p-10 flex flex-col items-center animate-in zoom-in duration-500">
              <h3 className="text-xl font-black text-[#3E2723] accent-font uppercase mb-6 text-center">Ваш код</h3>
              <div className="w-full aspect-square bg-[#F9F4E8] rounded-[40px] p-6 flex items-center justify-center shadow-inner relative overflow-hidden">
                 <QrCode size={180} strokeWidth={1} className="text-[#3E2723]" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-[#D62300] rounded-full"></div>
                 </div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-8 text-center leading-relaxed">
                 Покажите этот код<br/>на кассе ресторана
              </p>
              <button 
                onClick={() => setShowQR(false)}
                className="mt-10 w-16 h-16 bg-[#3E2723] text-white rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-transform"
              >
                 <ArrowLeft size={24} strokeWidth={3} className="rotate-270" />
              </button>
           </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="absolute bottom-6 left-0 right-0 pointer-events-none opacity-10">
         <p className="text-[10px] font-black text-[#3E2723] text-center uppercase tracking-[0.6em]">loyalty network 2026</p>
      </div>
    </div>
  );
};

export default LoyaltyView;
