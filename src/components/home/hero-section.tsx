'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';

const SearchForm = dynamic(() => import('./search-form'), {
  ssr: false,
  loading: () => (
     <div className="flex justify-center gap-2 max-w-2xl mx-auto">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-24" />
     </div>
  ),
});

export default function HeroSection() {
  return (
    <section 
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center text-white" 
      style={{ 
        backgroundImage: "url('https://storage.googleapis.com/studiogpt-test-project.appspot.com/7d7a5223-936a-49a3-b14e-d6980a3c267b.png')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center top' 
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 container mx-auto text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">
          Acá está el cerrajero que necesitás hoy
        </h1>
        <p className="mb-6 text-base md:text-lg">
          Buscá por localidad y encontrá al profesional más cercano.
        </p>

        <SearchForm />

      </div>
    </section>
  );
}
