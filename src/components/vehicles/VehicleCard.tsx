
import { useState } from 'react';
import { Star, Calendar, Cog } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedSection from '../animations/AnimatedSection';

export interface VehicleProps {
  vehicle: {
    id: string;
    name: string;
    image: string;
    year: number;
    capacity: string;
    power: string;
    description: string;
    category: string;
  };
}

const VehicleCard = ({ vehicle }: VehicleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <AnimatedSection>
      <div 
        className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img 
            src={vehicle.image} 
            alt={vehicle.name} 
            className={cn(
              "w-full h-56 object-cover transition-transform duration-500",
              isHovered && "scale-105"
            )}
          />
          <div className="absolute top-0 right-0 bg-elvec-600 text-white text-xs px-3 py-1.5 m-2 rounded-md font-semibold">
            {vehicle.category === 'terrassement' && 'Terrassement'}
            {vehicle.category === 'manutention' && 'Manutention'}
            {vehicle.category === 'compactage' && 'Compactage'}
          </div>
        </div>
        
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-elvec-900">{vehicle.name}</h3>
            <div className="flex items-center">
              <span className="text-yellow-500 flex">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 flex-grow">{vehicle.description}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-elvec-500" />
              <span className="font-medium">{vehicle.year}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Cog className="h-4 w-4 mr-2 text-elvec-500" />
              <span className="font-medium">{vehicle.power}</span>
            </div>
            <div className="flex items-center text-gray-600 col-span-2">
              <span className="text-elvec-700 font-semibold">{vehicle.capacity}</span>
            </div>
          </div>
          
          <div className="flex justify-center mt-auto pt-4 border-t border-gray-100">
            <button className="w-full bg-elvec-600 hover:bg-elvec-700 text-white px-6 py-2.5 rounded-lg text-base font-semibold transition-colors duration-300 shadow-md hover:shadow-lg">
              Réserver cet engin
            </button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default VehicleCard;
