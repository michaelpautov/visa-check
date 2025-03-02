import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

interface VisaDuration {
  days: number;
  price: number;
  extendable: boolean;
  maxExtensions: number;
  maxTotalDays: number;
}

interface VisaDurationProps {
  duration: VisaDuration;
  onClick: () => void;
  isActive: boolean;
}

export function VisaDuration({ duration, onClick, isActive }: VisaDurationProps) {
  const t = useTranslations("components.visaDuration");
  
  return (
    <Card onClick={onClick} className={`cursor-pointer ${isActive ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className="space-y-2 pt-6">
        <p className="text-sm">{t("stayDuration", { days: duration.days })}</p>
        {duration.price > 0 && (
          <p className="text-sm">{t("price", { price: duration.price })}</p>
        )}
        {duration.extendable && (
          <p className="text-sm">
            {t("extendable", { 
              maxExtensions: duration.maxExtensions,
              maxDays: duration.maxTotalDays 
            })}
          </p>
        )}
      </CardContent>
    </Card>
  );
} 