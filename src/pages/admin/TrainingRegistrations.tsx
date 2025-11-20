import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { GraduationCap, Eye } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';

interface TrainingRegistration {
  id: string;
  nom_complet: string;
  telephone: string;
  email: string | null;
  formation_type: string;
  niveau_experience: string | null;
  date_souhaitee: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const TrainingRegistrations = () => {
  const [registrations, setRegistrations] = useState<TrainingRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedRegistration, setSelectedRegistration] = useState<TrainingRegistration | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadRegistrations();
    
    const channel = supabase
      .channel('training_registrations_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'training_registrations' }, () => {
        loadRegistrations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadRegistrations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('training_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Erreur lors du chargement des inscriptions');
      console.error(error);
    } else {
      setRegistrations(data || []);
    }
    setLoading(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedRegistration) return;
    
    setUpdatingStatus(true);
    const { error } = await supabase
      .from('training_registrations')
      .update({ 
        status: newStatus,
        notes: notes || null
      })
      .eq('id', selectedRegistration.id);

    if (error) {
      toast.error('Erreur lors de la mise à jour');
    } else {
      toast.success('Statut mis à jour avec succès');
      setDetailsOpen(false);
      loadRegistrations();
    }
    setUpdatingStatus(false);
  };

  const openDetails = (registration: TrainingRegistration) => {
    setSelectedRegistration(registration);
    setNotes(registration.notes || '');
    setDetailsOpen(true);
  };

  const getFormationLabel = (type: string) => {
    const labels: Record<string, string> = {
      'tractopelle': 'Tractopelle',
      'bulldozer': 'Bulldozer',
      'excavatrice': 'Excavatrice',
      'niveleuse': 'Niveleuse',
      'compacteur': 'Compacteur',
      'chargeuse': 'Chargeuse',
    };
    return labels[type] || type;
  };

  const getNiveauLabel = (niveau: string | null) => {
    if (!niveau) return 'Non spécifié';
    const labels: Record<string, string> = {
      'debutant': 'Débutant',
      'intermediaire': 'Intermédiaire',
      'avance': 'Avancé',
    };
    return labels[niveau] || niveau;
  };

  const filteredRegistrations = registrations.filter(registration => {
    const matchesStatus = filter === 'all' || registration.status === filter;
    const matchesType = typeFilter === 'all' || registration.formation_type === typeFilter;
    return matchesStatus && matchesType;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inscriptions aux Formations</h1>
          <p className="text-gray-600 mt-1">Gérez toutes les demandes d'inscription</p>
        </div>

        <div className="flex gap-4">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Type de formation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="tractopelle">Tractopelle</SelectItem>
              <SelectItem value="bulldozer">Bulldozer</SelectItem>
              <SelectItem value="excavatrice">Excavatrice</SelectItem>
              <SelectItem value="niveleuse">Niveleuse</SelectItem>
              <SelectItem value="compacteur">Compacteur</SelectItem>
              <SelectItem value="chargeuse">Chargeuse</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="confirmed">Confirmé</SelectItem>
              <SelectItem value="completed">Complété</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Chargement...</p>
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune inscription pour le moment</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredRegistrations.map((registration) => (
              <div key={registration.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{registration.nom_complet}</h3>
                      <StatusBadge status={registration.status} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Téléphone: </span>
                        <span className="text-gray-600">{registration.telephone}</span>
                      </div>
                      {registration.email && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Email: </span>
                          <span className="text-gray-600">{registration.email}</span>
                        </div>
                      )}
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Formation: </span>
                        <span className="text-gray-600">{getFormationLabel(registration.formation_type)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Niveau: </span>
                        <span className="text-gray-600">{getNiveauLabel(registration.niveau_experience)}</span>
                      </div>
                      {registration.date_souhaitee && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Date souhaitée: </span>
                          <span className="text-gray-600">
                            {new Date(registration.date_souhaitee).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      )}
                      <div className="text-sm">
                        <span className="font-medium text-gray-700">Inscrit le: </span>
                        <span className="text-gray-600">
                          {new Date(registration.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    {registration.message && (
                      <div className="bg-gray-50 rounded p-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Message :</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{registration.message}</p>
                      </div>
                    )}
                  </div>

                  <Button onClick={() => openDetails(registration)} size="sm" className="ml-4">
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
            <DialogTitle>Détails de l'inscription</DialogTitle>
            <DialogDescription>
              Inscription de {selectedRegistration?.nom_complet}
            </DialogDescription>
          </DialogHeader>

          {selectedRegistration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom complet</label>
                  <p className="text-sm text-gray-900">{selectedRegistration.nom_complet}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Téléphone</label>
                  <p className="text-sm text-gray-900">{selectedRegistration.telephone}</p>
                </div>
                {selectedRegistration.email && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedRegistration.email}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700">Formation</label>
                  <p className="text-sm text-gray-900">{getFormationLabel(selectedRegistration.formation_type)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Niveau d'expérience</label>
                  <p className="text-sm text-gray-900">{getNiveauLabel(selectedRegistration.niveau_experience)}</p>
                </div>
                {selectedRegistration.date_souhaitee && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date souhaitée</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedRegistration.date_souhaitee).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>

              {selectedRegistration.message && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
                    {selectedRegistration.message}
                  </p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Statut</label>
                <Select
                  value={selectedRegistration.status}
                  onValueChange={handleStatusChange}
                  disabled={updatingStatus}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="confirmed">Confirmé</SelectItem>
                    <SelectItem value="completed">Complété</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Notes internes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ajoutez des notes sur cette inscription..."
                  rows={4}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              Fermer
            </Button>
            <Button onClick={() => handleStatusChange(selectedRegistration?.status || 'pending')} disabled={updatingStatus}>
              {updatingStatus ? 'Enregistrement...' : 'Sauvegarder les notes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default TrainingRegistrations;
