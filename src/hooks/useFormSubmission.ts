
import { useState } from 'react';
import { FormData } from '@/types/formData';
import { supabase } from '@/integrations/supabase/client';

export const useFormSubmission = () => {
  const [showResults, setShowResults] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const sendSubmissionEmail = async (submissionData: FormData) => {
    try {
      console.log('Sending comprehensive submission email via edge function');
      
      const { data, error } = await supabase.functions.invoke('send-submission-email', {
        body: submissionData
      });

      if (error) {
        console.error('Error sending submission email:', error);
        throw error;
      }

      console.log('Submission email sent successfully:', data);
      return { success: true };
    } catch (error) {
      console.error('Failed to send submission email:', error);
      return { success: false, error };
    }
  };

  const saveSubmissionToDatabase = async (submissionData: FormData) => {
    try {
      console.log('Starting submission save process with data:', submissionData);
      
      // Prepare data for submissions table
      const submissionPayload = {
        borrower_name: submissionData.borrowerName || '',
        contact_name: submissionData.contactName || '',
        contact_email: submissionData.contactEmail || '',
        contact_phone: submissionData.contactPhone || null,
        company_hq: submissionData.companyHQ || '',
        business_stage: submissionData.businessStage || '',
        industry: submissionData.industry || '',
        vertical: submissionData.vertical || null,
        seeking_type: submissionData.seekingType || '',
        raise_amount: submissionData.raiseAmount || null,
        business_description: submissionData.productDescription || null,
        funding_purpose: submissionData.useOfFunds || null,
        current_revenue: submissionData.lastTwelveRevenue || null,
        previous_funding: submissionData.totalEquityRaised || null,
        submitted_at: new Date().toISOString(),
        status: 'new',
        priority: 'medium'
      };

      console.log('Prepared submission payload:', submissionPayload);

      // Insert into submissions table
      const { data: submissionResult, error: submissionError } = await supabase
        .from('submissions')
        .insert([submissionPayload])
        .select();

      if (submissionError) {
        console.error('Supabase submission error details:', {
          message: submissionError.message,
          details: submissionError.details,
          hint: submissionError.hint,
          code: submissionError.code
        });
        
        // Create a fallback record for manual processing
        console.log('FALLBACK DATA FOR MANUAL PROCESSING:', {
          timestamp: new Date().toISOString(),
          submissionPayload,
          fullFormData: submissionData,
          errorDetails: submissionError
        });
      } else {
        console.log('Submission saved successfully to submissions table:', submissionResult);
      }

      // If it's an accelerator submission, also save to accelerator_applications
      if (submissionData.seekingType === 'accelerator') {
        const acceleratorPayload = {
          startup_name: submissionData.borrowerName || '',
          founder_name: submissionData.contactName || '',
          founder_email: submissionData.contactEmail || '',
          founder_phone: submissionData.contactPhone || null,
          company_stage: submissionData.businessStage || '',
          industry: submissionData.industry || '',
          accelerator_id: 'general',
          application_data: submissionData,
          status: 'submitted',
          submitted_at: new Date().toISOString()
        };

        console.log('Prepared accelerator payload:', acceleratorPayload);

        const { data: acceleratorResult, error: acceleratorError } = await supabase
          .from('accelerator_applications')
          .insert([acceleratorPayload])
          .select();

        if (acceleratorError) {
          console.error('Accelerator application error:', acceleratorError);
          console.log('ACCELERATOR FALLBACK DATA:', {
            timestamp: new Date().toISOString(),
            acceleratorPayload,
            errorDetails: acceleratorError
          });
        } else {
          console.log('Accelerator application saved successfully:', acceleratorResult);
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
      // Save to database
      const saveResult = await saveSubmissionToDatabase(formData);
      console.log('Database save result:', saveResult);
      
      // Send comprehensive email automatically
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
