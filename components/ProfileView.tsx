
import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  MapPin, 
  Bell, 
  History, 
  ChevronRight, 
  LogOut,
  ShieldCheck,
  Package,
  Clock
} from 'lucide-react';
import { AppState } from '../types';

interface ProfileViewProps {
  state: AppState;
  onUpdateUser: (data: Partial<AppState['user']>) => void;
  onUpdateNotifications: (data: Partial<AppState['notifications']>) => void;
  onManagePayments: () => void;
  onManageLocations: () => void;
  onClose: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ 
  state, 
  onUpdateUser, 
  onUpdateNotifications,
  onManagePayments,
  onManageLocations,
  onClose 
}) => {
  const [formData, setFormData] = useState(state.user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateField = (field: keyof typeof formData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdateUser({ [field]: value });
  };

  return (
    <div className="fixed inset-0 z-[160] bg-[#F9F4E8] flex flex-col overflow-hidden animate-in slide-in-from-right duration-500 select-none">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[30%] bg-[#D62300]/5 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-5%] right-[-10%] w-[50%] h-[25%] bg-[#F58025]/5 blur-[100px] rounded-full -z-10"></div>
      
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white/80 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose} 
            className="w-11 h-11 flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-sm text-[#3E2723] active:scale-90 transition-all"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
          <h2 className="text-lg font-black text-[#3E2723] accent-font uppercase tracking-tight">Профиль</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-8 pb-32">
        
        {/* Modern Avatar Center */}
        <section className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-[45px] overflow-hidden border-4 border-white shadow-2xl relative rotate-3">
              <img 
                src={state.user.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover -rotate-3"
              />
              <button 
                onClick={handleAvatarClick}
                className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                <Camera size={24} className="text-white" />
              </button>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <div className="absolute -bottom-2 -right-2 bg-[#D62300] text-white w-10 h-10 rounded-[15px] flex items-center justify-center shadow-lg border-2 border-white">
              <ShieldCheck size={20} />
            </div>
          </div>
          <div className="text-center mt-5">
            <h3 className="text-2xl font-black text-[#3E2723] accent-font uppercase tracking-tight">{state.user.name}</h3>
            <span className="text-[10px] font-black text-[#F58025] uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100 mt-2 inline-block">
              {state.user.loyaltyPoints} БАЛЛОВ • SILVER
            </span>
          </div>
        </section>

        {/* Info Bento Grid */}
        <section className="space-y-4">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] px-2">Личная информация</h3>
          <div className="bg-white rounded-[40px] shadow-sm border border-white overflow-hidden divide-y divide-gray-50">
            <div className="p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#F58025] shadow-inner">
                <User size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Имя</p>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleUpdateField('name', e.target.value)}
                  className="w-full text-sm font-black text-[#3E2723] bg-transparent outline-none focus:text-[#D62300] transition-colors"
                />
              </div>
            </div>

            <div className="p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 shadow-inner">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Email</p>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleUpdateField('email', e.target.value)}
                  className="w-full text-sm font-black text-[#3E2723] bg-transparent outline-none focus:text-[#D62300] transition-colors"
                />
              </div>
            </div>

            <div className="p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500 shadow-inner">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Телефон</p>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => handleUpdateField('phone', e.target.value)}
                  className="w-full text-sm font-black text-[#3E2723] bg-transparent outline-none focus:text-[#D62300] transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Management Actions */}
        <section className="grid grid-cols-2 gap-3">
          <button 
            onClick={onManagePayments}
            className="bg-white p-6 rounded-[35px] shadow-sm border border-white flex flex-col gap-3 group active:scale-95 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 group-hover:bg-[#3E2723] group-hover:text-white transition-all">
              <CreditCard size={22} />
            </div>
            <div>
              <p className="text-xs font-black text-[#3E2723] uppercase">Карты</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Платежи</p>
            </div>
          </button>

          <button 
            onClick={onManageLocations}
            className="bg-white p-6 rounded-[35px] shadow-sm border border-white flex flex-col gap-3 group active:scale-95 transition-all text-left"
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-[#D62300] group-hover:bg-[#3E2723] group-hover:text-white transition-all">
              <MapPin size={22} />
            </div>
            <div>
              <p className="text-xs font-black text-[#3E2723] uppercase">Адреса</p>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Локации</p>
            </div>
          </button>
        </section>

        {/* Notifications */}
        <section className="space-y-4">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.25em] px-2">Уведомления</h3>
          <div className="bg-white rounded-[40px] p-4 space-y-2 shadow-sm border border-white">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                  <Package size={18} />
                </div>
                <div>
                  <p className="text-sm font-black text-[#3E2723]">Статус заказа</p>
                  <p className="text-[9px] font-bold text-gray-300 uppercase">Live обновления</p>
                </div>
              </div>
              <button 
                onClick={() => onUpdateNotifications({ orderStatus: !state.notifications.orderStatus })}
                className={`w-14 h-8 rounded-full p-1.5 transition-all duration-300 ${state.notifications.orderStatus ? 'bg-[#D62300]' : 'bg-gray-100'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${state.notifications.orderStatus ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-50 text-[#F58025] rounded-xl flex items-center justify-center">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm font-black text-[#3E2723]">Доставка</p>
                  <p className="text-[9px] font-bold text-gray-300 uppercase">Путь курьера</p>
                </div>
              </div>
              <button 
                onClick={() => onUpdateNotifications({ deliveryUpdates: !state.notifications.deliveryUpdates })}
                className={`w-14 h-8 rounded-full p-1.5 transition-all duration-300 ${state.notifications.deliveryUpdates ? 'bg-[#D62300]' : 'bg-gray-100'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${state.notifications.deliveryUpdates ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>
        </section>

        {/* Logout */}
        <div className="pt-4 pb-20">
          <button className="w-full h-20 bg-white border-4 border-[#F9F4E8] rounded-[30px] text-red-400 font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-sm">
            <LogOut size={20} />
            Выйти из аккаунта
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 pointer-events-none opacity-20">
         <p className="text-[10px] font-black text-[#3E2723] text-center uppercase tracking-[0.5em]">FoodFlow Premium 2026</p>
      </div>
    </div>
  );
};

export default ProfileView;
