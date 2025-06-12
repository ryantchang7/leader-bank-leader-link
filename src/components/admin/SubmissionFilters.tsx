
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from 'lucide-react';

interface FilterState {
  search: string;
  stage: string;
  industry: string;
  seekingType: string;
  status: string;
  priority: string;
  raiseAmountMin: string;
  raiseAmountMax: string;
  location: string;
  dateRange: string;
}

interface SubmissionFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  submissionCount: number;
  filteredCount: number;
}

const SubmissionFilters: React.FC<SubmissionFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  submissionCount,
  filteredCount
}) => {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'all').length;

  return (
    <div className="space-y-4 p-4 bg-white border rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <h3 className="font-medium">Filter Submissions</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount} active</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Showing {filteredCount} of {submissionCount} submissions
          </span>
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="h-8"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search companies, contacts, or industries..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Business Stage */}
        <Select value={filters.stage} onValueChange={(value) => updateFilter('stage', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Business Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="idea">Idea</SelectItem>
            <SelectItem value="mvp">MVP</SelectItem>
            <SelectItem value="early-revenue">Early Revenue</SelectItem>
            <SelectItem value="growth">Growth</SelectItem>
            <SelectItem value="scale">Scale</SelectItem>
          </SelectContent>
        </Select>

        {/* Industry */}
        <Select value={filters.industry} onValueChange={(value) => updateFilter('industry', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="fintech">FinTech</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="saas">SaaS</SelectItem>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
            <SelectItem value="edtech">EdTech</SelectItem>
            <SelectItem value="cleantech">CleanTech</SelectItem>
            <SelectItem value="biotech">BioTech</SelectItem>
            <SelectItem value="proptech">PropTech</SelectItem>
            <SelectItem value="foodtech">FoodTech</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Seeking Type */}
        <Select value={filters.seekingType} onValueChange={(value) => updateFilter('seekingType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Funding Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="equity">Equity</SelectItem>
            <SelectItem value="debt">Debt</SelectItem>
            <SelectItem value="convertible">Convertible</SelectItem>
            <SelectItem value="grant">Grant</SelectItem>
            <SelectItem value="accelerator">Accelerator</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="distributed">Distributed</SelectItem>
            <SelectItem value="matched">Matched</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority */}
        <Select value={filters.priority} onValueChange={(value) => updateFilter('priority', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Location */}
        <Input
          placeholder="Location"
          value={filters.location}
          onChange={(e) => updateFilter('location', e.target.value)}
        />

        {/* Date Range */}
        <Select value={filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Min raise amount (e.g., 100000)"
            value={filters.raiseAmountMin}
            onChange={(e) => updateFilter('raiseAmountMin', e.target.value)}
            type="number"
          />
        </div>
        <div className="flex-1">
          <Input
            placeholder="Max raise amount (e.g., 5000000)"
            value={filters.raiseAmountMax}
            onChange={(e) => updateFilter('raiseAmountMax', e.target.value)}
            type="number"
          />
        </div>
      </div>
    </div>
  );
};

export default SubmissionFilters;
