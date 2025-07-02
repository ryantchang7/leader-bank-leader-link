
import DOMPurify from 'dompurify';
import { z } from 'zod';

// CSRF Token Management
class CSRFManager {
  private static instance: CSRFManager;
  private token: string | null = null;
  private readonly TOKEN_HEADER = 'X-CSRF-Token';
  private readonly TOKEN_KEY = 'csrf_token';

  static getInstance(): CSRFManager {
    if (!CSRFManager.instance) {
      CSRFManager.instance = new CSRFManager();
    }
    return CSRFManager.instance;
  }

  async generateToken(): Promise<string> {
    // Generate cryptographically secure token
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    this.token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    
    // Store in secure httpOnly cookie (simulated for client-side)
    sessionStorage.setItem(this.TOKEN_KEY, this.token);
    return this.token;
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = sessionStorage.getItem(this.TOKEN_KEY);
    }
    return this.token;
  }

  validateToken(providedToken: string): boolean {
    return this.token === providedToken && this.token !== null;
  }

  getHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { [this.TOKEN_HEADER]: token } : {};
  }
}

// Input Sanitization & Validation
export class SecurityValidator {
  // Comprehensive input sanitization
  static sanitizeInput(input: string, options: {
    allowHTML?: boolean;
    maxLength?: number;
    removeScripts?: boolean;
  } = {}): string {
    const {
      allowHTML = false,
      maxLength = 10000,
      removeScripts = true
    } = options;

    if (typeof input !== 'string') {
      throw new Error('Input must be a string');
    }

    // Length validation
    if (input.length > maxLength) {
      throw new Error(`Input exceeds maximum length of ${maxLength} characters`);
    }

    let sanitized = input;

    if (!allowHTML) {
      // Strip all HTML tags
      sanitized = DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
    } else {
      // Allow safe HTML only
      sanitized = DOMPurify.sanitize(input, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
        ALLOWED_ATTR: []
      });
    }

    if (removeScripts) {
      // Remove any potential script injections
      sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      sanitized = sanitized.replace(/javascript:/gi, '');
      sanitized = sanitized.replace(/on\w+\s*=/gi, '');
    }

    return sanitized.trim();
  }

  // Email validation with enhanced security
  static validateEmail(email: string): { isValid: boolean; sanitized: string; error?: string } {
    try {
      const sanitized = this.sanitizeInput(email, { maxLength: 254 });
      
      // Enhanced email regex for security
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      
      if (!emailRegex.test(sanitized)) {
        return { isValid: false, sanitized, error: 'Invalid email format' };
      }

      // Check for common email injection patterns
      const dangerousPatterns = [
        /\bcc:/i, /\bbcc:/i, /\bto:/i, /\bfrom:/i,
        /\bsubject:/i, /\bcontent-type:/i, /\bmime-version:/i
      ];

      for (const pattern of dangerousPatterns) {
        if (pattern.test(sanitized)) {
          return { isValid: false, sanitized, error: 'Email contains potentially malicious content' };
        }
      }

      return { isValid: true, sanitized };
    } catch (error) {
      return { isValid: false, sanitized: '', error: error instanceof Error ? error.message : 'Validation failed' };
    }
  }

  // Phone number validation and sanitization
  static validatePhone(phone: string): { isValid: boolean; sanitized: string; error?: string } {
    try {
      // Remove all non-digit characters except + for international format
      const sanitized = phone.replace(/[^\d+()-\s]/g, '');
      
      // Basic phone validation (adjust regex based on your requirements)
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = sanitized.replace(/[^\d+]/g, '');
      
      if (!phoneRegex.test(cleanPhone)) {
        return { isValid: false, sanitized, error: 'Invalid phone number format' };
      }

      return { isValid: true, sanitized };
    } catch (error) {
      return { isValid: false, sanitized: '', error: 'Phone validation failed' };
    }
  }

  // Form data validation schema
  static getFormValidationSchema() {
    return z.object({
      borrowerName: z.string()
        .min(1, 'Company name is required')
        .max(200, 'Company name too long')
        .refine(val => this.sanitizeInput(val).length > 0, 'Invalid company name'),
      
      contactName: z.string()
        .min(1, 'Contact name is required')
        .max(100, 'Contact name too long')
        .refine(val => this.sanitizeInput(val).length > 0, 'Invalid contact name'),
      
      contactEmail: z.string()
        .email('Invalid email format')
        .refine(val => {
          const validation = this.validateEmail(val);
          return validation.isValid;
        }, 'Invalid or potentially dangerous email'),
      
      contactPhone: z.string()
        .optional()
        .refine(val => {
          if (!val) return true;
          const validation = this.validatePhone(val);
          return validation.isValid;
        }, 'Invalid phone number'),
      
      companyHQ: z.string()
        .min(1, 'Company HQ is required')
        .max(200, 'Company HQ too long'),
      
      businessStage: z.enum(['pre-seed', 'seed', 'series-a', 'series-b', 'growth', 'other']),
      industry: z.string().min(1, 'Industry is required'),
      seekingType: z.enum(['equity', 'debt', 'accelerator']),
      
      // Optional fields with sanitization
      raiseAmount: z.string().optional(),
      productDescription: z.string().max(5000, 'Description too long').optional(),
      useOfFunds: z.string().max(2000, 'Use of funds description too long').optional(),
    });
  }
}

// Rate Limiting
export class RateLimiter {
  private static requests = new Map<string, { count: number; resetTime: number }>();
  private static readonly WINDOW_MS = 60000; // 1 minute
  private static readonly MAX_REQUESTS = 10; // Max requests per window

  static canMakeRequest(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier);

    if (!userRequests || now > userRequests.resetTime) {
      // First request or window expired
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.WINDOW_MS
      });
      return true;
    }

    if (userRequests.count >= this.MAX_REQUESTS) {
      return false;
    }

    userRequests.count++;
    return true;
  }

  static getRemainingRequests(identifier: string): number {
    const userRequests = this.requests.get(identifier);
    if (!userRequests || Date.now() > userRequests.resetTime) {
      return this.MAX_REQUESTS;
    }
    return Math.max(0, this.MAX_REQUESTS - userRequests.count);
  }
}

// Secure File Validation
export class FileValidator {
  private static readonly ALLOWED_TYPES = [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv'
  ];

  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly DANGEROUS_EXTENSIONS = [
    '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.js', '.jar', '.php', '.asp', '.jsp'
  ];

  static validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      return { isValid: false, error: 'File size exceeds 10MB limit' };
    }

    // Check file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return { isValid: false, error: 'File type not allowed' };
    }

    // Check dangerous extensions
    const fileName = file.name.toLowerCase();
    for (const ext of this.DANGEROUS_EXTENSIONS) {
      if (fileName.endsWith(ext)) {
        return { isValid: false, error: 'File extension not allowed for security reasons' };
      }
    }

    // Check for double extensions (e.g., file.pdf.exe)
    const parts = fileName.split('.');
    if (parts.length > 2) {
      const secondLastExt = '.' + parts[parts.length - 2];
      if (this.DANGEROUS_EXTENSIONS.includes(secondLastExt)) {
        return { isValid: false, error: 'Double file extension detected - potential security risk' };
      }
    }

    return { isValid: true };
  }
}

// Session Security
export class SessionManager {
  private static readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  private static readonly SESSION_KEY = 'app_session';

  static createSession(userData: any): string {
    const sessionId = crypto.randomUUID();
    const session = {
      id: sessionId,
      user: userData,
      createdAt: Date.now(),
      lastActivity: Date.now(),
      csrfToken: CSRFManager.getInstance().getToken()
    };

    // Store in secure storage (consider using secure cookies in production)
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    return sessionId;
  }

  static validateSession(): boolean {
    try {
      const sessionData = sessionStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return false;

      const session = JSON.parse(sessionData);
      const now = Date.now();

      // Check if session expired
      if (now - session.lastActivity > this.SESSION_TIMEOUT) {
        this.destroySession();
        return false;
      }

      // Update last activity
      session.lastActivity = now;
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      return true;
    } catch {
      return false;
    }
  }

  static destroySession(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    sessionStorage.removeItem('csrf_token');
  }
}

// Export the CSRF manager instance
export const csrfManager = CSRFManager.getInstance();
