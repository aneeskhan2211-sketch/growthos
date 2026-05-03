/**
 * MarketingSpendModal.tsx
 * Admin modal to record marketing spend by channel.
 * Shows per-channel breakdown after submission.
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { SpendChannel } from "../backend";
import {
  useMarketingSpend,
  useRecordMarketingSpend,
} from "../hooks/useMarketingSpend";
import { fmtINR } from "../hooks/useSaasMetrics";

const CHANNEL_LABELS: Record<SpendChannel, string> = {
  [SpendChannel.googleAds]: "Google Ads",
  [SpendChannel.metaAds]: "Meta Ads (Facebook + Instagram)",
  [SpendChannel.referral]: "Referral Program",
  [SpendChannel.other]: "Other",
};

const CHANNEL_COLORS: Record<SpendChannel, string> = {
  [SpendChannel.googleAds]: "bg-[oklch(0.53_0.22_253)]",
  [SpendChannel.metaAds]: "bg-[oklch(0.42_0.17_280)]",
  [SpendChannel.referral]: "bg-[oklch(0.56_0.15_170)]",
  [SpendChannel.other]: "bg-[oklch(0.55_0.05_250)]",
};

interface Props {
  onClose: () => void;
}

export function MarketingSpendModal({ onClose }: Props) {
  const today = new Date();
  const defaultMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  const [channel, setChannel] = useState<SpendChannel>(SpendChannel.googleAds);
  const [month, setMonth] = useState(defaultMonth);
  const [amount, setAmount] = useState("");

  const { data: spendRecords } = useMarketingSpend(month);
  const { mutateAsync: recordSpend, isPending } = useRecordMarketingSpend();

  // Aggregate by channel for this month
  const channelTotals: Partial<Record<SpendChannel, number>> = {};
  for (const r of spendRecords ?? []) {
    const ch = r.channel as SpendChannel;
    channelTotals[ch] = (channelTotals[ch] ?? 0) + Number(r.amountRs);
  }
  const totalSpend = Object.values(channelTotals).reduce(
    (s, v) => s + (v ?? 0),
    0,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amountNum = Number(amount.replace(/[^0-9]/g, ""));
    if (!amountNum || amountNum <= 0) {
      toast.error("Enter a valid amount in ₹");
      return;
    }
    if (!/^\d{4}-\d{2}$/.test(month)) {
      toast.error("Month must be in YYYY-MM format");
      return;
    }
    try {
      await recordSpend({ month, channel, amountRs: amountNum });
      toast.success(
        `Recorded ${fmtINR(amountNum)} for ${CHANNEL_LABELS[channel]}`,
      );
      setAmount("");
    } catch {
      toast.error("Failed to record spend. Try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
      {/* backdrop close */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full cursor-default"
        aria-label="Close modal"
        onClick={onClose}
      />
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative bg-card border border-border/50 rounded-2xl shadow-elevated w-full max-w-md mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          data-ocid="marketing_spend.dialog"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
            <div>
              <h2 className="text-base font-display font-bold text-foreground">
                Update Ad Spend
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Record monthly marketing spend by channel
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground transition-fast p-1 rounded-lg hover:bg-muted/30"
              data-ocid="marketing_spend.close_button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-5">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Month Picker */}
              <div className="space-y-1.5">
                <Label htmlFor="spend-month" className="text-xs font-semibold">
                  Month (YYYY-MM)
                </Label>
                <Input
                  id="spend-month"
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="h-9 text-sm"
                  data-ocid="marketing_spend.month_input"
                />
              </div>

              {/* Channel Selector */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="spend-channel"
                  className="text-xs font-semibold"
                >
                  Channel
                </Label>
                <Select
                  value={channel}
                  onValueChange={(v) => setChannel(v as SpendChannel)}
                >
                  <SelectTrigger
                    id="spend-channel"
                    className="h-9 text-sm"
                    data-ocid="marketing_spend.channel_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(SpendChannel).map((ch) => (
                      <SelectItem key={ch} value={ch}>
                        {CHANNEL_LABELS[ch]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="space-y-1.5">
                <Label htmlFor="spend-amount" className="text-xs font-semibold">
                  Amount (₹)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    id="spend-amount"
                    type="number"
                    min="1"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-9 pl-7 text-sm"
                    data-ocid="marketing_spend.amount_input"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                data-ocid="marketing_spend.submit_button"
              >
                {isPending ? "Recording…" : "Record Spend"}
              </Button>
            </form>

            {/* Channel Breakdown */}
            {spendRecords && spendRecords.length > 0 && (
              <div className="bg-muted/20 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {month} Spend Breakdown
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    {fmtINR(totalSpend)} total
                  </span>
                </div>
                {Object.entries(channelTotals).map(([ch, amt]) => {
                  const pct =
                    totalSpend > 0 ? ((amt ?? 0) / totalSpend) * 100 : 0;
                  const colorClass =
                    CHANNEL_COLORS[ch as SpendChannel] ?? "bg-muted-foreground";
                  return (
                    <div
                      key={ch}
                      className="space-y-1"
                      data-ocid={`marketing_spend.channel_row.${ch}`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground font-medium">
                          {CHANNEL_LABELS[ch as SpendChannel] ?? ch}
                        </span>
                        <span className="text-muted-foreground tabular-nums">
                          {fmtINR(amt ?? 0)} · {pct.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", colorClass)}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
