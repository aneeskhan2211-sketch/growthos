import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type ClientStatus = "active" | "paused" | "at_risk";

interface ClientData {
  id: number;
  name: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
  status: ClientStatus;
  revenue: number; // raw ₹ value
  leads: number;
  roi: number; // e.g. 3.2 = 3.2x
  city: string;
  industry: string;
  monthlyTrend: { month: string; revenue: number }[];
  interactions: { date: string; type: string; note: string }[];
  nextSteps: string[];
}

// ── Mock Data ────────────────────────────────────────────────────────────────

const CLIENTS: ClientData[] = [
  {
    id: 1,
    name: "Bombay Bites",
    initials: "BB",
    gradientFrom: "#f97316",
    gradientTo: "#fb923c",
    status: "active",
    revenue: 120000,
    leads: 47,
    roi: 3.2,
    city: "Mumbai",
    industry: "Food & Beverage",
    monthlyTrend: [
      { month: "Feb", revenue: 72000 },
      { month: "Mar", revenue: 88000 },
      { month: "Apr", revenue: 120000 },
    ],
    interactions: [
      {
        date: "Apr 28",
        type: "campaign",
        note: "Instagram campaign sent to 1,200 users",
      },
      {
        date: "Apr 25",
        type: "reply",
        note: "Client replied: 'Great results this month!'",
      },
      {
        date: "Apr 18",
        type: "proposal",
        note: "Proposal for ₹25k package sent",
      },
    ],
    nextSteps: ["📋 Send monthly report", "📈 Expand to Instagram Reels"],
  },
  {
    id: 2,
    name: "FitZone Gym",
    initials: "FZ",
    gradientFrom: "#22c55e",
    gradientTo: "#4ade80",
    status: "active",
    revenue: 85000,
    leads: 34,
    roi: 2.8,
    city: "Pune",
    industry: "Health & Fitness",
    monthlyTrend: [
      { month: "Feb", revenue: 52000 },
      { month: "Mar", revenue: 68000 },
      { month: "Apr", revenue: 85000 },
    ],
    interactions: [
      {
        date: "Apr 30",
        type: "campaign",
        note: "WhatsApp blast sent to 480 contacts",
      },
      {
        date: "Apr 22",
        type: "reply",
        note: "Lead replied asking about membership offers",
      },
      {
        date: "Apr 15",
        type: "proposal",
        note: "₹15k starter package accepted",
      },
    ],
    nextSteps: ["📋 Schedule monthly call", "🎯 Launch Google Ads campaign"],
  },
  {
    id: 3,
    name: "Sharma Legal",
    initials: "SL",
    gradientFrom: "#8b5cf6",
    gradientTo: "#a78bfa",
    status: "paused",
    revenue: 210000,
    leads: 89,
    roi: 4.1,
    city: "Delhi",
    industry: "Legal Services",
    monthlyTrend: [
      { month: "Feb", revenue: 145000 },
      { month: "Mar", revenue: 182000 },
      { month: "Apr", revenue: 210000 },
    ],
    interactions: [
      {
        date: "Apr 20",
        type: "campaign",
        note: "LinkedIn outreach to 240 businesses",
      },
      {
        date: "Apr 12",
        type: "reply",
        note: "Partner requested 2-month pause",
      },
      { date: "Apr 5", type: "proposal", note: "₹50k premium package signed" },
    ],
    nextSteps: ["📋 Resume campaign in June", "📞 Check-in call scheduled"],
  },
  {
    id: 4,
    name: "MediCare Clinic",
    initials: "MC",
    gradientFrom: "#06b6d4",
    gradientTo: "#22d3ee",
    status: "active",
    revenue: 60000,
    leads: 21,
    roi: 2.1,
    city: "Bangalore",
    industry: "Healthcare",
    monthlyTrend: [
      { month: "Feb", revenue: 38000 },
      { month: "Mar", revenue: 50000 },
      { month: "Apr", revenue: 60000 },
    ],
    interactions: [
      {
        date: "Apr 29",
        type: "campaign",
        note: "Google Ads campaign launched",
      },
      {
        date: "Apr 24",
        type: "reply",
        note: "Doctor replied requesting SEO audit",
      },
      {
        date: "Apr 18",
        type: "proposal",
        note: "₹15k local SEO proposal sent",
      },
    ],
    nextSteps: [
      "📋 Deliver SEO audit report",
      "📈 Set up Google Business Profile",
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatRevenue(val: number): string {
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
}

const STATUS_CONFIG: Record<
  ClientStatus,
  { label: string; cls: string; dot: string }
> = {
  active: {
    label: "Active",
    cls: "bg-success/15 text-success border-success/30",
    dot: "bg-success",
  },
  paused: {
    label: "Paused",
    cls: "bg-warning/15 text-warning border-warning/30",
    dot: "bg-warning",
  },
  at_risk: {
    label: "At Risk",
    cls: "bg-destructive/15 text-destructive border-destructive/30",
    dot: "bg-destructive",
  },
};

// ── Animated Counter ──────────────────────────────────────────────────────────

function useAnimatedNumber(target: number, active: boolean, duration = 900) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3; // ease-out cubic
      setDisplay(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration]);

  return display;
}

// ── Animated Revenue Label ────────────────────────────────────────────────────

function AnimatedRevenue({
  value,
  active,
}: { value: number; active: boolean }) {
  const n = useAnimatedNumber(value, active, 1000);
  return <span>{formatRevenue(n)}</span>;
}

function AnimatedROI({ value, active }: { value: number; active: boolean }) {
  const raw = useAnimatedNumber(Math.round(value * 10), active, 900);
  return <span>{(raw / 10).toFixed(1)}x</span>;
}

// ── Client Card ───────────────────────────────────────────────────────────────

function ClientCard({
  client,
  index,
  onTap,
}: {
  client: ClientData;
  index: number;
  onTap: (c: ClientData) => void;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const status = STATUS_CONFIG[client.status];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
      data-ocid={`clients.card.item.${index + 1}`}
      className="relative rounded-2xl overflow-hidden cursor-pointer bg-card border border-border/60 p-3 flex flex-col gap-3 active:shadow-lg transition-shadow duration-200"
      onClick={() => onTap(client)}
    >
      {/* Subtle gradient accent top strip */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{
          background: `linear-gradient(90deg, ${client.gradientFrom}, ${client.gradientTo})`,
        }}
      />

      {/* Avatar + Status */}
      <div className="flex items-start justify-between pt-1">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{
            background: `linear-gradient(135deg, ${client.gradientFrom}, ${client.gradientTo})`,
          }}
        >
          {client.initials}
        </div>
        <Badge
          variant="outline"
          className={cn("text-[10px] px-1.5 py-0.5 gap-1 shrink-0", status.cls)}
        >
          <span
            className={cn("w-1.5 h-1.5 rounded-full shrink-0", status.dot)}
          />
          {status.label}
        </Badge>
      </div>

      {/* Name */}
      <div>
        <p className="text-sm font-bold text-foreground truncate leading-tight font-display">
          {client.name}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {client.city}
        </p>
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-1.5">
        {/* Revenue */}
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] text-muted-foreground">Revenue</span>
          <span className="text-lg font-bold tabular-nums text-primary leading-none">
            <AnimatedRevenue value={client.revenue} active={inView} />
          </span>
        </div>
        {/* Leads */}
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] text-muted-foreground">Leads</span>
          <span className="text-sm font-semibold tabular-nums text-foreground">
            {client.leads} delivered
          </span>
        </div>
        {/* ROI */}
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] text-muted-foreground">ROI</span>
          <span className="text-sm font-bold tabular-nums text-success">
            <AnimatedROI value={client.roi} active={inView} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-ocid="clients.empty_state"
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
          aria-hidden="true"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 7V5a2 2 0 0 0-4 0v2" />
          <line x1="12" y1="12" x2="12" y2="16" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
      </div>
      <h3 className="text-base font-bold font-display text-foreground mb-1">
        No clients yet
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">
        Close your first deal to see clients here
      </p>
      <Button data-ocid="clients.empty_state.view_leads_button" asChild>
        <a href="/leads">View Leads</a>
      </Button>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ClientsPage() {
  useMetaTags(PAGE_META["/clients"]);
  const navigate = useNavigate();
  const clients = CLIENTS;

  const activeCount = clients.filter((c) => c.status === "active").length;
  const totalRevenue = clients.reduce((sum, c) => sum + c.revenue, 0);

  const handleClientTap = (client: ClientData) => {
    // Track analytics event
    console.debug("[analytics] client_detail_viewed", client.id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigate as any)({
      to: "/clients/$clientId",
      params: { clientId: String(client.id) },
    });
  };

  return (
    <div
      data-ocid="clients.page"
      className="flex flex-col"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      {/* Header */}
      <div className="px-4 pt-5 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground leading-tight">
              My Clients
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5 tabular-nums">
              ₹{(totalRevenue / 100000).toFixed(1)}L total revenue
            </p>
          </div>
          <Badge
            variant="outline"
            className="bg-primary/10 text-primary border-primary/30 text-xs px-3 py-1 font-semibold mt-1"
            data-ocid="clients.active_count_badge"
          >
            {activeCount} Active
          </Badge>
        </div>
      </div>

      {/* Card Grid */}
      <div className="px-4 pb-6">
        {clients.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {clients.map((client, i) => (
              <ClientCard
                key={client.id}
                client={client}
                index={i}
                onTap={handleClientTap}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
