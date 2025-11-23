
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
import Login from "./pages/Login";
import InitAdmin from "./pages/InitAdmin";
import Dashboard from "./pages/admin/Dashboard";
import Appointments from "./pages/admin/Appointments";
import GalleryManagement from "./pages/admin/GalleryManagement";
import BeforeAfterManagement from "./pages/admin/BeforeAfterManagement";
import Quotes from "./pages/admin/Quotes";
import TrainingRegistrations from "./pages/admin/TrainingRegistrations";
import ContactMessages from "./pages/admin/ContactMessages";
import ChatConversations from "./pages/admin/ChatConversations";
import ProtectedRoute from "./components/admin/ProtectedRoute";

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
            <Route path="/login" element={<Login />} />
            <Route path="/init-admin" element={<InitAdmin />} />
            <Route path="/admin/devis" element={
              <ProtectedRoute>
                <Quotes />
              </ProtectedRoute>
            } />
            <Route path="/admin/formations" element={
              <ProtectedRoute>
                <TrainingRegistrations />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <ProtectedRoute>
                <ContactMessages />
              </ProtectedRoute>
            } />
            <Route path="/admin/conversations" element={
              <ProtectedRoute>
                <ChatConversations />
              </ProtectedRoute>
            } />
          <Route
            path="/admin/rdv"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/galerie"
            element={
              <ProtectedRoute>
                <GalleryManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/avant-apres"
            element={
              <ProtectedRoute>
                <BeforeAfterManagement />
              </ProtectedRoute>
            }
          />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
