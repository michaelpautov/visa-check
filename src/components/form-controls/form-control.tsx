import { Label } from "@/components/ui/label";
import { FieldError } from "react-hook-form";
interface FormControlProps {
  label?: string;
  error?: FieldError;
  children: React.ReactNode;
}

export function FormControl({ label, children, error }: FormControlProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      {children}
      {error && <p className="mt-1 text-sm text-destructive">{error.message}</p>}
    </div>
  );
} 