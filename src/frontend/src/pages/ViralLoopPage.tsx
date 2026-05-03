import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useViralLoop } from "../hooks/useViralLoop";
import type { MilestoneInfo, ShareableWin } from "../types/viralLoop";

// ─── Social Proof Ticker ──────────────────────────────────────────────────────
function SocialProofTicker() {
  const { ticker } = useViralLoop();
  const { feed, activeEntry, refresh } = ticker;

  return (
    <Card
      className="bg-card border-border"
      data-ocid="viral_loop.social_proof_card"
    >
      <CardHeader className="pb-3 flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Live Activity Feed
        </CardTitle>
        <Button
          size="sm"
          variant="ghost"
          onClick={refresh}
          className="h-7 px-2 text-xs text-muted-foreground"
          data-ocid="viral_loop.refresh_feed_button"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="mr-1"
          >
            <path
              d="M13 2 L13 6 L9 6"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 12 C1 7.6 4.6 4 9 4 L13 4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="bg-muted/30 rounded-lg px-4 py-3 mb-3 min-h-[44px] flex items-center">
          <AnimatePresence mode="wait">
            {activeEntry && (
              <motion.p
                key={activeEntry.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-foreground"
              >
                <span className="font-semibold">{activeEntry.userName}</span>{" "}
                from{" "}
                <span className="text-primary font-medium">
                  {activeEntry.city}
                </span>{" "}
                {activeEntry.action}
                {activeEntry.metricValue && (
                  <span className="ml-1 font-bold text-success">
                    {activeEntry.metricValue}
                  </span>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        {/* Recent feed list */}
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {feed.slice(0, 6).map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-2.5 py-1.5 px-2 rounded hover:bg-muted/30 transition-colors"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  entry.type === "deal"
                    ? "bg-success"
                    : entry.type === "lead"
                      ? "bg-primary"
                      : entry.type === "pitch"
                        ? "bg-amber-400"
                        : "bg-muted-foreground"
                }`}
              />
              <p className="text-xs text-muted-foreground min-w-0 truncate">
                <span className="font-medium text-foreground">
                  {entry.userName}
                </span>{" "}
                ({entry.city}) {entry.action}
                {entry.metricValue && (
                  <span className="ml-1 font-semibold text-success">
                    {entry.metricValue}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function WinCard({
  win,
  onShareWhatsApp,
  onShareLinkedIn,
}: {
  win: ShareableWin;
  onShareWhatsApp: (w: ShareableWin) => void;
  onShareLinkedIn: (w: ShareableWin) => void;
}) {
  const handleInstagram = () => {
    const caption = `🚀 NEW WIN!\n${win.metricValue} ${win.metricLabel}\n\nUsing GrowthOS to grow my salon in Mumbai! 💪\n\n#MumbaiSalon #GrowthOS #SalonMarketing`;
    navigator.clipboard
      .writeText(caption)
      .then(() => {
        toast.success("Caption copied! Share it on Instagram 📸");
      })
      .catch(() => toast.info("Caption ready — paste it on Instagram!"));
  };
  return (
    <div className="flex flex-col items-center" data-ocid="viral_loop.win_card">
      {/* 1080×1080 mockup card */}
      <div
        className={`w-full max-w-xs aspect-square rounded-2xl bg-gradient-to-br ${win.gradient} flex flex-col items-center justify-center shadow-2xl text-white relative overflow-hidden`}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-white" />
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full border border-white" />
        </div>
        <div className="relative text-center px-8">
          <p className="text-xs font-semibold tracking-widest opacity-80 mb-2">
            NEW WIN!
          </p>
          <p className="text-5xl font-display font-bold mb-1 leading-none">
            {win.metricValue}
          </p>
          <p className="text-sm font-semibold tracking-wider opacity-90 mb-4">
            {win.metricLabel}
          </p>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2">
            <span className="text-white text-xs font-bold">
              {win.userName.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <p className="text-sm font-semibold">{win.userName}</p>
          <p className="text-xs opacity-75">{win.city}</p>
          <p className="text-xs opacity-60 mt-2">{win.date}</p>
        </div>
        {/* Branding */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 opacity-70">
          <div className="w-4 h-4 rounded bg-white/30 flex items-center justify-center">
            <span className="text-white text-[8px] font-bold">G</span>
          </div>
          <span className="text-xs text-white">GrowthOS</span>
        </div>
      </div>

      {/* Win Card actions */}
      <p className="text-xs text-muted-foreground mt-3 mb-3">
        Win Card Mockup (1080×1080)
      </p>
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          size="sm"
          onClick={() => onShareWhatsApp(win)}
          className="gap-2 h-9 px-4 bg-[#25D366] hover:bg-[#22c55e] text-white"
          data-ocid="viral_loop.share_whatsapp_button"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleInstagram}
          className="gap-2 h-9 px-3 border-pink-500/30 text-pink-500 hover:bg-pink-500/10"
          data-ocid="viral_loop.share_instagram_button"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle
              cx="17.5"
              cy="6.5"
              r="0.8"
              fill="currentColor"
              stroke="none"
            />
          </svg>
          Instagram
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onShareLinkedIn(win)}
          className="gap-2 h-9 px-4 border-border"
          data-ocid="viral_loop.share_linkedin_button"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[#0077B5]"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="gap-2 h-9 px-3 text-muted-foreground text-xs"
          data-ocid="viral_loop.go_to_social_button"
          onClick={() => window.open("https://instagram.com", "_blank")}
        >
          Go to social media
        </Button>
      </div>
    </div>
  );
}

// ─── Create Win Section ───────────────────────────────────────────────────────
function CreateWinSection() {
  const { wins } = useViralLoop();
  const { wins: winList, createWin, shareOnWhatsApp, shareOnLinkedIn } = wins;
  const [winValue, setWinValue] = useState("₹15,000");
  const [winType, setWinType] = useState<ShareableWin["winType"]>("deal");
  const currentWin = winList[0];

  return (
    <Card
      className="bg-card border-border"
      data-ocid="viral_loop.create_win_card"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground">
          Create Your 'Win Cards'
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Mockup and share your Win Card to social media.
        </p>
      </CardHeader>
      <CardContent className="pb-5">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Win card display */}
          {currentWin ? (
            <WinCard
              win={currentWin}
              onShareWhatsApp={shareOnWhatsApp}
              onShareLinkedIn={shareOnLinkedIn}
            />
          ) : (
            <div className="bg-muted/30 rounded-2xl aspect-square flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No wins yet — create one!
              </p>
            </div>
          )}

          {/* Create win form */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="winType"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                Win Type
              </label>
              <select
                id="winType"
                value={winType}
                onChange={(e) =>
                  setWinType(e.target.value as ShareableWin["winType"])
                }
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                data-ocid="viral_loop.win_type_select"
              >
                <option value="deal">Deal Closed</option>
                <option value="leads">Leads Generated</option>
                <option value="revenue">Revenue Milestone</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="winValue"
                className="block text-xs font-medium text-muted-foreground mb-1.5"
              >
                {winType === "deal"
                  ? "Deal Value (₹)"
                  : winType === "leads"
                    ? "Leads Count"
                    : "Revenue Amount (₹)"}
              </label>
              <input
                id="winValue"
                type="text"
                value={winValue}
                onChange={(e) => setWinValue(e.target.value)}
                placeholder={winType === "leads" ? "50 leads" : "₹25,000"}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                data-ocid="viral_loop.win_value_input"
              />
            </div>
            <Button
              className="w-full gap-2"
              onClick={() => createWin(winValue, winType)}
              data-ocid="viral_loop.customize_share_button"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 1 L7 13 M1 7 L13 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Customize &amp; Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Milestone Cards ──────────────────────────────────────────────────────────
function MilestoneCardItem({
  milestone,
  isJustUnlocked,
}: { milestone: MilestoneInfo; isJustUnlocked: boolean }) {
  const badgeColors = {
    bronze: "from-amber-700 to-amber-500",
    silver: "from-slate-500 to-slate-400",
    gold: "from-yellow-500 to-amber-400",
  };
  const pct = Math.min(
    100,
    Math.round((milestone.currentInvites / milestone.requiredInvites) * 100),
  );

  return (
    <motion.div
      animate={isJustUnlocked ? { scale: [1, 1.04, 1] } : {}}
      transition={{ duration: 0.5 }}
      data-ocid={`viral_loop.milestone_card.${milestone.tier}`}
      className={`relative rounded-xl border p-4 transition-colors ${
        milestone.status === "unlocked"
          ? "bg-success/5 border-success/20"
          : milestone.status === "in_progress"
            ? "bg-primary/5 border-primary/20"
            : "bg-muted/20 border-border"
      }`}
    >
      {/* Lock icon for locked */}
      {milestone.status === "locked" && (
        <div className="absolute top-3 right-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="text-muted-foreground"
          >
            <rect
              x="3"
              y="6"
              width="8"
              height="6"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M5 6 L5 4 C5 2.9 5.9 2 7 2 C8.1 2 9 2.9 9 4 L9 6"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-8 h-8 rounded-full bg-gradient-to-br ${badgeColors[milestone.badge]} flex items-center justify-center flex-shrink-0 shadow-sm`}
        >
          <span className="text-white text-xs font-bold">
            T{milestone.tier}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">
            {milestone.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
            Unlock{" "}
            <span className="text-foreground font-medium">
              {milestone.unlock}
            </span>
          </p>
          {milestone.status !== "locked" && (
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
              {milestone.unlockDetail}
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">
            {milestone.currentInvites}/{milestone.requiredInvites} Invites
          </span>
          <Badge
            variant="outline"
            className={`text-[10px] h-5 px-1.5 ${
              milestone.status === "unlocked"
                ? "bg-success/10 text-success border-success/20"
                : milestone.status === "in_progress"
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-muted text-muted-foreground border-border"
            }`}
          >
            {milestone.status === "unlocked"
              ? "Unlocked"
              : milestone.status === "in_progress"
                ? "Active"
                : "Locked"}
          </Badge>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              milestone.status === "unlocked" ? "bg-success" : "bg-primary"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* CTA button */}
      <Button
        size="sm"
        variant={milestone.status === "locked" ? "ghost" : "outline"}
        className={`w-full h-8 text-xs ${
          milestone.status === "unlocked"
            ? "bg-success/10 text-success border-success/20"
            : ""
        }`}
        disabled={milestone.status === "locked"}
        onClick={() => {
          if (milestone.status === "unlocked") {
            toast.success(`${milestone.unlock} activated! 🎉`);
          }
        }}
        data-ocid={`viral_loop.milestone_unlock_button.${milestone.tier}`}
      >
        {milestone.status === "unlocked"
          ? `✓ ${milestone.unlock}`
          : milestone.unlock}
      </Button>
    </motion.div>
  );
}

function MilestonesSection() {
  const { milestones: ms } = useViralLoop();
  const { milestones, justUnlocked, referralInfo, updateMilestoneProgress } =
    ms;
  const { copied, copyLink } = useViralLoop().referral;

  return (
    <Card
      className="bg-card border-border"
      data-ocid="viral_loop.milestones_section"
    >
      <CardHeader className="pb-3 flex-row items-start justify-between gap-2">
        <div>
          <CardTitle className="text-sm font-semibold text-foreground">
            Invite-to-Unlock Milestone Cards
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your code:{" "}
            <span className="font-mono font-semibold text-primary">
              {referralInfo.referralCode}
            </span>
            {" · "}
            {referralInfo.bonusLeadsEarned} leads earned
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs gap-1.5 shrink-0"
          onClick={copyLink}
          data-ocid="viral_loop.copy_invite_link_button"
        >
          {copied ? "✓ Copied" : "Copy Link"}
        </Button>
      </CardHeader>
      <CardContent className="pb-5">
        <div className="grid sm:grid-cols-3 gap-3">
          {milestones.map((m) => (
            <MilestoneCardItem
              key={m.id}
              milestone={m}
              isJustUnlocked={justUnlocked === m.id}
            />
          ))}
        </div>

        {/* Demo slider for testing */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">
            Simulate referrals (demo):
          </p>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={25}
              defaultValue={1}
              onChange={(e) => updateMilestoneProgress(Number(e.target.value))}
              className="flex-1 accent-primary"
              data-ocid="viral_loop.invite_simulator_slider"
            />
            <span className="text-xs text-muted-foreground w-12 text-right">
              {referralInfo.totalReferrals}/25
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ViralLoopPage() {
  useMetaTags(PAGE_META["/viral-loop"]);
  return (
    <div
      className="min-h-screen bg-background pb-8"
      data-ocid="viral_loop.page"
    >
      {/* Page header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-display font-bold text-foreground">
              Growth Labs
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Share wins · Invite friends · Unlock features
            </p>
          </div>
          <Badge
            variant="outline"
            className="bg-success/10 text-success border-success/20 text-xs"
          >
            Live
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 lg:px-6 space-y-6">
        {/* Top row: Win Cards + Social Proof */}
        <div className="grid lg:grid-cols-2 gap-6">
          <CreateWinSection />
          <SocialProofTicker />
        </div>

        {/* Milestone cards */}
        <MilestonesSection />
      </div>
    </div>
  );
}
