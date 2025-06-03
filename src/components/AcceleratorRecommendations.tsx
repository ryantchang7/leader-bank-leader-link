
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExternalLink, Users, Calendar, TrendingUp, MapPin } from 'lucide-react';
import { FormData } from '@/pages/Index';

interface AcceleratorRecommendationsProps {
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
  investments: number;
  exits: number;
  website: string;
  location: string;
  specialization: string;
  whyGoodFit: string;
  keyBenefits: string[];
  founders?: string[];
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
    investments: 2659,
    exits: 139,
    website: 'https://masschallenge.org',
    location: 'Boston, MA',
    specialization: 'Industry Agnostic with Global Reach',
    whyGoodFit: 'Perfect for startups seeking comprehensive support across all industries with access to a massive global network.',
    keyBenefits: ['Zero equity taken', 'Global mentor network', 'Access to corporate partners', 'Demo day exposure']
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
    investments: 203,
    exits: 40,
    website: 'https://techstars.com/accelerators/boston',
    location: 'Boston, MA',
    specialization: 'Tech-focused with strong mentor network',
    whyGoodFit: 'Ideal for technology startups ready for intensive mentorship and rapid scaling.',
    keyBenefits: ['$100K+ funding', 'Lifetime mentor network', 'Techstars alumni network', 'Investor demo day']
  },
  {
    id: 'fintech-sandbox',
    name: 'Fintech Sandbox',
    description: 'Non-profit helping fintech startups build great products',
    industries: ['financial'],
    verticals: ['fintech', 'insurtech'],
    stages: ['pre-seed', 'seed'],
    founded: '2014',
    duration: '24 weeks',
    investments: 112,
    exits: 13,
    website: 'https://fintechsandbox.org',
    location: 'Boston, MA',
    specialization: 'FinTech Innovation Hub',
    whyGoodFit: 'Specialized for financial technology companies needing industry connections and regulatory guidance.',
    keyBenefits: ['Free data access', 'Regulatory guidance', 'Bank partnerships', 'FinTech community']
  },
  {
    id: 'carb-x',
    name: 'CARB-X',
    description: 'Accelerating antibacterial research and development',
    industries: ['healthcare', 'life-sciences'],
    verticals: ['life-sciences', 'health'],
    stages: ['pre-seed', 'seed'],
    founded: '2016',
    duration: '18 months',
    investments: 101,
    exits: 25,
    website: 'https://carb-x.org',
    location: 'Boston, MA',
    specialization: 'Antibacterial & Pharmaceutical Innovation',
    whyGoodFit: 'Essential for life sciences companies developing solutions for drug-resistant bacteria and infectious diseases.',
    keyBenefits: ['Up to $9M funding', 'Regulatory expertise', 'Global partnerships', 'Clinical development support']
  },
  {
    id: 'learnlaunch',
    name: 'LearnLaunch Accelerator',
    description: 'Venture capital and accelerator for education entrepreneurs',
    industries: ['technology'],
    verticals: ['education', 'edtech'],
    stages: ['seed', 'series-a'],
    founded: '2013',
    duration: '11 weeks',
    investments: 83,
    exits: 7,
    website: 'https://learnlaunch.com',
    location: 'Boston, MA',
    specialization: 'Education Technology Focus',
    whyGoodFit: 'Perfect for education technology companies seeking sector-specific expertise and connections.',
    keyBenefits: ['EdTech expertise', 'School district connections', 'Pilot program opportunities', 'Education investor network']
  },
  {
    id: 'accelicity',
    name: 'AcceliCITY',
    description: 'Making cities more resilient and sustainable',
    industries: ['technology'],
    verticals: ['infrastructure', 'energy'],
    stages: ['seed', 'series-a'],
    founded: '2010',
    duration: '9 weeks',
    investments: 31,
    exits: 0,
    website: 'https://accelicity.com',
    location: 'Boston, MA',
    specialization: 'Climate Tech & Smart Cities',
    whyGoodFit: 'Ideal for climate technology and smart city solution companies.',
    keyBenefits: ['City pilot programs', 'Government connections', 'Sustainability focus', 'Climate tech network']
  },
  {
    id: 'petri',
    name: 'Petri',
    description: 'Early-stage biotech and bio-engineering funding',
    industries: ['life-sciences'],
    verticals: ['life-sciences', 'robotics'],
    stages: ['pre-seed', 'seed'],
    founded: '2019',
    duration: '6 months',
    investments: 6,
    exits: 0,
    website: 'https://petri.bio',
    location: 'Boston, MA',
    specialization: 'Biotech & Bio-Engineering',
    whyGoodFit: 'Specialized for cutting-edge biotech companies combining biology and engineering.',
    keyBenefits: ['Bio-engineering expertise', 'Lab access', 'Scientific mentorship', 'Biotech investor network']
  }
];

const AcceleratorRecommendations: React.FC<AcceleratorRecommendationsProps> = ({ formData }) => {
  const [selectedAccelerator, setSelectedAccelerator] = useState<Accelerator | null>(null);

  const getRecommendedAccelerators = () => {
    if (!formData.industry || !formData.vertical) return [];
    
    return accelerators.filter(acc => 
      acc.industries.includes(formData.industry) || 
      acc.verticals.includes(formData.vertical) ||
      (acc.stages.includes(formData.businessStage))
    ).slice(0, 5); // Show top 5 matches
  };

  const recommendedAccelerators = getRecommendedAccelerators();

  if (recommendedAccelerators.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-gray-50 rounded-lg border border-red-100">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          🚀 Recommended Accelerators for Your Journey
        </h3>
        <p className="text-sm text-gray-600">
          Based on your industry ({formData.industry}) and vertical ({formData.vertical}), 
          here are accelerators that could be perfect partners for your growth:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedAccelerators.map((accelerator) => (
          <Card key={accelerator.id} className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base font-semibold text-gray-900">
                    {accelerator.name}
                  </CardTitle>
                  <p className="text-xs text-gray-600 mt-1">{accelerator.specialization}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {accelerator.duration}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {accelerator.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{accelerator.investments} investments</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{accelerator.exits} exits</span>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setSelectedAccelerator(accelerator)}
                  >
                    Why This Fits Your Startup
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
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
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-gray-500" />
                        <span><strong>Track Record:</strong> {accelerator.investments} investments, {accelerator.exits} exits</span>
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

                    <div className="flex gap-3 pt-4 border-t">
                      <Button 
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={() => window.open(accelerator.website, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Their Website
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          const subject = `Partnership Inquiry from Leader Bank Cap Connect`;
                          const body = `Hi ${accelerator.name} team,\n\nI was referred to your accelerator through Leader Bank's Cap Connect platform. I'm interested in learning more about your program.\n\nBest regards,\n${formData.contactName}`;
                          window.location.href = `mailto:info@${accelerator.website.replace('https://', '').replace('http://', '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}
                      >
                        Contact Them
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-600">
          💡 <strong>Next Step:</strong> Our team will also provide personalized introductions to the best-fit accelerators based on your complete profile.
        </p>
      </div>
    </div>
  );
};

export default AcceleratorRecommendations;
