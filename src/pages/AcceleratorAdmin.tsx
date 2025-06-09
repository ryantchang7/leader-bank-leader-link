
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import AdminAuth from '@/components/auth/AdminAuth';
import { Database, Users, TrendingUp, BarChart3, Home, ArrowLeft, Search, Filter, ExternalLink, MapPin, Calendar, Award, Eye } from 'lucide-react';
import { accelerators, Accelerator } from '@/data/accelerators';

const AcceleratorAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterEquity, setFilterEquity] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [selectedAccelerator, setSelectedAccelerator] = useState<Accelerator | null>(null);

  // Get unique values for filters
  const uniqueLocations = [...new Set(accelerators.map(acc => acc.location))];
  const uniqueStages = [...new Set(accelerators.flatMap(acc => acc.stages))];

  // Filter accelerators based on search and filters
  const filteredAccelerators = useMemo(() => {
    return accelerators.filter(acc => {
      const matchesSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          acc.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          acc.industries.some(ind => ind.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = filterLocation === 'all' || acc.location === filterLocation;
      const matchesEquity = filterEquity === 'all' || 
                          (filterEquity === 'zero' && acc.equityTaken.includes('0%')) ||
                          (filterEquity === 'equity' && !acc.equityTaken.includes('0%'));
      const matchesStage = filterStage === 'all' || acc.stages.includes(filterStage);
      
      return matchesSearch && matchesLocation && matchesEquity && matchesStage;
    });
  }, [searchTerm, filterLocation, filterEquity, filterStage]);

  // Mock stats - these would come from your database in a real implementation
  const stats = {
    totalApplications: 0,
    activePrograms: accelerators.length,
    acceptanceRate: 0,
    successRate: 0
  };

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
                <h1 className="text-3xl font-bold text-gray-900">Accelerator Admin Dashboard</h1>
              </div>
              <Button 
                onClick={() => localStorage.removeItem('leaderlink-admin-auth')} 
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
                className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                Investor Admin
              </Link>
              <Link 
                to="/admin/accelerators"
                className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium"
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
            
            <p className="text-gray-600 mt-2">Manage accelerator programs and startup applications</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                  </div>
                  <Database className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Programs</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activePrograms}</p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Acceptance Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.acceptanceRate}%</p>
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
                    <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search accelerators by name, specialization, or industry..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={filterLocation} onValueChange={setFilterLocation}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {uniqueLocations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterEquity} onValueChange={setFilterEquity}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Equity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="zero">Zero Equity</SelectItem>
                      <SelectItem value="equity">Takes Equity</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterStage} onValueChange={setFilterStage}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stages</SelectItem>
                      {uniqueStages.map(stage => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accelerators Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Accelerator Programs ({filteredAccelerators.length})</span>
                <Badge variant="secondary">{accelerators.length} Total Programs</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredAccelerators.length === 0 ? (
                <div className="text-center py-8">
                  <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No accelerators match your current filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAccelerators.map((accelerator) => (
                    <Card key={accelerator.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-base font-semibold text-gray-900 mb-1">
                              {accelerator.name}
                            </CardTitle>
                            <p className="text-xs text-gray-600">{accelerator.specialization}</p>
                          </div>
                          <Badge variant={accelerator.equityTaken.includes('0%') ? 'secondary' : 'outline'} className="text-xs">
                            {accelerator.equityTaken.includes('0%') ? 'No Equity' : 'Takes Equity'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{accelerator.location}</span>
                          </div>
                          {accelerator.duration && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{accelerator.duration}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Award className="h-3 w-3" />
                            <span>{accelerator.cohortBased ? 'Cohort-based' : 'Flexible timeline'}</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                          {accelerator.description}
                        </p>

                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => setSelectedAccelerator(accelerator)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Award className="h-5 w-5 text-red-600" />
                                  {accelerator.name}
                                </DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div><strong>Location:</strong> {accelerator.location}</div>
                                  <div><strong>Equity:</strong> {accelerator.equityTaken}</div>
                                  {accelerator.duration && <div><strong>Duration:</strong> {accelerator.duration}</div>}
                                  <div><strong>Format:</strong> {accelerator.cohortBased ? 'Cohort-based' : 'Flexible'}</div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Description</h4>
                                  <p className="text-sm text-gray-700">{accelerator.description}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Industries Served</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {accelerator.industries.map(industry => (
                                      <Badge key={industry} variant="outline" className="text-xs">
                                        {industry}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Verticals</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {accelerator.verticals.map(vertical => (
                                      <Badge key={vertical} variant="secondary" className="text-xs">
                                        {vertical}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Stages Supported</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {accelerator.stages.map(stage => (
                                      <Badge key={stage} variant="outline" className="text-xs">
                                        {stage}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Key Benefits</h4>
                                  <ul className="text-sm space-y-1">
                                    {accelerator.keyBenefits.map((benefit, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        {benefit}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="flex gap-3 pt-4 border-t">
                                  <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => window.open(accelerator.website, '_blank')}
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Visit Website
                                  </Button>
                                  {accelerator.contactEmail && (
                                    <Button 
                                      variant="outline" 
                                      className="flex-1"
                                      onClick={() => window.location.href = `mailto:${accelerator.contactEmail}`}
                                    >
                                      Contact Program
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            size="sm" 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={() => window.open(accelerator.website, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminAuth>
  );
};

export default AcceleratorAdmin;
