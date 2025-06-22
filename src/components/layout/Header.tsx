
import React from 'react';
import { Users, TrendingUp, Shield, Lock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center justify-center sm:justify-start">
              <img 
                src="/lovable-uploads/07ef7a96-cef7-4f3f-9c3a-8c4104899ff0.png" 
                alt="Leader Bank Logo" 
                className="h-14 sm:h-16 w-auto"
              />
            </div>
            <div className="text-center sm:text-left sm:border-l sm:border-gray-300 sm:pl-8">
              <div className="mb-4">
                <img 
                  src="/lovable-uploads/d66f3156-562e-48ea-b880-89c0177f90b9.png" 
                  alt="Leader Link" 
                  className="h-20 sm:h-24 w-auto mx-auto sm:mx-0"
                />
              </div>
              <p className="text-red-600 font-semibold text-base sm:text-lg mb-2">
                Your Strategic Partner in Finding the Right Funding Path
              </p>
              <p className="text-sm text-gray-600 font-medium">
                FDIC-Insured • Member FDIC • Equal Housing Lender
              </p>
            </div>
          </div>
          
          <div className="hidden lg:flex flex-col items-end space-y-3">
            <div className="flex items-center space-x-3">
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border border-gray-300">
                <Shield className="h-4 w-4" />
                Bank-Grade Security
              </span>
              <Link 
                to="/admin/investors" 
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100" 
                title="Admin Access"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-700" />
                <span className="font-medium">Expert Team</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-700" />
                <span className="font-medium">Growth Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-red-600" />
                <span className="font-medium">Confidential Process</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile trust indicators */}
        <div className="lg:hidden mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <Users className="h-4 w-4 text-gray-700" />
            <span className="font-medium text-gray-700">Expert Team</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <TrendingUp className="h-4 w-4 text-gray-700" />
            <span className="font-medium text-gray-700">Growth Partners</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <Lock className="h-4 w-4 text-red-600" />
            <span className="font-medium text-gray-700">Confidential Process</span>
          </div>
          <Link 
            to="/admin/investors" 
            className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg text-gray-400 hover:text-gray-600 transition-colors border border-gray-200" 
            title="Admin Access"
          >
            <Settings className="h-4 w-4" />
            <span className="font-medium">Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
