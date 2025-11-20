import { X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    longDescription: string;
    images: string[];
    features: string[];
    youtubeVideoId?: string;
    videoUrl?: string;
  };
}

const ServiceModal = ({ isOpen, onClose, service }: ServiceModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-elvec-600">
            {service.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video (if available) */}
          {service.videoUrl && (
            <div className="mb-6">
              <video
                controls
                className="w-full rounded-lg shadow-lg"
                poster={service.images[0]}
              >
                <source src={service.videoUrl} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            </div>
          )}

          {/* Images Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {service.images.map((image, index) => (
              <div
                key={index}
                className="aspect-video rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={image}
                  alt={`${service.title} ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Description du service
            </h3>
            <p className="text-gray-700 leading-relaxed">{service.longDescription}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">
              Points forts
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 bg-elvec-50 p-3 rounded-lg"
                >
                  <Check className="h-5 w-5 text-elvec-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Link to="/contact" className="flex-1">
              <Button className="w-full bg-elvec-500 hover:bg-elvec-600 text-white">
                Demander un devis
              </Button>
            </Link>
            <a href="tel:+22870600306" className="flex-1">
              <Button variant="outline" className="w-full border-elvec-500 text-elvec-600 hover:bg-elvec-50">
                Appeler maintenant
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
