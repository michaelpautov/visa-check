import { H1 } from "@/components/ui/typography";
import { VisaStepContainer } from "../../_components/visa-step-container";
import { ExpectDeliveryDate } from "./expect-delivery-date";
import { OrderCard } from "./order-card";
import { useTranslations } from "next-intl";
import { ControlledCheckbox } from "@/components/form-controls/controlled-checkbox";
import { useVisaStep } from "../../_providers/visa-step-provider";
import { useEffect } from "react";

export function VisaOrderStep() {
  const t = useTranslations("components.visaOrderStep");
  
  const { forms: { visaOrder }, setCanProceed } = useVisaStep();
  
  // Watch the agreed checkbox value
  const agreed = visaOrder.watch("agreed");
  
  // Get the touched state for the agreed field
  const isTouched = visaOrder.formState.touchedFields.agreed;
  
  // Update canProceed when the agreed value changes
  useEffect(() => {
    // Only validate if the field has been touched or if agreed is true
    if (isTouched || agreed === true) {
      visaOrder.trigger("agreed").then(isValid => {
        if (isValid && agreed === true) {
          setCanProceed(true);
        } else {
          setCanProceed(false);
        }
      });
    } else {
      // Don't show validation errors until user interacts with the checkbox
      setCanProceed(false);
    }
  }, [agreed, isTouched, visaOrder, setCanProceed]);

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