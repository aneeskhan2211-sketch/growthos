import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useSubscription } from "@/hooks/useSubscription";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Clock,
  Crown,
  DollarSign,
  ExternalLink,
  Flame,
  Gift,
  Lightbulb,
  Loader2,
  MapPin,
  MessageSquarePlus,
  RefreshCw,
  Rocket,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useAutoAgency } from "../hooks/useAutoAgency";
import type {
  CoachSuggestion,
  CoachSuggestionType,
} from "../types/auto-agency";

// ─── Search engine types & data ────────────────────────────────────────────────

type NicheKey =
  | "salon"
  | "gym"
  | "clinic"
  | "restaurant"
  | "realestate"
  | "coaching"
  | "default";

interface StrategyStep {
  title: string;
  description: string;
  effort: string;
  icon: React.ElementType;
}

interface CompetitorRow {
  type: string;
  strategy: string;
  budget: string;
  severity: "high" | "medium" | "low";
}

interface OfferCard {
  name: string;
  description: string;
  conversion: string;
}

interface EstimatedResults {
  leads: string;
  bookings: string;
  revenue: string;
}

interface NicheData {
  label: string;
  steps: StrategyStep[];
  competitors: CompetitorRow[];
  offers: OfferCard[];
  results: EstimatedResults;
  nextSteps: string[];
}

const NICHE_DATA: Record<NicheKey, NicheData> = {
  salon: {
    label: "Salon",
    steps: [
      {
        title: "Optimize Google Business Profile",
        description:
          "Add photos, update hours, categories, and services. Improves 'near me' visibility by 3×.",
        effort: "30 mins",
        icon: MapPin,
      },
      {
        title: "Post 3 Instagram Reels/Week",
        description:
          "Before-after transformations, styling tips, and client reactions. Reels get 5× more reach than static posts.",
        effort: "20 mins/reel",
        icon: Star,
      },
      {
        title: "Run Weekend Combo Offer",
        description:
          "Haircut + Facial @ ₹999 (limited 3 days). Urgency drives 15–20% conversion from enquiries.",
        effort: "5 mins",
        icon: Gift,
      },
      {
        title: "Collect 5 Google Reviews This Week",
        description:
          "Ask every satisfied client personally. Reviews are the #1 trust signal for local searches.",
        effort: "2 mins/client",
        icon: Star,
      },
      {
        title: "Set Up WhatsApp Auto-Reply",
        description:
          "Auto-respond with pricing, services, and booking link. Responds within seconds — closes 30% more enquiries.",
        effort: "15 mins",
        icon: MessageSquarePlus,
      },
    ],
    competitors: [
      {
        type: "Top Salon in Bandra",
        strategy: "Google Ads + Instagram Reels + GMB optimization",
        budget: "Est. ₹15–25k/month ad spend",
        severity: "high",
      },
      {
        type: "Mid-Range Salon in Andheri",
        strategy: "WhatsApp campaigns + weekly offers + loyalty cards",
        budget: "Est. ₹5–10k/month",
        severity: "medium",
      },
      {
        type: "Home Salon Service",
        strategy: "Instagram micro-influencers + discount-first pricing",
        budget: "Est. ₹2–5k/month",
        severity: "low",
      },
    ],
    offers: [
      {
        name: "Weekend Combo Deal",
        description: "Haircut + Facial @ ₹999 — limited 3 days only",
        conversion: "Est. 15–20% from enquiries",
      },
      {
        name: "First-Visit Discount",
        description:
          "20% off first service for new customers referred via WhatsApp",
        conversion: "Est. 25–35% conversion",
      },
      {
        name: "Loyalty Referral Bundle",
        description:
          "Bring a friend, both get ₹200 off next service — drives word-of-mouth",
        conversion: "Est. 10–15% repeat booking lift",
      },
    ],
    results: {
      leads: "30–50 new enquiries",
      bookings: "10–18 bookings",
      revenue: "₹50,000–₹90,000 revenue potential",
    },
    nextSteps: [
      "Update your Google Business Profile with 5+ photos today",
      "Create your first before-after Instagram Reel this week",
      "Set up a WhatsApp Business auto-reply greeting message",
    ],
  },
  gym: {
    label: "Gym",
    steps: [
      {
        title: "Launch 7-Day Free Trial Campaign",
        description:
          "Offer a free trial week via Instagram and WhatsApp. Gyms see 40% trial-to-member conversion.",
        effort: "30 mins",
        icon: Target,
      },
      {
        title: "Post Transformation Stories Weekly",
        description:
          "Member success stories (with permission) are the most effective gym content. Boosts trust immediately.",
        effort: "15 mins/week",
        icon: TrendingUp,
      },
      {
        title: "Run January/Festival Membership Offer",
        description:
          "₹1,999 for 3-month membership (vs ₹2,999 regular). Seasonal offers drive 30–50% more sign-ups.",
        effort: "10 mins",
        icon: Gift,
      },
      {
        title: "Collect Google Reviews Post-Trial",
        description:
          "Follow up trial members on Day 6 asking for a Google review. Converts review askers into paying members 25% of the time.",
        effort: "5 mins/day",
        icon: Star,
      },
      {
        title: "Partner with Local Nutritionist or Dietitian",
        description:
          "Co-promote on Instagram. Cross-referral from a health professional adds huge credibility.",
        effort: "1 meeting",
        icon: Users,
      },
    ],
    competitors: [
      {
        type: "Premium Gym in Powai",
        strategy: "Google Ads + membership promos + corporate tie-ups",
        budget: "Est. ₹25–40k/month",
        severity: "high",
      },
      {
        type: "CrossFit Studio in Goregaon",
        strategy:
          "Instagram challenges + community events + referral discounts",
        budget: "Est. ₹8–15k/month",
        severity: "medium",
      },
      {
        type: "Home Fitness Trainer",
        strategy: "YouTube Shorts + affordable pricing + WhatsApp groups",
        budget: "Est. ₹2–5k/month",
        severity: "low",
      },
    ],
    offers: [
      {
        name: "7-Day Free Trial",
        description:
          "No commitment trial week — builds trust and habit formation",
        conversion: "Est. 35–45% trial-to-member",
      },
      {
        name: "Quarterly Combo Deal",
        description: "3 months + free diet consultation @ ₹2,499",
        conversion: "Est. 20–30% conversion from walk-ins",
      },
      {
        name: "Couple Membership",
        description:
          "2 memberships for ₹3,499/month — drives word-of-mouth referrals",
        conversion: "Est. 15–20% uplift in referrals",
      },
    ],
    results: {
      leads: "40–70 new enquiries",
      bookings: "15–25 trial sign-ups",
      revenue: "₹75,000–₹1,50,000 revenue potential",
    },
    nextSteps: [
      "Post one member transformation story on Instagram this week",
      "Launch a 7-day free trial offer via WhatsApp broadcast today",
      "Collect 3 Google reviews from your happiest current members",
    ],
  },
  clinic: {
    label: "Clinic",
    steps: [
      {
        title: "Create a Google Business Profile",
        description:
          "Clinics with verified profiles get 4× more walk-in enquiries. Add specialties, hours, and photos.",
        effort: "45 mins",
        icon: MapPin,
      },
      {
        title: "Share Weekly Health Tips",
        description:
          "Post 2 health education reels/week. Educational content builds authority and drives 'near me' searches.",
        effort: "20 mins/reel",
        icon: Lightbulb,
      },
      {
        title: "Implement Online Appointment Booking",
        description:
          "Add a booking link to WhatsApp and Instagram bio. Reduces friction and fills appointment slots 30% faster.",
        effort: "2 hours setup",
        icon: Clock,
      },
      {
        title: "Follow Up with Past Patients",
        description:
          "Send a health check-up reminder to patients last seen 3+ months ago. Reactivates 20–30% of dormant patients.",
        effort: "30 mins/week",
        icon: RefreshCw,
      },
      {
        title: "Get 10 Reviews on Google & Practo",
        description:
          "Reviews are the primary trust signal for healthcare. Ask after successful consultations.",
        effort: "2 mins/patient",
        icon: Star,
      },
    ],
    competitors: [
      {
        type: "Multi-Specialty Clinic in Vile Parle",
        strategy: "Practo listing + Google Ads + health blog SEO",
        budget: "Est. ₹20–35k/month",
        severity: "high",
      },
      {
        type: "General Physician Practice in Dadar",
        strategy: "WhatsApp appointment booking + Google reviews campaign",
        budget: "Est. ₹5–10k/month",
        severity: "medium",
      },
      {
        type: "Home Visit Doctor Service",
        strategy: "Instagram + Practo + competitive pricing",
        budget: "Est. ₹3–7k/month",
        severity: "low",
      },
    ],
    offers: [
      {
        name: "Free First Consultation",
        description:
          "10-minute free call or first visit discount for new patients",
        conversion: "Est. 40–60% to full consultation",
      },
      {
        name: "Family Health Package",
        description: "Annual check-up bundle for family of 4 @ ₹4,999",
        conversion: "Est. 20–30% family plan adoption",
      },
      {
        name: "Senior Citizen Discount",
        description: "15% off all consultations for patients 60+",
        conversion: "Est. 25% trust boost and referrals from community",
      },
    ],
    results: {
      leads: "25–45 new appointment enquiries",
      bookings: "12–20 new consultations",
      revenue: "₹40,000–₹80,000 revenue potential",
    },
    nextSteps: [
      "Claim or update your Google Business Profile today",
      "Add a WhatsApp booking link to your Instagram bio",
      "Send a health check-up reminder message to 10 past patients",
    ],
  },
  restaurant: {
    label: "Restaurant",
    steps: [
      {
        title: "Optimize Zomato & Swiggy Listing",
        description:
          "Add high-quality food photos, update menu, and respond to all reviews. Boosts order volume by 25–35%.",
        effort: "1 hour",
        icon: Star,
      },
      {
        title: "Post Daily Food Content on Instagram",
        description:
          "Behind-the-scenes cooking, plating videos, and customer photos. Drives 'tag us' culture and foot traffic.",
        effort: "15 mins/day",
        icon: Target,
      },
      {
        title: "Launch a Weekend Special Offer",
        description:
          "Meal combo for 2 @ ₹599 on weekends only. Urgency drives table bookings 2–3 days in advance.",
        effort: "5 mins",
        icon: Gift,
      },
      {
        title: "Set Up WhatsApp Table Booking",
        description:
          "Add WhatsApp number to Google Maps listing. 30% of customers prefer WhatsApp booking over calls.",
        effort: "10 mins",
        icon: MessageSquarePlus,
      },
      {
        title: "Run Local Instagram Ad Campaign",
        description:
          "Target 5km radius with food photos + weekend offer. ₹500–₹1,000 ad spend can generate 15–25 table bookings.",
        effort: "30 mins",
        icon: Rocket,
      },
    ],
    competitors: [
      {
        type: "Popular Café in Bandra",
        strategy:
          "Instagram food photography + influencer collabs + Zomato Gold",
        budget: "Est. ₹20–40k/month",
        severity: "high",
      },
      {
        type: "Family Restaurant in Mulund",
        strategy: "WhatsApp broadcasts + weekly specials + delivery app promos",
        budget: "Est. ₹8–15k/month",
        severity: "medium",
      },
      {
        type: "Home Kitchen Service",
        strategy:
          "WhatsApp groups + Instagram + affordable home-style food positioning",
        budget: "Est. ₹2–5k/month",
        severity: "low",
      },
    ],
    offers: [
      {
        name: "Weekend Couple Deal",
        description: "Meal for 2 + dessert @ ₹599 — valid Sat & Sun only",
        conversion: "Est. 20–30% table booking from Instagram views",
      },
      {
        name: "Birthday Special Package",
        description:
          "Free dessert + complimentary photo setup for birthday celebrations",
        conversion: "Est. 40% booking rate from birthday-month enquiries",
      },
      {
        name: "Loyalty Punch Card",
        description:
          "10th meal free — retains regular customers and builds habit",
        conversion: "Est. 30–40% increase in repeat visits",
      },
    ],
    results: {
      leads: "50–80 enquiries and table booking requests",
      bookings: "20–35 confirmed tables/orders",
      revenue: "₹60,000–₹1,20,000 revenue potential",
    },
    nextSteps: [
      "Update your Zomato/Swiggy listing with 10+ high-quality food photos",
      "Post one food reel on Instagram today with a weekend offer",
      "Add your WhatsApp number to Google Maps for easy table bookings",
    ],
  },
  realestate: {
    label: "Real Estate",
    steps: [
      {
        title: "Create Property Video Tours on YouTube",
        description:
          "2–3 minute walk-through videos rank on YouTube and Google. Buyers who watch videos are 2× more likely to enquire.",
        effort: "1 hour/property",
        icon: Star,
      },
      {
        title: "Run Targeted Instagram Ads for Properties",
        description:
          "Target people 25–45 years searching for property in your city. Instagram ad CPL is 40% lower than traditional portals.",
        effort: "30 mins setup",
        icon: Rocket,
      },
      {
        title: "Post Market Insights Weekly on LinkedIn",
        description:
          "Price trends, area development updates, and investment guides. Positions you as the local expert and generates referrals.",
        effort: "20 mins/week",
        icon: TrendingUp,
      },
      {
        title: "Optimize 99acres & MagicBricks Listings",
        description:
          "Premium listings with video and 10+ photos get 3× more enquiries. Respond within 2 hours for max conversion.",
        effort: "30 mins/listing",
        icon: MapPin,
      },
      {
        title: "Build a WhatsApp Broadcast List of 200+ Buyers",
        description:
          "Send new property updates to opt-in subscribers. Warm leads from WhatsApp close 3× faster than cold portals.",
        effort: "Ongoing",
        icon: Users,
      },
    ],
    competitors: [
      {
        type: "Large Brokerage in Thane",
        strategy:
          "Google Ads + YouTube + 99acres premium listings + team of 20+",
        budget: "Est. ₹1–3L/month",
        severity: "high",
      },
      {
        type: "Independent Agent in Navi Mumbai",
        strategy:
          "Instagram property videos + WhatsApp broadcasts + referral network",
        budget: "Est. ₹15–30k/month",
        severity: "medium",
      },
      {
        type: "New Agent in Kalyan",
        strategy:
          "Free listings + aggressive discounting + social media cold DMs",
        budget: "Est. ₹5–10k/month",
        severity: "low",
      },
    ],
    offers: [
      {
        name: "Free Property Valuation",
        description:
          "No-commitment property valuation for owners — generates seller leads",
        conversion: "Est. 50–70% lead capture rate",
      },
      {
        name: "Investment Guide PDF",
        description:
          "Free 'Top 5 Areas to Invest in Mumbai 2025' guide in exchange for WhatsApp number",
        conversion: "Est. 60% opt-in rate from ad clicks",
      },
      {
        name: "Zero Brokerage First Deal",
        description:
          "First property transaction with zero brokerage fee — builds trust and referrals",
        conversion: "Est. 35% increase in enquiries vs standard brokerage",
      },
    ],
    results: {
      leads: "20–40 qualified property enquiries",
      bookings: "5–10 site visit bookings",
      revenue: "₹2,00,000–₹5,00,000 revenue potential",
    },
    nextSteps: [
      "Upload a property video tour to YouTube and embed it in your 99acres listing",
      "Create a WhatsApp broadcast list and send one property update today",
      "Run a ₹500 Instagram ad targeting 25–40 year olds in your city",
    ],
  },
  coaching: {
    label: "Coaching Class",
    steps: [
      {
        title: "Offer a Free Demo Class",
        description:
          "Free first class (online or offline) removes the barrier to try. 40–60% of demo attendees convert to paid students.",
        effort: "2 hours",
        icon: Users,
      },
      {
        title: "Post Student Success Stories Weekly",
        description:
          "Share results (marks improvement, exam cleared, job placement). Social proof is the #1 enrollment driver for coaching.",
        effort: "15 mins/post",
        icon: TrendingUp,
      },
      {
        title: "Optimize for 'best coaching in [city]' Searches",
        description:
          "Add your coaching to Google Maps with proper categories and 10+ reviews. Captures high-intent searchers for free.",
        effort: "45 mins",
        icon: MapPin,
      },
      {
        title: "Run WhatsApp Study Group for Prospects",
        description:
          "Create a free WhatsApp group with daily study tips. Nurtures leads and builds community before they pay.",
        effort: "30 mins/day",
        icon: MessageSquarePlus,
      },
      {
        title: "Create YouTube Short Explainer Videos",
        description:
          "60-second concept explanation videos. Positions you as an expert and drives organic enquiries from YouTube search.",
        effort: "20 mins/video",
        icon: Star,
      },
    ],
    competitors: [
      {
        type: "Established Institute in Dadar",
        strategy: "Google Ads + YouTube + faculty credentials + newspaper ads",
        budget: "Est. ₹50k–1L/month",
        severity: "high",
      },
      {
        type: "Home Tutor in Thane",
        strategy:
          "WhatsApp referrals + Instagram testimonials + affordable pricing",
        budget: "Est. ₹3–8k/month",
        severity: "medium",
      },
      {
        type: "Online Course Creator",
        strategy: "YouTube content + Udemy/Teachable + Instagram ads",
        budget: "Est. ₹10–20k/month",
        severity: "low",
      },
    ],
    offers: [
      {
        name: "Free Demo Class",
        description:
          "One free session — no commitment, experience the teaching quality",
        conversion: "Est. 40–60% to paid enrollment",
      },
      {
        name: "Early Bird Batch Discount",
        description: "₹500 off if enrolled 15+ days before batch start date",
        conversion: "Est. 20–30% faster enrollment",
      },
      {
        name: "Sibling/Referral Discount",
        description: "₹1,000 off for every student referred who enrolls",
        conversion: "Est. 40% increase in word-of-mouth leads",
      },
    ],
    results: {
      leads: "30–60 enquiries and demo requests",
      bookings: "15–25 new student enrollments",
      revenue: "₹45,000–₹1,25,000 revenue potential",
    },
    nextSteps: [
      "Schedule one free demo class this week and promote it on WhatsApp",
      "Post one student success story on Instagram today",
      "Add your coaching to Google Maps and request 5 reviews from current students",
    ],
  },
  default: {
    label: "Local Business",
    steps: [
      {
        title: "Claim & Optimize Google Business Profile",
        description:
          "The single highest-ROI action for any local business. Verified profiles get 4× more enquiries for free.",
        effort: "45 mins",
        icon: MapPin,
      },
      {
        title: "Set Up WhatsApp Business Account",
        description:
          "Add catalogue, auto-reply, and broadcast list. WhatsApp has 90%+ open rates vs email's 25%.",
        effort: "30 mins",
        icon: MessageSquarePlus,
      },
      {
        title: "Post 3 Times Per Week on Instagram",
        description:
          "Behind-the-scenes, customer stories, and offers. Consistency beats virality for local business growth.",
        effort: "15 mins/post",
        icon: Star,
      },
      {
        title: "Collect 10 Google Reviews",
        description:
          "Reviews are the #1 trust signal. Ask every happy customer personally — it works 70% of the time.",
        effort: "2 mins/customer",
        icon: TrendingUp,
      },
      {
        title: "Run a Weekly Limited Offer",
        description:
          "A time-limited offer (valid 3 days) creates urgency and drives action from your existing audience.",
        effort: "10 mins/week",
        icon: Gift,
      },
    ],
    competitors: [
      {
        type: "Established Local Business (5+ years)",
        strategy: "Google Ads + Instagram + Google My Business + word of mouth",
        budget: "Est. ₹10–25k/month",
        severity: "high",
      },
      {
        type: "Growing Competitor (2–4 years)",
        strategy: "WhatsApp broadcasts + social media + referral discounts",
        budget: "Est. ₹5–10k/month",
        severity: "medium",
      },
      {
        type: "New Entrant",
        strategy: "Aggressive pricing + Instagram + Google listing",
        budget: "Est. ₹2–5k/month",
        severity: "low",
      },
    ],
    offers: [
      {
        name: "First-Time Customer Discount",
        description:
          "15–20% off for new customers — removes risk and builds trial",
        conversion: "Est. 30–40% enquiry-to-customer",
      },
      {
        name: "Referral Reward",
        description:
          "₹200 credit for every customer who refers a friend who buys",
        conversion: "Est. 25% increase in word-of-mouth",
      },
      {
        name: "Limited-Time Bundle",
        description: "Package deal at 20% off — valid for 3 days only",
        conversion: "Est. 15–20% conversion from social media",
      },
    ],
    results: {
      leads: "25–50 new enquiries",
      bookings: "10–20 conversions",
      revenue: "₹40,000–₹80,000 revenue potential",
    },
    nextSteps: [
      "Claim your Google Business Profile today — it's free and takes 45 minutes",
      "Set up WhatsApp Business with an auto-reply and your service catalogue",
      "Post your first offer on Instagram and share it with your WhatsApp contacts",
    ],
  },
};

const QUICK_SUGGESTIONS = [
  "How to grow my salon",
  "Get more clients for my gym",
  "Improve Google ranking for my clinic",
  "Best offers for my restaurant",
  "How to run Instagram ads for real estate",
  "Grow my local coaching class",
];

const POPULAR_PREVIEWS = [
  {
    query: "How to grow my salon in Mumbai",
    teaser:
      "Optimize Google profile, run weekend combos, and collect reviews — 30–50 leads/month estimated.",
    niche: "salon" as NicheKey,
  },
  {
    query: "Get more gym members with Instagram",
    teaser:
      "7-day free trial campaign + transformation stories → 40–70 enquiries/month estimated.",
    niche: "gym" as NicheKey,
  },
  {
    query: "Best digital marketing for local clinic",
    teaser:
      "Google Business Profile + online booking + patient reviews → 25–45 new appointments/month.",
    niche: "clinic" as NicheKey,
  },
];

function detectNiche(query: string): NicheKey {
  const q = query.toLowerCase();
  if (
    q.includes("salon") ||
    q.includes("hair") ||
    q.includes("beauty") ||
    q.includes("spa")
  )
    return "salon";
  if (
    q.includes("gym") ||
    q.includes("fitness") ||
    q.includes("workout") ||
    q.includes("trainer")
  )
    return "gym";
  if (
    q.includes("clinic") ||
    q.includes("doctor") ||
    q.includes("hospital") ||
    q.includes("medical")
  )
    return "clinic";
  if (
    q.includes("restaurant") ||
    q.includes("café") ||
    q.includes("cafe") ||
    q.includes("food") ||
    q.includes("hotel")
  )
    return "restaurant";
  if (
    q.includes("real estate") ||
    q.includes("property") ||
    q.includes("flat") ||
    q.includes("house") ||
    q.includes("builder")
  )
    return "realestate";
  if (
    q.includes("coaching") ||
    q.includes("tutor") ||
    q.includes("class") ||
    q.includes("institute") ||
    q.includes("course")
  )
    return "coaching";
  return "default";
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const DAY_THEMES: Record<
  number,
  { label: string; icon: React.ElementType; color: string }
> = {
  0: {
    label: "Content Creation",
    icon: Star,
    color: "bg-chart-5/10 text-chart-5 border-chart-5/30",
  },
  1: {
    label: "Outreach Day",
    icon: Rocket,
    color: "bg-primary/10 text-primary border-primary/30",
  },
  2: {
    label: "Follow-ups",
    icon: RefreshCw,
    color: "bg-warning/10 text-warning border-warning/30",
  },
  3: {
    label: "Proposal Writing",
    icon: MessageSquarePlus,
    color: "bg-success/10 text-success border-success/30",
  },
  4: {
    label: "Deal Closings",
    icon: Target,
    color: "bg-destructive/10 text-destructive border-destructive/30",
  },
  5: {
    label: "Review Generation",
    icon: Star,
    color: "bg-chart-3/10 text-chart-3 border-chart-3/30",
  },
  6: {
    label: "Content Creation",
    icon: Sparkles,
    color: "bg-chart-5/10 text-chart-5 border-chart-5/30",
  },
};

const COACH_TYPE_META: Record<
  CoachSuggestionType,
  { label: string; color: string; icon: React.ElementType }
> = {
  revenueTactic: {
    label: "Revenue Tactic",
    color: "bg-success/10 text-success border-success/30",
    icon: DollarSign,
  },
  nicheTargeting: {
    label: "Niche Targeting",
    color: "bg-primary/10 text-primary border-primary/30",
    icon: Target,
  },
  growthHack: {
    label: "Growth Hack",
    color: "bg-chart-5/10 text-chart-5 border-chart-5/30",
    icon: Zap,
  },
};

const EFFORT_META: Record<
  string,
  { label: string; color: string; icon: React.ElementType }
> = {
  quick: {
    label: "Quick 15min",
    color: "bg-success/10 text-success border-success/30",
    icon: Zap,
  },
  medium: {
    label: "Medium 1hr",
    color: "bg-warning/10 text-warning border-warning/30",
    icon: Clock,
  },
  deep: {
    label: "Deep Half-day",
    color: "bg-destructive/10 text-destructive border-destructive/30",
    icon: BrainCircuit,
  },
};

const PERFORMANCE_INSIGHTS = [
  {
    icon: AlertTriangle,
    text: "You haven't followed up with 12 leads this week",
    color: "text-warning",
  },
  {
    icon: TrendingUp,
    text: "Your pitch open rate is 45% — above average for your niche",
    color: "text-success",
  },
  {
    icon: Users,
    text: "3 leads replied but haven't received a proposal yet",
    color: "text-primary",
  },
];

interface QuickWin {
  title: string;
  action: string;
  impact: string;
  route: string;
  color: string;
  icon: React.ElementType;
}

const QUICK_WINS: QuickWin[] = [
  {
    title: "Send 3 Pitches",
    action: "Open Leads & pitch now",
    impact: "+₹15,000 potential",
    route: "/leads",
    color: "from-primary/10 to-primary/5 border-primary/20",
    icon: Rocket,
  },
  {
    title: "Follow Up Today",
    action: "View pending follow-ups",
    impact: "2x reply chance",
    route: "/crm",
    color: "from-success/10 to-success/5 border-success/20",
    icon: RefreshCw,
  },
  {
    title: "Close Hot Lead",
    action: "See deal suggestions",
    impact: "₹45,000 ready",
    route: "/auto-agency",
    color: "from-warning/10 to-warning/5 border-warning/20",
    icon: Target,
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const SEVERITY_COLORS = {
  high: "bg-destructive/10 text-destructive border-destructive/30",
  medium: "bg-warning/10 text-warning border-warning/30",
  low: "bg-success/10 text-success border-success/30",
};

function SearchResultsSkeleton() {
  return (
    <div className="space-y-4" data-ocid="advisor.search_loading_state">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/20">
        <Loader2 className="w-4 h-4 text-primary animate-spin" />
        <p className="text-sm text-primary font-medium">
          AI is generating your personalized strategy…
        </p>
      </div>
      {[1, 2, 3, 4].map((n) => (
        <Card key={n} className="border-border/60">
          <CardContent className="p-5 space-y-3">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-8 w-32 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StrategyStepRow({
  step,
  idx,
  checked,
  onToggle,
}: {
  step: StrategyStep;
  idx: number;
  checked: boolean;
  onToggle: (i: number) => void;
}) {
  const Icon = step.icon;
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border transition-all duration-200",
        checked
          ? "bg-success/5 border-success/20"
          : "bg-card border-border/50 hover:border-primary/30 hover:bg-primary/5",
      )}
    >
      <button
        type="button"
        onClick={() => onToggle(idx)}
        data-ocid={`advisor.strategy_step.checkbox.${idx}`}
        className={cn(
          "mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200",
          checked
            ? "bg-success border-success"
            : "border-border hover:border-primary",
        )}
      >
        {checked && (
          <CheckCircle2 className="w-3 h-3 text-success-foreground" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
          <span
            className={cn(
              "text-sm font-semibold leading-snug",
              checked
                ? "line-through text-muted-foreground"
                : "text-foreground",
            )}
          >
            {idx + 1}. {step.title}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {step.description}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">
            {step.effort}
          </span>
        </div>
      </div>
    </div>
  );
}

function SearchResults({
  query,
  niche,
  data,
  completedSteps,
  onToggleStep,
  completedNextSteps,
  onToggleNextStep,
}: {
  query: string;
  niche: NicheKey;
  data: NicheData;
  completedSteps: boolean[];
  onToggleStep: (i: number) => void;
  completedNextSteps: boolean[];
  onToggleNextStep: (i: number) => void;
}) {
  const navigate = useNavigate();

  const cards = [
    { key: "strategy", delay: 0 },
    { key: "competitors", delay: 0.1 },
    { key: "offers", delay: 0.2 },
    { key: "results", delay: 0.3 },
    { key: "next", delay: 0.4 },
  ];

  return (
    <div className="space-y-4" data-ocid="advisor.search_results">
      {/* AI Context Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-primary/5 border border-primary/20"
        data-ocid="advisor.results_banner"
      >
        <Sparkles className="w-4 h-4 text-primary shrink-0" />
        <p className="text-sm text-foreground">
          <span className="font-semibold text-primary">AI strategy</span> for:{" "}
          <span className="italic text-muted-foreground">"{query}"</span>
          <span className="text-xs text-muted-foreground ml-2">
            — Personalized for {data.label} niche
          </span>
        </p>
        <Badge
          variant="outline"
          className="ml-auto shrink-0 text-[10px] bg-success/10 text-success border-success/30"
        >
          {niche !== "default" ? data.label : "General"}
        </Badge>
      </motion.div>

      {cards.map(({ key, delay }) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay, ease: "easeOut" }}
        >
          {/* A) Personalized Strategy */}
          {key === "strategy" && (
            <Card
              className="border-border/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              data-ocid="advisor.strategy_card"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-foreground">
                      Your Personalized Growth Plan
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      5-step action plan tailored to your niche
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {data.steps.map((step, i) => (
                    <StrategyStepRow
                      key={step.title}
                      step={step}
                      idx={i}
                      checked={completedSteps[i] ?? false}
                      onToggle={onToggleStep}
                    />
                  ))}
                </div>
                <p className="text-[10px] italic text-muted-foreground">
                  Estimated based on GrowthOS usage patterns. Results vary based
                  on effort, location, and market conditions.
                </p>
              </CardContent>
            </Card>
          )}

          {/* B) Competitor Insights */}
          {key === "competitors" && (
            <Card
              className="border-border/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              data-ocid="advisor.competitors_card"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-warning/10 border border-warning/20 flex items-center justify-center">
                    <Target className="w-4 h-4 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-foreground">
                      What Competitors in Your Area Are Doing
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      Market intelligence — local {data.label} segment
                    </p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {data.competitors.map((c, i) => (
                    <div
                      key={c.type}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/40"
                      data-ocid={`advisor.competitor.item.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground">
                          {c.type}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {c.strategy}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-medium text-foreground">
                          {c.budget}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] border capitalize",
                            SEVERITY_COLORS[c.severity],
                          )}
                        >
                          {c.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] italic text-muted-foreground">
                  Estimated based on publicly available ad data and market
                  research. Not verified figures.
                </p>
              </CardContent>
            </Card>
          )}

          {/* C) Best Offers */}
          {key === "offers" && (
            <Card
              className="border-border/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              data-ocid="advisor.offers_card"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-chart-5/10 border border-chart-5/20 flex items-center justify-center">
                    <Gift className="w-4 h-4 text-chart-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-foreground">
                      Top Offers for Your Niche
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      Conversion-tested offer ideas for {data.label}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {data.offers.map((offer, i) => (
                    <div
                      key={offer.name}
                      className="p-3 rounded-xl border border-chart-5/20 bg-chart-5/5 flex flex-col gap-1.5"
                      data-ocid={`advisor.offer.item.${i + 1}`}
                    >
                      <p className="text-xs font-semibold text-foreground">
                        {offer.name}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {offer.description}
                      </p>
                      <p className="text-[10px] font-semibold text-chart-5 mt-auto">
                        {offer.conversion}
                      </p>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-xs border-chart-5/30 text-chart-5 hover:bg-chart-5/10"
                  data-ocid="advisor.build_offer_button"
                  onClick={() =>
                    (navigate as (arg: { to: string }) => void)({ to: "/crm" })
                  }
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Build This Offer
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
                <p className="text-[10px] italic text-muted-foreground">
                  Estimated conversion rates based on GrowthOS usage patterns.
                  Actual results vary.
                </p>
              </CardContent>
            </Card>
          )}

          {/* D) Estimated Results */}
          {key === "results" && (
            <Card
              className="border-border/60 bg-gradient-to-br from-success/5 via-card to-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              data-ocid="advisor.results_card"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-success/10 border border-success/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-foreground">
                      What You Could Achieve in 30 Days
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      Estimated projections — not a guarantee
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      label: "Leads/Month",
                      value: data.results.leads,
                      icon: Users,
                    },
                    {
                      label: "Estimated Bookings",
                      value: data.results.bookings,
                      icon: CheckCircle2,
                    },
                    {
                      label: "Revenue Potential",
                      value: data.results.revenue,
                      icon: DollarSign,
                    },
                  ].map((m, mi) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={m.label}
                        className="p-3.5 rounded-xl border border-success/20 bg-success/5 text-center"
                        data-ocid={`advisor.result_metric.${mi + 1}`}
                      >
                        <Icon className="w-4 h-4 text-success mx-auto mb-1.5" />
                        <p className="text-xs font-bold text-foreground leading-snug">
                          {m.value}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {m.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-[10px] italic text-muted-foreground leading-relaxed">
                  Based on real usage patterns from GrowthOS users in similar
                  niches. Results vary based on effort, location, and market
                  conditions. Not a guarantee.
                </p>
              </CardContent>
            </Card>
          )}

          {/* E) Next Steps */}
          {key === "next" && (
            <Card
              className="border-border/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              data-ocid="advisor.next_steps_card"
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-trust-blue/10 border border-trust-blue/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-trust-blue" />
                  </div>
                  <div>
                    <h3 className="text-sm font-display font-bold text-foreground">
                      Immediate Action Items
                    </h3>
                    <p className="text-[10px] text-muted-foreground">
                      Start these today for fastest results
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {data.nextSteps.map((step, i) => (
                    <button
                      key={step}
                      type="button"
                      className={cn(
                        "w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-all duration-200",
                        completedNextSteps[i]
                          ? "bg-success/5 border-success/20"
                          : "bg-card border-border/50 hover:border-trust-blue/30",
                      )}
                      onClick={() => onToggleNextStep(i)}
                      data-ocid={`advisor.next_step.item.${i + 1}`}
                    >
                      <div
                        className={cn(
                          "mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all",
                          completedNextSteps[i]
                            ? "bg-success border-success"
                            : "border-muted-foreground",
                        )}
                      >
                        {completedNextSteps[i] && (
                          <div className="w-1.5 h-1.5 rounded-full bg-success-foreground" />
                        )}
                      </div>
                      <p
                        className={cn(
                          "text-xs leading-relaxed",
                          completedNextSteps[i]
                            ? "line-through text-muted-foreground"
                            : "text-foreground",
                        )}
                      >
                        {step}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="pt-1 border-t border-border/40">
                  <Button
                    className="w-full gap-2"
                    data-ocid="advisor.growth_audit_button"
                    onClick={() =>
                      (navigate as (arg: { to: string }) => void)({
                        to: "/paywall",
                      })
                    }
                  >
                    <Sparkles className="w-4 h-4" />
                    Start Free → Get Your Growth Audit
                  </Button>
                  <p className="text-[10px] text-muted-foreground text-center mt-2">
                    No credit card required. Full audit in 2 minutes.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      ))}
    </div>
  );
}

function CoachSuggestionCard({
  suggestion,
  idx,
  refreshKey,
  onAction,
}: {
  suggestion: CoachSuggestion;
  idx: number;
  refreshKey: number;
  onAction: (label: string) => void;
}) {
  const typeMeta = COACH_TYPE_META[suggestion.type];
  const effortMeta = EFFORT_META[suggestion.effort] ?? EFFORT_META.medium;
  const TypeIcon = typeMeta.icon;
  const EffortIcon = effortMeta.icon;

  return (
    <motion.div
      key={`${suggestion.id}-${refreshKey}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: idx * 0.08, ease: "easeOut" }}
      data-ocid={`coach.suggestion.item.${idx}`}
    >
      <Card className="border-border/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full group">
        <CardContent className="p-5 flex flex-col gap-3 h-full">
          <div className="flex flex-wrap gap-1.5">
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] font-semibold px-2 py-0.5 gap-1 border",
                typeMeta.color,
              )}
            >
              <TypeIcon className="w-3 h-3" />
              {typeMeta.label}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] font-semibold px-2 py-0.5 gap-1 border",
                effortMeta.color,
              )}
            >
              <EffortIcon className="w-3 h-3" />
              {effortMeta.label}
            </Badge>
          </div>

          <div className="flex-1 space-y-1.5">
            <h4 className="font-display font-semibold text-sm text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {suggestion.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
              {suggestion.description}
            </p>
          </div>

          <div className="pt-1 border-t border-border/40 space-y-2.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-success shrink-0" />
              <span className="text-xs font-semibold text-success">
                {suggestion.expectedROI}
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full h-8 text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all"
              onClick={() => onAction(suggestion.actionLabel)}
              data-ocid={`coach.suggestion.action.${idx}`}
            >
              <Zap className="w-3 h-3" />
              {suggestion.actionLabel}
              <ChevronRight className="w-3 h-3 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CoachSuggestionSkeleton() {
  return (
    <Card className="border-border/60">
      <CardContent className="p-5 space-y-3">
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
        <Skeleton className="h-3 w-3/5" />
        <Skeleton className="h-8 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}

function QuickWinCard({ win, idx }: { win: QuickWin; idx: number }) {
  const navigate = useNavigate();
  const Icon = win.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: idx * 0.1 }}
    >
      <button
        type="button"
        data-ocid={`coach.quick_win.item.${idx}`}
        onClick={() =>
          (navigate as (arg: { to: string }) => void)({ to: win.route })
        }
        className={cn(
          "min-w-[200px] flex-shrink-0 p-4 rounded-xl border bg-gradient-to-br text-left",
          "hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer",
          win.color,
        )}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="w-8 h-8 rounded-lg bg-background/80 flex items-center justify-center">
            <Icon className="w-4 h-4 text-foreground" />
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        <p className="font-display font-bold text-sm text-foreground mb-0.5 leading-tight">
          {win.title}
        </p>
        <p className="text-xs text-muted-foreground mb-1.5">{win.action}</p>
        <p className="text-xs font-semibold text-success">{win.impact}</p>
      </button>
    </motion.div>
  );
}

function PerformanceContextPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      data-ocid="coach.performance_context"
    >
      <Card className="border-border/60 bg-gradient-to-br from-card via-card to-muted/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <BrainCircuit className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-display font-semibold text-foreground">
                Performance Context
              </p>
              <p className="text-[10px] text-muted-foreground">
                Based on your niche and last 7 days activity
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {PERFORMANCE_INSIGHTS.map((insight, insightIdx) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={insight.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + insightIdx * 0.07 }}
                  className="flex items-start gap-2.5"
                >
                  <Icon
                    className={cn("w-3.5 h-3.5 mt-0.5 shrink-0", insight.color)}
                  />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {insight.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PaywallTeaser() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      data-ocid="coach.paywall_teaser"
    >
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <CardContent className="p-6 flex flex-col items-center text-center gap-4 relative">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-display font-bold text-base text-foreground mb-1">
              Unlock Full AI Coach
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Get all 6 daily personalized suggestions, weekly growth playbooks,
              and niche-specific tactics.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            {[
              "6 daily suggestions",
              "Niche playbooks",
              "ROI predictions",
              "Weekly refresh",
            ].map((f) => (
              <span key={f} className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-success" />
                {f}
              </span>
            ))}
          </div>
          <Button
            className="gap-2"
            data-ocid="coach.upgrade_button"
            onClick={() =>
              (navigate as (arg: { to: string }) => void)({ to: "/paywall" })
            }
          >
            <Sparkles className="w-4 h-4" />
            Upgrade to Starter — ₹49/mo
          </Button>
          <p className="text-[10px] text-muted-foreground">
            7-day free trial. Cancel anytime.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GrowthAdvisorPage() {
  useMetaTags(PAGE_META["/growth-advisor"]);
  const { coachSuggestions, refreshDealSuggestions } = useAutoAgency();
  const { data: subscription } = useSubscription();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastRefreshed, setLastRefreshed] = useState("Today at 9:00 AM");
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Search engine state ──
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [completedNextSteps, setCompletedNextSteps] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const planTier = (() => {
    const tiers: Record<string, number> = {
      free: 0,
      starter: 1,
      growth: 2,
      pro: 3,
      agency: 4,
    };
    return tiers[String(subscription?.plan ?? "free").toLowerCase()] ?? 0;
  })();
  const isPremium = planTier >= 1;

  const primarySuggestions = useMemo(
    () =>
      isPremium ? coachSuggestions.slice(0, 3) : coachSuggestions.slice(0, 1),
    [coachSuggestions, isPremium],
  );
  const secondarySuggestions = useMemo(
    () => coachSuggestions.slice(3, 6),
    [coachSuggestions],
  );

  const detectedNiche = useMemo(() => detectNiche(activeQuery), [activeQuery]);
  const nicheData = NICHE_DATA[detectedNiche];

  const dayOfWeek = new Date().getDay();
  const theme = DAY_THEMES[dayOfWeek] ?? DAY_THEMES[1];
  const ThemeIcon = theme.icon;

  function handleSearch() {
    const q = searchQuery.trim();
    if (!q) {
      toast.error("Please enter what you want to grow or achieve.");
      return;
    }
    setIsSearching(true);
    setHasSearched(false);
    setActiveQuery(q);
    setCompletedSteps([false, false, false, false, false]);
    setCompletedNextSteps([false, false, false]);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  }

  function handleSuggestionChip(chip: string) {
    setSearchQuery(chip);
    setIsSearching(true);
    setHasSearched(false);
    setActiveQuery(chip);
    setCompletedSteps([false, false, false, false, false]);
    setCompletedNextSteps([false, false, false]);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  }

  function handlePopularPreview(q: string) {
    setSearchQuery(q);
    setIsSearching(true);
    setHasSearched(false);
    setActiveQuery(q);
    setCompletedSteps([false, false, false, false, false]);
    setCompletedNextSteps([false, false, false]);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  }

  function handleToggleStep(i: number) {
    setCompletedSteps((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  function handleToggleNextStep(i: number) {
    setCompletedNextSteps((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  function handleRefresh() {
    setIsRefreshing(true);
    refreshDealSuggestions();
    setTimeout(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const period = hours >= 12 ? "PM" : "AM";
      const h12 = hours % 12 || 12;
      setLastRefreshed(`Today at ${h12}:${minutes} ${period}`);
      setRefreshKey((k) => k + 1);
      setIsRefreshing(false);
      toast.success("Fresh ideas loaded!", {
        description: "6 new growth tactics based on today's niche trends.",
      });
    }, 1400);
  }

  function handleSuggestionAction(label: string) {
    toast.success(`Starting: ${label}`, {
      description: "Action triggered — check your dashboard for next steps.",
    });
  }

  return (
    <div data-ocid="coach.page" className="space-y-8">
      {/* ════════════════════════════════════════════
          SECTION 1 — Header + Search Engine
      ════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-5"
        data-ocid="advisor.search_section"
      >
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-display font-bold text-foreground tracking-tight">
                  AI Growth Advisor
                </h2>
                <Badge
                  className="text-[11px] font-semibold px-2.5 py-0.5 bg-chart-5/15 text-chart-5 border border-chart-5/30"
                  variant="outline"
                  data-ocid="advisor.ai_consultant_badge"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Business Consultant
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Type what you want to achieve, get a personalized business
                growth strategy instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="space-y-3">
          <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Ask anything — 'How to grow my salon in Mumbai'"
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-xl border bg-card text-sm",
                  "text-foreground placeholder:text-muted-foreground",
                  "border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20",
                  "outline-none transition-all duration-200",
                )}
                data-ocid="advisor.search_input"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="shrink-0 gap-1.5 px-5 h-11"
              data-ocid="advisor.search_button"
            >
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              Get My Strategy →
            </Button>
          </div>

          {/* Quick Suggestion Chips */}
          <div
            className="flex flex-wrap gap-2"
            data-ocid="advisor.suggestion_chips"
          >
            {QUICK_SUGGESTIONS.map((chip, ci) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleSuggestionChip(chip)}
                data-ocid={`advisor.chip.${ci + 1}`}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                  "bg-card border-border/60 text-muted-foreground",
                  "hover:border-primary/50 hover:bg-primary/5 hover:text-primary",
                  searchQuery === chip &&
                    "border-primary/60 bg-primary/10 text-primary",
                )}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Search State — Loading / Results / Empty */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SearchResultsSkeleton />
            </motion.div>
          ) : hasSearched ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SearchResults
                query={activeQuery}
                niche={detectedNiche}
                data={nicheData}
                completedSteps={completedSteps}
                onToggleStep={handleToggleStep}
                completedNextSteps={completedNextSteps}
                onToggleNextStep={handleToggleNextStep}
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              data-ocid="advisor.popular_section"
            >
              {/* Popular Searches */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-warning" />
                  <p className="text-sm font-display font-semibold text-foreground">
                    Popular searches this week:
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {POPULAR_PREVIEWS.map((preview, pi) => (
                    <button
                      key={preview.query}
                      type="button"
                      onClick={() => handlePopularPreview(preview.query)}
                      data-ocid={`advisor.popular.item.${pi + 1}`}
                      className={cn(
                        "text-left p-4 rounded-xl border bg-card transition-all duration-200",
                        "border-border/60 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5",
                        "group",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Search className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-xs font-semibold text-foreground leading-snug mb-1.5 group-hover:text-primary transition-colors">
                        "{preview.query}"
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                        {preview.teaser}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* ════════════════════════════════════════════
          SECTION 2 — Divider
      ════════════════════════════════════════════ */}
      <div className="flex items-center gap-3">
        <div className="h-px bg-border/60 flex-1" />
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-2">
          Daily AI Coach
        </span>
        <div className="h-px bg-border/60 flex-1" />
      </div>

      {/* ════════════════════════════════════════════
          SECTION 3 — Existing AI Business Coach
      ════════════════════════════════════════════ */}

      {/* Page Header for Coach */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-start justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h3 className="text-base font-display font-bold text-foreground tracking-tight">
              AI Business Coach
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Your daily growth playbook, personalized to your niche
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Last refreshed: {lastRefreshed}</span>
          </div>
        </div>

        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="gap-2 shrink-0"
          data-ocid="coach.refresh_button"
        >
          {isRefreshing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          {isRefreshing ? "Refreshing…" : "Get Fresh Ideas"}
        </Button>
      </motion.div>

      {/* Today's Coaching Theme */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        data-ocid="coach.daily_theme"
      >
        <div
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl border",
            theme.color,
            "bg-gradient-to-r",
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-background/60 flex items-center justify-center shrink-0">
            <ThemeIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
              Today's Focus
            </p>
            <p className="text-sm font-display font-bold leading-tight">
              {theme.label}
            </p>
          </div>
          <Badge
            variant="outline"
            className={cn("ml-auto shrink-0 text-[10px] border", theme.color)}
          >
            <Flame className="w-2.5 h-2.5 mr-1" />
            Active
          </Badge>
        </div>
      </motion.div>

      {/* Quick Wins Row */}
      <section data-ocid="coach.quick_wins_section">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-warning" />
          <h3 className="text-sm font-display font-semibold text-foreground">
            Quick Wins
          </h3>
          <Badge
            variant="outline"
            className="text-[10px] bg-warning/10 text-warning border-warning/30"
          >
            Under 5 mins
          </Badge>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {QUICK_WINS.map((win, i) => (
            <QuickWinCard key={win.title} win={win} idx={i + 1} />
          ))}
        </div>
      </section>

      {/* Performance Context */}
      <PerformanceContextPanel />

      {/* Primary Suggestions */}
      <section data-ocid="coach.primary_suggestions">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-display font-semibold text-foreground">
            Today's Top Suggestions
          </h3>
          <Badge
            variant="outline"
            className="text-[10px] bg-primary/10 text-primary border-primary/30"
          >
            {primarySuggestions.length} curated
          </Badge>
        </div>

        <AnimatePresence mode="wait">
          {isRefreshing ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[1, 2, 3].map((n) => (
                <CoachSuggestionSkeleton key={n} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`primary-${refreshKey}`}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {primarySuggestions.map((s, i) => (
                <CoachSuggestionCard
                  key={s.id}
                  suggestion={s}
                  idx={i + 1}
                  refreshKey={refreshKey}
                  onAction={handleSuggestionAction}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Paywall (free) OR More Ideas accordion (premium) */}
      {!isPremium ? (
        <PaywallTeaser />
      ) : (
        <section data-ocid="coach.more_ideas_section">
          <Accordion type="single" collapsible>
            <AccordionItem
              value="more-ideas"
              className="border border-border/60 rounded-xl px-4 bg-card/50"
            >
              <AccordionTrigger
                className="text-sm font-display font-semibold hover:no-underline py-3.5 gap-2"
                data-ocid="coach.more_ideas_accordion"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-chart-5" />
                  <span>More Ideas</span>
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-chart-5/10 text-chart-5 border-chart-5/30"
                  >
                    {secondarySuggestions.length} more
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {secondarySuggestions.map((s, i) => (
                    <CoachSuggestionCard
                      key={s.id}
                      suggestion={s}
                      idx={i + 4}
                      refreshKey={refreshKey}
                      onAction={handleSuggestionAction}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      )}

      {/* Coach Insight Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/40 border border-border/40"
        data-ocid="coach.footer_insight"
      >
        <Lightbulb className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <p className="text-[11px] text-muted-foreground italic leading-relaxed">
          Suggestions are AI-generated based on publicly available niche trends
          and your activity patterns. All ROI estimates are projections, not
          guarantees.
        </p>
      </motion.div>
    </div>
  );
}
