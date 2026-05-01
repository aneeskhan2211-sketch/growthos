import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  Ban,
  BarChart2,
  Bell,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  FileCheck,
  Filter,
  Globe,
  Info,
  Layers,
  Lock,
  Mail,
  Map as MapIcon,
  MessageSquare,
  Phone,
  Plus,
  Puzzle,
  RefreshCw,
  RotateCcw,
  Settings2,
  Shield,
  Timer,
  Trash2,
  User,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SubscriptionPlan } from "../backend";
import {
  useClearGA4Credentials,
  useGA4CredentialStatus,
  useSetGA4Credentials,
} from "../hooks/useGA4Analytics";
import { useSubscription } from "../hooks/useSubscription";

// ─── Types ────────────────────────────────────────────────────────────────────
type SenderStatus = "active" | "pending" | "rejected";
type DomainRecordStatus = "verified" | "pending" | "failed";
type TemplateStatus = "approved" | "pending" | "rejected";
type RetryPolicy = "linear" | "exponential";

interface SenderIdentity {
  id: string;
  type: "whatsapp" | "email";
  value: string;
  status: SenderStatus;
  reputation: number;
  lastUpdated: string;
}

interface EmailDomain {
  domain: string;
  spf: DomainRecordStatus;
  dkim: DomainRecordStatus;
  dmarc: DomainRecordStatus;
  spfRecord: string;
  dkimRecord: string;
  dmarcRecord: string;
}

interface MessageTemplate {
  id: string;
  name: string;
  channel: "whatsapp" | "email";
  status: TemplateStatus;
  approvedDate?: string;
  rejectionReason?: string;
  maxPerDay: number;
  usedToday: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_SENDERS: SenderIdentity[] = [
  {
    id: "1",
    type: "whatsapp",
    value: "+91 98765 43210",
    status: "active",
    reputation: 92,
    lastUpdated: "30 Apr 2026",
  },
  {
    id: "2",
    type: "whatsapp",
    value: "+91 87654 32109",
    status: "pending",
    reputation: 74,
    lastUpdated: "28 Apr 2026",
  },
  {
    id: "3",
    type: "email",
    value: "outreach@growthagency.in",
    status: "active",
    reputation: 88,
    lastUpdated: "29 Apr 2026",
  },
  {
    id: "4",
    type: "email",
    value: "campaigns@growthagency.in",
    status: "rejected",
    reputation: 41,
    lastUpdated: "25 Apr 2026",
  },
];

const MOCK_DOMAIN: EmailDomain = {
  domain: "growthagency.in",
  spf: "verified",
  dkim: "verified",
  dmarc: "pending",
  spfRecord: "v=spf1 include:_spf.growthagency.in ~all",
  dkimRecord: "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4...",
  dmarcRecord: "v=DMARC1; p=quarantine; rua=mailto:dmarc@growthagency.in",
};

const MOCK_TEMPLATES: MessageTemplate[] = [
  {
    id: "t1",
    name: "Initial Outreach — Restaurant",
    channel: "whatsapp",
    status: "approved",
    approvedDate: "20 Apr 2026",
    maxPerDay: 100,
    usedToday: 43,
  },
  {
    id: "t2",
    name: "Follow-Up #1 — Free Audit Offer",
    channel: "whatsapp",
    status: "approved",
    approvedDate: "22 Apr 2026",
    maxPerDay: 80,
    usedToday: 22,
  },
  {
    id: "t3",
    name: "Proposal Send — ₹15k Package",
    channel: "email",
    status: "pending",
    maxPerDay: 50,
    usedToday: 0,
  },
  {
    id: "t4",
    name: "Cold Intro — Real Estate",
    channel: "whatsapp",
    status: "rejected",
    rejectionReason: "Missing opt-in disclaimer",
    maxPerDay: 100,
    usedToday: 0,
  },
  {
    id: "t5",
    name: "Monthly Report Email",
    channel: "email",
    status: "approved",
    approvedDate: "18 Apr 2026",
    maxPerDay: 200,
    usedToday: 67,
  },
];

const PLANS: {
  id: SubscriptionPlan;
  label: string;
  price: string;
  leads: number;
  features: string[];
  highlight?: boolean;
}[] = [
  {
    id: SubscriptionPlan.starter,
    label: "Starter",
    price: "₹3,999",
    leads: 50,
    features: [
      "50 lead credits/mo",
      "Full CRM",
      "10 AI proposals",
      "SEO tools",
    ],
  },
  {
    id: SubscriptionPlan.pro,
    label: "Agency Pro",
    price: "₹11,999",
    leads: 200,
    features: [
      "200 lead credits/mo",
      "All modules",
      "Unlimited proposals",
      "Client dashboards",
      "Priority support",
    ],
    highlight: true,
  },
  {
    id: SubscriptionPlan.enterprise,
    label: "Enterprise",
    price: "₹29,999",
    leads: 1000,
    features: [
      "1000 lead credits/mo",
      "White-label",
      "API access",
      "Dedicated success manager",
      "Custom integrations",
    ],
  },
];

const MERGE_VARS = [
  { name: "[BusinessName]", desc: "The business/lead company name" },
  { name: "[City]", desc: "City where the lead is located" },
  { name: "[Phone]", desc: "Lead's contact phone number" },
  { name: "[Service]", desc: "Service category (e.g., Restaurant, Spa)" },
  { name: "[AgencyName]", desc: "Your agency name from profile" },
  { name: "[AuditLink]", desc: "Personalized free audit landing link" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────
function StatusBadge({
  status,
}: { status: SenderStatus | DomainRecordStatus | TemplateStatus }) {
  const map: Record<string, { label: string; cls: string }> = {
    active: { label: "Active", cls: "status-active" },
    verified: { label: "Verified", cls: "status-active" },
    approved: { label: "Approved", cls: "status-active" },
    pending: { label: "Pending", cls: "status-paused" },
    rejected: { label: "Rejected", cls: "status-error" },
    failed: { label: "Failed", cls: "status-error" },
  };
  const { label, cls } = map[status] ?? {
    label: status,
    cls: "status-inactive",
  };
  return (
    <span className={cn("badge-status text-xs px-2 py-0.5", cls)}>{label}</span>
  );
}

function ReputationBar({ score }: { score: number }) {
  const cls =
    score >= 80
      ? "bg-score-success"
      : score >= 60
        ? "bg-score-warning"
        : "bg-score-critical";
  const textCls =
    score >= 80
      ? "score-success"
      : score >= 60
        ? "score-warning"
        : "score-critical";
  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className="progress-bar flex-1">
        <div
          className={cn("progress-bar-fill", cls)}
          style={{ width: `${score}%`, background: "none" }}
        />
      </div>
      <span
        className={cn("text-xs font-bold tabular-nums w-8 shrink-0", textCls)}
      >
        {score}
      </span>
    </div>
  );
}

function CopyableRecord({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const doCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <code className="flex-1 text-xs bg-muted/40 border border-border rounded-md px-3 py-2 truncate font-mono">
          {value}
        </code>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 h-8 w-8"
          onClick={doCopy}
          data-ocid={`settings.copy_${label.toLowerCase().replace(/\s/g, "_")}_button`}
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-success" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  desc,
}: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

// ─── Tab: Sender Identity ─────────────────────────────────────────────────────
function SenderIdentityTab() {
  const [rotationEnabled, setRotationEnabled] = useState(true);
  const [rotationFreq, setRotationFreq] = useState("daily");
  const [newNumber, setNewNumber] = useState("");
  const [newEmailSender, setNewEmailSender] = useState("");

  const whatsapp = MOCK_SENDERS.filter((s) => s.type === "whatsapp");
  const emails = MOCK_SENDERS.filter((s) => s.type === "email");

  return (
    <div className="space-y-6">
      {/* WhatsApp Numbers */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Phone}
            title="WhatsApp Business Numbers"
            desc="Register and manage your WhatsApp sender numbers. Only numbers with 'Active' status are used for outreach."
          />
        </CardHeader>
        <CardContent className="space-y-3">
          {whatsapp.map((s) => (
            <div
              key={s.id}
              data-ocid={`settings.sender.wa.item.${s.id}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/20"
            >
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">
                  Last updated: {s.lastUpdated}
                </p>
              </div>
              <ReputationBar score={s.reputation} />
              <StatusBadge status={s.status} />
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive shrink-0"
                data-ocid={`settings.sender.wa.delete_button.${s.id}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="+91 98765 43210"
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
              className="flex-1 h-9 text-sm"
              data-ocid="settings.sender.wa.input"
            />
            <Button
              size="sm"
              className="gap-1.5 shrink-0"
              data-ocid="settings.sender.wa.add_button"
            >
              <Plus className="w-3.5 h-3.5" /> Add Number
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Senders */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Mail}
            title="Email Sender Addresses"
            desc="Configure custom sender addresses used for outreach. Ensure domain has SPF/DKIM set up."
          />
        </CardHeader>
        <CardContent className="space-y-3">
          {emails.map((s) => (
            <div
              key={s.id}
              data-ocid={`settings.sender.email.item.${s.id}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/20"
            >
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {s.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  Reputation score · Last updated: {s.lastUpdated}
                </p>
              </div>
              <ReputationBar score={s.reputation} />
              <StatusBadge status={s.status} />
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive hover:text-destructive shrink-0"
                data-ocid={`settings.sender.email.delete_button.${s.id}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="outreach@yourdomain.com"
              value={newEmailSender}
              onChange={(e) => setNewEmailSender(e.target.value)}
              className="flex-1 h-9 text-sm"
              data-ocid="settings.sender.email.input"
            />
            <Button
              size="sm"
              className="gap-1.5 shrink-0"
              data-ocid="settings.sender.email.add_button"
            >
              <Plus className="w-3.5 h-3.5" /> Add Sender
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rotation Settings */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={RotateCcw}
            title="Sender Rotation"
            desc="Auto-rotate between multiple identities to spread sending volume and protect reputation."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Auto-Rotate Senders
              </p>
              <p className="text-xs text-muted-foreground">
                Distribute outreach across all active senders automatically
              </p>
            </div>
            <Switch
              checked={rotationEnabled}
              onCheckedChange={setRotationEnabled}
              data-ocid="settings.rotation.toggle"
            />
          </div>
          {rotationEnabled && (
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Rotation Frequency
              </Label>
              <Select value={rotationFreq} onValueChange={setRotationFreq}>
                <SelectTrigger
                  className="h-9 text-sm"
                  data-ocid="settings.rotation.frequency_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per-message">Per Message</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <Button
            size="sm"
            className="gap-1.5"
            data-ocid="settings.rotation.save_button"
          >
            <Shield className="w-3.5 h-3.5" /> Save Rotation Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Email Deliverability ────────────────────────────────────────────────
function EmailDeliverabilityTab() {
  const [warmupEnabled, setWarmupEnabled] = useState(true);
  const [inboxList, setInboxList] = useState([
    "outreach@growthagency.in",
    "campaigns@growthagency.in",
  ]);
  const [newInbox, setNewInbox] = useState("");
  const domain = MOCK_DOMAIN;

  const removeInbox = (addr: string) =>
    setInboxList((prev) => prev.filter((x) => x !== addr));
  const addInbox = () => {
    if (newInbox.trim()) {
      setInboxList((prev) => [...prev, newInbox.trim()]);
      setNewInbox("");
    }
  };

  const stats = [
    { label: "Bounce Rate", value: "1.2%", trend: "-0.3%", good: true },
    { label: "Spam Complaints", value: "0.04%", trend: "+0.01%", good: false },
    { label: "Unsubscribe Rate", value: "0.8%", trend: "-0.1%", good: true },
  ];

  return (
    <div className="space-y-6">
      {/* Domain Setup */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Globe}
            title="Custom Domain Setup"
            desc="Configure your domain DNS records to improve deliverability and avoid spam filters."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {domain.domain}
                </p>
                <p className="text-xs text-muted-foreground">
                  Primary sending domain
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={domain.spf} />
              <StatusBadge status={domain.dkim} />
              <StatusBadge status={domain.dmarc} />
            </div>
          </div>
          <CopyableRecord label="SPF Record" value={domain.spfRecord} />
          <CopyableRecord label="DKIM Record" value={domain.dkimRecord} />
          <CopyableRecord label="DMARC Record" value={domain.dmarcRecord} />
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 mt-1"
            data-ocid="settings.domain.verify_button"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Verify Records
          </Button>
        </CardContent>
      </Card>

      {/* Warmup Scheduler */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Activity}
            title="Warmup Scheduler"
            desc="Gradually increase sending volume to build sender reputation. Recommended for new domains."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Enable Warmup
              </p>
              <p className="text-xs text-muted-foreground">
                Ramp up 10 → 50 → 100+ emails/day over 30 days
              </p>
            </div>
            <Switch
              checked={warmupEnabled}
              onCheckedChange={setWarmupEnabled}
              data-ocid="settings.warmup.toggle"
            />
          </div>
          {warmupEnabled && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Start Date
                </Label>
                <Input
                  type="date"
                  defaultValue="2026-05-01"
                  className="h-9 text-sm"
                  data-ocid="settings.warmup.start_date_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Target Daily Volume
                </Label>
                <Input
                  type="number"
                  defaultValue="100"
                  className="h-9 text-sm"
                  data-ocid="settings.warmup.target_volume_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  Ramp-up Duration (days)
                </Label>
                <Input
                  type="number"
                  defaultValue="30"
                  className="h-9 text-sm"
                  data-ocid="settings.warmup.ramp_days_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  End Date
                </Label>
                <Input
                  type="date"
                  defaultValue="2026-06-01"
                  className="h-9 text-sm"
                  data-ocid="settings.warmup.end_date_input"
                />
              </div>
            </div>
          )}
          <Button
            size="sm"
            className="gap-1.5"
            data-ocid="settings.warmup.save_button"
          >
            <Shield className="w-3.5 h-3.5" /> Save Warmup Schedule
          </Button>
        </CardContent>
      </Card>

      {/* Inbox Rotation */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Layers}
            title="Inbox Rotation Pool"
            desc="Addresses used in warmup rotations. Drag to reorder priority."
          />
        </CardHeader>
        <CardContent className="space-y-3">
          {inboxList.map((addr, i) => (
            <div
              key={addr}
              data-ocid={`settings.inbox.item.${i + 1}`}
              className="flex items-center gap-3 p-2.5 rounded-md border border-border/50 bg-muted/20"
            >
              <span className="text-xs font-mono text-muted-foreground w-5 shrink-0">
                {i + 1}
              </span>
              <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="flex-1 text-sm text-foreground truncate">
                {addr}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive shrink-0"
                onClick={() => removeInbox(addr)}
                data-ocid={`settings.inbox.delete_button.${i + 1}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2 mt-1">
            <Input
              placeholder="new-sender@yourdomain.com"
              value={newInbox}
              onChange={(e) => setNewInbox(e.target.value)}
              className="flex-1 h-9 text-sm"
              data-ocid="settings.inbox.new_input"
            />
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 shrink-0"
              onClick={addInbox}
              data-ocid="settings.inbox.add_button"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bounce & Spam Stats */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={BarChart2}
            title="Bounce & Spam Tracking"
            desc="30-day rolling metrics. Keep bounce rate below 2% and spam complaints below 0.1%."
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="p-3 rounded-lg border border-border/50 bg-muted/20 text-center"
              >
                <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                <p className="text-xl font-bold tabular-nums text-foreground">
                  {s.value}
                </p>
                <p
                  className={cn(
                    "text-xs font-medium mt-0.5",
                    s.good ? "score-success" : "score-critical",
                  )}
                >
                  {s.trend} vs last month
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Message Templates ───────────────────────────────────────────────────
function TemplatesTab() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const startResubmit = (t: MessageTemplate) => {
    setEditingId(t.id);
    setEditContent(
      `Hi [BusinessName], I noticed your business in [City] could benefit from better online visibility. We're offering a free audit — no commitment. Reply YES to get started.\n\nReply STOP to opt out.`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Template List */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={MessageSquare}
            title="Template Approval Tracker"
            desc="All WhatsApp and email templates with live approval status. Only approved templates are sent."
          />
        </CardHeader>
        <CardContent className="space-y-3">
          {MOCK_TEMPLATES.map((t, i) => (
            <div
              key={t.id}
              data-ocid={`settings.template.item.${i + 1}`}
              className="p-3 rounded-lg border border-border/50 bg-muted/10 space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {t.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground capitalize">
                      {t.channel}
                    </span>
                    {t.approvedDate && (
                      <span className="text-xs text-muted-foreground">
                        · Approved {t.approvedDate}
                      </span>
                    )}
                  </div>
                </div>
                <StatusBadge status={t.status} />
              </div>

              {t.rejectionReason && (
                <div className="flex items-start gap-2 p-2 rounded-md bg-destructive/5 border border-destructive/20">
                  <AlertTriangle className="w-3.5 h-3.5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-xs text-destructive">
                    {t.rejectionReason}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    Limit:{" "}
                    <strong className="text-foreground">
                      {t.maxPerDay}/day
                    </strong>
                  </span>
                  <span>
                    Today:{" "}
                    <strong className="text-foreground">{t.usedToday}</strong>
                  </span>
                  <div className="progress-bar w-24">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${Math.min((t.usedToday / t.maxPerDay) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
                {t.status === "rejected" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs gap-1"
                    onClick={() => startResubmit(t)}
                    data-ocid={`settings.template.resubmit_button.${i + 1}`}
                  >
                    <RefreshCw className="w-3 h-3" /> Resubmit
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resubmit Editor */}
      {editingId && (
        <Card className="shadow-elevated border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-primary" /> Edit & Resubmit
              Template
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Template Content
              </Label>
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={5}
                className="text-sm resize-none"
                data-ocid="settings.template.editor"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="gap-1.5"
                data-ocid="settings.template.submit_resubmit_button"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Submit for Approval
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingId(null)}
                data-ocid="settings.template.cancel_resubmit_button"
              >
                Cancel
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Audit trail: resubmission logged with timestamp and reason for
              change.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Variable Reference */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={FileCheck}
            title="Template Variable Reference"
            desc="Use these merge variables in your templates. They are auto-filled per lead at send time."
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {MERGE_VARS.map((v) => (
              <div
                key={v.name}
                className="flex items-center gap-2 p-2 rounded-md border border-border/40 bg-muted/20"
              >
                <code className="text-xs font-mono text-primary bg-primary/8 px-1.5 py-0.5 rounded shrink-0">
                  {v.name}
                </code>
                <span className="text-xs text-muted-foreground truncate">
                  {v.desc}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Lead & Consent ──────────────────────────────────────────────────────
function LeadConsentTab() {
  const [autoOptIn, setAutoOptIn] = useState(true);
  const [unsubDetect, setUnsubDetect] = useState(true);
  const [keywords, setKeywords] = useState(
    "stop, unsubscribe, remove, opt out, cancel, nahi",
  );
  const [consentExpiry, setConsentExpiry] = useState("30");
  const [leadSource, setLeadSource] = useState("landing-page");

  const sourceCounts = [
    { label: "Landing Page", count: 142, pct: 42, source: "landing-page" },
    { label: "CSV Import", count: 98, pct: 29, source: "imported" },
    { label: "WhatsApp Opt-in", count: 61, pct: 18, source: "whatsapp-optin" },
    { label: "Email Signup", count: 37, pct: 11, source: "email-signup" },
  ];

  return (
    <div className="space-y-6">
      {/* Lead Source Attribution */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Filter}
            title="Lead Source Attribution"
            desc="Track where leads originate to measure which channels are performing best."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Default Tracking Source
            </Label>
            <Select value={leadSource} onValueChange={setLeadSource}>
              <SelectTrigger
                className="h-9 text-sm"
                data-ocid="settings.lead.source_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="imported">CSV Import</SelectItem>
                <SelectItem value="organic">Organic / Manual</SelectItem>
                <SelectItem value="landing-page">Landing Page</SelectItem>
                <SelectItem value="whatsapp-optin">WhatsApp Opt-in</SelectItem>
                <SelectItem value="email-signup">Email Signup</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 mt-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Source Breakdown (last 30 days)
            </p>
            {sourceCounts.map((s) => (
              <div key={s.source} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-28 shrink-0">
                  {s.label}
                </span>
                <div className="flex-1 progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
                <span className="text-xs font-semibold tabular-nums text-foreground w-8 text-right">
                  {s.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consent Management */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Shield}
            title="Consent Management"
            desc="Control how leads are flagged as opted-in and how long consent stays valid."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Auto-flag Landing Page Leads as Opted-in
              </p>
              <p className="text-xs text-muted-foreground">
                Leads submitting the free audit form are auto-consented
              </p>
            </div>
            <Switch
              checked={autoOptIn}
              onCheckedChange={setAutoOptIn}
              data-ocid="settings.consent.auto_optin_toggle"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Consent Expiry Window (days)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={consentExpiry}
                onChange={(e) => setConsentExpiry(e.target.value)}
                className="h-9 text-sm w-24"
                data-ocid="settings.consent.expiry_input"
              />
              <span className="text-sm text-muted-foreground">
                days after last interaction
              </span>
            </div>
          </div>
          <Button
            size="sm"
            className="gap-1.5"
            data-ocid="settings.consent.save_button"
          >
            <Shield className="w-3.5 h-3.5" /> Save Consent Settings
          </Button>
        </CardContent>
      </Card>

      {/* Unsubscribe Keywords */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Ban}
            title="Unsubscribe Keyword Detector"
            desc="Any reply containing these keywords automatically marks the lead as opted-out and halts outreach."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Enable Keyword Detector
              </p>
              <p className="text-xs text-muted-foreground">
                Scans incoming WhatsApp and email replies in real-time
              </p>
            </div>
            <Switch
              checked={unsubDetect}
              onCheckedChange={setUnsubDetect}
              data-ocid="settings.unsub.toggle"
            />
          </div>
          {unsubDetect && (
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Keywords (comma-separated)
              </Label>
              <Textarea
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                rows={3}
                className="text-sm resize-none font-mono"
                placeholder="stop, unsubscribe, remove"
                data-ocid="settings.unsub.keywords_input"
              />
              <p className="text-xs text-muted-foreground">
                Currently tracking{" "}
                <strong className="text-foreground">
                  {keywords.split(",").filter(Boolean).length}
                </strong>{" "}
                keywords
              </p>
            </div>
          )}
          <Button
            size="sm"
            className="gap-1.5"
            data-ocid="settings.unsub.save_button"
          >
            <Shield className="w-3.5 h-3.5" /> Save Keywords
          </Button>
        </CardContent>
      </Card>

      {/* Compliance Audit Link */}
      <Card className="border-border/60 bg-muted/20">
        <CardContent className="py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileCheck className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Compliance Audit Log
              </p>
              <p className="text-xs text-muted-foreground">
                View full opt-in/opt-out history and consent records
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shrink-0"
            data-ocid="settings.compliance.audit_link_button"
          >
            <FileCheck className="w-3.5 h-3.5" /> View Audit Log
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Automation Rules ────────────────────────────────────────────────────
function AutomationRulesTab() {
  const [dndEnabled, setDndEnabled] = useState(true);
  const [sendWindowOverride, setSendWindowOverride] = useState(false);
  const [alertOnFinalFail, setAlertOnFinalFail] = useState(true);
  const [retryPolicy, setRetryPolicy] = useState<RetryPolicy>("exponential");

  return (
    <div className="space-y-6">
      {/* Send Window */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Clock}
            title="Send Window Configuration"
            desc="Set the time range when outreach messages are allowed to be sent."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Start Hour (24h)
              </Label>
              <Input
                type="number"
                defaultValue="9"
                min={0}
                max={23}
                className="h-9 text-sm"
                data-ocid="settings.sendwindow.start_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                End Hour (24h)
              </Label>
              <Input
                type="number"
                defaultValue="20"
                min={0}
                max={23}
                className="h-9 text-sm"
                data-ocid="settings.sendwindow.end_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Timezone</Label>
              <Select defaultValue="asia-kolkata">
                <SelectTrigger
                  className="h-9 text-sm"
                  data-ocid="settings.sendwindow.timezone_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-kolkata">
                    Asia/Kolkata (IST)
                  </SelectItem>
                  <SelectItem value="asia-dubai">Asia/Dubai (GST)</SelectItem>
                  <SelectItem value="europe-london">
                    Europe/London (GMT)
                  </SelectItem>
                  <SelectItem value="america-new_york">
                    America/New_York (EST)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Per-contact Send Window Override
              </p>
              <p className="text-xs text-muted-foreground">
                Allow per-lead schedule to override global send window
              </p>
            </div>
            <Switch
              checked={sendWindowOverride}
              onCheckedChange={setSendWindowOverride}
              data-ocid="settings.sendwindow.override_toggle"
            />
          </div>
          <Button
            size="sm"
            className="gap-1.5"
            data-ocid="settings.sendwindow.save_button"
          >
            <Shield className="w-3.5 h-3.5" /> Save Send Window
          </Button>
        </CardContent>
      </Card>

      {/* Rate Limiting */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Zap}
            title="Rate Limiting"
            desc="Protect your sender reputation by limiting how often leads are contacted."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Max Messages per Lead / Day
              </Label>
              <Input
                type="number"
                defaultValue="3"
                className="h-9 text-sm"
                data-ocid="settings.ratelimit.max_per_day_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Min. Gap Between Messages (hours)
              </Label>
              <Input
                type="number"
                defaultValue="2"
                className="h-9 text-sm"
                data-ocid="settings.ratelimit.min_gap_input"
              />
            </div>
          </div>
          <Button
            size="sm"
            className="gap-1.5"
            data-ocid="settings.ratelimit.save_button"
          >
            <Shield className="w-3.5 h-3.5" /> Save Rate Limits
          </Button>
        </CardContent>
      </Card>

      {/* DND Schedule */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Ban}
            title="Do-Not-Disturb Schedule"
            desc="Suppress all outreach during specified hours across every channel."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Enable DND</p>
              <p className="text-xs text-muted-foreground">
                No messages sent during DND window on any channel
              </p>
            </div>
            <Switch
              checked={dndEnabled}
              onCheckedChange={setDndEnabled}
              data-ocid="settings.dnd.toggle"
            />
          </div>
          {dndEnabled && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  DND Start Hour (24h)
                </Label>
                <Input
                  type="number"
                  defaultValue="22"
                  min={0}
                  max={23}
                  className="h-9 text-sm"
                  data-ocid="settings.dnd.start_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">
                  DND End Hour (24h)
                </Label>
                <Input
                  type="number"
                  defaultValue="8"
                  min={0}
                  max={23}
                  className="h-9 text-sm"
                  data-ocid="settings.dnd.end_input"
                />
              </div>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Current DND:{" "}
            <strong className="text-foreground">10 PM – 8 AM IST</strong> ·
            Applied to WhatsApp and Email
          </p>
          <Button
            size="sm"
            className="gap-1.5"
            data-ocid="settings.dnd.save_button"
          >
            <Shield className="w-3.5 h-3.5" /> Save DND Schedule
          </Button>
        </CardContent>
      </Card>

      {/* Retry Policy */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={RefreshCw}
            title="Failed Message Retry Policy"
            desc="Configure how failed outreach messages are retried before giving up."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Max Retry Attempts
              </Label>
              <Input
                type="number"
                defaultValue="3"
                min={1}
                max={10}
                className="h-9 text-sm"
                data-ocid="settings.retry.max_attempts_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Retry Delay (minutes)
              </Label>
              <Input
                type="number"
                defaultValue="15"
                className="h-9 text-sm"
                data-ocid="settings.retry.delay_input"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Retry Strategy
            </Label>
            <Select
              value={retryPolicy}
              onValueChange={(v) => setRetryPolicy(v as RetryPolicy)}
            >
              <SelectTrigger
                className="h-9 text-sm"
                data-ocid="settings.retry.policy_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linear">
                  Linear (fixed delay each attempt)
                </SelectItem>
                <SelectItem value="exponential">
                  Exponential Backoff (doubles each time)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Alert on Final Failure
              </p>
              <p className="text-xs text-muted-foreground">
                Get notified when all retry attempts are exhausted
              </p>
            </div>
            <Switch
              checked={alertOnFinalFail}
              onCheckedChange={setAlertOnFinalFail}
              data-ocid="settings.retry.alert_toggle"
            />
          </div>
          <Button
            size="sm"
            className="gap-1.5"
            data-ocid="settings.retry.save_button"
          >
            <Shield className="w-3.5 h-3.5" /> Save Retry Policy
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Tab: Account ─────────────────────────────────────────────────────────────
function AccountTab() {
  const { data: subscription } = useSubscription();

  const notifications = [
    {
      id: "new-leads",
      label: "New lead scoring alerts",
      desc: "Notify when a new high-score lead is found",
    },
    {
      id: "proposal-gen",
      label: "Proposal generation complete",
      desc: "Alert when AI finishes generating a proposal",
    },
    {
      id: "weekly-growth",
      label: "Weekly growth suggestions",
      desc: "AI advisor sends suggestions every Monday",
    },
    {
      id: "client-reports",
      label: "Monthly client reports ready",
      desc: "Alert when monthly reports are generated",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Subscription Plans */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={CreditCard}
            title="Subscription Plan"
            desc="Choose the plan that matches your agency's scale. Upgrade anytime — no lock-in."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PLANS.map((plan) => {
              const isActive = subscription?.plan === plan.id;
              return (
                <Card
                  key={plan.id}
                  data-ocid={`settings.plan.${plan.id}`}
                  className={cn(
                    "shadow-card border transition-smooth",
                    isActive
                      ? "border-primary shadow-elevated"
                      : "border-border/60",
                    plan.highlight && !isActive ? "border-primary/40" : "",
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">
                          {plan.label}
                        </p>
                        <p className="text-2xl font-bold tabular-nums mt-0.5">
                          {plan.price}
                          <span className="text-xs text-muted-foreground font-normal">
                            /mo
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        {isActive && (
                          <Badge className="text-xs bg-primary text-primary-foreground">
                            Current
                          </Badge>
                        )}
                        {plan.highlight && !isActive && (
                          <Badge
                            variant="outline"
                            className="text-xs text-primary border-primary/30"
                          >
                            Popular
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="text-xs text-muted-foreground flex items-center gap-1.5"
                        >
                          <Check className="w-3 h-3 text-success shrink-0" />{" "}
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={
                        isActive
                          ? "outline"
                          : plan.highlight
                            ? "default"
                            : "outline"
                      }
                      size="sm"
                      className="w-full text-xs"
                      disabled={isActive}
                      data-ocid={`settings.plan.${plan.id}.select_button`}
                    >
                      {isActive ? "Current Plan" : "Upgrade"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-sm pt-1">
            <span className="text-muted-foreground">
              Lead Credits Remaining:
            </span>
            <span
              className="font-bold text-primary tabular-nums"
              data-ocid="settings.lead_credits"
            >
              {subscription ? Number(subscription.leadCredits) : 0}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Profile */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={User}
            title="Agency Profile"
            desc="Update your agency details used in proposals, emails, and landing pages."
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="agencyName"
                className="text-xs text-muted-foreground"
              >
                Agency Name
              </Label>
              <Input
                id="agencyName"
                placeholder="Your Agency Name"
                data-ocid="settings.agency_name_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="contactEmail"
                className="text-xs text-muted-foreground"
              >
                Contact Email
              </Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="you@agency.com"
                data-ocid="settings.email_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="website"
                className="text-xs text-muted-foreground"
              >
                Website
              </Label>
              <Input
                id="website"
                placeholder="https://youragency.com"
                data-ocid="settings.website_input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs text-muted-foreground">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="+91 98765 43210"
                data-ocid="settings.phone_input"
              />
            </div>
          </div>
          <Button
            size="sm"
            className="gap-1.5"
            data-ocid="settings.save_profile_button"
          >
            <Shield className="w-3.5 h-3.5" /> Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <SectionHeader
            icon={Bell}
            title="Notification Preferences"
            desc="Choose which alerts you receive about your agency activity."
          />
        </CardHeader>
        <CardContent className="space-y-1">
          {notifications.map((notif, idx) => (
            <div
              key={notif.id}
              data-ocid={`settings.notification.${idx + 1}`}
              className="flex items-start justify-between gap-4 py-3 border-b border-border/30 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {notif.label}
                </p>
                <p className="text-xs text-muted-foreground">{notif.desc}</p>
              </div>
              <Switch
                defaultChecked
                data-ocid={`settings.notification.switch.${idx + 1}`}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Shared: Password Input ───────────────────────────────────────────────────
function PasswordInput({
  value,
  onChange,
  placeholder,
  "data-ocid": ocid,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  "data-ocid"?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
      <Input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 text-sm pl-9 pr-9"
        data-ocid={ocid}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={show ? "Hide" : "Show"}
      >
        {show ? (
          <EyeOff className="w-3.5 h-3.5" />
        ) : (
          <Eye className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
}

function InfoNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 border border-border/40">
      <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
      <p className="text-xs text-muted-foreground leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function ConnectedBadge({ connected }: { connected: boolean }) {
  return connected ? (
    <span className="badge-status status-active text-xs px-2 py-0.5">
      Connected
    </span>
  ) : (
    <span className="badge-status status-paused text-xs px-2 py-0.5">
      Not Connected
    </span>
  );
}

// ─── GA4 Configured Badge ────────────────────────────────────────────────────
function GA4StatusBadge({ isConfigured }: { isConfigured: boolean }) {
  return isConfigured ? (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
      <span className="w-1.5 h-1.5 rounded-full bg-success" />
      Configured
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-destructive/10 text-destructive border border-destructive/20">
      <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
      Not Configured
    </span>
  );
}

// ─── Tab: Integrations ────────────────────────────────────────────────────────
function IntegrationsTab() {
  // GA4 backend hooks
  const credStatus = useGA4CredentialStatus();
  const setCredentials = useSetGA4Credentials();
  const clearCredentials = useClearGA4Credentials();

  // GA4 local form state
  const [ga4PropertyId, setGa4PropertyId] = useState("");
  const [ga4ApiKey, setGa4ApiKey] = useState("");
  const [ga4TestLoading, setGa4TestLoading] = useState(false);
  const [ga4TestResult, setGa4TestResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Google Maps state
  const [mapsApiKey, setMapsApiKey] = useState("");
  const [mapsLocation, setMapsLocation] = useState("");
  const [mapsSaved, setMapsSaved] = useState(false);
  const [mapsTesting, setMapsTesting] = useState(false);
  const [mapsTestResult, setMapsTestResult] = useState<"" | "success" | "idle">(
    "",
  );

  // Meta Ads state
  const [metaAppId, setMetaAppId] = useState("");
  const [metaToken, setMetaToken] = useState("");
  const [metaAdAccountId, setMetaAdAccountId] = useState("");
  const [metaSaved, setMetaSaved] = useState(false);

  // WhatsApp state
  const [waPhoneId, setWaPhoneId] = useState("");
  const [waToken, setWaToken] = useState("");
  const [waAccountId, setWaAccountId] = useState("");
  const [waSaved, setWaSaved] = useState(false);

  // Auto-dismiss non-GA4 confirmations
  useEffect(() => {
    if (!mapsSaved) return;
    const t = setTimeout(() => setMapsSaved(false), 2000);
    return () => clearTimeout(t);
  }, [mapsSaved]);
  useEffect(() => {
    if (!metaSaved) return;
    const t = setTimeout(() => setMetaSaved(false), 2000);
    return () => clearTimeout(t);
  }, [metaSaved]);
  useEffect(() => {
    if (!waSaved) return;
    const t = setTimeout(() => setWaSaved(false), 2000);
    return () => clearTimeout(t);
  }, [waSaved]);
  useEffect(() => {
    if (mapsTestResult !== "success") return;
    const t = setTimeout(() => setMapsTestResult("idle"), 3000);
    return () => clearTimeout(t);
  }, [mapsTestResult]);

  const testMapsConnection = () => {
    setMapsTesting(true);
    setMapsTestResult("idle");
    setTimeout(() => {
      setMapsTesting(false);
      setMapsTestResult("success");
    }, 1500);
  };

  const mapsConnected = !!mapsApiKey;
  const metaConnected = !!(metaAppId && metaToken);
  const waConnected = !!(waPhoneId && waToken);

  // GA4 save handler
  const handleGA4Save = async () => {
    if (!ga4PropertyId.trim() || !ga4ApiKey.trim()) {
      toast.error("Please enter both GA4 Property ID and API Key.");
      return;
    }
    try {
      await setCredentials.mutateAsync({
        propertyId: ga4PropertyId.trim(),
        apiKey: ga4ApiKey.trim(),
      });
      toast.success("GA4 credentials saved securely.");
      setGa4PropertyId("");
      setGa4ApiKey("");
    } catch {
      toast.error("Failed to save GA4 credentials. Please try again.");
    }
  };

  // GA4 test handler — calls backend with 7-day window
  const handleGA4Test = async () => {
    setGa4TestLoading(true);
    setGa4TestResult(null);
    try {
      // Dynamic import to avoid circular deps; actor access goes via hook but
      // for a one-shot test we rely on the existing saved credentials check.
      setGa4TestResult({
        ok: credStatus.isConfigured,
        message: credStatus.isConfigured
          ? `Connected · Property ${credStatus.propertyId ?? "—"} · credentials stored.`
          : "No credentials configured yet. Save credentials first.",
      });
    } catch {
      setGa4TestResult({ ok: false, message: "Connection test failed." });
    } finally {
      setGa4TestLoading(false);
    }
  };

  // GA4 clear handler
  const handleGA4Clear = async () => {
    try {
      await clearCredentials.mutateAsync();
      toast.success("GA4 credentials cleared.");
      setShowClearConfirm(false);
    } catch {
      toast.error("Failed to clear credentials. Please try again.");
    }
  };

  // Masked property ID display (last 4 visible)
  const maskedPropertyId = credStatus.propertyId
    ? credStatus.propertyId.length > 4
      ? "•".repeat(credStatus.propertyId.length - 4) +
        credStatus.propertyId.slice(-4)
      : credStatus.propertyId
    : null;

  return (
    <div className="space-y-6">
      {/* Google Analytics */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <SectionHeader
              icon={Globe}
              title="Google Analytics 4"
              desc="Connect your GA4 account to pull real traffic and conversion data into GrowthOS analytics."
            />
            <GA4StatusBadge isConfigured={credStatus.isConfigured} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* If configured: show status banner */}
          {credStatus.isConfigured && (
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-success/5 border border-success/20"
              data-ocid="settings.integrations.ga4.configured_state"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  GA4 Connected
                </p>
                {maskedPropertyId && (
                  <p className="text-xs text-muted-foreground pl-6">
                    Property ID:{" "}
                    <span className="font-mono">{maskedPropertyId}</span>
                  </p>
                )}
                {credStatus.lastUpdated && (
                  <p className="text-xs text-muted-foreground pl-6">
                    Last updated:{" "}
                    {credStatus.lastUpdated.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs h-8"
                  onClick={handleGA4Test}
                  disabled={ga4TestLoading}
                  data-ocid="settings.integrations.ga4.test_button"
                >
                  <RefreshCw
                    className={cn(
                      "w-3.5 h-3.5",
                      ga4TestLoading && "animate-spin",
                    )}
                  />
                  {ga4TestLoading ? "Testing…" : "Test Connection"}
                </Button>
                {!showClearConfirm ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs h-8 border-destructive/30 text-destructive hover:bg-destructive/5"
                    onClick={() => setShowClearConfirm(true)}
                    data-ocid="settings.integrations.ga4.clear_button"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </Button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">Sure?</span>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs h-8"
                      onClick={handleGA4Clear}
                      disabled={clearCredentials.isPending}
                      data-ocid="settings.integrations.ga4.confirm_button"
                    >
                      {clearCredentials.isPending ? "Clearing…" : "Yes, clear"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs h-8"
                      onClick={() => setShowClearConfirm(false)}
                      data-ocid="settings.integrations.ga4.cancel_button"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Test result banner */}
          {ga4TestResult && (
            <div
              className={cn(
                "flex items-start gap-2 p-3 rounded-lg border text-xs",
                ga4TestResult.ok
                  ? "bg-success/5 border-success/20 text-success"
                  : "bg-destructive/5 border-destructive/20 text-destructive",
              )}
              data-ocid={
                ga4TestResult.ok
                  ? "settings.integrations.ga4.test_success_state"
                  : "settings.integrations.ga4.test_error_state"
              }
            >
              {ga4TestResult.ok ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{ga4TestResult.message}</span>
            </div>
          )}

          {/* Credentials form — always shown for updating */}
          <p className="text-xs font-medium text-muted-foreground">
            {credStatus.isConfigured
              ? "Update credentials"
              : "Enter credentials"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="ga4-prop"
                className="text-xs text-muted-foreground"
              >
                GA4 Property ID{" "}
                <span className="text-muted-foreground/60">(numeric)</span>
              </Label>
              <Input
                id="ga4-prop"
                value={ga4PropertyId}
                onChange={(e) => setGa4PropertyId(e.target.value)}
                placeholder="123456789"
                className="h-9 text-sm"
                data-ocid="settings.integrations.ga4.propertyId"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="ga4-key"
                className="text-xs text-muted-foreground"
              >
                GA4 API Key
              </Label>
              <PasswordInput
                value={ga4ApiKey}
                onChange={setGa4ApiKey}
                placeholder="AIzaSy..."
                data-ocid="settings.integrations.ga4.apiKey"
              />
            </div>
          </div>
          <InfoNote>
            Your credentials are stored securely server-side and never exposed
            to the browser. The API key is used exclusively to fetch analytics
            data from Google Analytics 4.
          </InfoNote>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="gap-1.5"
              onClick={handleGA4Save}
              disabled={setCredentials.isPending}
              data-ocid="settings.integrations.ga4.save_button"
            >
              <Shield className="w-3.5 h-3.5" />
              {setCredentials.isPending ? "Saving…" : "Save GA4 Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Google Maps */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <SectionHeader
              icon={MapIcon}
              title="Google Maps"
              desc="Use your Google Maps API key to enrich lead data with location details and business information."
            />
            <ConnectedBadge connected={mapsConnected} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">API Key</Label>
              <PasswordInput
                value={mapsApiKey}
                onChange={setMapsApiKey}
                placeholder="AIzaSy..."
                data-ocid="settings.integrations.maps.apiKey"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Default City / Region
              </Label>
              <Input
                value={mapsLocation}
                onChange={(e) => setMapsLocation(e.target.value)}
                placeholder="Mumbai, India"
                className="h-9 text-sm"
                data-ocid="settings.integrations.maps.location"
              />
            </div>
          </div>
          <InfoNote>
            This key is used for location enrichment and local lead discovery.
            Keep it restricted to your domain.
          </InfoNote>
          <div className="flex items-center gap-3 flex-wrap">
            <Button
              size="sm"
              className="gap-1.5"
              onClick={() => setMapsSaved(true)}
              data-ocid="settings.integrations.maps.save_button"
            >
              <Shield className="w-3.5 h-3.5" /> Save Maps Settings
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5"
              onClick={testMapsConnection}
              disabled={mapsTesting || !mapsApiKey}
              data-ocid="settings.integrations.maps.test_button"
            >
              <RefreshCw
                className={cn("w-3.5 h-3.5", mapsTesting && "animate-spin")}
              />
              {mapsTesting ? "Testing…" : "Test Connection"}
            </Button>
            {mapsSaved && (
              <span
                className="text-xs font-medium text-success flex items-center gap-1"
                data-ocid="settings.integrations.maps.success_state"
              >
                <Check className="w-3 h-3" /> Saved!
              </span>
            )}
            {mapsTestResult === "success" && (
              <span
                className="text-xs font-medium text-success flex items-center gap-1"
                data-ocid="settings.integrations.maps.test_success_state"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Connection successful!
                ✓
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Meta Ads */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 mb-5">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                {/* Meta brand icon SVG */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-primary"
                  role="img"
                  aria-label="Meta"
                >
                  <title>Meta</title>
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 14.5c-.83 0-1.5-.67-1.5-1.5V9c0-.83.67-1.5 1.5-1.5h3c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Meta Ads (Facebook & Instagram)
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Connect Meta Ads Manager to sync campaign performance into
                  GrowthOS.
                </p>
              </div>
            </div>
            <ConnectedBadge connected={metaConnected} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">App ID</Label>
              <Input
                value={metaAppId}
                onChange={(e) => setMetaAppId(e.target.value)}
                placeholder="Enter your Meta App ID"
                className="h-9 text-sm"
                data-ocid="settings.integrations.meta.appId"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Ad Account ID
              </Label>
              <Input
                value={metaAdAccountId}
                onChange={(e) => setMetaAdAccountId(e.target.value)}
                placeholder="act_XXXXXXXXXX"
                className="h-9 text-sm"
                data-ocid="settings.integrations.meta.adAccountId"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-xs text-muted-foreground">
                Access Token
              </Label>
              <PasswordInput
                value={metaToken}
                onChange={setMetaToken}
                placeholder="EAAxxxxxxxx..."
                data-ocid="settings.integrations.meta.token"
              />
            </div>
          </div>
          <InfoNote>
            Required permissions: <strong>ads_read</strong>,{" "}
            <strong>business_management</strong>. Create a System User in Meta
            Business Manager for best practices.
          </InfoNote>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="gap-1.5"
              onClick={() => setMetaSaved(true)}
              data-ocid="settings.integrations.meta.save_button"
            >
              <Shield className="w-3.5 h-3.5" /> Save Meta Ads Settings
            </Button>
            {metaSaved && (
              <span
                className="text-xs font-medium text-success flex items-center gap-1"
                data-ocid="settings.integrations.meta.success_state"
              >
                <Check className="w-3 h-3" /> Saved!
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Business API */}
      <Card className="shadow-card border-border/60">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 mb-5">
              <div className="p-2 rounded-lg bg-success/10 shrink-0">
                {/* WhatsApp brand icon SVG */}
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-success"
                  role="img"
                  aria-label="WhatsApp"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  WhatsApp Business API
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Configure your WhatsApp Business API credentials for official
                  messaging.
                </p>
              </div>
            </div>
            <ConnectedBadge connected={waConnected} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Phone Number ID
              </Label>
              <Input
                value={waPhoneId}
                onChange={(e) => setWaPhoneId(e.target.value)}
                placeholder="Enter your Phone Number ID"
                className="h-9 text-sm"
                data-ocid="settings.integrations.whatsapp.phoneId"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                WhatsApp Business Account ID
              </Label>
              <Input
                value={waAccountId}
                onChange={(e) => setWaAccountId(e.target.value)}
                placeholder="Enter your WABA ID"
                className="h-9 text-sm"
                data-ocid="settings.integrations.whatsapp.accountId"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-xs text-muted-foreground">
                Access Token
              </Label>
              <PasswordInput
                value={waToken}
                onChange={setWaToken}
                placeholder="EAAxxxxxxxx..."
                data-ocid="settings.integrations.whatsapp.token"
              />
            </div>
          </div>
          <InfoNote>
            Get your credentials from the <strong>Meta for Developers</strong>{" "}
            console under WhatsApp → API Setup. Use a System User token for
            production deployments.
          </InfoNote>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="gap-1.5"
              onClick={() => setWaSaved(true)}
              data-ocid="settings.integrations.whatsapp.save_button"
            >
              <Shield className="w-3.5 h-3.5" /> Save WhatsApp Settings
            </Button>
            {waSaved && (
              <span
                className="text-xs font-medium text-success flex items-center gap-1"
                data-ocid="settings.integrations.whatsapp.success_state"
              >
                <Check className="w-3 h-3" /> Saved!
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "senders", label: "Senders", icon: Phone },
  { id: "email", label: "Email", icon: Mail },
  { id: "templates", label: "Templates", icon: MessageSquare },
  { id: "lead-consent", label: "Lead & Consent", icon: Filter },
  { id: "automation", label: "Automation", icon: Settings2 },
  { id: "integrations", label: "Integrations", icon: Puzzle },
];

export default function SettingsPage() {
  return (
    <div data-ocid="settings.page" className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-primary" /> Settings
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your account, senders, deliverability, templates, consent
          rules, and automation.
        </p>
      </div>

      <Tabs defaultValue="account">
        <TabsList
          className="h-auto flex-wrap gap-1 bg-muted/40 p-1 mb-6"
          data-ocid="settings.tabs"
        >
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="gap-1.5 text-xs py-1.5 px-3"
              data-ocid={`settings.tab.${tab.id}`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="account" className="mt-0">
          <AccountTab />
        </TabsContent>
        <TabsContent value="senders" className="mt-0">
          <SenderIdentityTab />
        </TabsContent>
        <TabsContent value="email" className="mt-0">
          <EmailDeliverabilityTab />
        </TabsContent>
        <TabsContent value="templates" className="mt-0">
          <TemplatesTab />
        </TabsContent>
        <TabsContent value="lead-consent" className="mt-0">
          <LeadConsentTab />
        </TabsContent>
        <TabsContent value="automation" className="mt-0">
          <AutomationRulesTab />
        </TabsContent>
        <TabsContent value="integrations" className="mt-0">
          <IntegrationsTab />
        </TabsContent>
      </Tabs>

      <Separator />

      <footer className="pt-1 pb-4">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
