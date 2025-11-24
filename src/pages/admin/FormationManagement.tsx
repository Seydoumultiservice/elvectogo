import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical, X } from 'lucide-react';
import { toast } from 'sonner';

interface Formation {
  id: string;
  titre: string;
  slug: string;
  description: string;
  duree: string;
  prix: number;
  niveau: string;
  image_url: string;
  video_url: string | null;
  date_limite: string | null;
  programme: { titre: string; contenu: string }[];
  prerequis: string;
  visible: boolean;
  ordre: number;
}

const FormationManagement = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFormation, setEditingFormation] = useState<Formation | null>(null);
  const [formData, setFormData] = useState({
    titre: '',
    slug: '',
    description: '',
    duree: '',
    prix: '',
    niveau: 'debutant',
    image_url: '',
    video_url: '',
    date_limite: '',
    prerequis: '',
    visible: true,
    ordre: 0,
  });
  const [programmeModules, setProgrammeModules] = useState<{titre: string, contenu: string}[]>([]);

  const queryClient = useQueryClient();

  const { data: formations, isLoading } = useQuery({
    queryKey: ['admin-formations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('formations')
        .select('*')
        .order('ordre', { ascending: true });

      if (error) throw error;
      return data as unknown as Formation[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('formations').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-formations'] });
      toast.success('Formation créée avec succès');
      resetForm();
    },
    onError: () => {
      toast.error('Erreur lors de la création');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from('formations').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-formations'] });
      toast.success('Formation mise à jour');
      resetForm();
    },
    onError: () => {
      toast.error('Erreur lors de la mise à jour');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('formations').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-formations'] });
      toast.success('Formation supprimée');
    },
    onError: () => {
      toast.error('Erreur lors de la suppression');
    },
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, visible }: { id: string; visible: boolean }) => {
      const { error } = await supabase
        .from('formations')
        .update({ visible })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-formations'] });
      toast.success('Visibilité mise à jour');
    },
  });

  const resetForm = () => {
    setFormData({
      titre: '',
      slug: '',
      description: '',
      duree: '',
      prix: '',
      niveau: 'debutant',
      image_url: '',
      video_url: '',
      date_limite: '',
      prerequis: '',
      visible: true,
      ordre: 0,
    });
    setProgrammeModules([]);
    setEditingFormation(null);
    setDialogOpen(false);
  };

  const handleEdit = (formation: Formation) => {
    setEditingFormation(formation);
    setFormData({
      titre: formation.titre,
      slug: formation.slug,
      description: formation.description || '',
      duree: formation.duree || '',
      prix: formation.prix?.toString() || '',
      niveau: formation.niveau || 'debutant',
      image_url: formation.image_url || '',
      video_url: formation.video_url || '',
      date_limite: formation.date_limite ? formation.date_limite.slice(0, 16) : '',
      prerequis: formation.prerequis || '',
      visible: formation.visible,
      ordre: formation.ordre,
    });
    setProgrammeModules(Array.isArray(formation.programme) ? formation.programme : []);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      prix: parseFloat(formData.prix) || null,
      video_url: formData.video_url || null,
      date_limite: formData.date_limite || null,
      programme: programmeModules,
    };

    if (editingFormation) {
      updateMutation.mutate({ id: editingFormation.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestion des Formations</h1>
            <p className="text-muted-foreground">
              Gérez les formations disponibles sur le site
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle Formation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingFormation ? 'Modifier la formation' : 'Nouvelle formation'}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Titre *</Label>
                    <Input
                      required
                      value={formData.titre}
                      onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Slug (URL) *</Label>
                    <Input
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })
                      }
                      placeholder="formation-engins-lourds"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Décrivez la formation en quelques lignes..."
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Durée</Label>
                    <Input
                      value={formData.duree}
                      onChange={(e) => setFormData({ ...formData, duree: e.target.value })}
                      placeholder="5 jours"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Prix (FCFA)</Label>
                    <Input
                      type="number"
                      value={formData.prix}
                      onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Niveau</Label>
                    <Select
                      value={formData.niveau}
                      onValueChange={(value) => setFormData({ ...formData, niveau: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debutant">Débutant</SelectItem>
                        <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                        <SelectItem value="avance">Avancé</SelectItem>
                        <SelectItem value="tous niveaux">Tous niveaux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Lien Drive (Image de couverture)</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://drive.google.com/uc?id=..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Lien vidéo YouTube (optionnel)</Label>
                  <Input
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date limite d'inscription (optionnel)</Label>
                  <Input
                    type="datetime-local"
                    value={formData.date_limite}
                    onChange={(e) => setFormData({ ...formData, date_limite: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Prérequis</Label>
                  <Textarea
                    value={formData.prerequis}
                    onChange={(e) => setFormData({ ...formData, prerequis: e.target.value })}
                    rows={2}
                    placeholder="Aucun prérequis particulier..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Programme de formation</Label>
                  
                  {programmeModules.map((module, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-2 bg-muted/30">
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Module {index + 1}</Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newModules = [...programmeModules];
                            newModules.splice(index, 1);
                            setProgrammeModules(newModules);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Input
                        placeholder="Titre du module"
                        value={module.titre}
                        onChange={(e) => {
                          const newModules = [...programmeModules];
                          newModules[index].titre = e.target.value;
                          setProgrammeModules(newModules);
                        }}
                      />
                      
                      <Textarea
                        placeholder="Description du module"
                        rows={2}
                        value={module.contenu}
                        onChange={(e) => {
                          const newModules = [...programmeModules];
                          newModules[index].contenu = e.target.value;
                          setProgrammeModules(newModules);
                        }}
                      />
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setProgrammeModules([...programmeModules, { titre: '', contenu: '' }])}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter un module
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.visible}
                    onCheckedChange={(checked) => setFormData({ ...formData, visible: checked })}
                  />
                  <Label>Formation visible</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingFormation ? 'Mettre à jour' : 'Créer'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des formations ({formations?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Chargement...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formations?.map((formation) => (
                    <TableRow key={formation.id}>
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                      </TableCell>
                      <TableCell className="font-medium">{formation.titre}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {formation.niveau}
                        </Badge>
                      </TableCell>
                      <TableCell>{formation.duree}</TableCell>
                      <TableCell>
                        {formation.prix ? `${formation.prix.toLocaleString()} FCFA` : '-'}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            toggleVisibilityMutation.mutate({
                              id: formation.id,
                              visible: !formation.visible,
                            })
                          }
                        >
                          {formation.visible ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(formation)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(formation.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default FormationManagement;
