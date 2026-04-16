
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
  { name: 'Azul', slug: 'azul', imageUrl: 'https://i.postimg.cc/fTyZrRbD/1612azul-1473923.jpg' },
  { name: 'Bahía Blanca', slug: 'bahia-blanca', imageUrl: 'https://i.postimg.cc/1tPHMNGs/1610115832666.jpg' },
  { name: 'La Plata', slug: 'la-plata', imageUrl: 'https://i.postimg.cc/zDsZ0S4n/8fe77514-cd3d-49e4-9470-9f42246d41c1.jpg' },
  { name: 'Mar del Plata', slug: 'mar-del-plata', imageUrl: 'https://i.postimg.cc/28tw42JC/5-scaled-(1).webp' },
  { name: 'Necochea', slug: 'necochea', imageUrl: 'https://i.postimg.cc/x1SkDmNb/17-03-FOTO-Playa.jpg' },
  { name: 'Olavarría', slug: 'olavarria', imageUrl: 'https://i.postimg.cc/05Tdtcx0/images-(3).jpg' },
  { name: 'Tandil', slug: 'tandil', imageUrl: 'https://i.postimg.cc/RVwRHd5J/a5f70bd2-a00c-4c37-8e1a-64bae1549844-(1).webp' },
  { name: 'Trenque Lauquen', slug: 'trenque-lauquen', imageUrl: 'https://i.postimg.cc/rwQ4LJ6b/470169435-1005805784924112-3831525022329596815-n.jpg' },
  { name: 'Tres Arroyos', slug: 'tres-arroyos', imageUrl: 'https://i.postimg.cc/85KJrjzx/img-20191120-wa0004-largejpg.jpg' },
  { name: 'Almirante Brown', slug: 'almirante-brown', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Avellaneda', slug: 'avellaneda', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Berazategui', slug: 'berazategui', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Escobar', slug: 'escobar', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Esteban Echeverría', slug: 'esteban-echeverria', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Ezeiza', slug: 'ezeiza', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Florencio Varela', slug: 'florencio-varela', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'General Rodríguez', slug: 'general-rodriguez', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Hurlingham', slug: 'hurlingham', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Ituzaingó', slug: 'ituzaingo', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'La Matanza', slug: 'la-matanza', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Lanús', slug: 'lanus', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Lomas de Zamora', slug: 'lomas-de-zamora', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Malvinas Argentinas', slug: 'malvinas-argentinas', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Marcos Paz', slug: 'marcos-paz', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Merlo', slug: 'merlo', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Moreno', slug: 'moreno', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Morón', slug: 'moron', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Pilar', slug: 'pilar', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Presidente Perón', slug: 'presidente-peron', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Quilmes', slug: 'quilmes', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'San Fernando', slug: 'san-fernando', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'San Isidro', slug: 'san-isidro', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'San Martín', slug: 'san-martin', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'San Miguel', slug: 'san-miguel', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Tigre', slug: 'tigre', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Tres de Febrero', slug: 'tres-de-febrero', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
  { name: 'Vicente López', slug: 'vicente-lopez', imageUrl: 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png' },
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
    imageUrl: 'https://i.postimg.cc/BvhYVHQm/Cerrajero-Instalando-Cerradura.png',
    imageHint: 'locksmith tools',
    buttonText: 'Buscar Cerrajeros',
    buttonLink: '/servicios',
  },
  {
    id: 2,
    title: 'Cerrajería Automotor',
    description: '¿No podés abrir el auto? Copias de llaves de autos y rodados.',
    imageUrl: 'https://i.postimg.cc/c13hQVYz/Cerrajero-Auto-Variante-1.png',
    imageHint: 'car key locksmith',
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
