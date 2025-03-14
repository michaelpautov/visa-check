'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl } from "./form-control";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
}

interface ControlledSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
  rules?: Record<string, unknown>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function ControlledSelect<T extends FieldValues>({
  name,
  control,
  options,
  rules,
  label,
  placeholder,
  disabled = false,
  className,
}: ControlledSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <FormControl label={label} error={error}>
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <SelectTrigger id={name} className={className}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      )}
    />
  );
}
