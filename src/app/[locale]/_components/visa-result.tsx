import { useTranslations } from "next-intl";
import { VisaDuration } from "./visa-duration";
import { useState } from "react";

interface VisaDurationType {
  days: number;
  price: number;
  extendable: boolean;
  maxExtensions: number;
  maxTotalDays: number;
}

interface VisaResultProps {
  result: {
    canEnter: boolean;
    entryType: 'visa-free' | 'visa-on-arrival' | 'visa-required';
    duration: VisaDurationType[];
  };
  onVisaSelect?: (duration: VisaDurationType) => void;
}

export function VisaResult({ result, onVisaSelect }: VisaResultProps) {
  const t = useTranslations("components.visaResult");
  const [selectedVisaIndex, setSelectedVisaIndex] = useState<number | null>(null);

  const handleVisaSelect = (index: number) => {
    setSelectedVisaIndex(index);
    if (onVisaSelect) {
      onVisaSelect(result.duration[index]);
    }
  };

  return (
    <div className={`p-4 rounded-lg bg-secondary`}>
      <div className="font-medium mb-2">
        {result.entryType === 'visa-free' && t("visaFree")}
        {result.entryType === 'visa-on-arrival' && t("visaOnArrival")}
        {result.entryType === 'visa-required' && t("visaRequired")}
      </div>
      
      {result.duration.length > 0 && (
        <div className="space-y-2">
          {result.duration.map((duration, index) => (
            <VisaDuration onClick={() => handleVisaSelect(index)} key={index} isActive={selectedVisaIndex === index} duration={duration} />
          ))}
        </div>
      )}
    </div>
  );
} 