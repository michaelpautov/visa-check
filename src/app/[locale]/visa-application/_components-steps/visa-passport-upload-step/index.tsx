import { H1 } from "@/components/ui/typography";
import { VisaStepContainer } from "../../_components/visa-step-container";
import { useTranslations } from "next-intl";
import { MdSecurity } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { IconTextItem } from "./icon-text-item";
import { ControlledFileInput } from "@/components/form-controls/controlled-file-input";
import { useVisaStep } from "../../_providers/visa-step-provider";

export function VisaPassportUploadStep() {
  const t = useTranslations("components.visaPassportUploadStep");
  const { forms: { visaPassportUpload: visaFiles } } = useVisaStep();

  return (
    <VisaStepContainer>
      <H1>{t("title")}</H1>
      <div className="space-y-6">
        <IconTextItem 
          icon={<MdSecurity size={32} />}
          text={t("secureEncryption")}
        />
        
        <IconTextItem 
          icon={<FaUserShield size={32} />}
          text={t("dataOwnership")}
        />
      </div>
      <ControlledFileInput
        name="passport"
        control={visaFiles.control}
        label={t("passport")}
      />
    </VisaStepContainer>
  );
}