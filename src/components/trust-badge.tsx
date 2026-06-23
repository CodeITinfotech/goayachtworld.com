import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TrustBadgeProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function TrustBadge({ icon, title, description, className }: TrustBadgeProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
