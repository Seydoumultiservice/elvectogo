import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import AnimatedSection from '../animations/AnimatedSection';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryItems = [
    { type: 'image', src: '/lovable-uploads/excavation-chantier.jpg', title: 'Excavation de chantier' },
    { type: 'image', src: '/lovable-uploads/equipe-elvec-2025.jpg', title: 'Équipe ELVEC 2025' },
    { type: 'image', src: '/lovable-uploads/engin-bank-of-africa.jpg', title: 'Projet d\'aménagement de la route du rond-point port' },
    { type: 'image', src: '/lovable-uploads/bulldozer-action.jpg', title: 'Bulldozer en action' },
    { type: 'image', src: '/lovable-uploads/agent-elvec-chantier.jpg', title: 'Agent ELVEC sur chantier' },
    { type: 'image', src: '/lovable-uploads/excavatrice-port-lome.jpg', title: 'Excavatrice Port de Lomé' },
    { type: 'image', src: '/lovable-uploads/projet-excavation-1.jpg', title: 'Projet d\'excavation' },
    { type: 'image', src: '/lovable-uploads/projet-formation-1.jpg', title: 'Formation conduite d\'engins' },
    { type: 'image', src: '/lovable-uploads/projet-terrassement-1.jpg', title: 'Terrassement' },
    { type: 'image', src: '/lovable-uploads/equipe-bureau-1.jpg', title: 'Bureau ELVEC' },
    { type: 'image', src: '/lovable-uploads/equipe-directeur.jpg', title: 'Direction ELVEC' },
    { type: 'image', src: '/lovable-uploads/projet-electrique-1.jpg', title: 'Projet électrique' },
    { type: 'image', src: '/lovable-uploads/projet-electrique-2.jpg', title: 'Ligne haute tension' },
    { type: 'image', src: '/lovable-uploads/engin-komatsu.jpg', title: 'Engin Komatsu' },
    { type: 'video', src: '/lovable-uploads/video-projet-1.mp4', title: 'Vidéo projet' },
  ];

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
              ) : (
                <video
                  controls
                  className="w-full h-full object-cover"
                  poster="/lovable-uploads/excavation-chantier.jpg"
                >
                  <source src={galleryItems[currentIndex].src} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              )}

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
