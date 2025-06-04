
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Mail, Phone, MapPin, Calendar, Users, Edit, Plus, Settings, Upload } from 'lucide-react';
import { accelerators, Accelerator } from '@/data/accelerators';

const AcceleratorAdmin = () => {
  const [selectedAccelerator, setSelectedAccelerator] = useState<Accelerator | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('all');
  const [filterIndustry, setFilterIndustry] = useState('all');
  const [filterVertical, setFilterVertical] = useState('all');

  const filteredAccelerators = accelerators.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         acc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || acc.stages.includes(filterStage);
    const matchesIndustry = filterIndustry === 'all' || acc.industries.includes(filterIndustry);
    const matchesVertical = filterVertical === 'all' || acc.verticals.includes(filterVertical);
    
    return matchesSearch && matchesStage && matchesIndustry && matchesVertical;
  });

  const stageOptions = ['pre-seed', 'seed', 'series-a', 'series-b', 'self-funded', 'na'];
  const industryOptions = ['b2b', 'b2c', 'technology', 'healthcare', 'financial', 'energy', 'consumer', 'media', 'retail', 'real-estate', 'life-sciences'];
  const verticalOptions = ['saas', 'consumer', 'e-commerce', 'hr-tech', 'other', 'ai-ml', 'hardware', 'robotics', 'it', 'health', 'life-sciences', 'agtech', 'energy', 'food-beverage', 'transportation', 'gaming', 'govtech', 'infrastructure', 'insurtech', 'fintech', 'education', 'media'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Accelerator Admin Portal</h1>
              <p className="text-gray-600 mt-1">Manage accelerator database and matching system</p>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Accelerator
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="search">Search Accelerators</Label>
                <Input
                  id="search"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label>Filter by Stage</Label>
                <Select value={filterStage} onValueChange={setFilterStage}>
                  <SelectTrigger>
                    <SelectValue placeholder="All stages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    {stageOptions.map(stage => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Filter by Industry</Label>
                <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="All industries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {industryOptions.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Filter by Vertical</Label>
                <Select value={filterVertical} onValueChange={setFilterVertical}>
                  <SelectTrigger>
                    <SelectValue placeholder="All verticals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Verticals</SelectItem>
                    {verticalOptions.map(vertical => (
                      <SelectItem key={vertical} value={vertical}>{vertical}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-600">{accelerators.length}</div>
              <div className="text-sm text-gray-600">Total Accelerators</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {accelerators.filter(acc => acc.equityTaken.includes('0%')).length}
              </div>
              <div className="text-sm text-gray-600">Zero Equity</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {accelerators.filter(acc => !acc.cohortBased).length}
              </div>
              <div className="text-sm text-gray-600">Flexible Timeline</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">
                {filteredAccelerators.length}
              </div>
              <div className="text-sm text-gray-600">Filtered Results</div>
            </CardContent>
          </Card>
        </div>

        {/* Accelerator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAccelerators.map((accelerator) => (
            <Card key={accelerator.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{accelerator.name}</CardTitle>
                      <p className="text-sm text-gray-600">{accelerator.location}</p>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedAccelerator(accelerator)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit {accelerator.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Image Upload Section */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <Label className="text-sm font-medium">Logo Upload</Label>
                          <div className="mt-2 flex items-center gap-4">
                            <div className="w-20 h-20 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                              <Upload className="h-8 w-8 text-gray-400" />
                            </div>
                            <div>
                              <Button variant="outline" size="sm">
                                Upload Logo
                              </Button>
                              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                            </div>
                          </div>
                        </div>

                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Accelerator Name</Label>
                            <Input defaultValue={accelerator.name} />
                          </div>
                          <div>
                            <Label>Website</Label>
                            <Input defaultValue={accelerator.website} />
                          </div>
                          <div>
                            <Label>Contact Email</Label>
                            <Input defaultValue={accelerator.contactEmail} />
                          </div>
                          <div>
                            <Label>Contact Phone</Label>
                            <Input defaultValue={accelerator.contactPhone} />
                          </div>
                          <div>
                            <Label>Location</Label>
                            <Input defaultValue={accelerator.location} />
                          </div>
                          <div>
                            <Label>Duration</Label>
                            <Input defaultValue={accelerator.duration} />
                          </div>
                          <div>
                            <Label>Equity Taken</Label>
                            <Input defaultValue={accelerator.equityTaken} />
                          </div>
                          <div>
                            <Label>Founded Year</Label>
                            <Input defaultValue={accelerator.founded} />
                          </div>
                        </div>

                        <div>
                          <Label>Description</Label>
                          <Textarea defaultValue={accelerator.description} rows={3} />
                        </div>

                        <div>
                          <Label>Specialization</Label>
                          <Input defaultValue={accelerator.specialization} />
                        </div>

                        {/* Matching Criteria */}
                        <div className="space-y-4">
                          <h3 className="font-semibold">Matching Criteria</h3>
                          
                          <div>
                            <Label>Business Stages</Label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                              {stageOptions.map(stage => (
                                <div key={stage} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`stage-${stage}`}
                                    defaultChecked={accelerator.stages.includes(stage)}
                                  />
                                  <Label htmlFor={`stage-${stage}`} className="text-sm">{stage}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label>Industries</Label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                              {industryOptions.map(industry => (
                                <div key={industry} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`industry-${industry}`}
                                    defaultChecked={accelerator.industries.includes(industry)}
                                  />
                                  <Label htmlFor={`industry-${industry}`} className="text-sm">{industry}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label>Verticals</Label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                              {verticalOptions.map(vertical => (
                                <div key={vertical} className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`vertical-${vertical}`}
                                    defaultChecked={accelerator.verticals.includes(vertical)}
                                  />
                                  <Label htmlFor={`vertical-${vertical}`} className="text-sm">{vertical}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label>Key Benefits (one per line)</Label>
                          <Textarea 
                            defaultValue={accelerator.keyBenefits.join('\n')} 
                            rows={4}
                            placeholder="Enter each benefit on a new line"
                          />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-red-600 hover:bg-red-700">Save Changes</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700 line-clamp-2">{accelerator.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">{accelerator.equityTaken}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {accelerator.cohortBased ? 'Cohort' : 'Flexible'}
                  </Badge>
                  <Badge variant="outline" className="text-xs">{accelerator.specialization}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Users className="h-3 w-3" />
                    <span>Stages: {accelerator.stages.join(', ')}</span>
                  </div>
                  
                  {accelerator.contactEmail && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Mail className="h-3 w-3" />
                      <a href={`mailto:${accelerator.contactEmail}`} className="hover:text-blue-600">
                        {accelerator.contactEmail}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <ExternalLink className="h-3 w-3" />
                    <a href={accelerator.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      Visit Website
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-xs text-gray-500">
                    <strong>Industries:</strong> {accelerator.industries.join(', ')}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <strong>Verticals:</strong> {accelerator.verticals.join(', ')}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAccelerators.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Settings className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No accelerators found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceleratorAdmin;
