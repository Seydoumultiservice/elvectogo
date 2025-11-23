-- Ajouter colonnes manquantes à formations
ALTER TABLE formations ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE formations ADD COLUMN IF NOT EXISTS date_limite TIMESTAMPTZ;

-- Créer la table vehicle_reservations
CREATE TABLE IF NOT EXISTS vehicle_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  nom_complet TEXT NOT NULL,
  email TEXT,
  telephone TEXT NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies pour vehicle_reservations
ALTER TABLE vehicle_reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create reservations"
ON vehicle_reservations FOR INSERT
WITH CHECK (true);

CREATE POLICY "Only admins can view reservations"
ON vehicle_reservations FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update reservations"
ON vehicle_reservations FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete reservations"
ON vehicle_reservations FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger pour updated_at
CREATE TRIGGER update_vehicle_reservations_updated_at
BEFORE UPDATE ON vehicle_reservations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insérer 3 formations d'exemple
INSERT INTO formations (titre, slug, description, duree, prix, niveau, image_url, video_url, programme, prerequis, visible, ordre, date_limite) VALUES

('Formation Conducteur d''Engins Lourds', 'conducteur-engins-lourds', 'Apprenez à maîtriser les engins de chantier avec notre formation certifiée.', '15 jours', 350000, 'Débutant', '/lovable-uploads/formation-engins-lourds.jpg', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '[
  {"titre": "Introduction aux engins lourds", "contenu": "Présentation des différents types d''engins"},
  {"titre": "Sécurité et réglementation", "contenu": "Normes de sécurité sur les chantiers"},
  {"titre": "Pratique sur bulldozer", "contenu": "5 jours de pratique intensive"},
  {"titre": "Pratique sur excavatrice", "contenu": "5 jours de pratique intensive"},
  {"titre": "Examen final", "contenu": "Théorie et pratique"}
]'::jsonb, 'Permis de conduire catégorie B', true, 1, '2025-01-31 23:59:59'),

('Formation Tractopelle JCB', 'formation-tractopelle', 'Devenez expert en maniement de tractopelle avec certification professionnelle.', '10 jours', 250000, 'Intermédiaire', '/lovable-uploads/formation-tractopelle-promo.jpg', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '[
  {"titre": "Mécanique du tractopelle", "contenu": "Comprendre le fonctionnement technique"},
  {"titre": "Techniques d''excavation", "contenu": "Creuser efficacement et en toute sécurité"},
  {"titre": "Chargement et déchargement", "contenu": "Optimiser les opérations de manutention"},
  {"titre": "Examen pratique", "contenu": "Évaluation sur chantier réel"}
]'::jsonb, 'Expérience en conduite d''engins souhaitée', true, 2, '2025-02-15 23:59:59'),

('Formation Opérateur de Chargeuse', 'formation-chargeuse', 'Maîtrisez la conduite de chargeuse frontale pour tous types de chantiers.', '7 jours', 180000, 'Tous niveaux', '/lovable-uploads/formation-hero.jpg', NULL, '[
  {"titre": "Principes de base", "contenu": "Commandes et sécurité"},
  {"titre": "Chargement de matériaux", "contenu": "Techniques efficaces"},
  {"titre": "Manœuvres complexes", "contenu": "Terrains difficiles"},
  {"titre": "Certification", "contenu": "Examen théorique et pratique"}
]'::jsonb, 'Aucun prérequis', true, 3, '2025-03-01 23:59:59');

-- Insérer les véhicules dans la base de données
INSERT INTO vehicles (name, category, description, price_per_day, image_url, features, available) VALUES

('Toyota Corolla 2022', 'Voitures', 'Idéale pour les déplacements professionnels en ville, fiable et économique.', 40000, 'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?q=80&w=2070', '["5 personnes", "Climatisation", "Bluetooth", "6L/100km"]'::jsonb, true),

('Hyundai Accent 2021', 'Voitures', 'Confortable et économique, parfaite pour tous vos déplacements urbains.', 35000, 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2064', '["5 personnes", "Climatisation", "Radio", "5.5L/100km"]'::jsonb, true),

('Toyota RAV4 2023', 'SUV', 'SUV polyvalent idéal pour les routes difficiles et les déplacements en famille.', 60000, 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?q=80&w=2067', '["5 personnes", "4x4", "GPS", "7.5L/100km"]'::jsonb, true),

('Toyota Hiace 2021', 'Minibus', 'Parfait pour les groupes et les événements spéciaux, spacieux et confortable.', 80000, 'https://images.unsplash.com/photo-1614106764087-719038e91211?q=80&w=2070', '["12 personnes", "Climatisation", "Grand coffre", "9L/100km"]'::jsonb, true),

('Mercedes Classe C 2022', 'Voitures', 'Berline de luxe pour vos déplacements VIP en toute élégance dans Lomé.', 65000, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070', '["5 personnes", "Cuir", "GPS Premium", "7L/100km"]'::jsonb, true),

('Toyota Land Cruiser 2023', '4x4', 'SUV robuste pour explorer les environs de Lomé et les pistes difficiles.', 90000, 'https://images.unsplash.com/photo-1625595234377-0458f8a282a3?q=80&w=2071', '["7 personnes", "4x4 permanent", "GPS", "10L/100km"]'::jsonb, true);