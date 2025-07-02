
import React from 'react';
import Header from '@/components/layout/Header';
import ProcessOverview from '@/components/layout/ProcessOverview';
import ProgressSection from '@/components/layout/ProgressSection';
import FormContainer from '@/components/layout/FormContainer';
import TrustIndicators from '@/components/layout/TrustIndicators';
import ThankYouPage from '@/components/ThankYouPage';
import { FormData } from '@/types/formData';

interface MainLayoutProps {
  children?: React.ReactNode;
  showResults?: boolean;
  showThankYou?: boolean;
  formData?: FormData;
  currentStep?: number;
  currentStepIndex?: number;
  progressPercentage?: number;
  stepTitle?: string;
  stepDescription?: string;
  isStepComplete?: (step: number) => boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onSubmit?: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showResults,
  showThankYou,
  formData,
  currentStep,
  currentStepIndex,
  progressPercentage,
  stepTitle,
  stepDescription,
  isStepComplete,
  onNext,
  onPrevious,
  onSubmit
}) => {
  // Show thank you page after successful submission
  if (showThankYou && formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <ThankYouPage formData={formData} />
        <TrustIndicators />
      </div>
    );
  }

  // Show results page after submission
  if (showResults && formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <ThankYouPage formData={formData} />
        <TrustIndicators />
      </div>
    );
  }

  // Show main form layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <ProcessOverview />
      {currentStepIndex !== undefined && progressPercentage !== undefined && stepTitle && stepDescription && (
        <ProgressSection 
          currentStepIndex={currentStepIndex}
          progressPercentage={progressPercentage}
          stepTitle={stepTitle}
          stepDescription={stepDescription}
        />
      )}
      {currentStep && currentStepIndex !== undefined && isStepComplete && stepTitle && stepDescription && formData && onNext && onPrevious && onSubmit && (
        <FormContainer
          currentStep={currentStep}
          currentStepIndex={currentStepIndex}
          isStepComplete={isStepComplete}
          stepTitle={stepTitle}
          stepDescription={stepDescription}
          formData={formData}
          onNext={onNext}
          onPrevious={onPrevious}
          onSubmit={onSubmit}
        >
          {children}
        </FormContainer>
      )}
      <TrustIndicators />
    </div>
  );
};

export default MainLayout;
