import { H1 } from "@/components/ui/typography";
import { VisaStepContainer } from "../../_components/visa-step-container";
import { ExpectDeliveryDate } from "./expect-delivery-date";
import { OrderCard } from "./order-card";
import { useTranslations } from "next-intl";

export function VisaOrderStep() {
  const t = useTranslations("components.visaOrderStep");
  
  return (
    <VisaStepContainer>
      <H1>{t("title")}</H1>
      <ExpectDeliveryDate />
      <OrderCard />
    </VisaStepContainer>
  )
}