
import React from 'react';
import { Shield, Lock } from 'lucide-react';

const TrustIndicators = () => {
  return (
    <div className="mt-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Why Choose Leader Bank Leader Link?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-gray-800">Strategic Partnership</p>
              <p className="text-gray-600 text-xs sm:text-sm">Dedicated experts with deep finance experience</p>
            </div>
            <div className="text-center p-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-gray-800">Bank-Grade Security</p>
              <p className="text-gray-600 text-xs sm:text-sm">FDIC insured with enterprise-level protection</p>
            </div>
            <div className="text-center p-3">
              <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
              <p className="font-medium text-gray-800">Comprehensive Network</p>
              <p className="text-gray-600 text-xs sm:text-sm">Direct access to vetted funding partners</p>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 text-center space-y-2">
          <p className="mb-2">🚀 <strong>Next Steps:</strong> Our expert team reviews submissions within 2-3 business days and provides personalized funding recommendations.</p>
          <p>💡 <strong>Questions?</strong> Contact our Leader Link team at <a href="mailto:leaderlink@leaderbank.com" className="text-red-600 hover:underline">leaderlink@leaderbank.com</a> or call (555) 123-4567</p>
          <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" />
            All communications are confidential and protected by banking privacy regulations
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;
