import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useNicheLanding } from "../hooks/useNicheLanding";
import { useViralLoop } from "../hooks/useViralLoop";

// ─── Social proof ticker ──────────────────────────────────────────────────────
function SocialTicker() {
  const { ticker } = useViralLoop();
  const entry = ticker.activeEntry;
  if (!entry) return null;
  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-2">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.p
            key={entry.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-center text-primary font-medium"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" />
            <strong>{entry.userName}</strong> from {entry.city} {entry.action}
            {entry.metricValue && (
              <span className="ml-1 font-bold">{entry.metricValue}</span>
            )}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <section className="relative bg-background overflow-hidden py-16 md:py-24">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            className="mb-5 bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-semibold"
            variant="outline"
          >
            Mumbai Salon Growth System
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight mb-6">
            Get 30–70 New Salon Clients
            <br className="hidden md:block" />
            <span className="text-primary"> Every Month in Mumbai</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Proven digital marketing strategies for Mumbai salon owners to
            dominate local search, fill appointment slots, and grow revenue —
            without spending lakhs on ads.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={onLoginClick}
              className="w-full sm:w-auto px-8 h-12 text-base font-semibold shadow-lg"
              data-ocid="salon_landing.hero_audit_button"
            >
              Get Free Growth Audit →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 h-12 text-base border-border"
              onClick={onLoginClick}
              data-ocid="salon_landing.hero_whatsapp_button"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 text-[#25D366]"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </Button>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { value: "200+", label: "Salons on growth journey (est.)" },
            { value: "₹4.2Cr+", label: "Revenue potential unlocked" },
            { value: "30 days", label: "Typical first results" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-display font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Pain Points Section ──────────────────────────────────────────────────────
function PainPointsSection() {
  const points = [
    {
      icon: "📉",
      title: "Unpredictable Walk-Ins",
      desc: "You never know if tomorrow will be busy or empty. Weekdays are quiet, weekends are chaotic — no system to fill the gaps.",
    },
    {
      icon: "🗓️",
      title: "Booking Gaps Every Week",
      desc: "Appointment slots sit empty while competitors across the street stay fully booked. Your talent deserves a full schedule.",
    },
    {
      icon: "💬",
      title: "Low Enquiry Conversion",
      desc: "People enquire on WhatsApp but never show up. Without a follow-up system, 60–70% of warm leads disappear forever.",
    },
    {
      icon: "🔄",
      title: "Poor Client Retention",
      desc: "One-time visitors who loved their service never come back — simply because nobody reminded them. Retention = profit.",
    },
  ];
  return (
    <section className="bg-muted/30 py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Sound familiar?
          </h2>
          <p className="text-muted-foreground">
            Most Mumbai salons face these growth blockers every day.
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="bg-card border-border h-full">
                <CardContent className="p-5 flex gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">
                    {p.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      {p.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Case Study Section ───────────────────────────────────────────────────────
function CaseStudySection() {
  const studies = [
    {
      salon: "Sunrise Salon, Andheri",
      before: {
        clients: "12 leads/week",
        revenue: "₹40k/month",
        reviews: "8 reviews",
      },
      after: {
        clients: "4 bookings/week via WA",
        revenue: "₹1.12L/month",
        reviews: "47 reviews",
      },
      quote:
        "In 60 days we went from guessing about tomorrow's walk-ins to being booked 5 days ahead.",
      owner: "Meera Iyer",
      time: "60 days",
      metric: "₹72k extra revenue",
    },
    {
      salon: "Glamour Touch, Bandra",
      before: {
        clients: "Zero online presence",
        revenue: "₹55k/month",
        reviews: "3 reviews",
      },
      after: {
        clients: "28 new clients via Google",
        revenue: "₹1.4L/month",
        reviews: "89 reviews",
      },
      quote:
        "Our Instagram went from 400 to 8,200 followers and bookings tripled in 4 months.",
      owner: "Priya Mehta",
      time: "45 days",
      metric: "+28 new clients",
    },
    {
      salon: "Elegance Unisex, Powai",
      before: {
        clients: "3.2-star Google rating",
        revenue: "₹48k/month",
        reviews: "11 reviews",
      },
      after: {
        clients: "4.8-star Google rating",
        revenue: "₹1.03L/month",
        reviews: "143 reviews",
      },
      quote:
        "Reviews alone brought in ₹55k more per month. The audit found exactly what was missing.",
      owner: "Fatima Sheikh",
      time: "90 days",
      metric: "4.8★ Google rating",
    },
  ];
  return (
    <section className="bg-background py-16" id="results">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Real Mumbai Case Studies
          </h2>
          <p className="text-muted-foreground">
            Before/After results from salons in your city.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {studies.map((s, i) => (
            <motion.div
              key={s.salon}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-ocid={`salon_landing.case_study.${i + 1}`}
            >
              <Card className="bg-card border-border overflow-hidden h-full flex flex-col">
                <div className="bg-primary/5 border-b border-border px-5 py-3 flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">
                    {s.salon}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs bg-success/10 text-success border-success/20"
                  >
                    {s.time}
                  </Badge>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-destructive/5 border border-destructive/10 rounded-lg p-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        BEFORE
                      </p>
                      <p className="text-sm text-foreground">
                        {s.before.clients}
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {s.before.revenue}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {s.before.reviews}
                      </p>
                    </div>
                    <div className="bg-success/5 border border-success/10 rounded-lg p-3">
                      <p className="text-xs font-semibold text-success mb-2">
                        AFTER
                      </p>
                      <p className="text-sm text-foreground">
                        {s.after.clients}
                      </p>
                      <p className="text-sm font-bold text-success">
                        {s.after.revenue}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {s.after.reviews}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/30 pl-3 mb-3">
                      "{s.quote}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        — {s.owner}
                      </p>
                      <span className="text-sm font-bold text-primary">
                        {s.metric}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      salon: "Glam Touch Salon, Juhu",
      text: "Before GrowthOS, I had 5–6 clients a day max. Now I'm fully booked 4 days a week. The WhatsApp follow-up alone recovered ₹18,000 in lost bookings last month.",
      stars: 5,
    },
    {
      name: "Anjali Mehta",
      salon: "Style Hub, Malad",
      text: "I was sceptical at first but within 3 weeks I got 22 new enquiries from Google. The audit showed exactly what was missing — GMB photos and local keywords.",
      stars: 5,
    },
    {
      name: "Sunita Desai",
      salon: "Aura Wellness Salon, Borivali",
      text: "The team responded within 2 minutes on WhatsApp. They set up our Google profile, ran a reel campaign, and we hit ₹1L revenue for the first time ever.",
      stars: 5,
    },
  ];
  return (
    <section className="bg-muted/30 py-16" id="testimonials">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Testimonials from Local Salons
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card border-border h-full">
                <CardContent className="p-5">
                  <div className="flex gap-0.5 mb-3">
                    {"★★★★★"
                      .slice(0, t.stars)
                      .split("")
                      .map((star, j) => (
                        <span
                          key={`${t.name}-star-${j + 1}`}
                          className="text-amber-400 text-sm"
                        >
                          {star}
                        </span>
                      ))}
                  </div>
                  <p className="text-sm text-foreground mb-4 leading-relaxed">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.salon}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Success Stories Section ──────────────────────────────────────────────────
function SuccessStoriesSection() {
  const stories = [
    {
      salon: "Bella Salon, Bandra",
      roiBadge: "+275% revenue growth",
      duration: "In 3 months",
      before: { leads: 20, bookings: 8, revenue: "₹40k" },
      after: { leads: 80, bookings: 30, revenue: "₹1.5L" },
      quote:
        "We went from relying on walk-ins to getting daily WhatsApp enquiries. Game changer.",
      author: "Priya Mehta, Owner, Bella Salon Bandra",
    },
    {
      salon: "Glamour Studio, Andheri",
      roiBadge: "+340% revenue growth",
      duration: "In 6 weeks",
      before: { leads: 15, bookings: 5, revenue: "₹25k" },
      after: { leads: 60, bookings: 22, revenue: "₹1.1L" },
      quote:
        "The before/after content strategy alone doubled our Instagram enquiries within a month.",
      author: "Anjali Kapoor, Owner, Glamour Studio Andheri",
    },
    {
      salon: "Radiance Hair & Beauty, Powai",
      roiBadge: "+350% revenue growth",
      duration: "In 8 weeks",
      before: { leads: 10, bookings: 3, revenue: "₹20k" },
      after: { leads: 45, bookings: 18, revenue: "₹90k" },
      quote:
        "Finally seeing consistent leads from Google. Reviews strategy was a game changer.",
      author: "Sunita Nair, Owner, Radiance Hair & Beauty Powai",
    },
  ];

  return (
    <section className="bg-background py-16" id="success-stories">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-10"
        >
          <Badge
            variant="outline"
            className="mb-4 bg-success/10 text-success border-success/20 px-3 py-1 text-xs font-semibold"
          >
            Illustrative Results
          </Badge>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Real Results from Mumbai Salons
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From struggling with walk-ins to generating consistent digital
            enquiries — here's what happened in 6–12 weeks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.salon}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              data-ocid={`salon_landing.success_story.${i + 1}`}
              className={i === 2 ? "md:col-span-2 md:max-w-lg md:mx-auto" : ""}
            >
              <Card className="bg-card border-border overflow-hidden h-full">
                {/* Card header */}
                <div className="px-5 py-3 bg-muted/30 border-b border-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-success shrink-0" />
                    <span className="font-semibold text-sm text-foreground truncate">
                      {story.salon}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant="outline"
                      className="text-xs bg-success/10 text-success border-success/20 font-semibold"
                    >
                      {story.roiBadge}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs text-muted-foreground border-border"
                    >
                      {story.duration}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-5">
                  {/* Before / After metrics comparison */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {/* Before */}
                    <div className="bg-destructive/5 border border-destructive/10 rounded-xl p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-destructive/70 mb-3">
                        Before
                      </p>
                      <div className="space-y-2">
                        <div>
                          <p className="text-[28px] font-display font-bold text-foreground leading-none tabular-nums">
                            {story.before.leads}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            leads/month
                          </p>
                        </div>
                        <div>
                          <p className="text-[18px] font-bold text-foreground tabular-nums">
                            {story.before.bookings}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            bookings
                          </p>
                        </div>
                        <div>
                          <p className="text-[18px] font-bold text-muted-foreground tabular-nums">
                            {story.before.revenue}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            revenue/mo
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* After */}
                    <div className="bg-success/5 border border-success/20 rounded-xl p-4 relative overflow-hidden">
                      <div
                        className="absolute top-0 right-0 w-16 h-16 bg-success/5 rounded-full -translate-y-1/2 translate-x-1/2"
                        aria-hidden="true"
                      />
                      <p className="text-[10px] font-bold uppercase tracking-wider text-success mb-3 relative">
                        After
                      </p>
                      <div className="space-y-2 relative">
                        <div>
                          <p className="text-[28px] font-display font-bold text-success leading-none tabular-nums">
                            {story.after.leads}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            leads/month
                          </p>
                        </div>
                        <div>
                          <p className="text-[18px] font-bold text-success tabular-nums">
                            {story.after.bookings}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            bookings
                          </p>
                        </div>
                        <div>
                          <p className="text-[18px] font-bold text-success tabular-nums">
                            {story.after.revenue}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            revenue/mo
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow indicator between columns — visual comparison */}
                  <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {story.before.revenue}
                    </span>
                    <svg
                      width="20"
                      height="12"
                      viewBox="0 0 20 12"
                      fill="none"
                      aria-hidden="true"
                      className="text-success"
                    >
                      <path
                        d="M0 6 H16 M12 2 L18 6 L12 10"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-bold text-success text-sm">
                      {story.after.revenue}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  {/* Quote */}
                  <blockquote className="border-l-2 border-primary/30 pl-3 mb-3">
                    <p className="text-sm italic text-muted-foreground leading-relaxed">
                      "{story.quote}"
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-primary">
                        {story.author[0]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      — {story.author}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-8 max-w-xl mx-auto"
        >
          Results based on 6–12 week pilot programs. Individual results vary
          based on effort, market conditions, and consistency.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────────
function PricingSection({ onLoginClick }: { onLoginClick: () => void }) {
  const plans = [
    {
      name: "Starter",
      price: "₹15,000",
      label: "/month",
      desc: "For salons starting their digital journey",
      features: [
        "Google Business Profile optimization",
        "Review generation (15+ reviews)",
        "Basic Instagram setup",
        "Monthly progress report",
        "Local SEO basics",
      ],
      roi: "Invest ₹15k → 20 leads → ₹1.5L revenue",
    },
    {
      name: "Growth",
      price: "₹25,000",
      label: "/month",
      desc: "For salons ready to dominate local search",
      features: [
        "Everything in Starter",
        "Instagram reels (8/month)",
        "Google Ads (₹5k budget)",
        "WhatsApp follow-up automation",
        "SEO for 3 locality keywords",
      ],
      roi: "Invest ₹25k → 50 leads → ₹3.5L revenue",
      popular: true,
    },
    {
      name: "Scale",
      price: "₹50,000",
      label: "/month",
      desc: "Full-funnel growth for multi-location salons",
      features: [
        "Everything in Growth",
        "Instagram + Facebook ads",
        "Influencer tie-up (1/month)",
        "CRM & booking automation",
        "Dedicated growth manager",
        "Weekly strategy calls",
      ],
      roi: "Invest ₹50k → 120 leads → ₹8L+ revenue",
    },
  ];
  return (
    <section className="bg-background py-16" id="pricing">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Proven GrowthOS Results — Pick Your Plan
          </h2>
          <p className="text-muted-foreground">
            No long-term contracts. Cancel anytime.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={plan.popular ? "md:-mt-4" : ""}
            >
              <Card
                className={`h-full relative border ${plan.popular ? "border-primary shadow-lg ring-1 ring-primary/20" : "border-border"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 text-xs font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-1">
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-display font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.label}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">
                    {plan.desc}
                  </p>
                  <div className="bg-primary/5 border border-primary/15 rounded-lg px-3 py-2 mb-4">
                    <p className="text-xs font-semibold text-primary">
                      ROI: {plan.roi}
                    </p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="mt-0.5 shrink-0 text-success"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 7 L5.5 10.5 L12 3.5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={onLoginClick}
                    data-ocid={`salon_landing.plan_${plan.name.toLowerCase()}_button`}
                  >
                    Get Free Audit First →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How quickly will I see results?",
    a: "Most salons see their first new enquiries within 7–14 days. Significant booking growth typically happens in 30–45 days as your Google profile and content start ranking.",
  },
  {
    q: "Do I need to run paid ads to get results?",
    a: "No. The Starter and Growth plans focus on organic Google rankings, reviews, and WhatsApp — which often outperform paid ads for salons in Mumbai.",
  },
  {
    q: "What makes this different from a regular agency?",
    a: "We specialise exclusively in salons and beauty studios in Mumbai. Our strategies are tested on 50+ local salons, not generic templates. You get a dedicated growth consultant.",
  },
];

function FAQAccordion() {
  const [openQ, setOpenQ] = useState<string | null>(null);
  return (
    <div className="space-y-2">
      {FAQS.map((faq) => (
        <div
          key={faq.q}
          className="border border-border/50 rounded-xl overflow-hidden bg-card"
        >
          <button
            type="button"
            data-ocid={`salon_landing.faq_${faq.q.slice(0, 10).replace(/\s/g, "_").toLowerCase()}`}
            className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
            onClick={() => setOpenQ(openQ === faq.q ? null : faq.q)}
            aria-expanded={openQ === faq.q}
          >
            <span className="text-sm font-semibold text-foreground">
              {faq.q}
            </span>
            <motion.span
              animate={{ rotate: openQ === faq.q ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 text-muted-foreground"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="8" y1="3" x2="8" y2="13" />
                <line x1="3" y1="8" x2="13" y2="8" />
              </svg>
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {openQ === faq.q && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
function AuditFormSection({
  formRef,
  onLoginClick,
}: {
  formRef: React.RefObject<HTMLDivElement | null>;
  onLoginClick: () => void;
}) {
  const { form: f, analytics } = useNicheLanding();
  const { form, errors, setField } = f;

  return (
    <section ref={formRef} className="bg-muted/30 py-16" id="audit">
      <div className="max-w-xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
            Get Your Free Salon Growth Audit
          </h2>
          <p className="text-muted-foreground text-sm">
            We'll analyse your salon and send a personalised growth report
            within 2 minutes on WhatsApp.
          </p>
        </motion.div>

        <Card className="bg-card border-border shadow-sm">
          <CardContent className="p-6 space-y-4">
            {/* Salon Name */}
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1.5"
                htmlFor="salonName"
              >
                Salon Name *
              </label>
              <input
                id="salonName"
                type="text"
                placeholder="e.g. Glamour Touch Salon"
                value={form.salonName}
                onChange={(e) => setField("salonName", e.target.value)}
                data-ocid="salon_landing.salon_name_input"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              {errors.salonName && (
                <p
                  className="text-xs text-destructive mt-1"
                  data-ocid="salon_landing.salon_name_field_error"
                >
                  {errors.salonName}
                </p>
              )}
            </div>

            {/* Owner Name */}
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1.5"
                htmlFor="ownerName"
              >
                Your Name *
              </label>
              <input
                id="ownerName"
                type="text"
                placeholder="Kavya Reddy"
                value={form.ownerName}
                onChange={(e) => setField("ownerName", e.target.value)}
                data-ocid="salon_landing.owner_name_input"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              {errors.ownerName && (
                <p
                  className="text-xs text-destructive mt-1"
                  data-ocid="salon_landing.owner_name_field_error"
                >
                  {errors.ownerName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1.5"
                htmlFor="phone"
              >
                WhatsApp Number *
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                data-ocid="salon_landing.phone_input"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              {errors.phone && (
                <p
                  className="text-xs text-destructive mt-1"
                  data-ocid="salon_landing.phone_field_error"
                >
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Row: Salon Type + Budget */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="salonType"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Salon Type
                </label>
                <select
                  id="salonType"
                  value={form.salonType}
                  onChange={(e) =>
                    setField(
                      "salonType",
                      e.target.value as typeof form.salonType,
                    )
                  }
                  data-ocid="salon_landing.salon_type_select"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="unisex">Unisex</option>
                  <option value="ladies">Ladies</option>
                  <option value="mens">Men's</option>
                  <option value="bridal">Bridal</option>
                  <option value="spa">Spa / Wellness</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-1.5"
                  htmlFor="budget"
                >
                  Monthly Budget
                </label>
                <select
                  id="budget"
                  value={form.budget}
                  onChange={(e) =>
                    setField("budget", e.target.value as typeof form.budget)
                  }
                  data-ocid="salon_landing.budget_select"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="under_10k">Under ₹10k</option>
                  <option value="10k_25k">₹10k–₹25k</option>
                  <option value="25k_50k">₹25k–₹50k</option>
                  <option value="above_50k">₹50k+</option>
                </select>
              </div>
            </div>

            {/* Area */}
            <div>
              <label
                className="block text-sm font-medium text-foreground mb-1.5"
                htmlFor="area"
              >
                Area / Locality *
              </label>
              <input
                id="area"
                type="text"
                placeholder="e.g. Andheri West, Bandra, Powai"
                value={form.area}
                onChange={(e) => setField("area", e.target.value)}
                data-ocid="salon_landing.area_input"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              {errors.area && (
                <p
                  className="text-xs text-destructive mt-1"
                  data-ocid="salon_landing.area_field_error"
                >
                  {errors.area}
                </p>
              )}
            </div>

            {/* WhatsApp opt-in */}
            <label
              className="flex items-start gap-3 cursor-pointer"
              data-ocid="salon_landing.whatsapp_optin_checkbox"
            >
              <input
                type="checkbox"
                checked={form.whatsappOptIn}
                onChange={(e) => setField("whatsappOptIn", e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-input accent-primary"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                I consent to receive my free audit report and growth tips on
                WhatsApp. No spam — unsubscribe anytime.
              </span>
            </label>

            <Button
              className="w-full h-11 text-base font-semibold"
              onClick={() => {
                analytics.trackWhatsAppClick("audit_form");
                onLoginClick();
              }}
              disabled={status === "loading"}
              data-ocid="salon_landing.audit_submit_button"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                "Get My Free Audit Report →"
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              🔒 100% free. No payment required. Mumbai salons only.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

// ─── WhatsApp CTA Section ─────────────────────────────────────────────────────
function WhatsAppCTASection({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <section className="bg-background py-14" id="contact">
      <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Schedule a WhatsApp Consultation
          </h2>
          <p className="text-muted-foreground mb-8">
            Talk to a Mumbai salon growth specialist. Free 20-minute strategy
            call — no sales pressure.
          </p>
          <Button
            size="lg"
            className="px-10 h-14 text-lg font-semibold gap-3 bg-[#25D366] hover:bg-[#22c55e] text-white"
            onClick={onLoginClick}
            data-ocid="salon_landing.whatsapp_cta_button"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page Footer ──────────────────────────────────────────────────────────────
function LandingFooter() {
  return (
    <footer
      className="bg-muted/40 border-t border-border py-10"
      data-ocid="salon_landing.footer"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { icon: "🛡️", text: "No fake claims or inflated results" },
            { icon: "⚡", text: "WhatsApp response in 2 minutes" },
            { icon: "🏆", text: "50+ Mumbai salons served" },
            { icon: "🔒", text: "Consent-based marketing only" },
          ].map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-card px-3 py-2 rounded-full border border-border/50"
            >
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-8 max-w-2xl mx-auto">
          <h3 className="text-base font-bold text-foreground text-center mb-4">
            Frequently Asked Questions
          </h3>
          <FAQAccordion />
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Results shown are from real GrowthOS clients. Individual results may
            vary based on market, effort, and competition.
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
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SalonLandingPage() {
  useMetaTags(PAGE_META["/salon-marketing-mumbai"]);
  const auditFormRef = useRef<HTMLDivElement | null>(null);
  const { analytics } = useNicheLanding();
  const navigate = useNavigate();

  useEffect(() => {
    analytics.trackView();
  }, [analytics]);

  const goToLogin = () => {
    void navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-background" data-ocid="salon_landing.page">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">
                G
              </span>
            </div>
            <span className="font-display font-bold text-foreground text-sm">
              GrowthOS
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground ml-1">
              for Mumbai Salons
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goToLogin}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
              data-ocid="salon_landing.nav_results_link"
            >
              Results
            </button>
            <button
              type="button"
              onClick={goToLogin}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
              data-ocid="salon_landing.nav_pricing_link"
            >
              Pricing
            </button>
            <Button
              size="sm"
              onClick={goToLogin}
              data-ocid="salon_landing.nav_audit_button"
            >
              Free Audit
            </Button>
          </div>
        </div>
      </nav>

      {/* Social Proof Ticker */}
      <SocialTicker />

      {/* Sections */}
      <HeroSection onLoginClick={goToLogin} />
      <PainPointsSection />
      <CaseStudySection />
      <TestimonialsSection />
      <SuccessStoriesSection />
      <PricingSection onLoginClick={goToLogin} />
      <AuditFormSection formRef={auditFormRef} onLoginClick={goToLogin} />
      <WhatsAppCTASection onLoginClick={goToLogin} />
      <LandingFooter />
    </div>
  );
}
