import React from 'react';
import { Users, TrendingUp, Lock } from 'lucide-react';
const Header = () => {
  return <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center justify-center sm:justify-start">
              <img src="/lovable-uploads/07ef7a96-cef7-4f3f-9c3a-8c4104899ff0.png" alt="Leader Bank Logo" className="h-14 sm:h-16 w-auto" />
            </div>
            <div className="text-center sm:text-left sm:border-l sm:border-gray-300 sm:pl-8">
              <div className="mb-4">
                <img src="/lovable-uploads/d66f3156-562e-48ea-b880-89c0177f90b9.png" alt="Leader Link" className="h-20 sm:h-24 w-auto mx-auto sm:mx-0" />
              </div>
              <p className="text-red-600 font-semibold text-base sm:text-lg mb-2">Linking You to VCs, Debt Partners, and Accelerators</p>
              <p className="text-sm text-gray-600 font-medium">
                FDIC-Insured • Member FDIC • Equal Housing Lender
              </p>
            </div>
          </div>
          
          <div className="hidden lg:flex flex-col items-end space-y-3">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-black" />
                <span className="font-medium">Expert Team</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-red-600" />
                <span className="font-medium">Growth Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-black" />
                <span className="font-medium">Efficient Process</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile trust indicators */}
        <div className="lg:hidden mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <Users className="h-4 w-4 text-black" />
            <span className="font-medium text-gray-700">Expert Team</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <TrendingUp className="h-4 w-4 text-red-600" />
            <span className="font-medium text-gray-700">Growth Partners</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <Lock className="h-4 w-4 text-black" />
            <span className="font-medium text-gray-700">Efficient Process</span>
          </div>
        </div>
      </div>
    </div>;
};
export default Header;