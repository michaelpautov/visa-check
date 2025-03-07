import { H1 } from '@/components/ui/typography';
import VisaRoute from '../../_components/visa-route';
import { VisaResultInfo } from './visa-result-info';
import { useGetVisaRequirement } from '../../hooks/get-visa-requirement';
import * as R from 'ramda'

export function VisaTypeStep() {
  const visaRequirement = useGetVisaRequirement() 

  const isVisaFree = R.both(
    R.propSatisfies(R.equals(true), 'canEnter'),
    R.propSatisfies(R.equals('visa-free'), 'entryType')
  )(visaRequirement)

  return (
    <div className="space-y-6">
      <VisaRoute />
      <VisaResultInfo />
      <H1>{isVisaFree ? 'Выберите дополнительные услуги' : 'Выберите вариант'}</H1>
    </div>
  );
} 