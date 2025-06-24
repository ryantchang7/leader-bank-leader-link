
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
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = 30;

    const addNewPageIfNeeded = () => {
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = 30;
      }
    };

    const addSectionHeader = (title: string) => {
      addNewPageIfNeeded();
      pdf.setFontSize(14);
      pdf.setTextColor(220, 38, 38);
      pdf.text(title, margin, yPosition);
      yPosition += 15;
    };

    const addField = (label: string, value: string | string[] | null) => {
      addNewPageIfNeeded();
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      
      // Label
      pdf.setFont(undefined, 'bold');
      pdf.text(`${label}:`, margin, yPosition);
      yPosition += 6;
      
      // Value
      pdf.setFont(undefined, 'normal');
      if (Array.isArray(value)) {
        const arrayText = value.length > 0 ? value.join(', ') : 'None selected';
        const splitText = pdf.splitTextToSize(arrayText, pageWidth - 2 * margin - 10);
        pdf.text(splitText, margin + 10, yPosition);
        yPosition += splitText.length * 5;
      } else if (value) {
        const splitText = pdf.splitTextToSize(value, pageWidth - 2 * margin - 10);
        pdf.text(splitText, margin + 10, yPosition);
        yPosition += splitText.length * 5;
      } else {
        pdf.setTextColor(128, 128, 128);
        pdf.text('Not provided', margin + 10, yPosition);
        pdf.setTextColor(0, 0, 0);
        yPosition += 5;
      }
      yPosition += 8;
    };

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(220, 38, 38);
    pdf.text('Leader Bank - Leader Link Application', margin, yPosition);
    
    yPosition += 15;
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`${submissionData.seekingType.toUpperCase()} APPLICATION - COMPREHENSIVE REPORT`, margin, yPosition);

    yPosition += 20;

    // Basic Information Section
    addSectionHeader('BASIC INFORMATION');
    addField('Company Name', submissionData.borrowerName);
    addField('Contact Name', submissionData.contactName);
    addField('Contact Email', submissionData.contactEmail);
    addField('Contact Phone', submissionData.contactPhone);
    addField('Company Headquarters', submissionData.companyHQ);
    addField('Business Stage', submissionData.businessStage);
    addField('Industry', submissionData.industry);
    addField('Vertical', submissionData.vertical);

    // Funding Options Section
    addSectionHeader('FUNDING INFORMATION');
    addField('Seeking Type', submissionData.seekingType);

    // Equity Investment Section (if applicable)
    if (submissionData.seekingType === 'equity') {
      addSectionHeader('EQUITY INVESTMENT DETAILS');
      addField('Raise Amount', submissionData.raiseAmount);
      addField('Planned Valuation', submissionData.plannedValuation);
      addField('Use of Funds', submissionData.useOfFunds);
      addField('Last 12 Months Revenue', submissionData.lastTwelveRevenue);
      addField('Growth Rate', submissionData.growthRate);
      addField('Customers/Users', submissionData.customersUsers);
      addField('Gross Margin', submissionData.grossMargin);
      addField('Burn Rate', submissionData.burnRate);
      addField('Founders Information', submissionData.foundersInfo);
      addField('Headcount', submissionData.headcount);
      addField('Existing Investors', submissionData.existingInvestors);
      addField('Total Equity Raised', submissionData.totalEquityRaised);
      addField('Product Description', submissionData.productDescription);
      addField('Competitive Landscape', submissionData.competitiveLandscape);
      addField('Pitch Deck', submissionData.pitchDeck ? 'File uploaded' : null);
      addField('Financial Model', submissionData.financialModel ? 'File uploaded' : null);
    }

    // Debt Financing Section (if applicable)
    if (submissionData.seekingType === 'debt') {
      addSectionHeader('DEBT FINANCING DETAILS');
      addField('Debt Type', submissionData.debtType);
      addField('Debt Description', submissionData.debtDescription);
      addField('Debt Size', submissionData.debtSize);
      addField('Use of Funds', submissionData.debtUseOfFunds);
      addField('Months in Business', submissionData.monthsInBusiness);
      addField('Prior Year Revenue', submissionData.priorYearRevenue);
      addField('Projected Revenue', submissionData.projectedRevenue);
      addField('Has Recurring Revenue', submissionData.hasRecurringRevenue);
      addField('Annual Recurring Revenue', submissionData.annualRecurringRevenue);
      addField('Is EBITDA Positive', submissionData.isEbitdaPositive);
      addField('Months to EBITDA', submissionData.monthsToEbitda);
      addField('Venture Backed', submissionData.ventureBacked);
      addField('Total PE/VC Funding', submissionData.totalPEVCFunding);
      addField('Has VC Board', submissionData.hasVCBoard);
      addField('Cash Runway', submissionData.cashRunway);
      addField('Has Collateral', submissionData.hasCollateral);
      addField('Collateral Type', submissionData.collateralType);
      addField('Personal Guarantee', submissionData.personalGuarantee);
      addField('Accept Covenants', submissionData.acceptCovenants);
      addField('Pledge Warrants', submissionData.pledgeWarrants);
      addField('Financial Statements', submissionData.financialStatements ? `${submissionData.financialStatements.length} file(s) uploaded` : null);
      addField('Business Plan', submissionData.businessPlan ? 'File uploaded' : null);
    }

    // Accelerator Program Section (if applicable)
    if (submissionData.seekingType === 'accelerator') {
      addSectionHeader('ACCELERATOR PROGRAM DETAILS');
      addField('Past Accelerator Experience', submissionData.pastAccelerator);
      addField('Accelerator Names', submissionData.acceleratorNames);
      addField('Accelerator Location', submissionData.acceleratorLocation);
      addField('Program/Cohort', submissionData.programCohort);
      addField('Program Dates', submissionData.programDates);
      addField('Accelerator Funding', submissionData.acceleratorFunding);
      addField('Equity Stake Given', submissionData.equityStake);
      addField('Key Resources/Benefits', submissionData.keyResources);
      addField('Currently Applying', submissionData.currentlyApplying);
      addField('Applying To', submissionData.applyingTo);
      addField('Application Deadlines', submissionData.applicationDeadlines);
      addField('Sought Benefits', submissionData.soughtBenefits);
      addField('Top 3 Goals', submissionData.top3Goals);
      addField('Want Connections', submissionData.wantConnections);
    }

    // Final Steps Section
    addSectionHeader('FINAL STEPS & AGREEMENTS');
    addField('Full Name', submissionData.finalFullName);
    addField('Title/Role', submissionData.titleRole);
    addField('Agree to Terms', submissionData.agreeTerms);
    addField('Agree to Privacy', submissionData.agreePrivacy);

    // Submission Details
    addSectionHeader('SUBMISSION DETAILS');
    addField('Submission Date', new Date().toLocaleDateString());
    addField('Submission Time', new Date().toLocaleTimeString());
    addField('Form Type', `${submissionData.seekingType} Application`);

    // Save the PDF
    const filename = `${submissionData.borrowerName.replace(/[^a-z0-9]/gi, '_')}_${submissionData.seekingType}_comprehensive_application.pdf`;
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
