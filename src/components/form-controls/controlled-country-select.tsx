'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { CountrySelect } from "./country-select";

interface ControlledCountrySelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
  searchPlaceholder: string;
  rules?: Record<string, unknown>;
}

export function ControlledCountrySelect<T extends FieldValues>({
  name,
  control,
  placeholder,
  searchPlaceholder,
  rules
}: ControlledCountrySelectProps<T>) {
  return (
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
  );
} 