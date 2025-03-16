import { z } from 'zod';

export const visaArrivalDatesSchema = z.object({
  arrivalDate: z.date().optional(),
  departureDate: z.date().optional(),
});

export type VisaArrivalDates = z.infer<typeof visaArrivalDatesSchema>; 