import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Users, CheckCircle, Award } from 'lucide-react';
import { FormData } from '@/types/formData';
interface FinalStepsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}
const FinalSteps: React.FC<FinalStepsProps> = ({
  formData,
  setFormData
}) => {
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  return <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <Award className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-gray-900">
            Welcome to Leader Bank Leader Link!
          </CardTitle>
          <p className="text-gray-600 mt-2">
            You're one step away from connecting with our extensive network of {' '}
            <span className="font-semibold text-red-600">capital investors</span> and funding partners.
          </p>
        </CardHeader>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-red-600" />
            Final Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="finalFullName" className="text-sm font-medium text-gray-700 mb-2 block">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input id="finalFullName" value={formData.finalFullName} onChange={e => handleInputChange('finalFullName', e.target.value)} placeholder="Enter your full legal name" className="w-full" />
          </div>
          
          <div>
            <Label htmlFor="titleRole" className="text-sm font-medium text-gray-700 mb-2 block">
              Title/Role <span className="text-red-500">*</span>
            </Label>
            <Input id="titleRole" value={formData.titleRole} onChange={e => handleInputChange('titleRole', e.target.value)} placeholder="e.g., CEO, Founder, CFO" className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* What Happens Next */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <CheckCircle className="h-5 w-5" />
            What Happens Next
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
              <p className="font-medium text-blue-900">Expert Review</p>
              <p className="text-blue-700 text-xs mt-1">Our team reviews your submission within 2-3 business days</p>
            </div>
            <div className="text-center p-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
              <p className="font-medium text-blue-900">Investor Matching</p>
              <p className="text-blue-700 text-xs mt-1">We match you with relevant investors from our network</p>
            </div>
            <div className="text-center p-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
              <p className="font-medium text-blue-900">Warm Introductions</p>
              <p className="text-blue-700 text-xs mt-1">We facilitate direct connections with interested investors</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Terms & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox id="agreeTerms" checked={formData.agreeTerms === 'yes'} onCheckedChange={checked => handleInputChange('agreeTerms', checked ? 'yes' : '')} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="agreeTerms" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                I agree to Leader Bank's{' '}
                <a href="#" className="text-red-600 hover:underline font-medium">
                  Terms of Service
                </a>{' '}
                and understand that Leader Link will share my information with relevant investors in their network.
              </Label>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox id="agreePrivacy" checked={formData.agreePrivacy === 'yes'} onCheckedChange={checked => handleInputChange('agreePrivacy', checked ? 'yes' : '')} className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="agreePrivacy" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                I acknowledge that I have read and agree to Leader Bank's{' '}
                <a href="#" className="text-red-600 hover:underline font-medium">
                  Privacy Policy
                </a>{' '}
                and consent to the processing of my personal and business information for funding purposes.
              </Label>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-900 mb-1">Professional Review Process</p>
                <p className="text-xs text-green-800">
                  Our team will carefully review your application and connect you with relevant funding partners from our network.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default FinalSteps;