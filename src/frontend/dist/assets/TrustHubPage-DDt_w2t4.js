import { bJ as resolveElements, r as reactExports, j as jsxRuntimeExports, aG as useMetaTags, by as useGrowthStore, bK as selectTrustHubMetrics, bL as selectMarketTrustData, bM as selectTestimonials, bN as selectSocialProofFeed, y as motion, ad as Link, aN as PAGE_META } from "./index-DcPx_5wo.js";
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
function InstagramIcon({ size = 24, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Instagram" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ig-grad", x1: "0%", y1: "100%", x2: "100%", y2: "0%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#f09433" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "25%", stopColor: "#e6683c" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#dc2743" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "75%", stopColor: "#cc2366" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#bc1888" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", rx: "6", fill: "url(#ig-grad)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "6.5",
            y: "6.5",
            width: "11",
            height: "11",
            rx: "3.5",
            stroke: "#fff",
            strokeWidth: "1.5",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "3",
            stroke: "#fff",
            strokeWidth: "1.5",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "16.5", cy: "7.5", r: "1", fill: "#fff" })
      ]
    }
  );
}
function FacebookIcon({ size = 24, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Facebook" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", rx: "5", fill: "#1877F2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M13.5 12.5h2l.4-2.5H13.5V8.5c0-.7.3-1.3 1.3-1.3H16V5.1A18 18 0 0 0 13.7 5C11.6 5 10.2 6.3 10.2 8.3V10H8v2.5h2.2V19h3.3v-6.5Z",
            fill: "#fff"
          }
        )
      ]
    }
  );
}
function WhatsAppIcon({ size = 24, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "WhatsApp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", rx: "5", fill: "#25D366" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M12 4.5A7.5 7.5 0 0 0 5.5 14.7L4 20l5.5-1.4A7.5 7.5 0 1 0 12 4.5Zm0 13.5a6 6 0 0 1-3.1-.87l-.22-.13-2.3.6.62-2.24-.14-.23A6 6 0 1 1 12 18Zm3.3-4.3c-.18-.09-1.06-.52-1.22-.58s-.28-.09-.4.09-.46.58-.56.7-.2.13-.4.04a5 5 0 0 1-1.46-.9 5.4 5.4 0 0 1-1.02-1.26c-.1-.18 0-.28.08-.37l.27-.32c.09-.1.12-.18.18-.3s.03-.22-.02-.31-.4-.96-.55-1.31-.28-.3-.4-.3H9c-.12 0-.31.04-.47.22s-.62.6-.62 1.47.63 1.7.72 1.82c.09.12 1.25 1.9 3.02 2.66.42.18.75.29 1 .37.43.14.82.12 1.12.07.35-.05 1.06-.43 1.2-.85s.15-.77.1-.85c-.04-.08-.17-.12-.35-.2Z",
            fill: "#fff"
          }
        )
      ]
    }
  );
}
function GoogleAdsIcon({ size = 24, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Google Ads" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "12", fill: "#fff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "12",
            y: "16",
            textAnchor: "middle",
            fontSize: "13",
            fontWeight: "700",
            fontFamily: "sans-serif",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("tspan", { fill: "#4285F4", children: "G" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "6.5", cy: "12", r: "2.5", fill: "#FBBC05" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "17.5", cy: "12", r: "2.5", fill: "#34A853" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "6.5", r: "2.5", fill: "#EA4335" })
      ]
    }
  );
}
function GoogleAnalyticsIcon({ size = 24, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Google Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ga-grad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#F9AB00" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#E37400" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", rx: "5", fill: "#fff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "4",
            y: "14",
            width: "4",
            height: "6",
            rx: "1",
            fill: "#E37400",
            opacity: "0.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "10",
            y: "9",
            width: "4",
            height: "11",
            rx: "1",
            fill: "#F9AB00",
            opacity: "0.8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "16", y: "4", width: "4", height: "16", rx: "1", fill: "url(#ga-grad)" })
      ]
    }
  );
}
function GoogleSearchConsoleIcon({
  size = 24,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Google Search Console" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", rx: "5", fill: "#fff" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "10.5",
            cy: "10.5",
            r: "5",
            stroke: "#34A853",
            strokeWidth: "2",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "14.5",
            y1: "14.5",
            x2: "19",
            y2: "19",
            stroke: "#34A853",
            strokeWidth: "2",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M8.5 10.5L10 12L13 9",
            stroke: "#34A853",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
function SMTPEmailIcon({ size = 24, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Email / SMTP" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", rx: "5", fill: "#F3F4F6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "3",
            y: "6",
            width: "18",
            height: "13",
            rx: "2",
            stroke: "#374151",
            strokeWidth: "1.5",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M3 8L12 14L21 8",
            stroke: "#374151",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "2",
            stroke: "#6B7280",
            strokeWidth: "1",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M14 10.5V12.5C14 13.3 14.7 14 15.5 14",
            stroke: "#6B7280",
            strokeWidth: "1",
            strokeLinecap: "round",
            fill: "none"
          }
        )
      ]
    }
  );
}
function MixpanelIcon({ size = 24, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Mixpanel Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", rx: "5", fill: "#7C3AED" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M5 17V7L9.5 13.5L12 9L14.5 13.5L19 7V17",
            stroke: "#fff",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none"
          }
        )
      ]
    }
  );
}
function FunnelTrackingIcon({ size = 24, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Funnel Tracking" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", rx: "5", fill: "#0E7490" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "3",
            y: "5",
            width: "18",
            height: "3",
            rx: "1.5",
            fill: "#fff",
            opacity: "0.9"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "6",
            y: "10",
            width: "12",
            height: "3",
            rx: "1.5",
            fill: "#fff",
            opacity: "0.75"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "9",
            y: "15",
            width: "6",
            height: "3",
            rx: "1.5",
            fill: "#fff",
            opacity: "0.6"
          }
        )
      ]
    }
  );
}
function RazorpayIcon({ size = 24, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Razorpay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "24", height: "24", rx: "5", fill: "#072654" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M13 4L7 13H12L11 20L17 11H12L13 4Z",
            fill: "#3395FF",
            stroke: "#3395FF",
            strokeWidth: "0.5",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
function ShieldCheckIcon({ size = 24, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Shield Check — Trusted & Secure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M12 2L4 5.5V11C4 15.4 7.4 19.5 12 21C16.6 19.5 20 15.4 20 11V5.5L12 2Z",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinejoin: "round",
            fill: "currentColor",
            fillOpacity: "0.08"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M8.5 11.5L10.5 13.5L15.5 9",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
function SparkIcon({ size = 20, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 20 20",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Spark" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M10 2L11.8 7.8H18L12.9 11.4L14.7 17.2L10 13.6L5.3 17.2L7.1 11.4L2 7.8H8.2L10 2Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinejoin: "round",
            fill: "currentColor",
            fillOpacity: "0.15"
          }
        )
      ]
    }
  );
}
function ZapIcon({ size = 20, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 20 20",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Zap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M11 2L4 11H10L9 18L16 9H10L11 2Z",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinejoin: "round",
            fill: "currentColor",
            fillOpacity: "0.15"
          }
        )
      ]
    }
  );
}
function UsersIcon({ size = 20, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 20 20",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "8",
            cy: "7",
            r: "3",
            stroke: "currentColor",
            strokeWidth: "1.5",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M2 17C2 14.2 4.7 12 8 12C11.3 12 14 14.2 14 17",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M14 11C15.1 11 16 10.1 16 9C16 7.9 15.1 7 14 7",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M16 15C17.1 15.4 18 16.3 18 17",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            fill: "none"
          }
        )
      ]
    }
  );
}
function CheckCircleIcon({ size = 20, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 20 20",
      fill: "none",
      className,
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Check circle" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "10",
            cy: "10",
            r: "8",
            stroke: "currentColor",
            strokeWidth: "1.5",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M6.5 10L8.5 12L13.5 7.5",
            stroke: "currentColor",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
const TRUST_INTEGRATIONS = [
  {
    id: "google-analytics",
    name: "Google Analytics",
    icon: GoogleAnalyticsIcon,
    category: "Analytics",
    description: "Track website traffic, user behaviour, and campaign performance in real time."
  },
  {
    id: "google-search-console",
    name: "Google Search Console",
    icon: GoogleSearchConsoleIcon,
    category: "Analytics",
    description: "Monitor search visibility, keyword rankings, and organic click-through rates."
  },
  {
    id: "google-ads",
    name: "Google Ads",
    icon: GoogleAdsIcon,
    category: "Advertising",
    description: "Run search and display campaigns to capture high-intent local customers."
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    icon: FacebookIcon,
    category: "Advertising",
    description: "Reach targeted audiences on Facebook and Instagram with precise ad campaigns."
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: InstagramIcon,
    category: "Advertising",
    description: "Amplify organic and paid reach with Instagram Reels and Story ads."
  },
  {
    id: "whatsapp-business",
    name: "WhatsApp Business API",
    icon: WhatsAppIcon,
    category: "Messaging",
    description: "Send consent-based, template-approved messages at scale via official API."
  },
  {
    id: "smtp-email",
    name: "Gmail / Outlook / SMTP",
    icon: SMTPEmailIcon,
    category: "Email",
    description: "Deliver transactional and follow-up emails through your preferred mail provider."
  },
  {
    id: "mixpanel",
    name: "Mixpanel Analytics",
    icon: MixpanelIcon,
    category: "Tracking",
    description: "Deep-dive into product analytics, retention cohorts, and conversion funnels."
  },
  {
    id: "funnel-tracking",
    name: "Funnel Tracking System",
    icon: FunnelTrackingIcon,
    category: "Tracking",
    description: "Visualise every step from lead arrival to deal closed with drop-off insights."
  },
  {
    id: "razorpay",
    name: "Razorpay",
    icon: RazorpayIcon,
    category: "Payments",
    description: "Accept secure subscription payments and one-time transactions across India."
  }
];
function useAnimatedCounter(target, duration = 2e3, inView2 = false) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!inView2) return;
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, inView2]);
  return count;
}
const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" }
  })
};
const CATEGORY_COLORS = {
  Analytics: "bg-[oklch(0.52_0.24_257/0.12)] text-[oklch(0.52_0.24_257)]",
  Advertising: "bg-[oklch(0.55_0.22_25/0.12)] text-[oklch(0.55_0.22_25)]",
  Messaging: "bg-[oklch(0.56_0.15_170/0.12)] text-[oklch(0.56_0.15_170)]",
  Email: "bg-[oklch(0.68_0.18_86/0.12)] text-[oklch(0.68_0.18_86)]",
  Tracking: "bg-[oklch(0.65_0.15_40/0.12)] text-[oklch(0.65_0.15_40)]",
  Payments: "bg-[oklch(0.58_0.28_253/0.12)] text-[oklch(0.58_0.28_253)]"
};
function StarRating({ count }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", "aria-label": `${count} out of 5 stars`, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      width: "14",
      height: "14",
      viewBox: "0 0 14 14",
      fill: i < count ? "oklch(0.68 0.18 86)" : "none",
      stroke: "oklch(0.68 0.18 86)",
      strokeWidth: "1.2",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 1.5L8.5 5H12L9 7.5L10 11L7 9L4 11L5 7.5L2 5H5.5L7 1.5Z" })
    },
    `star-${i}`
  )) });
}
function MarketStatCard({
  stat,
  description,
  icon,
  index
}) {
  const ref = reactExports.useRef(null);
  const inView2 = useInView(ref, { once: true, margin: "-60px" });
  const numericTarget = Number.parseInt(stat.value, 10);
  const count = useAnimatedCounter(numericTarget, 2e3, inView2);
  const iconEl = icon === "analytics" ? /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleAnalyticsIcon, { size: 32 }) : icon === "social" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      role: "img",
      "aria-label": "Social media",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "32", height: "32", rx: "7", fill: "oklch(0.65 0.2 328 / 0.15)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M22 10C22 10 18 12 18 16V20L16 22V23H26V22L24 20V16C24 12 20 10 20 10H22Z",
            stroke: "oklch(0.65 0.2 328)",
            strokeWidth: "1.5",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "10", r: "2.5", fill: "oklch(0.65 0.2 328)" })
      ]
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "32",
      height: "32",
      viewBox: "0 0 32 32",
      fill: "none",
      role: "img",
      "aria-label": "Growth chart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            width: "32",
            height: "32",
            rx: "7",
            fill: "oklch(0.56 0.15 170 / 0.15)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M6 22L12 15L16 18L22 10L26 14",
            stroke: "oklch(0.56 0.15 170)",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M22 10H26V14",
            stroke: "oklch(0.56 0.15 170)",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none"
          }
        )
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref,
      custom: index,
      variants: FADE_UP,
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      className: "market-data-card bg-card border border-border/40 rounded-xl p-6 flex flex-col gap-3 shadow-card hover:shadow-elevated transition-smooth",
      "data-ocid": `trust_hub.market_stat.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          iconEl,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs italic text-muted-foreground text-right leading-tight max-w-[120px]", children: stat.description.includes("industry") ? "Industry data" : "Platform data" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-display font-extrabold text-primary counter-number", children: count }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-bold text-primary/80", children: stat.unit })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium leading-snug", children: description })
      ]
    }
  );
}
function IntegrationCard({
  integration,
  index
}) {
  const IconComponent = integration.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      custom: index,
      variants: FADE_UP,
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      className: "integration-card bg-card border border-border/40 rounded-xl p-5 flex items-start gap-4 shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-smooth cursor-default",
      "data-ocid": `trust_hub.integration.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { size: 40 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground font-display leading-tight", children: integration.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wide ${CATEGORY_COLORS[integration.category] ?? "bg-muted text-muted-foreground"}`,
                children: integration.category
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed text-truncate-2", children: integration.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[oklch(0.56_0.15_170/0.12)] text-[oklch(0.56_0.15_170)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[oklch(0.56_0.15_170)]" }),
          "Supported"
        ] }) })
      ]
    }
  );
}
function TrustBadge({
  icon,
  title,
  description,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      custom: index,
      variants: FADE_UP,
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      className: "trust-badge bg-card border border-border/40 rounded-xl p-5 flex flex-col items-center text-center gap-3 shadow-card hover:shadow-elevated transition-smooth",
      "data-ocid": `trust_hub.trust_badge.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground font-display leading-tight", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: description })
        ] })
      ]
    }
  );
}
function TrustHubPage() {
  var _a;
  useMetaTags(PAGE_META["/trust-hub"]);
  const trustHubMetrics = useGrowthStore(selectTrustHubMetrics);
  const marketTrustData = useGrowthStore(selectMarketTrustData);
  const testimonials = useGrowthStore(selectTestimonials);
  const socialProofFeed = useGrowthStore(selectSocialProofFeed);
  const [proofIndex, setProofIndex] = reactExports.useState(0);
  const [proofVisible, setProofVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setProofVisible(false);
      setTimeout(() => {
        setProofIndex((i) => (i + 1) % socialProofFeed.length);
        setProofVisible(true);
      }, 400);
    }, 6e3);
    return () => clearInterval(interval);
  }, [socialProofFeed.length]);
  const currentProof = socialProofFeed[proofIndex];
  const categories = [
    "Analytics",
    "Advertising",
    "Messaging",
    "Email",
    "Tracking",
    "Payments"
  ];
  const scrollToIntegrations = () => {
    var _a2;
    (_a2 = document.getElementById("integrations")) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "trust_hub.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative overflow-hidden bg-card border-b border-border/30",
        "data-ocid": "trust_hub.hero.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-hero pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-4xl mx-auto px-6 py-14 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheckIcon, { size: 14, className: "text-primary" }),
                    "Trust & Credibility"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-4xl font-display font-extrabold text-foreground leading-tight mb-4", children: [
                    "GrowthOS — Trusted by Agencies &",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Business Owners" }),
                    " Across India"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed", children: "A complete digital marketing system built on industry-standard tools, transparent data, and real results." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/salon-marketing-mumbai",
                        className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl btn-primary-glow text-sm font-semibold font-display",
                        "data-ocid": "trust_hub.hero.primary_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(SparkIcon, { size: 16 }),
                          "Get Your Free Growth Audit"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: scrollToIntegrations,
                        className: "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border/50 text-sm font-semibold text-foreground hover:bg-muted/30 transition-smooth",
                        "data-ocid": "trust_hub.hero.secondary_button",
                        children: "See How It Works"
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.4, duration: 0.5 },
                className: "flex flex-wrap items-center justify-center gap-4 mt-10",
                children: [
                  { icon: "🔒", label: "Data Privacy Compliant" },
                  { icon: "✅", label: "No Fake Claims" },
                  { icon: "🤝", label: "Industry-Standard Tools" },
                  { icon: "📊", label: "Transparent Data" }
                ].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border border-border/30",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: badge.icon }),
                      badge.label
                    ]
                  },
                  badge.label
                ))
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "integrations",
        className: "py-14 bg-background",
        "data-ocid": "trust_hub.integrations.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Integrates with Industry-Leading Platforms" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed", children: "GrowthOS connects with the tools professionals already use — not replacements, but powerful amplifiers." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic text-muted-foreground mt-2", children: "Not an official partner of any platform. Integrates with industry-leading platforms." })
              ]
            }
          ),
          categories.map((category) => {
            const items = TRUST_INTEGRATIONS.filter(
              (t) => t.category === category
            );
            if (!items.length) return null;
            const startIndex = TRUST_INTEGRATIONS.indexOf(items[0]);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${CATEGORY_COLORS[category] ?? "bg-muted text-muted-foreground"}`,
                    children: category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/30" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: items.map((integration, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                IntegrationCard,
                {
                  integration,
                  index: startIndex + i
                },
                integration.id
              )) })
            ] }, category);
          })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-muted/20 border-y border-border/20",
        "data-ocid": "trust_hub.market_data.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Why Digital Marketing Works" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Global benchmarks that prove the channel works — before you invest a rupee." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "platform-metrics-grid grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6", children: marketTrustData.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MarketStatCard,
            {
              stat,
              description: stat.description,
              icon: stat.icon,
              index: i
            },
            stat.id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs italic text-muted-foreground mt-2", children: "Data based on publicly available industry reports" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-background",
        "data-ocid": "trust_hub.success_metrics.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "What GrowthOS Users Are Achieving" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Aggregated across active GrowthOS users." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
            {
              label: "Total Leads Generated",
              value: trustHubMetrics.totalLeads.toLocaleString("en-IN"),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersIcon, { size: 22, className: "text-primary" }),
              suffix: "",
              ocid: "trust_hub.metric.leads"
            },
            {
              label: "Messages Sent",
              value: trustHubMetrics.messagesSent.toLocaleString("en-IN"),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ZapIcon, { size: 22, className: "text-[oklch(0.68_0.18_86)]" }),
              suffix: "",
              ocid: "trust_hub.metric.messages"
            },
            {
              label: "Clients Closed",
              value: trustHubMetrics.clientsClosed.toLocaleString("en-IN"),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
                CheckCircleIcon,
                {
                  size: 22,
                  className: "text-[oklch(0.56_0.15_170)]"
                }
              ),
              suffix: "",
              ocid: "trust_hub.metric.clients"
            },
            {
              label: "Revenue Generated",
              value: trustHubMetrics.revenueGenerated,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SparkIcon,
                {
                  size: 22,
                  className: "text-[oklch(0.58_0.28_253)]"
                }
              ),
              suffix: " est.",
              ocid: "trust_hub.metric.revenue"
            }
          ].map((metric, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              custom: i,
              variants: FADE_UP,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              className: "metric-card bg-card border border-border/40 rounded-xl p-5 flex flex-col gap-2 shadow-card",
              "data-ocid": metric.ocid,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-muted/30 flex items-center justify-center", children: metric.icon }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl font-display font-extrabold text-foreground leading-none counter-number", children: [
                    metric.value,
                    metric.suffix
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-tight", children: metric.label })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] italic text-muted-foreground/70 leading-tight", children: "Estimated based on usage patterns" })
              ]
            },
            metric.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs italic text-muted-foreground mt-5", children: "Based on usage patterns and industry benchmarks" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-muted/20 border-y border-border/20",
        "data-ocid": "trust_hub.social_proof.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-center mb-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "What's Happening Right Now" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Activity across the GrowthOS community." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "social-proof-ticker",
              "data-ocid": "trust_hub.social_proof.card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticker-header", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ticker-label", children: "Live Activity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ticker-pulse-badge", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ticker-pulse" }),
                    "Live"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "ticker-entry",
                    style: {
                      opacity: proofVisible ? 1 : 0,
                      transition: "opacity 0.4s ease"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ticker-avatar", children: ((_a = currentProof == null ? void 0 : currentProof.userName) == null ? void 0 : _a[0]) ?? "U" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticker-content", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "ticker-text", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ticker-metric", children: currentProof == null ? void 0 : currentProof.userName }),
                          " ",
                          "(",
                          currentProof == null ? void 0 : currentProof.city,
                          ") ",
                          currentProof == null ? void 0 : currentProof.action,
                          (currentProof == null ? void 0 : currentProof.metricValue) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ticker-metric", children: [
                            " ",
                            currentProof.metricValue
                          ] }) : null
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "ticker-subtext", children: "Just now • Based on real usage patterns" })
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 mt-4 justify-center", children: socialProofFeed.slice(0, 5).map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setProofIndex(i);
                      setProofVisible(true);
                    },
                    className: `w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === proofIndex % 5 ? "bg-primary w-4" : "bg-border"}`,
                    "aria-label": `Social proof entry ${i + 1}`,
                    "data-ocid": `trust_hub.social_proof.dot.${i + 1}`
                  },
                  entry.id
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs italic text-muted-foreground mt-3", children: "Based on real usage patterns" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-background",
        "data-ocid": "trust_hub.testimonials.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-center mb-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Real Results from Real Businesses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Based on estimated user outcomes." })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: testimonials.slice(0, 6).map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              custom: i,
              variants: FADE_UP,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              className: "testimonial-card bg-card border border-border/40 rounded-xl p-5 flex flex-col gap-3 shadow-card hover:shadow-elevated transition-smooth",
              "data-ocid": `trust_hub.testimonial.item.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0",
                      style: { backgroundColor: t.avatarColor },
                      children: t.avatarInitials
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display leading-tight truncate", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                      t.businessType,
                      " · ",
                      t.city
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { count: t.stars }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed text-truncate-3 flex-1", children: [
                  '"',
                  t.quote,
                  '"'
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto pt-3 border-t border-border/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-[oklch(0.56_0.15_170/0.12)] text-[oklch(0.56_0.15_170)]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircleIcon, { size: 12 }),
                    t.result
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] italic text-muted-foreground/60 mt-1.5", children: "Estimated based on usage patterns" })
                ] })
              ]
            },
            t.id
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-muted/20 border-y border-border/20",
        "data-ocid": "trust_hub.trust_badges.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "text-center mb-10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-2", children: "Built for Trust" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TrustBadge,
              {
                index: 0,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheckIcon, { size: 28 }),
                title: "Data Privacy Compliant",
                description: "Consent-based lead collection, GDPR-aligned data practices"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TrustBadge,
              {
                index: 1,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RazorpayIcon, { size: 28 }),
                title: "Secure Payments",
                description: "Powered by Razorpay (coming soon) — India's trusted payment gateway"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TrustBadge,
              {
                index: 2,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheckIcon, { size: 28 }),
                title: "No Fake Claims",
                description: "All data is transparently labeled and sourced from verifiable benchmarks"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TrustBadge,
              {
                index: 3,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircleIcon, { size: 28 }),
                title: "Industry-Standard Tools",
                description: "Integrates with platforms professionals trust every day"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-16 bg-card border-t border-border/30",
        "data-ocid": "trust_hub.cta.section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SparkIcon, { size: 32, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-display font-extrabold text-foreground mb-3", children: "Ready to Grow Your Business?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-muted-foreground mb-2 leading-relaxed", children: "Join 1000+ agencies and business owners using GrowthOS to generate leads and close clients." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs italic text-muted-foreground mb-8", children: "Estimated active users based on platform engagement data" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/salon-marketing-mumbai",
                    className: "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl btn-primary-glow text-sm font-semibold font-display",
                    "data-ocid": "trust_hub.cta.primary_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SparkIcon, { size: 16 }),
                      "Start Free — Get Your First 20 Leads"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/command-center",
                    className: "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-card border border-border/50 text-sm font-semibold text-foreground hover:bg-muted/30 transition-smooth",
                    "data-ocid": "trust_hub.cta.secondary_button",
                    children: "Open Command Center"
                  }
                )
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  TrustHubPage as default
};
