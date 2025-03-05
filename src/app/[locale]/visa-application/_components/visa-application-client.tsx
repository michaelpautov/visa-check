'use client'
import { H1 } from "@/components/ui/typography";
import { useState } from "react";
import { CountrySelect, type Country } from "@/components/form-controls/country-select";    
import { Label } from "@/components/ui/label";
import { BALI_COUNTRY_OBJECT } from "@/constants/bali-country-object";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@/hooks/use-navigate";
import { ROUTES_PATH } from "@/constants/routes";

export function VisaApplicationClient() {
  const [passportFrom, setPassportFrom] = useState<Country | null>(null);
  const [countryFlyTo, setCountryFlyTo] = useState<Country | null>(BALI_COUNTRY_OBJECT);

  const openPassportFromPage = useNavigate(`/${ROUTES_PATH.VISA_APPLICATION}/${passportFrom?.code}`);

  return (
    <div className="flex flex-col items-center flex-1 h-full min-h-full">
      <H1>Какие у вас планы на путешествие?</H1>
      <div className="w-full mt-4 space-y-1 overflow-hidden">
        <Label>Мой паспорт из</Label>
        <CountrySelect
          value={passportFrom}
          onChange={setPassportFrom}
          placeholder="Выберите"
          searchPlaceholder="Поиск страны"
        />
      </div>
      <div className="w-full mt-4 space-y-1 overflow-hidden">
        <Label>Я еду в</Label>
        <CountrySelect
          disabled
          value={countryFlyTo}
          onChange={setCountryFlyTo}
          placeholder="Выбирите"
          searchPlaceholder="Поиск страны"
        />
      </div>
      
      <div className="flex-1 flex items-end w-full mt-8 mb-4">
        <Button 
          className="w-full" 
          size="lg"
          disabled={!passportFrom}
          onClick={openPassportFromPage}
        >
          Продолжить
        </Button>
      </div>
    </div>
  )
}
