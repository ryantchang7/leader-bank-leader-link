
import { FormData } from '@/types/formData';

export const validateStep = (step: number, formData: FormData): boolean => {
  switch (step) {
    case 1:
      return !!(formData.borrowerName && formData.contactName && formData.contactEmail && 
               formData.contactPhone && formData.companyHQ && formData.businessStage && 
               formData.industry && formData.vertical);
    case 2:
      return !!formData.seekingType;
    case 3:
      return formData.seekingType === 'equity' ? 
             !!(formData.raiseAmount && formData.useOfFunds && formData.lastTwelveRevenue) : true;
    case 4:
      return !!(formData.finalFullName && formData.titleRole && 
               formData.agreeTerms === 'yes' && formData.agreePrivacy === 'yes');
    default:
      return false;
  }
};
