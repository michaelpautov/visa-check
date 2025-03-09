import { H1 } from '@/components/ui/typography';
import { useVisaStep } from '../../_providers/visa-step-provider';
import { ControlledCountrySelect } from '@/components/form-controls/controlled-country-select';
import { useTranslations } from 'next-intl';
import { VisaStepContainer } from '../../_components/visa-step-container';

export function VisaTripPlanStep() {
  const { forms: { passportCountry: form } } = useVisaStep();
  const t = useTranslations('components.passportCountryStep');
  
  return (
    <VisaStepContainer>
      <H1>{t('title')}</H1>
      <ControlledCountrySelect
        label={t('passportFrom')}
        name="passportCountry"
        control={form.control}
      />
      <ControlledCountrySelect
        label={t('visitCountry')}
        name="flyToCountry"
        control={form.control}
      />
    </VisaStepContainer>
  );
} 