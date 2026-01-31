

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
  { name: 'CABA', slug: 'caba' },
  { name: 'La Plata', slug: 'la-plata' },
  { name: 'Mar del Plata', slug: 'mar-del-plata' },
  { name: 'Rosario', slug: 'rosario' },
  { name: 'Córdoba Capital', slug: 'cordoba-capital' },
  { name: 'Mendoza Capital', slug: 'mendoza-capital' },
  { name: 'Bahía Blanca', slug: 'bahia-blanca' },
  { name: 'Tandil', slug: 'tandil' },
];

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
    buttonLink: '/cerrajeros',
  },
  {
    id: 2,
    title: 'Seguridad para tu Hogar',
    description: 'Instalación de cerraduras de alta seguridad y puertas blindadas.',
    imageUrl: 'https://i.pinimg.com/1200x/ce/30/e6/ce30e6fa6063da846fedd81b4d6d5567.jpg',
    imageHint: 'security lock',
    buttonText: 'Ver Especialistas',
    buttonLink: '/cerrajeros',
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
