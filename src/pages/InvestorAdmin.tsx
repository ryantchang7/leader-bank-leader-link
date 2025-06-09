
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
  Database, BarChart3, FileSpreadsheet
} from 'lucide-react';
import Header from '@/components/layout/Header';

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

const InvestorAdmin = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Mock data - in production this would come from your backend
  useEffect(() => {
    const mockSubmissions: Submission[] = [
      {
        id: '1',
        borrowerName: 'TechFlow Solutions',
        contactName: 'Sarah Chen',
        contactEmail: 'sarah@techflow.com',
        contactPhone: '(555) 123-4567',
        companyHQ: 'San Francisco, CA',
        businessStage: 'Growth',
        industry: 'Technology',
        vertical: 'SaaS',
        seekingType: 'equity',
        raiseAmount: '$5M',
        submissionDate: '2024-01-15',
        status: 'new',
        investorMatches: 12,
        priority: 'high'
      },
      {
        id: '2',
        borrowerName: 'GreenEnergy Corp',
        contactName: 'Michael Rodriguez',
        contactEmail: 'michael@greenenergy.com',
        contactPhone: '(555) 987-6543',
        companyHQ: 'Austin, TX',
        businessStage: 'Expansion',
        industry: 'Energy',
        vertical: 'Clean Tech',
        seekingType: 'debt',
        raiseAmount: '$10M',
        submissionDate: '2024-01-14',
        status: 'reviewed',
        investorMatches: 8,
        priority: 'medium'
      }
    ];
    setSubmissions(mockSubmissions);
    setFilteredSubmissions(mockSubmissions);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leader Link Investor Dashboard</h1>
          <p className="text-gray-600">Manage startup submissions and distribute opportunities to your investor network</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">47</p>
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
                  <p className="text-2xl font-bold text-gray-900">$125M</p>
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
                  <p className="text-2xl font-bold text-gray-900">73%</p>
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
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <Mail className="h-4 w-4 mr-2" />
                      Distribute to Investors
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
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
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select value={filterStage} onValueChange={setFilterStage}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stages</SelectItem>
                        <SelectItem value="Startup">Startup</SelectItem>
                        <SelectItem value="Growth">Growth</SelectItem>
                        <SelectItem value="Expansion">Expansion</SelectItem>
                        <SelectItem value="Mature">Mature</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Energy">Energy</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Consumer">Consumer</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Funding Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="equity">Equity</SelectItem>
                        <SelectItem value="debt">Debt</SelectItem>
                        <SelectItem value="accelerator">Accelerator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submissions Table */}
                <div className="space-y-4">
                  {filteredSubmissions.map((submission) => (
                    <Card key={submission.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">{submission.borrowerName}</h3>
                              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <Badge className={getStatusColor(submission.status)}>
                                  {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                                </Badge>
                                <Star className={`h-4 w-4 ${getPriorityColor(submission.priority)}`} />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{submission.contactName}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                <span>{submission.industry} - {submission.vertical}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{submission.companyHQ}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{submission.submissionDate}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-600">Seeking: <span className="font-medium text-gray-900">{submission.raiseAmount} {submission.seekingType}</span></span>
                              <span className="text-gray-600">Investor Matches: <span className="font-medium text-green-600">{submission.investorMatches}</span></span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 lg:ml-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedSubmission(submission)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>{submission.borrowerName} - Detailed Profile</DialogTitle>
                                </DialogHeader>
                                {/* Detailed submission view would go here */}
                                <div className="space-y-4">
                                  <p>Complete submission details would be displayed here...</p>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              <Send className="h-4 w-4 mr-2" />
                              Distribute
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investors">
            <Card>
              <CardHeader>
                <CardTitle>Investor Network Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Investor network management interface would be built here...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Analytics dashboard would be built here...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestorAdmin;
