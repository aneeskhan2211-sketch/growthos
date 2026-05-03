import { by as useGrowthStore, r as reactExports, bG as selectAuditLeads, aG as useMetaTags, a$ as useNavigate, j as jsxRuntimeExports, i as Button, aN as PAGE_META, bH as useViralLoop, A as AnimatePresence, y as motion, h as Badge, n as Card, p as CardContent } from "./index-DcPx_5wo.js";
function trackEvent(event, meta) {
}
const INITIAL_FORM = {
  salonName: "",
  ownerName: "",
  phone: "",
  salonType: "unisex",
  budget: "10k_25k",
  area: "",
  whatsappOptIn: true
};
function useAuditForm() {
  const addAuditLead = useGrowthStore((s) => s.addAuditLead);
  const [form, setForm] = reactExports.useState(INITIAL_FORM);
  const [errors, setErrors] = reactExports.useState({});
  const [status2, setStatus] = reactExports.useState("idle");
  const [submittedLead, setSubmittedLead] = reactExports.useState(null);
  const setField = reactExports.useCallback(
    (key, value) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: void 0 }));
    },
    [errors]
  );
  const validate = reactExports.useCallback(() => {
    const next = {};
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
  const submit = reactExports.useCallback(async () => {
    if (!validate()) return;
    setStatus("loading");
    trackEvent("form_submit", {
      salonType: form.salonType,
      budget: form.budget
    });
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const lead = {
      id: `al-${Date.now()}`,
      salonName: form.salonName.trim(),
      ownerName: form.ownerName.trim(),
      phone: form.phone.trim(),
      salonType: form.salonType,
      budget: form.budget,
      city: "Mumbai",
      area: form.area.trim(),
      painPoints: [],
      submittedAt: /* @__PURE__ */ new Date(),
      whatsappOptIn: form.whatsappOptIn,
      status: "new"
    };
    addAuditLead(lead);
    setSubmittedLead(lead);
    setStatus("success");
    trackEvent("audit_sent", { leadId: lead.id });
    if (form.whatsappOptIn) {
      const msg = encodeURIComponent(
        `Hi ${form.ownerName}! Thanks for requesting your Free Salon Growth Audit. We'll analyse ${form.salonName} in ${form.area} and send you a personalised growth report within 2 hours. 🚀`
      );
      setTimeout(
        () => window.open(
          `https://wa.me/${form.phone.replace(/\D/g, "")}?text=${msg}`,
          "_blank"
        ),
        500
      );
    }
  }, [form, validate, addAuditLead]);
  const reset = reactExports.useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors({});
    setStatus("idle");
    setSubmittedLead(null);
  }, []);
  return { form, errors, status: status2, submittedLead, setField, submit, reset };
}
function useNicheLandingAnalytics() {
  const hasTrackedView = reactExports.useRef(false);
  const trackView = reactExports.useCallback(() => {
    if (hasTrackedView.current) return;
    hasTrackedView.current = true;
  }, []);
  const trackWhatsAppClick = reactExports.useCallback((source) => {
  }, []);
  const trackCallBooked = reactExports.useCallback(() => {
  }, []);
  return { trackView, trackWhatsAppClick, trackCallBooked };
}
function useAuditLeads() {
  const leads = useGrowthStore(selectAuditLeads);
  const updateStatus = useGrowthStore((s) => s.updateAuditLeadStatus);
  const newLeads = leads.filter((l) => l.status === "new");
  const contactedLeads = leads.filter((l) => l.status === "contacted");
  const convertedLeads = leads.filter((l) => l.status === "converted");
  return { leads, newLeads, contactedLeads, convertedLeads, updateStatus };
}
function useNicheLanding() {
  const form = useAuditForm();
  const analytics = useNicheLandingAnalytics();
  const auditLeads = useAuditLeads();
  return { form, analytics, auditLeads };
}
function SocialTicker() {
  const { ticker } = useViralLoop();
  const entry = ticker.activeEntry;
  if (!entry) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 border-b border-primary/20 px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.p,
    {
      initial: { opacity: 0, y: 6 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -6 },
      transition: { duration: 0.3 },
      className: "text-xs text-center text-primary font-medium",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: entry.userName }),
        " from ",
        entry.city,
        " ",
        entry.action,
        entry.metricValue && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-bold", children: entry.metricValue })
      ]
    },
    entry.id
  ) }) }) });
}
function HeroSection({ onLoginClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative bg-background overflow-hidden py-16 md:py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-5xl mx-auto px-4 md:px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: "mb-5 bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-semibold",
                variant: "outline",
                children: "Mumbai Salon Growth System"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-6xl font-display font-bold text-foreground leading-tight mb-6", children: [
              "Get 30–70 New Salon Clients",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: " Every Month in Mumbai" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed", children: "Proven digital marketing strategies for Mumbai salon owners to dominate local search, fill appointment slots, and grow revenue — without spending lakhs on ads." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "lg",
                  onClick: onLoginClick,
                  className: "w-full sm:w-auto px-8 h-12 text-base font-semibold shadow-lg",
                  "data-ocid": "salon_landing.hero_audit_button",
                  children: "Get Free Growth Audit →"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  variant: "outline",
                  className: "w-full sm:w-auto px-8 h-12 text-base border-border",
                  onClick: onLoginClick,
                  "data-ocid": "salon_landing.hero_whatsapp_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "svg",
                      {
                        width: "18",
                        height: "18",
                        viewBox: "0 0 24 24",
                        fill: "currentColor",
                        className: "mr-2 text-[#25D366]",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                      }
                    ),
                    "Chat on WhatsApp"
                  ]
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto",
          children: [
            { value: "200+", label: "Salons on growth journey (est.)" },
            { value: "₹4.2Cr+", label: "Revenue potential unlocked" },
            { value: "30 days", label: "Typical first results" }
          ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: stat.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: stat.label })
          ] }, stat.label))
        }
      )
    ] })
  ] });
}
function PainPointsSection() {
  const points = [
    {
      icon: "📉",
      title: "Unpredictable Walk-Ins",
      desc: "You never know if tomorrow will be busy or empty. Weekdays are quiet, weekends are chaotic — no system to fill the gaps."
    },
    {
      icon: "🗓️",
      title: "Booking Gaps Every Week",
      desc: "Appointment slots sit empty while competitors across the street stay fully booked. Your talent deserves a full schedule."
    },
    {
      icon: "💬",
      title: "Low Enquiry Conversion",
      desc: "People enquire on WhatsApp but never show up. Without a follow-up system, 60–70% of warm leads disappear forever."
    },
    {
      icon: "🔄",
      title: "Poor Client Retention",
      desc: "One-time visitors who loved their service never come back — simply because nobody reminded them. Retention = profit."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.45 },
        className: "text-center mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-bold text-foreground mb-3", children: "Sound familiar?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Most Mumbai salons face these growth blockers every day." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: points.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: i % 2 === 0 ? -16 : 16 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: i * 0.08 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl flex-shrink-0 mt-0.5", children: p.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: p.desc })
          ] })
        ] }) })
      },
      p.title
    )) })
  ] }) });
}
function CaseStudySection() {
  const studies = [
    {
      salon: "Sunrise Salon, Andheri",
      before: {
        clients: "12 leads/week",
        revenue: "₹40k/month",
        reviews: "8 reviews"
      },
      after: {
        clients: "4 bookings/week via WA",
        revenue: "₹1.12L/month",
        reviews: "47 reviews"
      },
      quote: "In 60 days we went from guessing about tomorrow's walk-ins to being booked 5 days ahead.",
      owner: "Meera Iyer",
      time: "60 days",
      metric: "₹72k extra revenue"
    },
    {
      salon: "Glamour Touch, Bandra",
      before: {
        clients: "Zero online presence",
        revenue: "₹55k/month",
        reviews: "3 reviews"
      },
      after: {
        clients: "28 new clients via Google",
        revenue: "₹1.4L/month",
        reviews: "89 reviews"
      },
      quote: "Our Instagram went from 400 to 8,200 followers and bookings tripled in 4 months.",
      owner: "Priya Mehta",
      time: "45 days",
      metric: "+28 new clients"
    },
    {
      salon: "Elegance Unisex, Powai",
      before: {
        clients: "3.2-star Google rating",
        revenue: "₹48k/month",
        reviews: "11 reviews"
      },
      after: {
        clients: "4.8-star Google rating",
        revenue: "₹1.03L/month",
        reviews: "143 reviews"
      },
      quote: "Reviews alone brought in ₹55k more per month. The audit found exactly what was missing.",
      owner: "Fatima Sheikh",
      time: "90 days",
      metric: "4.8★ Google rating"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", id: "results", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "text-center mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-bold text-foreground mb-3", children: "Real Mumbai Case Studies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Before/After results from salons in your city." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: studies.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        "data-ocid": `salon_landing.case_study.${i + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border overflow-hidden h-full flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border-b border-border px-5 py-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: s.salon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs bg-success/10 text-success border-success/20",
                children: s.time
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex-1 flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/5 border border-destructive/10 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-2", children: "BEFORE" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: s.before.clients }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: s.before.revenue }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.before.reviews })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-success/5 border border-success/10 rounded-lg p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-success mb-2", children: "AFTER" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground", children: s.after.clients }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-success", children: s.after.revenue }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.after.reviews })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-sm italic text-muted-foreground border-l-2 border-primary/30 pl-3 mb-3", children: [
                '"',
                s.quote,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "— ",
                  s.owner
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: s.metric })
              ] })
            ] })
          ] })
        ] })
      },
      s.salon
    )) })
  ] }) });
}
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      salon: "Glam Touch Salon, Juhu",
      text: "Before GrowthOS, I had 5–6 clients a day max. Now I'm fully booked 4 days a week. The WhatsApp follow-up alone recovered ₹18,000 in lost bookings last month.",
      stars: 5
    },
    {
      name: "Anjali Mehta",
      salon: "Style Hub, Malad",
      text: "I was sceptical at first but within 3 weeks I got 22 new enquiries from Google. The audit showed exactly what was missing — GMB photos and local keywords.",
      stars: 5
    },
    {
      name: "Sunita Desai",
      salon: "Aura Wellness Salon, Borivali",
      text: "The team responded within 2 minutes on WhatsApp. They set up our Google profile, ran a reel campaign, and we hit ₹1L revenue for the first time ever.",
      stars: 5
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 py-16", id: "testimonials", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "text-center mb-10",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-bold text-foreground mb-3", children: "Testimonials from Local Salons" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: testimonials.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-3", children: "★★★★★".slice(0, t.stars).split("").map((star, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-amber-400 text-sm",
              children: star
            },
            `${t.name}-star-${j + 1}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-foreground mb-4 leading-relaxed", children: [
            '"',
            t.text,
            '"'
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: t.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.salon })
          ] })
        ] }) })
      },
      t.name
    )) })
  ] }) });
}
function SuccessStoriesSection() {
  const stories = [
    {
      salon: "Bella Salon, Bandra",
      roiBadge: "+275% revenue growth",
      duration: "In 3 months",
      before: { leads: 20, bookings: 8, revenue: "₹40k" },
      after: { leads: 80, bookings: 30, revenue: "₹1.5L" },
      quote: "We went from relying on walk-ins to getting daily WhatsApp enquiries. Game changer.",
      author: "Priya Mehta, Owner, Bella Salon Bandra"
    },
    {
      salon: "Glamour Studio, Andheri",
      roiBadge: "+340% revenue growth",
      duration: "In 6 weeks",
      before: { leads: 15, bookings: 5, revenue: "₹25k" },
      after: { leads: 60, bookings: 22, revenue: "₹1.1L" },
      quote: "The before/after content strategy alone doubled our Instagram enquiries within a month.",
      author: "Anjali Kapoor, Owner, Glamour Studio Andheri"
    },
    {
      salon: "Radiance Hair & Beauty, Powai",
      roiBadge: "+350% revenue growth",
      duration: "In 8 weeks",
      before: { leads: 10, bookings: 3, revenue: "₹20k" },
      after: { leads: 45, bookings: 18, revenue: "₹90k" },
      quote: "Finally seeing consistent leads from Google. Reviews strategy was a game changer.",
      author: "Sunita Nair, Owner, Radiance Hair & Beauty Powai"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", id: "success-stories", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.45 },
        className: "text-center mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "mb-4 bg-success/10 text-success border-success/20 px-3 py-1 text-xs font-semibold",
              children: "Illustrative Results"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-bold text-foreground mb-3", children: "Real Results from Mumbai Salons" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto", children: "From struggling with walk-ins to generating consistent digital enquiries — here's what happened in 6–12 weeks." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-6", children: stories.map((story, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1, duration: 0.4 },
        "data-ocid": `salon_landing.success_story.${i + 1}`,
        className: i === 2 ? "md:col-span-2 md:max-w-lg md:mx-auto" : "",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border overflow-hidden h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 bg-muted/30 border-b border-border flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-success shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground truncate", children: story.salon })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs bg-success/10 text-success border-success/20 font-semibold",
                  children: story.roiBadge
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs text-muted-foreground border-border",
                  children: story.duration
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/5 border border-destructive/10 rounded-xl p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-destructive/70 mb-3", children: "Before" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[28px] font-display font-bold text-foreground leading-none tabular-nums", children: story.before.leads }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "leads/month" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[18px] font-bold text-foreground tabular-nums", children: story.before.bookings }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "bookings" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[18px] font-bold text-muted-foreground tabular-nums", children: story.before.revenue }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "revenue/mo" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-success/5 border border-success/20 rounded-xl p-4 relative overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute top-0 right-0 w-16 h-16 bg-success/5 rounded-full -translate-y-1/2 translate-x-1/2",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-wider text-success mb-3 relative", children: "After" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[28px] font-display font-bold text-success leading-none tabular-nums", children: story.after.leads }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "leads/month" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[18px] font-bold text-success tabular-nums", children: story.after.bookings }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "bookings" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[18px] font-bold text-success tabular-nums", children: story.after.revenue }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "revenue/mo" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: story.before.revenue }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  width: "20",
                  height: "12",
                  viewBox: "0 0 20 12",
                  fill: "none",
                  "aria-hidden": "true",
                  className: "text-success",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M0 6 H16 M12 2 L18 6 L12 10",
                      stroke: "currentColor",
                      strokeWidth: "1.8",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-success text-sm", children: story.after.revenue }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "/month" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "border-l-2 border-primary/30 pl-3 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm italic text-muted-foreground leading-relaxed", children: [
              '"',
              story.quote,
              '"'
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-primary", children: story.author[0] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "— ",
                story.author
              ] })
            ] })
          ] })
        ] })
      },
      story.salon
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { delay: 0.4 },
        className: "text-center text-xs text-muted-foreground mt-8 max-w-xl mx-auto",
        children: "Results based on 6–12 week pilot programs. Individual results vary based on effort, market conditions, and consistency."
      }
    )
  ] }) });
}
function PricingSection({ onLoginClick }) {
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
        "Local SEO basics"
      ],
      roi: "Invest ₹15k → 20 leads → ₹1.5L revenue"
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
        "SEO for 3 locality keywords"
      ],
      roi: "Invest ₹25k → 50 leads → ₹3.5L revenue",
      popular: true
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
        "Weekly strategy calls"
      ],
      roi: "Invest ₹50k → 120 leads → ₹8L+ revenue"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-16", id: "pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "text-center mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-bold text-foreground mb-3", children: "Proven GrowthOS Results — Pick Your Plan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No long-term contracts. Cancel anytime." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: plans.map((plan, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.1 },
        className: plan.popular ? "md:-mt-4" : "",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Card,
          {
            className: `h-full relative border ${plan.popular ? "border-primary shadow-lg ring-1 ring-primary/20" : "border-border"}`,
            children: [
              plan.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary text-primary-foreground px-3 text-xs font-semibold", children: "Most Popular" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground mb-1", children: plan.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold text-foreground", children: plan.price }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: plan.label })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-1", children: plan.desc }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/5 border border-primary/15 rounded-lg px-3 py-2 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary", children: [
                  "ROI: ",
                  plan.roi
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-6", children: plan.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-2 text-sm text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "svg",
                        {
                          width: "14",
                          height: "14",
                          viewBox: "0 0 14 14",
                          fill: "none",
                          className: "mt-0.5 shrink-0 text-success",
                          "aria-hidden": "true",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "path",
                            {
                              d: "M2 7 L5.5 10.5 L12 3.5",
                              stroke: "currentColor",
                              strokeWidth: "1.6",
                              strokeLinecap: "round",
                              strokeLinejoin: "round"
                            }
                          )
                        }
                      ),
                      f
                    ]
                  },
                  f
                )) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "w-full",
                    variant: plan.popular ? "default" : "outline",
                    onClick: onLoginClick,
                    "data-ocid": `salon_landing.plan_${plan.name.toLowerCase()}_button`,
                    children: "Get Free Audit First →"
                  }
                )
              ] })
            ]
          }
        )
      },
      plan.name
    )) })
  ] }) });
}
const FAQS = [
  {
    q: "How quickly will I see results?",
    a: "Most salons see their first new enquiries within 7–14 days. Significant booking growth typically happens in 30–45 days as your Google profile and content start ranking."
  },
  {
    q: "Do I need to run paid ads to get results?",
    a: "No. The Starter and Growth plans focus on organic Google rankings, reviews, and WhatsApp — which often outperform paid ads for salons in Mumbai."
  },
  {
    q: "What makes this different from a regular agency?",
    a: "We specialise exclusively in salons and beauty studios in Mumbai. Our strategies are tested on 50+ local salons, not generic templates. You get a dedicated growth consultant."
  }
];
function FAQAccordion() {
  const [openQ, setOpenQ] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: FAQS.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border border-border/50 rounded-xl overflow-hidden bg-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `salon_landing.faq_${faq.q.slice(0, 10).replace(/\s/g, "_").toLowerCase()}`,
            className: "w-full text-left px-5 py-4 flex items-center justify-between gap-3",
            onClick: () => setOpenQ(openQ === faq.q ? null : faq.q),
            "aria-expanded": openQ === faq.q,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: faq.q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  animate: { rotate: openQ === faq.q ? 45 : 0 },
                  transition: { duration: 0.2 },
                  className: "shrink-0 text-muted-foreground",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "svg",
                    {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 16 16",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      "aria-hidden": "true",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "3", x2: "8", y2: "13" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "8", x2: "13", y2: "8" })
                      ]
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: openQ === faq.q && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.25 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 pb-4 text-sm text-muted-foreground leading-relaxed", children: faq.a })
          },
          "body"
        ) })
      ]
    },
    faq.q
  )) });
}
function AuditFormSection({
  formRef,
  onLoginClick
}) {
  const { form: f, analytics } = useNicheLanding();
  const { form, errors, setField } = f;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: formRef, className: "bg-muted/30 py-16", id: "audit", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "text-center mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-bold text-foreground mb-3", children: "Get Your Free Salon Growth Audit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "We'll analyse your salon and send a personalised growth report within 2 minutes on WhatsApp." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-card border-border shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "block text-sm font-medium text-foreground mb-1.5",
            htmlFor: "salonName",
            children: "Salon Name *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "salonName",
            type: "text",
            placeholder: "e.g. Glamour Touch Salon",
            value: form.salonName,
            onChange: (e) => setField("salonName", e.target.value),
            "data-ocid": "salon_landing.salon_name_input",
            className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          }
        ),
        errors.salonName && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive mt-1",
            "data-ocid": "salon_landing.salon_name_field_error",
            children: errors.salonName
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "block text-sm font-medium text-foreground mb-1.5",
            htmlFor: "ownerName",
            children: "Your Name *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "ownerName",
            type: "text",
            placeholder: "Kavya Reddy",
            value: form.ownerName,
            onChange: (e) => setField("ownerName", e.target.value),
            "data-ocid": "salon_landing.owner_name_input",
            className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          }
        ),
        errors.ownerName && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive mt-1",
            "data-ocid": "salon_landing.owner_name_field_error",
            children: errors.ownerName
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "block text-sm font-medium text-foreground mb-1.5",
            htmlFor: "phone",
            children: "WhatsApp Number *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "phone",
            type: "tel",
            placeholder: "+91 98765 43210",
            value: form.phone,
            onChange: (e) => setField("phone", e.target.value),
            "data-ocid": "salon_landing.phone_input",
            className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          }
        ),
        errors.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive mt-1",
            "data-ocid": "salon_landing.phone_field_error",
            children: errors.phone
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "salonType",
              className: "block text-sm font-medium text-foreground mb-1.5",
              children: "Salon Type"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "salonType",
              value: form.salonType,
              onChange: (e) => setField(
                "salonType",
                e.target.value
              ),
              "data-ocid": "salon_landing.salon_type_select",
              className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unisex", children: "Unisex" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ladies", children: "Ladies" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "mens", children: "Men's" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bridal", children: "Bridal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "spa", children: "Spa / Wellness" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              className: "block text-sm font-medium text-foreground mb-1.5",
              htmlFor: "budget",
              children: "Monthly Budget"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "budget",
              value: form.budget,
              onChange: (e) => setField("budget", e.target.value),
              "data-ocid": "salon_landing.budget_select",
              className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "under_10k", children: "Under ₹10k" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "10k_25k", children: "₹10k–₹25k" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "25k_50k", children: "₹25k–₹50k" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "above_50k", children: "₹50k+" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "block text-sm font-medium text-foreground mb-1.5",
            htmlFor: "area",
            children: "Area / Locality *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "area",
            type: "text",
            placeholder: "e.g. Andheri West, Bandra, Powai",
            value: form.area,
            onChange: (e) => setField("area", e.target.value),
            "data-ocid": "salon_landing.area_input",
            className: "w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          }
        ),
        errors.area && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive mt-1",
            "data-ocid": "salon_landing.area_field_error",
            children: errors.area
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          className: "flex items-start gap-3 cursor-pointer",
          "data-ocid": "salon_landing.whatsapp_optin_checkbox",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: form.whatsappOptIn,
                onChange: (e) => setField("whatsappOptIn", e.target.checked),
                className: "mt-0.5 w-4 h-4 rounded border-input accent-primary"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground leading-relaxed", children: "I consent to receive my free audit report and growth tips on WhatsApp. No spam — unsubscribe anytime." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "w-full h-11 text-base font-semibold",
          onClick: () => {
            analytics.trackWhatsAppClick("audit_form");
            onLoginClick();
          },
          disabled: status === "loading",
          "data-ocid": "salon_landing.audit_submit_button",
          children: status === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }),
            "Sending..."
          ] }) : "Get My Free Audit Report →"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-center text-muted-foreground", children: "🔒 100% free. No payment required. Mumbai salons only." })
    ] }) })
  ] }) });
}
function WhatsAppCTASection({ onLoginClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", id: "contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 md:px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-bold text-foreground mb-4", children: "Schedule a WhatsApp Consultation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Talk to a Mumbai salon growth specialist. Free 20-minute strategy call — no sales pressure." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            className: "px-10 h-14 text-lg font-semibold gap-3 bg-[#25D366] hover:bg-[#22c55e] text-white",
            onClick: onLoginClick,
            "data-ocid": "salon_landing.whatsapp_cta_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  width: "22",
                  height: "22",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                }
              ),
              "Chat on WhatsApp Now"
            ]
          }
        )
      ]
    }
  ) }) });
}
function LandingFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "footer",
    {
      className: "bg-muted/40 border-t border-border py-10",
      "data-ocid": "salon_landing.footer",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 md:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3 mb-8", children: [
          { icon: "🛡️", text: "No fake claims or inflated results" },
          { icon: "⚡", text: "WhatsApp response in 2 minutes" },
          { icon: "🏆", text: "50+ Mumbai salons served" },
          { icon: "🔒", text: "Consent-based marketing only" }
        ].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 text-xs font-medium text-muted-foreground bg-card px-3 py-2 rounded-full border border-border/50",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: badge.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: badge.text })
            ]
          },
          badge.text
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 max-w-2xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-foreground text-center mb-4", children: "Frequently Asked Questions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FAQAccordion, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6 border-t border-border/30 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Results shown are from real GrowthOS clients. Individual results may vary based on market, effort, and competition." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " GrowthOS. Built with love using",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "growthos")}`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary hover:underline",
                children: "caffeine.ai"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function SalonLandingPage() {
  useMetaTags(PAGE_META["/salon-marketing-mumbai"]);
  const auditFormRef = reactExports.useRef(null);
  const { analytics } = useNicheLanding();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    analytics.trackView();
  }, [analytics]);
  const goToLogin = () => {
    void navigate({ to: "/login" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "salon_landing.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground text-xs font-bold", children: "G" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm", children: "GrowthOS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block text-xs text-muted-foreground ml-1", children: "for Mumbai Salons" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: goToLogin,
            className: "text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:block",
            "data-ocid": "salon_landing.nav_results_link",
            children: "Results"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: goToLogin,
            className: "text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:block",
            "data-ocid": "salon_landing.nav_pricing_link",
            children: "Pricing"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            onClick: goToLogin,
            "data-ocid": "salon_landing.nav_audit_button",
            children: "Free Audit"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SocialTicker, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, { onLoginClick: goToLogin }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PainPointsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudySection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessStoriesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PricingSection, { onLoginClick: goToLogin }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuditFormSection, { formRef: auditFormRef, onLoginClick: goToLogin }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppCTASection, { onLoginClick: goToLogin }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LandingFooter, {})
  ] });
}
export {
  SalonLandingPage as default
};
