import { useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import Button from '../common/Button';
import RequestQuoteDialog from '../common/RequestQuoteDialog';

const Hero = () => {
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('/lovable-uploads/banniere-hero.jpg')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-10 flex items-center">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-elvec-500 text-white text-sm font-medium rounded-full mb-6 animate-pulse">
            🏆 N°1 au Togo dans la location d'engins lourds
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in text-white leading-tight">
            Parce que construire <br className="hidden md:block" />
            est notre <span className="text-elvec-400">passion !</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 animate-slide-up max-w-2xl">
            ELVEC TOGO - La référence d'une prestation de qualité. 
            Nous mettons à votre disposition une flotte moderne d'engins lourds et de véhicules 
            pour tous vos projets de construction et d'aménagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              onClick={() => setQuoteDialogOpen(true)}
            >
              Demander un devis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a href="tel:+22870600306">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-elvec-600">
                <Phone className="mr-2 h-5 w-5" />
                Appelez-nous
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* Gradient overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      
      <RequestQuoteDialog 
        open={quoteDialogOpen} 
        onOpenChange={setQuoteDialogOpen} 
      />
    </section>
  );
};

export default Hero;
