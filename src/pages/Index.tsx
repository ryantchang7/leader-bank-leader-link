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
import { ChevronLeft, ChevronRight, CheckCircle, Circle, Users, TrendingUp, Shield, Lock } from 'lucide-react';

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
      case 1: return "Company Information";
      case 2: return "Funding Type";
      case 3: return "Funding Details";
      case 4: return "Partnership Agreement";
      default: return "";
    }
  };

  const getStepDescription = (step: number) => {
    switch (step) {
      case 1: return "Tell us about your business - we're here to support your growth";
      case 2: return "Select your funding goal so we can match you with the right opportunities";
      case 3: return "Share specific details to help us find the perfect funding partners for you";
      case 4: return "Complete your partnership with Leader Bank Cap Connect";
      default: return "";
    }
  };

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
  const progressPercentage = ((currentStepIndex + 1) / 4) * 100; // Always 4 steps for clarity

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
    
    // Show personalized success message
    const successMessage = `Thanks, ${formData.finalFullName}! 🎉\n\nOur expert team will review your information and reach out within 2-3 business days with personalized funding recommendations.\n\nIn the meantime, we'll send you some helpful resources based on your ${formData.seekingType} funding goals.\n\nWelcome to the Leader Bank Cap Connect family!`;
    
    alert(successMessage);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <FundingOptions formData={formData} setFormData={setFormData} />;
      case 3:
        return formData.seekingType === 'equity' ? (
          <EquityInvestment formData={formData} setFormData={setFormData} />
        ) : formData.seekingType === 'debt' ? (
          <DebtFinancing formData={formData} setFormData={setFormData} />
        ) : (
          <AcceleratorProgram formData={formData} setFormData={setFormData} />
        );
      case 4:
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
                <p className="text-red-600 font-medium">
                  Your strategic partner in finding the right funding path
                </p>
                <p className="text-sm text-gray-600">FDIC-Insured - Member FDIC - Equal Housing Lender</p>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Bank-Grade Security
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>Expert Team</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>Growth Partners</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  <span>Confidential Process</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step Process Overview */}
      <div className="bg-red-50 border-b border-red-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Simple 4-Step Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mb-2">1</div>
                <span className="font-medium text-gray-900">Company Info</span>
                <span className="text-xs text-gray-600">Basic details</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mb-2">2</div>
                <span className="font-medium text-gray-900">Funding Type</span>
                <span className="text-xs text-gray-600">Choose your path</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mb-2">3</div>
                <span className="font-medium text-gray-900">Details</span>
                <span className="text-xs text-gray-600">Specific requirements</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mb-2">4</div>
                <span className="font-medium text-gray-900">Partnership</span>
                <span className="text-xs text-gray-600">Start collaboration</span>
              </div>
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
                Step {currentStepIndex + 1}: {getStepTitle(currentStep)}
              </h2>
              <p className="text-sm text-gray-600">
                {getStepDescription(currentStep)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStepIndex + 1} of 4
              </span>
              <div className="text-xs text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </div>
            </div>
          </div>
          
          <Progress value={progressPercentage} className="h-3 mb-4" />
          
          {/* Security Notice */}
          <div className="flex items-center justify-center text-xs text-gray-500 gap-2">
            <Shield className="h-3 w-3" />
            <span>Your information is encrypted and protected by bank-grade security</span>
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
                  <Circle className="w-3 h-3 fill-red-600 text-red-600 mr-2" />
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
                {currentStepIndex === 3 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2 px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={!formData.agreeTerms || !formData.agreePrivacy}
                  >
                    <span>Start Partnership</span>
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center space-x-2 px-8 py-3 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={!validateStep(currentStep)}
                  >
                    <span>Continue to Step {currentStepIndex + 2}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust & Security indicators */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Why Choose Leader Bank Cap Connect?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium text-gray-800">Strategic Partnership</p>
                <p className="text-gray-600">Dedicated experts with deep finance experience</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium text-gray-800">Bank-Grade Security</p>
                <p className="text-gray-600">FDIC insured with enterprise-level protection</p>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
                <p className="font-medium text-gray-800">Comprehensive Network</p>
                <p className="text-gray-600">Direct access to vetted funding partners</p>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p className="mb-2">🚀 <strong>Next Steps:</strong> Our expert team reviews submissions within 2-3 business days and provides personalized funding recommendations.</p>
            <p>💡 <strong>Questions?</strong> Contact our Cap Connect team at <a href="mailto:capconnect@leaderbank.com" className="text-red-600 hover:underline">capconnect@leaderbank.com</a> or call (555) 123-4567</p>
            <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
              <Lock className="h-3 w-3" />
              All communications are confidential and protected by banking privacy regulations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
