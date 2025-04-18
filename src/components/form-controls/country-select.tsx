'use client'
import { useState } from "react";
import { countries } from 'countries-list';
import { useTranslations } from 'next-intl';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { getFlag } from "@/lib/get-flag";

export interface Country {
  code: string;
  name: string;
  native: string;
}

interface CountrySelectProps {
  value: Country | null;
  onChange: (country: Country | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
}

export function CountrySelect({
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  disabled = false,
}: CountrySelectProps) {
  const t = useTranslations('components.countrySelect');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const countriesList = Object.entries(countries).map(([code, country]) => ({
    code,
    ...country
  }));

  const filteredCountries = countriesList.filter((country) => {
    if (!search) return true;
    
    const searchLower = search.toLowerCase();
    return (
      country.name.toLowerCase().includes(searchLower) || 
      country.native.toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-10"
          disabled={disabled}
        >
          {value ? (
            <div className="flex items-center gap-2">
              {getFlag(value.code)}
              <span>{value.name}</span>
            </div>
          ) : (
            <span>{placeholder || t('placeholder')}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <div className="flex flex-col">
          <Input
            placeholder={searchPlaceholder || t('searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0"
          />
          <div className="max-h-[300px] overflow-y-auto">
            {filteredCountries.map((country) => (
              <Button
                key={country.code}
                variant="ghost"
                role="option"
                onClick={() => {
                  onChange(country);
                  setOpen(false);
                }}
                className={cn(
                  "w-full justify-start gap-2",
                  value?.code === country.code && "bg-accent"
                )}
              >
                {getFlag(country.code)}
                <span>{country.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">
                  ({country.native})
                </span>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
} 