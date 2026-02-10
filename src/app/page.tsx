// Force Rebuild: Mon Jul 29 2024 16:50:00 GMT+0000 (Coordinated Universal Time)

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// --- Componentes que se cargan inmediatamente ---
import CategoriesGrid from '@/components/home/categories-grid';
import HeroSection from '@/components/home/hero-section';
import AdBanner from '@/components/home/ad-banner';

// --- Componentes que se cargarán dinámicamente (solo en el cliente) ---
const AppPromoSection = dynamic(() => import('@/components/home/app-promo-section'), { 
  ssr: false 
});
const JoinUsSection = dynamic(() => import('@/components/home/join-us-section'), { 
  ssr: false 
});
const TestimonialSection = dynamic(() => import('@/components/home/testimonial-section'), { 
  ssr: false 
});
const PromoSlider = dynamic(() => import('@/components/home/promo-slider'), { 
  ssr: false,
  loading: () => (
    <section className="py-12 md:py-20 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <Skeleton className="h-96 w-full" />
      </div>
    </section>
  ),
});


export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesGrid />
      <AdBanner />
      <PromoSlider />
      <AppPromoSection />
      <JoinUsSection />
      <TestimonialSection />
    </>
  );
}
