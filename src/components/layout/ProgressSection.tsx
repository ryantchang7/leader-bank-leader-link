
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

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
    { name: 'Basic Info', description: 'Company details' },
    { name: 'Funding Type', description: 'What you need' },
    { name: 'Details', description: 'Specific requirements' },
    { name: 'Final Steps', description: 'Complete application' }
  ];

  return (
    <div className="bg-white py-8 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{stepTitle}</h2>
            <span className="text-sm text-gray-600">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{stepDescription}</p>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  {index < currentStepIndex ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : index === currentStepIndex ? (
                    <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="h-4 w-4 bg-white rounded-full" />
                    </div>
                  ) : (
                    <Circle className="h-8 w-8 text-gray-300" />
                  )}
                </div>
                <div className="text-center">
                  <div className={`text-sm font-medium ${
                    index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </div>
                  <div className={`text-xs ${
                    index <= currentStepIndex ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
