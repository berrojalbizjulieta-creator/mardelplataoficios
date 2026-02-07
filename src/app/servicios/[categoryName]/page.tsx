

'use client';

import { useParams } from 'next/navigation';
import { CATEGORIES, LOCALIDADES_ARGENTINA } from '@/lib/data';
import ProfessionalCard from '@/components/professionals/professional-card';
import { Button } from '@/components/ui/button';
import { ListFilter, Loader2, Sparkles, KeyRound } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMemo, useState, useEffect } from 'react';
import type { Professional, Schedule } from '@/lib/types';
import { getAllActiveProfessionals } from '@/lib/firestore-queries';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

// NOTA: Para completar la transformación, deberías renombrar esta carpeta de [categoryName] a [localidad].
// He adaptado el código para que funcione con el parámetro 'localidad', pero el cambio de nombre debe hacerse manualmente.

const PAGE_SIZE = 12;

type SortType = 'clicks' | 'rating' | 'verified' | 'availability';

const isAvailableNow = (schedule?: Schedule[]): boolean => {
  if (!schedule) return false;

  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)
  const dayMapping = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  const currentDayStr = dayMapping[dayOfWeek];

  const todaySchedule = schedule.find((s) => s.day === currentDayStr);
  if (!todaySchedule || !todaySchedule.enabled) {
    return false;
  }

  const [openHour, openMinute] = todaySchedule.open.split(':').map(Number);
  const [closeHour, closeMinute] = todaySchedule.close.split(':').map(Number);

  const openTime = new Date(now);
  openTime.setHours(openHour, openMinute, 0, 0);

  const closeTime = new Date(now);
  closeTime.setHours(closeHour, closeMinute, 0, 0);

  return now >= openTime && now <= closeTime;
};

export default function CategoryPage() {
  const params = useParams();
  
  // El parámetro de la URL ahora es 'localidad', no 'categoryName'
  const localidadSlug = params.categoryName as string;
  
  const [allProfessionals, setAllProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortType>('clicks');
  const { toast } = useToast();

  const localidad = useMemo(
    () => LOCALIDADES_ARGENTINA.find((l) => l.slug === localidadSlug),
    [localidadSlug]
  );
  
  const localidadName = localidad?.name || localidadSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const heroImage = (localidad as any)?.imageUrl || 'https://i.postimg.cc/XJTjx2f9/f22914a0-7694-4231-8b13-9ae697dc1b9e.png';

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      try {
        const allActiveProfessionals = await getAllActiveProfessionals(db);
        setAllProfessionals(allActiveProfessionals);
      } catch (error) {
        console.error('Error fetching professionals:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los profesionales.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [toast]);

  const professionalsInLocalidad = useMemo(() => {
    if (!localidad) return [];
    return allProfessionals.filter(p => p.localidad === localidad.slug);
  }, [allProfessionals, localidad]);

  const featuredProfessionals = useMemo(() => {
      return professionalsInLocalidad.filter(p => p.isFeatured);
  }, [professionalsInLocalidad]);

  const regularProfessionals = useMemo(() => {
      return professionalsInLocalidad.filter(p => !p.isFeatured);
  }, [professionalsInLocalidad]);
  

  const sortedRegularProfessionals = useMemo(() => {
    let sorted = [...regularProfessionals];
    switch (sortBy) {
      case 'rating':
        sorted.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
        break;
      case 'verified':
        sorted.sort((a, b) => {
            if (a.isVerified && !b.isVerified) return -1;
            if (!a.isVerified && b.isVerified) return 1;
            return (b.avgRating || 0) - (a.avgRating || 0);
        });
        break;
      case 'availability':
        sorted.sort((a, b) => {
          const aIsAvailable = isAvailableNow(a.schedule);
          const bIsAvailable = isAvailableNow(b.schedule);
          if (aIsAvailable && !bIsAvailable) return -1;
          if (!aIsAvailable && bIsAvailable) return 1;
          return (b.avgRating || 0) - (a.avgRating || 0);
        });
        break;
      case 'clicks':
      default:
        // Ordena por whatsappClicks de menor a mayor
        sorted.sort((a, b) => (a.whatsappClicks || 0) - (b.whatsappClicks || 0));
        break;
    }
    return sorted;
  }, [regularProfessionals, sortBy]);

  const totalPages = Math.ceil(sortedRegularProfessionals.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentRegularProfessionals = sortedRegularProfessionals.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };
  
  const handleSortChange = (sortValue: SortType) => {
    setSortBy(sortValue);
    setCurrentPage(1);
  }

  if (!localidad && !loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Localidad no encontrada</h1>
        <p className="text-muted-foreground mt-2">
          No pudimos encontrar la localidad que estás buscando.
        </p>
      </div>
    );
  }

  return (
    <>
      <section 
        className="relative w-full h-80 flex items-center justify-center text-white bg-top bg-cover"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
            Cerrajeros en {localidadName}
          </h1>
          <p className="mb-6 text-lg md:text-xl max-w-2xl mx-auto">
            Encontrá profesionales de confianza en tu zona.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:px-6">
         <div className="flex flex-col sm:flex-row justify-end items-center mb-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <ListFilter className="mr-2" />
                  Ordenar por
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => handleSortChange('clicks')}>Popularidad</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleSortChange('rating')}>Mejor Rankeados</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleSortChange('verified')}>Solo Verificados</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleSortChange('availability')}>Disponibles Ahora</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
         </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
          </div>
        ) : (
          <>
            {featuredProfessionals.length > 0 && (
              <section className="mb-12">
                <h2 className="text-xl font-bold font-headline mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary"/>
                  Cerrajeros Recomendados
                </h2>
                {featuredProfessionals.length > 1 ? (
                  <Carousel 
                      opts={{ align: "start", loop: true }}
                      plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
                      className="w-full pt-4 -mt-4" // Padding top to make space for badge
                    >
                      <CarouselContent>
                          {featuredProfessionals.map((prof) => (
                              <CarouselItem key={prof.id}>
                                  <ProfessionalCard professional={prof} isFeatured={true} />
                              </CarouselItem>
                          ))}
                      </CarouselContent>
                  </Carousel>
                ) : (
                  <ProfessionalCard professional={featuredProfessionals[0]} isFeatured={true} />
                )}
              </section>
            )}

            {currentRegularProfessionals.length > 0 ? (
              <div className="space-y-6">
                {currentRegularProfessionals.map((professional) => (
                  <ProfessionalCard
                    key={professional.id as string}
                    professional={professional}
                  />
                ))}
              </div>
            ) : (
              (professionalsInLocalidad.length === 0) && (
                  <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-lg text-center p-4">
                      <p className="text-lg font-medium text-muted-foreground">
                          {`Aún no hay cerrajeros en "${localidadName}".`}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                          ¡Sé el primero en registrarte en esta localidad!
                      </p>
                  </div>
              )
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                >
                  Anterior
                </Button>
                <span className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                >
                  Siguiente
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
