import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-elvec-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/lovable-uploads/2b8380f1-7282-4343-a0a8-40704b599087.png" alt="ELVEC-TOGO" className="h-16 w-auto mr-2" />
            </div>
            <p className="text-gray-300 text-sm mt-2">
              Votre partenaire de confiance en matériel de construction et équipements agricoles
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://web.facebook.com/p/ELVEC-TOGO-100085057637931/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-elvec-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
              </a>
              <a href="https://www.linkedin.com/company/elvec-togo?trk=similar-pages" target="_blank" rel="noopener noreferrer" className="text-white hover:text-elvec-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="https://www.tiktok.com/@salvaduciel763?lang=fr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-elvec-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              </a>
            </div>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-elvec-700">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">Accueil</Link></li>
              <li><Link to="/a-propos" className="text-gray-300 hover:text-white transition-colors duration-300">À Propos</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-300">Services</Link></li>
              <li><Link to="/produits" className="text-gray-300 hover:text-white transition-colors duration-300">Produits</Link></li>
              <li><Link to="/galerie" className="text-gray-300 hover:text-white transition-colors duration-300">Galerie</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contactez-nous</Link></li>
            </ul>
          </div>

          {/* Contactez-nous */}
          <div>
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-elvec-700">Contactez-nous</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-elvec-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">Lomé, Togo - Avenue de la Paix</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-elvec-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">+228 70 60 03 06</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-elvec-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300">contact@elvectogo.com</span>
              </li>
            </ul>
          </div>

          {/* Horaires d'Ouverture */}
          <div>
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-elvec-700">Horaires d'Ouverture</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-300">Lundi - Vendredi:</span>
              </li>
              <li className="text-gray-400 pl-2">07h00 - 12h00</li>
              <li className="text-gray-400 pl-2">14h00 - 18h00</li>
              <li className="flex justify-between mt-2">
                <span className="text-gray-300">Samedi:</span>
              </li>
              <li className="text-gray-400 pl-2">07h00 - 12h00</li>
              <li className="flex justify-between mt-2">
                <span className="text-gray-300">Dimanche:</span>
                <span className="text-red-400">Fermé</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-elvec-950 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© {currentYear} ELVEC TOGO. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
