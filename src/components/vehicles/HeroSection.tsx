
import { Truck } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';

const HeroSection = () => {
  return (
    <section className="bg-elvec-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-elvec-800 rounded-full mb-6">
              <Truck className="h-6 w-6 text-elvec-400 mr-2" />
              <span className="text-elvec-200 font-medium">Location d'Engins Lourds ELVEC TOGO</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Des engins de qualité pour tous vos chantiers
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Découvrez notre flotte d'engins lourds pour vos travaux de construction, terrassement et génie civil à Lomé et partout au Togo.
            </p>
            <a href="#reservation" className="btn-elvec text-lg px-8 py-3">
              Réserver maintenant
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default HeroSection;
