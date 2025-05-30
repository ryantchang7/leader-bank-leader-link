import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from '@/pages/Index';

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
    setFormData(prev => ({ 
      ...prev, 
      [field]: files ? Array.from(files) : null 
    }));
  };

  const handleSingleFileChange = (field: keyof FormData, files: FileList | null) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: files?.[0] || null 
    }));
  };

  const debtTypes = [
    { value: 'sba', label: 'SBA loan' },
    { value: 'venture-debt', label: 'Venture debt' },
    { value: 'real-estate', label: 'Real estate financing' },
    { value: 'equipment', label: 'Equipment financing' },
    { value: 'revenue-based', label: 'Revenue based financing' },
    { value: 'other', label: 'Other' },
    { value: 'consultation', label: 'Consultation' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-800 mb-2">Legal Disclaimer</h3>
        <p className="text-sm text-yellow-700">
          All information provided will be reviewed by our legal and compliance teams. 
          Terms and conditions apply to all debt financing products.
        </p>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          What type of debt are you interested in? *
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {debtTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={type.value}
                checked={formData.debtType.includes(type.value)}
                onCheckedChange={(checked) => handleCheckboxChange(type.value, checked as boolean)}
              />
              <Label htmlFor={type.value} className="text-sm text-gray-700 cursor-pointer">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="debtDescription" className="text-sm font-medium text-gray-700">
            Description of request *
          </Label>
          <Textarea
            id="debtDescription"
            value={formData.debtDescription}
            onChange={(e) => handleInputChange('debtDescription', e.target.value)}
            placeholder="E.g. 'We need a $10MM credit facility...'"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="debtSize" className="text-sm font-medium text-gray-700">
            Size of request ($) *
          </Label>
          <Input
            id="debtSize"
            value={formData.debtSize}
            onChange={(e) => handleInputChange('debtSize', e.target.value)}
            placeholder="e.g., 10,000,000"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="debtUseOfFunds" className="text-sm font-medium text-gray-700">
            Use of funds *
          </Label>
          <Select value={formData.debtUseOfFunds} onValueChange={(value) => handleInputChange('debtUseOfFunds', value)}>
            <SelectTrigger className="border-gray-300 focus:border-red-500 focus:ring-red-500">
              <SelectValue placeholder="Select use of funds" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="long-term-wc">Long Term Working Capital (&gt; 12 months)</SelectItem>
              <SelectItem value="short-term-saas">Short Term Working Capital (&lt; 12 months SaaS)</SelectItem>
              <SelectItem value="short-term-ar">Short Term Working Capital (&lt; 12 months AR/Inventory)</SelectItem>
              <SelectItem value="capex-general">CapEX - General</SelectItem>
              <SelectItem value="capex-specialty">CapEx - Specialty Equipment</SelectItem>
              <SelectItem value="capex-it">CapEx - IT Equipment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthsInBusiness" className="text-sm font-medium text-gray-700">
            Months in business *
          </Label>
          <Input
            id="monthsInBusiness"
            value={formData.monthsInBusiness}
            onChange={(e) => handleInputChange('monthsInBusiness', e.target.value)}
            placeholder="e.g., 36"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priorYearRevenue" className="text-sm font-medium text-gray-700">
            Prior year revenue ($) *
          </Label>
          <Input
            id="priorYearRevenue"
            value={formData.priorYearRevenue}
            onChange={(e) => handleInputChange('priorYearRevenue', e.target.value)}
            placeholder="e.g., 5,000,000"
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
            placeholder="e.g., 7,500,000"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
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
            <Label htmlFor="annualRecurringRevenue" className="text-sm font-medium text-gray-700">
              Annual recurring revenue ($) *
            </Label>
            <Input
              id="annualRecurringRevenue"
              value={formData.annualRecurringRevenue}
              onChange={(e) => handleInputChange('annualRecurringRevenue', e.target.value)}
              placeholder="e.g., 6,000,000"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Are you EBITDA positive? *
          </Label>
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
              placeholder="e.g., 12"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        )}

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="ventureBacked" className="text-sm font-medium text-gray-700">
            Are you venture-backed & Names of investors *
          </Label>
          <Input
            id="ventureBacked"
            value={formData.ventureBacked}
            onChange={(e) => handleInputChange('ventureBacked', e.target.value)}
            placeholder="e.g., Yes - Sequoia Capital, Andreessen Horowitz"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalPEVCFunding" className="text-sm font-medium text-gray-700">
            Total PE/VC funding received ($) *
          </Label>
          <Input
            id="totalPEVCFunding"
            value={formData.totalPEVCFunding}
            onChange={(e) => handleInputChange('totalPEVCFunding', e.target.value)}
            placeholder="e.g., 15,000,000"
            required
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
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

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
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
              <SelectContent className="bg-white">
                <SelectItem value="real-estate">Real estate</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="inventory">Inventory</SelectItem>
                <SelectItem value="accounts-receivable">Accounts receivable</SelectItem>
                <SelectItem value="intellectual-property">Intellectual property</SelectItem>
                <SelectItem value="personal-assets">Personal assets</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Are you willing to personally guarantee? *
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

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Are you willing to accept covenants? *
          </Label>
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

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Are you willing to pledge warrants? *
          </Label>
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

        <div className="space-y-2">
          <Label htmlFor="financialStatements" className="text-sm font-medium text-gray-700">
            Upload recent financial statements (P&L, balance sheet)
          </Label>
          <Input
            id="financialStatements"
            type="file"
            multiple
            accept=".pdf,.xlsx,.xls,.doc,.docx"
            onChange={(e) => handleFileChange('financialStatements', e.target.files)}
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessPlan" className="text-sm font-medium text-gray-700">
            Upload business plan/loan package
          </Label>
          <Input
            id="businessPlan"
            type="file"
            accept=".pdf,.xlsx,.xls,.doc,.docx"
            onChange={(e) => handleSingleFileChange('businessPlan', e.target.files)}
            className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DebtFinancing;
