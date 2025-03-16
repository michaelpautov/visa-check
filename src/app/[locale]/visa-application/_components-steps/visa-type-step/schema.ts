import { z } from 'zod';

export const visaTypeSchema = z.object({
  selectedVisas: z.array(z.object({
    day: z.number(),
    price: z.number(),
    extendable: z.boolean(),
    maxExtensions: z.number(),
    maxTotalDays: z.number(),
    type: z.string().optional(),
    shortName: z.string().optional(),
    officialName: z.string().optional(),
    requirements: z.array(z.string()).optional()
  }))
});

export type VisaType = z.infer<typeof visaTypeSchema>; 