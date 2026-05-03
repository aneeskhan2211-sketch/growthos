import { r as reactExports, j as jsxRuntimeExports, aO as Activity, a0 as CircleCheck, M as MessageCircle, aF as CircleX, aC as TriangleAlert, n as Card, p as CardContent, f as cn, t as Tabs, v as TabsList, w as TabsTrigger, aP as TabsContent, o as CardHeader, aw as CardTitle, i as Button, ai as Plus, h as Badge, T as TrendingUp, aE as Info, C as Clock, ac as RefreshCw, aJ as Dialog, aK as DialogContent, aL as DialogHeader, aM as DialogTitle, L as Label, I as Input, ap as Select, aq as SelectTrigger, ar as SelectValue, as as SelectContent, at as SelectItem, k as Shield, ak as Globe, aQ as Pause, aR as Play, aS as RotateCcw, aD as Progress, S as Switch, s as Copy } from "./index-DcPx_5wo.js";
import { e as useSenderIdentities, f as useDeliverabilityMetrics, g as useAddSenderIdentity } from "./useCompliance-t_Kwfulr.js";
const WarmupPhaseLabels = {
  phase1: "1–20/day",
  phase2: "21–50/day",
  phase3: "51–100/day",
  unlimited: "100+/day (unrestricted)"
};
const MOCK_RETRY_QUEUE = [
  {
    contact: "Priya Salon, Mumbai",
    channel: "WhatsApp",
    attempt: 2,
    retryAt: "in 1h 14m"
  },
  {
    contact: "FitZone Gym, Delhi",
    channel: "Email",
    attempt: 1,
    retryAt: "in 3h 52m"
  },
  {
    contact: "Spice Garden Restaurant",
    channel: "WhatsApp",
    attempt: 3,
    retryAt: "in 23h 10m"
  }
];
const MOCK_INBOX_SENDERS = [
  {
    email: "outreach@growthco.in",
    domain: "growthco.in",
    dailyLimit: 50,
    sentToday: 23,
    status: "Active",
    isPrimary: true
  },
  {
    email: "hello@agencyworks.in",
    domain: "agencyworks.in",
    dailyLimit: 30,
    sentToday: 12,
    status: "Active",
    isPrimary: false
  },
  {
    email: "connect@marketpro.in",
    domain: "marketpro.in",
    dailyLimit: 20,
    sentToday: 0,
    status: "Paused",
    isPrimary: false
  }
];
const BOUNCE_TYPES = [
  {
    type: "Hard Bounce",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    dot: "oklch(0.55 0.22 25)",
    description: "Invalid email address — permanently remove from list",
    count: 3
  },
  {
    type: "Soft Bounce",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    dot: "oklch(0.68 0.18 86)",
    description: "Mailbox full or server unavailable — retry in 24h",
    count: 8
  },
  {
    type: "Spam Complaint",
    color: "text-destructive",
    bg: "bg-destructive/15",
    border: "border-destructive/30",
    dot: "oklch(0.45 0.24 20)",
    description: "Recipient marked as spam — immediately remove",
    count: 1
  }
];
const WARMUP_WEEKS = [
  {
    week: "Week 1",
    dailySends: "10–20",
    goal: "Build reputation",
    status: "Active"
  },
  {
    week: "Week 2",
    dailySends: "20–50",
    goal: "Increase volume",
    status: "Pending"
  },
  {
    week: "Week 3",
    dailySends: "50–100",
    goal: "Scale outreach",
    status: "Pending"
  },
  {
    week: "Week 4+",
    dailySends: "100+",
    goal: "Full capacity",
    status: "Pending"
  }
];
const DNS_RECORDS = [
  {
    key: "spf",
    label: "SPF",
    fullName: "SPF Record",
    description: "SPF (Sender Policy Framework) tells receiving mail servers which servers are allowed to send email on behalf of your domain.",
    recordType: "TXT",
    host: "@",
    value: "v=spf1 include:sendgrid.net include:mailgun.org ~all"
  },
  {
    key: "dkim",
    label: "DKIM",
    fullName: "DKIM Record",
    description: "DKIM (DomainKeys Identified Mail) adds a digital signature to your emails, proving they haven't been tampered with.",
    recordType: "TXT",
    host: "mail._domainkey",
    value: "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3v2yZhKz5QHdyj9K7LmX1pNqR8sT2uWvE4bCeGdFhIJoKlMnOpQrStUvWxYzAaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789AQAB"
  },
  {
    key: "dmarc",
    label: "DMARC",
    fullName: "DMARC Record",
    description: "DMARC tells receiving servers what to do with emails that fail SPF or DKIM checks.",
    recordType: "TXT",
    host: "_dmarc",
    value: "v=DMARC1; p=none; rua=mailto:reports@yourdomain.com; ruf=mailto:forensics@yourdomain.com; fo=1"
  }
];
function ReputationRing({ score }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = score / 100 * circ;
  const color = score >= 80 ? "oklch(0.65 0.18 145)" : score >= 60 ? "oklch(0.75 0.16 75)" : "oklch(0.55 0.22 25)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "72",
      height: "72",
      viewBox: "0 0 72 72",
      "aria-label": `Reputation score: ${score}`,
      className: "rotate-[-90deg]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
          "Reputation score: ",
          score
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "36",
            cy: "36",
            r,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "6",
            className: "text-border"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "36",
            cy: "36",
            r,
            fill: "none",
            stroke: color,
            strokeWidth: "6",
            strokeDasharray: `${dash} ${circ}`,
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "36",
            y: "40",
            textAnchor: "middle",
            style: {
              transform: "rotate(90deg)",
              transformOrigin: "36px 36px",
              fill: color,
              fontSize: "14px",
              fontWeight: 700,
              fontFamily: "inherit"
            },
            children: score
          }
        )
      ]
    }
  );
}
function MiniBarChart({ data }) {
  const max = Math.max(...data, 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1 h-16", children: data.map((v, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex-1 rounded-t bg-primary/70 transition-all",
      style: { height: `${v / max * 100}%`, minHeight: "2px" },
      title: `${v}`
    },
    `bar-val-${idx.toString()}-${v}`
  )) });
}
function LineSVG({
  delivered,
  replied,
  bounced
}) {
  const W = 400;
  const H = 100;
  const pts = (arr) => {
    const max = Math.max(...arr, 1);
    return arr.map(
      (v, i) => `${i / (arr.length - 1) * W},${H - v / max * (H - 10) - 5}`
    ).join(" ");
  };
  const lines = [
    { arr: delivered, stroke: "oklch(0.53 0.22 253)", label: "Delivered" },
    { arr: replied, stroke: "oklch(0.65 0.18 145)", label: "Replied" },
    { arr: bounced, stroke: "oklch(0.75 0.16 75)", label: "Bounced" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        viewBox: `0 0 ${W} ${H}`,
        "aria-label": "Delivery trend chart",
        className: "w-full h-28",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "7-day delivery trend" }),
          lines.map(({ arr, stroke }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "polyline",
            {
              points: pts(arr),
              fill: "none",
              stroke,
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            },
            stroke
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 text-xs text-muted-foreground", children: lines.map(({ stroke, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "w-3 h-0.5 rounded",
          style: { backgroundColor: stroke }
        }
      ),
      label
    ] }, label)) })
  ] });
}
function CopyButton({ value, ocid }) {
  const [copied, setCopied] = reactExports.useState(false);
  const doCopy = () => {
    void navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      size: "sm",
      variant: "outline",
      className: "h-7 text-xs shrink-0",
      "data-ocid": ocid,
      onClick: doCopy,
      children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3 h-3 mr-1" }),
        copied ? "Copied!" : "Copy"
      ]
    }
  );
}
function DnsStatusDot({ status }) {
  const map = {
    not_configured: { color: "oklch(0.55 0.22 25)", label: "Not Configured" },
    configured: { color: "oklch(0.68 0.18 86)", label: "Configured" },
    verified: { color: "oklch(0.56 0.15 170)", label: "Verified" }
  };
  const { color, label } = map[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "flex items-center gap-1.5 text-xs font-medium",
      style: { color },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-2 h-2 rounded-full",
            style: { backgroundColor: color }
          }
        ),
        label
      ]
    }
  );
}
function EmailDomainSetupTab() {
  const [statuses, setStatuses] = reactExports.useState({
    spf: "not_configured",
    dkim: "not_configured",
    dmarc: "not_configured"
  });
  const [verifying, setVerifying] = reactExports.useState(false);
  const [verifyDone, setVerifyDone] = reactExports.useState(false);
  const [checklist, setChecklist] = reactExports.useState([false, false, false, false]);
  const markConfigured = (key) => {
    setStatuses((prev) => ({
      ...prev,
      [key]: prev[key] === "not_configured" ? "configured" : "verified"
    }));
  };
  const runVerification = () => {
    setVerifying(true);
    setVerifyDone(false);
    setTimeout(() => {
      setVerifying(false);
      setVerifyDone(true);
    }, 2500);
  };
  const toggleCheck = (i) => {
    setChecklist((prev) => prev.map((v, idx) => idx === i ? !v : v));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: DNS_RECORDS.map(({ key, fullName }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DnsStatusDot, { status: statuses[key] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Shield,
        {
          className: cn(
            "w-5 h-5",
            statuses[key] === "verified" ? "text-success" : statuses[key] === "configured" ? "text-warning" : "text-muted-foreground"
          )
        }
      )
    ] }) }, key)) }),
    DNS_RECORDS.map(
      ({ key, label, description, recordType, host, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-primary" }),
          label,
          " Setup Guide"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border bg-muted/30 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-[80px_1fr] divide-y divide-border text-sm", children: [
            { field: "Type", val: recordType },
            { field: "Host", val: host },
            { field: "Value", val: value }
          ].map(({ field, val }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contents", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 bg-muted/50 font-medium text-muted-foreground text-xs flex items-center", children: field }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2.5 font-mono text-xs text-foreground break-all", children: val })
          ] }, field)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { value, ocid: `dns.${key}_copy_button` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "h-7 text-xs",
                "data-ocid": `dns.${key}_configure_button`,
                onClick: () => markConfigured(key),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
                  statuses[key] === "not_configured" ? "Mark as Configured" : statuses[key] === "configured" ? "Mark as Verified" : "✓ Verified"
                ]
              }
            )
          ] })
        ] })
      ] }, key)
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-primary" }),
        "Verification Steps"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        [
          {
            label: "Add DNS records listed above to your domain registrar",
            action: null
          },
          { label: "Wait 24–48 hours for DNS propagation", action: null },
          {
            label: "Run a verification check to confirm records are live",
            action: "verify"
          },
          {
            label: "Monitor your delivery metrics for improvements",
            action: null
          }
        ].map(({ label, action }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => toggleCheck(i),
                  "data-ocid": `dns.checklist_item.${i + 1}`,
                  className: cn(
                    "mt-0.5 w-4 h-4 rounded border-2 shrink-0 transition-smooth flex items-center justify-center",
                    checklist[i] ? "bg-primary border-primary" : "border-muted-foreground/40"
                  ),
                  "aria-checked": checklist[i],
                  children: checklist[i] && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 text-primary-foreground" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex items-center justify-between gap-3 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "text-sm",
                      checklist[i] ? "line-through text-muted-foreground" : "text-foreground"
                    ),
                    children: [
                      "Step ",
                      i + 1,
                      ": ",
                      label
                    ]
                  }
                ),
                action === "verify" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    className: "h-7 text-xs shrink-0",
                    "data-ocid": "dns.run_verification_button",
                    onClick: runVerification,
                    disabled: verifying,
                    children: verifying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 mr-1 animate-spin" }),
                      "Verifying…"
                    ] }) : verifyDone ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1 text-success" }),
                      "Re-check"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 mr-1" }),
                      "Run Verification Check"
                    ] })
                  }
                )
              ] })
            ]
          },
          label
        )),
        verifyDone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-primary",
            "data-ocid": "dns.verification_status",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 shrink-0" }),
              "Verification in progress… DNS changes may take up to 48h to propagate globally."
            ]
          }
        )
      ] })
    ] })
  ] });
}
function WarmupSchedulerTab() {
  const [warmupActive, setWarmupActive] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wider", children: "Current Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-foreground", children: "Phase 1 — Building Reputation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "7" }),
            " days active"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "10–20" }),
            " ",
            "emails / day target"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: warmupActive ? "outline" : "default",
          className: "gap-1.5",
          "data-ocid": "warmup.toggle_button",
          onClick: () => setWarmupActive((v) => !v),
          children: warmupActive ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3.5 h-3.5" }),
            "Pause Warmup"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3.5 h-3.5" }),
            "Start Warmup"
          ] })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
        "4-Week Ramp-Up Plan"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/50 border-b border-border", children: ["Week", "Daily Sends", "Goal", "Status"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-3 py-2.5 text-left text-xs text-muted-foreground font-medium",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: WARMUP_WEEKS.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `warmup.week.item.${i + 1}`,
            className: cn(
              "border-t border-border",
              i === 0 && "bg-primary/5"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 font-semibold text-foreground", children: row.week }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 font-mono text-sm text-primary font-semibold", children: row.dailySends }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-muted-foreground", children: row.goal }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: cn(
                    "text-xs",
                    row.status === "Active" ? "text-success border-success/30 bg-success/10" : "text-muted-foreground"
                  ),
                  children: row.status
                }
              ) })
            ]
          },
          row.week
        )) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "This Week's Metrics" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
        {
          label: "Sent",
          value: "47",
          sub: "emails",
          color: "text-foreground"
        },
        {
          label: "Delivered",
          value: "45",
          sub: "95.7%",
          color: "text-success"
        },
        {
          label: "Opens",
          value: "18",
          sub: "40.0%",
          color: "text-primary"
        },
        {
          label: "Bounces",
          value: "2",
          sub: "4.3%",
          color: "text-warning"
        }
      ].map(({ label, value, sub, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-4 rounded-xl bg-muted/30 border border-border text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-2xl font-bold tabular-nums", color), children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-xs font-medium mt-0.5", color), children: sub })
          ]
        },
        label
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20",
        "data-ocid": "warmup.tip_callout",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Pro tip: " }),
            "Send emails during business hours",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "(9am–6pm IST)" }),
            " to maximize open rates. Avoid Monday mornings and Friday afternoons."
          ] })
        ]
      }
    )
  ] });
}
function InboxRotationTab() {
  const [rotationStrategy, setRotationStrategy] = reactExports.useState("round_robin");
  const [senders, setSenders] = reactExports.useState(MOCK_INBOX_SENDERS);
  const [newEmail, setNewEmail] = reactExports.useState("");
  const [newDomain, setNewDomain] = reactExports.useState("");
  const [newLimit, setNewLimit] = reactExports.useState("30");
  const [newPrimary, setNewPrimary] = reactExports.useState(false);
  const addSender = () => {
    if (!newEmail.trim() || !newDomain.trim()) return;
    setSenders((prev) => [
      ...prev,
      {
        email: newEmail.trim(),
        domain: newDomain.trim(),
        dailyLimit: Number(newLimit) || 30,
        sentToday: 0,
        status: "Active",
        isPrimary: newPrimary
      }
    ]);
    setNewEmail("");
    setNewDomain("");
    setNewLimit("30");
    setNewPrimary(false);
  };
  const togglePause = (email) => {
    setSenders(
      (prev) => prev.map(
        (s) => s.email === email ? { ...s, status: s.status === "Active" ? "Paused" : "Active" } : s
      )
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-4 h-4 text-primary" }),
        "Active Senders"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[640px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/50 border-b border-border", children: [
          "Email Address",
          "Domain",
          "Daily Limit",
          "Sent Today",
          "Status",
          "Primary",
          ""
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-3 py-2.5 text-left text-xs text-muted-foreground font-medium",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: senders.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `rotation.sender.item.${i + 1}`,
            className: "border-t border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 font-mono text-xs text-foreground", children: s.email }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-muted-foreground text-xs", children: s.domain }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 tabular-nums font-semibold text-foreground", children: s.dailyLimit }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums font-semibold text-foreground", children: s.sentToday }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Progress,
                  {
                    value: s.sentToday / s.dailyLimit * 100,
                    className: "h-1 w-16"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: cn(
                    "text-xs",
                    s.status === "Active" ? "text-success border-success/30 bg-success/10" : "text-muted-foreground"
                  ),
                  children: s.status
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: s.isPrimary && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs text-primary border-primary/30 bg-primary/10",
                  children: "Primary"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  variant: "ghost",
                  className: "h-7 text-xs text-muted-foreground",
                  "data-ocid": `rotation.toggle_sender.${i + 1}`,
                  onClick: () => togglePause(s.email),
                  children: s.status === "Active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3" })
                }
              ) })
            ]
          },
          s.email
        )) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 text-primary" }),
        "Add Sender"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "rotation.email_input",
                placeholder: "outreach@yourdomain.in",
                value: newEmail,
                onChange: (e) => setNewEmail(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Domain" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "rotation.domain_input",
                placeholder: "yourdomain.in",
                value: newDomain,
                onChange: (e) => setNewDomain(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Daily Limit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                "data-ocid": "rotation.limit_input",
                type: "number",
                placeholder: "30",
                value: newLimit,
                onChange: (e) => setNewLimit(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "primary-toggle",
                checked: newPrimary,
                onCheckedChange: setNewPrimary,
                "data-ocid": "rotation.primary_toggle"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "primary-toggle", className: "cursor-pointer", children: "Set as Primary" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            "data-ocid": "rotation.add_sender_button",
            onClick: addSender,
            disabled: !newEmail.trim() || !newDomain.trim(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5" }),
              "Add Sender"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Rotation Strategy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
        {
          key: "round_robin",
          label: "Round Robin",
          desc: "Rotate evenly across all senders"
        },
        {
          key: "load_balanced",
          label: "Load Balanced",
          desc: "Route based on remaining daily capacity"
        },
        {
          key: "primary_first",
          label: "Primary First",
          desc: "Use primary sender until limit, then rotate"
        }
      ].map(({ key, label, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          "data-ocid": `rotation.strategy.${key}`,
          onClick: () => setRotationStrategy(key),
          className: cn(
            "text-left p-4 rounded-xl border transition-smooth",
            rotationStrategy === key ? "border-primary bg-primary/8 shadow-subtle" : "border-border bg-muted/20 hover:border-primary/40"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: cn(
                  "text-sm font-semibold",
                  rotationStrategy === key ? "text-primary" : "text-foreground"
                ),
                children: label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
          ]
        },
        key
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-destructive" }),
        "Bounce Classification"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        BOUNCE_TYPES.map(
          ({ type, color, bg, border, dot, description, count }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "flex items-start gap-3 p-4 rounded-xl border",
                bg,
                border
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-2.5 h-2.5 rounded-full shrink-0 mt-1",
                    style: { backgroundColor: dot }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm font-semibold", color), children: type }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-lg font-bold tabular-nums shrink-0",
                      color
                    ),
                    children: count
                  }
                )
              ]
            },
            type
          )
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic pt-1", children: "Based on publicly available data and heuristics" })
      ] })
    ] })
  ] });
}
function DeliverabilityPage() {
  var _a;
  const { data: identities = [] } = useSenderIdentities();
  const { data: stats = [] } = useDeliverabilityMetrics();
  const addIdentity = useAddSenderIdentity();
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [newIdentifier, setNewIdentifier] = reactExports.useState("");
  const [newType, setNewType] = reactExports.useState("whatsapp");
  const totalDelivered = stats.reduce((s, d) => s + d.deliveredCount, 0);
  const totalReplied = stats.reduce((s, d) => s + d.repliedCount, 0);
  const totalBounced = stats.reduce((s, d) => s + d.bouncedCount, 0);
  const totalOptOut = stats.reduce((s, d) => s + d.optOutCount, 0);
  const totalSent = totalDelivered + totalBounced;
  const deliveryRate = totalSent > 0 ? (totalDelivered / totalSent * 100).toFixed(1) : "0";
  const replyRate = totalDelivered > 0 ? (totalReplied / totalDelivered * 100).toFixed(1) : "0";
  const bounceRate = totalSent > 0 ? (totalBounced / totalSent * 100).toFixed(1) : "0";
  const optOutRate = totalSent > 0 ? (totalOptOut / totalSent * 100).toFixed(1) : "0";
  const waSent = 187;
  const emailSent = 214;
  const queueCount = 43;
  const warmupPhase = ((_a = identities.find((i) => i.senderType === "email_domain")) == null ? void 0 : _a.warmupPhase) ?? "phase2";
  const doAddIdentity = async () => {
    await addIdentity.mutateAsync({
      identifier: newIdentifier,
      senderType: newType
    });
    setNewIdentifier("");
    setShowAddModal(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-6 h-6 text-primary" }),
        "Deliverability & Sender Health"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Monitor delivery rates, manage sender identities, and maintain sender reputation." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      {
        label: "Delivery Rate",
        value: `${deliveryRate}%`,
        icon: CircleCheck,
        color: "text-success",
        bg: "bg-success/10"
      },
      {
        label: "Reply Rate",
        value: `${replyRate}%`,
        icon: MessageCircle,
        color: "text-primary",
        bg: "bg-primary/10"
      },
      {
        label: "Bounce Rate",
        value: `${bounceRate}%`,
        icon: CircleX,
        color: "text-warning",
        bg: "bg-warning/10"
      },
      {
        label: "Opt-Out Rate",
        value: `${optOutRate}%`,
        icon: TriangleAlert,
        color: "text-destructive",
        bg: "bg-destructive/10"
      }
    ].map(({ label, value, icon: Icon, color, bg }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
            bg
          ),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-4 h-4", color) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-2xl font-bold tabular-nums", color), children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
    ] }) }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "overview", "data-ocid": "deliverability.tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full justify-start overflow-x-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "overview", "data-ocid": "deliverability.tab.overview", children: "Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "domain", "data-ocid": "deliverability.tab.domain", children: "Email Domain Setup" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "warmup", "data-ocid": "deliverability.tab.warmup", children: "Warmup Scheduler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "rotation", "data-ocid": "deliverability.tab.rotation", children: "Inbox Rotation" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "overview", className: "space-y-6 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Sender Identities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                "data-ocid": "deliverability.add_sender_button",
                onClick: () => setShowAddModal(true),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                  "Add Identity"
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            identities.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                "data-ocid": "deliverability.empty_state",
                className: "text-center py-8 text-muted-foreground text-sm",
                children: "No sender identities configured"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: identities.map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `deliverability.sender.item.${i + 1}`,
                className: "flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ReputationRing, { score: id.reputationScore }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-foreground", children: id.identifier }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: cn(
                            "text-xs",
                            id.senderType === "whatsapp" ? "text-success border-success/30 bg-success/10" : "text-primary border-primary/30 bg-primary/10"
                          ),
                          children: id.senderType === "whatsapp" ? "WhatsApp" : "Email Domain"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-xs text-muted-foreground",
                          children: WarmupPhaseLabels[id.warmupPhase]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-2 text-center", children: [
                      {
                        label: "Sent",
                        val: id.totalSent,
                        cls: "text-foreground"
                      },
                      {
                        label: "Delivered",
                        val: id.totalDelivered,
                        cls: "text-success"
                      },
                      {
                        label: "Replied",
                        val: id.totalReplied,
                        cls: "text-primary"
                      },
                      {
                        label: "Bounced",
                        val: id.totalBounced,
                        cls: "text-warning"
                      },
                      {
                        label: "Opt-Out",
                        val: id.totalOptOut,
                        cls: "text-destructive"
                      }
                    ].map(({ label, val, cls }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "p-1.5 rounded-lg bg-background/60",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "p",
                            {
                              className: cn(
                                "text-sm font-bold tabular-nums",
                                cls
                              ),
                              children: val
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: label })
                        ]
                      },
                      label
                    )) })
                  ] })
                ]
              },
              id.id.toString()
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
            "Domain Warm-up Tracker"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "You are in",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "Phase 2" }),
                ". Keep sends under",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "50/day" }),
                " to maintain sender reputation. Current phase:",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: WarmupPhaseLabels[warmupPhase] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "Daily Email Send Volume (7 days)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MiniBarChart, { data: stats.map((s) => s.deliveredCount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between text-[10px] text-muted-foreground mt-1", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.date.slice(5) }, s.date)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "7-Day Delivery Trend" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            LineSVG,
            {
              delivered: stats.map((s) => s.deliveredCount),
              replied: stats.map((s) => s.repliedCount),
              bounced: stats.map((s) => s.bouncedCount)
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary" }),
            "Rate Limit Monitor"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              {
                label: "WhatsApp",
                sent: waSent,
                limit: 1e3,
                color: "bg-success"
              },
              {
                label: "Email",
                sent: emailSent,
                limit: 500,
                color: "bg-primary"
              }
            ].map(({ label, sent, limit, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground tabular-nums text-xs", children: [
                  sent,
                  " / ",
                  limit,
                  " sent today"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "h-full rounded-full transition-all",
                    color
                  ),
                  style: { width: `${sent / limit * 100}%` }
                }
              ) })
            ] }, label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-muted/40 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                  queueCount,
                  " messages"
                ] }),
                " ",
                "queued — next batch in",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: "12m" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Retry Queue" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/50 border-b border-border", children: [
              "Contact",
              "Channel",
              "Attempt #",
              "Next Retry",
              "Action"
            ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-3 py-2.5 text-left text-xs text-muted-foreground font-medium",
                children: h
              },
              h
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: MOCK_RETRY_QUEUE.map((row, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                "data-ocid": `deliverability.retry.item.${idx + 1}`,
                className: "border-t border-border",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 font-medium text-foreground text-sm", children: row.contact }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: cn(
                        "text-xs",
                        row.channel === "WhatsApp" ? "text-success border-success/30" : "text-primary border-primary/30"
                      ),
                      children: row.channel
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5 text-muted-foreground text-sm", children: [
                    "#",
                    row.attempt
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-sm text-warning font-medium", children: row.retryAt }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      "data-ocid": `deliverability.retry_button.${idx + 1}`,
                      className: "h-7 text-xs",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 mr-1" }),
                        "Retry Now"
                      ]
                    }
                  ) })
                ]
              },
              row.contact
            )) })
          ] }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "domain", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmailDomainSetupTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "warmup", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WarmupSchedulerTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rotation", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InboxRotationTab, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAddModal, onOpenChange: setShowAddModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogContent,
      {
        className: "sm:max-w-sm",
        "data-ocid": "deliverability.dialog",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Sender Identity" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Identifier" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "deliverability.identifier_input",
                  placeholder: "+91 98001 23456 or domain@company.com",
                  value: newIdentifier,
                  onChange: (e) => setNewIdentifier(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: newType,
                  onValueChange: (v) => setNewType(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "deliverability.sender_type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "whatsapp", children: "WhatsApp Number" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "email_domain", children: "Email Domain" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  "data-ocid": "deliverability.cancel_button",
                  onClick: () => setShowAddModal(false),
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "deliverability.submit_button",
                  onClick: doAddIdentity,
                  disabled: addIdentity.isPending || !newIdentifier.trim(),
                  children: addIdentity.isPending ? "Adding…" : "Add Identity"
                }
              )
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  DeliverabilityPage as default
};
