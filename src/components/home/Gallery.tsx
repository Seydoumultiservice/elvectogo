import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import AnimatedSection from '../animations/AnimatedSection';
import { supabase } from '@/integrations/supabase/client';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
        .order("order_index", { ascending: true })
        .limit(6);

      if (error) throw error;
      
      const formattedItems = (data || []).map((item) => ({
        type: item.type,
        src: item.image_url,
        title: item.title,
      }));
      
      setGalleryItems(formattedItems);
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleThumbnails = () => {
    const thumbnailCount = 6;
    const startIndex = Math.max(0, Math.min(currentIndex - 2, galleryItems.length - thumbnailCount));
    return galleryItems.slice(startIndex, startIndex + thumbnailCount);
  };

  if (loading || galleryItems.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionTitle 
            title="Galerie de nos Réalisations" 
            subtitle="Découvrez nos projets et notre équipement en action"
            centered
          />
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="max-w-5xl mx-auto">
            {/* Main Display */}
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl mb-6">
              {galleryItems[currentIndex].type === 'image' ? (
                <img
                  src={galleryItems[currentIndex].src}
                  alt={galleryItems[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              ) : galleryItems[currentIndex].type === 'video' ? (
                <video
                  controls
                  className="w-full h-full object-cover"
                >
                  <source src={galleryItems[currentIndex].src} type="video/mp4" />
                </video>
              ) : galleryItems[currentIndex].type === 'youtube' ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(galleryItems[currentIndex].src)}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : galleryItems[currentIndex].type === 'facebook' ? (
                <iframe
                  src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(galleryItems[currentIndex].src)}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : null}

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-6 w-6 text-gray-900" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-6 w-6 text-gray-900" />
              </button>

              {/* Counter */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentIndex + 1} / {galleryItems.length}
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold">{galleryItems[currentIndex].title}</h3>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 justify-center overflow-hidden">
              {getVisibleThumbnails().map((item, index) => {
                const actualIndex = galleryItems.indexOf(item);
                return (
                  <button
                    key={actualIndex}
                    onClick={() => goToSlide(actualIndex)}
                    className={`relative w-24 h-16 rounded-md overflow-hidden transition-all duration-300 ${
                      actualIndex === currentIndex
                        ? 'ring-4 ring-elvec-500 scale-110'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <Play className="h-6 w-6 text-white" fill="white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-12 text-center">
          <Link to="/galerie">
            <Button variant="primary">
              Voir toute la galerie
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
