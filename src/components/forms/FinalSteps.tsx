
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormData } from '@/types/formData';
import { Handshake, Clock, Users, TrendingUp } from 'lucide-react';

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
      <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <Handshake className="h-6 w-6 text-red-600" />
          <h3 className="font-semibold text-red-800">Welcome to Your Funding Partnership!</h3>
        </div>
        <p className="text-sm text-red-700 mb-4">
          You're just one step away from joining the Leader Bank Fund Finder community. Our dedicated team is excited to help you achieve your funding goals and scale your business.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2 text-red-700">
            <Clock className="h-4 w-4" />
            <span>2-3 day response time</span>
          </div>
          <div className="flex items-center gap-2 text-red-700">
            <Users className="h-4 w-4" />
            <span>Dedicated expert team</span>
          </div>
          <div className="flex items-center gap-2 text-red-700">
            <TrendingUp className="h-4 w-4" />
            <span>Growth-focused solutions</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="finalFullName" className="text-sm font-medium text-gray-700">
            Full legal name *
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
            Partnership Agreement - Terms & Conditions *
          </Label>
          <RadioGroup value={formData.agreeTerms} onValueChange={(value) => handleInputChange('agreeTerms', value)}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="yes" id="terms-yes" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="terms-yes" className="cursor-pointer font-medium">
                  Yes, I agree to partner with Leader Bank Fund Finder
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  I agree to Leader Bank's terms and conditions for the Fund Finder program, 
                  including potential advisory fees and service agreements. I understand that Leader Bank 
                  will work as my strategic partner to identify suitable funding opportunities.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="terms-no" />
              <Label htmlFor="terms-no" className="cursor-pointer">No, I need to review the terms first</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Information Sharing & Partnership Privacy *
          </Label>
          <RadioGroup value={formData.agreePrivacy} onValueChange={(value) => handleInputChange('agreePrivacy', value)}>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="yes" id="privacy-yes" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="privacy-yes" className="cursor-pointer font-medium">
                  Yes, I consent to strategic information sharing
                </Label>
                <p className="text-xs text-gray-600 mt-1">
                  I consent to Leader Bank collecting, processing, and strategically sharing my business information 
                  with pre-vetted investors, lenders, and accelerator partners under appropriate confidentiality agreements. 
                  This enables Leader Bank to effectively advocate for my business and identify the best funding matches.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="privacy-no" />
              <Label htmlFor="privacy-no" className="cursor-pointer">No, I prefer limited information sharing</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 sm:p-6">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Your Journey with Leader Bank Fund Finder
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800">Next 48 Hours:</h4>
            <ul className="space-y-1 text-xs">
              <li>📧 Personalized welcome email with your dedicated contact</li>
              <li>📞 Initial discovery call scheduled</li>
              <li>📋 Customized funding strategy recommendations</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-gray-800">Ongoing Partnership:</h4>
            <ul className="space-y-1 text-xs">
              <li>🤝 Direct introductions to relevant funding sources</li>
              <li>📈 Application guidance and pitch preparation</li>
              <li>🎯 Deal negotiation support and closing assistance</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
          💬 Questions? We're Here to Help
        </h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>📧 Email: <a href="mailto:fundfinder@leaderbank.com" className="underline">fundfinder@leaderbank.com</a></p>
          <p>📞 Direct line: (555) 123-4567</p>
          <p>🌐 Resource hub: <a href="https://www.leaderbank.com/fund-finder-resources" className="underline break-all">leaderbank.com/fund-finder-resources</a></p>
        </div>
      </div>
    </div>
  );
};

export default FinalSteps;
