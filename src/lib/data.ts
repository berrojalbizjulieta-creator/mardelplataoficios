
import {
  KeyRound,
  Wrench
} from 'lucide-react';
import type { Category, Professional, Banner, CategorySpecialties, Schedule } from '@/lib/types';
import { placeholderImages } from './placeholder-images';
import { subMonths } from 'date-fns';
import { CERRAJERIA_KEYWORDS } from './keywords/cerrajeria';


const getImage = (id: string) =>
  placeholderImages.find((img) => img.id === id) || {
    imageUrl: '',
    imageHint: '',
    description: '',
  };

export const defaultSchedule: Schedule[] = [
    { day: 'Dom', open: '00:00', close: '00:00', enabled: false },
    { day: 'Lun', open: '09:00', close: '18:00', enabled: true },
    { day: 'Mar', open: '09:00', close: '18:00', enabled: true },
    { day: 'Mie', open: '09:00', close: '18:00', enabled: true },
    { day: 'Jue', open: '09:00', close: '18:00', enabled: true },
    { day: 'Vie', open: '09:00', close: '18:00', enabled: true },
    { day: 'Sab', open: '09:00', close: '13:00', enabled: false },
];

export const LOCALIDADES_ARGENTINA = [
  { name: '25 de Mayo', slug: '25-de-mayo', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: '9 de Julio', slug: '9-de-julio', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Adolfo González Chaves', slug: 'adolfo-gonzalez-chaves', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Arrecifes', slug: 'arrecifes', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Ayacucho', slug: 'ayacucho', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Azul', slug: 'azul', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'Bahía Blanca', slug: 'bahia-blanca', imageUrl: 'https://i.postimg.cc/1tPHMNGs/1610115832666.jpg' },
  { name: 'Balcarce', slug: 'balcarce', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Benito Juárez', slug: 'benito-juarez', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Bolívar', slug: 'bolivar', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Bragado', slug: 'bragado', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Brandsen', slug: 'brandsen', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'CABA', slug: 'caba', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Campana', slug: 'campana', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'Capilla del Señor', slug: 'capilla-del-senor', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Capitán Sarmiento', slug: 'capitan-sarmiento', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Carhué', slug: 'carhue', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Carlos Casares', slug: 'carlos-casares', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Carmen de Patagones', slug: 'carmen-de-patagones', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Castelli', slug: 'castelli', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'Chacabuco', slug: 'chacabuco', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Chascomús', slug: 'chascomus', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Chivilcoy', slug: 'chivilcoy', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Claromecó', slug: 'claromeco', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Colón', slug: 'colon', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Coronel Dorrego', slug: 'coronel-dorrego', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'Coronel Pringles', slug: 'coronel-pringles', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Coronel Suárez', slug: 'coronel-suarez', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Córdoba Capital', slug: 'cordoba-capital', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Daireaux', slug: 'daireaux', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Dolores', slug: 'dolores', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'General Alvear', slug: 'general-alvear', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'General Belgrano', slug: 'general-belgrano', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'General Lavalle', slug: 'general-lavalle', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'General Madariaga', slug: 'general-madariaga', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'General Villegas', slug: 'general-villegas', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Guaminí', slug: 'guamini', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Henderson', slug: 'henderson', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Junín', slug: 'junin', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'La Plata', slug: 'la-plata', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Laprida', slug: 'laprida', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Las Flores', slug: 'las-flores', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Las Toninas', slug: 'las-toninas', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Lincoln', slug: 'lincoln', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Lobería', slug: 'loberia', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Lobos', slug: 'lobos', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'Los Toldos', slug: 'los-toldos', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Magdalena', slug: 'magdalena', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Maipú', slug: 'maipu', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Mar de Ajó', slug: 'mar-de-ajo', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Mar del Plata', slug: 'mar-del-plata', imageUrl: 'https://i.postimg.cc/wjSjYqPF/82a2fc89-c29b-4645-89b6-31a6990324a8.png' },
  { name: 'Médanos', slug: 'medanos', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Mendoza Capital', slug: 'mendoza-capital', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Mercedes', slug: 'mercedes', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'Miramar', slug: 'miramar', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Monte Hermoso', slug: 'monte-hermoso', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Navarro', slug: 'navarro', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Necochea', slug: 'necochea', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Olavarría', slug: 'olavarria', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Orense', slug: 'orense', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'Pehuajó', slug: 'pehuajo', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Pehuen Có', slug: 'pehuen-co', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Pellegrini', slug: 'pellegrini', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Pergamino', slug: 'pergamino', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Pila', slug: 'pila', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Pinamar', slug: 'pinamar', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'Puan', slug: 'puan', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Punta Alta', slug: 'punta-alta', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Rauch', slug: 'rauch', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Reta', slug: 'reta', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Rojas', slug: 'rojas', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Roque Pérez', slug: 'roque-perez', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'Rosario', slug: 'rosario', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Salliqueló', slug: 'salliquelo', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Salto', slug: 'salto', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'San Andrés de Giles', slug: 'san-andres-de-giles', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'San Antonio de Areco', slug: 'san-antonio-de-areco', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'San Bernardo', slug: 'san-bernardo', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'San Clemente del Tuyú', slug: 'san-clemente-del-tuyu', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'San Nicolás de los Arroyos', slug: 'san-nicolas-de-los-arroyos', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'San Pedro', slug: 'san-pedro', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Santa Teresita', slug: 'santa-teresita', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Suipacha', slug: 'suipacha', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Tandil', slug: 'tandil', imageUrl: 'https://i.postimg.cc/RVwRHd5J/a5f70bd2-a00c-4c37-8e1a-64bae1549844-(1).webp' },
  { name: 'Tapalqué', slug: 'tapalque', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Tornquist', slug: 'tornquist', imageUrl: 'https://images.unsplash.com/photo-1629815042231-15024765360a?q=80&w=1932&auto=format&fit=crop' },
  { name: 'Trenque Lauquen', slug: 'trenque-lauquen', imageUrl: 'https://images.unsplash.com/photo-1596701552309-84d728514167?q=80&w=1935&auto=format&fit=crop' },
  { name: 'Tres Arroyos', slug: 'tres-arroyos', imageUrl: 'https://images.unsplash.com/photo-1581624633499-c3b69ec402a7?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Vedia', slug: 'vedia', imageUrl: 'https://images.unsplash.com/photo-1582236143924-c15c889006a8?q=80&w=1974&auto=format&fit=crop' },
  { name: 'Villa Gesell', slug: 'villa-gesell', imageUrl: 'https://images.unsplash.com/photo-1599321345480-161d8f168122?q=80&w=2070&auto=format&fit=crop' },
  { name: 'Zárate', slug: 'zarate', imageUrl: 'https://images.unsplash.com/photo-1589984622039-0158a085c7d8?q=80&w=1974&auto=format&fit=crop' },
].sort((a, b) => a.name.localeCompare(b.name));

export const CATEGORIES: Category[] = [
    { id: 64, name: 'Cerrajería', icon: KeyRound, description: 'Apertura de puertas, cerraduras, llaves.', imageUrl: getImage('cat-cerrajeria').imageUrl, imageHint: getImage('cat-cerrajeria').imageHint },
];


// Este objeto contiene las listas cortas de especialidades para que el profesional elija en su perfil.
export const CATEGORY_SPECIALTIES: CategorySpecialties = {
  64: { 
    name: 'Cerrajería', 
    specialties: ['Urgencias 24hs', 'Apertura de Puertas', 'Cerrajería del Automotor', 'Cambio de Combinación', 'Cajas Fuertes', 'Puertas Blindadas', 'Copias de Llaves', 'Cerraduras Electrónicas'] 
  },
};


// Este objeto contiene las listas enormes de palabras clave para que la IA entienda el lenguaje natural.
export const CATEGORY_KEYWORDS: { [key: number]: { name: string; keywords: string[] } } = {
  64: { name: 'Cerrajería', keywords: CERRAJERIA_KEYWORDS },
};

// Diccionario simple para mapear sinónimos comunes a la categoría oficial
export const CATEGORY_SYNONYMS = {
    'cerrajero': 'Cerrajería',
    'abrir puerta': 'Cerrajería',
    'llave': 'Cerrajería',
    'cerradura': 'Cerrajería'
}

export const PROFESSIONALS: Professional[] = [
  {
    id: '1',
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@oficios.com',
    phone: '2914123456',
    photoUrl: getImage('prof-1').imageUrl,
    photoHint: getImage('prof-1').imageHint,
    specialties: ['Apertura de Puertas', 'Urgencias 24hs', 'Cerrajería del Automotor'],
    avgRating: 4.8,
    totalReviews: 25,
    categoryIds: [64],
    localidad: 'caba',
    priceInfo: 'Consultar precios. Trabajos con garantía.',
    isSubscriptionActive: true,
    subscriptionTier: 'standard',
    registrationDate: subMonths(new Date(), 2),
    lastPaymentDate: subMonths(new Date(), 2),
    isActive: true,
    isVerified: false,
    schedule: defaultSchedule,
    dayAvailability: { "Dom": false, "Lun": true, "Mar": true, "Mie": true, "Jue": true, "Vie": true, "Sab": false },
    testimonials: [
      {
        id: 12,
        clientName: 'Fernando',
        clientPhotoUrl: '',
        clientPhotoHint: '',
        rating: 5,
        text: 'Me abrió la puerta en 10 minutos sin romper nada. Y encima re buena onda.',
      },
    ],
    workPhotos: [
      getImage('work-3'),
    ],
  },
];

export const BANNERS: Banner[] = [
  {
    id: 1,
    title: '¿Necesitás un cerrajero urgente?',
    description: 'Encontrá profesionales disponibles 24/7 en tu zona.',
    imageUrl: 'https://i.pinimg.com/1200x/e2/41/5e/e2415e5d7e8e6e804e007d4147a9a04b.jpg',
    imageHint: 'locksmith tools',
    buttonText: 'Buscar Cerrajeros',
    buttonLink: '/servicios',
  },
  {
    id: 2,
    title: 'Seguridad para tu Hogar',
    description: 'Instalación de cerraduras de alta seguridad y puertas blindadas.',
    imageUrl: 'https://i.pinimg.com/1200x/ce/30/e6/ce30e6fa6063da846fedd81b4d6d5567.jpg',
    imageHint: 'security lock',
    buttonText: 'Ver Especialistas',
    buttonLink: '/servicios',
  },
];

export const AD_BANNERS = [
  {
    id: 'ad1',
    imageUrl: 'https://picsum.photos/seed/ad1/1200/400',
    alt: 'Publicidad de herramientas',
    imageHint: 'locksmith tools',
  },
  {
    id: 'ad2',
    imageUrl: 'https://picsum.photos/seed/ad2/1200/400',
    alt: 'Publicidad de cerraduras',
    imageHint: 'door locks',
  },
];
