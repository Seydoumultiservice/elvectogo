
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import SectionTitle from '../components/common/SectionTitle';
import AnimatedSection from '../components/animations/AnimatedSection';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const galleryItems = [
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
    { id: 12, title: 'Engins ELVEC', category: 'engins', image: '/lovable-uploads/1bd720bd-9635-455f-8849-f89512705c25.png', type: 'image' },
    { id: 13, title: 'Vidéo projet', category: 'projets', video: '/lovable-uploads/video-projet-1.mp4', type: 'video', thumbnail: '/lovable-uploads/projet-excavation-1.jpg' }
  ];
  
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
                  ) : (
                    <div className="relative">
                      <video src={item.video} poster={item.thumbnail} controls className="w-full h-64 object-cover" preload="metadata">Vidéo non supportée</video>
                      <div className="absolute top-2 right-2 bg-elvec-600 text-white text-xs px-2 py-1 rounded-full">Vidéo</div>
                    </div>
                  )}
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
