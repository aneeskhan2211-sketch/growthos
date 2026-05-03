import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { motion } from "motion/react";
import { useState } from "react";
import { useWeeklyChallenge } from "../hooks/useViralLoop";
import type { LeaderboardEntry } from "../types/viralLoop";

// ─── Rewards data ─────────────────────────────────────────────────────────────
const REWARDS = [
  {
    rank: 1,
    badge: "🥇",
    title: "1st Place",
    credits: "₹500",
    feature: "AI Credits + Gold Badge",
  },
  {
    rank: 2,
    badge: "🥈",
    title: "2nd Place",
    credits: "₹250",
    feature: "AI Credits + Silver Badge",
  },
  {
    rank: 3,
    badge: "🥉",
    title: "3rd Place",
    credits: "₹100",
    feature: "AI Credits + Bronze Badge",
  },
];

const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Pune", "Hyderabad", "Chennai"];

// ─── Countdown Timer ──────────────────────────────────────────────────────────
function CountdownTimer({
  days,
  hours,
  minutes,
}: { days: number; hours: number; minutes: number }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div
      className="flex items-center gap-1.5 text-sm font-mono font-semibold text-foreground"
      aria-label="Time remaining"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className="text-muted-foreground"
      >
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M7 4 L7 7 L9.5 9"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-muted-foreground text-xs mr-0.5">Time left:</span>
      {pad(days)}d {pad(hours)}h {pad(minutes)}m
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ChallengeProgress({
  current,
  target,
  pct,
}: { current: number; target: number; pct: number }) {
  return (
    <div data-ocid="challenge.progress_section">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-3xl font-display font-bold text-foreground tabular-nums">
            {current}
          </span>
          <span className="text-sm text-muted-foreground ml-1">
            / {target} LEADS GENERATED THIS WEEK
          </span>
        </div>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-xs text-muted-foreground">{pct}% complete</span>
        <span className="text-xs text-muted-foreground">
          {target - current} more to win
        </span>
      </div>
    </div>
  );
}

// ─── Leaderboard Entry ────────────────────────────────────────────────────────
const RANK_ICONS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

function LeaderboardRow({
  entry,
  index,
}: { entry: LeaderboardEntry; index: number }) {
  return (
    <motion.div
      data-ocid={`challenge.leaderboard_row.${index + 1}`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors ${
        entry.isCurrentUser
          ? "bg-primary/8 border border-primary/15"
          : "hover:bg-muted/30"
      }`}
    >
      {/* Rank */}
      <div className="w-6 text-center flex-shrink-0">
        {RANK_ICONS[entry.rank] ? (
          <span className="text-base">{RANK_ICONS[entry.rank]}</span>
        ) : (
          <span className="text-sm font-semibold text-muted-foreground">
            {entry.rank}
          </span>
        )}
      </div>

      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
          entry.isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {entry.avatarInitials}
      </div>

      {/* Name + city */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium truncate ${entry.isCurrentUser ? "text-primary" : "text-foreground"}`}
        >
          {entry.userName}
          {entry.isCurrentUser && (
            <span className="ml-1.5 text-xs text-primary/70">(You)</span>
          )}
        </p>
        <p className="text-xs text-muted-foreground">{entry.city} 🇮🇳</p>
      </div>

      {/* Score */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <span className="text-sm font-semibold tabular-nums text-foreground">
          {entry.value}
        </span>
        <span className="text-xs text-muted-foreground">Leads</span>
        {entry.isCurrentUser && (
          <Badge
            variant="outline"
            className="text-[10px] h-4 px-1.5 bg-primary/10 text-primary border-primary/20 ml-1"
          >
            You
          </Badge>
        )}
      </div>
    </motion.div>
  );
}

// ─── Reward Banner ────────────────────────────────────────────────────────────
function RewardBanner({ reward }: { reward: string }) {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          className="text-primary"
        >
          <path
            d="M9 12 C6.2 12 4 9.8 4 7 L4 3 L14 3 L14 7 C14 9.8 11.8 12 9 12 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 15 L11.5 15 M9 12 L9 15"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            d="M4 5 L2 5 C2 7.5 3 9.5 4 10.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M14 5 L16 5 C16 7.5 15 9.5 14 10.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>
      <div>
        <p className="text-xs font-semibold text-foreground mb-0.5">
          Weekly Prize
        </p>
        <p className="text-sm text-muted-foreground">{reward}</p>
      </div>
    </div>
  );
}

// ─── Daily Tasks ──────────────────────────────────────────────────────────────
const DAILY_TASKS = [
  { id: "task1", label: "Post 1 reel about your niche", points: 5 },
  { id: "task2", label: "Contact 10 new leads", points: 10 },
  { id: "task3", label: "Follow up 5 warm leads", points: 8 },
  { id: "task4", label: "Ask 3 clients for Google reviews", points: 6 },
  { id: "task5", label: "Share 1 win card on WhatsApp", points: 4 },
];

function DailyTasksCard() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalPoints = DAILY_TASKS.filter((t) => completed.has(t.id)).reduce(
    (sum, t) => sum + t.points,
    0,
  );

  return (
    <Card
      className="bg-card border-border"
      data-ocid="challenge.daily_tasks_card"
    >
      <CardHeader className="pb-3 flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-foreground">
          Today's Lead Tasks
        </CardTitle>
        <Badge
          variant="outline"
          className="text-xs bg-primary/10 text-primary border-primary/20"
        >
          +{totalPoints} pts today
        </Badge>
      </CardHeader>
      <CardContent className="pb-5 space-y-2">
        {DAILY_TASKS.map((task, idx) => (
          <button
            type="button"
            key={task.id}
            onClick={() => toggle(task.id)}
            data-ocid={`challenge.daily_task.${idx + 1}`}
            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
              completed.has(task.id)
                ? "bg-success/8 border-success/20"
                : "bg-muted/20 border-border hover:border-primary/30 hover:bg-primary/5"
            }`}
          >
            <div
              className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-colors ${
                completed.has(task.id)
                  ? "bg-success border-success"
                  : "border-muted-foreground"
              }`}
            >
              {completed.has(task.id) && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1.5 5 L4 7.5 L8.5 2.5"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              className={`flex-1 text-sm ${completed.has(task.id) ? "line-through text-muted-foreground" : "text-foreground"}`}
            >
              {task.label}
            </span>
            <span className="text-xs font-semibold text-primary">
              +{task.points}
            </span>
          </button>
        ))}

        {completed.size === DAILY_TASKS.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center pt-2 text-sm font-semibold text-success"
            data-ocid="challenge.all_tasks_complete_state"
          >
            🎉 All tasks done! You earned {totalPoints} points today.
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ChallengePage() {
  useMetaTags(PAGE_META["/challenge"]);
  const { challenge, timeLeft, progressPct, topLeaderboard, currentUserEntry } =
    useWeeklyChallenge();
  const [selectedCity, setSelectedCity] = useState("Mumbai");

  const filteredLeaderboard =
    selectedCity === "All"
      ? topLeaderboard
      : topLeaderboard.filter(
          (e) => e.city === selectedCity || e.isCurrentUser,
        );

  return (
    <div className="min-h-screen bg-background pb-8" data-ocid="challenge.page">
      {/* Page header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-display font-bold text-foreground">
              Weekly Challenges
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Compete, complete tasks, and win rewards
            </p>
          </div>
          <CountdownTimer {...timeLeft} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 lg:px-6 space-y-6">
        {/* Challenge hero card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            className="bg-card border-border overflow-hidden"
            data-ocid="challenge.hero_card"
          >
            <div className="bg-gradient-to-r from-primary/8 to-transparent border-b border-border px-5 py-4">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h2 className="text-base font-display font-bold text-foreground">
                  {challenge.title}
                </h2>
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 text-xs shrink-0"
                >
                  Active
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {challenge.description}
              </p>
            </div>
            <CardContent className="p-5 space-y-4">
              <ChallengeProgress
                current={challenge.currentValue}
                target={challenge.targetValue}
                pct={progressPct}
              />
              <RewardBanner reward={challenge.reward} />
              {currentUserEntry && (
                <div className="flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-lg px-4 py-2.5">
                  <span className="text-xs text-muted-foreground">
                    Your rank:
                  </span>
                  <span className="text-sm font-bold text-primary">
                    #{currentUserEntry.rank}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    — {currentUserEntry.value} leads
                  </span>
                  <span className="ml-auto text-xs font-medium text-primary">
                    {challenge.targetValue - currentUserEntry.value} to win
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Main grid: Leaderboard + Daily Tasks */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Leaderboard */}
          <Card
            className="bg-card border-border"
            data-ocid="challenge.leaderboard_card"
          >
            <CardHeader className="pb-3 flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">
                  Weekly Leaderboard
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Top Users This Week
                </p>
              </div>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                data-ocid="challenge.city_filter"
                className="text-xs font-semibold border border-border/60 rounded-lg px-2 py-1 bg-card text-foreground outline-none focus:ring-2 focus:ring-primary/30 h-7"
              >
                {["All", ...CITIES].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-0.5">
                {filteredLeaderboard.map((entry, i) => (
                  <LeaderboardRow
                    key={entry.userName}
                    entry={entry}
                    index={i}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Daily Tasks */}
          <DailyTasksCard />
        </div>

        {/* Rewards section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          data-ocid="challenge.rewards_section"
        >
          <h2 className="text-sm font-semibold text-foreground mb-3">
            🏆 This Week's Rewards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {REWARDS.map((reward, i) => (
              <motion.div
                key={reward.rank}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
                className="rounded-2xl border bg-card p-4 text-center"
                data-ocid={`challenge.reward_card.${i + 1}`}
              >
                <span className="text-3xl block mb-2">{reward.badge}</span>
                <p className="text-sm font-bold text-foreground mb-0.5">
                  {reward.title}
                </p>
                <p className="text-xl font-display font-bold text-primary">
                  {reward.credits}
                </p>
                <p className="text-xs text-muted-foreground">
                  {reward.feature}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How scoring works */}
        <Card
          className="bg-muted/20 border-border"
          data-ocid="challenge.scoring_card"
        >
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              How Scoring Works
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { action: "New lead generated", pts: "+2 pts" },
                { action: "Pitch sent to lead", pts: "+3 pts" },
                { action: "Deal closed", pts: "+25 pts" },
                { action: "Win card shared", pts: "+5 pts" },
                { action: "Review collected", pts: "+4 pts" },
                { action: "Daily task completed", pts: "+5–10 pts" },
              ].map((item) => (
                <div
                  key={item.action}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-muted-foreground">{item.action}</span>
                  <span className="font-semibold text-primary">{item.pts}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
