-- Création de la table formations
CREATE TABLE IF NOT EXISTS public.formations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  duree TEXT,
  prix DECIMAL(10,2),
  niveau TEXT,
  image_url TEXT,
  programme JSONB DEFAULT '[]'::jsonb,
  prerequis TEXT,
  visible BOOLEAN DEFAULT true,
  ordre INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut voir les formations visibles
CREATE POLICY "Tout le monde peut voir les formations visibles"
ON public.formations FOR SELECT
USING (visible = true OR has_role(auth.uid(), 'admin'::app_role));

-- Politique : Les admins peuvent tout faire
CREATE POLICY "Les admins peuvent gérer les formations"
ON public.formations FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger pour updated_at
CREATE TRIGGER update_formations_updated_at
BEFORE UPDATE ON public.formations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();