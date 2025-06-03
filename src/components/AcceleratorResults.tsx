
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Users, Calendar, MapPin, Mail, Phone, Star, Rocket } from 'lucide-react';
import { FormData } from '@/types/formData';

interface AcceleratorResultsProps {
  formData: FormData;
}

interface Accelerator {
  id: string;
  name: string;
  description: string;
  industries: string[];
  verticals: string[];
  stages: string[];
  founded: string;
  duration: string;
  website: string;
  location: string;
  specialization: string;
  whyGoodFit: string;
  keyBenefits: string[];
  contactEmail?: string;
  contactPhone?: string;
  logoUrl: string;
}

const accelerators: Accelerator[] = [
  {
    id: 'masschallenge',
    name: 'MassChallenge',
    description: 'Global network solving big problems through innovation',
    industries: ['b2b', 'b2c', 'technology', 'healthcare', 'financial'],
    verticals: ['saas', 'fintech', 'health', 'ai-ml', 'other'],
    stages: ['seed', 'series-a'],
    founded: '2009',
    duration: '20 weeks',
    website: 'https://masschallenge.org',
    location: 'Boston, MA',
    specialization: 'Industry Agnostic with Global Reach',
    whyGoodFit: 'Perfect for startups seeking comprehensive support across all industries with access to a massive global network.',
    keyBenefits: ['Zero equity taken', 'Global mentor network', 'Access to corporate partners', 'Demo day exposure'],
    contactEmail: 'info@masschallenge.org',
    logoUrl: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1455514364/pim02bzqvgz0hibsra41.png'
  },
  {
    id: 'techstars-boston',
    name: 'Techstars Boston',
    description: 'Giving access to money, mentors, talent, and tools',
    industries: ['technology', 'b2b', 'b2c'],
    verticals: ['saas', 'ai-ml', 'fintech', 'health'],
    stages: ['seed', 'series-a'],
    founded: '2006',
    duration: '13 weeks',
    website: 'https://techstars.com/accelerators/boston',
    location: 'Boston, MA',
    specialization: 'Tech-focused with strong mentor network',
    whyGoodFit: 'Ideal for technology startups ready for intensive mentorship and rapid scaling.',
    keyBenefits: ['$100K+ funding', 'Lifetime mentor network', 'Techstars alumni network', 'Investor demo day'],
    contactEmail: 'boston@techstars.com',
    logoUrl: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1397181252/8c8cfc3de3de90ca90bc1633c72c0a32.png'
  },
  {
    id: 'fintech-sandbox',
    name: 'Fintech Sandbox',
    description: 'Non-profit helping fintech startups build great products',
    industries: ['financial'],
    verticals: ['fintech'],
    stages: ['pre-seed', 'seed'],
    founded: '2014',
    duration: '24 weeks',
    website: 'https://fintechsandbox.org',
    location: 'Boston, MA',
    specialization: 'FinTech Innovation Hub',
    whyGoodFit: 'Specialized for financial technology companies needing industry connections and regulatory guidance.',
    keyBenefits: ['Free data access', 'Regulatory guidance', 'Bank partnerships', 'FinTech community'],
    contactEmail: 'info@fintechsandbox.org',
    logoUrl: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1473719522/tg8wdj6gkgfrsnwkpn61.png'
  }
];

const AcceleratorResults: React.FC<AcceleratorResultsProps> = ({ formData }) => {
  const [selectedAccelerator, setSelectedAccelerator] = useState<Accelerator | null>(null);

  const getRecommendedAccelerators = () => {
    if (!formData.industry || !formData.vertical) return [];
    
    return accelerators.filter(acc => 
      acc.industries.includes(formData.industry) || 
      acc.verticals.includes(formData.vertical) ||
      (acc.stages.includes(formData.businessStage))
    ).slice(0, 3);
  };

  const recommendedAccelerators = getRecommendedAccelerators();

  if (recommendedAccelerators.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Rocket className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Your Accelerator Matches</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Based on your profile as a {formData.industry} company in {formData.vertical}, 
          here are the top 3 accelerators we recommend for your growth journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {recommendedAccelerators.map((accelerator, index) => (
          <Card key={accelerator.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-red-100 text-red-700">
                #{index + 1} Match
              </Badge>
            </div>
            
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4 mb-3">
                <img 
                  src={accelerator.logoUrl} 
                  alt={`${accelerator.name} logo`}
                  className="w-12 h-12 object-contain rounded"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${accelerator.name}&background=ef4444&color=fff&size=48`;
                  }}
                />
                <div>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {accelerator.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{accelerator.specialization}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{accelerator.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{accelerator.location}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {accelerator.description}
              </p>
              
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Perfect Fit Because:</span>
                </div>
                <p className="text-xs text-green-800">{accelerator.whyGoodFit}</p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => setSelectedAccelerator(accelerator)}
                  >
                    View Details & Get Introduction
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <img 
                        src={accelerator.logoUrl} 
                        alt={`${accelerator.name} logo`}
                        className="w-8 h-8 object-contain rounded"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${accelerator.name}&background=ef4444&color=fff&size=32`;
                        }}
                      />
                      {accelerator.name}
                      <Badge variant="secondary">{accelerator.specialization}</Badge>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span><strong>Duration:</strong> {accelerator.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span><strong>Location:</strong> {accelerator.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span><strong>Founded:</strong> {accelerator.founded}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">🎯 Why This Is Perfect For You</h4>
                      <p className="text-sm text-green-800">{accelerator.whyGoodFit}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Benefits You'll Get:</h4>
                      <ul className="space-y-1">
                        {accelerator.keyBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">🤝 How Leader Bank Cap Connect Can Help</h4>
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
                          <a href={accelerator.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {accelerator.website}
                          </a>
                        </div>
                        {accelerator.contactEmail && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <a href={`mailto:${accelerator.contactEmail}`} className="text-blue-600 hover:underline">
                              {accelerator.contactEmail}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                      <Button 
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={() => {
                          const subject = `Introduction Request via Leader Bank Cap Connect - ${accelerator.name}`;
                          const body = `Dear Leader Bank Cap Connect Team,\n\nI would like to request an introduction to ${accelerator.name}. Based on my startup profile, this accelerator seems like a perfect fit.\n\nCompany: ${formData.borrowerName}\nContact: ${formData.contactName}\nEmail: ${formData.contactEmail}\nIndustry: ${formData.industry}\nVertical: ${formData.vertical}\n\nPlease help facilitate this connection and explore any potential discounts or special terms.\n\nBest regards,\n${formData.contactName}`;
                          window.location.href = `mailto:capconnect@leaderbank.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}
                      >
                        Request Introduction
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
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

      <div className="bg-gradient-to-r from-red-50 to-blue-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 className="font-semibold text-gray-900 mb-3">🚀 Ready to Take the Next Step?</h3>
        <p className="text-sm text-gray-700 mb-4">
          Our team will personally introduce you to these accelerators and help you secure the best terms. 
          We'll also guide you through the application process to maximize your chances of acceptance.
        </p>
        <Button 
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
          onClick={() => {
            const subject = `Accelerator Introduction Package Request`;
            const body = `Dear Leader Bank Cap Connect Team,\n\nI'm interested in getting introductions to the recommended accelerators from my Cap Connect assessment.\n\nCompany: ${formData.borrowerName}\nContact: ${formData.contactName}\nEmail: ${formData.contactEmail}\n\nPlease contact me to discuss the next steps and introduction process.\n\nBest regards,\n${formData.contactName}`;
            window.location.href = `mailto:capconnect@leaderbank.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          }}
        >
          Get All Introductions Now
        </Button>
      </div>
    </div>
  );
};

export default AcceleratorResults;
