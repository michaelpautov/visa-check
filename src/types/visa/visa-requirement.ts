import { VisaDuration } from "./visa-duration";

export interface VisaRequirement {
  canEnter: boolean;
  entryType: 'visa-free' | 'visa-on-arrival' | 'visa-required';
  duration: VisaDuration[];
}

