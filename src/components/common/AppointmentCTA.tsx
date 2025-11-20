import { Calendar, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../animations/AnimatedSection';
import Button from './Button';

const AppointmentCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-elvec-600 via-elvec-700 to-elvec-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Planifiez Votre Rendez-Vous
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Besoin d'un devis personnalisé ou d'une consultation ? Prenez rendez-vous avec notre équipe
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start gap-4 bg-white/5 p-6 rounded-lg">
                  <div className="bg-elvec-500 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Appelez-nous</h3>
                    <p className="text-white/80 text-sm">Réponse immédiate par téléphone</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 p-6 rounded-lg">
                  <div className="bg-elvec-500 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Rendez-vous</h3>
                    <p className="text-white/80 text-sm">Planifiez une rencontre à votre convenance</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 p-6 rounded-lg">
                  <div className="bg-elvec-500 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Disponibilité</h3>
                    <p className="text-white/80 text-sm">Lun-Sam : 8h-18h</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/22892748270?text=Bonjour%2C%20je%20souhaite%20prendre%20rendez-vous" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 max-w-xs"
                >
                  <Button variant="secondary" size="lg" className="w-full group">
                    <Calendar className="w-5 h-5 mr-2" />
                    Prendre Rendez-vous
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </a>

                <a 
                  href="tel:+22892748270" 
                  className="flex-1 max-w-xs"
                >
                  <Button variant="outline" size="lg" className="w-full border-2 border-white text-white hover:bg-white hover:text-elvec-900">
                    <Phone className="w-5 h-5 mr-2" />
                    +228 92 74 82 70
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AppointmentCTA;
