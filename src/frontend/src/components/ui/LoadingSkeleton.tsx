import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant?: "card" | "list" | "table" | "metric" | "page";
  count?: number;
  className?: string;
}

function MetricSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="skeleton-shimmer h-3 w-24" />
          <Skeleton className="skeleton-shimmer h-7 w-20" />
          <Skeleton className="skeleton-shimmer h-3 w-16" />
        </div>
        <Skeleton className="skeleton-shimmer w-9 h-9 rounded-lg shrink-0" />
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="skeleton-shimmer w-10 h-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="skeleton-shimmer h-4 w-3/4" />
          <Skeleton className="skeleton-shimmer h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="skeleton-shimmer h-3 w-full" />
      <Skeleton className="skeleton-shimmer h-3 w-5/6" />
      <Skeleton className="skeleton-shimmer h-3 w-2/3" />
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0">
      <Skeleton className="skeleton-shimmer w-8 h-8 rounded-full shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="skeleton-shimmer h-3.5 w-48" />
        <Skeleton className="skeleton-shimmer h-3 w-32" />
      </div>
      <Skeleton className="skeleton-shimmer h-6 w-16 rounded-full shrink-0" />
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0">
      <Skeleton className="skeleton-shimmer h-3.5 w-32 shrink-0" />
      <Skeleton className="skeleton-shimmer h-3.5 w-24 shrink-0" />
      <Skeleton className="skeleton-shimmer h-3.5 flex-1" />
      <Skeleton className="skeleton-shimmer h-6 w-16 rounded-full shrink-0" />
      <Skeleton className="skeleton-shimmer h-7 w-20 rounded-lg shrink-0" />
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="skeleton-shimmer h-6 w-40" />
          <Skeleton className="skeleton-shimmer h-4 w-64" />
        </div>
        <Skeleton className="skeleton-shimmer h-9 w-28 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {["m1", "m2", "m3", "m4"].map((k) => (
          <MetricSkeleton key={k} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {["c1", "c2"].map((k) => (
          <CardSkeleton key={k} />
        ))}
      </div>
    </div>
  );
}

export function LoadingSkeleton({
  variant = "card",
  count = 3,
  className,
}: LoadingSkeletonProps) {
  const keys = Array.from({ length: count }, (_, i) => `sk-${i}`);
  if (variant === "page") return <PageSkeleton />;
  if (variant === "metric") {
    return (
      <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
        {keys.map((k) => (
          <MetricSkeleton key={k} />
        ))}
      </div>
    );
  }
  if (variant === "list") {
    return (
      <div
        className={cn(
          "bg-card border border-border rounded-xl overflow-hidden",
          className,
        )}
      >
        {keys.map((k) => (
          <ListSkeleton key={k} />
        ))}
      </div>
    );
  }
  if (variant === "table") {
    return (
      <div
        className={cn(
          "bg-card border border-border rounded-xl overflow-hidden",
          className,
        )}
      >
        {keys.map((k) => (
          <TableRowSkeleton key={k} />
        ))}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className,
      )}
    >
      {keys.map((k) => (
        <CardSkeleton key={k} />
      ))}
    </div>
  );
}
