
import { MapPin, Phone, Mail, Clock, Building, HelpCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import SectionTitle from '../components/common/SectionTitle';
import ContactForm from '../components/common/ContactForm';
import AppointmentForm from '../components/contact/AppointmentForm';
import AnimatedSection from '../components/animations/AnimatedSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Toaster />
      <div className="bg-gradient-to-r from-elvec-900 to-elvec-800 text-white py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-2 bg-elvec-800/60 rounded-full mb-6">
                <Mail className="h-5 w-5 text-elvec-400 mr-2" />
                <span className="text-elvec-200 font-medium">Contactez-nous 24/7</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Nous sommes à votre écoute
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                N'hésitez pas à nous contacter pour toute question ou demande de devis. Notre équipe est disponible pour vous répondre rapidement.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="tel:+22870600306" className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full">
                  <Phone className="h-4 w-4 mr-2" />
                  +228 70 60 03 06
                </a>
                <a href="mailto:contact@elvectogo.com" className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full">
                  <Mail className="h-4 w-4 mr-2" />
                  contact@elvectogo.com
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <section className="py-16 bg-elvec-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="contact" className="w-full">
            <AnimatedSection>
              <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-12">
                <TabsTrigger value="contact" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Nous contacter
                </TabsTrigger>
                <TabsTrigger value="rendezvous" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> Rendez-vous
                </TabsTrigger>
                <TabsTrigger value="location" className="flex items-center gap-2">
                  <Building className="h-4 w-4" /> Nos bureaux
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" /> FAQ
                </TabsTrigger>
              </TabsList>
            </AnimatedSection>

            <TabsContent value="contact" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <AnimatedSection>
                  <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                    <h3 className="text-2xl font-semibold mb-6 text-elvec-900">Informations de contact</h3>
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Mail className="h-6 w-6 text-elvec-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-500">Email</h4>
                          <a href="mailto:contact@elvectogo.com" className="text-base text-gray-900 hover:text-elvec-600 transition-colors duration-300">
                            contact@elvectogo.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Phone className="h-6 w-6 text-elvec-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-500">Téléphone</h4>
                          <p className="text-base text-gray-900">
                            <a href="tel:+22870600306" className="hover:text-elvec-600 transition-colors duration-300">+228 70 60 03 06</a>
                          </p>
                          <p className="text-base text-gray-900">
                            <a href="tel:+22892748270" className="hover:text-elvec-600 transition-colors duration-300">+228 92 74 82 70</a>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <MapPin className="h-6 w-6 text-elvec-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-500">Bureau</h4>
                          <p className="text-base text-gray-900">
                            Adidogomé sagbado dans le von de la Pharmacie Actuelle en allant vers le marché adidogomé, Lomé, Togo
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Clock className="h-6 w-6 text-elvec-600" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-500">Horaires d'Ouverture</h4>
                          <p className="text-base text-gray-900">Lun - Ven: 8h00 - 18h00</p>
                          <p className="text-base text-gray-900">Sam: 8h00 - 13h00</p>
                          <p className="text-base text-gray-900">Dim: Fermé</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
                
                <AnimatedSection animationType="slide-right">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-semibold mb-6 text-elvec-900">Formulaire de contact</h3>
                    <ContactForm />
                  </div>
                </AnimatedSection>
              </div>
            </TabsContent>

            <TabsContent value="rendezvous" className="mt-0">
              <div className="max-w-2xl mx-auto">
                <AnimatedSection>
                  <AppointmentForm />
                </AnimatedSection>
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-0">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                  <AnimatedSection>
                    <h3 className="text-2xl font-semibold mb-6 text-elvec-900">Notre emplacement</h3>
                    <p className="text-gray-600 mb-4">
                      Notre bureau principal est situé à Adidogomé sagbado, Lomé, Togo. Vous pouvez facilement nous trouver près de la Pharmacie Actuelle en allant vers le marché d'Adidogomé.
                    </p>
                    <div className="flex items-center mb-4">
                      <MapPin className="h-5 w-5 text-elvec-600 mr-2" />
                      <span className="font-medium">Adidogomé sagbado, Lomé, Togo</span>
                    </div>
                  </AnimatedSection>
                </div>
                <div className="h-96">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.9776547884837!2d1.2462684!3d6.144028799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e1fa8b4f5b87%3A0x7f8a2e1c9e3b4a5c!2sAdidogom%C3%A9%2C%20Lom%C3%A9%2C%20Togo!5e0!3m2!1sfr!2s!4v1650464744985!5m2!1sfr!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ELVEC-TOGO location - Adidogomé"
                  ></iframe>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faq" className="mt-0">
              <AnimatedSection>
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-elvec-900">Questions fréquemment posées</h3>
                  
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-lg font-medium text-elvec-700 mb-2">Quels types d'engins proposez-vous à la location ?</h4>
                      <p className="text-gray-600">
                        Nous proposons une large gamme d'engins lourds tels que des bulldozers, pelleteuses, chargeuses, tractopelles, compacteurs, et bien d'autres. Nous disposons également d'une flotte de véhicules de qualité pour vos déplacements.
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-lg font-medium text-elvec-700 mb-2">Quelle est la durée minimale de location ?</h4>
                      <p className="text-gray-600">
                        La durée minimale de location varie selon le type d'engin ou de véhicule. Pour les engins lourds, elle est généralement d'une journée (8 heures de travail). Pour les véhicules, nous proposons des locations à partir d'une journée.
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-lg font-medium text-elvec-700 mb-2">Les chauffeurs sont-ils inclus dans la location ?</h4>
                      <p className="text-gray-600">
                        Pour les engins lourds, nos opérateurs qualifiés sont inclus dans le prix de la location. Pour les véhicules, vous avez le choix entre une location avec ou sans chauffeur selon vos besoins.
                      </p>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-lg font-medium text-elvec-700 mb-2">Comment puis-je réserver un engin ou un véhicule ?</h4>
                      <p className="text-gray-600">
                        Vous pouvez nous contacter par téléphone, par email ou via notre formulaire de contact pour effectuer une réservation. Nous vous recommandons de réserver à l'avance pour garantir la disponibilité.
                      </p>
                    </div>
                    
                    <div className="pb-2">
                      <h4 className="text-lg font-medium text-elvec-700 mb-2">Quels sont les moyens de paiement acceptés ?</h4>
                      <p className="text-gray-600">
                        Nous acceptons les paiements en espèces, par virement bancaire et par Mobile Money (Flooz, T-Money). Un acompte est généralement demandé à la réservation.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
