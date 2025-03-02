'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { DatePicker } from "./date-picker";

interface ControlledDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: Record<string, unknown>;
  className?: string;
  placeholder?: string;
}

export function ControlledDatePicker<T extends FieldValues>({
  name,
  control,
  rules,
  className,
  placeholder
}: ControlledDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ...field } }) => (
        <DatePicker
          value={value as Date}
          onChange={onChange}
          className={className}
          placeholder={placeholder}
          {...field}
        />
      )}
    />
  );
}
