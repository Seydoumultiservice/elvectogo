
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SectionTitle from '../common/SectionTitle';
import AnimatedSection from '../animations/AnimatedSection';
import VehicleCard from './VehicleCard';
import { Hammer, Package, Construction } from 'lucide-react';

// Définition des données des engins lourds
const terrassementEngins = [
  {
    id: 'excavator-cat320',
    name: 'Excavatrice CAT 320',
    image: '/engins/excavator-1.jpg',
    year: 2022,
    capacity: 'Godet : 1,2 m³',
    power: '121 HP',
    description: 'Excavatrice hydraulique performante pour tous types de travaux de terrassement et fondations.',
    category: 'terrassement'
  },
  {
    id: 'bulldozer-d6',
    name: 'Bulldozer CAT D6',
    image: '/lovable-uploads/bulldozer-action.jpg',
    year: 2021,
    capacity: 'Lame : 3,5 m³',
    power: '215 HP',
    description: 'Bulldozer puissant idéal pour le nivellement, défrichage et travaux de terrassement lourds.',
    category: 'terrassement'
  },
  {
    id: 'grader-140',
    name: 'Niveleuse CAT 140',
    image: '/engins/grader-1.jpg',
    year: 2023,
    capacity: 'Lame : 3,7 m',
    power: '170 HP',
    description: 'Niveleuse de précision pour l\'entretien des routes et le nivellement des surfaces.',
    category: 'terrassement'
  },
  {
    id: 'backhoe-jcb',
    name: 'Chargeuse-Pelleteuse JCB',
    image: '/lovable-uploads/excavation-chantier.jpg',
    year: 2022,
    capacity: 'Godet : 0,9 m³',
    power: '97 HP',
    description: 'Engin polyvalent pour excavation, chargement et travaux de construction urbains.',
    category: 'terrassement'
  }
];

const manutentionEngins = [
  {
    id: 'loader-cat950',
    name: 'Chargeur CAT 950',
    image: '/lovable-uploads/engin-komatsu.jpg',
    year: 2023,
    capacity: 'Godet : 3,5 m³',
    power: '195 HP',
    description: 'Chargeuse sur pneus robuste pour le chargement de matériaux et manutention intensive.',
    category: 'manutention'
  },
  {
    id: 'dump-truck',
    name: 'Camion-Benne 6x4',
    image: '/engins/dump-truck-1.jpg',
    year: 2022,
    capacity: 'Benne : 15 m³',
    power: '380 HP',
    description: 'Camion-benne haute capacité pour le transport de matériaux sur chantier et routes.',
    category: 'manutention'
  },
  {
    id: 'crane-mobile',
    name: 'Grue Mobile 50T',
    image: '/engins/crane-1.jpg',
    year: 2021,
    capacity: 'Levage : 50 tonnes',
    power: '350 HP',
    description: 'Grue mobile télescopique pour levage de charges lourdes et montage de structures.',
    category: 'manutention'
  },
  {
    id: 'telehandler',
    name: 'Chariot Télescopique',
    image: '/lovable-uploads/manutention-port-lome.jpg',
    year: 2023,
    capacity: 'Levage : 3,5 tonnes',
    power: '100 HP',
    description: 'Chariot élévateur télescopique polyvalent pour manutention en hauteur et zones difficiles.',
    category: 'manutention'
  }
];

const compactageEngins = [
  {
    id: 'compactor-single',
    name: 'Compacteur Monocylindre',
    image: '/lovable-uploads/engin-bank-of-africa.jpg',
    year: 2022,
    capacity: 'Largeur : 2,1 m',
    power: '129 HP',
    description: 'Compacteur vibrant pour routes, sols et bases de chaussée, finition professionnelle.',
    category: 'compactage'
  },
  {
    id: 'compactor-tandem',
    name: 'Compacteur Tandem',
    image: '/lovable-uploads/excavatrice-port-lome.jpg',
    year: 2023,
    capacity: 'Largeur : 1,5 m',
    power: '45 HP',
    description: 'Compacteur double cylindre pour asphalte, offrant une finition lisse et uniforme.',
    category: 'compactage'
  },
  {
    id: 'plate-compactor',
    name: 'Plaque Vibrante',
    image: '/engins/bulldozer-1.jpg',
    year: 2023,
    capacity: 'Largeur : 60 cm',
    power: '5,5 HP',
    description: 'Plaque vibrante compacte pour compactage de tranchées et espaces restreints.',
    category: 'compactage'
  },
  {
    id: 'sheepsfoot-roller',
    name: 'Compacteur à Pieds Dameurs',
    image: '/lovable-uploads/agent-elvec-chantier.jpg',
    year: 2021,
    capacity: 'Largeur : 2,0 m',
    power: '145 HP',
    description: 'Rouleau à pieds dameurs pour compactage de sols argileux et remblais.',
    category: 'compactage'
  }
];

// Tous les engins combinés
const allEngins = [...terrassementEngins, ...manutentionEngins, ...compactageEngins];

const VehicleCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <section className="py-20" id="categories">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionTitle 
            title="Notre parc d'engins lourds" 
            subtitle="Découvrez nos engins de chantier performants pour tous vos travaux"
            centered
          />
        </AnimatedSection>

        <AnimatedSection>
          <Tabs defaultValue="all" className="w-full mt-8" onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-4 mb-8 w-full md:w-fit mx-auto">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="terrassement" className="flex items-center gap-2">
                <Hammer className="h-4 w-4" /> Terrassement
              </TabsTrigger>
              <TabsTrigger value="manutention" className="flex items-center gap-2">
                <Package className="h-4 w-4" /> Manutention
              </TabsTrigger>
              <TabsTrigger value="compactage" className="flex items-center gap-2">
                <Construction className="h-4 w-4" /> Compactage
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allEngins.map((engin) => (
                  <VehicleCard key={engin.id} vehicle={engin} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="terrassement" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {terrassementEngins.map((engin) => (
                  <VehicleCard key={engin.id} vehicle={engin} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="manutention" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {manutentionEngins.map((engin) => (
                  <VehicleCard key={engin.id} vehicle={engin} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="compactage" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {compactageEngins.map((engin) => (
                  <VehicleCard key={engin.id} vehicle={engin} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default VehicleCategories;
