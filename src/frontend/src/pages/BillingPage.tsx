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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  Download,
  Minus,
  Plus,
  Receipt,
  Shield,
  Sparkles,
  Star,
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
  price: string;
  priceAmount: number;
  priceNote: string;
  description: string;
  highlighted?: boolean;
  current?: boolean;
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
  "Leads per month",
  "AI Messages",
  "Campaigns",
  "AI Features",
  "WhatsApp Outreach",
  "Email Outreach",
  "SEO Audit",
  "Automation Flows",
  "Client Reports",
  "Priority Support",
  "Dedicated Account Manager",
  "White-label Reports",
  "API Access",
];

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    priceAmount: 0,
    priceNote: "/mo",
    description: "Get started for free",
    features: [
      { label: "50 leads per month", included: true },
      { label: "100 AI messages", included: true },
      { label: "1 campaign", included: true },
      { label: "AI features", included: false },
      { label: "WhatsApp outreach", included: false },
      { label: "Email outreach", included: false },
      { label: "Basic SEO audit", included: true },
      { label: "Automation flows", included: false },
      { label: "Client reports", included: false },
      { label: "Priority support", included: false },
      { label: "Account manager", included: false },
      { label: "White-label reports", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹2,999",
    priceAmount: 2999,
    priceNote: "/mo",
    description: "For serious agencies",
    highlighted: true,
    current: true,
    features: [
      { label: "1,000 leads per month", included: true },
      { label: "500 AI messages", included: true },
      { label: "10 campaigns", included: true },
      { label: "AI features", included: true },
      { label: "WhatsApp outreach", included: true },
      { label: "Email outreach", included: true },
      { label: "Full SEO audit", included: true },
      { label: "Automation flows", included: true },
      { label: "Client reports", included: true },
      { label: "Priority support", included: true },
      { label: "Account manager", included: false },
      { label: "White-label reports", included: false },
      { label: "API access", included: false },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: "₹7,999",
    priceAmount: 7999,
    priceNote: "/mo",
    description: "Unlimited, enterprise-grade",
    features: [
      { label: "Unlimited leads", included: true },
      { label: "Unlimited messages", included: true },
      { label: "Unlimited campaigns", included: true },
      { label: "AI features", included: true },
      { label: "WhatsApp outreach", included: true },
      { label: "Email outreach", included: true },
      { label: "Full SEO audit", included: true },
      { label: "Automation flows", included: true },
      { label: "Client reports", included: true },
      { label: "Priority support", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "White-label reports", included: true },
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
    amount: "₹2,999",
    status: "paid",
  },
  {
    id: "INV-2603",
    date: "Mar 1, 2026",
    description: "Growth Plan — Monthly",
    amount: "₹2,999",
    status: "paid",
  },
  {
    id: "INV-2602",
    date: "Feb 1, 2026",
    description: "Growth Plan — Monthly",
    amount: "₹2,999",
    status: "paid",
  },
  {
    id: "INV-2601",
    date: "Jan 1, 2026",
    description: "Growth Plan — Monthly",
    amount: "₹2,999",
    status: "paid",
  },
  {
    id: "INV-2512",
    date: "Dec 1, 2025",
    description: "Starter Plan — Monthly",
    amount: "₹999",
    status: "paid",
  },
  {
    id: "INV-2511",
    date: "Nov 1, 2025",
    description: "Starter Plan — Monthly",
    amount: "₹999",
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
}: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[80vh] overflow-y-auto scrollbar-thin"
        data-ocid="billing.compare.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            Compare Plans
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 pr-4 font-medium text-muted-foreground w-48">
                  Feature
                </th>
                {PLANS.map((p) => (
                  <th key={p.id} className="py-3 px-2 text-center">
                    <span
                      className={`font-display font-semibold ${p.current ? "text-primary" : "text-foreground"}`}
                    >
                      {p.name}
                    </span>
                    <br />
                    <span className="text-xs font-normal text-muted-foreground">
                      {p.price}
                      {p.priceNote}
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
                        <Minus className="w-4 h-4 text-muted-foreground/40 mx-auto" />
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BillingPage() {
  const [compareOpen, setCompareOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
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
    toast.success(`Order of ₹${total.toLocaleString()} placed successfully!`, {
      description: "Credits will be added to your account within minutes.",
    });
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
            {/* gradient accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-premium-accent to-primary/0"
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
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Billing Cycle
                    </p>
                    <p className="font-semibold text-foreground mt-0.5">
                      Monthly
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Current Price
                    </p>
                    <p className="font-semibold text-foreground mt-0.5 tabular-nums">
                      ₹2,999/mo
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
                      ₹2,999
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="sm"
                  className="btn-primary-glow"
                  data-ocid="billing.upgrade_plan.button"
                >
                  <Zap className="w-3.5 h-3.5 mr-1.5" />
                  Upgrade Plan
                </Button>
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
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Subscription Plans
          </h2>
          <button
            type="button"
            className="text-xs text-primary hover:underline transition-fast"
            onClick={() => setCompareOpen(true)}
            data-ocid="billing.compare_inline.button"
          >
            View full comparison →
          </button>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              data-ocid={`billing.plan.${i + 1}`}
            >
              <Card
                className={`p-5 h-full flex flex-col relative transition-smooth ${
                  plan.highlighted
                    ? "border-primary shadow-elevated"
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

                <div className="mb-4 mt-1">
                  <h3 className="font-display font-bold text-foreground">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-foreground tabular-nums">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.priceNote}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.slice(0, 7).map((f) => (
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

                <Button
                  className={`w-full text-sm h-9 ${plan.highlighted && !plan.current ? "btn-primary-glow" : ""}`}
                  variant={
                    plan.current
                      ? "outline"
                      : plan.highlighted
                        ? "default"
                        : "outline"
                  }
                  disabled={plan.current}
                  data-ocid={`billing.plan.select.${plan.id}`}
                >
                  {plan.current ? (
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Current Plan
                    </span>
                  ) : plan.priceAmount > 2999 ? (
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Upgrade to {plan.name}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      Downgrade
                    </span>
                  )}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
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
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 capitalize ${
                    inv.status === "paid" ? "status-active" : "status-paused"
                  }`}
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
              Payments processed securely via Razorpay. All invoices include
              GST.
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
                  ₹{(addon.priceAmount * addon.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Cart Total</p>
              <p className="text-xl font-bold text-foreground tabular-nums">
                ₹{cartSum.toLocaleString()}
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
            Last order of ₹{cartTotal.toLocaleString()} was placed successfully.
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
      <CompareModal open={compareOpen} onClose={() => setCompareOpen(false)} />

      <ConfirmModal
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="Cancel Your Subscription?"
        description="You will immediately lose access to: 1,000 leads/month, AI message credits, automation flows, WhatsApp & email outreach, priority support, and client reports. Your account will revert to the Free plan on May 1, 2026."
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
