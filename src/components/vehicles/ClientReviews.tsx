
import { Star, Quote } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import AnimatedSection from '../animations/AnimatedSection';

const ClientReviews = () => {
  // Données des avis clients
  const reviews = [
    {
      name: 'Kofi M.',
      avatar: 'K',
      role: 'Entrepreneur BTP',
      rating: 5,
      content: 'Service exceptionnel ! L\'excavatrice CAT 320 était parfaite pour notre projet de terrassement à Lomé. L\'engin était en excellent état et la livraison ponctuelle. Je recommande vivement ELVEC TOGO.',
      date: 'Il y a 2 semaines'
    },
    {
      name: 'Aminata D.',
      avatar: 'A',
      role: 'Chef de chantier',
      rating: 4,
      content: 'Nous avons loué un bulldozer pour notre projet de nivellement. L\'engin était puissant et bien entretenu. Le processus de réservation était simple et l\'équipe très réactive. Excellent service !',
      date: 'Il y a 1 mois'
    },
    {
      name: 'Emmanuel K.',
      avatar: 'E',
      role: 'Directeur travaux publics',
      rating: 5,
      content: 'Pour notre projet routier, nous avions besoin de plusieurs engins de compactage. ELVEC TOGO a fourni un service impeccable avec des machines performantes. Tout était parfait !',
      date: 'Il y a 3 mois'
    }
  ];

  return (
    <section className="py-16 bg-elvec-50">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionTitle 
            title="Ce que disent nos clients" 
            subtitle="Découvrez les expériences de nos clients qui ont fait confiance à nos services"
            centered
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {reviews.map((review, index) => (
            <AnimatedSection key={review.name} delay={index * 100}>
              <div className="bg-white p-6 rounded-lg shadow-md relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-elvec-600 rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-white" />
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-elvec-200 flex items-center justify-center text-elvec-700 font-bold">
                    {review.avatar}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4">{review.content}</p>
                
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <AnimatedSection>
            <div className="bg-white p-6 rounded-lg shadow-sm inline-block">
              <h3 className="text-xl font-bold mb-4">Votre avis compte pour nous !</h3>
              <p className="text-gray-600 mb-2">
                Nous sommes toujours à l'écoute de nos clients pour améliorer nos services.
              </p>
              <a 
                href="#reservation" 
                className="text-elvec-600 font-medium hover:text-elvec-800 hover:underline"
              >
                Réservez maintenant et partagez votre expérience →
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;
