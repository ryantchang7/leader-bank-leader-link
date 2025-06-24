import React, { useState } from 'react';
import BasicInfo from '@/components/forms/BasicInfo';
import FundingOptions from '@/components/forms/FundingOptions';
import EquityInvestment from '@/components/forms/EquityInvestment';
import DebtFinancing from '@/components/forms/DebtFinancing';
import AcceleratorProgram from '@/components/forms/AcceleratorProgram';
import FinalSteps from '@/components/forms/FinalSteps';
import AcceleratorResults from '@/components/AcceleratorResults';
import ThankYouPage from '@/components/ThankYouPage';
import Header from '@/components/layout/Header';
import ProcessOverview from '@/components/layout/ProcessOverview';
import ProgressSection from '@/components/layout/ProgressSection';
import FormContainer from '@/components/layout/FormContainer';
import TrustIndicators from '@/components/layout/TrustIndicators';
import AIChatbot from '@/components/ui/AIChatbot';
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
  const [showThankYou, setShowThankYou] = useState(false);

  const {
    currentStep,
    currentStepIndex,
    progressPercentage,
    isStepComplete,
    handleNext,
    handlePrevious
  } = useStepNavigation(formData);

  const sendSubmissionEmail = async (submissionData: FormData) => {
    try {
      console.log('Sending comprehensive submission email via edge function');
      
      const { data, error } = await supabase.functions.invoke('send-submission-email', {
        body: submissionData
      });

      if (error) {
        console.error('Error sending submission email:', error);
        throw error;
      }

      console.log('Submission email sent successfully:', data);
      return { success: true };
    } catch (error) {
      console.error('Failed to send submission email:', error);
      return { success: false, error };
    }
  };

  const saveSubmissionToDatabase = async (submissionData: FormData) => {
    try {
      console.log('Starting submission save process with data:', submissionData);
      
      // Prepare data for submissions table
      const submissionPayload = {
        borrower_name: submissionData.borrowerName || '',
        contact_name: submissionData.contactName || '',
        contact_email: submissionData.contactEmail || '',
        contact_phone: submissionData.contactPhone || null,
        company_hq: submissionData.companyHQ || '',
        business_stage: submissionData.businessStage || '',
        industry: submissionData.industry || '',
        vertical: submissionData.vertical || null,
        seeking_type: submissionData.seekingType || '',
        raise_amount: submissionData.raiseAmount || null,
        business_description: submissionData.productDescription || null,
        funding_purpose: submissionData.useOfFunds || null,
        current_revenue: submissionData.lastTwelveRevenue || null,
        previous_funding: submissionData.totalEquityRaised || null,
        submitted_at: new Date().toISOString(),
        status: 'new',
        priority: 'medium'
      };

      console.log('Prepared submission payload:', submissionPayload);

      // Insert into submissions table
      const { data: submissionResult, error: submissionError } = await supabase
        .from('submissions')
        .insert([submissionPayload])
        .select();

      if (submissionError) {
        console.error('Supabase submission error details:', {
          message: submissionError.message,
          details: submissionError.details,
          hint: submissionError.hint,
          code: submissionError.code
        });
        
        // Create a fallback record for manual processing
        console.log('FALLBACK DATA FOR MANUAL PROCESSING:', {
          timestamp: new Date().toISOString(),
          submissionPayload,
          fullFormData: submissionData,
          errorDetails: submissionError
        });
      } else {
        console.log('Submission saved successfully to submissions table:', submissionResult);
      }

      // If it's an accelerator submission, also save to accelerator_applications
      if (submissionData.seekingType === 'accelerator') {
        const acceleratorPayload = {
          startup_name: submissionData.borrowerName || '',
          founder_name: submissionData.contactName || '',
          founder_email: submissionData.contactEmail || '',
          founder_phone: submissionData.contactPhone || null,
          company_stage: submissionData.businessStage || '',
          industry: submissionData.industry || '',
          accelerator_id: 'general',
          application_data: submissionData,
          status: 'submitted',
          submitted_at: new Date().toISOString()
        };

        console.log('Prepared accelerator payload:', acceleratorPayload);

        const { data: acceleratorResult, error: acceleratorError } = await supabase
          .from('accelerator_applications')
          .insert([acceleratorPayload])
          .select();

        if (acceleratorError) {
          console.error('Accelerator application error:', acceleratorError);
          console.log('ACCELERATOR FALLBACK DATA:', {
            timestamp: new Date().toISOString(),
            acceleratorPayload,
            errorDetails: acceleratorError
          });
        } else {
          console.log('Accelerator application saved successfully:', acceleratorResult);
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error in saveSubmissionToDatabase:', error);
      console.log('CRITICAL FALLBACK DATA FOR MANUAL PROCESSING:', {
        timestamp: new Date().toISOString(),
        fullFormData: submissionData,
        unexpectedError: error
      });
      return { success: false, error };
    }
  };

  const handleSubmit = async () => {
    console.log('Form submission started with final data:', formData);
    
    // Validate required fields
    if (!formData.borrowerName || !formData.contactName || !formData.contactEmail || 
        !formData.companyHQ || !formData.businessStage || !formData.industry || !formData.seekingType) {
      console.error('Missing required fields for submission');
      alert('Please ensure all required fields are filled out.');
      return;
    }
    
    try {
      // Save to database
      const saveResult = await saveSubmissionToDatabase(formData);
      console.log('Database save result:', saveResult);
      
      // Send comprehensive email automatically
      const emailResult = await sendSubmissionEmail(formData);
      console.log('Email send result:', emailResult);
      
      if (formData.seekingType === 'accelerator') {
        console.log('Showing accelerator results page');
        setShowResults(true);
      } else {
        console.log('Showing professional thank you page');
        setShowThankYou(true);
      }
    } catch (error) {
      console.error('Submission process error:', error);
      // Still show success to user even if email fails
      if (formData.seekingType === 'accelerator') {
        setShowResults(true);
      } else {
        setShowThankYou(true);
      }
    }
  };

  // Show results page for accelerator users after submission
  if (showResults && formData.seekingType === 'accelerator') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <AcceleratorResults formData={formData} />
        <TrustIndicators />
        <AIChatbot />
      </div>
    );
  }

  // Show professional thank you page for non-accelerator users after submission
  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <ThankYouPage formData={formData} />
        <TrustIndicators />
        <AIChatbot />
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
      <AIChatbot />
    </div>
  );
};

export default Index;
