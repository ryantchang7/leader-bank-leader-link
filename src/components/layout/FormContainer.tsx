
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CheckCircle, Circle, AlertCircle } from 'lucide-react';
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
  const isCurrentStepValid = validateStep(currentStep, formData);
  
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

  const isLastStep = currentStepIndex === 3;
  const canProceed = isLastStep ? (formData.agreeTerms && formData.agreePrivacy) : isCurrentStepValid;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Card className="shadow-xl border-0 bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-50 via-orange-50 to-red-50 border-b p-8 step-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl text-gray-900 flex items-center justify-center sm:justify-start gap-3 mb-2">
                <div className="relative">
                  <Circle className="w-8 h-8 text-red-600" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-sm">{currentStep}</span>
                  </div>
                </div>
                {stepTitle}
              </CardTitle>
              <CardDescription className="text-base text-gray-600">
                {stepDescription}
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-4">
              {isStepComplete(currentStep) ? (
                <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold text-sm">Complete</span>
                </div>
              ) : !isCurrentStepValid && currentStep > 1 ? (
                <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold text-sm">In Progress</span>
                </div>
              ) : null}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="transition-all duration-300 ease-in-out">
            {children}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-8 border-t border-gray-200 mt-8 space-y-4 sm:space-y-0">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 border-gray-300 hover:border-red-300 hover:text-red-600 disabled:opacity-50 order-2 sm:order-1 h-12 px-6"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Previous Step</span>
            </Button>
            
            <div className="flex items-center justify-center space-x-3 order-1 sm:order-2">
              {isLastStep ? (
                <Button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white flex items-center justify-center space-x-2 px-8 py-3 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  disabled={!canProceed}
                >
                  <span>Begin Strategic Partnership</span>
                  <CheckCircle className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white flex items-center justify-center space-x-2 px-8 py-3 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  disabled={!canProceed}
                >
                  <span>Continue to Step {currentStepIndex + 2}</span>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
          
          {!canProceed && !isLastStep && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800 text-center flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Please complete all required fields to continue
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormContainer;
