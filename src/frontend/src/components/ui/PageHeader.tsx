import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb?: string[];
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn("flex items-start justify-between gap-4 mb-6", className)}
    >
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-foreground font-display tracking-tight truncate">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5 text-truncate-2">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      )}
    </div>
  );
}
