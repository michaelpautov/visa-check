'use client'

import { Control, FieldValues, Path } from "react-hook-form";
import { ControlledSelect, SelectOption } from "@/components/form-controls/controlled-select";
import { useTranslations } from "next-intl";


const PAYMENT_METHOD_OPTIONS: SelectOption[] = [
  { value: "permata", label: "Permata" },
  { value: "USDT_TRC20", label: "USDT TRC20" },
];

interface ControlledPaymentMethodProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: Record<string, unknown>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function ControlledPaymentMethod<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  disabled = false,
  className,
}: ControlledPaymentMethodProps<T>) {
  const t = useTranslations('components.controlledPaymentMethod');
  return (
    <ControlledSelect
      name={name}
      control={control}
      options={PAYMENT_METHOD_OPTIONS}
      rules={rules}
      label={label || t('label')}
      placeholder={placeholder || t('placeholder')}
      disabled={disabled}
      className={className}
    />
  );
}
