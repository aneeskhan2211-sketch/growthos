import { useCallback, useRef, useState } from "react";
import { selectAuditLeads, useGrowthStore } from "../store/useGrowthStore";
import type {
  AuditFormInput,
  AuditLead,
  NicheLandingEvent,
} from "../types/viralLoop";

// ─── Event Tracking ───────────────────────────────────────────────────────────

type TrackingStore = {
  events: Array<{
    event: NicheLandingEvent;
    ts: number;
    meta?: Record<string, string>;
  }>;
};

const trackingStore: TrackingStore = { events: [] };

function trackEvent(event: NicheLandingEvent, meta?: Record<string, string>) {
  trackingStore.events.push({ event, ts: Date.now(), meta });
  // In production: forward to analytics pipeline
  if (process.env.NODE_ENV === "development") {
    console.debug(`[NicheLanding] ${event}`, meta ?? "");
  }
}

// ─── Audit Form Hook ──────────────────────────────────────────────────────────

type FormErrors = Partial<Record<keyof AuditFormInput, string>>;

const INITIAL_FORM: AuditFormInput = {
  salonName: "",
  ownerName: "",
  phone: "",
  salonType: "unisex",
  budget: "10k_25k",
  area: "",
  whatsappOptIn: true,
};

export function useAuditForm() {
  const addAuditLead = useGrowthStore((s) => s.addAuditLead);
  const [form, setForm] = useState<AuditFormInput>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submittedLead, setSubmittedLead] = useState<AuditLead | null>(null);

  const setField = useCallback(
    <K extends keyof AuditFormInput>(key: K, value: AuditFormInput[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      // Clear error on change
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [errors],
  );

  const validate = useCallback((): boolean => {
    const next: FormErrors = {};
    if (!form.salonName.trim()) next.salonName = "Salon name is required";
    if (!form.ownerName.trim()) next.ownerName = "Your name is required";
    if (!form.phone.trim()) {
      next.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone.trim())) {
      next.phone = "Enter a valid phone number";
    }
    if (!form.area.trim()) next.area = "Area / locality is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [form]);

  const submit = useCallback(async () => {
    if (!validate()) return;
    setStatus("loading");
    trackEvent("form_submit", {
      salonType: form.salonType,
      budget: form.budget,
    });

    // Simulate async submission (backend integration point)
    await new Promise<void>((resolve) => setTimeout(resolve, 1200));

    const lead: AuditLead = {
      id: `al-${Date.now()}`,
      salonName: form.salonName.trim(),
      ownerName: form.ownerName.trim(),
      phone: form.phone.trim(),
      salonType: form.salonType,
      budget: form.budget,
      city: "Mumbai",
      area: form.area.trim(),
      painPoints: [],
      submittedAt: new Date(),
      whatsappOptIn: form.whatsappOptIn,
      status: "new",
    };

    addAuditLead(lead);
    setSubmittedLead(lead);
    setStatus("success");
    trackEvent("audit_sent", { leadId: lead.id });

    // If WhatsApp opt-in, open WhatsApp with pre-filled greeting
    if (form.whatsappOptIn) {
      const msg = encodeURIComponent(
        `Hi ${form.ownerName}! Thanks for requesting your Free Salon Growth Audit. We'll analyse ${form.salonName} in ${form.area} and send you a personalised growth report within 2 hours. 🚀`,
      );
      setTimeout(
        () =>
          window.open(
            `https://wa.me/${form.phone.replace(/\D/g, "")}?text=${msg}`,
            "_blank",
          ),
        500,
      );
    }
  }, [form, validate, addAuditLead]);

  const reset = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors({});
    setStatus("idle");
    setSubmittedLead(null);
  }, []);

  return { form, errors, status, submittedLead, setField, submit, reset };
}

// ─── Landing Page Analytics Hook ─────────────────────────────────────────────

export function useNicheLandingAnalytics() {
  const hasTrackedView = useRef(false);

  const trackView = useCallback(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
    trackEvent("landing_view");
  }, []);

  const trackWhatsAppClick = useCallback((source: string) => {
    trackEvent("whatsapp_click", { source });
  }, []);

  const trackCallBooked = useCallback(() => {
    trackEvent("call_booked");
  }, []);

  return { trackView, trackWhatsAppClick, trackCallBooked };
}

// ─── Audit Leads Management Hook ─────────────────────────────────────────────

export function useAuditLeads() {
  const leads = useGrowthStore(selectAuditLeads);
  const updateStatus = useGrowthStore((s) => s.updateAuditLeadStatus);

  const newLeads = leads.filter((l) => l.status === "new");
  const contactedLeads = leads.filter((l) => l.status === "contacted");
  const convertedLeads = leads.filter((l) => l.status === "converted");

  return { leads, newLeads, contactedLeads, convertedLeads, updateStatus };
}

// ─── Composite: useNicheLanding ───────────────────────────────────────────────

export function useNicheLanding() {
  const form = useAuditForm();
  const analytics = useNicheLandingAnalytics();
  const auditLeads = useAuditLeads();

  return { form, analytics, auditLeads };
}
