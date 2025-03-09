import { H1 } from "@/components/ui/typography";
import { VisaInfo } from "../../_components/visa-info";
import { VisaStepContainer } from "../../_components/visa-step-container";
import { ControlledCountrySelect } from "@/components/form-controls/controlled-country-select";
import { useVisaStep } from "../../_providers/visa-step-provider";
import { ControlledInput } from "@/components/form-controls/controlled-input";
import { ControlledDatePicker } from "@/components/form-controls/controlled-date-picker";
import { useTranslations } from "next-intl";

export function VisaPassportInformationStep() {
  const { forms: { visaPassportInformation } } = useVisaStep();
  const t = useTranslations('components.visaPassportInformationStep');

  return (
    <VisaStepContainer>
      <VisaInfo />
      <H1>{t('title')}</H1>
      <ControlledCountrySelect
        name="passportCountry"
        control={visaPassportInformation.control}
        label={t('passportCountry')}
      />
      <ControlledInput
        name="passportNumber"
        control={visaPassportInformation.control}
        label={t('passportNumber')}
      />
      <ControlledDatePicker
        name="passportExpirationDate"
        control={visaPassportInformation.control}
        label={t('passportExpirationDate')}
      />
      <ControlledCountrySelect
        name="bornCountry"
        control={visaPassportInformation.control}
        label={t('bornCountry')}
      />
    </VisaStepContainer>
  )
}