import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/common/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, DollarSign, GraduationCap, CheckCircle } from 'lucide-react';
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
            title="Formations Disponibles"
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
          ) : (
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
          )}

          {filteredFormations?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucune formation disponible pour ce niveau.
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