import { Card, CardContent } from "@/components/ui/card";
import { Small } from "@/components/ui/typography";
import { useVisaStep } from "../../_providers/visa-step-provider";
import { useTranslations } from "next-intl";
import { SquareFlag } from "@/components/square-flag";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function OrderCard() {
  const { forms: { visaPersonalData, passportCountry, visaType } } = useVisaStep();
  const t = useTranslations('components.orderCard');
  
  const firstName = visaPersonalData.watch('firstName')
  const lastName = visaPersonalData.watch('lastName');
  
  const destinationCountry = passportCountry.watch('flyToCountry')

  const { days, maxTotalDays, shortName,officialName } = visaType.watch('selectedVisas.0')
  
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <Card className="overflow-hidden">
      <div className="bg-primary p-4 text-white">
        <div className="flex items-center gap-2">
          <SquareFlag code={destinationCountry.code} />
          <span className="font-medium">{destinationCountry.name} {officialName} ({shortName})</span>
        </div>
      </div>
      <CardContent className="p-4 space-y-4">
        {/* Visa details */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Small className="text-muted-foreground">{t('validFor')}</Small>
            <span className="text-sm font-medium">{days} {t('days')}</span>
          </div>
          <div className="flex justify-between items-center">
            <Small className="text-muted-foreground">{t('maxStay')}</Small>
            <span className="text-sm font-medium">{maxTotalDays} {t('days')}</span>
          </div>
          <div className="flex justify-between items-center">
            <Small className="text-muted-foreground">{t('entries')}</Small>
            <span className="text-sm font-medium">{t('singleEntry')}</span>
          </div>
        </div>
        
        {/* Traveler section */}
        <div>
          <h3 className="text-sm font-medium mb-2">{t('travelers')}</h3>
          <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-md">
            <Avatar className="h-8 w-8 bg-primary/10">
              <AvatarFallback className="text-xs text-primary">{initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{firstName} {lastName}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}