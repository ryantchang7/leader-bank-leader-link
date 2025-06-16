import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from '@/types/formData';

interface BasicInfoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, setFormData }) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="borrowerName" className="text-sm font-medium text-gray-700">
            Borrower Name *
          </Label>
          <Input
            id="borrowerName"
            value={formData.borrowerName}
            onChange={(e) => handleInputChange('borrowerName', e.target.value)}
            placeholder="Enter company name"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactName" className="text-sm font-medium text-gray-700">
            Contact Name *
          </Label>
          <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) => handleInputChange('contactName', e.target.value)}
            placeholder="Enter your full name"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail" className="text-sm font-medium text-gray-700">
            Contact Email *
          </Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            placeholder="Enter your email address"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone" className="text-sm font-medium text-gray-700">
            Contact Phone *
          </Label>
          <Input
            id="contactPhone"
            value={formData.contactPhone}
            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
            placeholder="Enter your phone number"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyHQ" className="text-sm font-medium text-gray-700">
            Company Headquarters *
          </Label>
          <Select value={formData.companyHQ} onValueChange={(value) => handleInputChange('companyHQ', value)}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="australia">Australia/New Zealand</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="middle-east">Middle East</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="south-america">South America</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessStage" className="text-sm font-medium text-gray-700">
            Stage of Business *
          </Label>
          <Select value={formData.businessStage} onValueChange={(value) => handleInputChange('businessStage', value)}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="pre-seed">Pre-Seed</SelectItem>
              <SelectItem value="seed">Seed</SelectItem>
              <SelectItem value="series-a">Series A</SelectItem>
              <SelectItem value="series-b">Series B</SelectItem>
              <SelectItem value="pre-ipo">Pre-IPO</SelectItem>
              <SelectItem value="self-funded">Self funded</SelectItem>
              <SelectItem value="na">N/A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
            Industry *
          </Label>
          <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="b2b">Business Products & Services (B2B)</SelectItem>
              <SelectItem value="b2c">Consumer Products & Services (B2C/CPG)</SelectItem>
              <SelectItem value="energy">Energy</SelectItem>
              <SelectItem value="financial">Financial Services</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="life-sciences">Life Sciences</SelectItem>
              <SelectItem value="media">Media & Entertainment</SelectItem>
              <SelectItem value="real-estate">Real Estate Management</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vertical" className="text-sm font-medium text-gray-700">
            Vertical *
          </Label>
          <Select value={formData.vertical} onValueChange={(value) => handleInputChange('vertical', value)}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select vertical" />
            </SelectTrigger>
            <SelectContent className="bg-white max-h-[200px]">
              <SelectItem value="agtech">AgTech</SelectItem>
              <SelectItem value="ai-ml">AI/Machine Learning</SelectItem>
              <SelectItem value="consumer">Consumer</SelectItem>
              <SelectItem value="ecommerce">e-Commerce</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="energy">Energy</SelectItem>
              <SelectItem value="fintech">FinTech</SelectItem>
              <SelectItem value="food-beverage">Food & Beverage</SelectItem>
              <SelectItem value="gaming">Gaming</SelectItem>
              <SelectItem value="govtech">GovTech</SelectItem>
              <SelectItem value="hardware">Hardware</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="hr-tech">HR Tech</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="insurtech">InsurTech</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="life-sciences">Life Sciences</SelectItem>
              <SelectItem value="media">Media</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="robotics">Robotics & Drones</SelectItem>
              <SelectItem value="saas">SaaS</SelectItem>
              <SelectItem value="transportation">Transportation & Mobility</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
