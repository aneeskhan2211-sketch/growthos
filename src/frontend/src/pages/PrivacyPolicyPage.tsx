import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

interface PolicySectionProps {
  title: string;
  children: React.ReactNode;
}

function PolicySection({ title, children }: PolicySectionProps) {
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

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();
  useMetaTags(PAGE_META["/privacy-policy"]);

  return (
    <div data-ocid="privacy-policy.page" className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border/40 px-4 py-3 flex items-center gap-3">
        <button
          type="button"
          data-ocid="privacy-policy.back_button"
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
          Privacy Policy
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">GrowthOS</p>
            <p className="text-xs text-muted-foreground">
              Last updated: May 2026
            </p>
          </div>
        </motion.div>

        <PolicySection title="1. Data Collection">
          <p>
            GrowthOS collects information you provide directly to us, including
            your name, email address, phone number, business details, and usage
            preferences when you create an account or use our services.
          </p>
          <p>
            We also collect usage data automatically, such as pages visited,
            features used, time spent in the app, and device information to
            improve the platform experience.
          </p>
        </PolicySection>

        <PolicySection title="2. How We Use Your Data">
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Provide, maintain, and improve our services</li>
            <li>Generate leads and outreach content on your behalf</li>
            <li>Send important service notifications and updates</li>
            <li>Process subscription payments and manage your account</li>
            <li>Analyse platform usage to enhance features and fix issues</li>
            <li>Comply with legal obligations</li>
          </ul>
        </PolicySection>

        <PolicySection title="3. Data Sharing">
          <p>
            We do not sell your personal information. We may share your data
            with:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>
              <strong className="text-foreground">Service providers</strong> —
              third parties that help us operate the platform (e.g. payment
              processors, hosting)
            </li>
            <li>
              <strong className="text-foreground">Legal requirements</strong> —
              if required by law, court order, or government authority
            </li>
            <li>
              <strong className="text-foreground">Business transfers</strong> —
              in the event of a merger, acquisition, or sale of assets
            </li>
          </ul>
          <p>
            All third-party partners are contractually required to protect your
            data.
          </p>
        </PolicySection>

        <PolicySection title="4. Data Retention">
          <p>
            We retain your account data for as long as your account is active.
            If you delete your account, we will delete or anonymise your
            personal data within 30 days, except where retention is required by
            law.
          </p>
          <p>
            Lead data and outreach history you generate within GrowthOS is
            retained for the duration of your subscription and 90 days
            thereafter.
          </p>
        </PolicySection>

        <PolicySection title="5. Your Rights">
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Access and download a copy of your personal data</li>
            <li>Correct inaccurate information in your account</li>
            <li>Request deletion of your data (right to be forgotten)</li>
            <li>Restrict or object to certain processing activities</li>
            <li>
              Withdraw consent at any time where processing is based on consent
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{" "}
            <a
              href="mailto:privacy@growthos.app"
              className="text-primary hover:underline"
            >
              privacy@growthos.app
            </a>{" "}
            or call{" "}
            <a
              href="tel:+919324073833"
              className="text-primary hover:underline"
            >
              Anees Chaudhary — 9324073833
            </a>
          </p>
        </PolicySection>

        <PolicySection title="6. Security">
          <p>
            We use industry-standard encryption, secure servers, and access
            controls to protect your data. However, no method of transmission
            over the internet is 100% secure. We will notify you promptly if a
            data breach affecting your information occurs.
          </p>
        </PolicySection>

        <PolicySection title="7. Contact Us">
          <p>
            If you have questions about this Privacy Policy, please contact our
            data protection team:
          </p>
          <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-border/40 space-y-1">
            <p>
              <strong className="text-foreground">Owner:</strong> Anees
              Chaudhary
            </p>
            <p>
              <strong className="text-foreground">Phone:</strong>{" "}
              <a
                href="tel:+919324073833"
                data-ocid="privacy-policy.contact_phone_link"
                className="text-primary hover:underline font-semibold"
              >
                9324073833
              </a>
            </p>
            <p>
              <strong className="text-foreground">Email:</strong>{" "}
              <a
                href="mailto:privacy@growthos.app"
                className="text-primary hover:underline"
              >
                privacy@growthos.app
              </a>
            </p>
            <p>
              <strong className="text-foreground">Address:</strong> GrowthOS,
              Mumbai, Maharashtra, India
            </p>
          </div>
        </PolicySection>

        <div className="pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground/70 text-center">
            © {new Date().getFullYear()} GrowthOS. All rights reserved. · Last
            updated: May 2026
          </p>
        </div>
      </div>
    </div>
  );
}
