
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from 'lucide-react';

interface FinancialTooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

const FinancialTooltip: React.FC<FinancialTooltipProps> = ({ term, definition, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help">
            {children}
            <HelpCircle className="h-4 w-4 text-gray-400 hover:text-red-600 transition-colors" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3 bg-white border border-gray-200 shadow-lg">
          <div className="space-y-1">
            <p className="font-medium text-gray-900">{term}</p>
            <p className="text-sm text-gray-700">{definition}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FinancialTooltip;
