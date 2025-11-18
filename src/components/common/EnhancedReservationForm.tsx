import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Clock, User, Phone as PhoneIcon, Mail } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const EnhancedReservationForm = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicleType: '',
    duration: '',
    message: ''
  });

  const vehicleTypes = [
    'Berline',
    'SUV',
    '4x4',
    'Minibus',
    'Véhicule de luxe'
  ];

  const durations = [
    '1-3 jours',
    '4-7 jours',
    '1-2 semaines',
    '3-4 semaines',
    'Plus d\'un mois'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.name || !formData.phone || !formData.vehicleType || !formData.duration) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const message = `*Nouvelle Réservation ELVEC TOGO*%0A%0A` +
      `👤 *Nom:* ${formData.name}%0A` +
      `📱 *Téléphone:* ${formData.phone}%0A` +
      `📧 *Email:* ${formData.email || 'Non fourni'}%0A` +
      `🚗 *Type de véhicule:* ${formData.vehicleType}%0A` +
      `📅 *Date souhaitée:* ${format(date, 'PPP', { locale: fr })}%0A` +
      `⏱️ *Durée:* ${formData.duration}%0A` +
      `💬 *Message:* ${formData.message || 'Aucun message'}`;

    window.open(`https://wa.me/22890940695?text=${message}`, '_blank');
    
    toast.success('Votre demande va être envoyée via WhatsApp');
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      vehicleType: '',
      duration: '',
      message: ''
    });
    setDate(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Nom complet *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Votre nom"
            required
            className="border-elvec-200 focus:border-elvec-500"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4" />
            Téléphone *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+228 XX XX XX XX"
            required
            className="border-elvec-200 focus:border-elvec-500"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email (optionnel)
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="votre@email.com"
            className="border-elvec-200 focus:border-elvec-500"
          />
        </div>

        {/* Vehicle Type */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            Type de véhicule *
          </Label>
          <Select 
            value={formData.vehicleType} 
            onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
            required
          >
            <SelectTrigger className="border-elvec-200 focus:border-elvec-500">
              <SelectValue placeholder="Choisir un type" />
            </SelectTrigger>
            <SelectContent>
              {vehicleTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Date souhaitée *
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-elvec-200 hover:border-elvec-500",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP', { locale: fr }) : <span>Choisir une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Durée de location *
          </Label>
          <Select 
            value={formData.duration} 
            onValueChange={(value) => setFormData({ ...formData, duration: value })}
            required
          >
            <SelectTrigger className="border-elvec-200 focus:border-elvec-500">
              <SelectValue placeholder="Choisir une durée" />
            </SelectTrigger>
            <SelectContent>
              {durations.map((duration) => (
                <SelectItem key={duration} value={duration}>{duration}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">
          Message (optionnel)
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Informations complémentaires sur votre réservation..."
          rows={4}
          className="border-elvec-200 focus:border-elvec-500"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-6 text-lg font-semibold"
      >
        Envoyer la demande via WhatsApp
      </Button>

      <p className="text-sm text-gray-500 text-center">
        * Champs obligatoires
      </p>
    </form>
  );
};

export default EnhancedReservationForm;
