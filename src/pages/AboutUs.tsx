
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Building2, Tractor, Hammer } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';
import AnimatedSection from '../components/animations/AnimatedSection';
import ImageZoomModal from '../components/common/ImageZoomModal';

const AboutUs = () => {
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  
  const currentProjects = [
    { title: 'Construction ligne transport énergie 161 KV Kara - Mango - Dapaong', partner: 'KEC International Limited', icon: Building2 },
    { title: 'Extension du port Lomé Container Terminal', partner: 'Eiffage Génie Civil', icon: Building2 },
    { title: 'Phase II centrale solaire de Blitta', partner: 'Société Jackson', icon: Building2 },
    { title: 'Aménagement des voies du Rond-Point Port', partner: 'Port Autonome de Lomé', icon: Building2 },
    { title: 'Rénovation du Palais des Congrès de Lomé', partner: 'Société AKD', icon: Building2 }
  ];
  
  const values = [
    { title: 'Excellence', description: 'Notre engagement pour la qualité et le professionnalisme dans tous nos services.' },
    { title: 'Fiabilité', description: 'Nous tenons nos promesses et respectons nos engagements envers nos clients.' },
    { title: 'Innovation', description: 'Nous investissons dans les technologies et équipements les plus récents.' },
    { title: 'Satisfaction Client', description: 'La satisfaction de nos clients est notre priorité absolue.' }
  ];
  
  return (
    <Layout>
      <div className="bg-gradient-to-r from-elvec-900 to-elvec-800 text-white py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">À Propos d'ELVEC TOGO</h1>
              <p className="text-xl text-gray-300">Votre partenaire de confiance pour la location d'engins lourds et de véhicules avec chauffeur</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <AnimatedSection className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group cursor-pointer" onClick={() => setZoomImage("/lovable-uploads/equipe-directeur-2.jpg")}>
                  <img 
                    src="/lovable-uploads/equipe-directeur-2.jpg" 
                    alt="Directeur ELVEC TOGO" 
                    className="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105" 
                  />
                  <p className="text-center mt-2 font-semibold text-elvec-600">Directeur</p>
                </div>
                <div className="group cursor-pointer" onClick={() => setZoomImage("/lovable-uploads/directeur-materiel.jpg")}>
                  <img 
                    src="/lovable-uploads/directeur-materiel.jpg" 
                    alt="Directeur Matériel ELVEC TOGO" 
                    className="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105" 
                  />
                  <p className="text-center mt-2 font-semibold text-elvec-600">Directeur Matériel</p>
                </div>
                <div className="group cursor-pointer" onClick={() => setZoomImage("/lovable-uploads/assistante-direction.jpg")}>
                  <img 
                    src="/lovable-uploads/assistante-direction.jpg" 
                    alt="Assistante de Direction ELVEC TOGO" 
                    className="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105" 
                  />
                  <p className="text-center mt-2 font-semibold text-elvec-600">Assistante de Direction</p>
                </div>
                <div className="group cursor-pointer" onClick={() => setZoomImage("/lovable-uploads/bureau-elvec.jpg")}>
                  <img 
                    src="/lovable-uploads/bureau-elvec.jpg" 
                    alt="Chef Personnels ELVEC TOGO" 
                    className="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105" 
                  />
                  <p className="text-center mt-2 font-semibold text-elvec-600">Bureau ELVEC</p>
                </div>
                <div className="group cursor-pointer" onClick={() => setZoomImage("/lovable-uploads/equipe-bureau-nouveau.jpg")}>
                  <img 
                    src="/lovable-uploads/equipe-bureau-nouveau.jpg" 
                    alt="Équipe Bureau ELVEC TOGO" 
                    className="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105" 
                  />
                  <p className="text-center mt-2 font-semibold text-elvec-600">Équipe Bureau</p>
                </div>
                <div className="group cursor-pointer" onClick={() => setZoomImage("/lovable-uploads/equipe-directeur.jpg")}>
                  <img 
                    src="/lovable-uploads/equipe-elvec-2025.jpg" 
                    alt="Équipe ELVEC TOGO" 
                    className="rounded-lg shadow-lg w-full h-64 object-cover hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105" 
                  />
                  <p className="text-center mt-2 font-semibold text-elvec-600">Équipe ELVEC TOGO</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animationType="slide-right" className="w-full lg:w-1/2">
              <SectionTitle title="Qui Sommes-Nous ?" className="mb-6 lg:text-left" />
              <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-elvec-600">
                <p className="text-gray-700 leading-relaxed mb-4"><strong>ELVEC TOGO</strong> est une entreprise spécialisée dans la location d'engins lourds et de véhicules avec chauffeur, pour vos projets de construction et d'aménagement.</p>
                <p className="text-gray-700 leading-relaxed mb-4">Nous mettons à disposition une flotte variée, incluant des <strong>bulldozers</strong>, des <strong>pelles excavatrices</strong>, des <strong>chargeuses</strong>, des <strong>compacteurs</strong> et des <strong>camions-bennes</strong>.</p>
                <p className="text-gray-700 leading-relaxed">Grâce à des équipements modernes et un service fiable, Elvec Togo se positionne comme un partenaire de choix pour répondre à tous vos besoins en matériel de chantier.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <SectionTitle title="Notre Équipe en Action" subtitle="Nos agents et nos engins sur le terrain" centered />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
            <AnimatedSection animationType="slide-up">
              <div className="group cursor-pointer" onClick={() => setZoomImage("/lovable-uploads/equipe-action-1.jpg")}>
                <img 
                  src="/lovable-uploads/equipe-action-1.jpg" 
                  alt="Agent ELVEC avec engin sur chantier" 
                  className="rounded-lg shadow-lg w-full h-80 object-cover hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105" 
                />
                <p className="text-center mt-3 font-semibold text-elvec-600">Nos Agents au Travail</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animationType="slide-up">
              <div className="group cursor-pointer" onClick={() => setZoomImage("/lovable-uploads/equipe-action-2.jpg")}>
                <img 
                  src="/lovable-uploads/equipe-action-2.jpg" 
                  alt="Équipe ELVEC avec équipements de chantier" 
                  className="rounded-lg shadow-lg w-full h-80 object-cover hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105" 
                />
                <p className="text-center mt-3 font-semibold text-elvec-600">Professionnalisme & Expertise</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16 bg-elvec-50">
        <div className="container mx-auto px-4">
          <AnimatedSection><SectionTitle title="🛠️ NOS OFFRES DE SERVICES" subtitle="Deux secteurs d'activité pour répondre à tous vos besoins" centered /></AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
            <AnimatedSection delay={100}>
              <div className="bg-white rounded-lg shadow-lg p-8 h-full border-t-4 border-elvec-600">
                <div className="flex items-center mb-4">
                  <div className="bg-elvec-100 p-3 rounded-full mr-4"><Building2 className="w-8 h-8 text-elvec-600" /></div>
                  <h3 className="text-2xl font-bold text-elvec-900">01 SERVICES BTP</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">Dans le secteur du BTP, nous accompagnons les entreprises dans la construction des bâtiments, routes et ouvrages divers. Nous mettons à leur disposition des engins et équipements de qualité, ainsi que des équipes qualifiées pour l'exécution des travaux.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="bg-white rounded-lg shadow-lg p-8 h-full border-t-4 border-elvec-600">
                <div className="flex items-center mb-4">
                  <div className="bg-elvec-100 p-3 rounded-full mr-4"><Tractor className="w-8 h-8 text-elvec-600" /></div>
                  <h3 className="text-2xl font-bold text-elvec-900">🌾 02 SERVICES AGRICOLES</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">Dans le secteur agricole, nous accompagnons les exploitations agricoles dans la mécanisation de leurs cultures et les travaux de bulldozers. L'entreprise propose des services de dessouchage, de nivellement, de labour, de transport, de mise en culture, etc.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection><SectionTitle title="🏗️ PROJETS EN COURS AU TOGO" subtitle="Nos références et collaborations actuelles" centered /></AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {currentProjects.map((project, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-elvec-600">
                  <div className="flex items-start mb-3">
                    <project.icon className="w-6 h-6 text-elvec-600 mr-3 flex-shrink-0 mt-1" />
                    <h4 className="font-semibold text-gray-900 text-lg">{project.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm"><span className="font-medium">Partenaire:</span> {project.partner}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-elvec-900 text-white">
        <div className="container mx-auto px-4">
          <AnimatedSection><SectionTitle title="Nos Valeurs" subtitle="Les principes qui guident notre action" centered className="text-white" /></AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 100}>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-elvec-400" />
                  <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-elvec-600 to-elvec-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Prêt à Démarrer Votre Projet ?</h2>
            <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto">Contactez-nous dès aujourd'hui pour discuter de vos besoins.</p>
            <Link to="/contact"><Button size="lg" variant="secondary">Nous Contacter</Button></Link>
          </AnimatedSection>
        </div>
      </section>

      <ImageZoomModal 
        isOpen={!!zoomImage} 
        onClose={() => setZoomImage(null)} 
        imageUrl={zoomImage || ''} 
      />
    </Layout>
  );
};

export default AboutUs;
