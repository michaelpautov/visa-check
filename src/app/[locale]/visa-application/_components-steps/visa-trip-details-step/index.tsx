import { H1 } from "@/components/ui/typography";
import { VisaInfo } from "../../_components/visa-info";
import { VisaStepContainer } from "../../_components/visa-step-container";
import { useVisaStep } from "../../_providers/visa-step-provider";
import { ControlledDatePicker } from "@/components/form-controls/controlled-date-picker";
import { useTranslations } from "next-intl";
import { addDays } from "date-fns";

export function VisaTripDetailsStep() {
  const { forms: { visaArrivalDates: form, passportCountry: passportCountryForm } } = useVisaStep();
  const t = useTranslations("components.visaArrivalDatesStep");

  const flyToCountry = passportCountryForm.watch('flyToCountry').name;

  const tomorrow = addDays(new Date(), 1);

  const arrivalDate = form.watch('arrivalDate');

  return (
    <VisaStepContainer>
      <VisaInfo />
      <H1>{t("title")}</H1>
      <ControlledDatePicker
        disabled={{ before: tomorrow }}
        label={t("arrivalDate", { country: flyToCountry })}
        name="arrivalDate"
        control={form.control}
      />
      <ControlledDatePicker
        disabled={arrivalDate ? { before: arrivalDate } : undefined}
        label={t("departureDate", { country: flyToCountry })}
        name="departureDate"
        control={form.control}
      />
    </VisaStepContainer>
  );
}