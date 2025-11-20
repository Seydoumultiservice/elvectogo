import { Link } from 'react-router-dom';
import { Tractor, Sprout, Droplets, Phone } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';
import Button from '../common/Button';

const AgriculturalServices = () => {
  const services = [
    { icon: Tractor, title: 'Location de Tracteurs', description: 'Tracteurs performants avec opérateurs qualifiés' },
    { icon: Sprout, title: 'Labour & Mise en Culture', description: 'Préparation complète de vos terres agricoles' },
    { icon: Droplets, title: 'Bassin de Rétention', description: 'Construction de bassins d\'eau pour irrigation' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-elvec-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-elvec-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Services <span className="text-elvec-600">Agricoles</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transformez vos terres et boostez vos rendements avec nos solutions professionnelles
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <AnimatedSection animationType="slide-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-elvec-600 to-green-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <img 
                src="/lovable-uploads/services-agricoles-elvec.jpg" 
                alt="Services Agricoles ELVEC" 
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animationType="slide-right" delay={200}>
            <div className="space-y-6">
              {services.map((service, index) => (
                <div 
                  key={service.title}
                  className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-elvec-500 to-elvec-700 p-3 rounded-lg flex-shrink-0">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <AnimatedSection delay={300}>
            <div className="relative group overflow-hidden rounded-2xl shadow-xl">
              <img 
                src="/lovable-uploads/intervention-chantiers-agricoles.jpg" 
                alt="Intervention Chantiers Agricoles" 
                className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Intervention Rapide</h3>
                  <p className="text-white/90">Sur tous vos chantiers agricoles</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="relative group overflow-hidden rounded-2xl shadow-xl">
              <img 
                src="/lovable-uploads/location-engins-agricoles.jpg" 
                alt="Location Engins Agricoles" 
                className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Engins Modernes</h3>
                  <p className="text-white/90">+ Opérateurs expérimentés</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={500}>
          <div className="bg-gradient-to-r from-elvec-600 to-green-600 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
            <div className="relative z-10">
              <Tractor className="w-16 h-16 mx-auto mb-4 animate-bounce" />
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Prêt à Démarrer Votre Projet Agricole ?</h3>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Contactez-nous pour un devis personnalisé et découvrez nos solutions adaptées à vos besoins
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="group">
                    Demander un Devis
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </Link>
                <a href="tel:+22892748270" className="flex items-center gap-2 text-white font-semibold hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                  <span>+228 92 74 82 70</span>
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default AgriculturalServices;
