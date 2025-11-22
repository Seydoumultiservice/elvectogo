export interface ServiceDetail {
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  features: string[];
  youtubeVideoId?: string;
  videoUrl?: string;
}

export const servicesDetails: Record<string, ServiceDetail> = {
  terrassement: {
    title: 'Terrassement Professionnel',
    description: 'Préparation de terrain pour construction avec équipements de pointe',
    longDescription: 'Nos équipes spécialisées réalisent tous vos travaux de terrassement avec précision et efficacité. Nous utilisons des équipements modernes pour garantir des résultats conformes aux normes internationales. Du simple nivellement aux grands projets d\'infrastructure, ELVEC TOGO maîtrise toutes les techniques de terrassement.',
    images: [
      '/lovable-uploads/projet-terrassement-1.jpg',
      '/lovable-uploads/excavation-chantier.jpg',
      '/lovable-uploads/bulldozer-action.jpg'
    ],
    features: [
      'Terrassement de précision avec GPS',
      'Évacuation et gestion des déblais',
      'Compactage et nivellement professionnel',
      'Respect des normes environnementales',
      'Équipements modernes et performants',
      'Équipes expérimentées et qualifiées'
    ]
  },
  demolition: {
    title: 'Démolition Sécurisée',
    description: 'Démolition de structures avec sécurité maximale et gestion des déchets',
    longDescription: 'ELVEC TOGO dispose d\'équipes formées et d\'équipements de pointe pour réaliser vos projets de démolition en toute sécurité. Nous appliquons des protocoles stricts de sécurité et assurons une gestion responsable des déchets. De la démolition sélective à la destruction totale, nous intervenons sur tous types de structures.',
    images: [
      '/lovable-uploads/DEMOLITION1.jpg',
      '/lovable-uploads/chantier-demolition.webp',
      '/lovable-uploads/equipements-securite-demolition.jpg'
    ],
    youtubeVideoId: 'ln7E4ujuDbU',
    videoUrl: '/lovable-uploads/DEMOLITION2.mp4',
    features: [
      'Démolition sélective et totale',
      'Équipements de sécurité certifiés',
      'Gestion et recyclage des déchets',
      'Intervention rapide et efficace',
      'Respect des normes de sécurité',
      'Personnel formé et expérimenté'
    ]
  },
  piste: {
    title: 'Piste Rurale',
    description: 'Construction et réhabilitation de pistes rurales durables',
    longDescription: 'Nous construisons et réhabilitons des pistes rurales pour faciliter l\'accès aux zones agricoles et isolées. Nos techniques garantissent des infrastructures durables adaptées aux conditions locales. Nous intervenons sur tous types de terrains pour créer des voies d\'accès fonctionnelles et pérennes.',
    images: [
      '/lovable-uploads/PISTE1.jpg',
      '/lovable-uploads/PISTE RURAL.jpeg'
    ],
    features: [
      'Construction de pistes durables',
      'Réhabilitation d\'infrastructures existantes',
      'Drainage et gestion des eaux',
      'Adaptation aux conditions locales',
      'Équipements spécialisés',
      'Respect des délais et budgets'
    ]
  },
  ponceaux: {
    title: 'Ponceaux',
    description: 'Construction de ponceaux et ouvrages d\'art hydrauliques',
    longDescription: 'ELVEC TOGO réalise la construction de ponceaux et d\'ouvrages hydrauliques pour assurer le bon écoulement des eaux. Nos équipes maîtrisent les techniques de génie civil nécessaires pour créer des structures solides et durables. Nous intervenons sur tous types de projets d\'infrastructure routière.',
    images: [
      '/lovable-uploads/PONCEAU &.jpg',
      '/lovable-uploads/PONCEAU é.jpg',
      '/lovable-uploads/ponceau-construction.jpg'
    ],
    features: [
      'Conception et dimensionnement',
      'Construction d\'ouvrages hydrauliques',
      'Maçonnerie et béton armé',
      'Respect des normes techniques',
      'Garantie de solidité et durabilité',
      'Expertise en génie civil'
    ]
  },
  manutention: {
    title: 'Manutention Professionnelle',
    description: 'Services de manutention et logistique portuaire',
    longDescription: 'ELVEC TOGO offre des services complets de manutention pour les zones portuaires et industrielles. Notre flotte d\'engins lourds et nos équipes qualifiées garantissent une manipulation sécurisée de tous types de charges. Nous sommes un partenaire de confiance pour les plus grands projets logistiques du Togo.',
    images: [
      '/lovable-uploads/manutention-a-Lome-Ouest-Afrique.jpg',
      '/lovable-uploads/manutention-port-lome.jpg',
      '/lovable-uploads/excavatrice-port-lome.jpg'
    ],
    features: [
      'Plus de 50 projets de manutention réalisés',
      'Équipements lourds modernes et certifiés',
      'Personnel qualifié et expérimenté',
      'Intervention 24h/24 et 7j/7',
      'Gestion logistique complète',
      'Respect strict des normes de sécurité'
    ]
  },
  formation: {
    title: 'Formation Professionnelle',
    description: 'Formations certifiantes en conduite d\'engins lourds',
    longDescription: 'Notre centre de formation certifié offre des programmes complets pour former les futurs opérateurs d\'engins lourds. Plus de 500 heures de formation dispensées avec un taux de réussite de 95%. Nos formateurs expérimentés allient théorie et pratique pour garantir une maîtrise totale des équipements. Formations reconnues par les professionnels du BTP en Afrique de l\'Ouest.',
    images: [
      '/lovable-uploads/formation-engins-lourds.jpg',
      '/lovable-uploads/formation-elvec-poster.jpg',
      '/lovable-uploads/formation en lourd 1.jpg'
    ],
    features: [
      'Plus de 500 heures de formation dispensées',
      'Taux de réussite de 95%',
      'Formations certifiantes reconnues',
      '4 programmes spécialisés disponibles',
      'Formateurs experts avec 10+ ans d\'expérience',
      'Équipements de formation modernes',
      'Suivi personnalisé des apprenants',
      'Certificat délivré en fin de formation'
    ]
  }
};
