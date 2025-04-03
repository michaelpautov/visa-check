
import { useVisaStep } from "@/app/[locale]/visa-application/_providers/visa-step-provider";
import { useMemo } from "react";
import { useToastError } from "./use-toast";
import { MAX_FILE_SIZE } from "@/constants/email";
import { z } from "zod";

// Define Zod schemas for validation
const FileSchema = z.instanceof(File)
  .refine((file) => typeof file.arrayBuffer === 'function', {
    message: "Invalid file format"
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`
  });

const EmailContentSchema = z.object({
  visaPersonalData: z.any().refine(val => !!val, {
    message: "Personal data is required"
  }),
  visaPassportInformation: z.any().refine(val => !!val, {
    message: "Passport information is required"
  }),
  paymentProof: FileSchema,
  passport: FileSchema
});

export function useValidateEmailContent() {
  const { formData, forms } = useVisaStep();
  const paymentProof = forms.visaPayment.getValues('paymentProof') as File | undefined;
  const passport = forms.visaPayment.getValues('passport') as File | undefined;
  const { 
    visaPersonalData, 
    visaPassportInformation, 
  } = formData;

  const toastError = useToastError();


  return useMemo(() => {
    // Create data object to validate
    const dataToValidate = {
      visaPersonalData,
      visaPassportInformation,
      paymentProof,
      passport
    };

    // Validate using Zod
    const result = EmailContentSchema.safeParse(dataToValidate);
    
    if (!result.success) {
      // Extract the first error
      const error = result.error.errors[0];
      const path = error.path.join('.');
      const message = error.message;
      
      // Map path to user-friendly title
      const titleMap: Record<string, string> = {
        'visaPersonalData': 'Missing personal data',
        'visaPassportInformation': 'Missing passport information',
        'paymentProof': 'Payment proof issue',
        'passport': 'Passport issue'
      };
      
      const title = titleMap[path] || 'Validation Error';
      toastError(title, message);
      
      return false;
    }
    
    return true;
  }, [visaPersonalData, visaPassportInformation, paymentProof, passport, toastError]);
}
