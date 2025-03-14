import { useVisaStep } from "../_providers/visa-step-provider";
import { IoIosAirplane } from "react-icons/io";
import { useTranslations } from "next-intl";
import { SquareFlag } from "@/components/common/square-flag";

export default function VisaRoute() {
  const { forms: { passportCountry } } = useVisaStep();
  const t = useTranslations('components.visaRoute');
  const countryFrom = passportCountry.watch('passportCountry');
  const countryTo = passportCountry.watch('flyToCountry');

  return (
    <div className="flex flex-row items-center gap-2 px-2 py-2 rounded bg-muted border text-xs font-medium">
      {t('passportFrom')} <SquareFlag code={countryFrom.code} /> {countryFrom.code}
      <IoIosAirplane className="w-4 h-4" />
      <SquareFlag code={countryTo.code} /> {countryTo.code}
    </div>
  )
}