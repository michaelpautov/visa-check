import { SquareFlag } from "@/components/square-flag";
import { useVisaStep } from "../_providers/visa-step-provider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export function VisaInfo() {
  const { forms } = useVisaStep();
  const { watch: watchVisaType } = forms.visaType;
  const { watch: watchPassportCountry } = forms.passportCountry;
  const t = useTranslations('components.visaInfo');

  const visaType = watchVisaType('selectedVisas');
  const code = watchPassportCountry('flyToCountry').code;

  return (
    <Accordion type="single" collapsible className="px-2 rounded bg-muted border text-xs font-medium w-full">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="py-2">
          <div className="flex flex-row items-center gap-2 text-xs font-medium">
            <SquareFlag code={code} /> {visaType.map((visa) => visa.shortName).join(', ')}
          </div>
        </AccordionTrigger>
        <AccordionContent className="py-2">
          <div className="grid gap-y-1">
            {visaType.map((visa) => (
              <div 
                key={visa.shortName} 
                className="grid grid-cols-[40%_15%_25%_20%] gap-x-2 items-center text-xs"
              >
                <span className="font-medium">{visa.shortName}</span>
                <span>{t('days', { days: visa.days })}</span>
                <span>{visa.extendable ? t('maxDays', { days: visa.maxTotalDays }) : t('notExtendable')}</span>
                <span>{visa.price}$</span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}