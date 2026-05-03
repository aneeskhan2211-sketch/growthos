import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Link2,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { generateShareUrl, usePublicCaseStudy } from "../hooks/useCaseStudies";

export default function PublicCaseStudyPage() {
  const { shareToken } = useParams({ strict: false }) as { shareToken: string };
  const { data: study, isLoading } = usePublicCaseStudy(shareToken ?? "");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success("Link copied!"));
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center h-screen bg-background"
        data-ocid="public_case_study.loading_state"
      >
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!study) {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen bg-background gap-4 px-6"
        data-ocid="public_case_study.error_state"
      >
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
          <TrendingUp className="w-7 h-7 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground">
            Case study not found
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            This link may have expired or been removed.
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
          data-ocid="public_case_study.home_button"
        >
          Go to GrowthOS
        </Button>
      </div>
    );
  }

  const url = study.shareToken
    ? generateShareUrl(study.shareToken)
    : window.location.href;
  const whatsappMsg = encodeURIComponent(
    `Check out this growth story: ${study.title}\n${url}`,
  );

  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="public_case_study.page"
    >
      {/* Top gradient hero */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border">
        <div className="max-w-2xl mx-auto px-5 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            {/* Branding pill */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Powered by GrowthOS
              </div>
              <Badge variant="outline" className="text-xs">
                {study.niche} · {study.city}
              </Badge>
            </div>

            <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
              {study.title}
            </h1>
            <p className="text-muted-foreground text-sm">{study.clientName}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 py-8 space-y-8">
        {/* Metrics grid */}
        {study.metrics && study.metrics.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Results
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {study.metrics.map((m) => (
                <Card
                  key={m.label}
                  className="p-4 text-center bg-card border-border"
                  data-ocid="public_case_study.metric_card"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    {m.label}
                  </p>
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-sm text-muted-foreground line-through decoration-1">
                      {m.before}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    <span className="text-base font-bold text-primary">
                      {m.after}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            <Card className="p-5 bg-muted/30">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Before
              </p>
              <p className="text-xl font-bold text-foreground">
                {study.beforeMetric}
              </p>
            </Card>
            <Card className="p-5 bg-primary/5 border-primary/20">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                After
              </p>
              <p className="text-xl font-bold text-foreground">
                {study.afterMetric}
              </p>
            </Card>
          </motion.div>
        )}

        {/* Result badges */}
        {study.results.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {study.results.map((r) => (
              <Badge
                key={r.label}
                variant="outline"
                className={
                  r.positive
                    ? "text-success border-success/30 bg-success/5"
                    : "text-destructive border-destructive/30"
                }
              >
                {r.positive ? <CheckCircle2 className="w-3 h-3 mr-1" /> : null}
                {r.label}: {r.value}
              </Badge>
            ))}
          </div>
        )}

        <Separator />

        {/* Challenge & Solution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-5"
        >
          {study.challenge && (
            <div>
              <h2 className="font-semibold text-foreground mb-2">
                The Challenge
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {study.challenge}
              </p>
            </div>
          )}

          {/* Actions taken */}
          {study.actionsTaken &&
            study.actionsTaken.filter(Boolean).length > 0 && (
              <div>
                <h2 className="font-semibold text-foreground mb-3">
                  What We Did
                </h2>
                <ul className="space-y-2">
                  {study.actionsTaken.filter(Boolean).map((action) => (
                    <li
                      key={action}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {study.solution && (
            <div>
              <h2 className="font-semibold text-foreground mb-2">
                The Solution
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {study.solution}
              </p>
            </div>
          )}
        </motion.div>

        {/* Testimonial */}
        {study.testimonial && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="p-5 border-l-4 border-l-primary bg-primary/5">
              <p className="text-foreground italic text-sm leading-relaxed">
                "{study.testimonial}"
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                — {study.clientName}
              </p>
            </Card>
          </motion.div>
        )}

        <Separator />

        {/* Share row */}
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={handleCopy}
            data-ocid="public_case_study.copy_link_button"
          >
            <Link2 className="w-4 h-4" /> Copy Link
          </Button>
          <Button
            type="button"
            variant="outline"
            className="gap-2 text-[#25D366] border-[#25D366]/30 hover:bg-[#25D366]/5"
            onClick={() =>
              window.open(`https://wa.me/?text=${whatsappMsg}`, "_blank")
            }
            data-ocid="public_case_study.share_whatsapp_button"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </Button>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card
            className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 text-center space-y-3"
            data-ocid="public_case_study.cta_card"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mx-auto">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Get similar results for your business
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                GrowthOS helps {study.niche.toLowerCase()} businesses in India
                generate steady enquiries and convert them to bookings.
              </p>
            </div>
            <Button
              type="button"
              className="gap-2"
              onClick={() => {
                window.location.href = "/login";
              }}
              data-ocid="public_case_study.cta_button"
            >
              Start Free Today <ChevronRight className="w-4 h-4" />
            </Button>
            <p className="text-xs text-muted-foreground">
              Results depend on execution, location, and offer.{" "}
              <a
                href="/login"
                className="text-primary underline-offset-2 hover:underline"
              >
                Login to explore
              </a>
            </p>
          </Card>
        </motion.div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pb-4">
          Built with GrowthOS · Client acquisition platform for local businesses
        </p>
      </div>
    </div>
  );
}
