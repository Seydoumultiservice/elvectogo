import { Handshake } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';

const Partners = () => {
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

        <AnimatedSection animationType="slide-up" delay={200}>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl max-w-5xl mx-auto">
            <img 
              src="/lovable-uploads/partenaires-logos.png" 
              alt="Partenaires ELVEC TOGO - TRANSRAIL, EIFFAGE, TOGO PORT, G.B.R. TRAVAUX PUBLICS"
              className="w-full h-auto object-contain"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Partners;
