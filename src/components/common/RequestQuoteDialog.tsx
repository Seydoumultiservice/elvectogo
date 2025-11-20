
import { useState, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Mic, Upload, X, Send } from 'lucide-react';
import { toast } from 'sonner';
import VoiceRecorder from './VoiceRecorder';
import { supabase } from '@/integrations/supabase/client';

// 45MB in bytes
const MAX_FILE_SIZE = 45 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg", 
  "image/png", 
  "image/gif", 
  "application/pdf", 
  "video/mp4", 
  "video/quicktime"
];

const formSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  telephone: z.string().min(8, "Le numéro de téléphone est requis"),
  email: z.string().email("Email invalide").optional().or(z.literal('')),
  adresse: z.string().optional(),
  besoin: z.string().min(10, "Veuillez décrire votre besoin"),
});

type RequestQuoteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const RequestQuoteDialog = ({ open, onOpenChange }: RequestQuoteDialogProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [hasVoiceMessage, setHasVoiceMessage] = useState(false);
  const [voiceMessageBlob, setVoiceMessageBlob] = useState<Blob | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: '',
      telephone: '',
      email: '',
      adresse: '',
      besoin: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: File[] = [];
    let totalSize = 0;
    
    // Calculate current files size
    files.forEach(file => totalSize += file.size);
    
    // Check each new file
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Check file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast.error(`Le type de fichier ${file.type} n'est pas pris en charge.`);
        continue;
      }
      
      // Check if adding this file would exceed the size limit
      if (totalSize + file.size > MAX_FILE_SIZE) {
        toast.error("La taille totale des fichiers ne doit pas dépasser 45 Mo.");
        break;
      }
      
      totalSize += file.size;
      newFiles.push(file);
    }
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleVoiceMessageReady = (audioBlob: Blob) => {
    setVoiceMessageBlob(audioBlob);
    setHasVoiceMessage(true);
  };
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('quotes')
        .insert([{
          nom: values.nom,
          telephone: values.telephone,
          email: values.email || null,
          adresse: values.adresse || null,
          besoin: values.besoin
        }]);

      if (error) throw error;

      toast.success("Votre demande de devis a été envoyée avec succès!");
      
      form.reset();
      setFiles([]);
      setHasVoiceMessage(false);
      setVoiceMessageBlob(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return size + ' octets';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' Ko';
    } else {
      return (size / (1024 * 1024)).toFixed(2) + ' Mo';
    }
  };
  
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  const fileIcon = (type: string) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎬';
    if (type === 'application/pdf') return '📄';
    return '📎';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-elvec-800">Demande de Devis</DialogTitle>
          <DialogDescription>
            Décrivez vos besoins et nous vous contacterons rapidement avec un devis personnalisé.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="+228 XX XX XX XX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="votre@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="adresse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre adresse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="besoin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description de vos besoins <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez en détail vos besoins (type d'engin, durée, lieu, etc.)" 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-3">
              <label className="block text-sm font-medium">Pièces jointes</label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4" />
                  Ajouter des fichiers
                </Button>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(totalSize)} / 45 Mo
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                  accept="image/*,application/pdf,video/*"
                />
              </div>
              
              {files.length > 0 && (
                <div className="bg-muted/30 rounded-md p-3 space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-sm bg-white p-2 rounded">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span>{fileIcon(file.type)}</span>
                        <span className="truncate">{file.name}</span>
                        <span className="text-muted-foreground">({formatFileSize(file.size)})</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <label className="block text-sm font-medium mb-2">Message vocal</label>
              <VoiceRecorder onVoiceMessageReady={handleVoiceMessageReady} />
              
              {hasVoiceMessage && (
                <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-md text-sm">
                  Message vocal enregistré et prêt à être envoyé!
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-elvec-600 hover:bg-elvec-700"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">*</span> Champs obligatoires
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestQuoteDialog;
