import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Clock,
  MessageSquare,
  Search,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Inline SVG Mockup — Leads List UI ───────────────────────────────────────
function LeadsMockup() {
  const leads = [
    { name: "Priya Sharma", loc: "Andheri", score: 92, status: "Hot" },
    { name: "Style Zone Salon", loc: "Bandra", score: 87, status: "New" },
    { name: "Elegance Studio", loc: "Powai", score: 81, status: "New" },
    { name: "Radiance Beauty", loc: "Malad", score: 76, status: "Warm" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden text-sm w-full">
      {/* Window chrome */}
      <div className="bg-muted/60 border-b border-border px-4 py-2.5 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-destructive/50" />
        <div className="w-3 h-3 rounded-full bg-warning/50" />
        <div className="w-3 h-3 rounded-full bg-success/50" />
        <span className="ml-2 text-xs text-muted-foreground font-medium">
          GrowthOS — Leads
        </span>
      </div>
      {/* Header row */}
      <div className="grid grid-cols-12 px-4 py-2 bg-muted/30 text-xs text-muted-foreground font-semibold uppercase tracking-wide border-b border-border">
        <span className="col-span-5">Business</span>
        <span className="col-span-3">Location</span>
        <span className="col-span-2 text-right">Score</span>
        <span className="col-span-2 text-right">Status</span>
      </div>
      {/* Rows */}
      {leads.map((l, i) => (
        <div
          key={l.name}
          className={`grid grid-cols-12 px-4 py-3 items-center border-b border-border/50 last:border-0 ${i === 0 ? "bg-primary/5" : "bg-card"}`}
        >
          <div className="col-span-5 flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-primary">
                {l.name[0]}
              </span>
            </div>
            <span className="text-foreground font-medium truncate text-xs">
              {l.name}
            </span>
          </div>
          <span className="col-span-3 text-muted-foreground text-xs">
            {l.loc}
          </span>
          <span className="col-span-2 text-right font-bold text-foreground text-xs">
            {l.score}
          </span>
          <div className="col-span-2 flex justify-end">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                l.status === "Hot"
                  ? "bg-destructive/10 text-destructive"
                  : l.status === "Warm"
                    ? "bg-warning/10 text-warning"
                    : "bg-success/10 text-success"
              }`}
            >
              {l.status}
            </span>
          </div>
        </div>
      ))}
      {/* CTA button */}
      <div className="px-4 py-3 bg-muted/20 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          4 leads ready today
        </span>
        <button
          type="button"
          className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm"
        >
          <Zap className="w-3.5 h-3.5" />
          Get Clients Now
        </button>
      </div>
    </div>
  );
}

// ─── Inbox Mockup ─────────────────────────────────────────────────────────────
function InboxMockup() {
  const threads = [
    {
      name: "Priya Sharma",
      msg: "Hi, interested in your pricing",
      time: "2m ago",
      status: "replied",
      unread: true,
    },
    {
      name: "Style Zone",
      msg: "Can we schedule a call?",
      time: "15m ago",
      status: "pending",
      unread: false,
    },
    {
      name: "Elegance Studio",
      msg: "Thanks for the follow-up",
      time: "1h ago",
      status: "booked",
      unread: false,
    },
    {
      name: "Radiance Beauty",
      msg: "Sent follow-up message",
      time: "3h ago",
      status: "sent",
      unread: false,
    },
  ];
  return (
    <div className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden text-sm w-full">
      <div className="bg-muted/60 border-b border-border px-4 py-2.5 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-destructive/50" />
        <div className="w-3 h-3 rounded-full bg-warning/50" />
        <div className="w-3 h-3 rounded-full bg-success/50" />
        <span className="ml-2 text-xs text-muted-foreground font-medium">
          GrowthOS — Inbox
        </span>
      </div>
      <div className="divide-y divide-border/50">
        {threads.map((t) => (
          <div
            key={t.name}
            className={`flex items-start gap-3 px-4 py-3 ${t.unread ? "bg-primary/5" : "bg-card"}`}
          >
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[11px] font-bold text-primary">
                {t.name[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-semibold ${t.unread ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {t.name}
                </span>
                <span className="text-[10px] text-muted-foreground shrink-0">
                  {t.time}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                {t.msg}
              </p>
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${
                t.status === "booked"
                  ? "bg-success/10 text-success"
                  : t.status === "replied"
                    ? "bg-primary/10 text-primary"
                    : t.status === "pending"
                      ? "bg-warning/10 text-warning"
                      : "bg-muted text-muted-foreground"
              }`}
            >
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/60 rounded-xl overflow-hidden bg-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        data-ocid={`salon_mumbai.faq_item.${index}`}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
      >
        <span className="text-sm font-semibold text-foreground">{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SalonMumbaiPage() {
  useMetaTags(PAGE_META["/salon-mumbai"]);
  const navigate = useNavigate();
  const goLogin = () => navigate({ to: "/login" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [urlInput, setUrlInput] = useState("");

  const problemCards = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Irregular walk-ins",
      desc: "You can't predict daily footfall. Slots stay empty while costs keep running.",
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "Not showing in 'near me' searches",
      desc: "Customers searching online find your competitors first.",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "No follow-up system",
      desc: "Warm enquiries go cold because there's no process to follow up.",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "No tracking of results",
      desc: "You don't know which actions are bringing in customers.",
    },
  ];

  const steps = [
    {
      num: "01",
      icon: <Users className="w-6 h-6" />,
      title: "Get local prospects",
      desc: "Find businesses in your area that are actively searching for services.",
    },
    {
      num: "02",
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Send messages properly",
      desc: "Use structured templates that get replies instead of being ignored.",
    },
    {
      num: "03",
      icon: <Clock className="w-6 h-6" />,
      title: "Follow up",
      desc: "Most bookings close on the second or third touch. Reminders make it easy.",
    },
    {
      num: "04",
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Convert to bookings",
      desc: "Track each conversation from first contact to confirmed booking.",
    },
  ];

  const faqs = [
    {
      q: "Will this work for my business?",
      a: "If your customers search online or use WhatsApp, this system can help you reach them. Results depend on your location, offer, and follow-up speed.",
    },
    {
      q: "Do I need marketing experience?",
      a: "No. The app guides you through each step with simple tasks and templates. No technical knowledge required.",
    },
    {
      q: "How soon can I start?",
      a: "You can start the same day. Sign up, set your niche and city, and your first leads will be ready to contact.",
    },
    {
      q: "What if I don't have a website?",
      a: "You don't need a website. Many businesses use just WhatsApp and Google to get enquiries. The app works with both.",
    },
  ];

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "/mo",
      features: ["10 leads/day", "Manual outreach", "Basic tracking"],
      cta: "Start free",
      highlight: false,
    },
    {
      name: "Growth",
      price: "₹299",
      period: "/mo",
      features: [
        "150 leads/day",
        "Follow-up reminders",
        "Simple tracking",
        "CRM pipeline",
      ],
      cta: "Get Growth Plan",
      highlight: true,
    },
    {
      name: "Pro",
      price: "₹999",
      period: "/mo",
      features: ["Higher limits", "Proposals + reporting", "Campaign tools"],
      cta: "Go Pro",
      highlight: false,
    },
  ];

  const sampleIssues = [
    {
      icon: <AlertCircle className="w-4 h-4 text-destructive" />,
      label: "Slow load → visitors leave",
      severity: "high",
    },
    {
      icon: <AlertCircle className="w-4 h-4 text-warning" />,
      label: "No clear CTA → no enquiries",
      severity: "medium",
    },
    {
      icon: <AlertCircle className="w-4 h-4 text-warning" />,
      label: "Weak SEO → low visibility",
      severity: "medium",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 md:pb-0">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 h-16 bg-background border-b border-border flex items-center"
        data-ocid="salon_mumbai.navbar"
      >
        <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="font-bold text-xl text-primary hover:opacity-80 transition-opacity"
            data-ocid="salon_mumbai.logo_button"
          >
            GrowthOS
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "How it works", id: "solution" },
              { label: "Pricing", id: "pricing" },
              { label: "Case examples", id: "case-examples" },
            ].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-ocid={`salon_mumbai.nav_${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={goLogin}
              data-ocid="salon_mumbai.nav_audit_button"
            >
              Get Free Audit
            </Button>
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="bg-background py-16 md:py-24"
        data-ocid="salon_mumbai.hero_section"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* Left 7 cols */}
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
                Get more salon enquiries
                <span className="text-primary"> in Mumbai</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mt-4 leading-relaxed">
                Simple system to find prospects, contact them, and turn replies
                into bookings.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Local leads in your area",
                  "Structured messages + follow-ups",
                  "Track enquiries → bookings",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm md:text-base text-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button
                  size="lg"
                  className="h-11 px-8 font-semibold"
                  onClick={goLogin}
                  data-ocid="salon_mumbai.hero_primary_button"
                >
                  Get Free Audit
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 px-8"
                  onClick={() => scrollTo("solution")}
                  data-ocid="salon_mumbai.hero_secondary_button"
                >
                  See how it works
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Works with standard tools used by businesses
              </p>
            </motion.div>

            {/* Right 5 cols — leads mockup */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <LeadsMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Problem Strip ──────────────────────────────────────────────────── */}
      <section
        id="problems"
        className="bg-muted/40 py-16"
        data-ocid="salon_mumbai.problems_section"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10"
          >
            Sound familiar?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {problemCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`salon_mumbai.problem_card.${i + 1}`}
              >
                <Card className="bg-card border border-border rounded-xl h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {card.icon}
                    </div>
                    <p className="font-semibold text-foreground mb-1.5">
                      {card.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{card.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-muted-foreground italic mt-8 text-sm">
            This leads to missed enquiries every day.
          </p>
        </div>
      </section>

      {/* ── Solution Flow ──────────────────────────────────────────────────── */}
      <section
        id="solution"
        className="bg-background py-18 md:py-24"
        data-ocid="salon_mumbai.solution_section"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              A simple <span className="text-primary">4-step system</span>
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Repeatable. No guesswork. Works from day one.
            </p>
          </motion.div>

          {/* Desktop horizontal steps */}
          <div className="hidden md:grid grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative flex flex-col items-center text-center px-4"
              >
                {i < steps.length - 1 && (
                  <div
                    className="absolute top-6 left-1/2 w-full h-0.5 bg-border"
                    style={{ left: "50%" }}
                  />
                )}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center z-10"
                  data-ocid={`salon_mumbai.step.${i + 1}`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary mb-4 bg-background relative z-10">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-primary mb-1">
                    {step.num}
                  </span>
                  <p className="font-semibold text-foreground mb-1.5">
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Mobile vertical steps */}
          <div className="md:hidden space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 items-start"
                data-ocid={`salon_mumbai.step_mobile.${i + 1}`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="text-sm font-bold text-primary">
                    {step.num}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{step.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button
              size="lg"
              onClick={goLogin}
              data-ocid="salon_mumbai.solution_cta_button"
            >
              Start with 20 leads
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── Live Product Section ───────────────────────────────────────────── */}
      <section
        className="bg-muted/30 py-18 md:py-24"
        data-ocid="salon_mumbai.product_section"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <InboxMockup />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Do the work in minutes, not hours
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                Contact leads, track replies, and move conversations to
                bookings. Everything from one place — no spreadsheets, no
                switching apps.
              </p>
              <Button
                size="lg"
                onClick={goLogin}
                data-ocid="salon_mumbai.product_try_button"
              >
                Try it free
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Website Health Hook ─────────────────────────────────────────────── */}
      <section
        id="health"
        className="bg-background py-18 md:py-24"
        data-ocid="salon_mumbai.health_section"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-card border shadow-sm rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-foreground mb-1">
                  See how your website is performing
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter any URL and get a quick health scan.
                </p>

                {/* URL input + scan */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <input
                    type="url"
                    placeholder="https://yoursalon.in"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    data-ocid="salon_mumbai.health_url_input"
                    className="flex-1 h-11 px-4 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  <Button
                    size="lg"
                    className="h-11 shrink-0"
                    onClick={goLogin}
                    data-ocid="salon_mumbai.health_scan_button"
                  >
                    Scan my website
                  </Button>
                </div>

                {/* Sample score */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  {/* Circular arc meter */}
                  <div className="relative w-24 h-24 shrink-0">
                    <svg
                      width="96"
                      height="96"
                      viewBox="0 0 96 96"
                      className="rotate-[-90deg]"
                      aria-hidden="true"
                    >
                      <circle
                        cx="48"
                        cy="48"
                        r="38"
                        fill="none"
                        stroke="oklch(var(--border))"
                        strokeWidth="8"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="38"
                        fill="none"
                        stroke="oklch(var(--success))"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 38}`}
                        strokeDashoffset={`${2 * Math.PI * 38 * (1 - 0.72)}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-foreground leading-none">
                        72
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        /100
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground mb-3">
                      Sample issues found:
                    </p>
                    <div className="space-y-2">
                      {sampleIssues.map((issue) => (
                        <div
                          key={issue.label}
                          className="flex items-center gap-2.5"
                        >
                          {issue.icon}
                          <span className="text-sm text-foreground">
                            {issue.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full h-11"
                  onClick={goLogin}
                  data-ocid="salon_mumbai.health_run_scan_button"
                >
                  Run free scan
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  * Sample score for illustration. Enter your URL for a real
                  scan.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ── Case Examples ─────────────────────────────────────────────────── */}
      <section
        id="case-examples"
        className="bg-muted/40 py-18 md:py-24"
        data-ocid="salon_mumbai.case_examples_section"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Real examples
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              What happened when businesses started using a structured system.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                badge: "Salon, Mumbai",
                before: "Irregular walk-ins and unpredictable bookings",
                after:
                  "Consistent inbound enquiries after setting up local SEO and a follow-up sequence",
              },
              {
                badge: "Gym, Pune",
                before: "Low trial sign-ups, relying on referrals only",
                after:
                  "Steady local enquiries using a simple ad + reply system",
              },
            ].map((c, i) => (
              <motion.div
                key={c.badge}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`salon_mumbai.case_example.${i + 1}`}
              >
                <Card className="rounded-2xl border bg-card shadow-sm h-full">
                  <CardContent className="p-6">
                    <Badge
                      variant="outline"
                      className="mb-4 bg-primary/8 text-primary border-primary/20 text-xs font-semibold"
                    >
                      {c.badge}
                    </Badge>
                    <div className="space-y-4">
                      <div className="bg-destructive/5 border border-destructive/10 rounded-xl p-4">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-destructive/70 mb-1.5">
                          Before
                        </p>
                        <p className="text-sm text-foreground">{c.before}</p>
                      </div>
                      <div className="bg-success/5 border border-success/15 rounded-xl p-4">
                        <p className="text-[11px] font-bold uppercase tracking-wide text-success mb-1.5">
                          After
                        </p>
                        <p className="text-sm text-foreground">{c.after}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section
        id="pricing"
        className="bg-background py-18 md:py-24"
        data-ocid="salon_mumbai.pricing_section"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Simple pricing. No hidden fees.
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Start free. Upgrade when you want faster results.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={plan.highlight ? "md:-mt-4 md:mb-4" : ""}
                data-ocid={`salon_mumbai.pricing_plan.${i + 1}`}
              >
                <Card
                  className={`h-full relative border ${plan.highlight ? "border-primary ring-2 ring-primary shadow-lg scale-105" : "border-border"}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 text-xs font-semibold">
                        Most popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold text-muted-foreground mb-1">
                      {plan.name}
                    </p>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.highlight ? "default" : "outline"}
                      onClick={goLogin}
                      data-ocid={`salon_mumbai.plan_cta.${i + 1}`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Even a few extra customers can cover your monthly plan cost.
          </p>
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              onClick={goLogin}
              data-ocid="salon_mumbai.pricing_start_free_button"
            >
              Start free
            </Button>
          </div>
        </div>
      </section>

      {/* ── Lead Form ─────────────────────────────────────────────────────── */}
      <section
        id="form"
        className="bg-muted/40 py-18 md:py-24"
        data-ocid="salon_mumbai.form_section"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-lg mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Get your free growth plan
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Tell us a bit about your business. We'll respond within a few
                hours.
              </p>
            </motion.div>
            <Card className="bg-card border border-border shadow-sm">
              <CardContent className="p-6 space-y-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    goLogin();
                  }}
                >
                  {/* Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="sm-name"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="sm-name"
                      type="text"
                      placeholder="Your name"
                      data-ocid="salon_mumbai.name_input"
                      className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  {/* Phone */}
                  <div className="mb-4">
                    <label
                      htmlFor="sm-phone"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Phone *
                    </label>
                    <input
                      id="sm-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      data-ocid="salon_mumbai.phone_input"
                      className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  {/* Business type */}
                  <div className="mb-4">
                    <label
                      htmlFor="sm-btype"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Business type
                    </label>
                    <select
                      id="sm-btype"
                      data-ocid="salon_mumbai.business_type_select"
                      className="w-full h-11 px-3 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    >
                      <option value="salon">Salon</option>
                      <option value="gym">Gym</option>
                      <option value="clinic">Clinic</option>
                      <option value="realestate">Real Estate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {/* City — pre-filled read-only */}
                  <div className="mb-6">
                    <label
                      htmlFor="sm-city"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      City
                    </label>
                    <input
                      id="sm-city"
                      type="text"
                      defaultValue="Mumbai"
                      readOnly
                      data-ocid="salon_mumbai.city_input"
                      className="w-full h-11 px-3 rounded-xl border border-input bg-muted/30 text-sm text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-11 font-semibold"
                    data-ocid="salon_mumbai.form_submit_button"
                  >
                    Get Free Growth Plan
                  </Button>
                </form>

                {/* WhatsApp CTA */}
                <button
                  type="button"
                  onClick={goLogin}
                  data-ocid="salon_mumbai.whatsapp_cta_button"
                  className="w-full h-11 flex items-center justify-center gap-2.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/8 text-sm font-semibold text-foreground hover:bg-[#25D366]/15 transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#25D366"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </button>

                <p className="text-xs text-center text-muted-foreground pt-1">
                  For help, call Anees Chaudhary:{" "}
                  <a
                    href="tel:+919324073833"
                    className="text-primary hover:underline"
                  >
                    +91 9324073833
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="bg-background py-18 md:py-24"
        data-ocid="salon_mumbai.faq_section"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10"
          >
            Common questions
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section
        className="bg-primary text-primary-foreground py-18 md:py-24"
        data-ocid="salon_mumbai.final_cta_section"
      >
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stop guessing. Start getting enquiries.
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-base">
              Start free. No card required. Works from day one.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-10 font-semibold text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={goLogin}
              data-ocid="salon_mumbai.final_cta_button"
            >
              Start free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="bg-card border-t border-border py-10"
        data-ocid="salon_mumbai.footer"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <p className="font-bold text-lg text-foreground">GrowthOS</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Helping local businesses get more enquiries.
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Need help?</p>
              <a
                href="tel:+919324073833"
                className="text-primary font-semibold hover:underline"
                data-ocid="salon_mumbai.footer_contact_link"
              >
                Call Anees Chaudhary: +91 9324073833
              </a>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-5">
            <button
              type="button"
              onClick={goLogin}
              className="hover:text-foreground transition-colors"
            >
              Privacy policy
            </button>
            <button
              type="button"
              onClick={goLogin}
              className="hover:text-foreground transition-colors"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={goLogin}
              className="hover:text-foreground transition-colors"
            >
              Contact
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            Results depend on execution, location, and offer. No guarantees are
            made. Platform integrations shown are not official partnerships.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GrowthOS. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "growthos")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* ── Mobile sticky CTA ─────────────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border p-3 md:hidden"
        data-ocid="salon_mumbai.sticky_cta"
      >
        <Button
          className="w-full h-11 font-semibold"
          onClick={goLogin}
          data-ocid="salon_mumbai.sticky_cta_button"
        >
          Get Free Audit
        </Button>
      </div>
    </div>
  );
}
