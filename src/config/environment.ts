
// Internal Bank Environment Configuration
// Production-ready configuration for Leader Link application

interface BankConfig {
  apiBaseUrl: string;
  emailServiceUrl: string;
  fileStorageUrl: string;
  authServiceUrl: string;
  environment: 'development' | 'staging' | 'production';
  version: string;
}

const getEnvironmentConfig = (): BankConfig => {
  const env = import.meta.env.MODE;
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0';
  
  switch (env) {
    case 'production':
      return {
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.leaderbank.com/leader-link',
        emailServiceUrl: import.meta.env.VITE_EMAIL_SERVICE_URL || 'https://email.leaderbank.com/api',
        fileStorageUrl: import.meta.env.VITE_FILE_STORAGE_URL || 'https://files.leaderbank.com/api',
        authServiceUrl: import.meta.env.VITE_AUTH_SERVICE_URL || 'https://auth.leaderbank.com/api',
        environment: 'production',
        version,
      };
    
    case 'staging':
      return {
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://staging-api.leaderbank.com/leader-link',
        emailServiceUrl: import.meta.env.VITE_EMAIL_SERVICE_URL || 'https://staging-email.leaderbank.com/api',
        fileStorageUrl: import.meta.env.VITE_FILE_STORAGE_URL || 'https://staging-files.leaderbank.com/api',
        authServiceUrl: import.meta.env.VITE_AUTH_SERVICE_URL || 'https://staging-auth.leaderbank.com/api',
        environment: 'staging',
        version,
      };
    
    case 'development':
    default:
      return {
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://dev-api.leaderbank.com/leader-link',
        emailServiceUrl: import.meta.env.VITE_EMAIL_SERVICE_URL || 'https://dev-email.leaderbank.com/api',
        fileStorageUrl: import.meta.env.VITE_FILE_STORAGE_URL || 'https://dev-files.leaderbank.com/api',
        authServiceUrl: import.meta.env.VITE_AUTH_SERVICE_URL || 'https://dev-auth.leaderbank.com/api',
        environment: 'development',
        version,
      };
  }
};

export const bankConfig = getEnvironmentConfig();

// API endpoints mapping for internal bank systems
export const apiEndpoints = {
  // Core application endpoints
  submissions: '/submissions',
  acceleratorApplications: '/accelerator-applications',
  
  // Communication endpoints
  sendEmail: '/emails/submission',
  
  // File management endpoints
  uploadFile: '/files/upload',
  downloadFile: '/files/download',
  
  // Authentication endpoints (for future implementation)
  login: '/auth/login',
  logout: '/auth/logout',
  verifyToken: '/auth/verify',
  refreshToken: '/auth/refresh',
  
  // Admin dashboard endpoints
  getSubmissions: '/admin/submissions',
  getInvestors: '/admin/investors',
  createInvestor: '/admin/investors',
  updateSubmission: '/admin/submissions',
  
  // System monitoring
  health: '/health',
  metrics: '/metrics',
} as const;

// Email configuration for internal bank email system
export const emailConfig = {
  defaultRecipients: [
    'vitaliy.schafer@leaderbank.com',
    'alex.guinta@leaderbank.com',
    'Summer.Hutchison@leaderbank.com'
  ],
  fromAddress: import.meta.env.VITE_EMAIL_FROM || 'Leader Link <noreply@leaderbank.com>',
  replyToAddress: import.meta.env.VITE_EMAIL_REPLY_TO || 'support@leaderbank.com',
  templates: {
    submission: 'comprehensive-submission',
    welcome: 'welcome-email',
    followup: 'followup-email',
    acceleratorMatch: 'accelerator-match',
  },
} as const;

// File upload configuration for internal document management  
export const fileConfig = {
  maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '10485760'), // 10MB default
  allowedTypes: ['.pdf', '.ppt', '.pptx', '.xlsx', '.xls', '.csv'],
  allowedMimeTypes: [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv'
  ],
  categories: {
    pitchDeck: 'pitch-decks',
    financialModel: 'financial-models',
    businessPlan: 'business-plans',
    financialStatements: 'financial-statements',
  },
} as const;

// Security configuration
export const securityConfig = {
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'), // 30 seconds
  maxRetries: parseInt(import.meta.env.VITE_MAX_RETRIES || '3'),
  rateLimitEnabled: import.meta.env.VITE_RATE_LIMIT_ENABLED === 'true',
} as const;

// Application metadata
export const appConfig = {
  name: 'Leader Link',
  version: bankConfig.version,
  environment: bankConfig.environment,
  buildTimestamp: import.meta.env.VITE_BUILD_TIMESTAMP || new Date().toISOString(),
  supportEmail: 'support@leaderbank.com',
  supportPhone: '+1 (555) 123-4567', // Replace with actual support number
} as const;

export default bankConfig;
