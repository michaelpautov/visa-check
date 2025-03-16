import { z } from 'zod';

export const visaPassportInformationSchema = z.object({
  passportCountry: z.object({
    code: z.string(),
    name: z.string(),
    native: z.string(),
  }),
  bornCountry: z.object({
    code: z.string(),
    name: z.string(),
    native: z.string(),
  }),
  passportNumber: z.string().optional(),
  passportExpirationDate: z.date().optional(),
});

export type VisaPassportInformation = z.infer<typeof visaPassportInformationSchema>; 