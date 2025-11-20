import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import RecentActivity from '@/components/admin/RecentActivity';
import { 
  Car, 
  Image as ImageIcon, 
  Calendar, 
  FileText, 
  GraduationCap, 
  MessageSquare,
  Plus,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    vehicles: 0,
    gallery: 0,
    appointments: 0,
    quotes: 0,
    training: 0,
    messages: 0,
    services: 0,
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const [
        vehiclesResult,
        galleryResult,
        appointmentsResult,
        quotesResult,
        trainingResult,
        messagesResult,
        servicesResult
      ] = await Promise.all([
        supabase.from('vehicles').select('id', { count: 'exact', head: true }),
        supabase.from('gallery_items').select('id', { count: 'exact', head: true }),
        supabase.from('appointments').select('id', { count: 'exact', head: true }),
        supabase.from('quotes').select('id', { count: 'exact', head: true }),
        supabase.from('training_registrations').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        vehicles: vehiclesResult.count || 0,
        gallery: galleryResult.count || 0,
        appointments: appointmentsResult.count || 0,
        quotes: quotesResult.count || 0,
        training: trainingResult.count || 0,
        messages: messagesResult.count || 0,
        services: servicesResult.count || 0,
      });

      // Load recent activities
      const activities = [];
      
      const { data: recentMessages } = await supabase
        .from('contact_messages')
        .select('id, nom, created_at')
        .order('created_at', { ascending: false })
        .limit(3);
      
      const { data: recentAppointments } = await supabase
        .from('appointments')
        .select('id, full_name, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      const { data: recentQuotes } = await supabase
        .from('quotes')
        .select('id, nom, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (recentMessages) {
        activities.push(...recentMessages.map(m => ({
          id: m.id,
          type: 'message' as const,
          title: `Nouveau message`,
          description: `De ${m.nom}`,
          timestamp: new Date(m.created_at)
        })));
      }

      if (recentAppointments) {
        activities.push(...recentAppointments.map(a => ({
          id: a.id,
          type: 'appointment' as const,
          title: `Nouveau rendez-vous`,
          description: `Avec ${a.full_name}`,
          timestamp: new Date(a.created_at)
        })));
      }

      if (recentQuotes) {
        activities.push(...recentQuotes.map(q => ({
          id: q.id,
          type: 'quote' as const,
          title: `Nouvelle demande de devis`,
          description: `Par ${q.nom}`,
          timestamp: new Date(q.created_at)
        })));
      }

      activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      setRecentActivities(activities.slice(0, 8));

    } catch (error) {
      console.error('Error loading stats:', error);
      toast.error('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Chargement...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Bienvenue, {user?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Messages"
            value={stats.messages}
            icon={MessageSquare}
            color="text-green-600"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Rendez-vous"
            value={stats.appointments}
            icon={Calendar}
            color="text-purple-600"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Demandes de devis"
            value={stats.quotes}
            icon={FileText}
            color="text-orange-600"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Formations"
            value={stats.training}
            icon={GraduationCap}
            color="text-red-600"
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Quick Stats */}
        <Card className="p-6 bg-gradient-to-r from-elvec-600 to-elvec-800 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">Statistiques Rapides</h3>
              <p className="text-elvec-100">Aperçu de votre plateforme</p>
            </div>
            <TrendingUp className="h-12 w-12 text-elvec-200" />
          </div>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div>
              <p className="text-elvec-200 text-sm">Véhicules</p>
              <p className="text-3xl font-bold">{stats.vehicles}</p>
            </div>
            <div>
              <p className="text-elvec-200 text-sm">Photos Galerie</p>
              <p className="text-3xl font-bold">{stats.gallery}</p>
            </div>
            <div>
              <p className="text-elvec-200 text-sm">Services Actifs</p>
              <p className="text-3xl font-bold">{stats.services}</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity activities={recentActivities} />
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
            <div className="space-y-3">
              <Link to="/admin/messages">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Voir les messages
                </Button>
              </Link>
              <Link to="/admin/galerie">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter à la galerie
                </Button>
              </Link>
              <Link to="/admin/rdv">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Gérer rendez-vous
                </Button>
              </Link>
              <Link to="/admin/devis">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Voir les devis
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
