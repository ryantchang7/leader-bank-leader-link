
import React from 'react';
import { TrendingUp, Link2 } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        {/* Main logo container with gradient background */}
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
          {/* Interconnected elements representing connection */}
          <div className="relative">
            <Link2 className="h-6 w-6 text-white absolute top-0 left-0" />
            <TrendingUp className="h-4 w-4 text-white/80 absolute top-2 left-3" />
          </div>
        </div>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-red-400 rounded-lg blur-sm opacity-30 -z-10"></div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-red-600 bg-clip-text text-transparent">
              Leader
            </span>
            <span className="text-2xl font-bold text-gray-800">Link</span>
          </div>
          <span className="text-xs text-gray-500 font-medium -mt-1">Capital Connect</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
