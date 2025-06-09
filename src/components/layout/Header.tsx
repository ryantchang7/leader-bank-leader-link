
import React from 'react';
import { Users, TrendingUp, Shield, Lock } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 lg:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <img 
              src="/lovable-uploads/07ef7a96-cef7-4f3f-9c3a-8c4104899ff0.png" 
              alt="Leader Bank Logo" 
              className="h-12 sm:h-16 w-auto mx-auto sm:mx-0"
            />
            <div className="text-center sm:text-left sm:border-l sm:border-gray-300 sm:pl-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Leader Link</h1>
              <p className="text-red-600 font-medium text-sm sm:text-base">
                Your strategic partner in finding the right funding path
              </p>
              <p className="text-xs text-gray-600">FDIC-Insured - Member FDIC - Equal Housing Lender</p>
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Bank-Grade Security
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>Growth Partners</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>Confidential Process</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile trust indicators */}
        <div className="lg:hidden mt-4 flex flex-wrap justify-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Expert Team</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>Growth Partners</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>Confidential Process</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
