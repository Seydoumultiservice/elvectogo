
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import AnimatedSection from '../animations/AnimatedSection';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

const ServiceCard = ({ title, description, icon: Icon, className, delay = 0, onClick }: ServiceCardProps) => {
  return (
    <AnimatedSection 
      delay={delay} 
      animationType="slide-up"
      className={cn('h-full', className)}
    >
      <div 
        onClick={onClick}
        className={cn(
          "bg-white rounded-lg shadow-lg p-6 h-full border border-gray-100 hover:border-elvec-200 transition-all duration-300 group",
          onClick && "cursor-pointer hover:shadow-xl hover:scale-105"
        )}
      >
        <div className="w-14 h-14 rounded-lg bg-elvec-100 flex items-center justify-center mb-4 text-elvec-600 group-hover:bg-elvec-600 group-hover:text-white transition-all duration-300">
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-elvec-900 group-hover:text-elvec-600 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </AnimatedSection>
  );
};

export default ServiceCard;
