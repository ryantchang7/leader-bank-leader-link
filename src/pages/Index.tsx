
import React, { useState, useEffect } from 'react';
import FormStepRenderer from '@/components/forms/FormStepRenderer';
import MainLayout from '@/components/layout/MainLayout';
import { FormData } from '@/types/formData';
import { useStepNavigation } from '@/hooks/useStepNavigation';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { getStepTitle, getStepDescription } from '@/utils/stepUtils';

const Index = () => {
  console.log('Index component rendering...');

  const [formData, setFormData] = useState<FormData>({
    borrowerName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    companyHQ: '',
    businessStage: '',
    industry: '',
    vertical: '',
    seekingType: '',
    raiseAmount: '',
    plannedValuation: '',
    useOfFunds: '',
    lastTwelveRevenue: '',
    growthRate: '',
    customersUsers: '',
    grossMargin: '',
    burnRate: '',
    foundersInfo: '',
    headcount: '',
    existingInvestors: '',
    totalEquityRaised: '',
    productDescription: '',
    competitiveLandscape: '',
    pitchDeck: null,
    financialModel: null,
    debtType: [],
    debtDescription: '',
    debtSize: '',
    debtUseOfFunds: '',
    monthsInBusiness: '',
    priorYearRevenue: '',
    projectedRevenue: '',
    hasRecurringRevenue: '',
    annualRecurringRevenue: '',
    isEbitdaPositive: '',
    monthsToEbitda: '',
    ventureBacked: '',
    totalPEVCFunding: '',
    hasVCBoard: '',
    cashRunway: '',
    hasCollateral: '',
    collateralType: '',
    personalGuarantee: '',
    acceptCovenants: '',
    pledgeWarrants: '',
    financialStatements: null,
    businessPlan: null,
    pastAccelerator: '',
    acceleratorNames: '',
    acceleratorLocation: '',
    programCohort: '',
    programDates: '',
    acceleratorFunding: '',
    equityStake: '',
    keyResources: '',
    currentlyApplying: '',
    applyingTo: '',
    applicationDeadlines: '',
    soughtBenefits: [],
    top3Goals: '',
    wantConnections: '',
    finalFullName: '',
    titleRole: '',
    agreeTerms: '',
    agreePrivacy: ''
  });

  const {
    currentStep,
    currentStepIndex,
    progressPercentage,
    isStepComplete,
    handleNext,
    handlePrevious
  } = useStepNavigation(formData);

  const {
    showResults,
    showThankYou,
    handleSubmit
  } = useFormSubmission();

  useEffect(() => {
    console.log('Index component mounted successfully');
    console.log('Current step:', currentStep);
    console.log('Form data initialized:', !!formData);
  }, [currentStep, formData]);

  const stepTitle = getStepTitle(currentStep);
  const stepDescription = getStepDescription(currentStep);

  const onSubmit = () => {
    console.log('Form submission triggered');
    handleSubmit(formData);
  };

  console.log('Rendering MainLayout with:', {
    currentStep,
    currentStepIndex,
    progressPercentage,
    showResults,
    showThankYou
  });

  return (
    <MainLayout
      showResults={showResults}
      showThankYou={showThankYou}
      formData={formData}
      currentStep={currentStep}
      currentStepIndex={currentStepIndex}
      progressPercentage={progressPercentage}
      stepTitle={stepTitle}
      stepDescription={stepDescription}
      isStepComplete={isStepComplete}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSubmit={onSubmit}
    >
      <FormStepRenderer
        currentStep={currentStep}
        formData={formData}
        setFormData={setFormData}
      />
    </MainLayout>
  );
};

export default Index;
