import { c as createLucideIcon, aG as useMetaTags, bE as useSubscription, cz as SubscriptionPlan, j as jsxRuntimeExports, ad as Link, cC as ArrowLeft, ak as Globe, h as Badge, cB as Lock, i as Button, M as MessageCircle, Z as Zap, cA as Search, k as Shield, aN as PAGE_META, r as reactExports, E as ChevronUp, q as ChevronDown, s as Copy, f as cn, aT as ExternalLink } from "./index-DcPx_5wo.js";
import { u as useWebsiteHealth, C as CircleCheckBig } from "./useWebsiteHealth-CRBOzht6.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode);
function useCopyToClipboard() {
  const [copiedId, setCopiedId] = reactExports.useState(null);
  function copy(text, id) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2e3);
    });
  }
  return [copiedId, copy];
}
function CopyButton({
  text,
  id,
  copiedId,
  onCopy,
  label = "Copy Code"
}) {
  const isCopied = copiedId === id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      size: "sm",
      variant: isCopied ? "default" : "outline",
      onClick: () => onCopy(text, id),
      className: cn("transition-all", isCopied && "btn-primary-glow"),
      "data-ocid": `fix_tools.${id}_copy_button`,
      children: [
        isCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14, className: "mr-1.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14, className: "mr-1.5" }),
        isCopied ? "Copied!" : label
      ]
    }
  );
}
function ToolCard({
  title,
  icon,
  badge,
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border rounded-xl shadow-card overflow-hidden",
      "data-ocid": `fix_tools.${title.toLowerCase().replace(/\s+/g, "_")}_card`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setOpen((v) => !v),
            className: "w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: title }),
                badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: badge })
              ] }),
              open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16, className: "text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16, className: "text-muted-foreground" })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 border-t border-border/50 pt-4", children })
      ]
    }
  );
}
function PaidGate() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center py-8 text-center",
      "data-ocid": "fix_tools.paywall_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 28, className: "text-muted-foreground mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground mb-1", children: "Upgrade to Growth Plan to unlock this tool" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Get all 6 code generators — WhatsApp button, meta tags, schema, CTAs, robots.txt, and image guide." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            size: "sm",
            className: "btn-primary-glow",
            onClick: () => {
              window.location.href = "/paywall";
            },
            "data-ocid": "fix_tools.upgrade_button",
            children: "Unlock Fix Tools · ₹299/month"
          }
        )
      ]
    }
  );
}
function WhatsAppTool({
  copiedId,
  onCopy,
  onTrack
}) {
  const [phone, setPhone] = reactExports.useState("");
  const [message, setMessage] = reactExports.useState(
    "Hi, I'd like to know more about your services."
  );
  const number = phone.replace(/\D/g, "");
  const encodedMsg = encodeURIComponent(message);
  const snippet = `<!-- Floating WhatsApp Button -->
<a href="https://wa.me/91${number}?text=${encodedMsg}"
  target="_blank"
  rel="noopener noreferrer"
  style="position:fixed;bottom:20px;right:20px;z-index:9999;background:#25D366;color:#fff;border-radius:50%;width:56px;height:56px;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 12px rgba(37,211,102,0.4)"
  aria-label="Chat on WhatsApp">
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#fff">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.553 4.112 1.518 5.843L.057 23.686a.5.5 0 00.612.61l5.919-1.55A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.655-.499-5.192-1.373l-.372-.215-3.852 1.01 1.025-3.748-.237-.388A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
</a>`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "wa-phone",
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: "WhatsApp Number (without country code)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center px-3 rounded-l-lg bg-muted border border-border border-r-0 text-sm font-semibold text-foreground", children: "+91" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "wa-phone",
              type: "tel",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "9876543210",
              className: "flex-1 h-10 px-3 rounded-r-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              "data-ocid": "fix_tools.whatsapp_number_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "wa-message",
            className: "block text-xs font-semibold text-muted-foreground mb-1.5",
            children: "Pre-filled message (optional)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "wa-message",
            type: "text",
            value: message,
            onChange: (e) => setMessage(e.target.value),
            placeholder: "Hi, I'd like to know more…",
            className: "w-full h-10 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
            "data-ocid": "fix_tools.whatsapp_message_input"
          }
        )
      ] })
    ] }),
    number && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-4 bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-3", children: "Live Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-16 h-32 bg-foreground/5 rounded-2xl border border-border overflow-hidden flex items-end justify-end p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
          style: { background: "var(--color-whatsapp, #25D366)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 20, fill: "white", stroke: "none" })
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 text-center", children: "Your WhatsApp button will appear in the bottom-right corner of your website" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 rounded-lg p-3 font-mono text-xs text-foreground overflow-auto max-h-40 whitespace-pre-wrap", children: snippet }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CopyButton,
      {
        text: snippet,
        id: "whatsapp",
        copiedId,
        onCopy: (t, id) => {
          onCopy(t, id);
          onTrack("whatsapp_button");
        },
        label: "Copy WhatsApp Button Code"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/10 rounded-lg p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mb-1", children: "How to add this to your website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "text-xs text-muted-foreground space-y-1 list-decimal list-inside", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Copy the code above" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Open your website editor (WordPress, Wix, etc.)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Paste it just before the closing ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "</body>" }),
          " tag"
        ] })
      ] })
    ] })
  ] });
}
const CTA_OPTIONS = [
  "Book Free Consultation",
  "Get Price on WhatsApp",
  "Call Now",
  "Schedule a Demo",
  "Claim Free Audit",
  "Send Enquiry",
  "Book Appointment",
  "Chat on WhatsApp"
];
function CTATool({
  copiedId,
  onCopy,
  onTrack
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Click any CTA to copy it — then paste it on your website, Google Ad, or WhatsApp message." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: CTA_OPTIONS.map((cta) => {
      const ctaId = `cta-${cta.toLowerCase().replace(/\s+/g, "-")}`;
      const isCopied = copiedId === ctaId;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            onCopy(cta, ctaId);
            onTrack("cta");
          },
          className: cn(
            "flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm font-semibold text-left transition-all",
            isCopied ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted/30 border-border hover:border-primary/40 hover:bg-primary/5 text-foreground"
          ),
          "data-ocid": `fix_tools.cta_${cta.toLowerCase().replace(/\s+/g, "_")}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cta }),
            isCopied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 14, className: "text-primary shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14, className: "text-muted-foreground shrink-0" })
          ]
        },
        cta
      );
    }) })
  ] });
}
function MetaTagsTool({
  copiedId,
  onCopy,
  onTrack
}) {
  const [businessName, setBusinessName] = reactExports.useState("");
  const [service, setService] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const rawTitle = service && city && businessName ? `${service} in ${city} | ${businessName}` : "";
  const title = rawTitle.length > 60 ? `${rawTitle.slice(0, 57)}…` : rawTitle;
  const description = businessName && service && city ? `Looking for ${service.toLowerCase()} in ${city}? ${businessName} offers professional services at competitive prices. Contact us today for a free consultation.` : "";
  const metaDesc = description.length > 160 ? `${description.slice(0, 157)}…` : description;
  const snippet = title ? `<title>${title}</title>
<meta name="description" content="${metaDesc}" />` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: [
      {
        label: "Business Name",
        id: "meta-biz",
        value: businessName,
        setter: setBusinessName,
        placeholder: "e.g. Priya Beauty Salon",
        ocid: "meta_business_input"
      },
      {
        label: "Service / Niche",
        id: "meta-service",
        value: service,
        setter: setService,
        placeholder: "e.g. Haircut & Bridal",
        ocid: "meta_service_input"
      },
      {
        label: "City",
        id: "meta-city",
        value: city,
        setter: setCity,
        placeholder: "e.g. Mumbai",
        ocid: "meta_city_input"
      }
    ].map(({ label, id, value, setter, placeholder, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: id,
          className: "block text-xs font-semibold text-muted-foreground mb-1.5",
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id,
          type: "text",
          value,
          onChange: (e) => setter(e.target.value),
          placeholder,
          className: "w-full h-10 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          "data-ocid": `fix_tools.${ocid}`
        }
      )
    ] }, label)) }),
    title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl p-4 bg-muted/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-2", children: "Google Search Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-primary font-medium leading-tight mb-0.5 truncate", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-2", children: metaDesc }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: cn(
            "text-xs font-semibold",
            title.length > 55 ? "score-warning" : "score-success"
          ),
          children: [
            "Title: ",
            title.length,
            " chars",
            " ",
            title.length > 55 ? "(a bit long)" : "(good)"
          ]
        }
      ) })
    ] }),
    snippet && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 rounded-lg p-3 font-mono text-xs text-foreground overflow-auto max-h-24 whitespace-pre-wrap", children: snippet }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CopyButton,
        {
          text: snippet,
          id: "meta-tags",
          copiedId,
          onCopy: (t, id) => {
            onCopy(t, id);
            onTrack("meta_tags");
          },
          label: "Copy Meta Tag Code"
        }
      )
    ] })
  ] });
}
function SchemaTool({
  copiedId,
  onCopy,
  onTrack
}) {
  const [biz, setBiz] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [hours, setHours] = reactExports.useState("Mon-Sat 10:00-20:00");
  const schema = biz ? JSON.stringify(
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: biz,
      address: { "@type": "PostalAddress", streetAddress: address },
      telephone: phone ? `+91${phone.replace(/\D/g, "")}` : void 0,
      openingHours: hours || void 0
    },
    null,
    2
  ) : "";
  const snippet = schema ? `<script type="application/ld+json">
${schema}
<\/script>` : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: [
      {
        label: "Business Name",
        id: "schema-biz",
        value: biz,
        setter: setBiz,
        placeholder: "Priya Beauty Salon",
        ocid: "schema_biz_input"
      },
      {
        label: "Address",
        id: "schema-addr",
        value: address,
        setter: setAddress,
        placeholder: "123, MG Road, Mumbai",
        ocid: "schema_address_input"
      },
      {
        label: "Phone Number",
        id: "schema-phone",
        value: phone,
        setter: setPhone,
        placeholder: "9876543210",
        ocid: "schema_phone_input"
      },
      {
        label: "Opening Hours",
        id: "schema-hours",
        value: hours,
        setter: setHours,
        placeholder: "Mon-Sat 10:00-20:00",
        ocid: "schema_hours_input"
      }
    ].map(({ label, id, value, setter, placeholder, ocid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: id,
          className: "block text-xs font-semibold text-muted-foreground mb-1.5",
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id,
          type: "text",
          value,
          onChange: (e) => setter(e.target.value),
          placeholder,
          className: "w-full h-10 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          "data-ocid": `fix_tools.${ocid}`
        }
      )
    ] }, label)) }),
    snippet && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 rounded-lg p-3 font-mono text-xs text-foreground overflow-auto max-h-48 whitespace-pre-wrap", children: snippet }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CopyButton,
        {
          text: snippet,
          id: "schema",
          copiedId,
          onCopy: (t, id) => {
            onCopy(t, id);
            onTrack("schema");
          },
          label: "Copy Schema Code"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/10 rounded-lg p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mb-1", children: "How to add this" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "text-xs text-muted-foreground space-y-1 list-decimal list-inside", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Copy the code above" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Paste it inside the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "<head>" }),
          " tag of your homepage"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Test it at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://search.google.com/test/rich-results",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-primary underline",
              children: "Google's Rich Results Test"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function RobotsTool({
  copiedId,
  onCopy,
  onTrack
}) {
  const [domain, setDomain] = reactExports.useState("");
  const d = domain.replace(/^https?:\/\//, "").replace(/\/$/, "") || "www.yourwebsite.com";
  const template = `User-agent: *
Allow: /

Sitemap: https://${d}/sitemap.xml`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "robots-domain",
          className: "block text-xs font-semibold text-muted-foreground mb-1.5",
          children: "Your website domain"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "robots-domain",
          type: "text",
          value: domain,
          onChange: (e) => setDomain(e.target.value),
          placeholder: "www.mysalon.com",
          className: "w-full h-10 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
          "data-ocid": "fix_tools.robots_domain_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/40 rounded-lg p-3 font-mono text-xs text-foreground whitespace-pre-wrap", children: template }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CopyButton,
      {
        text: template,
        id: "robots",
        copiedId,
        onCopy: (t, id) => {
          onCopy(t, id);
          onTrack("robots_txt");
        },
        label: "Copy robots.txt"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/10 rounded-lg p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary mb-1", children: "How to add robots.txt to your website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "text-xs text-muted-foreground space-y-1 list-decimal list-inside", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Copy the text above and save it as a file named",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "robots.txt" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Upload it to the root folder of your website (same folder as your homepage)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Test it by visiting ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { children: [
            "https://",
            d,
            "/robots.txt"
          ] }),
          " in your browser"
        ] })
      ] })
    ] })
  ] });
}
function ImageOptTool({
  rawMetrics
}) {
  const TIPS = [
    {
      tip: "Convert images to WebP format",
      detail: "WebP images are 25–35% smaller than JPEG with the same quality.",
      link: "https://squoosh.app"
    },
    {
      tip: "Aim for under 100KB per image",
      detail: "Large images are the #1 reason websites load slowly on mobile."
    },
    {
      tip: "Add alt text to every image",
      detail: "Alt text helps Google understand your images and improves search ranking."
    },
    {
      tip: "Use lazy loading",
      detail: `Add loading="lazy" to image tags so images below the fold don't slow your page.`
    },
    {
      tip: "Use a CDN for images",
      detail: "A content delivery network serves images from a server near your visitor, making load faster."
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    rawMetrics && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 rounded-xl p-3 text-center border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display text-foreground", children: rawMetrics.imageCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Images on page" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/5 rounded-xl p-3 text-center border border-destructive/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-display score-critical", children: rawMetrics.imagesMissingAlt }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Missing alt text" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: TIPS.map(({ tip, detail, link }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-3 items-start p-3 rounded-lg bg-muted/20 border border-border/50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 12, className: "text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: tip }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: detail }),
            link && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: link,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-xs text-primary flex items-center gap-1 mt-1 hover:underline",
                children: [
                  "Try ",
                  new URL(link).hostname,
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { size: 10 })
                ]
              }
            )
          ] })
        ]
      },
      tip
    )) })
  ] });
}
function WebsiteHealthFixToolsPage() {
  useMetaTags(PAGE_META["/website-health/fix-tools"]);
  const { latestAudit, trackEvent } = useWebsiteHealth();
  const { data: subscription } = useSubscription();
  const [copiedId, onCopy] = useCopyToClipboard();
  const isPaid = (subscription == null ? void 0 : subscription.plan) === SubscriptionPlan.growth || (subscription == null ? void 0 : subscription.plan) === SubscriptionPlan.pro || (subscription == null ? void 0 : subscription.plan) === SubscriptionPlan.agency;
  async function handleTrack(generatorType) {
    await trackEvent("fix_clicked", generatorType);
  }
  const toolProps = { copiedId, onCopy, onTrack: handleTrack };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-3xl mx-auto px-4 py-6 space-y-6",
      "data-ocid": "fix_tools.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/website-health",
                className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-2 transition-colors",
                "data-ocid": "fix_tools.back_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
                  "Back to Health Check"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Fix Tools" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Copy-paste code generators to fix common website issues — no developer needed." })
          ] }),
          latestAudit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm",
              "data-ocid": "fix_tools.last_scan_badge",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 14, className: "text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Based on your last scan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate max-w-40", children: latestAudit.url })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs shrink-0", children: [
                  "Score: ",
                  latestAudit.overallScore
                ] })
              ]
            }
          )
        ] }),
        !isPaid && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-premium-accent-light border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3",
            "data-ocid": "fix_tools.upgrade_banner",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 20, className: "text-premium-accent shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-center sm:text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Fix Tools require Growth Plan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All 6 code generators are included in Growth (₹299/month) and above." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  className: "btn-primary-glow shrink-0",
                  onClick: () => {
                    window.location.href = "/paywall";
                  },
                  "data-ocid": "fix_tools.top_upgrade_button",
                  children: "Upgrade · ₹299/month"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToolCard,
            {
              title: "WhatsApp Button",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18 }),
              badge: "Most Popular",
              defaultOpen: isPaid,
              children: isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppTool, { ...toolProps }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaidGate, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToolCard,
            {
              title: "CTA Text Generator",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 18 }),
              badge: "Quick Win",
              children: isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsx(CTATool, { ...toolProps }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaidGate, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolCard, { title: "Meta Title & Description", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 18 }), children: isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsx(MetaTagsTool, { ...toolProps }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaidGate, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ToolCard,
            {
              title: "Schema Markup (Local Business)",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 18 }),
              children: isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsx(SchemaTool, { ...toolProps }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaidGate, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolCard, { title: "Sitemap & robots.txt Guide", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 18 }), children: isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsx(RobotsTool, { ...toolProps }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaidGate, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolCard, { title: "Image Optimisation Guide", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 18 }), children: isPaid ? /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOptTool, { rawMetrics: latestAudit == null ? void 0 : latestAudit.rawMetrics }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaidGate, {}) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center pb-4", children: "These are copy-paste tools only. Automatic changes require connecting your website/CMS." })
      ]
    }
  );
}
export {
  WebsiteHealthFixToolsPage as default
};
