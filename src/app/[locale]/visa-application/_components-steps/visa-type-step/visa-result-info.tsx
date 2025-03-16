import { cn } from "@/lib/utils";
import { useGetVisaRequirement } from "../../_hooks/get-visa-requirement";
import * as R from 'ramda'
import { useTranslations } from 'next-intl';

export function VisaResultInfo() {
  const visaRequirement = useGetVisaRequirement()
  const t = useTranslations('components.visaResult');

  const isVisaFree = R.both(
    R.propSatisfies(R.equals(true), 'canEnter'),
    R.propSatisfies(R.equals('visa-free'), 'entryType')
  )

  const visaText = R.cond([
    [isVisaFree, R.always(t('visaNotRequired'))],
    [R.both(
      R.propSatisfies(R.equals(true), 'canEnter'),
      R.propSatisfies(R.equals('visa-on-arrival'), 'entryType')
    ), R.always(t('visaIsRequired'))],
    [R.T, R.always(t('visaIsRequired'))]
  ])(visaRequirement)

  return (<div className={cn("text-xs font-semibold", isVisaFree(visaRequirement) && "text-green-600", !isVisaFree(visaRequirement) && "text-destructive")}>{visaText}</div>)
}
