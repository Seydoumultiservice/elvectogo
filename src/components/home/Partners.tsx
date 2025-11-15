import { Handshake } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';

const Partners = () => {
  const partners = [
    { name: 'TRANSRAIL', logo: '/lovable-uploads/partenaires.png' },
    { name: 'EIFFAGE', logo: '/lovable-uploads/partenaires.png' },
    { name: 'PORT DE LOMÉ', logo: '/lovable-uploads/partenaires.png' },
    { name: 'G.B.R. TRAVAUX PUBLICS', logo: '/lovable-uploads/partenaires.png' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-elvec-50">
      <div className="container mx-auto px-4">
        <AnimatedSection animationType="fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Handshake className="h-8 w-8 text-elvec-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Nos Partenaires
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ils nous font confiance pour leurs projets d'envergure
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <AnimatedSection 
              key={partner.name} 
              delay={index * 100}
              animationType="slide-up"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-center h-32 group hover:scale-105">
                <div className="text-center">
                  <p className="text-sm md:text-base font-semibold text-gray-700 group-hover:text-elvec-600 transition-colors">
                    {partner.name}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
