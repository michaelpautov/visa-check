export interface VisaDuration {
  days: number;
  price: number;
  extendable: boolean;
  maxExtensions: number;
  maxTotalDays: number;
  type?: string;
  name?: string;
  requirements?: string[];
}