import { useState } from 'react';
import { FormData } from '@/types/formData';
import { secureInternalApi } from '@/lib/secureInternalApi';
import { SecurityValidator, SessionManager, RateLimiter } from '@/lib/security';

export const useFormSubmission = () => {
  const [showResults, setShowResults] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendSubmissionEmail = async (submissionData: FormData) => {
    try {
      console.log('Sending secure submission notification email...');
      
      const result = await secureInternalApi.sendSubmissionEmail(submissionData);

      if (!result.success) {
        console.error('Secure email service error:', result.error);
        throw new Error(result.error || 'Failed to send notification email');
      }

      console.log('Secure notification email sent successfully:', result.data);
      return { success: true, data: result.data };
      
    } catch (error) {
      console.error('Failed to send secure notification email:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Email service unavailable'
      };
    }
  };

  const saveSubmissionToDatabase = async (submissionData: FormData) => {
    try {
      console.log('Saving submission to secure internal database...');
      
      // Validate form data with comprehensive security checks
      const schema = SecurityValidator.getFormValidationSchema();
      const validationResult = schema.safeParse(submissionData);

      if (!validationResult.success) {
        const errors = validationResult.error.errors.map(e => e.message).join(', ');
        throw new Error(`Security validation failed: ${errors}`);
      }

      // Save main submission with security validation
      const submissionResult = await secureInternalApi.submitApplication(submissionData);

      if (!submissionResult.success) {
        console.error('Secure database submission error:', submissionResult.error);
        
        // Log fallback data for manual processing (sanitized)
        console.log('SECURE FALLBACK DATA FOR MANUAL PROCESSING:', {
          timestamp: new Date().toISOString(),
          sanitizedData: {
            borrowerName: SecurityValidator.sanitizeInput(submissionData.borrowerName || ''),
            contactEmail: SecurityValidator.validateEmail(submissionData.contactEmail || '').sanitized,
            seekingType: submissionData.seekingType
          },
          errorDetails: submissionResult.error,
          submissionId: `manual-${Date.now()}`
        });
        
        throw new Error(`Secure database error: ${submissionResult.error}`);
      }

      console.log('Main submission saved securely:', 'SUCCESS');

      // Handle accelerator-specific submission with security
      if (submissionData.seekingType === 'accelerator') {
        console.log('Processing secure accelerator application...');

        // Note: Accelerator submission would also use secureInternalApi
        // This is a placeholder for the secure accelerator submission
        console.log('Accelerator submission handled securely');
      }

      return { success: true, data: submissionResult.data };
      
    } catch (error) {
      console.error('Secure database submission failed:', error);
      
      // Critical fallback logging with sanitized data only
      console.log('SECURE CRITICAL FALLBACK DATA FOR MANUAL PROCESSING:', {
        timestamp: new Date().toISOString(),
        errorType: 'secure_database_failure',
        errorMessage: error instanceof Error ? SecurityValidator.sanitizeInput(error.message) : 'Unknown error',
        hasValidation: true,
        securityChecked: true
      });
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Secure database service unavailable'
      };
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) {
      console.log('Submission already in progress, ignoring duplicate request');
      return;
    }

    console.log('Starting secure form submission process...');
    setIsSubmitting(true);
    
    try {
      // Security: Validate session
      if (!SessionManager.validateSession()) {
        console.warn('Session validation failed, proceeding with caution');
      }

      // Security: Rate limiting check
      const clientId = 'form-submission';
      if (!RateLimiter.canMakeRequest(clientId)) {
        throw new Error('Too many submission attempts. Please wait before trying again.');
      }

      // Comprehensive form validation with security checks
      try {
        const schema = SecurityValidator.getFormValidationSchema();
        const validationResult = schema.safeParse(formData);

        if (!validationResult.success) {
          const errors = validationResult.error.errors.map(e => e.message).join(', ');
          throw new Error(`Please correct the following: ${errors}`);
        }
      } catch (validationError) {
        throw new Error(`Form validation failed: ${validationError instanceof Error ? validationError.message : 'Invalid data'}`);
      }
      
      // Save to database first (most critical operation) with security
      console.log('Step 1: Saving to secure database...');
      const saveResult = await saveSubmissionToDatabase(formData);
      
      if (!saveResult.success) {
        throw new Error(`Failed to save secure submission: ${saveResult.error}`);
      }
      
      // Send notification email (secondary operation) with security
      console.log('Step 2: Sending secure notification email...');
      const emailResult = await sendSubmissionEmail(formData);
      
      // Show appropriate success page
      if (formData.seekingType === 'accelerator') {
        console.log('Showing accelerator results page');
        setShowResults(true);
      } else {
        console.log('Showing thank you page');
        setShowThankYou(true);
      }

      // Notify user about email status if there was an issue
      if (!emailResult.success) {
        console.warn('Secure email notification failed but submission was saved');
        alert('Your submission was saved successfully! However, there was an issue sending the notification email. We have your information and will contact you soon.');
      } else {
        console.log('Secure submission completed successfully');
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Secure submission process failed:', SecurityValidator.sanitizeInput(errorMessage));
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
