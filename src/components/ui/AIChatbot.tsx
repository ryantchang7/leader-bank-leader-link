
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from './button';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🤖 Hi! I'm your AI-powered funding assistant. I'm here to help you learn about Leader Bank's funding options and find the perfect match for your business needs. Ask me anything about equity investment, debt financing, accelerator programs, or our application process!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = async (userMessage: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { message: userMessage }
      });

      if (error) {
        console.error('Error calling chat function:', error);
        return "I'm sorry, I'm having trouble connecting right now. Please try again or contact our team directly for assistance with your funding needs.";
      }

      return data.response || "I'm here to help with your funding questions. Could you please rephrase that?";
    } catch (error) {
      console.error('Error in getBotResponse:', error);
      return "I'm sorry, I'm experiencing technical difficulties. Please try again or reach out to our team directly.";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const botResponseText = await getBotResponse(inputValue);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Please try again or contact our team directly for assistance.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* AI Chat Trigger Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-xl transform transition-all duration-200 hover:scale-105 animate-pulse"
          size="icon"
        >
          <div className="relative">
            <MessageCircle className="h-7 w-7 text-white" />
            <Sparkles className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
          </div>
        </Button>
      )}

      {/* AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-scale-in">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -right-1" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Funding Assistant</h3>
                <p className="text-xs text-red-100 flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Live AI • Learn about funding options</span>
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-red-700 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                      : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <div className="relative">
                        <Bot className="h-4 w-4 mt-0.5 text-red-600" />
                        <Sparkles className="h-2 w-2 text-yellow-500 absolute -top-0.5 -right-0.5" />
                      </div>
                    )}
                    {message.sender === 'user' && <User className="h-4 w-4 mt-0.5" />}
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Bot className="h-4 w-4 text-red-600" />
                      <Sparkles className="h-2 w-2 text-yellow-500 absolute -top-0.5 -right-0.5" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about funding options, requirements, process..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white shadow-sm"
                disabled={isTyping}
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 p-3 rounded-xl shadow-md"
                size="icon"
                disabled={isTyping || !inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              🤖 Powered by AI • Learn about equity, debt & accelerator funding
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
