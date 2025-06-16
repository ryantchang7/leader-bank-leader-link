
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from './button';

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
      text: "Hi! I'm here to help you learn about Leader Bank's funding options. Ask me about equity investment, debt financing, accelerator programs, or anything about our services!",
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

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Equity investment responses
    if (message.includes('equity') || message.includes('investment') || message.includes('raise') || message.includes('funding round')) {
      return "Great question about equity investment! Leader Bank helps startups raise capital through our extensive investor network. We work with companies from seed stage to Series A and beyond. Our equity funding process includes business evaluation, investor matching, and deal facilitation. We typically work with companies raising $100K to $50M+. Would you like to know about our requirements or the application process?";
    }
    
    // Debt financing responses
    if (message.includes('debt') || message.includes('loan') || message.includes('lending') || message.includes('credit line')) {
      return "Leader Bank offers various debt financing options including revenue-based financing, equipment loans, lines of credit, and SBA loans. Our debt products are designed for profitable or near-profitable companies with recurring revenue. We can provide $50K to $10M+ in debt financing with competitive rates and flexible terms. Are you interested in learning about specific debt products or qualification criteria?";
    }
    
    // Accelerator responses
    if (message.includes('accelerator') || message.includes('incubator') || message.includes('program') || message.includes('mentorship')) {
      return "Our accelerator program connects startups with top-tier programs nationwide. We help match companies with accelerators that fit their industry, stage, and goals. Our network includes both equity and non-equity programs, from 3-month intensives to 12-month programs. We also provide preparation support for applications. What stage is your company and what type of accelerator are you considering?";
    }
    
    // Process and requirements
    if (message.includes('process') || message.includes('how') || message.includes('apply') || message.includes('application')) {
      return "Our process is designed to be efficient and transparent: 1) Complete our online application (takes 10-15 minutes), 2) Our team reviews and matches you with relevant opportunities, 3) We facilitate introductions and support due diligence, 4) We guide you through closing. The entire process typically takes 30-90 days depending on funding type. Ready to start your application?";
    }
    
    // Requirements and qualifications
    if (message.includes('requirement') || message.includes('qualify') || message.includes('eligible') || message.includes('criteria')) {
      return "Requirements vary by funding type: For equity - we work with startups at all stages with strong teams and market opportunity. For debt - we typically require $100K+ annual revenue and positive unit economics. For accelerators - early to growth stage companies with scalable business models. All applicants need a clear business plan and use of funds. What type of funding are you most interested in?";
    }
    
    // Timing and speed
    if (message.includes('time') || message.includes('fast') || message.includes('quick') || message.includes('when')) {
      return "Timeline depends on funding type and readiness: Debt financing can close in 2-4 weeks, equity rounds typically take 2-3 months, and accelerator applications are seasonal. Our team provides updates every step of the way. We prioritize companies that are funding-ready with complete documentation. How soon are you looking to secure funding?";
    }
    
    // About Leader Bank
    if (message.includes('leader bank') || message.includes('about') || message.includes('who') || message.includes('bank')) {
      return "Leader Bank is your strategic partner in finding the right funding path. We're FDIC-insured with decades of experience in business banking and capital markets. Our Leader Link platform connects companies with our extensive network of investors, lenders, and accelerator programs. We provide expert guidance throughout the entire funding process with bank-grade security and confidentiality.";
    }
    
    // Success stories and track record
    if (message.includes('success') || message.includes('track record') || message.includes('portfolio') || message.includes('results')) {
      return "We've helped hundreds of companies secure over $500M in funding across all stages and industries. Our success rate is 3x higher than industry average because we focus on proper preparation and strategic matching. We work with companies from tech startups to manufacturing businesses, with funding ranging from $50K to $50M+. Would you like to hear about companies in your specific industry?";
    }
    
    // Costs and fees
    if (message.includes('cost') || message.includes('fee') || message.includes('price') || message.includes('expensive')) {
      return "Our initial consultation and application review are complimentary. We only succeed when you do - our fees are typically success-based and aligned with your funding goals. Specific fee structures vary by funding type and deal size. We're transparent about all costs upfront with no hidden fees. Would you like to schedule a free consultation to discuss your specific situation?";
    }
    
    // Industries and sectors
    if (message.includes('industry') || message.includes('sector') || message.includes('tech') || message.includes('healthcare') || message.includes('fintech')) {
      return "We work across all industries including technology, healthcare, fintech, manufacturing, retail, SaaS, biotech, and more. Our investor network spans sector-specific funds and generalist investors. We understand that each industry has unique funding patterns and requirements. What industry is your company in? I can provide more specific guidance.";
    }
    
    // Contact and next steps
    if (message.includes('contact') || message.includes('talk') || message.includes('call') || message.includes('meet') || message.includes('next step')) {
      return "Ready to get started? The best next step is to complete our brief application on this page - it takes just 10-15 minutes. Our expert team will review your information within 2-3 business days and reach out with personalized recommendations. You can also reach us directly through the contact information on our website. Shall we start with your application?";
    }
    
    // Default response
    return "Thanks for your question! I can help you learn about equity investment, debt financing, accelerator programs, our application process, requirements, timeline, and more about Leader Bank's services. What specific aspect of funding would you like to know more about?";
  };

  const handleSend = () => {
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

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Trigger Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Leader Link Assistant</h3>
                <p className="text-xs text-red-100">Ask about funding options</p>
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && <Bot className="h-4 w-4 mt-0.5 text-red-600" />}
                    {message.sender === 'user' && <User className="h-4 w-4 mt-0.5" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4 text-red-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about funding options..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
              <Button
                onClick={handleSend}
                className="bg-red-600 hover:bg-red-700 p-2"
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
