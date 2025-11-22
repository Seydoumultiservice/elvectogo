import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Bell, FileText, GraduationCap, MessageSquare } from 'lucide-react';

const RealtimeNotifications = () => {
  useEffect(() => {
    // Channel pour les nouveaux devis
    const quotesChannel = supabase
      .channel('quotes-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'quotes'
        },
        (payload) => {
          const newQuote = payload.new as any;
          toast.success(
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-semibold">Nouveau devis reçu</p>
                <p className="text-sm text-muted-foreground">{newQuote.nom}</p>
              </div>
            </div>,
            { duration: 5000 }
          );
        }
      )
      .subscribe();

    // Channel pour les nouvelles inscriptions formation
    const trainingChannel = supabase
      .channel('training-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'training_registrations'
        },
        (payload) => {
          const newTraining = payload.new as any;
          toast.success(
            <div className="flex items-start gap-3">
              <GraduationCap className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-semibold">Nouvelle inscription formation</p>
                <p className="text-sm text-muted-foreground">{newTraining.nom_complet}</p>
              </div>
            </div>,
            { duration: 5000 }
          );
        }
      )
      .subscribe();

    // Channel pour les nouveaux messages
    const messagesChannel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_messages'
        },
        (payload) => {
          const newMessage = payload.new as any;
          toast.success(
            <div className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold">Nouveau message de contact</p>
                <p className="text-sm text-muted-foreground">{newMessage.nom}</p>
              </div>
            </div>,
            { duration: 5000 }
          );
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(quotesChannel);
      supabase.removeChannel(trainingChannel);
      supabase.removeChannel(messagesChannel);
    };
  }, []);

  return null; // Ce composant ne rend rien visuellement
};

export default RealtimeNotifications;
