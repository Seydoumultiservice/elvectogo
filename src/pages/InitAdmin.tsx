import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const InitAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const assignAdminRole = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Calling assign-admin function...');
      
      const { data, error } = await supabase.functions.invoke('assign-admin', {
        body: {}
      });

      if (error) {
        console.error('Error calling function:', error);
        throw error;
      }

      console.log('Function response:', data);

      if (data?.success) {
        setSuccess(true);
        toast.success('Rôle administrateur attribué avec succès !');
        
        // Rediriger vers la page de connexion après 2 secondes
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        throw new Error(data?.error || 'Une erreur est survenue');
      }
    } catch (err: any) {
      console.error('Error:', err);
      const errorMessage = err.message || 'Impossible d\'attribuer le rôle administrateur';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-elvec-100 rounded-full mb-4">
            <Shield className="w-8 h-8 text-elvec-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Initialisation Administrateur
          </h1>
          <p className="text-gray-600">
            Cliquez sur le bouton ci-dessous pour attribuer le rôle administrateur à votre compte.
          </p>
        </div>

        {!success && !error && (
          <Button
            onClick={assignAdminRole}
            disabled={loading}
            className="w-full bg-elvec-600 hover:bg-elvec-700 text-white"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Attribution en cours...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Attribuer le rôle administrateur
              </>
            )}
          </Button>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center text-green-800">
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-semibold">Succès !</p>
                <p className="text-sm mt-1">
                  Rôle administrateur attribué. Redirection vers la page de connexion...
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start text-red-800">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Erreur</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
            <Button
              onClick={assignAdminRole}
              disabled={loading}
              className="w-full mt-4 bg-elvec-600 hover:bg-elvec-700 text-white"
            >
              Réessayer
            </Button>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Après l'attribution, vous pourrez vous connecter avec :<br />
            <span className="font-semibold text-gray-900">adminelvec@elvectogo.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InitAdmin;
