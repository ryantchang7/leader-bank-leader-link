
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, Clock, Users, ArrowRight } from 'lucide-react';
import { FormData } from '@/types/formData';

interface ThankYouPageProps {
  formData: FormData;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ formData }) => {
  const getFundingTypeDisplay = () => {
    switch (formData.seekingType) {
      case 'equity':
        return 'Equity Investment';
      case 'debt':
        return 'Debt Financing';
      case 'accelerator':
        return 'Accelerator Program';
      default:
        return 'Funding';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to Leader Bank Leader Link!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you, <span className="font-semibold text-red-600">{formData.finalFullName}</span>! 
            Your {getFundingTypeDisplay().toLowerCase()} application has been successfully submitted.
          </p>
        </div>

        {/* Main Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* What Happens Next */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Clock className="h-5 w-5" />
                What Happens Next
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Expert Review</h4>
                    <p className="text-sm text-gray-600 mt-1">Our team will review your submission within 2-3 business days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Strategic Matching</h4>
                    <p className="text-sm text-gray-600 mt-1">We'll match you with relevant partners from our extensive network</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Direct Connection</h4>
                    <p className="text-sm text-gray-600 mt-1">We'll facilitate warm introductions with interested parties</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-green-900">
                <Mail className="h-5 w-5" />
                Your Application Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <p className="text-gray-900">{formData.borrowerName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Contact Email</label>
                  <p className="text-gray-900">{formData.contactEmail}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Seeking</label>
                  <p className="text-gray-900">{getFundingTypeDisplay()}</p>
                </div>
                {formData.raiseAmount && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Amount</label>
                    <p className="text-gray-900">{formData.raiseAmount}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Information */}
        <Card className="bg-gradient-to-r from-red-50 to-blue-50 border-red-200 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <Users className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Our Network
              </h3>
              <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                You now have access to our extensive network of <span className="font-semibold text-red-600">150+ capital investors</span>, 
                strategic partners, and funding sources. Our expert team will personally guide you through the process 
                to find the perfect match for your business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="bg-white px-6 py-3 rounded-lg border border-red-200 shadow-sm">
                  <div className="text-2xl font-bold text-red-600">150+</div>
                  <div className="text-sm text-gray-600">Capital Partners</div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 sm:rotate-0" />
                <div className="bg-white px-6 py-3 rounded-lg border border-blue-200 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">Expert</div>
                  <div className="text-sm text-gray-600">Guidance</div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 sm:rotate-0" />
                <div className="bg-white px-6 py-3 rounded-lg border border-green-200 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">Success</div>
                  <div className="text-sm text-gray-600">Partnership</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Questions or Need Immediate Assistance?</h4>
          <p className="text-gray-600 mb-4">
            Our team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:techandvc@leaderbank.com" 
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Contact Our Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
