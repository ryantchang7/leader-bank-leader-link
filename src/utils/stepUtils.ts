

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
    case 2: return "Choose the type of funding that aligns with your business objectives";
    case 3: return "Provide key metrics and details to connect you with ideal funding sources";
    case 4: return "Finalize your partnership with Leader Bank Leader Link";
    default: return "";
  }
};

