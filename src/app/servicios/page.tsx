
'use client';

import { Suspense } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LOCALIDADES_ARGENTINA } from '@/lib/data';
import Link from 'next/link';
import { Search, Loader2, MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// NOTA: Para completar la transformación, deberías renombrar la carpeta /servicios a /cerrajeros.
// He adaptado el código, pero el cambio de nombre de la carpeta debe hacerse manualmente.

function SearchableLocalidades() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(search);

  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

  const filteredLocalidades = LOCALIDADES_ARGENTINA.filter((localidad) =>
    localidad.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="¿En qué localidad buscás? Ej: CABA, La Plata..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredLocalidades.map((localidad) => (
          <Link
            key={localidad.slug}
            href={`/servicios/${localidad.slug}`}
            className="cursor-pointer group"
          >
            <Card className="hover:shadow-lg transition-all">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="bg-primary/10 p-3 rounded-full group-hover:bg-accent/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary group-hover:text-accent-foreground" />
                </div>
                <CardTitle className="font-headline text-base">
                  {localidad.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      {filteredLocalidades.length === 0 && (
        <div className="text-center col-span-full py-16">
          <p className="text-lg font-medium text-muted-foreground">
            No se encontraron localidades que coincidan con tu búsqueda.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Intenta con otro término o explora la lista completa.
          </p>
        </div>
      )}
    </>
  );
}


function SearchSkeleton() {
    return (
        <>
            <div className="max-w-xl mx-auto mb-10">
                <div className="relative">
                    <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
                    <Input
                        type="search"
                        placeholder="Cargando localidades..."
                        className="w-full pl-10"
                        disabled
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <div className="bg-muted p-3 rounded-full h-12 w-12" />
                            <div className='h-4 bg-muted rounded w-2/3' />
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">
          Encuentra Cerrajeros por Localidad
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          Explora la lista completa de localidades y encuentra al profesional que necesitas.
        </p>
      </div>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchableLocalidades />
      </Suspense>
    </div>
  );
}
