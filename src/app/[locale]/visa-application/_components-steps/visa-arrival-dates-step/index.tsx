import { H1 } from "@/components/ui/typography";
import { VisaInfo } from "./visa-info";
import { VisaStepContainer } from "../../_components/visa-step-container";
import { useVisaStep } from "../../_providers/visa-step-provider";
import { ControlledDatePicker } from "@/components/form-controls/controlled-date-picker";
import { useTranslations } from "next-intl";

export function VisaArrivalDatesStep() {
  const { forms: { visaArrivalDates: form, passportCountry: passportCountryForm } } = useVisaStep();
  const t = useTranslations("components.visaArrivalDatesStep");

  const flyToCountry = passportCountryForm.watch('flyToCountry').name;

  return (
    <VisaStepContainer>
      <VisaInfo />
      <H1>{t("title")}</H1>
      <ControlledDatePicker
        label={t("arrivalDate", { country: flyToCountry })}
        name="arrivalDate"
        control={form.control}
      />
      <ControlledDatePicker
        label={t("departureDate", { country: flyToCountry })}
        name="departureDate"
        control={form.control}
      />
    </VisaStepContainer>
  );
}