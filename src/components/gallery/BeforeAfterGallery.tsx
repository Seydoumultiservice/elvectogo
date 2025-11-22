import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';
import SectionTitle from '../common/SectionTitle';
import BeforeAfterSlider from './BeforeAfterSlider';

interface Transformation {
  id: string;
  title: string;
  description: string | null;
  image_before: string;
  image_after: string;
  category: string | null;
}

const BeforeAfterGallery = () => {
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadTransformations();
  }, []);

  const loadTransformations = async () => {
    try {
      const { data, error } = await supabase
        .from('project_transformations')
        .select('*')
        .eq('visible', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setTransformations(data || []);
    } catch (error) {
      console.error('Error loading transformations:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Tous' },
    ...Array.from(new Set(transformations.map(item => item.category).filter(Boolean))).map(cat => ({
      id: cat!,
      name: cat!.charAt(0).toUpperCase() + cat!.slice(1)
    }))
  ];

  const filteredTransformations = selectedCategory === 'all'
    ? transformations
    : transformations.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-elvec-600" />
      </div>
    );
  }

  if (transformations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-elvec-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionTitle 
            title="Avant / Après" 
            subtitle="Découvrez la qualité de nos transformations" 
            centered 
          />

          {/* Filtres de catégorie */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-elvec-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-elvec-50 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Grille de transformations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTransformations.map((transformation, index) => (
              <AnimatedSection key={transformation.id} delay={index * 100}>
                <BeforeAfterSlider
                  imageBefore={transformation.image_before}
                  imageAfter={transformation.image_after}
                  title={transformation.title}
                  description={transformation.description || undefined}
                />
              </AnimatedSection>
            ))}
          </div>

          {filteredTransformations.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Aucune transformation trouvée pour cette catégorie
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
