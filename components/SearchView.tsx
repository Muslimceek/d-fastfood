
import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Search, 
  Mic, 
  History, 
  TrendingUp, 
  ChevronRight, 
  Flame, 
  Clock,
  ArrowRight,
  Plus
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, RESTAURANTS } from '../constants';
// Add Language import
import { Product, Language } from '../types';

interface SearchViewProps {
  onClose: () => void;
  onSelectProduct: (id: string) => void;
  onAddToCart: (id: string) => void;
  onSelectCategory: (id: string) => void;
  // Add language to props
  language: Language;
}

const SearchView: React.FC<SearchViewProps> = ({ onClose, onSelectProduct, onAddToCart, onSelectCategory, language }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState(['Воппер', 'Пицца', 'Кола без сахара', 'Наггетсы']);

  const results = useMemo(() => {
    if (!query.trim()) return { products: [], categories: [], restaurants: [] };
    const q = query.toLowerCase();
    return {
      // Fix: Search within localized names
      products: PRODUCTS.filter(p => p.name[language].toLowerCase().includes(q)),
      categories: CATEGORIES.filter(c => c.name[language].toLowerCase().includes(q) && c.id !== 'all'),
      restaurants: RESTAURANTS.filter(r => r.name.toLowerCase().includes(q))
    };
  }, [query, language]);

  const trending = ['Стейк Хаус', 'Латте Макиато', 'Цезарь Ролл', 'Картофель Фри'];

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
      {/* Search Bar Header */}
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 border-b border-gray-50 bg-white/80 backdrop-blur-2xl">
        <div className="relative flex-1 group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D62300]">
            <Search size={20} strokeWidth={3} />
          </div>
          <input 
            autoFocus
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Что вы хотите съесть?"
            className="w-full h-16 pl-14 pr-14 bg-[#F9F4E8] rounded-[24px] text-sm font-black text-[#3E2723] outline-none focus:ring-2 focus:ring-[#D62300]/10 transition-all placeholder:text-gray-300 uppercase tracking-tight"
          />
          <button 
            onClick={() => setIsListening(!isListening)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isListening ? 'bg-[#D62300] text-white animate-pulse shadow-lg shadow-red-200' : 'bg-white text-gray-400'
            }`}
          >
            <Mic size={20} fill={isListening ? 'currentColor' : 'none'} />
          </button>
        </div>
        <button 
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center text-[#3E2723] font-black uppercase text-[10px] tracking-widest active:scale-90 transition-all"
        >
          <X size={24} strokeWidth={3} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {!query ? (
          /* Suggestions & History View */
          <div className="p-6 space-y-10">
            {/* History Section */}
            {history.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Clock size={14} /> История
                  </h3>
                  <button onClick={() => setHistory([])} className="text-[10px] font-bold text-[#D62300] uppercase underline">Очистить</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {history.map((item, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setQuery(item)}
                      className="px-5 py-3 bg-[#F9F4E8] rounded-2xl text-[11px] font-black text-[#3E2723] uppercase tracking-wider hover:bg-white border border-transparent hover:border-[#D62300]/10 transition-all active:scale-95"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Trending Bento */}
            <section>
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <TrendingUp size={14} className="text-[#F58025]" /> Сейчас ищут
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {trending.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setQuery(item)}
                    className="p-5 bg-white border border-gray-100 rounded-[32px] flex items-center justify-between group active:scale-[0.98] transition-all"
                  >
                    <span className="text-xs font-black text-[#3E2723] uppercase tracking-tight">{item}</span>
                    <ArrowRight size={14} className="text-gray-200 group-hover:text-[#D62300] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </section>

            {/* Visual Quick Categories */}
            <section>
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Популярные категории</h3>
              <div className="grid grid-cols-4 gap-3">
                {CATEGORIES.slice(1, 5).map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => { onSelectCategory(cat.id); onClose(); }}
                    className="flex flex-col items-center gap-3 p-4 bg-white border border-gray-50 rounded-[28px] shadow-sm active:scale-90 transition-all"
                  >
                    <span className="text-3xl">{cat.icon}</span>
                    <span className="text-[9px] font-black text-[#3E2723] uppercase tracking-tighter">{cat.name[language]}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* Live Results View */
          <div className="p-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Category Results */}
            {results.categories.length > 0 && (
              <section>
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-4">Категории</h3>
                <div className="flex overflow-x-auto no-scrollbar gap-3">
                  {results.categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => { onSelectCategory(cat.id); onClose(); }}
                      className="px-6 py-4 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 shrink-0"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      {/* Fix: Access localized category name */}
                      <span className="text-[11px] font-black text-[#3E2723] uppercase tracking-widest">{cat.name[language]}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Product Results */}
            {results.products.length > 0 ? (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Продукты</h3>
                  <span className="text-[9px] font-black text-[#F58025] uppercase bg-orange-50 px-2 py-1 rounded-md">{results.products.length} найдено</span>
                </div>
                <div className="space-y-4">
                  {results.products.map(product => (
                    <div 
                      key={product.id}
                      onClick={() => onSelectProduct(product.id)}
                      className="bg-white p-4 rounded-[32px] border border-gray-50 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-[#F9F4E8] overflow-hidden shrink-0">
                        <img src={product.image} alt={product.name[language]} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        {/* Fix: Access localized product name */}
                        <h4 className="text-xs font-black text-[#3E2723] uppercase truncate mb-1">{product.name[language]}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] font-black text-[#D62300] italic accent-font">₽{product.price}</span>
                          <span className="text-[8px] font-bold text-gray-300 uppercase tracking-tighter">🔥 {product.calories} ккал</span>
                        </div>
                        {/* Fix: Access localized product description */}
                        <p className="text-[9px] text-gray-400 line-clamp-1 italic">{product.description[language]}</p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onAddToCart(product.id); }}
                        className="w-10 h-10 bg-[#3E2723] text-white rounded-xl flex items-center justify-center active:scale-90 transition-all shadow-lg"
                      >
                        <Plus size={18} strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              /* No results state within typed state */
              <div className="py-20 text-center">
                 <div className="w-20 h-20 bg-[#F9F4E8] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={32} className="text-gray-200" />
                 </div>
                 <h3 className="text-xl font-black text-[#3E2723] accent-font uppercase mb-2">Ничего не нашли</h3>
                 <p className="text-sm text-gray-400 font-medium">Попробуйте изменить запрос</p>
              </div>
            )}

            {/* Restaurant Results */}
            {results.restaurants.length > 0 && (
              <section>
                <h3 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-4">Рестораны</h3>
                <div className="space-y-3">
                  {results.restaurants.map(rest => (
                    <div key={rest.id} className="bg-white p-4 rounded-[28px] border border-gray-50 flex items-center gap-4">
                       <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden">
                         <img src={rest.image} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1">
                          <p className="text-xs font-black text-[#3E2723] uppercase">{rest.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{rest.address}</p>
                       </div>
                       <ChevronRight size={18} className="text-gray-200" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Mic Active Voice Waveform Visualization (Simulation) */}
      {isListening && (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-md z-[250] flex flex-col items-center justify-center p-10 animate-in fade-in duration-300">
           <div className="flex items-center gap-1 h-20 mb-10">
              {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                <div 
                  key={i}
                  className="w-1 bg-[#D62300] rounded-full animate-bounce"
                  style={{ height: `${h * 15}%`, animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
           </div>
           <p className="text-xl font-black text-[#3E2723] accent-font uppercase tracking-tight text-center">Слушаю вас...</p>
           <p className="text-xs font-bold text-gray-400 mt-4 uppercase tracking-[0.2em]">Скажите "Бургер с беконом"</p>
           <button 
             onClick={() => setIsListening(false)}
             className="mt-20 w-16 h-16 bg-[#3E2723] text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-transform"
           >
              <X size={24} strokeWidth={3} />
           </button>
        </div>
      )}
    </div>
  );
};

export default SearchView;
