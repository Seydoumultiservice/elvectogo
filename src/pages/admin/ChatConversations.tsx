import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Search, MessageSquare, Phone, Mail, User, Calendar } from 'lucide-react';

interface Message {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

interface Conversation {
  id: string;
  session_id: string;
  visitor_name: string | null;
  visitor_email: string | null;
  visitor_phone: string | null;
  status: string;
  started_at: string;
  ended_at: string | null;
}

const ChatConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .order('started_at', { ascending: false });

      if (error) throw error;
      setConversations(data || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast.error('Erreur lors du chargement des conversations');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Erreur lors du chargement des messages');
    }
  };

  const openConversation = async (conv: Conversation) => {
    setSelectedConv(conv);
    await loadMessages(conv.id);
    setDialogOpen(true);
  };

  const archiveConversation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('chat_conversations')
        .update({ status: 'archived' })
        .eq('id', id);

      if (error) throw error;
      toast.success('Conversation archivée');
      loadConversations();
    } catch (error) {
      console.error('Error archiving conversation:', error);
      toast.error('Erreur lors de l\'archivage');
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const term = searchTerm.toLowerCase();
    return (
      conv.visitor_name?.toLowerCase().includes(term) ||
      conv.visitor_email?.toLowerCase().includes(term) ||
      conv.visitor_phone?.includes(term) ||
      conv.session_id.toLowerCase().includes(term)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'closed': return 'bg-blue-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Il y a moins d\'une heure';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-elvec-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des conversations...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conversations Chatbot</h1>
        <p className="text-gray-600">
          Gérez et consultez toutes les conversations avec vos visiteurs
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Rechercher par nom, email, téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">
              Total: {conversations.length}
            </Badge>
            <Badge className="bg-green-500">
              Actives: {conversations.filter(c => c.status === 'active').length}
            </Badge>
          </div>
        </div>

        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Aucune conversation trouvée</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredConversations.map((conv) => (
              <Card
                key={conv.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => openConversation(conv)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="font-semibold text-gray-900">
                        {conv.visitor_name || 'Visiteur Anonyme'}
                      </span>
                      <Badge className={getStatusColor(conv.status)}>
                        {conv.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {conv.visitor_email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{conv.visitor_email}</span>
                        </div>
                      )}
                      {conv.visitor_phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{conv.visitor_phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(conv.started_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        openConversation(conv);
                      }}
                    >
                      Voir
                    </Button>
                    {conv.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          archiveConversation(conv.id);
                        }}
                      >
                        Archiver
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              Conversation avec {selectedConv?.visitor_name || 'Visiteur Anonyme'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedConv && (
            <div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Email:</span>{' '}
                    {selectedConv.visitor_email || 'Non renseigné'}
                  </div>
                  <div>
                    <span className="font-semibold">Téléphone:</span>{' '}
                    {selectedConv.visitor_phone || 'Non renseigné'}
                  </div>
                  <div>
                    <span className="font-semibold">Début:</span>{' '}
                    {new Date(selectedConv.started_at).toLocaleString('fr-FR')}
                  </div>
                  <div>
                    <span className="font-semibold">Statut:</span>{' '}
                    <Badge className={getStatusColor(selectedConv.status)}>
                      {selectedConv.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <ScrollArea className="h-96 border rounded-lg p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-elvec-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(msg.created_at).toLocaleTimeString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ChatConversations;
