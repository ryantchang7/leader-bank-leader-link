
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
import jsPDF from 'jspdf';

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

  const generateSubmissionPDF = (submissionData: FormData) => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = 30;

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(220, 38, 38); // Red color
    pdf.text('Leader Bank - Leader Link Application', margin, yPosition);
    
    yPosition += 15;
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`${submissionData.seekingType.toUpperCase()} APPLICATION`, margin, yPosition);

    yPosition += 20;

    // Company Information Section
    pdf.setFontSize(14);
    pdf.setTextColor(55, 65, 81);
    pdf.text('COMPANY INFORMATION', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    const companyInfo = [
      `Company Name: ${submissionData.borrowerName}`,
      `Contact Name: ${submissionData.contactName}`,
      `Email: ${submissionData.contactEmail}`,
      `Phone: ${submissionData.contactPhone || 'Not provided'}`,
      `Location: ${submissionData.companyHQ}`,
      `Business Stage: ${submissionData.businessStage}`,
      `Industry: ${submissionData.industry}`,
      `Vertical: ${submissionData.vertical || 'Not specified'}`
    ];

    companyInfo.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += 7;
    });

    yPosition += 10;

    // Funding Details Section
    pdf.setFontSize(14);
    pdf.setTextColor(55, 65, 81);
    pdf.text('FUNDING DETAILS', margin, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setTextColor(0, 0, 0);
    const fundingInfo = [
      `Seeking Type: ${submissionData.seekingType}`,
      `Raise Amount: ${submissionData.raiseAmount || 'Not specified'}`,
      `Last 12 Months Revenue: ${submissionData.lastTwelveRevenue || 'Not provided'}`,
      `Use of Funds: ${submissionData.useOfFunds || 'Not specified'}`
    ];

    fundingInfo.forEach(line => {
      pdf.text(line, margin, yPosition);
      yPosition += 7;
    });

    // Business Description Section (if provided)
    if (submissionData.productDescription) {
      yPosition += 10;
      pdf.setFontSize(14);
      pdf.setTextColor(55, 65, 81);
      pdf.text('BUSINESS DESCRIPTION', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(11);
      pdf.setTextColor(0, 0, 0);
      const splitDescription = pdf.splitTextToSize(submissionData.productDescription, pageWidth - 2 * margin);
      pdf.text(splitDescription, margin, yPosition);
      yPosition += splitDescription.length * 7;
    }

    // Add submission timestamp
    yPosition += 15;
    pdf.setFontSize(10);
    pdf.setTextColor(107, 114, 128);
    pdf.text(`Submitted: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, margin, yPosition);
    yPosition += 7;
    pdf.text('Generated from Leader Bank Leader Link application form', margin, yPosition);

    // Save the PDF
    const filename = `${submissionData.borrowerName.replace(/[^a-z0-9]/gi, '_')}_${submissionData.seekingType}_application.pdf`;
    pdf.save(filename);
  };

  const sendSubmissionEmail = (submissionData: FormData) => {
    // Generate and download the PDF
    generateSubmissionPDF(submissionData);

    // Create a simplified email with instructions
    const subject = `New ${submissionData.seekingType} Application: ${submissionData.borrowerName}`;
    const emailBody = `
Hi Team,

A new ${submissionData.seekingType} application has been submitted for ${submissionData.borrowerName}.

Key Details:
• Company: ${submissionData.borrowerName}
• Contact: ${submissionData.contactName} (${submissionData.contactEmail})
• Industry: ${submissionData.industry}
• Seeking: ${submissionData.seekingType}
• Amount: ${submissionData.raiseAmount || 'Not specified'}

A detailed PDF with all submission information has been automatically downloaded to your computer. Please attach this PDF to your records.

Submitted: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

Best regards,
Leader Link Application System
    `.trim();

    const recipients = 'vitaliy.schafer@leaderbank.com,alex.guinta@leaderbank.com,Summer.Hutchison@leaderbank.com';
    const mailtoLink = `mailto:${recipients}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
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
      
      // Generate PDF and open email client
      sendSubmissionEmail(formData);
      
      if (formData.seekingType === 'accelerator') {
        console.log('Showing accelerator results page');
        setShowResults(true);
      } else {
        console.log('Showing professional thank you page');
        setShowThankYou(true);
      }
    } catch (error) {
      console.error('Submission process error:', error);
      // Still show success to user and generate PDF/email
      sendSubmissionEmail(formData);
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
