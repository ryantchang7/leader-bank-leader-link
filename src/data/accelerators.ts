
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
  linkedin?: string;
}

export const accelerators: Accelerator[] = [
  {
    id: 'growthcraft',
    name: 'GrowthCraft',
    description: 'A flexible, no-equity accelerator that provides hands-on mentorship and tailored support to help startups refine their growth strategies and fundraising efforts. With a simple monthly membership and a focus on founder-friendly scaling, plus trusted advisors like Vitaliy Schaefer, Director of Leader Bank\'s VC/PE & Tech Banking Team, GrowthCraft is the perfect partner for startups across all stages and industries.',
    website: 'https://growthcraft.org/',
    contactEmail: 'info@growthcraft.org',
    location: 'Cambridge, MA',
    founded: '2021',
    specialization: 'Industry-agnostic, flexible support',
    equityTaken: '0% - No equity taken',
    cohortBased: false,
    stages: ['pre-seed', 'seed', 'series-a', 'series-b', 'self-funded', 'na'],
    industries: ['b2b', 'b2c', 'technology', 'consumer', 'retail', 'real-estate'],
    verticals: ['saas', 'consumer', 'e-commerce', 'hr-tech', 'other'],
    keyBenefits: ['No equity taken', 'Flexible timeline', 'Hands-on mentorship', 'Funding readiness support', 'Expert connections', 'Monthly membership model'],
    linkedin: 'https://www.linkedin.com/company/growthcraft-startup-community/posts/?feedView=all'
  },
  {
    id: 'masschallenge',
    name: 'MassChallenge',
    description: 'A global zero-equity accelerator that empowers early-stage startups to grow by connecting them with mentors, corporate partners, and a vibrant community of fellow entrepreneurs. With a proven track record of supporting thousands of startups across all industries, MassChallenge helps founders build momentum and create impact.',
    website: 'https://masschallenge.org/',
    contactEmail: 'contact@masschallenge.org',
    location: 'Boston, MA',
    founded: '2009',
    specialization: 'Industry Agnostic with Global Reach',
    equityTaken: '0% - No equity taken',
    cohortBased: true,
    stages: ['pre-seed', 'seed', 'series-a'],
    industries: ['b2b', 'b2c', 'technology', 'healthcare', 'consumer', 'retail'],
    verticals: ['saas', 'health', 'consumer', 'other'],
    keyBenefits: ['Zero equity taken', 'Global mentor network', 'Access to corporate partners', 'Demo day exposure', 'Proven track record'],
    linkedin: 'https://www.linkedin.com/school/masschallenge/'
  },
  {
    id: 'techstars-boston',
    name: 'Techstars Boston Accelerator',
    description: 'A mentorship-driven accelerator that invests in early-stage startups, providing them with capital, hands-on guidance, and access to a global network of mentors, investors, and alumni. With over a decade of experience in the Boston innovation ecosystem, Techstars Boston has supported numerous startups across various industries, helping them scale and succeed.',
    website: 'https://www.techstars.com/accelerators/boston',
    contactEmail: 'contact@techstars.com',
    location: 'Boston, MA',
    founded: '2009',
    specialization: 'Tech-focused with strong mentor network',
    equityTaken: '6-8%',
    cohortBased: true,
    stages: ['pre-seed', 'seed'],
    industries: ['technology', 'b2b'],
    verticals: ['saas', 'ai-ml', 'hardware', 'robotics', 'it'],
    keyBenefits: ['$100K+ funding', 'Lifetime mentor network', 'Techstars alumni network', 'Investor demo day', 'Global network access'],
    linkedin: 'https://www.linkedin.com/company/techstars-boston'
  },
  {
    id: 'fintech-sandbox',
    name: 'Fintech Sandbox',
    description: 'A nonprofit organization that provides early-stage fintech startups with free access to critical datasets and resources through its Data Access Residency program. By eliminating the high costs associated with data acquisition, Fintech Sandbox empowers entrepreneurs to develop and scale their innovative financial technology solutions without the burden of fees or equity dilution.',
    website: 'https://www.fintechsandbox.org/',
    location: 'Boston, MA',
    founded: '2014',
    specialization: 'FinTech Innovation Hub',
    equityTaken: '0% - No equity taken',
    cohortBased: false,
    stages: ['pre-seed', 'seed'],
    industries: ['financial'],
    verticals: ['fintech', 'insurtech'],
    keyBenefits: ['Free data access', 'No fees or equity', 'Critical datasets', 'Residency program', 'FinTech community'],
    linkedin: 'https://www.linkedin.com/company/fintech-sandbox'
  },
  {
    id: 'prepare4vc',
    name: 'Prepare 4 VC',
    description: 'Offers a structured 12-week accelerator program designed to help early-stage startups become investment-ready. Through educational programming, mentorship, and investor connections, the program aims to achieve 12-month milestones in just 12 weeks.',
    website: 'https://www.prepare4vc.com/',
    contactEmail: 'info@prepare4vc.com',
    location: 'Boston, MA',
    duration: '12 weeks',
    founded: '2016',
    specialization: 'VC Readiness & Fundraising',
    equityTaken: 'Varies',
    cohortBased: true,
    stages: ['pre-seed', 'seed'],
    industries: ['b2b', 'technology', 'consumer', 'media', 'real-estate'],
    verticals: ['saas', 'ai-ml', 'consumer', 'e-commerce', 'gaming', 'govtech', 'hr-tech', 'infrastructure', 'insurtech', 'it', 'media', 'transportation'],
    keyBenefits: ['VC introductions', 'Pitch deck refinement', 'Due diligence preparation', 'Fundraising strategy', '12-month milestones in 12 weeks'],
    linkedin: 'https://www.linkedin.com/company/prepare4vc'
  },
  {
    id: 'greentown-labs',
    name: 'Greentown Labs',
    description: 'The largest climatetech startup incubator in North America, fostering breakthrough energy and environmental technologies through a membership-based model. Located in Somerville, MA, it supports founders developing sustainable solutions.',
    website: 'https://greentownlabs.com/',
    contactEmail: 'info@greentownlabs.com',
    location: 'Somerville, MA',
    founded: '2011',
    specialization: 'ClimaTech & Energy Innovation',
    equityTaken: '0% - Membership based',
    cohortBased: false,
    stages: ['pre-seed', 'seed', 'series-a', 'series-b'],
    industries: ['energy', 'consumer'],
    verticals: ['agtech', 'energy', 'food-beverage', 'transportation'],
    keyBenefits: ['Lab space access', 'Climate investor network', 'Corporate partnerships', 'Technical mentorship', 'Membership-based model'],
    linkedin: 'https://www.linkedin.com/company/greentown-labs'
  },
  {
    id: 'mit-media-lab',
    name: 'MIT Media Lab',
    description: 'An interdisciplinary research laboratory at the Massachusetts Institute of Technology, encouraging the unconventional mixing and matching of seemingly disparate research areas. While not a traditional accelerator, it provides valuable resources and collaborative spaces for technology and media ventures.',
    website: 'https://www.media.mit.edu/',
    contactEmail: 'info@media.mit.edu',
    location: 'Cambridge, MA',
    founded: '1985',
    specialization: 'Deep Tech & Research',
    equityTaken: 'N/A - Research focused',
    cohortBased: false,
    stages: ['pre-seed', 'seed', 'self-funded'],
    industries: ['technology', 'media'],
    verticals: ['ai-ml', 'gaming', 'hardware', 'media', 'robotics', 'education'],
    keyBenefits: ['MIT resources', 'Research collaboration', 'Academic partnerships', 'Innovation ecosystem', 'Interdisciplinary approach'],
    linkedin: 'https://www.linkedin.com/school/mit-media-lab/'
  },
  {
    id: 'factory45',
    name: 'Factory45',
    description: 'An online accelerator program that takes sustainable apparel companies from idea to launch. Over a six-month period, participants are guided through setting up a supply chain, creating a sales strategy for a niche market, and ending with a crowdfunding campaign.',
    website: 'https://factory45.co/',
    contactEmail: 'shannon@factory45.co',
    location: 'Online / Boston, MA',
    duration: '6 months',
    founded: '2014',
    specialization: 'Sustainable Fashion & Lifestyle',
    equityTaken: '0% - Program fee based',
    cohortBased: true,
    stages: ['pre-seed', 'seed'],
    industries: ['consumer', 'retail'],
    verticals: ['consumer', 'e-commerce', 'food-beverage'],
    keyBenefits: ['Manufacturing connections', 'Retail strategy', 'Sustainable practices', 'Brand development', 'Crowdfunding guidance'],
    linkedin: 'https://www.linkedin.com/company/factory45'
  },
  {
    id: 'masschallenge-healthtech',
    name: 'MassChallenge HealthTech',
    description: 'A specialized branch of MassChallenge, focused on supporting healthcare innovation and digital health startups with a zero-equity cohort model. Based in Boston, it empowers startups to tackle big challenges in health and life sciences.',
    website: 'https://masschallenge.org/programs/healthtech',
    contactEmail: 'healthtech@masschallenge.org',
    location: 'Boston, MA',
    founded: '2016',
    specialization: 'Healthcare Innovation',
    equityTaken: '0% - No equity taken',
    cohortBased: true,
    stages: ['seed', 'series-a'],
    industries: ['healthcare', 'life-sciences'],
    verticals: ['health', 'life-sciences'],
    keyBenefits: ['Healthcare mentor network', 'Hospital partnerships', 'Regulatory guidance', 'Clinical trial support', 'Zero equity model'],
    linkedin: 'https://www.linkedin.com/showcase/masschallenge-healthtech'
  },
  {
    id: 'c10-labs',
    name: 'C10 Labs',
    description: 'A venture studio fund dedicated to reshaping the landscape of AI-first startups. Located in Cambridge, MA, it collaborates with visionary entrepreneurs to advance and expand their ventures by providing comprehensive technological support, operational expertise, and access to a distinguished network of advisors.',
    website: 'https://www.c10labs.com/',
    contactEmail: 'info@c10labs.com',
    location: 'Cambridge, MA',
    founded: '2023',
    specialization: 'AI & Advanced Computing',
    equityTaken: '5-7%',
    cohortBased: true,
    stages: ['pre-seed', 'seed'],
    industries: ['technology'],
    verticals: ['ai-ml', 'hardware', 'robotics', 'it'],
    keyBenefits: ['AI expertise', 'Technical mentorship', 'Computing resources', 'Industry connections', 'Venture studio model'],
    linkedin: 'https://www.linkedin.com/company/c10labs'
  },
  {
    id: 'startup-leadership-program',
    name: 'Startup Leadership Program (SLP)',
    description: 'A highly selective, global training program and professional network for outstanding founders, leaders, and innovators. Founded in Boston in 2006, the program has educated over 3,900 fellows in 14 countries, with alumni founding nearly 2,000 startups that have collectively raised more than $4.6 billion in funding.',
    website: 'https://www.startupleadership.com/',
    contactEmail: 'info@startupleadership.com',
    location: 'Boston, MA',
    founded: '2006',
    specialization: 'Leadership Development & Network',
    equityTaken: '0% - Training program',
    cohortBased: true,
    stages: ['pre-seed', 'seed', 'series-a'],
    industries: ['technology', 'healthcare', 'b2b', 'media'],
    verticals: ['ai-ml', 'health', 'gaming', 'media', 'life-sciences'],
    keyBenefits: ['Global network', 'Leadership training', 'Alumni network of 3,900+', '$4.6B collective funding', 'Professional development'],
    linkedin: 'https://www.linkedin.com/company/startupleadership'
  },
  {
    id: 'learnlaunch',
    name: 'LearnLaunch Accelerator',
    description: 'A leading edtech startup accelerator dedicated to transforming education through innovative technology. Since its inception, LearnLaunch has supported numerous startups by providing funding, mentorship, and access to a vast network of industry experts.',
    website: 'https://learnlaunch.com/',
    contactEmail: 'info@learnlaunch.com',
    location: 'Boston, MA',
    founded: '2013',
    specialization: 'Education Technology',
    equityTaken: 'Varies',
    cohortBased: true,
    stages: ['pre-seed', 'seed'],
    industries: ['technology'],
    verticals: ['education'],
    keyBenefits: ['EdTech expertise', 'Industry network', 'Funding opportunities', 'Educational partnerships', 'Mentor access'],
    linkedin: 'https://www.linkedin.com/company/learnlaunch-accelerator'
  },
  {
    id: 'innovate-bu',
    name: 'Innovate@BU (BUVA)',
    description: 'Boston University\'s innovation hub that empowers students and alumni to turn ideas into impact. Through the BU Venture Accelerator (BUVA), Innovate@BU provides founders with resources, mentorship, and community support to help them build, launch, and scale their startups.',
    website: 'https://www.bu.edu/innovate/',
    contactEmail: 'innovate@bu.edu',
    location: 'Boston, MA',
    founded: '2018',
    specialization: 'University Innovation Hub',
    equityTaken: '0% - University program',
    cohortBased: true,
    stages: ['pre-seed', 'seed', 'self-funded'],
    industries: ['b2b', 'technology'],
    verticals: ['saas', 'other'],
    keyBenefits: ['University resources', 'Student/alumni network', 'Mentorship', 'Community support', 'Innovation ecosystem'],
    linkedin: 'https://www.linkedin.com/company/innovatebu/'
  },
  {
    id: 'idea-northeastern',
    name: 'IDEA: Northeastern University\'s Venture Accelerator',
    description: 'A student-led venture accelerator at Northeastern University that supports entrepreneurs through educational resources, mentorship, and funding opportunities. The program guides ventures from concept to launch, fostering innovation within the university community.',
    website: 'https://www.ideaneu.com/',
    contactEmail: 'idea@neu.edu',
    location: 'Boston, MA',
    founded: '2010',
    specialization: 'Student-Led Innovation',
    equityTaken: '0% - University program',
    cohortBased: true,
    stages: ['pre-seed', 'seed', 'self-funded'],
    industries: ['b2b', 'technology'],
    verticals: ['saas', 'education', 'other'],
    keyBenefits: ['Student-led approach', 'University resources', 'Educational support', 'Mentorship network', 'Funding opportunities'],
    linkedin: 'https://www.linkedin.com/company/ideaneu'
  },
  {
    id: 'soaring-startup-circle',
    name: 'Soaring Startup Circle Venture Partners (SSC VP)',
    description: 'A venture fund and startup accelerator founded by Boston College alumni. The program offers seed funding, mentorship, and office space to startups led by BC students and alumni, aiming to foster entrepreneurship within the BC community.',
    website: 'https://sscventurepartners.com/',
    contactEmail: 'info@sscventurepartners.com',
    location: 'Boston, MA',
    founded: '2014',
    specialization: 'Alumni-Led Venture Fund',
    equityTaken: 'Varies',
    cohortBased: true,
    stages: ['pre-seed', 'seed'],
    industries: ['technology'],
    verticals: ['saas', 'hardware', 'robotics'],
    keyBenefits: ['Seed funding', 'Alumni network', 'Office space', 'Mentorship', 'BC community focus'],
    linkedin: 'https://www.linkedin.com/company/soaring-startup-circle'
  },
  {
    id: 'petri',
    name: 'Petri',
    description: 'A Boston-based accelerator that supports early-stage startups at the intersection of biology and engineering. Co-founded by leaders from Ginkgo Bioworks and Pillar VC, Petri provides funding, lab space, and mentorship to help founders translate their research into commercial success.',
    website: 'https://www.petri.bio/',
    contactEmail: 'hello@petri.bio',
    location: 'Boston, MA',
    founded: '2019',
    specialization: 'Biology & Engineering Intersection',
    equityTaken: 'Varies',
    cohortBased: true,
    stages: ['series-a'],
    industries: ['life-sciences', 'healthcare'],
    verticals: ['life-sciences', 'health'],
    keyBenefits: ['Lab space access', 'Bio-engineering expertise', 'Ginkgo Bioworks connection', 'Research translation', 'Technical mentorship'],
    linkedin: 'https://www.linkedin.com/company/petribio'
  },
  {
    id: 'xontogeny',
    name: 'Xontogeny',
    description: 'A life sciences accelerator that partners with entrepreneurs to advance early-stage technologies through preclinical development. The program offers seed investment, strategic guidance, and operational support to help startups achieve clinical proof-of-concept.',
    website: 'https://xontogeny.com/',
    contactEmail: 'info@xontogeny.com',
    location: 'Boston, MA',
    founded: '2016',
    specialization: 'Life Sciences Development',
    equityTaken: 'Varies',
    cohortBased: true,
    stages: ['series-a', 'series-b'],
    industries: ['life-sciences', 'healthcare'],
    verticals: ['life-sciences', 'health'],
    keyBenefits: ['Preclinical development', 'Clinical proof-of-concept', 'Strategic guidance', 'Operational support', 'Life sciences expertise'],
    linkedin: 'https://www.linkedin.com/company/xontogeny'
  },
  {
    id: 'richi-entrepreneurs',
    name: 'Richi Entrepreneurs',
    description: 'A Boston-based immersion program that connects international startups in biotech, medtech, and digital health with the city\'s innovation ecosystem. The program offers mentorship, networking opportunities, and exposure to potential investors and partners.',
    website: 'https://www.richientrepreneurs.org/',
    contactEmail: 'info@richientrepreneurs.org',
    location: 'Boston, MA',
    founded: '2013',
    specialization: 'International Health Tech',
    equityTaken: '0% - Program based',
    cohortBased: true,
    stages: ['series-a'],
    industries: ['healthcare', 'life-sciences'],
    verticals: ['health', 'life-sciences'],
    keyBenefits: ['International connections', 'Boston ecosystem access', 'Investor exposure', 'Networking opportunities', 'Health tech focus'],
    linkedin: 'https://www.linkedin.com/company/richi-entrepreneurs'
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
