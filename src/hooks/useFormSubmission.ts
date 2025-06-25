
import { useState } from 'react';
import { FormData } from '@/types/formData';
import { internalApi } from '@/lib/internalApi';

export const useFormSubmission = () => {
  const [showResults, setShowResults] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const sendSubmissionEmail = async (submissionData: FormData) => {
    try {
      console.log('Sending comprehensive submission email via internal bank API');
      
      const result = await internalApi.sendSubmissionEmail(submissionData);

      if (!result.success) {
        console.error('Error sending submission email:', result.error);
        throw new Error(result.error || 'Failed to send email');
      }

      console.log('Submission email sent successfully:', result.data);
      return { success: true };
    } catch (error) {
      console.error('Failed to send submission email:', error);
      return { success: false, error };
    }
  };

  const saveSubmissionToDatabase = async (submissionData: FormData) => {
    try {
      console.log('Starting submission save process with internal bank API:', submissionData);
      
      // Save main submission to internal database
      const submissionResult = await internalApi.submitApplication(submissionData);

      if (!submissionResult.success) {
        console.error('Internal API submission error:', submissionResult.error);
        
        // Create a fallback record for manual processing
        console.log('FALLBACK DATA FOR MANUAL PROCESSING:', {
          timestamp: new Date().toISOString(),
          submissionData,
          errorDetails: submissionResult.error
        });
      } else {
        console.log('Submission saved successfully to internal database:', submissionResult.data);
      }

      // If it's an accelerator submission, also save to accelerator applications
      if (submissionData.seekingType === 'accelerator') {
        console.log('Processing accelerator application...');

        const acceleratorResult = await internalApi.submitAcceleratorApplication(submissionData);

        if (!acceleratorResult.success) {
          console.error('Accelerator application error:', acceleratorResult.error);
          console.log('ACCELERATOR FALLBACK DATA:', {
            timestamp: new Date().toISOString(),
            submissionData,
            errorDetails: acceleratorResult.error
          });
        } else {
          console.log('Accelerator application saved successfully:', acceleratorResult.data);
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Unexpected error in saveSubmissionToDatabase:', error);
      console.log('CRITICAL FALLBACK DATA FOR MANUAL PROCESSING:', {
        timestamp: new Date().toISOString(),
        fullFormData: submissionData,
        unexpectedError: error
      });
      return { success: false, error };
    }
  };

  const handleSubmit = async (formData: FormData) => {
    console.log('Form submission started with final data:', formData);
    
    // Validate required fields
    if (!formData.borrowerName || !formData.contactName || !formData.contactEmail || 
        !formData.companyHQ || !formData.businessStage || !formData.industry || !formData.seekingType) {
      console.error('Missing required fields for submission');
      alert('Please ensure all required fields are filled out.');
      return;
    }
    
    try {
      // Save to internal database
      const saveResult = await saveSubmissionToDatabase(formData);
      console.log('Database save result:', saveResult);
      
      // Send comprehensive email via internal email service
      const emailResult = await sendSubmissionEmail(formData);
      console.log('Email send result:', emailResult);
      
      // Show appropriate success page regardless of email status
      if (formData.seekingType === 'accelerator') {
        console.log('Showing accelerator results page');
        setShowResults(true);
      } else {
        console.log('Showing professional thank you page');
        setShowThankYou(true);
      }

      // Alert user about email status
      if (!emailResult.success) {
        alert('Your submission was saved successfully, but there was an issue sending the notification email. We have your information and will contact you soon.');
      }
    } catch (error) {
      console.error('Submission process error:', error);
      alert('There was an error processing your submission. Please try again or contact us directly.');
    }
  };

  return {
    showResults,
    showThankYou,
    handleSubmit
  };
};
