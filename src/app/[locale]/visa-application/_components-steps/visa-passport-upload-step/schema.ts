import { z } from 'zod';

export const visaPassportUploadSchema = z.object({
  passport: z.instanceof(File),
});


export type VisaPassportUpload = z.infer<typeof visaPassportUploadSchema>;