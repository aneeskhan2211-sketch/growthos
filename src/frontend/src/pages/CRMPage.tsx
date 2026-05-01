import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Bell,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  GripVertical,
  Mail,
  MapPin,
  MessageSquare,
  Pause,
  Phone,
  Play,
  Plus,
  Search,
  Send,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { LeadStatus, NoteType } from "../backend";
import type { Lead, Note } from "../backend";
import { useAllNotes, useCreateNote } from "../hooks/useCRM";
import { useCreateLead, useLeads, useMoveLead } from "../hooks/useLeads";
import {
  useCampaignsByLead,
  useCreateOutreachCampaign,
  useCreateOutreachMessage,
  useOutreachMessages,
  useOutreachMessagesByLead,
  useUpdateOutreachMessageStatus,
} from "../hooks/useOutreach";
import type { OutreachCampaign, OutreachMessage } from "../types/outreach";
import { OUTREACH_DAY_CONFIG, scoreColor } from "../types/outreach";

// ─── Extended mock data (15+ leads) ─────────────────────────────────────────

const EXTRA_MOCK_LEADS: Lead[] = [
  {
    id: BigInt(7),
    businessName: "Coastal Dental Group",
    website: "coastaldental.com",
    rating: 4.7,
    phone: "+1 555-0107",
    address: "111 Ocean Dr, Miami, FL",
    industry: "Healthcare",
    city: "Miami",
    leadScore: BigInt(83),
    status: LeadStatus.new_,
    notes: "",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now() - 86400000 * 1),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(8),
    businessName: "Urban Eats Kitchen",
    website: "urbaneats.io",
    rating: 4.3,
    phone: "+1 555-0108",
    address: "222 Food St, Nashville, TN",
    industry: "Food & Beverage",
    city: "Nashville",
    leadScore: BigInt(61),
    status: LeadStatus.new_,
    notes: "",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now() - 86400000 * 2),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(9),
    businessName: "Apex Roofing Solutions",
    website: "apexroofing.net",
    rating: 4.0,
    phone: "+1 555-0109",
    address: "333 Trade Blvd, Dallas, TX",
    industry: "Home Services",
    city: "Dallas",
    leadScore: BigInt(74),
    status: LeadStatus.new_,
    notes: "",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now() - 86400000 * 3),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(10),
    businessName: "Sparkle Clean Co",
    website: "sparkleclean.com",
    rating: 4.5,
    phone: "+1 555-0110",
    address: "444 Service Rd, Las Vegas, NV",
    industry: "Cleaning Services",
    city: "Las Vegas",
    leadScore: BigInt(55),
    status: LeadStatus.contacted,
    notes: "Left voicemail",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now() - 86400000 * 4),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(11),
    businessName: "Flex Fitness Studio",
    website: "flexfitness.com",
    rating: 4.6,
    phone: "+1 555-0111",
    address: "555 Gym Lane, Boston, MA",
    industry: "Fitness",
    city: "Boston",
    leadScore: BigInt(88),
    status: LeadStatus.contacted,
    notes: "Interested in Meta ads",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now() - 86400000 * 5),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(12),
    businessName: "TechVision IT Services",
    website: "techvision.io",
    rating: 4.2,
    phone: "+1 555-0112",
    address: "666 Tech Park, San Jose, CA",
    industry: "Technology",
    city: "San Jose",
    leadScore: BigInt(92),
    status: LeadStatus.proposal,
    notes: "Proposal under review",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now() - 86400000 * 6),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(13),
    businessName: "Downtown Realty Group",
    website: "dtrealty.com",
    rating: 4.8,
    phone: "+1 555-0113",
    address: "777 Market St, San Francisco, CA",
    industry: "Real Estate",
    city: "San Francisco",
    leadScore: BigInt(95),
    status: LeadStatus.proposal,
    notes: "High-value prospect",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now() - 86400000 * 7),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(14),
    businessName: "Sunrise Pet Hospital",
    website: "sunrisevet.com",
    rating: 4.9,
    phone: "+1 555-0114",
    address: "888 Pet Ln, San Diego, CA",
    industry: "Healthcare",
    city: "San Diego",
    leadScore: BigInt(80),
    status: LeadStatus.closed,
    notes: "Signed annual contract",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now() - 86400000 * 14),
    updatedAt: BigInt(Date.now()),
  },
  {
    id: BigInt(15),
    businessName: "Elite Auto Detailing",
    website: "elitedetail.com",
    rating: 4.4,
    phone: "+1 555-0115",
    address: "999 Auto Row, Houston, TX",
    industry: "Automotive",
    city: "Houston",
    leadScore: BigInt(76),
    status: LeadStatus.closed,
    notes: "3-month trial started",
    attemptCount: BigInt(0),
    leadSource: "manual_import",
    optedOut: false,
    createdAt: BigInt(Date.now() - 86400000 * 20),
    updatedAt: BigInt(Date.now()),
  },
];

const EXTRA_MOCK_NOTES: Note[] = [
  {
    id: BigInt(4),
    leadId: BigInt(1),
    content: "Scheduled demo call for Thursday 2pm",
    noteType: NoteType.reminder,
    dueDate: BigInt(Date.now() + 86400000 * 3),
    completed: false,
    createdAt: BigInt(Date.now() - 86400000),
  },
  {
    id: BigInt(5),
    leadId: BigInt(2),
    content: "Sent SEO audit report via email",
    noteType: NoteType.note,
    dueDate: undefined,
    completed: true,
    createdAt: BigInt(Date.now() - 86400000 * 2),
  },
  {
    id: BigInt(6),
    leadId: BigInt(4),
    content: "Contract signed — onboarding call scheduled",
    noteType: NoteType.note,
    dueDate: undefined,
    completed: false,
    createdAt: BigInt(Date.now() - 86400000 * 5),
  },
  {
    id: BigInt(7),
    leadId: BigInt(12),
    content: "Follow up on proposal decision",
    noteType: NoteType.reminder,
    dueDate: BigInt(Date.now() + 86400000 * 1),
    completed: false,
    createdAt: BigInt(Date.now() - 86400000),
  },
];

// ─── Config ─────────────────────────────────────────────────────────────────

const STAGE_CONFIG = [
  {
    status: LeadStatus.new_,
    label: "New Lead",
    colorClass: "bg-primary/10 text-primary border-primary/20",
    headerClass: "border-l-primary",
    dotClass: "bg-primary",
  },
  {
    status: LeadStatus.contacted,
    label: "Contacted",
    colorClass: "bg-warning/10 text-warning border-warning/20",
    headerClass: "border-l-warning",
    dotClass: "bg-warning",
  },
  {
    status: LeadStatus.proposal,
    label: "Proposal",
    colorClass: "bg-accent/10 text-accent border-accent/20",
    headerClass: "border-l-accent",
    dotClass: "bg-accent",
  },
  {
    status: LeadStatus.closed,
    label: "Closed Won",
    colorClass: "bg-success/10 text-success border-success/20",
    headerClass: "border-l-success",
    dotClass: "bg-success",
  },
];

const INDUSTRIES = [
  "All Industries",
  "Digital Marketing",
  "Food & Beverage",
  "Automotive",
  "Legal Services",
  "Fitness",
  "Home Services",
  "Healthcare",
  "Cleaning Services",
  "Technology",
  "Real Estate",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatRelativeTime(ts: number): string {
  if (ts === 0) return "never";
  const diff = Date.now() - ts;
  if (diff < 60000) return "just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function getOutreachStatusDot(messages: OutreachMessage[]): {
  color: string;
  label: string;
} {
  if (!messages.length)
    return { color: "bg-muted-foreground/30", label: "No outreach" };
  if (messages.some((m) => m.status === "replied"))
    return { color: "bg-success", label: "Replied" };
  if (messages.some((m) => m.status === "delivered" || m.status === "sent"))
    return { color: "bg-primary", label: "Message sent" };
  if (messages.some((m) => m.status === "scheduled"))
    return { color: "bg-warning", label: "Scheduled" };
  return { color: "bg-muted-foreground/30", label: "No outreach" };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const cls = scoreColor(score);
  const colorMap: Record<string, string> = {
    "score-critical":
      "bg-destructive/10 text-destructive border-destructive/20",
    "score-warning": "bg-warning/10 text-warning border-warning/20",
    "score-success": "bg-success/10 text-success border-success/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-bold border",
        colorMap[cls] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      <Star className="w-2.5 h-2.5" />
      {score}
    </span>
  );
}

function OutreachStatusDot({
  messages,
}: {
  messages: OutreachMessage[];
}) {
  const { color, label } = getOutreachStatusDot(messages);
  return (
    <span
      title={label}
      className={cn("w-2 h-2 rounded-full shrink-0 transition-colors", color)}
    />
  );
}

function OutreachStatusBadge({
  status,
}: { status: OutreachMessage["status"] }) {
  const map: Record<string, string> = {
    scheduled: "badge-status pending",
    sent: "badge-status sent",
    delivered: "badge-status delivered",
    replied: "badge-status replied",
    failed: "badge-status failed",
  };
  return (
    <span className={map[status] ?? "badge-status pending"}>{status}</span>
  );
}

// ─── Lead Card ───────────────────────────────────────────────────────────────

function LeadCard({
  lead,
  index,
  notes,
  messages,
  onDragStart,
  onDragEnd,
  onClick,
  onStartOutreach,
}: {
  lead: Lead;
  index: number;
  notes: Note[];
  messages: OutreachMessage[];
  onDragStart: () => void;
  onDragEnd: () => void;
  onClick: () => void;
  onStartOutreach: (e: React.MouseEvent) => void;
}) {
  const score = Number(lead.leadScore);
  const leadNotes = notes.filter((n) => n.leadId === lead.id);
  const leadMessages = messages.filter((m) => m.leadId === lead.id);
  const overdueReminders = leadNotes.filter(
    (n) =>
      n.noteType === NoteType.reminder &&
      !n.completed &&
      n.dueDate &&
      Number(n.dueDate) < Date.now(),
  );
  const lastNote = leadNotes.sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
  )[0];

  // Last contacted: most recent sent/delivered/replied outreach message
  const sentMessages = leadMessages
    .filter((m) => m.sentAt !== undefined)
    .sort((a, b) => Number(b.sentAt ?? 0) - Number(a.sentAt ?? 0));
  const lastContactedMs = sentMessages[0]?.sentAt
    ? Number(sentMessages[0].sentAt) / 1_000_000
    : 0;

  return (
    <button
      type="button"
      data-ocid={`crm.lead.item.${index}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className="group relative w-full text-left bg-card border border-border/60 rounded-xl p-3 shadow-subtle hover:shadow-elevated hover:border-primary/30 transition-smooth cursor-pointer select-none"
    >
      {/* Drag handle */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Quick outreach action — hover only */}
      <button
        type="button"
        data-ocid={`crm.lead.start_outreach.${index}`}
        onClick={onStartOutreach}
        aria-label="Start Outreach"
        className="absolute right-7 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 w-6 h-6 rounded-md bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary"
      >
        <Send className="w-3 h-3" />
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-2 pr-8">
        <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
          {lead.businessName}
        </p>
        <div className="flex items-center gap-1 shrink-0">
          <OutreachStatusDot messages={leadMessages} />
          <ScoreBadge score={score} />
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
        <Badge
          variant="outline"
          className="text-xs py-0 h-4 border-border/50 text-muted-foreground"
        >
          {lead.industry}
        </Badge>
        {lead.city && (
          <span className="flex items-center gap-0.5 text-xs text-muted-foreground/70">
            <MapPin className="w-2.5 h-2.5" />
            {lead.city}
          </span>
        )}
      </div>

      {/* Last contacted */}
      <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground/60">
        <Clock className="w-3 h-3" />
        <span>
          {lastContactedMs > 0
            ? `Contacted ${formatRelativeTime(lastContactedMs)}`
            : "Never contacted"}
        </span>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {lead.phone && (
            <span className="flex items-center gap-0.5">
              <Phone className="w-3 h-3" />
              {lead.phone.slice(0, 12)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {overdueReminders.length > 0 && (
            <span className="flex items-center gap-0.5 text-xs text-destructive">
              <AlertCircle className="w-3 h-3" />
              {overdueReminders.length}
            </span>
          )}
          {leadNotes.length > 0 && (
            <span className="flex items-center gap-0.5 text-xs text-muted-foreground/70">
              <MessageSquare className="w-3 h-3" />
              {leadNotes.length}
            </span>
          )}
          {lastNote && (
            <span className="text-xs text-muted-foreground/50">
              {formatRelativeTime(Number(lastNote.createdAt))}
            </span>
          )}
          <ChevronRight className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </button>
  );
}

// ─── Kanban Column ───────────────────────────────────────────────────────────

function KanbanColumn({
  stage,
  leads,
  notes,
  allMessages,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onLeadDragStart,
  onLeadDragEnd,
  onLeadClick,
  onAddLead,
  onStartOutreach,
}: {
  stage: (typeof STAGE_CONFIG)[0];
  leads: Lead[];
  notes: Note[];
  allMessages: OutreachMessage[];
  isDragOver: boolean;
  onDragOver: () => void;
  onDragLeave: () => void;
  onDrop: () => void;
  onLeadDragStart: (id: bigint) => void;
  onLeadDragEnd: () => void;
  onLeadClick: (lead: Lead) => void;
  onAddLead: () => void;
  onStartOutreach: (lead: Lead) => void;
}) {
  return (
    <div
      data-ocid={`crm.stage.${stage.status}`}
      className={cn(
        "flex flex-col rounded-xl border-2 transition-smooth min-h-[400px]",
        isDragOver
          ? "border-primary/40 bg-primary/5 shadow-elevated"
          : "border-border/40 bg-muted/20",
        `border-l-4 ${stage.headerClass}`,
      )}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOver();
      }}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border/30 sticky top-0 bg-inherit rounded-t-xl">
        <div className="flex items-center gap-2">
          <span className={cn("w-2 h-2 rounded-full", stage.dotClass)} />
          <span className="text-sm font-semibold text-foreground">
            {stage.label}
          </span>
          <Badge
            variant="outline"
            className={cn("text-xs px-1.5 py-0 h-4 border", stage.colorClass)}
          >
            {leads.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onAddLead}
          data-ocid={`crm.stage.${stage.status}.add_button`}
        >
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* Cards */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2">
          {leads.length === 0 ? (
            <div
              data-ocid={`crm.stage.${stage.status}.empty_state`}
              className="flex flex-col items-center justify-center py-10 text-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Plus className="w-4 h-4 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground/50">
                Drop leads here
              </p>
            </div>
          ) : (
            leads.map((lead, idx) => (
              <LeadCard
                key={lead.id.toString()}
                lead={lead}
                index={idx + 1}
                notes={notes}
                messages={allMessages}
                onDragStart={() => onLeadDragStart(lead.id)}
                onDragEnd={onLeadDragEnd}
                onClick={() => onLeadClick(lead)}
                onStartOutreach={(e) => {
                  e.stopPropagation();
                  onStartOutreach(lead);
                }}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Note Item ───────────────────────────────────────────────────────────────

function NoteItem({
  note,
  onComplete,
}: {
  note: Note;
  onComplete: (id: bigint) => void;
}) {
  const isReminder = note.noteType === NoteType.reminder;
  const isOverdue =
    isReminder &&
    !note.completed &&
    note.dueDate &&
    Number(note.dueDate) < Date.now();

  return (
    <div
      className={cn(
        "flex gap-3 p-3 rounded-lg border transition-smooth",
        note.completed
          ? "bg-muted/30 border-border/30 opacity-60"
          : isOverdue
            ? "bg-destructive/5 border-destructive/20"
            : "bg-card border-border/50",
      )}
    >
      <div className="mt-0.5 shrink-0">
        {isReminder ? (
          <Bell
            className={cn(
              "w-4 h-4",
              isOverdue ? "text-destructive" : "text-warning",
            )}
          />
        ) : (
          <MessageSquare className="w-4 h-4 text-primary/70" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm text-foreground leading-relaxed",
            note.completed && "line-through",
          )}
        >
          {note.content}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(Number(note.createdAt))}
          </span>
          {note.dueDate && (
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs",
                isOverdue ? "text-destructive" : "text-muted-foreground",
              )}
            >
              <Clock className="w-3 h-3" />
              Due {formatDate(Number(note.dueDate))}
            </span>
          )}
        </div>
      </div>
      {!note.completed && (
        <button
          type="button"
          onClick={() => onComplete(note.id)}
          className="shrink-0 text-muted-foreground hover:text-success transition-colors"
          aria-label="Mark complete"
        >
          <CheckCircle2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ─── Outreach Timeline Item ───────────────────────────────────────────────────

function OutreachTimelineItem({ message }: { message: OutreachMessage }) {
  const isWhatsApp = message.channel === "whatsapp";
  const dayLabel =
    OUTREACH_DAY_CONFIG[message.dayNumber] ?? `Day ${message.dayNumber}`;
  const timelineStatusClass = `timeline-item status-${message.status === "scheduled" ? "pending" : message.status}`;

  const sentMs = message.sentAt ? Number(message.sentAt) / 1_000_000 : 0;
  const scheduledMs = Number(message.scheduledAt) / 1_000_000;
  const displayTime = sentMs > 0 ? sentMs : scheduledMs;

  return (
    <div
      className={cn(
        "fade-in-item pb-3 border-l-2 border-border/30 ml-1",
        timelineStatusClass,
      )}
    >
      <div className="flex items-start gap-2.5">
        <div
          className={cn(
            "shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5",
            isWhatsApp ? "bg-success/10" : "bg-primary/10",
          )}
        >
          {isWhatsApp ? (
            <Phone className="w-3.5 h-3.5 text-success" />
          ) : (
            <Mail className="w-3.5 h-3.5 text-primary" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-xs font-semibold text-foreground">
              Day {message.dayNumber}: {dayLabel}
            </p>
            <OutreachStatusBadge status={message.status} />
          </div>
          <p className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-2">
            {message.personalizedMessage.slice(0, 60)}
            {message.personalizedMessage.length > 60 ? "…" : ""}
          </p>
          <p className="text-xs text-muted-foreground/50 mt-1">
            {message.status === "scheduled" ? "Scheduled for " : ""}
            {formatRelativeTime(displayTime)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Campaign Status Card ─────────────────────────────────────────────────────

function CampaignStatusCard({ campaign }: { campaign: OutreachCampaign }) {
  const [paused, setPaused] = useState(campaign.status === "paused");

  const handleToggle = () => {
    setPaused((p) => !p);
    toast.success(paused ? "Campaign resumed" : "Campaign paused");
  };

  const progressPct =
    campaign.totalMessages > 0
      ? Math.round((campaign.deliveredCount / campaign.totalMessages) * 100)
      : 0;

  return (
    <div className="rounded-lg border border-border/50 bg-muted/20 p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-warning" />
          <span className="text-xs font-semibold text-foreground">
            Active Campaign
          </span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 px-2 text-xs gap-1"
          onClick={handleToggle}
          data-ocid="crm.campaign.pause_toggle"
        >
          {paused ? (
            <Play className="w-3 h-3" />
          ) : (
            <Pause className="w-3 h-3" />
          )}
          {paused ? "Resume" : "Pause"}
        </Button>
      </div>

      <div className="flex gap-3 text-xs">
        <div>
          <span className="text-muted-foreground">Channels: </span>
          <span className="text-foreground font-medium">
            {campaign.channels
              .map((c) => (c === "whatsapp" ? "WhatsApp" : "Email"))
              .join(", ")}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Sent: </span>
          <span className="text-foreground font-medium">
            {campaign.deliveredCount}/{campaign.totalMessages}
          </span>
        </div>
        {campaign.repliedCount > 0 && (
          <div>
            <span className="text-muted-foreground">Replied: </span>
            <span className="text-success font-medium">
              {campaign.repliedCount}
            </span>
          </div>
        )}
      </div>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Lead Detail Panel ───────────────────────────────────────────────────────

function LeadDetailPanel({
  lead,
  notes,
  onClose,
  onComplete,
  onAddNote,
  isAddingNote,
}: {
  lead: Lead;
  notes: Note[];
  onClose: () => void;
  onComplete: (id: bigint) => void;
  onAddNote: (content: string, type: NoteType, dueDate?: bigint) => void;
  isAddingNote: boolean;
}) {
  const [noteContent, setNoteContent] = useState("");
  const [noteType, setNoteType] = useState<NoteType>(NoteType.note);
  const [dueDate, setDueDate] = useState("");

  const { data: outreachMessages = [] } = useOutreachMessagesByLead(lead.id);
  const { data: campaigns = [] } = useCampaignsByLead(lead.id);
  const createCampaign = useCreateOutreachCampaign();
  const createMessage = useCreateOutreachMessage();
  const updateStatus = useUpdateOutreachMessageStatus();

  const leadNotes = notes
    .filter((n) => n.leadId === lead.id)
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));

  const stage = STAGE_CONFIG.find((s) => s.status === lead.status);
  const activeCampaign = campaigns.find(
    (c) => c.status === "active" || c.status === "paused",
  );

  const sortedMessages = [...outreachMessages].sort(
    (a, b) => Number(a.scheduledAt) - Number(b.scheduledAt),
  );

  const handleSubmit = () => {
    if (!noteContent.trim()) return;
    const dueDateBigInt = dueDate
      ? BigInt(new Date(dueDate).getTime())
      : undefined;
    onAddNote(noteContent.trim(), noteType, dueDateBigInt);
    setNoteContent("");
    setDueDate("");
  };

  const handleStartCampaign = () => {
    createCampaign.mutate({
      leadId: lead.id,
      businessName: lead.businessName,
      channels: ["whatsapp", "email"],
    });
    for (const day of [1, 2, 4]) {
      createMessage.mutate({
        leadId: lead.id,
        businessName: lead.businessName,
        channel: day === 2 ? "email" : "whatsapp",
        templateType: day === 1 ? "initial" : day === 2 ? "followup" : "final",
        dayNumber: day,
        personalizedMessage: `Day ${day} message for ${lead.businessName} — personalized outreach`,
        scheduledAt: BigInt(Date.now() + day * 86400000) * BigInt(1_000_000),
        detectedProblem: "weak_seo",
      });
    }
    toast.success(`Outreach campaign started for ${lead.businessName}`);
  };

  const handleSendWhatsApp = () => {
    const msg = outreachMessages.find(
      (m) => m.channel === "whatsapp" && m.status === "scheduled",
    );
    if (msg) {
      updateStatus.mutate({ id: msg.id, status: "sent" });
    }
    toast.success("WhatsApp message queued for delivery");
  };

  const handleSendEmail = () => {
    const msg = outreachMessages.find(
      (m) => m.channel === "email" && m.status === "scheduled",
    );
    if (msg) {
      updateStatus.mutate({ id: msg.id, status: "sent" });
    }
    toast.success("Email scheduled for delivery");
  };

  return (
    <div
      data-ocid="crm.lead_detail.panel"
      className="flex flex-col h-full bg-card"
    >
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-border/50">
        <div className="flex-1 min-w-0 pr-3">
          <h3 className="text-base font-semibold text-foreground truncate">
            {lead.businessName}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge
              variant="outline"
              className={cn("text-xs border", stage?.colorClass)}
            >
              {stage?.label}
            </Badge>
            <ScoreBadge score={Number(lead.leadScore)} />
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 shrink-0"
          onClick={onClose}
          data-ocid="crm.lead_detail.close_button"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Lead info */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            {lead.phone && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{lead.phone}</span>
              </div>
            )}
            {lead.website && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{lead.website}</span>
              </div>
            )}
            {lead.city && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{lead.city}</span>
              </div>
            )}
            {lead.rating > 0 && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Star className="w-3.5 h-3.5 shrink-0 text-warning" />
                <span>{lead.rating} rating</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Add note form */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Add Note / Reminder
            </Label>
            <Textarea
              data-ocid="crm.note.textarea"
              placeholder="Write a note or set a reminder..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[72px] text-sm resize-none bg-background"
            />
            <div className="flex gap-2">
              <Select
                value={noteType === NoteType.note ? "note" : "reminder"}
                onValueChange={(v) =>
                  setNoteType(v === "note" ? NoteType.note : NoteType.reminder)
                }
              >
                <SelectTrigger
                  className="h-8 text-xs flex-1"
                  data-ocid="crm.note.type_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="note">
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3 h-3" /> Note
                    </span>
                  </SelectItem>
                  <SelectItem value="reminder">
                    <span className="flex items-center gap-1.5">
                      <Bell className="w-3 h-3" /> Reminder
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              {noteType === NoteType.reminder && (
                <Input
                  data-ocid="crm.note.due_date_input"
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="h-8 text-xs flex-1"
                />
              )}
            </div>
            <Button
              data-ocid="crm.note.submit_button"
              size="sm"
              className="w-full h-8 text-xs"
              onClick={handleSubmit}
              disabled={!noteContent.trim() || isAddingNote}
            >
              {isAddingNote ? "Saving..." : "Save Note"}
            </Button>
          </div>

          <Separator />

          {/* Notes timeline */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Activity ({leadNotes.length})
            </Label>
            {leadNotes.length === 0 ? (
              <div
                data-ocid="crm.notes.empty_state"
                className="text-center py-6 text-xs text-muted-foreground/60"
              >
                No notes yet — start by adding one above.
              </div>
            ) : (
              <div className="space-y-2">
                {leadNotes.map((note) => (
                  <NoteItem
                    key={note.id.toString()}
                    note={note}
                    onComplete={onComplete}
                  />
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Campaign status */}
          {activeCampaign && <CampaignStatusCard campaign={activeCampaign} />}

          {/* Outreach History */}
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
              <Send className="w-3 h-3" /> Outreach History
            </Label>

            {sortedMessages.length === 0 ? (
              <div
                data-ocid="crm.outreach.empty_state"
                className="flex flex-col items-center py-5 gap-2.5 text-center"
              >
                <div className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center">
                  <Send className="w-4 h-4 text-muted-foreground/50" />
                </div>
                <p className="text-xs text-muted-foreground/60">
                  No outreach started yet
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs gap-1.5"
                  onClick={handleStartCampaign}
                  disabled={createCampaign.isPending}
                  data-ocid="crm.outreach.start_campaign_button"
                >
                  <Zap className="w-3 h-3" />
                  {createCampaign.isPending ? "Starting…" : "Start Campaign"}
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                {sortedMessages.map((msg) => (
                  <OutreachTimelineItem key={msg.id.toString()} message={msg} />
                ))}
              </div>
            )}
          </div>

          {/* Quick outreach actions */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Quick Actions
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs gap-1.5 border-success/30 text-success hover:bg-success/10"
                onClick={handleSendWhatsApp}
                data-ocid="crm.outreach.whatsapp_button"
              >
                <Phone className="w-3.5 h-3.5" />
                Send WhatsApp
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10"
                onClick={handleSendEmail}
                data-ocid="crm.outreach.email_button"
              >
                <Mail className="w-3.5 h-3.5" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Quick-add lead dialog ───────────────────────────────────────────────────

function QuickAddLeadDialog({
  open,
  defaultStatus,
  onClose,
}: {
  open: boolean;
  defaultStatus: LeadStatus;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    city: "",
    phone: "",
    website: "",
  });
  const stage = STAGE_CONFIG.find((s) => s.status === defaultStatus);
  const createLead = useCreateLead();
  const moveLeadAfterCreate = useMoveLead();

  const handleSubmit = () => {
    if (!form.businessName.trim()) return;
    createLead.mutate(
      {
        businessName: form.businessName.trim(),
        industry: form.industry.trim() || "General",
        city: form.city.trim() || "",
        phone: form.phone.trim() || "",
        website: form.website.trim() || "",
        address: "",
        rating: 0,
        leadScore: BigInt(70),
        notes: "",
      },
      {
        onSuccess: (newLead) => {
          if (defaultStatus !== LeadStatus.new_) {
            moveLeadAfterCreate.mutate({
              id: newLead.id,
              status: defaultStatus,
            });
          }
          toast.success(
            `${form.businessName} added to ${stage?.label ?? "pipeline"}`,
          );
          setForm({
            businessName: "",
            industry: "",
            city: "",
            phone: "",
            website: "",
          });
          onClose();
        },
        onError: () => {
          toast.error("Failed to add lead. Please try again.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent data-ocid="crm.add_lead.dialog" className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Lead to{" "}
            <Badge
              variant="outline"
              className={cn("text-xs border", stage?.colorClass)}
            >
              {stage?.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 pt-1">
          <div className="space-y-1">
            <Label htmlFor="bname" className="text-xs">
              Business Name *
            </Label>
            <Input
              id="bname"
              data-ocid="crm.add_lead.name_input"
              placeholder="e.g. Sunrise Bakery"
              value={form.businessName}
              onChange={(e) =>
                setForm((f) => ({ ...f, businessName: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="ind" className="text-xs">
                Industry
              </Label>
              <Input
                id="ind"
                data-ocid="crm.add_lead.industry_input"
                placeholder="e.g. Fitness"
                value={form.industry}
                onChange={(e) =>
                  setForm((f) => ({ ...f, industry: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="city" className="text-xs">
                City
              </Label>
              <Input
                id="city"
                data-ocid="crm.add_lead.city_input"
                placeholder="e.g. Austin"
                value={form.city}
                onChange={(e) =>
                  setForm((f) => ({ ...f, city: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="ph" className="text-xs">
                Phone
              </Label>
              <Input
                id="ph"
                data-ocid="crm.add_lead.phone_input"
                placeholder="+1 555-0100"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="web" className="text-xs">
                Website
              </Label>
              <Input
                id="web"
                data-ocid="crm.add_lead.website_input"
                placeholder="example.com"
                value={form.website}
                onChange={(e) =>
                  setForm((f) => ({ ...f, website: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="crm.add_lead.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmit}
              disabled={!form.businessName.trim() || createLead.isPending}
              data-ocid="crm.add_lead.submit_button"
            >
              {createLead.isPending ? "Adding…" : "Add Lead"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function CRMPage() {
  const { data: backendLeads = [] } = useLeads();
  const { data: backendNotes = [] } = useAllNotes();
  const { data: allMessages = [] } = useOutreachMessages();
  const moveLeadMutation = useMoveLead();
  const createNoteMutation = useCreateNote();
  const createCampaignMutation = useCreateOutreachCampaign();
  const createMessageMutation = useCreateOutreachMessage();
  const [localNotes, setLocalNotes] = useState<Note[]>([]);

  // Merged data
  const leads = useMemo(() => {
    const allLeadIds = new Set(backendLeads.map((l) => l.id.toString()));
    const extra = EXTRA_MOCK_LEADS.filter(
      (l) => !allLeadIds.has(l.id.toString()),
    );
    return [...backendLeads, ...extra];
  }, [backendLeads]);

  const notes = useMemo(() => {
    const allNoteIds = new Set(backendNotes.map((n) => n.id.toString()));
    const extra = EXTRA_MOCK_NOTES.filter(
      (n) => !allNoteIds.has(n.id.toString()),
    );
    return [...backendNotes, ...extra, ...localNotes];
  }, [backendNotes, localNotes]);

  // Drag state
  const [draggedId, setDraggedId] = useState<bigint | null>(null);
  const [dragOverStage, setDragOverStage] = useState<LeadStatus | null>(null);

  // Panel
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Quick-add
  const [addLeadDialog, setAddLeadDialog] = useState<{
    open: boolean;
    status: LeadStatus;
  }>({ open: false, status: LeadStatus.new_ });

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [scoreMin, setScoreMin] = useState(0);
  const [filterActiveOutreach, setFilterActiveOutreach] = useState(false);
  const [filterAwaitingReply, setFilterAwaitingReply] = useState(false);
  const [mobileTab, setMobileTab] = useState<string>(String(LeadStatus.new_));

  // Pipeline header stats using all outreach messages
  const pipelineStats = useMemo(() => {
    const leadsWithOutreach = new Set(
      allMessages.map((m) => m.leadId.toString()),
    );
    const replied = new Set(
      allMessages
        .filter((m) => m.status === "replied")
        .map((m) => m.leadId.toString()),
    );
    const awaiting = new Set(
      allMessages
        .filter(
          (m) =>
            (m.status === "sent" || m.status === "delivered") &&
            !replied.has(m.leadId.toString()),
        )
        .map((m) => m.leadId.toString()),
    );
    return {
      total: leads.length,
      withActiveOutreach: leadsWithOutreach.size,
      replied: replied.size,
      awaitingFollowUp: awaiting.size,
    };
  }, [leads, allMessages]);

  // Stats for the KPI cards
  const stats = useMemo(() => {
    const weekAgo = Date.now() - 86400000 * 7;
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    return {
      total: leads.length,
      thisWeek: leads.filter((l) => Number(l.createdAt) > weekAgo).length,
      overdue: notes.filter(
        (n) =>
          n.noteType === NoteType.reminder &&
          !n.completed &&
          n.dueDate &&
          Number(n.dueDate) < Date.now(),
      ).length,
      closedThisMonth: leads.filter(
        (l) =>
          l.status === LeadStatus.closed &&
          Number(l.updatedAt) > monthStart.getTime(),
      ).length,
    };
  }, [leads, notes]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    const leadsWithActiveOutreach = new Set(
      allMessages.map((m) => m.leadId.toString()),
    );
    const leadsWithReply = new Set(
      allMessages
        .filter((m) => m.status === "replied")
        .map((m) => m.leadId.toString()),
    );
    const leadsAwaiting = new Set(
      allMessages
        .filter(
          (m) =>
            (m.status === "sent" || m.status === "delivered") &&
            !leadsWithReply.has(m.leadId.toString()),
        )
        .map((m) => m.leadId.toString()),
    );

    return leads.filter((l) => {
      const matchSearch =
        !searchQuery ||
        l.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchIndustry =
        industryFilter === "All Industries" || l.industry === industryFilter;
      const matchScore = Number(l.leadScore) >= scoreMin;
      const matchActiveOutreach =
        !filterActiveOutreach || leadsWithActiveOutreach.has(l.id.toString());
      const matchAwaitingReply =
        !filterAwaitingReply || leadsAwaiting.has(l.id.toString());
      return (
        matchSearch &&
        matchIndustry &&
        matchScore &&
        matchActiveOutreach &&
        matchAwaitingReply
      );
    });
  }, [
    leads,
    searchQuery,
    industryFilter,
    scoreMin,
    filterActiveOutreach,
    filterAwaitingReply,
    allMessages,
  ]);

  const stageLeads = (status: LeadStatus) =>
    filteredLeads.filter((l) => l.status === status);

  const handleDrop = (status: LeadStatus) => {
    if (draggedId !== null) {
      moveLeadMutation.mutate({ id: draggedId, status });
      setDraggedId(null);
      setDragOverStage(null);
    }
  };

  const handleAddNote = (content: string, type: NoteType, dueDate?: bigint) => {
    if (!selectedLead) return;
    const newNote: Note = {
      id: BigInt(Date.now()),
      leadId: selectedLead.id,
      content,
      noteType: type,
      dueDate,
      completed: false,
      createdAt: BigInt(Date.now()),
    };
    setLocalNotes((prev) => [...prev, newNote]);
    createNoteMutation.mutate({
      leadId: selectedLead.id,
      content,
      noteType: type,
      dueDate,
    });
  };

  const handleCompleteNote = (id: bigint) => {
    setLocalNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, completed: true } : n)),
    );
  };

  const handleStartOutreachFromCard = (lead: Lead) => {
    createCampaignMutation.mutate({
      leadId: lead.id,
      businessName: lead.businessName,
      channels: ["whatsapp", "email"],
    });
    for (const day of [1, 2, 4]) {
      createMessageMutation.mutate({
        leadId: lead.id,
        businessName: lead.businessName,
        channel: day === 2 ? "email" : "whatsapp",
        templateType: day === 1 ? "initial" : day === 2 ? "followup" : "final",
        dayNumber: day,
        personalizedMessage: `Day ${day} personalized outreach for ${lead.businessName}`,
        scheduledAt: BigInt(Date.now() + day * 86400000) * BigInt(1_000_000),
        detectedProblem: "weak_seo",
      });
    }
    toast.success(`Outreach campaign started for ${lead.businessName}`);
  };

  const statsData = [
    {
      label: "Total Leads",
      value: stats.total,
      icon: Users,
      color: "text-primary",
    },
    {
      label: "Added This Week",
      value: stats.thisWeek,
      icon: TrendingUp,
      color: "text-success",
    },
    {
      label: "Overdue Reminders",
      value: stats.overdue,
      icon: AlertCircle,
      color: stats.overdue > 0 ? "text-destructive" : "text-muted-foreground",
    },
    {
      label: "Closed This Month",
      value: stats.closedThisMonth,
      icon: CheckCircle2,
      color: "text-success",
    },
  ];

  const hasFilters =
    searchQuery ||
    industryFilter !== "All Industries" ||
    scoreMin > 0 ||
    filterActiveOutreach ||
    filterAwaitingReply;

  return (
    <div data-ocid="crm.page" className="flex flex-col gap-5 h-full">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">
            CRM Pipeline
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Drag leads through your sales stages
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() =>
            setAddLeadDialog({ open: true, status: LeadStatus.new_ })
          }
          data-ocid="crm.add_lead_button"
        >
          <Plus className="w-4 h-4" /> Add Lead
        </Button>
      </div>

      {/* Stats row */}
      <div
        data-ocid="crm.stats.section"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {statsData.map((s) => (
          <Card
            key={s.label}
            className="border-border/60 shadow-subtle overflow-hidden"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted/50">
                  <s.icon className={cn("w-4 h-4", s.color)} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {s.label}
                  </p>
                  <p
                    className={cn(
                      "text-2xl font-bold tabular-nums leading-tight",
                      s.color,
                    )}
                  >
                    {s.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline header stats */}
      <div
        data-ocid="crm.pipeline_stats.section"
        className="flex items-center gap-4 flex-wrap px-1 text-sm"
      >
        <span className="text-muted-foreground">
          <span className="font-semibold text-foreground">
            {pipelineStats.total}
          </span>{" "}
          Total Leads
        </span>
        <span className="text-muted-foreground/40">·</span>
        <span className="text-muted-foreground">
          <span className="font-semibold text-primary">
            {pipelineStats.withActiveOutreach}
          </span>{" "}
          with Active Outreach
        </span>
        <span className="text-muted-foreground/40">·</span>
        <span className="text-muted-foreground">
          <span className="font-semibold text-success">
            {pipelineStats.replied}
          </span>{" "}
          Replied
        </span>
        <span className="text-muted-foreground/40">·</span>
        <span className="text-muted-foreground">
          <span className="font-semibold text-warning">
            {pipelineStats.awaitingFollowUp}
          </span>{" "}
          Awaiting Follow-up
        </span>
      </div>

      {/* Filter bar */}
      <div
        data-ocid="crm.filter.section"
        className="flex items-center gap-2 flex-wrap"
      >
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            data-ocid="crm.filter.search_input"
            placeholder="Search leads…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-sm bg-background"
          />
        </div>
        <Select value={industryFilter} onValueChange={setIndustryFilter}>
          <SelectTrigger
            data-ocid="crm.filter.industry_select"
            className="h-8 text-xs w-auto min-w-[140px]"
          >
            <Filter className="w-3 h-3 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map((ind) => (
              <SelectItem key={ind} value={ind} className="text-xs">
                {ind}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={scoreMin.toString()}
          onValueChange={(v) => setScoreMin(Number(v))}
        >
          <SelectTrigger
            data-ocid="crm.filter.score_select"
            className="h-8 text-xs w-auto min-w-[120px]"
          >
            <Star className="w-3 h-3 mr-1" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0" className="text-xs">
              All Scores
            </SelectItem>
            <SelectItem value="60" className="text-xs">
              Score ≥ 60
            </SelectItem>
            <SelectItem value="75" className="text-xs">
              Score ≥ 75
            </SelectItem>
            <SelectItem value="90" className="text-xs">
              Score ≥ 90
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Active outreach filter */}
        <div className="flex items-center gap-1.5">
          <Checkbox
            id="filter-active-outreach"
            checked={filterActiveOutreach}
            onCheckedChange={(v) => setFilterActiveOutreach(!!v)}
            className="h-3.5 w-3.5"
            data-ocid="crm.filter.active_outreach_checkbox"
          />
          <Label
            htmlFor="filter-active-outreach"
            className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Active Outreach
          </Label>
        </div>

        {/* Awaiting reply filter */}
        <div className="flex items-center gap-1.5">
          <Checkbox
            id="filter-awaiting-reply"
            checked={filterAwaitingReply}
            onCheckedChange={(v) => setFilterAwaitingReply(!!v)}
            className="h-3.5 w-3.5"
            data-ocid="crm.filter.awaiting_reply_checkbox"
          />
          <Label
            htmlFor="filter-awaiting-reply"
            className="cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Awaiting Reply
          </Label>
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs gap-1 text-muted-foreground"
            onClick={() => {
              setSearchQuery("");
              setIndustryFilter("All Industries");
              setScoreMin(0);
              setFilterActiveOutreach(false);
              setFilterAwaitingReply(false);
            }}
            data-ocid="crm.filter.clear_button"
          >
            <X className="w-3 h-3" /> Clear
          </Button>
        )}
      </div>

      {/* Mobile: stage tabs */}
      <div className="lg:hidden">
        <Tabs value={mobileTab} onValueChange={setMobileTab}>
          <TabsList className="w-full grid grid-cols-4 h-9">
            {STAGE_CONFIG.map((stage) => (
              <TabsTrigger
                key={stage.status}
                value={String(stage.status)}
                className="text-xs"
                data-ocid={`crm.mobile_tab.${stage.status}`}
              >
                {stage.label.split(" ")[0]}
                <Badge
                  variant="outline"
                  className="ml-1 text-xs px-1 py-0 h-3.5 leading-none"
                >
                  {stageLeads(stage.status).length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Board layout: board + optional detail panel */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Desktop: 4-column kanban */}
        <div className="hidden lg:grid gap-3 flex-1 items-start grid-cols-4">
          {STAGE_CONFIG.map((stage) => (
            <KanbanColumn
              key={stage.status}
              stage={stage}
              leads={stageLeads(stage.status)}
              notes={notes}
              allMessages={allMessages}
              isDragOver={dragOverStage === stage.status}
              onDragOver={() => setDragOverStage(stage.status)}
              onDragLeave={() => setDragOverStage(null)}
              onDrop={() => handleDrop(stage.status)}
              onLeadDragStart={(id) => setDraggedId(id)}
              onLeadDragEnd={() => {
                setDraggedId(null);
                setDragOverStage(null);
              }}
              onLeadClick={(lead) =>
                setSelectedLead((prev) => (prev?.id === lead.id ? null : lead))
              }
              onAddLead={() =>
                setAddLeadDialog({ open: true, status: stage.status })
              }
              onStartOutreach={handleStartOutreachFromCard}
            />
          ))}
        </div>

        {/* Mobile: single stage view */}
        <div className="lg:hidden flex-1">
          {STAGE_CONFIG.filter((s) => String(s.status) === mobileTab).map(
            (stage) => (
              <KanbanColumn
                key={stage.status}
                stage={stage}
                leads={stageLeads(stage.status)}
                notes={notes}
                allMessages={allMessages}
                isDragOver={false}
                onDragOver={() => {}}
                onDragLeave={() => {}}
                onDrop={() => {}}
                onLeadDragStart={(id) => setDraggedId(id)}
                onLeadDragEnd={() => setDraggedId(null)}
                onLeadClick={(lead) => setSelectedLead(lead)}
                onAddLead={() =>
                  setAddLeadDialog({ open: true, status: stage.status })
                }
                onStartOutreach={handleStartOutreachFromCard}
              />
            ),
          )}
        </div>

        {/* Side panel */}
        {selectedLead && (
          <div
            data-ocid="crm.detail.panel"
            className="w-80 xl:w-96 shrink-0 rounded-xl border border-border/60 shadow-elevated overflow-hidden hidden lg:flex flex-col"
          >
            <LeadDetailPanel
              lead={selectedLead}
              notes={notes}
              onClose={() => setSelectedLead(null)}
              onComplete={handleCompleteNote}
              onAddNote={handleAddNote}
              isAddingNote={createNoteMutation.isPending}
            />
          </div>
        )}
      </div>

      {/* Mobile: lead detail as dialog */}
      <Dialog
        open={!!selectedLead && window.innerWidth < 1024}
        onOpenChange={(o) => !o && setSelectedLead(null)}
      >
        <DialogContent
          data-ocid="crm.lead_detail.dialog"
          className="p-0 max-w-lg h-[80vh] flex flex-col"
        >
          {selectedLead && (
            <LeadDetailPanel
              lead={selectedLead}
              notes={notes}
              onClose={() => setSelectedLead(null)}
              onComplete={handleCompleteNote}
              onAddNote={handleAddNote}
              isAddingNote={createNoteMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Quick-add lead dialog */}
      <QuickAddLeadDialog
        open={addLeadDialog.open}
        defaultStatus={addLeadDialog.status}
        onClose={() => setAddLeadDialog((s) => ({ ...s, open: false }))}
      />

      {/* Calendar reference hint (hidden, for future) */}
      <span className="sr-only">
        <Calendar className="w-3 h-3" />
      </span>
    </div>
  );
}
