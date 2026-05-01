import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  MILESTONES,
  useClaimMilestoneReward,
  useGamificationState,
  useRecordDailyAction,
} from "../hooks/usePremium";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DailyAction {
  id: string;
  title: string;
  description: string;
  xpLabel: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DAILY_ACTIONS: DailyAction[] = [
  {
    id: "contact-lead",
    title: "Contact a Lead",
    description: "Reach out to a new prospect via WhatsApp or email",
    xpLabel: "+1 action",
  },
  {
    id: "send-pitch",
    title: "Send a Pitch",
    description: "Send a personalized pitch proposal to a lead",
    xpLabel: "+1 action",
  },
  {
    id: "create-campaign",
    title: "Create a Campaign",
    description: "Launch a new ad or outreach campaign",
    xpLabel: "+1 action",
  },
  {
    id: "generate-proposal",
    title: "Generate a Proposal",
    description: "Use AI to create a client-ready proposal",
    xpLabel: "+1 action",
  },
  {
    id: "follow-up-lead",
    title: "Follow Up on a Lead",
    description: "Send a follow-up message to a contacted lead",
    xpLabel: "+1 action",
  },
];

const REWARD_DETAILS = [
  {
    milestoneIndex: 0,
    credits: 50,
    feature: "Bulk Campaign Builder",
    featureKey: "bulk-campaigns",
    icon: "📦",
    route: "/outreach",
    description: "Send campaigns to 100+ leads at once",
  },
  {
    milestoneIndex: 1,
    credits: 100,
    feature: "AI Pitch Generator",
    featureKey: "ai-proposals",
    icon: "🤖",
    route: "/command-center",
    description: "Auto-generate hyper-personalised pitches",
  },
  {
    milestoneIndex: 2,
    credits: 200,
    feature: "Advanced Analytics",
    featureKey: "competitor-intel",
    icon: "📊",
    route: "/clients",
    description: "Deep competitor intelligence and ROI dashboards",
  },
];

const WEEKLY_ACTIONS_DATA = [
  { day: "Mon", actions: 4 },
  { day: "Tue", actions: 7 },
  { day: "Wed", actions: 5 },
  { day: "Thu", actions: 9 },
  { day: "Fri", actions: 6 },
  { day: "Sat", actions: 3 },
  { day: "Sun", actions: 8 },
];

const BAR_COLORS = [
  "oklch(0.53 0.22 253 / 0.6)",
  "oklch(0.53 0.22 253 / 0.6)",
  "oklch(0.53 0.22 253 / 0.6)",
  "oklch(0.53 0.22 253)",
  "oklch(0.53 0.22 253 / 0.6)",
  "oklch(0.53 0.22 253 / 0.4)",
  "oklch(0.53 0.22 253 / 0.6)",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StreakSection({
  streak,
  totalActions,
}: {
  streak: number;
  totalActions: number;
}) {
  const isOnFire = streak >= 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative rounded-2xl overflow-hidden shadow-premium bg-card border border-border"
      data-ocid="growth-hub.streak.card"
    >
      {/* subtle premium gradient overlay */}
      <div className="absolute inset-0 gradient-premium opacity-40 pointer-events-none" />

      <div className="relative p-8 flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <span
            className="text-5xl leading-none"
            style={{
              animation: isOnFire
                ? "streak-pulse 1.6s ease-in-out infinite"
                : undefined,
            }}
          >
            🔥
          </span>
          <motion.span
            key={streak}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="text-6xl font-display font-bold text-foreground"
            style={{ animation: "streak-pulse 2s ease-in-out infinite" }}
            data-ocid="growth-hub.streak.number"
          >
            {streak}
          </motion.span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-display text-foreground font-semibold">
            Day Streak
          </span>
          {isOnFire && (
            <Badge
              className="badge-milestone-gold text-xs font-bold px-2 py-0.5 border-0"
              style={{
                boxShadow: "0 0 12px oklch(0.68 0.15 86 / 0.6)",
                animation: "streak-pulse 1.4s ease-in-out infinite",
              }}
              data-ocid="growth-hub.streak.on-fire-badge"
            >
              ON FIRE 🔥
            </Badge>
          )}
        </div>

        <p className="text-muted-foreground text-sm">
          <span className="font-semibold text-foreground">{totalActions}</span>{" "}
          total actions taken across all time
        </p>
      </div>
    </motion.div>
  );
}

function MilestoneTrack({
  totalActions,
  currentMilestone,
  unlockedFeatures,
}: {
  totalActions: number;
  currentMilestone: number;
  unlockedFeatures: string[];
}) {
  const claimReward = useClaimMilestoneReward();
  const [claimed, setClaimed] = useState<number[]>([]);

  function handleClaim(index: number) {
    claimReward.mutate(index, {
      onSuccess: () => {
        setClaimed((prev) => [...prev, index]);
        toast.success("🎉 Milestone reward claimed!", {
          description: `You've unlocked ${MILESTONES[index].label} rewards!`,
          duration: 5000,
        });
      },
      onError: () => {
        toast.error("Failed to claim reward. Please try again.");
      },
    });
  }

  return (
    <Card
      className="shadow-elevated border-border"
      data-ocid="growth-hub.milestones.section"
    >
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-lg flex items-center gap-2">
          🏆 Milestone Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {MILESTONES.map((m, idx) => {
          const progress = Math.min(totalActions / m.threshold, 1);
          const reached = totalActions >= m.threshold;
          const isCurrentOrPast = idx <= currentMilestone;
          const isClaimable =
            reached &&
            !unlockedFeatures.includes(m.unlocks) &&
            !claimed.includes(idx);

          const badgeClass =
            m.badgeColor === "bronze"
              ? "badge-milestone-bronze"
              : m.badgeColor === "silver"
                ? "badge-milestone-silver"
                : "badge-milestone-gold";

          const medalEmoji =
            m.badgeColor === "bronze"
              ? "🥉"
              : m.badgeColor === "silver"
                ? "🥈"
                : "🥇";

          return (
            <motion.div
              key={m.index}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`rounded-xl border p-4 transition-smooth ${
                isCurrentOrPast
                  ? "border-border bg-card"
                  : "border-dashed border-border/50 bg-muted/20 opacity-60"
              }`}
              data-ocid={`growth-hub.milestone.item.${idx + 1}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`text-2xl ${reached ? "" : "grayscale opacity-50"}`}
                    style={
                      reached
                        ? { animation: "milestone-unlock 0.5s ease-out" }
                        : undefined
                    }
                  >
                    {medalEmoji}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">
                        {m.label}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeClass}`}
                      >
                        {m.threshold} actions
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      +{m.credits} credits · Unlocks{" "}
                      {m.unlocks.replace("-", " ")}
                    </p>
                  </div>
                </div>

                {reached && !isClaimable && !claimed.includes(idx) && (
                  <Badge
                    className="badge-milestone-gold shrink-0 border-0 text-xs"
                    data-ocid={`growth-hub.milestone.claimed-badge.${idx + 1}`}
                  >
                    ✓ Claimed
                  </Badge>
                )}

                {isClaimable && (
                  <Button
                    size="sm"
                    className="shrink-0 text-xs font-semibold"
                    onClick={() => handleClaim(idx)}
                    disabled={claimReward.isPending}
                    data-ocid={`growth-hub.milestone.claim-button.${idx + 1}`}
                  >
                    Claim Reward
                  </Button>
                )}

                {claimed.includes(idx) && (
                  <Badge
                    className="badge-milestone-gold shrink-0 border-0 text-xs"
                    data-ocid={`growth-hub.milestone.just-claimed-badge.${idx + 1}`}
                  >
                    ✓ Claimed
                  </Badge>
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-3 progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round(progress * 100)}%` }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.15,
                    ease: "easeOut",
                  }}
                  style={
                    reached
                      ? {
                          background:
                            "linear-gradient(90deg, oklch(0.68 0.15 86), oklch(0.68 0.15 86 / 0.8))",
                        }
                      : undefined
                  }
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>
                  {Math.min(totalActions, m.threshold)} / {m.threshold}
                </span>
                <span>{Math.round(progress * 100)}%</span>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function RewardUnlocksGrid({
  unlockedFeatures,
}: { unlockedFeatures: string[] }) {
  return (
    <Card
      className="shadow-elevated border-border"
      data-ocid="growth-hub.rewards.section"
    >
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-lg flex items-center gap-2">
          🎁 Reward Unlocks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {REWARD_DETAILS.map((r, idx) => {
            const isUnlocked = unlockedFeatures.includes(r.featureKey);
            const milestone = MILESTONES[r.milestoneIndex];
            const badgeClass =
              milestone.badgeColor === "bronze"
                ? "badge-milestone-bronze"
                : milestone.badgeColor === "silver"
                  ? "badge-milestone-silver"
                  : "badge-milestone-gold";

            return (
              <motion.div
                key={r.featureKey}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isUnlocked ? 1 : 0.5, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.35 }}
                className={`rounded-xl border p-4 flex flex-col gap-2 transition-smooth ${
                  isUnlocked
                    ? "border-border bg-card hover:shadow-elevated cursor-pointer"
                    : "border-dashed border-border/50 bg-muted/20 grayscale"
                }`}
                data-ocid={`growth-hub.reward.card.${idx + 1}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{isUnlocked ? r.icon : "🔒"}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badgeClass}`}
                  >
                    {milestone.badgeColor}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {r.feature}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {r.description}
                  </p>
                </div>
                <p className="text-xs font-medium text-primary">
                  +{r.credits} credits
                </p>
                {!isUnlocked && (
                  <p className="text-xs text-muted-foreground">
                    Reach {milestone.threshold} actions to unlock
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function DailyActionsSection({ totalActions }: { totalActions: number }) {
  const recordAction = useRecordDailyAction();
  const [completedToday, setCompletedToday] = useState<string[]>([]);
  const [localTotal, setLocalTotal] = useState(totalActions);

  function handleMarkDone(actionId: string) {
    if (completedToday.includes(actionId)) return;
    recordAction.mutate(actionId, {
      onSuccess: () => {
        setCompletedToday((prev) => [...prev, actionId]);
        setLocalTotal((prev) => prev + 1);
        toast.success("Action logged! +1 progress", {
          description: "Keep it up — your streak is growing 🔥",
          duration: 3500,
        });
      },
      onError: () => {
        toast.error("Could not record action. Try again.");
      },
    });
  }

  return (
    <Card
      className="shadow-elevated border-border"
      data-ocid="growth-hub.daily-actions.section"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="font-display text-lg flex items-center gap-2">
            ✅ Today's Actions
          </CardTitle>
          <Badge
            variant="outline"
            className="text-xs font-semibold"
            data-ocid="growth-hub.daily-actions.total-badge"
          >
            {localTotal} total actions
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {DAILY_ACTIONS.map((action, idx) => {
          const done = completedToday.includes(action.id);
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.3 }}
              className={`flex items-center justify-between gap-3 rounded-lg p-3 transition-smooth border ${
                done
                  ? "bg-score-success border-transparent"
                  : "bg-muted/30 border-border/50 hover:bg-muted/50"
              }`}
              data-ocid={`growth-hub.daily-action.item.${idx + 1}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-smooth ${
                    done ? "bg-success/20" : "bg-muted border border-border"
                  }`}
                >
                  {done ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 14,
                      }}
                      className="text-base"
                    >
                      ✅
                    </motion.span>
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground">
                      {idx + 1}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold truncate ${done ? "line-through text-muted-foreground" : "text-foreground"}`}
                  >
                    {action.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {action.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-primary font-semibold">
                  {action.xpLabel}
                </span>
                {!done && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 px-3"
                    onClick={() => handleMarkDone(action.id)}
                    disabled={recordAction.isPending}
                    data-ocid={`growth-hub.daily-action.mark-done.${idx + 1}`}
                  >
                    Mark Done
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function CreditsCard({
  creditsEarned,
  streak,
}: { creditsEarned: number; streak: number }) {
  const bonusFromStreak = streak >= 7 ? 50 : streak >= 3 ? 20 : 0;
  const fromMilestones = creditsEarned;
  const total = fromMilestones + bonusFromStreak;

  return (
    <Card
      className="shadow-elevated border-border"
      data-ocid="growth-hub.credits.card"
    >
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-lg flex items-center gap-2">
          💎 Credits Balance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="text-center py-3"
        >
          <p
            className="text-5xl font-display font-bold text-primary"
            data-ocid="growth-hub.credits.total-balance"
          >
            {total}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            credits available
          </p>
        </motion.div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-muted-foreground">
              Earned from milestones
            </span>
            <span className="font-semibold text-foreground">
              {fromMilestones}
            </span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/50">
            <span className="text-muted-foreground">Streak bonus</span>
            <span
              className={`font-semibold ${bonusFromStreak > 0 ? "text-warning" : "text-foreground"}`}
            >
              +{bonusFromStreak}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="font-semibold text-foreground">
              Total available
            </span>
            <span className="font-bold text-primary">{total}</span>
          </div>
        </div>

        <Button
          className="w-full font-semibold"
          asChild
          data-ocid="growth-hub.credits.use-button"
        >
          <Link to="/leads">Use Credits → Get More Leads</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function LeaderboardTeaser() {
  return (
    <Card
      className="shadow-elevated border-border"
      data-ocid="growth-hub.leaderboard.card"
    >
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-lg flex items-center gap-2">
          📈 Your Agency Rank
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p
              className="text-4xl font-display font-bold text-foreground"
              data-ocid="growth-hub.leaderboard.rank"
            >
              #12
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              out of <span className="font-semibold text-foreground">247</span>{" "}
              agencies
            </p>
          </div>
          <Badge className="badge-milestone-bronze border-0 text-xs mb-1">
            Top 5%
          </Badge>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
            Actions this week
          </p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={WEEKLY_ACTIONS_DATA} barCategoryGap="30%">
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "oklch(0.55 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "oklch(0.53 0.22 253 / 0.06)" }}
                contentStyle={{
                  background: "oklch(0.16 0 0)",
                  border: "1px solid oklch(0.26 0 0)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "oklch(0.96 0 0)",
                }}
              />
              <Bar dataKey="actions" radius={[4, 4, 0, 0]}>
                {WEEKLY_ACTIONS_DATA.map((entry, index) => (
                  <Cell key={entry.day} fill={BAR_COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function UnlockedFeaturesPanel({
  unlockedFeatures,
}: { unlockedFeatures: string[] }) {
  return (
    <Card
      className="shadow-elevated border-border"
      data-ocid="growth-hub.unlocked-features.section"
    >
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-lg flex items-center gap-2">
          🚀 Feature Access
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {REWARD_DETAILS.map((r, idx) => {
            const isUnlocked = unlockedFeatures.includes(r.featureKey);
            return (
              <motion.div
                key={r.featureKey}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.3 }}
                className={`flex items-center justify-between gap-3 rounded-lg p-3 border transition-smooth ${
                  isUnlocked
                    ? "bg-muted/30 border-border/50 hover:bg-muted/60"
                    : "bg-muted/10 border-dashed border-border/30 opacity-50"
                }`}
                data-ocid={`growth-hub.feature.item.${idx + 1}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl shrink-0">
                    {isUnlocked ? r.icon : "🔒"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {r.feature}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {r.description}
                    </p>
                  </div>
                </div>
                {isUnlocked ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="shrink-0 text-xs h-7 px-3"
                    asChild
                    data-ocid={`growth-hub.feature.open-button.${idx + 1}`}
                  >
                    <Link to={r.route}>Open →</Link>
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground shrink-0">
                    Locked
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GrowthHubPage() {
  const { data: gamification, isLoading } = useGamificationState();

  const streak = gamification?.dailyStreak ?? 0;
  const totalActions = gamification?.totalActions ?? 0;
  const creditsEarned = gamification?.creditsEarned ?? 0;
  const currentMilestone = gamification?.currentMilestone ?? 0;
  const unlockedFeatures = gamification?.unlockedFeatures ?? [];

  if (isLoading) {
    return (
      <div
        className="p-6 flex flex-col gap-4 animate-pulse"
        data-ocid="growth-hub.loading_state"
      >
        <div className="h-40 rounded-2xl bg-muted/40" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-64 rounded-xl bg-muted/40" />
          <div className="h-64 rounded-xl bg-muted/40" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-4 md:p-6 space-y-5 max-w-6xl mx-auto"
      data-ocid="growth-hub.page"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Growth Hub
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Complete daily actions, unlock features, and climb the leaderboard
          </p>
        </div>
        <Badge
          variant="outline"
          className="border-primary/40 text-primary bg-primary/5 font-semibold"
          data-ocid="growth-hub.streak.badge"
        >
          🔥 {streak} day streak
        </Badge>
      </div>

      {/* Hero Streak */}
      <StreakSection streak={streak} totalActions={totalActions} />

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column — milestones + rewards */}
        <div className="lg:col-span-2 space-y-5">
          <MilestoneTrack
            totalActions={totalActions}
            currentMilestone={currentMilestone}
            unlockedFeatures={unlockedFeatures}
          />
          <RewardUnlocksGrid unlockedFeatures={unlockedFeatures} />
          <DailyActionsSection totalActions={totalActions} />
        </div>

        {/* Right column — credits + leaderboard + features */}
        <div className="space-y-5">
          <CreditsCard creditsEarned={creditsEarned} streak={streak} />
          <LeaderboardTeaser />
          <UnlockedFeaturesPanel unlockedFeatures={unlockedFeatures} />
        </div>
      </div>
    </div>
  );
}
