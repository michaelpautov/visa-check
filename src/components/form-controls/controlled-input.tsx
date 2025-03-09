'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl } from "./form-control";

interface ControlledInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: Record<string, unknown>;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  type = "text",
  disabled = false,
  className,
}: ControlledInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl label={label} error={error}>
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={className}
            {...field}
          />
        </FormControl>
      )}
    />
  );
}
