import { Phone, MessageCircle } from 'lucide-react';

const FloatingActionButtons = () => {
  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-40">
      {/* WhatsApp */}
      <a
        href="https://wa.me/22892748270"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute left-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          WhatsApp
        </span>
      </a>
      
      {/* Phone Button */}
      <a
        href="tel:+22870600306"
        className="group flex items-center justify-center w-14 h-14 bg-elvec-500 hover:bg-elvec-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="Appeler ELVEC-TOGO"
      >
        <Phone className="w-6 h-6" />
        <span className="absolute left-16 bg-gray-900 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Appeler
        </span>
      </a>
    </div>
  );
};

export default FloatingActionButtons;
