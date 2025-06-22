
import React from 'react';
import { FileText, Target, Settings, Handshake } from 'lucide-react';

const ProcessOverview = () => {
  const steps = [
    {
      number: 1,
      title: "Company Information",
      description: "Basic business details & contact info",
      icon: FileText,
      color: "bg-blue-600"
    },
    {
      number: 2,
      title: "Funding Strategy",
      description: "Choose your optimal funding path",
      icon: Target,
      color: "bg-green-600"
    },
    {
      number: 3,
      title: "Detailed Requirements",
      description: "Specific funding needs & metrics",
      icon: Settings,
      color: "bg-purple-600"
    },
    {
      number: 4,
      title: "Strategic Partnership",
      description: "Begin expert-guided collaboration",
      icon: Handshake,
      color: "bg-red-600"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Streamlined 4-Step Partnership Process
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our proven methodology connects you with the right funding opportunities in minutes, not months
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.number} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-center h-full">
                  <div className={`w-12 h-12 ${step.color} text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 mx-auto`}>
                    {step.number}
                  </div>
                  <IconComponent className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {/* Connection arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-0.5 bg-gray-300"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Average completion time:</span> 10-15 minutes • 
            <span className="font-semibold"> Response time:</span> 2-3 business days
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessOverview;
