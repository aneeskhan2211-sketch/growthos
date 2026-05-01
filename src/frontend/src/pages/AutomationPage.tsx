import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  ArrowDown,
  BarChart2,
  Bell,
  Bot,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  FileText,
  Filter,
  Layers,
  Mail,
  MessageSquare,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Repeat2,
  Sparkles,
  Target,
  Timer,
  TrendingDown,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";

// ─── Types ────────────────────────────────────────────────────────────────────

type AutomationCategory =
  | "outreach"
  | "followup"
  | "reporting"
  | "crm"
  | "alert";
type AutomationStatus = "active" | "paused";
type RunStatus = "Success" | "Failed" | "Partial";

interface ActionBlock {
  id: string;
  type: "whatsapp" | "email" | "crm" | "task" | "wait" | "notify";
  label: string;
  config: string;
}

interface Automation {
  id: string;
  name: string;
  trigger: string;
  triggerDetail: string;
  category: AutomationCategory;
  actions: ActionBlock[];
  status: AutomationStatus;
  lastRun: string;
  runsToday: number;
  totalRuns: number;
  successRate: number;
}

interface ExecRun {
  id: string;
  automation: string;
  trigger: string;
  timestamp: string;
  leadsAffected: number;
  status: RunStatus;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  steps: number;
  useCase: string;
  category: AutomationCategory;
  actions: ActionBlock[];
  trigger: string;
  triggerDetail: string;
}

type TriggerOption = { value: string; label: string };
type ConditionOption = { value: string; label: string };
type ActionOption = {
  value: ActionBlock["type"];
  label: string;
  config: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TRIGGER_OPTIONS: TriggerOption[] = [
  { value: "new_lead", label: "New Lead Added" },
  { value: "proposal_viewed", label: "Proposal Viewed" },
  { value: "lead_replied", label: "Lead Replied" },
  { value: "scheduled", label: "Scheduled Time" },
  { value: "traffic_drop", label: "Traffic Drop" },
];

const CONDITION_OPTIONS: ConditionOption[] = [
  { value: "score_70", label: "Lead Score > 70" },
  { value: "city_mumbai", label: "City = Mumbai" },
  { value: "industry_restaurant", label: "Industry = Restaurant" },
  { value: "none", label: "No condition (always run)" },
];

const ACTION_OPTIONS: ActionOption[] = [
  {
    value: "whatsapp",
    label: "Send WhatsApp",
    config: "Template: Welcome message",
  },
  {
    value: "email",
    label: "Send Email",
    config: "Subject: Quick idea for you",
  },
  { value: "crm", label: "Update CRM Stage", config: "Stage: Contacted" },
  { value: "task", label: "Create Task", config: "Assign to: Me" },
  { value: "wait", label: "Wait X Days", config: "Duration: 24 hours" },
  { value: "notify", label: "Send Notification", config: "Alert user in-app" },
];

const ACTION_ICONS: Record<ActionBlock["type"], typeof Zap> = {
  whatsapp: MessageSquare,
  email: Mail,
  crm: Target,
  task: Briefcase,
  wait: Timer,
  notify: Bell,
};

const ACTION_COLORS: Record<ActionBlock["type"], string> = {
  whatsapp: "bg-success/10 text-success",
  email: "bg-primary/10 text-primary",
  crm: "bg-chart-5/10 text-chart-5",
  task: "bg-warning/10 text-warning",
  wait: "bg-muted text-muted-foreground",
  notify: "bg-chart-4/10 text-chart-4",
};

const CATEGORY_COLORS: Record<AutomationCategory, string> = {
  outreach: "bg-primary/10 text-primary",
  followup: "bg-warning/10 text-warning",
  reporting: "bg-success/10 text-success",
  crm: "bg-chart-5/10 text-chart-5",
  alert: "bg-destructive/10 text-destructive",
};

const CATEGORY_ICONS: Record<AutomationCategory, typeof Zap> = {
  outreach: MessageSquare,
  followup: Repeat2,
  reporting: BarChart2,
  crm: Target,
  alert: AlertTriangle,
};

const AUTOMATIONS: Automation[] = [
  {
    id: "a1",
    name: "New Lead Welcome Sequence",
    trigger: "New Lead Added",
    triggerDetail:
      "Fires when a new lead with score > 60 is imported or captured",
    category: "outreach",
    status: "active",
    lastRun: "12 min ago",
    runsToday: 14,
    totalRuns: 312,
    successRate: 96,
    actions: [
      {
        id: "x1",
        type: "whatsapp",
        label: "Send WhatsApp",
        config: "Template: Welcome pitch",
      },
      {
        id: "x2",
        type: "wait",
        label: "Wait 24h",
        config: "Duration: 24 hours",
      },
      {
        id: "x3",
        type: "email",
        label: "Send Email",
        config: "Subject: Quick idea for your business",
      },
      {
        id: "x4",
        type: "crm",
        label: "Add to CRM",
        config: "Stage: Contacted",
      },
    ],
  },
  {
    id: "a2",
    name: "Follow-up Sequence",
    trigger: "No Reply After 48h",
    triggerDetail: "Fires 48 hours after first contact with no reply detected",
    category: "followup",
    status: "active",
    lastRun: "2 hrs ago",
    runsToday: 28,
    totalRuns: 1087,
    successRate: 88,
    actions: [
      {
        id: "x1",
        type: "whatsapp",
        label: "Send Reminder",
        config: "Template: Follow-up #2",
      },
      {
        id: "x2",
        type: "crm",
        label: "Update CRM",
        config: "Stage: Follow-up Sent",
      },
    ],
  },
  {
    id: "a3",
    name: "Proposal Follow-up",
    trigger: "Proposal Viewed",
    triggerDetail: "Fires when the prospect opens the proposal link",
    category: "outreach",
    status: "active",
    lastRun: "45 min ago",
    runsToday: 5,
    totalRuns: 89,
    successRate: 92,
    actions: [
      {
        id: "x1",
        type: "notify",
        label: "Alert User",
        config: "Prospect just viewed your proposal!",
      },
      {
        id: "x2",
        type: "wait",
        label: "Wait 24h",
        config: "Duration: 24 hours",
      },
      {
        id: "x3",
        type: "whatsapp",
        label: "Send Follow-up",
        config: "Template: Proposal check-in",
      },
    ],
  },
  {
    id: "a4",
    name: "Monthly Report Generator",
    trigger: "Scheduled: 1st of Month",
    triggerDetail: "Runs automatically on the 1st at 9:00 AM IST every month",
    category: "reporting",
    status: "active",
    lastRun: "Apr 1, 2026",
    runsToday: 0,
    totalRuns: 54,
    successRate: 100,
    actions: [
      {
        id: "x1",
        type: "task",
        label: "Generate Report",
        config: "Auto-build monthly growth PDF",
      },
      {
        id: "x2",
        type: "email",
        label: "Send to Client",
        config: "Attach report + summary",
      },
    ],
  },
  {
    id: "a5",
    name: "At-Risk Client Alert",
    trigger: "Traffic Drop > 20%",
    triggerDetail:
      "Fires when a client's website traffic drops more than 20% week-over-week",
    category: "alert",
    status: "paused",
    lastRun: "3 days ago",
    runsToday: 0,
    totalRuns: 18,
    successRate: 100,
    actions: [
      {
        id: "x1",
        type: "notify",
        label: "Alert User",
        config: "Client traffic dropped — act now",
      },
      {
        id: "x2",
        type: "task",
        label: "Create Action Plan",
        config: "Auto-generate recovery checklist",
      },
    ],
  },
];

const EXEC_HISTORY: ExecRun[] = [
  {
    id: "r1",
    automation: "New Lead Welcome Sequence",
    trigger: "New lead: Sharma Salon, Pune",
    timestamp: "Today, 10:42 AM",
    leadsAffected: 1,
    status: "Success",
  },
  {
    id: "r2",
    automation: "Follow-up Sequence",
    trigger: "No reply: 28 leads",
    timestamp: "Today, 10:15 AM",
    leadsAffected: 28,
    status: "Success",
  },
  {
    id: "r3",
    automation: "Proposal Follow-up",
    trigger: "Proposal viewed: Nair Fitness",
    timestamp: "Today, 09:57 AM",
    leadsAffected: 1,
    status: "Success",
  },
  {
    id: "r4",
    automation: "New Lead Welcome Sequence",
    trigger: "New lead: Delhi Gym Co.",
    timestamp: "Today, 09:30 AM",
    leadsAffected: 1,
    status: "Partial",
  },
  {
    id: "r5",
    automation: "Follow-up Sequence",
    trigger: "No reply: 14 leads",
    timestamp: "Today, 08:00 AM",
    leadsAffected: 14,
    status: "Success",
  },
  {
    id: "r6",
    automation: "At-Risk Client Alert",
    trigger: "Traffic drop: FreshJuice Mumbai",
    timestamp: "Yesterday, 6:00 PM",
    leadsAffected: 1,
    status: "Failed",
  },
  {
    id: "r7",
    automation: "Proposal Follow-up",
    trigger: "Proposal viewed: Apex Tech",
    timestamp: "Yesterday, 3:22 PM",
    leadsAffected: 1,
    status: "Success",
  },
  {
    id: "r8",
    automation: "Monthly Report Generator",
    trigger: "Scheduled trigger: Apr 1",
    timestamp: "Apr 1, 9:00 AM",
    leadsAffected: 12,
    status: "Success",
  },
  {
    id: "r9",
    automation: "New Lead Welcome Sequence",
    trigger: "New lead: Luxe Salon, Jaipur",
    timestamp: "Apr 29, 11:15 AM",
    leadsAffected: 1,
    status: "Success",
  },
  {
    id: "r10",
    automation: "Follow-up Sequence",
    trigger: "No reply: 7 leads",
    timestamp: "Apr 29, 8:00 AM",
    leadsAffected: 7,
    status: "Success",
  },
];

const TEMPLATES: WorkflowTemplate[] = [
  {
    id: "t1",
    name: "Lead Nurture",
    steps: 5,
    useCase: "Warm up new leads with a multi-touch sequence over 7 days",
    category: "outreach",
    trigger: "New Lead Added",
    triggerDetail: "Fires when a new lead score > 60 is added",
    actions: [
      {
        id: "x1",
        type: "whatsapp",
        label: "Send WhatsApp",
        config: "Template: Welcome pitch",
      },
      {
        id: "x2",
        type: "wait",
        label: "Wait 24h",
        config: "Duration: 24 hours",
      },
      {
        id: "x3",
        type: "email",
        label: "Send Email",
        config: "Subject: Free audit for you",
      },
      {
        id: "x4",
        type: "wait",
        label: "Wait 3 days",
        config: "Duration: 72 hours",
      },
      { id: "x5", type: "crm", label: "Update CRM", config: "Stage: Nurtured" },
    ],
  },
  {
    id: "t2",
    name: "Client Onboarding",
    steps: 3,
    useCase: "Automatically onboard new clients with a welcome sequence",
    category: "crm",
    trigger: "CRM Stage = Closed",
    triggerDetail: "Fires when a deal moves to Closed Won",
    actions: [
      {
        id: "x1",
        type: "email",
        label: "Send Welcome Email",
        config: "Subject: Welcome to GrowthOS!",
      },
      {
        id: "x2",
        type: "task",
        label: "Create Onboarding Task",
        config: "Assign kickoff call",
      },
      {
        id: "x3",
        type: "notify",
        label: "Alert User",
        config: "New client onboarded!",
      },
    ],
  },
  {
    id: "t3",
    name: "Monthly Reporting",
    steps: 2,
    useCase: "Auto-generate and email growth reports on the 1st of each month",
    category: "reporting",
    trigger: "Scheduled: 1st of Month",
    triggerDetail: "Scheduled on 1st of every month at 9 AM",
    actions: [
      {
        id: "x1",
        type: "task",
        label: "Generate Report",
        config: "Build monthly growth PDF",
      },
      {
        id: "x2",
        type: "email",
        label: "Send to Client",
        config: "Attach report + summary",
      },
    ],
  },
  {
    id: "t4",
    name: "Follow-up Sequence",
    steps: 4,
    useCase: "Re-engage leads that haven't responded to your first outreach",
    category: "followup",
    trigger: "No Reply After 48h",
    triggerDetail: "48 hours after first contact",
    actions: [
      {
        id: "x1",
        type: "whatsapp",
        label: "Send Reminder #1",
        config: "Template: Follow-up #2",
      },
      {
        id: "x2",
        type: "wait",
        label: "Wait 3 days",
        config: "Duration: 72 hours",
      },
      {
        id: "x3",
        type: "whatsapp",
        label: "Send Final Reminder",
        config: "Template: Last follow-up",
      },
      {
        id: "x4",
        type: "crm",
        label: "Update CRM",
        config: "Stage: No Response",
      },
    ],
  },
  {
    id: "t5",
    name: "Cold Lead Reactivation",
    steps: 3,
    useCase: "Re-engage leads that went cold after 14+ days of no activity",
    category: "followup",
    trigger: "Lead Inactive 14 Days",
    triggerDetail: "Fires after 14 days of no lead activity",
    actions: [
      {
        id: "x1",
        type: "email",
        label: "Send Reactivation Email",
        config: "Subject: Still interested?",
      },
      {
        id: "x2",
        type: "wait",
        label: "Wait 2 days",
        config: "Duration: 48 hours",
      },
      {
        id: "x3",
        type: "crm",
        label: "Tag Lead",
        config: "Tag: Cold — Re-engage",
      },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  index,
}: {
  label: string;
  value: string | number;
  icon: typeof Zap;
  color: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
    >
      <Card
        className="p-4 flex items-center gap-3 hover-lift"
        data-ocid={`automation.stat.${index + 1}`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color.replace("text-", "bg-").replace(/text-\S+/, "")} bg-opacity-10`}
          style={{ background: "var(--icon-bg, oklch(var(--primary)/0.1))" }}
        >
          <Icon className={`w-4.5 h-4.5 ${color}`} />
        </div>
        <div>
          <p className={`text-xl font-bold tabular-nums font-display ${color}`}>
            {value}
          </p>
          <p className="text-xs text-muted-foreground leading-none mt-0.5">
            {label}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

function ActionBlockItem({
  block,
  index,
  onRemove,
}: {
  block: ActionBlock;
  index: number;
  onRemove?: (id: string) => void;
}) {
  const Icon = ACTION_ICONS[block.type];
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.22 }}
      className="flex flex-col items-center"
    >
      {index > 0 && <div className="w-px h-5 bg-border flex-shrink-0" />}
      <div
        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border w-full ${ACTION_COLORS[block.type]} bg-opacity-10 relative group`}
      >
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${ACTION_COLORS[block.type]}`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">{block.label}</p>
          <p className="text-[10px] text-muted-foreground truncate">
            {block.config}
          </p>
        </div>
        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(block.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0"
            aria-label={`Remove ${block.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

function AutomationCard({
  automation,
  index,
  onToggle,
  onEdit,
}: {
  automation: Automation;
  index: number;
  onToggle: (id: string) => void;
  onEdit: (a: Automation) => void;
}) {
  const CatIcon = CATEGORY_ICONS[automation.category];
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }}
      data-ocid={`automation.flow.${index + 1}`}
    >
      <Card className="p-4 hover-lift transition-smooth">
        <div className="flex items-start gap-3">
          {/* Category icon */}
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${CATEGORY_COLORS[automation.category]}`}
          >
            <CatIcon className="w-4.5 h-4.5" />
          </div>

          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <p className="text-sm font-semibold text-foreground">
                {automation.name}
              </p>
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 py-0 h-4 capitalize border-0 ${CATEGORY_COLORS[automation.category]}`}
              >
                {automation.category}
              </Badge>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${automation.status === "active" ? "status-active" : "status-paused"}`}
              >
                {automation.status === "active" ? "Active" : "Paused"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mb-2.5">
              <Zap className="w-3 h-3 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground truncate">
                {automation.trigger}
              </p>
            </div>

            {/* Action pill summary */}
            <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
              {automation.actions.map((a) => {
                const AIcon = ACTION_ICONS[a.type];
                return (
                  <span
                    key={a.id}
                    className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md ${ACTION_COLORS[a.type]}`}
                  >
                    <AIcon className="w-2.5 h-2.5" />
                    {a.label}
                  </span>
                );
              })}
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <Play className="w-3 h-3" />
                {automation.runsToday} runs today
              </span>
              <span className="text-success font-medium">
                {automation.successRate}% success
              </span>
              {automation.lastRun && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {automation.lastRun}
                </span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="w-7 h-7 text-muted-foreground hover:text-foreground"
              aria-label={`Edit ${automation.name}`}
              onClick={() => onEdit(automation)}
              data-ocid={`automation.flow.edit.${index + 1}`}
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Button>
            <Switch
              checked={automation.status === "active"}
              onCheckedChange={() => onToggle(automation.id)}
              aria-label={`Toggle ${automation.name}`}
              data-ocid={`automation.flow.toggle.${index + 1}`}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Workflow Builder Panel ───────────────────────────────────────────────────

interface BuilderState {
  name: string;
  trigger: string;
  condition: string;
  actions: ActionBlock[];
}

function WorkflowBuilderPanel({
  onClose,
  initialData,
}: {
  onClose: () => void;
  initialData?: Automation;
}) {
  const [state, setState] = useState<BuilderState>({
    name: initialData?.name ?? "My New Workflow",
    trigger: initialData ? initialData.trigger : "new_lead",
    condition: "score_70",
    actions: initialData?.actions ?? [
      {
        id: "b1",
        type: "whatsapp",
        label: "Send WhatsApp",
        config: "Template: Welcome message",
      },
    ],
  });

  const addAction = (opt: ActionOption) => {
    setState((prev) => ({
      ...prev,
      actions: [
        ...prev.actions,
        {
          id: `b${Date.now()}`,
          type: opt.value,
          label: opt.label,
          config: opt.config,
        },
      ],
    }));
  };

  const removeAction = (id: string) => {
    setState((prev) => ({
      ...prev,
      actions: prev.actions.filter((a) => a.id !== id),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-card border-l border-border shadow-premium flex flex-col"
      data-ocid="automation.builder.panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
        <div>
          <p className="text-sm font-semibold text-foreground font-display">
            {initialData ? "Edit Workflow" : "New Workflow"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure trigger, condition, and actions
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-8 h-8"
          data-ocid="automation.builder.close_button"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="workflow-name"
            className="text-xs font-medium text-muted-foreground block mb-1.5"
          >
            Workflow Name
          </label>
          <input
            id="workflow-name"
            type="text"
            value={state.name}
            onChange={(e) => setState((p) => ({ ...p, name: e.target.value }))}
            className="w-full h-9 px-3 text-sm bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            data-ocid="automation.builder.name_input"
          />
        </div>

        {/* Trigger block */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-primary" />
              TRIGGER
            </span>
          </p>
          <div className="border-2 border-primary/30 bg-primary/5 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-primary" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                When this happens…
              </p>
            </div>
            <Select
              value={state.trigger}
              onValueChange={(v) => setState((p) => ({ ...p, trigger: v }))}
            >
              <SelectTrigger
                className="h-8 text-xs"
                data-ocid="automation.builder.trigger_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TRIGGER_OPTIONS.map((t) => (
                  <SelectItem key={t.value} value={t.value} className="text-xs">
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Connector */}
        <div className="flex flex-col items-center gap-0">
          <div className="w-px h-4 bg-border" />
          <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="w-px h-4 bg-border" />
        </div>

        {/* Condition block */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            <span className="inline-flex items-center gap-1.5">
              <Filter className="w-3 h-3 text-warning" />
              CONDITION (optional)
            </span>
          </p>
          <div className="border border-warning/30 bg-warning/5 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-warning/10 flex items-center justify-center">
                <Filter className="w-3.5 h-3.5 text-warning" />
              </div>
              <p className="text-xs font-semibold text-foreground">Only if…</p>
            </div>
            <Select
              value={state.condition}
              onValueChange={(v) => setState((p) => ({ ...p, condition: v }))}
            >
              <SelectTrigger
                className="h-8 text-xs"
                data-ocid="automation.builder.condition_select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONDITION_OPTIONS.map((c) => (
                  <SelectItem key={c.value} value={c.value} className="text-xs">
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Connector */}
        <div className="flex flex-col items-center gap-0">
          <div className="w-px h-4 bg-border" />
          <ArrowDown className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="w-px h-4 bg-border" />
        </div>

        {/* Action blocks */}
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-success" />
              ACTIONS
            </span>
          </p>
          <div className="space-y-0">
            <AnimatePresence initial={false}>
              {state.actions.map((block, i) => (
                <ActionBlockItem
                  key={block.id}
                  block={block}
                  index={i}
                  onRemove={state.actions.length > 1 ? removeAction : undefined}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Add action */}
          <div className="mt-3">
            <div className="w-px h-4 bg-border mx-auto" />
            <div className="border border-dashed border-border rounded-xl p-2">
              <p className="text-[10px] text-muted-foreground text-center mb-2">
                Add action
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {ACTION_OPTIONS.map((opt) => {
                  const Icon = ACTION_ICONS[opt.value];
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => addAction(opt)}
                      className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-[10px] font-medium transition-fast hover:opacity-80 ${ACTION_COLORS[opt.value]}`}
                      data-ocid={`automation.builder.add_action.${opt.value}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border flex gap-2 shrink-0">
        <Button
          type="button"
          variant="outline"
          className="flex-1 text-xs h-9"
          onClick={onClose}
          data-ocid="automation.builder.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="flex-1 btn-primary-glow text-xs h-9"
          onClick={onClose}
          data-ocid="automation.builder.save_button"
        >
          Save Workflow
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AutomationPage() {
  const [automations, setAutomations] = useState<Automation[]>(AUTOMATIONS);
  const [builderOpen, setBuilderOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Automation | undefined>(
    undefined,
  );

  const toggleAutomation = (id: string) =>
    setAutomations((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "active" ? "paused" : "active" }
          : a,
      ),
    );

  const openNew = () => {
    setEditTarget(undefined);
    setBuilderOpen(true);
  };
  const openEdit = (a: Automation) => {
    setEditTarget(a);
    setBuilderOpen(true);
  };
  const closeBuilder = () => {
    setBuilderOpen(false);
    setEditTarget(undefined);
  };

  const applyTemplate = (t: WorkflowTemplate) => {
    setEditTarget({
      id: `new-${t.id}`,
      name: t.name,
      trigger: t.trigger,
      triggerDetail: t.triggerDetail,
      category: t.category,
      actions: t.actions,
      status: "paused",
      lastRun: "Never",
      runsToday: 0,
      totalRuns: 0,
      successRate: 0,
    });
    setBuilderOpen(true);
  };

  const activeCount = automations.filter((a) => a.status === "active").length;
  const runsToday = automations.reduce((s, a) => s + a.runsToday, 0);
  const leadsContacted = 89;
  const avgSuccess = Math.round(
    automations.reduce((s, a) => s + a.successRate, 0) / automations.length,
  );

  const runStatusColors: Record<RunStatus, string> = {
    Success: "status-active",
    Failed: "status-error",
    Partial: "status-paused",
  };

  return (
    <div data-ocid="automation.page" className="relative">
      {/* Builder overlay */}
      <AnimatePresence>
        {builderOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
              onClick={closeBuilder}
              data-ocid="automation.builder.overlay"
            />
            <WorkflowBuilderPanel
              onClose={closeBuilder}
              initialData={editTarget}
            />
          </>
        )}
      </AnimatePresence>

      {/* Page header */}
      <PageHeader
        title="Automation"
        description="Set it once, grow continuously"
        actions={
          <Button
            type="button"
            size="sm"
            className="btn-primary-glow"
            onClick={openNew}
            data-ocid="automation.new_workflow_button"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            New Workflow
          </Button>
        }
      />

      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6"
        aria-label="breadcrumb"
      >
        <span>GrowthOS</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">Automation</span>
      </nav>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Active Automations",
            value: activeCount,
            icon: Zap,
            color: "text-primary",
          },
          {
            label: "Runs Today",
            value: runsToday,
            icon: Play,
            color: "text-success",
          },
          {
            label: "Leads Contacted",
            value: leadsContacted,
            icon: Users,
            color: "text-chart-5",
          },
          {
            label: "Success Rate",
            value: `${avgSuccess}%`,
            icon: CheckCircle2,
            color: "text-success",
          },
        ].map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* Active automations */}
      <section className="mb-8" data-ocid="automation.flows.section">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground font-display">
            Active Automations
          </h2>
          <Badge variant="outline" className="text-xs">
            {automations.length} total
          </Badge>
        </div>

        <motion.div
          className="space-y-3"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {automations.map((a, i) => (
            <AutomationCard
              key={a.id}
              automation={a}
              index={i}
              onToggle={toggleAutomation}
              onEdit={openEdit}
            />
          ))}
        </motion.div>
      </section>

      {/* Templates section */}
      <section className="mb-8" data-ocid="automation.templates.section">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground font-display">
            Start from Template
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {TEMPLATES.map((t, i) => {
            const CatIcon = CATEGORY_ICONS[t.category];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                data-ocid={`automation.template.${i + 1}`}
              >
                <Card
                  className="p-4 flex flex-col gap-3 hover-lift transition-smooth cursor-pointer group border-border hover:border-primary/30"
                  onClick={() => applyTemplate(t)}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${CATEGORY_COLORS[t.category]}`}
                  >
                    <CatIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed text-truncate-2">
                      {t.useCase}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] h-4 px-1.5">
                      {t.steps} steps
                    </Badge>
                    <span className="text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-fast flex items-center gap-0.5">
                      Use <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Execution history */}
      <section data-ocid="automation.history.section">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground font-display">
              Execution History
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">Last 10 runs</p>
        </div>

        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="text-xs font-medium text-muted-foreground py-3">
                  Automation
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground py-3 hidden md:table-cell">
                  Trigger
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground py-3 hidden sm:table-cell">
                  Timestamp
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground py-3 text-right">
                  Leads
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground py-3">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground py-3 w-8" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {EXEC_HISTORY.map((run, i) => (
                <motion.tr
                  key={run.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-border/60 last:border-0 hover:bg-muted/40 transition-fast"
                  data-ocid={`automation.history.item.${i + 1}`}
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      {run.status === "Failed" ? (
                        <TrendingDown className="w-3.5 h-3.5 text-destructive shrink-0" />
                      ) : run.status === "Partial" ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                      )}
                      <p className="text-xs font-medium text-foreground truncate max-w-[120px] md:max-w-[160px]">
                        {run.automation}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 hidden md:table-cell">
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {run.trigger}
                    </p>
                  </TableCell>
                  <TableCell className="py-3 hidden sm:table-cell">
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {run.timestamp}
                    </p>
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <p className="text-xs font-medium tabular-nums text-foreground">
                      {run.leadsAffected}
                    </p>
                  </TableCell>
                  <TableCell className="py-3">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${runStatusColors[run.status]}`}
                    >
                      {run.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-muted-foreground"
                      aria-label="View run details"
                      data-ocid={`automation.history.view.${i + 1}`}
                    >
                      <FileText className="w-3 h-3" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* AI tip banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-primary/6 border border-primary/20"
      >
        <Bot className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            AI Automation Tip
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Leads from Mumbai gyms have a 68% reply rate on Monday mornings.
            Schedule your welcome sequence to trigger at 10:00 AM IST every
            Monday for best results.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="text-xs h-7 shrink-0"
          data-ocid="automation.ai_tip.apply_button"
        >
          Apply
        </Button>
      </motion.div>

      {/* Premium upgrade nudge */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-4 flex items-center gap-3 p-4 rounded-xl gradient-premium border border-primary/15"
      >
        <Sparkles className="w-5 h-5 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Unlock Unlimited Automations
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Free plan is limited to 5 automations and 500 runs/month. Upgrade to
            Scale for unlimited workflows, multi-channel actions, and priority
            queue.
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          className="btn-primary-glow text-xs shrink-0"
          data-ocid="automation.upgrade_button"
        >
          Upgrade
        </Button>
      </motion.div>

      {/* Credit usage meter */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="mt-4"
      >
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Repeat2 className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-semibold text-foreground">
                AI Automation Credits
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              247 / 500 used
            </span>
          </div>
          <div className="progress-bar">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: "0%" }}
              animate={{ width: "49.4%" }}
              transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-[10px] text-muted-foreground">
              Resets monthly · 253 remaining
            </p>
            <Button
              type="button"
              variant="link"
              size="sm"
              className="text-[10px] h-auto p-0 text-primary"
              data-ocid="automation.buy_credits_button"
            >
              Buy more credits
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Pause all / resume all quick actions */}
      <div className="mt-6 flex items-center gap-3 pb-8">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs gap-1.5"
          onClick={() =>
            setAutomations((prev) =>
              prev.map((a) => ({ ...a, status: "paused" })),
            )
          }
          data-ocid="automation.pause_all_button"
        >
          <Pause className="w-3.5 h-3.5" />
          Pause All
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs gap-1.5"
          onClick={() =>
            setAutomations((prev) =>
              prev.map((a) => ({ ...a, status: "active" })),
            )
          }
          data-ocid="automation.resume_all_button"
        >
          <Play className="w-3.5 h-3.5" />
          Resume All
        </Button>
      </div>
    </div>
  );
}
