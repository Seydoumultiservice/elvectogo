import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ArrowLeft, GraduationCap, Phone, Mail, Calendar, Eye, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

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
  const { signOut, user } = useAuth();
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
    
    // Real-time subscription
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'accepte': return 'bg-green-500';
      case 'rejete': return 'bg-red-500';
      case 'complete': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepte': return 'Accepté';
      case 'rejete': return 'Rejeté';
      case 'complete': return 'Complété';
      default: return status;
    }
  };

  const getFormationLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getNiveauLabel = (niveau: string | null) => {
    if (!niveau) return '-';
    switch (niveau) {
      case 'debutant': return 'Débutant';
      case 'intermediaire': return 'Intermédiaire';
      case 'avance': return 'Avancé';
      default: return niveau;
    }
  };

  const filteredRegistrations = registrations.filter(reg => 
    (filter === 'all' || reg.status === filter) &&
    (typeFilter === 'all' || reg.formation_type === typeFilter)
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
                <GraduationCap className="h-8 w-8 text-elvec-600" />
                Inscriptions aux Formations
              </h2>
              <p className="text-gray-600 mt-1">{filteredRegistrations.length} inscription(s)</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
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
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="accepte">Accepté</SelectItem>
                <SelectItem value="rejete">Rejeté</SelectItem>
                <SelectItem value="complete">Complété</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-elvec-600" />
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
                      <Badge className={getStatusColor(registration.status)}>
                        {getStatusLabel(registration.status)}
                      </Badge>
                      <Badge variant="outline" className="bg-elvec-50 text-elvec-700 border-elvec-200">
                        {getFormationLabel(registration.formation_type)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-elvec-600" />
                        {registration.telephone}
                      </div>
                      {registration.email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2 text-elvec-600" />
                          {registration.email}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-elvec-600" />
                        {new Date(registration.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        <strong>Niveau:</strong> {getNiveauLabel(registration.niveau_experience)}
                      </span>
                      {registration.date_souhaitee && (
                        <span className="text-gray-600">
                          <strong>Date souhaitée:</strong> {new Date(registration.date_souhaitee).toLocaleDateString('fr-FR')}
                        </span>
                      )}
                    </div>
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
      </main>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Détails de l'inscription</DialogTitle>
            <DialogDescription>
              Consultez et gérez cette inscription à la formation
            </DialogDescription>
          </DialogHeader>

          {selectedRegistration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nom complet</label>
                  <p className="text-gray-900">{selectedRegistration.nom_complet}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Téléphone</label>
                  <p className="text-gray-900">{selectedRegistration.telephone}</p>
                </div>
                {selectedRegistration.email && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{selectedRegistration.email}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700">Formation</label>
                  <p className="text-gray-900">{getFormationLabel(selectedRegistration.formation_type)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Niveau d'expérience</label>
                  <p className="text-gray-900">{getNiveauLabel(selectedRegistration.niveau_experience)}</p>
                </div>
                {selectedRegistration.date_souhaitee && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date souhaitée</label>
                    <p className="text-gray-900">
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
                  <p className="text-gray-900 bg-gray-50 p-3 rounded mt-1">{selectedRegistration.message}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Statut</label>
                <Select 
                  value={selectedRegistration.status} 
                  onValueChange={(value) => setSelectedRegistration({...selectedRegistration, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="accepte">Accepté</SelectItem>
                    <SelectItem value="rejete">Rejeté</SelectItem>
                    <SelectItem value="complete">Complété</SelectItem>
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
                  onClick={() => handleStatusChange(selectedRegistration.status)} 
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

export default TrainingRegistrations;
