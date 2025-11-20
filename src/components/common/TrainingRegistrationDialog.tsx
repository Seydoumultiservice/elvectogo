import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { GraduationCap, Loader2, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  fullName: z.string().min(2, "Le nom complet doit contenir au moins 2 caractères"),
  phone: z.string().min(8, "Le numéro de téléphone doit contenir au moins 8 chiffres"),
  email: z.string().email("Email invalide").optional().or(z.literal('')),
  formationType: z.string().min(1, "Veuillez sélectionner un type de formation"),
  experienceLevel: z.string().optional(),
  desiredDate: z.string().optional(),
  message: z.string().optional(),
});

interface TrainingRegistrationDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TrainingRegistrationDialog = ({ children, open: controlledOpen, onOpenChange }: TrainingRegistrationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const dialogOpen = isControlled ? controlledOpen : open;
  const setDialogOpen = isControlled ? onOpenChange! : setOpen;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      formationType: '',
      experienceLevel: 'debutant',
      desiredDate: '',
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('training_registrations')
        .insert([{
          nom_complet: values.fullName,
          telephone: values.phone,
          email: values.email || null,
          formation_type: values.formationType,
          niveau_experience: values.experienceLevel || null,
          date_souhaitee: values.desiredDate || null,
          message: values.message || null
        }]);

      if (error) throw error;

      setDialogOpen(false);
      toast.success("Votre inscription a été envoyée avec succès !", {
        description: "Notre équipe vous contactera pour confirmer votre inscription."
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting registration:', error);
      toast.error("Une erreur est survenue lors de l'envoi de votre inscription.", {
        description: "Veuillez réessayer plus tard."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <GraduationCap className="h-6 w-6 text-elvec-600" />
            Inscription à la Formation
          </DialogTitle>
          <DialogDescription>
            Remplissez ce formulaire pour vous inscrire à nos formations professionnelles en conduite d'engins lourds.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom Complet *</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre nom complet" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone *</FormLabel>
                  <FormControl>
                    <Input placeholder="+228 XX XX XX XX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (optionnel)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="votre.email@exemple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="formationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de Formation *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une formation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="tractopelle">Tractopelle</SelectItem>
                      <SelectItem value="bulldozer">Bulldozer</SelectItem>
                      <SelectItem value="excavatrice">Excavatrice</SelectItem>
                      <SelectItem value="niveleuse">Niveleuse</SelectItem>
                      <SelectItem value="compacteur">Compacteur</SelectItem>
                      <SelectItem value="chargeuse">Chargeuse</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau d'Expérience</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="debutant">Débutant</SelectItem>
                      <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                      <SelectItem value="avance">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desiredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Souhaitée (optionnel)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="date" {...field} className="pl-10" />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Additionnel (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Des questions ou informations supplémentaires..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-elvec-600 hover:bg-elvec-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    S'inscrire
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TrainingRegistrationDialog;
