-- Assigner automatiquement le rôle admin à l'email AdminElvec@elvectogo.com
-- Cette fonction sera déclenchée après l'inscription
CREATE OR REPLACE FUNCTION public.assign_admin_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Vérifier si l'email est celui de l'admin
  IF NEW.email = 'AdminElvec@elvectogo.com' THEN
    -- Insérer le rôle admin pour cet utilisateur
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Créer un trigger pour assigner automatiquement le rôle admin
DROP TRIGGER IF EXISTS on_admin_user_created ON public.profiles;
CREATE TRIGGER on_admin_user_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_admin_role();