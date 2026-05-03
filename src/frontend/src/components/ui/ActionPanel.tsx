import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ArrowRight, MessageSquare, RefreshCw, Users, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  count?: number;
  onAction: () => void;
}

export interface ActionPanelProps {
  actions?: ActionItem[];
  title?: string;
  onViewAll?: () => void;
  isLoading?: boolean;
  "data-ocid"?: string;
}

// ─── Fallback actions ─────────────────────────────────────────────────────────

function buildFallbackActions(): ActionItem[] {
  return [
    {
      id: "high-score-leads",
      title: "Contact high-score leads",
      description: "8 leads with score 85+ are ready for outreach",
      priority: "high",
      count: 8,
      onAction: () => {},
    },
    {
      id: "follow-up-replies",
      title: "Follow up: replies pending",
      description: "3 leads replied but haven't received a follow-up yet",
      priority: "medium",
      count: 3,
      onAction: () => {},
    },
    {
      id: "re-engage-cold",
      title: "Re-engage cold leads",
      description: "5 leads went cold this week — revive with a new pitch",
      priority: "low",
      count: 5,
      onAction: () => {},
    },
  ];
}

// ─── Priority config ──────────────────────────────────────────────────────────

function priorityConfig(priority: "high" | "medium" | "low") {
  return {
    high: {
      bar: "bg-destructive",
      badge: "bg-destructive/12 text-destructive",
      label: "High",
      icon: <Zap className="w-3 h-3" />,
    },
    medium: {
      bar: "bg-warning",
      badge: "bg-warning/12 text-warning",
      label: "Medium",
      icon: <MessageSquare className="w-3 h-3" />,
    },
    low: {
      bar: "bg-primary",
      badge: "bg-primary/12 text-primary",
      label: "Low",
      icon: <RefreshCw className="w-3 h-3" />,
    },
  }[priority];
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ActionPanelSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="skeleton-shimmer w-5 h-5 rounded" />
        <div className="skeleton-shimmer h-4 w-28 rounded" />
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="space-y-2 py-1">
          <div className="flex items-center justify-between gap-3">
            <div className="skeleton-shimmer h-3 w-40 rounded" />
            <div className="skeleton-shimmer h-5 w-8 rounded-full" />
          </div>
          <div className="skeleton-shimmer h-3 w-56 rounded" />
          <div className="skeleton-shimmer h-7 w-20 rounded" />
        </div>
      ))}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function ActionPanelEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center mb-3">
        <Zap className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground mb-1">
        No actions right now
      </p>
      <p className="text-xs text-muted-foreground">
        Add more leads to get AI-powered suggestions.
      </p>
    </div>
  );
}

// ─── ActionPanel ──────────────────────────────────────────────────────────────

export function ActionPanel({
  actions: propActions,
  title = "AI Suggestions",
  onViewAll,
  isLoading = false,
  "data-ocid": ocid,
}: ActionPanelProps) {
  if (isLoading) return <ActionPanelSkeleton />;

  const actions =
    propActions && propActions.length > 0
      ? propActions
      : buildFallbackActions();

  return (
    <div
      data-ocid={ocid}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-primary" />
            </div>
            <h2 className="font-semibold font-display text-sm text-foreground">
              {title}
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 ml-8">
            Based on your pipeline
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          <Users className="w-3 h-3" />
          {actions.length} actions
        </div>
      </div>

      <Separator />

      {/* Action items */}
      <div className="divide-y divide-border/60">
        <AnimatePresence>
          {actions.length === 0 ? (
            <ActionPanelEmpty />
          ) : (
            actions.map((action, index) => {
              const config = priorityConfig(action.priority);
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3 px-4 py-3 group/item hover:bg-muted/30 transition-fast"
                  data-ocid={ocid ? `${ocid}.action.${index + 1}` : undefined}
                >
                  {/* Priority bar */}
                  <div
                    className={cn("w-1 rounded-full shrink-0 mt-1", config.bar)}
                    style={{ height: "calc(100% - 4px)", minHeight: 32 }}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground leading-snug truncate">
                        {action.title}
                      </p>
                      {action.count !== undefined && (
                        <span
                          className={cn(
                            "shrink-0 text-xs font-bold px-1.5 py-0 rounded-full leading-5",
                            config.badge,
                          )}
                        >
                          {action.count}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
                      {action.description}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className={cn(
                        "h-7 px-2.5 text-xs gap-1 mt-1 transition-fast active:scale-[0.97]",
                        "opacity-0 group-hover/item:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2",
                      )}
                      onClick={action.onAction}
                      data-ocid={
                        ocid ? `${ocid}.action_button.${index + 1}` : undefined
                      }
                    >
                      {config.icon}
                      Take Action
                    </Button>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <Separator />
      <div className="px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full h-8 text-xs text-primary hover:text-primary hover:bg-primary/8 gap-1.5 transition-fast"
          onClick={onViewAll}
          data-ocid={ocid ? `${ocid}.view_all_button` : undefined}
        >
          View All Actions
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
