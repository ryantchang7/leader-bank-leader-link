
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Users, Send, Target, Building2 } from 'lucide-react';

interface Submission {
  id: string;
  borrower_name: string;
  contact_name: string;
  contact_email: string;
  business_stage: string;
  industry: string;
  seeking_type: string;
  raise_amount?: string;
  business_description?: string;
}

interface InvestorProfile {
  id: string;
  name: string;
  firm: string;
  email: string;
  focus_areas: string[];
  investment_range: string;
  preferred_stages: string[];
  location?: string;
  status: string;
}

interface InvestorMatchingModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissions: Submission[];
  selectedSubmissions: string[];
}

// Mock investor data for demonstration
const mockInvestors: InvestorProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    firm: 'TechVentures Capital',
    email: 'sarah@techventures.com',
    focus_areas: ['Technology', 'FinTech', 'B2B SaaS'],
    investment_range: '$500K - $5M',
    preferred_stages: ['Seed', 'Series A'],
    location: 'San Francisco, CA',
    status: 'active'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    firm: 'Growth Partners',
    email: 'michael@growthpartners.com',
    focus_areas: ['Healthcare', 'Biotech', 'MedTech'],
    investment_range: '$1M - $10M',
    preferred_stages: ['Series A', 'Series B'],
    location: 'Boston, MA',
    status: 'active'
  },
  {
    id: '3',
    name: 'Jennifer Kim',
    firm: 'Early Stage Fund',
    email: 'jennifer@earlystage.com',
    focus_areas: ['Technology', 'AI/ML', 'Retail'],
    investment_range: '$100K - $2M',
    preferred_stages: ['Pre-Seed', 'Seed'],
    location: 'New York, NY',
    status: 'active'
  }
];

const InvestorMatchingModal: React.FC<InvestorMatchingModalProps> = ({
  isOpen,
  onClose,
  submissions,
  selectedSubmissions
}) => {
  const [investors, setInvestors] = useState<InvestorProfile[]>([]);
  const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);
  const [matchedInvestors, setMatchedInvestors] = useState<{[key: string]: InvestorProfile[]}>({});
  const [customMessage, setCustomMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchInvestors();
      findMatches();
    }
  }, [isOpen, selectedSubmissions]);

  const fetchInvestors = async () => {
    try {
      // Use mock data for now - in production this would call internal API
      console.log('Loading investors from mock data (backend integration pending)');
      setInvestors(mockInvestors);
    } catch (error) {
      console.error('Error fetching investors:', error);
    }
  };

  const findMatches = () => {
    const matches: {[key: string]: InvestorProfile[]} = {};
    
    selectedSubmissions.forEach(submissionId => {
      const submission = submissions.find(s => s.id === submissionId);
      if (!submission) return;

      const matchingInvestors = investors.filter(investor => {
        // Match by industry/focus areas
        const industryMatch = investor.focus_areas.some(area => 
          area.toLowerCase().includes(submission.industry.toLowerCase()) ||
          submission.industry.toLowerCase().includes(area.toLowerCase())
        );

        // Match by business stage
        const stageMatch = investor.preferred_stages.includes(submission.business_stage);

        return industryMatch || stageMatch;
      });

      matches[submissionId] = matchingInvestors;
    });

    setMatchedInvestors(matches);
  };

  const handleInvestorToggle = (investorId: string, checked: boolean) => {
    if (checked) {
      setSelectedInvestors([...selectedInvestors, investorId]);
    } else {
      setSelectedInvestors(selectedInvestors.filter(id => id !== investorId));
    }
  };

  const distributeToInvestors = async () => {
    setLoading(true);
    try {
      // Simulate API call to distribute submissions
      console.log('Distributing submissions to investors (simulated):', {
        submissions: selectedSubmissions,
        investors: selectedInvestors,
        message: customMessage
      });

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Distribution completed successfully (simulated)');
      onClose();
    } catch (error) {
      console.error('Error distributing to investors:', error);
    } finally {
      setLoading(false);
    }
  };

  const submissionsToShow = submissions.filter(s => selectedSubmissions.includes(s.id));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Match with Investors
          </DialogTitle>
        </DialogHeader>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This feature is currently using mock data. Backend integration is pending to connect with your internal investor database.
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Selected Submissions ({selectedSubmissions.length})</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {submissionsToShow.map(submission => (
                <div key={submission.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{submission.borrower_name}</span>
                    <Badge variant="outline" className="ml-2">{submission.industry}</Badge>
                    <Badge variant="outline" className="ml-1">{submission.business_stage}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {matchedInvestors[submission.id]?.length || 0} suggested matches
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Select Investors to Share With</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {investors.map(investor => {
                const totalMatches = selectedSubmissions.reduce((count, subId) => 
                  count + (matchedInvestors[subId]?.some(inv => inv.id === investor.id) ? 1 : 0), 0
                );
                
                return (
                  <Card key={investor.id} className={totalMatches > 0 ? 'border-green-200 bg-green-50' : ''}>
                    <CardContent className="p-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={selectedInvestors.includes(investor.id)}
                          onCheckedChange={(checked) => handleInvestorToggle(investor.id, checked as boolean)}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{investor.name}</h4>
                            {totalMatches > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {totalMatches} match{totalMatches > 1 ? 'es' : ''}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{investor.firm}</p>
                          <div className="flex flex-wrap gap-1">
                            {investor.focus_areas.slice(0, 2).map(area => (
                              <Badge key={area} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                            {investor.focus_areas.length > 2 && (
                              <span className="text-xs text-gray-500">+{investor.focus_areas.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Custom Message (Optional)</label>
            <Textarea
              placeholder="Add a personalized message for the investors..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={distributeToInvestors}
              disabled={selectedInvestors.length === 0 || loading}
              className="bg-red-600 hover:bg-red-700"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? 'Distributing...' : `Share with ${selectedInvestors.length} Investor${selectedInvestors.length !== 1 ? 's' : ''}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestorMatchingModal;
