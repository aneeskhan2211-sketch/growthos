import { c as createLucideIcon, j as jsxRuntimeExports, bh as Root, r as reactExports, bi as useComposedRefs, bj as WarningProvider, bk as Content, bl as composeEventHandlers, bm as Title, bn as Description, bo as Close, bp as createDialogScope, bq as Portal, br as Overlay, bs as createSlottable, bt as createContextScope, bu as Trigger, f as cn, bv as buttonVariants, a$ as useNavigate, i as Button, y as motion, n as Card, ab as Sparkles, h as Badge, G as Star, Z as Zap, bw as Crown, a0 as CircleCheck, X, m as ue, T as TrendingUp, k as Shield, bx as CreditCard, aH as Download, ai as Plus, ao as Wallet, b3 as Separator, aJ as Dialog, aK as DialogContent, aL as DialogHeader, aM as DialogTitle } from "./index-DcPx_5wo.js";
import { P as PageHeader } from "./PageHeader-DQS9y6_H.js";
import { A as ArrowUpRight } from "./arrow-up-right-B1K0Na3Y.js";
import { M as Minus } from "./minus-BGo421Cc.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  destructive = false,
  loading = false,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AlertDialogContent,
    {
      "data-ocid": ocid ? `${ocid}.dialog` : "confirm.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogCancel,
            {
              "data-ocid": ocid ? `${ocid}.cancel_button` : "confirm.cancel_button",
              disabled: loading,
              children: cancelLabel
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            AlertDialogAction,
            {
              "data-ocid": ocid ? `${ocid}.confirm_button` : "confirm.confirm_button",
              onClick: onConfirm,
              disabled: loading,
              className: cn(
                destructive && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              ),
              children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" }),
                "Processing…"
              ] }) : confirmLabel
            }
          )
        ] })
      ]
    }
  ) });
}
const ALL_FEATURES = [
  "Leads per day",
  "AI Pitch Generator",
  "AI Proposal Generator",
  "Auto Follow-Up",
  "CRM Pipeline",
  "SEO Checklist",
  "Campaign Builder",
  "Advanced Analytics",
  "White-label Reports",
  "Team Access",
  "Priority Support",
  "Dedicated Account Manager",
  "API Access"
];
const PLANS = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Manual outreach, 10 leads/day",
    features: [
      { label: "10 leads/day", included: true },
      { label: "AI pitch generator", included: false },
      { label: "AI proposal generator", included: false },
      { label: "Auto follow-up", included: false },
      { label: "CRM pipeline", included: false },
      { label: "SEO checklist", included: false },
      { label: "Campaign builder", included: false },
      { label: "Advanced analytics", included: false },
      { label: "White-label reports", included: false },
      { label: "Team access", included: false },
      { label: "Priority support", included: false },
      { label: "Account manager", included: false },
      { label: "API access", included: false }
    ]
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "50 leads/day + message templates",
    features: [
      { label: "50 leads/day", included: true },
      { label: "AI pitch generator", included: true },
      { label: "AI proposal generator", included: false },
      { label: "Basic follow-up", included: true },
      { label: "CRM pipeline", included: false },
      { label: "SEO checklist", included: false },
      { label: "Campaign builder", included: false },
      { label: "Advanced analytics", included: false },
      { label: "White-label reports", included: false },
      { label: "Team access", included: false },
      { label: "Priority support", included: false },
      { label: "Account manager", included: false },
      { label: "API access", included: false }
    ]
  },
  {
    id: "growth",
    name: "Growth",
    monthlyPrice: 299,
    yearlyPrice: 239,
    description: "Auto follow-ups, CRM pipeline, reports",
    highlighted: true,
    current: true,
    features: [
      { label: "150 leads/day", included: true },
      { label: "AI pitch generator", included: true },
      { label: "AI proposal generator", included: false },
      { label: "Auto follow-up", included: true },
      { label: "CRM pipeline", included: true },
      { label: "SEO checklist", included: true },
      { label: "Campaign builder", included: false },
      { label: "Advanced analytics", included: false },
      { label: "White-label reports", included: false },
      { label: "Team access", included: false },
      { label: "Priority support", included: true },
      { label: "Account manager", included: false },
      { label: "API access", included: false }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 999,
    yearlyPrice: 799,
    description: "500 leads/day + proposals + campaigns",
    features: [
      { label: "500 leads/day", included: true },
      { label: "AI pitch generator", included: true },
      { label: "AI proposal generator", included: true },
      { label: "Auto follow-up", included: true },
      { label: "CRM pipeline", included: true },
      { label: "SEO checklist", included: true },
      { label: "Campaign builder", included: true },
      { label: "Advanced analytics", included: true },
      { label: "White-label reports", included: false },
      { label: "Team access", included: false },
      { label: "Priority support", included: true },
      { label: "Account manager", included: false },
      { label: "API access", included: false }
    ]
  },
  {
    id: "agency",
    name: "Agency",
    monthlyPrice: 4999,
    yearlyPrice: 3999,
    description: "White-label reports, team access, high-volume",
    features: [
      { label: "Unlimited leads (fair usage)", included: true },
      { label: "AI pitch generator", included: true },
      { label: "AI proposal generator", included: true },
      { label: "Auto follow-up", included: true },
      { label: "CRM pipeline", included: true },
      { label: "SEO checklist", included: true },
      { label: "Campaign builder", included: true },
      { label: "Advanced analytics", included: true },
      { label: "White-label reports", included: true },
      { label: "Team access", included: true },
      { label: "Priority support", included: true },
      { label: "Dedicated account manager", included: true },
      { label: "API access", included: true }
    ]
  }
];
const CREDIT_METERS = [
  {
    id: "leads",
    label: "Lead Credits",
    used: 847,
    total: 1e3,
    color: "primary",
    packLabel: "Lead Pack",
    packPrice: "100 leads for ₹499"
  },
  {
    id: "ai",
    label: "AI Message Credits",
    used: 234,
    total: 500,
    color: "success",
    packLabel: "Message Pack",
    packPrice: "200 messages for ₹299"
  },
  {
    id: "campaigns",
    label: "Campaign Credits",
    used: 3,
    total: 10,
    color: "warning",
    packLabel: "Campaign Pack",
    packPrice: "5 campaigns for ₹999"
  }
];
const INVOICES = [
  {
    id: "INV-2604",
    date: "Apr 1, 2026",
    description: "Growth Plan — Monthly",
    amount: "₹299",
    status: "paid"
  },
  {
    id: "INV-2603",
    date: "Mar 1, 2026",
    description: "Growth Plan — Monthly",
    amount: "₹299",
    status: "paid"
  },
  {
    id: "INV-2602",
    date: "Feb 1, 2026",
    description: "Growth Plan — Monthly",
    amount: "₹299",
    status: "paid"
  },
  {
    id: "INV-2601",
    date: "Jan 1, 2026",
    description: "Starter Plan — Monthly",
    amount: "₹49",
    status: "paid"
  },
  {
    id: "INV-2512",
    date: "Dec 1, 2025",
    description: "Starter Plan — Monthly",
    amount: "₹49",
    status: "paid"
  }
];
const INITIAL_ADDONS = [
  {
    id: "lead-pack",
    label: "Lead Pack",
    quantity: 1,
    unitLabel: "100 leads",
    price: "₹499",
    priceAmount: 499
  },
  {
    id: "message-pack",
    label: "Message Pack",
    quantity: 1,
    unitLabel: "200 messages",
    price: "₹299",
    priceAmount: 299
  },
  {
    id: "campaign-pack",
    label: "Campaign Pack",
    quantity: 1,
    unitLabel: "5 campaigns",
    price: "₹999",
    priceAmount: 999
  }
];
function colorClass(color) {
  if (color === "primary") return "bg-primary";
  if (color === "success") return "bg-success";
  return "bg-warning";
}
function ringClass(color) {
  if (color === "primary") return "stroke-primary";
  if (color === "success") return "stroke-success";
  return "stroke-warning";
}
function CircularMeter({
  used,
  total,
  color
}) {
  const pct = Math.min(used / total * 100, 100);
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "80",
      height: "80",
      viewBox: "0 0 80 80",
      role: "img",
      "aria-label": `${pct.toFixed(0)}% used`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: `${pct.toFixed(0)}% used` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "40",
            cy: "40",
            r,
            fill: "none",
            className: "stroke-border",
            strokeWidth: "6"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.circle,
          {
            cx: "40",
            cy: "40",
            r,
            fill: "none",
            className: ringClass(color),
            strokeWidth: "6",
            strokeLinecap: "round",
            strokeDasharray: circ,
            initial: { strokeDashoffset: circ },
            animate: { strokeDashoffset: offset },
            transition: { duration: 1, ease: "easeOut", delay: 0.2 },
            transform: "rotate(-90 40 40)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "text",
          {
            x: "40",
            y: "44",
            textAnchor: "middle",
            fontSize: "13",
            fontWeight: "700",
            fill: "currentColor",
            className: "text-foreground",
            children: [
              pct.toFixed(0),
              "%"
            ]
          }
        )
      ]
    }
  );
}
function CompareModal({
  open,
  onClose,
  isYearly
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-3xl max-h-[80vh] overflow-y-auto scrollbar-thin",
      "data-ocid": "billing.compare.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg", children: "Compare All Plans" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 pr-4 font-medium text-muted-foreground w-40", children: "Feature" }),
            PLANS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: "py-3 px-2 text-center min-w-[90px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `font-display font-semibold ${p.current ? "text-primary" : "text-foreground"}`,
                  children: p.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal text-muted-foreground tabular-nums", children: p.monthlyPrice === 0 ? "Free" : `₹${(isYearly ? p.yearlyPrice : p.monthlyPrice).toLocaleString("en-IN")}/mo` })
            ] }, p.id))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: ALL_FEATURES.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-b border-border/50 ${i % 2 === 0 ? "bg-muted/20" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 pr-4 text-foreground", children: feat }),
                PLANS.map((p) => {
                  var _a;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-2 text-center", children: ((_a = p.features[i]) == null ? void 0 : _a.included) ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground/40 mx-auto" }) }, p.id);
                })
              ]
            },
            feat
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onClose,
            "data-ocid": "billing.compare.close_button",
            children: "Close"
          }
        ) })
      ]
    }
  ) });
}
function BillingUpgradeButton() {
  const nav = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      size: "sm",
      className: "btn-primary-glow",
      onClick: () => nav({
        to: "/checkout",
        search: { plan: "rzp_growth" }
      }),
      "data-ocid": "billing.upgrade_plan.button",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 mr-1.5" }),
        "Upgrade Plan"
      ]
    }
  );
}
function BillingPage() {
  const navigate = useNavigate();
  const [compareOpen, setCompareOpen] = reactExports.useState(false);
  const [cancelOpen, setCancelOpen] = reactExports.useState(false);
  const [isYearly, setIsYearly] = reactExports.useState(false);
  const [addons, setAddons] = reactExports.useState(INITIAL_ADDONS);
  const [cartTotal, setCartTotal] = reactExports.useState(0);
  function adjustQty(id, delta) {
    setAddons(
      (prev) => prev.map(
        (a) => a.id === id ? { ...a, quantity: Math.max(1, a.quantity + delta) } : a
      )
    );
  }
  function handleCheckout() {
    const total = addons.reduce(
      (sum, a) => sum + a.priceAmount * a.quantity,
      0
    );
    setCartTotal(total);
    ue.success(
      `Order of ₹${total.toLocaleString("en-IN")} placed successfully!`,
      {
        description: "Credits will be added to your account within minutes."
      }
    );
  }
  const cartSum = addons.reduce(
    (sum, a) => sum + a.priceAmount * a.quantity,
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "billing.page", className: "space-y-8 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Billing",
        description: "Manage your subscription and usage",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setCompareOpen(true),
            "data-ocid": "billing.compare.open_modal_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5 mr-1.5" }),
              "Compare Plans"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "billing.current_plan.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Current Plan" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 border-primary/40 shadow-glow-primary relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute top-0 left-0 right-0 h-0.5",
                style: {
                  background: "linear-gradient(90deg, oklch(var(--primary)), oklch(var(--premium-accent)), transparent)"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl gradient-premium flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-foreground", children: "Growth Plan" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "status-active text-[10px] font-semibold px-2 py-0.5", children: "Active" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "status-premium text-[10px] font-semibold px-2 py-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5 mr-1" }),
                    "Most Popular"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3 text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Billing Cycle" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mt-0.5", children: isYearly ? "Yearly" : "Monthly" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current Price" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mt-0.5 tabular-nums", children: isYearly ? "₹239/mo" : "₹299/mo" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Next Renewal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mt-0.5", children: "May 1, 2026" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Next Bill Amount" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mt-0.5 tabular-nums", children: isYearly ? "₹2,868" : "₹299" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BillingUpgradeButton, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "outline",
                    "data-ocid": "billing.manage_subscription.button",
                    children: "Manage"
                  }
                )
              ] })
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "billing.credits.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Credit Usage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: CREDIT_METERS.map((m, i) => {
        const pct = Math.min(Math.round(m.used / m.total * 100), 100);
        const remaining = m.total - m.used;
        const isHigh = pct >= 80;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: i * 0.1 },
            "data-ocid": `billing.credit_meter.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5 flex flex-col items-center text-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircularMeter,
                {
                  used: m.used,
                  total: m.total,
                  color: m.color
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: m.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 tabular-nums", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: isHigh ? "text-destructive font-semibold" : "text-foreground font-semibold",
                      children: m.used.toLocaleString()
                    }
                  ),
                  " / ",
                  m.total.toLocaleString(),
                  " used"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                  remaining.toLocaleString(),
                  " remaining"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: `progress-bar-fill ${isHigh ? "bg-destructive" : colorClass(m.color)}`,
                    style: { background: void 0 },
                    initial: { width: 0 },
                    animate: { width: `${pct}%` },
                    transition: {
                      duration: 0.9,
                      ease: "easeOut",
                      delay: 0.3 + i * 0.1
                    }
                  }
                ) }),
                isHigh && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-destructive mt-1 font-medium", children: "Running low" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  className: "text-xs text-primary hover:underline transition-fast",
                  "data-ocid": `billing.credit_buy_more.${i + 1}`,
                  children: [
                    "Buy More — ",
                    m.packPrice
                  ]
                }
              )
            ] })
          },
          m.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "billing.plans.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Subscription Plans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs font-semibold transition-colors ${!isYearly ? "text-foreground" : "text-muted-foreground"}`,
              children: "Monthly"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "switch",
              "aria-checked": isYearly,
              onClick: () => setIsYearly((p) => !p),
              className: `relative w-10 h-5 rounded-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary ${isYearly ? "bg-primary" : "bg-muted"}`,
              "data-ocid": "billing.billing_toggle",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-card shadow-subtle transition-transform duration-200 ${isYearly ? "translate-x-5" : "translate-x-0"}`
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `text-xs font-semibold transition-colors flex items-center gap-1.5 ${isYearly ? "text-foreground" : "text-muted-foreground"}`,
              children: [
                "Yearly",
                isYearly && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    className: "text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-warning/15 text-warning",
                    children: "Save 20%"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-xs text-primary hover:underline transition-fast ml-2",
              onClick: () => setCompareOpen(true),
              "data-ocid": "billing.compare_inline.button",
              children: "Compare all →"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin pb-3 md:grid md:grid-cols-5 md:overflow-visible", children: PLANS.map((plan, i) => {
        const displayPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: i * 0.05 },
            className: "snap-start shrink-0 w-[220px] md:w-auto",
            "data-ocid": `billing.plan.${i + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: `p-5 h-full flex flex-col relative transition-smooth ${plan.highlighted ? "border-primary shadow-elevated scale-[1.02]" : "border-border"}`,
                children: [
                  plan.highlighted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-elevated", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-2.5 h-2.5" }),
                    "Most Popular"
                  ] }) }),
                  plan.current && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "absolute top-3 right-3 status-active text-[10px] font-semibold px-2 py-0.5", children: "Current" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3", children: [
                    plan.id === "free" && /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                    plan.id === "starter" && /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-primary" }),
                    plan.id === "growth" && /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3.5 h-3.5 text-primary" }),
                    plan.id === "pro" && /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-primary" }),
                    plan.id === "agency" && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3.5 h-3.5 text-warning" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: plan.name }),
                    plan.id === "growth" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-primary/80 mt-0.5", children: "Most businesses start here" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 mt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-foreground tabular-nums", children: plan.monthlyPrice === 0 ? "₹0" : `₹${displayPrice.toLocaleString("en-IN")}` }),
                      plan.monthlyPrice > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "/mo" })
                    ] }),
                    isYearly && plan.monthlyPrice > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-success font-semibold mt-0.5", children: [
                      "Save",
                      " ",
                      Math.round(
                        (plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice * 100
                      ),
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: plan.description })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 flex-1 mb-4", children: plan.features.slice(0, 6).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex items-start gap-2 text-xs",
                      children: [
                        f.included ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success mt-0.5 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 text-muted-foreground/40 mt-0.5 shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: f.included ? "text-foreground" : "text-muted-foreground/60",
                            children: f.label
                          }
                        )
                      ]
                    },
                    f.label
                  )) }),
                  (plan.id === "starter" || plan.id === "growth") && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-2 text-center", children: "🎁 7-day free trial" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      className: `w-full text-xs h-9 ${plan.highlighted && !plan.current ? "btn-primary-glow" : ""}`,
                      variant: plan.current ? "outline" : plan.highlighted ? "default" : "outline",
                      disabled: plan.current,
                      onClick: () => {
                        if (!plan.current) {
                          if (plan.id === "agency") {
                            ue.info("Contact our sales team for Agency plan.");
                          } else if (plan.id !== "free") {
                            navigate({
                              to: "/checkout",
                              search: {
                                plan: `rzp_${plan.id}`,
                                yearly: isYearly ? "1" : void 0
                              }
                            });
                          }
                        }
                      },
                      "data-ocid": `billing.plan.select.${plan.id}`,
                      children: plan.current ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                        "Current Plan"
                      ] }) : plan.id === "free" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                        "Start free"
                      ] }) : plan.id === "starter" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5" }),
                        "Get started"
                      ] }) : plan.id === "growth" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                        "Upgrade to Growth"
                      ] }) : plan.id === "pro" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3.5 h-3.5" }),
                        "Go Pro"
                      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-3.5 h-3.5 text-warning" }),
                        "Start Agency plan"
                      ] })
                    }
                  )
                ]
              }
            )
          },
          plan.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "billing.roi_callout.section", className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.15 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5 border-success/30 bg-success/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-success/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Even 1 new customer can cover your monthly plan." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: [
                "Example: ₹1,000 service × 10 extra customers =",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-success", children: "₹10,000 added revenue" }),
                " ",
                "— enough to cover the Growth plan for over 33 months."
              ] })
            ] })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
          "data-ocid": "billing.objections.section",
          children: [
            {
              id: "no-contracts",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-primary" }),
              text: "No contracts. Cancel anytime."
            },
            {
              id: "no-experience",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success" }),
              text: "No experience needed — the app guides you step by step."
            },
            {
              id: "integrations",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-warning" }),
              text: "Works with Google Ads, Meta Ads, and WhatsApp Business."
            }
          ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-2.5 p-3.5 rounded-xl bg-muted/30 border border-border/60",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 shrink-0", children: item.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: item.text })
              ]
            },
            item.id
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/70 text-center", children: "Results depend on your location, offer, and follow-up speed. Integrations are not endorsements. Logos belong to their owners." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "billing.history.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Billing History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Invoices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Visa ****4242" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: INVOICES.map((inv, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -6 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.3, delay: i * 0.06 },
            className: "flex items-center gap-4 px-5 py-3.5 hover:bg-muted/20 transition-fast",
            "data-ocid": `billing.invoice.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-3.5 h-3.5 text-success" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: inv.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  inv.date,
                  " ·",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px]", children: inv.id })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground tabular-nums shrink-0", children: inv.amount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 capitalize ${inv.status === "paid" ? "status-active" : "status-paused"}`,
                  children: inv.status
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "w-7 h-7 text-muted-foreground hover:text-foreground shrink-0",
                  "aria-label": "Download invoice",
                  "data-ocid": `billing.invoice.download.${i + 1}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" })
                }
              )
            ]
          },
          inv.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 flex items-center gap-2 bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Payments secured by",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-[#528FF0]", children: "Razorpay" }),
            ". All invoices include GST."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "billing.payment_method.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Payment Method" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-8 rounded-md bg-muted/50 border border-border flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              viewBox: "0 0 40 24",
              width: "32",
              height: "20",
              role: "img",
              "aria-label": "Visa card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Visa card" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: "4",
                    y: "17",
                    fontSize: "13",
                    fontWeight: "800",
                    fill: "oklch(0.45 0.15 253)",
                    children: "VISA"
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Visa ending in 4242" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Expires 12/27" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-active text-[10px] font-semibold px-2 py-0.5 rounded-full", children: "Primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              "data-ocid": "billing.update_card.button",
              children: "Update Card"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "gap-1.5",
              "data-ocid": "billing.add_payment_method.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                "Add Method"
              ]
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "billing.addons.section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3", children: "Purchase Add-on Credits" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: addons.map((addon, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-4 py-3 border-b border-border/50 last:border-0",
            "data-ocid": `billing.addon.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: addon.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  addon.unitLabel,
                  " · ",
                  addon.price,
                  " per pack"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => adjustQty(addon.id, -1),
                    className: "w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-fast",
                    "aria-label": "Decrease quantity",
                    "data-ocid": `billing.addon.decrease.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center text-sm font-semibold text-foreground tabular-nums", children: addon.quantity }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => adjustQty(addon.id, 1),
                    className: "w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-fast",
                    "aria-label": "Increase quantity",
                    "data-ocid": `billing.addon.increase.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "w-20 text-right text-sm font-bold text-foreground tabular-nums shrink-0", children: [
                "₹",
                (addon.priceAmount * addon.quantity).toLocaleString("en-IN")
              ] })
            ]
          },
          addon.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Cart Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-bold text-foreground tabular-nums", children: [
              "₹",
              cartSum.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "btn-primary-glow gap-2",
              onClick: handleCheckout,
              "data-ocid": "billing.addon.checkout.button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                "Checkout"
              ]
            }
          )
        ] })
      ] }),
      cartTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.p,
        {
          initial: { opacity: 0, y: 4 },
          animate: { opacity: 1, y: 0 },
          className: "text-xs text-success mt-2 flex items-center gap-1",
          "data-ocid": "billing.checkout.success_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
            "Last order of ₹",
            cartTotal.toLocaleString("en-IN"),
            " was placed successfully."
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "pt-4 border-t border-border/50",
        "data-ocid": "billing.cancel.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Want to cancel your subscription?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "text-destructive hover:underline transition-fast text-xs",
              onClick: () => setCancelOpen(true),
              "data-ocid": "billing.cancel_subscription.button",
              children: "Cancel Subscription"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CompareModal,
      {
        open: compareOpen,
        onClose: () => setCompareOpen(false),
        isYearly
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmModal,
      {
        open: cancelOpen,
        onOpenChange: setCancelOpen,
        title: "Cancel Your Subscription?",
        description: "You will immediately lose access to: 150 leads/day, auto follow-up, CRM pipeline, SEO checklist, and priority support. Your account will revert to the Free plan on May 1, 2026.",
        confirmLabel: "Yes, Cancel Plan",
        cancelLabel: "Keep My Plan",
        destructive: true,
        onConfirm: () => {
          setCancelOpen(false);
          ue.error("Subscription cancelled.", {
            description: "Access continues until May 1, 2026."
          });
        },
        "data-ocid": "billing.cancel"
      }
    )
  ] });
}
export {
  BillingPage as default
};
