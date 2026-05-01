import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Eye,
  Globe,
  Monitor,
  Save,
  Smartphone,
  Sparkles,
  Trash2,
  TrendingUp,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useClients,
  useSaveWebsiteTemplate,
  useWebsiteTemplate,
} from "../hooks/useClients";

// ── Types ────────────────────────────────────────────────────────────────────

type SectionKey = "hero" | "features" | "testimonials" | "cta" | "footer";

interface SectionContent {
  headline: string;
  subheadline: string;
  body: string;
}

type Sections = Record<SectionKey, SectionContent>;

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  accentFrom: string;
  accentTo: string;
  icon: string;
}

type PageTab = "templates" | "ai-generator";

type Niche =
  | "salon"
  | "gym"
  | "medical"
  | "cafe"
  | "plumber"
  | "real_estate"
  | "education"
  | "agency"
  | "other";

type Budget = "under_5k" | "5k_20k" | "20k_50k" | "50k_plus";

interface GeneratorForm {
  niche: Niche | "";
  city: string;
  serviceDesc: string;
  budget: Budget | "";
}

interface SavedPage {
  id: string;
  title: string;
  niche: string;
  city: string;
  status: "Draft" | "Published";
  leads: number;
  createdAt: string;
}

interface AuditFormData {
  businessName: string;
  phone: string;
  email: string;
  city: string;
  consent: boolean;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const TEMPLATES: Template[] = [
  {
    id: "agency",
    name: "Agency Pro",
    description:
      "Clean, conversion-focused layout for digital service agencies",
    category: "Agency",
    accentFrom: "oklch(0.53 0.22 253)",
    accentTo: "oklch(0.52 0.26 293)",
    icon: "🚀",
  },
  {
    id: "saas",
    name: "SaaS Launch",
    description: "Feature-rich SaaS product landing with pricing tables",
    category: "SaaS",
    accentFrom: "oklch(0.63 0.17 215)",
    accentTo: "oklch(0.53 0.22 253)",
    icon: "⚡",
  },
  {
    id: "ecommerce",
    name: "Shop Front",
    description: "Product showcase with cart integration support",
    category: "E-commerce",
    accentFrom: "oklch(0.68 0.22 86)",
    accentTo: "oklch(0.62 0.23 25)",
    icon: "🛍️",
  },
  {
    id: "portfolio",
    name: "Creative Portfolio",
    description: "Visual-first layout for creative professionals",
    category: "Portfolio",
    accentFrom: "oklch(0.64 0.18 170)",
    accentTo: "oklch(0.63 0.17 215)",
    icon: "🎨",
  },
  {
    id: "blog",
    name: "Content Hub",
    description: "Article-focused layout with newsletter capture",
    category: "Blog",
    accentFrom: "oklch(0.68 0.22 42)",
    accentTo: "oklch(0.59 0.25 0)",
    icon: "✍️",
  },
  {
    id: "service",
    name: "Local Service",
    description: "Trust-building layout for local service businesses",
    category: "Service",
    accentFrom: "oklch(0.64 0.15 192)",
    accentTo: "oklch(0.53 0.22 253)",
    icon: "🏠",
  },
];

const SECTION_LABELS: Record<SectionKey, string> = {
  hero: "Hero",
  features: "Features",
  testimonials: "Testimonials",
  cta: "Call to Action",
  footer: "Footer",
};

const SECTION_ORDER: SectionKey[] = [
  "hero",
  "features",
  "testimonials",
  "cta",
  "footer",
];

const NICHE_LABELS: Record<Niche, string> = {
  salon: "Salon & Beauty",
  gym: "Gym & Fitness",
  medical: "Medical & Healthcare",
  cafe: "Cafe & Restaurant",
  plumber: "Plumber & Home Services",
  real_estate: "Real Estate",
  education: "Education & Coaching",
  agency: "Agency & Marketing",
  other: "Other",
};

const BUDGET_LABELS: Record<Budget, string> = {
  under_5k: "Under ₹5,000/month",
  "5k_20k": "₹5,000–₹20,000/month",
  "20k_50k": "₹20,000–₹50,000/month",
  "50k_plus": "₹50,000+/month",
};

const PAIN_POINTS: Record<Niche | "other", string[]> = {
  salon: [
    "Losing clients to competitors with better Google rankings",
    "No consistent new walk-ins from online search",
    "Spending on ads with zero measurable ROI",
  ],
  gym: [
    "Membership signups flatlined despite heavy social media posts",
    "No system to capture leads from Google 'gym near me' searches",
    "Ad spend increasing but revenue growth stagnant",
  ],
  medical: [
    "Patients choosing competitors who appear first on Google",
    "No online appointment booking capturing after-hours visitors",
    "Poor review presence losing trust-sensitive patients",
  ],
  cafe: [
    "Weekend foot traffic inconsistent despite local community",
    "Missing customers searching 'best cafe in [city]'",
    "No loyalty system to bring regulars back more often",
  ],
  plumber: [
    "Missing emergency calls because you're not ranking on Google",
    "Competitors dominating 'plumber near me' searches",
    "No way to capture leads when you're too busy to answer calls",
  ],
  real_estate: [
    "Listings not getting enough qualified leads from digital channels",
    "Competitors dominating local property search results",
    "No automated follow-up system for inquiry leads",
  ],
  education: [
    "Student enrollment plateaued without a predictable lead flow",
    "Parents choosing competitors they find online first",
    "No automated nurture system for interested prospects",
  ],
  agency: [
    "Client pipeline dries up when busy delivering for current clients",
    "No system for consistent inbound leads without cold outreach",
    "Struggling to stand out in a crowded digital agency market",
  ],
  other: [
    "Inconsistent lead flow with no predictable revenue",
    "Not ranking for key local searches in your city",
    "Spending on marketing without measurable ROI",
  ],
};

const MOCK_SAVED_PAGES: SavedPage[] = [
  {
    id: "page-1",
    title: "Digital Marketing for Salons in Mumbai",
    niche: "Salon & Beauty",
    city: "Mumbai",
    status: "Published",
    leads: 12,
    createdAt: "Apr 22, 2026",
  },
  {
    id: "page-2",
    title: "Fitness Growth for Gyms in Delhi",
    niche: "Gym & Fitness",
    city: "Delhi",
    status: "Published",
    leads: 8,
    createdAt: "Apr 25, 2026",
  },
  {
    id: "page-3",
    title: "Healthcare Marketing for Clinics in Chennai",
    niche: "Medical & Healthcare",
    city: "Chennai",
    status: "Draft",
    leads: 0,
    createdAt: "Apr 28, 2026",
  },
];

function defaultSections(templateId: string): Sections {
  const t = TEMPLATES.find((x) => x.id === templateId);
  const name = t?.name ?? "Agency";
  return {
    hero: {
      headline: `Grow Your Business with ${name}`,
      subheadline: "Data-driven digital marketing that delivers real results",
      body: "We help ambitious businesses scale their online presence through SEO, paid ads, and conversion-optimised websites. Get a free strategy session today.",
    },
    features: {
      headline: "Everything You Need to Dominate Online",
      subheadline: "A full-stack growth system, under one roof",
      body: "SEO Optimisation — Rank higher and drive organic traffic\nGoogle & Meta Ads — Paid campaigns that convert\nWebsite Development — High-performance, mobile-first sites\nMonthly Reporting — Transparent results, every time",
    },
    testimonials: {
      headline: "Trusted by Growing Businesses",
      subheadline: "Real results from real clients",
      body: '"Our traffic tripled in 3 months — absolutely incredible." — Sarah M., Pinnacle Law\n"Best marketing investment we\'ve ever made." — Tom K., Metro Auto\n"Finally an agency that actually delivers on its promises." — Riya P., Horizon Bakery',
    },
    cta: {
      headline: "Ready to Scale Your Business?",
      subheadline: "Book a free 30-minute strategy call",
      body: "No commitment. No fluff. Just a candid conversation about your growth goals and a custom roadmap to hit them.",
    },
    footer: {
      headline: "Let's Build Something Great",
      subheadline: "hello@agency.com  ·  (555) 000-0000  ·  Austin, TX",
      body: "© 2026 Agency Pro. All rights reserved.",
    },
  };
}

// ── Section Preview ───────────────────────────────────────────────────────────

function SectionPreview({
  sectionKey,
  content,
  template,
  isMobile,
}: {
  sectionKey: SectionKey;
  content: SectionContent;
  template: Template;
  isMobile: boolean;
}) {
  const grad = `linear-gradient(135deg, ${template.accentFrom}22, ${template.accentTo}22)`;

  if (sectionKey === "hero") {
    return (
      <div
        className="rounded-xl overflow-hidden border border-border/40"
        style={{ background: grad }}
      >
        <div className={`p-8 ${isMobile ? "p-4" : ""} text-center`}>
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold mb-4"
            style={{
              background: `${template.accentFrom}33`,
              color: template.accentFrom,
            }}
          >
            {template.icon} {template.category}
          </div>
          <h1
            className={`font-display font-bold text-foreground mb-3 ${isMobile ? "text-2xl" : "text-4xl"}`}
          >
            {content.headline}
          </h1>
          <p
            className={`text-muted-foreground mb-6 ${isMobile ? "text-sm" : "text-lg"}`}
          >
            {content.subheadline}
          </p>
          <p
            className={`text-foreground/70 mb-8 max-w-xl mx-auto ${isMobile ? "text-xs" : "text-sm"}`}
          >
            {content.body}
          </p>
          <div
            className={`flex gap-3 justify-center ${isMobile ? "flex-col items-center" : ""}`}
          >
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white"
              style={{ background: template.accentFrom }}
            >
              Get Started Free
            </button>
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-border text-foreground bg-background/50"
            >
              See Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (sectionKey === "features") {
    const items = content.body.split("\n").filter(Boolean);
    return (
      <div className="rounded-xl border border-border/40 bg-card p-6">
        <div className="text-center mb-6">
          <h2
            className={`font-display font-bold text-foreground mb-1 ${isMobile ? "text-xl" : "text-2xl"}`}
          >
            {content.headline}
          </h2>
          <p className="text-sm text-muted-foreground">{content.subheadline}</p>
        </div>
        <div
          className={`grid gap-3 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}
        >
          {items.map((item, i) => {
            const [label, desc] = item.split(" — ");
            return (
              <div
                key={label ?? i}
                className="flex items-start gap-3 p-3 rounded-lg border border-border/40"
                style={{ background: grad }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: template.accentFrom }}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {label}
                  </p>
                  {desc && (
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (sectionKey === "testimonials") {
    const quotes = content.body.split("\n").filter(Boolean);
    return (
      <div className="rounded-xl border border-border/40 bg-muted/30 p-6">
        <div className="text-center mb-5">
          <h2
            className={`font-display font-bold text-foreground mb-1 ${isMobile ? "text-xl" : "text-2xl"}`}
          >
            {content.headline}
          </h2>
          <p className="text-sm text-muted-foreground">{content.subheadline}</p>
        </div>
        <div className="space-y-3">
          {quotes.map((q, i) => {
            const clean = q.replace(/^"/, "").replace(/"$/, "");
            const [text, author] = clean.includes(" — ")
              ? clean.split(" — ")
              : [clean, ""];
            return (
              <div
                key={author ?? `q-${i}`}
                className="bg-card rounded-lg p-4 border border-border/40"
              >
                <p className="text-sm text-foreground italic mb-2">"{text}"</p>
                {author && (
                  <p className="text-xs text-muted-foreground font-semibold">
                    — {author}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (sectionKey === "cta") {
    return (
      <div
        className="rounded-xl overflow-hidden p-8 text-center"
        style={{
          background: `linear-gradient(135deg, ${template.accentFrom}, ${template.accentTo})`,
        }}
      >
        <h2
          className={`font-display font-bold text-white mb-2 ${isMobile ? "text-xl" : "text-3xl"}`}
        >
          {content.headline}
        </h2>
        <p className="text-white/80 text-sm mb-2">{content.subheadline}</p>
        <p className="text-white/70 text-xs mb-6 max-w-sm mx-auto">
          {content.body}
        </p>
        <button
          type="button"
          className="px-7 py-3 rounded-lg text-sm font-bold bg-white"
          style={{ color: template.accentFrom }}
        >
          Book Free Strategy Call
        </button>
      </div>
    );
  }

  // footer
  return (
    <div className="rounded-xl border border-border/40 bg-card px-6 py-5">
      <div
        className={`flex ${isMobile ? "flex-col gap-3" : "items-center justify-between"}`}
      >
        <div>
          <p className="text-sm font-bold text-foreground">
            {content.headline}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {content.subheadline}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">{content.body}</p>
      </div>
    </div>
  );
}

// ── Template Card ─────────────────────────────────────────────────────────────

function TemplateCard({
  template,
  onSelect,
}: {
  template: Template;
  onSelect: (t: Template) => void;
}) {
  return (
    <div
      data-ocid={`website_builder.template_card.${template.id}`}
      className="group flex flex-col rounded-xl border border-border/60 bg-card overflow-hidden hover:border-primary/60 hover:shadow-elevated transition-smooth"
    >
      {/* Thumbnail */}
      <div
        className="h-36 flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${template.accentFrom} / 0.13, ${template.accentTo} / 0.27)`,
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, color-mix(in oklch, ${template.accentFrom} 27%, transparent) 24px, color-mix(in oklch, ${template.accentFrom} 27%, transparent) 25px), repeating-linear-gradient(90deg, transparent, transparent 24px, color-mix(in oklch, ${template.accentFrom} 27%, transparent) 24px, color-mix(in oklch, ${template.accentFrom} 27%, transparent) 25px)`,
          }}
        />
        {/* Mock browser chrome */}
        <div className="w-4/5 rounded-lg overflow-hidden shadow-elevated border border-border/30 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border/30 bg-card/80">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: template.accentFrom }}
            />
            <span
              className="w-2 h-2 rounded-full opacity-40"
              style={{ background: template.accentFrom }}
            />
            <span
              className="w-2 h-2 rounded-full opacity-20"
              style={{ background: template.accentFrom }}
            />
            <div className="flex-1 mx-1 h-1.5 rounded-full bg-border/40" />
          </div>
          <div className="p-2 space-y-1">
            <div
              className="h-2 rounded w-3/4"
              style={{ background: template.accentFrom, opacity: 0.33 }}
            />
            <div className="h-1.5 rounded w-full bg-border/30" />
            <div className="h-1.5 rounded w-5/6 bg-border/20" />
            <div className="flex gap-1 mt-1.5">
              <div
                className="h-4 rounded flex-1"
                style={{ background: template.accentFrom, opacity: 0.53 }}
              />
              <div className="h-4 rounded w-12 bg-border/30" />
            </div>
          </div>
        </div>
        <div
          className="absolute top-2 right-2 text-2xl"
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}
        >
          {template.icon}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-foreground leading-tight">
            {template.name}
          </p>
          <Badge variant="secondary" className="text-xs shrink-0">
            {template.category}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground flex-1 leading-relaxed">
          {template.description}
        </p>
        <Button
          size="sm"
          className="w-full mt-1 gap-1.5 group-hover:gap-2 transition-smooth"
          data-ocid={`website_builder.use_template.${template.id}`}
          onClick={() => onSelect(template)}
        >
          Use Template <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ── AI Generator Tab ──────────────────────────────────────────────────────────

function getNicheLabel(niche: Niche | ""): string {
  if (!niche) return "Business";
  return NICHE_LABELS[niche] ?? "Business";
}

function AIGeneratorTab() {
  const [form, setForm] = useState<GeneratorForm>({
    niche: "",
    city: "",
    serviceDesc: "",
    budget: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [savedPages, setSavedPages] = useState<SavedPage[]>(MOCK_SAVED_PAGES);
  const [auditForm, setAuditForm] = useState<AuditFormData>({
    businessName: "",
    phone: "",
    email: "",
    city: "",
    consent: false,
  });
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  const nicheLabel = getNicheLabel(form.niche);
  const painPoints = useMemo(
    () => PAIN_POINTS[form.niche || "other"],
    [form.niche],
  );

  function handleGenerate() {
    if (!form.niche || !form.city) {
      toast.error("Please select a niche and enter a city.");
      return;
    }
    setIsGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      toast.success("Landing page generated!");
    }, 1600);
  }

  function handlePublish(id: string) {
    setSavedPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Published" } : p)),
    );
    toast.success("Page published successfully!");
  }

  function handleDelete(id: string) {
    setSavedPages((prev) => prev.filter((p) => p.id !== id));
    toast.success("Page deleted.");
  }

  function handleSaveGenerated() {
    if (!generated) return;
    const newPage: SavedPage = {
      id: `page-${Date.now()}`,
      title: `${nicheLabel} Growth in ${form.city || "Your City"}`,
      niche: nicheLabel,
      city: form.city || "Your City",
      status: "Draft",
      leads: 0,
      createdAt: new Date().toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setSavedPages((prev) => [newPage, ...prev]);
    toast.success("Page saved to your library!");
  }

  function handleAuditSubmit() {
    if (!auditForm.businessName || !auditForm.phone || !auditForm.email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!auditForm.consent) {
      toast.error("Please agree to be contacted to proceed.");
      return;
    }
    setAuditSubmitted(true);
    toast.success("Your free growth plan request has been submitted!");
  }

  return (
    <div data-ocid="ai_generator.tab" className="space-y-8">
      {/* ── SECTION 1: Generator Form ── */}
      <div
        data-ocid="ai_generator.form_section"
        className="rounded-2xl border border-border/60 bg-card overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-border/40 bg-primary/5">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-base font-display font-bold text-foreground">
              Niche Landing Page Generator
            </h3>
          </div>
          <p className="text-sm text-muted-foreground ml-11">
            Create conversion-optimized landing pages for any niche and city in
            seconds.
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Niche */}
            <div className="space-y-1.5">
              <Label
                htmlFor="ai-niche"
                className="text-sm font-medium text-foreground"
              >
                Business Niche
              </Label>
              <select
                id="ai-niche"
                value={form.niche}
                onChange={(e) =>
                  setForm((f) => ({ ...f, niche: e.target.value as Niche }))
                }
                data-ocid="ai_generator.niche_select"
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select niche…</option>
                {(Object.entries(NICHE_LABELS) as [Niche, string][]).map(
                  ([val, label]) => (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  ),
                )}
              </select>
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <Label
                htmlFor="ai-city"
                className="text-sm font-medium text-foreground"
              >
                City
              </Label>
              <Input
                id="ai-city"
                placeholder="e.g. Mumbai, Delhi, Bengaluru"
                value={form.city}
                onChange={(e) =>
                  setForm((f) => ({ ...f, city: e.target.value }))
                }
                data-ocid="ai_generator.city_input"
              />
            </div>

            {/* Service Desc */}
            <div className="space-y-1.5">
              <Label
                htmlFor="ai-service"
                className="text-sm font-medium text-foreground"
              >
                Service Description
              </Label>
              <Input
                id="ai-service"
                placeholder="e.g. Digital Marketing, SEO, Social Media"
                value={form.serviceDesc}
                onChange={(e) =>
                  setForm((f) => ({ ...f, serviceDesc: e.target.value }))
                }
                data-ocid="ai_generator.service_input"
              />
            </div>

            {/* Budget */}
            <div className="space-y-1.5">
              <Label
                htmlFor="ai-budget"
                className="text-sm font-medium text-foreground"
              >
                Target Client Budget
              </Label>
              <select
                id="ai-budget"
                value={form.budget}
                onChange={(e) =>
                  setForm((f) => ({ ...f, budget: e.target.value as Budget }))
                }
                data-ocid="ai_generator.budget_select"
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select budget range…</option>
                {(Object.entries(BUDGET_LABELS) as [Budget, string][]).map(
                  ([val, label]) => (
                    <option key={val} value={val}>
                      {label}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          <Button
            className="w-full gap-2 h-11 text-sm font-semibold"
            onClick={handleGenerate}
            disabled={isGenerating}
            data-ocid="ai_generator.generate_button"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                Generating your landing page…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Landing Page
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ── SECTION 2: Generated Preview ── */}
      {(isGenerating || generated) && (
        <div data-ocid="ai_generator.preview_section" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <h3 className="text-base font-display font-bold text-foreground">
                Generated Landing Page Preview
              </h3>
            </div>
            {generated && (
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={handleSaveGenerated}
                data-ocid="ai_generator.save_page_button"
              >
                <Save className="w-3.5 h-3.5" />
                Save Page
              </Button>
            )}
          </div>

          {isGenerating ? (
            <div className="rounded-2xl border border-border/60 bg-card p-12 flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground mb-1">
                  AI is building your page…
                </p>
                <p className="text-xs text-muted-foreground">
                  Generating optimized copy for {nicheLabel} in{" "}
                  {form.city || "your city"}
                </p>
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary/60"
                    style={{ animation: `bounce 1s ${i * 0.2}s infinite` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* A. Hero Section */}
              <div
                className="rounded-2xl overflow-hidden border border-border/40"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.18 0.04 253), oklch(0.22 0.06 253))",
                }}
              >
                <div className="px-8 py-10 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-5 bg-white/10 text-white/90">
                    <Sparkles className="w-3 h-3" />
                    AI Generated Hero
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 leading-tight">
                    Get 30–50 New {nicheLabel} Customers Monthly in{" "}
                    {form.city || "Your City"}
                  </h1>
                  <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
                    We help {nicheLabel} businesses in{" "}
                    {form.city || "your city"} attract consistent leads using
                    proven digital marketing.
                  </p>
                  <button
                    type="button"
                    className="px-6 py-3 rounded-xl text-sm font-bold bg-white text-primary shadow-lg"
                  >
                    Get Your Free Growth Audit →
                  </button>
                </div>
              </div>

              {/* B. Pain Points */}
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
                  🎯 Pain Points We Solve
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {painPoints.map((pt, i) => (
                    <div
                      key={pt}
                      className="rounded-xl border border-destructive/20 bg-destructive/5 p-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-destructive/15 flex items-center justify-center mb-2">
                        <span
                          className="text-xs font-bold"
                          style={{ color: "oklch(0.55 0.22 25)" }}
                        >
                          {i + 1}
                        </span>
                      </div>
                      <p className="text-xs text-foreground leading-relaxed">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* C. Before / After */}
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
                  📊 Before vs After
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                    <p className="text-xs font-bold text-destructive mb-2 uppercase tracking-wide">
                      Before
                    </p>
                    <p className="text-sm text-foreground">
                      5–10 new clients/month, mostly referrals, no online
                      visibility, unpredictable revenue.
                    </p>
                  </div>
                  <div
                    className="rounded-xl border p-4"
                    style={{
                      borderColor: "oklch(0.56 0.15 170 / 0.3)",
                      background: "oklch(0.56 0.15 170 / 0.05)",
                    }}
                  >
                    <p
                      className="text-xs font-bold mb-2 uppercase tracking-wide"
                      style={{ color: "oklch(0.56 0.15 170)" }}
                    >
                      After
                    </p>
                    <p className="text-sm text-foreground">
                      30–50+ new clients/month, ranking on Google, predictable
                      revenue every month.
                    </p>
                  </div>
                </div>
              </div>

              {/* D. Testimonials */}
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4 text-center">
                  ⭐ Client Results
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      quote:
                        "We went from 8 new clients a month to over 40 in just 3 months!",
                      name: "Priya Sharma",
                      biz: "Blossom Salon, Mumbai",
                    },
                    {
                      quote:
                        "Best decision we made. Revenue up 180% in 6 months.",
                      name: "Raj Kumar",
                      biz: "FitLife Gym, Delhi",
                    },
                  ].map((t) => (
                    <div
                      key={t.name}
                      className="bg-card rounded-xl p-4 border border-border/40"
                    >
                      <div className="flex mb-2">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <span
                            key={s}
                            className="text-xs"
                            style={{ color: "oklch(0.68 0.18 86)" }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-foreground italic mb-3">
                        "{t.quote}"
                      </p>
                      <p className="text-xs font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.biz}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* E. Free Audit Form */}
              <div
                className="rounded-2xl border p-6"
                style={{
                  borderColor: "oklch(0.53 0.22 253 / 0.3)",
                  background: "oklch(0.53 0.22 253 / 0.04)",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp
                    className="w-4 h-4"
                    style={{ color: "oklch(0.53 0.22 253)" }}
                  />
                  <h3 className="text-sm font-display font-bold text-foreground">
                    Get Your Free Growth Plan
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-5 ml-6">
                  Free, no obligation. A personalised audit for your business in{" "}
                  {form.city || "your city"}.
                </p>

                {auditSubmitted ? (
                  <div className="rounded-xl border border-border/40 bg-card p-6 text-center">
                    <CheckCircle2
                      className="w-8 h-8 mx-auto mb-2"
                      style={{ color: "oklch(0.56 0.15 170)" }}
                    />
                    <p className="text-sm font-semibold text-foreground mb-1">
                      Request received!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      We'll be in touch within 24 hours with your free growth
                      plan.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Business Name
                        </Label>
                        <Input
                          placeholder="e.g. Blossom Salon"
                          value={auditForm.businessName}
                          onChange={(e) =>
                            setAuditForm((f) => ({
                              ...f,
                              businessName: e.target.value,
                            }))
                          }
                          data-ocid="ai_generator.audit.business_name_input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Phone Number
                        </Label>
                        <Input
                          placeholder="+91 98765 43210"
                          value={auditForm.phone}
                          onChange={(e) =>
                            setAuditForm((f) => ({
                              ...f,
                              phone: e.target.value,
                            }))
                          }
                          data-ocid="ai_generator.audit.phone_input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          Email
                        </Label>
                        <Input
                          type="email"
                          placeholder="owner@business.com"
                          value={auditForm.email}
                          onChange={(e) =>
                            setAuditForm((f) => ({
                              ...f,
                              email: e.target.value,
                            }))
                          }
                          data-ocid="ai_generator.audit.email_input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">
                          City
                        </Label>
                        <Input
                          placeholder={form.city || "e.g. Mumbai"}
                          value={auditForm.city}
                          onChange={(e) =>
                            setAuditForm((f) => ({
                              ...f,
                              city: e.target.value,
                            }))
                          }
                          data-ocid="ai_generator.audit.city_input"
                        />
                      </div>
                    </div>

                    {/* Consent */}
                    <label
                      className="flex items-start gap-2.5 cursor-pointer"
                      data-ocid="ai_generator.audit.consent_checkbox"
                    >
                      <input
                        type="checkbox"
                        checked={auditForm.consent}
                        onChange={(e) =>
                          setAuditForm((f) => ({
                            ...f,
                            consent: e.target.checked,
                          }))
                        }
                        className="mt-0.5 rounded border-input"
                      />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        I agree to be contacted regarding my free audit. You can
                        unsubscribe anytime.
                      </span>
                    </label>

                    <Button
                      className="w-full gap-2"
                      onClick={handleAuditSubmit}
                      data-ocid="ai_generator.audit.submit_button"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Get Free Growth Plan →
                    </Button>
                  </div>
                )}
              </div>

              {/* F. Page Metrics */}
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Page Performance Estimate
                  </h3>
                  <span className="ml-auto text-[10px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5">
                    Based on heuristics
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: <TrendingUp className="w-4 h-4" />,
                      label: "Conversion Rate",
                      value: "8–12%",
                      sub: "Estimated",
                    },
                    {
                      icon: <BarChart3 className="w-4 h-4" />,
                      label: "Lead Quality Score",
                      value: "72/100",
                      sub: "Estimated",
                    },
                    {
                      icon: <Users className="w-4 h-4" />,
                      label: "Monthly Leads",
                      value: "15–30",
                      sub: "Estimated",
                    },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-border/40 bg-muted/20 p-3 text-center"
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2 text-primary">
                        {m.icon}
                      </div>
                      <p
                        className="text-base font-bold text-foreground leading-none mb-0.5"
                        style={{ color: "oklch(0.53 0.22 253)" }}
                      >
                        {m.value}
                      </p>
                      <p className="text-[10px] text-foreground font-medium">
                        {m.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {m.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── SECTION 3: Saved Pages Table ── */}
      <div data-ocid="ai_generator.saved_pages_section" className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-display font-bold text-foreground">
            Your Landing Pages
          </h3>
          <Badge variant="secondary" className="text-xs">
            {savedPages.length} pages
          </Badge>
        </div>

        {savedPages.length === 0 ? (
          <div
            data-ocid="ai_generator.saved_pages.empty_state"
            className="rounded-2xl border border-dashed border-border/60 bg-card p-10 text-center"
          >
            <Globe className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground mb-1">
              No pages yet
            </p>
            <p className="text-xs text-muted-foreground">
              Generate your first landing page above.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40 bg-muted/20">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">
                      Page Title
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                      Niche
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">
                      City
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                      Leads
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">
                      Created
                    </th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {savedPages.map((page, idx) => (
                    <tr
                      key={page.id}
                      data-ocid={`ai_generator.saved_pages.item.${idx + 1}`}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                          {page.title}
                        </p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-xs text-muted-foreground">
                          {page.niche}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs text-muted-foreground">
                          {page.city}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            page.status === "Published"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {page.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right hidden sm:table-cell">
                        <span className="text-sm font-semibold text-foreground">
                          {page.leads}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-xs text-muted-foreground">
                          {page.createdAt}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            data-ocid={`ai_generator.saved_pages.preview_button.${idx + 1}`}
                            className="p-1.5 rounded-md hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors"
                            title="Preview"
                            onClick={() =>
                              toast.info("Page preview coming soon!")
                            }
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {page.status === "Draft" && (
                            <button
                              type="button"
                              data-ocid={`ai_generator.saved_pages.publish_button.${idx + 1}`}
                              className="p-1.5 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                              title="Publish"
                              onClick={() => handlePublish(page.id)}
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            data-ocid={`ai_generator.saved_pages.delete_button.${idx + 1}`}
                            className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                            title="Delete"
                            onClick={() => handleDelete(page.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function WebsiteBuilderPage() {
  const { data: clients = [] } = useClients();
  const saveTemplate = useSaveWebsiteTemplate();

  const [pageTab, setPageTab] = useState<PageTab>("templates");
  const [view, setView] = useState<"gallery" | "editor">("gallery");
  const [activeTemplate, setActiveTemplate] = useState<Template>(TEMPLATES[0]);
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const [sections, setSections] = useState<Sections>(() =>
    defaultSections(TEMPLATES[0].id),
  );
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [selectedClientId, setSelectedClientId] = useState<string>("");

  // Load saved template when client changes
  const selectedClient = clients.find(
    (c) => c.id.toString() === selectedClientId,
  );
  const { data: savedTemplate } = useWebsiteTemplate(
    selectedClient?.id ?? BigInt(0),
  );

  useEffect(() => {
    if (savedTemplate && selectedClientId) {
      const t = TEMPLATES.find((x) => x.id === savedTemplate.templateId);
      if (t) setActiveTemplate(t);
      setSections({
        hero: parseSectionString(savedTemplate.sections.hero),
        features: parseSectionString(savedTemplate.sections.features),
        testimonials: parseSectionString(savedTemplate.sections.testimonials),
        cta: parseSectionString(savedTemplate.sections.cta),
        footer: parseSectionString(savedTemplate.sections.footer),
      });
      setView("editor");
    }
  }, [savedTemplate, selectedClientId]);

  function parseSectionString(raw: string): SectionContent {
    try {
      return JSON.parse(raw) as SectionContent;
    } catch {
      return { headline: raw, subheadline: "", body: "" };
    }
  }

  function serializeSections(s: Sections): Record<SectionKey, string> {
    return {
      hero: JSON.stringify(s.hero),
      features: JSON.stringify(s.features),
      testimonials: JSON.stringify(s.testimonials),
      cta: JSON.stringify(s.cta),
      footer: JSON.stringify(s.footer),
    };
  }

  function handleSelectTemplate(t: Template) {
    setActiveTemplate(t);
    setSections(defaultSections(t.id));
    setActiveSection("hero");
    setView("editor");
  }

  function handleSave() {
    if (!selectedClientId) {
      toast.error("Select a client before saving.");
      return;
    }
    const clientId = clients.find(
      (c) => c.id.toString() === selectedClientId,
    )?.id;
    if (!clientId) return;
    const serialized = serializeSections(sections);
    saveTemplate.mutate(
      {
        clientId,
        templateId: activeTemplate.id,
        templateName: activeTemplate.name,
        sections: serialized,
      },
      {
        onSuccess: () => toast.success("Website template saved!"),
        onError: () => toast.error("Failed to save template."),
      },
    );
  }

  function updateSection(
    key: SectionKey,
    field: keyof SectionContent,
    value: string,
  ) {
    setSections((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  }

  // ── Editor view ──────────────────────────────────────────────────────────
  if (view === "editor") {
    const currentContent = sections[activeSection];
    return (
      <div
        data-ocid="website_builder.editor"
        className="flex flex-col h-full gap-0 -m-6"
      >
        {/* Toolbar */}
        <div className="flex items-center gap-3 px-6 py-3 bg-card border-b border-border/60 shadow-subtle flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={() => setView("gallery")}
            data-ocid="website_builder.back_button"
          >
            <ArrowLeft className="w-4 h-4" /> Templates
          </Button>

          <div className="h-5 w-px bg-border/60" />

          {/* Template name */}
          <div className="flex items-center gap-2">
            <span className="text-base">{activeTemplate.icon}</span>
            <span className="text-sm font-semibold text-foreground">
              {activeTemplate.name}
            </span>
            <Badge variant="secondary" className="text-xs">
              {activeTemplate.category}
            </Badge>
          </div>

          <div className="flex-1" />

          {/* Device toggle */}
          <div className="flex items-center rounded-md border border-border/60 overflow-hidden">
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${device === "desktop" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted/50"}`}
              onClick={() => setDevice("desktop")}
              data-ocid="website_builder.device_desktop"
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${device === "mobile" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted/50"}`}
              onClick={() => setDevice("mobile")}
              data-ocid="website_builder.device_mobile"
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>

          {/* Client selector */}
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            data-ocid="website_builder.client_select_editor"
            className="h-8 rounded-md border border-input bg-background px-2 text-xs"
          >
            <option value="">Select client…</option>
            {clients.map((c) => (
              <option key={c.id.toString()} value={c.id.toString()}>
                {c.businessName}
              </option>
            ))}
          </select>

          <Button
            size="sm"
            className="gap-1.5"
            onClick={handleSave}
            disabled={saveTemplate.isPending || !selectedClientId}
            data-ocid="website_builder.save_button"
          >
            <Save className="w-3.5 h-3.5" />
            {saveTemplate.isPending ? "Saving…" : "Save"}
          </Button>
        </div>

        {/* Editor Body */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Left — Section list + field editors */}
          <div className="w-72 flex-shrink-0 flex flex-col border-r border-border/60 bg-card overflow-y-auto">
            {/* Section list */}
            <div className="p-3 border-b border-border/40">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                Sections
              </p>
              <nav className="space-y-0.5">
                {SECTION_ORDER.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSection(key)}
                    data-ocid={`website_builder.section_nav.${key}`}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-smooth ${
                      activeSection === key
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <span>{SECTION_LABELS[key]}</span>
                    {activeSection === key && (
                      <ChevronRight className="w-3.5 h-3.5 text-primary" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Field editors */}
            <div className="p-4 space-y-4 flex-1">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {SECTION_LABELS[activeSection]}
                </p>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Headline
                    </Label>
                    <Textarea
                      value={currentContent.headline}
                      onChange={(e) =>
                        updateSection(activeSection, "headline", e.target.value)
                      }
                      rows={2}
                      data-ocid={`website_builder.field.${activeSection}.headline`}
                      className="text-sm resize-none"
                      placeholder="Main heading…"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Subheadline
                    </Label>
                    <Textarea
                      value={currentContent.subheadline}
                      onChange={(e) =>
                        updateSection(
                          activeSection,
                          "subheadline",
                          e.target.value,
                        )
                      }
                      rows={2}
                      data-ocid={`website_builder.field.${activeSection}.subheadline`}
                      className="text-sm resize-none"
                      placeholder="Supporting tagline…"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Body Content
                    </Label>
                    <Textarea
                      value={currentContent.body}
                      onChange={(e) =>
                        updateSection(activeSection, "body", e.target.value)
                      }
                      rows={5}
                      data-ocid={`website_builder.field.${activeSection}.body`}
                      className="text-sm resize-none"
                      placeholder="Paragraph text, bullet points, or quotes…"
                    />
                  </div>

                  {/* Image upload placeholder */}
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Section Image
                    </Label>
                    <button
                      type="button"
                      data-ocid={`website_builder.upload.${activeSection}`}
                      className="w-full flex items-center justify-center gap-2 h-20 rounded-lg border-2 border-dashed border-border/60 text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-smooth text-xs font-medium"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Live Preview */}
          <div className="flex-1 bg-muted/20 overflow-y-auto p-6 flex flex-col items-center">
            <p className="text-xs text-muted-foreground mb-4 font-medium uppercase tracking-wider self-start">
              Live Preview — {SECTION_LABELS[activeSection]}
            </p>

            {/* Device frame */}
            <div
              data-ocid="website_builder.preview_frame"
              className={`transition-smooth w-full ${device === "mobile" ? "max-w-sm" : "max-w-3xl"}`}
            >
              {/* Browser chrome */}
              <div className="rounded-t-xl border border-border/60 border-b-0 bg-card px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-destructive/50" />
                  <span className="w-3 h-3 rounded-full bg-warning/50" />
                  <span className="w-3 h-3 rounded-full bg-success/50" />
                </div>
                <div className="flex-1 h-5 rounded-md bg-muted/60 mx-2 flex items-center px-2">
                  <span className="text-[10px] text-muted-foreground truncate">
                    https://yourclient.com
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="border border-border/60 rounded-b-xl bg-background overflow-hidden">
                <SectionPreview
                  sectionKey={activeSection}
                  content={currentContent}
                  template={activeTemplate}
                  isMobile={device === "mobile"}
                />
              </div>
            </div>

            {/* Section nav pills */}
            <div className="flex gap-2 mt-6 flex-wrap justify-center">
              {SECTION_ORDER.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveSection(key)}
                  data-ocid={`website_builder.preview_nav.${key}`}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth border ${
                    activeSection === key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {SECTION_LABELS[key]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Gallery / AI Generator container ─────────────────────────────────────

  return (
    <div data-ocid="website_builder.page" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">
            Website Builder
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Choose a template or generate a niche landing page with AI
          </p>
        </div>
        {pageTab === "templates" && clients.length > 0 && (
          <div className="flex items-center gap-2">
            <Label
              htmlFor="client-select-gallery"
              className="text-sm text-muted-foreground sr-only"
            >
              Client
            </Label>
            <select
              id="client-select-gallery"
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              data-ocid="website_builder.client_select"
              className="h-9 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">All clients</option>
              {clients.map((c) => (
                <option key={c.id.toString()} value={c.id.toString()}>
                  {c.businessName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tab bar */}
      <div
        className="flex gap-1 p-1 bg-muted/40 rounded-xl w-fit border border-border/40"
        data-ocid="website_builder.tabs"
      >
        <button
          type="button"
          data-ocid="website_builder.tab.templates"
          onClick={() => setPageTab("templates")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            pageTab === "templates"
              ? "bg-card text-foreground shadow-subtle"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Monitor className="w-4 h-4" />
          Templates
        </button>
        <button
          type="button"
          data-ocid="website_builder.tab.ai_generator"
          onClick={() => setPageTab("ai-generator")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            pageTab === "ai-generator"
              ? "bg-card text-foreground shadow-subtle"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Generator
          <span
            className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-primary-foreground"
            style={{ background: "oklch(0.53 0.22 253)" }}
          >
            NEW
          </span>
        </button>
      </div>

      {/* Tab Content */}
      {pageTab === "templates" ? (
        <div
          data-ocid="website_builder.template_gallery"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {TEMPLATES.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              onSelect={handleSelectTemplate}
            />
          ))}
        </div>
      ) : (
        <AIGeneratorTab />
      )}
    </div>
  );
}
