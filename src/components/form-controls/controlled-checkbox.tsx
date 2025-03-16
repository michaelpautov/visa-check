'use client'
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl } from "./form-control";
import { Label } from "@/components/ui/label";

interface ControlledCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: Record<string, unknown>;
  label?: string;
  disabled?: boolean;
  className?: string;
  description?: string;
}

export function ControlledCheckbox<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  disabled = false,
  className,
  description,
}: ControlledCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, ...field }, fieldState: { error, isTouched } }) => (
        <FormControl error={isTouched ? error : undefined}>
          <div className="flex items-start space-x-2">
            <Checkbox
              {...field}
              id={name}
              checked={!!value}
              onCheckedChange={onChange}
              disabled={disabled}
              className={className}
            />
            {(label || description) && (
              <div className="grid gap-1.5 leading-none">
                {label && (
                  <Label htmlFor={name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                  </Label>
                )}
                {description && (
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>
        </FormControl>
      )}
    />
  );
}
