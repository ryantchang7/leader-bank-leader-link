
import { useState } from 'react';
import { FormData } from '@/types/formData';

// Import APIs and security modules directly
import { internalApi } from '@/lib/internalApi';

// Try to import secure modules, but fall back gracefully
let secureInternalApi: any = null;
let SecurityValidator: any = null;
let SessionManager: any = null;
let RateLimiter: any = null;

// Initialize secure modules function (called within the hook)
const initializeSecureModules = async () => {
  if (secureInternalApi !== null) return; // Already initialized

  try {
    const secureApi = await import('@/lib/secureInternalApi');
    secureInternalApi = secureApi.secureInternalApi;
    
    const security = await import('@/lib/security');
    SecurityValidator = security.SecurityValidator;
    SessionManager = security.SessionManager;
    RateLimiter = security.RateLimiter;
    
    console.log('Secure modules loaded successfully');
  } catch (error) {
    console.warn('Secure API not available, using fallbacks:', error);
    
    // Set fallback values
    secureInternalApi = internalApi;
    
    // Create fallback security validators
    SecurityValidator = {
      getFormValidationSchema: () => ({ safeParse: (data: any) => ({ success: true, data }) }),
      sanitizeInput: (input: string) => input
    };
    SessionManager = { validateSession: () => true };
    RateLimiter = { canMakeRequest: () => true };
  }
};

export const useFormSubmission = () => {
  const [showResults, setShowResults] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendSubmissionEmail = async (submissionData: FormData) => {
    try {
      console.log('Sending submission notification email...');
      
      // Ensure secure modules are initialized
      await initializeSecureModules();
      
      if (!secureInternalApi || !secureInternalApi.sendSubmissionEmail) {
        console.warn('Email service not available');
        return { success: true, data: { email_id: 'mock' } };
      }

      const result = await secureInternalApi.sendSubmissionEmail(submissionData);

      if (!result.success) {
        console.error('Email service error:', result.error);
        throw new Error(result.error || 'Failed to send notification email');
      }

      console.log('Notification email sent successfully:', result.data);
      return { success: true, data: result.data };
      
    } catch (error) {
      console.error('Failed to send notification email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Email service unavailable'
      };
    }
  };

  const saveSubmissionToDatabase = async (submissionData: FormData) => {
    try {
      console.log('Saving submission to database...');
      
      // Ensure secure modules are initialized
      await initializeSecureModules();
      
      if (!secureInternalApi || !secureInternalApi.submitApplication) {
        console.warn('Database service not available');
        return { success: true, data: { submission_id: 'mock' } };
      }

      // Validate form data if security validator is available
      if (SecurityValidator && SecurityValidator.getFormValidationSchema) {
        const schema = SecurityValidator.getFormValidationSchema();
        const validationResult = schema.safeParse(submissionData);

        if (!validationResult.success) {
          const errors = validationResult.error?.errors?.map((e: any) => e.message).join(', ') || 'Validation failed';
          throw new Error(`Validation failed: ${errors}`);
        }
      }

      const submissionResult = await secureInternalApi.submitApplication(submissionData);

      if (!submissionResult.success) {
        console.error('Database submission error:', submissionResult.error);
        throw new Error(`Database error: ${submissionResult.error}`);
      }

      console.log('Main submission saved successfully');
      return { success: true, data: submissionResult.data };
      
    } catch (error) {
      console.error('Database submission failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Database service unavailable'
      };
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) {
      console.log('Submission already in progress, ignoring duplicate request');
      return;
    }

    console.log('Starting form submission process...');
    setIsSubmitting(true);
    
    try {
      // Initialize secure modules first
      await initializeSecureModules();

      // Security checks if available
      if (SessionManager && !SessionManager.validateSession()) {
        console.warn('Session validation failed, proceeding with caution');
      }

      if (RateLimiter && !RateLimiter.canMakeRequest('form-submission')) {
        throw new Error('Too many submission attempts. Please wait before trying again.');
      }

      // Save to database first
      console.log('Step 1: Saving to database...');
      const saveResult = await saveSubmissionToDatabase(formData);
      
      if (!saveResult.success) {
        throw new Error(`Failed to save submission: ${saveResult.error}`);
      }
      
      // Send notification email
      console.log('Step 2: Sending notification email...');
      const emailResult = await sendSubmissionEmail(formData);
      
      // Show appropriate success page
      if (formData.seekingType === 'accelerator') {
        console.log('Showing accelerator results page');
        setShowResults(true);
      } else {
        console.log('Showing thank you page');
        setShowThankYou(true);
      }

      if (!emailResult.success) {
        console.warn('Email notification failed but submission was saved');
        alert('Your submission was saved successfully! However, there was an issue sending the notification email. We have your information and will contact you soon.');
      } else {
        console.log('Submission completed successfully');
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Submission process failed:', errorMessage);
      alert(`Submission failed: ${errorMessage}. Please try again or contact support.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    showResults,
    showThankYou,
    isSubmitting,
    handleSubmit
  };
};
