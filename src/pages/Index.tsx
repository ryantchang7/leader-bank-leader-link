import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BasicInfo from '@/components/forms/BasicInfo';
import FundingOptions from '@/components/forms/FundingOptions';
import EquityInvestment from '@/components/forms/EquityInvestment';
import DebtFinancing from '@/components/forms/DebtFinancing';
import AcceleratorProgram from '@/components/forms/AcceleratorProgram';
import FinalSteps from '@/components/forms/FinalSteps';
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react';

export interface FormData {
  // Basic Info
  borrowerName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyHQ: string;
  businessStage: string;
  industry: string;
  vertical: string;
  
  // Funding Options
  seekingType: string;
  
  // Equity Investment
  raiseAmount: string;
  plannedValuation: string;
  useOfFunds: string;
  lastTwelveRevenue: string;
  growthRate: string;
  customersUsers: string;
  grossMargin: string;
  burnRate: string;
  foundersInfo: string;
  headcount: string;
  existingInvestors: string;
  totalEquityRaised: string;
  productDescription: string;
  competitiveLandscape: string;
  pitchDeck: File | null;
  financialModel: File | null;
  
  // Debt Financing
  debtType: string[];
  debtDescription: string;
  debtSize: string;
  debtUseOfFunds: string;
  monthsInBusiness: string;
  priorYearRevenue: string;
  projectedRevenue: string;
  hasRecurringRevenue: string;
  annualRecurringRevenue: string;
  isEbitdaPositive: string;
  monthsToEbitda: string;
  ventureBacked: string;
  totalPEVCFunding: string;
  hasVCBoard: string;
  cashRunway: string;
  hasCollateral: string;
  collateralType: string;
  personalGuarantee: string;
  acceptCovenants: string;
  pledgeWarrants: string;
  financialStatements: File[] | null;
  businessPlan: File | null;
  
  // Accelerator
  pastAccelerator: string;
  acceleratorNames: string;
  acceleratorLocation: string;
  programCohort: string;
  programDates: string;
  acceleratorFunding: string;
  equityStake: string;
  keyResources: string;
  currentlyApplying: string;
  applyingTo: string;
  applicationDeadlines: string;
  soughtBenefits: string[];
  top3Goals: string;
  wantConnections: string;
  
  // Final Steps
  finalFullName: string;
  titleRole: string;
  agreeTerms: string;
  agreePrivacy: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
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

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Basic Company Information";
      case 2: return "Funding & Support Options";
      case 3: return "Equity Investment Details";
      case 4: return "Debt Financing Details";
      case 5: return "Accelerator Program Information";
      case 6: return "Final Steps";
      default: return "";
    }
  };

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1: return "Tell us about your company and business fundamentals";
      case 2: return "Select the type of funding or support you're seeking";
      case 3: return "Provide details about your equity funding requirements";
      case 4: return "Share information about your debt financing needs";
      case 5: return "Details about accelerator program interests";
      case 6: return "Review and submit your application";
      default: return "";
    }
  };

  const getVisibleSteps = () => {
    const steps = [1, 2];
    if (formData.seekingType === 'equity') steps.push(3);
    if (formData.seekingType === 'debt') steps.push(4);
    if (formData.seekingType === 'accelerator') steps.push(5);
    steps.push(6);
    return steps;
  };

  const visibleSteps = getVisibleSteps();
  const currentStepIndex = visibleSteps.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / visibleSteps.length) * 100;

  const isStepComplete = (step: number) => {
    return completedSteps.includes(step);
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.borrowerName && formData.contactName && formData.contactEmail && 
               formData.contactPhone && formData.companyHQ && formData.businessStage && 
               formData.industry && formData.vertical;
      case 2:
        return formData.seekingType;
      case 3:
        return formData.seekingType === 'equity' ? 
               formData.raiseAmount && formData.useOfFunds && formData.lastTwelveRevenue : true;
      case 4:
        return formData.seekingType === 'debt' ? 
               formData.debtType.length > 0 && formData.debtDescription && formData.debtSize : true;
      case 5:
        return formData.seekingType === 'accelerator' ? 
               formData.pastAccelerator && formData.currentlyApplying : true;
      case 6:
        return formData.finalFullName && formData.titleRole && 
               formData.agreeTerms === 'yes' && formData.agreePrivacy === 'yes';
      default:
        return false;
    }
  };

  useEffect(() => {
    if (validateStep(currentStep)) {
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

  const handleSubmit = async () => {
    console.log('Form submitted:', formData);
    // Here you would integrate with your backend API
    alert('Application submitted successfully! We will review your information and get back to you within 2-3 business days.');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <FundingOptions formData={formData} setFormData={setFormData} />;
      case 3:
        return <EquityInvestment formData={formData} setFormData={setFormData} />;
      case 4:
        return <DebtFinancing formData={formData} setFormData={setFormData} />;
      case 5:
        return <AcceleratorProgram formData={formData} setFormData={setFormData} />;
      case 6:
        return <FinalSteps formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/07ef7a96-cef7-4f3f-9c3a-8c4104899ff0.png" 
                alt="Leader Bank Logo" 
                className="h-16 w-auto"
              />
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-3xl font-bold text-gray-900">Cap Connect</h1>
                <p className="text-red-600 font-medium">Find the right funding path for your business</p>
                <p className="text-sm text-gray-600">FDIC-Insured - Backed by the full faith and credit of the U.S. Government</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Secure Application
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {getStepTitle(currentStep)}
              </h2>
              <p className="text-sm text-gray-600">
                {getStepDescription(currentStep)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStepIndex + 1} of {visibleSteps.length}
              </span>
              <div className="text-xs text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </div>
            </div>
          </div>
          
          <Progress value={progressPercentage} className="h-3 mb-4" />
          
          {/* Step indicators */}
          <div className="flex justify-between items-center">
            {visibleSteps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  step === currentStep 
                    ? 'border-red-600 bg-red-600 text-white' 
                    : isStepComplete(step)
                    ? 'border-green-600 bg-green-600 text-white'
                    : 'border-gray-300 bg-white text-gray-500'
                }`}>
                  {isStepComplete(step) && step !== currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step === currentStep ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {getStepTitle(step)}
                </span>
                {index < visibleSteps.length - 1 && (
                  <div className="w-12 h-px bg-gray-300 ml-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  {currentStep === currentStep && (
                    <Circle className="w-3 h-3 fill-red-600 text-red-600 mr-2" />
                  )}
                  {getStepTitle(currentStep)}
                </CardTitle>
                <CardDescription className="mt-1">
                  {getStepDescription(currentStep)}
                </CardDescription>
              </div>
              {isStepComplete(currentStep) && (
                <CheckCircle className="w-6 h-6 text-green-600" />
              )}
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="transition-all duration-300 ease-in-out">
              {renderCurrentStep()}
            </div>
            
            {/* Navigation Buttons */}
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
                {currentStepIndex === visibleSteps.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2 px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={!formData.agreeTerms || !formData.agreePrivacy}
                  >
                    <span>Submit Application</span>
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2 px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={!validateStep(currentStep)}
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure & Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>FDIC Insured</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Expert Review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
