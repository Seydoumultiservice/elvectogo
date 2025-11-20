-- Créer le bucket pour les vidéos
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies pour le bucket videos
CREATE POLICY "Videos sont publiquement accessibles"
ON storage.objects FOR SELECT
USING (bucket_id = 'videos');

CREATE POLICY "Admins peuvent uploader des vidéos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'videos' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins peuvent modifier des vidéos"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'videos' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins peuvent supprimer des vidéos"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'videos' AND
  has_role(auth.uid(), 'admin'::app_role)
);