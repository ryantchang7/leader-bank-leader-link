
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Users, Calendar, MapPin, Mail, Phone, Star, Rocket, Award } from 'lucide-react';
import { FormData } from '@/types/formData';
import { getRecommendedAccelerators, Accelerator } from '@/data/accelerators';

interface AcceleratorResultsProps {
  formData: FormData;
}

const AcceleratorResults: React.FC<AcceleratorResultsProps> = ({ formData }) => {
  const [selectedAccelerator, setSelectedAccelerator] = useState<Accelerator | null>(null);
  const recommendedAccelerators = getRecommendedAccelerators(formData);

  // Scroll to results when component mounts
  useEffect(() => {
    const resultsSection = document.querySelector('.accelerator-results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (recommendedAccelerators.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 accelerator-results-section">
        <div className="text-center">
          <Rocket className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Direct Matches Found</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find accelerators that perfectly match your criteria, but our team can help you find the right fit.
          </p>
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => {
              const subject = `Custom Accelerator Matching Request`;
              const body = `Dear Leader Bank Fund Finder Team,\n\nI need help finding accelerators that match my startup profile:\n\nCompany: ${formData.borrowerName}\nIndustry: ${formData.industry}\nVertical: ${formData.vertical}\nStage: ${formData.businessStage}\n\nPlease help me find suitable accelerator opportunities.\n\nBest regards,\n${formData.contactName}`;
              window.location.href = `mailto:fundfinder@leaderbank.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }}
          >
            Get Personal Accelerator Matching
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 accelerator-results-section">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Rocket className="h-8 w-8 text-red-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Top 3 Accelerator Matches</h1>
        </div>
        <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Based on your profile as a <span className="font-semibold">{formData.businessStage}</span> stage{' '}
          <span className="font-semibold">{formData.industry}</span> company in{' '}
          <span className="font-semibold">{formData.vertical}</span>, here are our top recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {recommendedAccelerators.map((accelerator, index) => (
          <Card key={accelerator.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200 relative overflow-hidden flex flex-col h-full">
            <div className="absolute top-4 right-4 z-10">
              <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                #{index + 1} Match
              </Badge>
            </div>
            
            <CardHeader className="pb-4 flex-shrink-0 pr-16">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-1">
                    {accelerator.name}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-gray-600 leading-tight">{accelerator.specialization}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-500">
                {accelerator.duration && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{accelerator.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{accelerator.location}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col pt-0">
              <p className="text-sm text-gray-700 mb-4 line-clamp-3 flex-1">
                {accelerator.description}
              </p>
              
              <div className="bg-green-50 p-3 rounded-lg mb-4 flex-shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-green-900">Perfect Fit:</span>
                </div>
                <p className="text-xs text-green-800 mb-1">{accelerator.equityTaken}</p>
                <p className="text-xs text-green-800">{accelerator.cohortBased ? 'Cohort-based' : 'Flexible timeline'}</p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto text-sm py-2"
                    onClick={() => setSelectedAccelerator(accelerator)}
                  >
                    View Details & Get Introduction
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto mx-4">
                  <DialogHeader>
                    <DialogTitle className="flex flex-col sm:flex-row sm:items-center gap-3 text-left">
                      <div className="flex items-center gap-2">
                        <Award className="h-6 w-6 text-red-600" />
                        <span className="text-lg sm:text-xl">{accelerator.name}</span>
                      </div>
                      <Badge variant="secondary" className="w-fit">{accelerator.specialization}</Badge>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      {accelerator.duration && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span><strong>Duration:</strong> {accelerator.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span><strong>Location:</strong> {accelerator.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span><strong>Equity:</strong> {accelerator.equityTaken}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-gray-500" />
                        <span><strong>Format:</strong> {accelerator.cohortBased ? 'Cohort-based' : 'Flexible'}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">🎯 Why This Is Perfect For You</h4>
                      <p className="text-sm text-green-800">{accelerator.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Benefits You'll Get:</h4>
                      <ul className="space-y-1">
                        {accelerator.keyBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">🤝 How Leader Bank Fund Finder Can Help</h4>
                      <ul className="space-y-1 text-sm text-blue-800">
                        <li>• Warm introduction to program directors</li>
                        <li>• Application guidance and review</li>
                        <li>• Negotiated discounts on program fees</li>
                        <li>• Ongoing support throughout the process</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Contact Information:</h4>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                          <a href={accelerator.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                            {accelerator.website}
                          </a>
                        </div>
                        {accelerator.contactEmail && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <a href={`mailto:${accelerator.contactEmail}`} className="text-blue-600 hover:underline break-all">
                              {accelerator.contactEmail}
                            </a>
                          </div>
                        )}
                        {accelerator.contactPhone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <a href={`tel:${accelerator.contactPhone}`} className="text-blue-600 hover:underline">
                              {accelerator.contactPhone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                      <Button 
                        className="flex-1 bg-red-600 hover:bg-red-700 text-sm"
                        onClick={() => {
                          const subject = `Introduction Request via Leader Bank Fund Finder - ${accelerator.name}`;
                          const body = `Dear Leader Bank Fund Finder Team,\n\nI would like to request an introduction to ${accelerator.name}. Based on my startup profile, this accelerator seems like a perfect fit.\n\nCompany: ${formData.borrowerName}\nContact: ${formData.contactName}\nEmail: ${formData.contactEmail}\nIndustry: ${formData.industry}\nVertical: ${formData.vertical}\nStage: ${formData.businessStage}\n\nPlease help facilitate this connection and explore any potential discounts or special terms.\n\nBest regards,\n${formData.contactName}`;
                          window.location.href = `mailto:fundfinder@leaderbank.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}
                      >
                        Request Introduction
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 text-sm"
                        onClick={() => window.open(accelerator.website, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-red-50 to-blue-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
        <h3 className="font-semibold text-gray-900 mb-3">🚀 Ready to Take the Next Step?</h3>
        <p className="text-sm text-gray-700 mb-4">
          Our team will personally introduce you to these accelerators and help you secure the best terms. 
          We'll also guide you through the application process to maximize your chances of acceptance.
        </p>
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 text-sm sm:text-base"
          onClick={() => {
            const subject = `Accelerator Introduction Package Request`;
            const body = `Dear Leader Bank Fund Finder Team,\n\nI'm interested in getting introductions to the recommended accelerators from my Fund Finder assessment.\n\nCompany: ${formData.borrowerName}\nContact: ${formData.contactName}\nEmail: ${formData.contactEmail}\n\nRecommended Accelerators:\n${recommendedAccelerators.map(acc => `- ${acc.name}`).join('\n')}\n\nPlease contact me to discuss the next steps and introduction process.\n\nBest regards,\n${formData.contactName}`;
            window.location.href = `mailto:fundfinder@leaderbank.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          }}
        >
          Get All Introductions Now
        </Button>
      </div>
    </div>
  );
};

export default AcceleratorResults;
