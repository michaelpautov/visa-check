'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { CountrySelect } from "./country-select";
import { Label } from "@/components/ui/label";

interface ControlledCountrySelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  rules?: Record<string, unknown>;
}

export function ControlledCountrySelect<T extends FieldValues>({
  name,
  control,
  placeholder,
  searchPlaceholder,
  label,
  rules
}: ControlledCountrySelectProps<T>) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <CountrySelect
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
          />
        )}
      />
    </div>
  );
} 