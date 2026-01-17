
import { Product, Category, Promotion, Restaurant } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: { ru: 'Все', en: 'All', uz: 'Barchasi' }, icon: '🍽️' },
  { id: 'burgers', name: { ru: 'Бургеры', en: 'Burgers', uz: 'Burgerlar' }, icon: '🍔' },
  { id: 'pizza', name: { ru: 'Пицца', en: 'Pizza', uz: 'Pitsa' }, icon: '🍕' },
  { id: 'sushi', name: { ru: 'Суши', en: 'Sushi', uz: 'Sushilar' }, icon: '🍣' },
  { id: 'desserts', name: { ru: 'Десерты', en: 'Desserts', uz: 'Desertlar' }, icon: '🍰' },
  { id: 'drinks', name: { ru: 'Напитки', en: 'Drinks', uz: 'Ichimliklar' }, icon: '🥤' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: { ru: 'Биг Роял Бургер', en: 'Big Royal Burger', uz: 'Big Royal Burger' },
    price: 549,
    calories: 850,
    proteins: 45,
    fats: 52,
    carbs: 60,
    description: { 
      ru: 'Наш флагманский бургер с двумя сочными котлетами из 100% говядины на гриле.', 
      en: 'Our flagship burger with two juicy 100% grilled beef patties.',
      uz: '100% grilda pishirilgan mol goʻshtidan tayyorlangan ikki boʻlak suvli kotletli asosiy burgerimiz.'
    },
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    category: 'burgers'
  },
  {
    id: '2',
    name: { ru: 'Пицца Маргарита', en: 'Pizza Margherita', uz: 'Margarita Pitsasi' },
    price: 690,
    calories: 1200,
    proteins: 38,
    fats: 45,
    carbs: 160,
    description: { 
      ru: 'Классическая итальянская пицца на тонком тесте с ароматным томатным соусом.', 
      en: 'Classic Italian pizza on thin crust with aromatic tomato sauce.',
      uz: 'Xushboʻy pomidor qaylasi bilan ingichka xamirdagi klassik italyan pitsasi.'
    },
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80',
    category: 'pizza'
  },
  {
    id: '3',
    name: { ru: 'Сет Филадельфия', en: 'Philadelphia Set', uz: 'Filadelfiya seti' },
    price: 1250,
    calories: 950,
    proteins: 28,
    fats: 32,
    carbs: 120,
    description: { 
      ru: 'Набор из 8 роллов с нежным лососем, сливочным сыром и огурцом.', 
      en: 'A set of 8 rolls with fresh salmon, cream cheese, and cucumber.',
      uz: 'Yangi losos, qaymoqli pishloq va bodringli 8 dona rollar toʻplami.'
    },
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80',
    category: 'sushi'
  },
  {
    id: '4',
    name: { ru: 'Чизкейк Нью-Йорк', en: 'Cheesecake New York', uz: 'Nyu-York chizkeyki' },
    price: 350,
    calories: 450,
    proteins: 10,
    fats: 28,
    carbs: 42,
    description: { 
      ru: 'Классический сливочный чизкейк на песочной основе.', 
      en: 'Classic creamy cheesecake on a shortcrust base.',
      uz: 'Qisir-qisir asosdagi klassik qaymoqli chizkeyk.'
    },
    image: 'https://images.unsplash.com/photo-1524351199679-46c9f5597151?auto=format&fit=crop&w=400&q=80',
    category: 'desserts'
  }
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'p1',
    title: { ru: 'Скидка на первый заказ', en: 'First Order Discount', uz: 'Birinchi buyurtma uchun chegirma' },
    description: { ru: 'Получите 20% скидку на ваш самый первый заказ.', en: 'Get 20% off your very first order.', uz: 'Birinchi buyurtmangiz uchun 20% chegirmaga ega boʻling.' },
    code: 'START20',
    discountTag: '-20%',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    expiryDate: { ru: 'До конца месяца', en: 'Until end of month', uz: 'Oy oxirigacha' },
    color: 'red'
  },
  {
    id: 'p2',
    title: { ru: '2+1 на Бургеры', en: '2+1 on Burgers', uz: '2+1 Burgerlarga' },
    description: { ru: 'Купи два любых бургера и получи третий в подарок.', en: 'Buy any two burgers and get the third one free.', uz: 'Ikkita xohlagan burgerni sotib oling va uchinchisini bepul oling.' },
    discountTag: 'FREE',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80',
    expiryDate: { ru: 'Только в выходные', en: 'Weekends only', uz: 'Faqat dam olish kunlari' },
    color: 'orange'
  }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'FoodFlow Сити',
    address: 'Пресненская наб., 12, Москва',
    hours: '08:00 – 23:00',
    status: 'open',
    distance: '0.4 км',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    phone: '+7 (495) 000-00-01'
  },
  {
    id: 'r2',
    name: 'FoodFlow Арбат',
    address: 'ул. Арбат, 1, Москва',
    hours: '10:00 – 22:00',
    status: 'open',
    distance: '2.1 км',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
    phone: '+7 (495) 000-00-02'
  }
];
