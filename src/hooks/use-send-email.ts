import { useState } from 'react';
import { toast } from 'sonner';
import { useVisaStep } from '@/app/[locale]/visa-application/_providers/visa-step-provider';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface UseSendEmailReturn {
  isLoading: boolean;
  messageId: string | null;
  sendEmail: () => Promise<void>;
}

export function useSendEmail(): UseSendEmailReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [messageId, setMessageId] = useState<string | null>(null);
  const { forms, formData } = useVisaStep();

  const sendEmail = async () => {
    try {
      setIsLoading(true);
      setMessageId(null);
      
      const personalData = formData.visaPersonalData;
      const passportInfo = formData.visaPassportInformation;
      const paymentProof = forms.visaPayment.getValues('paymentProof') as File | undefined;
      const paymentMethod = forms.visaPayment.getValues('paymentMethod');
      const email = forms.visaPersonalData.getValues('email');
      const passport = forms.visaFiles.getValues('passport') as File | undefined;
      
      if (!personalData || !passportInfo) {
        toast.error('Missing personal data');
        return;
      }
      
      if (!paymentProof) {
        toast.error('Payment proof is required');
        return;
      }
      
      // Ensure payment proof is a valid File object
      if (!(paymentProof instanceof File) || typeof paymentProof.arrayBuffer !== 'function') {
        toast.error('Invalid payment proof file format');
        console.error('Payment proof is not a valid File object:', paymentProof);
        return;
      }

      if (!passport) {
        toast.error('Passport is required');
        return;
      }
      
      // Ensure passport is a valid File object
      if (!(passport instanceof File) || typeof passport.arrayBuffer !== 'function') {
        toast.error('Invalid passport file format');
        console.error('Passport is not a valid File object:', passport);
        return;
      }
      
      // Check file size
      if (paymentProof.size > MAX_FILE_SIZE) {
        toast.error(`File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
        return;
      }
      
      console.log(`Sending email with file: ${paymentProof.name} (${paymentProof.size} bytes)`);
      
      // Create message with visa application details
      const message = `
Visa Application Details:

Personal Information:
- Name: ${personalData.firstName} ${personalData.lastName}

Passport Information:
- Country: ${passportInfo.passportCountry.name}
- Passport Number: ${passportInfo.passportNumber || 'Not provided'}

Payment Information:
- Method: ${paymentMethod}
- Payment Proof: ${paymentProof.name} (${(paymentProof.size / 1024).toFixed(2)} KB)
- Passport: ${passport.name} (${(passport.size / 1024).toFixed(2)} KB)
      `;
      
      // Create FormData to send file
      const emailFormData = new FormData();
      emailFormData.append('name', `${personalData.firstName} ${personalData.lastName}`);
      emailFormData.append('email', email);
      emailFormData.append('subject', 'New Visa Application');
      emailFormData.append('message', message);
      emailFormData.append('paymentProof', paymentProof);
      emailFormData.append('passport', passport);
      // Send email with attachment
      console.log('Sending request to API...');
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: emailFormData,
      });
      
      const result = await response.json();
      console.log('API response:', result);
      
      if (result.success) {
        toast.success('Email sent successfully');
        if (result.messageId) {
          setMessageId(result.messageId);
          console.log('Message ID:', result.messageId);
        }
      } else {
        console.error('Error from API:', result.error);
        toast.error('Failed to send email: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send email: ' + (error instanceof Error ? error.message : 'Unknown error'));
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