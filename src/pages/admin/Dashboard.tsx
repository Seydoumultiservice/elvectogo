import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Image,
  Briefcase,
  Calendar,
  FileText,
  Users,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Dashboard = () => {
  const { signOut, user } = useAuth();
  const [stats, setStats] = useState({
    vehicles: 0,
    gallery: 0,
    appointments: 0,
    services: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [vehiclesResult, galleryResult, appointmentsResult, servicesResult] =
      await Promise.all([
        supabase.from('vehicles').select('id', { count: 'exact', head: true }),
        supabase.from('gallery_items').select('id', { count: 'exact', head: true }),
        supabase.from('appointments').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
      ]);

    setStats({
      vehicles: vehiclesResult.count || 0,
      gallery: galleryResult.count || 0,
      appointments: appointmentsResult.count || 0,
      services: servicesResult.count || 0,
    });
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Erreur lors de la déconnexion');
    } else {
      toast.success('Déconnexion réussie');
    }
  };

  const menuItems = [
    {
      title: 'Véhicules',
      description: 'Gérer les véhicules et leurs photos',
      icon: Car,
      link: '/admin/vehicules',
      count: stats.vehicles,
      color: 'bg-blue-500',
    },
    {
      title: 'Galerie',
      description: 'Gérer les images de la galerie',
      icon: Image,
      link: '/admin/galerie',
      count: stats.gallery,
      color: 'bg-purple-500',
    },
    {
      title: 'Services',
      description: 'Gérer les services proposés',
      icon: Briefcase,
      link: '/admin/services',
      count: stats.services,
      color: 'bg-green-500',
    },
    {
      title: 'Rendez-vous',
      description: 'Gérer les demandes de rendez-vous',
      icon: Calendar,
      link: '/admin/rdv',
      count: stats.appointments,
      color: 'bg-orange-500',
    },
    {
      title: 'Contenu',
      description: 'Gérer le contenu du site',
      icon: FileText,
      link: '/admin/contenu',
      count: null,
      color: 'bg-indigo-500',
    },
    {
      title: 'Utilisateurs',
      description: 'Gérer les utilisateurs et rôles',
      icon: Users,
      link: '/admin/utilisateurs',
      count: null,
      color: 'bg-pink-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src="/lovable-uploads/2b8380f1-7282-4343-a0a8-40704b599087.png"
                alt="ELVEC-TOGO"
                className="h-12"
              />
              <div>
                <h1 className="text-2xl font-bold text-elvec-900">Administration</h1>
                <p className="text-sm text-gray-600">Bienvenue, {user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline">Voir le site</Button>
              </Link>
              <Button
                variant="destructive"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h2>
          <p className="text-gray-600">
            Gérez tous les aspects de votre site web ELVEC-TOGO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`${item.color} text-white p-3 rounded-lg group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  {item.count !== null && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-gray-700">
                        {item.count}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-elvec-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              <div className="bg-gray-50 px-6 py-3 border-t group-hover:bg-elvec-50 transition-colors">
                <span className="text-sm font-medium text-elvec-600 group-hover:text-elvec-700">
                  Gérer →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total véhicules</p>
                <p className="text-3xl font-bold text-gray-900">{stats.vehicles}</p>
              </div>
              <Car className="h-12 w-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Photos galerie</p>
                <p className="text-3xl font-bold text-gray-900">{stats.gallery}</p>
              </div>
              <Image className="h-12 w-12 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rendez-vous</p>
                <p className="text-3xl font-bold text-gray-900">{stats.appointments}</p>
              </div>
              <Calendar className="h-12 w-12 text-orange-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Services actifs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.services}</p>
              </div>
              <Briefcase className="h-12 w-12 text-green-500 opacity-20" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
