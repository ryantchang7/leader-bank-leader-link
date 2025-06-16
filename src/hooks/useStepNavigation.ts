
import { useState, useEffect } from 'react';
import { FormData } from '@/types/formData';
import { validateStep } from '@/utils/formValidation';

export const useStepNavigation = (formData: FormData) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const getVisibleSteps = () => {
    const steps = [1, 2];
    if (formData.seekingType === 'equity' || formData.seekingType === 'debt' || formData.seekingType === 'accelerator') {
      steps.push(3);
    }
    steps.push(4);
    return steps;
  };

  const visibleSteps = getVisibleSteps();
  const currentStepIndex = visibleSteps.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / 4) * 100;

  const isStepComplete = (step: number) => {
    return completedSteps.includes(step);
  };

  useEffect(() => {
    if (validateStep(currentStep, formData)) {
      setCompletedSteps(prev => 
        prev.includes(currentStep) ? prev : [...prev, currentStep]
      );
    } else {
      setCompletedSteps(prev => prev.filter(step => step !== currentStep));
    }
  }, [formData, currentStep]);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < visibleSteps.length) {
      setCurrentStep(visibleSteps[nextIndex]);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(visibleSteps[prevIndex]);
    }
  };

  return {
    currentStep,
    currentStepIndex,
    progressPercentage,
    isStepComplete,
    handleNext,
    handlePrevious,
    visibleSteps
  };
};
