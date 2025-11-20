import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  GraduationCap, 
  Image, 
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Déconnexion réussie");
      navigate('/login');
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  const menuItems = [
    { 
      title: 'Tableau de bord', 
      path: '/admin/dashboard', 
      icon: LayoutDashboard,
      color: 'text-blue-600'
    },
    { 
      title: 'Messages', 
      path: '/admin/messages', 
      icon: MessageSquare,
      color: 'text-green-600'
    },
    { 
      title: 'Rendez-vous', 
      path: '/admin/appointments', 
      icon: Calendar,
      color: 'text-purple-600'
    },
    { 
      title: 'Demandes de devis', 
      path: '/admin/quotes', 
      icon: FileText,
      color: 'text-orange-600'
    },
    { 
      title: 'Inscriptions formation', 
      path: '/admin/training', 
      icon: GraduationCap,
      color: 'text-red-600'
    },
    { 
      title: 'Galerie', 
      path: '/admin/gallery', 
      icon: Image,
      color: 'text-pink-600'
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/logo-elvec.jpg" 
                alt="ELVEC Logo" 
                className="h-10 w-10 rounded-lg object-cover shadow-sm"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">ELVEC Admin</h1>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                Voir le site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:sticky top-[57px] left-0 z-30 h-[calc(100vh-57px)]
            w-64 bg-white border-r border-gray-200 
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto
          `}
        >
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200 group
                    ${active 
                      ? 'bg-elvec-50 text-elvec-700 shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${active ? item.color : 'text-gray-400 group-hover:text-gray-600'}`} />
                  <span className={`flex-1 font-medium ${active ? 'font-semibold' : ''}`}>
                    {item.title}
                  </span>
                  {active && <ChevronRight className="h-4 w-4 text-elvec-600" />}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
