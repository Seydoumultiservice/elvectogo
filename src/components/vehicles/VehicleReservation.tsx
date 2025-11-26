import SectionTitle from '../common/SectionTitle';
import { Check } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface VehicleReservationProps {
  quoteDialogOpen: boolean;
  setQuoteDialogOpen: (open: boolean) => void;
}

const VehicleReservation = ({ quoteDialogOpen, setQuoteDialogOpen }: VehicleReservationProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nom_complet: '',
    email: '',
    telephone: '',
    vehicle_id: '',
    date_debut: '',
    date_fin: '',
    message: ''
  });

  const { data: vehicles } = useQuery({
    queryKey: ['available-vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('id, name')
        .eq('available', true);
      
      if (error) throw error;
      return data;
    }
  });

  const reasons = [
    "Large parc d'engins bien entretenus",
    "Engins performants et récents",
    "Service client disponible 24/7",
    "Maintenance régulière garantie",
    "Livraison sur site de chantier"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom_complet || !formData.telephone || !formData.vehicle_id || 
        !formData.date_debut || !formData.date_fin) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('vehicle_reservations')
        .insert({
          nom_complet: formData.nom_complet,
          email: formData.email || null,
          telephone: formData.telephone,
          vehicle_id: formData.vehicle_id,
          date_debut: formData.date_debut,
          date_fin: formData.date_fin,
          message: formData.message || null
        });

      if (error) throw error;

      toast({
        title: "Succès !",
        description: "Votre réservation a été enregistrée. Nous vous contacterons bientôt."
      });

      setFormData({
        nom_complet: '',
        email: '',
        telephone: '',
        vehicle_id: '',
        date_debut: '',
        date_fin: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre réservation",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-elvec-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle 
            title="Réservez votre engin" 
            subtitle="Simple, rapide et fiable"
            centered
          />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Profitez de notre service de location d'engins lourds pour tous vos chantiers et travaux au Togo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-elvec-500">
              <h3 className="text-xl font-bold text-elvec-600 mb-4">Pourquoi choisir ELVEC TOGO ?</h3>
              <ul className="space-y-3">
                {reasons.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-elvec-500 mr-2 h-5 w-5 mt-0.5" />
                    <span className="text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/location-voiture-elvec.png" 
                alt="Service de location ELVEC"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div>
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nom_complet">Nom complet *</Label>
                  <Input
                    id="nom_complet"
                    value={formData.nom_complet}
                    onChange={(e) => setFormData({ ...formData, nom_complet: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone">Téléphone *</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicle_id">Engin *</Label>
                  <Select value={formData.vehicle_id} onValueChange={(value) => setFormData({ ...formData, vehicle_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un engin" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles?.map((vehicle) => (
                        <SelectItem key={vehicle.id} value={vehicle.id}>
                          {vehicle.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date_debut">Date de début *</Label>
                    <Input
                      id="date_debut"
                      type="date"
                      value={formData.date_debut}
                      onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_fin">Date de fin *</Label>
                    <Input
                      id="date_fin"
                      type="date"
                      value={formData.date_fin}
                      onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (optionnel)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Envoi en cours...' : 'Réserver maintenant'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleReservation;
