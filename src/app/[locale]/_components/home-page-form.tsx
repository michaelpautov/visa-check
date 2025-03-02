'use client'
import { H3 } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { type Country } from "@/components/form-controls/country-select";
import { useForm } from "react-hook-form";
import { ControlledCountrySelect } from "@/components/form-controls/controlled-country-select";
import { useEffect } from "react";
import { checkVisaRequirement } from "@/data/visa-requirements";
import { VisaResult } from "./visa-result";
import { ControlledFileInput } from "@/components/form-controls/controlled-file-input";
import { ControlledDatePicker } from "@/components/form-controls/controlled-date-picker";
interface FormValues {
  country: Country | null;
  visaResult: VisaCheckResult | null;
  selectedVisa: VisaDuration | null;
  passportFile: File | null;
  passportExpiryDate: Date | null;
}

interface VisaDuration {
  days: number;
  price: number;
  extendable: boolean;
  maxExtensions: number;
  maxTotalDays: number;
}

interface VisaCheckResult {
  canEnter: boolean;
  entryType: 'visa-free' | 'visa-on-arrival' | 'visa-required';
  duration: VisaDuration[];
}

export function HomePageForm() {
  const t = useTranslations("components.homePageForm");

  
  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      country: null,
      visaResult: null,
      selectedVisa: null,
      passportFile: null,
      passportExpiryDate: null,
    }
  });

  const country = watch("country");
  const visaResult = watch("visaResult");
  const selectedVisa = watch("selectedVisa");
  const passportFile = watch("passportFile");

  useEffect(() => {
    if (country) {
      const result = checkVisaRequirement(country.name) as VisaCheckResult;
      setValue("visaResult", result);
    }
  }, [country, setValue]);

  const onSubmit = (data: FormValues) => {
  };

  const handleVisaSelect = (duration: VisaDuration) => setValue("selectedVisa", duration);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col items-center grow py-8"
    >
      <H3>{t("title")}</H3>
      <div className="w-[280px] mt-4 space-y-4 overflow-hidden">
        <ControlledCountrySelect
          name="country"
          control={control}
          rules={{ required: true }}
          placeholder={t("selectCountry")}
          searchPlaceholder={t("searchCountry")}
        />
        {visaResult && <VisaResult result={visaResult} onVisaSelect={handleVisaSelect} />}
        {selectedVisa && <ControlledFileInput name="passportFile" control={control} />}
        {passportFile && <ControlledDatePicker placeholder={t("arrivalDate")} name="passportExpiryDate" control={control} />}
      </div>
    </form>
  );
}
