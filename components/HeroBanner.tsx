
import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <section className="px-5 my-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F58025] to-[#D62300] h-48 shadow-xl">
        <div className="absolute inset-0 flex items-center justify-between p-6">
          <div className="z-10 w-1/2">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-wider mb-2">
              Акция недели
            </span>
            <h3 className="accent-font text-2xl text-white leading-tight mb-3">
              Семейный комбо за <span className="text-yellow-300">₽1999</span>
            </h3>
            <button className="bg-white text-[#D62300] px-5 py-2 rounded-xl text-xs font-bold hover:bg-opacity-90 transition-all active:scale-95 shadow-lg">
              Заказать сейчас
            </button>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] w-64 h-64 opacity-90 rotate-12">
            <img 
              src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=400&q=80" 
              alt="Combo Deal" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-10px] right-20 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default HeroBanner;
