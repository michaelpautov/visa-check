'use client'
import { Button } from "@/components/ui/button";
import { useNavigateBack } from "@/hooks/use-navigate-back";
import { cn } from "@/lib/utils";
import { FaChevronLeft } from "react-icons/fa6";

type VisaApplicationHeaderProps = {
  className?: string;
}

export function VisaApplicationHeader({ className }: VisaApplicationHeaderProps) {
  const navigateBack = useNavigateBack();
  
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <Button variant="ghost" onClick={navigateBack}>
        <FaChevronLeft className="w-4 h-4" />
      </Button>
    </div>
  );
}