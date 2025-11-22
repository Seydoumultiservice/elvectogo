import AnimatedSection from '../animations/AnimatedSection';

const VideoPresentation = () => {

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

        <div className="grid md:grid-cols-5 gap-8 items-end">
          {/* Cartes à droite - 60% (3/5) */}
          <AnimatedSection 
            animationType="slide-up" 
            className="md:col-span-3 order-2 md:order-1"
            delay={100}
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

          {/* Vidéo en bas à gauche - 40% (2/5) */}
          <AnimatedSection 
            animationType="slide-right" 
            className="md:col-span-2 order-1 md:order-2"
            delay={200}
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl group">
              <iframe
                className="w-full aspect-video rounded-lg"
                src="https://www.youtube.com/embed/0OEQYhkBSJg?mute=1&rel=0&modestbranding=1"
                title="ELVEC TOGO en Action"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default VideoPresentation;
