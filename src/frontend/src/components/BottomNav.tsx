import { Link, useLocation } from "@tanstack/react-router";
import {
  selectUnreadMessageCount,
  useGrowthStore,
} from "../store/useGrowthStore";

// ─── SVG Icons ─────────────────────────────────────────────────────────────

function HomeIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {filled ? (
        <>
          <path
            d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
            fill="currentColor"
          />
          <path d="M9 21V15H15V21" fill="currentColor" />
        </>
      ) : (
        <>
          <path
            d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

function LeadsIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        fill={filled ? "currentColor" : "none"}
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray={filled ? "none" : "3 2"}
        fill="none"
        opacity="0.5"
      />
      {!filled && (
        <path
          d="M6.5 19.5C7.5 17 9.5 15.5 12 15.5C14.5 15.5 16.5 17 17.5 19.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      {filled && (
        <path
          d="M6.5 19.5C7.5 17 9.5 15.5 12 15.5C14.5 15.5 16.5 17 17.5 19.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function InboxIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {filled ? (
        <path
          d="M4 4H20C20.55 4 21 4.45 21 5V15C21 15.55 20.55 16 20 16H13L9 20V16H4C3.45 16 3 15.55 3 15V5C3 4.45 3.45 4 4 4Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M4 4H20C20.55 4 21 4.45 21 5V15C21 15.55 20.55 16 20 16H13L9 20V16H4C3.45 16 3 15.55 3 15V5C3 4.45 3.45 4 4 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <path
        d="M8 9H16M8 12H13"
        stroke={filled ? "white" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClientsIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {filled ? (
        <path
          d="M3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7V17C21 17.55 20.55 18 20 18H4C3.45 18 3 17.55 3 17V7Z"
          fill="currentColor"
        />
      ) : (
        <path
          d="M3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7V17C21 17.55 20.55 18 20 18H4C3.45 18 3 17.55 3 17V7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <path
        d="M8 6V4.5C8 4.22 8.22 4 8.5 4H15.5C15.78 4 16 4.22 16 4.5V6"
        stroke={filled ? "white" : "currentColor"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 11H21"
        stroke={filled ? "white" : "currentColor"}
        strokeWidth="2"
      />
    </svg>
  );
}

// ─── Tab Item ───────────────────────────────────────────────────────────────

interface TabItem {
  path: string;
  label: string;
  icon: (filled: boolean) => React.ReactElement;
  ocid: string;
}

const TABS: TabItem[] = [
  {
    path: "/",
    label: "Home",
    icon: (f) => <HomeIcon filled={f} />,
    ocid: "bottom_nav.home_tab",
  },
  {
    path: "/leads",
    label: "Leads",
    icon: (f) => <LeadsIcon filled={f} />,
    ocid: "bottom_nav.leads_tab",
  },
  // Center FAB placeholder — rendered by CenterFAB component
  {
    path: "/inbox",
    label: "Inbox",
    icon: (f) => <InboxIcon filled={f} />,
    ocid: "bottom_nav.inbox_tab",
  },
  {
    path: "/clients",
    label: "Clients",
    icon: (f) => <ClientsIcon filled={f} />,
    ocid: "bottom_nav.clients_tab",
  },
];

// ─── BottomNav ──────────────────────────────────────────────────────────────

export function BottomNav() {
  const location = useLocation();
  const unreadCount = useGrowthStore(selectUnreadMessageCount);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        height: "calc(60px + env(safe-area-inset-bottom))",
      }}
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-[60px] px-2">
        {/* First 2 tabs */}
        {TABS.slice(0, 2).map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 min-h-[44px]"
              data-ocid={tab.ocid}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={isActive ? "text-primary" : "text-muted-foreground"}
              >
                {tab.icon(isActive)}
              </span>
              <span
                className={[
                  "text-[11px] leading-none",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground font-normal",
                ].join(" ")}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}

        {/* Center FAB spacer — the actual FAB is in CenterFAB component */}
        <div
          className="flex flex-col items-center justify-end flex-1 pb-1"
          aria-hidden="true"
        >
          <span className="text-[10px] text-muted-foreground/60 leading-none mt-1 whitespace-nowrap">
            Get Clients Now
          </span>
        </div>

        {/* Last 2 tabs */}
        {TABS.slice(2).map((tab) => {
          const isActive = location.pathname === tab.path;
          const showBadge = tab.path === "/inbox" && unreadCount > 0;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 min-h-[44px] relative"
              data-ocid={tab.ocid}
              aria-label={`${tab.label}${showBadge ? `, ${unreadCount} unread` : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={`relative ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {tab.icon(isActive)}
                {showBadge && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-destructive"
                    aria-hidden="true"
                  />
                )}
              </span>
              <span
                className={[
                  "text-[11px] leading-none",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground font-normal",
                ].join(" ")}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
