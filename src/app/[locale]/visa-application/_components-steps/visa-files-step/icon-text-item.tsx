import { ReactNode } from "react";

interface IconTextItemProps {
  icon: ReactNode;
  text: string;
}

export function IconTextItem({ icon, text }: IconTextItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-primary">
        {icon}
      </div>
      <div>{text}</div>
    </div>
  );
} 