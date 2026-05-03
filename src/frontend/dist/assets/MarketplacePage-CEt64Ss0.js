import { be as useAutoAgency, bE as useSubscription, r as reactExports, j as jsxRuntimeExports, i as Button, bf as PaywallTrigger, A as AnimatePresence, y as motion, h as Badge, m as ue } from "./index-DcPx_5wo.js";
function formatINR(n) {
  const num = Number(n);
  if (num >= 1e5) return `₹${(num / 1e5).toFixed(1)}L`;
  if (num >= 1e3) return `₹${(num / 1e3).toFixed(1)}k`;
  return `₹${num}`;
}
function formatStars(avgRating) {
  return (Number(avgRating) / 10).toFixed(1);
}
const TAG_PALETTES = [
  "bg-primary/10 text-primary",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
  "bg-accent/10 text-accent-foreground",
  "bg-destructive/10 text-destructive",
  "bg-secondary text-secondary-foreground"
];
function tagColor(tag) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++)
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_PALETTES[Math.abs(hash) % TAG_PALETTES.length];
}
const PLAN_TIER = {
  free: 0,
  starter: 1,
  growth: 2,
  pro: 3,
  agency: 4
};
function getPlanTier(plan) {
  return PLAN_TIER[String(plan).toLowerCase()] ?? 0;
}
function EmptyState({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "col-span-2 md:col-span-3 flex flex-col items-center justify-center py-16 gap-3 text-center",
      "data-ocid": "marketplace.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            width: "48",
            height: "48",
            viewBox: "0 0 24 24",
            fill: "none",
            strokeWidth: "1.5",
            stroke: "currentColor",
            className: "text-muted-foreground/40",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Check back soon for new listings" })
      ]
    }
  );
}
function StarRating({
  avgRating,
  reviewCount
}) {
  const rating = Number(avgRating) / 10;
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const starPositions = ["s1", "s2", "s3", "s4", "s5"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1 marketplace-rating",
      "aria-label": `${rating} stars`,
      children: [
        starPositions.map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "12",
            height: "12",
            viewBox: "0 0 24 24",
            fill: i < full ? "currentColor" : i === full && half ? "url(#half)" : "none",
            stroke: "currentColor",
            strokeWidth: "1.5",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "half", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "currentColor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "none", stopOpacity: "0" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "12,2 15.1,8.2 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.2" })
            ]
          },
          key
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold", children: formatStars(avgRating) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "(",
          String(reviewCount),
          ")"
        ] })
      ]
    }
  );
}
function BuyLeadsCard({
  listing,
  index,
  planTier
}) {
  function handleBuy() {
    if (planTier < 3) return;
    ue.success("Purchase initiated", {
      description: `Opening checkout for "${listing.title}"`
    });
  }
  const card = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "marketplace-listing shadow-card hover:shadow-elevated transition-hover cursor-pointer group",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.28, delay: index * 0.05, ease: "easeOut" },
      whileHover: { y: -2 },
      "data-ocid": `marketplace.buy_leads.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-listing-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "marketplace-listing-title line-clamp-2 flex-1 mr-2", children: listing.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "marketplace-listing-price shrink-0", children: formatINR(listing.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "marketplace-listing-desc text-truncate-3", children: listing.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: listing.tags.slice(0, 4).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-block px-2 py-0.5 rounded text-[11px] font-600 font-semibold ${tagColor(tag)}`,
            children: tag
          },
          tag
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-listing-footer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: listing.sellerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StarRating,
              {
                avgRating: listing.avgRating,
                reviewCount: listing.reviewCount
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "marketplace-action-btn",
              onClick: handleBuy,
              "data-ocid": `marketplace.buy_now_button.${index + 1}`,
              "aria-label": `Buy ${listing.title}`,
              children: "Buy Now"
            }
          )
        ] })
      ]
    }
  );
  if (planTier >= 3) return card;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PaywallTrigger, { feature: "high-score-leads", requiredPlan: "pro", asDiv: true, children: card });
}
function SellServiceCard({
  listing,
  index,
  currentUserId,
  planTier
}) {
  const isOwn = listing.sellerId === currentUserId;
  function handleContact() {
    ue.success("Message sent", {
      description: `Reached out to ${listing.sellerName}`
    });
  }
  const card = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "marketplace-listing shadow-card hover:shadow-elevated transition-hover group",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.28, delay: index * 0.05, ease: "easeOut" },
      whileHover: { y: -2 },
      "data-ocid": `marketplace.sell_services.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-listing-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "marketplace-listing-title line-clamp-2 flex-1 mr-2", children: listing.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "marketplace-listing-price shrink-0", children: formatINR(listing.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "marketplace-listing-desc text-truncate-3", children: listing.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: listing.tags.slice(0, 4).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${tagColor(tag)}`,
            children: tag
          },
          tag
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-listing-footer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
            isOwn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs", children: "Your Listing" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: listing.sellerName }),
            !isOwn && /* @__PURE__ */ jsxRuntimeExports.jsx(
              StarRating,
              {
                avgRating: listing.avgRating,
                reviewCount: listing.reviewCount
              }
            )
          ] }),
          isOwn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "marketplace-action-btn",
              onClick: () => ue.info("Edit listing — coming soon"),
              "data-ocid": `marketplace.edit_button.${index + 1}`,
              children: "Edit"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "marketplace-action-btn",
              onClick: handleContact,
              "data-ocid": `marketplace.contact_button.${index + 1}`,
              children: "Contact"
            }
          )
        ] })
      ]
    }
  );
  if (planTier >= 3) return card;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PaywallTrigger, { feature: "ai-proposal", requiredPlan: "pro", asDiv: true, children: card });
}
function HireFreelancerCard({
  listing,
  index,
  planTier
}) {
  const hourlyRate = Math.round(Number(listing.price) / 10);
  function handleHire() {
    if (planTier < 3) return;
    ue.success("Hire request sent", {
      description: `Contacted ${listing.sellerName}`
    });
  }
  const card = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "marketplace-listing shadow-card hover:shadow-elevated transition-hover group",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.28, delay: index * 0.05, ease: "easeOut" },
      whileHover: { y: -2 },
      "data-ocid": `marketplace.hire_freelancers.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-bold text-primary", children: listing.sellerName.slice(0, 1).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "marketplace-listing-title truncate", children: listing.sellerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: listing.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "marketplace-listing-price shrink-0", children: [
            "₹",
            hourlyRate,
            "/hr"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "marketplace-listing-desc text-truncate-2 mb-3", children: listing.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: listing.tags.slice(0, 4).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${tagColor(tag)}`,
            children: tag
          },
          tag
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marketplace-listing-footer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StarRating,
            {
              avgRating: listing.avgRating,
              reviewCount: listing.reviewCount
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "marketplace-action-btn",
              onClick: handleHire,
              "data-ocid": `marketplace.hire_now_button.${index + 1}`,
              "aria-label": `Hire ${listing.sellerName}`,
              children: "Hire Now"
            }
          )
        ] })
      ]
    }
  );
  if (planTier >= 3) return card;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PaywallTrigger, { feature: "bulk-messages", requiredPlan: "pro", asDiv: true, children: card });
}
function CreateListingForm({ onClose }) {
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [tagsInput, setTagsInput] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    ue.success("Listing created!", {
      description: "Your service is now live on the marketplace."
    });
    onClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 backdrop-blur-sm",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      "data-ocid": "marketplace.create_listing.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "w-full max-w-lg bg-card rounded-t-2xl p-6 pb-8 shadow-premium",
          initial: { y: 80, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 80, opacity: 0 },
          transition: { type: "spring", damping: 26, stiffness: 320 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold font-display", children: "Create Listing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-fast",
                  "data-ocid": "marketplace.create_listing.close_button",
                  "aria-label": "Close",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M6 18L18 6M6 6l12 12"
                        }
                      )
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "listing-title", className: "text-sm font-semibold", children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "listing-title",
                    type: "text",
                    required: true,
                    value: title,
                    onChange: (e) => setTitle(e.target.value),
                    placeholder: "e.g. Local SEO Setup — Full Package",
                    className: "h-11 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                    "data-ocid": "marketplace.create_listing.title.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "listing-description",
                    className: "text-sm font-semibold",
                    children: "Description"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "listing-description",
                    required: true,
                    rows: 3,
                    value: description,
                    onChange: (e) => setDescription(e.target.value),
                    placeholder: "What do you offer? What results does the client get?",
                    className: "px-3 py-2.5 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                    "data-ocid": "marketplace.create_listing.description.textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "listing-price", className: "text-sm font-semibold", children: "Price (₹)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "listing-price",
                      type: "number",
                      required: true,
                      min: "0",
                      value: price,
                      onChange: (e) => setPrice(e.target.value),
                      placeholder: "e.g. 9999",
                      className: "h-11 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      "data-ocid": "marketplace.create_listing.price.input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "listing-tags", className: "text-sm font-semibold", children: "Tags" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "listing-tags",
                      type: "text",
                      value: tagsInput,
                      onChange: (e) => setTagsInput(e.target.value),
                      placeholder: "seo, local, google",
                      className: "h-11 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      "data-ocid": "marketplace.create_listing.tags.input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    className: "flex-1",
                    onClick: onClose,
                    "data-ocid": "marketplace.create_listing.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    className: "flex-1 btn-primary-glow",
                    disabled: submitting,
                    "data-ocid": "marketplace.create_listing.submit_button",
                    children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" }),
                      "Creating…"
                    ] }) : "Publish Listing"
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
const TABS = [
  { id: "buyLeads", label: "Buy Leads" },
  { id: "sellService", label: "Sell Services" },
  { id: "hireFreelancer", label: "Hire Freelancers" }
];
function MarketplacePage() {
  const { marketplaceListings } = useAutoAgency();
  const { data: subscription } = useSubscription();
  const [activeTab, setActiveTab] = reactExports.useState("buyLeads");
  const [showCreateForm, setShowCreateForm] = reactExports.useState(false);
  const planTier = getPlanTier(String((subscription == null ? void 0 : subscription.plan) ?? "free"));
  const currentUserId = "user_001";
  const filtered = (marketplaceListings ?? []).filter(
    (l) => l.listingType === activeTab && l.isActive
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "marketplace.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle px-4 pt-6 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold font-display", children: "Marketplace" }),
        activeTab === "sellService" && (planTier >= 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            className: "btn-primary-glow gap-1.5",
            onClick: () => setShowCreateForm(true),
            "data-ocid": "marketplace.create_listing_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  width: "15",
                  height: "15",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.5",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M12 4v16m8-8H4"
                    }
                  )
                }
              ),
              "Create Listing"
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaywallTrigger, { feature: "ai-proposal", requiredPlan: "pro", asDiv: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1.5 opacity-60",
            "data-ocid": "marketplace.create_listing_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  width: "15",
                  height: "15",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2.5",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M12 4v16m8-8H4"
                    }
                  )
                }
              ),
              "Create Listing"
            ]
          }
        ) }))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Buy leads, sell services, hire talent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "marketplace-tabs",
          role: "tablist",
          "aria-label": "Marketplace categories",
          children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": activeTab === tab.id,
              className: `marketplace-tab${activeTab === tab.id ? " active" : ""}`,
              onClick: () => setActiveTab(tab.id),
              "data-ocid": `marketplace.tab.${tab.id}`,
              children: tab.label
            },
            tab.id
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 py-5 mobile-safe-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: 8 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -8 },
        transition: { duration: 0.2, ease: "easeInOut" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-medium", children: [
              filtered.length,
              " listing",
              filtered.length !== 1 ? "s" : "",
              " ",
              "available"
            ] }),
            planTier < 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "status-premium inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  width: "11",
                  height: "11",
                  viewBox: "0 0 24 24",
                  fill: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2l3.1 6.2L22 9.3l-5 4.8L18.2 21 12 17.8 5.8 21 7 14.1l-5-4.8 6.9-1.1z" })
                }
              ),
              "Pro plan to purchase"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
            filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { label: "No listings yet — check back soon" }),
            activeTab === "buyLeads" && filtered.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              BuyLeadsCard,
              {
                listing,
                index: i,
                planTier
              },
              listing.listingId
            )),
            activeTab === "sellService" && filtered.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              SellServiceCard,
              {
                listing,
                index: i,
                currentUserId,
                planTier
              },
              listing.listingId
            )),
            activeTab === "hireFreelancer" && filtered.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              HireFreelancerCard,
              {
                listing,
                index: i,
                planTier
              },
              listing.listingId
            ))
          ] })
        ]
      },
      activeTab
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showCreateForm && /* @__PURE__ */ jsxRuntimeExports.jsx(CreateListingForm, { onClose: () => setShowCreateForm(false) }) })
  ] });
}
export {
  MarketplacePage as default
};
