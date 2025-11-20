-- Créer l'utilisateur admin directement dans auth.users
-- IMPORTANT: Ce SQL doit être exécuté manuellement via le tableau de bord Supabase
-- car Lovable Cloud ne permet pas d'insérer directement dans auth.users

-- À la place, nous allons créer une fonction qui peut être appelée pour créer l'admin
CREATE OR REPLACE FUNCTION public.create_admin_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Vérifier si l'utilisateur admin existe déjà
  SELECT id INTO admin_user_id
  FROM auth.users
  WHERE email = 'AdminElvec@elvectogo.com';
  
  -- Si l'utilisateur n'existe pas, on ne peut pas le créer via SQL
  -- L'utilisateur doit être créé manuellement via le tableau de bord
  IF admin_user_id IS NULL THEN
    RAISE NOTICE 'L''utilisateur admin n''existe pas encore. Veuillez le créer via le tableau de bord Supabase.';
  ELSE
    -- Si l'utilisateur existe, s'assurer qu'il a le rôle admin
    INSERT INTO public.user_roles (user_id, role)
    VALUES (admin_user_id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Rôle admin assigné avec succès à l''utilisateur AdminElvec@elvectogo.com';
  END IF;
END;
$$;