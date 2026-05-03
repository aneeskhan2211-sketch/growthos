import { openPaywall } from "@/hooks/usePaywall";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

const FREE_ITEMS = [
  { icon: "⏳", text: "Manual outreach — contacts leads one-by-one" },
  { icon: "🐢", text: "Slower results — limited lead pool" },
  { icon: "📋", text: "No follow-ups — leads go cold" },
  { icon: "❌", text: "No pipeline view" },
];

const GROWTH_ITEMS = [
  { icon: "⚡", text: "Faster outreach — contact 150 leads/day" },
  { icon: "🚀", text: "Auto follow-ups — never let a lead go cold" },
  { icon: "📊", text: "Full CRM pipeline — see every deal at a glance" },
  { icon: "💰", text: "Close more deals with less effort" },
];

interface UpgradeComparisonCardProps {
  className?: string;
}

export function UpgradeComparisonCard({
  className = "",
}: UpgradeComparisonCardProps) {
  const navigate = useNavigate();

  const handleCTA = () => {
    openPaywall("message_send");
    navigate({ to: "/pricing" });
  };

  return (
    <div
      data-ocid="upgrade_comparison.card"
      className={`space-y-4 ${className}`}
    >
      <div className="grid grid-cols-2 gap-3">
        {/* Free column */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-muted/30 rounded-2xl border border-border/40 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Free
            </p>
          </div>
          <div className="space-y-2">
            {FREE_ITEMS.map((item) => (
              <div key={item.text} className="flex items-start gap-2">
                <span className="text-[14px] shrink-0 mt-px">{item.icon}</span>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Growth column */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-primary/5 rounded-2xl border-2 border-primary/40 p-4 space-y-3 relative"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-primary-foreground bg-primary px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-sm">
              Most Popular
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Growth
            </p>
            <span className="text-[10px] font-semibold text-primary/70">
              ₹299/mo
            </span>
          </div>
          <div className="space-y-2">
            {GROWTH_ITEMS.map((item) => (
              <div key={item.text} className="flex items-start gap-2">
                <span className="text-[14px] shrink-0 mt-px">{item.icon}</span>
                <p className="text-[11px] font-medium text-foreground leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.button
        type="button"
        data-ocid="upgrade_comparison.primary_button"
        onClick={handleCTA}
        className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-[14px] font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform duration-150"
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Get more clients faster — ₹299/mo
      </motion.button>
    </div>
  );
}
