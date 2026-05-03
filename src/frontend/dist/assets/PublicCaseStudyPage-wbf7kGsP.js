import { cM as useParams, j as jsxRuntimeExports, T as TrendingUp, i as Button, y as motion, ab as Sparkles, h as Badge, n as Card, ag as ArrowRight, a0 as CircleCheck, b3 as Separator, M as MessageCircle, au as ChevronRight, m as ue } from "./index-DcPx_5wo.js";
import { e as usePublicCaseStudy, g as generateShareUrl } from "./useCaseStudies-BPZbiywB.js";
import { L as Link2 } from "./link-2-CK4l1WJN.js";
function PublicCaseStudyPage() {
  const { shareToken } = useParams({ strict: false });
  const { data: study, isLoading } = usePublicCaseStudy(shareToken ?? "");
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => ue.success("Link copied!"));
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center h-screen bg-background",
        "data-ocid": "public_case_study.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" })
      }
    );
  }
  if (!study) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center h-screen bg-background gap-4 px-6",
        "data-ocid": "public_case_study.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Case study not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "This link may have expired or been removed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: () => {
                window.location.href = "/";
              },
              "data-ocid": "public_case_study.home_button",
              children: "Go to GrowthOS"
            }
          )
        ]
      }
    );
  }
  const url = study.shareToken ? generateShareUrl(study.shareToken) : window.location.href;
  const whatsappMsg = encodeURIComponent(
    `Check out this growth story: ${study.title}
${url}`
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background",
      "data-ocid": "public_case_study.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-5 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                  "Powered by GrowthOS"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                  study.niche,
                  " · ",
                  study.city
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-display font-bold text-foreground leading-tight", children: study.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: study.clientName })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-5 py-8 space-y-8", children: [
          study.metrics && study.metrics.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground uppercase tracking-wider mb-3", children: "Results" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: study.metrics.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Card,
                  {
                    className: "p-4 text-center bg-card border-border",
                    "data-ocid": "public_case_study.metric_card",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide mb-2", children: m.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground line-through decoration-1", children: m.before }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5 text-primary" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-primary", children: m.after })
                      ] })
                    ]
                  },
                  m.label
                )) })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 },
              className: "grid grid-cols-2 gap-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-muted/30", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1", children: "Before" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: study.beforeMetric })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 bg-primary/5 border-primary/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wider mb-1", children: "After" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold text-foreground", children: study.afterMetric })
                ] })
              ]
            }
          ),
          study.results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: study.results.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: r.positive ? "text-success border-success/30 bg-success/5" : "text-destructive border-destructive/30",
              children: [
                r.positive ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }) : null,
                r.label,
                ": ",
                r.value
              ]
            },
            r.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.2 },
              className: "space-y-5",
              children: [
                study.challenge && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-2", children: "The Challenge" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: study.challenge })
                ] }),
                study.actionsTaken && study.actionsTaken.filter(Boolean).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-3", children: "What We Did" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: study.actionsTaken.filter(Boolean).map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex items-start gap-2.5 text-sm text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success mt-0.5 shrink-0" }),
                        action
                      ]
                    },
                    action
                  )) })
                ] }),
                study.solution && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground mb-2", children: "The Solution" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: study.solution })
                ] })
              ]
            }
          ),
          study.testimonial && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.98 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.25 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 border-l-4 border-l-primary bg-primary/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground italic text-sm leading-relaxed", children: [
                  '"',
                  study.testimonial,
                  '"'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
                  "— ",
                  study.clientName
                ] })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "gap-2",
                onClick: handleCopy,
                "data-ocid": "public_case_study.copy_link_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "w-4 h-4" }),
                  " Copy Link"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                className: "gap-2 text-[#25D366] border-[#25D366]/30 hover:bg-[#25D366]/5",
                onClick: () => window.open(`https://wa.me/?text=${whatsappMsg}`, "_blank"),
                "data-ocid": "public_case_study.share_whatsapp_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
                  " WhatsApp"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.35 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 text-center space-y-3",
                  "data-ocid": "public_case_study.cta_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground", children: "Get similar results for your business" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                        "GrowthOS helps ",
                        study.niche.toLowerCase(),
                        " businesses in India generate steady enquiries and convert them to bookings."
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        className: "gap-2",
                        onClick: () => {
                          window.location.href = "/login";
                        },
                        "data-ocid": "public_case_study.cta_button",
                        children: [
                          "Start Free Today ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Results depend on execution, location, and offer.",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "a",
                        {
                          href: "/login",
                          className: "text-primary underline-offset-2 hover:underline",
                          children: "Login to explore"
                        }
                      )
                    ] })
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground pb-4", children: "Built with GrowthOS · Client acquisition platform for local businesses" })
        ] })
      ]
    }
  );
}
export {
  PublicCaseStudyPage as default
};
