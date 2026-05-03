import { Outlet, useLocation } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { BottomNav } from "./BottomNav";
import { CenterFAB } from "./CenterFAB";
import { PageTransition } from "./PageTransition";

export function MobileLayout() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("growthos-theme");
    if (stored) return stored === "dark";
    return true; // premium dark mode by default
  });

  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("growthos-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className="flex flex-col bg-background text-foreground"
      style={{ height: "100dvh", overflow: "hidden" }}
    >
      {/* Top Header — 48px sticky */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between bg-card border-b border-border px-4"
        style={{ height: "48px", flexShrink: 0 }}
      >
        {/* Logo + App Name */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 1L9 5.5H13.5L9.75 8.5L11.25 13L7 10L2.75 13L4.25 8.5L0.5 5.5H5L7 1Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="font-display font-700 text-base text-foreground tracking-tight">
            GrowthOS
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setDarkMode((d) => !d)}
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            data-ocid="header.theme_toggle"
          >
            {darkMode ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          {/* User avatar */}
          <div
            className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center cursor-pointer"
            aria-label="User profile"
            data-ocid="header.user_avatar"
          >
            <span className="text-xs font-semibold text-primary">A</span>
          </div>
        </div>
      </header>

      {/* Main scrollable content */}
      <main
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ paddingBottom: "calc(80px + env(safe-area-inset-bottom))" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <BottomNav />

      {/* Center FAB — overlaid above bottom nav */}
      <CenterFAB />
    </div>
  );
}
