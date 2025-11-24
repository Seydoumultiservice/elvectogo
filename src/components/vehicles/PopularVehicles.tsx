import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import VehicleCard from './VehicleCard';
import Button from '../common/Button';
import AnimatedSection from '../animations/AnimatedSection';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Vehicle {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price_per_day: number | null;
  image_url: string | null;
  features: string[];
}

const PopularVehicles = () => {
  const queryClient = useQueryClient();

  const { data: vehicles = [], isLoading } = useQuery({
    queryKey: ['popular-vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('available', true)
        .limit(6)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Vehicle[];
    }
  });

  // Écouter les changements en temps réel
  useEffect(() => {
    const channel = supabase
      .channel('vehicles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vehicles'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['popular-vehicles'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const mappedVehicles = vehicles.map((vehicle) => ({
    id: vehicle.id,
    name: vehicle.name,
    category: vehicle.category === 'voiture' ? 'professional' : 
              vehicle.category === 'suv' || vehicle.category === '4x4' ? 'personal' : 'special',
    description: vehicle.description || 'Véhicule disponible pour la location',
    pricePerDay: vehicle.price_per_day || 40000,
    image: vehicle.image_url || 'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?q=80&w=2070&auto=format&fit=crop',
    year: 2023,
    capacity: vehicle.features && vehicle.features.length > 0 ? 
              vehicle.features.find((f: string) => f.includes('place')) || '5 personnes' : '5 personnes',
    consumption: '7L/100km',
  }));

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">Chargement des véhicules...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionTitle 
            title="Nos Véhicules Populaires" 
            subtitle="Découvrez notre sélection de véhicules les plus demandés à Lomé"
            centered
          />
        </AnimatedSection>

        {mappedVehicles.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            Aucun véhicule disponible pour le moment
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {mappedVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/vehicules">
            <Button variant="primary" className="inline-flex items-center">
              Voir tous nos véhicules
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularVehicles;
