import { Link } from 'react-router-dom';
import { Award, Clock, Users, CheckCircle2, Calendar, DollarSign, MapPin } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const TrainingSection = () => {
  const features = [
    { icon: Clock, title: 'Formation de 3 mois', description: 'Programme intensif et complet' },
    { icon: Users, title: 'Opérateurs Qualifiés', description: 'Devenez un professionnel certifié' },
    { icon: Award, title: 'Attestation Officielle', description: 'Reconnue dans le secteur BTP' },
    { icon: CheckCircle2, title: 'Places Limitées', description: 'Inscrivez-vous maintenant !' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-elvec-900 via-elvec-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-elvec-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <SectionTitle 
            title="Formation Professionnelle" 
            subtitle="Devenez opérateur d'engins lourds certifié en 3 mois"
            centered 
            className="text-white"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
          <AnimatedSection animationType="slide-up">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-elvec-500 to-orange-500 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <img 
                src="/lovable-uploads/formation-tractopelle-promo.jpg" 
                alt="Formation Tractopelle ELVEC" 
                className="relative rounded-2xl shadow-2xl w-full transform group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                Places Limitées !
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animationType="slide-right">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-2xl">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-orange-400 to-elvec-400 bg-clip-text text-transparent">
                    03 MOIS
                  </span> pour devenir des opérateurs qualifiés !
                </h3>
                <p className="text-white/90 text-lg mb-6">
                  Notre formation sur tractopelle t'apprends à manier un engin clé dans <strong>le BTP et l'agriculture</strong>, 
                  et obtiens ton attestation de formation professionnelle.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 p-4 rounded-lg text-center border border-white/20">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-elvec-400" />
                    <p className="text-sm text-white/70">Début</p>
                    <p className="font-bold text-lg">10 Nov 2025</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center border border-white/20">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-elvec-400" />
                    <p className="text-sm text-white/70">Durée</p>
                    <p className="font-bold text-lg">3 mois</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center border border-white/20">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-elvec-400" />
                    <p className="text-sm text-white/70">Prix</p>
                    <p className="font-bold text-lg">300,000 F</p>
                  </div>
                </div>

                <div className="bg-elvec-500/20 border-l-4 border-elvec-400 p-4 rounded-lg mb-6">
                  <p className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-elvec-400" />
                    <span className="font-semibold">Adidogomé Apédokoé Gbomamé</span>
                  </p>
                  <p className="text-sm text-white/80">En face de l'école SAKA VISION</p>
                  <p className="text-sm text-white/70 mt-2">
                    Inscription : 10,000 FCFA • Donne droit au EPI
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-elvec-500/30 p-2 rounded-lg">
                      <feature.icon className="w-5 h-5 text-elvec-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-xs text-white/70">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/22892748270?text=Bonjour%2C%20je%20souhaite%20m'inscrire%20à%20la%20formation%20tractopelle%20du%2010%20novembre%202025" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="secondary" size="lg" className="w-full group">
                    Réserver Ma Place Maintenant
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </Button>
                </a>
                <Link to="/contact" className="flex-1">
                  <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white hover:text-elvec-900">
                    Plus d'Infos
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
