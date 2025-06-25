import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from '@/types/formData';
import { Building2, Users, Target, Handshake, Star, Award } from 'lucide-react';
interface AcceleratorProgramProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
const AcceleratorProgram: React.FC<AcceleratorProgramProps> = ({
  formData,
  setFormData
}) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleArrayChange = (field: keyof FormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked ? [...(prev[field] as string[]), value] : (prev[field] as string[]).filter(item => item !== value)
    }));
  };
  const benefitOptions = [{
    value: 'funding',
    label: 'Funding & Investment'
  }, {
    value: 'mentorship',
    label: 'Mentorship & Guidance'
  }, {
    value: 'network',
    label: 'Network & Connections'
  }, {
    value: 'market-access',
    label: 'Market Access & Customer Development'
  }, {
    value: 'technical',
    label: 'Technical Resources & Tools'
  }, {
    value: 'legal',
    label: 'Legal & Regulatory Support'
  }, {
    value: 'office-space',
    label: 'Office Space & Infrastructure'
  }, {
    value: 'marketing',
    label: 'Marketing & PR Support'
  }, {
    value: 'partnerships',
    label: 'Strategic Partnerships'
  }, {
    value: 'talent',
    label: 'Talent Acquisition & HR'
  }, {
    value: 'product',
    label: 'Product Development Support'
  }, {
    value: 'connections',
    label: 'Investor & VC Connections'
  }, {
    value: 'team-building',
    label: 'Team Building & Leadership'
  }];
  return <div className="space-y-6">
      {/* Accelerator Recommendations Teaser */}
      <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-3">
          <Award className="h-6 w-6 text-red-600" />
          <h3 className="font-semibold text-red-800">Accelerator Matching Coming Up</h3>
        </div>
        <p className="text-sm text-red-700 mb-4">
          Complete this form and partner with Leader Bank Leader Link in the final step, and we'll work to provide you with:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-red-700">
            <Star className="h-4 w-4" />
            <span>Personalized accelerator recommendations</span>
          </div>
          <div className="flex items-center gap-2 text-red-700">
            <Handshake className="h-4 w-4" />
            <span>Introductions to program directors where possible</span>
          </div>
          <div className="flex items-center gap-2 text-red-700">
            <Target className="h-4 w-4" />
            <span>Application guidance and resources</span>
          </div>
          <div className="flex items-center gap-2 text-red-700">
            <Building2 className="h-4 w-4" />
            <span>Partnership opportunities where available</span>
          </div>
        </div>
      </div>

      {/* Past Accelerator Experience */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-red-600" />
          <Label className="text-lg font-semibold text-gray-900">Past Accelerator Experience</Label>
        </div>
        
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Have you previously participated in an accelerator, incubator, or similar program? *
          </Label>
          <RadioGroup value={formData.pastAccelerator} onValueChange={value => handleInputChange('pastAccelerator', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="past-yes" />
              <Label htmlFor="past-yes" className="cursor-pointer">Yes, I have accelerator experience</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="past-no" />
              <Label htmlFor="past-no" className="cursor-pointer">No, this would be my first accelerator</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.pastAccelerator === 'yes' && <div className="space-y-4 pl-4 border-l-2 border-red-200">
            <div className="space-y-2">
              <Label htmlFor="acceleratorNames" className="text-sm font-medium text-gray-700">
                Name of accelerator(s) *
              </Label>
              <Input id="acceleratorNames" value={formData.acceleratorNames} onChange={e => handleInputChange('acceleratorNames', e.target.value)} placeholder="Enter the name(s) of the accelerator(s)" required className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="acceleratorLocation" className="text-sm font-medium text-gray-700">
                  Location *
                </Label>
                <Input id="acceleratorLocation" value={formData.acceleratorLocation} onChange={e => handleInputChange('acceleratorLocation', e.target.value)} placeholder="City, State" required className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="programCohort" className="text-sm font-medium text-gray-700">
                  Program / Cohort *
                </Label>
                <Input id="programCohort" value={formData.programCohort} onChange={e => handleInputChange('programCohort', e.target.value)} placeholder="e.g., Fall 2023, Batch 5" required className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="programDates" className="text-sm font-medium text-gray-700">
                Program Dates *
              </Label>
              <Input id="programDates" value={formData.programDates} onChange={e => handleInputChange('programDates', e.target.value)} placeholder="Start date - End date" required className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="acceleratorFunding" className="text-sm font-medium text-gray-700">
                  Funding Received
                </Label>
                <Input id="acceleratorFunding" value={formData.acceleratorFunding} onChange={e => handleInputChange('acceleratorFunding', e.target.value)} placeholder="e.g., $50,000, $100,000" className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equityStake" className="text-sm font-medium text-gray-700">
                  Equity Stake Given
                </Label>
                <Input id="equityStake" value={formData.equityStake} onChange={e => handleInputChange('equityStake', e.target.value)} placeholder="e.g., 6%, 8%" className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keyResources" className="text-sm font-medium text-gray-700">
                Key Resources / Benefits
              </Label>
              <Textarea id="keyResources" value={formData.keyResources} onChange={e => handleInputChange('keyResources', e.target.value)} placeholder="e.g., Mentorship, office space, funding" rows={3} className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
            </div>
          </div>}
      </div>

      {/* Current Applications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-red-600" />
          <Label className="text-lg font-semibold text-gray-900">Current Application Status</Label>
        </div>
        
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Are you currently applying to or considering any accelerators? *
          </Label>
          <RadioGroup value={formData.currentlyApplying} onValueChange={value => handleInputChange('currentlyApplying', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="current-yes" />
              <Label htmlFor="current-yes" className="cursor-pointer">Yes, I'm actively applying</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="current-no" />
              <Label htmlFor="current-no" className="cursor-pointer">No, I'm just exploring options</Label>
            </div>
          </RadioGroup>
        </div>

        {formData.currentlyApplying === 'yes' && <div className="space-y-4 pl-4 border-l-2 border-red-200">
            <div className="space-y-2">
              <Label htmlFor="applyingTo" className="text-sm font-medium text-gray-700">
                Which accelerator(s) are you applying to? *
              </Label>
              <Input id="applyingTo" value={formData.applyingTo} onChange={e => handleInputChange('applyingTo', e.target.value)} placeholder="Enter the name(s) of the accelerator(s)" required className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationDeadlines" className="text-sm font-medium text-gray-700">
                Application Deadline(s) *
              </Label>
              <Input id="applicationDeadlines" value={formData.applicationDeadlines} onChange={e => handleInputChange('applicationDeadlines', e.target.value)} placeholder="Enter the deadline(s) for the application(s)" required className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
            </div>
          </div>}
      </div>

      {/* Sought Benefits */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-red-600" />
          <Label className="text-lg font-semibold text-gray-900">What You're Looking For</Label>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            What key benefits are you seeking from an accelerator? (Select all that apply) *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {benefitOptions.map(benefit => <div key={benefit.value} className="flex items-center space-x-2">
                <Checkbox id={benefit.value} checked={(formData.soughtBenefits as string[]).includes(benefit.value)} onCheckedChange={checked => handleArrayChange('soughtBenefits', benefit.value, checked as boolean)} />
                <Label htmlFor={benefit.value} className="cursor-pointer text-sm">{benefit.label}</Label>
              </div>)}
          </div>
        </div>
      </div>

      {/* Goals and Connections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="top3Goals" className="text-sm font-medium text-gray-700">
            What are your top 3 goals for the next 12 months? *
          </Label>
          <Textarea id="top3Goals" value={formData.top3Goals} onChange={e => handleInputChange('top3Goals', e.target.value)} placeholder="e.g., Raise $2M Series A, launch in 3 new markets, hire 10 engineers..." rows={4} required className="border-gray-300 focus:border-red-500 focus:ring-red-500" />
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Are you interested in connecting with other entrepreneurs in accelerator programs? *
          </Label>
          <RadioGroup value={formData.wantConnections} onValueChange={value => handleInputChange('wantConnections', value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="connections-yes" />
              <Label htmlFor="connections-yes" className="cursor-pointer">Yes, I'd love to network</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="connections-no" />
              <Label htmlFor="connections-no" className="cursor-pointer">No, I prefer to focus on my program</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>;
};
export default AcceleratorProgram;