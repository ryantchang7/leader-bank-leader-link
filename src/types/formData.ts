
export interface FormData {
  // Basic Info - matching what Index.tsx initializes
  companyName: string;
  industry: string;
  stage: string;
  fundingAmount: string;
  fundingType: string;
  revenueStage: string;
  
  // Basic Info - what the actual form uses
  borrowerName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyHQ: string;
  businessStage: string;
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
  
  // Legacy fields for compatibility
  currentRevenue: string;
  fundingHistory: string;
  businessAge: string;
  annualRevenue: string;
  creditScore: string;
  collateral: string;
  loanPurpose: string;
  acceleratorType: string;
  programLength: string;
  founderName: string;
  email: string;
  phone: string;
  linkedinProfile: string;
}
