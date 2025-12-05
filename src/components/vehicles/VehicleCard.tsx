
import { useState } from 'react';
import { Star, Calendar, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSection from '../animations/AnimatedSection';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface VehicleProps {
  vehicle: {
    id: string;
    name: string;
    image: string;
    year: number;
    capacity: string;
    power: string;
    description: string;
    category: string;
  };
}

const VehicleCard = ({ vehicle }: VehicleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    date_debut: '',
    date_fin: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.telephone || !formData.date_debut || !formData.date_fin) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const besoin = `Réservation engin: ${vehicle.name}\nPériode: du ${formData.date_debut} au ${formData.date_fin}\n${formData.message ? `Message: ${formData.message}` : ''}`;
      
      const { error } = await supabase
        .from('quotes')
        .insert({
          nom: formData.nom,
          email: formData.email || null,
          telephone: formData.telephone,
          besoin: besoin
        });

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: `Votre demande de réservation pour ${vehicle.name} a été envoyée avec succès.`
      });

      setDialogOpen(false);
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        date_debut: '',
        date_fin: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <AnimatedSection>
        <div 
          className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            <img 
              src={vehicle.image} 
              alt={vehicle.name} 
              className={cn(
                "w-full h-56 object-cover transition-transform duration-500",
                isHovered && "scale-105"
              )}
            />
            <div className="absolute top-0 right-0 bg-elvec-600 text-white text-xs px-3 py-1.5 m-2 rounded-md font-semibold">
              {vehicle.category === 'terrassement' && 'Terrassement'}
              {vehicle.category === 'manutention' && 'Manutention'}
              {vehicle.category === 'compactage' && 'Compactage'}
            </div>
          </div>
          
          <div className="p-5 flex-grow flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-elvec-900">{vehicle.name}</h3>
              <div className="flex items-center">
                <span className="text-yellow-500 flex">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 flex-grow">{vehicle.description}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-elvec-500" />
                <span className="font-medium">{vehicle.year}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Cog className="h-4 w-4 mr-2 text-elvec-500" />
                <span className="font-medium">{vehicle.power}</span>
              </div>
              <div className="flex items-center text-gray-600 col-span-2">
                <span className="text-elvec-700 font-semibold">{vehicle.capacity}</span>
              </div>
            </div>
            
            <div className="flex justify-center mt-auto pt-4 border-t border-gray-100">
              <button 
                onClick={() => setDialogOpen(true)}
                className="w-full bg-elvec-600 hover:bg-elvec-700 text-white px-6 py-2.5 rounded-lg text-base font-semibold transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Réserver cet engin
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Réserver {vehicle.name}</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire ci-dessous pour réserver cet engin.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet *
              </label>
              <Input
                value={formData.nom}
                onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                placeholder="Votre nom complet"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="votre@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone *
              </label>
              <Input
                value={formData.telephone}
                onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                placeholder="+228 XX XX XX XX"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date début *
                </label>
                <Input
                  type="date"
                  value={formData.date_debut}
                  onChange={(e) => setFormData(prev => ({ ...prev, date_debut: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date fin *
                </label>
                <Input
                  type="date"
                  value={formData.date_fin}
                  onChange={(e) => setFormData(prev => ({ ...prev, date_fin: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (optionnel)
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Détails supplémentaires sur votre projet..."
                rows={3}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VehicleCard;
