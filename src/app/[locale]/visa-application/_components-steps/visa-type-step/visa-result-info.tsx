import { cn } from "@/lib/utils";
import { useGetVisaRequirement } from "../../hooks/get-visa-requirement";
import * as R from 'ramda'

export function VisaResultInfo() {
  const visaRequirement = useGetVisaRequirement()

  const isVisaFree = R.both(
    R.propSatisfies(R.equals(true), 'canEnter'),
    R.propSatisfies(R.equals('visa-free'), 'entryType')
  )

  const visaText = R.cond([
    [isVisaFree, R.always('Вам не нужна виза')],
    [R.both(
      R.propSatisfies(R.equals(true), 'canEnter'),
      R.propSatisfies(R.equals('visa-on-arrival'), 'entryType')
    ), R.always('Visa требуется для поездок')],
    [R.T, R.always('Visa требуется для поездок')]
  ])(visaRequirement)

  return (<div className={cn("text-xs font-semibold", isVisaFree(visaRequirement) && "text-green-600", !isVisaFree(visaRequirement) && "text-destructive")}>{visaText}</div>)
}
