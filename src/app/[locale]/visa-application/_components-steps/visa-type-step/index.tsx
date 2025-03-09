'use client'

import { H1 } from '@/components/ui/typography';
import VisaRoute from '../../_components/visa-route';
import { VisaResultInfo } from './visa-result-info';
import { useGetVisaRequirement } from '../../hooks/get-visa-requirement';
import * as R from 'ramda'
import { useTranslations } from 'next-intl';
import { VisaTypeCard } from './visa-type-card';
import { useVisaStep } from '../../_providers/visa-step-provider';
import { VisaStepContainer } from '../../_components/visa-step-container';

export function VisaTypeStep() {
  const visaRequirement = useGetVisaRequirement() 
  const t = useTranslations('components.visaTypeStep');
  const { forms } = useVisaStep();
  const { watch, setValue } = forms.visaType;

  const isVisaFree = R.both(
    R.propSatisfies(R.equals(true), 'canEnter'),
    R.propSatisfies(R.equals('visa-free'), 'entryType')
  )(visaRequirement)

  const visaDuration = visaRequirement.duration
  const selectedVisas = watch('selectedVisas') || [];

  return (
    <VisaStepContainer>
      <VisaRoute />
      <VisaResultInfo />
      <H1>{isVisaFree ? t('selectAdditionalServices') : t('selectOption')} {selectedVisas.length > 0 && `(${selectedVisas.length})`}</H1>
      <div className="space-y-4">
        {visaDuration.map((duration) => (
          <VisaTypeCard 
            isSelected={selectedVisas.some(visa => visa.shortName === duration.shortName)} 
            onSelect={() => {
              if (selectedVisas.some(visa => visa.shortName === duration.shortName)) {
                setValue('selectedVisas', selectedVisas.filter(visa => visa.shortName !== duration.shortName), {
                  shouldDirty: true,
                  shouldValidate: true
                });
              } else {
                setValue('selectedVisas', [...selectedVisas, duration], {
                  shouldDirty: true,
                  shouldValidate: true
                });
              }
            }} 
            key={duration.shortName} 
            {...duration} 
          />
        ))}
      </div>
    </VisaStepContainer>
  );
} 