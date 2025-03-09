'use client'
import { H1, Lead } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ROUTES_PATH } from "@/constants/routes";
import { useNavigate } from "@/hooks/use-navigate";
import { LOCAL_STORAGE_KEYS } from "@/constants/local-storage";
import { useEffect, useState } from "react";

export function HomeTab() {
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
    <div className="flex flex-col items-center mx-auto space-y-8 py-8 h-full">
      {/* Логотип */}
      <div className="w-48 text-center">
        <span className="text-6xl font-bold">iVisa</span>
      </div>

      {/* Основной контент */}
      <div className="flex flex-col text-center flex-1">
        <div className="space-y-6">
          <H1>
            Сосредоточьтесь на путешествии, не на бумагах
          </H1>
          
          <Lead className="text-muted-foreground">
            Получите ваши визы без стресса с iVisa
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
              Продолжить с заказом
            </Button>
          )}
          <Button 
            onClick={handleOpenNewVisaApplication}
            variant={hasSavedApplication ? "outline" : "default"} 
            size="lg" 
            className="w-full"
          >
            Начать новое заявление
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