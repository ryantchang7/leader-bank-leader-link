
import React from 'react';

const ProcessOverview = () => {
  return (
    <div className="bg-red-50 border-b border-red-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Simple 4-Step Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mb-2">1</div>
              <span className="font-medium text-gray-900">Company Info</span>
              <span className="text-xs text-gray-600">Basic details</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mb-2">2</div>
              <span className="font-medium text-gray-900">Funding Type</span>
              <span className="text-xs text-gray-600">Choose your path</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mb-2">3</div>
              <span className="font-medium text-gray-900">Details</span>
              <span className="text-xs text-gray-600">Specific requirements</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mb-2">4</div>
              <span className="font-medium text-gray-900">Partnership</span>
              <span className="text-xs text-gray-600">Start collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessOverview;
