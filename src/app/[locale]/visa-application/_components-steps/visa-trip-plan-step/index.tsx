import { H1 } from '@/components/ui/typography';
import { useVisaStep } from '../../_providers/visa-step-provider';
import { ControlledCountrySelect } from '@/components/form-controls/controlled-country-select';
import { useTranslations } from 'next-intl';
import { VisaStepContainer } from '../../_components/visa-step-container';
import { useEffect } from 'react';

export function VisaTripPlanStep() {
  const { forms: { passportCountry: form } } = useVisaStep();
  const t = useTranslations('components.passportCountryStep');
  
  // Set Indonesia as default value for flyToCountry
  useEffect(() => {
    // Set Indonesia as the default value if not already set
    if (!form.getValues().flyToCountry) {
      form.setValue('flyToCountry', {
        code: 'ID',
        name: 'Indonesia',
        native: 'Indonesia'
      }, { shouldValidate: true, shouldDirty: true });
    }
  }, [form]);
  
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
        disabled={true}
      />
    </VisaStepContainer>
  );
} 