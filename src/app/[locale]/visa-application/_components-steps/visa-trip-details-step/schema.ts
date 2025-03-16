import { z } from 'zod';

export const passportCountrySchema = z.object({
  passportCountry: z.object({
    code: z.string(),
    name: z.string(),
    native: z.string(),
  }),
  flyToCountry: z.object({
    code: z.string(),
    name: z.string(),
    native: z.string(),
  }),
});

export type PassportCountry = z.infer<typeof passportCountrySchema>; 