'use client'
import { useVisaStep } from "../_providers/visa-step-provider";
import { PassportCountryStep } from "../_components-steps/steps/passport-country-step";
import { VisaTypeStep } from "../_components-steps/steps/visa-type-step";

function StepContent() {
  const { currentStep } = useVisaStep();

  switch (currentStep) {
    case 'passportCountry':
      return <PassportCountryStep />;
    case 'visaType':
      return <VisaTypeStep />;
    default:
      return null;
  }
}

export function VisaApplicationClient() {
  return <StepContent />
}
