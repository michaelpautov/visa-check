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
      
      // Get all form data
      const { 
        passportCountry, 
        visaType, 
        visaArrivalDates, 
        visaPersonalData, 
        visaPassportInformation, 
        visaOrder
      } = formData;
      
      // Get file uploads from the forms
      const paymentProof = forms.visaPayment.getValues('paymentProof') as File | undefined;
      const paymentMethod = forms.visaPayment.getValues('paymentMethod');
      const email = forms.visaPersonalData.getValues('email');
      const passport = forms.visaPayment.getValues('passport') as File | undefined;
      
      // Validate required data
      if (!visaPersonalData || !visaPassportInformation) {
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
      
      // Create a comprehensive message with all visa application details
      const message = `
Visa Application Details:

Passport Country:
${passportCountry ? `- Passport Country: ${passportCountry.passportCountry.name}
- Fly To Country: ${passportCountry.flyToCountry.name}` : '- Not provided'}

Visa Type:
${visaType && visaType.selectedVisas.length > 0 ? 
  `- Selected Visas: ${visaType.selectedVisas.map(visa => 
    visa.shortName || visa.type || `${visa.day} days visa`
  ).join(', ')}` : '- Not provided'}

Arrival Dates:
${visaArrivalDates ? `- Arrival Date: ${visaArrivalDates.arrivalDate ? new Date(visaArrivalDates.arrivalDate).toLocaleDateString() : 'Not provided'}
- Departure Date: ${visaArrivalDates.departureDate ? new Date(visaArrivalDates.departureDate).toLocaleDateString() : 'Not provided'}` : '- Not provided'}

Personal Information:
${visaPersonalData ? `- Name: ${visaPersonalData.firstName} ${visaPersonalData.lastName}
- Email: ${visaPersonalData.email}
- Date of Birth: ${visaPersonalData.dateOfBirth ? new Date(visaPersonalData.dateOfBirth).toLocaleDateString() : 'Not provided'}` : '- Not provided'}

Passport Information:
${visaPassportInformation ? `- Passport Country: ${visaPassportInformation.passportCountry.name}
- Born Country: ${visaPassportInformation.bornCountry.name}
- Passport Number: ${visaPassportInformation.passportNumber || 'Not provided'}
- Passport Expiration Date: ${visaPassportInformation.passportExpirationDate ? new Date(visaPassportInformation.passportExpirationDate).toLocaleDateString() : 'Not provided'}` : '- Not provided'}

Order Information:
${visaOrder ? `- Agreed to Terms: ${visaOrder.agreed ? 'Yes' : 'No'}` : '- Not provided'}

Payment Information:
- Method: ${paymentMethod || 'Not provided'}
- Payment Proof: ${paymentProof.name} (${(paymentProof.size / 1024).toFixed(2)} KB)
- Passport: ${passport.name} (${(passport.size / 1024).toFixed(2)} KB)
      `;
      
      // Create FormData to send file and all form data
      const emailFormData = new FormData();
      
      // Add basic email information
      emailFormData.append('name', visaPersonalData ? `${visaPersonalData.firstName} ${visaPersonalData.lastName}` : 'Visa Applicant');
      emailFormData.append('email', email);
      emailFormData.append('subject', 'New Visa Application');
      emailFormData.append('message', message);
      
      // Add files
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