
import React from 'react';
import { Shield, Lock, Phone, Mail, Clock, Award } from 'lucide-react';

const TrustIndicators = () => {
  return (
    <div className="mt-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
            <Shield className="h-6 w-6 text-gray-700" />
            Why Choose Leader Bank Leader Link?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">Strategic Partnership</h4>
              <p className="text-gray-700 text-sm">
                Dedicated funding experts with decades of finance experience and proven track records
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">Bank-Grade Security</h4>
              <p className="text-gray-700 text-sm">
                FDIC insured with enterprise-level encryption and regulatory compliance standards
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
              <div className="w-16 h-16 bg-red-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">Comprehensive Network</h4>
              <p className="text-gray-700 text-sm">
                Direct access to vetted investors, lenders, and accelerator programs nationwide
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 text-center space-y-6 border border-gray-200">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="h-6 w-6 text-red-600" />
            <h4 className="text-xl font-bold text-gray-900">Next Steps</h4>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our expert funding team reviews all submissions within <span className="font-bold text-red-600">2-3 business days</span> and provides personalized funding recommendations tailored to your business needs and growth stage.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="h-5 w-5 text-red-600" />
                <h5 className="font-semibold text-gray-900">Email Contact</h5>
              </div>
              <p className="text-gray-600 mb-2">For questions about the application process:</p>
              <a 
                href="mailto:techandvc@leaderbank.com" 
                className="text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                techandvc@leaderbank.com
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="h-5 w-5 text-red-600" />
                <h5 className="font-semibold text-gray-900">Phone Support</h5>
              </div>
              <p className="text-gray-600 mb-2">Speak directly with our funding specialists:</p>
              <a 
                href="tel:+17816418686" 
                className="text-red-600 font-semibold hover:text-red-700 transition-colors"
              >
                (781) 641-8686
              </a>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <p className="text-sm text-gray-700 flex items-center justify-center gap-2">
              <Lock className="h-4 w-4 text-gray-600" />
              <span className="font-medium">
                All communications are confidential and protected by federal banking privacy regulations
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
