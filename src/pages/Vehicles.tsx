
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import VehicleCategories from '../components/vehicles/VehicleCategories';
import VehicleReservation from '../components/vehicles/VehicleReservation';
import PopularVehicles from '../components/vehicles/PopularVehicles';
import ClientReviews from '../components/vehicles/ClientReviews';
import HeroSection from '../components/vehicles/HeroSection';
import ReviewDialog from '../components/vehicles/ReviewDialog';
import { Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import RequestQuoteDialog from '../components/common/RequestQuoteDialog';

const Vehicles = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Toaster />
      <HeroSection />
      <VehicleCategories />
      <PopularVehicles />
      <VehicleReservation quoteDialogOpen={quoteDialogOpen} setQuoteDialogOpen={setQuoteDialogOpen} />
      <ClientReviews />
      
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setReviewOpen(true)}
          className="bg-elvec-600 hover:bg-elvec-700 text-white shadow-lg rounded-full px-6 py-6"
          size="lg"
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Laisser un avis
        </Button>
      </div>
      
      <ReviewDialog open={reviewOpen} onOpenChange={setReviewOpen} />
      <RequestQuoteDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
    </Layout>
  );
};

export default Vehicles;
