
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Vehicles from "./pages/Vehicles";
import Products from "./pages/Products";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Fonction pour les transitions de page et animations
    const animateOnLoad = () => {
      const elementsToAnimate = document.querySelectorAll('.appear-animation, .stagger-animation');
      elementsToAnimate.forEach(element => {
        element.classList.add('appear');
      });
    };

    window.addEventListener('load', animateOnLoad);
    // Animer les éléments visibles lors du premier chargement
    setTimeout(animateOnLoad, 100);

    return () => {
      window.removeEventListener('load', animateOnLoad);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/a-propos" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/produits" element={<Products />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/vehicules" element={<Vehicles />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
