/**
 * useContentCalendar.ts
 * 30-day content calendar generation and management hooks.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export type PostType =
  | "Reel"
  | "Carousel"
  | "Story"
  | "Ad"
  | "Blog"
  | "Social"
  | "Email"
  | "Video";

export interface CalendarPost {
  id: string;
  day: number;
  date: string;
  postType: PostType;
  title: string;
  caption?: string;
  hashtags?: string[];
  hook?: string;
  platform?: string;
  posted: boolean;
  scheduledTime?: string;
}

export interface ContentCalendar {
  id: string;
  niche: string;
  city: string;
  goal: string;
  posts: CalendarPost[];
  generatedAt: number;
  month: string;
}

// ─── Richer mock data with hooks, captions, hashtags ─────────────────────────

const POST_TYPES_CYCLE: PostType[] = [
  "Reel",
  "Carousel",
  "Story",
  "Reel",
  "Ad",
  "Carousel",
  "Story",
];

const HOOKS = [
  "Is your salon losing 30+ customers a month? Here's why.",
  "The 3-minute routine that boosted bookings by 40%.",
  "Before vs After: One change. Massive results.",
  "Your competitors are doing this — are you?",
  "3 things every salon in Mumbai should post this week.",
  "How to get 50 new clients without spending on ads.",
  "The booking tip no one tells you about.",
  "What your customers search before booking a salon.",
  "One offer that converts 8 out of 10 inquiries.",
  "Why 'near me' searches are your best free leads.",
];

const CAPTIONS = [
  "Transform your look today. Limited slots available this week. DM to book now! 💫",
  "Your hair, your story. See the difference our experts make every visit.",
  "Weekend special — Book any 2 services and get 20% off. Valid this weekend only.",
  "Client love speaks louder than ads. Here's what they're saying about us 💬",
  "New month, new look. Our stylists are ready — are you?",
  "5 stars and counting. Join hundreds of happy clients. Link in bio to book.",
  "Walk in, walk out amazing. That's the promise.",
  "Limited slots — first 5 bookings today get a complimentary hair spa.",
];

const HASHTAG_SETS = [
  [
    "#SalonMumbai",
    "#MumbaiSalon",
    "#HairGoals",
    "#BeautyMumbai",
    "#SalonLife",
    "#HairCare",
    "#BookNow",
  ],
  [
    "#GymmingMumbai",
    "#FitnessGoals",
    "#GymLife",
    "#WorkoutMotivation",
    "#HealthyLiving",
    "#FitIndia",
  ],
  [
    "#ClinicCare",
    "#HealthFirst",
    "#WellnessMumbai",
    "#DoctorAdvice",
    "#HealthyIndia",
  ],
  [
    "#FoodMumbai",
    "#MumbaiFoodies",
    "#RestaurantLife",
    "#FoodLovers",
    "#EatWellLiveBetter",
  ],
  [
    "#RealEstateMumbai",
    "#PropertyIndia",
    "#HomeGoals",
    "#BuyHome",
    "#MumbaiProperty",
  ],
];

function generateMockPosts(niche = "Salon"): CalendarPost[] {
  const posts: CalendarPost[] = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const nicheIdx = [
    "Salon",
    "Gym",
    "Clinic",
    "Restaurant",
    "Real Estate",
  ].indexOf(niche);
  const hashtagSet = HASHTAG_SETS[Math.max(0, nicheIdx)] ?? HASHTAG_SETS[0];

  for (let day = 1; day <= 30; day++) {
    const d = new Date(year, month, day);
    const hookIdx = (day - 1) % HOOKS.length;
    const captionIdx = (day - 1) % CAPTIONS.length;
    posts.push({
      id: String(day),
      day,
      date: d.toISOString().split("T")[0],
      postType: POST_TYPES_CYCLE[(day - 1) % POST_TYPES_CYCLE.length],
      title: [
        `Before/After transformation spotlight — ${niche} edition`,
        "Client testimonial: 'Best decision I ever made'",
        `5 tips for getting the most from your ${niche.toLowerCase()} visit`,
        "Weekend special offer — Limited slots available",
        "Behind the scenes: a day in our team's life",
        "How to maintain results between visits",
        "New services now available — see what's new",
      ][(day - 1) % 7],
      hook: HOOKS[hookIdx],
      caption: CAPTIONS[captionIdx],
      hashtags: [...hashtagSet, `#${niche}India`, "#LocalBusiness"],
      platform: [
        "Instagram",
        "Facebook",
        "WhatsApp",
        "Instagram",
        "Google",
        "Instagram",
        "Instagram",
      ][(day - 1) % 7],
      posted: day < now.getDate(),
    });
  }
  return posts;
}

function makeMockCalendar(
  niche = "Salon",
  city = "Mumbai",
  goal = "Get 50 new clients",
): ContentCalendar {
  return {
    id: `${niche}-${city}-${Date.now()}`.replace(/\s/g, "-").toLowerCase(),
    niche,
    city,
    goal,
    posts: generateMockPosts(niche),
    generatedAt: Date.now(),
    month: new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    }),
  };
}

const DEFAULT_CALENDAR = makeMockCalendar();

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Returns the CalendarPost for a given 1-based day number.
 * Returns null if the day is out of range.
 */
export function getPostsForDay(
  calendar: ContentCalendar,
  day: number,
): CalendarPost | null {
  return calendar.posts.find((p) => p.day === day) ?? null;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useContentCalendars() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<ContentCalendar[]>({
    queryKey: ["contentCalendars"],
    queryFn: async () => {
      if (!actor) return [DEFAULT_CALENDAR];
      try {
        const raw = await actor.listContentCalendars?.();
        if (!raw?.length) return [DEFAULT_CALENDAR];
        return raw as unknown as ContentCalendar[];
      } catch {
        return [DEFAULT_CALENDAR];
      }
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useGenerateContentCalendar() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      niche,
      city,
      goal,
    }: {
      niche: string;
      city: string;
      goal: string;
    }) => {
      if (!actor) return makeMockCalendar(niche, city, goal);
      try {
        const result = await actor.generateContentCalendar?.(niche, city, goal);
        return (
          (result as unknown as ContentCalendar) ??
          makeMockCalendar(niche, city, goal)
        );
      } catch {
        return makeMockCalendar(niche, city, goal);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contentCalendars"] }),
  });
}

export function useMarkPostPosted() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      calendarId,
      postId,
    }: {
      calendarId: string;
      postId: string;
    }) => {
      if (!actor) return;
      await actor.markPostPosted?.(calendarId, postId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contentCalendars"] }),
  });
}

export function useDeleteContentCalendar() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) return;
      await actor.deleteContentCalendar?.(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contentCalendars"] }),
  });
}
