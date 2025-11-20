import { Play } from 'lucide-react';
import { useState, useRef } from 'react';
import AnimatedSection from '../animations/AnimatedSection';

const VideoPresentation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-elvec-50 to-white">
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ELVEC TOGO en Action
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez notre expertise à travers nos réalisations concrètes. 
              Une entreprise qui allie savoir-faire technique et engagement envers l'excellence.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-8 items-center">
          <AnimatedSection 
            animationType="slide-right" 
            className="md:col-span-3"
            delay={100}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl group bg-black">
              <video
                ref={videoRef}
                className="w-full aspect-video object-contain"
                poster="/lovable-uploads/banniere-hero.jpg"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
                preload="metadata"
                playsInline
              >
                <source src="/lovable-uploads/video-presentation-principale.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
              
              {!isPlaying && (
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"
                  aria-label="Lire la vidéo"
                >
                  <div className="w-20 h-20 rounded-full bg-elvec-500 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-10 w-10 text-white ml-1" fill="white" />
                  </div>
                </button>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection 
            animationType="slide-up" 
            className="md:col-span-2"
            delay={200}
          >
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-elvec-600 mb-3">
                  🚜 Équipements Modernes
                </h3>
                <p className="text-gray-600">
                  Une flotte complète d'engins lourds de dernière génération pour tous vos projets BTP et agricoles.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-elvec-600 mb-3">
                  👷 Équipe Qualifiée
                </h3>
                <p className="text-gray-600">
                  Des professionnels expérimentés et formés aux normes internationales de sécurité et de qualité.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-elvec-600 mb-3">
                  ✅ Projets d'Envergure
                </h3>
                <p className="text-gray-600">
                  Partenaire de confiance pour les plus grands projets d'infrastructure au Togo.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default VideoPresentation;
