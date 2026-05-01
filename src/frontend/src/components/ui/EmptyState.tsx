import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
  ctaVariant?: "default" | "outline" | "ghost";
  className?: string;
  "data-ocid"?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  onCta,
  ctaVariant = "default",
  className,
  "data-ocid": ocid,
}: EmptyStateProps) {
  return (
    <div
      data-ocid={ocid}
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl border border-dashed border-border bg-muted/20",
        className,
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-5">
          {description}
        </p>
      )}
      {ctaLabel && onCta && (
        <Button
          variant={ctaVariant}
          size="sm"
          onClick={onCta}
          data-ocid={ocid ? `${ocid}.cta_button` : undefined}
        >
          {ctaLabel}
        </Button>
      )}
    </div>
  );
}
