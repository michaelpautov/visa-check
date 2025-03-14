import { H1 } from "@/components/ui/typography";
import { VisaStepContainer } from "../../_components/visa-step-container";
import { ExpectDeliveryDate } from "./expect-delivery-date";
import { OrderCard } from "./order-card";
import { useTranslations } from "next-intl";
import { ControlledCheckbox } from "@/components/form-controls/controlled-checkbox";
import { useVisaStep } from "../../_providers/visa-step-provider";

export function VisaOrderStep() {
  const t = useTranslations("components.visaOrderStep");
  
  const { forms: { visaOrder } } = useVisaStep();

  return (
    <VisaStepContainer>
      <H1>{t("title")}</H1>
      <ExpectDeliveryDate />
      <OrderCard />
      <ControlledCheckbox
        name="agreed"
        control={visaOrder.control}
        label={t("agreed")}
      />
    </VisaStepContainer>
  )
}