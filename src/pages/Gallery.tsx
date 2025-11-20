
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
                <button key={category.id} onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id ? 'bg-elvec-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-elvec-50 shadow-md'
                  }`}>
                  {category.name}
                </button>
              ))}
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <AnimatedSection key={item.id} delay={index * 100}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg bg-white">
                  {item.type === 'image' ? (
                    <div className="overflow-hidden">
                      <img src={item.image} alt={item.title} className="object-cover w-full h-64 transform transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  ) : item.type === 'youtube' ? (
                    <div className="relative" aria-hidden={false}>
                      {loadedYouTube[item.id] ? (
                        <div className="relative pb-[56.25%] h-0">
                          {getYouTubeEmbedUrl((item as any).youtubeUrl) ? (
                            <iframe
                              className="absolute top-0 left-0 w-full h-full"
                              src={getYouTubeEmbedUrl((item as any).youtubeUrl) || undefined}
                              title={item.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-700">Lien YouTube invalide</div>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setLoadedYouTube(prev => ({ ...prev, [item.id]: true }))}
                          className="w-full h-64 p-0 block relative overflow-hidden focus:outline-none"
                          aria-label={`Lire ${item.title}`}
                        >
                          <img src={(item as any).thumbnail || (item as any).image} alt={item.title} className="w-full h-64 object-cover" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-elvec-600 ml-0">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </button>
                      )}
                      <div className="absolute top-2 right-2 bg-elvec-600 text-white text-xs px-2 py-1 rounded-full">YouTube</div>
                    </div>
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-elvec-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
