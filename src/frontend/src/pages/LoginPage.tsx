import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { ArrowRight, FileText, TrendingUp, Users, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Lead Generation Engine",
    desc: "Score and discover high-value local business leads automatically.",
  },
  {
    icon: Users,
    title: "CRM Pipeline",
    desc: "Track every deal from first contact to closed — visually.",
  },
  {
    icon: FileText,
    title: "AI Proposals",
    desc: "Generate tailored SEO, Ads & Website strategies in seconds.",
  },
];

export default function LoginPage() {
  const { login, isInitializing, isLoggingIn } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[480px] bg-sidebar p-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-sidebar-foreground font-display font-semibold text-xl tracking-tight">
            GrowthOS
          </span>
        </div>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-sidebar-foreground leading-tight mb-3">
              Automate 70% of your agency's growth work
            </h1>
            <p className="text-sidebar-foreground/60 text-base leading-relaxed">
              Find leads, close deals, and manage clients — all in one platform
              built for digital marketing agencies.
            </p>
          </div>
          <div className="space-y-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 shrink-0 mt-0.5">
                  <f.icon className="w-4 h-4 text-sidebar-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-sidebar-foreground">
                    {f.title}
                  </p>
                  <p className="text-xs text-sidebar-foreground/50 mt-0.5">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-sidebar-foreground/30">
          © {new Date().getFullYear()} Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="underline hover:text-sidebar-foreground/60"
          >
            caffeine.ai
          </a>
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-lg">GrowthOS</span>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Welcome back
            </h2>
            <p className="text-muted-foreground mt-1.5">
              Sign in to your GrowthOS account to continue.
            </p>
          </div>

          <Button
            className="w-full h-11 font-semibold text-sm gap-2"
            data-ocid="login.submit_button"
            onClick={login}
            disabled={isInitializing || isLoggingIn}
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Connecting…
              </span>
            ) : (
              <>
                Sign in with Internet Identity
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Internet Identity provides secure, anonymous authentication.{" "}
            <a
              href="https://identity.ic0.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
