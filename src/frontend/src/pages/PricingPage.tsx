import { MetaTags } from "@/components/MetaTags";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PAGE_META } from "@/config/metaTags";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronDown,
  Crown,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useSubscriptionStatus } from "../hooks/useStripeCheckout";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PricePlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  leads: string;
  features: string[];
  cta: string;
  badge?: string;
  highlighted?: boolean;
  isFree?: boolean;
  isAgency?: boolean;
}

interface FAQ {
  q: string;
  a: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS: PricePlan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    leads: "10 leads/day",
    features: ["10 leads/day", "Manual outreach", "Basic tracking"],
    cta: "Start free",
    isFree: true,
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 39,
    leads: "50 leads/day",
    features: ["50 leads/day", "Message templates", "Basic follow-ups"],
    cta: "Get started",
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 299,
    yearlyPrice: 239,
    leads: "150 leads/day",
    features: [
      "150 leads/day",
      "Auto follow-ups",
      "CRM pipeline",
      "Simple reports",
    ],
    cta: "Upgrade to Growth",
    badge: "Most businesses start here",
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 999,
    yearlyPrice: 799,
    leads: "500 leads/day",
    features: [
      "500 leads/day",
      "Proposal generator",
      "Campaign tools",
      "Advanced tracking",
    ],
    cta: "Go Pro",
  },
  {
    id: "agency",
    name: "Agency",
    monthlyPrice: 4999,
    yearlyPrice: 3999,
    leads: "High-volume usage",
    features: [
      "High-volume usage",
      "White-label reports",
      "Team access",
      "Priority support",
    ],
    cta: "Start Agency plan",
    isAgency: true,
  },
];

const FREE_FEATURES = [
  "Manual work",
  "Limited leads",
  "No automation",
  "Slow follow-ups",
];

const PAID_FEATURES = [
  "Faster outreach",
  "Automated follow-ups",
  "Better conversion visibility",
  "Scheduled messages",
];

const FAQS: FAQ[] = [
  {
    q: "Will this work for my business?",
    a: "If your customers search online or use WhatsApp, this system can help you reach them.",
  },
  {
    q: "Do I need experience?",
    a: "No. The app guides you step by step.",
  },
  {
    q: "Is there a contract?",
    a: "No. Cancel anytime.",
  },
];

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      data-ocid={`pricing.faq.item.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors duration-200"
        aria-expanded={open}
        data-ocid={`pricing.faq.toggle.${index + 1}`}
      >
        <span className="text-sm font-semibold text-foreground">{faq.q}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-muted-foreground">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({
  plan,
  index,
  isYearly,
  isCurrentPlan,
  onCTA,
}: {
  plan: PricePlan;
  index: number;
  isYearly: boolean;
  isCurrentPlan: boolean;
  onCTA: () => void;
}) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={`relative flex flex-col rounded-2xl border p-6 ${
        plan.highlighted
          ? "border-primary shadow-elevated bg-card scale-[1.02] z-10"
          : "border-border bg-card"
      }`}
      data-ocid={`pricing.plan.${index + 1}`}
    >
      {/* Current plan badge */}
      {isCurrentPlan && (
        <div className="absolute -top-3.5 right-4 z-20">
          <span className="bg-primary/15 text-primary border border-primary/30 text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap">
            Current plan
          </span>
        </div>
      )}

      {/* Most businesses badge */}
      {plan.badge && !isCurrentPlan && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-success text-success-foreground text-[11px] font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 whitespace-nowrap">
            <Star className="w-2.5 h-2.5" />
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan icon */}
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mt-1">
        {plan.isFree ? (
          <Zap className="w-4 h-4 text-muted-foreground" />
        ) : plan.highlighted ? (
          <Sparkles className="w-4 h-4 text-primary" />
        ) : plan.isAgency ? (
          <Crown className="w-4 h-4 text-warning" />
        ) : (
          <Star className="w-4 h-4 text-primary" />
        )}
      </div>

      <h3 className="font-display font-bold text-lg text-foreground">
        {plan.name}
      </h3>

      {/* Price */}
      <div className="mt-2 mb-1 flex items-baseline gap-1">
        <span className="text-3xl font-bold text-foreground tabular-nums">
          {plan.isFree ? "₹0" : `₹${price.toLocaleString("en-IN")}`}
        </span>
        {!plan.isFree && (
          <span className="text-sm text-muted-foreground">/month</span>
        )}
      </div>
      {isYearly && !plan.isFree && (
        <p className="text-xs text-success font-semibold mb-3">
          Save{" "}
          {Math.round(
            ((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) * 100,
          )}
          %
        </p>
      )}

      {/* Features */}
      <ul className="space-y-2 flex-1 mt-4 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
            <span className="text-foreground">{f}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`w-full h-10 font-semibold ${
          plan.highlighted ? "btn-primary-glow" : ""
        } ${
          isCurrentPlan ? "opacity-60 cursor-default pointer-events-none" : ""
        }`}
        variant={
          isCurrentPlan ? "outline" : plan.highlighted ? "default" : "outline"
        }
        onClick={isCurrentPlan ? undefined : onCTA}
        disabled={isCurrentPlan}
        data-ocid={`pricing.plan.cta.${plan.id}`}
      >
        {isCurrentPlan ? "Current plan" : plan.cta}
      </Button>
    </motion.div>
  );
}

// ─── ROI Calculator ──────────────────────────────────────────────────────────

function ROICalculator() {
  const [servicePrice, setServicePrice] = useState(1000);
  const [extraCustomers, setExtraCustomers] = useState(10);
  const addedRevenue = servicePrice * extraCustomers;

  return (
    <div
      className="bg-card border border-border rounded-2xl p-6 max-w-xl mx-auto"
      data-ocid="pricing.roi.calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label
            htmlFor="service-price"
            className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide"
          >
            Your average service price (₹)
          </label>
          <input
            id="service-price"
            type="number"
            min={0}
            value={servicePrice}
            onChange={(e) =>
              setServicePrice(Math.max(0, Number(e.target.value)))
            }
            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary tabular-nums"
            data-ocid="pricing.roi.service_price.input"
          />
        </div>
        <div>
          <label
            htmlFor="extra-customers"
            className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide"
          >
            Extra customers per month
          </label>
          <input
            id="extra-customers"
            type="number"
            min={0}
            value={extraCustomers}
            onChange={(e) =>
              setExtraCustomers(Math.max(0, Number(e.target.value)))
            }
            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary tabular-nums"
            data-ocid="pricing.roi.extra_customers.input"
          />
        </div>
      </div>

      {/* Result */}
      <div className="rounded-xl bg-success/10 border border-success/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Added revenue</p>
          <p
            className="text-2xl font-bold text-success tabular-nums"
            data-ocid="pricing.roi.result"
          >
            ₹{addedRevenue.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="text-sm text-foreground">
          <p>
            Starter plan costs{" "}
            <span className="font-semibold text-primary">₹49</span>.
          </p>
          <p>
            Added revenue:{" "}
            <span className="font-semibold text-success">
              ₹{addedRevenue.toLocaleString("en-IN")}
            </span>
            .
          </p>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground mt-3">
        Estimates based on example inputs. Actual results depend on your
        location, offer, and follow-up.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();
  const { data: subStatus } = useSubscriptionStatus();
  const currentPlan = subStatus?.plan ?? "free";

  function handlePlanCTA(plan: PricePlan) {
    if (plan.isFree) {
      navigate({ to: "/login" });
    } else {
      navigate({
        to: "/checkout",
        search: { plan: plan.id, yearly: isYearly ? "1" : undefined } as Record<
          string,
          string
        >,
      });
    }
  }

  return (
    <>
      <MetaTags {...PAGE_META["/pricing"]} />
      <div className="min-h-screen bg-background" data-ocid="pricing.page">
        {/* ── Top Nav ──────────────────────────────────────────────── */}
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <span className="font-display font-bold text-lg text-foreground tracking-tight">
              GrowthOS
            </span>
            <Button
              size="sm"
              onClick={() => navigate({ to: "/login" })}
              className="btn-primary-glow"
              data-ocid="pricing.nav.start_free.button"
            >
              Start free
            </Button>
          </div>
        </header>

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="py-16 px-6 text-center bg-card border-b border-border">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-foreground leading-tight mb-4">
              Simple pricing. Built to get you more enquiries.
            </h1>
            <p className="text-base text-muted-foreground mb-8 max-w-xl mx-auto">
              Start free. Upgrade when you want faster results and less manual
              work.
            </p>
            <div className="flex items-center justify-center gap-3">
              <span
                className={`text-sm font-semibold ${
                  !isYearly ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Monthly
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isYearly}
                onClick={() => setIsYearly((p) => !p)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary ${
                  isYearly ? "bg-primary" : "bg-muted"
                }`}
                data-ocid="pricing.billing_toggle"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-card shadow-subtle transition-transform duration-200 ${
                    isYearly ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-semibold ${
                  isYearly ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                Yearly
              </span>
              <AnimatePresence>
                {isYearly && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-warning/15 text-warning"
                    data-ocid="pricing.yearly_savings_badge"
                  >
                    Save 20%
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* ── Pricing Cards ──────────────────────────────────────────────────── */}
        <section
          className="py-16 px-6 bg-background"
          data-ocid="pricing.plans.section"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start pt-4">
              {PLANS.map((plan, i) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  index={i}
                  isYearly={isYearly}
                  isCurrentPlan={currentPlan === plan.id}
                  onCTA={() => handlePlanCTA(plan)}
                />
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-6">
              No card required for the free plan. Cancel anytime.
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>
                Payments secured by{" "}
                <span className="font-semibold text-[#528FF0]">Razorpay</span>
              </span>
            </div>
          </div>
        </section>

        {/* ── Free vs Paid ────────────────────────────────────────────────── */}
        <section
          className="py-16 px-6 bg-muted/30 border-y border-border"
          data-ocid="pricing.comparison.section"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display font-bold text-2xl text-foreground text-center mb-10">
              What changes when you upgrade
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Free plan
                </p>
                <ul className="space-y-3">
                  {FREE_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <X className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-primary/40 bg-card p-6 shadow-glow-primary">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                  Paid plans
                </p>
                <ul className="space-y-3">
                  {PAID_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── ROI Section ────────────────────────────────────────────────── */}
        <section
          className="py-16 px-6 bg-background"
          data-ocid="pricing.roi.section"
        >
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="font-display font-bold text-2xl text-foreground mb-3">
              Even 1 new customer can cover your monthly plan.
            </h2>
            <p className="text-sm text-muted-foreground">
              Use the calculator below to see what a few extra bookings are
              worth to your business.
            </p>
          </div>
          <ROICalculator />
        </section>

        {/* ── Objection Handling ──────────────────────────────────────────────── */}
        <section
          className="py-16 px-6 bg-muted/30 border-y border-border"
          data-ocid="pricing.faq.section"
        >
          <div className="max-w-xl mx-auto">
            <h2 className="font-display font-bold text-2xl text-foreground text-center mb-8">
              Common questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <FAQItem key={faq.q} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────── */}
        <section
          className="py-20 px-6 bg-card text-center border-b border-border"
          data-ocid="pricing.final_cta.section"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="font-display font-bold text-3xl text-foreground mb-3">
              Start free. Upgrade when you're ready to scale.
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Join businesses using GrowthOS to run a repeatable process for
              getting enquiries.
            </p>
            <Button
              size="lg"
              className="btn-primary-glow px-10 h-12 text-base font-semibold"
              onClick={() =>
                navigate({
                  to: "/checkout",
                  search: { plan: "growth" } as Record<string, string>,
                })
              }
              data-ocid="pricing.final_cta.start_free.primary_button"
            >
              Get started
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              No card required for the free plan
            </p>
          </motion.div>
        </section>

        {/* ── Footer Disclaimer ──────────────────────────────────────────────── */}
        <footer className="py-8 px-6 bg-muted/40 text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            Logos shown for identification only. No official partnership is
            claimed.
          </p>
          <p className="text-xs text-muted-foreground">
            Results depend on your location, offer, and follow-up.
          </p>
          <p className="text-xs text-muted-foreground">
            Cancel anytime. No contracts.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
