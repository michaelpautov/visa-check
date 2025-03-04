'use client'
import { H3 } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { CountrySelect, type Country } from "@/components/form-controls/country-select";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export function HomePageClient() {
  const t = useTranslations("components.homePageForm");
  const commonT = useTranslations("common");

  const [country, setCountry] = useState<Country | null>(null);

  return (
    <div className="flex flex-col items-center grow p-8 h-full">
      <div className="flex flex-col items-center">
        <H3>{t("title")}</H3>
        <div className="w-full mt-4 space-y-4 overflow-hidden">
          <CountrySelect
            value={country}
            onChange={setCountry}
            placeholder={t("selectCountry")}
            searchPlaceholder={t("searchCountry")}
          />
        </div>
      </div>
      <div className="w-full fixed bottom-0 p-8">
        <Button 
          className="w-full" 
          disabled={!country} 
          onClick={() => console.log(country)}
        >
          {commonT("continue")}
        </Button>
      </div>
    </div>
  );
}
