import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from '@/types/formData';
import FinancialTooltip from '@/components/ui/FinancialTooltip';
import { CreditCard, Building2, TrendingUp, FileText, Users, DollarSign, Shield, Star, Handshake } from 'lucide-react';

interface DebtFinancingProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const DebtFinancing: React.FC<DebtFinancingProps> = ({ formData, setFormData }) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      debtType: checked 
        ? [...prev.debtType, value]
        : prev.debtType.filter(item => item !== value)
    }));
  };

  const handleFileChange = (field: keyof FormData, files: FileList | null) => {
    if (files) {
      setFormData(prev => ({ ...prev, [field]: Array.from(files) }));
    }
  };

  const handleSingleFileChange = (field: keyof FormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  return (
    <div className="space-y-6">
      {/* Debt Financing Teaser */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <CreditCard className="h-6 w-6 text-green-600" />
          <h3 className="font-semibold text-green-800">Premium Lending Partners Network</h3>
        </div>
        <p className="text-sm text-green-700 mb-4">
          Access our exclusive network of institutional lenders, banks, and alternative financing providers with competitive rates and flexible terms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-green-700">
            <Star className="h-4 w-4" />
            <span>Pre-negotiated favorable rates</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <Handshake className="h-4 w-4" />
            <span>Dedicated relationship managers</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <Shield className="h-4 w-4" />
            <span>Streamlined approval process</span>
          </div>
          <div className="flex items-center gap-2 text-green-700">
            <Building2 className="h-4 w-4" />
            <span>Flexible repayment structures</span>
          </div>
        </div>
      </div>

      {/* Debt Type Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-green-600" />
          <Label className="text-lg font-semibold text-gray-900">Financing Type</Label>
        </div>
        
        <Label className="text-sm font-medium text-gray-700">
          What type of debt financing interests you? *
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { value: 'sba', label: 'SBA Loan', desc: 'Government-backed loans with favorable terms' },
            { value: 'venture-debt', label: 'Venture Debt', desc: 'For VC-backed companies seeking growth capital' },
            { value: 'real-estate', label: 'Real Estate Financing', desc: 'Commercial property loans and mortgages' },
            { value: 'equipment', label: 'Equipment Financing', desc: 'Loans secured by business equipment' },
            { value: 'revenue-based', label: 'Revenue-Based Financing', desc: 'Repayment tied to your revenue streams' },
            { value: 'other', label: 'Other/Consultation', desc: 'Explore other debt options with our experts' }
          ].map((option) => (
            <div key={option.value} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Checkbox
                id={option.value}
                checked={formData.debtType.includes(option.value)}
                onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor={option.value} className="font-medium text-gray-900 cursor-pointer">
                  {option.label}
                </Label>
                <p className="text-xs text-gray-600 mt-1">{option.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loan Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          <Label className="text-lg font-semibold text-gray-900">Loan Requirements</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="debtDescription" className="text-sm font-medium text-gray-700">
            Describe your financing need *
          </Label>
          <Textarea
            id="debtDescription"
            value={formData.debtDescription}
            onChange={(e) => handleInputChange('debtDescription', e.target.value)}
            placeholder="e.g., We need a $2M credit facility to support inventory growth for our expanding e-commerce business..."
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="debtSize" className="text-sm font-medium text-gray-700">
              Loan amount requested ($) *
            </Label>
            <Input
              id="debtSize"
              value={formData.debtSize}
              onChange={(e) => handleInputChange('debtSize', e.target.value)}
              placeholder="e.g., $2,000,000"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthsInBusiness" className="text-sm font-medium text-gray-700">
              Months in business *
            </Label>
            <Input
              id="monthsInBusiness"
              value={formData.monthsInBusiness}
              onChange={(e) => handleInputChange('monthsInBusiness', e.target.value)}
              placeholder="e.g., 24"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="debtUseOfFunds" className="text-sm font-medium text-gray-700">
            Primary use of loan proceeds *
          </Label>
          <Select value={formData.debtUseOfFunds} onValueChange={(value) => handleInputChange('debtUseOfFunds', value)}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select primary use of funds" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="working-capital-long">Working Capital - Long Term (Growth/Expansion)</SelectItem>
              <SelectItem value="working-capital-short-saas">Working Capital - Short Term (SaaS/Subscription)</SelectItem>
              <SelectItem value="working-capital-short-ar">Working Capital - Short Term (AR/Inventory/PO)</SelectItem>
              <SelectItem value="capex-general">Capital Expenditures - General</SelectItem>
              <SelectItem value="capex-specialty">Capital Expenditures - Specialty Equipment</SelectItem>
              <SelectItem value="capex-it">Capital Expenditures - IT Equipment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Financial Performance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <Label className="text-lg font-semibold text-gray-900">Financial Performance</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="priorYearRevenue" className="text-sm font-medium text-gray-700">
              Prior year revenue ($) *
            </Label>
            <Input
              id="priorYearRevenue"
              value={formData.priorYearRevenue}
              onChange={(e) => handleInputChange('priorYearRevenue', e.target.value)}
              placeholder="e.g., $3,500,000"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectedRevenue" className="text-sm font-medium text-gray-700">
              Projected revenue this year ($) *
            </Label>
            <Input
              id="projectedRevenue"
              value={formData.projectedRevenue}
              onChange={(e) => handleInputChange('projectedRevenue', e.target.value)}
              placeholder="e.g., $5,200,000"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hasRecurringRevenue" className="text-sm font-medium text-gray-700">
            Do you have recurring revenue? *
          </Label>
          <RadioGroup value={formData.hasRecurringRevenue} onValueChange={(value) => handleInputChange('hasRecurringRevenue', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="recurring-yes" />
              <Label htmlFor="recurring-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="recurring-no" />
              <Label htmlFor="recurring-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.hasRecurringRevenue === 'yes' && (
          <div className="space-y-2">
            <FinancialTooltip 
              term="Annual Recurring Revenue (ARR)" 
              definition="The predictable revenue that your business expects to receive annually from subscriptions, contracts, or other recurring revenue streams."
            >
              <Label htmlFor="annualRecurringRevenue" className="text-sm font-medium text-gray-700">
                Annual recurring revenue (ARR) ($) *
              </Label>
            </FinancialTooltip>
            <Input
              id="annualRecurringRevenue"
              value={formData.annualRecurringRevenue}
              onChange={(e) => handleInputChange('annualRecurringRevenue', e.target.value)}
              placeholder="e.g., $2,400,000"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        )}

        <div className="space-y-2">
          <FinancialTooltip 
            term="EBITDA Positive" 
            definition="Earnings Before Interest, Taxes, Depreciation, and Amortization. Being EBITDA positive means your core business operations are profitable before these expenses."
          >
            <Label className="text-sm font-medium text-gray-700">
              Are you EBITDA positive? *
            </Label>
          </FinancialTooltip>
          <RadioGroup value={formData.isEbitdaPositive} onValueChange={(value) => handleInputChange('isEbitdaPositive', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="ebitda-yes" />
              <Label htmlFor="ebitda-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="ebitda-no" />
              <Label htmlFor="ebitda-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.isEbitdaPositive === 'no' && (
          <div className="space-y-2">
            <Label htmlFor="monthsToEbitda" className="text-sm font-medium text-gray-700">
              Months until EBITDA positive *
            </Label>
            <Input
              id="monthsToEbitda"
              value={formData.monthsToEbitda}
              onChange={(e) => handleInputChange('monthsToEbitda', e.target.value)}
              placeholder="e.g., 8"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        )}
      </div>

      {/* Company Structure */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-green-600" />
          <Label className="text-lg font-semibold text-gray-900">Company Structure</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ventureBacked" className="text-sm font-medium text-gray-700">
            Are you venture-backed? (List investor names) *
          </Label>
          <Input
            id="ventureBacked"
            value={formData.ventureBacked}
            onChange={(e) => handleInputChange('ventureBacked', e.target.value)}
            placeholder="e.g., Acme Ventures, Growth Capital Partners, or 'No'"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="totalPEVCFunding" className="text-sm font-medium text-gray-700">
              Total PE/VC funding received ($) *
            </Label>
            <Input
              id="totalPEVCFunding"
              value={formData.totalPEVCFunding}
              onChange={(e) => handleInputChange('totalPEVCFunding', e.target.value)}
              placeholder="e.g., $5,000,000 or $0"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cashRunway" className="text-sm font-medium text-gray-700">
              Cash runway (months) *
            </Label>
            <Input
              id="cashRunway"
              value={formData.cashRunway}
              onChange={(e) => handleInputChange('cashRunway', e.target.value)}
              placeholder="e.g., 18"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hasVCBoard" className="text-sm font-medium text-gray-700">
            Do you have VCs on your board? *
          </Label>
          <RadioGroup value={formData.hasVCBoard} onValueChange={(value) => handleInputChange('hasVCBoard', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="vc-board-yes" />
              <Label htmlFor="vc-board-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="vc-board-no" />
              <Label htmlFor="vc-board-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hasCollateral" className="text-sm font-medium text-gray-700">
            Do you have collateral to pledge? *
          </Label>
          <RadioGroup value={formData.hasCollateral} onValueChange={(value) => handleInputChange('hasCollateral', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="collateral-yes" />
              <Label htmlFor="collateral-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="collateral-no" />
              <Label htmlFor="collateral-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.hasCollateral === 'yes' && (
          <div className="space-y-2">
            <Label htmlFor="collateralType" className="text-sm font-medium text-gray-700">
              What type of collateral? *
            </Label>
            <Select value={formData.collateralType} onValueChange={(value) => handleInputChange('collateralType', value)}>
              <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
                <SelectValue placeholder="Select collateral type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="real-estate">Real Estate</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="accounts-receivable">Accounts Receivable</SelectItem>
                <SelectItem value="intellectual-property">Intellectual Property</SelectItem>
                <SelectItem value="personal-assets">Personal Assets</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Collateral & Terms */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <Label className="text-lg font-semibold text-gray-900">Collateral & Terms</Label>
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Personal guarantee? *
          </Label>
          <RadioGroup value={formData.personalGuarantee} onValueChange={(value) => handleInputChange('personalGuarantee', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="guarantee-yes" />
              <Label htmlFor="guarantee-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="guarantee-no" />
              <Label htmlFor="guarantee-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <FinancialTooltip 
            term="Loan Covenants" 
            definition="Contractual agreements that require you to maintain certain financial ratios or meet specific performance metrics throughout the loan term."
          >
            <Label className="text-sm font-medium text-gray-700">
              Accept covenants? *
            </Label>
          </FinancialTooltip>
          <RadioGroup value={formData.acceptCovenants} onValueChange={(value) => handleInputChange('acceptCovenants', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="covenants-yes" />
              <Label htmlFor="covenants-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="covenants-no" />
              <Label htmlFor="covenants-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <FinancialTooltip 
            term="Warrants" 
            definition="Financial instruments that give lenders the right to purchase equity in your company at a predetermined price, often used in venture debt arrangements."
          >
            <Label className="text-sm font-medium text-gray-700">
              Pledge warrants? *
            </Label>
          </FinancialTooltip>
          <RadioGroup value={formData.pledgeWarrants} onValueChange={(value) => handleInputChange('pledgeWarrants', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="warrants-yes" />
              <Label htmlFor="warrants-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="warrants-no" />
              <Label htmlFor="warrants-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Documentation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-600" />
          <Label className="text-lg font-semibold text-gray-900">Documentation</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="financialStatements" className="text-sm font-medium text-gray-700">
            Upload financial statements (P&L, Balance Sheet)
          </Label>
          <Input
            id="financialStatements"
            type="file"
            multiple
            accept=".pdf,.xlsx,.xls"
            onChange={(e) => handleFileChange('financialStatements', e.target.files)}
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
          <p className="text-xs text-gray-500">Multiple files accepted, max 1GB each</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessPlan" className="text-sm font-medium text-gray-700">
            Upload business plan/loan package
          </Label>
          <Input
            id="businessPlan"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleSingleFileChange('businessPlan', e.target.files?.[0] || null)}
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
          <p className="text-xs text-gray-500">PDF or Word document, max 10MB</p>
        </div>
      </div>

      {/* Document Preparation Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">📋 Document Preparation Tips</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Include 2-3 years of financial statements if available</li>
          <li>• Business plan should highlight your competitive advantages</li>
          <li>• Our loan officers can help you prepare missing documentation</li>
        </ul>
      </div>
    </div>
  );
};

export default DebtFinancing;
