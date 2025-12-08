import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, DollarSign, GraduationCap, CheckCircle, Calendar, MapPin, Award } from 'lucide-react';
import TrainingRegistrationDialog from '@/components/common/TrainingRegistrationDialog';

interface Formation {
  id: string;
  titre: string;
  slug: string;
  description: string;
  duree: string;
  prix: number;
  niveau: string;
  image_url: string;
  programme: { titre: string; contenu: string }[];
  prerequis: string;
  ordre: number;
}

// Formation en vedette (manuelle)
const formationVedette = {
  id: 'formation-vedette',
  titre: 'Formation Conduite d\'Engins Lourds',
  description: 'Notre formation sur tractopelle t\'apprends à manier un engin clé dans le BTP et l\'agriculture, et obtiens ton attestation de formation professionnelle.',
  duree: '3 mois',
  prix: 300000,
  fraisInscription: 10000,
  dateDebut: '10 novembre 2025',
  lieu: 'Adidogomé Apédokoé Gbomamé, en face de l\'école SAKA VISION',
  image_url: '/lovable-uploads/formation-conduite-engins-lourds.jpg',
  avantages: [
    'Attestation de formation professionnelle',
    'EPI inclus avec l\'inscription',
    'Pratique sur engins réels',
    'Formateurs expérimentés'
  ]
};

const Formations = () => {
  const [selectedFormation, setSelectedFormation] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterNiveau, setFilterNiveau] = useState<string>('tous');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: formations, isLoading } = useQuery({
    queryKey: ['formations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('formations')
        .select('*')
        .eq('visible', true)
        .order('ordre', { ascending: true });

      if (error) throw error;
      return data as unknown as Formation[];
    },
  });

  const niveaux = ['tous', 'debutant', 'intermediaire', 'avance', 'tous niveaux'];

  const filteredFormations = formations?.filter(
    (f) => filterNiveau === 'tous' || f.niveau?.toLowerCase() === filterNiveau
  );

  const handleInscription = (formationType: string) => {
    setSelectedFormation(formationType);
    setDialogOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-r from-elvec-600 to-elvec-700">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Formations Professionnelles
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Développez vos compétences avec nos formations certifiées en conduite d'engins lourds
            </p>
          </div>
        </section>

        {/* Formation Vedette */}
        <section className="container mx-auto px-4 py-12">
          <SectionTitle
            title="Formation en Vedette"
            subtitle="Inscrivez-vous maintenant - Places limitées !"
          />
          
          <Card className="overflow-hidden bg-gradient-to-br from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 border-2 border-orange-200 dark:border-orange-800 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-80 lg:h-auto">
                <img
                  src={formationVedette.image_url}
                  alt={formationVedette.titre}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-red-500 text-white text-sm px-4 py-2 animate-pulse">
                  Places Limitées !
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-5xl font-black text-orange-500">03</span>
                    <span className="text-2xl font-bold text-elvec-600">MOIS</span>
                    <span className="text-lg text-muted-foreground">pour devenir des opérateurs qualifiés !</span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4">{formationVedette.titre}</h3>
                  <p className="text-muted-foreground mb-6">{formationVedette.description}</p>

                  {/* Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-elvec-100 dark:bg-elvec-900/30 p-4 rounded-xl text-center">
                      <Calendar className="w-6 h-6 mx-auto mb-2 text-elvec-600" />
                      <p className="text-xs text-muted-foreground">Début</p>
                      <p className="font-bold text-elvec-700 dark:text-elvec-400">{formationVedette.dateDebut}</p>
                    </div>
                    <div className="bg-elvec-100 dark:bg-elvec-900/30 p-4 rounded-xl text-center">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-elvec-600" />
                      <p className="text-xs text-muted-foreground">Durée</p>
                      <p className="font-bold text-elvec-700 dark:text-elvec-400">{formationVedette.duree}</p>
                    </div>
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-xl text-center">
                      <DollarSign className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                      <p className="text-xs text-muted-foreground">Prix</p>
                      <p className="font-bold text-orange-600">{formationVedette.prix.toLocaleString()} FCFA</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-elvec-50 dark:bg-elvec-900/20 border-l-4 border-elvec-500 p-4 rounded-r-lg mb-6">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-elvec-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-foreground">{formationVedette.lieu}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Inscription : {formationVedette.fraisInscription.toLocaleString()} FCFA • Donne droit au EPI
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Avantages */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {formationVedette.avantages.map((avantage, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{avantage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleInscription(formationVedette.titre)}
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-elvec-600 hover:from-orange-600 hover:to-elvec-700 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <GraduationCap className="w-5 h-5 mr-2" />
                  S'inscrire Maintenant
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Filters */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {niveaux.map((niveau) => (
              <Button
                key={niveau}
                variant={filterNiveau === niveau ? 'default' : 'outline'}
                onClick={() => setFilterNiveau(niveau)}
                className="capitalize"
              >
                {niveau}
              </Button>
            ))}
          </div>
        </section>

        {/* Formations List */}
        <section className="container mx-auto px-4 pb-20">
          <SectionTitle
            title="Autres Formations Disponibles"
            subtitle="Choisissez la formation qui correspond à vos objectifs"
          />

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <CardHeader>
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : filteredFormations && filteredFormations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFormations?.map((formation) => (
                <Card key={formation.id} className="group hover:shadow-xl transition-all duration-300">
                  {formation.image_url && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={formation.image_url}
                        alt={formation.titre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {formation.niveau && (
                        <Badge className="absolute top-4 right-4 bg-elvec-600 capitalize">
                          {formation.niveau}
                        </Badge>
                      )}
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-xl">{formation.titre}</CardTitle>
                    <CardDescription>{formation.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {formation.duree && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formation.duree}
                        </div>
                      )}
                      {formation.prix && (
                        <div className="flex items-center gap-1 font-semibold text-elvec-600">
                          <DollarSign className="h-4 w-4" />
                          {formation.prix.toLocaleString()} FCFA
                        </div>
                      )}
                    </div>

                    {formation.prerequis && (
                      <div className="text-sm">
                        <p className="font-semibold mb-1">Prérequis :</p>
                        <p className="text-muted-foreground">{formation.prerequis}</p>
                      </div>
                    )}

                    {formation.programme && formation.programme.length > 0 && (
                      <Accordion type="single" collapsible>
                        <AccordionItem value="programme">
                          <AccordionTrigger className="text-sm">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-4 w-4" />
                              Programme de formation
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 text-sm">
                              {formation.programme.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-elvec-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="font-medium">{item.titre}</p>
                                    {item.contenu && (
                                      <p className="text-muted-foreground">{item.contenu}</p>
                                    )}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={() => handleInscription(formation.titre)}
                      className="w-full bg-elvec-600 hover:bg-elvec-700"
                    >
                      S'inscrire à cette formation
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucune autre formation disponible pour le moment.
              </p>
            </div>
          )}
        </section>

        <TrainingRegistrationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </Layout>
  );
};

export default Formations;
