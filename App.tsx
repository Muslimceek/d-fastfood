
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import PromoView from './components/PromoView';
import RestaurantsView from './components/RestaurantsView';
import MoreView from './components/MoreView';
import ProductDetail from './components/ProductDetail';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import LocationTimeView from './components/LocationTimeView';
import PaymentMethodsView from './components/PaymentMethodsView';
import ProfileView from './components/ProfileView';
import BottomNav from './components/BottomNav';
import SearchView from './components/SearchView';
import LoyaltyView from './components/LoyaltyView';
import { AppState, DeliveryType, TabType, CartItem, PaymentMethod, Card, Language } from './types';
import { PRODUCTS } from './constants';
import { translations } from './translations';
import { CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    user: {
      name: 'Алекс Романов',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      email: 'alex.r@example.com',
      phone: '+7 (999) 123-45-67',
      loyaltyPoints: 1250,
    },
    notifications: {
      orderStatus: true,
      deliveryUpdates: true,
      promotions: false,
    },
    location: 'Пресненская наб., 12, Москва',
    deliveryType: 'delivery',
    selectedCategory: 'all',
    cart: [],
    activeTab: 'home',
    selectedProductId: null,
    paymentMethod: 'card',
    deliveryTime: 'ASAP',
    savedCards: [
      { id: 'c1', last4: '4242', brand: 'visa', expiry: '09/27', holderName: 'ALEX ROMANOV', color: 'bg-gradient-to-br from-indigo-600 to-purple-800' }
    ],
    selectedCardId: 'c1',
    orders: [
      { id: 'o1', date: 'Сегодня, 14:20', total: 1250, items: ['Биг Роял', 'Кола'], status: 'delivered', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&q=80' },
      { id: 'o2', date: 'Вчера, 12:05', total: 690, items: ['Пицца Маргарита'], status: 'delivered', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=100&q=80' }
    ],
    language: 'ru'
  });

  const [prevTab, setPrevTab] = useState<TabType | null>(null);
  const t = translations[state.language];

  const handleLanguageChange = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
  };

  const filteredProducts = useMemo(() => {
    if (state.selectedCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === state.selectedCategory);
  }, [state.selectedCategory]);

  const selectedProduct = useMemo(() => {
    return PRODUCTS.find(p => p.id === state.selectedProductId) || null;
  }, [state.selectedProductId]);

  const subtotal = useMemo(() => 
    state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  , [state.cart]);

  const deliveryFee = useMemo(() => (subtotal > 1500 || subtotal === 0 ? 0 : 149), [subtotal]);
  const serviceFee = useMemo(() => (subtotal === 0 ? 0 : 29), [subtotal]);
  const cartTotal = useMemo(() => subtotal + deliveryFee + serviceFee, [subtotal, deliveryFee, serviceFee]);

  const handleAddToCart = (id: string, quantity: number = 1) => {
    setState(prev => {
      const existingItemIndex = prev.cart.findIndex(item => item.product.id === id);
      const newCart = [...prev.cart];
      if (existingItemIndex > -1) {
        newCart[existingItemIndex].quantity += quantity;
      } else {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) newCart.push({ product, quantity });
      }
      return { ...prev, cart: newCart, selectedProductId: null };
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setState(prev => {
      const newCart = prev.cart.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      });
      return { ...prev, cart: newCart };
    });
  };

  const handleRemoveItem = (productId: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.product.id !== productId)
    }));
  };

  const handleTabChange = (tab: TabType) => {
    setPrevTab(state.activeTab);
    setState(prev => ({ ...prev, activeTab: tab, selectedProductId: null }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveLocation = (location: string, type: DeliveryType, time: string) => {
    setState(prev => ({
      ...prev,
      location,
      deliveryType: type,
      deliveryTime: time,
      activeTab: prevTab === 'checkout' ? 'checkout' : 'home'
    }));
  };

  const handleCompleteOrder = () => {
    setState(prev => ({ ...prev, activeTab: 'success', cart: [] }));
    setTimeout(() => handleTabChange('home'), 5000);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen pb-4 bg-[#F9F4E8] relative overflow-x-hidden">
      <Header 
        userName={state.user.name.split(' ')[0]}
        avatar={state.user.avatar}
        location={state.location}
        deliveryType={state.deliveryType}
        deliveryTime={state.deliveryTime}
        cartCount={state.cart.reduce((s, i) => s + i.quantity, 0)}
        language={state.language}
        onToggleDelivery={(type) => setState(p => ({ ...p, deliveryType: type }))}
        onOpenCart={() => handleTabChange('cart')}
        onOpenLocation={() => handleTabChange('location')}
        onOpenProfile={() => handleTabChange('profile-edit')}
      />

      <div className="h-4"></div>

      {['home', 'menu'].includes(state.activeTab) && (
        <SearchFilters 
          selectedCategory={state.selectedCategory}
          onSelectCategory={(id) => setState(p => ({ ...p, selectedCategory: id }))}
          onOpenFullSearch={() => handleTabChange('search-full')}
          language={state.language}
        />
      )}

      <main className="min-h-[70vh]">
        {state.activeTab === 'home' && (
          <HomeView 
            language={state.language}
            popularProducts={PRODUCTS} 
            onAddToCart={handleAddToCart} 
            onProductClick={(id) => setState(p => ({ ...p, selectedProductId: id }))}
            onShowMenu={() => handleTabChange('menu')}
          />
        )}

        {state.activeTab === 'menu' && (
          <MenuView 
            language={state.language}
            products={filteredProducts}
            selectedCategoryId={state.selectedCategory}
            onAddToCart={handleAddToCart}
            onProductClick={(id) => setState(p => ({ ...p, selectedProductId: id }))}
          />
        )}

        {state.activeTab === 'promo' && <PromoView language={state.language} />}
        {state.activeTab === 'restaurants' && <RestaurantsView />}
        
        {state.activeTab === 'more' && (
          <MoreView 
            userName={state.user.name} 
            avatar={state.user.avatar} 
            loyaltyPoints={state.user.loyaltyPoints}
            currentLanguage={state.language}
            onEditProfile={() => handleTabChange('profile-edit')} 
            onOpenLoyalty={() => handleTabChange('loyalty')}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {state.activeTab === 'success' && (
          <div className="flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-700 mt-20">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-black text-[#3E2723] uppercase mb-2">Ура! Заказ принят</h2>
            <p className="text-gray-500 text-sm">Скоро он будет у вас</p>
          </div>
        )}
      </main>

      {/* Модальные окна и оверлеи */}
      {state.activeTab === 'search-full' && (
        <SearchView 
          onClose={() => handleTabChange('home')}
          onSelectProduct={(id) => { setState(p => ({ ...p, selectedProductId: id })); handleTabChange('home'); }}
          onAddToCart={handleAddToCart}
          onSelectCategory={(id) => { setState(p => ({ ...p, selectedCategory: id })); handleTabChange('home'); }}
          language={state.language}
        />
      )}

      {state.activeTab === 'cart' && (
        <CartView 
          items={state.cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onAddToCart={handleAddToCart}
          onClose={() => handleTabChange('home')}
          onCheckout={() => handleTabChange('checkout')}
          language={state.language}
        />
      )}

      {state.activeTab === 'checkout' && (
        <CheckoutView 
          items={state.cart}
          total={cartTotal}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          serviceFee={serviceFee}
          paymentMethod={state.paymentMethod}
          location={state.location}
          deliveryType={state.deliveryType}
          deliveryTime={state.deliveryTime}
          savedCards={state.savedCards}
          selectedCardId={state.selectedCardId}
          onSetPaymentMethod={(m) => setState(p => ({ ...p, paymentMethod: m }))}
          onEditLocation={() => handleTabChange('location')}
          onEditPayment={() => handleTabChange('payment-manage')}
          onBack={() => handleTabChange('cart')}
          onComplete={handleCompleteOrder}
        />
      )}

      {state.activeTab === 'location' && (
        <LocationTimeView 
          currentLocation={state.location}
          deliveryType={state.deliveryType}
          deliveryTime={state.deliveryTime}
          onClose={() => handleTabChange(prevTab || 'home')}
          onSave={handleSaveLocation}
        />
      )}

      {state.activeTab === 'payment-manage' && (
        <PaymentMethodsView 
          cards={state.savedCards}
          selectedCardId={state.selectedCardId}
          onSelectCard={(id) => setState(p => ({ ...p, selectedCardId: id, paymentMethod: 'card' }))}
          onAddCard={(c) => setState(p => ({ ...p, savedCards: [...p.savedCards, { ...c, id: Date.now().toString() }] }))}
          onDeleteCard={(id) => setState(p => ({ ...p, savedCards: p.savedCards.filter(c => c.id !== id) }))}
          onClose={() => handleTabChange('checkout')}
        />
      )}

      {state.activeTab === 'profile-edit' && (
        <ProfileView 
          state={state}
          onUpdateUser={(d) => setState(p => ({ ...p, user: { ...p.user, ...d } }))}
          onUpdateNotifications={(d) => setState(p => ({ ...p, notifications: { ...p.notifications, ...d } }))}
          onManagePayments={() => handleTabChange('payment-manage')}
          onManageLocations={() => handleTabChange('location')}
          onClose={() => handleTabChange('more')}
        />
      )}

      {state.activeTab === 'loyalty' && (
        <LoyaltyView 
          points={state.user.loyaltyPoints}
          userName={state.user.name}
          onClose={() => handleTabChange('more')}
        />
      )}

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          onClose={() => setState(p => ({ ...p, selectedProductId: null }))}
          onAddToCart={handleAddToCart}
          language={state.language}
        />
      )}

      <BottomNav 
        activeTab={['success', 'cart', 'checkout', 'location', 'payment-manage', 'profile-edit', 'search-full', 'loyalty'].includes(state.activeTab) ? 'more' : state.activeTab as any}
        cartCount={state.cart.reduce((s, i) => s + i.quantity, 0)}
        language={state.language}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default App;
