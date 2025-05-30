
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from '@/pages/Index';

interface FinalStepsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FinalSteps: React.FC<FinalStepsProps> = ({ formData, setFormData }) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">Final Step</h3>
        <p className="text-sm text-blue-700">
          Please review all your information carefully before submitting. Our team will review your application 
          and contact you within 2-3 business days with next steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="finalFullName" className="text-sm font-medium text-gray-700">
            Full name *
          </Label>
          <Input
            id="finalFullName"
            value={formData.finalFullName}
            onChange={(e) => handleInputChange('finalFullName', e.target.value)}
            placeholder="Enter your full legal name"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="titleRole" className="text-sm font-medium text-gray-700">
            Title/role *
          </Label>
          <Input
            id="titleRole"
            value={formData.titleRole}
            onChange={(e) => handleInputChange('titleRole', e.target.value)}
            placeholder="e.g., CEO, Founder, CFO"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>

      <div className="space-y-6 pt-4 border-t border-gray-200">
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            I agree to the Terms & Conditions *
          </Label>
          <RadioGroup value={formData.agreeTerms} onValueChange={(value) => handleInputChange('agreeTerms', value)}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="yes" id="terms-yes" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="terms-yes" className="cursor-pointer">Yes</Label>
                <p className="text-xs text-gray-600 mt-1">
                  I agree to Leader Bank's terms and conditions for the Capital Connect program, 
                  including potential fees and service agreements.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="terms-no" />
              <Label htmlFor="terms-no" className="cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            I agree to the Data Privacy/NDA policy *
          </Label>
          <RadioGroup value={formData.agreePrivacy} onValueChange={(value) => handleInputChange('agreePrivacy', value)}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="yes" id="privacy-yes" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="privacy-yes" className="cursor-pointer">Yes</Label>
                <p className="text-xs text-gray-600 mt-1">
                  I consent to Leader Bank collecting, processing, and sharing my business information 
                  with potential investors, lenders, and partners under appropriate confidentiality agreements.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="privacy-no" />
              <Label htmlFor="privacy-no" className="cursor-pointer">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-gray-800 mb-2">What happens next?</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Our team will review your application within 2-3 business days</li>
          <li>• We'll schedule a discovery call to discuss your needs in detail</li>
          <li>• Based on your requirements, we'll connect you with relevant funding sources</li>
          <li>• We'll guide you through the entire process until successful funding</li>
        </ul>
      </div>
    </div>
  );
};

export default FinalSteps;
