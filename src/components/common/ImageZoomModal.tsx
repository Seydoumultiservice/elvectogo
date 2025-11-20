import { X } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageZoomModal = ({ isOpen, onClose, imageUrl }: ImageZoomModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] p-2 bg-black/95 border-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Fermer"
        >
          <X className="h-6 w-6 text-white" />
        </button>
        <div className="flex items-center justify-center h-full">
          <img
            src={imageUrl}
            alt="Image agrandie"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageZoomModal;
