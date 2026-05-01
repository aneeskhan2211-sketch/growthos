import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart2,
  CheckCircle2,
  ChevronRight,
  Copy,
  ExternalLink,
  Loader2,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Rocket,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type CampaignStatus = "Active" | "Paused" | "Completed";
type Platform =
  | "Google Ads"
  | "Meta Ads"
  | "YouTube Ads"
  | "Instagram Ads"
  | "LinkedIn Ads"
  | "WhatsApp";

interface ActiveCampaign {
  id: number;
  name: string;
  platform: Platform;
  status: CampaignStatus;
  spend: number;
  reach: number;
  leads: number;
  roi: number;
}

interface PlatformStat {
  platform: Platform;
  spend: number;
  reach: number;
  leads: number;
  roi: number;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function GoogleAdsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-label="Google Ads"
      role="img"
    >
      <title>Google Ads</title>
      <path d="M14.5 36L4 17.5L13.5 1.5L23.5 17.5L14.5 36Z" fill="#FBBC04" />
      <path d="M33.5 36L44 17.5L34.5 1.5L24 17.5L33.5 36Z" fill="#4285F4" />
      <circle cx="9" cy="38" r="6" fill="#34A853" />
      <circle cx="39" cy="38" r="6" fill="#EA4335" />
    </svg>
  );
}

function MetaAdsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-label="Meta Ads"
      role="img"
    >
      <title>Meta Ads</title>
      <path
        d="M8 28c0 4.4 2.4 7.5 5.5 7.5c2.4 0 4-1.4 6.5-5.5c1.9-3.1 4.2-7.5 5.7-10.2l2.3-3.9C30.8 11.4 33.2 8 37.5 8C42 8 46 13.2 46 20c0 4.3-1.6 6.7-4 9v-5.5c1.4-1.6 2.4-3.2 2.4-5.5c0-3.8-2.1-6-4.5-6c-2 0-3.6 1.2-5.5 4.4L32 19l-2.2 3.8C26.5 28 23.5 35.5 18 35.5C12.6 35.5 8 30.9 8 28Z"
        fill="url(#meta-g1)"
      />
      <path
        d="M12.5 12.5C9.4 15.1 8 19.1 8 22.4v5.6c0 2.8 1.5 5 3 5c1.7 0 3.4-2.2 5.5-6.5l2.8-5.5c-1.6-2.7-3-4.8-4.5-6.3L12.5 12.5Z"
        fill="#0866FF"
      />
      <defs>
        <linearGradient id="meta-g1" x1="8" y1="8" x2="46" y2="40">
          <stop stopColor="#0866FF" />
          <stop offset="1" stopColor="#0866FF" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function YouTubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-label="YouTube Ads"
      role="img"
    >
      <title>YouTube Ads</title>
      <rect x="4" y="12" width="40" height="24" rx="8" fill="#FF0000" />
      <path d="M20 17L32 24L20 31V17Z" fill="white" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-label="Instagram Ads"
      role="img"
    >
      <title>Instagram Ads</title>
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="130%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="10" fill="url(#ig-grad)" />
      <circle
        cx="24"
        cy="24"
        r="8"
        stroke="white"
        strokeWidth="3"
        fill="none"
      />
      <circle cx="34" cy="14" r="2.5" fill="white" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-label="LinkedIn Ads"
      role="img"
    >
      <title>LinkedIn Ads</title>
      <rect x="4" y="4" width="40" height="40" rx="6" fill="#0A66C2" />
      <rect x="12" y="20" width="6" height="18" fill="white" />
      <circle cx="15" cy="14" r="4" fill="white" />
      <path
        d="M25 20h5.5v2.5s1.5-3 6-3c5 0 6.5 3 6.5 8V38H37V29c0-2.5-.5-5-3.5-5s-3.5 2.5-3.5 5V38H25V20Z"
        fill="white"
      />
    </svg>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-label="WhatsApp"
      role="img"
    >
      <title>WhatsApp</title>
      <circle cx="24" cy="24" r="20" fill="#25D366" />
      <path
        d="M33 15c-2.4-2.4-5.6-3.7-9-3.7c-7 0-12.7 5.7-12.7 12.7c0 2.2.6 4.4 1.7 6.3l-1.8 6.5 6.7-1.7c1.8 1 3.9 1.5 6 1.5c7 0 12.7-5.7 12.7-12.7c0-3.4-1.3-6.5-3.6-8.9ZM24 35.1c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-3.9 1 1-3.8-.3-.4c-1-1.7-1.6-3.6-1.6-5.6c0-5.9 4.8-10.7 10.7-10.7c2.8 0 5.5 1.1 7.5 3.1s3.1 4.7 3.1 7.5c-.1 5.9-4.9 10.5-10.8 10.5Zm5.9-8c-.3-.2-1.8-.9-2.1-1s-.5-.1-.7.1l-.9 1.1c-.1.2-.3.2-.6.1c-.3-.2-1.3-.5-2.4-1.5c-.9-.8-1.5-1.8-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5c.1-.2 0-.4 0-.5c0-.1-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.3c-.5.5-1.7 1.7-1.7 4s1.7 4.6 2 4.9c.2.3 3.5 5.3 8.4 7.4c1.2.5 2.1.8 2.8 1c1.2.4 2.3.3 3.1.2c.9-.1 2.9-1.2 3.3-2.3s.4-2.1.3-2.3c-.1-.3-.4-.4-.7-.5Z"
        fill="white"
      />
    </svg>
  );
}

function getPlatformIcon(platform: Platform, size = 20) {
  switch (platform) {
    case "Google Ads":
      return <GoogleAdsIcon size={size} />;
    case "Meta Ads":
      return <MetaAdsIcon size={size} />;
    case "YouTube Ads":
      return <YouTubeIcon size={size} />;
    case "Instagram Ads":
      return <InstagramIcon size={size} />;
    case "LinkedIn Ads":
      return <LinkedInIcon size={size} />;
    case "WhatsApp":
      return <WhatsAppIcon size={size} />;
  }
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const ACTIVE_CAMPAIGNS: ActiveCampaign[] = [
  {
    id: 1,
    name: "Mumbai Restaurant Leads Q2",
    platform: "Google Ads",
    status: "Active",
    spend: 42000,
    reach: 185000,
    leads: 312,
    roi: 387,
  },
  {
    id: 2,
    name: "Delhi Salon Growth Campaign",
    platform: "Meta Ads",
    status: "Active",
    spend: 28500,
    reach: 240000,
    leads: 195,
    roi: 264,
  },
  {
    id: 3,
    name: "Bangalore Gym Acquisition",
    platform: "Instagram Ads",
    status: "Paused",
    spend: 18000,
    reach: 95000,
    leads: 88,
    roi: 142,
  },
  {
    id: 4,
    name: "Chennai Dental Clinic Ads",
    platform: "Google Ads",
    status: "Active",
    spend: 35000,
    reach: 128000,
    leads: 220,
    roi: 445,
  },
  {
    id: 5,
    name: "Hyderabad Real Estate Retarget",
    platform: "Meta Ads",
    status: "Completed",
    spend: 55000,
    reach: 320000,
    leads: 410,
    roi: 512,
  },
  {
    id: 6,
    name: "Pune IT Firm LinkedIn Outreach",
    platform: "LinkedIn Ads",
    status: "Active",
    spend: 22000,
    reach: 48000,
    leads: 74,
    roi: 318,
  },
];

const PLATFORM_STATS: PlatformStat[] = [
  {
    platform: "Google Ads",
    spend: 77000,
    reach: 313000,
    leads: 532,
    roi: 416,
  },
  {
    platform: "Meta Ads",
    spend: 83500,
    reach: 560000,
    leads: 605,
    roi: 288,
  },
  {
    platform: "YouTube Ads",
    spend: 31000,
    reach: 425000,
    leads: 148,
    roi: 195,
  },
  {
    platform: "Instagram Ads",
    spend: 18000,
    reach: 95000,
    leads: 88,
    roi: 142,
  },
  {
    platform: "LinkedIn Ads",
    spend: 22000,
    reach: 48000,
    leads: 74,
    roi: 318,
  },
];

const SPEND_VS_LEADS_DATA = [
  { name: "Google", spend: 77, leads: 532 },
  { name: "Meta", spend: 83.5, leads: 605 },
  { name: "YouTube", spend: 31, leads: 148 },
  { name: "Instagram", spend: 18, leads: 88 },
  { name: "LinkedIn", spend: 22, leads: 74 },
];

const ROI_TREND_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  roi: Math.round(200 + Math.sin(i * 0.4) * 80 + i * 5 + Math.random() * 40),
}));

const WIZARD_PLATFORMS: {
  id: Platform;
  bestFor: string;
  cpc: string;
  color: string;
}[] = [
  {
    id: "Google Ads",
    bestFor: "High-intent search traffic",
    cpc: "₹12–₹35",
    color: "from-amber-500/10 to-yellow-500/10",
  },
  {
    id: "Meta Ads",
    bestFor: "Social & interest-based reach",
    cpc: "₹8–₹22",
    color: "from-blue-500/10 to-blue-600/10",
  },
  {
    id: "YouTube Ads",
    bestFor: "Video brand awareness",
    cpc: "₹5–₹18",
    color: "from-red-500/10 to-rose-500/10",
  },
  {
    id: "Instagram Ads",
    bestFor: "Visual products & lifestyle",
    cpc: "₹6–₹20",
    color: "from-pink-500/10 to-purple-500/10",
  },
  {
    id: "LinkedIn Ads",
    bestFor: "B2B & professional targeting",
    cpc: "₹40–₹120",
    color: "from-sky-600/10 to-blue-600/10",
  },
  {
    id: "WhatsApp",
    bestFor: "Direct messaging & conversions",
    cpc: "₹2–₹8",
    color: "from-green-500/10 to-emerald-500/10",
  },
];

const WIZARD_GOALS = [
  {
    id: "lead_gen",
    label: "Lead Generation",
    desc: "Capture qualified prospects interested in your service",
    icon: "🎯",
  },
  {
    id: "brand_awareness",
    label: "Brand Awareness",
    desc: "Maximize visibility and reach your target audience",
    icon: "📢",
  },
  {
    id: "website_traffic",
    label: "Website Traffic",
    desc: "Drive high-quality visitors to your landing page",
    icon: "🔗",
  },
  {
    id: "app_downloads",
    label: "App Downloads",
    desc: "Get installs from your ideal customer profile",
    icon: "📲",
  },
];

const HEADLINE_VARIANTS = [
  "Get More Customers in {{City}} — Free Consultation",
  "{{BusinessName}} Customers Are Searching for You Right Now",
  "Trusted by 500+ Businesses in {{City}} — See Results Fast",
];

const CTA_OPTIONS = [
  "Get Free Audit",
  "Book a Call",
  "See Pricing",
  "Claim Your Offer",
  "Start Today",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function roiColor(roi: number) {
  if (roi >= 300) return "bg-success/10 text-success border-success/20";
  if (roi >= 150) return "bg-warning/10 text-warning border-warning/20";
  return "bg-destructive/10 text-destructive border-destructive/20";
}

function statusClass(status: CampaignStatus) {
  if (status === "Active") return "status-active";
  if (status === "Paused") return "status-paused";
  return "status-inactive";
}

function fmtINR(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}k`;
  return `₹${n}`;
}

function fmtNum(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
  return `${n}`;
}

// ─── Platform Stats Row ────────────────────────────────────────────────────────

function PlatformStatCard({ stat }: { stat: PlatformStat }) {
  return (
    <Card className="border-border shadow-subtle hover-lift flex-shrink-0 min-w-[180px]">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          {getPlatformIcon(stat.platform, 22)}
          <span className="text-xs font-semibold text-foreground truncate">
            {stat.platform}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {[
            { label: "Spend", value: fmtINR(stat.spend) },
            { label: "Reach", value: fmtNum(stat.reach) },
            { label: "Leads", value: stat.leads.toLocaleString() },
            { label: "ROI", value: `${stat.roi}%` },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Campaign Card ─────────────────────────────────────────────────────────────

function CampaignCard({
  campaign,
  index,
}: {
  campaign: ActiveCampaign;
  index: number;
}) {
  const [status, setStatus] = useState<CampaignStatus>(campaign.status);
  const toggle = () => {
    const next = status === "Active" ? "Paused" : "Active";
    setStatus(next);
    toast.success(`Campaign ${next === "Active" ? "resumed" : "paused"}.`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
    >
      <Card
        className="border-border shadow-subtle hover:shadow-elevated transition-smooth"
        data-ocid={`campaigns.item.${index + 1}`}
      >
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Platform + Name */}
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className="mt-0.5 shrink-0">
                {getPlatformIcon(campaign.platform, 28)}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm leading-tight truncate">
                  {campaign.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {campaign.platform}
                  </span>
                  <span
                    className={`badge-status text-[10px] ${statusClass(status)}`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-6 flex-wrap">
              {[
                { label: "Spend", value: fmtINR(campaign.spend) },
                { label: "Reach", value: fmtNum(campaign.reach) },
                { label: "Leads", value: campaign.leads.toLocaleString() },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {value}
                  </p>
                </div>
              ))}
              <Badge
                variant="outline"
                className={`text-xs font-bold px-2 ${roiColor(campaign.roi)}`}
              >
                {campaign.roi}% ROI
              </Badge>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              {status !== "Completed" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs"
                  onClick={toggle}
                  data-ocid={`campaigns.toggle_button.${index + 1}`}
                >
                  {status === "Active" ? (
                    <>
                      <Pause className="w-3 h-3" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" /> Resume
                    </>
                  )}
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={() => toast.success("Campaign duplicated.")}
                data-ocid={`campaigns.duplicate_button.${index + 1}`}
              >
                <Copy className="w-3 h-3" /> Duplicate
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs"
                onClick={() => toast.info("Opening report…")}
                data-ocid={`campaigns.report_button.${index + 1}`}
              >
                <ExternalLink className="w-3 h-3" /> Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Campaign Builder Wizard ───────────────────────────────────────────────────

const STEP_LABELS = [
  "Platform",
  "Goal",
  "Creative",
  "Budget",
  "Preview",
  "Launch",
];

function WizardStep({
  current,
  index,
  label,
}: {
  current: number;
  index: number;
  label: string;
}) {
  const done = index < current;
  const active = index === current;
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-smooth ${
          done
            ? "bg-success text-success-foreground"
            : active
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {done ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
      </div>
      <span
        className={`text-xs font-medium hidden sm:block ${active ? "text-foreground" : "text-muted-foreground"}`}
      >
        {label}
      </span>
      {index < STEP_LABELS.length - 1 && (
        <ChevronRight className="w-3 h-3 text-border mx-1 hidden sm:block" />
      )}
    </div>
  );
}

function CampaignBuilderTab() {
  const [step, setStep] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null,
  );
  const [selectedGoal, setSelectedGoal] = useState("");
  const [adCopy, setAdCopy] = useState(
    "Hi {{BusinessName}}! We noticed your business in {{City}} could be getting more leads from Google search. We've helped 50+ similar businesses grow by 30–50% in 3 months. Book your free audit today — no commitment needed.",
  );
  const [selectedHeadline, setSelectedHeadline] = useState(0);
  const [selectedCta, setSelectedCta] = useState(0);
  const [budgetType, setBudgetType] = useState<"daily" | "monthly">("monthly");
  const [budget, setBudget] = useState("25000");
  const [launching, setLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);

  const estReach =
    budgetType === "monthly"
      ? Math.round((Number(budget) || 0) * 4.8)
      : Math.round((Number(budget) || 0) * 150);
  const estLeads = Math.round(estReach * 0.0018);

  const handleLaunch = () => {
    setLaunching(true);
    setTimeout(() => {
      setLaunching(false);
      setLaunched(true);
      toast.success("Campaign launched successfully!");
    }, 2000);
  };

  const resetWizard = () => {
    setStep(0);
    setSelectedPlatform(null);
    setSelectedGoal("");
    setBudget("25000");
    setLaunched(false);
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <Card className="border-border shadow-subtle">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            {STEP_LABELS.map((label, i) => (
              <WizardStep key={label} current={step} index={i} label={label} />
            ))}
          </div>
          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full progress-bar-fill"
              animate={{ width: `${(step / (STEP_LABELS.length - 1)) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22 }}
        >
          {/* Step 1: Platform */}
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">
                Select Advertising Platform
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {WIZARD_PLATFORMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`p-4 rounded-xl border text-left transition-smooth bg-gradient-to-br ${p.color} hover:shadow-elevated ${
                      selectedPlatform === p.id
                        ? "border-primary shadow-elevated ring-2 ring-primary/30"
                        : "border-border"
                    }`}
                    data-ocid={`wizard.platform.${p.id.toLowerCase().replace(/\s/g, "_")}`}
                  >
                    <div className="mb-2">{getPlatformIcon(p.id, 32)}</div>
                    <p className="font-semibold text-sm text-foreground">
                      {p.id}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {p.bestFor}
                    </p>
                    <p className="text-xs font-medium text-primary mt-1">
                      CPC {p.cpc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Goal */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">
                Choose Campaign Goal
              </h3>
              <RadioGroup
                value={selectedGoal}
                onValueChange={setSelectedGoal}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {WIZARD_GOALS.map((g) => (
                  <Label
                    key={g.id}
                    htmlFor={g.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-smooth hover:shadow-elevated ${
                      selectedGoal === g.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                        : "border-border bg-card"
                    }`}
                  >
                    <RadioGroupItem
                      value={g.id}
                      id={g.id}
                      className="mt-0.5"
                      data-ocid={`wizard.goal.${g.id}`}
                    />
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {g.icon} {g.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {g.desc}
                      </p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 3: Creative */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">
                Generate Ad Creative
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Ad Copy</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs"
                    onClick={() =>
                      toast.success("Ad copy regenerated with AI.")
                    }
                    data-ocid="wizard.regenerate_button"
                  >
                    <RefreshCw className="w-3 h-3" /> Regenerate
                  </Button>
                </div>
                <Textarea
                  value={adCopy}
                  onChange={(e) => setAdCopy(e.target.value)}
                  rows={4}
                  className="resize-none font-body text-sm"
                  data-ocid="wizard.ad_copy.textarea"
                />
              </div>
              <div className="space-y-2">
                <Label>Headline Variant</Label>
                <div className="space-y-2">
                  {HEADLINE_VARIANTS.map((h, i) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setSelectedHeadline(i)}
                      className={`w-full text-left p-3 rounded-lg border text-sm transition-smooth ${
                        selectedHeadline === i
                          ? "border-primary bg-primary/5 text-foreground font-medium"
                          : "border-border bg-card text-muted-foreground hover:border-primary/40"
                      }`}
                      data-ocid={`wizard.headline.${i + 1}`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Call-to-Action</Label>
                <div className="flex flex-wrap gap-2">
                  {CTA_OPTIONS.map((cta, i) => (
                    <button
                      key={cta}
                      type="button"
                      onClick={() => setSelectedCta(i)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth ${
                        selectedCta === i
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/40"
                      }`}
                      data-ocid={`wizard.cta.${i + 1}`}
                    >
                      {cta}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">
                Set Campaign Budget
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Budget Type</Label>
                    <div className="flex gap-2">
                      {(["daily", "monthly"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setBudgetType(t)}
                          className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-smooth capitalize ${
                            budgetType === t
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border bg-card text-muted-foreground"
                          }`}
                          data-ocid={`wizard.budget_type.${t}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Budget Amount (₹/
                      {budgetType === "daily" ? "day" : "month"})
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="pl-7"
                        placeholder="25000"
                        data-ocid="wizard.budget.input"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Card className="border-border gradient-kpi">
                    <CardContent className="p-4 space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Projections
                      </p>
                      {[
                        {
                          label: "Est. Reach",
                          value: fmtNum(estReach),
                          icon: "👁",
                        },
                        {
                          label: "Est. Leads",
                          value: estLeads.toLocaleString(),
                          icon: "🎯",
                        },
                        {
                          label: "Est. CPL",
                          value: estLeads
                            ? fmtINR(Math.round(Number(budget) / estLeads))
                            : "—",
                          icon: "💰",
                        },
                      ].map(({ label, value, icon }) => (
                        <div
                          key={label}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-muted-foreground">
                            {icon} {label}
                          </span>
                          <span className="text-sm font-semibold text-foreground">
                            {value}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Estimated reach</span>
                      <span>{fmtNum(estReach)}</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill transition-all duration-500"
                        style={{
                          width: `${Math.min((estReach / 500000) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Preview */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-foreground">
                Ad Preview
              </h3>
              <div className="max-w-sm mx-auto">
                <Card className="border-border shadow-elevated overflow-hidden">
                  <div className="bg-muted/30 px-3 py-2 flex items-center gap-2">
                    {selectedPlatform && getPlatformIcon(selectedPlatform, 16)}
                    <span className="text-xs text-muted-foreground font-medium">
                      {selectedPlatform ?? "Platform"} · Sponsored
                    </span>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="w-full aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                      <Rocket className="w-12 h-12 text-primary/40" />
                    </div>
                    <p className="text-sm font-bold text-foreground leading-snug">
                      {HEADLINE_VARIANTS[selectedHeadline]}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-3">
                      {adCopy}
                    </p>
                    <button
                      type="button"
                      className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
                    >
                      {CTA_OPTIONS[selectedCta]}
                    </button>
                  </CardContent>
                </Card>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  Preview is approximate. Actual appearance varies by platform.
                </p>
              </div>
            </div>
          )}

          {/* Step 6: Launch */}
          {step === 5 && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-foreground">
                Review & Launch
              </h3>
              {launched ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      Campaign Launched!
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your campaign is now live. Results will appear within 24h.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={resetWizard}
                    data-ocid="wizard.create_another_button"
                  >
                    Create Another Campaign
                  </Button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="border-border shadow-subtle">
                    <CardContent className="p-4 space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Campaign Summary
                      </p>
                      {[
                        {
                          label: "Platform",
                          value: selectedPlatform ?? "Not selected",
                        },
                        {
                          label: "Goal",
                          value:
                            WIZARD_GOALS.find((g) => g.id === selectedGoal)
                              ?.label ?? "Not selected",
                        },
                        {
                          label: "Budget",
                          value: budget
                            ? `₹${Number(budget).toLocaleString()}/${budgetType}`
                            : "Not set",
                        },
                        {
                          label: "Est. Reach",
                          value: fmtNum(estReach),
                        },
                        { label: "Est. Leads", value: estLeads.toString() },
                        {
                          label: "CTA",
                          value: CTA_OPTIONS[selectedCta],
                        },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-medium text-foreground">
                            {value}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                  <div className="space-y-3">
                    <Card className="border-success/20 bg-success/5 shadow-subtle">
                      <CardContent className="p-4">
                        <p className="text-sm font-semibold text-success mb-1">
                          ✓ Ready to launch
                        </p>
                        <p className="text-xs text-muted-foreground">
                          All campaign parameters are configured. Your ads will
                          go live immediately after confirmation.
                        </p>
                      </CardContent>
                    </Card>
                    <Button
                      className="w-full gap-2 btn-primary-glow"
                      onClick={handleLaunch}
                      disabled={launching}
                      data-ocid="wizard.launch_button"
                    >
                      {launching ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Launching…
                        </>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4" />
                          Launch Campaign
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {!launched && (
        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            data-ocid="wizard.back_button"
          >
            Back
          </Button>
          {step < STEP_LABELS.length - 1 && (
            <Button
              onClick={() =>
                setStep((s) => Math.min(STEP_LABELS.length - 1, s + 1))
              }
              disabled={
                (step === 0 && !selectedPlatform) ||
                (step === 1 && !selectedGoal)
              }
              data-ocid="wizard.next_button"
            >
              Next Step <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Performance Tab ───────────────────────────────────────────────────────────

type SortKey = "spend" | "reach" | "leads" | "roi";

function PerformanceTab() {
  const [sortKey, setSortKey] = useState<SortKey>("leads");
  const sorted = [...PLATFORM_STATS].sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spend vs Leads Bar Chart */}
        <Card className="border-border shadow-subtle">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Platform Spend vs Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={SPEND_VS_LEADS_DATA}
                margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  yAxisId="spend"
                  orientation="left"
                  tickFormatter={(v: number) => `₹${v}k`}
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                />
                <YAxis
                  yAxisId="leads"
                  orientation="right"
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v: number, name: string) => [
                    name === "spend" ? `₹${v}k` : v,
                    name === "spend" ? "Spend" : "Leads",
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="spend"
                  dataKey="spend"
                  name="Spend (₹k)"
                  fill="oklch(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  opacity={0.85}
                />
                <Bar
                  yAxisId="leads"
                  dataKey="leads"
                  name="Leads"
                  fill="oklch(var(--success))"
                  radius={[4, 4, 0, 0]}
                  opacity={0.85}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROI Trend Line Chart */}
        <Card className="border-border shadow-subtle">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              ROI Trend — Last 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart
                data={ROI_TREND_DATA}
                margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={{
                    fontSize: 10,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                  interval={4}
                />
                <YAxis
                  tickFormatter={(v: number) => `${v}%`}
                  tick={{
                    fontSize: 11,
                    fill: "oklch(var(--muted-foreground))",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v: number) => [`${v}%`, "ROI"]}
                />
                <Line
                  type="monotone"
                  dataKey="roi"
                  stroke="oklch(var(--primary))"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Table */}
      <Card className="border-border shadow-subtle">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Platform Performance
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Sort by:</span>
              {(["spend", "reach", "leads", "roi"] as SortKey[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSortKey(k)}
                  className={`text-xs px-2 py-1 rounded-md font-medium capitalize transition-smooth ${
                    sortKey === k
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  data-ocid={`performance.sort.${k}`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Header row */}
            <div className="grid grid-cols-6 gap-4 px-4 py-2">
              {["Platform", "Spend", "Reach", "Leads", "ROI", "Status"].map(
                (h) => (
                  <p
                    key={h}
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    {h}
                  </p>
                ),
              )}
            </div>
            <Separator />
            {sorted.map((stat, i) => (
              <motion.div
                key={stat.platform}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
                className="grid grid-cols-6 gap-4 px-4 py-3 rounded-lg hover:bg-muted/30 transition-smooth items-center"
                data-ocid={`performance.row.${i + 1}`}
              >
                <div className="flex items-center gap-2">
                  {getPlatformIcon(stat.platform, 18)}
                  <span className="text-sm font-medium text-foreground truncate">
                    {stat.platform}
                  </span>
                </div>
                <span className="text-sm text-foreground">
                  {fmtINR(stat.spend)}
                </span>
                <span className="text-sm text-foreground">
                  {fmtNum(stat.reach)}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {stat.leads}
                </span>
                <Badge
                  variant="outline"
                  className={`text-xs font-bold w-fit ${roiColor(stat.roi)}`}
                >
                  {stat.roi}%
                </Badge>
                <span className="badge-status status-active text-[10px]">
                  Active
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Active Campaigns Tab ──────────────────────────────────────────────────────

function ActiveCampaignsTab() {
  return (
    <div className="space-y-6">
      {/* Platform Stats Scroll Row */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {PLATFORM_STATS.map((stat) => (
          <PlatformStatCard key={stat.platform} stat={stat} />
        ))}
      </div>

      <Separator />

      {/* Campaign Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {ACTIVE_CAMPAIGNS.length} Campaigns
          </h3>
          <div className="flex gap-2">
            {["All", "Active", "Paused", "Completed"].map((f) => (
              <button
                key={f}
                type="button"
                className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-smooth"
                data-ocid={`campaigns.filter.${f.toLowerCase()}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        {ACTIVE_CAMPAIGNS.map((c, i) => (
          <CampaignCard key={c.id} campaign={c} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AdsPage() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="space-y-6 p-6" data-ocid="campaigns.page">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
            <span>GrowthOS</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Campaigns</span>
          </nav>
          <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
            Campaigns
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Launch, manage, and track your paid advertising campaigns across all
            platforms.
          </p>
        </div>
        <Button
          className="gap-2 btn-primary-glow shrink-0"
          onClick={() => {
            setActiveTab("builder");
            toast.info("Campaign builder opened.");
          }}
          data-ocid="campaigns.new_campaign_button"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        data-ocid="campaigns.tabs"
      >
        <TabsList className="mb-5 bg-muted/50">
          <TabsTrigger
            value="active"
            className="gap-2"
            data-ocid="campaigns.tab.active"
          >
            <Zap className="w-4 h-4" />
            Active Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="builder"
            className="gap-2"
            data-ocid="campaigns.tab.builder"
          >
            <Rocket className="w-4 h-4" />
            Campaign Builder
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="gap-2"
            data-ocid="campaigns.tab.performance"
          >
            <BarChart2 className="w-4 h-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <ActiveCampaignsTab />
        </TabsContent>
        <TabsContent value="builder">
          <CampaignBuilderTab />
        </TabsContent>
        <TabsContent value="performance">
          <PerformanceTab />
        </TabsContent>
      </Tabs>

      {/* Disclaimer */}
      <p className="text-[10px] text-muted-foreground/60 text-center pt-2">
        Platform logos are trademarks of their respective owners. GrowthOS is
        not affiliated with or endorsed by any of the listed advertising
        platforms.
      </p>
    </div>
  );
}
