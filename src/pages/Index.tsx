import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import VideoPresentation from '../components/home/VideoPresentation';
import TrainingSection from '../components/home/TrainingSection';
import AgriculturalServices from '../components/home/AgriculturalServices';
import EquipmentRental from '../components/home/EquipmentRental';
import Gallery from '../components/home/Gallery';
import CarRentalSection from '../components/home/CarRentalSection';
import Partners from '../components/home/Partners';
import CtaSection from '../components/home/CtaSection';
import AppointmentCTA from '../components/common/AppointmentCTA';
import TikTokSection from '../components/home/TikTokSection';
import AdSenseBlock from '../components/common/AdSenseBlock';
import Layout from '../components/layout/Layout';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <VideoPresentation />
      <Services />
      <AdSenseBlock />
      <TrainingSection />
      <AgriculturalServices />
      <EquipmentRental />
      <AdSenseBlock />
      <Gallery />
      <CarRentalSection />
      <TikTokSection />
      <Partners />
      <CtaSection />
      <AppointmentCTA />
    </Layout>
  );
};

export default Index;
