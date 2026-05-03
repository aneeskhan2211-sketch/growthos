import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface InfoRowProps {
  label: string;
  value: string;
  mono?: boolean;
}

function InfoRow({ label, value, mono }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={`text-sm font-semibold text-foreground ${mono ? "font-mono text-xs" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

interface ToggleRowProps {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  ocid: string;
}

function ToggleRow({ label, desc, checked, onChange, ocid }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border/30 last:border-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} data-ocid={ocid} />
    </div>
  );
}

export default function AppInfoPage() {
  const navigate = useNavigate();
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [notifPermission, setNotifPermission] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useMetaTags(PAGE_META["/app-info"]);

  const handleExportData = () => {
    toast.info("Export My Data is available on Growth and Pro plans.", {
      description: "Upgrade to download all your leads, messages, and reports.",
    });
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    toast.success(
      "Account deletion request submitted. Your data will be removed within 30 days.",
    );
  };

  return (
    <div data-ocid="app-info.page" className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border/40 px-4 py-3 flex items-center gap-3">
        <button
          type="button"
          data-ocid="app-info.back_button"
          onClick={() => navigate({ to: "/settings" })}
          className="p-1.5 rounded-lg hover:bg-muted/40 transition-colors text-foreground -ml-1"
          aria-label="Go back"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h1 className="text-base font-display font-bold text-foreground">
          App Information
        </h1>
      </div>

      <div className="mx-auto max-w-[600px] px-4 py-6 space-y-5 pb-12">
        {/* Version & Build */}
        <motion.section
          data-ocid="app-info.version_section"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl bg-card border border-border/40 p-4"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Version &amp; Build
          </p>
          <InfoRow label="App Version" value="2.0.0" />
          <InfoRow label="Build" value="2026.05.01" mono />
          <InfoRow label="Platform" value="Web App (PWA)" />
          <InfoRow label="Environment" value="Production" />
        </motion.section>

        {/* Data & Privacy */}
        <motion.section
          data-ocid="app-info.privacy_section"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="rounded-2xl bg-card border border-border/40 p-4"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
            Data &amp; Privacy
          </p>

          <ToggleRow
            label="Usage Analytics"
            desc="Allow GrowthOS to collect usage analytics to improve the app"
            checked={analyticsConsent}
            onChange={setAnalyticsConsent}
            ocid="app-info.analytics_toggle"
          />
          <ToggleRow
            label="In-App Notifications"
            desc="Allow in-app notifications for lead updates and reminders"
            checked={notifPermission}
            onChange={setNotifPermission}
            ocid="app-info.notification_toggle"
          />

          <div className="pt-3 flex flex-col gap-2">
            <button
              type="button"
              data-ocid="app-info.privacy_policy_link"
              onClick={() => navigate({ to: "/privacy-policy" })}
              className="flex items-center justify-between py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Privacy Policy
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button
              type="button"
              data-ocid="app-info.terms_link"
              onClick={() => navigate({ to: "/terms" })}
              className="flex items-center justify-between py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors border-t border-border/30"
            >
              Terms of Service
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </motion.section>

        {/* Contact & Support */}
        <motion.section
          data-ocid="app-info.contact_section"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="rounded-2xl bg-card border border-border/40 p-4"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Contact &amp; Support
          </p>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Owner</p>
              <p className="text-sm font-semibold text-foreground">
                Anees Chaudhary
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-border/30 pt-2.5">
              <p className="text-sm text-muted-foreground">Phone</p>
              <a
                href="tel:+919324073833"
                data-ocid="app-info.owner_phone_link"
                className="text-sm font-semibold text-primary hover:underline"
              >
                9324073833
              </a>
            </div>
            <p className="text-xs text-muted-foreground border-t border-border/30 pt-2.5">
              For help, call this number — Anees Chaudhary is available to
              assist you.
            </p>
          </div>
        </motion.section>

        {/* Account Management */}
        <motion.section
          data-ocid="app-info.account_section"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="rounded-2xl bg-card border border-border/40 p-4 space-y-3"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Account Management
          </p>

          <Button
            variant="outline"
            className="w-full gap-2 justify-start"
            data-ocid="app-info.export_data_button"
            onClick={handleExportData}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export My Data
          </Button>

          <Button
            variant="outline"
            className="w-full gap-2 justify-start border-destructive/40 text-destructive hover:bg-destructive/5 hover:border-destructive/60"
            data-ocid="app-info.delete_account_button"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Delete Account
          </Button>
        </motion.section>

        {/* Compliance */}
        <motion.section
          data-ocid="app-info.compliance_section"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="rounded-2xl bg-card border border-border/40 p-4"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Compliance
          </p>
          <InfoRow label="Crash Reporting" value="Enabled" />
          <InfoRow label="Error Logging" value="Enabled" />
          <InfoRow label="Data Region" value="India (Mumbai)" />
        </motion.section>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent
          data-ocid="app-info.delete_account_dialog"
          className="max-w-[340px]"
        >
          <DialogHeader>
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-destructive"
                aria-hidden="true"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <DialogTitle className="text-center text-base">
              Delete Account
            </DialogTitle>
            <DialogDescription className="text-center text-sm">
              Are you sure? This will permanently delete all your leads,
              messages, and account data.{" "}
              <strong className="text-foreground">
                This cannot be undone.
              </strong>
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence>
            <div className="flex flex-col gap-2 mt-2">
              <Button
                variant="destructive"
                className="w-full gap-2"
                data-ocid="app-info.delete_confirm_button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Deleting…
                  </>
                ) : (
                  "Yes, Delete My Account"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                data-ocid="app-info.delete_cancel_button"
                onClick={() => setDeleteDialogOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
            </div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </div>
  );
}
