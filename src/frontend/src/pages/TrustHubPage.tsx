import {
  CheckCircleIcon,
  GoogleAnalyticsIcon,
  RazorpayIcon,
  ShieldCheckIcon,
  SparkIcon,
  TRUST_INTEGRATIONS,
  UsersIcon,
  WhatsAppIcon,
  ZapIcon,
} from "@/components/icons/PlatformIcons";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import {
  selectMarketTrustData,
  selectSocialProofFeed,
  selectTestimonials,
  selectTrustHubMetrics,
  useGrowthStore,
} from "@/store/useGrowthStore";
import { Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Animated Counter ──────────────────────────────────────────────────────────

function useAnimatedCounter(target: number, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, inView]);
  return count;
}

// ── Section Wrapper ───────────────────────────────────────────────────────────

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

// ── Integration Category Badge ────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Analytics: "bg-[oklch(0.52_0.24_257/0.12)] text-[oklch(0.52_0.24_257)]",
  Advertising: "bg-[oklch(0.55_0.22_25/0.12)] text-[oklch(0.55_0.22_25)]",
  Messaging: "bg-[oklch(0.56_0.15_170/0.12)] text-[oklch(0.56_0.15_170)]",
  Email: "bg-[oklch(0.68_0.18_86/0.12)] text-[oklch(0.68_0.18_86)]",
  Tracking: "bg-[oklch(0.65_0.15_40/0.12)] text-[oklch(0.65_0.15_40)]",
  Payments: "bg-[oklch(0.58_0.28_253/0.12)] text-[oklch(0.58_0.28_253)]",
};

// ── Star Rating ────────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={`star-${i}`}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < count ? "oklch(0.68 0.18 86)" : "none"}
          stroke="oklch(0.68 0.18 86)"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M7 1.5L8.5 5H12L9 7.5L10 11L7 9L4 11L5 7.5L2 5H5.5L7 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

// ── Market Stat Card with animated counter ─────────────────────────────────────

function MarketStatCard({
  stat,
  description,
  icon,
  index,
}: {
  stat: { value: string; unit: string; description: string; icon: string };
  description: string;
  icon: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const numericTarget = Number.parseInt(stat.value, 10);
  const count = useAnimatedCounter(numericTarget, 2000, inView);

  const iconEl =
    icon === "analytics" ? (
      <GoogleAnalyticsIcon size={32} />
    ) : icon === "social" ? (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="Social media"
      >
        <rect width="32" height="32" rx="7" fill="oklch(0.65 0.2 328 / 0.15)" />
        <path
          d="M22 10C22 10 18 12 18 16V20L16 22V23H26V22L24 20V16C24 12 20 10 20 10H22Z"
          stroke="oklch(0.65 0.2 328)"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="20" cy="10" r="2.5" fill="oklch(0.65 0.2 328)" />
      </svg>
    ) : (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        role="img"
        aria-label="Growth chart"
      >
        <rect
          width="32"
          height="32"
          rx="7"
          fill="oklch(0.56 0.15 170 / 0.15)"
        />
        <path
          d="M6 22L12 15L16 18L22 10L26 14"
          stroke="oklch(0.56 0.15 170)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M22 10H26V14"
          stroke="oklch(0.56 0.15 170)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="market-data-card bg-card border border-border/40 rounded-xl p-6 flex flex-col gap-3 shadow-card hover:shadow-elevated transition-smooth"
      data-ocid={`trust_hub.market_stat.item.${index + 1}`}
    >
      <div className="flex items-start justify-between">
        {iconEl}
        <span className="text-xs italic text-muted-foreground text-right leading-tight max-w-[120px]">
          {stat.description.includes("industry")
            ? "Industry data"
            : "Platform data"}
        </span>
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-4xl font-display font-extrabold text-primary counter-number">
          {count}
        </span>
        <span className="text-2xl font-display font-bold text-primary/80">
          {stat.unit}
        </span>
      </div>
      <p className="text-sm text-foreground font-medium leading-snug">
        {description}
      </p>
    </motion.div>
  );
}

// ── Integration Card ──────────────────────────────────────────────────────────

function IntegrationCard({
  integration,
  index,
}: {
  integration: (typeof TRUST_INTEGRATIONS)[0];
  index: number;
}) {
  const IconComponent = integration.icon;
  return (
    <motion.div
      custom={index}
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="integration-card bg-card border border-border/40 rounded-xl p-5 flex items-start gap-4 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-smooth cursor-default"
      data-ocid={`trust_hub.integration.item.${index + 1}`}
    >
      <div className="flex-shrink-0 rounded-lg overflow-hidden">
        <IconComponent size={40} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-sm font-semibold text-foreground font-display leading-tight">
            {integration.name}
          </span>
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wide ${CATEGORY_COLORS[integration.category] ?? "bg-muted text-muted-foreground"}`}
          >
            {integration.category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed text-truncate-2">
          {integration.description}
        </p>
      </div>
      <div className="flex-shrink-0">
        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[oklch(0.56_0.15_170/0.12)] text-[oklch(0.56_0.15_170)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.56_0.15_170)]" />
          Supported
        </span>
      </div>
    </motion.div>
  );
}

// ── Trust Badge Card ──────────────────────────────────────────────────────────

function TrustBadge({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={FADE_UP}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="trust-badge bg-card border border-border/40 rounded-xl p-5 flex flex-col items-center text-center gap-3 shadow-card hover:shadow-elevated transition-smooth"
      data-ocid={`trust_hub.trust_badge.item.${index + 1}`}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-foreground font-display leading-tight">
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function TrustHubPage() {
  useMetaTags(PAGE_META["/trust-hub"]);
  const trustHubMetrics = useGrowthStore(selectTrustHubMetrics);
  const marketTrustData = useGrowthStore(selectMarketTrustData);
  const testimonials = useGrowthStore(selectTestimonials);
  const socialProofFeed = useGrowthStore(selectSocialProofFeed);

  // Rotating social proof
  const [proofIndex, setProofIndex] = useState(0);
  const [proofVisible, setProofVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProofVisible(false);
      setTimeout(() => {
        setProofIndex((i) => (i + 1) % socialProofFeed.length);
        setProofVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, [socialProofFeed.length]);

  const currentProof = socialProofFeed[proofIndex];

  // Category grouping
  const categories = [
    "Analytics",
    "Advertising",
    "Messaging",
    "Email",
    "Tracking",
    "Payments",
  ] as const;

  const scrollToIntegrations = () => {
    document
      .getElementById("integrations")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="trust_hub.page">
      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-card border-b border-border/30"
        data-ocid="trust_hub.hero.section"
      >
        <div className="absolute inset-0 gradient-hero pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider mb-5">
              <ShieldCheckIcon size={14} className="text-primary" />
              Trust &amp; Credibility
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-foreground leading-tight mb-4">
              GrowthOS — Trusted by Agencies &amp;{" "}
              <span className="text-primary">Business Owners</span> Across India
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              A complete digital marketing system built on industry-standard
              tools, transparent data, and real results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/salon-marketing-mumbai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary-glow text-sm font-semibold font-display"
                data-ocid="trust_hub.hero.primary_button"
              >
                <SparkIcon size={16} />
                Get Your Free Growth Audit
              </Link>
              <button
                type="button"
                onClick={scrollToIntegrations}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border/50 text-sm font-semibold text-foreground hover:bg-muted/30 transition-smooth"
                data-ocid="trust_hub.hero.secondary_button"
              >
                See How It Works
              </button>
            </div>
          </motion.div>

          {/* Quick trust badges row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            {[
              { icon: "🔒", label: "Data Privacy Compliant" },
              { icon: "✅", label: "No Fake Claims" },
              { icon: "🤝", label: "Industry-Standard Tools" },
              { icon: "📊", label: "Transparent Data" },
            ].map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/30"
              >
                <span>{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. INTEGRATION ECOSYSTEM ──────────────────────────────────────── */}
      <section
        id="integrations"
        className="py-14 bg-background"
        data-ocid="trust_hub.integrations.section"
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Integrates with Industry-Leading Platforms
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
              GrowthOS connects with the tools professionals already use — not
              replacements, but powerful amplifiers.
            </p>
            <p className="text-xs italic text-muted-foreground mt-2">
              Not an official partner of any platform. Integrates with
              industry-leading platforms.
            </p>
          </motion.div>

          {categories.map((category) => {
            const items = TRUST_INTEGRATIONS.filter(
              (t) => t.category === category,
            );
            if (!items.length) return null;
            const startIndex = TRUST_INTEGRATIONS.indexOf(items[0]);
            return (
              <div key={category} className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${CATEGORY_COLORS[category] ?? "bg-muted text-muted-foreground"}`}
                  >
                    {category}
                  </span>
                  <div className="flex-1 h-px bg-border/30" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map((integration, i) => (
                    <IntegrationCard
                      key={integration.id}
                      integration={integration}
                      index={startIndex + i}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 3. MARKET TRUST DATA ──────────────────────────────────────────── */}
      <section
        className="py-14 bg-muted/20 border-y border-border/20"
        data-ocid="trust_hub.market_data.section"
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Why Digital Marketing Works
            </h2>
            <p className="text-sm text-muted-foreground">
              Global benchmarks that prove the channel works — before you invest
              a rupee.
            </p>
          </motion.div>

          <div className="platform-metrics-grid grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            {marketTrustData.map((stat, i) => (
              <MarketStatCard
                key={stat.id}
                stat={stat}
                description={stat.description}
                icon={stat.icon}
                index={i}
              />
            ))}
          </div>

          <p className="text-center text-xs italic text-muted-foreground mt-2">
            Data based on publicly available industry reports
          </p>
        </div>
      </section>

      {/* ── 4. PLATFORM SUCCESS METRICS ───────────────────────────────────── */}
      <section
        className="py-14 bg-background"
        data-ocid="trust_hub.success_metrics.section"
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              What GrowthOS Users Are Achieving
            </h2>
            <p className="text-sm text-muted-foreground">
              Aggregated across active GrowthOS users.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Leads Generated",
                value: trustHubMetrics.totalLeads.toLocaleString("en-IN"),
                icon: <UsersIcon size={22} className="text-primary" />,
                suffix: "",
                ocid: "trust_hub.metric.leads",
              },
              {
                label: "Messages Sent",
                value: trustHubMetrics.messagesSent.toLocaleString("en-IN"),
                icon: (
                  <ZapIcon size={22} className="text-[oklch(0.68_0.18_86)]" />
                ),
                suffix: "",
                ocid: "trust_hub.metric.messages",
              },
              {
                label: "Clients Closed",
                value: trustHubMetrics.clientsClosed.toLocaleString("en-IN"),
                icon: (
                  <CheckCircleIcon
                    size={22}
                    className="text-[oklch(0.56_0.15_170)]"
                  />
                ),
                suffix: "",
                ocid: "trust_hub.metric.clients",
              },
              {
                label: "Revenue Generated",
                value: trustHubMetrics.revenueGenerated,
                icon: (
                  <SparkIcon
                    size={22}
                    className="text-[oklch(0.58_0.28_253)]"
                  />
                ),
                suffix: " est.",
                ocid: "trust_hub.metric.revenue",
              },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                custom={i}
                variants={FADE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="metric-card bg-card border border-border/40 rounded-xl p-5 flex flex-col gap-2 shadow-card"
                data-ocid={metric.ocid}
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-muted/30 flex items-center justify-center">
                    {metric.icon}
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-xl font-display font-extrabold text-foreground leading-none counter-number">
                    {metric.value}
                    {metric.suffix}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">
                    {metric.label}
                  </p>
                </div>
                <p className="text-[10px] italic text-muted-foreground/70 leading-tight">
                  Estimated based on usage patterns
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs italic text-muted-foreground mt-5">
            Based on usage patterns and industry benchmarks
          </p>
        </div>
      </section>

      {/* ── 5. LIVE SOCIAL PROOF FEED ─────────────────────────────────────── */}
      <section
        className="py-14 bg-muted/20 border-y border-border/20"
        data-ocid="trust_hub.social_proof.section"
      >
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              What's Happening Right Now
            </h2>
            <p className="text-sm text-muted-foreground">
              Activity across the GrowthOS community.
            </p>
          </motion.div>

          <div
            className="social-proof-ticker"
            data-ocid="trust_hub.social_proof.card"
          >
            <div className="ticker-header">
              <span className="ticker-label">Live Activity</span>
              <span className="ticker-pulse-badge">
                <span className="ticker-pulse" />
                Live
              </span>
            </div>
            <div
              className="ticker-entry"
              style={{
                opacity: proofVisible ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            >
              <div className="ticker-avatar">
                {currentProof?.userName?.[0] ?? "U"}
              </div>
              <div className="ticker-content">
                <p className="ticker-text">
                  <span className="ticker-metric">
                    {currentProof?.userName}
                  </span>{" "}
                  ({currentProof?.city}) {currentProof?.action}
                  {currentProof?.metricValue ? (
                    <span className="ticker-metric">
                      {" "}
                      {currentProof.metricValue}
                    </span>
                  ) : null}
                </p>
                <p className="ticker-subtext">
                  Just now • Based on real usage patterns
                </p>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex gap-1.5 mt-4 justify-center">
              {socialProofFeed.slice(0, 5).map((entry, i) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => {
                    setProofIndex(i);
                    setProofVisible(true);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === proofIndex % 5 ? "bg-primary w-4" : "bg-border"}`}
                  aria-label={`Social proof entry ${i + 1}`}
                  data-ocid={`trust_hub.social_proof.dot.${i + 1}`}
                />
              ))}
            </div>
          </div>
          <p className="text-center text-xs italic text-muted-foreground mt-3">
            Based on real usage patterns
          </p>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ───────────────────────────────────────────────── */}
      <section
        className="py-14 bg-background"
        data-ocid="trust_hub.testimonials.section"
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Real Results from Real Businesses
            </h2>
            <p className="text-sm text-muted-foreground">
              Based on estimated user outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.slice(0, 6).map((t, i) => (
              <motion.div
                key={t.id}
                custom={i}
                variants={FADE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="testimonial-card bg-card border border-border/40 rounded-xl p-5 flex flex-col gap-3 shadow-card hover:shadow-elevated transition-smooth"
                data-ocid={`trust_hub.testimonial.item.${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: t.avatarColor }}
                  >
                    {t.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground font-display leading-tight truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {t.businessType} · {t.city}
                    </p>
                  </div>
                </div>

                <StarRating count={t.stars} />

                <p className="text-sm text-muted-foreground leading-relaxed text-truncate-3 flex-1">
                  "{t.quote}"
                </p>

                <div className="mt-auto pt-3 border-t border-border/20">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-[oklch(0.56_0.15_170/0.12)] text-[oklch(0.56_0.15_170)]">
                    <CheckCircleIcon size={12} />
                    {t.result}
                  </span>
                  <p className="text-[10px] italic text-muted-foreground/60 mt-1.5">
                    Estimated based on usage patterns
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TRUST BADGES ───────────────────────────────────────────────── */}
      <section
        className="py-14 bg-muted/20 border-y border-border/20"
        data-ocid="trust_hub.trust_badges.section"
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Built for Trust
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TrustBadge
              index={0}
              icon={<ShieldCheckIcon size={28} />}
              title="Data Privacy Compliant"
              description="Consent-based lead collection, GDPR-aligned data practices"
            />
            <TrustBadge
              index={1}
              icon={<RazorpayIcon size={28} />}
              title="Secure Payments"
              description="Powered by Razorpay (coming soon) — India's trusted payment gateway"
            />
            <TrustBadge
              index={2}
              icon={<ShieldCheckIcon size={28} />}
              title="No Fake Claims"
              description="All data is transparently labeled and sourced from verifiable benchmarks"
            />
            <TrustBadge
              index={3}
              icon={<CheckCircleIcon size={28} />}
              title="Industry-Standard Tools"
              description="Integrates with platforms professionals trust every day"
            />
          </div>
        </div>
      </section>

      {/* ── 8. CTA FOOTER ─────────────────────────────────────────────────── */}
      <section
        className="py-16 bg-card border-t border-border/30"
        data-ocid="trust_hub.cta.section"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <SparkIcon size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-3">
              Ready to Grow Your Business?
            </h2>
            <p className="text-base text-muted-foreground mb-2 leading-relaxed">
              Join 1000+ agencies and business owners using GrowthOS to generate
              leads and close clients.
            </p>
            <p className="text-xs italic text-muted-foreground mb-8">
              Estimated active users based on platform engagement data
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/salon-marketing-mumbai"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl btn-primary-glow text-sm font-semibold font-display"
                data-ocid="trust_hub.cta.primary_button"
              >
                <SparkIcon size={16} />
                Start Free — Get Your First 20 Leads
              </Link>
              <Link
                to="/command-center"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-card border border-border/50 text-sm font-semibold text-foreground hover:bg-muted/30 transition-smooth"
                data-ocid="trust_hub.cta.secondary_button"
              >
                Open Command Center
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
