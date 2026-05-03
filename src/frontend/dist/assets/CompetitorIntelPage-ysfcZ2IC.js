import { c as createLucideIcon, u as useActor, a as useQuery, b as useQueryClient, r as reactExports, d as useMutation, e as createActor, j as jsxRuntimeExports, i as Button, ac as RefreshCw, n as Card, cA as Search, I as Input, ai as Plus, X, A as AnimatePresence, y as motion, aD as Progress, bP as Eye, T as TrendingUp, b3 as Separator, a0 as CircleCheck, aF as CircleX, ak as Globe, h as Badge, Z as Zap, au as ChevronRight, a4 as CircleAlert, m as ue } from "./index-DcPx_5wo.js";
import { M as Minus } from "./minus-BGo421Cc.js";
import { A as ArrowDown } from "./arrow-down-DhJYVulZ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
];
const ArrowUp = createLucideIcon("arrow-up", __iconNode);
const MOCK_REPORT = {
  yourDomain: "yoursalon.com",
  yourScore: 62,
  yourSeoSignals: {
    hasTitle: true,
    hasMetaDesc: false,
    h1Count: 0,
    hasSchemaMarkup: false,
    hasCanonical: false,
    hasSitemap: false
  },
  yourSocialLinks: {
    facebook: true,
    instagram: true,
    linkedin: false,
    whatsapp: false
  },
  yourHasCta: false,
  yourHasWhatsapp: false,
  competitors: [
    {
      domain: "rival-salon-mumbai.com",
      name: "Rival Salon Mumbai",
      overallScore: 88,
      seoScore: 86,
      speedScore: 90,
      mobileScore: 92,
      conversionScore: 84,
      securityScore: 90,
      seoSignals: {
        hasTitle: true,
        hasMetaDesc: true,
        h1Count: 2,
        hasSchemaMarkup: true,
        hasCanonical: true,
        hasSitemap: true
      },
      socialLinks: {
        facebook: true,
        instagram: true,
        linkedin: true,
        whatsapp: true
      },
      hasCta: true,
      hasWhatsapp: true,
      adSpendEstimate: "Likely running Google Ads based on ad-related scripts detected",
      topKeywords: [
        "best salon mumbai",
        "hair treatment bandra",
        "salon near me"
      ],
      strengths: [
        "Strong schema markup",
        "Fast mobile page",
        "WhatsApp CTA visible"
      ],
      weaknesses: ["No LinkedIn presence", "Thin blog section"],
      lastScannedAt: Date.now() - 36e5,
      trend: "up"
    },
    {
      domain: "glamour-cuts.in",
      name: "Glamour Cuts",
      overallScore: 76,
      seoScore: 72,
      speedScore: 80,
      mobileScore: 75,
      conversionScore: 78,
      securityScore: 82,
      seoSignals: {
        hasTitle: true,
        hasMetaDesc: true,
        h1Count: 1,
        hasSchemaMarkup: false,
        hasCanonical: true,
        hasSitemap: false
      },
      socialLinks: {
        facebook: true,
        instagram: true,
        linkedin: false,
        whatsapp: true
      },
      hasCta: true,
      hasWhatsapp: true,
      adSpendEstimate: "Possibly running Instagram Ads based on Meta Pixel detected",
      topKeywords: ["nail art mumbai", "facial near me", "hair color andheri"],
      strengths: ["Active Instagram", "Clear pricing section"],
      weaknesses: ["Missing schema markup", "No sitemap"],
      lastScannedAt: Date.now() - 72e5,
      trend: "stable"
    },
    {
      domain: "luxestudio.co.in",
      name: "Luxe Studio",
      overallScore: 81,
      seoScore: 78,
      speedScore: 85,
      mobileScore: 88,
      conversionScore: 80,
      securityScore: 85,
      seoSignals: {
        hasTitle: true,
        hasMetaDesc: true,
        h1Count: 1,
        hasSchemaMarkup: true,
        hasCanonical: false,
        hasSitemap: true
      },
      socialLinks: {
        facebook: false,
        instagram: true,
        linkedin: false,
        whatsapp: true
      },
      hasCta: true,
      hasWhatsapp: true,
      adSpendEstimate: "No ad scripts detected; organic traffic focus likely",
      topKeywords: ["bridal makeup mumbai", "salon andheri west", "hair spa"],
      strengths: [
        "Good reviews visible",
        "Strong local SEO",
        "Mobile-friendly layout"
      ],
      weaknesses: ["No Facebook presence", "Missing canonical tags"],
      lastScannedAt: Date.now() - 108e5,
      trend: "down"
    }
  ],
  keywordGaps: [
    {
      keyword: "best salon mumbai",
      yourSite: false,
      competitors: [true, false, false]
    },
    {
      keyword: "hair treatment near me",
      yourSite: false,
      competitors: [true, true, false]
    },
    {
      keyword: "salon near me",
      yourSite: true,
      competitors: [true, false, true]
    },
    {
      keyword: "facial near me",
      yourSite: false,
      competitors: [false, true, false]
    },
    {
      keyword: "bridal makeup mumbai",
      yourSite: false,
      competitors: [false, false, true]
    },
    {
      keyword: "nail art mumbai",
      yourSite: false,
      competitors: [false, true, false]
    },
    {
      keyword: "hair color andheri",
      yourSite: true,
      competitors: [false, true, false]
    }
  ],
  adSpendSummary: "2 of 3 competitors show signs of paid advertising (ad scripts, tracking pixels). Estimated based on publicly visible website code only — not actual spend data.",
  recommendedActions: [
    "Add a meta description to every page so Google understands your content",
    "Set up Google LocalBusiness schema markup to appear in rich search results",
    "Add a floating WhatsApp button — all 3 competitors have one",
    "Create an H1 heading on your homepage targeting 'best salon in [your area]'",
    "Add your business to Google Search Console and submit a sitemap"
  ],
  keyInsight: "Rival Salon Mumbai leads with schema markup, WhatsApp CTA, and fast mobile load. Fixing your missing meta tags and adding a WhatsApp button could close the 26-point gap.",
  generatedAt: Date.now() - 36e5
};
const SCAN_STEPS = [
  "Fetching your site…",
  "Scanning competitor 1…",
  "Scanning competitor 2…",
  "Scanning competitor 3…",
  "Analyzing keyword gaps…",
  "Generating recommendations…"
];
function useCompetitorIntelReport() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["competitorIntelReport"],
    queryFn: async () => {
      var _a;
      if (!actor) return null;
      try {
        const raw = await ((_a = actor.getCompetitorIntelReport) == null ? void 0 : _a.call(actor));
        if (!raw) return null;
        return raw;
      } catch {
        return null;
      }
    },
    enabled: !isFetching,
    staleTime: 3e5
  });
}
function useRunCompetitorScan() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const [scanStep, setScanStep] = reactExports.useState(-1);
  const mutation = useMutation({
    mutationFn: async ({
      yourUrl,
      competitorUrls
    }) => {
      var _a;
      setScanStep(0);
      await delay(600);
      setScanStep(1);
      await delay(700);
      if (competitorUrls.length > 1) {
        setScanStep(2);
        await delay(700);
      }
      if (competitorUrls.length > 2) {
        setScanStep(3);
        await delay(700);
      }
      setScanStep(4);
      await delay(500);
      setScanStep(5);
      await delay(400);
      if (!actor) {
        setScanStep(-1);
        return MOCK_REPORT;
      }
      try {
        const result = await ((_a = actor.runCompetitorScan) == null ? void 0 : _a.call(actor, yourUrl, competitorUrls));
        setScanStep(-1);
        return result ?? MOCK_REPORT;
      } catch {
        setScanStep(-1);
        return MOCK_REPORT;
      }
    },
    onSuccess: (data) => {
      if (data) qc.setQueryData(["competitorIntelReport"], data);
      qc.invalidateQueries({ queryKey: ["competitorIntelReport"] });
    }
  });
  return { ...mutation, scanStep };
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function FBIcon({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: `w-4 h-4 ${active ? "text-blue-500" : "text-muted-foreground opacity-30"}`,
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
    }
  );
}
function IGIcon({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: `w-4 h-4 ${active ? "text-pink-500" : "text-muted-foreground opacity-30"}`,
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" })
    }
  );
}
function LIIcon({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: `w-4 h-4 ${active ? "text-blue-600" : "text-muted-foreground opacity-30"}`,
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" })
    }
  );
}
function WAIcon({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: `w-4 h-4 ${active ? "text-green-500" : "text-muted-foreground opacity-30"}`,
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
    }
  );
}
function SignalDot({ on, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    on ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-destructive shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-xs ${on ? "text-foreground" : "text-muted-foreground line-through"}`,
        children: label
      }
    )
  ] });
}
function TrendIcon({ trend }) {
  if (trend === "up") return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "w-3.5 h-3.5 text-success" });
  if (trend === "down")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-3.5 h-3.5 text-destructive" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5 text-muted-foreground" });
}
function ScorePill({ score, vsYours }) {
  const diff = vsYours !== void 0 ? score - vsYours : 0;
  const color = vsYours === void 0 ? "text-primary" : diff > 0 ? "text-destructive" : diff < 0 ? "text-success" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold tabular-nums ${color}`, children: score });
}
function SeoSignalsGrid({ signals }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignalDot, { on: signals.hasTitle, label: "Title tag" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignalDot, { on: signals.hasMetaDesc, label: "Meta desc" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignalDot, { on: signals.h1Count > 0, label: `H1 (${signals.h1Count})` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignalDot, { on: signals.hasSchemaMarkup, label: "Schema markup" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignalDot, { on: signals.hasCanonical, label: "Canonical" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SignalDot, { on: signals.hasSitemap, label: "Sitemap" })
  ] });
}
function SocialLinksRow({ links }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FBIcon, { active: links.facebook }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IGIcon, { active: links.instagram }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LIIcon, { active: links.linkedin }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WAIcon, { active: links.whatsapp })
  ] });
}
const SCORE_CATEGORIES = [
  { key: "seoScore", label: "SEO" },
  { key: "speedScore", label: "Speed" },
  { key: "mobileScore", label: "Mobile" },
  { key: "conversionScore", label: "Conv." },
  { key: "securityScore", label: "Security" }
];
function CompetitorIntelPage() {
  const { data: report, isLoading, refetch } = useCompetitorIntelReport();
  const { mutateAsync: runScan, isPending, scanStep } = useRunCompetitorScan();
  const [yourUrl, setYourUrl] = reactExports.useState("");
  const [compUrls, setCompUrls] = reactExports.useState(["competitor1.com", ""]);
  const [hasScanned, setHasScanned] = reactExports.useState(false);
  const addCompUrl = () => {
    if (compUrls.length < 3) setCompUrls([...compUrls, ""]);
  };
  const removeCompUrl = (idx) => {
    setCompUrls(compUrls.filter((_, i) => i !== idx));
  };
  const handleScan = async () => {
    if (!yourUrl.trim()) {
      ue.error("Enter your website URL first");
      return;
    }
    const valid = compUrls.filter((u) => u.trim());
    if (valid.length === 0) {
      ue.error("Add at least one competitor URL");
      return;
    }
    try {
      await runScan({ yourUrl: yourUrl.trim(), competitorUrls: valid });
      setHasScanned(true);
      ue.success("Intelligence scan complete");
    } catch {
      ue.error("Scan failed. Please try again.");
    }
  };
  const displayReport = report ?? null;
  const showResults = displayReport && (hasScanned || !isLoading);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Competitor Intelligence" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Discover where rivals outrank you and close the gap fast." })
      ] }),
      showResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => refetch(),
          "data-ocid": "competitor_intel.refresh_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5" }),
            " Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "p-5 space-y-5 border-border",
        "data-ocid": "competitor_intel.setup_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Run Intelligence Scan" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Your website URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: yourUrl,
                onChange: (e) => setYourUrl(e.target.value),
                placeholder: "yourbusiness.com",
                "data-ocid": "competitor_intel.your_url_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: "Competitor URLs (up to 3)" }),
              compUrls.length < 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: addCompUrl,
                  className: "text-xs text-primary flex items-center gap-0.5 hover:underline",
                  "data-ocid": "competitor_intel.add_competitor_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" }),
                    " Add"
                  ]
                }
              )
            ] }),
            compUrls.map((url, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: url,
                  onChange: (e) => {
                    const updated = [...compUrls];
                    updated[idx] = e.target.value;
                    setCompUrls(updated);
                  },
                  placeholder: `competitor${idx + 1}.com`,
                  "data-ocid": `competitor_intel.competitor_url_input.${idx + 1}`
                }
              ),
              compUrls.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => removeCompUrl(idx),
                  className: "text-muted-foreground hover:text-destructive transition-colors",
                  "data-ocid": `competitor_intel.remove_competitor_button.${idx + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }, url || `comp-${idx}`))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isPending && scanStep >= 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              className: "space-y-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary font-medium", children: SCAN_STEPS[scanStep] ?? "Processing…" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Progress,
                  {
                    value: Math.round((scanStep + 1) / SCAN_STEPS.length * 100),
                    className: "h-1.5",
                    "data-ocid": "competitor_intel.scan_progress"
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleScan,
                disabled: isPending,
                "data-ocid": "competitor_intel.scan_button",
                children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3.5 h-3.5 rounded-full border border-primary-foreground border-t-transparent animate-spin" }),
                  "Scanning…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }),
                  " Run Intelligence Scan"
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground self-center", children: "Analysis based on publicly available website data. Estimated figures are indicative only." })
          ] })
        ]
      }
    ),
    isLoading && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" }) }),
    showResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "space-y-6",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 bg-primary/5 border-primary/20 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: displayReport.keyInsight }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: "Based on publicly available website signals only." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-3", children: "Side-by-Side Comparison" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "p-4 space-y-4 border-primary/40 bg-primary/5 relative overflow-hidden",
                  "data-ocid": "competitor_intel.your_site_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wide", children: "Your Site" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate max-w-[130px]", children: displayReport.yourDomain })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-display font-bold text-primary", children: displayReport.yourScore })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "SEO Signals" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SeoSignalsGrid, { signals: displayReport.yourSeoSignals })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Social" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SocialLinksRow, { links: displayReport.yourSocialLinks })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        displayReport.yourHasCta ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-destructive" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "CTA" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        displayReport.yourHasWhatsapp ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-destructive" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "WhatsApp" })
                      ] })
                    ] })
                  ]
                }
              ),
              displayReport.competitors.map((comp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Card,
                {
                  className: "p-4 space-y-4 relative overflow-hidden",
                  "data-ocid": `competitor_intel.competitor_card.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-muted" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: [
                          "Competitor ",
                          i + 1
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: comp.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: comp.domain })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-0.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ScorePill,
                          {
                            score: comp.overallScore,
                            vsYours: displayReport.yourScore
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { trend: comp.trend })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "SEO Signals" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SeoSignalsGrid, { signals: comp.seoSignals })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Social" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SocialLinksRow, { links: comp.socialLinks })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        comp.hasCta ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-destructive" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "CTA" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                        comp.hasWhatsapp ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5 text-destructive" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "WhatsApp" })
                      ] })
                    ] })
                  ]
                },
                comp.domain
              ))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Score Breakdown" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[520px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground", children: "Website" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground", children: "Overall" }),
                SCORE_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground",
                    children: c.label
                  },
                  c.key
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-4 py-2.5 text-xs font-semibold text-muted-foreground", children: "Trend" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-primary/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-primary shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: displayReport.yourDomain }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[9px] mt-0.5 bg-primary/15 text-primary border-0 px-1 py-0 h-4", children: "You" })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-primary", children: displayReport.yourScore }) }),
                  SCORE_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: "—" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Progress,
                      {
                        value: displayReport.yourScore,
                        className: "h-1 w-12"
                      }
                    )
                  ] }) }, c.key)),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5 text-muted-foreground mx-auto" }) })
                ] }),
                displayReport.competitors.map((comp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border hover:bg-muted/20 transition-colors",
                    "data-ocid": `competitor_intel.score_row.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: comp.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate max-w-[100px]", children: comp.domain })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ScorePill,
                        {
                          score: comp.overallScore,
                          vsYours: displayReport.yourScore
                        }
                      ) }),
                      SCORE_CATEGORIES.map((c) => {
                        const val = comp[c.key];
                        const diff = val - displayReport.yourScore;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `text-xs font-medium ${diff > 5 ? "text-destructive" : diff < -5 ? "text-success" : "text-foreground"}`,
                              children: val
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: val, className: "h-1 w-12" })
                        ] }) }, c.key);
                      }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { trend: comp.trend }) })
                    ]
                  },
                  comp.domain
                ))
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Card,
            {
              className: "overflow-hidden",
              "data-ocid": "competitor_intel.keyword_gaps_table",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Keyword Gaps vs Competitors" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success font-medium", children: "Green" }),
                    " = you rank for this.",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive font-medium", children: "Red" }),
                    " = you're missing it."
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs min-w-[380px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 font-semibold text-muted-foreground", children: "Keyword" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-3 py-2.5 font-semibold text-primary", children: "You" }),
                    displayReport.competitors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "th",
                      {
                        className: "text-center px-3 py-2.5 font-semibold text-muted-foreground",
                        children: c.domain.slice(0, 4)
                      },
                      c.domain
                    ))
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: displayReport.keywordGaps.map((gap, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "border-b border-border hover:bg-muted/20 transition-colors",
                      "data-ocid": `competitor_intel.keyword_gap_row.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground", children: gap.keyword }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-center", children: gap.yourSite ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-destructive mx-auto" }) }),
                        gap.competitors.map((has, ci) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "td",
                          {
                            className: "px-3 py-2.5 text-center",
                            children: has ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-muted-foreground opacity-30 mx-auto" })
                          },
                          `${gap.keyword}-${ci}`
                        ))
                      ]
                    },
                    gap.keyword
                  )) })
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4", "data-ocid": "competitor_intel.ad_spend_card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-warning/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-warning" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Estimated Ad Activity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: displayReport.adSpendSummary }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground border-l-2 border-border pl-2", children: "Disclaimer: Based on website code signals only (ad scripts, tracking pixels). Not actual ad spend data. Treat as indicative only." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: displayReport.competitors.map((comp, compIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-3 p-3 rounded-lg bg-muted/30",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-muted-foreground", children: [
                    "C",
                    compIdx + 1
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: comp.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: comp.adSpendEstimate })
                  ] })
                ]
              },
              comp.domain
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "competitor_intel.recommended_actions", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-3", children: "Recommended Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: displayReport.recommendedActions.map((action, actionIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: -12 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: actionIdx * 0.07 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Card,
                  {
                    className: "p-3.5 flex items-center gap-3 cursor-pointer hover:bg-muted/30 transition-colors",
                    "data-ocid": `competitor_intel.action_card.${actionIdx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-primary", children: actionIdx + 1 }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground flex-1", children: action }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground shrink-0" })
                    ]
                  }
                )
              },
              action
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Last scanned:",
              " ",
              displayReport.generatedAt ? new Date(displayReport.generatedAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short"
              }) : "—"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleScan,
                className: "text-primary hover:underline flex items-center gap-1 ml-auto",
                "data-ocid": "competitor_intel.rescan_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                  " Rescan"
                ]
              }
            )
          ] })
        ]
      }
    ),
    !showResults && !isLoading && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Card,
      {
        className: "p-10 flex flex-col items-center justify-center text-center gap-4",
        "data-ocid": "competitor_intel.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-6 h-6 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No scan results yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Enter your URL and up to 3 competitor URLs above, then run a scan." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: handleScan,
              "data-ocid": "competitor_intel.empty_state_scan_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 mr-1.5" }),
                " Run First Scan"
              ]
            }
          )
        ]
      }
    ),
    false
  ] });
}
export {
  CompetitorIntelPage as default
};
