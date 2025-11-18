import { Car } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import EnhancedReservationForm from '../common/EnhancedReservationForm';

interface VehicleReservationProps {
  quoteDialogOpen: boolean;
  setQuoteDialogOpen: (open: boolean) => void;
}

const VehicleReservation = ({ quoteDialogOpen, setQuoteDialogOpen }: VehicleReservationProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-elvec-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionTitle 
            title="Réservez votre véhicule" 
            subtitle="Simple, rapide et fiable"
            centered
          />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Profitez de notre service de location de voitures avec chauffeur pour vos déplacements professionnels et personnels au Togo. Remplissez le formulaire ci-dessous et nous vous contacterons rapidement via WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-elvec-500">
              <h3 className="text-xl font-bold text-elvec-600 mb-4">Pourquoi choisir ELVEC TOGO ?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-elvec-500 mr-2 text-xl">✓</span>
                  <span className="text-gray-700">Véhicules climatisés et confortables</span>
                </li>
                <li className="flex items-start">
                  <span className="text-elvec-500 mr-2 text-xl">✓</span>
                  <span className="text-gray-700">Chauffeurs professionnels et expérimentés</span>
                </li>
                <li className="flex items-start">
                  <span className="text-elvec-500 mr-2 text-xl">✓</span>
                  <span className="text-gray-700">Disponibilité 24h/24, 7j/7</span>
                </li>
                <li className="flex items-start">
                  <span className="text-elvec-500 mr-2 text-xl">✓</span>
                  <span className="text-gray-700">Tarifs compétitifs et transparents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-elvec-500 mr-2 text-xl">✓</span>
                  <span className="text-gray-700">Flotte moderne et variée</span>
                </li>
              </ul>
            </div>
            
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/location-voiture-elvec.png" 
                alt="Service de location ELVEC"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div>
            <EnhancedReservationForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleReservation;
