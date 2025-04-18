'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { CountrySelect } from "./country-select";
import { FormControl } from "./form-control";

interface ControlledCountrySelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  rules?: Record<string, unknown>;
  disabled?: boolean;
}

export function ControlledCountrySelect<T extends FieldValues>({
  name,
  control,
  placeholder,
  searchPlaceholder,
  label,
  rules,
  disabled = false
}: ControlledCountrySelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl label={label} error={error}>
          <CountrySelect
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            searchPlaceholder={searchPlaceholder}
            disabled={disabled}
          />
        </FormControl>
      )}
    />
  );
} 