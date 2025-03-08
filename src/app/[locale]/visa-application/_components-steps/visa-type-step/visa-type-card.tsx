import { Card } from "@/components/ui/card";
import { VisaDuration } from "@/types/visa/visa-duration";
import { useTranslations } from "next-intl";
import { MdAttachMoney, MdOutlineTimer, MdCalendarMonth, MdCheckCircle } from "react-icons/md";
import { FaSync, FaBan } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface VisaTypeCardProps extends VisaDuration {
  isSelected?: boolean;
  onSelect?: () => void;
}

export function VisaTypeCard({ 
  shortName, 
  officialName, 
  price, 
  days, 
  extendable, 
  maxExtensions, 
  maxTotalDays,
  isSelected = false,
  onSelect
}: VisaTypeCardProps) {
  const t = useTranslations('components.visaTypeCard');

  return (
    <Card 
      className={cn(
        "p-4 hover:shadow-lg transition-all duration-200 cursor-pointer relative border-2",
        isSelected && "border-primary border-2 bg-primary/5"
      )}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-2 right-2">
          <MdCheckCircle className="w-5 h-5 text-primary" />
        </div>
      )}
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-primary">{shortName}</h3>
            <p className="text-xs text-muted-foreground">{officialName}</p>
          </div>
          <div className="flex items-center gap-1 text-green-600">
            <MdAttachMoney className="w-4 h-4" />
            <span className="font-semibold text-sm">{t('price', { price })}</span>
          </div>
        </div>

        {/* Duration Info */}
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="flex items-center gap-1">
            <MdOutlineTimer className="w-4 h-4 text-blue-500" />
            <span>{t('days', { days })}</span>
          </div>

          <div className="flex items-center gap-1">
            {extendable ? (
              <>
                <FaSync className="w-3.5 h-3.5 text-purple-500" />
                <span>{t('extendable', { count: maxExtensions })}</span>
              </>
            ) : (
              <>
                <FaBan className="w-3.5 h-3.5 text-red-500" />
                <span>{t('nonExtendable')}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 col-span-2">
            <MdCalendarMonth className="w-4 h-4 text-orange-500" />
            <span>{t('maxDays', { days: maxTotalDays })}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}