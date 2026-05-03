import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import type { Easing } from "motion/react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Field Error ──────────────────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-[11px] text-destructive mt-1">{msg}</p>;
}

// ─── Notification events ──────────────────────────────────────────────────────

const NOTIF_EVENTS = [
  { key: "newLead", label: "New lead", desc: "When a new lead is added" },
  {
    key: "replyReceived",
    label: "Reply received",
    desc: "When a lead replies",
  },
  {
    key: "followUpDue",
    label: "Follow-up due",
    desc: "Scheduled follow-up reminders",
  },
  { key: "dealClosed", label: "Deal closed", desc: "When a deal is won" },
  {
    key: "weeklyReport",
    label: "Weekly report",
    desc: "Your weekly performance summary",
  },
  {
    key: "systemAlerts",
    label: "System alerts",
    desc: "Platform updates and issues",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AccountSettingsProfilePage() {
  useMetaTags(PAGE_META["/settings/profile"]);
  // Personal Info
  const [info, setInfo] = useState({
    name: "Anees Chaudhary",
    email: "anees@growthos.in",
    phone: "+91 9324073833",
  });
  const [infoErrors, setInfoErrors] = useState<Record<string, string>>({});
  const [savingInfo, setSavingInfo] = useState(false);

  // Security
  const [pwd, setPwd] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [showPwd, setShowPwd] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [pwdErrors, setPwdErrors] = useState<Record<string, string>>({});
  const [savingPwd, setSavingPwd] = useState(false);

  // Notifications
  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    newLead: true,
    replyReceived: true,
    followUpDue: true,
    dealClosed: false,
    weeklyReport: true,
    systemAlerts: false,
  });
  const [quietFrom, setQuietFrom] = useState("21:00");
  const [quietTo, setQuietTo] = useState("08:00");

  // Privacy
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const validateInfo = () => {
    const e: Record<string, string> = {};
    if (!info.name.trim()) e.name = "Name is required";
    if (!info.email.trim()) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(info.email))
      e.email = "Enter a valid email";
    return e;
  };

  const saveInfo = async () => {
    const e = validateInfo();
    if (Object.keys(e).length) {
      setInfoErrors(e);
      return;
    }
    setSavingInfo(true);
    await new Promise((r) => setTimeout(r, 800));
    setSavingInfo(false);
    toast.success("Personal info updated!");
  };

  const validatePwd = () => {
    const e: Record<string, string> = {};
    if (!pwd.current) e.current = "Current password required";
    if (!pwd.next) e.next = "New password required";
    else if (pwd.next.length < 8) e.next = "Minimum 8 characters";
    if (pwd.next !== pwd.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const changePwd = async () => {
    const e = validatePwd();
    if (Object.keys(e).length) {
      setPwdErrors(e);
      return;
    }
    setSavingPwd(true);
    await new Promise((r) => setTimeout(r, 800));
    setSavingPwd(false);
    setPwd({ current: "", next: "", confirm: "" });
    toast.success("Password changed!");
  };

  const exportData = () => {
    const data = JSON.stringify(
      {
        profile: info,
        notificationSettings: notifs,
        exportedAt: new Date().toISOString(),
      },
      null,
      2,
    );
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "growthos-data-export.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported!");
  };

  const confirmDelete = () => {
    if (deleteInput !== "DELETE") {
      toast.error("Type DELETE to confirm");
      return;
    }
    setDeleteOpen(false);
    setDeleteInput("");
    toast.error(
      "Account deletion requested. You will be contacted within 48h.",
    );
  };

  const EyeIcon = ({ show }: { show: boolean }) =>
    show ? (
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
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    ) : (
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
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );

  const stagger = (i: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.25, delay: i * 0.06, ease: "easeOut" as Easing },
  });

  return (
    <PageTransition>
      <div
        data-ocid="account_settings.page"
        className="max-w-2xl mx-auto pb-24"
      >
        <motion.div {...stagger(0)} className="mb-6">
          <h1 className="text-2xl font-bold font-display text-foreground">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal info, security, notifications, and privacy.
          </p>
        </motion.div>

        <motion.div {...stagger(1)}>
          <Tabs defaultValue="personal" data-ocid="account_settings.tabs">
            <TabsList className="w-full mb-5 h-11">
              <TabsTrigger
                value="personal"
                data-ocid="account_settings.tab.personal"
                className="flex-1"
              >
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="security"
                data-ocid="account_settings.tab.security"
                className="flex-1"
              >
                Security
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                data-ocid="account_settings.tab.notifications"
                className="flex-1"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                data-ocid="account_settings.tab.privacy"
                className="flex-1"
              >
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Personal Info ────────────────────────────────────────── */}
            <TabsContent value="personal" className="space-y-5">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="info-name" className="text-xs mb-1.5 block">
                      Full Name
                    </Label>
                    <Input
                      id="info-name"
                      data-ocid="account_settings.name_input"
                      value={info.name}
                      onChange={(e) => {
                        setInfo((f) => ({ ...f, name: e.target.value }));
                        if (infoErrors.name)
                          setInfoErrors((err) => ({ ...err, name: "" }));
                      }}
                      className="h-11"
                    />
                    <FieldError msg={infoErrors.name} />
                  </div>
                  <div>
                    <Label
                      htmlFor="info-email"
                      className="text-xs mb-1.5 block"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="info-email"
                      data-ocid="account_settings.email_input"
                      type="email"
                      value={info.email}
                      onChange={(e) => {
                        setInfo((f) => ({ ...f, email: e.target.value }));
                        if (infoErrors.email)
                          setInfoErrors((err) => ({ ...err, email: "" }));
                      }}
                      className="h-11"
                    />
                    <FieldError msg={infoErrors.email} />
                  </div>
                  <div>
                    <Label
                      htmlFor="info-phone"
                      className="text-xs mb-1.5 block"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="info-phone"
                      data-ocid="account_settings.phone_input"
                      value={info.phone}
                      onChange={(e) =>
                        setInfo((f) => ({ ...f, phone: e.target.value }))
                      }
                      className="h-11"
                    />
                  </div>
                  <div className="flex justify-end pt-1">
                    <Button
                      data-ocid="account_settings.save_info_button"
                      onClick={saveInfo}
                      disabled={savingInfo}
                      className="h-10 px-6 text-sm font-semibold"
                    >
                      {savingInfo ? "Saving…" : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security ─────────────────────────────────────────────── */}
            <TabsContent value="security" className="space-y-5">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Change Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(
                    [
                      { key: "current", label: "Current Password" },
                      { key: "next", label: "New Password" },
                      { key: "confirm", label: "Confirm New Password" },
                    ] as const
                  ).map(({ key, label }) => (
                    <div key={key}>
                      <Label className="text-xs mb-1.5 block">{label}</Label>
                      <div className="relative">
                        <Input
                          data-ocid={`account_settings.${key}_password_input`}
                          type={showPwd[key] ? "text" : "password"}
                          value={pwd[key]}
                          onChange={(e) => {
                            setPwd((p) => ({ ...p, [key]: e.target.value }));
                            if (pwdErrors[key])
                              setPwdErrors((err) => ({ ...err, [key]: "" }));
                          }}
                          className="h-11 pr-11"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPwd((s) => ({ ...s, [key]: !s[key] }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={
                            showPwd[key] ? "Hide password" : "Show password"
                          }
                        >
                          <EyeIcon show={showPwd[key]} />
                        </button>
                      </div>
                      <FieldError msg={pwdErrors[key]} />
                    </div>
                  ))}
                  <div className="flex justify-end pt-1">
                    <Button
                      data-ocid="account_settings.change_password_button"
                      onClick={changePwd}
                      disabled={savingPwd}
                      className="h-10 px-6 text-sm font-semibold"
                    >
                      {savingPwd ? "Saving…" : "Change Password"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications ────────────────────────────────────────── */}
            <TabsContent value="notifications" className="space-y-5">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {NOTIF_EVENTS.map(({ key, label, desc }) => (
                    <div
                      key={key}
                      className="flex items-center justify-between gap-3 py-2 border-b border-border/40 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {label}
                        </p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                      <Switch
                        data-ocid={`account_settings.notif_toggle.${key}`}
                        checked={notifs[key]}
                        onCheckedChange={(v) =>
                          setNotifs((n) => ({ ...n, [key]: v }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Quiet Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">
                    No notifications will be sent during this window.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs mb-1.5 block">From</Label>
                      <Input
                        data-ocid="account_settings.quiet_hours_from"
                        type="time"
                        value={quietFrom}
                        onChange={(e) => setQuietFrom(e.target.value)}
                        className="h-11"
                      />
                    </div>
                    <div>
                      <Label className="text-xs mb-1.5 block">To</Label>
                      <Input
                        data-ocid="account_settings.quiet_hours_to"
                        type="time"
                        value={quietTo}
                        onChange={(e) => setQuietTo(e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy ───────────────────────────────────────────────── */}
            <TabsContent value="privacy" className="space-y-5">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">
                    Data Export
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-4">
                    Download a copy of all your account data, settings, and
                    preferences in JSON format.
                  </p>
                  <Button
                    data-ocid="account_settings.export_data_button"
                    variant="outline"
                    onClick={exportData}
                    className="h-10 gap-2 text-sm"
                  >
                    <svg
                      width="14"
                      height="14"
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
                </CardContent>
              </Card>

              <Card className="border-destructive/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-destructive">
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-4">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                  <Button
                    data-ocid="account_settings.delete_account_button"
                    variant="destructive"
                    onClick={() => setDeleteOpen(true)}
                    className="h-10 gap-2 text-sm"
                  >
                    <svg
                      width="14"
                      height="14"
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Delete confirm dialog */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent data-ocid="account_settings.delete_dialog">
            <DialogHeader>
              <DialogTitle className="text-destructive">
                Delete Account
              </DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              This will permanently delete your account, all leads, clients,
              proposals, and reports. This cannot be undone.
            </p>
            <div className="mt-2">
              <Label className="text-xs mb-1.5 block">
                Type <span className="font-bold text-destructive">DELETE</span>{" "}
                to confirm
              </Label>
              <Input
                data-ocid="account_settings.delete_confirm_input"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                className="h-11"
                placeholder="DELETE"
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                data-ocid="account_settings.delete_cancel_button"
                variant="outline"
                onClick={() => {
                  setDeleteOpen(false);
                  setDeleteInput("");
                }}
              >
                Cancel
              </Button>
              <Button
                data-ocid="account_settings.delete_confirm_button"
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete My Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
