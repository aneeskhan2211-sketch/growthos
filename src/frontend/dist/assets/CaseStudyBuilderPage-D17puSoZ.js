import { r as reactExports, j as jsxRuntimeExports, i as Button, ai as Plus, n as Card, bd as Briefcase, aJ as Dialog, aK as DialogContent, aL as DialogHeader, aM as DialogTitle, A as AnimatePresence, y as motion, s as Copy, m as ue, h as Badge, a0 as CircleCheck, ag as ArrowRight, cK as Trash2, L as Label, I as Input, ap as Select, aq as SelectTrigger, ar as SelectValue, as as SelectContent, at as SelectItem, z as Textarea, X } from "./index-DcPx_5wo.js";
import { u as useCaseStudies, a as useCreateCaseStudy, b as useUpdateCaseStudy, c as usePublishCaseStudy, d as useDeleteCaseStudy, g as generateShareUrl } from "./useCaseStudies-BPZbiywB.js";
import { P as Pen } from "./pen-BMPmZvPW.js";
import { S as Share2 } from "./share-2-B0FlqflR.js";
import { L as Link2 } from "./link-2-CK4l1WJN.js";
const NICHES = [
  "Salon",
  "Gym",
  "Clinic",
  "Restaurant",
  "Real Estate",
  "Coaching",
  "Other"
];
const EMPTY_FORM = {
  title: "",
  clientName: "",
  niche: "",
  city: "",
  challenge: "",
  solution: "",
  actionsTaken: [""],
  metrics: [{ label: "", before: "", after: "" }],
  results: [],
  beforeMetric: "",
  afterMetric: "",
  testimonial: ""
};
function ProofCard({
  study,
  onClose
}) {
  const url = study.shareToken ? generateShareUrl(study.shareToken) : "";
  const headline = study.metrics[0] ? `${study.clientName} grew from ${study.metrics[0].before} to ${study.metrics[0].after} ${study.metrics[0].label.toLowerCase()}` : `${study.clientName} achieved remarkable results`;
  const whatsappMsg = encodeURIComponent(
    `Check out this growth story: ${study.title}
${url}`
  );
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => ue.success("Link copied!"));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-2xl overflow-hidden shadow-xl",
        style: { aspectRatio: "1/1", maxWidth: 420, margin: "0 auto" },
        "data-ocid": "case_studies.proof_card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-gradient-to-br from-primary to-primary/60 p-7 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/70 text-xs font-semibold tracking-widest uppercase", children: "GrowthOS · Client Win" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-primary-foreground/20 text-primary-foreground border-0 text-xs", children: [
              study.niche,
              " · ",
              study.city
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm font-medium leading-snug", children: headline }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: study.metrics.slice(0, 4).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "bg-primary-foreground/10 backdrop-blur rounded-xl p-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/60 text-[10px] uppercase tracking-wide mb-1", children: m.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/60 text-sm font-semibold", children: m.before }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3 text-primary-foreground/50 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground text-sm font-bold", children: m.after })
                  ] })
                ]
              },
              m.label
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            study.testimonial ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary-foreground/80 text-xs italic line-clamp-2", children: [
              '"',
              study.testimonial,
              '"'
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/50 text-[10px] tracking-wider uppercase", children: "Results achieved with GrowthOS" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "w-full gap-2",
          onClick: copyLink,
          "data-ocid": "case_studies.copy_link_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4" }),
            " Copy Shareable Link"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "gap-2 text-[#25D366] border-[#25D366]/30 hover:bg-[#25D366]/5",
            onClick: () => window.open(`https://wa.me/?text=${whatsappMsg}`, "_blank"),
            "data-ocid": "case_studies.share_whatsapp_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
              " WhatsApp"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "outline",
            className: "gap-2 text-[#0A66C2] border-[#0A66C2]/30 hover:bg-[#0A66C2]/5",
            onClick: () => window.open(linkedinUrl, "_blank"),
            "data-ocid": "case_studies.share_linkedin_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
              " LinkedIn"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "ghost",
        className: "w-full",
        onClick: onClose,
        "data-ocid": "case_studies.proof_card.close_button",
        children: "Done"
      }
    )
  ] });
}
function StudyCard({
  study,
  index,
  onDelete,
  onPublish,
  onShare,
  onEdit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "p-5 space-y-4 hover:shadow-md transition-shadow",
          "data-ocid": `case_studies.item.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground truncate text-sm leading-snug", children: study.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  study.clientName,
                  " · ",
                  study.niche,
                  " · ",
                  study.city
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: study.published ? "text-success border-success/30 bg-success/5 shrink-0" : "text-muted-foreground shrink-0",
                  children: study.published ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
                    " Published"
                  ] }) : "Draft"
                }
              )
            ] }),
            study.metrics.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: study.metrics.slice(0, 2).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: m.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: m.before }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-2.5 h-2.5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: m.after })
              ] })
            ] }, m.label)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Before" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium truncate", children: study.beforeMetric })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/15 rounded-lg p-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-primary", children: "After" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium truncate", children: study.afterMetric })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "ghost",
                  className: "h-8 px-2.5 text-xs",
                  onClick: onEdit,
                  "data-ocid": `case_studies.edit_button.${index + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5 mr-1" }),
                    " Edit"
                  ]
                }
              ),
              !study.published && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "default",
                  className: "h-8 px-3 text-xs",
                  onClick: onPublish,
                  "data-ocid": `case_studies.item.${index + 1}.publish`,
                  children: "Publish"
                }
              ),
              study.published && study.shareToken && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  className: "h-8 px-2.5 text-xs",
                  onClick: onShare,
                  "data-ocid": `case_studies.item.${index + 1}.share`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5 mr-1" }),
                    " Share"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "ghost",
                  className: "h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto",
                  onClick: onDelete,
                  "data-ocid": `case_studies.delete_button.${index + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function CaseStudyForm({
  initial,
  onSave,
  onClose,
  isSaving,
  isEdit
}) {
  const [form, setForm] = reactExports.useState(initial);
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setAction = (i, val) => set(
    "actionsTaken",
    form.actionsTaken.map((a, idx) => idx === i ? val : a)
  );
  const addAction = () => set("actionsTaken", [...form.actionsTaken, ""]);
  const removeAction = (i) => set(
    "actionsTaken",
    form.actionsTaken.filter((_, idx) => idx !== i)
  );
  const setMetric = (i, field, val) => set(
    "metrics",
    form.metrics.map((m, idx) => idx === i ? { ...m, [field]: val } : m)
  );
  const addMetric = () => set("metrics", [...form.metrics, { label: "", before: "", after: "" }]);
  const removeMetric = (i) => set(
    "metrics",
    form.metrics.filter((_, idx) => idx !== i)
  );
  const canSave = form.clientName.trim() && form.niche && form.city.trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 overflow-y-auto max-h-[72vh] pr-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: form.title,
            onChange: (e) => set("title", e.target.value),
            placeholder: "Salon Mumbai Growth Story",
            "data-ocid": "case_studies.title_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Client Name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: form.clientName,
            onChange: (e) => set("clientName", e.target.value),
            placeholder: "Glamour Studio",
            "data-ocid": "case_studies.client_name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "City *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: form.city,
            onChange: (e) => set("city", e.target.value),
            placeholder: "Mumbai",
            "data-ocid": "case_studies.city_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Niche *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.niche, onValueChange: (v) => set("niche", v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-ocid": "case_studies.niche_select", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select niche" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: NICHES.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: n, children: n }, n)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Problem Statement" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: form.challenge,
          onChange: (e) => set("challenge", e.target.value),
          rows: 2,
          placeholder: "Describe the client's main challenge…",
          "data-ocid": "case_studies.challenge_textarea"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Actions Taken" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "ghost",
            className: "h-7 px-2 text-xs",
            onClick: addAction,
            "data-ocid": "case_studies.add_action_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
              " Add"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: form.actionsTaken.map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: action,
            onChange: (e) => setAction(i, e.target.value),
            placeholder: "e.g. Set up Google Business Profile",
            className: "h-8 text-sm",
            "data-ocid": `case_studies.action_input.${i + 1}`
          }
        ),
        form.actionsTaken.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "ghost",
            className: "h-8 w-8 p-0 shrink-0 text-muted-foreground hover:text-destructive",
            onClick: () => removeAction(i),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
          }
        )
      ] }, action || String(i))) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Result Metrics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: "ghost",
            className: "h-7 px-2 text-xs",
            onClick: addMetric,
            "data-ocid": "case_studies.add_metric_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
              " Add Row"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[2fr_1fr_1fr_auto] gap-1.5 px-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Before" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "After" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8" })
        ] }),
        form.metrics.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-[2fr_1fr_1fr_auto] gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: m.label,
                  onChange: (e) => setMetric(i, "label", e.target.value),
                  placeholder: "Monthly Enquiries",
                  className: "h-8 text-sm",
                  "data-ocid": `case_studies.metric_label.${i + 1}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: m.before,
                  onChange: (e) => setMetric(i, "before", e.target.value),
                  placeholder: "5",
                  className: "h-8 text-sm",
                  "data-ocid": `case_studies.metric_before.${i + 1}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: m.after,
                  onChange: (e) => setMetric(i, "after", e.target.value),
                  placeholder: "45",
                  className: "h-8 text-sm",
                  "data-ocid": `case_studies.metric_after.${i + 1}`
                }
              ),
              form.metrics.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "ghost",
                  className: "h-8 w-8 p-0 text-muted-foreground hover:text-destructive",
                  onClick: () => removeMetric(i),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8" })
            ]
          },
          m.label || `metric-${i}`
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        "Testimonial Quote",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "(optional)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          value: form.testimonial ?? "",
          onChange: (e) => set("testimonial", e.target.value),
          rows: 2,
          placeholder: '"GrowthOS transformed how we get clients…" — Client Name',
          "data-ocid": "case_studies.testimonial_textarea"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end pt-1 sticky bottom-0 bg-background pb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onClose,
          "data-ocid": "case_studies.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          disabled: !canSave || isSaving,
          onClick: () => onSave(form, false),
          "data-ocid": "case_studies.save_draft_button",
          children: "Save as Draft"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          disabled: !canSave || isSaving,
          onClick: () => onSave(form, true),
          "data-ocid": "case_studies.submit_button",
          children: isEdit ? "Update & Publish" : "Publish"
        }
      )
    ] })
  ] });
}
function CaseStudyBuilderPage() {
  const { data: studies = [], isLoading } = useCaseStudies();
  const createStudy = useCreateCaseStudy();
  const updateStudy = useUpdateCaseStudy();
  const publishStudy = usePublishCaseStudy();
  const deleteStudy = useDeleteCaseStudy();
  const [mode, setMode] = reactExports.useState(
    "list"
  );
  const [editTarget, setEditTarget] = reactExports.useState(null);
  const [shareTarget, setShareTarget] = reactExports.useState(null);
  const openCreate = () => {
    setEditTarget(null);
    setMode("create");
  };
  const openEdit = (s) => {
    setEditTarget(s);
    setMode("edit");
  };
  const openShare = (s) => {
    setShareTarget(s);
    setMode("share");
  };
  const closeDialog = () => {
    setMode("list");
    setEditTarget(null);
    setShareTarget(null);
  };
  const handleSave = async (data, publish) => {
    if (editTarget) {
      await updateStudy.mutateAsync({ id: editTarget.id, ...data });
      if (publish) await publishStudy.mutateAsync(editTarget.id);
      ue.success("Case study updated");
    } else {
      const result = await createStudy.mutateAsync(data);
      if (publish && result) {
        const id = result.id;
        if (id) await publishStudy.mutateAsync(String(id)).catch(() => {
        });
      }
      ue.success(publish ? "Case study published!" : "Saved as draft");
    }
    closeDialog();
  };
  const handlePublish = async (study) => {
    await publishStudy.mutateAsync(study.id);
    ue.success("Published! Share it to attract more clients.");
    setTimeout(
      () => openShare({
        ...study,
        published: true,
        shareToken: study.shareToken ?? study.id
      }),
      400
    );
  };
  const handleDelete = (study) => {
    deleteStudy.mutate(study.id);
    ue.success("Case study deleted");
  };
  const initialForm = editTarget ? {
    title: editTarget.title,
    clientName: editTarget.clientName,
    niche: editTarget.niche,
    city: editTarget.city,
    challenge: editTarget.challenge,
    solution: editTarget.solution,
    actionsTaken: editTarget.actionsTaken.length ? editTarget.actionsTaken : [""],
    metrics: editTarget.metrics.length ? editTarget.metrics : [{ label: "", before: "", after: "" }],
    results: editTarget.results,
    beforeMetric: editTarget.beforeMetric,
    afterMetric: editTarget.afterMetric,
    testimonial: editTarget.testimonial ?? ""
  } : EMPTY_FORM;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Case Study Builder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Document client wins and auto-generate shareable proof cards." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: openCreate,
          "data-ocid": "case_studies.open_modal_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            " New Case Study"
          ]
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center h-40",
        "data-ocid": "case_studies.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" })
      }
    ),
    !isLoading && studies.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "flex flex-col items-center justify-center py-16 gap-4",
        "data-ocid": "case_studies.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-7 h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Document your first client win" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Turn real client results into shareable proof cards that attract more leads." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: openCreate,
              "data-ocid": "case_studies.empty_state.create_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
                " Create Case Study"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: studies.map((study, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      StudyCard,
      {
        study,
        index: i,
        onDelete: () => handleDelete(study),
        onPublish: () => handlePublish(study),
        onShare: () => openShare(study),
        onEdit: () => openEdit(study)
      },
      study.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: mode === "create" || mode === "edit",
        onOpenChange: (o) => !o && closeDialog(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xl", "data-ocid": "case_studies.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: mode === "edit" ? "Edit Case Study" : "New Case Study" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              transition: { duration: 0.15 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CaseStudyForm,
                {
                  initial: initialForm,
                  onSave: handleSave,
                  onClose: closeDialog,
                  isSaving: createStudy.isPending || updateStudy.isPending,
                  isEdit: mode === "edit"
                }
              )
            },
            (editTarget == null ? void 0 : editTarget.id) ?? "new"
          ) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open: mode === "share" && !!shareTarget,
        onOpenChange: (o) => !o && closeDialog(),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "max-w-sm",
            "data-ocid": "case_studies.share_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" }),
                " Shareable Proof Card"
              ] }) }),
              shareTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(ProofCard, { study: shareTarget, onClose: closeDialog })
            ]
          }
        )
      }
    )
  ] });
}
export {
  CaseStudyBuilderPage as default
};
