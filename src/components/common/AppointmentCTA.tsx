import { useState } from 'react';
import { Calendar, Clock, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import AnimatedSection from '../animations/AnimatedSection';

const AppointmentCTA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    type: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `🗓️ *DEMANDE DE RENDEZ-VOUS*\n\n` +
      `👤 *Nom:* ${formData.name}\n` +
      `📱 *Téléphone:* ${formData.phone}\n` +
      `📅 *Date souhaitée:* ${formData.date}\n` +
      `🕐 *Heure:* ${formData.time}\n` +
      `📋 *Type:* ${formData.type}\n` +
      `💬 *Message:* ${formData.message || 'Aucun'}`;

    const whatsappUrl = `https://wa.me/22890940695?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('Votre demande de rendez-vous a été envoyée !');
    setIsOpen(false);
    setFormData({ name: '', phone: '', date: '', time: '', type: '', message: '' });
  };

  return (
    <>
      <AnimatedSection animationType="fade-in">
        <section className="py-16 bg-gradient-to-r from-elvec-600 to-elvec-500">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <Calendar className="h-16 w-16 mx-auto mb-6 animate-bounce" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prenez Rendez-vous avec Nos Experts
              </h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Besoin de discuter de votre projet ? Planifiez un rendez-vous avec notre équipe pour un devis personnalisé et des conseils d'experts.
              </p>
              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="bg-white text-elvec-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Prendre Rendez-vous
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Prendre Rendez-vous</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire ci-dessous pour planifier un rendez-vous avec notre équipe.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="name">Nom complet *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Votre nom"
              />
            </div>

            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+228 XX XX XX XX"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date souhaitée *</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="time">Heure *</Label>
                <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                    <SelectItem value="17:00">17:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="type">Type de rendez-vous *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="devis">Demande de devis</SelectItem>
                  <SelectItem value="visite">Visite de chantier</SelectItem>
                  <SelectItem value="formation">Information formation</SelectItem>
                  <SelectItem value="location">Location d'engins</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Décrivez brièvement l'objet de votre rendez-vous..."
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                Annuler
              </Button>
              <Button type="submit" className="flex-1 bg-elvec-600 hover:bg-elvec-700">
                <Send className="mr-2 h-4 w-4" />
                Envoyer
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentCTA;
