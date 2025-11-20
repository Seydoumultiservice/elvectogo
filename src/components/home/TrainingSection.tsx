import { Clock, Phone, MapPin, CheckCircle2, Users, Award, Calendar } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';
import { Link } from 'react-router-dom';

const TrainingSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-green-800 via-green-700 to-yellow-600 text-white">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Award className="h-6 w-6 text-yellow-300 mr-2" />
              <span className="text-white font-medium">Formation Professionnelle</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Formation Conduite d'Engins Lourds
            </h2>
            <p className="text-2xl md:text-3xl font-semibold text-yellow-300 mb-6">
              "03 MOIS - LA FORMATION QUI TE MET AU VOLANT DE TON AVENIR"
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Video */}
          <AnimatedSection animationType="slide-right" delay={200}>
            <div className="md:col-span-3">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <video 
                  controls
                  poster="/lovable-uploads/formation-engins-lourds.jpg"
                  className="w-full h-[500px] object-cover"
                  preload="metadata"
                >
                  <source src="/lovable-uploads/WhatsApp_Video_2025-11-17_at_10.55.16.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos HTML5.
                </video>
                <div className="absolute top-4 right-4 bg-elvec-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                  PLACES LIMITÉES
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contenu */}
          <AnimatedSection animationType="slide-up" delay={400}>
            <div className="md:col-span-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
              {/* Détails de la formation */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-yellow-300" />
                  Détails de la Formation
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-yellow-300 text-sm mb-1">Date de début</p>
                    <p className="font-bold text-lg">10 Novembre 2025</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-yellow-300 text-sm mb-1">Durée</p>
                    <p className="font-bold text-lg">3 Mois</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-yellow-300 text-sm mb-1">Coût</p>
                    <p className="font-bold text-lg">300 000 Fcfa</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-yellow-300 text-sm mb-1">Inscription</p>
                    <p className="font-bold text-lg">10 000 Fcfa</p>
                    <p className="text-xs text-yellow-300">(+ EPI inclus)</p>
                  </div>
                </div>
              </div>

              {/* Ce que vous apprendrez */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-yellow-300" />
                  Ce que vous apprendrez
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span>Manier la tractopelle (BTP et agriculture)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span>Devenir un acteur du changement dans votre pays</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span>Obtenir une attestation de formation professionnelle</span>
                  </li>
                </ul>
              </div>

              {/* Avantages */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-300" />
                  Avantages
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-yellow-300" />
                    Formation pratique et théorique
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-yellow-300" />
                    Formateurs expérimentés
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-yellow-300" />
                    Équipements modernes
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-yellow-300" />
                    Places limitées
                  </div>
                </div>
              </div>

              {/* Contacts et Lieu */}
              <div className="border-t border-white/20 pt-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-yellow-300 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Adidogomé Apédokoè Gbomamè, en face de l'école SAKA VISION</span>
                  </div>
                  <div className="flex items-center flex-wrap gap-4">
                    <a href="tel:+22892748270" className="flex items-center text-yellow-300 hover:text-yellow-400 transition-colors">
                      <Phone className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">+228 92 74 82 70</span>
                    </a>
                    <a href="tel:+22870600306" className="flex items-center text-yellow-300 hover:text-yellow-400 transition-colors">
                      <Phone className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">+228 70 60 03 06</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+22892748270"
                  className="flex-1 bg-elvec-500 hover:bg-elvec-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                >
                  S'inscrire maintenant
                </a>
                <Link
                  to="/contact"
                  className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 border border-white/30 text-center"
                >
                  En savoir plus
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
