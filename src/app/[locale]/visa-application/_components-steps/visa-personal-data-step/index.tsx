import { H1, Small } from "@/components/ui/typography";
import { VisaStepContainer } from "../../_components/visa-step-container";
import { VisaInfo } from "../../_components/visa-info";
import { useVisaStep } from "../../_providers/visa-step-provider";
import { ControlledInput } from "@/components/form-controls/controlled-input";
import { ControlledDatePicker } from "@/components/form-controls/controlled-date-picker";
import { useTranslations } from "next-intl";

export function VisaPersonalDataStep() {
  const {forms: {visaPersonalData}} = useVisaStep()
  const t = useTranslations("components.visaPersonalDataStep");

  return (
    <VisaStepContainer>
      <VisaInfo />
      <H1>{t("title")}</H1>
      <Small className="text-muted-foreground">{t("subtitle")}</Small>
      <ControlledInput name="firstName" control={visaPersonalData.control} label={t("firstName")} />
      <ControlledInput name="lastName" control={visaPersonalData.control} label={t("lastName")} />
      <ControlledDatePicker name="dateOfBirth" control={visaPersonalData.control} label={t("dateOfBirth")} />
    </VisaStepContainer>
  );
}