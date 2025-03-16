import { z } from 'zod';

export const visaPaymentSchema = z.object({
  paymentMethod: z.string(),
  paymentProof: z.instanceof(File),
  passport: z.instanceof(File),
});

export type VisaPayment = z.infer<typeof visaPaymentSchema>; 