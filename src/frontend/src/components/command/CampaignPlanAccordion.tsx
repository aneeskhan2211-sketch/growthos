import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronDown, MapPin, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { CampaignPlan } from "./mockData";

interface Props {
  plan: CampaignPlan;
}

export function CampaignPlanAccordion({ plan }: Props) {
  const [openWeeks, setOpenWeeks] = useState<Set<number>>(new Set([1]));

  const toggle = (week: number) => {
    setOpenWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  };

  const WEEK_COLORS = [
    "bg-primary/10 text-primary border-primary/20",
    "bg-score-warning/10 score-warning border-yellow-200",
    "bg-success/10 text-success border-success/20",
    "bg-premium-accent-light text-premium-accent border-purple-200",
  ];

  return (
    <div data-ocid="campaign_plan.section">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-4 h-4 text-primary" />
        <h3 className="font-display font-bold text-foreground">
          Sample Campaign Plan
        </h3>
        <Badge variant="outline" className="text-xs border-border">
          <Calendar className="w-3 h-3 mr-1" /> {plan.duration}
        </Badge>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
        {/* Plan header */}
        <div className="gradient-premium px-5 py-4 border-b border-border">
          <div className="font-semibold text-foreground">{plan.title}</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-premium-accent" />
            <span className="text-xs text-muted-foreground">
              {plan.expectedROI}
            </span>
          </div>
        </div>

        {/* Weeks */}
        <div className="divide-y divide-border">
          {plan.weeks.map((week, idx) => {
            const isOpen = openWeeks.has(week.week);
            return (
              <div
                key={week.week}
                data-ocid={`campaign_plan.week.${week.week}`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/20 transition-smooth text-left"
                  onClick={() => toggle(week.week)}
                  data-ocid={`campaign_plan.week_toggle.${week.week}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${WEEK_COLORS[idx % WEEK_COLORS.length]}`}
                    >
                      Week {week.week}
                    </span>
                    <span className="font-medium text-foreground text-sm">
                      {week.title}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <ul className="px-5 pb-4 space-y-2">
                        {week.tasks.map((task, tIdx) => (
                          <li
                            // biome-ignore lint/suspicious/noArrayIndexKey: static week tasks
                            key={tIdx}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-muted/10 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Estimated timeline: 30 days
          </span>
          <Badge className="bg-success/20 text-success border-success/30 text-xs">
            ROI Positive by Day 25
          </Badge>
        </div>
      </div>
    </div>
  );
}
