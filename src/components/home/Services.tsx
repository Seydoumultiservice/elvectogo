import { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import ServiceCard from '../common/ServiceCard';
import ServiceModal from '../services/ServiceModal';
import AnimatedSection from '../animations/AnimatedSection';
import { Building2, Hammer, Construction, TreePine, Ship, HardHat } from 'lucide-react';
import { servicesDetails } from '@/data/servicesData';

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const constructionServices = [
    {
      title: 'Terrassement',
      description: 'Préparation de terrain pour construction avec équipements de pointe',
      icon: Building2,
      key: 'terrassement',
    },
    {
      title: 'Démolition',
      description: 'Démolition sécurisée de structures avec gestion des déchets',
      icon: Hammer,
      key: 'demolition',
    },
    {
      title: 'Piste Rurale',
      description: 'Construction et réhabilitation de pistes rurales durables',
      icon: Construction,
      key: 'piste',
    },
    {
      title: 'Ponceaux',
      description: 'Construction de ponceaux et ouvrages d\'art hydrauliques',
      icon: TreePine,
      key: 'ponceaux',
    },
    {
      title: 'Manutention',
      description: 'Services de manutention et logistique portuaire professionnels',
      icon: Ship,
      key: 'manutention',
    },
    {
      title: 'Formation',
      description: 'Formations certifiantes en conduite d\'engins lourds',
      icon: HardHat,
      key: 'formation',
    }
  ];

  const handleServiceClick = (serviceKey: string) => {
    setSelectedService(serviceKey);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <section id="services" className="py-16 md:py-20 bg-gradient-to-b from-white to-elvec-50">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <SectionTitle 
              title="Nos Services BTP" 
              subtitle="Des solutions complètes pour tous vos projets de construction et d'infrastructure"
              centered
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {constructionServices.map((service, index) => (
              <ServiceCard
                key={service.key}
                title={service.title}
                description={service.description}
                icon={service.icon}
                delay={index * 50}
                onClick={() => handleServiceClick(service.key)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedService && servicesDetails[selectedService] && (
        <ServiceModal
          isOpen={!!selectedService}
          onClose={handleCloseModal}
          service={servicesDetails[selectedService]}
        />
      )}
    </>
  );
};

export default Services;
