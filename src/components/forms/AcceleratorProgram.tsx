import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from '@/types/formData';

interface AcceleratorProgramProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const AcceleratorProgram: React.FC<AcceleratorProgramProps> = ({ formData, setFormData }) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      soughtBenefits: checked 
        ? [...prev.soughtBenefits, value]
        : prev.soughtBenefits.filter(item => item !== value)
    }));
  };

  const benefits = [
    { value: 'funding', label: 'Access to funding (including debt options)' },
    { value: 'connections', label: 'Connections to lenders/investors' },
    { value: 'mentorship', label: 'Business mentorship & advice' },
    { value: 'market-access', label: 'Market access & customer acquisition' },
    { value: 'legal-support', label: 'Legal or regulatory support' },
    { value: 'team-building', label: 'Team building & operational support' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          Have you participated in an accelerator program in the past or are you currently enrolled in one? *
        </Label>
        <RadioGroup value={formData.pastAccelerator} onValueChange={(value) => handleInputChange('pastAccelerator', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="past-acc-yes" />
            <Label htmlFor="past-acc-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="past-acc-no" />
            <Label htmlFor="past-acc-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.pastAccelerator === 'yes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="acceleratorNames" className="text-sm font-medium text-gray-700">
              Accelerator program name(s) *
            </Label>
            <Input
              id="acceleratorNames"
              value={formData.acceleratorNames}
              onChange={(e) => handleInputChange('acceleratorNames', e.target.value)}
              placeholder="e.g., Y Combinator, Techstars"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="acceleratorLocation" className="text-sm font-medium text-gray-700">
              Location (city, country) *
            </Label>
            <Input
              id="acceleratorLocation"
              value={formData.acceleratorLocation}
              onChange={(e) => handleInputChange('acceleratorLocation', e.target.value)}
              placeholder="e.g., San Francisco, USA"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="programCohort" className="text-sm font-medium text-gray-700">
              Program cohort *
            </Label>
            <Input
              id="programCohort"
              value={formData.programCohort}
              onChange={(e) => handleInputChange('programCohort', e.target.value)}
              placeholder="e.g., Winter 2024, Batch 7"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="programDates" className="text-sm font-medium text-gray-700">
              Program start & end date
            </Label>
            <Input
              id="programDates"
              value={formData.programDates}
              onChange={(e) => handleInputChange('programDates', e.target.value)}
              placeholder="e.g., Jan 2024 - Apr 2024"
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="acceleratorFunding" className="text-sm font-medium text-gray-700">
              Funding or investment received from the accelerator (if any) ($) *
            </Label>
            <Input
              id="acceleratorFunding"
              value={formData.acceleratorFunding}
              onChange={(e) => handleInputChange('acceleratorFunding', e.target.value)}
              placeholder="e.g., 250,000"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="equityStake" className="text-sm font-medium text-gray-700">
              Equity stake (if any) given to the accelerator (%) *
            </Label>
            <Input
              id="equityStake"
              value={formData.equityStake}
              onChange={(e) => handleInputChange('equityStake', e.target.value)}
              placeholder="e.g., 6"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="keyResources" className="text-sm font-medium text-gray-700">
              Key resources, mentorship, or support received
            </Label>
            <Textarea
              id="keyResources"
              value={formData.keyResources}
              onChange={(e) => handleInputChange('keyResources', e.target.value)}
              placeholder="e.g., business mentorship, industry partnerships, co-working space"
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
              rows={3}
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          Are you currently applying to any accelerator or incubator programs? *
        </Label>
        <RadioGroup value={formData.currentlyApplying} onValueChange={(value) => handleInputChange('currentlyApplying', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="currently-yes" />
            <Label htmlFor="currently-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="currently-no" />
            <Label htmlFor="currently-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.currentlyApplying === 'yes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="applyingTo" className="text-sm font-medium text-gray-700">
              Names of accelerators/incubators you're applying to *
            </Label>
            <Input
              id="applyingTo"
              value={formData.applyingTo}
              onChange={(e) => handleInputChange('applyingTo', e.target.value)}
              placeholder="e.g., 500 Startups, Plug and Play"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="applicationDeadlines" className="text-sm font-medium text-gray-700">
              Next application deadline(s) *
            </Label>
            <Input
              id="applicationDeadlines"
              value={formData.applicationDeadlines}
              onChange={(e) => handleInputChange('applicationDeadlines', e.target.value)}
              placeholder="e.g., March 15, 2024"
              required
              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          What benefits or support are you seeking from these programs? *
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.value} className="flex items-center space-x-2">
              <Checkbox
                id={benefit.value}
                checked={formData.soughtBenefits.includes(benefit.value)}
                onCheckedChange={(checked) => handleCheckboxChange(benefit.value, checked as boolean)}
              />
              <Label htmlFor={benefit.value} className="text-sm text-gray-700 cursor-pointer">
                {benefit.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="top3Goals" className="text-sm font-medium text-gray-700">
          What are your top 3 goals for joining an accelerator or incubator? *
        </Label>
        <Textarea
          id="top3Goals"
          value={formData.top3Goals}
          onChange={(e) => handleInputChange('top3Goals', e.target.value)}
          placeholder="1. Access to funding 2. Industry connections 3. Business mentorship"
          required
          className="border-gray-300 focus:border-red-500 focus:ring-red-500"
          rows={3}
        />
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-700">
          Would you like us to help you connect with accelerators that align with your growth and financing needs? *
        </Label>
        <RadioGroup value={formData.wantConnections} onValueChange={(value) => handleInputChange('wantConnections', value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="connections-yes" />
            <Label htmlFor="connections-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="connections-no" />
            <Label htmlFor="connections-no">No</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default AcceleratorProgram;
