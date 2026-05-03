import { c as createLucideIcon, u as useActor, a as useQuery, b as useQueryClient, d as useMutation, e as createActor, r as reactExports, T as TrendingUp, ao as Wallet, a2 as Users, j as jsxRuntimeExports, n as Card, $ as Skeleton, h as Badge, R as ResponsiveContainer, J as BarChart, b1 as CartesianGrid, K as XAxis, Y as YAxis, N as Tooltip, O as Bar, Q as Cell, I as Input, i as Button, s as Copy, aT as ExternalLink, b3 as Separator, aJ as Dialog, aK as DialogContent, aL as DialogHeader, aM as DialogTitle, L as Label, m as ue } from "./index-DcPx_5wo.js";
import { I as IndianRupee } from "./indian-rupee-DdcDUuXd.js";
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
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
];
const Linkedin = createLucideIcon("linkedin", __iconNode);
const MOCK_STATS = {
  totalEarned: 11316,
  pendingPayouts: 830,
  paidOut: 10486,
  newReferrals: 21,
  conversionRate: 24,
  commissionRate: 25,
  referralLink: "https://growthos.app/ref/user123"
};
const now = Date.now();
const day = 864e5;
const MOCK_COMMISSIONS = [
  {
    id: "1",
    referredUserId: "u1",
    referredUserName: "Priya Salon Mumbai",
    plan: "Growth",
    amount: 74,
    status: "paid",
    createdAt: now - 45 * day,
    paidAt: now - 40 * day
  },
  {
    id: "2",
    referredUserId: "u2",
    referredUserName: "Aarav Fitness Pune",
    plan: "Pro",
    amount: 280,
    status: "paid",
    createdAt: now - 40 * day,
    paidAt: now - 35 * day
  },
  {
    id: "3",
    referredUserId: "u3",
    referredUserName: "Meena Skin Clinic",
    plan: "Agency",
    amount: 1500,
    status: "paid",
    createdAt: now - 38 * day,
    paidAt: now - 30 * day
  },
  {
    id: "4",
    referredUserId: "u4",
    referredUserName: "RealEstate Pro Delhi",
    plan: "Growth",
    amount: 75,
    status: "paid",
    createdAt: now - 32 * day,
    paidAt: now - 28 * day
  },
  {
    id: "5",
    referredUserId: "u5",
    referredUserName: "ZenYoga Studio Bangalore",
    plan: "Pro",
    amount: 280,
    status: "paid",
    createdAt: now - 28 * day,
    paidAt: now - 22 * day
  },
  {
    id: "6",
    referredUserId: "u6",
    referredUserName: "Bright Dental Hyderabad",
    plan: "Starter",
    amount: 10,
    status: "paid",
    createdAt: now - 25 * day,
    paidAt: now - 20 * day
  },
  {
    id: "7",
    referredUserId: "u7",
    referredUserName: "QuickFix Gym Kolkata",
    plan: "Growth",
    amount: 75,
    status: "paid",
    createdAt: now - 22 * day,
    paidAt: now - 18 * day
  },
  {
    id: "8",
    referredUserId: "u8",
    referredUserName: "Orchid Spa Chennai",
    plan: "Agency",
    amount: 1500,
    status: "approved",
    createdAt: now - 18 * day
  },
  {
    id: "9",
    referredUserId: "u9",
    referredUserName: "FitLife Thane",
    plan: "Pro",
    amount: 280,
    status: "approved",
    createdAt: now - 15 * day
  },
  {
    id: "10",
    referredUserId: "u10",
    referredUserName: "Apex Marketing Ahmedabad",
    plan: "Growth",
    amount: 75,
    status: "approved",
    createdAt: now - 12 * day
  },
  {
    id: "11",
    referredUserId: "u11",
    referredUserName: "Shree Salon Jaipur",
    plan: "Starter",
    amount: 10,
    status: "pending",
    createdAt: now - 8 * day
  },
  {
    id: "12",
    referredUserId: "u12",
    referredUserName: "Urban Cuts Surat",
    plan: "Growth",
    amount: 75,
    status: "pending",
    createdAt: now - 6 * day
  },
  {
    id: "13",
    referredUserId: "u13",
    referredUserName: "GreenGlow Clinic Nagpur",
    plan: "Pro",
    amount: 280,
    status: "pending",
    createdAt: now - 4 * day
  },
  {
    id: "14",
    referredUserId: "u14",
    referredUserName: "PowerHouse Gym Bhopal",
    plan: "Agency",
    amount: 1500,
    status: "pending",
    createdAt: now - 2 * day
  },
  {
    id: "15",
    referredUserId: "u15",
    referredUserName: "Radiance Salon Indore",
    plan: "Growth",
    amount: 75,
    status: "pending",
    createdAt: now - 1 * day
  }
];
const MOCK_MONTHLY = [
  { month: "Nov", earnings: 920 },
  { month: "Dec", earnings: 1480 },
  { month: "Jan", earnings: 2100 },
  { month: "Feb", earnings: 1750 },
  { month: "Mar", earnings: 3200 },
  { month: "Apr", earnings: 1866 }
];
const MOCK_PAYOUT_REQUESTS = [
  { requestId: "pr1", amount: 9200, status: "paid", createdAt: now - 35 * day },
  {
    requestId: "pr2",
    amount: 1286,
    status: "processing",
    createdAt: now - 10 * day
  }
];
function useAffiliateStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["affiliateStats"],
    queryFn: async () => {
      if (!actor) return MOCK_STATS;
      try {
        const raw = await actor.getAffiliateStats();
        if (!raw) return MOCK_STATS;
        return {
          totalEarned: Number(
            raw.totalEarnings ?? 0
          ),
          pendingPayouts: Number(
            raw.pendingEarnings ?? 0
          ),
          paidOut: Number(
            raw.paidEarnings ?? 0
          ),
          newReferrals: Number(
            raw.totalReferrals ?? 0
          ),
          conversionRate: Number(raw.conversionRate ?? 0),
          commissionRate: 25,
          referralLink: MOCK_STATS.referralLink
        };
      } catch {
        return MOCK_STATS;
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
function useCommissions(status = "all") {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["commissions", status],
    queryFn: async () => {
      if (!actor) {
        if (status === "all") return MOCK_COMMISSIONS;
        return MOCK_COMMISSIONS.filter((c) => c.status === status);
      }
      try {
        const raw = await actor.listCommissions(
          status === "all" ? null : status
        );
        if (!(raw == null ? void 0 : raw.length)) {
          if (status === "all") return MOCK_COMMISSIONS;
          return MOCK_COMMISSIONS.filter((c) => c.status === status);
        }
        return raw.map((c) => ({
          id: String(c.id),
          referredUserId: String(c.referredUserId),
          referredUserName: `User ${c.referredUserId.slice(0, 8)}`,
          plan: c.planTier,
          amount: Number(c.commissionAmount),
          status: c.status,
          createdAt: Number(c.createdAt),
          paidAt: c.paidAt ? Number(c.paidAt) : void 0
        }));
      } catch {
        if (status === "all") return MOCK_COMMISSIONS;
        return MOCK_COMMISSIONS.filter((c) => c.status === status);
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
function useMonthlyEarnings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["monthlyEarnings"],
    queryFn: async () => {
      if (!actor) return MOCK_MONTHLY;
      return MOCK_MONTHLY;
    },
    enabled: !isFetching,
    staleTime: 3e5
  });
}
function usePayoutRequests() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["payoutRequests"],
    queryFn: async () => {
      if (!actor) return MOCK_PAYOUT_REQUESTS;
      try {
        const raw = await actor.listPayoutRequests();
        if (!(raw == null ? void 0 : raw.length)) return MOCK_PAYOUT_REQUESTS;
        return raw.map((r) => ({
          requestId: String(r.requestId),
          amount: Number(r.amount),
          status: r.status,
          createdAt: Number(r.createdAt)
        }));
      } catch {
        return MOCK_PAYOUT_REQUESTS;
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
function useRequestPayout() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (bankDetails) => {
      if (!actor) throw new Error("Actor not ready");
      try {
        await actor.requestPayout(JSON.stringify(bankDetails));
      } catch {
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["affiliateStats"] });
      qc.invalidateQueries({ queryKey: ["commissions"] });
      qc.invalidateQueries({ queryKey: ["payoutRequests"] });
    }
  });
}
const COMMISSION_TIERS = [
  { plan: "Starter", rate: "20%", perReferral: "₹9.80", color: "bg-muted" },
  {
    plan: "Growth",
    rate: "25%",
    perReferral: "₹74.75",
    color: "bg-primary/10"
  },
  { plan: "Pro", rate: "28%", perReferral: "₹279.72", color: "bg-primary/20" },
  {
    plan: "Agency",
    rate: "30%",
    perReferral: "₹1,499.70",
    color: "bg-primary/30"
  }
];
const STATUS_COLORS = {
  paid: "text-success border-success/30 bg-success/10",
  approved: "text-primary border-primary/30 bg-primary/10",
  pending: "text-warning border-warning/30 bg-warning/10",
  rejected: "text-destructive border-destructive/30 bg-destructive/10"
};
const PAGE_SIZE = 10;
const FILTERS = ["all", "pending", "paid"];
function AffiliateCommissionPage() {
  const { data: stats, isLoading: statsLoading } = useAffiliateStats();
  const [filter, setFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  const { data: commissions = [], isLoading: comLoading } = useCommissions(filter);
  const { data: monthlyEarnings = [] } = useMonthlyEarnings();
  const { data: payoutRequests = [] } = usePayoutRequests();
  const requestPayout = useRequestPayout();
  const [showPayout, setShowPayout] = reactExports.useState(false);
  const [bankForm, setBankForm] = reactExports.useState({
    accountName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    upiId: ""
  });
  const paged = commissions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(commissions.length / PAGE_SIZE));
  const pendingAmt = (stats == null ? void 0 : stats.pendingPayouts) ?? 0;
  const referralLink = (stats == null ? void 0 : stats.referralLink) ?? "https://growthos.app/ref/user123";
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    ue.success("Referral link copied!");
  };
  const handlePayout = async () => {
    await requestPayout.mutateAsync(bankForm);
    setShowPayout(false);
    setBankForm({
      accountName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      upiId: ""
    });
    ue.success("Payout request submitted!");
  };
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Join GrowthOS and grow your business! ${referralLink}`)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;
  const kpiCards = [
    {
      label: "Total Earnings",
      value: statsLoading ? null : `₹${((stats == null ? void 0 : stats.totalEarned) ?? 0).toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
      ocid: "affiliate.total_earned"
    },
    {
      label: "Pending Payout",
      value: statsLoading ? null : `₹${pendingAmt.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-warning",
      bg: "bg-warning/10",
      ocid: "affiliate.pending_payout"
    },
    {
      label: "Paid Out",
      value: statsLoading ? null : `₹${((stats == null ? void 0 : stats.paidOut) ?? 0).toLocaleString("en-IN")}`,
      icon: Wallet,
      color: "text-success",
      bg: "bg-success/10",
      ocid: "affiliate.paid_out"
    },
    {
      label: "Conversion Rate",
      value: statsLoading ? null : `${(stats == null ? void 0 : stats.conversionRate) ?? 0}%`,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      ocid: "affiliate.conversion_rate"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Affiliate Commission" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Earn up to 30% recurring commission on every referral that upgrades." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: kpiCards.map((kpi) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "p-4 hover:shadow-md transition-shadow",
        "data-ocid": kpi.ocid,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: kpi.label }),
            kpi.value === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20 mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground mt-1 truncate", children: kpi.value })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `p-2 rounded-lg shrink-0 ${kpi.bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(kpi.icon, { className: `w-4 h-4 ${kpi.color}` }) })
        ] })
      },
      kpi.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-1", children: "Your Commission Rates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-4", children: "Earn more by referring high-tier plans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: COMMISSION_TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex items-center justify-between rounded-lg px-3 py-2.5 ${tier.color}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: tier.plan }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs px-1.5", children: tier.rate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                tier.perReferral,
                "/referral"
              ] })
            ]
          },
          tier.plan
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-4", children: "Monthly Earnings (Last 6 Months)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          BarChart,
          {
            data: monthlyEarnings,
            margin: { top: 0, right: 0, left: -20, bottom: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "oklch(var(--border))"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "month",
                  tick: { fontSize: 11, fill: "oklch(var(--muted-foreground))" },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  tick: { fontSize: 11, fill: "oklch(var(--muted-foreground))" },
                  axisLine: false,
                  tickLine: false,
                  tickFormatter: (v) => `₹${(v / 1e3).toFixed(1)}k`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  formatter: (v) => [
                    `₹${v.toLocaleString("en-IN")}`,
                    "Earnings"
                  ],
                  contentStyle: {
                    background: "oklch(var(--card))",
                    border: "1px solid oklch(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "earnings", radius: [4, 4, 0, 0], children: monthlyEarnings.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Cell,
                {
                  fill: "oklch(var(--success))",
                  opacity: i === monthlyEarnings.length - 1 ? 1 : 0.7
                },
                (entry == null ? void 0 : entry.month) ?? i
              )) })
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Your Referral Link" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Share this link to earn commissions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: whatsappShareUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 transition-colors font-medium",
              "data-ocid": "affiliate.share_whatsapp",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    viewBox: "0 0 24 24",
                    className: "w-3.5 h-3.5 fill-current",
                    "aria-hidden": "true",
                    focusable: "false",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })
                  }
                ),
                "WhatsApp"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: linkedinShareUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 transition-colors font-medium",
              "data-ocid": "affiliate.share_linkedin",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "w-3.5 h-3.5" }),
                "LinkedIn"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            readOnly: true,
            value: referralLink,
            className: "text-xs font-mono bg-muted/50",
            "data-ocid": "affiliate.referral_link"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handleCopyLink,
            "data-ocid": "affiliate.copy_link_button",
            className: "shrink-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            variant: "link",
            className: "text-xs shrink-0 px-2",
            onClick: () => {
              window.location.href = "/referral";
            },
            "data-ocid": "affiliate.milestones_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 mr-1" }),
              "Milestones"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Available to payout" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground", children: [
            "₹",
            pendingAmt.toLocaleString("en-IN")
          ] }),
          pendingAmt < 500 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Minimum ₹500 required to request payout" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "button",
            disabled: pendingAmt < 500 || requestPayout.isPending,
            onClick: () => setShowPayout(true),
            "data-ocid": "affiliate.request_payout_button",
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "w-4 h-4" }),
              "Request Payout"
            ]
          }
        )
      ] }),
      payoutRequests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-2", children: "Pending payout requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: payoutRequests.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-muted/40",
            "data-ocid": `affiliate.payout_request.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                "₹",
                req.amount.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: new Date(req.createdAt).toLocaleDateString("en-IN") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs text-warning border-warning/30 bg-warning/10",
                  children: req.status
                }
              )
            ]
          },
          req.requestId
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-b border-border flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Commission History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            commissions.length,
            " records"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            size: "sm",
            variant: filter === f ? "default" : "ghost",
            className: "h-7 text-xs capitalize",
            onClick: () => {
              setFilter(f);
              setPage(1);
            },
            "data-ocid": `affiliate.filter.${f}`,
            children: f
          },
          f
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:grid grid-cols-5 gap-4 px-5 py-2.5 bg-muted/30 text-xs font-medium text-muted-foreground border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-span-2", children: "Referred User" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Plan / Commission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Status" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
        comLoading ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-4 px-5 py-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 flex-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
            ]
          },
          `skel-row-${i}`
        )) : paged.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 items-center px-5 py-3.5 hover:bg-muted/20 transition-colors",
            "data-ocid": `affiliate.commission.${(page - 1) * PAGE_SIZE + i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(c.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "2-digit"
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground col-span-1 md:col-span-2 truncate", children: c.referredUserName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: c.plan }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-success font-semibold", children: [
                  "+₹",
                  c.amount.toLocaleString("en-IN")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs ${STATUS_COLORS[c.status]}`,
                  children: c.status
                }
              ) })
            ]
          },
          c.id
        )),
        !comLoading && commissions.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center h-32 text-center px-5",
            "data-ocid": "affiliate.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-muted-foreground/30 mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No commissions yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 mt-0.5", children: "Share your referral link to start earning" })
            ]
          }
        )
      ] }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Page ",
          page,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              className: "h-7 text-xs",
              disabled: page === 1,
              onClick: () => setPage((p) => p - 1),
              "data-ocid": "affiliate.pagination_prev",
              children: "Previous"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "outline",
              className: "h-7 text-xs",
              disabled: page === totalPages,
              onClick: () => setPage((p) => p + 1),
              "data-ocid": "affiliate.pagination_next",
              children: "Next"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showPayout, onOpenChange: setShowPayout, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { "data-ocid": "affiliate.dialog", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Request Payout" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Amount to be paid:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
          "₹",
          pendingAmt.toLocaleString("en-IN")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-1", children: [
        [
          {
            key: "accountName",
            label: "Account Holder Name",
            placeholder: "Anees Chaudhary"
          },
          {
            key: "accountNumber",
            label: "Account Number",
            placeholder: "XXXX XXXX XXXX"
          },
          {
            key: "ifscCode",
            label: "IFSC Code",
            placeholder: "HDFC0001234"
          },
          { key: "bankName", label: "Bank Name", placeholder: "HDFC Bank" },
          {
            key: "upiId",
            label: "UPI ID (optional)",
            placeholder: "phone@upi"
          }
        ].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: bankForm[f.key],
              onChange: (e) => setBankForm((b) => ({ ...b, [f.key]: e.target.value })),
              placeholder: f.placeholder,
              "data-ocid": `affiliate.payout.${f.key}_input`
            }
          )
        ] }, f.key)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => setShowPayout(false),
              "data-ocid": "affiliate.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              disabled: !bankForm.accountName || !bankForm.accountNumber || requestPayout.isPending,
              onClick: handlePayout,
              "data-ocid": "affiliate.confirm_button",
              children: requestPayout.isPending ? "Submitting…" : "Submit Request"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AffiliateCommissionPage as default
};
