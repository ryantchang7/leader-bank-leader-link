
import React from 'react';
import BasicInfo from '@/components/forms/BasicInfo';
import FundingOptions from '@/components/forms/FundingOptions';
import EquityInvestment from '@/components/forms/EquityInvestment';
import DebtFinancing from '@/components/forms/DebtFinancing';
import AcceleratorProgram from '@/components/forms/AcceleratorProgram';
import FinalSteps from '@/components/forms/FinalSteps';
import { FormData } from '@/types/formData';

interface FormStepRendererProps {
  currentStep: number;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormStepRenderer: React.FC<FormStepRendererProps> = ({
  currentStep,
  formData,
  setFormData
}) => {
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

export default FormStepRenderer;
