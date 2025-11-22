import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Image as ImageIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface Transformation {
  id: string;
  title: string;
  description: string | null;
  image_before: string;
  image_after: string;
  category: string | null;
  visible: boolean;
  order_index: number;
}

const BeforeAfterManagement = () => {
  const [transformations, setTransformations] = useState<Transformation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_before: '',
    image_after: '',
    category: '',
  });

  useEffect(() => {
    loadTransformations();
  }, []);

  const loadTransformations = async () => {
    try {
      const { data, error } = await supabase
        .from('project_transformations')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setTransformations(data || []);
    } catch (error) {
      console.error('Error loading transformations:', error);
      toast.error('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.image_before || !formData.image_after) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from('project_transformations')
          .update({
            title: formData.title,
            description: formData.description || null,
            image_before: formData.image_before,
            image_after: formData.image_after,
            category: formData.category || null,
          })
          .eq('id', editingId);

        if (error) throw error;
        toast.success('Transformation mise à jour avec succès');
      } else {
        const { error } = await supabase
          .from('project_transformations')
          .insert({
            title: formData.title,
            description: formData.description || null,
            image_before: formData.image_before,
            image_after: formData.image_after,
            category: formData.category || null,
          });

        if (error) throw error;
        toast.success('Transformation ajoutée avec succès');
      }

      setIsDialogOpen(false);
      resetForm();
      loadTransformations();
    } catch (error) {
      console.error('Error saving transformation:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette transformation ?')) return;

    try {
      const { error } = await supabase
        .from('project_transformations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Transformation supprimée');
      loadTransformations();
    } catch (error) {
      console.error('Error deleting transformation:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from('project_transformations')
        .update({ visible: !currentVisibility })
        .eq('id', id);

      if (error) throw error;
      toast.success(currentVisibility ? 'Transformation masquée' : 'Transformation visible');
      loadTransformations();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      toast.error('Erreur lors de la modification');
    }
  };

  const handleEdit = (transformation: Transformation) => {
    setEditingId(transformation.id);
    setFormData({
      title: transformation.title,
      description: transformation.description || '',
      image_before: transformation.image_before,
      image_after: transformation.image_after,
      category: transformation.category || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      image_before: '',
      image_after: '',
      category: '',
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-elvec-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Galerie Avant/Après</h1>
            <p className="text-gray-500 mt-1">Gérez les transformations de projets</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une transformation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Modifier la transformation' : 'Nouvelle transformation'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Terrassement Route Nationale"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Ex: terrassement, démolition"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Détails du projet"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="image_before">URL Image Avant *</Label>
                  <Input
                    id="image_before"
                    value={formData.image_before}
                    onChange={(e) => setFormData({ ...formData, image_before: e.target.value })}
                    placeholder="/lovable-uploads/avant.jpg"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image_after">URL Image Après *</Label>
                  <Input
                    id="image_after"
                    value={formData.image_after}
                    onChange={(e) => setFormData({ ...formData, image_after: e.target.value })}
                    placeholder="/lovable-uploads/apres.jpg"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingId ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Images</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Visible</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transformations.map((transformation) => (
                <TableRow key={transformation.id}>
                  <TableCell>
                    <div className="flex gap-2">
                      <img 
                        src={transformation.image_before} 
                        alt="Avant" 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <img 
                        src={transformation.image_after} 
                        alt="Après" 
                        className="w-12 h-12 object-cover rounded"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{transformation.title}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {transformation.category || 'Sans catégorie'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={transformation.visible}
                      onCheckedChange={() => toggleVisibility(transformation.id, transformation.visible)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(transformation)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(transformation.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {transformations.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>Aucune transformation ajoutée</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default BeforeAfterManagement;
