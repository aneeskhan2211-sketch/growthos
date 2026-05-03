import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Check,
  Copy,
  Info,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useCallback, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmailTemplate {
  day: string;
  subject: string;
  body: string;
}

interface WhatsAppTemplate {
  message: string;
  label: string;
  sendDay: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    day: "Day 0 — Send immediately",
    subject: "Your first leads are ready",
    body: "Hi [Name],\n\nStart by contacting 5 leads today.\n\nQuick replies increase your chances of conversion. The leads are ready — your first step is to reach out.\n\nGo to your GrowthOS dashboard and pick the top 5 leads with the highest score.\n\n[Your name]",
  },
  {
    day: "Day 1",
    subject: "Don't miss these enquiries",
    body: 'Hi [Name],\n\nMost bookings happen after a follow-up.\n\nCheck your pending leads and send a quick message today. Even a short "Are you still interested?" can bring a reply.\n\n[Your name]',
  },
  {
    day: "Day 2",
    subject: "Simple way to get more enquiries",
    body: "Hi [Name],\n\nPost one reel or run a small local ad today.\n\nEven ₹200/day can bring enquiries. Focus on your city and your service. Keep it simple and real.\n\n[Your name]",
  },
  {
    day: "Day 3",
    subject: "Ready to scale?",
    body: "Hi [Name],\n\nIf you want faster results, upgrade to automate follow-ups and track conversions.\n\nThe Growth plan (₹299/month) handles auto follow-ups, CRM pipeline, and simple reports so you spend less time on manual work.\n\n[Your name]",
  },
];

const WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    label: "Message 1",
    sendDay: "Send on Day 0",
    message:
      "Hi 👋 your leads are ready. Start by contacting 5 businesses today.",
  },
  {
    label: "Message 2",
    sendDay: "Send on Day 1",
    message: "Tip: Reply fast. Many customers choose the first responder.",
  },
  {
    label: "Message 3",
    sendDay: "Send on Day 2",
    message: "Follow up with leads who didn't reply yesterday. It works.",
  },
  {
    label: "Message 4",
    sendDay: "Send on Day 3",
    message:
      "If you want, I can suggest a simple growth plan for your business. Just reply 'Yes'.",
  },
];

const TIPS = [
  "Reply within 2 minutes when you can — speed wins enquiries.",
  "Personalize: replace [Name] with your lead's actual name.",
  "Space messages 1–2 days apart — don't send all at once.",
  "Only message WhatsApp contacts who have opted in.",
];

// ─── Copy Hook ────────────────────────────────────────────────────────────────

function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  }, []);

  const isCopied = (key: string) => copiedKey === key;

  return { copy, isCopied };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyBtn({
  label,
  copiedLabel = "Copied!",
  copied,
  onClick,
  ocid,
}: {
  label: string;
  copiedLabel?: string;
  copied: boolean;
  onClick: () => void;
  ocid: string;
}) {
  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(
        "h-7 px-2.5 text-xs gap-1.5 transition-colors",
        copied && "border-success text-success hover:text-success",
      )}
      onClick={onClick}
      data-ocid={ocid}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? copiedLabel : label}
    </Button>
  );
}

function EmailCard({
  template,
  index,
}: { template: EmailTemplate; index: number }) {
  const { copy, isCopied } = useCopy();
  const full = `Subject: ${template.subject}\n\n${template.body}`;

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 space-y-4"
      data-ocid={`email_sequence.item.${index + 1}`}
    >
      {/* Header row */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant="outline"
          className="text-xs font-semibold bg-primary/8 text-primary border-primary/20"
        >
          {template.day}
        </Badge>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Subject:
        </p>
        <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 border border-border px-3 py-2.5">
          <span className="text-sm font-medium text-foreground flex-1 min-w-0 break-words">
            {template.subject}
          </span>
          <CopyBtn
            label="Copy subject"
            copied={isCopied(`email-${index}-subject`)}
            onClick={() => copy(template.subject, `email-${index}-subject`)}
            ocid={`email_sequence.item.${index + 1}.copy_subject_button`}
          />
        </div>
      </div>

      {/* Body */}
      <div className="space-y-1.5">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Body:
        </p>
        <div className="rounded-lg bg-muted/40 border border-border px-3 py-3">
          <pre className="text-sm text-foreground font-sans leading-relaxed whitespace-pre-wrap break-words">
            {template.body}
          </pre>
        </div>
      </div>

      {/* Copy actions */}
      <div className="flex flex-wrap gap-2 pt-1">
        <CopyBtn
          label="Copy body"
          copied={isCopied(`email-${index}-body`)}
          onClick={() => copy(template.body, `email-${index}-body`)}
          ocid={`email_sequence.item.${index + 1}.copy_body_button`}
        />
        <CopyBtn
          label="Copy full email"
          copied={isCopied(`email-${index}-full`)}
          onClick={() => copy(full, `email-${index}-full`)}
          ocid={`email_sequence.item.${index + 1}.copy_full_button`}
        />
      </div>
    </div>
  );
}

function WhatsAppCard({
  template,
  index,
}: { template: WhatsAppTemplate; index: number }) {
  const { copy, isCopied } = useCopy();

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 space-y-3"
      data-ocid={`whatsapp_sequence.item.${index + 1}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant="outline"
          className="text-xs font-semibold bg-muted/60 text-foreground border-border"
        >
          {template.label}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {template.sendDay}
        </span>
      </div>

      {/* Chat bubble */}
      <div className="flex justify-start">
        <div className="bg-[oklch(0.93_0.07_145/0.18)] border border-[oklch(0.60_0.15_145/0.25)] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]">
          <p className="text-sm text-foreground leading-relaxed">
            {template.message}
          </p>
        </div>
      </div>

      {/* Copy */}
      <div className="pt-1">
        <CopyBtn
          label="Copy message"
          copied={isCopied(`wa-${index}`)}
          onClick={() => copy(template.message, `wa-${index}`)}
          ocid={`whatsapp_sequence.item.${index + 1}.copy_button`}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OnboardingSequencesPage() {
  useMetaTags(PAGE_META["/onboarding-sequences"]);
  return (
    <div
      className="max-w-3xl mx-auto px-4 py-8 space-y-10"
      data-ocid="onboarding_sequences.page"
    >
      {/* Page header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground tracking-tight">
              Onboarding Sequences
            </h1>
          </div>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
          Copy these templates and send them to your leads. Goal: get your first
          booking within 72 hours.
        </p>

        {/* Info badge */}
        <div
          className="flex items-start gap-2.5 bg-amber-500/8 border border-amber-500/25 rounded-lg px-3.5 py-3"
          data-ocid="onboarding_sequences.email_disabled_notice"
        >
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            Email sending is not available in-app. Copy templates and send via
            your own email or WhatsApp.
          </p>
        </div>
      </div>

      {/* ── Section 1: Email Sequence ── */}
      <section data-ocid="onboarding_sequences.email_section">
        <div className="mb-5 space-y-1">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <h2 className="text-base font-display font-semibold text-foreground">
              Email Sequence (Day 0–3)
            </h2>
          </div>
          <p className="text-sm text-muted-foreground pl-6">
            Use these subject lines and body copy. Personalize with your lead's
            name and business.
          </p>
        </div>

        <div className="space-y-4">
          {EMAIL_TEMPLATES.map((template, i) => (
            <EmailCard key={template.day} template={template} index={i} />
          ))}
        </div>
      </section>

      {/* ── Section 2: WhatsApp Sequence ── */}
      <section data-ocid="onboarding_sequences.whatsapp_section">
        <div className="mb-5 space-y-1">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-[oklch(0.60_0.18_145)] shrink-0" />
            <h2 className="text-base font-display font-semibold text-foreground">
              WhatsApp Sequence (Opt-in only)
            </h2>
          </div>
          <p className="text-sm text-muted-foreground pl-6">
            Only send to contacts who have opted in to receive messages from
            you. Space messages 1–2 days apart.
          </p>
        </div>

        <div className="space-y-4">
          {WHATSAPP_TEMPLATES.map((template, i) => (
            <WhatsAppCard key={template.label} template={template} index={i} />
          ))}
        </div>
      </section>

      {/* ── Section 3: Tips ── */}
      <section
        className="bg-muted/40 border border-border rounded-xl p-5 space-y-3"
        data-ocid="onboarding_sequences.tips_section"
      >
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-primary shrink-0" />
          <h2 className="text-sm font-display font-semibold text-foreground">
            Tips &amp; Best Practices
          </h2>
        </div>
        <ul className="space-y-2">
          {TIPS.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1.5" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground/70 border-t border-border pt-4 leading-relaxed">
        These are templates to guide your outreach. Results depend on your
        location, offer, and follow-up speed. Always get consent before
        messaging contacts on WhatsApp.
      </p>
    </div>
  );
}
