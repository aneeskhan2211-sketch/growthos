import { c as createLucideIcon, w as useLeads, a3 as useCreateLead, r as reactExports, j as jsxRuntimeExports, aj as Card, ak as CardHeader, al as CardTitle, am as CardContent, ab as Select, ac as SelectTrigger, ad as SelectValue, ae as SelectContent, af as SelectItem, U as Users, D as CircleCheck, k as Star, aJ as IndianRupee, h as cn, au as Progress, B as Badge, a as Button, aK as Link2, O as Copy, aL as ExternalLink, aM as Share2, aN as Flame, a5 as Checkbox, az as Dialog, aA as DialogContent, aB as DialogHeader, aC as DialogTitle, aa as Label, ah as Input, e as Textarea, a2 as ArrowRight } from "./index-C-gts07u.js";
import { b as useConsentLogs } from "./useCompliance-DxWkf18e.js";
import { T as Target } from "./target-D_AhRlrf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
const NICHES = [
  "Salons",
  "Gyms",
  "Yoga Studios",
  "Restaurants",
  "Clinics",
  "Real Estate"
];
const NICHE_DATA = {
  Salons: { leads: 48, replyRate: "22%", pilotClients: 3, estimatedMRR: 45e3 },
  Gyms: { leads: 31, replyRate: "18%", pilotClients: 2, estimatedMRR: 28e3 },
  "Yoga Studios": {
    leads: 22,
    replyRate: "25%",
    pilotClients: 1,
    estimatedMRR: 18e3
  },
  Restaurants: {
    leads: 67,
    replyRate: "14%",
    pilotClients: 4,
    estimatedMRR: 52e3
  },
  Clinics: {
    leads: 29,
    replyRate: "20%",
    pilotClients: 2,
    estimatedMRR: 38e3
  },
  "Real Estate": {
    leads: 41,
    replyRate: "17%",
    pilotClients: 3,
    estimatedMRR: 62e3
  }
};
const MOCK_PILOT_CLIENTS = [
  {
    leadId: "1",
    businessName: "Glamour Cuts Salon",
    niche: "Salons",
    city: "Mumbai",
    mrrAmount: 12e3,
    testimonial: "Our bookings went up 3x in the first month. Absolutely worth every rupee.",
    caseStudy: "Increased Instagram reach from 500 to 4,200 followers. Google reviews up from 12 to 47.",
    startDate: "2026-03-01",
    status: "active"
  },
  {
    leadId: "2",
    businessName: "FitNation Gym",
    niche: "Gyms",
    city: "Pune",
    mrrAmount: 9999,
    testimonial: "We closed 28 new memberships just from the WhatsApp campaign.",
    caseStudy: "SEO audit revealed 3 critical issues. Fixed them → 2x organic traffic in 45 days.",
    startDate: "2026-02-15",
    status: "active"
  },
  {
    leadId: "3",
    businessName: "Saffron Restaurant",
    niche: "Restaurants",
    city: "Bangalore",
    mrrAmount: 7500,
    testimonial: "The AI-generated content saved us 10 hours/week of work. Worth it.",
    caseStudy: "Ran festival campaign for Holi → ₹1.2L in catering orders in 3 days.",
    startDate: "2026-03-20",
    status: "trial"
  }
];
const MILESTONES = [
  { label: "₹10k MRR", target: 1e4, badge: "🥉 Bronze" },
  { label: "₹50k MRR", target: 5e4, badge: "🥈 Silver" },
  { label: "₹1L MRR", target: 1e5, badge: "🥇 Gold" }
];
const DAILY_TASKS = [
  "Contact 10 new leads via WhatsApp or Email",
  "Launch 1 outreach campaign for the top niche",
  "Follow up with 5 leads who haven't replied in 2 days"
];
function FunnelStage({
  label,
  count,
  rate,
  color,
  isLast
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "px-5 py-3 rounded-xl text-center border min-w-[110px]",
          color
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold tabular-nums", children: count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium opacity-80", children: label })
        ]
      }
    ),
    !isLast && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 rotate-90" }),
      rate && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-primary", children: rate })
    ] })
  ] });
}
function RevenuePlanPage() {
  const { data: leads = [] } = useLeads();
  const { data: consentLogs = [] } = useConsentLogs();
  const createLead = useCreateLead();
  const [selectedNiche, setSelectedNiche] = reactExports.useState("Salons");
  const [pilotClients, setPilotClients] = reactExports.useState(MOCK_PILOT_CLIENTS);
  const [completedTasks, setCompletedTasks] = reactExports.useState(/* @__PURE__ */ new Set());
  const [streak] = reactExports.useState(7);
  const [showAuditModal, setShowAuditModal] = reactExports.useState(false);
  const [showAddPilot, setShowAddPilot] = reactExports.useState(false);
  const [auditForm, setAuditForm] = reactExports.useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    niche: "Salons"
  });
  const [pilotForm, setPilotForm] = reactExports.useState({
    businessName: "",
    niche: "Salons",
    city: "",
    mrrAmount: "",
    testimonial: "",
    caseStudy: ""
  });
  const [copied, setCopied] = reactExports.useState(false);
  const totalMRR = pilotClients.filter((p) => p.status === "active").reduce((s, p) => s + p.mrrAmount, 0);
  const targetMRR = 1e5;
  const mrrProgress = Math.min(totalMRR / targetMRR * 100, 100);
  const replies = consentLogs.filter((l) => l.status === "granted").length;
  const niche = NICHE_DATA[selectedNiche] ?? NICHE_DATA.Salons;
  const auditLeadsCount = leads.filter(
    (l) => {
      var _a;
      return (_a = l.notes) == null ? void 0 : _a.includes("audit");
    }
  ).length;
  const referralUrl = reactExports.useMemo(
    () => `https://growthapp.in/audit/usr-${Math.random().toString(36).slice(2, 8)}`,
    []
  );
  const copyRef = () => {
    navigator.clipboard.writeText(referralUrl).catch(() => {
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const toggleTask = (i) => {
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };
  const submitAuditForm = async () => {
    await createLead.mutateAsync({
      businessName: auditForm.businessName,
      phone: auditForm.phone,
      website: "",
      city: "",
      industry: auditForm.niche,
      address: "",
      notes: `audit_lead:${auditForm.email}`,
      rating: 0,
      leadScore: BigInt(70)
    });
    setAuditForm({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      niche: "Salons"
    });
    setShowAuditModal(false);
  };
  const addPilotClient = () => {
    const pilot = {
      leadId: `pilot_${Date.now()}`,
      businessName: pilotForm.businessName,
      niche: pilotForm.niche,
      city: pilotForm.city,
      mrrAmount: Number(pilotForm.mrrAmount),
      testimonial: pilotForm.testimonial,
      caseStudy: pilotForm.caseStudy,
      startDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      status: "active"
    };
    setPilotClients((prev) => [pilot, ...prev]);
    setPilotForm({
      businessName: "",
      niche: "Salons",
      city: "",
      mrrAmount: "",
      testimonial: "",
      caseStudy: ""
    });
    setShowAddPilot(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-6 h-6 text-primary" }),
        "₹1L/Month Revenue Plan"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Your acquisition roadmap to sustainable, compliant growth" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Acquisition Funnel" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FunnelStage,
          {
            label: "Leads",
            count: leads.length,
            rate: "22%",
            color: "bg-primary/10 border-primary/20 text-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FunnelStage,
          {
            label: "Replied",
            count: replies,
            rate: "40%",
            color: "bg-success/10 border-success/20 text-success"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FunnelStage,
          {
            label: "Pilots",
            count: pilotClients.filter((p) => p.status !== "churned").length,
            rate: "66%",
            color: "bg-warning/10 border-warning/20 text-warning"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FunnelStage,
          {
            label: "Paying",
            count: pilotClients.filter((p) => p.status === "active").length,
            rate: "MRR",
            color: "bg-chart-3/10 border-chart-3/20 text-chart-3"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FunnelStage,
          {
            label: `₹${(totalMRR / 1e3).toFixed(0)}k`,
            count: totalMRR,
            isLast: true,
            color: "bg-primary/10 border-primary/30 text-primary"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Niche Focus" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: selectedNiche, onValueChange: setSelectedNiche, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", "data-ocid": "revenue.niche_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: NICHES.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: n, children: n }, n)) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        {
          label: "Leads Found",
          value: niche.leads,
          icon: Users,
          color: "text-primary"
        },
        {
          label: "Reply Rate",
          value: niche.replyRate,
          icon: CircleCheck,
          color: "text-success"
        },
        {
          label: "Pilot Clients",
          value: niche.pilotClients,
          icon: Star,
          color: "text-warning"
        },
        {
          label: "Est. MRR",
          value: `₹${(niche.estimatedMRR / 1e3).toFixed(0)}k`,
          icon: IndianRupee,
          color: "text-primary"
        }
      ].map(({ label, value, icon: Icon, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-3 rounded-xl bg-muted/40 border border-border text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-5 h-5 mx-auto mb-1", color) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-xl font-bold", color), children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
          ]
        },
        label
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4 text-primary" }),
          " Current MRR"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-bold text-primary tabular-nums", children: [
            "₹",
            totalMRR.toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress to ₹1L goal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold", children: [
                mrrProgress.toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: mrrProgress })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-warning" }),
          " Milestones"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-2", children: MILESTONES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "flex-1 text-sm",
                totalMRR >= m.target ? "text-foreground" : "text-muted-foreground"
              ),
              children: [
                m.badge,
                " ",
                m.label
              ]
            }
          ),
          totalMRR >= m.target ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-success/10 text-success border-success/30 text-xs", children: "Reached!" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "₹",
            ((m.target - totalMRR) / 1e3).toFixed(0),
            "k away"
          ] })
        ] }, m.label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Pilot Clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            variant: "outline",
            "data-ocid": "revenue.add_pilot_button",
            onClick: () => setShowAddPilot(true),
            children: "+ Add Client"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: pilotClients.map((client, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": `revenue.pilot.item.${i + 1}`,
          className: "p-4 rounded-xl bg-muted/30 border border-border space-y-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: client.businessName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  client.niche,
                  " · ",
                  client.city
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-primary", children: [
                  "₹",
                  client.mrrAmount.toLocaleString("en-IN"),
                  "/mo"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: cn(
                      "text-xs mt-1",
                      client.status === "active" ? "text-success border-success/30 bg-success/10" : client.status === "trial" ? "text-warning border-warning/30 bg-warning/10" : "text-muted-foreground border-border"
                    ),
                    children: client.status
                  }
                )
              ] })
            ] }),
            client.testimonial && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3", children: [
              '"',
              client.testimonial,
              '"'
            ] }),
            client.caseStudy && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: client.caseStudy })
          ]
        },
        client.leadId
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4 text-primary" }),
        "Free Audit Lead Magnet"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs text-primary font-mono flex-1 truncate", children: referralUrl }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              "data-ocid": "revenue.copy_referral_button",
              onClick: copyRef,
              className: "shrink-0",
              children: [
                copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                copied ? "Copied!" : "Copy"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: auditLeadsCount + 12 }),
              " ",
              "audit leads captured this month"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              "data-ocid": "revenue.open_audit_button",
              onClick: () => setShowAuditModal(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 mr-1.5" }),
                "Open Audit Form"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4 text-primary" }),
        "Referral Tracking"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 md:grid-cols-5 gap-2 text-center", children: [
        {
          label: "Organic",
          count: Math.floor(leads.length * 0.4),
          color: "text-success"
        },
        {
          label: "Lead Magnet",
          count: Math.floor(leads.length * 0.25),
          color: "text-primary"
        },
        {
          label: "Referral",
          count: Math.floor(leads.length * 0.15),
          color: "text-warning"
        },
        {
          label: "Paid Ads",
          count: Math.floor(leads.length * 0.12),
          color: "text-chart-5"
        },
        {
          label: "Manual",
          count: Math.floor(leads.length * 0.08),
          color: "text-muted-foreground"
        }
      ].map(({ label, count, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-2.5 rounded-lg bg-muted/40 border border-border",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-lg font-bold", color), children: count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: label })
          ]
        },
        label
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-warning" }),
        "Daily Action Checklist",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "ml-auto text-warning border-warning/30 bg-warning/10 text-xs",
            children: [
              "🔥 ",
              streak,
              "-day streak"
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        DAILY_TASKS.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `revenue.task.item.${DAILY_TASKS.indexOf(task) + 1}`,
            className: "flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  id: `task-${DAILY_TASKS.indexOf(task)}`,
                  "data-ocid": `revenue.task_checkbox.${DAILY_TASKS.indexOf(task) + 1}`,
                  checked: completedTasks.has(DAILY_TASKS.indexOf(task)),
                  onCheckedChange: () => toggleTask(DAILY_TASKS.indexOf(task))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: `task-${DAILY_TASKS.indexOf(task)}`,
                  className: cn(
                    "text-sm cursor-pointer flex-1",
                    completedTasks.has(DAILY_TASKS.indexOf(task)) ? "line-through text-muted-foreground" : "text-foreground"
                  ),
                  children: task
                }
              ),
              completedTasks.has(DAILY_TASKS.indexOf(task)) && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success shrink-0" })
            ]
          },
          task
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            completedTasks.size,
            "/",
            DAILY_TASKS.length,
            " tasks completed today"
          ] }),
          completedTasks.size === DAILY_TASKS.length && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-success/10 text-success border-success/30 text-xs", children: "All done! 🎉" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAuditModal, onOpenChange: setShowAuditModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "revenue.audit_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Free Business Growth Audit" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground -mt-2", children: "Get a free audit of your online presence. We'll reach out within 24 hours." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Your Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "revenue.audit_name_input",
                placeholder: "Priya Sharma",
                value: auditForm.name,
                onChange: (e) => setAuditForm((f) => ({ ...f, name: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Business Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "revenue.audit_business_input",
                placeholder: "Glamour Cuts",
                value: auditForm.businessName,
                onChange: (e) => setAuditForm((f) => ({
                  ...f,
                  businessName: e.target.value
                }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "revenue.audit_phone_input",
                placeholder: "+91 98765 43210",
                value: auditForm.phone,
                onChange: (e) => setAuditForm((f) => ({ ...f, phone: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "revenue.audit_email_input",
                placeholder: "you@business.com",
                value: auditForm.email,
                onChange: (e) => setAuditForm((f) => ({ ...f, email: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Niche" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: auditForm.niche,
              onValueChange: (v) => setAuditForm((f) => ({ ...f, niche: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "revenue.audit_niche_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: NICHES.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: n, children: n }, n)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              "data-ocid": "revenue.audit_cancel_button",
              onClick: () => setShowAuditModal(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "revenue.audit_submit_button",
              onClick: submitAuditForm,
              disabled: createLead.isPending || !auditForm.businessName || !auditForm.phone,
              children: createLead.isPending ? "Submitting…" : "Request Free Audit"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAddPilot, onOpenChange: setShowAddPilot, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "revenue.pilot_dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Pilot Client" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Business Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "revenue.pilot_name_input",
                placeholder: "Sunrise Salon",
                value: pilotForm.businessName,
                onChange: (e) => setPilotForm((f) => ({
                  ...f,
                  businessName: e.target.value
                }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "revenue.pilot_city_input",
                placeholder: "Mumbai",
                value: pilotForm.city,
                onChange: (e) => setPilotForm((f) => ({ ...f, city: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Niche" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: pilotForm.niche,
                onValueChange: (v) => setPilotForm((f) => ({ ...f, niche: v })),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "revenue.pilot_niche_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: NICHES.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: n, children: n }, n)) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "MRR (₹)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "revenue.pilot_mrr_input",
                type: "number",
                placeholder: "9999",
                value: pilotForm.mrrAmount,
                onChange: (e) => setPilotForm((f) => ({ ...f, mrrAmount: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Testimonial" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              "data-ocid": "revenue.pilot_testimonial_textarea",
              rows: 2,
              placeholder: "Quote from the client…",
              value: pilotForm.testimonial,
              onChange: (e) => setPilotForm((f) => ({ ...f, testimonial: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Case Study Results" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              "data-ocid": "revenue.pilot_casestudy_textarea",
              rows: 2,
              placeholder: "What results did you achieve?",
              value: pilotForm.caseStudy,
              onChange: (e) => setPilotForm((f) => ({ ...f, caseStudy: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              "data-ocid": "revenue.pilot_cancel_button",
              onClick: () => setShowAddPilot(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "revenue.pilot_submit_button",
              onClick: addPilotClient,
              disabled: !pilotForm.businessName || !pilotForm.mrrAmount,
              children: "Add Client"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  RevenuePlanPage as default
};
