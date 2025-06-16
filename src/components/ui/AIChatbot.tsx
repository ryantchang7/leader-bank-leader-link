
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Leader Link assistant. I can help you learn about our funding options, application process, and how Leader Bank can support your company's growth. What would you like to know?",
      isBot: true,
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

  const predefinedResponses: { [key: string]: string } = {
    funding: "Leader Link offers three main funding pathways: 1) Equity Investment - connecting you with VCs and angel investors, 2) Debt Financing - traditional and alternative lending options through our bank network, and 3) Accelerator Programs - structured programs with mentorship and funding. Which option interests you most?",
    equity: "Our equity investment pathway connects you with pre-vetted investors including VCs, angel investors, and strategic partners. We match based on your industry, stage, and funding amount. The process typically takes 4-8 weeks from application to introduction.",
    debt: "Leader Bank offers various debt financing options including traditional term loans, SBA loans, equipment financing, and lines of credit. We also connect you with alternative lenders for revenue-based financing and merchant cash advances.",
    accelerator: "We partner with top-tier accelerator programs nationwide. These typically offer $25K-$250K in funding plus 3-6 months of intensive mentorship, networking, and demo day preparation. Great for early-stage companies looking for hands-on support.",
    process: "Our process is simple: 1) Complete our funding assessment (5-10 minutes), 2) We analyze your needs and match you with suitable options, 3) Receive personalized recommendations within 48 hours, 4) Get introduced to relevant funders or programs. No upfront fees.",
    bank: "Leader Bank is an FDIC-insured institution with over 30 years of experience in business banking. We combine traditional banking stability with innovative fintech solutions to help companies access capital and grow their businesses.",
    timeline: "Typical timelines vary by funding type: Debt financing (2-6 weeks), Equity introductions (4-8 weeks), Accelerator applications (varies by program cycle). We'll provide specific timelines based on your chosen pathway.",
    requirements: "Requirements vary by funding type, but generally include: basic company information, financial statements or projections, business plan summary, and funding amount needed. We'll guide you through specific requirements for your chosen pathway."
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('funding') || lowerInput.includes('money') || lowerInput.includes('capital')) {
      return predefinedResponses.funding;
    }
    if (lowerInput.includes('equity') || lowerInput.includes('investor') || lowerInput.includes('vc')) {
      return predefinedResponses.equity;
    }
    if (lowerInput.includes('debt') || lowerInput.includes('loan') || lowerInput.includes('lending')) {
      return predefinedResponses.debt;
    }
    if (lowerInput.includes('accelerator') || lowerInput.includes('program') || lowerInput.includes('mentor')) {
      return predefinedResponses.accelerator;
    }
    if (lowerInput.includes('process') || lowerInput.includes('how') || lowerInput.includes('work')) {
      return predefinedResponses.process;
    }
    if (lowerInput.includes('bank') || lowerInput.includes('leader') || lowerInput.includes('about')) {
      return predefinedResponses.bank;
    }
    if (lowerInput.includes('time') || lowerInput.includes('long') || lowerInput.includes('when')) {
      return predefinedResponses.timeline;
    }
    if (lowerInput.includes('requirement') || lowerInput.includes('need') || lowerInput.includes('document')) {
      return predefinedResponses.requirements;
    }
    
    return "I'd be happy to help you with information about our funding options, application process, or Leader Bank's services. You can ask me about equity investment, debt financing, accelerator programs, our process, requirements, or timelines. What specific area would you like to learn about?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-t-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-lg">Leader Link Assistant</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-gradient-to-r from-blue-600 to-red-600 text-white'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about funding options..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatbot;
