'use client'
import { H1, Lead } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ROUTES_PATH } from "@/constants/routes";
import { useNavigate } from "@/hooks/use-navigate";
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function HomeTab() {
  const t = useTranslations('homePage');
  const [hasSavedApplication, setHasSavedApplication] = useState(false);
  
  useEffect(() => {
    // Проверяем localStorage только на стороне клиента
    setHasSavedApplication(
      Boolean(localStorage.getItem(LOCAL_STORAGE_KEYS.VISA_APPLICATION_STATE))
    );
  }, []);

  const openVisaApplication = useNavigate(ROUTES_PATH.VISA_APPLICATION);

  const handleOpenNewVisaApplication = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.VISA_APPLICATION_STATE);
    openVisaApplication();
  }

  return (
    <div className="flex flex-col items-center mx-auto space-y-8 px-6 py-8 h-full">
      {/* Логотип */}
      <div className="w-48 text-center">
        <span className="text-6xl font-bold">iVisa</span>
      </div>

      {/* Основной контент */}
      <div className="flex flex-col text-center flex-1">
        <div className="space-y-6">
          <H1>
            {t('heading')}
          </H1>
          
          <Lead className="text-muted-foreground">
            {t('subheading')}
          </Lead>
        </div>

        {/* Кнопки действий */}
        <div className="space-y-4 mt-auto">
          {hasSavedApplication && (
            <Button 
              onClick={openVisaApplication}
              size="lg" 
              className="w-full"
            >
              {t('continueOrder')}
            </Button>
          )}
          <Button 
            onClick={handleOpenNewVisaApplication}
            variant={hasSavedApplication ? "outline" : "default"} 
            size="lg" 
            className="w-full"
          >
            {t('startNewApplication')}
          </Button>
        </div>

        {/* Trustpilot виджет */}
        {/* <div className="w-full">
          <div
            className="trustpilot-widget"
            data-locale="ru-RU"
            data-template-id="53aa8807dec7e10d38f59f32"
            data-businessunit-id="YOUR_BUSINESS_UNIT_ID"
            data-style-height="120px"
            data-style-width="100%"
            data-theme="light"
          >
            <a href="https://www.trustpilot.com/review/ivisa.com" target="_blank" rel="noopener">
              Trustpilot
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}