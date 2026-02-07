
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Star, MapPin } from 'lucide-react';
import { Separator } from '../ui/separator';

interface SearchResult {
  id: number;
  nombre: string;
  rubro: string;
  photoUrl: string;
  avgRating: number;
}

interface LocalitySuggestion {
  name: string;
  slug: string;
}

export default function SearchForm() {
  const [searchValue, setSearchValue] = useState('');
  const [professionals, setProfessionals] = useState<SearchResult[]>([]);
  const [localities, setLocalities] = useState<LocalitySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const fetchData = async (query: string) => {
    setIsLoading(true);

    try {
      // Fetch both professionals and suggestions in parallel
      const [profRes, locRes] = await Promise.all([
        fetch(`/api/search?q=${encodeURIComponent(query)}`),
        fetch(`/api/localidades?q=${encodeURIComponent(query)}`)
      ]);

      if (!profRes.ok || !locRes.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const professionalsData: SearchResult[] = await profRes.json();
      const localityData: { suggestions: LocalitySuggestion[] } = await locRes.json();
      
      setProfessionals(professionalsData);
      setLocalities(localityData.suggestions || []);

      setIsDropdownOpen(true);
    } catch (e: any) {
      console.error('Error fetching data:', e);
      setProfessionals([]);
      setLocalities([]);
      setIsDropdownOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) { // Lowered threshold for better experience
      setProfessionals([]);
      setLocalities([]);
      setIsDropdownOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
        fetchData(value);
    }, 300);
  };
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue) return;
    setIsDropdownOpen(false);
    
    // Instead of navigating to a generic search page,
    // let's check if the search term matches a locality first.
    const directMatch = localities.find(loc => loc.name.toLowerCase() === searchValue.toLowerCase());
    if (directMatch) {
      router.push(`/servicios/${directMatch.slug}`);
    } else {
      // Fallback to a general search if needed, or just let the user pick from dropdown.
      // For now, let's just keep the dropdown open.
      fetchData(searchValue);
    }
  };

  const handleSuggestionClick = (locality: LocalitySuggestion) => {
    setSearchValue(locality.name);
    setIsDropdownOpen(false);
    router.push(`/servicios/${locality.slug}`);
  }

  return (
    <div ref={containerRef} className="relative max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex justify-center gap-2">
          <Input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            placeholder="Bahía Blanca, Necochea, Tandil..."
            className="flex-1 text-black"
            autoComplete="off"
            onFocus={() => {
              if (searchValue.length > 1) setIsDropdownOpen(true);
            }}
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90"
          >
            Buscar
          </Button>
        </form>

        <AnimatePresence>
            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 w-full border bg-background text-foreground rounded-md shadow-lg max-h-80 md:max-h-[22rem] overflow-y-auto z-20 text-left"
              >
                {isLoading && <li className="px-4 py-3 text-muted-foreground">Buscando...</li>}
                
                {!isLoading && localities.length > 0 && (
                   <>
                    <li className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase">Localidades</li>
                    {localities.slice(0, 3).map((locality) => (
                      <li 
                        key={locality.slug} 
                        className="px-4 py-2 cursor-pointer hover:bg-muted font-medium flex items-center gap-2"
                        onClick={() => handleSuggestionClick(locality)}
                      >
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{locality.name}</span>
                      </li>
                    ))}
                    {(professionals.length > 0) && <Separator />}
                  </>
                )}

                {!isLoading && professionals.length > 0 && (
                  <>
                  <li className="px-4 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase">Profesionales</li>
                  {professionals.slice(0, 4).map((r) => (
                    <li key={r.id}>
                        <Link href={`/profesional/${r.id}`} className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-muted" onClick={() => setIsDropdownOpen(false)}>
                            <Avatar>
                                <AvatarImage src={r.photoUrl} alt={r.nombre} />
                                <AvatarFallback>{r.nombre.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{r.nombre}</p>
                                <p className="text-sm text-muted-foreground">{r.rubro}</p>
                            </div>
                             <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400"/>
                                <span>{r.avgRating.toFixed(1)}</span>
                            </div>
                        </Link>
                    </li>
                  ))}
                 </>
                )}

                {!isLoading && professionals.length === 0 && localities.length === 0 && searchValue.length > 1 && (
                    <li className="px-4 py-3 text-muted-foreground">No se encontraron resultados para "{searchValue}".</li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
    </div>
  );
}
