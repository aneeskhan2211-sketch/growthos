import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NotificationPanel } from "./notifications/NotificationPanel";

// ─── Route labels for breadcrumbs ────────────────────────────────────────────

const ROUTE_LABELS: Record<string, string[]> = {
  "/": ["Dashboard"],
  "/leads": ["Lead Engine"],
  "/crm": ["CRM Pipeline"],
  "/proposals": ["Proposals"],
  "/seo": ["SEO Center"],
  "/ads": ["Campaigns"],
  "/clients": ["Clients"],
  "/website-builder": ["Website Builder"],
  "/growth-advisor": ["Growth Advisor"],
  "/settings": ["Settings"],
  "/command-center": ["Command Center"],
  "/deal-closer": ["Deal Closer"],
  "/growth-hub": ["Growth Hub"],
  "/outreach": ["Inbox"],
  "/import": ["Import Leads"],
  "/compliance": ["Compliance"],
  "/deliverability": ["Deliverability"],
  "/revenue-plan": ["Revenue Plan"],
  "/analytics": ["Analytics"],
  "/social-hub": ["Social Hub"],
  "/automation": ["Automation"],
  "/reports": ["Reports"],
  "/billing": ["Billing"],
};

// ─── Search suggestions ───────────────────────────────────────────────────────

const SEARCH_SUGGESTIONS = [
  { label: "Dashboard", path: "/" },
  { label: "Lead Engine", path: "/leads" },
  { label: "Campaigns", path: "/ads" },
  { label: "SEO Center", path: "/seo" },
  { label: "Analytics", path: "/analytics" },
  { label: "Social Hub", path: "/social-hub" },
  { label: "Proposals", path: "/proposals" },
  { label: "Inbox", path: "/outreach" },
  { label: "Clients", path: "/clients" },
  { label: "Automation", path: "/automation" },
  { label: "Reports", path: "/reports" },
  { label: "Billing", path: "/billing" },
  { label: "Settings", path: "/settings" },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
  onMenuOpen?: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Header({ darkMode, onToggleDark, onMenuOpen }: HeaderProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { clear, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const breadcrumbs = ROUTE_LABELS[currentPath] ?? ["Dashboard"];
  const principalStr = identity?.getPrincipal().toString() ?? "";
  const initials =
    principalStr.length > 0 ? principalStr.slice(0, 2).toUpperCase() : "AG";

  const filteredSuggestions = searchQuery.trim()
    ? SEARCH_SUGGESTIONS.filter((s) =>
        s.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : SEARCH_SUGGESTIONS.slice(0, 6);

  // Cmd+K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Close panels on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearchSelect = (path: string) => {
    navigate({ to: path });
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  return (
    <header className="flex items-center justify-between h-14 px-4 lg:px-6 bg-card border-b border-border shadow-subtle shrink-0 gap-4">
      {/* Left: hamburger (mobile) + breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-muted-foreground hover:text-foreground lg:hidden shrink-0"
          onClick={onMenuOpen}
          aria-label="Open sidebar menu"
          data-ocid="header.menu_toggle"
        >
          <Menu className="w-4 h-4" />
        </Button>

        <nav
          className="flex items-center gap-1 text-sm min-w-0"
          aria-label="Breadcrumb"
        >
          <span className="text-muted-foreground font-medium hidden sm:block shrink-0">
            GrowthOS
          </span>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-1 min-w-0">
              <ChevronRight className="w-3 h-3 text-muted-foreground/40 shrink-0 hidden sm:block" />
              <span
                className={
                  i === breadcrumbs.length - 1
                    ? "font-semibold text-foreground truncate"
                    : "text-muted-foreground truncate"
                }
              >
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Center: Command search */}
      <div
        ref={searchRef}
        className="relative hidden md:block w-64 lg:w-80 shrink-0"
      >
        <button
          type="button"
          className="flex items-center gap-2 h-8 w-full px-3 rounded-lg bg-muted/60 border border-border cursor-text transition-smooth hover:border-primary/40 hover:bg-muted/80"
          onClick={() => setSearchOpen(true)}
          aria-label="Open command search"
          data-ocid="header.search_trigger"
        >
          <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground flex-1 select-none">
            {searchOpen ? "" : "Search anything…"}
          </span>
          <kbd className="text-[10px] text-muted-foreground/60 font-mono bg-background px-1 py-0.5 rounded border border-border hidden lg:block">
            ⌘K
          </kbd>
        </button>

        {searchOpen && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl shadow-premium z-50 overflow-hidden">
            <div className="p-2 border-b border-border">
              <div className="flex items-center gap-2 px-2">
                <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <Input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages, features…"
                  className="border-0 p-0 h-7 text-sm bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  data-ocid="header.search_input"
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto py-1">
              {filteredSuggestions.map((s) => (
                <button
                  type="button"
                  key={s.path}
                  className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-foreground hover:bg-muted/60 transition-fast text-left"
                  onClick={() => handleSearchSelect(s.path)}
                  data-ocid={`header.search_result.${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Zap className="w-3 h-3 text-primary/60 shrink-0" />
                  {s.label}
                </button>
              ))}
              {filteredSuggestions.length === 0 && (
                <p className="px-4 py-3 text-sm text-muted-foreground">
                  No results found
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1">
        {/* Get Clients Now CTA */}
        <Button
          size="sm"
          className="btn-primary-glow h-8 px-3 text-xs font-semibold rounded-lg hidden lg:flex items-center gap-1.5"
          data-ocid="header.get_clients_cta"
          onClick={() => navigate({ to: "/command-center" })}
        >
          <Zap className="w-3.5 h-3.5" />
          Get Clients Now
        </Button>

        {/* Dark mode */}
        <Button
          variant="ghost"
          size="icon"
          data-ocid="header.theme_toggle"
          onClick={onToggleDark}
          className="w-8 h-8 text-muted-foreground hover:text-foreground"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <Button
            variant="ghost"
            size="icon"
            data-ocid="header.notifications_button"
            className="w-8 h-8 text-muted-foreground hover:text-foreground relative"
            aria-label="Notifications"
            onClick={() => setNotifOpen((o) => !o)}
          >
            <Bell className="w-4 h-4" />
            <span className="notification-dot absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
          </Button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-1 z-50">
              <NotificationPanel onClose={() => setNotifOpen(false)} />
            </div>
          )}
        </div>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-8 px-2 rounded-lg hover:bg-muted/80"
              data-ocid="header.user_menu"
            >
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden sm:block max-w-[100px] truncate">
                {principalStr ? `${principalStr.slice(0, 8)}…` : "Agency User"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-52"
            data-ocid="header.user_menu.dropdown"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-foreground">
                  Agency User
                </p>
                <p className="text-xs text-muted-foreground">
                  {principalStr ? `${principalStr.slice(0, 16)}…` : "—"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-ocid="header.user_menu.profile">
              <User className="w-3.5 h-3.5 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              data-ocid="header.user_menu.settings"
              onClick={() => navigate({ to: "/settings" })}
            >
              <Settings className="w-3.5 h-3.5 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-ocid="header.user_menu.logout"
              className="text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-3.5 h-3.5 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
