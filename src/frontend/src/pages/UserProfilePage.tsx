import { PageTransition } from "@/components/PageTransition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useNavigate } from "@tanstack/react-router";
import type { Easing } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Avatar ───────────────────────────────────────────────────────────────────

function AvatarCircle({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      className="w-24 h-24 rounded-full flex items-center justify-center shrink-0 shadow-lg text-2xl font-bold text-primary-foreground font-display"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.53 0.22 253 / 0.8), oklch(0.6 0.25 253))",
      }}
    >
      {initials}
    </div>
  );
}

// ─── Plan Badge ───────────────────────────────────────────────────────────────

const PLAN_STYLES: Record<string, string> = {
  Free: "bg-muted text-muted-foreground border-border",
  Starter: "bg-blue-500/15 text-blue-600 border-blue-500/30 dark:text-blue-400",
  Growth: "bg-primary/15 text-primary border-primary/30",
  Pro: "bg-amber-500/15 text-amber-600 border-amber-500/30 dark:text-amber-400",
  Agency: "bg-destructive/15 text-destructive border-destructive/30",
};

// ─── Inline Error ─────────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-[11px] text-destructive mt-1">{msg}</p>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
];

const NICHES = [
  "Salon & Beauty",
  "Gym & Fitness",
  "Clinic & Healthcare",
  "Real Estate",
  "Restaurant & Food",
  "Local Services",
  "Digital Agency",
  "E-Commerce",
];

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  useMetaTags(PAGE_META["/profile"]);

  const [form, setForm] = useState({
    fullName: "Anees Chaudhary",
    email: "anees@growthos.in",
    phone: "+91 9324073833",
    timezone: "Asia/Kolkata",
    city: "Mumbai",
    niche: "Digital Agency",
    bio: "Founder of GrowthOS. Helping local businesses generate consistent enquiries through structured digital marketing.",
    linkedin: "https://linkedin.com/in/aneeschaudhary",
    instagram: "@aneeschaudhary",
    whatsapp: "+91 9324073833",
  });

  const plan = "Growth";

  const set = (key: string, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    toast.success("Profile saved!");
  };

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: i * 0.07, ease: "easeOut" as Easing },
  });

  return (
    <PageTransition>
      <div data-ocid="user_profile.page" className="max-w-2xl mx-auto pb-24">
        {/* ── Hero card ──────────────────────────────────────────────── */}
        <motion.div
          {...stagger(0)}
          className="relative rounded-2xl overflow-hidden mb-6"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.53 0.22 253 / 0.12), oklch(0.6 0.25 253 / 0.06))",
            border: "1px solid oklch(0.53 0.22 253 / 0.25)",
          }}
        >
          <div className="px-6 py-8 flex items-center gap-5">
            <AvatarCircle name={form.fullName} />
            <div className="min-w-0">
              <h1 className="text-2xl font-bold font-display text-foreground truncate">
                {form.fullName}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {form.niche} · {form.city}
              </p>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Subscription Plan
                </span>
                <Badge
                  variant="outline"
                  className={`text-[11px] font-bold px-2.5 py-1 ${PLAN_STYLES[plan]}`}
                >
                  {plan}
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Personal Info ──────────────────────────────────────────── */}
        <motion.div {...stagger(1)}>
          <Card className="mb-5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Personal Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-xs mb-1.5 block">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    data-ocid="user_profile.fullname_input"
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    className="h-11"
                    placeholder="Your full name"
                  />
                  <FieldError msg={errors.fullName} />
                </div>
                <div>
                  <Label htmlFor="email" className="text-xs mb-1.5 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    data-ocid="user_profile.email_input"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="h-11"
                    placeholder="email@example.com"
                  />
                  <FieldError msg={errors.email} />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-xs mb-1.5 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    data-ocid="user_profile.phone_input"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="h-11"
                    placeholder="+91 9XXXXXXXXX"
                  />
                  <FieldError msg={errors.phone} />
                </div>
                <div>
                  <Label htmlFor="city" className="text-xs mb-1.5 block">
                    City
                  </Label>
                  <Input
                    id="city"
                    data-ocid="user_profile.city_input"
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    className="h-11"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <Label htmlFor="timezone" className="text-xs mb-1.5 block">
                    Timezone
                  </Label>
                  <select
                    id="timezone"
                    data-ocid="user_profile.timezone_select"
                    value={form.timezone}
                    onChange={(e) => set("timezone", e.target.value)}
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="niche" className="text-xs mb-1.5 block">
                    Your Niche
                  </Label>
                  <select
                    id="niche"
                    data-ocid="user_profile.niche_select"
                    value={form.niche}
                    onChange={(e) => set("niche", e.target.value)}
                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    {NICHES.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="bio" className="text-xs mb-1.5 block">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  data-ocid="user_profile.bio_textarea"
                  value={form.bio}
                  onChange={(e) => set("bio", e.target.value)}
                  rows={3}
                  placeholder="Tell clients and team about yourself…"
                  className="resize-none"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Social Links ───────────────────────────────────────────── */}
        <motion.div {...stagger(2)}>
          <Card className="mb-5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Social Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label
                  htmlFor="linkedin"
                  className="text-xs mb-1.5 flex items-center gap-1.5"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-blue-500"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn URL
                </Label>
                <Input
                  id="linkedin"
                  data-ocid="user_profile.linkedin_input"
                  value={form.linkedin}
                  onChange={(e) => set("linkedin", e.target.value)}
                  className="h-11"
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
              <div>
                <Label
                  htmlFor="instagram"
                  className="text-xs mb-1.5 flex items-center gap-1.5"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-pink-500"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                  Instagram Handle
                </Label>
                <Input
                  id="instagram"
                  data-ocid="user_profile.instagram_input"
                  value={form.instagram}
                  onChange={(e) => set("instagram", e.target.value)}
                  className="h-11"
                  placeholder="@yourhandle"
                />
              </div>
              <div>
                <Label
                  htmlFor="whatsapp"
                  className="text-xs mb-1.5 flex items-center gap-1.5"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-green-500"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  WhatsApp Number
                </Label>
                <Input
                  id="whatsapp"
                  data-ocid="user_profile.whatsapp_input"
                  value={form.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                  className="h-11"
                  placeholder="+91 9XXXXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Subscription Plan ──────────────────────────────────────── */}
        <motion.div {...stagger(3)}>
          <Card className="mb-6">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                    Current Plan
                  </p>
                  <p className="text-base font-bold text-foreground font-display">
                    {plan} Plan
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    150 leads/day · Auto follow-ups · CRM pipeline
                  </p>
                </div>
                <Button
                  data-ocid="user_profile.upgrade_button"
                  onClick={() => navigate({ to: "/billing" })}
                  className="shrink-0 h-9 px-4 text-sm font-semibold"
                >
                  Upgrade Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="mb-6" />

        {/* ── Save ───────────────────────────────────────────────────── */}
        <motion.div {...stagger(4)} className="flex justify-end">
          <Button
            data-ocid="user_profile.save_button"
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
              "Save Changes"
            )}
          </Button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
