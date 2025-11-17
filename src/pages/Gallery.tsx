
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import SectionTitle from '../components/common/SectionTitle';
import AnimatedSection from '../components/animations/AnimatedSection';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Preload the main YouTube item so it appears first and starts playing
  const [loadedYouTube, setLoadedYouTube] = useState<Record<number, boolean>>({14: true});
  
  const galleryItems = [
    { id: 14, title: 'Présentation ELVEC (YouTube)', category: 'projets', type: 'youtube', youtubeUrl: 'https://www.youtube.com/watch?v=0OEQYhkBSJg', thumbnail: '/lovable-uploads/projet-excavation-1.jpg' },
    { id: 1, title: 'Excavation de terrain', category: 'excavation', image: '/lovable-uploads/projet-excavation-1.jpg', type: 'image' },
    { id: 2, title: 'Formation conduite', category: 'formation', image: '/lovable-uploads/projet-formation-1.jpg', type: 'image' },
    { id: 3, title: 'Terrassement', category: 'terrassement', image: '/lovable-uploads/projet-terrassement-1.jpg', type: 'image' },
    { id: 4, title: 'Bureau ELVEC', category: 'equipe', image: '/lovable-uploads/equipe-bureau-1.jpg', type: 'image' },
    { id: 5, title: 'Direction', category: 'equipe', image: '/lovable-uploads/equipe-directeur.jpg', type: 'image' },
    { id: 6, title: 'Ligne électrique', category: 'projets', image: '/lovable-uploads/projet-electrique-1.jpg', type: 'image' },
    { id: 7, title: 'Installation 161 KV', category: 'projets', image: '/lovable-uploads/projet-electrique-2.jpg', type: 'image' },
    { id: 8, title: 'Engin Komatsu', category: 'engins', image: '/lovable-uploads/engin-komatsu.jpg', type: 'image' },
    { id: 9, title: 'Chargement', category: 'chargement', image: '/lovable-uploads/cc256fb8-05f3-4982-bdb2-6413414b3db1.png', type: 'image' },
    { id: 10, title: 'Terrassement', category: 'terrassement', image: '/lovable-uploads/d821c0ba-bf70-4f75-8546-dbc64980905b.png', type: 'image' },
    { id: 11, title: 'Transport', category: 'transport', image: '/lovable-uploads/5849e000-e611-4774-9d9e-c823996b8d14.png', type: 'image' },
    { id: 12, title: 'Engins ELVEC', category: 'engins', image: '/lovable-uploads/1bd720bd-9635-455f-8849-f89512705c25.png', type: 'image' }
  ];

  // Helper to convert a YouTube URL to an embed URL (returns null if it can't parse)
  const getYouTubeEmbedUrl = (url: string | undefined) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (match && match[1]) {
      // Add autoplay=1 and mute=1 so browsers allow autoplay; users can unmute in the player.
      return `https://www.youtube.com/embed/${match[1]}?rel=0&autoplay=1&mute=1`;
    }
    return null;
  };
  
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'projets', name: 'Projets' },
    { id: 'engins', name: 'Engins' },
    { id: 'excavation', name: 'Excavation' },
    { id: 'terrassement', name: 'Terrassement' },
    { id: 'transport', name: 'Transport' },
    { id: 'formation', name: 'Formation' },
    { id: 'equipe', name: 'Équipe' }
  ];
  
  const filteredItems = selectedCategory === 'all' ? galleryItems : galleryItems.filter(item => item.category === selectedCategory);
  
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
                  ) : item.type === 'video' ? (
                    <div className="relative">
                      <video src={item.video} poster={item.thumbnail} controls className="w-full h-64 object-cover" preload="metadata">Vidéo non supportée</video>
                      <div className="absolute top-2 right-2 bg-elvec-600 text-white text-xs px-2 py-1 rounded-full">Vidéo</div>
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
