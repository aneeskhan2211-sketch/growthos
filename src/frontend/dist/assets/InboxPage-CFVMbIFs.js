import { r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, y as motion, by as useGrowthStore, a$ as useNavigate } from "./index-DcPx_5wo.js";
const SUGGESTIONS = {
  cold: [
    "Hi [Name], I noticed your business could benefit from better online visibility. Mind if I share a quick audit?",
    "We've helped 3 businesses in [City] grow 40% — can I show you how?",
    "Quick question: Are you currently running any digital ads or SEO?"
  ],
  warm: [
    "Following up — did you get a chance to review the audit I shared?",
    "We have a slot open this week for onboarding. Would [City] work for a quick call?",
    "Happy to customize the proposal further — what's your main priority: more leads or better conversions?"
  ],
  negotiation: [
    "I can offer a 10% discount if we sign by end of this week",
    "The ₹25k package includes everything you mentioned — let's lock it in?",
    "Most clients see ROI within 45 days — I'm confident we can deliver that for you too"
  ],
  client: [
    "How's the campaign performing for you? We've seen strong results in your area this month",
    "We're launching a new SEO package — as a current client you'd get early access",
    "Your monthly report is ready — want me to walk you through the highlights?"
  ]
};
function resolveContext(score, status) {
  if (status === "closed") return "client";
  if (status === "proposal") return "negotiation";
  if (score >= 40 && (status === "contacted" || status === "interested"))
    return "warm";
  return "cold";
}
function useInboxReplies({
  score,
  status,
  businessName,
  city
}) {
  const context = resolveContext(score, status);
  const templates = SUGGESTIONS[context];
  const suggestions = templates.map((text, i) => ({
    id: `${context}-${i}`,
    text: text.replace(/\[Name\]/g, businessName.split(" ")[0]).replace(/\[City\]/g, city),
    context
  }));
  const logSuggestionUsed = (suggestion) => {
    console.info("[GrowthOS Analytics] ai_reply_suggestion_used", {
      context: suggestion.context,
      suggestionId: suggestion.id,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  };
  return { suggestions, context, logSuggestionUsed };
}
const CONVERSATIONS = [
  {
    id: "c1",
    businessName: "Bombay Bites",
    city: "Mumbai",
    score: 87,
    issue: "No Google Business Profile",
    phone: "+91 98201 55567",
    platform: "whatsapp",
    pipelineStatus: "proposal",
    unreadCount: 2,
    lastMessage: "Thanks for reaching out! Can you share the pricing details?",
    timestamp: "10:15 AM",
    avatarColor: "from-orange-500 to-pink-500",
    prevInteractions: 5
  },
  {
    id: "c2",
    businessName: "FitZone Gym",
    city: "Pune",
    score: 82,
    issue: "Zero online reviews",
    phone: "+91 97301 22345",
    platform: "whatsapp",
    pipelineStatus: "contacted",
    unreadCount: 1,
    lastMessage: "We'd love to hear more about your services!",
    timestamp: "Yesterday",
    avatarColor: "from-green-500 to-emerald-600",
    prevInteractions: 2
  },
  {
    id: "c3",
    businessName: "Sharma Legal",
    city: "Delhi",
    score: 74,
    issue: "No content marketing",
    phone: "+91 98112 21234",
    platform: "email",
    pipelineStatus: "interested",
    unreadCount: 0,
    lastMessage: "I checked your proposal, looks good. When do we start?",
    timestamp: "Mon",
    avatarColor: "from-blue-500 to-indigo-600",
    prevInteractions: 8
  },
  {
    id: "c4",
    businessName: "MediCare Clinic",
    city: "Hyderabad",
    score: 91,
    issue: "Outdated website (2018)",
    phone: "+91 99001 44567",
    platform: "whatsapp",
    pipelineStatus: "new",
    unreadCount: 3,
    lastMessage: "When can we schedule a call? This week works for me.",
    timestamp: "Sun",
    avatarColor: "from-purple-500 to-violet-600",
    prevInteractions: 3
  },
  {
    id: "c5",
    businessName: "TechSpark",
    city: "Bengaluru",
    score: 93,
    issue: "No paid ads strategy",
    phone: "+91 98845 54567",
    platform: "instagram",
    pipelineStatus: "closed",
    unreadCount: 0,
    lastMessage: "Following up on the SEO audit you mentioned last week.",
    timestamp: "Sat",
    avatarColor: "from-cyan-500 to-blue-600",
    prevInteractions: 6
  }
];
const CHAT_MESSAGES = {
  c1: [
    {
      id: "cm1",
      text: "Hi, who is this?",
      sender: "prospect",
      time: "Yesterday 2:30 PM",
      status: "read"
    },
    {
      id: "cm2",
      text: "Hi! I'm Rahul from GrowthOS. We help restaurants get 50+ new customers/month.",
      sender: "user",
      time: "Yesterday 2:31 PM",
      status: "read"
    },
    {
      id: "cm3",
      text: "That sounds interesting! Tell me more about how it works",
      sender: "prospect",
      time: "Yesterday 2:45 PM",
      status: "read"
    },
    {
      id: "cm4",
      text: "We run targeted WhatsApp campaigns + Google SEO. Most clients see results in 2 weeks!",
      sender: "user",
      time: "Yesterday 2:46 PM",
      status: "read"
    },
    {
      id: "cm5",
      text: "Thanks for reaching out! Can you share the pricing details?",
      sender: "prospect",
      time: "Today 10:15 AM",
      status: "read"
    }
  ],
  c2: [
    {
      id: "cm1",
      text: "Hello, I saw your ad about digital marketing for gyms.",
      sender: "prospect",
      time: "Yesterday 4:00 PM",
      status: "read"
    },
    {
      id: "cm2",
      text: "Hey! Yes, we specialize in helping fitness businesses grow online. What's your current situation?",
      sender: "user",
      time: "Yesterday 4:02 PM",
      status: "read"
    },
    {
      id: "cm3",
      text: "We'd love to hear more about your services!",
      sender: "prospect",
      time: "Yesterday 4:15 PM",
      status: "delivered"
    }
  ],
  c3: [
    {
      id: "cm1",
      text: "I received your proposal from last week.",
      sender: "prospect",
      time: "Mon 11:00 AM",
      status: "read"
    },
    {
      id: "cm2",
      text: "Great! Please take your time reviewing. Happy to answer any questions.",
      sender: "user",
      time: "Mon 11:05 AM",
      status: "read"
    },
    {
      id: "cm3",
      text: "I checked your proposal, looks good. When do we start?",
      sender: "prospect",
      time: "Mon 3:30 PM",
      status: "read"
    }
  ],
  c4: [
    {
      id: "cm1",
      text: "Hi, I need help with my clinic's online presence. Can you help?",
      sender: "prospect",
      time: "Sun 10:00 AM",
      status: "read"
    },
    {
      id: "cm2",
      text: "Absolutely! For clinics, we focus on Google Business Profile + local SEO. Have seen 3x inquiry growth.",
      sender: "user",
      time: "Sun 10:10 AM",
      status: "read"
    },
    {
      id: "cm3",
      text: "When can we schedule a call? This week works for me.",
      sender: "prospect",
      time: "Sun 10:45 AM",
      status: "delivered"
    }
  ],
  c5: [
    {
      id: "cm1",
      text: "Saw your LinkedIn post about SEO audits. Interesting approach.",
      sender: "prospect",
      time: "Sat 9:00 AM",
      status: "read"
    },
    {
      id: "cm2",
      text: "Thanks! For tech companies, SEO + thought leadership is a game changer. Want a free audit?",
      sender: "user",
      time: "Sat 9:15 AM",
      status: "read"
    },
    {
      id: "cm3",
      text: "Following up on the SEO audit you mentioned last week.",
      sender: "prospect",
      time: "Sat 2:00 PM",
      status: "read"
    }
  ]
};
function BackIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m15 18-6-6 6-6" })
    }
  );
}
function InfoIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 16v-4M12 8h.01" })
      ]
    }
  );
}
function SendIcon({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: active ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m22 2-7 20-4-9-9-4Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 2 11 13" })
      ]
    }
  );
}
function SearchIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m21 21-4.35-4.35" })
      ]
    }
  );
}
function CheckIcon({ double, blue }) {
  const color = blue ? "oklch(0.71 0.17 240)" : "currentColor";
  if (!double) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        width: "14",
        height: "10",
        viewBox: "0 0 14 10",
        fill: "none",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M1 5l4 4 8-8",
            stroke: color,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "18",
      height: "10",
      viewBox: "0 0 18 10",
      fill: "none",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M1 5l4 4 8-8",
            stroke: color,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M5 5l4 4 8-8",
            stroke: color,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
function WhatsAppIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.107 1.523 5.837L.057 23.7a.75.75 0 0 0 .92.92l5.864-1.466A11.948 11.948 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.076-1.388l-.364-.218-3.775.944.963-3.774-.236-.376A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" })
      ]
    }
  );
}
function InstagramIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" })
    }
  );
}
function EmailIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "20", height: "16", x: "2", y: "4", rx: "2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
      ]
    }
  );
}
function PlatformIcon({ platform }) {
  if (platform === "whatsapp")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppIcon, {}) });
  if (platform === "instagram")
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pink-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InstagramIcon, {}) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmailIcon, {}) });
}
function ConversationList({
  conversations,
  onSelect
}) {
  const [search, setSearch] = reactExports.useState("");
  const navigate = useNavigate();
  const filtered = conversations.filter(
    (c) => c.businessName.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase())
  );
  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", "data-ocid": "inbox.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-5 pb-3 bg-card border-b border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Inbox" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: totalUnread > 0 ? `${totalUnread} unread` : "All caught up" })
        ] }),
        totalUnread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-destructive flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-white", children: totalUnread }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", "data-ocid": "inbox.search_input", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SearchIcon, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search conversations...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "w-full h-11 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-muted/80 transition-all duration-200"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex-1 overflow-y-auto px-3 py-2 space-y-1",
        "data-ocid": "inbox.list",
        children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "flex flex-col items-center justify-center py-20 gap-4",
            "data-ocid": "inbox.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center text-3xl", children: "💬" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No messages yet" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Your leads' replies will appear here" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold transition-all active:scale-95",
                  "data-ocid": "inbox.get_clients_button",
                  onClick: () => navigate({ to: "/fab" }),
                  children: "⚡ Get Clients Now"
                }
              )
            ]
          }
        ) : filtered.map((conv, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConversationRow,
          {
            conv,
            index: i,
            onSelect
          },
          conv.id
        ))
      }
    )
  ] });
}
function ConversationRow({
  conv,
  index,
  onSelect
}) {
  const [swiped, setSwiped] = reactExports.useState(false);
  const startXRef = reactExports.useRef(0);
  const initials = conv.businessName.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05, duration: 0.25, ease: "easeOut" },
      "data-ocid": `inbox.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: swiped ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 10 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -10 },
          className: "flex items-center justify-end gap-2 h-[76px] px-3 rounded-2xl bg-destructive/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-semibold", children: "Archived" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "text-xs text-primary underline",
                onClick: () => setSwiped(false),
                children: "Undo"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.button,
        {
          type: "button",
          className: [
            "w-full text-left flex items-center gap-3 p-3 rounded-2xl transition-all duration-200",
            conv.unreadCount > 0 ? "bg-primary/5 border border-primary/15" : "bg-card/60 border border-border/30"
          ].join(" "),
          whileTap: { scale: 0.97 },
          onClick: () => onSelect(conv.id),
          onTouchStart: (e) => {
            startXRef.current = e.touches[0].clientX;
          },
          onTouchEnd: (e) => {
            const diff = startXRef.current - e.changedTouches[0].clientX;
            if (diff > 60) setSwiped(true);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-12 h-12 rounded-full bg-gradient-to-br ${conv.avatarColor} flex items-center justify-center shrink-0`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: initials })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-sm font-semibold truncate ${conv.unreadCount > 0 ? "text-foreground" : "text-muted-foreground"}`,
                    children: conv.businessName
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground shrink-0 ml-2", children: conv.timestamp })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformIcon, { platform: conv.platform }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-xs truncate flex-1 ${conv.unreadCount > 0 ? "text-foreground/80" : "text-muted-foreground"}`,
                    children: conv.lastMessage
                  }
                )
              ] })
            ] }),
            conv.unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-destructive flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-white", children: conv.unreadCount }) })
          ]
        }
      ) })
    }
  );
}
function ChatDetail({
  conv,
  onBack
}) {
  const addMessage = useGrowthStore((s) => s.addMessage);
  const [messages, setMessages] = reactExports.useState(
    CHAT_MESSAGES[conv.id] ?? []
  );
  const [inputText, setInputText] = reactExports.useState("");
  const [showLeadInfo, setShowLeadInfo] = reactExports.useState(false);
  const [showSuccess, setShowSuccess] = reactExports.useState(false);
  const bottomRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  const { suggestions, context, logSuggestionUsed } = useInboxReplies({
    score: conv.score,
    status: conv.pipelineStatus,
    businessName: conv.businessName,
    city: conv.city
  });
  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: `new-${Date.now()}`,
      text: inputText.trim(),
      sender: "user",
      time: "Just now",
      status: "sent"
    };
    setMessages((prev) => [...prev, newMsg]);
    addMessage({
      id: newMsg.id,
      from: "You",
      content: newMsg.text,
      timestamp: /* @__PURE__ */ new Date(),
      channel: conv.platform === "email" ? "email" : "whatsapp",
      read: true
    });
    setInputText("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2e3);
    setTimeout(
      () => {
        var _a;
        return (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
      },
      50
    );
  };
  const handleSuggestion = (suggestionText) => {
    var _a;
    setInputText(suggestionText);
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      transition: { duration: 0.25, ease: "easeOut" },
      className: "flex flex-col h-full bg-background",
      "data-ocid": "inbox.chat_detail",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 bg-card border-b border-border/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "touch-target text-foreground -ml-1",
              onClick: onBack,
              "aria-label": "Go back",
              "data-ocid": "inbox.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BackIcon, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-base text-foreground truncate", children: conv.businessName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "w-2 h-2 rounded-full bg-green-500 shrink-0",
                  title: "Online"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              conv.city,
              " · Score ",
              conv.score
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "touch-target text-muted-foreground hover:text-foreground transition-colors",
              onClick: () => setShowLeadInfo((v) => !v),
              "aria-label": "Lead info",
              "data-ocid": "inbox.lead_info_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(InfoIcon, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showLeadInfo && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2, ease: "easeOut" },
            className: "overflow-hidden",
            "data-ocid": "inbox.lead_info_panel",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "w-full text-left px-4 py-3 bg-card/80 border-b border-border/30 space-y-2",
                onClick: () => setShowLeadInfo(false),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: conv.businessName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `text-[10px] font-bold px-2 py-0.5 rounded-full ${conv.score >= 85 ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"}`,
                        children: [
                          "Score ",
                          conv.score
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "📍 ",
                      conv.city
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "📞 ",
                      conv.phone
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "⚠️ ",
                      conv.issue
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "💬 ",
                      conv.prevInteractions,
                      " interactions"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60", children: "Tap to dismiss" })
                ]
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto px-4 py-4 space-y-3", children: [
          messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBubble, { msg, index: i }, msg.id)),
          showSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0 },
              className: "flex justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-green-400 bg-green-500/10 px-3 py-1 rounded-full", children: "✓ Message sent" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-2", "data-ocid": "inbox.suggestions_bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1.5 px-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-primary uppercase tracking-wide", children: "AI Suggestions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize", children: context })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { x: 60, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              transition: { duration: 0.3, ease: "easeOut" },
              className: "flex gap-2 overflow-x-auto pb-1",
              style: { scrollbarWidth: "none" },
              children: suggestions.map((suggestion, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.button,
                {
                  type: "button",
                  initial: { x: 40, opacity: 0 },
                  animate: { x: 0, opacity: 1 },
                  transition: { delay: i * 0.06, duration: 0.25, ease: "easeOut" },
                  className: "shrink-0 max-w-[120px] px-3 py-1.5 rounded-full border border-primary/30 bg-gradient-to-r from-primary/8 to-primary/5 text-xs text-foreground hover:border-primary/60 hover:from-primary/15 hover:to-primary/10 transition-all duration-200 active:scale-95 truncate",
                  onClick: () => {
                    logSuggestionUsed(suggestion);
                    handleSuggestion(suggestion.text);
                  },
                  title: suggestion.text,
                  "data-ocid": `inbox.suggestion.${i + 1}`,
                  children: suggestion.text
                },
                suggestion.id
              ))
            },
            conv.id
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 px-3 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "flex-1 h-9 rounded-xl border border-border/60 bg-card/60 text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-all duration-200 active:scale-95",
              "data-ocid": "inbox.send_proposal_button",
              children: "📄 Send Proposal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "flex-1 h-9 rounded-xl border border-border/60 bg-card/60 text-xs font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-all duration-200 active:scale-95",
              "data-ocid": "inbox.schedule_call_button",
              children: "📅 Schedule Call"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-4 pt-1 flex items-end gap-2 bg-card border-t border-border/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              ref: inputRef,
              value: inputText,
              onChange: (e) => setInputText(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              },
              placeholder: "Type a message...",
              rows: 1,
              className: "flex-1 resize-none rounded-2xl bg-muted/60 border border-border/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all duration-200 max-h-24 overflow-y-auto leading-5",
              style: { fontSize: "16px" },
              "data-ocid": "inbox.message_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              className: [
                "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shrink-0",
                inputText.trim() ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" : "bg-muted/50 text-muted-foreground"
              ].join(" "),
              whileTap: inputText.trim() ? { scale: 0.9 } : {},
              onClick: handleSend,
              disabled: !inputText.trim(),
              "aria-label": "Send message",
              "data-ocid": "inbox.send_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SendIcon, { active: !!inputText.trim() })
            }
          )
        ] })
      ]
    }
  );
}
function MessageBubble({ msg, index }) {
  const isUser = msg.sender === "user";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 10, scale: 0.92 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { delay: index * 0.04, duration: 0.2, ease: "easeOut" },
      className: `flex ${isUser ? "justify-end" : "justify-start"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `max-w-[78%] space-y-1 ${isUser ? "items-end" : "items-start"} flex flex-col`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: [
                  "px-4 py-2.5 text-sm leading-relaxed",
                  isUser ? "bg-primary text-primary-foreground rounded-tr-sm rounded-l-2xl rounded-br-2xl" : "bg-card border border-border/40 text-foreground rounded-tl-sm rounded-r-2xl rounded-bl-2xl"
                ].join(" "),
                children: msg.text
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center gap-1 px-1 ${isUser ? "flex-row-reverse" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: msg.time }),
                  isUser && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    msg.status === "sent" && /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, {}),
                    msg.status === "delivered" && /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { double: true }),
                    msg.status === "read" && /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { double: true, blue: true })
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function InboxPage() {
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const selectedConv = CONVERSATIONS.find((c) => c.id === selectedId) ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-col h-full overflow-hidden",
      "data-ocid": "inbox.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: selectedConv ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChatDetail,
        {
          conv: selectedConv,
          onBack: () => setSelectedId(null)
        },
        "chat"
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0, x: -30 },
          transition: { duration: 0.2, ease: "easeOut" },
          className: "flex flex-col h-full",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConversationList,
            {
              conversations: CONVERSATIONS,
              onSelect: setSelectedId
            }
          )
        },
        "list"
      ) })
    }
  );
}
export {
  InboxPage as default
};
