import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Copy,
  Globe,
  Info,
  MessageCircle,
  Pause,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  Shield,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  useAddSenderIdentity,
  useDeliverabilityMetrics,
  useSenderIdentities,
} from "../hooks/useCompliance";
import type { SenderType, WarmupPhase } from "../types/compliance";
import { WarmupPhaseLabels } from "../types/compliance";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_RETRY_QUEUE = [
  {
    contact: "Priya Salon, Mumbai",
    channel: "WhatsApp",
    attempt: 2,
    retryAt: "in 1h 14m",
  },
  {
    contact: "FitZone Gym, Delhi",
    channel: "Email",
    attempt: 1,
    retryAt: "in 3h 52m",
  },
  {
    contact: "Spice Garden Restaurant",
    channel: "WhatsApp",
    attempt: 3,
    retryAt: "in 23h 10m",
  },
];

const MOCK_INBOX_SENDERS = [
  {
    email: "outreach@growthco.in",
    domain: "growthco.in",
    dailyLimit: 50,
    sentToday: 23,
    status: "Active",
    isPrimary: true,
  },
  {
    email: "hello@agencyworks.in",
    domain: "agencyworks.in",
    dailyLimit: 30,
    sentToday: 12,
    status: "Active",
    isPrimary: false,
  },
  {
    email: "connect@marketpro.in",
    domain: "marketpro.in",
    dailyLimit: 20,
    sentToday: 0,
    status: "Paused",
    isPrimary: false,
  },
];

const BOUNCE_TYPES = [
  {
    type: "Hard Bounce",
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    dot: "oklch(0.55 0.22 25)",
    description: "Invalid email address — permanently remove from list",
    count: 3,
  },
  {
    type: "Soft Bounce",
    color: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    dot: "oklch(0.68 0.18 86)",
    description: "Mailbox full or server unavailable — retry in 24h",
    count: 8,
  },
  {
    type: "Spam Complaint",
    color: "text-destructive",
    bg: "bg-destructive/15",
    border: "border-destructive/30",
    dot: "oklch(0.45 0.24 20)",
    description: "Recipient marked as spam — immediately remove",
    count: 1,
  },
];

const WARMUP_WEEKS = [
  {
    week: "Week 1",
    dailySends: "10–20",
    goal: "Build reputation",
    status: "Active",
  },
  {
    week: "Week 2",
    dailySends: "20–50",
    goal: "Increase volume",
    status: "Pending",
  },
  {
    week: "Week 3",
    dailySends: "50–100",
    goal: "Scale outreach",
    status: "Pending",
  },
  {
    week: "Week 4+",
    dailySends: "100+",
    goal: "Full capacity",
    status: "Pending",
  },
];

const DNS_RECORDS = [
  {
    key: "spf" as const,
    label: "SPF",
    fullName: "SPF Record",
    description:
      "SPF (Sender Policy Framework) tells receiving mail servers which servers are allowed to send email on behalf of your domain.",
    recordType: "TXT",
    host: "@",
    value: "v=spf1 include:sendgrid.net include:mailgun.org ~all",
  },
  {
    key: "dkim" as const,
    label: "DKIM",
    fullName: "DKIM Record",
    description:
      "DKIM (DomainKeys Identified Mail) adds a digital signature to your emails, proving they haven't been tampered with.",
    recordType: "TXT",
    host: "mail._domainkey",
    value:
      "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC3v2yZhKz5QHdyj9K7LmX1pNqR8sT2uWvE4bCeGdFhIJoKlMnOpQrStUvWxYzAaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789AQAB",
  },
  {
    key: "dmarc" as const,
    label: "DMARC",
    fullName: "DMARC Record",
    description:
      "DMARC tells receiving servers what to do with emails that fail SPF or DKIM checks.",
    recordType: "TXT",
    host: "_dmarc",
    value:
      "v=DMARC1; p=none; rua=mailto:reports@yourdomain.com; ruf=mailto:forensics@yourdomain.com; fo=1",
  },
];

type DnsKey = "spf" | "dkim" | "dmarc";
type DnsStatus = "not_configured" | "configured" | "verified";

// ─── Shared Sub-Components ────────────────────────────────────────────────────

function ReputationRing({ score }: { score: number }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color =
    score >= 80
      ? "oklch(0.65 0.18 145)"
      : score >= 60
        ? "oklch(0.75 0.16 75)"
        : "oklch(0.55 0.22 25)";
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      aria-label={`Reputation score: ${score}`}
      className="rotate-[-90deg]"
    >
      <title>Reputation score: {score}</title>
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        className="text-border"
      />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
      <text
        x="36"
        y="40"
        textAnchor="middle"
        style={{
          transform: "rotate(90deg)",
          transformOrigin: "36px 36px",
          fill: color,
          fontSize: "14px",
          fontWeight: 700,
          fontFamily: "inherit",
        }}
      >
        {score}
      </text>
    </svg>
  );
}

function MiniBarChart({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, idx) => (
        <div
          key={`bar-val-${idx.toString()}-${v}`}
          className="flex-1 rounded-t bg-primary/70 transition-all"
          style={{ height: `${(v / max) * 100}%`, minHeight: "2px" }}
          title={`${v}`}
        />
      ))}
    </div>
  );
}

function LineSVG({
  delivered,
  replied,
  bounced,
}: { delivered: number[]; replied: number[]; bounced: number[] }) {
  const W = 400;
  const H = 100;
  const pts = (arr: number[]) => {
    const max = Math.max(...arr, 1);
    return arr
      .map(
        (v, i) =>
          `${(i / (arr.length - 1)) * W},${H - (v / max) * (H - 10) - 5}`,
      )
      .join(" ");
  };
  const lines = [
    { arr: delivered, stroke: "oklch(0.53 0.22 253)", label: "Delivered" },
    { arr: replied, stroke: "oklch(0.65 0.18 145)", label: "Replied" },
    { arr: bounced, stroke: "oklch(0.75 0.16 75)", label: "Bounced" },
  ];
  return (
    <div className="space-y-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        aria-label="Delivery trend chart"
        className="w-full h-28"
      >
        <title>7-day delivery trend</title>
        {lines.map(({ arr, stroke }) => (
          <polyline
            key={stroke}
            points={pts(arr)}
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
      <div className="flex gap-4 text-xs text-muted-foreground">
        {lines.map(({ stroke, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="w-3 h-0.5 rounded"
              style={{ backgroundColor: stroke }}
            />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

function CopyButton({ value, ocid }: { value: string; ocid: string }) {
  const [copied, setCopied] = useState(false);
  const doCopy = () => {
    void navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      size="sm"
      variant="outline"
      className="h-7 text-xs shrink-0"
      data-ocid={ocid}
      onClick={doCopy}
    >
      {copied ? (
        <CheckCircle2 className="w-3 h-3 mr-1 text-success" />
      ) : (
        <Copy className="w-3 h-3 mr-1" />
      )}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

function DnsStatusDot({ status }: { status: DnsStatus }) {
  const map: Record<DnsStatus, { color: string; label: string }> = {
    not_configured: { color: "oklch(0.55 0.22 25)", label: "Not Configured" },
    configured: { color: "oklch(0.68 0.18 86)", label: "Configured" },
    verified: { color: "oklch(0.56 0.15 170)", label: "Verified" },
  };
  const { color, label } = map[status];
  return (
    <span
      className="flex items-center gap-1.5 text-xs font-medium"
      style={{ color }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

// ─── Tab: Email Domain Setup ──────────────────────────────────────────────────

function EmailDomainSetupTab() {
  const [statuses, setStatuses] = useState<Record<DnsKey, DnsStatus>>({
    spf: "not_configured",
    dkim: "not_configured",
    dmarc: "not_configured",
  });
  const [verifying, setVerifying] = useState(false);
  const [verifyDone, setVerifyDone] = useState(false);
  const [checklist, setChecklist] = useState([false, false, false, false]);

  const markConfigured = (key: DnsKey) => {
    setStatuses((prev) => ({
      ...prev,
      [key]: prev[key] === "not_configured" ? "configured" : "verified",
    }));
  };

  const runVerification = () => {
    setVerifying(true);
    setVerifyDone(false);
    setTimeout(() => {
      setVerifying(false);
      setVerifyDone(true);
    }, 2500);
  };

  const toggleCheck = (i: number) => {
    setChecklist((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {DNS_RECORDS.map(({ key, fullName }) => (
          <Card key={key} className="border-border">
            <CardContent className="pt-4 pb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {fullName}
                </p>
                <DnsStatusDot status={statuses[key]} />
              </div>
              <Shield
                className={cn(
                  "w-5 h-5",
                  statuses[key] === "verified"
                    ? "text-success"
                    : statuses[key] === "configured"
                      ? "text-warning"
                      : "text-muted-foreground",
                )}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DNS Record Guides */}
      {DNS_RECORDS.map(
        ({ key, label, description, recordType, host, value }) => (
          <Card key={key} className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                {label} Setup Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{description}</p>
              <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
                <div className="grid grid-cols-[80px_1fr] divide-y divide-border text-sm">
                  {[
                    { field: "Type", val: recordType },
                    { field: "Host", val: host },
                    { field: "Value", val: value },
                  ].map(({ field, val }) => (
                    <div key={field} className="contents">
                      <div className="px-3 py-2.5 bg-muted/50 font-medium text-muted-foreground text-xs flex items-center">
                        {field}
                      </div>
                      <div className="px-3 py-2.5 font-mono text-xs text-foreground break-all">
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton value={value} ocid={`dns.${key}_copy_button`} />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  data-ocid={`dns.${key}_configure_button`}
                  onClick={() => markConfigured(key)}
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {statuses[key] === "not_configured"
                    ? "Mark as Configured"
                    : statuses[key] === "configured"
                      ? "Mark as Verified"
                      : "✓ Verified"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ),
      )}

      {/* Verification Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            Verification Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              label: "Add DNS records listed above to your domain registrar",
              action: null,
            },
            { label: "Wait 24–48 hours for DNS propagation", action: null },
            {
              label: "Run a verification check to confirm records are live",
              action: "verify",
            },
            {
              label: "Monitor your delivery metrics for improvements",
              action: null,
            },
          ].map(({ label, action }, i) => (
            <div
              key={label}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 border border-border"
            >
              <button
                type="button"
                onClick={() => toggleCheck(i)}
                data-ocid={`dns.checklist_item.${i + 1}`}
                className={cn(
                  "mt-0.5 w-4 h-4 rounded border-2 shrink-0 transition-smooth flex items-center justify-center",
                  checklist[i]
                    ? "bg-primary border-primary"
                    : "border-muted-foreground/40",
                )}
                aria-checked={checklist[i]}
              >
                {checklist[i] && (
                  <CheckCircle2 className="w-3 h-3 text-primary-foreground" />
                )}
              </button>
              <div className="flex-1 min-w-0 flex items-center justify-between gap-3 flex-wrap">
                <span
                  className={cn(
                    "text-sm",
                    checklist[i]
                      ? "line-through text-muted-foreground"
                      : "text-foreground",
                  )}
                >
                  Step {i + 1}: {label}
                </span>
                {action === "verify" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs shrink-0"
                    data-ocid="dns.run_verification_button"
                    onClick={runVerification}
                    disabled={verifying}
                  >
                    {verifying ? (
                      <>
                        <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                        Verifying…
                      </>
                    ) : verifyDone ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1 text-success" />
                        Re-check
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Run Verification Check
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
          {verifyDone && (
            <div
              className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm text-primary"
              data-ocid="dns.verification_status"
            >
              <Info className="w-4 h-4 shrink-0" />
              Verification in progress… DNS changes may take up to 48h to
              propagate globally.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Warmup Scheduler ────────────────────────────────────────────────────

function WarmupSchedulerTab() {
  const [warmupActive, setWarmupActive] = useState(true);

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Current Status
              </p>
              <p className="text-lg font-bold text-foreground">
                Phase 1 — Building Reputation
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  <span className="font-semibold text-foreground">7</span> days
                  active
                </span>
                <span>
                  <span className="font-semibold text-primary">10–20</span>{" "}
                  emails / day target
                </span>
              </div>
            </div>
            <Button
              size="sm"
              variant={warmupActive ? "outline" : "default"}
              className="gap-1.5"
              data-ocid="warmup.toggle_button"
              onClick={() => setWarmupActive((v) => !v)}
            >
              {warmupActive ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  Pause Warmup
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  Start Warmup
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 4-Week Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            4-Week Ramp-Up Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  {["Week", "Daily Sends", "Goal", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left text-xs text-muted-foreground font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WARMUP_WEEKS.map((row, i) => (
                  <tr
                    key={row.week}
                    data-ocid={`warmup.week.item.${i + 1}`}
                    className={cn(
                      "border-t border-border",
                      i === 0 && "bg-primary/5",
                    )}
                  >
                    <td className="px-3 py-3 font-semibold text-foreground">
                      {row.week}
                    </td>
                    <td className="px-3 py-3 font-mono text-sm text-primary font-semibold">
                      {row.dailySends}
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">
                      {row.goal}
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          row.status === "Active"
                            ? "text-success border-success/30 bg-success/10"
                            : "text-muted-foreground",
                        )}
                      >
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* This Week Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">This Week's Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Sent",
                value: "47",
                sub: "emails",
                color: "text-foreground",
              },
              {
                label: "Delivered",
                value: "45",
                sub: "95.7%",
                color: "text-success",
              },
              {
                label: "Opens",
                value: "18",
                sub: "40.0%",
                color: "text-primary",
              },
              {
                label: "Bounces",
                value: "2",
                sub: "4.3%",
                color: "text-warning",
              },
            ].map(({ label, value, sub, color }) => (
              <div
                key={label}
                className="p-4 rounded-xl bg-muted/30 border border-border text-center"
              >
                <p className={cn("text-2xl font-bold tabular-nums", color)}>
                  {value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                <p className={cn("text-xs font-medium mt-0.5", color)}>{sub}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tip Callout */}
      <div
        className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20"
        data-ocid="warmup.tip_callout"
      >
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Pro tip: </span>
          Send emails during business hours{" "}
          <span className="font-semibold text-primary">(9am–6pm IST)</span> to
          maximize open rates. Avoid Monday mornings and Friday afternoons.
        </p>
      </div>
    </div>
  );
}

// ─── Tab: Inbox Rotation ──────────────────────────────────────────────────────

function InboxRotationTab() {
  const [rotationStrategy, setRotationStrategy] = useState("round_robin");
  const [senders, setSenders] = useState(MOCK_INBOX_SENDERS);
  const [newEmail, setNewEmail] = useState("");
  const [newDomain, setNewDomain] = useState("");
  const [newLimit, setNewLimit] = useState("30");
  const [newPrimary, setNewPrimary] = useState(false);

  const addSender = () => {
    if (!newEmail.trim() || !newDomain.trim()) return;
    setSenders((prev) => [
      ...prev,
      {
        email: newEmail.trim(),
        domain: newDomain.trim(),
        dailyLimit: Number(newLimit) || 30,
        sentToday: 0,
        status: "Active",
        isPrimary: newPrimary,
      },
    ]);
    setNewEmail("");
    setNewDomain("");
    setNewLimit("30");
    setNewPrimary(false);
  };

  const togglePause = (email: string) => {
    setSenders((prev) =>
      prev.map((s) =>
        s.email === email
          ? { ...s, status: s.status === "Active" ? "Paused" : "Active" }
          : s,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Active Senders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-primary" />
            Active Senders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  {[
                    "Email Address",
                    "Domain",
                    "Daily Limit",
                    "Sent Today",
                    "Status",
                    "Primary",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left text-xs text-muted-foreground font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {senders.map((s, i) => (
                  <tr
                    key={s.email}
                    data-ocid={`rotation.sender.item.${i + 1}`}
                    className="border-t border-border"
                  >
                    <td className="px-3 py-3 font-mono text-xs text-foreground">
                      {s.email}
                    </td>
                    <td className="px-3 py-3 text-muted-foreground text-xs">
                      {s.domain}
                    </td>
                    <td className="px-3 py-3 tabular-nums font-semibold text-foreground">
                      {s.dailyLimit}
                    </td>
                    <td className="px-3 py-3">
                      <div className="space-y-1">
                        <span className="tabular-nums font-semibold text-foreground">
                          {s.sentToday}
                        </span>
                        <Progress
                          value={(s.sentToday / s.dailyLimit) * 100}
                          className="h-1 w-16"
                        />
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          s.status === "Active"
                            ? "text-success border-success/30 bg-success/10"
                            : "text-muted-foreground",
                        )}
                      >
                        {s.status}
                      </Badge>
                    </td>
                    <td className="px-3 py-3">
                      {s.isPrimary && (
                        <Badge
                          variant="outline"
                          className="text-xs text-primary border-primary/30 bg-primary/10"
                        >
                          Primary
                        </Badge>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-muted-foreground"
                        data-ocid={`rotation.toggle_sender.${i + 1}`}
                        onClick={() => togglePause(s.email)}
                      >
                        {s.status === "Active" ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Sender Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            Add Sender
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Email Address</Label>
              <Input
                data-ocid="rotation.email_input"
                placeholder="outreach@yourdomain.in"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Domain</Label>
              <Input
                data-ocid="rotation.domain_input"
                placeholder="yourdomain.in"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Daily Limit</Label>
              <Input
                data-ocid="rotation.limit_input"
                type="number"
                placeholder="30"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch
                id="primary-toggle"
                checked={newPrimary}
                onCheckedChange={setNewPrimary}
                data-ocid="rotation.primary_toggle"
              />
              <Label htmlFor="primary-toggle" className="cursor-pointer">
                Set as Primary
              </Label>
            </div>
          </div>
          <Button
            data-ocid="rotation.add_sender_button"
            onClick={addSender}
            disabled={!newEmail.trim() || !newDomain.trim()}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Sender
          </Button>
        </CardContent>
      </Card>

      {/* Rotation Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Rotation Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                key: "round_robin",
                label: "Round Robin",
                desc: "Rotate evenly across all senders",
              },
              {
                key: "load_balanced",
                label: "Load Balanced",
                desc: "Route based on remaining daily capacity",
              },
              {
                key: "primary_first",
                label: "Primary First",
                desc: "Use primary sender until limit, then rotate",
              },
            ].map(({ key, label, desc }) => (
              <button
                type="button"
                key={key}
                data-ocid={`rotation.strategy.${key}`}
                onClick={() => setRotationStrategy(key)}
                className={cn(
                  "text-left p-4 rounded-xl border transition-smooth",
                  rotationStrategy === key
                    ? "border-primary bg-primary/8 shadow-subtle"
                    : "border-border bg-muted/20 hover:border-primary/40",
                )}
              >
                <p
                  className={cn(
                    "text-sm font-semibold",
                    rotationStrategy === key
                      ? "text-primary"
                      : "text-foreground",
                  )}
                >
                  {label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bounce Classification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <XCircle className="w-4 h-4 text-destructive" />
            Bounce Classification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {BOUNCE_TYPES.map(
            ({ type, color, bg, border, dot, description, count }) => (
              <div
                key={type}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-xl border",
                  bg,
                  border,
                )}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                  style={{ backgroundColor: dot }}
                />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-semibold", color)}>{type}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {description}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-lg font-bold tabular-nums shrink-0",
                    color,
                  )}
                >
                  {count}
                </span>
              </div>
            ),
          )}
          <p className="text-xs text-muted-foreground italic pt-1">
            Based on publicly available data and heuristics
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DeliverabilityPage() {
  const { data: identities = [] } = useSenderIdentities();
  const { data: stats = [] } = useDeliverabilityMetrics();
  const addIdentity = useAddSenderIdentity();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newIdentifier, setNewIdentifier] = useState("");
  const [newType, setNewType] = useState<SenderType>("whatsapp");

  const totalDelivered = stats.reduce((s, d) => s + d.deliveredCount, 0);
  const totalReplied = stats.reduce((s, d) => s + d.repliedCount, 0);
  const totalBounced = stats.reduce((s, d) => s + d.bouncedCount, 0);
  const totalOptOut = stats.reduce((s, d) => s + d.optOutCount, 0);
  const totalSent = totalDelivered + totalBounced;

  const deliveryRate =
    totalSent > 0 ? ((totalDelivered / totalSent) * 100).toFixed(1) : "0";
  const replyRate =
    totalDelivered > 0
      ? ((totalReplied / totalDelivered) * 100).toFixed(1)
      : "0";
  const bounceRate =
    totalSent > 0 ? ((totalBounced / totalSent) * 100).toFixed(1) : "0";
  const optOutRate =
    totalSent > 0 ? ((totalOptOut / totalSent) * 100).toFixed(1) : "0";

  const waSent = 187;
  const emailSent = 214;
  const queueCount = 43;

  const warmupPhase: WarmupPhase =
    identities.find((i) => i.senderType === "email_domain")?.warmupPhase ??
    "phase2";

  const doAddIdentity = async () => {
    await addIdentity.mutateAsync({
      identifier: newIdentifier,
      senderType: newType,
    });
    setNewIdentifier("");
    setShowAddModal(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          Deliverability &amp; Sender Health
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor delivery rates, manage sender identities, and maintain sender
          reputation.
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Delivery Rate",
            value: `${deliveryRate}%`,
            icon: CheckCircle2,
            color: "text-success",
            bg: "bg-success/10",
          },
          {
            label: "Reply Rate",
            value: `${replyRate}%`,
            icon: MessageCircle,
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "Bounce Rate",
            value: `${bounceRate}%`,
            icon: XCircle,
            color: "text-warning",
            bg: "bg-warning/10",
          },
          {
            label: "Opt-Out Rate",
            value: `${optOutRate}%`,
            icon: AlertTriangle,
            color: "text-destructive",
            bg: "bg-destructive/10",
          },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="pt-4 pb-4">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
                  bg,
                )}
              >
                <Icon className={cn("w-4 h-4", color)} />
              </div>
              <p className={cn("text-2xl font-bold tabular-nums", color)}>
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabbed Sections */}
      <Tabs defaultValue="overview" data-ocid="deliverability.tabs">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview" data-ocid="deliverability.tab.overview">
            Overview
          </TabsTrigger>
          <TabsTrigger value="domain" data-ocid="deliverability.tab.domain">
            Email Domain Setup
          </TabsTrigger>
          <TabsTrigger value="warmup" data-ocid="deliverability.tab.warmup">
            Warmup Scheduler
          </TabsTrigger>
          <TabsTrigger value="rotation" data-ocid="deliverability.tab.rotation">
            Inbox Rotation
          </TabsTrigger>
        </TabsList>

        {/* ── TAB: Overview (existing content preserved) ── */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Sender Identities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Sender Identities</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  data-ocid="deliverability.add_sender_button"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Add Identity
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {identities.length === 0 && (
                <div
                  data-ocid="deliverability.empty_state"
                  className="text-center py-8 text-muted-foreground text-sm"
                >
                  No sender identities configured
                </div>
              )}
              <div className="space-y-4">
                {identities.map((id, i) => (
                  <div
                    key={id.id.toString()}
                    data-ocid={`deliverability.sender.item.${i + 1}`}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border"
                  >
                    <ReputationRing score={id.reputationScore} />
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">
                          {id.identifier}
                        </span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            id.senderType === "whatsapp"
                              ? "text-success border-success/30 bg-success/10"
                              : "text-primary border-primary/30 bg-primary/10",
                          )}
                        >
                          {id.senderType === "whatsapp"
                            ? "WhatsApp"
                            : "Email Domain"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs text-muted-foreground"
                        >
                          {WarmupPhaseLabels[id.warmupPhase]}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-center">
                        {[
                          {
                            label: "Sent",
                            val: id.totalSent,
                            cls: "text-foreground",
                          },
                          {
                            label: "Delivered",
                            val: id.totalDelivered,
                            cls: "text-success",
                          },
                          {
                            label: "Replied",
                            val: id.totalReplied,
                            cls: "text-primary",
                          },
                          {
                            label: "Bounced",
                            val: id.totalBounced,
                            cls: "text-warning",
                          },
                          {
                            label: "Opt-Out",
                            val: id.totalOptOut,
                            cls: "text-destructive",
                          },
                        ].map(({ label, val, cls }) => (
                          <div
                            key={label}
                            className="p-1.5 rounded-lg bg-background/60"
                          >
                            <p
                              className={cn(
                                "text-sm font-bold tabular-nums",
                                cls,
                              )}
                            >
                              {val}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              {label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warm-up Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Domain Warm-up Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
                <Info className="w-4 h-4 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  You are in{" "}
                  <span className="font-semibold text-primary">Phase 2</span>.
                  Keep sends under{" "}
                  <span className="font-semibold text-primary">50/day</span> to
                  maintain sender reputation. Current phase:{" "}
                  <span className="font-semibold">
                    {WarmupPhaseLabels[warmupPhase]}
                  </span>
                </span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                  Daily Email Send Volume (7 days)
                </p>
                <MiniBarChart data={stats.map((s) => s.deliveredCount)} />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  {stats.map((s) => (
                    <span key={s.date}>{s.date.slice(5)}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">7-Day Delivery Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <LineSVG
                delivered={stats.map((s) => s.deliveredCount)}
                replied={stats.map((s) => s.repliedCount)}
                bounced={stats.map((s) => s.bouncedCount)}
              />
            </CardContent>
          </Card>

          {/* Rate Limit Monitor */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Rate Limit Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    label: "WhatsApp",
                    sent: waSent,
                    limit: 1000,
                    color: "bg-success",
                  },
                  {
                    label: "Email",
                    sent: emailSent,
                    limit: 500,
                    color: "bg-primary",
                  },
                ].map(({ label, sent, limit, color }) => (
                  <div key={label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-medium">
                        {label}
                      </span>
                      <span className="text-muted-foreground tabular-nums text-xs">
                        {sent} / {limit} sent today
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          color,
                        )}
                        style={{ width: `${(sent / limit) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40 text-sm text-muted-foreground">
                <RefreshCw className="w-4 h-4 text-primary shrink-0" />
                <span>
                  <span className="font-semibold text-foreground">
                    {queueCount} messages
                  </span>{" "}
                  queued — next batch in{" "}
                  <span className="font-semibold text-primary">12m</span>
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Retry Backoff Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Retry Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      {[
                        "Contact",
                        "Channel",
                        "Attempt #",
                        "Next Retry",
                        "Action",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-3 py-2.5 text-left text-xs text-muted-foreground font-medium"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_RETRY_QUEUE.map((row, idx) => (
                      <tr
                        key={row.contact}
                        data-ocid={`deliverability.retry.item.${idx + 1}`}
                        className="border-t border-border"
                      >
                        <td className="px-3 py-2.5 font-medium text-foreground text-sm">
                          {row.contact}
                        </td>
                        <td className="px-3 py-2.5">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              row.channel === "WhatsApp"
                                ? "text-success border-success/30"
                                : "text-primary border-primary/30",
                            )}
                          >
                            {row.channel}
                          </Badge>
                        </td>
                        <td className="px-3 py-2.5 text-muted-foreground text-sm">
                          #{row.attempt}
                        </td>
                        <td className="px-3 py-2.5 text-sm text-warning font-medium">
                          {row.retryAt}
                        </td>
                        <td className="px-3 py-2.5">
                          <Button
                            size="sm"
                            variant="outline"
                            data-ocid={`deliverability.retry_button.${idx + 1}`}
                            className="h-7 text-xs"
                          >
                            <RefreshCw className="w-3 h-3 mr-1" />
                            Retry Now
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TAB: Email Domain Setup ── */}
        <TabsContent value="domain" className="mt-6">
          <EmailDomainSetupTab />
        </TabsContent>

        {/* ── TAB: Warmup Scheduler ── */}
        <TabsContent value="warmup" className="mt-6">
          <WarmupSchedulerTab />
        </TabsContent>

        {/* ── TAB: Inbox Rotation ── */}
        <TabsContent value="rotation" className="mt-6">
          <InboxRotationTab />
        </TabsContent>
      </Tabs>

      {/* Add Sender Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent
          className="sm:max-w-sm"
          data-ocid="deliverability.dialog"
        >
          <DialogHeader>
            <DialogTitle>Add Sender Identity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label>Identifier</Label>
              <Input
                data-ocid="deliverability.identifier_input"
                placeholder="+91 98001 23456 or domain@company.com"
                value={newIdentifier}
                onChange={(e) => setNewIdentifier(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select
                value={newType}
                onValueChange={(v) => setNewType(v as SenderType)}
              >
                <SelectTrigger data-ocid="deliverability.sender_type_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp Number</SelectItem>
                  <SelectItem value="email_domain">Email Domain</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button
                variant="outline"
                data-ocid="deliverability.cancel_button"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="deliverability.submit_button"
                onClick={doAddIdentity}
                disabled={addIdentity.isPending || !newIdentifier.trim()}
              >
                {addIdentity.isPending ? "Adding…" : "Add Identity"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
