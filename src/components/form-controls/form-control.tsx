import { Label } from "@/components/ui/label";

interface FormControlProps {
  label?: string;
  children: React.ReactNode;
}

export function FormControl({ label, children }: FormControlProps) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      {children}
    </div>
  );
} 