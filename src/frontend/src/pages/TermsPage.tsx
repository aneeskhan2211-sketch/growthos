import { MetaTags } from "@/components/MetaTags";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

interface TermsSectionProps {
  title: string;
  children: React.ReactNode;
}

function TermsSection({ title, children }: TermsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-2"
    >
      <h2 className="text-base font-display font-semibold text-foreground">
        {title}
      </h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </motion.section>
  );
}

export default function TermsPage() {
  const navigate = useNavigate();
  useMetaTags(PAGE_META["/terms"]);

  return (
    <div data-ocid="terms.page" className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border/40 px-4 py-3 flex items-center gap-3">
        <button
          type="button"
          data-ocid="terms.back_button"
          onClick={() => navigate({ to: "/settings" })}
          className="p-1.5 rounded-lg hover:bg-muted/40 transition-colors text-foreground -ml-1"
          aria-label="Go back"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-base font-display font-bold text-foreground">
          Terms of Service
        </h1>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[600px] px-4 py-6 space-y-6 pb-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-3 pb-2 border-b border-border/30"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.22 253), oklch(0.72 0.18 285))",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">GrowthOS</p>
            <p className="text-xs text-muted-foreground">
              Last updated: May 2026
            </p>
          </div>
        </motion.div>

        <TermsSection title="1. Acceptance of Terms">
          <p>
            By accessing or using GrowthOS ("the Service"), you agree to be
            bound by these Terms of Service. If you do not agree to these terms,
            please do not use the Service.
          </p>
          <p>
            These terms apply to all users including free plan users, trial
            users, and paid subscribers.
          </p>
        </TermsSection>

        <TermsSection title="2. Use of Service">
          <p>
            GrowthOS provides tools for lead generation, outreach management,
            and digital marketing automation. You may use the Service only for
            lawful business purposes and in accordance with these terms.
          </p>
          <p>
            You are responsible for all activity that occurs under your account
            and for maintaining the confidentiality of your login credentials.
          </p>
        </TermsSection>

        <TermsSection title="3. Subscription Plans">
          <p>
            GrowthOS offers multiple subscription tiers. Paid plans are billed
            monthly or annually. You may upgrade or downgrade your plan at any
            time; changes take effect at the start of the next billing cycle.
          </p>
          <p>
            Lead credits allocated to a billing period do not roll over to the
            next period unless otherwise stated in your plan.
          </p>
        </TermsSection>

        <TermsSection title="4. Refund Policy">
          <p>
            We offer a 7-day money-back guarantee on new paid subscriptions. If
            you are not satisfied within the first 7 days, contact us at{" "}
            <a
              href="mailto:billing@growthos.app"
              className="text-primary hover:underline"
            >
              billing@growthos.app
            </a>{" "}
            or call{" "}
            <a
              href="tel:+919324073833"
              className="text-primary hover:underline"
            >
              Anees Chaudhary — 9324073833
            </a>{" "}
            for a full refund.
          </p>
          <p>
            Refunds are not provided for subsequent billing periods or for
            unused lead credits beyond the initial 7-day window.
          </p>
        </TermsSection>

        <TermsSection title="5. Prohibited Uses">
          <p>You agree not to use GrowthOS to:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Send unsolicited spam messages or violate anti-spam laws</li>
            <li>Collect data from prospects without legal basis or consent</li>
            <li>Impersonate any person, brand, or entity</li>
            <li>Attempt to reverse-engineer, hack, or disrupt the Service</li>
            <li>
              Violate any applicable local, national, or international law
            </li>
          </ul>
          <p>
            Violation of these terms may result in immediate account suspension
            without refund.
          </p>
        </TermsSection>

        <TermsSection title="6. Termination">
          <p>
            You may cancel your account at any time from Settings. We may
            terminate or suspend your account if you violate these terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately
            cease and your data will be handled as per our Privacy Policy.
          </p>
        </TermsSection>

        <TermsSection title="7. Limitation of Liability">
          <p>
            GrowthOS is provided "as is" without warranties of any kind. To the
            fullest extent permitted by law, we shall not be liable for any
            indirect, incidental, or consequential damages arising from your use
            of the Service.
          </p>
          <p>
            Our total liability to you shall not exceed the amount you paid for
            the Service in the 12 months prior to the claim.
          </p>
        </TermsSection>

        <TermsSection title="8. Governing Law">
          <p>
            These Terms are governed by the laws of India. Any disputes arising
            from these Terms shall be subject to the exclusive jurisdiction of
            the courts in Mumbai, Maharashtra, India.
          </p>
          <p>
            We encourage resolving disputes informally first. Contact us at{" "}
            <a
              href="mailto:legal@growthos.app"
              className="text-primary hover:underline"
            >
              legal@growthos.app
            </a>
          </p>
        </TermsSection>

        <div className="pt-4 border-t border-border/30 space-y-3">
          <div className="p-3 rounded-xl bg-muted/30 border border-border/40 space-y-1">
            <p className="text-xs font-semibold text-foreground">
              Support Contact
            </p>
            <p className="text-xs text-muted-foreground">
              Owner: Anees Chaudhary &nbsp;·&nbsp;{" "}
              <a
                href="tel:+919324073833"
                data-ocid="terms.support_phone_link"
                className="text-primary font-semibold hover:underline"
              >
                Phone: 9324073833
              </a>
            </p>
          </div>
          <p className="text-xs text-muted-foreground/70 text-center">
            © {new Date().getFullYear()} GrowthOS. All rights reserved. · Last
            updated: May 2026
          </p>
        </div>
      </div>
    </div>
  );
}
