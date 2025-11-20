import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload, X, Image as ImageIcon, Video, Youtube, Facebook, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  type: string;
  visible: boolean;
  order_index: number;
}

const CATEGORIES = [
  "Terrassement",
  "Démolition",
  "Excavation",
  "Pavage",
  "Formation",
  "Équipements",
  "Projets",
  "Autres",
];

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Form states for images
  const [imageTitle, setImageTitle] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [imageCategory, setImageCategory] = useState("");
  
  // Form states for video upload
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoCategory, setVideoCategory] = useState("");
  
  // Form states for video links
  const [videoUrl, setVideoUrl] = useState("");
  const [linkVideoTitle, setLinkVideoTitle] = useState("");
  const [linkVideoDescription, setLinkVideoDescription] = useState("");
  const [linkVideoCategory, setLinkVideoCategory] = useState("");
  const [detectedType, setDetectedType] = useState<"youtube" | "facebook" | null>(null);
  
  // Edit dialog
  const [editDialog, setEditDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  
  // Filter
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  
  const { toast } = useToast();

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_items")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Dropzone for images
  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
    },
  });

  // Dropzone for videos
  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    accept: { "video/*": [".mp4", ".mov", ".avi", ".webm"] },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setVideoFile(acceptedFiles[0]);
      }
    },
  });

  const removeImageFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const detectVideoType = (url: string): "youtube" | "facebook" | null => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    }
    if (url.includes("facebook.com")) {
      return "facebook";
    }
    return null;
  };

  const extractVideoId = (url: string, type: "youtube" | "facebook"): string | null => {
    if (type === "youtube") {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    }
    if (type === "facebook") {
      const regExp = /facebook\.com\/.*\/videos\/(\d+)/;
      const match = url.match(regExp);
      return match ? match[1] : null;
    }
    return null;
  };

  useEffect(() => {
    if (videoUrl) {
      const type = detectVideoType(videoUrl);
      setDetectedType(type);
    } else {
      setDetectedType(null);
    }
  }, [videoUrl]);

  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une image",
        variant: "destructive",
      });
      return;
    }

    if (!imageTitle || !imageCategory) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le titre et la catégorie",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("gallery")
          .getPublicUrl(fileName);

        const { error: insertError } = await supabase.from("gallery_items").insert({
          title: imageTitle,
          description: imageDescription || null,
          image_url: publicUrl,
          category: imageCategory,
          type: "image",
          visible: true,
          order_index: 0,
        });

        if (insertError) throw insertError;

        setUploadProgress(((i + 1) / selectedFiles.length) * 100);
      }

      toast({
        title: "Succès",
        description: `${selectedFiles.length} image(s) ajoutée(s) avec succès`,
      });

      setSelectedFiles([]);
      setImageTitle("");
      setImageDescription("");
      setImageCategory("");
      loadGalleryItems();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadVideo = async () => {
    if (!videoFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une vidéo",
        variant: "destructive",
      });
      return;
    }

    if (!videoTitle || !videoCategory) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le titre et la catégorie",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const fileExt = videoFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(fileName, videoFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase.from("gallery_items").insert({
        title: videoTitle,
        description: videoDescription || null,
        image_url: publicUrl,
        category: videoCategory,
        type: "video",
        visible: true,
        order_index: 0,
      });

      if (insertError) throw insertError;

      toast({
        title: "Succès",
        description: "Vidéo uploadée avec succès",
      });

      setVideoFile(null);
      setVideoTitle("");
      setVideoDescription("");
      setVideoCategory("");
      loadGalleryItems();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const addVideoLink = async () => {
    if (!videoUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une URL de vidéo",
        variant: "destructive",
      });
      return;
    }

    if (!detectedType) {
      toast({
        title: "Erreur",
        description: "URL non reconnue. Utilisez un lien YouTube ou Facebook valide",
        variant: "destructive",
      });
      return;
    }

    if (!linkVideoTitle || !linkVideoCategory) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le titre et la catégorie",
        variant: "destructive",
      });
      return;
    }

    const videoId = extractVideoId(videoUrl, detectedType);
    if (!videoId) {
      toast({
        title: "Erreur",
        description: "Impossible d'extraire l'ID de la vidéo",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const { error } = await supabase.from("gallery_items").insert({
        title: linkVideoTitle,
        description: linkVideoDescription || null,
        image_url: videoUrl,
        category: linkVideoCategory,
        type: detectedType,
        visible: true,
        order_index: 0,
      });

      if (error) throw error;

      toast({
        title: "Succès",
        description: `Vidéo ${detectedType === "youtube" ? "YouTube" : "Facebook"} ajoutée avec succès`,
      });

      setVideoUrl("");
      setLinkVideoTitle("");
      setLinkVideoDescription("");
      setLinkVideoCategory("");
      loadGalleryItems();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const updateItem = async () => {
    if (!editingItem) return;

    try {
      const { error } = await supabase
        .from("gallery_items")
        .update({
          title: editingItem.title,
          description: editingItem.description,
          category: editingItem.category,
          visible: editingItem.visible,
        })
        .eq("id", editingItem.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Item modifié avec succès",
      });

      setEditDialog(false);
      setEditingItem(null);
      loadGalleryItems();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteItem = async (item: GalleryItem) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${item.title}" ?`)) {
      return;
    }

    try {
      // Delete from storage if it's an uploaded file
      if (item.type === "image" || item.type === "video") {
        const bucket = item.type === "image" ? "gallery" : "videos";
        const urlParts = item.image_url.split("/");
        const fileName = urlParts[urlParts.length - 1];

        const { error: storageError } = await supabase.storage
          .from(bucket)
          .remove([fileName]);

        if (storageError) console.error("Storage deletion error:", storageError);
      }

      const { error } = await supabase
        .from("gallery_items")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Item supprimé avec succès",
      });

      loadGalleryItems();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      default:
        return <ImageIcon className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "image":
        return "Image";
      case "video":
        return "Vidéo";
      case "youtube":
        return "YouTube";
      case "facebook":
        return "Facebook";
      default:
        return type;
    }
  };

  const filteredItems = galleryItems.filter((item) => {
    const typeMatch = filterType === "all" || item.type === filterType;
    const categoryMatch = filterCategory === "all" || item.category === filterCategory;
    return typeMatch && categoryMatch;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion de la Galerie</h1>
          <p className="text-muted-foreground mt-2">
            Gérez les images et vidéos de votre galerie
          </p>
        </div>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="images">
              <ImageIcon className="h-4 w-4 mr-2" />
              Images
            </TabsTrigger>
            <TabsTrigger value="video-upload">
              <Video className="h-4 w-4 mr-2" />
              Vidéos - Upload
            </TabsTrigger>
            <TabsTrigger value="video-links">
              <Youtube className="h-4 w-4 mr-2" />
              Vidéos - Liens
            </TabsTrigger>
          </TabsList>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-4">
            <div className="bg-card rounded-lg border p-6 space-y-4">
              <h2 className="text-xl font-semibold">Ajouter des Images</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image-title">Titre *</Label>
                  <Input
                    id="image-title"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    placeholder="Titre de l'image"
                  />
                </div>
                <div>
                  <Label htmlFor="image-category">Catégorie *</Label>
                  <Select value={imageCategory} onValueChange={setImageCategory}>
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

              <div>
                <Label htmlFor="image-description">Description</Label>
                <Textarea
                  id="image-description"
                  value={imageDescription}
                  onChange={(e) => setImageDescription(e.target.value)}
                  placeholder="Description de l'image"
                  rows={3}
                />
              </div>

              <div
                {...getImageRootProps()}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <input {...getImageInputProps()} />
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Glissez-déposez des images ici, ou cliquez pour sélectionner
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  PNG, JPG, JPEG, WEBP, GIF
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImageFile(index)}
                        className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {file.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={uploadImages}
                disabled={uploading || selectedFiles.length === 0}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Upload en cours... {Math.round(uploadProgress)}%
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Uploader les images
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Video Upload Tab */}
          <TabsContent value="video-upload" className="space-y-4">
            <div className="bg-card rounded-lg border p-6 space-y-4">
              <h2 className="text-xl font-semibold">Uploader une Vidéo</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="video-title">Titre *</Label>
                  <Input
                    id="video-title"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Titre de la vidéo"
                  />
                </div>
                <div>
                  <Label htmlFor="video-category">Catégorie *</Label>
                  <Select value={videoCategory} onValueChange={setVideoCategory}>
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

              <div>
                <Label htmlFor="video-description">Description</Label>
                <Textarea
                  id="video-description"
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  placeholder="Description de la vidéo"
                  rows={3}
                />
              </div>

              <div
                {...getVideoRootProps()}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <input {...getVideoInputProps()} />
                <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Glissez-déposez une vidéo ici, ou cliquez pour sélectionner
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  MP4, MOV, AVI, WEBM (Max 100MB)
                </p>
              </div>

              {videoFile && (
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Video className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">{videoFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setVideoFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              <Button
                onClick={uploadVideo}
                disabled={uploading || !videoFile}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Upload en cours... {Math.round(uploadProgress)}%
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Uploader la vidéo
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Video Links Tab */}
          <TabsContent value="video-links" className="space-y-4">
            <div className="bg-card rounded-lg border p-6 space-y-4">
              <h2 className="text-xl font-semibold">Ajouter un Lien Vidéo</h2>
              
              <div>
                <Label htmlFor="video-url">URL de la Vidéo *</Label>
                <Input
                  id="video-url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... ou https://www.facebook.com/..."
                  className="font-mono text-sm"
                />
                {detectedType && (
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">
                      {detectedType === "youtube" ? (
                        <>
                          <Youtube className="h-3 w-3 mr-1" />
                          YouTube détecté
                        </>
                      ) : (
                        <>
                          <Facebook className="h-3 w-3 mr-1" />
                          Facebook détecté
                        </>
                      )}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="link-video-title">Titre *</Label>
                  <Input
                    id="link-video-title"
                    value={linkVideoTitle}
                    onChange={(e) => setLinkVideoTitle(e.target.value)}
                    placeholder="Titre de la vidéo"
                  />
                </div>
                <div>
                  <Label htmlFor="link-video-category">Catégorie *</Label>
                  <Select value={linkVideoCategory} onValueChange={setLinkVideoCategory}>
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

              <div>
                <Label htmlFor="link-video-description">Description</Label>
                <Textarea
                  id="link-video-description"
                  value={linkVideoDescription}
                  onChange={(e) => setLinkVideoDescription(e.target.value)}
                  placeholder="Description de la vidéo"
                  rows={3}
                />
              </div>

              <Button
                onClick={addVideoLink}
                disabled={uploading || !videoUrl || !detectedType}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    {detectedType === "youtube" ? (
                      <Youtube className="mr-2 h-4 w-4" />
                    ) : detectedType === "facebook" ? (
                      <Facebook className="mr-2 h-4 w-4" />
                    ) : (
                      <Upload className="mr-2 h-4 w-4" />
                    )}
                    Ajouter la vidéo
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Unified Management Table */}
        <div className="bg-card rounded-lg border p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Tous les Médias ({filteredItems.length})</h2>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Vidéos uploadées</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
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
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Aucun média trouvé pour les filtres sélectionnés
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Aperçu</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Visible</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                          {getTypeIcon(item.type)}
                          <span className="hidden sm:inline">{getTypeLabel(item.type)}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.type === "image" ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                            {getTypeIcon(item.type)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {item.visible ? (
                          <Badge className="bg-green-500">
                            <Eye className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Visible</span>
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <EyeOff className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Masqué</span>
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingItem(item);
                              setEditDialog(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteItem(item)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le média</DialogTitle>
            <DialogDescription>
              Modifiez les informations du média sélectionné
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="space-y-4">
              <div>
                <Label>Titre</Label>
                <Input
                  value={editingItem.title}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingItem.description || ""}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>Catégorie</Label>
                <Select
                  value={editingItem.category || ""}
                  onValueChange={(value) =>
                    setEditingItem({ ...editingItem, category: value })
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
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingItem.visible}
                  onCheckedChange={(checked) =>
                    setEditingItem({ ...editingItem, visible: checked })
                  }
                />
                <Label>Visible sur le site</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialog(false)}>
              Annuler
            </Button>
            <Button onClick={updateItem}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default GalleryManagement;
