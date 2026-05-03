import { cN as useSeoPages, cO as useGenerateSeoPages, cP as usePublishSeoPage, cQ as useDeleteSeoPage, r as reactExports, j as jsxRuntimeExports, i as Button, ai as Plus, n as Card, ak as Globe, h as Badge, aT as ExternalLink, a1 as Rocket, m as ue, cK as Trash2, aJ as Dialog, aK as DialogContent, aL as DialogHeader, aM as DialogTitle, L as Label, ap as Select, aq as SelectTrigger, ar as SelectValue, as as SelectContent, at as SelectItem, X } from "./index-DcPx_5wo.js";
const NICHES = [
  "Salon",
  "Gym",
  "Clinic",
  "Restaurant",
  "Real Estate",
  "Coaching"
];
const CITIES = [
  "Mumbai",
  "Pune",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Other"
];
function BulkSeoGeneratorPage() {
  const { data: pages = [], isLoading } = useSeoPages();
  const generatePages = useGenerateSeoPages();
  const publishPage = usePublishSeoPage();
  const deletePage = useDeleteSeoPage();
  const [showAdd, setShowAdd] = reactExports.useState(false);
  const [chips, setChips] = reactExports.useState([]);
  const [pickedNiche, setPickedNiche] = reactExports.useState("Salon");
  const [pickedCity, setPickedCity] = reactExports.useState("Mumbai");
  const addChip = () => {
    if (chips.length >= 20) return;
    const exists = chips.some(
      (c) => c.niche === pickedNiche && c.city === pickedCity
    );
    if (exists) {
      ue.error("That niche+city pair is already added.");
      return;
    }
    setChips((prev) => [...prev, { niche: pickedNiche, city: pickedCity }]);
  };
  const removeChip = (idx) => setChips((prev) => prev.filter((_, i) => i !== idx));
  const handleGenerate = async () => {
    if (!chips.length) return;
    const requests = chips.map((c) => ({
      niche: c.niche,
      city: c.city,
      area: "",
      targetKeyword: `${c.niche.toLowerCase()} marketing ${c.city.toLowerCase()}`
    }));
    try {
      await generatePages.mutateAsync(requests);
      ue.success(
        `${chips.length} SEO page${chips.length !== 1 ? "s" : ""} generated`
      );
      setChips([]);
      setShowAdd(false);
    } catch {
      ue.error("Generation failed. Please try again.");
    }
  };
  const totalPages = pages.length;
  const published = pages.filter((p) => p.published).length;
  const drafts = totalPages - published;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Bulk SEO Page Generator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          "Generate multiple niche+city landing pages at once. Pages are accessible at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs bg-muted px-1.5 py-0.5 rounded font-mono", children: "/seo-page/[niche]-[city]" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: () => setShowAdd(true),
          "data-ocid": "seo_generator.open_modal_button",
          className: "shrink-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
            " Generate Pages"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [
      { label: "Total Pages", value: totalPages, color: "text-foreground" },
      { label: "Published", value: published, color: "text-success" },
      { label: "Draft", value: drafts, color: "text-muted-foreground" }
    ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-bold ${s.color}`, children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s.label })
    ] }, s.label)) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center h-40",
        "data-ocid": "seo_generator.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" })
      }
    ),
    !isLoading && pages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "flex flex-col items-center justify-center h-48 gap-3",
        "data-ocid": "seo_generator.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-8 h-8 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No SEO pages yet. Generate your first batch." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              onClick: () => setShowAdd(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1.5" }),
                " Create Pages"
              ]
            }
          )
        ]
      }
    ),
    !isLoading && pages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Slug / Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Niche" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pages.map((page, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors",
          "data-ocid": `seo_generator.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-xs", children: page.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: [
                "/",
                page.slug
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: page.niche }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-foreground", children: page.city }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: page.published ? "text-success border-success/30 bg-success/5" : "text-muted-foreground border-border",
                  children: page.published ? "Published" : "Draft"
                }
              ),
              page.published && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                "/seo-page/",
                page.slug
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "ghost",
                  className: "h-7 px-2 text-xs text-muted-foreground",
                  onClick: () => window.open(`/seo-page/${page.slug}`, "_blank"),
                  "data-ocid": `seo_generator.item.${i + 1}.preview_button`,
                  "aria-label": "Preview page",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
                }
              ),
              !page.published && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "default",
                  className: "h-7 px-2.5 text-xs",
                  onClick: () => {
                    publishPage.mutate(page.id);
                    ue.success("Page published!");
                  },
                  "data-ocid": `seo_generator.item.${i + 1}.publish_button`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-3 h-3 mr-1" }),
                    " Publish"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  size: "sm",
                  variant: "ghost",
                  className: "h-7 px-2 text-destructive hover:text-destructive",
                  onClick: async () => {
                    try {
                      await deletePage.mutateAsync(page.id);
                      ue.success("Page deleted");
                    } catch {
                      ue.error("Failed to delete page");
                    }
                  },
                  "data-ocid": `seo_generator.item.${i + 1}.delete_button`,
                  "aria-label": "Delete page",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                }
              )
            ] }) })
          ]
        },
        page.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showAdd, onOpenChange: setShowAdd, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "seo_generator.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Generate SEO Pages" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Select Niche + City" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "Niche" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: pickedNiche, onValueChange: setPickedNiche, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "h-9",
                    "data-ocid": "seo_generator.niche_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: NICHES.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: n, children: n }, n)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground mb-1 block", children: "City" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: pickedCity, onValueChange: setPickedCity, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "h-9",
                    "data-ocid": "seo_generator.city_select",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                size: "sm",
                variant: "outline",
                className: "h-9",
                onClick: addChip,
                disabled: chips.length >= 20,
                "data-ocid": "seo_generator.add_chip_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" })
              }
            ) })
          ] }),
          chips.length >= 20 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-500", children: "Maximum 20 pages per batch reached." })
        ] }),
        chips.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            chips.length,
            " page",
            chips.length !== 1 ? "s" : "",
            " selected"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: chips.map((chip, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-medium",
              "data-ocid": `seo_generator.chip.${idx + 1}`,
              children: [
                chip.niche,
                " • ",
                chip.city,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeChip(idx),
                    className: "text-primary/60 hover:text-primary transition-colors",
                    "aria-label": `Remove ${chip.niche} ${chip.city}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
                  }
                )
              ]
            },
            `${chip.niche}-${chip.city}-${idx}`
          )) })
        ] }),
        chips.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-dashed border-border rounded-lg p-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Add at least one niche+city pair to continue." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => {
                setShowAdd(false);
                setChips([]);
              },
              "data-ocid": "seo_generator.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              disabled: chips.length === 0 || generatePages.isPending,
              onClick: handleGenerate,
              "data-ocid": "seo_generator.confirm_button",
              children: generatePages.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" }),
                "Generating…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "Generate ",
                chips.length > 0 ? chips.length : "",
                " Page",
                chips.length !== 1 ? "s" : ""
              ] })
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  BulkSeoGeneratorPage as default
};
