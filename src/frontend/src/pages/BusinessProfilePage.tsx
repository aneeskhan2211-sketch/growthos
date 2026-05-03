import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import type { Easing } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types & Constants ────────────────────────────────────────────────────────

const ALL_SERVICES = [
  "SEO Optimization",
  "Google Ads",
  "Meta Ads",
  "WhatsApp Outreach",
  "Content Creation",
  "Social Media Management",
];

const TEAM_SIZES = ["Solo", "2–5", "6–15", "15+"];

interface PricingTier {
  label: string;
  price: string;
  description: string;
}

// ─── Logo Placeholder ─────────────────────────────────────────────────────────

function LogoPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      className="w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold text-primary-foreground font-display shrink-0 shadow-md"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.55 0.22 280), oklch(0.53 0.22 253))",
      }}
    >
      {initials || "?"}
    </div>
  );
}

// ─── Pricing Tier Card ────────────────────────────────────────────────────────

function PricingTierCard({
  tier,
  index,
  onChange,
}: {
  tier: PricingTier;
  index: number;
  onChange: (field: keyof PricingTier, val: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-muted/30 p-4 space-y-3">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        {tier.label}
      </p>
      <div>
        <Label className="text-xs mb-1.5 block">Monthly Price (₹)</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">
            ₹
          </span>
          <Input
            data-ocid={`business_profile.pricing.price.${index + 1}`}
            value={tier.price}
            onChange={(e) => onChange("price", e.target.value)}
            className="h-11 pl-7"
            placeholder="0"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs mb-1.5 block">Description</Label>
        <Textarea
          data-ocid={`business_profile.pricing.description.${index + 1}`}
          value={tier.description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={2}
          className="resize-none text-sm"
          placeholder="What's included…"
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BusinessProfilePage() {
  const [saving, setSaving] = useState(false);
  useMetaTags(PAGE_META["/profile/business"]);
  const [form, setForm] = useState({
    agencyName: "GrowthOS Agency",
    tagline: "Helping local businesses grow with structured digital marketing",
    website: "https://growthos.in",
    teamSize: "2–5",
    monthlyRevenueGoal: "500000",
    whiteLabel: false,
  });

  const [services, setServices] = useState<string[]>([
    "SEO Optimization",
    "Google Ads",
    "WhatsApp Outreach",
  ]);

  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([
    {
      label: "Starter",
      price: "15000",
      description: "SEO basics + GMB setup + 5 posts/month",
    },
    {
      label: "Growth",
      price: "25000",
      description: "SEO + Google Ads + Reels + WhatsApp follow-ups",
    },
    {
      label: "Scale",
      price: "50000",
      description: "Full funnel: Ads + Content + Reporting + Strategy calls",
    },
  ]);

  const toggleService = (svc: string) => {
    setServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc],
    );
  };

  const updateTier = (index: number, field: keyof PricingTier, val: string) => {
    setPricingTiers((prev) =>
      prev.map((t, i) => (i === index ? { ...t, [field]: val } : t)),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    toast.success("Business profile saved!");
  };

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: i * 0.07, ease: "easeOut" as Easing },
  });

  return (
    <PageTransition>
      <div
        data-ocid="business_profile.page"
        className="max-w-2xl mx-auto pb-24"
      >
        {/* ── Header ─────────────────────────────────────────────────── */}
        <motion.div
          {...stagger(0)}
          className="flex items-center gap-4 mb-6 p-5 rounded-2xl bg-card border border-border/50"
        >
          <LogoPlaceholder name={form.agencyName} />
          <div className="min-w-0">
            <h1 className="text-xl font-bold font-display text-foreground truncate">
              {form.agencyName || "Your Agency"}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
              {form.tagline}
            </p>
          </div>
        </motion.div>

        {/* ── Company Info ───────────────────────────────────────────── */}
        <motion.div {...stagger(1)}>
          <Card className="mb-5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Company Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs mb-1.5 block">
                  Agency / Company Name
                </Label>
                <Input
                  data-ocid="business_profile.agency_name_input"
                  value={form.agencyName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, agencyName: e.target.value }))
                  }
                  className="h-11"
                  placeholder="Your Agency Name"
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Tagline</Label>
                <Input
                  data-ocid="business_profile.tagline_input"
                  value={form.tagline}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, tagline: e.target.value }))
                  }
                  className="h-11"
                  placeholder="One line about your agency"
                />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Website URL</Label>
                <Input
                  data-ocid="business_profile.website_input"
                  value={form.website}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, website: e.target.value }))
                  }
                  className="h-11"
                  placeholder="https://youragency.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs mb-1.5 block">Team Size</Label>
                  <select
                    data-ocid="business_profile.team_size_select"
                    value={form.teamSize}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, teamSize: e.target.value }))
                    }
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {TEAM_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-xs mb-1.5 block">
                    Monthly Revenue Goal (₹)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">
                      ₹
                    </span>
                    <Input
                      data-ocid="business_profile.revenue_goal_input"
                      value={form.monthlyRevenueGoal}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          monthlyRevenueGoal: e.target.value,
                        }))
                      }
                      className="h-11 pl-7"
                      placeholder="500000"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Services ───────────────────────────────────────────────── */}
        <motion.div {...stagger(2)}>
          <Card className="mb-5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Services Offered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALL_SERVICES.map((svc) => (
                  <label
                    key={svc}
                    htmlFor={`svc-${svc}`}
                    className="flex items-center gap-3 cursor-pointer rounded-lg border border-border/50 px-3 py-2.5 hover:bg-muted/40 transition-colors"
                  >
                    <Checkbox
                      id={`svc-${svc}`}
                      data-ocid={`business_profile.service.${svc.toLowerCase().replace(/\s+/g, "_")}`}
                      checked={services.includes(svc)}
                      onCheckedChange={() => toggleService(svc)}
                    />
                    <span className="text-sm text-foreground">{svc}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Pricing Tiers ──────────────────────────────────────────── */}
        <motion.div {...stagger(3)}>
          <Card className="mb-5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Pricing Tiers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pricingTiers.map((tier, i) => (
                <PricingTierCard
                  key={tier.label}
                  tier={tier}
                  index={i}
                  onChange={(field, val) => updateTier(i, field, val)}
                />
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* ── White Label ────────────────────────────────────────────── */}
        <motion.div {...stagger(4)}>
          <Card className="mb-6">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    White-Label Mode
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Remove GrowthOS branding from client-facing reports and
                    proposals. Uses your agency name and logo.
                  </p>
                </div>
                <Switch
                  data-ocid="business_profile.white_label_toggle"
                  checked={form.whiteLabel}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, whiteLabel: v }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="mb-6" />

        <motion.div {...stagger(5)} className="flex justify-end">
          <Button
            data-ocid="business_profile.save_button"
            onClick={handleSave}
            disabled={saving}
            className="h-11 px-8 text-sm font-semibold gap-2"
          >
            {saving ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
                Saving…
              </>
            ) : (
              "Save Business Profile"
            )}
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
