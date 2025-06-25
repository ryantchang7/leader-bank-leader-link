
// Internal Bank Environment Configuration
// Replace these with your actual internal bank API endpoints and settings

interface BankConfig {
  apiBaseUrl: string;
  emailServiceUrl: string;
  fileStorageUrl: string;
  authServiceUrl: string;
  environment: 'development' | 'staging' | 'production';
}

const getEnvironmentConfig = (): BankConfig => {
  const env = process.env.NODE_ENV as 'development' | 'production';
  
  switch (env) {
    case 'production':
      return {
        apiBaseUrl: 'https://api.leaderbank.com/leader-link',
        emailServiceUrl: 'https://email.leaderbank.com/api',
        fileStorageUrl: 'https://files.leaderbank.com/api',
        authServiceUrl: 'https://auth.leaderbank.com/api',
        environment: 'production',
      };
    
    case 'development':
    default:
      return {
        apiBaseUrl: 'https://dev-api.leaderbank.com/leader-link',
        emailServiceUrl: 'https://dev-email.leaderbank.com/api',
        fileStorageUrl: 'https://dev-files.leaderbank.com/api',
        authServiceUrl: 'https://dev-auth.leaderbank.com/api',
        environment: 'development',
      };
  }
};

export const bankConfig = getEnvironmentConfig();

// API endpoints mapping
export const apiEndpoints = {
  // Form submissions
  submissions: '/submissions',
  acceleratorApplications: '/accelerator-applications',
  
  // Email service
  sendEmail: '/emails/submission',
  
  // File management
  uploadFile: '/files/upload',
  downloadFile: '/files/download',
  
  // Authentication (for future implementation)
  login: '/auth/login',
  logout: '/auth/logout',
  verifyToken: '/auth/verify',
  
  // Admin endpoints
  getSubmissions: '/admin/submissions',
  getInvestors: '/admin/investors',
  
  // Health check
  health: '/health',
} as const;

// Email configuration
export const emailConfig = {
  defaultRecipients: [
    'vitaliy.schafer@leaderbank.com',
    'alex.guinta@leaderbank.com',
    'Summer.Hutchison@leaderbank.com'
  ],
  fromAddress: 'Leader Link <noreply@leaderbank.com>',
  templates: {
    submission: 'comprehensive-submission',
    welcome: 'welcome-email',
    followup: 'followup-email',
  },
} as const;

// File upload configuration  
export const fileConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['.pdf', '.ppt', '.pptx', '.xlsx', '.xls', '.csv'],
  categories: {
    pitchDeck: 'pitch-decks',
    financialModel: 'financial-models',
    businessPlan: 'business-plans',
    financialStatements: 'financial-statements',
  },
} as const;

export default bankConfig;
