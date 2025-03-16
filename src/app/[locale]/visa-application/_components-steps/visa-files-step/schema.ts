import { z } from 'zod';

export const visaFilesSchema = z.object({
  passport: z.instanceof(File),
});


export type VisaFiles = z.infer<typeof visaFilesSchema>;