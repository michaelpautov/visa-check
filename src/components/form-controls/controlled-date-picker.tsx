'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { DatePicker, DatePickerProps } from "./date-picker";
import { FormControl } from "./form-control";

type ControlledDatePickerProps<T extends FieldValues> = DatePickerProps & {
  name: Path<T>;
  control: Control<T>;
  rules?: Record<string, unknown>;
  className?: string;
  placeholder?: string;
  label?: string;
  min?: Date;
}

export function ControlledDatePicker<T extends FieldValues>({
  name,
  control,
  rules,
  className,
  placeholder,
  label,
  ...props
}: ControlledDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
        <FormControl label={label} error={error}>
          <DatePicker
            {...field}
            {...props}
            value={value as Date}
            onChange={onChange}
            className={className}
            placeholder={placeholder}
          />
        </FormControl>
      )}
    />
  );
}
