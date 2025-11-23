
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import VehicleCategories from '../components/vehicles/VehicleCategories';
import VehicleReservation from '../components/vehicles/VehicleReservation';
import PopularVehicles from '../components/vehicles/PopularVehicles';
import ClientReviews from '../components/vehicles/ClientReviews';
import HeroSection from '../components/vehicles/HeroSection';
import ReviewDialog from '../components/vehicles/ReviewDialog';
import { Toaster } from 'sonner';
import RequestQuoteDialog from '../components/common/RequestQuoteDialog';

const Vehicles = () => {
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
      <RequestQuoteDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
    </Layout>
  );
};

export default Vehicles;
