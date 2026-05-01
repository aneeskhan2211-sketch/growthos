import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  ChevronRight,
  ExternalLink,
  Link2,
  Link2Off,
  Plus,
  Rocket,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "../components/ui/PageHeader";

// ─── Brand SVG Icons ──────────────────────────────────────────────────────────

const YouTubeSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" role="img">
    <title>YouTube</title>
    <rect width="32" height="32" rx="8" fill="#FF0000" />
    <path
      d="M26.1 10.5c-.27-1.02-1.07-1.83-2.1-2.1C22.2 8 16 8 16 8s-6.2 0-8 .4c-1.03.27-1.83 1.08-2.1 2.1C5.5 12.3 5.5 16 5.5 16s0 3.7.4 5.5c.27 1.02 1.07 1.83 2.1 2.1C9.8 24 16 24 16 24s6.2 0 8-.4c1.03-.27 1.83-1.08 2.1-2.1.4-1.8.4-5.5.4-5.5s0-3.7-.4-5.5z"
      fill="white"
    />
    <polygon points="13.5,12.5 13.5,19.5 19.8,16" fill="#FF0000" />
  </svg>
);

const InstagramSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" role="img">
    <title>Instagram</title>
    <defs>
      <linearGradient id="igGradFull" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F58529" />
        <stop offset="40%" stopColor="#DD2A7B" />
        <stop offset="100%" stopColor="#515BD4" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#igGradFull)" />
    <rect
      x="8"
      y="8"
      width="16"
      height="16"
      rx="4.5"
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="16" cy="16" r="4" stroke="white" strokeWidth="2" fill="none" />
    <circle cx="21.5" cy="10.5" r="1.2" fill="white" />
  </svg>
);

const FacebookSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" role="img">
    <title>Facebook</title>
    <rect width="32" height="32" rx="8" fill="#1877F2" />
    <path
      d="M21 8h-2.5A4.5 4.5 0 0014 12.5V15h-3v4h3v9h4v-9h3l.5-4H18v-2a1 1 0 011-1h2V8z"
      fill="white"
    />
  </svg>
);

const LinkedInSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" role="img">
    <title>LinkedIn</title>
    <rect width="32" height="32" rx="8" fill="#0A66C2" />
    <path
      d="M9 12.5h4v12H9zM11 11a2 2 0 110-4 2 2 0 010 4zM14.5 12.5h3.8v1.6s.9-1.8 3.5-1.8c3 0 4.2 2 4.2 5v7.2H22v-5.5c0-1.5-.6-2.5-1.9-2.5-1.5 0-2.6 1.1-2.6 2.7v5.3h-3v-12z"
      fill="white"
    />
  </svg>
);

const XSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" role="img">
    <title>X (Twitter)</title>
    <rect width="32" height="32" rx="8" fill="#000000" />
    <path
      d="M18 14.6L23.8 8h-1.4L17.3 13.8 13.1 8H8l6.1 8.9L8 24h1.4l5.3-6.2 4.4 6.2H24l-6-9.4zm-1.9 2.2-.6-.9-5-7.1h2.2l4 5.7.6.9 5.2 7.4H20l-3.9-5.7 0.1-.3z"
      fill="white"
    />
  </svg>
);

const TikTokSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" role="img">
    <title>TikTok</title>
    <rect width="32" height="32" rx="8" fill="#010101" />
    <path
      d="M22.5 9.5c-1.2-.8-2-2-2.2-3.5H17v14c0 1.4-1.1 2.5-2.5 2.5S12 21.4 12 20s1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1V14c-.3 0-.5-.1-.8-.1C11.1 13.9 8.5 16.6 8.5 20s2.6 6.1 6 6.1 6-2.6 6-6.1V13c1.3.9 2.8 1.4 4.5 1.4v-3.3c-.9 0-1.8-.3-2.5-.6z"
      fill="white"
    />
    <path
      d="M23.5 10.4c.9.6 2 1 3.1 1v-2.9c-.8 0-1.5-.3-2-.7-.6-.5-1-1.1-1.1-1.8h-2.7v14c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1v-3c-.3 0-.5-.1-.8-.1-3.1 0-5.5 2.5-5.5 5.5s2.4 5.5 5.5 5.5 5.5-2.5 5.5-5.5V10.4h-.3z"
      fill="#EE1D52"
      opacity="0.7"
    />
  </svg>
);

const WhatsAppSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" role="img">
    <title>WhatsApp Business</title>
    <rect width="32" height="32" rx="8" fill="#25D366" />
    <path
      d="M16 5a11 11 0 0110.8 13.2L28 27l-8.9-2.4A11 11 0 1116 5zm-3 7.5c-.3 0-.7.1-1 .4-.4.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.3 1.3 3.5.1.2 2.3 3.7 5.7 5 2.3.9 2.8.7 3.3.7.5 0 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.1-.4-.2-.8-.4l-2.4-1.2c-.4-.2-.7-.2-.9.2l-.5.8c-.1.2-.3.2-.5.1-.6-.3-2.6-1-4-2.9-.5-.7-.2-.8.1-1.1l.6-.7c.2-.2.2-.4.1-.6l-1.1-2.6c-.2-.5-.4-.5-.8-.5z"
      fill="white"
    />
  </svg>
);

const GoogleAdsSVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" role="img">
    <title>Google Ads</title>
    <rect width="32" height="32" rx="8" fill="#F8F9FA" />
    <path d="M10 22L16 11l3 5.2-3 5.8H10z" fill="#FBBC04" />
    <path d="M16 11l6 11H22l-3-5.2-3-5.8z" fill="#4285F4" />
    <circle cx="10" cy="22" r="3" fill="#34A853" />
    <circle cx="22" cy="22" r="3" fill="#EA4335" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlatformMetric {
  label: string;
  value: string;
}

interface PlatformBenefit {
  text: string;
}

interface Platform {
  id: string;
  name: string;
  category: "social" | "ads" | "messaging";
  Icon: () => React.ReactElement;
  accentColor: string;
  connected: boolean;
  metrics?: PlatformMetric[];
  topContent?: string;
  postsThisMonth?: number;
  benefits?: PlatformBenefit[];
  chartEngagement?: number;
}

// ─── Platform Data ────────────────────────────────────────────────────────────

const PLATFORMS: Platform[] = [
  {
    id: "youtube",
    name: "YouTube",
    category: "social",
    Icon: YouTubeSVG,
    accentColor: "#FF0000",
    connected: true,
    metrics: [
      { label: "Subscribers", value: "340K" },
      { label: "Posts/Month", value: "12" },
      { label: "Engagement", value: "6.4%" },
      { label: "Reach/Month", value: "2.1M" },
    ],
    topContent: '"5 SEO Hacks that Doubled Our Client Traffic" — 48K views',
    postsThisMonth: 12,
    chartEngagement: 64,
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "social",
    Icon: InstagramSVG,
    accentColor: "#DD2A7B",
    connected: true,
    metrics: [
      { label: "Followers", value: "12.4K" },
      { label: "Posts/Month", value: "18" },
      { label: "Engagement", value: "5.2%" },
      { label: "Reach/Month", value: "284K" },
    ],
    topContent: '"Before & After Agency Results" Reel — 9.2K likes',
    postsThisMonth: 18,
    chartEngagement: 52,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "social",
    Icon: LinkedInSVG,
    accentColor: "#0A66C2",
    connected: true,
    metrics: [
      { label: "Connections", value: "3.2K" },
      { label: "Posts/Month", value: "8" },
      { label: "Engagement", value: "4.8%" },
      { label: "Reach/Month", value: "67K" },
    ],
    topContent:
      '"How We Closed ₹50K Contract from a Cold Lead" — 1.4K reactions',
    postsThisMonth: 8,
    chartEngagement: 48,
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    category: "messaging",
    Icon: WhatsAppSVG,
    accentColor: "#25D366",
    connected: true,
    metrics: [
      { label: "Contacts", value: "1.8K" },
      { label: "Messages/Mo", value: "640" },
      { label: "Open Rate", value: "94%" },
      { label: "Reply Rate", value: "68%" },
    ],
    topContent: 'Template "Free Audit Offer" — 68% reply rate',
    postsThisMonth: 0,
    chartEngagement: 94,
  },
  {
    id: "facebook",
    name: "Facebook",
    category: "social",
    Icon: FacebookSVG,
    accentColor: "#1877F2",
    connected: false,
    benefits: [
      { text: "Run targeted lead-gen ads to local businesses" },
      { text: "Schedule posts and manage your business page" },
      { text: "Track page insights, reach, and CPC metrics" },
    ],
  },
  {
    id: "x",
    name: "X (Twitter)",
    category: "social",
    Icon: XSVG,
    accentColor: "#000000",
    connected: false,
    benefits: [
      { text: "Schedule posts and monitor trending topics" },
      { text: "Track impressions, link clicks, and follower growth" },
      { text: "Engage with industry conversations in real time" },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "social",
    Icon: TikTokSVG,
    accentColor: "#EE1D52",
    connected: false,
    benefits: [
      { text: "Publish short-form video content automatically" },
      { text: "Track viral score, shares, and watch time" },
      { text: "Reach younger demographics with organic content" },
    ],
  },
  {
    id: "googleads",
    name: "Google Ads",
    category: "ads",
    Icon: GoogleAdsSVG,
    accentColor: "#4285F4",
    connected: false,
    benefits: [
      { text: "Track ad spend, conversions, and cost-per-lead" },
      { text: "Manage campaigns and keyword bids in one place" },
      { text: "See client-level ROI from paid search campaigns" },
    ],
  },
];

const QUICK_CAMPAIGN_PLATFORMS = PLATFORMS.filter((p) => p.connected);

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConnectedBadge() {
  return (
    <span className="status-active flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-current notification-dot inline-block" />
      Connected
    </span>
  );
}

function NotConnectedBadge() {
  return (
    <span className="status-inactive text-[10px] font-semibold px-1.5 py-0.5 rounded-full w-fit">
      Not Connected
    </span>
  );
}

interface ConnectedCardProps {
  platform: Platform;
  index: number;
  onDisconnect: (id: string) => void;
}

function ConnectedCard({ platform, index, onDisconnect }: ConnectedCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.35,
            ease: [0.4, 0, 0.2, 1],
            delay: index * 0.08,
          },
        },
      }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      data-ocid={`social-hub.connected.platform.${index + 1}`}
    >
      <Card className="p-5 hover:shadow-elevated transition-smooth border-border/60 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
              <platform.Icon />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">
                {platform.name}
              </p>
              <ConnectedBadge />
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-7 h-7 text-muted-foreground hover:text-destructive"
            onClick={() => onDisconnect(platform.id)}
            aria-label={`Disconnect ${platform.name}`}
            data-ocid={`social-hub.disconnect_button.${platform.id}`}
          >
            <Link2Off className="w-3.5 h-3.5" />
          </Button>
        </div>

        {/* Metrics grid */}
        {platform.metrics && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {platform.metrics.map((m) => (
              <div
                key={m.label}
                className="text-center p-2.5 bg-muted/30 rounded-lg"
              >
                <p className="text-sm font-bold text-foreground tabular-nums leading-tight">
                  {m.value}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Top content */}
        {platform.topContent && (
          <div className="mb-4 px-3 py-2 bg-muted/20 rounded-lg border-l-2 border-primary/40">
            <p className="text-[11px] text-muted-foreground leading-snug">
              <span className="font-medium text-foreground/80">
                Top content:
              </span>{" "}
              {platform.topContent}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="flex-1 text-xs h-8 gap-1"
            data-ocid={`social-hub.view_analytics_button.${platform.id}`}
          >
            <BarChart2 className="w-3 h-3" />
            Analytics
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="flex-1 text-xs h-8 gap-1"
            data-ocid={`social-hub.create_post_button.${platform.id}`}
          >
            <Plus className="w-3 h-3" />
            Post
          </Button>
          <Button
            type="button"
            size="sm"
            className="flex-1 text-xs h-8 gap-1 btn-primary-glow"
            data-ocid={`social-hub.schedule_campaign_button.${platform.id}`}
          >
            <Rocket className="w-3 h-3" />
            Campaign
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

interface NotConnectedCardProps {
  platform: Platform;
  index: number;
  onConnect: (id: string) => void;
}

function NotConnectedCard({
  platform,
  index,
  onConnect,
}: NotConnectedCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
            delay: index * 0.06,
          },
        },
      }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      data-ocid={`social-hub.disconnected.platform.${index + 1}`}
    >
      <Card className="p-5 border-border/40 bg-card/60 hover:bg-card hover:shadow-subtle transition-smooth h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center opacity-80 flex-shrink-0">
              <platform.Icon />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground/80 leading-tight">
                {platform.name}
              </p>
              <NotConnectedBadge />
            </div>
          </div>
        </div>

        {/* Benefits */}
        {platform.benefits && (
          <ul className="space-y-1.5 mb-4 flex-1">
            {platform.benefits.map((b) => (
              <li
                key={b.text}
                className="flex items-start gap-2 text-[11px] text-muted-foreground"
              >
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50 flex-shrink-0 mt-1.5" />
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Connect button */}
        <div className="flex items-center justify-between mt-auto">
          <Button
            type="button"
            size="sm"
            className="text-xs h-8 gap-1.5 flex-1"
            style={{
              backgroundColor: platform.accentColor,
              color: "#fff",
              border: "none",
            }}
            onClick={() => onConnect(platform.id)}
            data-ocid={`social-hub.connect_button.${platform.id}`}
          >
            <Link2 className="w-3 h-3" />
            Connect {platform.name.split(" ")[0]}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs h-8 text-muted-foreground ml-2 gap-1"
            data-ocid={`social-hub.learn_more_link.${platform.id}`}
          >
            Learn more
            <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Engagement Chart ─────────────────────────────────────────────────────────

interface ChartDatum {
  name: string;
  engagement: number;
  color: string;
}

const CHART_DATA: ChartDatum[] = PLATFORMS.filter(
  (p) => p.connected && p.chartEngagement !== undefined,
).map((p) => ({
  name: p.name.split(" ")[0],
  engagement: p.chartEngagement ?? 0,
  color: p.accentColor,
}));

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: ChartDatum }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-elevated">
      <p className="text-xs font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">
        {payload[0].value}% engagement
      </p>
    </div>
  );
}

function EngagementChart() {
  return (
    <Card className="p-5" data-ocid="social-hub.engagement_chart">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Platform Engagement Breakdown
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Engagement rate across connected platforms this month
          </p>
        </div>
        <Badge variant="outline" className="text-xs gap-1">
          <TrendingUp className="w-3 h-3" />
          This Month
        </Badge>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={CHART_DATA}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.26 0 0 / 0.4)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => `${v}%`}
              tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "oklch(0.26 0 0 / 0.15)" }}
            />
            <Bar dataKey="engagement" radius={[6, 6, 0, 0]}>
              {CHART_DATA.map((entry) => (
                <Cell key={entry.name} fill={entry.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-border/40">
        {PLATFORMS.filter((p) => p.connected).map((p) => (
          <div key={p.id} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: p.accentColor }}
            />
            <span className="text-[11px] text-muted-foreground">{p.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Quick Campaign ───────────────────────────────────────────────────────────

function QuickCampaignCard() {
  const [selectedId, setSelectedId] = useState<string>("instagram");

  return (
    <Card className="p-5" data-ocid="social-hub.quick_campaign.card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Quick Campaign
          </h3>
          <p className="text-xs text-muted-foreground">
            Launch a campaign in under 60 seconds
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {QUICK_CAMPAIGN_PLATFORMS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedId(p.id)}
            aria-label={`Select ${p.name}`}
            data-ocid={`social-hub.quick_campaign.platform_toggle.${p.id}`}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-fast cursor-pointer",
              selectedId === p.id
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-muted/30 border-border/40 text-muted-foreground hover:bg-muted/50",
            )}
          >
            <div className="w-4 h-4 rounded overflow-hidden flex-shrink-0">
              <p.Icon />
            </div>
            {p.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <Separator className="mb-4" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">
            Ready to launch on{" "}
            <span className="font-semibold text-foreground">
              {QUICK_CAMPAIGN_PLATFORMS.find((p) => p.id === selectedId)
                ?.name ?? ""}
            </span>
          </p>
          <p className="text-[11px] text-muted-foreground/70 mt-0.5">
            Set budget, choose goal, and go live
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          className="gap-1.5 btn-primary-glow"
          data-ocid="social-hub.quick_campaign.create_now_button"
        >
          <Rocket className="w-3.5 h-3.5" />
          Create Now
        </Button>
      </div>
    </Card>
  );
}

// ─── Summary Stats ────────────────────────────────────────────────────────────

const SUMMARY_STATS = [
  { label: "Connected", value: "4", icon: Link2, color: "text-success" },
  { label: "Total Reach", value: "2.5M", icon: Users, color: "text-primary" },
  {
    label: "Avg Engagement",
    value: "5.6%",
    icon: TrendingUp,
    color: "text-warning",
  },
  {
    label: "Platforms",
    value: "8",
    icon: BarChart2,
    color: "text-muted-foreground",
  },
] as const;

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SocialHubPage() {
  const [platforms, setPlatforms] = useState<Platform[]>(PLATFORMS);

  const connected = platforms.filter((p) => p.connected);
  const notConnected = platforms.filter((p) => !p.connected);

  const handleConnect = (id: string) =>
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, connected: true } : p)),
    );

  const handleDisconnect = (id: string) =>
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, connected: false } : p)),
    );

  return (
    <div data-ocid="social-hub.page">
      {/* Page Header */}
      <PageHeader
        title="Social Hub"
        description="Manage all your social platforms in one place."
        actions={
          <Button
            type="button"
            size="sm"
            className="btn-primary-glow gap-1.5"
            data-ocid="social-hub.connect_platform_button"
          >
            <Plus className="w-3.5 h-3.5" />
            Connect Platform
          </Button>
        }
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 -mt-2"
      >
        <span>GrowthOS</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">Social Hub</span>
      </nav>

      {/* Summary KPI row */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {SUMMARY_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
            }}
            data-ocid={`social-hub.summary.item.${i + 1}`}
          >
            <Card className="p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-muted/40 flex items-center justify-center flex-shrink-0">
                <s.icon className={cn("w-4 h-4", s.color)} />
              </div>
              <div>
                <p
                  className={cn(
                    "text-xl font-bold tabular-nums leading-tight",
                    s.color,
                  )}
                >
                  {s.value}
                </p>
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Connected Platforms */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success inline-block" />
            Connected Platforms
            <Badge variant="secondary" className="text-xs font-medium">
              {connected.length}
            </Badge>
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground h-7 gap-1"
            data-ocid="social-hub.view_all_connected_button"
          >
            <ExternalLink className="w-3 h-3" />
            Manage all
          </Button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {connected.map((p, i) => (
            <ConnectedCard
              key={p.id}
              platform={p}
              index={i}
              onDisconnect={handleDisconnect}
            />
          ))}
        </motion.div>
      </div>

      {/* Not Connected Platforms */}
      {notConnected.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-border inline-block" />
              Available to Connect
              <Badge variant="outline" className="text-xs">
                {notConnected.length}
              </Badge>
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          >
            {notConnected.map((p, i) => (
              <NotConnectedCard
                key={p.id}
                platform={p}
                index={i}
                onConnect={handleConnect}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Bottom row: chart + quick campaign */}
      <motion.div
        className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="xl:col-span-2">
          <EngagementChart />
        </div>
        <div>
          <QuickCampaignCard />
        </div>
      </motion.div>

      {/* Platform overview card */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        <Card className="p-5 mb-6" data-ocid="social-hub.overview.card">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-sm font-semibold text-foreground">
              Connected Platform Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {connected.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  data-ocid={`social-hub.overview.item.${i + 1}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0">
                      <p.Icon />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {p.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground capitalize">
                        {p.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    {p.metrics?.slice(0, 2).map((m) => (
                      <div key={m.label} className="text-right hidden sm:block">
                        <p className="text-xs font-semibold text-foreground tabular-nums">
                          {m.value}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {m.label}
                        </p>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs gap-1 text-primary"
                      data-ocid={`social-hub.overview.analytics_button.${p.id}`}
                    >
                      <BarChart2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Analytics</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer disclaimer */}
      <p className="text-[10px] text-muted-foreground/50 text-center pt-2 pb-4">
        Platform logos are trademarks of their respective owners. GrowthOS is
        not affiliated with or endorsed by these platforms.
      </p>
    </div>
  );
}
