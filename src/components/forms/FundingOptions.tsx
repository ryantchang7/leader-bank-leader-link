
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from '@/types/formData';

interface FundingOptionsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FundingOptions: React.FC<FundingOptionsProps> = ({ formData, setFormData }) => {
  const handleValueChange = (value: string) => {
    setFormData(prev => ({ ...prev, seekingType: value }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-medium text-gray-900">
          What are you seeking? *
        </Label>
        <RadioGroup value={formData.seekingType} onValueChange={handleValueChange} className="space-y-4">
          <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="equity" id="equity" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="equity" className="font-medium text-gray-900 cursor-pointer">
                Equity Investment (VC, angel, strategic)
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Seeking venture capital, angel investment, or strategic investment from partners
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="debt" id="debt" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="debt" className="font-medium text-gray-900 cursor-pointer">
                Debt Financing
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Looking for loans, credit facilities, or other debt instruments
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <RadioGroupItem value="accelerator" id="accelerator" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="accelerator" className="font-medium text-gray-900 cursor-pointer">
                Accelerator Program
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Interested in joining an accelerator or incubator program
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default FundingOptions;
