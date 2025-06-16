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
    companyName: '',
    industry: '',
    stage: '',
    fundingAmount: '',
    fundingType: '',
    revenueStage: '',
    // Equity specific
    currentRevenue: '',
    growthRate: '',
    fundingHistory: '',
    useOfFunds: '',
    // Debt specific
    businessAge: '',
    annualRevenue: '',
    creditScore: '',
    collateral: '',
    loanPurpose: '',
    // Accelerator specific
    acceleratorType: '',
    programLength: '',
    acceleratorLocation: '',
    // Contact
    founderName: '',
    email: '',
    phone: '',
    linkedinProfile: '',
    pitchDeck: null,
    businessPlan: null
  });
  
  const [showResults, setShowResults] = useState(false);
  
  const { currentStep, nextStep, prevStep, isStepValid, totalSteps } = useStepNavigation(formData);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleFinalSubmit = () => {
    setShowResults(true);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <FundingOptions formData={formData} updateFormData={updateFormData} />;
      case 3:
        if (formData.fundingType === 'equity') {
          return <EquityInvestment formData={formData} updateFormData={updateFormData} />;
        } else if (formData.fundingType === 'debt') {
          return <DebtFinancing formData={formData} updateFormData={updateFormData} />;
        } else if (formData.fundingType === 'accelerator') {
          return <AcceleratorProgram formData={formData} updateFormData={updateFormData} />;
        }
        return null;
      case 4:
        return <FinalSteps formData={formData} updateFormData={updateFormData} onSubmit={handleFinalSubmit} />;
      default:
        return null;
    }
  };

  if (showResults && formData.fundingType === 'accelerator') {
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ProgressSection currentStep={currentStep} totalSteps={totalSteps} />
        <FormContainer
          currentStep={currentStep}
          totalSteps={totalSteps}
          onNext={nextStep}
          onPrev={prevStep}
          canProceed={isStepValid}
          formData={formData}
        >
          {renderCurrentStep()}
        </FormContainer>
      </div>
      <TrustIndicators />
      <AIChatbot />
    </div>
  );
};

export default Index;
