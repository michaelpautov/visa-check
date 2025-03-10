import { H1, Small } from "@/components/ui/typography";
import { VisaStepContainer } from "../../_components/visa-step-container";
import { useTranslations } from "next-intl";
import { BiTime } from "react-icons/bi";
import { MdSecurity } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { IconTextItem } from "./icon-text-item";

export function VisaFilesStep() {
  const t = useTranslations("components.visaFilesStep");

  return (
    <VisaStepContainer>
      <H1>{t("title")}</H1>
      <Small className="text-muted-foreground">{t("ifYouDontHaveIt")}</Small>
      <div className="space-y-6">
        <IconTextItem 
          icon={<BiTime size={32} />}
          text={t("scanPassport")}
        />
        
        <IconTextItem 
          icon={<MdSecurity size={32} />}
          text={t("secureEncryption")}
        />
        
        <IconTextItem 
          icon={<FaUserShield size={32} />}
          text={t("dataOwnership")}
        />
      </div>
    </VisaStepContainer>
  );
}