
// Security Configuration for Bank Integration
interface SecurityConfig {
  // API Security
  apiTimeout: number;
  maxRetries: number;
  rateLimitEnabled: boolean;
  rateLimitWindow: number;
  rateLimitMaxRequests: number;
  
  // Input Validation
  maxInputLength: number;
  maxFileSize: number;
  allowedFileTypes: string[];
  
  // Session Management
  sessionTimeout: number;
  csrfEnabled: boolean;
  
  // Environment Settings
  environment: 'development' | 'staging' | 'production';
  securityLogging: boolean;
}

const getSecurityConfig = (): SecurityConfig => {
  const env = import.meta.env.MODE;
  
  const baseConfig: SecurityConfig = {
    apiTimeout: 30000, // 30 seconds
    maxRetries: 3,
    rateLimitEnabled: true,
    rateLimitWindow: 60000, // 1 minute
    rateLimitMaxRequests: 10,
    maxInputLength: 10000,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ],
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    csrfEnabled: true,
    environment: env as 'development' | 'staging' | 'production',
    securityLogging: true
  };

  switch (env) {
    case 'production':
      return {
        ...baseConfig,
        rateLimitMaxRequests: 5, // Stricter in production
        sessionTimeout: 15 * 60 * 1000, // 15 minutes in production
        securityLogging: false // Disable verbose security logging in production
      };
    
    case 'staging':
      return {
        ...baseConfig,
        rateLimitMaxRequests: 8,
        securityLogging: true
      };
    
    case 'development':
    default:
      return {
        ...baseConfig,
        rateLimitEnabled: false, // Disable for development ease
        securityLogging: true
      };
  }
};

export const securityConfig = getSecurityConfig();

// Security Headers for API Requests
export const getSecurityHeaders = (): Record<string, string> => {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https:;",
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  };
};

// Bank-specific security requirements
export const bankSecurityRequirements = {
  // Password requirements (if implementing user auth)
  passwordMinLength: 12,
  passwordRequireUppercase: true,
  passwordRequireLowercase: true,
  passwordRequireNumbers: true,
  passwordRequireSymbols: true,
  
  // Data retention
  dataRetentionDays: 2555, // 7 years for financial records
  
  // Encryption requirements
  encryptionAlgorithm: 'AES-256-GCM',
  hashingAlgorithm: 'SHA-256',
  
  // Audit logging
  auditLogEnabled: true,
  auditLogRetentionDays: 2555,
  
  // IP restrictions (example - replace with actual bank IP ranges)
  allowedIPRanges: [
    // Add your bank's IP ranges here
    // '192.168.1.0/24',
    // '10.0.0.0/8'
  ],
  
  // API rate limiting for bank integration
  bankApiRateLimit: {
    requests: 100,
    windowMs: 60000, // 1 minute
  }
};

export default securityConfig;
