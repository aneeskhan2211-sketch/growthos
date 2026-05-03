import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Bell,
  BellOff,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Copy,
  MessageCircle,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { TriggerType } from "../backend";
import {
  useNotificationPrefs,
  useOptInWhatsApp,
  useOptOutWhatsApp,
  useUpdateNotificationPrefs,
  useWhatsAppSequence,
} from "../hooks/useRetentionNotifications";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TriggerConfig {
  id: TriggerType;
  label: string;
  desc: string;
  icon: React.ElementType;
}

interface DripWeek {
  week: number;
  theme: string;
  messages: string[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TRIGGER_CONFIGS: TriggerConfig[] = [
  {
    id: "on_new_reply" as TriggerType,
    label: "New Reply Alert",
    desc: "Get notified when a lead replies",
    icon: MessageCircle,
  },
  {
    id: "on_inactivity_24h" as TriggerType,
    label: "Inactivity Reminder",
    desc: "Reminder if you haven't acted in 24–48 hours",
    icon: Clock,
  },
  {
    id: "on_followup_due" as TriggerType,
    label: "Follow-up Due",
    desc: "Alert when a follow-up is scheduled",
    icon: Calendar,
  },
  {
    id: "on_limit_reached" as TriggerType,
    label: "Limit Reached",
    desc: "Notification when daily limits are hit",
    icon: Zap,
  },
  {
    id: "drip_day_0" as TriggerType,
    label: "Drip Schedule",
    desc: "Daily tips for your first 30 days",
    icon: TrendingUp,
  },
  {
    id: "on_streak_milestone" as TriggerType,
    label: "Streak Milestones",
    desc: "Celebrate your activity streaks",
    icon: Bell,
  },
];

const DRIP_WEEKS: DripWeek[] = [
  {
    week: 1,
    theme: "Activation",
    messages: [
      "Your first leads are ready. Contact 5 to start.",
      "Quick follow-up tip: message yesterday's leads.",
      "Replies come faster when you respond early.",
      "Send 5 messages now. It takes less than 5 minutes.",
      "You're getting started. Keep the streak going.",
      "Follow up with 3 leads today.",
      "Week 1 summary: continue to build momentum.",
    ],
  },
  {
    week: 2,
    theme: "Habit Building",
    messages: [
      "Contact 5 leads each day.",
      "Check replies and respond quickly.",
      "Try one simple offer this week.",
      "Keep your daily routine consistent.",
    ],
  },
  {
    week: 3,
    theme: "Conversion Focus",
    messages: [
      "Turn replies into bookings — follow up today.",
      "Share a simple plan with interested leads.",
      "Close conversations by suggesting next steps.",
      "Check your pending replies now.",
    ],
  },
  {
    week: 4,
    theme: "Scale + Upgrade",
    messages: [
      "Automate follow-ups to save time.",
      "Increase daily outreach to scale enquiries.",
      "Review your results and improve offers.",
      "Continue the routine for steady growth.",
    ],
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="shadow-card border-border/60">
      <CardHeader className="pb-0 pt-5 px-6">
        <div className="flex items-start gap-3 mb-1">
          <div className="p-2 rounded-lg bg-primary/10 shrink-0">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-5 pt-4">{children}</CardContent>
    </Card>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-muted/60 transition-colors shrink-0"
      aria-label="Copy message"
      data-ocid="notification.copy_button"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-primary" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </button>
  );
}

function DripWeekAccordion({ week }: { week: DripWeek }) {
  const [open, setOpen] = useState(false);
  const themeColors: Record<string, string> = {
    Activation: "bg-primary/10 text-primary",
    "Habit Building": "bg-accent/60 text-accent-foreground",
    "Conversion Focus": "bg-score-success/10 text-score-success",
    "Scale + Upgrade": "bg-secondary/60 text-secondary-foreground",
  };
  const cls = themeColors[week.theme] ?? "bg-muted text-muted-foreground";

  return (
    <div className="border border-border/60 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted/40 transition-colors"
        data-ocid={`notification.drip_week_${week.week}.toggle`}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">
            Week {week.week}
          </span>
          <span
            className={cn("text-xs font-medium px-2 py-0.5 rounded-full", cls)}
          >
            {week.theme}
          </span>
          <span className="text-xs text-muted-foreground">
            {week.messages.length} messages
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <div className="px-4 pb-3 pt-1 space-y-1.5 bg-muted/10">
          {week.messages.map((msg) => (
            <div
              key={msg}
              className="flex items-start gap-2 p-2.5 rounded-md bg-card border border-border/40"
              data-ocid={`notification.drip_week_${week.week}.item.${week.messages.indexOf(msg) + 1}`}
            >
              <span className="text-xs font-mono text-muted-foreground w-4 shrink-0 mt-0.5">
                {week.messages.indexOf(msg) + 1}
              </span>
              <p className="flex-1 text-sm text-foreground leading-relaxed">
                {msg}
              </p>
              <CopyButton text={msg} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function NotificationSettingsPage() {
  const { data: prefs, isLoading } = useNotificationPrefs();
  const { data: waSequence } = useWhatsAppSequence();
  const updatePrefs = useUpdateNotificationPrefs();
  const optInMutation = useOptInWhatsApp();
  const optOutMutation = useOptOutWhatsApp();

  // Local state mirrors prefs for editing
  const [maxPerDay, setMaxPerDay] = useState<number>(
    Number(prefs?.frequencySettings.maxPerDay ?? 2),
  );
  const [quietHours, setQuietHours] = useState(
    prefs?.frequencySettings.quietHoursEnabled ?? true,
  );
  const [inactivityReduction, setInactivityReduction] = useState(
    prefs?.frequencySettings.inactivityReductionEnabled ?? true,
  );
  const [enabledTriggers, setEnabledTriggers] = useState<Set<TriggerType>>(
    new Set(prefs?.enabledTriggers ?? []),
  );
  const [phoneInput, setPhoneInput] = useState("");
  const [showOptInForm, setShowOptInForm] = useState(false);

  const isOptedIn = prefs?.whatsappOptIn ?? false;

  const toggleTrigger = (id: TriggerType) => {
    setEnabledTriggers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    await updatePrefs.mutateAsync({
      frequencySettings: {
        maxPerDay: BigInt(maxPerDay),
        quietHoursEnabled: quietHours,
        quietHoursStart: BigInt(21),
        quietHoursEnd: BigInt(8),
        inactivityReductionEnabled: inactivityReduction,
      },
      enabledTriggers: Array.from(enabledTriggers),
    });
    toast.success("Notification preferences saved", {
      description: "Your settings are now active.",
      duration: 4000,
    });
  };

  const handleOptIn = async () => {
    if (!phoneInput.trim()) {
      toast.error("Please enter your WhatsApp number");
      return;
    }
    await optInMutation.mutateAsync(phoneInput.trim());
    setShowOptInForm(false);
    toast.success("WhatsApp opt-in confirmed", {
      description:
        "You'll receive up to 1 message per day. Easy opt-out anytime.",
      duration: 5000,
    });
  };

  const handleOptOut = async () => {
    await optOutMutation.mutateAsync("");
    toast("WhatsApp messages stopped", {
      description: "You've been removed from the sequence.",
      duration: 4000,
    });
  };

  const formatConsentDate = (ts: bigint | undefined) => {
    if (!ts) return "—";
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div
        className="p-6 space-y-4 max-w-2xl mx-auto"
        data-ocid="notification_settings.loading_state"
      >
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 rounded-xl bg-muted/40 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div
      className="p-6 max-w-2xl mx-auto space-y-6"
      data-ocid="notification_settings.page"
    >
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notification Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Control how and when GrowthOS sends you reminders. Max 2/day. No spam.
        </p>
      </div>

      {/* Section 1: Frequency */}
      <SectionCard
        icon={Clock}
        title="Frequency Settings"
        desc="Set daily limits and quiet hours to keep notifications useful, not annoying."
      >
        {/* Max per day */}
        <div className="space-y-3">
          <Label className="text-xs font-medium text-muted-foreground">
            Max notifications per day
          </Label>
          <div
            className="flex gap-2"
            data-ocid="notification.max_per_day.radio"
          >
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setMaxPerDay(n)}
                data-ocid={`notification.max_per_day.option.${n}`}
                className={cn(
                  "flex-1 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200",
                  maxPerDay === n
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border/60 bg-muted/30 text-muted-foreground hover:border-primary/40 hover:bg-muted/50",
                )}
              >
                {n}/day
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {/* Quiet Hours */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Quiet Hours</p>
              <p className="text-xs text-muted-foreground">
                No notifications from 9:00 PM to 8:00 AM
              </p>
            </div>
            <Switch
              checked={quietHours}
              onCheckedChange={setQuietHours}
              data-ocid="notification.quiet_hours.toggle"
            />
          </div>

          {/* Inactivity reduction */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Inactivity Reduction
              </p>
              <p className="text-xs text-muted-foreground">
                Reduce to 1/day if no activity for 7+ days
              </p>
            </div>
            <Switch
              checked={inactivityReduction}
              onCheckedChange={setInactivityReduction}
              data-ocid="notification.inactivity_reduction.toggle"
            />
          </div>
        </div>
      </SectionCard>

      {/* Section 2: Trigger Controls */}
      <SectionCard
        icon={Zap}
        title="Trigger Controls"
        desc="Choose which events trigger notifications. All enabled by default."
      >
        <div className="space-y-3">
          {TRIGGER_CONFIGS.map((t) => {
            const Icon = t.icon;
            const enabled = enabledTriggers.has(t.id);
            return (
              <div
                key={t.id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border/50 bg-muted/20"
                data-ocid={`notification.trigger.${t.id}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {t.label}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.desc}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={enabled}
                  onCheckedChange={() => toggleTrigger(t.id)}
                  data-ocid={`notification.trigger.${t.id}.toggle`}
                />
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Section 3: WhatsApp Re-Engagement */}
      <SectionCard
        icon={MessageCircle}
        title="WhatsApp Re-Engagement"
        desc="Opt-in only. We send actionable tips — max 1 message/day. Easy opt-out."
      >
        {/* Status badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">Status:</span>
          {isOptedIn ? (
            <Badge
              className="bg-score-success/15 text-score-success border-score-success/20"
              data-ocid="notification.whatsapp.opted_in_badge"
            >
              ✓ Opted in
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="text-muted-foreground"
              data-ocid="notification.whatsapp.not_opted_in_badge"
            >
              Not opted in
            </Badge>
          )}
        </div>

        {isOptedIn ? (
          <div className="space-y-4">
            {/* Consent info */}
            <div className="p-3 rounded-lg bg-score-success/5 border border-score-success/20 text-sm text-foreground space-y-1">
              <p>
                <span className="text-muted-foreground">Consent date: </span>
                <strong>{formatConsentDate(prefs?.whatsappConsentDate)}</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                You'll receive up to 1 WhatsApp message per day from the
                sequence below.
              </p>
            </div>

            {/* Opt-out */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleOptOut}
              disabled={optOutMutation.isPending}
              className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5"
              data-ocid="notification.whatsapp.opt_out_button"
            >
              <BellOff className="w-3.5 h-3.5" />
              {optOutMutation.isPending
                ? "Opting out…"
                : "Stop WhatsApp messages"}
            </Button>

            {/* Sequence preview */}
            <div className="mt-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Your 6-message sequence
              </p>
              <div className="overflow-x-auto rounded-lg border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40 text-left">
                      <th className="px-3 py-2 text-xs font-semibold text-muted-foreground w-14">
                        Day
                      </th>
                      <th className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(waSequence ?? []).map((msg) => (
                      <tr
                        key={String(msg.dayNumber)}
                        className="border-t border-border/30"
                        data-ocid={`notification.wa_sequence.item.${Number(msg.dayNumber) + 1}`}
                      >
                        <td className="px-3 py-2.5 text-xs font-mono text-muted-foreground">
                          Day {Number(msg.dayNumber)}
                        </td>
                        <td className="px-3 py-2.5 text-sm text-foreground">
                          {msg.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {!showOptInForm ? (
              <Button
                size="sm"
                onClick={() => setShowOptInForm(true)}
                className="gap-1.5"
                data-ocid="notification.whatsapp.opt_in_button"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Opt in to WhatsApp tips
              </Button>
            ) : (
              <div className="space-y-3 p-4 rounded-lg border border-border/60 bg-muted/20">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">
                    Your WhatsApp number
                  </Label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="h-9 text-sm"
                    data-ocid="notification.whatsapp.phone_input"
                  />
                </div>

                <div className="flex items-start gap-2 p-2.5 rounded-md bg-primary/5 border border-primary/20">
                  <Shield className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    We will only send actionable tips. Max 1 message/day. Easy
                    opt-out anytime. Consent is logged securely.
                  </p>
                </div>

                <p className="text-xs text-muted-foreground">
                  By opting in you agree to receive up to 1 WhatsApp message per
                  day. No spam. Opt out anytime.
                </p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleOptIn}
                    disabled={optInMutation.isPending}
                    className="gap-1.5"
                    data-ocid="notification.whatsapp.confirm_opt_in_button"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {optInMutation.isPending ? "Confirming…" : "Confirm opt-in"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowOptInForm(false);
                      setPhoneInput("");
                    }}
                    data-ocid="notification.whatsapp.cancel_opt_in_button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Sequence preview (not opted in) */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                What you'd receive (6 messages over 7 days)
              </p>
              <div className="overflow-x-auto rounded-lg border border-border/50">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40 text-left">
                      <th className="px-3 py-2 text-xs font-semibold text-muted-foreground w-14">
                        Day
                      </th>
                      <th className="px-3 py-2 text-xs font-semibold text-muted-foreground">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(waSequence ?? []).map((msg) => (
                      <tr
                        key={`preview-${String(msg.dayNumber)}`}
                        className="border-t border-border/30"
                        data-ocid={`notification.wa_preview.item.${Number(msg.dayNumber) + 1}`}
                      >
                        <td className="px-3 py-2.5 text-xs font-mono text-muted-foreground">
                          Day {Number(msg.dayNumber)}
                        </td>
                        <td className="px-3 py-2.5 text-sm text-foreground">
                          {msg.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </SectionCard>

      {/* Section 4: 30-Day Drip Preview */}
      <SectionCard
        icon={Calendar}
        title="30-Day Drip Preview"
        desc="Messages sent over your first 30 days to build habit and drive action."
      >
        <div className="space-y-2" data-ocid="notification.drip_preview.list">
          {DRIP_WEEKS.map((week) => (
            <DripWeekAccordion key={week.week} week={week} />
          ))}
        </div>
      </SectionCard>

      {/* Save button */}
      <div className="flex items-center justify-between pt-1 pb-4">
        <p className="text-xs text-muted-foreground">
          Changes apply immediately to future notifications.
        </p>
        <Button
          onClick={handleSave}
          disabled={updatePrefs.isPending}
          className="gap-1.5 min-w-32"
          data-ocid="notification.save_button"
        >
          {updatePrefs.isPending ? (
            <>
              <div className="w-3.5 h-3.5 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Check className="w-3.5 h-3.5" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
