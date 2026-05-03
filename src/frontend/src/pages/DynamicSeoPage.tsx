import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useGetSeoPage } from "../hooks/useBulkSeoGenerator";

const NICHE_PAIN_POINTS: Record<string, string[]> = {
  Salon: [
    "Irregular walk-ins with no predictable revenue",
    "Losing customers to competitors without follow-ups",
    "Not appearing in 'near me' searches on Google",
    "No system to convert enquiries into bookings",
  ],
  Gym: [
    "Low trial sign-up conversion from local traffic",
    "Members not renewing without timely reminders",
    "Weak Google Business Profile visibility",
    "No digital lead capture system",
  ],
  Clinic: [
    "Patients choosing competitors due to poor online presence",
    "No appointment reminder system increasing no-shows",
    "Missing from local healthcare search results",
    "Slow response to appointment enquiries",
  ],
  Restaurant: [
    "Low footfall on weekdays and off-peak hours",
    "No loyalty system to bring customers back",
    "Poor visibility on Google Maps and Zomato",
    "No WhatsApp marketing for offers and events",
  ],
  "Real Estate": [
    "High competition with no differentiator online",
    "Slow lead response losing potential buyers",
    "No CRM to track hot vs cold prospects",
    "Missing targeted ads for your property types",
  ],
  Coaching: [
    "Low enquiry-to-enrollment conversion rate",
    "No automated follow-up for interested students",
    "Weak social proof with few visible reviews",
    "Not ranking for local coaching search terms",
  ],
};

const NICHE_BENEFITS: Record<string, string[]> = {
  Salon: [
    "30-70 new client enquiries/month",
    "Google Reviews strategy",
    "WhatsApp follow-up automation",
    "Local SEO for your area",
  ],
  Gym: [
    "Consistent trial sign-up flow",
    "Member retention reminders",
    "Local keyword ranking",
    "Paid ad campaigns",
  ],
  Clinic: [
    "Patient appointment funnel",
    "Google Business optimization",
    "Review generation system",
    "WhatsApp appointment booking",
  ],
  Restaurant: [
    "Table booking via WhatsApp",
    "Google Maps visibility",
    "Offer campaigns to regulars",
    "Local social media strategy",
  ],
  "Real Estate": [
    "Targeted buyer/seller ads",
    "Lead scoring & CRM",
    "High-quality landing pages",
    "Retargeting campaigns",
  ],
  Coaching: [
    "Student enquiry funnel",
    "Demo class follow-up sequence",
    "Google & YouTube visibility",
    "Testimonial campaigns",
  ],
};

const DEFAULT_PAIN_POINTS = [
  "Low online visibility affecting daily enquiries",
  "No system to capture and follow up on leads",
  "Missing from local Google search results",
  "Losing customers to digitally-active competitors",
];

const DEFAULT_BENEFITS = [
  "Daily enquiry generation",
  "Follow-up automation",
  "Google visibility boost",
  "WhatsApp outreach",
];

function PageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <Skeleton className="h-8 w-32 rounded-full mx-auto" />
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-6 w-1/2 mx-auto" />
      <div className="grid grid-cols-2 gap-4">
        {["a", "b", "c", "d"].map((k) => (
          <Skeleton key={k} className="h-24 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export default function DynamicSeoPage() {
  const params = useParams({ strict: false }) as { slug?: string };
  const slug = params.slug ?? "";
  const navigate = useNavigate();
  const { data: page, isLoading } = useGetSeoPage(slug);

  const onCTA = () => navigate({ to: "/login" });

  if (isLoading) return <PageSkeleton />;

  if (!page) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen text-center px-4"
        data-ocid="seo_page.empty_state"
      >
        <p className="text-6xl mb-4">404</p>
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          This SEO page does not exist or has not been published yet.
        </p>
        <Button
          type="button"
          onClick={() => navigate({ to: "/" })}
          data-ocid="seo_page.home_link"
        >
          View Our Homepage
        </Button>
      </div>
    );
  }

  const painPoints = NICHE_PAIN_POINTS[page.niche] ?? DEFAULT_PAIN_POINTS;
  const benefits = NICHE_BENEFITS[page.niche] ?? DEFAULT_BENEFITS;

  return (
    <div className="min-h-screen bg-background" data-ocid="seo_page.page">
      {/* Sticky mobile CTA */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-card border-t border-border p-3 shadow-lg"
        data-ocid="seo_page.sticky_cta"
      >
        <Button
          className="w-full h-12 text-base font-semibold"
          onClick={onCTA}
          data-ocid="seo_page.mobile_cta_button"
        >
          Get Free Growth Audit
        </Button>
      </div>

      {/* Navbar */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="font-display font-bold text-lg text-foreground hover:text-primary transition-colors"
          >
            Growth<span className="text-primary">OS</span>
          </button>
          <Button
            type="button"
            size="sm"
            onClick={onCTA}
            data-ocid="seo_page.nav_cta_button"
          >
            Get Free Audit
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-background overflow-hidden py-14 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              className="mb-5 bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-semibold"
              variant="outline"
            >
              {page.niche} Growth System &bull; {page.city}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground leading-tight mb-5">
              {page.h1}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {page.metaDescription}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={onCTA}
                className="w-full sm:w-auto px-8 h-12 text-base font-semibold shadow-lg"
                data-ocid="seo_page.hero_cta_button"
              >
                Get Free Growth Audit
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onCTA}
                className="w-full sm:w-auto px-8 h-12 text-base"
                data-ocid="seo_page.hero_secondary_button"
              >
                See How It Works
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Built on industry-standard tools and real workflows
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pain points */}
      <section className="bg-muted/30 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Common challenges for {page.niche}s in {page.city}
            </h2>
            <p className="text-muted-foreground">
              These growth blockers affect most local businesses.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {painPoints.map((point, i) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="bg-card border-border h-full">
                  <CardContent className="p-5 flex gap-3 items-start">
                    <span className="text-xl shrink-0 mt-0.5">
                      &#x26A0;&#xFE0F;
                    </span>
                    <p className="text-sm text-foreground">{point}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-14">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              What you get with GrowthOS
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                data-ocid={`seo_page.benefit.${i + 1}`}
              >
                <Card className="bg-card border-border h-full">
                  <CardContent className="p-5 flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5 5L4 7.5L8.5 2.5"
                          stroke="oklch(var(--success) / 1)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      {benefit}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case example */}
      <section className="bg-muted/30 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-3">
              Real Example
            </h2>
          </motion.div>
          <Card className="overflow-hidden" data-ocid="seo_page.case_study">
            <div className="bg-primary/5 border-b border-border px-5 py-3 flex items-center justify-between">
              <span className="font-semibold text-sm text-foreground">
                {page.niche} Business, {page.city}
              </span>
              <Badge
                variant="outline"
                className="text-xs bg-success/10 text-success border-success/20"
              >
                45 days
              </Badge>
            </div>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-destructive/5 border border-destructive/10 rounded-xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-destructive/70 mb-2">
                    Before
                  </p>
                  <p className="text-lg font-bold text-foreground">
                    8 leads/month
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Irregular walk-ins only
                  </p>
                </div>
                <div className="bg-success/5 border border-success/20 rounded-xl p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-success mb-2">
                    After
                  </p>
                  <p className="text-lg font-bold text-success">
                    45 leads/month
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Consistent digital enquiries
                  </p>
                </div>
              </div>
              <blockquote className="border-l-2 border-primary/30 pl-3 text-sm italic text-muted-foreground">
                &ldquo;Within 6 weeks we started getting daily WhatsApp
                enquiries from Google. The follow-up system alone recovered
                bookings we would have lost.&rdquo;
              </blockquote>
              <p className="text-xs text-muted-foreground mt-3">
                * Illustrative results. Individual outcomes vary based on
                effort, market, and consistency.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing hint */}
      <section className="bg-background py-14" id="pricing">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Simple, outcome-focused plans
            </h2>
            <p className="text-muted-foreground text-sm">
              Start free. Upgrade when you want faster results.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                name: "Free",
                price: "0",
                desc: "10 leads/day, manual outreach",
                highlight: false,
              },
              {
                name: "Growth",
                price: "299",
                desc: "150 leads/day, auto follow-ups, CRM",
                highlight: true,
              },
              {
                name: "Pro",
                price: "999",
                desc: "500 leads/day, proposals, advanced tracking",
                highlight: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                data-ocid={`seo_page.pricing_${plan.name.toLowerCase()}`}
              >
                <Card
                  className={`h-full border ${
                    plan.highlight
                      ? "border-primary ring-1 ring-primary/20 shadow-md"
                      : "border-border"
                  }`}
                >
                  <CardContent className="p-5">
                    {plan.highlight && (
                      <Badge className="mb-3 bg-primary text-primary-foreground text-xs">
                        Most Popular
                      </Badge>
                    )}
                    <p className="text-xs font-semibold text-muted-foreground">
                      {plan.name}
                    </p>
                    <p className="text-2xl font-display font-bold text-foreground my-1">
                      {plan.price === "0" ? "Free" : `₹${plan.price}`}
                      {plan.price !== "0" && (
                        <span className="text-sm font-normal text-muted-foreground">
                          /mo
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {plan.desc}
                    </p>
                    <Button
                      className="w-full"
                      variant={plan.highlight ? "default" : "outline"}
                      onClick={onCTA}
                      data-ocid={`seo_page.plan_${plan.name.toLowerCase()}_button`}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Even 1 new customer can cover your monthly plan cost.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-muted/30 py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Ready to get more {page.niche.toLowerCase()} enquiries in{" "}
              {page.city}?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start free. No card required. Results depend on execution and
              market conditions.
            </p>
            <Button
              size="lg"
              className="px-10 h-12 text-base font-semibold"
              onClick={onCTA}
              data-ocid="seo_page.final_cta_button"
            >
              Start Free Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-card border-t border-border py-8"
        data-ocid="seo_page.footer"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Results shown are illustrative. Individual results vary based on
            market, effort, and competition.
          </p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GrowthOS. Built with love using{" "}
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

      {/* Mobile CTA spacer */}
      <div className="h-20 md:hidden" aria-hidden="true" />
    </div>
  );
}
