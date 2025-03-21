
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/a-propos', label: 'À Propos' },
    { path: '/services', label: 'Services' },
    { path: '/produits', label: 'Produits' },
    { path: '/vehicules', label: 'Véhicules' },
    { path: '/galerie', label: 'Galerie' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-elvec-900 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="hidden md:flex items-center space-x-4">
            <a href="tel:+22870600306" className="flex items-center text-sm hover:text-elvec-300 transition-colors duration-300">
              <Phone className="h-4 w-4 mr-1" />
              +228 70 60 03 06
            </a>
            <a href="mailto:contact@elvectogo.com" className="flex items-center text-sm hover:text-elvec-300 transition-colors duration-300">
              <Mail className="h-4 w-4 mr-1" />
              contact@elvectogo.com
            </a>
          </div>
          <div className="w-full md:w-auto flex justify-end space-x-3">
            <a href="https://facebook.com" className="text-white hover:text-elvec-300 transition-colors duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
            </a>
            <a href="https://instagram.com" className="text-white hover:text-elvec-300 transition-colors duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
            </a>
            <a href="https://linkedin.com" className="text-white hover:text-elvec-300 transition-colors duration-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <span className="flex items-center">
                <img src="/lovable-uploads/fa46f65b-f983-4a81-b8cc-895c85f987b3.png" alt="ELVEC-TOGO" className="h-12 w-auto" />
                <span className="ml-2 font-display font-bold text-elvec-900 text-xl md:text-2xl">ELVEC <span className="text-elvec-600">TOGO</span></span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors duration-300",
                    isActive 
                      ? "text-elvec-600 bg-elvec-50" 
                      : "text-gray-700 hover:text-elvec-600 hover:bg-elvec-50"
                  )}
                >
                  {item.label}
                </NavLink>
              ))}
              <a 
                href="/contact" 
                className="ml-4 px-5 py-2 text-sm font-medium text-white bg-elvec-600 hover:bg-elvec-700 rounded-md shadow-sm transition-all duration-300"
              >
                Contactez-nous
              </a>
            </div>
            
            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-gray-700 hover:text-elvec-600 hover:bg-elvec-50 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "block px-3 py-2 text-base font-medium rounded-md",
                    isActive 
                      ? "text-elvec-600 bg-elvec-50" 
                      : "text-gray-700 hover:text-elvec-600 hover:bg-elvec-50"
                  )}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-4 flex flex-col space-y-2">
                <a href="tel:+22870600306" className="flex items-center px-3 py-2 text-base text-gray-700">
                  <Phone className="h-5 w-5 mr-2 text-elvec-600" />
                  +228 70 60 03 06
                </a>
                <a href="mailto:contact@elvectogo.com" className="flex items-center px-3 py-2 text-base text-gray-700">
                  <Mail className="h-5 w-5 mr-2 text-elvec-600" />
                  contact@elvectogo.com
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
