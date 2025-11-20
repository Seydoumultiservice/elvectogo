import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, FileText, Phone, Mail, MapPin, Calendar, Eye, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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
  const { signOut, user } = useAuth();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadQuotes();
    
    // Real-time subscription
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
      case 'en_cours': return 'bg-blue-500';
      case 'traite': return 'bg-green-500';
      case 'refuse': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'en_cours': return 'En cours';
      case 'traite': return 'Traité';
      case 'refuse': return 'Refusé';
      default: return status;
    }
  };

  const filteredQuotes = quotes.filter(quote => 
    filter === 'all' || quote.status === filter
  );

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Erreur lors de la déconnexion');
    } else {
      toast.success('Déconnexion réussie');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/lovable-uploads/2b8380f1-7282-4343-a0a8-40704b599087.png" alt="ELVEC TOGO" className="h-12" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Administration ELVEC</h1>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outline">Voir le site</Button>
              </Link>
              <Button variant="destructive" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="h-8 w-8 text-elvec-600" />
                Demandes de Devis
              </h2>
              <p className="text-gray-600 mt-1">{filteredQuotes.length} demande(s)</p>
            </div>
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="en_cours">En cours</SelectItem>
              <SelectItem value="traite">Traité</SelectItem>
              <SelectItem value="refuse">Refusé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-elvec-600" />
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
                      <Badge className={getStatusColor(quote.status)}>
                        {getStatusLabel(quote.status)}
                      </Badge>
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
      </main>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de la demande</DialogTitle>
            <DialogDescription>
              Consultez et gérez cette demande de devis
            </DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom</label>
                  <p className="text-gray-900">{selectedQuote.nom}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Téléphone</label>
                  <p className="text-gray-900">{selectedQuote.telephone}</p>
                </div>
                {selectedQuote.email && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{selectedQuote.email}</p>
                  </div>
                )}
                {selectedQuote.adresse && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Adresse</label>
                    <p className="text-gray-900">{selectedQuote.adresse}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Besoin</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded mt-1">{selectedQuote.besoin}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Statut</label>
                <Select 
                  value={selectedQuote.status} 
                  onValueChange={(value) => setSelectedQuote({...selectedQuote, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="en_cours">En cours</SelectItem>
                    <SelectItem value="traite">Traité</SelectItem>
                    <SelectItem value="refuse">Refusé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Notes internes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez des notes..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setDetailsOpen(false)} className="flex-1">
                  Annuler
                </Button>
                <Button 
                  onClick={() => handleStatusChange(selectedQuote.status)} 
                  className="flex-1 bg-elvec-600 hover:bg-elvec-700"
                  disabled={updatingStatus}
                >
                  {updatingStatus ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    'Enregistrer'
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Quotes;
