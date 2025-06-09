
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, Filter, Download, Mail, Users, TrendingUp, 
  Building2, MapPin, Calendar, Star, Eye, Send,
  Database, BarChart3, FileSpreadsheet, Plus, Inbox
} from 'lucide-react';
import Header from '@/components/layout/Header';
import AdminAuth from '@/components/auth/AdminAuth';

interface Submission {
  id: string;
  borrowerName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyHQ: string;
  businessStage: string;
  industry: string;
  vertical: string;
  seekingType: string;
  raiseAmount: string;
  submissionDate: string;
  status: 'new' | 'reviewed' | 'distributed' | 'matched';
  investorMatches: number;
  priority: 'high' | 'medium' | 'low';
}

interface InvestorProfile {
  id: string;
  name: string;
  firm: string;
  email: string;
  focusAreas: string[];
  investmentRange: string;
  stage: string[];
  location: string;
  addedDate: string;
  status: 'active' | 'inactive';
}

const InvestorAdmin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [investors, setInvestors] = useState<InvestorProfile[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Initialize with empty arrays - will be populated as submissions come in
  useEffect(() => {
    // In production, this would fetch from your backend
    setSubmissions([]);
    setInvestors([]);
    setFilteredSubmissions([]);
  }, []);

  // Filter submissions based on search and filters
  useEffect(() => {
    let filtered = submissions.filter(submission => {
      const matchesSearch = submission.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           submission.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           submission.industry.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStage = filterStage === 'all' || submission.businessStage === filterStage;
      const matchesIndustry = filterIndustry === 'all' || submission.industry === filterIndustry;
      const matchesType = filterType === 'all' || submission.seekingType === filterType;
      
      return matchesSearch && matchesStage && matchesIndustry && matchesType;
    });
    
    setFilteredSubmissions(filtered);
  }, [submissions, searchTerm, filterStage, filterIndustry, filterType]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'distributed': return 'bg-purple-100 text-purple-800';
      case 'matched': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  // Calculate dynamic stats
  const totalSubmissions = submissions.length;
  const activeMatches = submissions.reduce((sum, sub) => sum + sub.investorMatches, 0);
  const capitalDistributed = 0; // Will be updated as deals close
  const successRate = totalSubmissions > 0 ? Math.round((submissions.filter(s => s.status === 'matched').length / totalSubmissions) * 100) : 0;

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Leader Link Admin Dashboard</h1>
                <p className="text-gray-600">Manage startup submissions and distribute opportunities to your investor network</p>
              </div>
              <Button 
                onClick={() => localStorage.removeItem('leaderlink-admin-auth')} 
                variant="outline"
                size="sm"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                    <p className="text-2xl font-bold text-gray-900">{totalSubmissions}</p>
                  </div>
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Matches</p>
                    <p className="text-2xl font-bold text-gray-900">{activeMatches}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Capital Distributed</p>
                    <p className="text-2xl font-bold text-gray-900">${capitalDistributed > 0 ? `${capitalDistributed}M` : '0'}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{successRate}%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="submissions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="investors">Investor Network</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="submissions">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <CardTitle>Startup Submissions</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" disabled={totalSubmissions === 0}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700" disabled={totalSubmissions === 0}>
                        <Mail className="h-4 w-4 mr-2" />
                        Distribute to Investors
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {totalSubmissions === 0 ? (
                    <div className="text-center py-12">
                      <Inbox className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Submissions Yet</h3>
                      <p className="text-gray-600 mb-4">Startup submissions will appear here once entrepreneurs begin using the platform.</p>
                      <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                        <p className="text-sm text-gray-700">
                          Share your Leader Link platform with startups to begin receiving submissions and building your deal flow.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Search and Filters */}
                      <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="flex-1">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Search companies, contacts, or industries..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="pl-9"
                            />
                          </div>
                        </div>
                        
                        {/* Filter dropdowns would go here */}
                      </div>

                      {/* Submissions would be listed here */}
                      <div className="space-y-4">
                        {filteredSubmissions.map((submission) => (
                          <Card key={submission.id} className="hover:shadow-md transition-shadow">
                            {/* Submission card content */}
                          </Card>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investors">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Investor Network Management</CardTitle>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Investor
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {investors.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Build Your Investor Network</h3>
                      <p className="text-gray-600 mb-4">Add investors and firms to your network to begin distributing deal flow.</p>
                      <Button className="bg-red-600 hover:bg-red-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Investor
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Investor profiles and management tools will appear here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-600 mb-4">Detailed analytics will be available once you have submission and investor data.</p>
                    <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm text-gray-700">
                        Track conversion rates, investor engagement, and deal flow performance here.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminAuth>
  );
};

export default InvestorAdmin;
