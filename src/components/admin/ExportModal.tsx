
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, FileSpreadsheet, Mail, Users } from 'lucide-react';

interface Submission {
  id: string;
  borrower_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  company_hq: string;
  business_stage: string;
  industry: string;
  vertical?: string;
  seeking_type: string;
  raise_amount?: string;
  business_description?: string;
  funding_purpose?: string;
  current_revenue?: string;
  submitted_at: string;
  status: string;
  priority: string;
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: Submission[];
  selectedSubmissions: string[];
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  submissions,
  selectedSubmissions
}) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'borrower_name',
    'contact_name',
    'contact_email',
    'industry',
    'business_stage',
    'seeking_type',
    'raise_amount',
    'submitted_at'
  ]);

  const availableFields = [
    { key: 'borrower_name', label: 'Company Name' },
    { key: 'contact_name', label: 'Contact Name' },
    { key: 'contact_email', label: 'Contact Email' },
    { key: 'contact_phone', label: 'Contact Phone' },
    { key: 'company_hq', label: 'Company HQ' },
    { key: 'business_stage', label: 'Business Stage' },
    { key: 'industry', label: 'Industry' },
    { key: 'vertical', label: 'Vertical' },
    { key: 'seeking_type', label: 'Funding Type' },
    { key: 'raise_amount', label: 'Raise Amount' },
    { key: 'business_description', label: 'Business Description' },
    { key: 'funding_purpose', label: 'Funding Purpose' },
    { key: 'current_revenue', label: 'Current Revenue' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'submitted_at', label: 'Submission Date' }
  ];

  const handleFieldToggle = (fieldKey: string, checked: boolean) => {
    if (checked) {
      setSelectedFields([...selectedFields, fieldKey]);
    } else {
      setSelectedFields(selectedFields.filter(field => field !== fieldKey));
    }
  };

  const exportData = () => {
    const dataToExport = selectedSubmissions.length > 0
      ? submissions.filter(sub => selectedSubmissions.includes(sub.id))
      : submissions;

    if (exportFormat === 'csv') {
      exportToCSV(dataToExport);
    } else {
      exportToJSON(dataToExport);
    }
    onClose();
  };

  const exportToCSV = (data: Submission[]) => {
    const headers = selectedFields.map(field => 
      availableFields.find(f => f.key === field)?.label || field
    );
    
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        selectedFields.map(field => {
          const value = row[field as keyof Submission] || '';
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `submissions_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportToJSON = (data: Submission[]) => {
    const filteredData = data.map(row => {
      const filtered: any = {};
      selectedFields.forEach(field => {
        filtered[field] = row[field as keyof Submission];
      });
      return filtered;
    });

    const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `submissions_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const exportCount = selectedSubmissions.length > 0 ? selectedSubmissions.length : submissions.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Submissions
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <FileSpreadsheet className="h-3 w-3" />
              {exportCount} submissions selected
            </Badge>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV (Excel Compatible)</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">Select Fields to Export</label>
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {availableFields.map((field) => (
                <div key={field.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={field.key}
                    checked={selectedFields.includes(field.key)}
                    onCheckedChange={(checked) => handleFieldToggle(field.key, checked as boolean)}
                  />
                  <label
                    htmlFor={field.key}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {field.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={exportData}
              className="bg-red-600 hover:bg-red-700"
              disabled={selectedFields.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export {exportCount} Submissions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
