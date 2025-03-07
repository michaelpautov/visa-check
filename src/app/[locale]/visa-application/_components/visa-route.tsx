import { getFlagSquare } from "@/lib/get-flag";
import { useVisaStep } from "../_providers/visa-step-provider";
import { IoIosAirplane } from "react-icons/io";
import { useTranslations } from "next-intl";

export default function VisaRoute() {
  const { forms: { passportCountry } } = useVisaStep();
  const t = useTranslations('components.visaRoute');
  const countryFrom = passportCountry.watch('passportCountry');
  const countryTo = passportCountry.watch('flyToCountry');

  const customGetFlag = (code: string) => {
    return getFlagSquare(code, 'w-3 h-3 rounded-full');
  };

  return (
    <div className="flex flex-row items-center gap-2 px-2 py-2 rounded bg-muted border text-xs font-medium">
      {t('passportFrom')} {customGetFlag(countryFrom.code)} {countryFrom.code}
      <IoIosAirplane className="w-4 h-4" />
      {customGetFlag(countryTo.code)} {countryTo.code}
    </div>
  )
}