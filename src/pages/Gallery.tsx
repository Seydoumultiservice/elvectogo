
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import SectionTitle from '../components/common/SectionTitle';
import AnimatedSection from '../components/animations/AnimatedSection';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("visible", true)
        .order("order_index", { ascending: true });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error("Error loading gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  
  const categories = [
    { id: 'all', name: 'Tous' },
    ...Array.from(new Set(galleryItems.map(item => item.category))).map(cat => ({
      id: cat,
      name: cat?.charAt(0).toUpperCase() + cat?.slice(1) || 'Autre'
    }))
  ];
  
  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-gradient-to-r from-elvec-900 to-elvec-800 text-white py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Notre Galerie</h1>
              <p className="text-xl text-gray-300">Découvrez nos projets, réalisations et équipements</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <SectionTitle title="Galerie De Nos Réalisations" subtitle="Photos et vidéos de nos projets" centered />
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <button 
                  key={category.id} 
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-elvec-600 text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-elvec-50 shadow-md'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <AnimatedSection key={item.id} delay={index * 50}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                  {item.type === 'image' ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : item.type === 'video' ? (
                    <video
                      src={item.image_url}
                      className="w-full h-64 object-cover"
                      controls
                    />
                  ) : item.type === 'youtube' ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${extractYouTubeId(item.image_url)}`}
                      className="w-full h-64"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : item.type === 'facebook' ? (
                    <iframe
                      src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.image_url)}`}
                      className="w-full h-64"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />
                  ) : null}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    {item.description && (
                      <p className="text-white/80 text-sm mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucun média trouvé pour cette catégorie
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
