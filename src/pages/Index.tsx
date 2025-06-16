
import { useState } from "react";
import Header from "../components/layout/Header";
import ProcessOverview from "../components/layout/ProcessOverview";
import ProgressSection from "../components/layout/ProgressSection";
import BasicInfo from "../components/forms/BasicInfo";
import FundingOptions from "../components/forms/FundingOptions";
import EquityInvestment from "../components/forms/EquityInvestment";
import DebtFinancing from "../components/forms/DebtFinancing";
import AcceleratorProgram from "../components/forms/AcceleratorProgram";
import FinalSteps from "../components/forms/FinalSteps";
import FormContainer from "../components/layout/FormContainer";
import TrustIndicators from "../components/layout/TrustIndicators";
import AcceleratorResults from "../components/AcceleratorResults";
import { useStepNavigation } from "../hooks/useStepNavigation";
import { FormData } from "../types/formData";
import AIChatbot from "@/components/ui/AIChatbot";

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
    // Equity specific
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
    // Debt specific
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
    // Accelerator specific
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
    // Final Steps
    finalFullName: '',
    titleRole: '',
    agreeTerms: '',
    agreePrivacy: '',
    // Legacy fields for compatibility
    companyName: '',
    stage: '',
    fundingAmount: '',
    fundingType: '',
    revenueStage: '',
    currentRevenue: '',
    fundingHistory: '',
    businessAge: '',
    annualRevenue: '',
    creditScore: '',
    collateral: '',
    loanPurpose: '',
    acceleratorType: '',
    programLength: '',
    founderName: '',
    email: '',
    phone: '',
    linkedinProfile: ''
  });
  
  const [showResults, setShowResults] = useState(false);
  
  const { currentStep, currentStepIndex, progressPercentage, nextStep, prevStep, isStepValid, totalSteps, isStepComplete } = useStepNavigation(formData);

  const handleFinalSubmit = () => {
    setShowResults(true);
  };

  const getStepInfo = () => {
    switch (currentStep) {
      case 1:
        return { title: "Company Information", description: "Tell us about your company and contact details" };
      case 2:
        return { title: "Funding Type", description: "What type of funding are you seeking?" };
      case 3:
        if (formData.seekingType === 'equity') {
          return { title: "Equity Investment Details", description: "Provide details about your equity funding needs" };
        } else if (formData.seekingType === 'debt') {
          return { title: "Debt Financing Details", description: "Tell us about your debt financing requirements" };
        } else if (formData.seekingType === 'accelerator') {
          return { title: "Accelerator Program", description: "Share your accelerator program preferences" };
        }
        return { title: "Funding Details", description: "Provide details about your funding needs" };
      case 4:
        return { title: "Final Steps", description: "Complete your application and agree to terms" };
      default:
        return { title: "Application", description: "Complete your funding application" };
    }
  };

  const stepInfo = getStepInfo();

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
        } else if (formData.seekingType === 'accelerator') {
          return <AcceleratorProgram formData={formData} setFormData={setFormData} />;
        }
        return null;
      case 4:
        return <FinalSteps formData={formData} setFormData={setFormData} onSubmit={handleFinalSubmit} />;
      default:
        return null;
    }
  };

  if (showResults && formData.seekingType === 'accelerator') {
    return (
      <>
        <Header />
        <AcceleratorResults formData={formData} />
        <AIChatbot />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProcessOverview />
      <ProgressSection 
        currentStepIndex={currentStepIndex}
        progressPercentage={progressPercentage}
        stepTitle={stepInfo.title}
        stepDescription={stepInfo.description}
      />
      <FormContainer
        currentStep={currentStep}
        currentStepIndex={currentStepIndex}
        isStepComplete={isStepComplete}
        stepTitle={stepInfo.title}
        stepDescription={stepInfo.description}
        formData={formData}
        onNext={nextStep}
        onPrevious={prevStep}
        onSubmit={handleFinalSubmit}
      >
        {renderCurrentStep()}
      </FormContainer>
      <TrustIndicators />
      <AIChatbot />
    </div>
  );
};

export default Index;
