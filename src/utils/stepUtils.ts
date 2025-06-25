

export const getStepTitle = (step: number): string => {
  switch (step) {
    case 1: return "Company Information";
    case 2: return "Funding Goals";
    case 3: return "Investment Details";
    case 4: return "Partnership Agreement";
    default: return "";
  }
};

export const getStepDescription = (step: number): string => {
  switch (step) {
    case 1: return "Tell us about your business - we're here to support your growth";
    case 2: return "What kind of capital are you seeking to fuel your next phase?";
    case 3: return "Share financial metrics and company details for optimal investor matching";
    case 4: return "Review terms and complete your Leader Bank Leader Link application";
    default: return "";
  }
};

