import { z } from 'zod';

export const visaFilesSchema = z.object({
  visaFiles: z.array(z.string()),
});


export type VisaFiles = z.infer<typeof visaFilesSchema>;