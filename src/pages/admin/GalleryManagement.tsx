import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Upload,
  Trash2,
  Edit,
  Loader2,
  Image as ImageIcon,
  X,
  GripVertical,
} from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  type: string | null;
  visible: boolean | null;
  order_index: number | null;
}

const CATEGORIES = [
  'Terrassement',
  'Électricité',
  'Formation',
  'Équipement',
  'Projets',
  'Autre',
];

const GalleryManagement = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error loading gallery:', error);
      toast.error('Erreur lors du chargement de la galerie');
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Veuillez sélectionner au moins une image');
      return;
    }

    if (!title.trim() || !category) {
      toast.error('Veuillez remplir le titre et la catégorie');
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(async (file, index) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${index}.${fileExt}`;
        const filePath = `${fileName}`;

        // Upload to storage
        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from('gallery').getPublicUrl(filePath);

        // Insert into database
        const { error: dbError } = await supabase.from('gallery_items').insert({
          title: selectedFiles.length === 1 ? title : `${title} ${index + 1}`,
          description: description || null,
          image_url: publicUrl,
          category: category,
          type: 'image',
          visible: true,
          order_index: items.length + index,
        });

        if (dbError) throw dbError;
      });

      await Promise.all(uploadPromises);

      toast.success('Images ajoutées avec succès');
      setTitle('');
      setDescription('');
      setCategory('');
      setSelectedFiles([]);
      loadGalleryItems();
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Erreur lors de l\'upload des images');
    } finally {
      setUploading(false);
    }
  };

  const updateItem = async () => {
    if (!editItem) return;

    try {
      const { error } = await supabase
        .from('gallery_items')
        .update({
          title: editItem.title,
          description: editItem.description,
          category: editItem.category,
          visible: editItem.visible,
        })
        .eq('id', editItem.id);

      if (error) throw error;

      toast.success('Image mise à jour');
      setEditItem(null);
      loadGalleryItems();
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const deleteItem = async (item: GalleryItem) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) return;

    try {
      // Extract file path from URL
      const urlParts = item.image_url.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('gallery')
        .remove([fileName]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', item.id);

      if (dbError) throw dbError;

      toast.success('Image supprimée');
      loadGalleryItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gestion de la Galerie</h1>
        <p className="text-muted-foreground">
          Téléchargez et organisez les images de votre galerie
        </p>
      </div>

      {/* Upload Section */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Ajouter des images</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'image"
            />
          </div>

          <div>
            <Label htmlFor="category">Catégorie *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description de l'image (optionnel)"
            rows={3}
          />
        </div>

        {/* Drag & Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-lg">Déposez les images ici...</p>
          ) : (
            <>
              <p className="text-lg mb-2">
                Glissez-déposez vos images ici, ou cliquez pour sélectionner
              </p>
              <p className="text-sm text-muted-foreground">
                Formats acceptés: PNG, JPG, WEBP, GIF (max 10MB)
              </p>
            </>
          )}
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3">
              Images sélectionnées ({selectedFiles.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <p className="text-xs text-center mt-1 truncate">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <Button
            onClick={uploadImages}
            disabled={uploading || selectedFiles.length === 0}
            className="w-full md:w-auto"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Upload en cours...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Télécharger {selectedFiles.length > 0 && `(${selectedFiles.length})`}
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Gallery Items */}
      <div className="mb-4">
        <Label>Filtrer par catégorie</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative group">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditItem(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier l'image</DialogTitle>
                    </DialogHeader>
                    {editItem && (
                      <div className="space-y-4">
                        <div>
                          <Label>Titre</Label>
                          <Input
                            value={editItem.title}
                            onChange={(e) =>
                              setEditItem({ ...editItem, title: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={editItem.description || ''}
                            onChange={(e) =>
                              setEditItem({
                                ...editItem,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Catégorie</Label>
                          <Select
                            value={editItem.category || ''}
                            onValueChange={(value) =>
                              setEditItem({ ...editItem, category: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                  {cat}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="visible"
                            checked={editItem.visible || false}
                            onChange={(e) =>
                              setEditItem({
                                ...editItem,
                                visible: e.target.checked,
                              })
                            }
                            className="rounded"
                          />
                          <Label htmlFor="visible">Visible sur le site</Label>
                        </div>
                        <Button onClick={updateItem} className="w-full">
                          Enregistrer
                        </Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteItem(item)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold truncate">{item.title}</h3>
              {item.category && (
                <p className="text-sm text-muted-foreground">{item.category}</p>
              )}
              {!item.visible && (
                <p className="text-xs text-destructive mt-1">Non visible</p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">
            Aucune image dans cette catégorie
          </p>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
