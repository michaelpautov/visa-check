import { FiClock } from "react-icons/fi";
import { useTranslations } from "next-intl";

export function ExpectDeliveryDate() {
  const t = useTranslations("components.expectDeliveryDate");
  
  return (
    <div className="bg-muted rounded-xl p-3 flex items-center gap-2">
      <FiClock className="text-muted-foreground text-lg" />
      <span className="text-muted-foreground font-semibold text-xs">
        {t("text")}
      </span>
    </div>
  )
}