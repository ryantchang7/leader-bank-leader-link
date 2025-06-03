
export interface Accelerator {
  id: string;
  name: string;
  description: string;
  website: string;
  contactEmail?: string;
  contactPhone?: string;
  location: string;
  duration?: string;
  founded?: string;
  specialization: string;
  equityTaken: string;
  cohortBased: boolean;
  stages: string[];
  industries: string[];
  verticals: string[];
  logoUrl?: string;
  keyBenefits: string[];
  applicationDeadlines?: string;
  fundingProvided?: string;
}

export const accelerators: Accelerator[] = [
  {
    id: 'growthcraft',
    name: 'GrowthCraft',
    description: 'A standout accelerator in the Boston ecosystem, known for its flexible, founder-friendly approach. Unlike traditional accelerators, it doesn\'t take equity and doesn\'t operate in rigid cohorts, making it accessible and adaptable for startups at any stage.',
    website: 'https://growthcraft.co',
    contactEmail: 'info@growthcraft.co',
    location: 'Boston, MA',
    specialization: 'Industry-agnostic, flexible support',
    equityTaken: '0% - No equity taken',
    cohortBased: false,
    stages: ['pre-seed', 'seed', 'series-a', 'self-funded'],
    industries: ['b2b', 'b2c', 'technology', 'consumer', 'retail'],
    verticals: ['saas', 'consumer', 'e-commerce', 'hr-tech', 'other'],
    keyBenefits: ['No equity taken', 'Flexible timeline', 'Hands-on mentorship', 'Funding readiness support', 'Expert connections']
  },
  {
    id: 'masschallenge',
    name: 'MassChallenge',
    description: 'Global network solving big problems through innovation. Zero-equity accelerator with the largest startup community in the world.',
    website: 'https://masschallenge.org',
    contactEmail: 'boston@masschallenge.org',
    location: 'Boston, MA',
    duration: '20 weeks',
    founded: '2009',
    specialization: 'Industry Agnostic with Global Reach',
    equityTaken: '0% - No equity taken',
    cohortBased: true,
    stages: ['seed', 'series-a'],
    industries: ['b2b', 'b2c', 'technology', 'healthcare', 'consumer', 'retail'],
    verticals: ['saas', 'health', 'consumer', 'other'],
    keyBenefits: ['Zero equity taken', 'Global mentor network', 'Access to corporate partners', 'Demo day exposure']
  },
  {
    id: 'techstars-boston',
    name: 'Techstars Boston',
    description: 'Giving access to money, mentors, talent, and tools. One of the most established tech accelerators with a strong alumni network.',
    website: 'https://techstars.com/accelerators/boston',
    contactEmail: 'boston@techstars.com',
    location: 'Boston, MA',
    duration: '13 weeks',
    founded: '2006',
    specialization: 'Tech-focused with strong mentor network',
    equityTaken: '6-8%',
    cohortBased: true,
    stages: ['pre-seed', 'seed'],
    industries: ['technology', 'b2b'],
    verticals: ['saas', 'ai-ml', 'hardware', 'robotics-drones', 'it'],
    keyBenefits: ['$100K+ funding', 'Lifetime mentor network', 'Techstars alumni network', 'Investor demo day']
  },
  {
    id: 'fintech-sandbox',
    name: 'Fintech Sandbox',
    description: 'Non-profit helping fintech startups build great products with free access to data and APIs.',
    website: 'https://fintechsandbox.org',
    contactEmail: 'info@fintechsandbox.org',
    location: 'Boston, MA',
    duration: '24 weeks',
    founded: '2014',
    specialization: 'FinTech Innovation Hub',
    equityTaken: '0% - No equity taken',
    cohortBased: false,
    stages: ['pre-seed', 'seed'],
    industries: ['financial'],
    verticals: ['fintech', 'insurtech'],
    keyBenefits: ['Free data access', 'Regulatory guidance', 'Bank partnerships', 'FinTech community']
  },
  {
    id: 'prepare4vc',
    name: 'Prepare 4 VC',
    description: 'Focused on preparing startups for venture capital funding with intensive mentorship and investor connections.',
    website: 'https://prepare4vc.com',
    contactEmail: 'info@prepare4vc.com',
    location: 'Boston, MA',
    specialization: 'VC Readiness & Fundraising',
    equityTaken: 'Varies',
    cohortBased: true,
    stages: ['pre-seed', 'seed'],
    industries: ['b2b', 'technology', 'consumer', 'media', 'real-estate'],
    verticals: ['saas', 'ai-ml', 'consumer', 'e-commerce', 'gaming', 'govtech', 'hr-tech', 'infrastructure', 'insurtech', 'it', 'media', 'transportation'],
    keyBenefits: ['VC introductions', 'Pitch deck refinement', 'Due diligence preparation', 'Fundraising strategy']
  },
  {
    id: 'greentown-labs',
    name: 'Greentown Labs',
    description: 'The largest climatetech startup incubator in North America, fostering breakthrough energy and environmental technologies.',
    website: 'https://greentownlabs.com',
    contactEmail: 'info@greentownlabs.com',
    location: 'Somerville, MA',
    specialization: 'ClimaTech & Energy Innovation',
    equityTaken: '0% - Membership based',
    cohortBased: false,
    stages: ['pre-seed', 'seed', 'series-a', 'series-b'],
    industries: ['energy', 'consumer'],
    verticals: ['agtech', 'energy', 'food-beverage', 'transportation'],
    keyBenefits: ['Lab space access', 'Climate investor network', 'Corporate partnerships', 'Technical mentorship']
  },
  {
    id: 'mit-media-lab',
    name: 'MIT Media Lab',
    description: 'An interdisciplinary research lab at MIT that encourages unconventional mixing and matching of seemingly disparate research areas.',
    website: 'https://media.mit.edu',
    contactEmail: 'info@media.mit.edu',
    location: 'Cambridge, MA',
    specialization: 'Deep Tech & Research',
    equityTaken: 'N/A - Research focused',
    cohortBased: false,
    stages: ['pre-seed', 'seed'],
    industries: ['technology', 'media'],
    verticals: ['ai-ml', 'gaming', 'hardware', 'media', 'robotics-drones'],
    keyBenefits: ['MIT resources', 'Research collaboration', 'Academic partnerships', 'Innovation ecosystem']
  },
  {
    id: 'factory45',
    name: 'Factory45',
    description: 'Online accelerator for sustainable fashion and lifestyle brands, focusing on ethical manufacturing and retail strategies.',
    website: 'https://factory45.co',
    contactEmail: 'shannon@factory45.co',
    location: 'Online/Boston, MA',
    duration: '16 weeks',
    specialization: 'Sustainable Fashion & Lifestyle',
    equityTaken: '0% - Program fee based',
    cohortBased: true,
    stages: ['pre-seed', 'seed'],
    industries: ['consumer', 'retail', 'financial'],
    verticals: ['consumer', 'e-commerce', 'food-beverage', 'fintech'],
    keyBenefits: ['Manufacturing connections', 'Retail strategy', 'Sustainable practices', 'Brand development']
  },
  {
    id: 'masschallenge-healthtech',
    name: 'MassChallenge HealthTech',
    description: 'Specialized MassChallenge program focused on healthcare innovation and digital health startups.',
    website: 'https://masschallenge.org/programs-boston-healthtech',
    contactEmail: 'healthtech@masschallenge.org',
    location: 'Boston, MA',
    duration: '20 weeks',
    specialization: 'Healthcare Innovation',
    equityTaken: '0% - No equity taken',
    cohortBased: true,
    stages: ['seed', 'series-a'],
    industries: ['healthcare'],
    verticals: ['health', 'life-sciences'],
    keyBenefits: ['Healthcare mentor network', 'Hospital partnerships', 'Regulatory guidance', 'Clinical trial support']
  },
  {
    id: 'c10-labs',
    name: 'C10 Labs',
    description: 'Technology accelerator focused on AI, machine learning, and advanced computing technologies.',
    website: 'https://c10labs.com',
    contactEmail: 'info@c10labs.com',
    location: 'Boston, MA',
    specialization: 'AI & Advanced Computing',
    equityTaken: '5-7%',
    cohortBased: true,
    stages: ['pre-seed', 'seed'],
    industries: ['technology'],
    verticals: ['ai-ml', 'hardware', 'robotics-drones', 'it'],
    keyBenefits: ['AI expertise', 'Technical mentorship', 'Computing resources', 'Industry connections']
  }
];

export const getRecommendedAccelerators = (formData: any): Accelerator[] => {
  const { businessStage, industry, vertical } = formData;
  
  return accelerators
    .filter(acc => {
      const stageMatch = acc.stages.includes(businessStage);
      const industryMatch = acc.industries.includes(industry);
      const verticalMatch = acc.verticals.includes(vertical);
      
      // Score based on matches
      return stageMatch || industryMatch || verticalMatch;
    })
    .sort((a, b) => {
      // Prioritize GrowthCraft for industry-agnostic needs
      if (a.id === 'growthcraft' && (vertical === 'other' || industry === 'b2b')) return -1;
      if (b.id === 'growthcraft' && (vertical === 'other' || industry === 'b2b')) return 1;
      
      // Score by number of matches
      const scoreA = [a.stages.includes(businessStage), a.industries.includes(industry), a.verticals.includes(vertical)].filter(Boolean).length;
      const scoreB = [b.stages.includes(businessStage), b.industries.includes(industry), b.verticals.includes(vertical)].filter(Boolean).length;
      
      return scoreB - scoreA;
    })
    .slice(0, 3);
};
