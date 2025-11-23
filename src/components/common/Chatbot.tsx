import { MessageCircle, X, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isStreaming?: boolean;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    let id = localStorage.getItem('elvec_chat_session');
    if (!id) {
      id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('elvec_chat_session', id);
    }
    return id;
  });
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      addBotMessage("Bonjour ! 👋 Bienvenue chez ELVEC TOGO. Comment puis-je vous aider aujourd'hui ?");
    }
  }, [isOpen]);

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isBot: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const streamChatResponse = async (userMessage: string) => {
    setIsLoading(true);
    
    // Créer un message vide pour le bot
    const botMessageId = Date.now();
    const botMessage: Message = {
      id: botMessageId,
      text: '',
      isBot: true,
      timestamp: new Date(),
      isStreaming: true,
    };
    setMessages((prev) => [...prev, botMessage]);

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-openrouter', {
        body: {
          messages: [
            ...messages.map(m => ({
              role: m.isBot ? 'assistant' : 'user',
              content: m.text
            })),
            { role: 'user', content: userMessage }
          ],
          sessionId,
          conversationId
        }
      });

      if (error) throw error;

      // Lire le stream SSE
      const response = data;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                accumulatedText += content;
                
                // Mettre à jour le message du bot en temps réel
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessageId
                      ? { ...msg, text: accumulatedText, isStreaming: false }
                      : msg
                  )
                );
              }
            } catch (e) {
              // Ignorer les erreurs de parsing
            }
          }
        }
      }
    } catch (error) {
      console.error('Error streaming chat:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: "Désolé, une erreur s'est produite. Veuillez contacter notre équipe au +228 70 60 03 06.",
                isStreaming: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = async (question: string) => {
    addUserMessage(question);
    await streamChatResponse(question);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() && !isLoading) {
      const message = inputValue;
      setInputValue('');
      addUserMessage(message);
      await streamChatResponse(message);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    { icon: '📋', text: 'Demander un devis' },
    { icon: '🚜', text: 'Louer un engin' },
    { icon: '🚗', text: 'Louer une voiture' },
    { icon: '📞', text: 'Vos coordonnées' },
    { icon: '⏰', text: 'Vos horaires' },
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-elvec-500 hover:bg-elvec-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Ouvrir le chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-12rem)] bg-white rounded-lg shadow-2xl flex flex-col animate-slide-up">
          {/* Header */}
          <div className="bg-elvec-600 text-white p-4 rounded-t-lg flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/chatbot-avatar.png" 
                alt="Service Client ELVEC" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Service Client ELVEC</h3>
              <div className="flex items-center gap-1 text-xs">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>En ligne</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'bg-elvec-500 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="p-3 bg-white border-t flex gap-2 flex-wrap">
              {quickReplies.map((reply) => (
                <button
                  key={reply.text}
                  onClick={() => handleQuickReply(reply.text)}
                  className="text-xs bg-elvec-50 hover:bg-elvec-100 text-elvec-700 px-3 py-2 rounded-full transition-colors"
                >
                  {reply.icon} {reply.text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                maxLength={500}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-elvec-500 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-elvec-500 hover:bg-elvec-600 text-white px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">
              {inputValue.length}/500
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
