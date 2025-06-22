
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Shield, CheckCircle } from 'lucide-react';

interface ProgressSectionProps {
  currentStepIndex: number;
  progressPercentage: number;
  stepTitle: string;
  stepDescription: string;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({
  currentStepIndex,
  progressPercentage,
  stepTitle,
  stepDescription
}) => {
  const steps = [
    "Company Information",
    "Funding Strategy", 
    "Detailed Requirements",
    "Strategic Partnership"
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Step indicators */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    ${index < currentStepIndex 
                      ? 'bg-green-600 text-white' 
                      : index === currentStepIndex 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {index < currentStepIndex ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`
                    ml-2 text-sm font-medium hidden sm:inline
                    ${index <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'}
                  `}>
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-8 h-0.5 hidden sm:block
                    ${index < currentStepIndex ? 'bg-green-600' : 'bg-gray-200'}
                  `} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900">
              Step {currentStepIndex + 1}: {stepTitle}
            </h2>
            <p className="text-gray-600 mt-1">
              {stepDescription}
            </p>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-2xl font-bold text-red-600">
              {Math.round(progressPercentage)}%
            </div>
            <div className="text-sm text-gray-500">
              Complete
            </div>
          </div>
        </div>
        
        <Progress value={progressPercentage} className="h-3 mb-4" />
        
        <div className="flex items-center justify-center text-sm text-gray-600 gap-2 bg-green-50 py-3 px-4 rounded-lg border border-green-200">
          <Shield className="h-4 w-4 text-green-600" />
          <span className="text-center font-medium">
            Your information is encrypted and protected by enterprise-grade banking security
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
