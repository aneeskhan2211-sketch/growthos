import { MetaTags } from "@/components/MetaTags";
import { PAGE_META } from "@/config/metaTags";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "How do leads work?",
    a: "GrowthOS generates qualified business leads based on your selected niche and city. Each lead is scored 0–100 based on digital signals like missing SEO, low reviews, or no social presence. You'll see leads with score above 60. You can send AI-generated pitches directly from the Leads screen.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, you can cancel anytime from Settings → Account → Subscription. Your access continues until the end of the current billing period. We offer a 7-day money-back guarantee for new paid subscribers — contact billing@growthos.app within 7 days of upgrading.",
  },
  {
    q: "How is my data used?",
    a: "Your data is used to personalize your outreach, generate proposals, and improve your lead pipeline. We never sell your personal data to third parties. All data is stored securely. Read our Privacy Policy for full details.",
  },
  {
    q: "What does the AI pitch generator do?",
    a: "The AI pitch generator creates personalised WhatsApp or email messages for each lead based on their business name, city, industry, and detected issues (e.g. 'No Google Business Profile'). It saves hours of manual writing and increases reply rates significantly.",
  },
  {
    q: "How do I delete my account?",
    a: "Go to Settings → App Information → Account Management → Delete Account. You'll be asked to confirm. Once deleted, all your leads, messages, and account data are permanently removed within 30 days. This action cannot be undone.",
  },
  {
    q: "Is my data safe?",
    a: "Yes. GrowthOS uses industry-standard encryption for data in transit and at rest. We never store API keys in plain text. Your outreach credentials are stored server-side and never exposed to the browser. We run regular security audits to keep your data protected.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="text-muted-foreground shrink-0"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      data-ocid={`help.faq.item.${index + 1}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="border border-border/40 rounded-xl overflow-hidden bg-card"
    >
      <button
        type="button"
        data-ocid={`help.faq.toggle.${index + 1}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-muted/20 transition-colors"
      >
        <p className="text-sm font-semibold text-foreground">{item.q}</p>
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border/30">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HelpSupportPage() {
  const navigate = useNavigate();

  return (
    <>
      <MetaTags {...PAGE_META["/help"]} />
      <div data-ocid="help.page" className="min-h-screen bg-background">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border/40 px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            data-ocid="help.back_button"
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
            Help &amp; Support
          </h1>
        </div>

        <div className="mx-auto max-w-[600px] px-4 py-6 space-y-8 pb-12">
          {/* FAQ Section */}
          <section data-ocid="help.faq_section">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Frequently Asked Questions
            </p>
            <div className="space-y-2">
              {FAQS.map((item, i) => (
                <FAQAccordion key={item.q} item={item} index={i} />
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section data-ocid="help.contact_section" className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Still need help?
            </p>

            {/* Owner / Primary Contact Card */}
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-4 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                Platform Owner
              </p>
              <p className="text-sm font-bold text-foreground">
                Anees Chaudhary
              </p>
              <p className="text-xs text-muted-foreground">
                For help, call:{" "}
                <a
                  href="tel:+919324073833"
                  data-ocid="help.owner_phone_link"
                  className="font-semibold text-primary hover:underline"
                >
                  9324073833
                </a>
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border/40 p-4 space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Contact Support
              </p>
              <p className="text-xs text-muted-foreground">
                Our team typically responds within 24 hours on business days.
              </p>

              <a
                href="tel:+919324073833"
                data-ocid="help.call_support_button"
                className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    Call for Help
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Anees Chaudhary — 9324073833
                  </p>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>

              <a
                href="mailto:support@growthos.app"
                data-ocid="help.email_support_button"
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    Email Support
                  </p>
                  <p className="text-xs text-muted-foreground">
                    support@growthos.app
                  </p>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>

              <a
                href="https://wa.me/919324073833"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="help.whatsapp_support_button"
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center shrink-0 group-hover:bg-success/20 transition-colors">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                    className="text-success"
                    role="img"
                    aria-label="WhatsApp"
                  >
                    <title>WhatsApp</title>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    WhatsApp — Anees Chaudhary
                  </p>
                  <p className="text-xs text-muted-foreground">9324073833</p>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </section>

          {/* App Version */}
          <div className="pt-2 border-t border-border/30 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">App Version</p>
            <p className="text-xs font-semibold text-foreground">
              v2.0.0 (2026.05.01)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
