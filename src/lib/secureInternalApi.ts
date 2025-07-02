import { SecurityValidator, RateLimiter, FileValidator, csrfManager } from './security';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface SecureSubmissionData {
  borrower_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  company_hq: string;
  business_stage: string;
  industry: string;
  vertical?: string;
  seeking_type: string;
  raise_amount?: string;
  business_description?: string;
  funding_purpose?: string;
  current_revenue?: string;
  previous_funding?: string;
  status?: string;
  priority?: string;
  submitted_at: string;
}

class SecureInternalBankApi {
  private baseUrl: string;
  private apiKey: string;
  private readonly REQUEST_TIMEOUT = 30000; // 30 seconds
  private readonly MAX_RETRIES = 3;

  constructor() {
    // Security: API endpoints should come from environment, not hardcoded
    this.baseUrl = this.getSecureApiUrl();
    this.apiKey = this.getSecureApiKey();
    
    // Initialize CSRF protection
    this.initializeCSRF();
  }

  private getSecureApiUrl(): string {
    const url = import.meta.env.VITE_API_BASE_URL;
    if (!url) {
      throw new Error('API_BASE_URL environment variable is required');
    }
    
    // Validate URL format
    try {
      new URL(url);
      return url;
    } catch {
      throw new Error('Invalid API_BASE_URL format');
    }
  }

  private getSecureApiKey(): string {
    const key = import.meta.env.VITE_INTERNAL_API_KEY;
    if (!key || key === 'PLACEHOLDER_API_KEY') {
      throw new Error('INTERNAL_API_KEY environment variable is required and cannot be placeholder');
    }
    return key;
  }

  private async initializeCSRF(): Promise<void> {
    try {
      await csrfManager.generateToken();
    } catch (error) {
      console.error('Failed to initialize CSRF protection:', error);
    }
  }

  private async makeSecureRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<ApiResponse<T>> {
    try {
      const clientIdentifier = this.getClientIdentifier();
      
      // Rate limiting check
      if (!RateLimiter.canMakeRequest(clientIdentifier)) {
        const remaining = RateLimiter.getRemainingRequests(clientIdentifier);
        return {
          success: false,
          error: `Rate limit exceeded. ${remaining} requests remaining in current window.`,
          message: 'Too many requests. Please try again later.'
        };
      }

      const url = `${this.baseUrl}${endpoint}`;
      console.log(`Making secure API request to: ${endpoint}`);

      // Create secure headers
      const secureHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'X-API-Source': 'leader-link-frontend',
        'X-Request-ID': crypto.randomUUID(),
        'X-Timestamp': Date.now().toString(),
        ...csrfManager.getHeaders(),
        ...options.headers,
      };

      // Add request timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);

      const response = await fetch(url, {
        ...options,
        headers: secureHeaders,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Secure API Error ${response.status}:`, errorText);
        
        // Sanitize error message to prevent information leakage
        const sanitizedError = this.sanitizeErrorMessage(errorText);
        throw new Error(`HTTP ${response.status}: ${sanitizedError}`);
      }

      const data = await response.json();
      console.log('Secure API Response received:', { endpoint, success: true });
      return { success: true, data };
      
    } catch (error) {
      console.error('Secure Internal API Error:', { endpoint, error: error instanceof Error ? error.message : 'Unknown error' });
      
      // Retry logic for transient errors
      if (retryCount < this.MAX_RETRIES && this.isRetryableError(error)) {
        console.log(`Retrying request (${retryCount + 1}/${this.MAX_RETRIES})`);
        await this.delay(Math.pow(2, retryCount) * 1000); // Exponential backoff
        return this.makeSecureRequest(endpoint, options, retryCount + 1);
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown API error';
      const sanitizedMessage = this.sanitizeErrorMessage(errorMessage);
      
      return { 
        success: false, 
        error: sanitizedMessage,
        message: 'Request failed. Please try again or contact support if the problem persists.'
      };
    }
  }

  private getClientIdentifier(): string {
    // Create a client identifier for rate limiting (without personal data)
    const userAgent = navigator.userAgent;
    const screenInfo = `${window.screen.width}x${window.screen.height}`;
    return btoa(`${userAgent}-${screenInfo}`).substring(0, 32);
  }

  private sanitizeErrorMessage(message: string): string {
    // Remove sensitive information from error messages
    return message
      .replace(/Bearer\s+[A-Za-z0-9-._~+/]+=*/g, 'Bearer [REDACTED]')
      .replace(/api[_-]?key[=:]\s*[A-Za-z0-9-._~+/]+=*/gi, 'api_key=[REDACTED]')
      .replace(/password[=:]\s*\S+/gi, 'password=[REDACTED]')
      .replace(/token[=:]\s*[A-Za-z0-9-._~+/]+=*/gi, 'token=[REDACTED]');
  }

  private isRetryableError(error: any): boolean {
    if (error instanceof Error) {
      // Network errors, timeouts, and 5xx server errors are retryable
      return error.name === 'AbortError' || 
             error.message.includes('fetch') ||
             error.message.includes('500') ||
             error.message.includes('502') ||
             error.message.includes('503') ||
             error.message.includes('504');
    }
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Submit startup application with comprehensive security validation
   */
  async submitApplication(formData: any): Promise<ApiResponse<{ submission_id: string }>> {
    try {
      // Validate and sanitize all form data
      const schema = SecurityValidator.getFormValidationSchema();
      const validationResult = schema.safeParse(formData);

      if (!validationResult.success) {
        const errors = validationResult.error.errors.map(e => e.message).join(', ');
        return {
          success: false,
          error: `Validation failed: ${errors}`,
          message: 'Please check your input and try again.'
        };
      }

      const validatedData = validationResult.data;

      // Create secure submission payload with sanitized data
      const submissionPayload: SecureSubmissionData = {
        borrower_name: SecurityValidator.sanitizeInput(validatedData.borrowerName, { maxLength: 200 }),
        contact_name: SecurityValidator.sanitizeInput(validatedData.contactName, { maxLength: 100 }),
        contact_email: SecurityValidator.validateEmail(validatedData.contactEmail).sanitized,
        contact_phone: validatedData.contactPhone ? SecurityValidator.validatePhone(validatedData.contactPhone).sanitized : undefined,
        company_hq: SecurityValidator.sanitizeInput(validatedData.companyHQ, { maxLength: 200 }),
        business_stage: validatedData.businessStage,
        industry: SecurityValidator.sanitizeInput(validatedData.industry, { maxLength: 100 }),
        vertical: formData.vertical ? SecurityValidator.sanitizeInput(formData.vertical, { maxLength: 100 }) : undefined,
        seeking_type: validatedData.seekingType,
        raise_amount: validatedData.raiseAmount ? SecurityValidator.sanitizeInput(validatedData.raiseAmount, { maxLength: 50 }) : undefined,
        business_description: validatedData.productDescription ? SecurityValidator.sanitizeInput(validatedData.productDescription, { maxLength: 5000 }) : undefined,
        funding_purpose: validatedData.useOfFunds ? SecurityValidator.sanitizeInput(validatedData.useOfFunds, { maxLength: 2000 }) : undefined,
        current_revenue: formData.lastTwelveRevenue ? SecurityValidator.sanitizeInput(formData.lastTwelveRevenue, { maxLength: 50 }) : undefined,
        previous_funding: formData.totalEquityRaised ? SecurityValidator.sanitizeInput(formData.totalEquityRaised, { maxLength: 50 }) : undefined,
        submitted_at: new Date().toISOString(),
        status: 'new',
        priority: 'medium'
      };

      console.log('Submitting secure application:', { borrower: submissionPayload.borrower_name });
      return this.makeSecureRequest<{ submission_id: string }>('/submissions', {
        method: 'POST',
        body: JSON.stringify(submissionPayload),
      });
    } catch (error) {
      console.error('Application submission validation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Validation failed',
        message: 'Please check your input and try again.'
      };
    }
  }

  /**
   * Send secure email notification with sanitized data
   */
  async sendSubmissionEmail(formData: any): Promise<ApiResponse<{ email_id: string }>> {
    try {
      // Sanitize email data
      const emailPayload = {
        submission_data: this.sanitizeFormDataForEmail(formData),
        recipients: [
          'vitaliy.schafer@leaderbank.com',
          'alex.guinta@leaderbank.com', 
          'Summer.Hutchison@leaderbank.com'
        ],
        template: 'comprehensive-submission',
        subject: `New ${SecurityValidator.sanitizeInput(formData.seekingType || 'funding')} Application: ${SecurityValidator.sanitizeInput(formData.borrowerName || 'Unknown Company', { maxLength: 100 })}`,
        priority: 'normal',
        source_ip: 'client-side', // In production, this should come from server
        timestamp: new Date().toISOString()
      };

      console.log('Sending secure notification email');
      return this.makeSecureRequest<{ email_id: string }>('/emails/submission', {
        method: 'POST',
        body: JSON.stringify(emailPayload),
      });
    } catch (error) {
      console.error('Email submission security check failed:', error);
      return {
        success: false,
        error: 'Failed to send secure email notification',
        message: 'Email notification could not be sent securely.'
      };
    }
  }

  /**
   * Secure file upload with comprehensive validation
   */
  async uploadFile(file: File, category: string): Promise<ApiResponse<{ file_url: string, file_id: string }>> {
    try {
      // Validate file security
      const fileValidation = FileValidator.validateFile(file);
      if (!fileValidation.isValid) {
        return {
          success: false,
          error: fileValidation.error,
          message: 'File upload failed security validation.'
        };
      }

      // Sanitize category
      const sanitizedCategory = SecurityValidator.sanitizeInput(category, { maxLength: 50 });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', sanitizedCategory);
      formData.append('source', 'leader-link');
      formData.append('upload_timestamp', new Date().toISOString());
      formData.append('file_hash', await this.calculateFileHash(file));

      console.log('Uploading secure file:', { 
        name: SecurityValidator.sanitizeInput(file.name), 
        size: file.size, 
        category: sanitizedCategory 
      });
      
      return this.makeSecureRequest<{ file_url: string, file_id: string }>('/files/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Source': 'leader-link-frontend',
          'X-Request-ID': crypto.randomUUID(),
          ...csrfManager.getHeaders(),
        },
      });
    } catch (error) {
      console.error('Secure file upload failed:', error);
      return {
        success: false,
        error: 'File upload security validation failed',
        message: 'File could not be uploaded securely.'
      };
    }
  }

  private async calculateFileHash(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private sanitizeFormDataForEmail(formData: any): any {
    const sanitized: any = {};
    
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string') {
        sanitized[key] = SecurityValidator.sanitizeInput(value, { maxLength: 1000 });
      } else if (value !== null && value !== undefined) {
        sanitized[key] = value;
      }
    }
    
    return sanitized;
  }

  /**
   * System health check with security headers
   */
  async healthCheck(): Promise<ApiResponse<{ status: string, timestamp: string, version: string }>> {
    return this.makeSecureRequest<{ status: string, timestamp: string, version: string }>('/health');
  }
}

// Export singleton instance
export const secureInternalApi = new SecureInternalBankApi();

// Export types for use in other files
export type { ApiResponse, SecureSubmissionData };
