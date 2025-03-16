import { z } from 'zod';

export const visaOrderSchema = z.object({
  agreed: z.literal(true),
});

export type VisaOrder = z.infer<typeof visaOrderSchema>; 