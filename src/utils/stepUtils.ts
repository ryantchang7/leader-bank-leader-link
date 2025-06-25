
export const getStepTitle = (step: number): string => {
  switch (step) {
    case 1: return "Company Information";
    case 2: return "Funding Type";
    case 3: return "Funding Details";
    case 4: return "Partnership Agreement";
    default: return "";
  }
};

export const getStepDescription = (step: number): string => {
  switch (step) {
    case 1: return "Tell us about your business - we're here to support your growth";
    case 2: return "Select your funding goal so we can match you with the right opportunities";
    case 3: return "Share specific details to help us find the perfect funding partners for you";
    case 4: return "Complete your partnership with Leader Bank Leader Link";
    default: return "";
  }
};
