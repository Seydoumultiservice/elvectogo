
import { Tractor, Hammer, Wrench, Truck, Building, HardHat, Car, Clock, CheckCircle2, Sprout, Droplets, Shovel, TreePine, Wheat, Phone, GraduationCap } from 'lucide-react';
import TrainingRegistrationDialog from '@/components/common/TrainingRegistrationDialog';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import SectionTitle from '../components/common/SectionTitle';
import ServiceCard from '../components/common/ServiceCard';
import Button from '../components/common/Button';
import AnimatedSection from '../components/animations/AnimatedSection';

const Services = () => {
  // Services BTP
  const constructionServices = [
    {
      title: 'Terrassement',
      description: 'Nous offrons des services de terrassement pour préparer votre terrain pour la construction.',
      icon: Tractor
    },
    {
      title: 'Démolition',
      description: 'Nos équipes spécialisées assurent la démolition sécurisée de structures existantes.',
      icon: Hammer
    },
    {
      title: 'Piste Rurale',
      description: 'Nous réalisons la construction et l\'entretien de pistes rurales pour améliorer l\'accès aux zones reculées.',
      icon: Wrench
    },
    {
      title: 'Ponceaux',
      description: 'Nous installons des ponceaux pour assurer un drainage efficace sur vos chantiers.',
      icon: Building
    },
    {
        title: 'Manutention',
      description: 'Service professionnel de manutention pour le chargement, le d\'echargement et l\'organisation logistique sur site. Nos équipes maîtrisent la manipulation d\'équipements lourds en toute sécurité et garantissent un travail rapide et soigné.',
      icon: Truck
    },
    {
      title: 'Formation',
      description: 'Formations pratiques et certifiantes pour opérateurs d\'engins et personnel de chantier. Programmes adaptés (sécurité, conduite d\'engins, maintenance préventive) pour améliorer compétences et conformité.',
      icon: HardHat
    }
  ];
  
  // Services Agricoles
  const agriculturalServices = [
    {
      title: 'Location de Tracteurs',
      description: 'Tracteurs performants avec opérateurs expérimentés pour tous vos travaux agricoles. Sécurité, efficacité et respect des délais garantis.',
      icon: Tractor
    },
    {
      title: 'Labour & Mise en Culture',
      description: 'Préparation professionnelle de vos terres pour optimiser vos rendements. Service complet de labourage et préparation du sol.',
      icon: Sprout
    },
    {
      title: 'Bassin de Rétention d\'Eau',
      description: 'Construction de bassins pour l\'irrigation et la gestion de l\'eau. Solutions durables pour l\'agriculture moderne.',
      icon: Droplets
    },
    {
      title: 'Dessouchage',
      description: 'Élimination des souches et préparation des terrains agricoles. Travail rapide et efficace avec engins spécialisés.',
      icon: Shovel
    },
    {
      title: 'Nivellement de Terrain',
      description: 'Aplanissement et nivellement pour une exploitation optimale. Précision et qualité du travail garanties.',
      icon: TreePine
    },
    {
      title: 'Transport Agricole',
      description: 'Transport de récoltes, matériaux et équipements agricoles. Flotte de camions-bennes disponibles.',
      icon: Wheat
    }
  ];
  
  // Types d'engins lourds disponibles
  const equipmentList = [
    'Bulldozers',
    'Excavateurs',
    'Chargeuses',
    'Niveleuses',
    'Rouleaux compresseurs',
    'Camions bennes',
    'Camions citernes',
    'Tractopelles',
    'Compacteurs',
    'Grues mobiles'
  ];
  
  return (
    <Layout>
      <div className="bg-elvec-900 text-white py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Nos Services</h1>
              <p className="text-xl text-gray-300">
                Des solutions complètes pour vos projets de construction et de transport.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Services BTP Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <SectionTitle 
              title="Services BTP" 
              subtitle="Nous proposons également divers services pour répondre à tous vos besoins en construction."
              centered
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {constructionServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section Manutention Détaillée */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <SectionTitle 
              title="Service de Manutention Professionnelle" 
              subtitle="Chargement, déchargement et logistique sur chantier"
              centered
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            {/* Colonne Images */}
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/lovable-uploads/manutention-a-Lome-Ouest-Afrique.jpg" 
                alt="Manutention" 
                loading="lazy"
                className="rounded-lg shadow-xl h-64 w-full object-cover" 
              />
              <img 
                src="/lovable-uploads/manutention-port-lome.jpg" 
                alt="Port de Lomé" 
                loading="lazy"
                className="rounded-lg shadow-xl h-64 w-full object-cover" 
              />
            </div>

            {/* Colonne Description */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Nos Services de Manutention</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-elvec-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Chargement & Déchargement</h4>
                    <p className="text-gray-600">Manipulation sécurisée de tous types de matériaux et équipements lourds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-elvec-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Organisation Logistique</h4>
                    <p className="text-gray-600">Planification et coordination des opérations de manutention sur site</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-elvec-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Sécurité Maximale</h4>
                    <p className="text-gray-600">Équipes formées aux normes de sécurité, travail rapide et soigné</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="w-full sm:w-auto">Demander un Devis</Button>
                </Link>
                <a 
                  href="tel:+22892748270" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-elvec-600 text-elvec-600 rounded-lg font-semibold hover:bg-elvec-50 transition-colors w-full sm:w-auto"
                >
                  <Phone className="h-5 w-5" />
                  Nous Appeler
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Formation Professionnelle Détaillée */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <SectionTitle 
              title="Formations Professionnelles Certifiantes" 
              subtitle="Devenez opérateur d'engins lourds qualifié"
              centered
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
            {/* Colonne Description */}
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-bold mb-6 text-gray-900">Programmes de Formation Disponibles</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                  <h4 className="font-semibold text-lg mb-2">🚜 Tractopelle</h4>
                  <p className="text-sm text-gray-600">Formation complète opérateur tractopelle</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                  <h4 className="font-semibold text-lg mb-2">🏗️ Bulldozer</h4>
                  <p className="text-sm text-gray-600">Maîtrise du bulldozer et techniques de terrassement</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                  <h4 className="font-semibold text-lg mb-2">⚙️ Excavatrice</h4>
                  <p className="text-sm text-gray-600">Opération sécurisée d'excavatrice</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
                  <h4 className="font-semibold text-lg mb-2">🔧 Autres Engins</h4>
                  <p className="text-sm text-gray-600">Niveleuse, Compacteur, Chargeuse...</p>
                </div>
              </div>

              <div className="bg-orange-100 border-l-4 border-orange-500 p-6 rounded-lg mb-8">
                <h4 className="font-semibold text-lg mb-3 text-gray-900">📋 Ce que vous obtiendrez :</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-700">Certification professionnelle reconnue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-700">Formation pratique avec engins réels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-700">Formateurs expérimentés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-700">Sécurité et maintenance préventive</span>
                  </li>
                </ul>
              </div>

              {/* BOUTON D'INSCRIPTION - CLIQUABLE */}
              <TrainingRegistrationDialog>
                <Button size="lg" className="w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  S'inscrire à une Formation
                </Button>
              </TrainingRegistrationDialog>

              <p className="text-sm text-gray-500 mt-4">
                💡 Cliquez pour remplir le formulaire d'inscription. Nos équipes vous contacteront rapidement.
              </p>
            </div>

            {/* Colonne Images */}
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <img 
                src="/lovable-uploads/formation-engins-lourds.jpg" 
                alt="Formation Engins" 
                loading="lazy"
                className="rounded-lg shadow-xl h-64 w-full object-cover" 
              />
              <img 
                src="/lovable-uploads/formation-elvec-poster.jpg" 
                alt="Formation ELVEC" 
                loading="lazy"
                className="rounded-lg shadow-xl h-64 w-full object-cover" 
              />
              <img 
                src="/lovable-uploads/formation en lourd 1.jpg" 
                alt="Formation pratique" 
                loading="lazy"
                className="rounded-lg shadow-xl h-64 w-full object-cover col-span-2" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Agricoles Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-elvec-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <SectionTitle 
              title="Services Agricoles Professionnels" 
              subtitle="Transformez vos terres et boostez vos rendements avec nos solutions de mécanisation agricole"
              centered
            />
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-600">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  ELVEC TOGO, Votre Partenaire Agricole
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nous accompagnons les exploitations agricoles dans la mécanisation de leurs cultures. 
                  L'entreprise propose des services de <strong className="text-green-600">dessouchage, nivellement, labour, transport, mise en culture</strong> et bien plus.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {agriculturalServices.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 100}>
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border-t-4 border-green-600 h-full">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-br from-green-500 to-green-700 p-3 rounded-lg mr-4">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{service.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Images des services agricoles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <AnimatedSection delay={200}>
              <div className="relative group overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="/lovable-uploads/services-agricoles-elvec.jpg" 
                  alt="Services Agricoles ELVEC" 
                  className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Location de Tracteurs</h4>
                    <p className="text-white/90 text-sm">Engins modernes + Opérateurs</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="relative group overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="/lovable-uploads/intervention-chantiers-agricoles.jpg" 
                  alt="Intervention Chantiers Agricoles" 
                  className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Intervention Rapide</h4>
                    <p className="text-white/90 text-sm">Sur tous vos chantiers agricoles</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="relative group overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="/lovable-uploads/travaux-agricoles-action.jpg" 
                  alt="Travaux Agricoles en Action" 
                  className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Travaux Agricoles</h4>
                    <p className="text-white/90 text-sm">Labour, dessouchage, nivellement</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* CTA Agricole */}
          <AnimatedSection delay={500}>
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-2xl p-8 md:p-12 text-center text-white mt-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
              <div className="relative z-10">
                <Tractor className="w-16 h-16 mx-auto mb-4 animate-bounce" />
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Prêt à Mécaniser Votre Exploitation ?</h3>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Contactez-nous pour un devis personnalisé et découvrez comment nous pouvons transformer vos terres
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                      Demander un Devis Agricole
                    </Button>
                  </Link>
                  <a href="tel:+22892748270" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-800 text-white rounded-lg font-semibold hover:bg-green-900 transition-colors">
                    <Clock className="w-5 h-5" />
                    <span>+228 92 74 82 70</span>
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Location d'Engins Lourds Section */}
      <section className="py-16 bg-elvec-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative">
                <img 
                  src="/lovable-uploads/d821c0ba-bf70-4f75-8546-dbc64980905b.png" 
                  alt="Engin de chantier" 
                  className="rounded-lg shadow-lg w-full object-cover"
                />
                <div className="absolute -bottom-5 -right-5 bg-elvec-600 text-white p-4 rounded-lg shadow-lg">
                  <p className="text-xl font-bold">Équipements professionnels</p>
                  <p className="text-sm">Pour tous vos projets</p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animationType="slide-right">
              <SectionTitle 
                title="Service de Location d'Engins Lourds" 
                subtitle="Découvrez nos différents engins pour vos travaux."
                className="lg:text-left"
              />
              
              <p className="text-gray-600 mb-6">
                Notre service de location d'engins lourds propose une solution fiable et efficace pour tous vos besoins en chantier. Nous mettons à votre disposition une flotte d'engins modernes et puissants pour garantir la réussite de vos projets.
              </p>
              
              <p className="text-gray-600 mb-6">
                Que ce soit pour des travaux de terrassement, de démolition, ou de construction, nos engins lourds sont équipés pour réaliser toutes vos tâches avec précision et efficacité.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {equipmentList.map((equipment, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-elvec-600 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{equipment}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="primary" className="w-full sm:w-auto">
                    Demander un devis
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Contactez-nous
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Location de Voitures Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <SectionTitle 
                title="Location de Voitures avec Chauffeur" 
                subtitle="Un service personnalisé pour vos déplacements professionnels et personnels."
                className="lg:text-left"
              />
              
              <p className="text-gray-600 mb-6">
                Découvrez les avantages de la location de voitures avec chauffeur et profitez d'un service pratique et fiable. Que vous ayez besoin d'un véhicule pour vos déplacements professionnels ou personnels, notre entreprise vous offre une solution adaptée à vos besoins.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="mt-1">
                    <Car className="h-6 w-6 text-elvec-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-elvec-900">Confort</h3>
                    <p className="text-gray-600">Profitez d'un confort optimal et laissez-vous conduire par nos chauffeurs professionnels.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1">
                    <Clock className="h-6 w-6 text-elvec-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-elvec-900">Flexibilité</h3>
                    <p className="text-gray-600">Bénéficiez d'une grande flexibilité dans vos déplacements grâce à nos services disponibles 7j/7.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="primary" className="w-full sm:w-auto">
                    Réserver une voiture
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="w-full sm:w-auto">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="order-1 lg:order-2" animationType="slide-right">
              <img 
                src="/lovable-uploads/cc256fb8-05f3-4982-bdb2-6413414b3db1.png" 
                alt="Location de voitures avec chauffeur" 
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-elvec-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Besoin d'un service sur mesure?
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                Contactez-nous pour discuter de vos besoins spécifiques. Notre équipe est prête à vous proposer une solution adaptée.
              </p>
              <Link to="/contact">
                <Button className="bg-white text-elvec-800 hover:bg-gray-100">
                  Demander un devis gratuit
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
