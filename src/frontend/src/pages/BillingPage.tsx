import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Crown,
  Download,
  Minus,
  Plus,
  Receipt,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  highlighted?: boolean;
  current?: boolean;
  icon?: React.ReactNode;
  features: { label: string; included: boolean }[];
}

interface CreditMeter {
  id: string;
  label: string;
  used: number;
  total: number;
  color: "primary" | "success" | "warning";
  packLabel: string;
  packPrice: string;
}

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: "paid" | "pending";
}

interface AddOn {
  id: string;
  label: string;
  quantity: number;
  unitLabel: string;
  price: string;
  priceAmount: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_FEATURES = [
  "Leads per day",
  "AI Pitch Generator",
  "AI Proposal Generator",
  "Auto Follow-Up",
  "CRM Pipeline",
  "SEO Checklist",
  "Campaign Builder",
  "Advanced Analytics",
  "White-label Reports",
  "Team Access",
  "Priority Support",
  "Dedicated Account Manager",
  "API Access",
];

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Manual outreach, 10 leads/day",
    features: [
      { label: "10 leads/day", included: true },
      { label: "AI pitch generator", included: false },
      { label: "AI proposal generator", included: false },
      { label: "Auto follow-up", included: false },
      { label: "CRM pipeline", included: false },
      { label: "SEO checklist", included: false },
      { label: "Campaign builder", included: false },
      { label: "Advanced analytics", included: false },
      { label: "White-label reports", included: false },
      { label: "Team access", included: false },
      { label: "Priority support", included: false },
      { label: "Account manager", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "50 leads/day + message templates",
    features: [
      { label: "50 leads/day", included: true },
      { label: "AI pitch generator", included: true },
      { label: "AI proposal generator", included: false },
      { label: "Basic follow-up", included: true },
      { label: "CRM pipeline", included: false },
      { label: "SEO checklist", included: false },
      { label: "Campaign builder", included: false },
      { label: "Advanced analytics", included: false },
      { label: "White-label reports", included: false },
      { label: "Team access", included: false },
      { label: "Priority support", included: false },
      { label: "Account manager", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 299,
    yearlyPrice: 239,
    description: "Auto follow-ups, CRM pipeline, reports",
    highlighted: true,
    current: true,
    features: [
      { label: "150 leads/day", included: true },
      { label: "AI pitch generator", included: true },
      { label: "AI proposal generator", included: false },
      { label: "Auto follow-up", included: true },
      { label: "CRM pipeline", included: true },
      { label: "SEO checklist", included: true },
      { label: "Campaign builder", included: false },
      { label: "Advanced analytics", included: false },
      { label: "White-label reports", included: false },
      { label: "Team access", included: false },
      { label: "Priority support", included: true },
      { label: "Account manager", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 999,
    yearlyPrice: 799,
    description: "500 leads/day + proposals + campaigns",
    features: [
      { label: "500 leads/day", included: true },
      { label: "AI pitch generator", included: true },
      { label: "AI proposal generator", included: true },
      { label: "Auto follow-up", included: true },
      { label: "CRM pipeline", included: true },
      { label: "SEO checklist", included: true },
      { label: "Campaign builder", included: true },
      { label: "Advanced analytics", included: true },
      { label: "White-label reports", included: false },
      { label: "Team access", included: false },
      { label: "Priority support", included: true },
      { label: "Account manager", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "agency",
    name: "Agency",
    monthlyPrice: 4999,
    yearlyPrice: 3999,
    description: "White-label reports, team access, high-volume",
    features: [
      { label: "Unlimited leads (fair usage)", included: true },
      { label: "AI pitch generator", included: true },
      { label: "AI proposal generator", included: true },
      { label: "Auto follow-up", included: true },
      { label: "CRM pipeline", included: true },
      { label: "SEO checklist", included: true },
      { label: "Campaign builder", included: true },
      { label: "Advanced analytics", included: true },
      { label: "White-label reports", included: true },
      { label: "Team access", included: true },
      { label: "Priority support", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "API access", included: true },
    ],
  },
];

const CREDIT_METERS: CreditMeter[] = [
  {
    id: "leads",
    label: "Lead Credits",
    used: 847,
    total: 1000,
    color: "primary",
    packLabel: "Lead Pack",
    packPrice: "100 leads for ₹499",
  },
  {
    id: "ai",
    label: "AI Message Credits",
    used: 234,
    total: 500,
    color: "success",
    packLabel: "Message Pack",
    packPrice: "200 messages for ₹299",
  },
  {
    id: "campaigns",
    label: "Campaign Credits",
    used: 3,
    total: 10,
    color: "warning",
    packLabel: "Campaign Pack",
    packPrice: "5 campaigns for ₹999",
  },
];

const INVOICES: Invoice[] = [
  {
    id: "INV-2604",
    date: "Apr 1, 2026",
    description: "Growth Plan — Monthly",
    amount: "₹299",
    status: "paid",
  },
  {
    id: "INV-2603",
    date: "Mar 1, 2026",
    description: "Growth Plan — Monthly",
    amount: "₹299",
    status: "paid",
  },
  {
    id: "INV-2602",
    date: "Feb 1, 2026",
    description: "Growth Plan — Monthly",
    amount: "₹299",
    status: "paid",
  },
  {
    id: "INV-2601",
    date: "Jan 1, 2026",
    description: "Starter Plan — Monthly",
    amount: "₹49",
    status: "paid",
  },
  {
    id: "INV-2512",
    date: "Dec 1, 2025",
    description: "Starter Plan — Monthly",
    amount: "₹49",
    status: "paid",
  },
];

const INITIAL_ADDONS: AddOn[] = [
  {
    id: "lead-pack",
    label: "Lead Pack",
    quantity: 1,
    unitLabel: "100 leads",
    price: "₹499",
    priceAmount: 499,
  },
  {
    id: "message-pack",
    label: "Message Pack",
    quantity: 1,
    unitLabel: "200 messages",
    price: "₹299",
    priceAmount: 299,
  },
  {
    id: "campaign-pack",
    label: "Campaign Pack",
    quantity: 1,
    unitLabel: "5 campaigns",
    price: "₹999",
    priceAmount: 999,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function colorClass(color: CreditMeter["color"]) {
  if (color === "primary") return "bg-primary";
  if (color === "success") return "bg-success";
  return "bg-warning";
}

function ringClass(color: CreditMeter["color"]) {
  if (color === "primary") return "stroke-primary";
  if (color === "success") return "stroke-success";
  return "stroke-warning";
}

function CircularMeter({
  used,
  total,
  color,
}: { used: number; total: number; color: CreditMeter["color"] }) {
  const pct = Math.min((used / total) * 100, 100);
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      role="img"
      aria-label={`${pct.toFixed(0)}% used`}
    >
      <title>{`${pct.toFixed(0)}% used`}</title>
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        className="stroke-border"
        strokeWidth="6"
      />
      <motion.circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        className={ringClass(color)}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        transform="rotate(-90 40 40)"
      />
      <text
        x="40"
        y="44"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="currentColor"
        className="text-foreground"
      >
        {pct.toFixed(0)}%
      </text>
    </svg>
  );
}

// ─── Compare Modal ─────────────────────────────────────────────────────────────

function CompareModal({
  open,
  onClose,
  isYearly,
}: { open: boolean; onClose: () => void; isYearly: boolean }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl max-h-[80vh] overflow-y-auto scrollbar-thin"
        data-ocid="billing.compare.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            Compare All Plans
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-medium text-muted-foreground w-40">
                  Feature
                </th>
                {PLANS.map((p) => (
                  <th key={p.id} className="py-3 px-2 text-center min-w-[90px]">
                    <span
                      className={`font-display font-semibold ${p.current ? "text-primary" : "text-foreground"}`}
                    >
                      {p.name}
                    </span>
                    <br />
                    <span className="text-xs font-normal text-muted-foreground tabular-nums">
                      {p.monthlyPrice === 0
                        ? "Free"
                        : `₹${(isYearly ? p.yearlyPrice : p.monthlyPrice).toLocaleString("en-IN")}/mo`}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_FEATURES.map((feat, i) => (
                <tr
                  key={feat}
                  className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/20" : ""}`}
                >
                  <td className="py-2.5 pr-4 text-foreground">{feat}</td>
                  {PLANS.map((p) => (
                    <td key={p.id} className="py-2.5 px-2 text-center">
                      {p.features[i]?.included ? (
                        <CheckCircle2 className="w-4 h-4 text-success mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground/40 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            data-ocid="billing.compare.close_button"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── BillingUpgradeButton ───────────────────────────────────────────────────

function BillingUpgradeButton() {
  const nav = useNavigate();
  return (
    <Button
      size="sm"
      className="btn-primary-glow"
      onClick={() =>
        nav({
          to: "/checkout",
          search: { plan: "rzp_growth" } as Record<string, string>,
        })
      }
      data-ocid="billing.upgrade_plan.button"
    >
      <Zap className="w-3.5 h-3.5 mr-1.5" />
      Upgrade Plan
    </Button>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BillingPage() {
  const navigate = useNavigate();
  const [compareOpen, setCompareOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [addons, setAddons] = useState<AddOn[]>(INITIAL_ADDONS);
  const [cartTotal, setCartTotal] = useState(0);

  function adjustQty(id: string, delta: number) {
    setAddons((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, quantity: Math.max(1, a.quantity + delta) } : a,
      ),
    );
  }

  function handleCheckout() {
    const total = addons.reduce(
      (sum, a) => sum + a.priceAmount * a.quantity,
      0,
    );
    setCartTotal(total);
    toast.success(
      `Order of ₹${total.toLocaleString("en-IN")} placed successfully!`,
      {
        description: "Credits will be added to your account within minutes.",
      },
    );
  }

  const cartSum = addons.reduce(
    (sum, a) => sum + a.priceAmount * a.quantity,
    0,
  );

  return (
    <div data-ocid="billing.page" className="space-y-8 pb-10">
      <PageHeader
        title="Billing"
        description="Manage your subscription and usage"
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCompareOpen(true)}
            data-ocid="billing.compare.open_modal_button"
          >
            <ArrowUpRight className="w-3.5 h-3.5 mr-1.5" />
            Compare Plans
          </Button>
        }
      />

      {/* ── Current Plan Card ─────────────────────────────────────────────── */}
      <section data-ocid="billing.current_plan.section">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Current Plan
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-6 border-primary/40 shadow-glow-primary relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, oklch(var(--primary)), oklch(var(--premium-accent)), transparent)",
              }}
            />
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="w-12 h-12 rounded-xl gradient-premium flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-display font-bold text-lg text-foreground">
                    Growth Plan
                  </h3>
                  <Badge className="status-active text-[10px] font-semibold px-2 py-0.5">
                    Active
                  </Badge>
                  <Badge className="status-premium text-[10px] font-semibold px-2 py-0.5">
                    <Star className="w-2.5 h-2.5 mr-1" />
                    Most Popular
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Billing Cycle
                    </p>
                    <p className="font-semibold text-foreground mt-0.5">
                      {isYearly ? "Yearly" : "Monthly"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Current Price
                    </p>
                    <p className="font-semibold text-foreground mt-0.5 tabular-nums">
                      {isYearly ? "₹239/mo" : "₹299/mo"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Next Renewal
                    </p>
                    <p className="font-semibold text-foreground mt-0.5">
                      May 1, 2026
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Next Bill Amount
                    </p>
                    <p className="font-semibold text-foreground mt-0.5 tabular-nums">
                      {isYearly ? "₹2,868" : "₹299"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <BillingUpgradeButton />
                <Button
                  size="sm"
                  variant="outline"
                  data-ocid="billing.manage_subscription.button"
                >
                  Manage
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* ── Credit Usage Meters ───────────────────────────────────────────── */}
      <section data-ocid="billing.credits.section">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Credit Usage
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CREDIT_METERS.map((m, i) => {
            const pct = Math.min(Math.round((m.used / m.total) * 100), 100);
            const remaining = m.total - m.used;
            const isHigh = pct >= 80;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                data-ocid={`billing.credit_meter.${i + 1}`}
              >
                <Card className="p-5 flex flex-col items-center text-center gap-3">
                  <CircularMeter
                    used={m.used}
                    total={m.total}
                    color={m.color}
                  />
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {m.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 tabular-nums">
                      <span
                        className={
                          isHigh
                            ? "text-destructive font-semibold"
                            : "text-foreground font-semibold"
                        }
                      >
                        {m.used.toLocaleString()}
                      </span>
                      {" / "}
                      {m.total.toLocaleString()} used
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {remaining.toLocaleString()} remaining
                    </p>
                  </div>
                  <div className="w-full">
                    <div className="progress-bar w-full">
                      <motion.div
                        className={`progress-bar-fill ${isHigh ? "bg-destructive" : colorClass(m.color)}`}
                        style={{ background: undefined }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{
                          duration: 0.9,
                          ease: "easeOut",
                          delay: 0.3 + i * 0.1,
                        }}
                      />
                    </div>
                    {isHigh && (
                      <p className="text-[10px] text-destructive mt-1 font-medium">
                        Running low
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline transition-fast"
                    data-ocid={`billing.credit_buy_more.${i + 1}`}
                  >
                    Buy More — {m.packPrice}
                  </button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Subscription Plans ────────────────────────────────────────────── */}
      <section data-ocid="billing.plans.section">
        {/* Toggle + header row */}
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Subscription Plans
          </h2>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-semibold transition-colors ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}
            >
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isYearly}
              onClick={() => setIsYearly((p) => !p)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary ${isYearly ? "bg-primary" : "bg-muted"}`}
              data-ocid="billing.billing_toggle"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-card shadow-subtle transition-transform duration-200 ${isYearly ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
            <span
              className={`text-xs font-semibold transition-colors flex items-center gap-1.5 ${isYearly ? "text-foreground" : "text-muted-foreground"}`}
            >
              Yearly
              {isYearly && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-warning/15 text-warning"
                >
                  Save 20%
                </motion.span>
              )}
            </span>
            <button
              type="button"
              className="text-xs text-primary hover:underline transition-fast ml-2"
              onClick={() => setCompareOpen(true)}
              data-ocid="billing.compare_inline.button"
            >
              Compare all →
            </button>
          </div>
        </div>

        {/* Horizontal snap scroll on mobile, grid on desktop */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin pb-3 md:grid md:grid-cols-5 md:overflow-visible">
          {PLANS.map((plan, i) => {
            const displayPrice = isYearly
              ? plan.yearlyPrice
              : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="snap-start shrink-0 w-[220px] md:w-auto"
                data-ocid={`billing.plan.${i + 1}`}
              >
                <Card
                  className={`p-5 h-full flex flex-col relative transition-smooth ${
                    plan.highlighted
                      ? "border-primary shadow-elevated scale-[1.02]"
                      : "border-border"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-elevated">
                        <Star className="w-2.5 h-2.5" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  {plan.current && (
                    <Badge className="absolute top-3 right-3 status-active text-[10px] font-semibold px-2 py-0.5">
                      Current
                    </Badge>
                  )}

                  {/* Plan icon */}
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    {plan.id === "free" && (
                      <Zap className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                    {plan.id === "starter" && (
                      <Star className="w-3.5 h-3.5 text-primary" />
                    )}
                    {plan.id === "growth" && (
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    )}
                    {plan.id === "pro" && (
                      <Zap className="w-3.5 h-3.5 text-primary" />
                    )}
                    {plan.id === "agency" && (
                      <Crown className="w-3.5 h-3.5 text-warning" />
                    )}
                  </div>

                  <div className="mb-4 mt-1">
                    <h3 className="font-display font-bold text-foreground">
                      {plan.name}
                    </h3>
                    {plan.id === "growth" && (
                      <p className="text-[10px] font-semibold text-primary/80 mt-0.5">
                        Most businesses start here
                      </p>
                    )}
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-bold text-foreground tabular-nums">
                        {plan.monthlyPrice === 0
                          ? "₹0"
                          : `₹${displayPrice.toLocaleString("en-IN")}`}
                      </span>
                      {plan.monthlyPrice > 0 && (
                        <span className="text-xs text-muted-foreground">
                          /mo
                        </span>
                      )}
                    </div>
                    {isYearly && plan.monthlyPrice > 0 && (
                      <p className="text-[10px] text-success font-semibold mt-0.5">
                        Save{" "}
                        {Math.round(
                          ((plan.monthlyPrice - plan.yearlyPrice) /
                            plan.monthlyPrice) *
                            100,
                        )}
                        %
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-1.5 flex-1 mb-4">
                    {plan.features.slice(0, 6).map((f) => (
                      <li
                        key={f.label}
                        className="flex items-start gap-2 text-xs"
                      >
                        {f.included ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-success mt-0.5 shrink-0" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-muted-foreground/40 mt-0.5 shrink-0" />
                        )}
                        <span
                          className={
                            f.included
                              ? "text-foreground"
                              : "text-muted-foreground/60"
                          }
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Free trial note */}
                  {(plan.id === "starter" || plan.id === "growth") && (
                    <p className="text-[10px] text-muted-foreground mb-2 text-center">
                      🎁 7-day free trial
                    </p>
                  )}

                  <Button
                    className={`w-full text-xs h-9 ${plan.highlighted && !plan.current ? "btn-primary-glow" : ""}`}
                    variant={
                      plan.current
                        ? "outline"
                        : plan.highlighted
                          ? "default"
                          : "outline"
                    }
                    disabled={plan.current}
                    onClick={() => {
                      if (!plan.current) {
                        if (plan.id === "agency") {
                          toast.info("Contact our sales team for Agency plan.");
                        } else if (plan.id !== "free") {
                          navigate({
                            to: "/checkout",
                            search: {
                              plan: `rzp_${plan.id}`,
                              yearly: isYearly ? "1" : undefined,
                            } as Record<string, string>,
                          });
                        }
                      }
                    }}
                    data-ocid={`billing.plan.select.${plan.id}`}
                  >
                    {plan.current ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Current Plan
                      </span>
                    ) : plan.id === "free" ? (
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        Start free
                      </span>
                    ) : plan.id === "starter" ? (
                      <span className="flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        Get started
                      </span>
                    ) : plan.id === "growth" ? (
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        Upgrade to Growth
                      </span>
                    ) : plan.id === "pro" ? (
                      <span className="flex items-center gap-1">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        Go Pro
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Crown className="w-3.5 h-3.5 text-warning" />
                        Start Agency plan
                      </span>
                    )}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── ROI Callout + Objections ──────────────────────────────────────── */}
      <section data-ocid="billing.roi_callout.section" className="space-y-4">
        {/* ROI Box */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Card className="p-5 border-success/30 bg-success/5">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-success/15 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Even 1 new customer can cover your monthly plan.
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Example: ₹1,000 service × 10 extra customers ={" "}
                  <span className="font-semibold text-success">
                    ₹10,000 added revenue
                  </span>{" "}
                  — enough to cover the Growth plan for over 33 months.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick objection answers */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          data-ocid="billing.objections.section"
        >
          {[
            {
              id: "no-contracts",
              icon: <Shield className="w-3.5 h-3.5 text-primary" />,
              text: "No contracts. Cancel anytime.",
            },
            {
              id: "no-experience",
              icon: <CheckCircle2 className="w-3.5 h-3.5 text-success" />,
              text: "No experience needed — the app guides you step by step.",
            },
            {
              id: "integrations",
              icon: <Zap className="w-3.5 h-3.5 text-warning" />,
              text: "Works with Google Ads, Meta Ads, and WhatsApp Business.",
            },
          ].map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-2.5 p-3.5 rounded-xl bg-muted/30 border border-border/60"
            >
              <div className="mt-0.5 shrink-0">{item.icon}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-muted-foreground/70 text-center">
          Results depend on your location, offer, and follow-up speed.
          Integrations are not endorsements. Logos belong to their owners.
        </p>
      </section>

      {/* ── Billing History ───────────────────────────────────────────────── */}
      <section data-ocid="billing.history.section">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Billing History
        </h2>
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Invoices</h3>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Visa ****4242
              </span>
            </div>
          </div>
          <div className="divide-y divide-border">
            {INVOICES.map((inv, i) => (
              <motion.div
                key={inv.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/20 transition-fast"
                data-ocid={`billing.invoice.item.${i + 1}`}
              >
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                  <Receipt className="w-3.5 h-3.5 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {inv.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {inv.date} ·{" "}
                    <span className="font-mono text-[11px]">{inv.id}</span>
                  </p>
                </div>
                <span className="text-sm font-semibold text-foreground tabular-nums shrink-0">
                  {inv.amount}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 capitalize ${inv.status === "paid" ? "status-active" : "status-paused"}`}
                >
                  {inv.status}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 text-muted-foreground hover:text-foreground shrink-0"
                  aria-label="Download invoice"
                  data-ocid={`billing.invoice.download.${i + 1}`}
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </motion.div>
            ))}
          </div>
          <div className="px-5 py-3 flex items-center gap-2 bg-muted/20">
            <Shield className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground">
              Payments secured by{" "}
              <span className="font-semibold text-[#528FF0]">Razorpay</span>.
              All invoices include GST.
            </p>
          </div>
        </Card>
      </section>

      {/* ── Payment Method ────────────────────────────────────────────────── */}
      <section data-ocid="billing.payment_method.section">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Payment Method
        </h2>
        <Card className="p-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded-md bg-muted/50 border border-border flex items-center justify-center">
                <svg
                  viewBox="0 0 40 24"
                  width="32"
                  height="20"
                  role="img"
                  aria-label="Visa card"
                >
                  <title>Visa card</title>
                  <text
                    x="4"
                    y="17"
                    fontSize="13"
                    fontWeight="800"
                    fill="oklch(0.45 0.15 253)"
                  >
                    VISA
                  </text>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Visa ending in 4242
                </p>
                <p className="text-xs text-muted-foreground">Expires 12/27</p>
              </div>
              <span className="status-active text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Primary
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                data-ocid="billing.update_card.button"
              >
                Update Card
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="gap-1.5"
                data-ocid="billing.add_payment_method.button"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Method
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* ── Add-on Credits ────────────────────────────────────────────────── */}
      <section data-ocid="billing.addons.section">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Purchase Add-on Credits
        </h2>
        <Card className="p-5">
          <div className="space-y-4">
            {addons.map((addon, i) => (
              <div
                key={addon.id}
                className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0"
                data-ocid={`billing.addon.item.${i + 1}`}
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Wallet className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">
                    {addon.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {addon.unitLabel} · {addon.price} per pack
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => adjustQty(addon.id, -1)}
                    className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-fast"
                    aria-label="Decrease quantity"
                    data-ocid={`billing.addon.decrease.${i + 1}`}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-foreground tabular-nums">
                    {addon.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => adjustQty(addon.id, 1)}
                    className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-fast"
                    aria-label="Increase quantity"
                    data-ocid={`billing.addon.increase.${i + 1}`}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <span className="w-20 text-right text-sm font-bold text-foreground tabular-nums shrink-0">
                  ₹
                  {(addon.priceAmount * addon.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Cart Total</p>
              <p className="text-xl font-bold text-foreground tabular-nums">
                ₹{cartSum.toLocaleString("en-IN")}
              </p>
            </div>
            <Button
              className="btn-primary-glow gap-2"
              onClick={handleCheckout}
              data-ocid="billing.addon.checkout.button"
            >
              <Zap className="w-4 h-4" />
              Checkout
            </Button>
          </div>
        </Card>

        {cartTotal > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-success mt-2 flex items-center gap-1"
            data-ocid="billing.checkout.success_state"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Last order of ₹{cartTotal.toLocaleString("en-IN")} was placed
            successfully.
          </motion.p>
        )}
      </section>

      {/* ── Cancellation ─────────────────────────────────────────────────── */}
      <section
        className="pt-4 border-t border-border/50"
        data-ocid="billing.cancel.section"
      >
        <p className="text-xs text-muted-foreground">
          Want to cancel your subscription?{" "}
          <button
            type="button"
            className="text-destructive hover:underline transition-fast text-xs"
            onClick={() => setCancelOpen(true)}
            data-ocid="billing.cancel_subscription.button"
          >
            Cancel Subscription
          </button>
        </p>
      </section>

      {/* ── Modals ───────────────────────────────────────────────────────── */}
      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        isYearly={isYearly}
      />

      <ConfirmModal
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="Cancel Your Subscription?"
        description="You will immediately lose access to: 150 leads/day, auto follow-up, CRM pipeline, SEO checklist, and priority support. Your account will revert to the Free plan on May 1, 2026."
        confirmLabel="Yes, Cancel Plan"
        cancelLabel="Keep My Plan"
        destructive
        onConfirm={() => {
          setCancelOpen(false);
          toast.error("Subscription cancelled.", {
            description: "Access continues until May 1, 2026.",
          });
        }}
        data-ocid="billing.cancel"
      />
    </div>
  );
}
