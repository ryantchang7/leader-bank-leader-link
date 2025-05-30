
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from '@/pages/Index';

interface EquityInvestmentProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const EquityInvestment: React.FC<EquityInvestmentProps> = ({ formData, setFormData }) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="raiseAmount" className="text-sm font-medium text-gray-700">
            Amount you're looking to raise ($) *
          </Label>
          <Input
            id="raiseAmount"
            value={formData.raiseAmount}
            onChange={(e) => handleInputChange('raiseAmount', e.target.value)}
            placeholder="e.g., 2,000,000"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="plannedValuation" className="text-sm font-medium text-gray-700">
            Planned valuation or cap ($)
          </Label>
          <Input
            id="plannedValuation"
            value={formData.plannedValuation}
            onChange={(e) => handleInputChange('plannedValuation', e.target.value)}
            placeholder="e.g., 10,000,000"
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="useOfFunds" className="text-sm font-medium text-gray-700">
            Use of funds *
          </Label>
          <Select value={formData.useOfFunds} onValueChange={(value) => handleInputChange('useOfFunds', value)}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select use of funds" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="long-term-wc">Long Term Working Capital (&gt; 12 months to finance Growth/Expansion/Acquisition)</SelectItem>
              <SelectItem value="short-term-saas">Short Term Working Capital (&lt; 12 months to finance Subscription/SaaS/Unearned Revenue)</SelectItem>
              <SelectItem value="short-term-ar">Short Term Working Capital (&lt; 12 months to finance AR/Inventory/Invoice/PO)</SelectItem>
              <SelectItem value="capex-general">CapEX - General</SelectItem>
              <SelectItem value="capex-specialty">CapEx - Specialty Equipment</SelectItem>
              <SelectItem value="capex-it">CapEx - IT Equipment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastTwelveRevenue" className="text-sm font-medium text-gray-700">
            Last 12 mo revenue (ARR/MRR) ($) *
          </Label>
          <Input
            id="lastTwelveRevenue"
            value={formData.lastTwelveRevenue}
            onChange={(e) => handleInputChange('lastTwelveRevenue', e.target.value)}
            placeholder="e.g., 1,200,000"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="growthRate" className="text-sm font-medium text-gray-700">
            Growth rate (% MoM or YoY) *
          </Label>
          <Input
            id="growthRate"
            value={formData.growthRate}
            onChange={(e) => handleInputChange('growthRate', e.target.value)}
            placeholder="e.g., 15% MoM"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customersUsers" className="text-sm font-medium text-gray-700">
            Number of customers/users *
          </Label>
          <Input
            id="customersUsers"
            value={formData.customersUsers}
            onChange={(e) => handleInputChange('customersUsers', e.target.value)}
            placeholder="e.g., 50,000"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grossMargin" className="text-sm font-medium text-gray-700">
            Gross margin (%) *
          </Label>
          <Input
            id="grossMargin"
            value={formData.grossMargin}
            onChange={(e) => handleInputChange('grossMargin', e.target.value)}
            placeholder="e.g., 75"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="burnRate" className="text-sm font-medium text-gray-700">
            Burn rate & runway (months) *
          </Label>
          <Input
            id="burnRate"
            value={formData.burnRate}
            onChange={(e) => handleInputChange('burnRate', e.target.value)}
            placeholder="e.g., $100k/month, 18 months runway"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="headcount" className="text-sm font-medium text-gray-700">
            Full time employees (headcount) *
          </Label>
          <Input
            id="headcount"
            value={formData.headcount}
            onChange={(e) => handleInputChange('headcount', e.target.value)}
            placeholder="e.g., 25"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="foundersInfo" className="text-sm font-medium text-gray-700">
            Founders' names + titles + LinkedIn URLs
          </Label>
          <Textarea
            id="foundersInfo"
            value={formData.foundersInfo}
            onChange={(e) => handleInputChange('foundersInfo', e.target.value)}
            placeholder="John Doe, CEO, linkedin.com/in/johndoe"
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="existingInvestors" className="text-sm font-medium text-gray-700">
            Existing investors (if any)
          </Label>
          <Input
            id="existingInvestors"
            value={formData.existingInvestors}
            onChange={(e) => handleInputChange('existingInvestors', e.target.value)}
            placeholder="e.g., Sequoia Capital, Andreessen Horowitz"
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalEquityRaised" className="text-sm font-medium text-gray-700">
            Total equity raised to date ($)
          </Label>
          <Input
            id="totalEquityRaised"
            value={formData.totalEquityRaised}
            onChange={(e) => handleInputChange('totalEquityRaised', e.target.value)}
            placeholder="e.g., 5,000,000"
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="productDescription" className="text-sm font-medium text-gray-700">
            Brief product/service description (1 sentence)
          </Label>
          <Textarea
            id="productDescription"
            value={formData.productDescription}
            onChange={(e) => handleInputChange('productDescription', e.target.value)}
            placeholder="We provide AI-powered analytics for e-commerce businesses to optimize their inventory management."
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            rows={2}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="competitiveLandscape" className="text-sm font-medium text-gray-700">
            Competitive landscape (key competitors)
          </Label>
          <Input
            id="competitiveLandscape"
            value={formData.competitiveLandscape}
            onChange={(e) => handleInputChange('competitiveLandscape', e.target.value)}
            placeholder="e.g., Competitor A, Competitor B, Competitor C"
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pitchDeck" className="text-sm font-medium text-gray-700">
            Upload pitch deck (PDF)
          </Label>
          <Input
            id="pitchDeck"
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange('pitchDeck', e.target.files?.[0] || null)}
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="financialModel" className="text-sm font-medium text-gray-700">
            Upload financial model/cap table
          </Label>
          <Input
            id="financialModel"
            type="file"
            accept=".xlsx,.xls,.pdf"
            onChange={(e) => handleFileChange('financialModel', e.target.files?.[0] || null)}
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default EquityInvestment;
