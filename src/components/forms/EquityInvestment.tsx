
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from '@/types/formData';
import FinancialTooltip from '@/components/ui/FinancialTooltip';
import { TrendingUp, DollarSign, Users, Target, Building2, FileText, PieChart, Star } from 'lucide-react';

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
      {/* Equity Investment Teaser */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <h3 className="font-semibold text-blue-800">Elite Investor Network Access</h3>
        </div>
        <p className="text-sm text-blue-700 mb-4">
          Connect with our curated network of venture capitalists, angel investors, and strategic partners who are actively seeking opportunities in your space.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-blue-700">
            <Star className="h-4 w-4" />
            <span>Investors/vc firms in your industry</span>
          </div>
          <div className="flex items-center gap-2 text-blue-700">
            <Target className="h-4 w-4" />
            <span>Warm introductions with context</span>
          </div>
          <div className="flex items-center gap-2 text-blue-700">
            <Building2 className="h-4 w-4" />
            <span>Strategic partnership opportunities</span>
          </div>
          <div className="flex items-center gap-2 text-blue-700">
            <PieChart className="h-4 w-4" />
            <span>Valuation and term optimization</span>
          </div>
        </div>
      </div>

      {/* Funding Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-blue-600" />
          <Label className="text-lg font-semibold text-gray-900">Funding Requirements</Label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <FinancialTooltip 
              term="Raise Amount" 
              definition="The total amount of equity funding you're seeking in this round. This should align with your business plan and growth objectives for the next 12-18 months."
            >
              <Label htmlFor="raiseAmount" className="text-sm font-medium text-gray-700">
                Amount you're looking to raise ($) *
              </Label>
            </FinancialTooltip>
            <Input
              id="raiseAmount"
              value={formData.raiseAmount}
              onChange={(e) => handleInputChange('raiseAmount', e.target.value)}
              placeholder="e.g., $2,000,000"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <FinancialTooltip 
              term="Valuation/Cap" 
              definition="Your company's estimated value (pre-money valuation) or the maximum valuation at which convertible securities will convert to equity (valuation cap)."
            >
              <Label htmlFor="plannedValuation" className="text-sm font-medium text-gray-700">
                Planned valuation or cap ($)
              </Label>
            </FinancialTooltip>
            <Input
              id="plannedValuation"
              value={formData.plannedValuation}
              onChange={(e) => handleInputChange('plannedValuation', e.target.value)}
              placeholder="e.g., $10,000,000"
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="useOfFunds" className="text-sm font-medium text-gray-700">
            Primary use of funds *
          </Label>
          <Select value={formData.useOfFunds} onValueChange={(value) => handleInputChange('useOfFunds', value)}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select how you'll use the funding" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="growth">Growth & Expansion (hiring, marketing, new markets)</SelectItem>
              <SelectItem value="product">Product Development & R&D</SelectItem>
              <SelectItem value="working-capital">Working Capital & Operations</SelectItem>
              <SelectItem value="acquisition">Strategic Acquisitions</SelectItem>
              <SelectItem value="equipment">Equipment & Infrastructure</SelectItem>
              <SelectItem value="inventory">Inventory & Supply Chain</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <Label className="text-lg font-semibold text-gray-900">Financial Performance</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <FinancialTooltip 
              term="ARR/MRR" 
              definition="Annual Recurring Revenue (ARR) or Monthly Recurring Revenue (MRR). This shows your predictable, subscription-based revenue streams."
            >
              <Label htmlFor="lastTwelveRevenue" className="text-sm font-medium text-gray-700">
                Last 12 months revenue (ARR/MRR) ($) *
              </Label>
            </FinancialTooltip>
            <Input
              id="lastTwelveRevenue"
              value={formData.lastTwelveRevenue}
              onChange={(e) => handleInputChange('lastTwelveRevenue', e.target.value)}
              placeholder="e.g., $1,200,000"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <FinancialTooltip 
              term="Growth Rate" 
              definition="Your revenue growth rate, typically expressed as Month-over-Month (MoM) or Year-over-Year (YoY) percentage increase."
            >
              <Label htmlFor="growthRate" className="text-sm font-medium text-gray-700">
                Growth rate (% MoM or YoY) *
              </Label>
            </FinancialTooltip>
            <Input
              id="growthRate"
              value={formData.growthRate}
              onChange={(e) => handleInputChange('growthRate', e.target.value)}
              placeholder="e.g., 15% MoM or 180% YoY"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="customersUsers" className="text-sm font-medium text-gray-700">
              Number of customers/users *
            </Label>
            <Input
              id="customersUsers"
              value={formData.customersUsers}
              onChange={(e) => handleInputChange('customersUsers', e.target.value)}
              placeholder="e.g., 15,000 users"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <FinancialTooltip 
              term="Gross Margin" 
              definition="The percentage of revenue remaining after subtracting the cost of goods sold (COGS). Higher margins indicate better unit economics and scalability."
            >
              <Label htmlFor="grossMargin" className="text-sm font-medium text-gray-700">
                Gross margin (%) *
              </Label>
            </FinancialTooltip>
            <Input
              id="grossMargin"
              value={formData.grossMargin}
              onChange={(e) => handleInputChange('grossMargin', e.target.value)}
              placeholder="e.g., 75%"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <FinancialTooltip 
            term="Burn Rate & Runway" 
            definition="Burn rate is how much cash you spend per month. Runway is how many months of operating expenses you can cover with current cash reserves."
          >
            <Label htmlFor="burnRate" className="text-sm font-medium text-gray-700">
              Monthly burn rate & runway (months) *
            </Label>
          </FinancialTooltip>
          <Input
            id="burnRate"
            value={formData.burnRate}
            onChange={(e) => handleInputChange('burnRate', e.target.value)}
            placeholder="e.g., $150k/month, 12 months runway"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Company Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <Label className="text-lg font-semibold text-gray-900">Company Details</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="foundersInfo" className="text-sm font-medium text-gray-700">
            Founders' names, titles & LinkedIn URLs
          </Label>
          <Textarea
            id="foundersInfo"
            value={formData.foundersInfo}
            onChange={(e) => handleInputChange('foundersInfo', e.target.value)}
            placeholder="e.g., John Smith, CEO - linkedin.com/in/johnsmith; Jane Doe, CTO - linkedin.com/in/janedoe"
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="headcount" className="text-sm font-medium text-gray-700">
              Full-time employees (headcount) *
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

          <div className="space-y-2">
            <Label htmlFor="totalEquityRaised" className="text-sm font-medium text-gray-700">
              Total equity raised to date ($)
            </Label>
            <Input
              id="totalEquityRaised"
              value={formData.totalEquityRaised}
              onChange={(e) => handleInputChange('totalEquityRaised', e.target.value)}
              placeholder="e.g., $500,000"
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="existingInvestors" className="text-sm font-medium text-gray-700">
            Existing investors (if any)
          </Label>
          <Input
            id="existingInvestors"
            value={formData.existingInvestors}
            onChange={(e) => handleInputChange('existingInvestors', e.target.value)}
            placeholder="e.g., Acme Ventures, Angel investor John Smith"
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productDescription" className="text-sm font-medium text-gray-700">
            Brief product/service description (1-2 sentences)
          </Label>
          <Textarea
            id="productDescription"
            value={formData.productDescription}
            onChange={(e) => handleInputChange('productDescription', e.target.value)}
            placeholder="Describe what your company does and the problem you solve..."
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="competitiveLandscape" className="text-sm font-medium text-gray-700">
            Key competitors or comparable companies
          </Label>
          <Input
            id="competitiveLandscape"
            value={formData.competitiveLandscape}
            onChange={(e) => handleInputChange('competitiveLandscape', e.target.value)}
            placeholder="e.g., Slack, Microsoft Teams, Discord"
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Documentation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <Label className="text-lg font-semibold text-gray-900">Documentation</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pitchDeck" className="text-sm font-medium text-gray-700">
            Upload pitch deck (PDF)
          </Label>
          <Input
            id="pitchDeck"
            type="file"
            accept=".pdf,.ppt,.pptx"
            onChange={(e) => handleFileChange('pitchDeck', e.target.files?.[0] || null)}
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
          <p className="text-xs text-gray-500">PDF or PowerPoint format, max 10MB</p>
        </div>

        <div className="space-y-2">
          <FinancialTooltip 
            term="Financial Model/Cap Table" 
            definition="Your financial projections spreadsheet and capitalization table showing current ownership structure and how new investment will affect ownership percentages."
          >
            <Label htmlFor="financialModel" className="text-sm font-medium text-gray-700">
              Upload financial model/cap table
            </Label>
          </FinancialTooltip>
          <Input
            id="financialModel"
            type="file"
            accept=".xlsx,.xls,.csv,.pdf"
            onChange={(e) => handleFileChange('financialModel', e.target.files?.[0] || null)}
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
          <p className="text-xs text-gray-500">Excel, CSV, or PDF format, max 10MB</p>
        </div>
      </div>

      {/* Pro Tip */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-800 mb-2">💡 Pro Tip</h4>
        <p className="text-sm text-green-700">
          Having trouble with any of these metrics? Our team can help you prepare investor-ready financials. 
          We'll connect you with resources to strengthen your application.
        </p>
      </div>
    </div>
  );
};

export default EquityInvestment;
