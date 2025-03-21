
import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import EquipmentRental from '../components/home/EquipmentRental';
import Gallery from '../components/home/Gallery';
import CarRentalSection from '../components/home/CarRentalSection';
import CtaSection from '../components/home/CtaSection';
import Layout from '../components/layout/Layout';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Hero />
      <Services />
      <EquipmentRental />
      <Gallery />
      <CarRentalSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
