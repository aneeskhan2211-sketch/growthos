import { SubscriptionPlan } from "@/backend";
import useConversionEngine from "@/hooks/useConversionEngine";
import { openPaywall } from "@/hooks/usePaywall";
import { useSubscription } from "@/hooks/useSubscription";
import { motion } from "motion/react";

interface UsageQuotaBarProps {
  type: "leads" | "messages";
}

export function UsageQuotaBar({ type }: UsageQuotaBarProps) {
  const { data: subscription } = useSubscription();
  const {
    dailyLeadsUsed,
    dailyMessagesUsed,
    dailyLeadsLimit,
    dailyMessagesLimit,
  } = useConversionEngine();

  const isFree = !subscription || subscription.plan === SubscriptionPlan.free;
  if (!isFree) return null;

  const used = type === "leads" ? dailyLeadsUsed : dailyMessagesUsed;
  const limit = type === "leads" ? dailyLeadsLimit : dailyMessagesLimit;
  const pct = Math.min((used / Math.max(limit, 1)) * 100, 100);
  const atLimit = used >= limit;

  const label = type === "leads" ? "Leads" : "Messages";
  const upgradeText =
    type === "leads"
      ? "Upgrade to ₹299/mo to unlock 150 leads/day"
      : "Upgrade to ₹299/mo to unlock 50 messages/day";

  const barColorClass =
    pct <= 60 ? "bg-green-500" : pct <= 85 ? "bg-amber-500" : "bg-red-500";
  const textColorClass =
    pct <= 60
      ? "text-green-600 dark:text-green-400"
      : pct <= 85
        ? "text-amber-500 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  if (atLimit) {
    return (
      <motion.div
        data-ocid={`quota_bar.${type}.error_state`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-red-400/30 bg-red-50 dark:bg-red-500/8"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-600 dark:text-red-400 shrink-0"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-[11px] text-red-700 dark:text-red-400 font-medium flex-1 min-w-0 leading-snug">
          Daily limit reached. {upgradeText} and save 2–3 hours daily.
        </p>
        <button
          type="button"
          data-ocid={`quota_bar.${type}.upgrade_button`}
          onClick={() => openPaywall("message_send")}
          className="shrink-0 text-[11px] font-bold text-primary-foreground bg-primary px-2.5 py-1.5 rounded-lg whitespace-nowrap active:scale-95 transition-transform duration-150"
        >
          Upgrade
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      data-ocid={`quota_bar.${type}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-muted-foreground">
          {label} quota today
        </p>
        <span
          className={`text-[11px] font-bold tabular-nums ${textColorClass}`}
        >
          {used} / {limit}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted/60 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
