
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
  Database, BarChart3, FileSpreadsheet, Plus, Inbox, Home, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import AdminAuth from '@/components/auth/AdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

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
  submitted_at: string;
  status: 'new' | 'reviewed' | 'distributed' | 'matched';
  investor_matches: number;
  priority: 'high' | 'medium' | 'low';
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
  created_at: string;
  status: 'active' | 'inactive';
}

const InvestorAdmin = () => {
  const { signOut } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [investors, setInvestors] = useState<InvestorProfile[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch submissions
        const { data: submissionsData, error: submissionsError } = await supabase
          .from('submissions')
          .select('*')
          .order('submitted_at', { ascending: false });

        if (submissionsError) throw submissionsError;

        // Fetch investors
        const { data: investorsData, error: investorsError } = await supabase
          .from('investor_profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (investorsError) throw investorsError;

        setSubmissions(submissionsData || []);
        setInvestors(investorsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter submissions based on search and filters
  useEffect(() => {
    let filtered = submissions.filter(submission => {
      const matchesSearch = submission.borrower_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           submission.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           submission.industry.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStage = filterStage === 'all' || submission.business_stage === filterStage;
      const matchesIndustry = filterIndustry === 'all' || submission.industry === filterIndustry;
      const matchesType = filterType === 'all' || submission.seeking_type === filterType;
      
      return matchesSearch && matchesStage && matchesIndustry && matchesType;
    });
    
    setFilteredSubmissions(filtered);
  }, [submissions, searchTerm, filterStage, filterIndustry, filterType]);

  const handleLogout = async () => {
    await signOut();
  };

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
  const activeMatches = submissions.reduce((sum, sub) => sum + sub.investor_matches, 0);
  const capitalDistributed = 0; // Will be updated as deals close
  const successRate = totalSubmissions > 0 ? Math.round((submissions.filter(s => s.status === 'matched').length / totalSubmissions) * 100) : 0;

  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/" 
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Main Platform
                </Link>
                <div className="h-4 border-l border-gray-300"></div>
                <h1 className="text-3xl font-bold text-gray-900">Leader Link Admin Dashboard</h1>
              </div>
              <Button 
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                Logout
              </Button>
            </div>
            
            {/* Admin Navigation */}
            <div className="bg-white border border-gray-200 rounded-lg p-1 inline-flex">
              <Link 
                to="/admin/investors"
                className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium"
              >
                Investor Admin
              </Link>
              <Link 
                to="/admin/accelerators"
                className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                Accelerator Admin
              </Link>
              <Link 
                to="/"
                className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Main Platform
              </Link>
            </div>
            
            <p className="text-gray-600 mt-2">Manage startup submissions and distribute opportunities to your investor network</p>
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
                    <p className="text-sm font-medium text-gray-600">Active Investors</p>
                    <p className="text-2xl font-bold text-gray-900">{investors.filter(i => i.status === 'active').length}</p>
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
                    <CardTitle>Startup Submissions ({filteredSubmissions.length})</CardTitle>
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
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Loading submissions...</p>
                    </div>
                  ) : totalSubmissions === 0 ? (
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
                        
                        <div className="flex gap-2">
                          <Select value={filterStage} onValueChange={setFilterStage}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Stage" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Stages</SelectItem>
                              <SelectItem value="idea">Idea</SelectItem>
                              <SelectItem value="mvp">MVP</SelectItem>
                              <SelectItem value="early-revenue">Early Revenue</SelectItem>
                              <SelectItem value="growth">Growth</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Industries</SelectItem>
                              <SelectItem value="fintech">FinTech</SelectItem>
                              <SelectItem value="healthcare">Healthcare</SelectItem>
                              <SelectItem value="saas">SaaS</SelectItem>
                              <SelectItem value="ecommerce">E-commerce</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Select value={filterType} onValueChange={setFilterType}>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Type" />
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

                      {/* Submissions List */}
                      <div className="space-y-4">
                        {filteredSubmissions.map((submission) => (
                          <Card key={submission.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-semibold text-lg">{submission.borrower_name}</h3>
                                    <Badge className={getStatusColor(submission.status)}>
                                      {submission.status}
                                    </Badge>
                                    <Badge variant="outline" className={getPriorityColor(submission.priority)}>
                                      {submission.priority} priority
                                    </Badge>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                                    <div>
                                      <span className="font-medium">Contact:</span> {submission.contact_name}
                                    </div>
                                    <div>
                                      <span className="font-medium">Industry:</span> {submission.industry}
                                    </div>
                                    <div>
                                      <span className="font-medium">Stage:</span> {submission.business_stage}
                                    </div>
                                    <div>
                                      <span className="font-medium">Seeking:</span> {submission.seeking_type}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>📧 {submission.contact_email}</span>
                                    <span>📍 {submission.company_hq}</span>
                                    <span>📅 {new Date(submission.submitted_at).toLocaleDateString()}</span>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4 mr-1" />
                                        View
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                      <DialogHeader>
                                        <DialogTitle>{submission.borrower_name} - Submission Details</DialogTitle>
                                      </DialogHeader>
                                      {/* Detailed submission view would go here */}
                                      <div className="space-y-4">
                                        <div>
                                          <h4 className="font-semibold">Contact Information</h4>
                                          <p>Name: {submission.contact_name}</p>
                                          <p>Email: {submission.contact_email}</p>
                                          {submission.contact_phone && <p>Phone: {submission.contact_phone}</p>}
                                        </div>
                                        <div>
                                          <h4 className="font-semibold">Company Details</h4>
                                          <p>Headquarters: {submission.company_hq}</p>
                                          <p>Industry: {submission.industry}</p>
                                          <p>Stage: {submission.business_stage}</p>
                                          <p>Seeking: {submission.seeking_type}</p>
                                          {submission.raise_amount && <p>Amount: {submission.raise_amount}</p>}
                                        </div>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                  
                                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
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
                    <CardTitle>Investor Network Management ({investors.length})</CardTitle>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Investor
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Loading investors...</p>
                    </div>
                  ) : investors.length === 0 ? (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {investors.map((investor) => (
                        <Card key={investor.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold">{investor.name}</h3>
                                <p className="text-sm text-gray-600">{investor.firm}</p>
                              </div>
                              <Badge variant={investor.status === 'active' ? 'default' : 'secondary'}>
                                {investor.status}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <p><span className="font-medium">Focus:</span> {investor.focus_areas.join(', ')}</p>
                              <p><span className="font-medium">Range:</span> {investor.investment_range}</p>
                              <p><span className="font-medium">Stages:</span> {investor.preferred_stages.join(', ')}</p>
                              {investor.location && <p><span className="font-medium">Location:</span> {investor.location}</p>}
                            </div>
                            
                            <div className="flex gap-2 mt-4">
                              <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
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
