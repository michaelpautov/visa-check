import { z } from 'zod';

export const visaPersonalDataSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.date(),
  email: z.string().email(),
});

export type VisaPersonalData = z.infer<typeof visaPersonalDataSchema>; 