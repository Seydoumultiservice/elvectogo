import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface VehicleReservation {
  id: string;
  vehicle_id: string;
  nom_complet: string;
  email: string | null;
  telephone: string;
  date_debut: string;
  date_fin: string;
  message: string | null;
  status: string;
  created_at: string;
  vehicles: {
    name: string;
  };
}

const VehicleReservations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: reservations, isLoading } = useQuery({
    queryKey: ['vehicle-reservations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicle_reservations')
        .select(`
          *,
          vehicles (name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as VehicleReservation[];
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('vehicle_reservations')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicle-reservations'] });
      toast({
        title: "Succès",
        description: "Statut mis à jour avec succès"
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du statut",
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('vehicle_reservations')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicle-reservations'] });
      toast({
        title: "Succès",
        description: "Réservation supprimée avec succès"
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive"
      });
    }
  });

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredReservations = reservations?.filter((reservation) => {
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    const matchesSearch = 
      reservation.nom_complet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.vehicles.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.telephone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { label: 'En attente', variant: 'default' as const },
      confirmed: { label: 'Confirmée', variant: 'default' as const },
      cancelled: { label: 'Annulée', variant: 'destructive' as const }
    };
    const config = variants[status as keyof typeof variants] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Réservations de Véhicules</h1>
          <p className="text-muted-foreground mt-2">
            Gérez les réservations de véhicules
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="confirmed">Confirmées</SelectItem>
            <SelectItem value="cancelled">Annulées</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg border">
        {isLoading ? (
          <div className="p-8 text-center">Chargement...</div>
        ) : !filteredReservations || filteredReservations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucune réservation trouvée
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Véhicule</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">
                    {reservation.nom_complet}
                  </TableCell>
                  <TableCell>{reservation.vehicles.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{reservation.telephone}</div>
                      {reservation.email && (
                        <div className="text-muted-foreground">{reservation.email}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Du: {new Date(reservation.date_debut).toLocaleDateString('fr-FR')}</div>
                      <div>Au: {new Date(reservation.date_fin).toLocaleDateString('fr-FR')}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {reservation.status === 'pending' && (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => updateStatusMutation.mutate({ 
                              id: reservation.id, 
                              status: 'confirmed' 
                            })}
                            title="Confirmer"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => updateStatusMutation.mutate({ 
                              id: reservation.id, 
                              status: 'cancelled' 
                            })}
                            title="Annuler"
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(reservation.id)}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </AdminLayout>
  );
};

export default VehicleReservations;
