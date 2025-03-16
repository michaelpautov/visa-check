import { useVisaStep } from "../_providers/visa-step-provider";
import { checkVisaRequirement } from "../_utils/check-visa-requirements";

export function useGetVisaRequirement() {
  const { formData: { passportCountry } } = useVisaStep();
  const passportCountryName = passportCountry?.passportCountry?.name
  const visaRequirement = checkVisaRequirement(passportCountryName!)
  return visaRequirement
}