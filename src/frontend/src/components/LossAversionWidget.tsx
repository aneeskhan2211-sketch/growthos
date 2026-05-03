import { SubscriptionPlan } from "@/backend";
import { openPaywall } from "@/hooks/usePaywall";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

interface LossCard {
  icon: React.ReactNode;
  title: string;
  subtext: string;
  ctaLabel: string;
  onCta: () => void;
  borderColor: string;
  iconBg: string;
  ocid: string;
}

export function LossAversionWidget() {
  const { data: subscription } = useSubscription();
  const navigate = useNavigate();

  const isFree = !subscription || subscription.plan === SubscriptionPlan.free;
  if (!isFree) return null;

  const cards: LossCard[] = [
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      ),
      title: "12 high-quality leads waiting",
      subtext: "3 leads may convert today",
      ctaLabel: "View leads →",
      onCta: () => navigate({ to: "/leads" }),
      borderColor: "border-l-amber-400",
      iconBg:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      ocid: "loss_aversion.leads_card",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      title: "You're missing ₹15,000–₹40,000 this week",
      subtext: "Based on 12 leads × ₹2,500 avg service value",
      ctaLabel: "Unlock now →",
      onCta: () => openPaywall("message_send"),
      borderColor: "border-l-emerald-400",
      iconBg:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
      ocid: "loss_aversion.revenue_card",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "3 leads may close with a competitor today",
      subtext: "Free plan limits you to 10 leads/day and 5 messages/day",
      ctaLabel: "Remove limits →",
      onCta: () => openPaywall("message_send"),
      borderColor: "border-l-rose-400",
      iconBg:
        "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
      ocid: "loss_aversion.time_pressure_card",
    },
  ];

  return (
    <div data-ocid="loss_aversion.section" className="space-y-2">
      {cards.map((card, i) => (
        <motion.div
          key={card.ocid}
          data-ocid={card.ocid}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: i * 0.08, ease: "easeOut" }}
          className={`bg-card rounded-xl border border-border/40 border-l-4 ${card.borderColor} p-3.5 flex items-center gap-3 hover:shadow-md transition-shadow duration-200`}
        >
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg}`}
          >
            {card.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-foreground leading-tight">
              {card.title}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
              {card.subtext}
            </p>
          </div>
          <button
            type="button"
            onClick={card.onCta}
            className="shrink-0 text-[11px] font-bold text-primary whitespace-nowrap hover:underline transition-colors duration-150"
          >
            {card.ctaLabel}
          </button>
        </motion.div>
      ))}
    </div>
  );
}
