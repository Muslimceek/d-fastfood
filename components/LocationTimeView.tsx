
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Home, 
  Briefcase, 
  Clock, 
  Navigation, 
  ChevronRight,
  Zap,
  Calendar,
  CheckCircle2,
  Crosshair
} from 'lucide-react';
import { DeliveryType } from '../types';

interface LocationTimeViewProps {
  currentLocation: string;
  deliveryType: DeliveryType;
  deliveryTime: string;
  onClose: () => void;
  onSave: (location: string, type: DeliveryType, time: string) => void;
}

const LocationTimeView: React.FC<LocationTimeViewProps> = ({ 
  currentLocation, 
  deliveryType: initialType, 
  deliveryTime: initialTime,
  onClose, 
  onSave 
}) => {
  const [type, setType] = useState<DeliveryType>(initialType);
  const [searchValue, setSearchValue] = useState(currentLocation);
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const [timeMode, setTimeMode] = useState<'asap' | 'schedule'>(initialTime === 'ASAP' ? 'asap' : 'schedule');

  const savedAddresses = [
    { id: '1', label: 'Дом', address: 'Пресненская наб., 12, кв 45', icon: Home, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: '2', label: 'Работа', address: 'ул. Арбат, 1, офис 402', icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  const timeSlots = ['15:30 - 15:45', '15:45 - 16:00', '16:00 - 16:15', '16:15 - 16:30', '16:30 - 16:45'];

  return (
    <div className="fixed inset-0 z-[150] bg-[#F9F4E8] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-700">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[40%] bg-[#D62300]/5 blur-[120px] rounded-full -z-10"></div>
      
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white/80 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose} 
            className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-sm text-[#3E2723] active:scale-90 transition-all"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
          <h2 className="text-lg font-black text-[#3E2723] accent-font uppercase tracking-tight">Локация и время</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-8 pb-32">
        
        {/* Type Switcher */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-[28px] flex items-center border border-white">
            <button 
              onClick={() => setType('delivery')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                type === 'delivery' ? 'bg-[#D62300] text-white shadow-xl shadow-red-200' : 'text-gray-400'
              }`}
            >
              <Zap size={14} fill={type === 'delivery' ? 'currentColor' : 'none'} />
              Доставка
            </button>
            <button 
              onClick={() => setType('pickup')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                type === 'pickup' ? 'bg-[#3E2723] text-white shadow-xl shadow-gray-200' : 'text-gray-400'
              }`}
            >
              <Navigation size={14} />
              Самовывоз
            </button>
          </div>
        </section>

        {/* Search & Map Section */}
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D62300]">
              <Search size={20} strokeWidth={3} />
            </div>
            <input 
              type="text" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={type === 'delivery' ? "Куда доставить?" : "Найти ресторан..."}
              className="w-full h-18 pl-14 pr-14 bg-white rounded-[28px] border-2 border-transparent focus:border-[#D62300]/10 shadow-sm focus:shadow-xl focus:bg-white text-sm font-bold text-[#3E2723] transition-all outline-none"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#F9F4E8] rounded-xl flex items-center justify-center text-[#3E2723] active:scale-90 transition-all">
              <Crosshair size={18} />
            </button>
          </div>

          {/* Mini Map Preview */}
          <div className="h-44 bg-gray-200 rounded-[32px] overflow-hidden relative border-4 border-white shadow-lg group">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80" 
              className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 transition-transform duration-1000"
              alt="Map View"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-10 h-10 bg-[#D62300] rounded-full flex items-center justify-center shadow-2xl animate-bounce border-2 border-white">
                  <MapPin size={20} className="text-white" fill="currentColor" />
               </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between shadow-sm">
               <span className="text-[10px] font-black text-[#3E2723] uppercase truncate mr-2">{searchValue}</span>
               <button className="text-[9px] font-black text-[#D62300] uppercase underline shrink-0">Уточнить на карте</button>
            </div>
          </div>
        </section>

        {/* Saved Addresses Bento */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.2em] mb-4 px-1">Ваши адреса</h3>
          <div className="grid grid-cols-2 gap-3">
            {savedAddresses.map((addr) => (
              <button 
                key={addr.id}
                onClick={() => setSearchValue(addr.address)}
                className={`p-5 rounded-[32px] border-2 transition-all text-left flex flex-col gap-3 group active:scale-95 ${
                  searchValue === addr.address ? 'bg-white border-[#D62300] shadow-xl shadow-red-100' : 'bg-white/50 border-transparent hover:bg-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner transition-colors ${addr.bg} ${addr.color}`}>
                  <addr.icon size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-[#3E2723]">{addr.label}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase truncate tracking-tighter">{addr.address}</p>
                </div>
                {searchValue === addr.address && (
                  <div className="absolute top-4 right-4 text-[#D62300]">
                    <CheckCircle2 size={16} fill="currentColor" className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Time Selection Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
          <h3 className="text-[11px] font-black text-[#3E2723]/40 uppercase tracking-[0.2em] mb-4 px-1">Время доставки</h3>
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-50 overflow-hidden divide-y divide-gray-50">
            {/* ASAP Option */}
            <button 
              onClick={() => { setTimeMode('asap'); setSelectedTime('ASAP'); }}
              className={`w-full p-6 flex items-center justify-between transition-colors ${timeMode === 'asap' ? 'bg-[#F9F4E8]/30' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${timeMode === 'asap' ? 'bg-[#D62300] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <Zap size={24} fill={timeMode === 'asap' ? 'currentColor' : 'none'} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-[#3E2723]">Как можно быстрее</p>
                  <p className="text-[10px] font-bold text-[#F58025] uppercase tracking-tighter">Примерно 25-35 минут</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${timeMode === 'asap' ? 'border-[#D62300] bg-[#D62300]' : 'border-gray-200'}`}>
                {timeMode === 'asap' && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
            </button>

            {/* Schedule Option */}
            <div className={`p-6 space-y-5 transition-all ${timeMode === 'schedule' ? 'bg-white' : 'bg-gray-50/50 opacity-60'}`}>
              <button 
                onClick={() => setTimeMode('schedule')}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${timeMode === 'schedule' ? 'bg-[#3E2723] text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Calendar size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-[#3E2723]">Запланировать заказ</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Выберите удобное время</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${timeMode === 'schedule' ? 'border-[#3E2723] bg-[#3E2723]' : 'border-gray-200'}`}>
                  {timeMode === 'schedule' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </button>

              {timeMode === 'schedule' && (
                <div className="flex overflow-x-auto no-scrollbar gap-2 py-2 animate-in fade-in zoom-in-95 duration-500">
                  {timeSlots.map((slot) => (
                    <button 
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                        selectedTime === slot ? 'bg-[#D62300] text-white shadow-lg' : 'bg-[#F9F4E8] text-[#3E2723] hover:bg-gray-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pb-10 bg-gradient-to-t from-[#F9F4E8] via-[#F9F4E8] to-transparent z-[160]">
        <button 
          onClick={() => onSave(searchValue, type, selectedTime)}
          className="w-full h-20 bg-[#D62300] text-white rounded-[32px] font-black text-lg shadow-[0_20px_40px_-10px_rgba(214,35,0,0.4)] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-tight group"
        >
          Подтвердить выбор
          <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default LocationTimeView;
