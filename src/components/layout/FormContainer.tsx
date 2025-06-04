
import React, { useEffect } from 'react';
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
  // Scroll to form content when step changes
  useEffect(() => {
    const formContent = document.querySelector('.form-content-area');
    if (formContent) {
      formContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-gray-900 flex items-center">
                <Circle className="w-3 h-3 fill-red-600 text-red-600 mr-2" />
                {stepTitle}
              </CardTitle>
              <CardDescription className="mt-1">
                {stepDescription}
              </CardDescription>
            </div>
            {isStepComplete(currentStep) && (
              <CheckCircle className="w-6 h-6 text-green-600" />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-8 form-content-area">
          <div className="transition-all duration-300 ease-in-out">
            {children}
          </div>
          
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="flex items-center space-x-2 border-gray-300 hover:border-red-300 hover:text-red-600 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              {currentStepIndex === 3 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2 px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={!formData.agreeTerms || !formData.agreePrivacy}
                >
                  <span>Start Partnership</span>
                  <CheckCircle className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2 px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
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
