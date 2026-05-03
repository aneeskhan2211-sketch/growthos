// ─── Platform & UI icon system — clean inline SVG, 20–24px ───────────────────
import type React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

// ── Platform Icons ────────────────────────────────────────────────────────────

export function YouTubeIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>YouTube</title>
      <rect width="24" height="24" rx="5" fill="#FF0000" />
      <path
        d="M17.5 12a.8.8 0 0 0-.4-.7L10 7.4A.8.8 0 0 0 9 8.1v7.8a.8.8 0 0 0 1.1.7l7.1-3.9a.8.8 0 0 0 .3-.7Z"
        fill="#fff"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>Instagram</title>
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
      <rect
        x="6.5"
        y="6.5"
        width="11"
        height="11"
        rx="3.5"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="16.5" cy="7.5" r="1" fill="#fff" />
    </svg>
  );
}

export function FacebookIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>Facebook</title>
      <rect width="24" height="24" rx="5" fill="#1877F2" />
      <path
        d="M13.5 12.5h2l.4-2.5H13.5V8.5c0-.7.3-1.3 1.3-1.3H16V5.1A18 18 0 0 0 13.7 5C11.6 5 10.2 6.3 10.2 8.3V10H8v2.5h2.2V19h3.3v-6.5Z"
        fill="#fff"
      />
    </svg>
  );
}

export function LinkedInIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>LinkedIn</title>
      <rect width="24" height="24" rx="5" fill="#0A66C2" />
      <rect x="5" y="9" width="3" height="10" rx="0.5" fill="#fff" />
      <circle cx="6.5" cy="6.5" r="1.8" fill="#fff" />
      <path
        d="M11 9h2.8v1.4h.04A3.1 3.1 0 0 1 16.7 9c3 0 3.3 2 3.3 4.5V19h-3v-4.9c0-1.2 0-2.7-1.6-2.7-1.7 0-1.9 1.3-1.9 2.6V19H11V9Z"
        fill="#fff"
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>WhatsApp</title>
      <rect width="24" height="24" rx="5" fill="#25D366" />
      <path
        d="M12 4.5A7.5 7.5 0 0 0 5.5 14.7L4 20l5.5-1.4A7.5 7.5 0 1 0 12 4.5Zm0 13.5a6 6 0 0 1-3.1-.87l-.22-.13-2.3.6.62-2.24-.14-.23A6 6 0 1 1 12 18Zm3.3-4.3c-.18-.09-1.06-.52-1.22-.58s-.28-.09-.4.09-.46.58-.56.7-.2.13-.4.04a5 5 0 0 1-1.46-.9 5.4 5.4 0 0 1-1.02-1.26c-.1-.18 0-.28.08-.37l.27-.32c.09-.1.12-.18.18-.3s.03-.22-.02-.31-.4-.96-.55-1.31-.28-.3-.4-.3H9c-.12 0-.31.04-.47.22s-.62.6-.62 1.47.63 1.7.72 1.82c.09.12 1.25 1.9 3.02 2.66.42.18.75.29 1 .37.43.14.82.12 1.12.07.35-.05 1.06-.43 1.2-.85s.15-.77.1-.85c-.04-.08-.17-.12-.35-.2Z"
        fill="#fff"
      />
    </svg>
  );
}

export function GoogleAdsIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>Google Ads</title>
      <circle cx="12" cy="12" r="12" fill="#fff" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        <tspan fill="#4285F4">G</tspan>
      </text>
      <circle cx="6.5" cy="12" r="2.5" fill="#FBBC05" />
      <circle cx="17.5" cy="12" r="2.5" fill="#34A853" />
      <circle cx="12" cy="6.5" r="2.5" fill="#EA4335" />
    </svg>
  );
}

// ── New Integration Icons ─────────────────────────────────────────────────────

export function GoogleAnalyticsIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>Google Analytics</title>
      <defs>
        <linearGradient id="ga-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9AB00" />
          <stop offset="100%" stopColor="#E37400" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5" fill="#fff" />
      {/* Bar chart — Google Analytics style */}
      <rect
        x="4"
        y="14"
        width="4"
        height="6"
        rx="1"
        fill="#E37400"
        opacity="0.5"
      />
      <rect
        x="10"
        y="9"
        width="4"
        height="11"
        rx="1"
        fill="#F9AB00"
        opacity="0.8"
      />
      <rect x="16" y="4" width="4" height="16" rx="1" fill="url(#ga-grad)" />
    </svg>
  );
}

export function GoogleSearchConsoleIcon({
  size = 24,
  className = "",
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>Google Search Console</title>
      <rect width="24" height="24" rx="5" fill="#fff" />
      {/* Magnifier */}
      <circle
        cx="10.5"
        cy="10.5"
        r="5"
        stroke="#34A853"
        strokeWidth="2"
        fill="none"
      />
      <line
        x1="14.5"
        y1="14.5"
        x2="19"
        y2="19"
        stroke="#34A853"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Checkmark inside circle */}
      <path
        d="M8.5 10.5L10 12L13 9"
        stroke="#34A853"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SMTPEmailIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>Email / SMTP</title>
      <rect width="24" height="24" rx="5" fill="#F3F4F6" />
      {/* Envelope body */}
      <rect
        x="3"
        y="6"
        width="18"
        height="13"
        rx="2"
        stroke="#374151"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Envelope flap */}
      <path
        d="M3 8L12 14L21 8"
        stroke="#374151"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* @ symbol hint */}
      <circle
        cx="12"
        cy="12"
        r="2"
        stroke="#6B7280"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M14 10.5V12.5C14 13.3 14.7 14 15.5 14"
        stroke="#6B7280"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function MixpanelIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>Mixpanel Analytics</title>
      <rect width="24" height="24" rx="5" fill="#7C3AED" />
      {/* Stylised M */}
      <path
        d="M5 17V7L9.5 13.5L12 9L14.5 13.5L19 7V17"
        stroke="#fff"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function FunnelTrackingIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>Funnel Tracking</title>
      <rect width="24" height="24" rx="5" fill="#0E7490" />
      {/* Funnel layers */}
      <rect
        x="3"
        y="5"
        width="18"
        height="3"
        rx="1.5"
        fill="#fff"
        opacity="0.9"
      />
      <rect
        x="6"
        y="10"
        width="12"
        height="3"
        rx="1.5"
        fill="#fff"
        opacity="0.75"
      />
      <rect
        x="9"
        y="15"
        width="6"
        height="3"
        rx="1.5"
        fill="#fff"
        opacity="0.6"
      />
    </svg>
  );
}

export function RazorpayIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>Razorpay</title>
      <rect width="24" height="24" rx="5" fill="#072654" />
      {/* Lightning bolt / R */}
      <path
        d="M13 4L7 13H12L11 20L17 11H12L13 4Z"
        fill="#3395FF"
        stroke="#3395FF"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldCheckIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
    >
      <title>Shield Check — Trusted &amp; Secure</title>
      {/* Shield shape */}
      <path
        d="M12 2L4 5.5V11C4 15.4 7.4 19.5 12 21C16.6 19.5 20 15.4 20 11V5.5L12 2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* Checkmark */}
      <path
        d="M8.5 11.5L10.5 13.5L15.5 9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── UI / Utility Icons ────────────────────────────────────────────────────────

export function ChevronUpIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      role="img"
    >
      <title>Chevron up</title>
      <path
        d="M5 12.5L10 7.5L15 12.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      role="img"
    >
      <title>Chevron down</title>
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrendUpIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      role="img"
    >
      <title>Trending up</title>
      <path
        d="M3 13L7.5 8.5L10.5 11.5L17 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 5H17V9"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrendDownIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      role="img"
    >
      <title>Trending down</title>
      <path
        d="M3 7L7.5 11.5L10.5 8.5L17 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 15H17V11"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      role="img"
    >
      <title>Spark</title>
      <path
        d="M10 2L11.8 7.8H18L12.9 11.4L14.7 17.2L10 13.6L5.3 17.2L7.1 11.4L2 7.8H8.2L10 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

export function BellIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      role="img"
    >
      <title>Bell</title>
      <path
        d="M10 2C10 2 6 4 6 9V13L4.5 14.5V15.5H15.5V14.5L14 13V9C14 4 10 2 10 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8.5 15.5A1.5 1.5 0 0 0 11.5 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ZapIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      role="img"
    >
      <title>Zap</title>
      <path
        d="M11 2L4 11H10L9 18L16 9H10L11 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

export function UsersIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      role="img"
    >
      <title>Users</title>
      <circle
        cx="8"
        cy="7"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M2 17C2 14.2 4.7 12 8 12C11.3 12 14 14.2 14 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 11C15.1 11 16 10.1 16 9C16 7.9 15.1 7 14 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M16 15C17.1 15.4 18 16.3 18 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function TargetIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      role="img"
    >
      <title>Target</title>
      <circle
        cx="10"
        cy="10"
        r="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="10"
        cy="10"
        r="4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function CheckCircleIcon({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      role="img"
    >
      <title>Check circle</title>
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M6.5 10L8.5 12L13.5 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Platform color map & union type ──────────────────────────────────────────

export const PLATFORM_COLORS: Record<string, string> = {
  YouTube: "#FF0000",
  Instagram: "#E1306C",
  Facebook: "#1877F2",
  LinkedIn: "#0A66C2",
  WhatsApp: "#25D366",
  "Google Ads": "#4285F4",
  "Google Analytics": "#E37400",
  "Google Search Console": "#34A853",
  "Email / SMTP": "#374151",
  Mixpanel: "#7C3AED",
  "Funnel Tracking": "#0E7490",
  Razorpay: "#3395FF",
};

export type PlatformName =
  | "YouTube"
  | "Instagram"
  | "Facebook"
  | "LinkedIn"
  | "WhatsApp"
  | "Google Ads";

export function PlatformIcon({
  name,
  size = 20,
  className,
}: {
  name: PlatformName;
  size?: number;
  className?: string;
}) {
  const props = { size, className };
  switch (name) {
    case "YouTube":
      return <YouTubeIcon {...props} />;
    case "Instagram":
      return <InstagramIcon {...props} />;
    case "Facebook":
      return <FacebookIcon {...props} />;
    case "LinkedIn":
      return <LinkedInIcon {...props} />;
    case "WhatsApp":
      return <WhatsAppIcon {...props} />;
    case "Google Ads":
      return <GoogleAdsIcon {...props} />;
  }
}

// ── Trust Integration Registry ────────────────────────────────────────────────

export interface TrustIntegration {
  id: string;
  name: string;
  icon: (props: IconProps) => React.ReactElement;
  category:
    | "Analytics"
    | "Advertising"
    | "Messaging"
    | "Email"
    | "Tracking"
    | "Payments";
  description: string;
}

export const TRUST_INTEGRATIONS: TrustIntegration[] = [
  {
    id: "google-analytics",
    name: "Google Analytics",
    icon: GoogleAnalyticsIcon,
    category: "Analytics",
    description:
      "Track website traffic, user behaviour, and campaign performance in real time.",
  },
  {
    id: "google-search-console",
    name: "Google Search Console",
    icon: GoogleSearchConsoleIcon,
    category: "Analytics",
    description:
      "Monitor search visibility, keyword rankings, and organic click-through rates.",
  },
  {
    id: "google-ads",
    name: "Google Ads",
    icon: GoogleAdsIcon,
    category: "Advertising",
    description:
      "Run search and display campaigns to capture high-intent local customers.",
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    icon: FacebookIcon,
    category: "Advertising",
    description:
      "Reach targeted audiences on Facebook and Instagram with precise ad campaigns.",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: InstagramIcon,
    category: "Advertising",
    description:
      "Amplify organic and paid reach with Instagram Reels and Story ads.",
  },
  {
    id: "whatsapp-business",
    name: "WhatsApp Business API",
    icon: WhatsAppIcon,
    category: "Messaging",
    description:
      "Send consent-based, template-approved messages at scale via official API.",
  },
  {
    id: "smtp-email",
    name: "Gmail / Outlook / SMTP",
    icon: SMTPEmailIcon,
    category: "Email",
    description:
      "Deliver transactional and follow-up emails through your preferred mail provider.",
  },
  {
    id: "mixpanel",
    name: "Mixpanel Analytics",
    icon: MixpanelIcon,
    category: "Tracking",
    description:
      "Deep-dive into product analytics, retention cohorts, and conversion funnels.",
  },
  {
    id: "funnel-tracking",
    name: "Funnel Tracking System",
    icon: FunnelTrackingIcon,
    category: "Tracking",
    description:
      "Visualise every step from lead arrival to deal closed with drop-off insights.",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    icon: RazorpayIcon,
    category: "Payments",
    description:
      "Accept secure subscription payments and one-time transactions across India.",
  },
];
