
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Shield } from 'lucide-react';

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
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Step {currentStepIndex + 1}: {stepTitle}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              {stepDescription}
            </p>
          </div>
          <div className="text-center sm:text-right">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStepIndex + 1} of 4
            </span>
            <div className="text-xs text-gray-500">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>
        </div>
        
        <Progress value={progressPercentage} className="h-2 sm:h-3 mb-3 sm:mb-4" />
        
        <div className="flex items-center justify-center text-xs text-gray-500 gap-2">
          <Shield className="h-3 w-3" />
          <span className="text-center">Your information is encrypted and protected by bank-grade security</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
