import { Tractor, Hammer, Wrench, Truck, Building, HardHat, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import ServiceCard from '../common/ServiceCard';
import Button from '../common/Button';
import AnimatedSection from '../animations/AnimatedSection';
import ServiceModal from '../services/ServiceModal';
import YouTubeEmbed from './YouTubeEmbed';

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const servicesData = {
    terrassement: {
      title: 'Terrassement',
      description: 'Nous offrons des services de terrassement pour préparer votre terrain pour la construction.',
      longDescription: 'Le terrassement est une étape cruciale dans tout projet de construction. Chez ELVEC TOGO, nous disposons d\'une flotte moderne de bulldozers et de pelles mécaniques pour préparer votre terrain avec précision. Nos équipes qualifiées réalisent des travaux de déblaiement, remblaiement, nivellement et compactage. Nous intervenons sur tous types de terrains, des sols argileux aux terrains rocheux. Notre expertise garantit une base solide pour vos constructions, dans le respect des normes et des délais convenus.',
      images: ['/lovable-uploads/projet-terrassement-1.jpg', '/lovable-uploads/excavation-chantier.jpg', '/lovable-uploads/bulldozer-action.jpg'],
      features: ['Équipements modernes et performants', 'Équipe qualifiée et expérimentée', 'Respect strict des délais', 'Conformité aux normes de sécurité'],
    },
    demolition: {
      title: 'Démolition',
      description: 'Nos équipes spécialisées assurent la démolition sécurisée de structures existantes.',
      longDescription: 'La démolition nécessite expertise et équipement spécialisé. ELVEC TOGO assure la démolition sécurisée de bâtiments, structures et ouvrages de toutes tailles. Nous utilisons des techniques modernes pour minimiser les nuisances sonores et les poussières, tout en garantissant la sécurité du site et des environs. Nos équipes sont formées aux normes de sécurité les plus strictes et disposent de tous les équipements de protection nécessaires. Nous gérons également l\'évacuation et le recyclage des déchets de démolition de manière responsable.',
      youtubeVideoId: 'ln7E4ujuDbU',
      images: ['/lovable-uploads/chantier-demolition.webp', '/lovable-uploads/equipements-securite-demolition.jpg'],
      features: ['Sécurité maximale garantie', 'Gestion complète des déchets', 'Permis et autorisations gérés', 'Rapidité d\'exécution'],
    },
    pavage: {
      title: 'Pavage et Aménagement Routier',
      description: 'Réalisation de travaux de pavage et d\'aménagement routier avec finition impeccable.',
      longDescription: 'ELVEC TOGO est votre partenaire privilégié pour tous vos projets de pavage et d\'aménagement routier. Nous intervenons sur la pose de pavés autobloquants, l\'aménagement de parkings, voies piétonnes, places publiques et routes urbaines. Notre équipe qualifiée utilise des compacteurs et équipements de dernière génération pour garantir une finition parfaite et une durabilité exceptionnelle. Nous respectons scrupuleusement les normes techniques et assurons un rendu esthétique de haute qualité. De la préparation du sol à la pose finale, chaque étape est réalisée avec précision pour vous offrir un ouvrage solide et durable.',
      images: ['/lovable-uploads/pavage-compacteur.jpg', '/lovable-uploads/pavage-pose.jpg', '/lovable-uploads/pavage-finition.jpg'],
      features: ['Pose de pavés autobloquants professionnelle', 'Équipements de compactage modernes', 'Finition esthétique soignée', 'Respect des normes techniques', 'Garantie de durabilité'],
    },
    pisteRurale: {
      title: 'Piste Rurale',
      description: 'Nous réalisons la construction et l\'entretien de pistes rurales pour améliorer l\'accès aux zones reculées.',
      longDescription: 'L\'aménagement de pistes rurales est essentiel pour désenclaver les zones reculées et faciliter le développement économique local. ELVEC TOGO construit et entretient des pistes rurales durables qui facilitent l\'accès aux villages et exploitations agricoles. Nous utilisons des niveleuses et compacteurs de dernière génération pour garantir des routes praticables en toute saison. Nos techniques éprouvées assurent une excellente drainage et une résistance optimale aux intempéries.',
      images: ['/lovable-uploads/PISTE1.jpg', '/lovable-uploads/PISTE RURAL.jpg'],
      features: ['Techniques éprouvées', 'Matériaux de qualité sélectionnés', 'Entretien durable garanti', 'Impact social positif'],
    },
    ponceaux: {
      title: 'Ponceaux',
      description: 'Nous installons des ponceaux pour assurer un drainage efficace sur vos chantiers.',
      longDescription: 'Les ponceaux assurent le drainage et l\'évacuation des eaux sur vos chantiers et routes, prévenant ainsi l\'érosion et les dégâts liés aux eaux pluviales. ELVEC TOGO maîtrise l\'installation de ponceaux de tous types : béton armé, métal, PVC, selon vos besoins spécifiques. Nos équipes réalisent une étude hydraulique préalable du terrain pour dimensionner correctement les ouvrages et garantir leur efficacité à long terme. Installation professionnelle avec garantie de conformité.',
      images: ['/lovable-uploads/PONCEAU &.jpg', '/lovable-uploads/PONCEAU é.jpg'],
      features: ['Étude hydraulique complète', 'Installation professionnelle certifiée', 'Matériaux résistants aux intempéries', 'Garantie longue durée'],
    },
    posePave: {
      title: 'Pose de Pavé',
      description: 'Notre équipe est experte dans la pose de pavés pour vos allées, cours et espaces extérieurs.',
      longDescription: 'La pose de pavés embellit vos espaces extérieurs tout en créant des surfaces durables et esthétiques. ELVEC TOGO pose des pavés autobloquants, pavés en béton ou en pierre naturelle selon vos préférences. Nos artisans qualifiés réalisent des motifs variés et assurent une finition impeccable. Idéal pour allées, cours, parkings, trottoirs et espaces publics. Le drainage naturel des pavés les rend particulièrement adaptés au climat tropical.',
      images: ['/lovable-uploads/engin-komatsu.jpg', '/lovable-uploads/equipe-elvec-2025.jpg'],
      features: ['Finitions soignées et esthétiques', 'Large choix de motifs', 'Drainage naturel intégré', 'Résistance exceptionnelle au temps'],
    },
    pavage: {
      title: 'Pavage',
      description: 'Nous proposons des services de pavage pour créer des surfaces durables et esthétiques.',
      longDescription: 'Le pavage de routes et parkings nécessite savoir-faire technique et équipements performants. ELVEC TOGO réalise vos travaux de pavage en asphalte ou béton bitumineux selon les normes internationales. Nous préparons minutieusement la surface, appliquons les couches de base et de finition dans le respect des spécifications techniques. Résultat: des surfaces lisses, durables, esthétiques et conformes aux normes de circulation. Garantie de qualité sur tous nos travaux.',
      images: ['/lovable-uploads/projet-electrique-2.jpg', '/lovable-uploads/equipe-directeur.jpg'],
      features: ['Conformité aux normes techniques', 'Matériaux certifiés', 'Équipe expérimentée', 'Finition professionnelle impeccable'],
    },
  };

  const services = [
    {
      title: 'Terrassement',
      description: 'Nous offrons des services de terrassement pour préparer votre terrain pour la construction.',
      icon: Tractor,
      key: 'terrassement',
    },
    {
      title: 'Démolition',
      description: 'Nos équipes spécialisées assurent la démolition sécurisée de structures existantes.',
      icon: Hammer,
      key: 'demolition',
    },
    {
      title: 'Piste Rurale',
      description: 'Nous réalisons la construction et l\'entretien de pistes rurales pour améliorer l\'accès aux zones reculées.',
      icon: Wrench,
      key: 'pisteRurale',
    },
    {
      title: 'Ponceaux',
      description: 'Nous installons des ponceaux pour assurer un drainage efficace sur vos chantiers.',
      icon: Building,
      key: 'ponceaux',
    },
    {
      title: 'Pose de Pavé',
      description: 'Notre équipe est experte dans la pose de pavés pour vos allées, cours et espaces extérieurs.',
      icon: HardHat,
      key: 'posePave',
    },
    {
      title: 'Pavage',
      description: 'Nous proposons des services de pavage pour créer des surfaces durables et esthétiques.',
      icon: Truck,
      key: 'pavage',
    },
  ];

  const handleServiceClick = (serviceKey: string) => {
    setSelectedService(servicesData[serviceKey as keyof typeof servicesData]);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionTitle 
            title="Services BTP" 
            subtitle="Nous proposons une gamme complète de services pour répondre à tous vos besoins en construction et aménagement."
            centered
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.title}
              onClick={() => handleServiceClick(service.key)}
              className="cursor-pointer"
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                delay={index * 100}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services">
            <Button variant="outline">
              Voir tous nos services
            </Button>
          </Link>
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          service={selectedService}
        />
      )}
    </section>
  );
};

export default Services;
