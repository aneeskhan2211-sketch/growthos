import { useCallback, useEffect, useRef, useState } from "react";
import {
  selectMilestones,
  selectReferralInfo,
  selectShareableWins,
  selectSocialProofFeed,
  selectWeeklyChallenge,
  useGrowthStore,
} from "../store/useGrowthStore";
import type {
  LeaderboardEntry,
  MilestoneInfo,
  ReferralInfo,
  ShareableWin,
  SocialProofEntry,
  WeeklyChallenge,
} from "../types/viralLoop";

// ─── Social Proof Ticker Hook ─────────────────────────────────────────────────

/**
 * Manages the rotating social proof feed with 5-8s dwell time.
 * Returns the currently visible entry and controls.
 */
export function useSocialProofTicker() {
  const feed = useGrowthStore(selectSocialProofFeed);
  const addEntry = useGrowthStore((s) => s.addSocialProofEntry);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % feed.length);
      setIsTransitioning(false);
    }, 300);
  }, [feed.length]);

  const refresh = useCallback(() => {
    // Simulate a new real-time entry
    const names = ["Deepak", "Sunita", "Harish", "Pooja", "Arjun", "Laleh"];
    const cities = ["Mumbai", "Pune", "Delhi", "Bengaluru", "Hyderabad"];
    const actions: Array<SocialProofEntry["type"]> = [
      "pitch",
      "lead",
      "deal",
      "share",
    ];
    const type = actions[Math.floor(Math.random() * actions.length)];
    const newEntry: SocialProofEntry = {
      id: `sp-${Date.now()}`,
      userName: names[Math.floor(Math.random() * names.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      action:
        type === "pitch"
          ? `sent ${Math.floor(Math.random() * 20) + 5} pitches`
          : type === "lead"
            ? `generated ${Math.floor(Math.random() * 25) + 5} new leads`
            : type === "deal"
              ? "closed a new deal"
              : "shared their referral link",
      metric:
        type === "deal" ? "revenue" : type === "lead" ? "leads" : undefined,
      metricValue:
        type === "deal"
          ? `₹${(Math.floor(Math.random() * 4) + 1) * 5}k`
          : undefined,
      type,
      timestamp: new Date(),
    };
    addEntry(newEntry);
    setActiveIndex(0);
  }, [addEntry]);

  useEffect(() => {
    if (feed.length === 0) return;
    intervalRef.current = setInterval(advance, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [advance, feed.length]);

  const activeEntry: SocialProofEntry | null =
    feed.length > 0 ? feed[activeIndex % feed.length] : null;

  return {
    feed,
    activeEntry,
    activeIndex,
    isTransitioning,
    refresh,
    advance,
  };
}

// ─── Weekly Challenge Hook ────────────────────────────────────────────────────

export function useWeeklyChallenge() {
  const challenge = useGrowthStore(selectWeeklyChallenge);
  const updateProgress = useGrowthStore((s) => s.updateChallengeProgress);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const compute = () => {
      const diff = challenge.endsAt.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ days, hours, minutes });
    };
    compute();
    const timer = setInterval(compute, 60000);
    return () => clearInterval(timer);
  }, [challenge.endsAt]);

  const progressPct = Math.min(
    100,
    Math.round((challenge.currentValue / challenge.targetValue) * 100),
  );

  const topLeaderboard: LeaderboardEntry[] = [...challenge.leaderboard].sort(
    (a, b) => b.value - a.value,
  );

  const currentUserEntry = challenge.leaderboard.find((e) => e.isCurrentUser);

  return {
    challenge,
    timeLeft,
    progressPct,
    topLeaderboard,
    currentUserEntry,
    updateProgress,
  };
}

// ─── Milestones Hook ──────────────────────────────────────────────────────────

export function useMilestones() {
  const milestones = useGrowthStore(selectMilestones);
  const referralInfo = useGrowthStore(selectReferralInfo);
  const updateMilestoneProgress = useGrowthStore(
    (s) => s.updateMilestoneProgress,
  );
  const [justUnlocked, setJustUnlocked] = useState<string | null>(null);

  const prevMilestonesRef = useRef<MilestoneInfo[]>(milestones);

  useEffect(() => {
    const prev = prevMilestonesRef.current;
    for (const m of milestones) {
      const prevM = prev.find((p) => p.id === m.id);
      if (prevM && prevM.status !== "unlocked" && m.status === "unlocked") {
        setJustUnlocked(m.id);
        setTimeout(() => setJustUnlocked(null), 3000);
        break;
      }
    }
    prevMilestonesRef.current = milestones;
  }, [milestones]);

  const nextMilestone = milestones.find((m) => m.status !== "unlocked");
  const unlockedCount = milestones.filter(
    (m) => m.status === "unlocked",
  ).length;

  return {
    milestones,
    referralInfo,
    justUnlocked,
    nextMilestone,
    unlockedCount,
    updateMilestoneProgress,
  };
}

// ─── Shareable Wins Hook ──────────────────────────────────────────────────────

export function useShareableWins() {
  const wins = useGrowthStore(selectShareableWins);
  const addWin = useGrowthStore((s) => s.addShareableWin);

  const createWin = useCallback(
    (metricValue: string, winType: ShareableWin["winType"] = "deal") => {
      const gradients = [
        "from-violet-500 via-purple-500 to-indigo-600",
        "from-rose-500 via-pink-500 to-fuchsia-600",
        "from-amber-500 via-orange-500 to-red-500",
        "from-emerald-500 via-teal-500 to-cyan-600",
      ];
      const win: ShareableWin = {
        id: `sw-${Date.now()}`,
        userName: "You",
        city: "Mumbai",
        winType,
        metricLabel:
          winType === "deal"
            ? "CLOSED"
            : winType === "leads"
              ? "LEADS"
              : "EARNED",
        metricValue,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        gradient: gradients[Math.floor(Math.random() * gradients.length)],
      };
      addWin(win);
      return win;
    },
    [addWin],
  );

  const shareOnWhatsApp = useCallback((win: ShareableWin) => {
    const text = encodeURIComponent(
      `🚀 NEW WIN! I just ${win.metricLabel.toLowerCase()} ${win.metricValue} using GrowthOS!\n\nGet your free salon growth audit → https://growthos.app/salon-marketing-mumbai`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }, []);

  const shareOnLinkedIn = useCallback((win: ShareableWin) => {
    const url = encodeURIComponent("https://growthos.app");
    const summary = encodeURIComponent(
      `Just ${win.metricLabel.toLowerCase()} ${win.metricValue} for a Mumbai salon using GrowthOS! 🚀`,
    );
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${summary}`,
      "_blank",
    );
  }, []);

  return { wins, createWin, shareOnWhatsApp, shareOnLinkedIn };
}

// ─── Referral Hook ────────────────────────────────────────────────────────────

export function useReferral() {
  const referralInfo: ReferralInfo = useGrowthStore(selectReferralInfo);
  const milestones = useGrowthStore(selectMilestones);
  const [copied, setCopied] = useState(false);

  const copyLink = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralInfo.referralLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [referralInfo.referralLink]);

  const shareOnWhatsApp = useCallback(() => {
    const text = encodeURIComponent(
      `Hey! I've been using GrowthOS to get salon clients in Mumbai and it's working 🔥\n\nJoin free → ${referralInfo.referralLink}\n\nUse my code: ${referralInfo.referralCode}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }, [referralInfo]);

  const activeMilestone = milestones.find((m) => m.status === "in_progress");
  const nextMilestone = milestones.find((m) => m.status === "locked") ?? null;

  return {
    referralInfo,
    milestones,
    copied,
    copyLink,
    shareOnWhatsApp,
    activeMilestone,
    nextMilestone,
  };
}

// ─── Composite: useViralLoop ──────────────────────────────────────────────────

export function useViralLoop() {
  const ticker = useSocialProofTicker();
  const challenge = useWeeklyChallenge();
  const milestones = useMilestones();
  const wins = useShareableWins();
  const referral = useReferral();

  return { ticker, challenge, milestones, wins, referral };
}
