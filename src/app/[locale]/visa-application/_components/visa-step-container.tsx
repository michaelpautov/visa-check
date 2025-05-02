'use client'

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
}

export function VisaStepContainer({ children, className }: Props) {
  return (
    <div className={cn("space-y-4 border-0", className)}>
      {children}
    </div>
  );
}