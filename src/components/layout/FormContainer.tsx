
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import { FormData } from '@/types/formData';
import { validateStep } from '@/utils/formValidation';

interface FormContainerProps {
  currentStep: number;
  currentStepIndex: number;
  isStepComplete: (step: number) => boolean;
  stepTitle: string;
  stepDescription: string;
  formData: FormData;
  children: React.ReactNode;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
  currentStep,
  currentStepIndex,
  isStepComplete,
  stepTitle,
  stepDescription,
  formData,
  children,
  onNext,
  onPrevious,
  onSubmit
}) => {
  const hasScrolledRef = useRef(false);
  
  // Scroll to step header when step changes (but not on initial load of step 1)
  useEffect(() => {
    if (currentStep === 1 && !hasScrolledRef.current) {
      // Don't scroll on initial load of step 1
      hasScrolledRef.current = true;
      return;
    }
    
    const stepHeader = document.querySelector('.step-header');
    if (stepHeader && currentStep > 1) {
      stepHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  const handleNext = () => {
    onNext();
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b p-4 sm:p-6 step-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="text-center sm:text-left">
              <CardTitle className="text-lg sm:text-xl text-gray-900 flex items-center justify-center sm:justify-start">
                <Circle className="w-3 h-3 fill-red-600 text-red-600 mr-2" />
                {stepTitle}
              </CardTitle>
              <CardDescription className="mt-1 text-sm">
                {stepDescription}
              </CardDescription>
            </div>
            {isStepComplete(currentStep) && (
              <CheckCircle className="w-6 h-6 text-green-600 mx-auto sm:mx-0" />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-8">
          <div className="transition-all duration-300 ease-in-out">
            {children}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-6 sm:pt-8 border-t border-gray-200 mt-6 sm:mt-8 space-y-4 sm:space-y-0">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 border-gray-300 hover:border-red-300 hover:text-red-600 disabled:opacity-50 order-2 sm:order-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            
            <div className="flex items-center justify-center space-x-3 order-1 sm:order-2">
              {currentStepIndex === 3 ? (
                <Button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={!formData.agreeTerms || !formData.agreePrivacy}
                >
                  <span>Start Partnership</span>
                  <CheckCircle className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={!validateStep(currentStep, formData)}
                >
                  <span>Continue to Step {currentStepIndex + 2}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormContainer;
