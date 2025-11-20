import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { FileText, Eye, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';

interface Quote {
  id: string;
  nom: string;
  telephone: string;
  email: string | null;
  adresse: string | null;
  besoin: string;
  status: string;
  notes: string | null;
  created_at: string;
}

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadQuotes();
    
    const channel = supabase
      .channel('quotes_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'quotes' }, () => {
        loadQuotes();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadQuotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erreur lors du chargement des devis');
      console.error(error);
    } else {
      setQuotes(data || []);
    }
    setLoading(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedQuote) return;
    
    setUpdatingStatus(true);
    const { error } = await supabase
      .from('quotes')
      .update({ 
        status: newStatus,
        notes: notes || null
      })
      .eq('id', selectedQuote.id);

    if (error) {
      toast.error('Erreur lors de la mise à jour');
    } else {
      toast.success('Statut mis à jour avec succès');
      setDetailsOpen(false);
      loadQuotes();
    }
    setUpdatingStatus(false);
  };

  const openDetails = (quote: Quote) => {
    setSelectedQuote(quote);
    setNotes(quote.notes || '');
    setDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredQuotes = quotes.filter(quote => 
    filter === 'all' || quote.status === filter
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demandes de Devis</h1>
          <p className="text-gray-600 mt-1">Gérez toutes les demandes de devis</p>
        </div>

        <div className="flex gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="completed">Traité</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Chargement...</p>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune demande de devis pour le moment</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredQuotes.map((quote) => (
              <div key={quote.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{quote.nom}</h3>
                      <StatusBadge status={quote.status} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-elvec-600" />
                        {quote.telephone}
                      </div>
                      {quote.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2 text-elvec-600" />
                          {quote.email}
                        </div>
                      )}
                      {quote.adresse && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-elvec-600" />
                          {quote.adresse}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-elvec-600" />
                        {new Date(quote.created_at).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Besoin :</p>
                      <p className="text-sm text-gray-600 line-clamp-2">{quote.besoin}</p>
                    </div>
                  </div>

                  <Button onClick={() => openDetails(quote)} size="sm" className="ml-4">
                    <Eye className="h-4 w-4 mr-2" />
                    Détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la demande</DialogTitle>
            <DialogDescription>
              Demande de devis de {selectedQuote?.nom}
            </DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom</label>
                  <p className="text-sm text-gray-900">{selectedQuote.nom}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Téléphone</label>
                  <p className="text-sm text-gray-900">{selectedQuote.telephone}</p>
                </div>
                {selectedQuote.email && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedQuote.email}</p>
                  </div>
                )}
                {selectedQuote.adresse && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Adresse</label>
                    <p className="text-sm text-gray-900">{selectedQuote.adresse}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Besoin</label>
                <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
                  {selectedQuote.besoin}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Statut</label>
                <Select
                  value={selectedQuote.status}
                  onValueChange={handleStatusChange}
                  disabled={updatingStatus}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="completed">Traité</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Notes internes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez des notes sur cette demande..."
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              Fermer
            </Button>
            <Button onClick={() => handleStatusChange(selectedQuote?.status || 'pending')} disabled={updatingStatus}>
              {updatingStatus ? 'Enregistrement...' : 'Sauvegarder les notes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Quotes;
