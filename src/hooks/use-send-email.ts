import { useState } from 'react';
import { useVisaStep } from '@/app/[locale]/visa-application/_providers/visa-step-provider';
import { useCreateEmailContent } from './use-create-email-content';
import { useValidateEmailContent } from './use-validate-email-content';
import { useToastSuccess, useToastError } from './use-toast';

interface UseSendEmailReturn {
  isLoading: boolean;
  messageId: string | null;
  sendEmail: () => Promise<void>;
}

export function useSendEmail(): UseSendEmailReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState<string | null>(null);
  const { forms, formData } = useVisaStep();

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  
  const { html, text } = useCreateEmailContent();

  const isValid = useValidateEmailContent();


  const sendEmail = async () => {
    try {
      setIsLoading(true);
      setMessageId(null);
      if (!isValid) throw new Error('Invalid email content');
      
      const { 
        visaPersonalData, 
      } = formData;
      
      // Get file uploads from the forms
      const paymentProof = forms.visaPayment.getValues('paymentProof') as File | undefined;
      const email = forms.visaPersonalData.getValues('email');
      const passport = forms.visaPayment.getValues('passport') as File | undefined;
      
      if (!isValid) return;
      
      // Prepare data for email content
      const name = visaPersonalData ? `${visaPersonalData.firstName} ${visaPersonalData.lastName}` : 'Visa Applicant';
      
      // Create email content using the hook
      
      // Create FormData to send file and all form data
      const emailFormData = new FormData();
      
      // Add basic email information
      emailFormData.append('name', name);
      emailFormData.append('email', email);
      emailFormData.append('subject', 'New Visa Application');
      emailFormData.append('message', text);
      emailFormData.append('html', html);
      emailFormData.append('text', text);
      
      // Add files
      if (paymentProof) emailFormData.append('paymentProof', paymentProof);
      if (passport) emailFormData.append('passport', passport);
      
      // Send email with attachment
      console.log('Sending request to API...');
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: emailFormData,
      });
      
      const result = await response.json();
      console.log('API response:', result);
      
      if (result.success) {
        toastSuccess('Email sent successfully', 'Email sent successfully');
        if (result.messageId) {
          setMessageId(result.messageId);
          console.log('Message ID:', result.messageId);
        }
      } else {
        console.error('Error from API:', result.error);
        toastError('Failed to send email', result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toastError('Failed to send email', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    messageId,
    sendEmail,
  };
} 