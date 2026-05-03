import { c as createLucideIcon, aG as useMetaTags, r as reactExports, j as jsxRuntimeExports, k as Shield, i as Button, aH as Download, aI as ShieldCheck, aC as TriangleAlert, n as Card, p as CardContent, f as cn, o as CardHeader, aw as CardTitle, h as Badge, aE as Info, aJ as Dialog, aK as DialogContent, aL as DialogHeader, aM as DialogTitle, L as Label, I as Input, ap as Select, aq as SelectTrigger, ar as SelectValue, as as SelectContent, at as SelectItem, z as Textarea, a0 as CircleCheck, aF as CircleX, aN as PAGE_META } from "./index-DcPx_5wo.js";
import { b as useConsentLogs, c as useUpdateConsentStatus, d as useRecordConsentLog } from "./useCompliance-t_Kwfulr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode);
const OPT_OUT_KEYWORDS = [
  "stop",
  "unsubscribe",
  "remove",
  "opt-out",
  "don't contact",
  "nahi chahiye"
];
const CONSENT_TYPE_LABELS = {
  form_submission: "Form Submission",
  reply_first: "Reply First",
  qr_optin: "QR Opt-In",
  manual_override: "Manual Override"
};
function statusBadge(status) {
  if (status === "granted")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Badge,
      {
        variant: "outline",
        className: "text-success border-success/30 bg-success/10 text-xs gap-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
          " Granted"
        ]
      }
    );
  if (status === "withdrawn")
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Badge,
      {
        variant: "outline",
        className: "text-destructive border-destructive/30 bg-destructive/10 text-xs gap-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
          " Withdrawn"
        ]
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: "text-warning border-warning/30 bg-warning/10 text-xs gap-1",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
        " Pending"
      ]
    }
  );
}
function consentTypeBadge(ct) {
  const colors = {
    form_submission: "text-primary border-primary/30 bg-primary/10",
    reply_first: "text-success border-success/30 bg-success/10",
    qr_optin: "text-chart-5 border-chart-5/30 bg-chart-5/10",
    manual_override: "text-warning border-warning/30 bg-warning/10"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: cn("text-xs", colors[ct]), children: CONSENT_TYPE_LABELS[ct] });
}
function downloadCSV(logs) {
  const headers = [
    "ID",
    "Timestamp",
    "Phone",
    "Email",
    "Consent Type",
    "Status",
    "Template",
    "Notes"
  ];
  const rows = logs.map((l) => [
    l.id.toString(),
    new Date(Number(l.timestamp) / 1e6).toISOString(),
    l.phone,
    l.email,
    l.consentType,
    l.status,
    l.messageTemplate,
    `"${l.notes.replace(/"/g, '""')}"`
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `consent_log_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function CompliancePage() {
  useMetaTags(PAGE_META["/compliance"]);
  const { data: logs = [] } = useConsentLogs();
  const updateStatus = useUpdateConsentStatus();
  const recordLog = useRecordConsentLog();
  const [filter, setFilter] = reactExports.useState("all");
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    phone: "",
    email: "",
    consentType: "form_submission",
    template: "",
    notes: ""
  });
  const filtered = filter === "all" ? logs : logs.filter((l) => l.status === filter);
  const granted = logs.filter((l) => l.status === "granted").length;
  const withdrawn = logs.filter((l) => l.status === "withdrawn").length;
  const pending = logs.filter((l) => l.status === "pending").length;
  const consentPct = logs.length > 0 ? Math.round(granted / logs.length * 100) : 0;
  const submitLog = async () => {
    await recordLog.mutateAsync({ ...form, userId: "user_1" });
    setForm({
      phone: "",
      email: "",
      consentType: "form_submission",
      template: "",
      notes: ""
    });
    setShowAddForm(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-primary" }),
          "Consent & Compliance Center"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Track opt-in consent for every contact. Only consented contacts are eligible for outreach." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            "data-ocid": "compliance.export_button",
            onClick: () => downloadCSV(logs),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4 mr-1.5" }),
              "Export CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            "data-ocid": "compliance.add_consent_button",
            onClick: () => setShowAddForm(true),
            children: "+ Add Consent Log"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
      {
        label: "Total Contacts",
        value: logs.length,
        icon: Shield,
        color: "text-foreground",
        bg: "bg-muted/40"
      },
      {
        label: "Consented",
        value: `${consentPct}%`,
        icon: ShieldCheck,
        color: "text-success",
        bg: "bg-success/10"
      },
      {
        label: "Opted Out",
        value: withdrawn,
        icon: ShieldAlert,
        color: "text-destructive",
        bg: "bg-destructive/10"
      },
      {
        label: "Pending Consent",
        value: pending,
        icon: TriangleAlert,
        color: "text-warning",
        bg: "bg-warning/10"
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-2xl font-bold", color), children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
    ] }) }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Consent Log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", "data-ocid": "compliance.filter_tabs", children: ["all", "granted", "withdrawn", "pending"].map(
          (tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `compliance.filter.${tab}`,
              onClick: () => setFilter(tab),
              className: cn(
                "px-3 py-1 text-xs rounded-lg font-medium transition-colors capitalize",
                filter === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              ),
              children: [
                tab,
                " ",
                tab === "all" ? `(${logs.length})` : tab === "granted" ? `(${granted})` : tab === "withdrawn" ? `(${withdrawn})` : `(${pending})`
              ]
            },
            tab
          )
        ) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs text-muted-foreground font-medium", children: "Timestamp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs text-muted-foreground font-medium", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs text-muted-foreground font-medium", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs text-muted-foreground font-medium", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs text-muted-foreground font-medium", children: "Template" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs text-muted-foreground font-medium", children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2.5 text-left text-xs text-muted-foreground font-medium", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 7,
              className: "px-3 py-8 text-center text-muted-foreground text-xs",
              "data-ocid": "compliance.empty_state",
              children: "No consent logs match the current filter"
            }
          ) }),
          filtered.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `compliance.log.item.${i + 1}`,
              className: "border-t border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap", children: new Date(
                  Number(log.timestamp) / 1e6
                ).toLocaleDateString("en-IN") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: log.phone || log.email }),
                  log.phone && log.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: log.email })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: consentTypeBadge(log.consentType) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5", children: statusBadge(log.status) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs text-muted-foreground font-mono", children: log.messageTemplate }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-xs text-muted-foreground max-w-[160px] truncate", children: log.notes }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-2.5", children: [
                  log.status === "granted" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      "data-ocid": `compliance.withdraw_button.${i + 1}`,
                      className: "text-xs h-7 text-destructive border-destructive/30 hover:bg-destructive/10",
                      onClick: () => updateStatus.mutate({
                        id: log.id,
                        status: "withdrawn"
                      }),
                      children: "Withdraw"
                    }
                  ),
                  log.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      "data-ocid": `compliance.grant_button.${i + 1}`,
                      className: "text-xs h-7 text-success border-success/30 hover:bg-success/10",
                      onClick: () => updateStatus.mutate({
                        id: log.id,
                        status: "granted"
                      }),
                      children: "Grant"
                    }
                  )
                ] })
              ]
            },
            log.id.toString()
          ))
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-warning" }),
        "Opt-Out Auto-Detection"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'GrowthOS automatically detects opt-out keywords in replies and immediately stops outreach. Contacts sending these keywords are moved to "Withdrawn" status.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: OPT_OUT_KEYWORDS.map((kw) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "font-mono text-xs text-destructive border-destructive/30 bg-destructive/5",
            children: kw
          },
          kw
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-warning shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-warning", children: withdrawn }),
            " ",
            "opt-outs detected and honoured this week"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 shrink-0 mt-0.5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "GrowthOS enforces opt-in consent. No outreach is sent to contacts without explicit consent on record. Data is labeled as",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"Based on publicly available data and heuristics"' }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAddForm, onOpenChange: setShowAddForm, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "compliance.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Record Consent Log" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-phone", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cp-phone",
                "data-ocid": "compliance.phone_input",
                placeholder: "+91 98765 43210",
                value: form.phone,
                onChange: (e) => setForm((f) => ({ ...f, phone: e.target.value }))
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-email", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "cp-email",
                "data-ocid": "compliance.email_input",
                placeholder: "contact@business.com",
                value: form.email,
                onChange: (e) => setForm((f) => ({ ...f, email: e.target.value }))
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Consent Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: form.consentType,
              onValueChange: (v) => setForm((f) => ({ ...f, consentType: v })),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "compliance.consent_type_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(CONSENT_TYPE_LABELS).map(([val, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: val, children: label }, val)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-template", children: "Template Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "cp-template",
              "data-ocid": "compliance.template_input",
              placeholder: "e.g. salon_intro_v2",
              value: form.template,
              onChange: (e) => setForm((f) => ({ ...f, template: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-notes", children: "Notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "cp-notes",
              "data-ocid": "compliance.notes_textarea",
              placeholder: "How was consent obtained?",
              rows: 2,
              value: form.notes,
              onChange: (e) => setForm((f) => ({ ...f, notes: e.target.value }))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              "data-ocid": "compliance.cancel_button",
              onClick: () => setShowAddForm(false),
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "compliance.submit_button",
              onClick: submitLog,
              disabled: recordLog.isPending || !form.phone && !form.email,
              children: recordLog.isPending ? "Saving…" : "Record Consent"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  CompliancePage as default
};
