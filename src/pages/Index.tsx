
import React, { useState } from 'react';
import BasicInfo from '@/components/forms/BasicInfo';
import FundingOptions from '@/components/forms/FundingOptions';
import EquityInvestment from '@/components/forms/EquityInvestment';
import DebtFinancing from '@/components/forms/DebtFinancing';
import AcceleratorProgram from '@/components/forms/AcceleratorProgram';
import FinalSteps from '@/components/forms/FinalSteps';
import AcceleratorResults from '@/components/AcceleratorResults';
import Header from '@/components/layout/Header';
import ProcessOverview from '@/components/layout/ProcessOverview';
import ProgressSection from '@/components/layout/ProgressSection';
import FormContainer from '@/components/layout/FormContainer';
import TrustIndicators from '@/components/layout/TrustIndicators';
import { FormData } from '@/types/formData';
import { useStepNavigation } from '@/hooks/useStepNavigation';
import { getStepTitle, getStepDescription } from '@/utils/stepUtils';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
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

  const [showResults, setShowResults] = useState(false);

  const {
    currentStep,
    currentStepIndex,
    progressPercentage,
    isStepComplete,
    handleNext,
    handlePrevious
  } = useStepNavigation(formData);

  const saveSubmissionToDatabase = async (submissionData: FormData) => {
    try {
      console.log('Saving submission to database:', submissionData);
      
      // Prepare data for submissions table
      const submissionPayload = {
        borrower_name: submissionData.borrowerName,
        contact_name: submissionData.contactName,
        contact_email: submissionData.contactEmail,
        contact_phone: submissionData.contactPhone || null,
        company_hq: submissionData.companyHQ,
        business_stage: submissionData.businessStage,
        industry: submissionData.industry,
        vertical: submissionData.vertical || null,
        seeking_type: submissionData.seekingType,
        raise_amount: submissionData.raiseAmount || null,
        business_description: submissionData.productDescription || null,
        funding_purpose: submissionData.useOfFunds || null,
        current_revenue: submissionData.lastTwelveRevenue || null,
        previous_funding: submissionData.totalEquityRaised || null
      };

      const { data: submissionResult, error: submissionError } = await supabase
        .from('submissions')
        .insert([submissionPayload])
        .select();

      if (submissionError) {
        console.error('Error saving submission:', submissionError);
        throw submissionError;
      }

      console.log('Submission saved successfully:', submissionResult);

      // If it's an accelerator submission, also save to accelerator_applications
      if (submissionData.seekingType === 'accelerator') {
        const acceleratorPayload = {
          startup_name: submissionData.borrowerName,
          founder_name: submissionData.contactName,
          founder_email: submissionData.contactEmail,
          founder_phone: submissionData.contactPhone || null,
          company_stage: submissionData.businessStage,
          industry: submissionData.industry,
          accelerator_id: 'general', // We can expand this later for specific accelerators
          application_data: submissionData, // Store full form data as JSON
          status: 'submitted'
        };

        const { data: acceleratorResult, error: acceleratorError } = await supabase
          .from('accelerator_applications')
          .insert([acceleratorPayload])
          .select();

        if (acceleratorError) {
          console.error('Error saving accelerator application:', acceleratorError);
          // Don't throw here as the main submission was saved
        } else {
          console.log('Accelerator application saved successfully:', acceleratorResult);
        }
      }

      return submissionResult;
    } catch (error) {
      console.error('Error in saveSubmissionToDatabase:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    console.log('Form submitted:', formData);
    
    try {
      // Save to database first
      await saveSubmissionToDatabase(formData);
      
      if (formData.seekingType === 'accelerator') {
        setShowResults(true);
      } else {
        const successMessage = `Thanks, ${formData.finalFullName}! 🎉\n\nOur expert team will review your information and reach out within 2-3 business days with personalized funding recommendations.\n\nIn the meantime, we'll send you some helpful resources based on your ${formData.seekingType} funding goals.\n\nWelcome to the Leader Bank Leader Link family!`;
        alert(successMessage);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert('There was an error submitting your application. Please try again or contact support.');
    }
  };

  // Show results page for accelerator users after submission
  if (showResults && formData.seekingType === 'accelerator') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <AcceleratorResults formData={formData} />
        <TrustIndicators />
      </div>
    );
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <FundingOptions formData={formData} setFormData={setFormData} />;
      case 3:
        if (formData.seekingType === 'equity') {
          return <EquityInvestment formData={formData} setFormData={setFormData} />;
        } else if (formData.seekingType === 'debt') {
          return <DebtFinancing formData={formData} setFormData={setFormData} />;
        } else {
          return <AcceleratorProgram formData={formData} setFormData={setFormData} />;
        }
      case 4:
        return <FinalSteps formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  const stepTitle = getStepTitle(currentStep);
  const stepDescription = getStepDescription(currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <ProcessOverview />
      <ProgressSection 
        currentStepIndex={currentStepIndex}
        progressPercentage={progressPercentage}
        stepTitle={stepTitle}
        stepDescription={stepDescription}
      />
      <FormContainer
        currentStep={currentStep}
        currentStepIndex={currentStepIndex}
        isStepComplete={isStepComplete}
        stepTitle={stepTitle}
        stepDescription={stepDescription}
        formData={formData}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
      >
        {renderCurrentStep()}
      </FormContainer>
      <TrustIndicators />
    </div>
  );
};

export default Index;
