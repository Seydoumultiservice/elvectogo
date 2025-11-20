import { MessageCircle, X, Send, Phone, Mail, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
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

  const handleQuickReply = (question: string) => {
    addUserMessage(question);
    
    setTimeout(() => {
      let response = '';
      const lowerQuestion = question.toLowerCase();

      if (lowerQuestion.includes('devis') || lowerQuestion.includes('prix') || lowerQuestion.includes('tarif')) {
        response = "💰 Pour obtenir un devis personnalisé adapté à vos besoins, je vous invite à cliquer sur le bouton 'Demander un devis' sur notre site ou à nous contacter directement.\n\n📞 Commercial: +228 70 60 03 06\n🏢 Direction: +228 92 74 82 70\n\nNotre équipe se fera un plaisir de vous établir un devis gratuit ! 😊";
      } else if (lowerQuestion.includes('engin') || lowerQuestion.includes('louer un engin')) {
        response = "🚜 Nous disposons d'une flotte complète d'engins lourds :\n\n• Bulldozers 🏗️\n• Pelles mécaniques ⛏️\n• Niveleuses 📏\n• Compacteurs 🔨\n• Grues 🏗️\n• Et bien plus !\n\nAppelez-nous au +228 70 60 03 06 pour connaître les disponibilités et tarifs. 📱";
      } else if (lowerQuestion.includes('voiture') || lowerQuestion.includes('véhicule')) {
        response = "🚗 Nous proposons un service de location de voitures avec chauffeur professionnel !\n\n✅ Véhicules récents et bien entretenus\n✅ Chauffeurs ponctuels et qualifiés\n✅ Service disponible 24/7\n\nContactez-nous au +228 70 60 03 06 pour réserver. 📞";
      } else if (lowerQuestion.includes('coordonnées') || lowerQuestion.includes('contact')) {
        response = "📞 *Téléphones:*\n• Commercial: +228 70 60 03 06\n• Direction: +228 92 74 82 70\n\n📱 *WhatsApp:*\n• Commercial: +228 90 94 06 95\n• Direction: +228 92 74 82 70\n\n📧 *Email:* contact@elvectogo.com\n📍 *Adresse:* Adidogomé Sagbado, Lomé, Togo\n\nN'hésitez pas à nous contacter, nous sommes à votre écoute ! 😊";
      } else if (lowerQuestion.includes('horaire') || lowerQuestion.includes('ouvert')) {
        response = "🕐 *Nos horaires d'ouverture:*\n\n📅 Lundi - Vendredi:\n   07h00 - 12h00 | 14h00 - 18h00\n\n📅 Samedi:\n   07h00 - 12h00\n\n🔴 Dimanche: Fermé\n\nNous sommes également joignables par téléphone pendant ces horaires. 📞";
      } else if (lowerQuestion.includes('formation') || lowerQuestion.includes('apprendre')) {
        response = "🎓 Nous proposons une formation professionnelle de conduite d'engins lourds !\n\n📅 Durée: 3 mois\n💰 Coût: 300 000 Fcfa\n📝 Inscription: 10 000 Fcfa\n\n🎯 Ce que vous apprendrez:\n• Tractopelle (BTP et agriculture)\n• Excavatrice 🏗️\n• Chargeur sur pneu 🚜\n• Niveleuse 📏\n• Compacteur 🔨\n\nContactez-nous pour plus d'informations ! 📱";
      } else if (lowerQuestion.includes('humain') || lowerQuestion.includes('conseiller')) {
        response = "👤 Pour parler directement avec un conseiller ELVEC, vous pouvez:\n\n📱 WhatsApp Commercial: +228 90 94 06 95\n🏢 WhatsApp Direction: +228 92 74 82 70\n📞 Appeler: +228 70 60 03 06\n\nNos conseillers sont disponibles du lundi au samedi ! 😊";
      } else {
        response = "Merci pour votre message ! 😊\n\nPour une réponse personnalisée, je vous invite à nous contacter directement:\n\n📞 +228 70 60 03 06\n📧 contact@elvectogo.com\n\nOu cliquez sur le bouton ci-dessous pour parler à un conseiller ! 👇";
      }

      addBotMessage(response);
    }, 800);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      handleQuickReply(inputValue);
      setInputValue('');
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
    { icon: '🎓', text: 'Formation engins' },
    { icon: '📞', text: 'Vos coordonnées' },
    { icon: '⏰', text: 'Vos horaires' },
    { icon: '👤', text: 'Parler à un conseiller' },
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
                disabled={!inputValue.trim()}
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
