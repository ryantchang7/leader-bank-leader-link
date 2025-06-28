
import { useState } from 'react';
import { FormData } from '@/types/formData';
import { internalApi } from '@/lib/internalApi';

export const useFormSubmission = () => {
  const [showResults, setShowResults] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendSubmissionEmail = async (submissionData: FormData) => {
    try {
      console.log('Sending submission notification email...');
      
      const result = await internalApi.sendSubmissionEmail(submissionData);

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
      console.log('Saving submission to internal database...');
      
      // Validate required fields before submission
      const requiredFields = ['borrowerName', 'contactName', 'contactEmail', 'companyHQ', 'businessStage', 'industry', 'seekingType'];
      const missingFields = requiredFields.filter(field => !submissionData[field as keyof FormData]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Save main submission
      const submissionResult = await internalApi.submitApplication(submissionData);

      if (!submissionResult.success) {
        console.error('Database submission error:', submissionResult.error);
        
        // Log fallback data for manual processing
        console.log('FALLBACK DATA FOR MANUAL PROCESSING:', {
          timestamp: new Date().toISOString(),
          submissionData,
          errorDetails: submissionResult.error,
          submissionId: `manual-${Date.now()}`
        });
        
        throw new Error(`Database error: ${submissionResult.error}`);
      }

      console.log('Main submission saved successfully:', submissionResult.data);

      // Handle accelerator-specific submission
      if (submissionData.seekingType === 'accelerator') {
        console.log('Processing accelerator application...');

        const acceleratorResult = await internalApi.submitAcceleratorApplication(submissionData);

        if (!acceleratorResult.success) {
          console.error('Accelerator application error:', acceleratorResult.error);
          // Log but don't fail the main submission
          console.log('ACCELERATOR FALLBACK DATA:', {
            timestamp: new Date().toISOString(),
            submissionData,
            errorDetails: acceleratorResult.error
          });
        } else {
          console.log('Accelerator application saved:', acceleratorResult.data);
        }
      }

      return { success: true, data: submissionResult.data };
      
    } catch (error) {
      console.error('Database submission failed:', error);
      
      // Critical fallback logging
      console.log('CRITICAL FALLBACK DATA FOR MANUAL PROCESSING:', {
        timestamp: new Date().toISOString(),
        fullFormData: submissionData,
        errorType: 'database_failure',
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
      
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
      // Validate form data completeness
      if (!formData.borrowerName || !formData.contactName || !formData.contactEmail || 
          !formData.companyHQ || !formData.businessStage || !formData.industry || !formData.seekingType) {
        throw new Error('Please ensure all required fields are completed before submitting.');
      }
      
      // Save to database first (most critical operation)
      console.log('Step 1: Saving to database...');
      const saveResult = await saveSubmissionToDatabase(formData);
      
      if (!saveResult.success) {
        throw new Error(`Failed to save submission: ${saveResult.error}`);
      }
      
      // Send notification email (secondary operation)
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

      // Notify user about email status if there was an issue
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
