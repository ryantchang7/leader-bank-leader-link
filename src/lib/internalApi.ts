
// Internal Bank API Client - Replaces Supabase client
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface SubmissionData {
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

interface AcceleratorApplication {
  startup_name: string;
  founder_name: string;
  founder_email: string;
  founder_phone?: string;
  company_stage: string;
  industry: string;
  accelerator_id: string;
  application_data: any;
  status: string;
  submitted_at: string;
}

class InternalBankApi {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    // Production API endpoints - replace with actual internal bank URLs
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 
      (import.meta.env.MODE === 'production' 
        ? 'https://api.leaderbank.com/leader-link' 
        : 'https://dev-api.leaderbank.com/leader-link');
    
    // Replace with actual internal API key from environment
    this.apiKey = import.meta.env.VITE_INTERNAL_API_KEY || 'PLACEHOLDER_API_KEY';
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log(`Making API request to: ${url}`);

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'X-API-Source': 'leader-link-frontend',
          'X-Request-ID': crypto.randomUUID(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error ${response.status}:`, errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response received:', { endpoint, success: true });
      return { success: true, data };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown API error';
      console.error('Internal API Error:', { endpoint, error: errorMessage });
      
      return { 
        success: false, 
        error: errorMessage,
        message: `Failed to ${endpoint.includes('POST') ? 'create' : 'retrieve'} data. Please try again or contact support.`
      };
    }
  }

  /**
   * Submit startup application to internal database
   */
  async submitApplication(formData: any): Promise<ApiResponse<{ submission_id: string }>> {
    const submissionPayload: SubmissionData = {
      borrower_name: formData.borrowerName || '',
      contact_name: formData.contactName || '',
      contact_email: formData.contactEmail || '',
      contact_phone: formData.contactPhone || null,
      company_hq: formData.companyHQ || '',
      business_stage: formData.businessStage || '',
      industry: formData.industry || '',
      vertical: formData.vertical || null,
      seeking_type: formData.seekingType || '',
      raise_amount: formData.raiseAmount || null,
      business_description: formData.productDescription || null,
      funding_purpose: formData.useOfFunds || null,
      current_revenue: formData.lastTwelveRevenue || null,
      previous_funding: formData.totalEquityRaised || null,
      submitted_at: new Date().toISOString(),
      status: 'new',
      priority: 'medium'
    };

    console.log('Submitting application:', { borrower: submissionPayload.borrower_name });
    return this.makeRequest<{ submission_id: string }>('/submissions', {
      method: 'POST',
      body: JSON.stringify(submissionPayload),
    });
  }

  /**
   * Submit accelerator-specific application
   */
  async submitAcceleratorApplication(formData: any): Promise<ApiResponse<{ application_id: string }>> {
    if (formData.seekingType !== 'accelerator') {
      return { success: true, data: { application_id: 'N/A' } };
    }

    const acceleratorPayload: AcceleratorApplication = {
      startup_name: formData.borrowerName || '',
      founder_name: formData.contactName || '',
      founder_email: formData.contactEmail || '',
      founder_phone: formData.contactPhone || null,
      company_stage: formData.businessStage || '',
      industry: formData.industry || '',
      accelerator_id: 'general',
      application_data: formData,
      status: 'submitted',
      submitted_at: new Date().toISOString()
    };

    console.log('Submitting accelerator application:', { startup: acceleratorPayload.startup_name });
    return this.makeRequest<{ application_id: string }>('/accelerator-applications', {
      method: 'POST',
      body: JSON.stringify(acceleratorPayload),
    });
  }

  /**
   * Send comprehensive submission notification via internal email service
   */
  async sendSubmissionEmail(formData: any): Promise<ApiResponse<{ email_id: string }>> {
    const emailPayload = {
      submission_data: formData,
      recipients: [
        'vitaliy.schafer@leaderbank.com',
        'alex.guinta@leaderbank.com', 
        'Summer.Hutchison@leaderbank.com'
      ],
      template: 'comprehensive-submission',
      subject: `New ${formData.seekingType || 'funding'} Application: ${formData.borrowerName || 'Unknown Company'}`,
      priority: 'normal'
    };

    console.log('Sending notification email:', { subject: emailPayload.subject });
    return this.makeRequest<{ email_id: string }>('/emails/submission', {
      method: 'POST',
      body: JSON.stringify(emailPayload),
    });
  }

  /**
   * Upload file to internal document management system
   */
  async uploadFile(file: File, category: string): Promise<ApiResponse<{ file_url: string, file_id: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    formData.append('source', 'leader-link');
    formData.append('upload_timestamp', new Date().toISOString());

    console.log('Uploading file:', { name: file.name, size: file.size, category });
    
    return this.makeRequest<{ file_url: string, file_id: string }>('/files/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData - let browser handle it
        'Authorization': `Bearer ${this.apiKey}`,
        'X-API-Source': 'leader-link-frontend',
        'X-Request-ID': crypto.randomUUID(),
      },
    });
  }

  /**
   * System health check for monitoring
   */
  async healthCheck(): Promise<ApiResponse<{ status: string, timestamp: string, version: string }>> {
    return this.makeRequest<{ status: string, timestamp: string, version: string }>('/health');
  }

  /**
   * Get all submissions for admin dashboard
   */
  async getSubmissions(filters?: Record<string, any>): Promise<ApiResponse<any[]>> {
    const queryParams = filters ? new URLSearchParams(filters).toString() : '';
    const endpoint = `/admin/submissions${queryParams ? `?${queryParams}` : ''}`;
    
    return this.makeRequest<any[]>(endpoint);
  }

  /**
   * Get investor profiles for matching
   */
  async getInvestors(): Promise<ApiResponse<any[]>> {
    return this.makeRequest<any[]>('/admin/investors');
  }
}

// Export singleton instance
export const internalApi = new InternalBankApi();

// Export types for use in other files
export type { ApiResponse, SubmissionData, AcceleratorApplication };
