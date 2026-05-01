import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Bot,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Smile,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type InboxChannel = "all" | "whatsapp" | "email";
type PipelineStage = "new" | "contacted" | "interested" | "proposal" | "closed";

interface InboxConversation {
  id: string;
  channel: "whatsapp" | "email";
  businessName: string;
  ownerName: string;
  city: string;
  industry: string;
  phone: string;
  email: string;
  leadScore: number;
  pipelineStage: PipelineStage;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: InboxMessage[];
  nextFollowUp: string;
}

interface InboxMessage {
  id: string;
  from: "us" | "them";
  content: string;
  timestamp: string;
  type: "whatsapp" | "email";
  read: boolean;
}

interface FollowUpEntry {
  day: number;
  label: string;
  type: "whatsapp" | "email";
  date: string;
  status: "sent" | "scheduled" | "replied";
}

interface TimelineEntry {
  label: string;
  date: string;
  status: "done" | "current" | "pending";
  icon: "send" | "reply" | "follow" | "plan";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_CONVERSATIONS: InboxConversation[] = [
  {
    id: "conv-1",
    channel: "whatsapp",
    businessName: "Sunrise Salon",
    ownerName: "Priya Sharma",
    city: "Mumbai",
    industry: "Beauty & Wellness",
    phone: "+91 98765 43210",
    email: "priya@sunrisesalon.in",
    leadScore: 87,
    pipelineStage: "interested",
    lastMessage:
      "Hi, I saw your message about SEO. Very interesting! Can we schedule a call this week?",
    lastMessageAt: "2m ago",
    unreadCount: 2,
    nextFollowUp: "Today, 4:00 PM",
    messages: [
      {
        id: "m1",
        from: "us",
        content:
          "Hi Sunrise Salon! We analyzed your online presence in Mumbai and found you may be missing customers from Google search. Would you like a free growth audit?",
        timestamp: "Yesterday, 10:00 AM",
        type: "whatsapp",
        read: true,
      },
      {
        id: "m2",
        from: "them",
        content: "Hi, I saw your message about SEO. Very interesting!",
        timestamp: "Yesterday, 2:30 PM",
        type: "whatsapp",
        read: true,
      },
      {
        id: "m3",
        from: "us",
        content:
          "Great to hear! Your salon has strong reviews but low Google ranking for 'salon Mumbai'. We can fix that and get you 30–50 new customers monthly. Can we schedule a quick call?",
        timestamp: "Yesterday, 3:00 PM",
        type: "whatsapp",
        read: true,
      },
      {
        id: "m4",
        from: "them",
        content:
          "Hi, I saw your message about SEO. Very interesting! Can we schedule a call this week?",
        timestamp: "2m ago",
        type: "whatsapp",
        read: false,
      },
    ],
    followUps: [],
  } as InboxConversation & { followUps: FollowUpEntry[] },
  {
    id: "conv-2",
    channel: "email",
    businessName: "FitZone Gym",
    ownerName: "Rahul Mehta",
    city: "Pune",
    industry: "Fitness & Health",
    phone: "+91 87654 32109",
    email: "rahul@fitzonegym.com",
    leadScore: 74,
    pipelineStage: "contacted",
    lastMessage: "Can we schedule a call? What's included in the ₹25k package?",
    lastMessageAt: "1h ago",
    unreadCount: 1,
    nextFollowUp: "Tomorrow, 11:00 AM",
    messages: [
      {
        id: "m5",
        from: "us",
        content:
          "Hi Rahul, quick idea for FitZone Gym — I noticed your gym isn't ranking for key searches in Pune. You could be missing 100+ leads monthly. Happy to share a free audit.",
        timestamp: "2 days ago",
        type: "email",
        read: true,
      },
      {
        id: "m6",
        from: "them",
        content:
          "Thanks for reaching out. Sounds interesting. Can we schedule a call? What's included in the ₹25k package?",
        timestamp: "1h ago",
        type: "email",
        read: false,
      },
    ],
    followUps: [],
  } as InboxConversation & { followUps: FollowUpEntry[] },
  {
    id: "conv-3",
    channel: "whatsapp",
    businessName: "Spice Route Restaurant",
    ownerName: "Anita Patel",
    city: "Bangalore",
    industry: "Food & Beverage",
    phone: "+91 76543 21098",
    email: "anita@spiceroute.in",
    leadScore: 91,
    pipelineStage: "proposal",
    lastMessage:
      "We reviewed your proposal. Very impressed with the ROI numbers!",
    lastMessageAt: "3h ago",
    unreadCount: 0,
    nextFollowUp: "Friday, 2:00 PM",
    messages: [
      {
        id: "m7",
        from: "us",
        content:
          "Hi Spice Route! Your restaurant has amazing food but your online presence needs work. We helped 3 restaurants in Bangalore 3x their online orders. Want to see how?",
        timestamp: "4 days ago",
        type: "whatsapp",
        read: true,
      },
      {
        id: "m8",
        from: "them",
        content: "Yes, please share details!",
        timestamp: "4 days ago",
        type: "whatsapp",
        read: true,
      },
      {
        id: "m9",
        from: "us",
        content:
          "Here's your custom growth proposal — 90-day roadmap with expected 40% revenue increase. [View Proposal]",
        timestamp: "3 days ago",
        type: "whatsapp",
        read: true,
      },
      {
        id: "m10",
        from: "them",
        content:
          "We reviewed your proposal. Very impressed with the ROI numbers!",
        timestamp: "3h ago",
        type: "whatsapp",
        read: false,
      },
    ],
    followUps: [],
  } as InboxConversation & { followUps: FollowUpEntry[] },
  {
    id: "conv-4",
    channel: "email",
    businessName: "TechCraft Solutions",
    ownerName: "Vikram Singh",
    city: "Delhi",
    industry: "Software & IT",
    phone: "+91 65432 10987",
    email: "vikram@techcraft.io",
    leadScore: 62,
    pipelineStage: "new",
    lastMessage:
      "Following up on our outreach about your SEO audit opportunity.",
    lastMessageAt: "5h ago",
    unreadCount: 0,
    nextFollowUp: "Monday, 10:00 AM",
    messages: [
      {
        id: "m11",
        from: "us",
        content:
          "Hi Vikram, noticed TechCraft Solutions could significantly improve its Google rankings in Delhi. We've helped 20+ tech companies get 200% more organic leads. Interested in a free audit?",
        timestamp: "1 week ago",
        type: "email",
        read: true,
      },
      {
        id: "m12",
        from: "us",
        content:
          "Following up on our outreach about your SEO audit opportunity.",
        timestamp: "5h ago",
        type: "email",
        read: true,
      },
    ],
    followUps: [],
  } as InboxConversation & { followUps: FollowUpEntry[] },
  {
    id: "conv-5",
    channel: "whatsapp",
    businessName: "Golden Threads Boutique",
    ownerName: "Meera Joshi",
    city: "Jaipur",
    industry: "Fashion & Retail",
    phone: "+91 54321 09876",
    email: "meera@goldenthreads.in",
    leadScore: 79,
    pipelineStage: "contacted",
    lastMessage: "Not sure if we need digital marketing right now.",
    lastMessageAt: "1d ago",
    unreadCount: 0,
    nextFollowUp: "Wednesday, 3:00 PM",
    messages: [
      {
        id: "m13",
        from: "us",
        content:
          "Hi Golden Threads! Your boutique has beautiful products but low online visibility. We can get you ranked for 'designer boutique Jaipur' and drive 50+ new customers monthly.",
        timestamp: "2 days ago",
        type: "whatsapp",
        read: true,
      },
      {
        id: "m14",
        from: "them",
        content: "Not sure if we need digital marketing right now.",
        timestamp: "1d ago",
        type: "whatsapp",
        read: true,
      },
    ],
    followUps: [],
  } as InboxConversation & { followUps: FollowUpEntry[] },
];

const FOLLOW_UP_SCHEDULE: FollowUpEntry[] = [
  {
    day: 1,
    label: "Initial Outreach",
    type: "whatsapp",
    date: "Apr 28",
    status: "sent",
  },
  {
    day: 3,
    label: "Reminder",
    type: "email",
    date: "Apr 30",
    status: "replied",
  },
  {
    day: 7,
    label: "Final Follow-up",
    type: "whatsapp",
    date: "May 4",
    status: "scheduled",
  },
];

const getTimeline = (stage: PipelineStage): TimelineEntry[] => [
  {
    label: "Initial message sent",
    date: "Apr 28",
    status: stage !== "new" ? "done" : "current",
    icon: "send",
  },
  {
    label: "No reply — follow-up sent",
    date: "Apr 30",
    status:
      stage === "contacted" ? "current" : stage === "new" ? "pending" : "done",
    icon: "follow",
  },
  {
    label: "Lead replied",
    date: "May 1",
    status:
      stage === "interested" || stage === "proposal" || stage === "closed"
        ? "done"
        : "pending",
    icon: "reply",
  },
  {
    label: "Proposal sent",
    date: "May 2",
    status: stage === "proposal" || stage === "closed" ? "done" : "pending",
    icon: "plan",
  },
];

const AI_SUGGESTIONS: Record<string, string[]> = {
  "conv-1": [
    "Great question! Our ₹25k Growth package includes SEO, Google Ads, and social media management for 3 months.",
    "Happy to schedule a call tomorrow at 11am? I'll walk you through your free audit report.",
    "Let me send you our detailed proposal with ROI projections for Sunrise Salon.",
  ],
  "conv-2": [
    "Great question! Our ₹25k Growth package includes full SEO, 3 Google Ads campaigns, and monthly reporting.",
    "Let's do a 15-minute call tomorrow at your convenience — I'll walk through FitZone's growth roadmap.",
    "I'll send over our detailed proposal with specific ROI projections for gyms in Pune.",
  ],
  default: [
    "Great question! Our ₹25k Growth package includes SEO, ads management, and monthly reporting.",
    "Happy to schedule a call tomorrow at 11am? I'll walk you through your personalized growth plan.",
    "Let me send you our detailed proposal with ROI projections specific to your industry.",
  ],
};

const OBJECTION_RESPONSES: Record<string, string> = {
  "Too expensive":
    "I completely understand — let me reframe this. If our ₹25k/month plan generates even 5 new clients, and your average client value is ₹10k, that's ₹50k revenue from ₹25k investment. That's a 2x ROI in month one. Want me to run the numbers for your specific business?",
  "Not interested now":
    "That's totally fair! Most businesses say the same before they see how much revenue they're leaving on the table. Can I share a quick 2-minute case study of a similar business in your city that went from 0 to 40 leads/month? No commitment, just data.",
  "Already have someone":
    "Great — competition keeps everyone sharp! Would you be open to a free second-opinion audit? We'd compare current results vs. what we'd deliver, completely no-obligation. Many clients switch after seeing the gap.",
  "Need to think":
    "Of course, take your time! Just so you have the right info — our current offer includes a free 30-day trial with full access. After that, you only continue if you see results. Does that make the decision easier?",
};

const STAGE_CONFIG: Record<PipelineStage, { label: string; cls: string }> = {
  new: { label: "New Lead", cls: "bg-muted/50 text-muted-foreground" },
  contacted: { label: "Contacted", cls: "bg-primary/10 text-primary" },
  interested: { label: "Interested", cls: "bg-warning/10 text-warning" },
  proposal: { label: "Proposal Sent", cls: "bg-accent/10 text-accent" },
  closed: { label: "Closed", cls: "bg-success/10 text-success" },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const cls =
    score >= 80
      ? "bg-success/15 text-success border-success/30"
      : score >= 65
        ? "bg-warning/15 text-warning border-warning/30"
        : "bg-muted/50 text-muted-foreground border-border/40";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border",
        cls,
      )}
    >
      <Star className="w-2.5 h-2.5 fill-current" />
      {score}
    </span>
  );
}

function ChannelIcon({ channel }: { channel: "whatsapp" | "email" }) {
  return channel === "whatsapp" ? (
    <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center shrink-0">
      <svg
        viewBox="0 0 24 24"
        className="w-3 h-3 fill-current text-success"
        aria-label="WhatsApp"
      >
        <title>WhatsApp</title>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </div>
  ) : (
    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
      <Mail className="w-2.5 h-2.5 text-primary" />
    </div>
  );
}

function ConversationItem({
  conv,
  isActive,
  onClick,
  index,
}: {
  conv: InboxConversation;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      data-ocid={`inbox.conversation.item.${index}`}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 px-4 py-3.5 cursor-pointer border-b border-border/40 transition-fast relative",
        isActive
          ? "bg-primary/8 border-l-2 border-l-primary"
          : "hover:bg-muted/30 border-l-2 border-l-transparent",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-sm",
          isActive
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground",
        )}
      >
        {conv.businessName.charAt(0)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span
            className={cn(
              "text-sm font-semibold truncate",
              isActive ? "text-primary" : "text-foreground",
            )}
          >
            {conv.businessName}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-muted-foreground">
              {conv.lastMessageAt}
            </span>
            {conv.unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                {conv.unreadCount}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-1">
          <ChannelIcon channel={conv.channel} />
          <span className="text-xs text-muted-foreground">{conv.city}</span>
        </div>
        <p className="text-xs text-muted-foreground truncate leading-relaxed">
          {conv.lastMessage}
        </p>
      </div>
    </motion.div>
  );
}

function MessageBubble({ msg, index }: { msg: InboxMessage; index: number }) {
  const isUs = msg.from === "us";
  return (
    <motion.div
      key={msg.id}
      initial={{ opacity: 0, scale: 0.95, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.22,
        type: "spring",
        stiffness: 300,
        damping: 24,
      }}
      className={cn(
        "flex gap-2.5 max-w-[85%]",
        isUs ? "ml-auto flex-row-reverse" : "mr-auto",
      )}
    >
      {!isUs && (
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 text-xs font-bold text-foreground mt-0.5">
          T
        </div>
      )}
      <div
        className={cn(
          "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-xs",
          isUs
            ? msg.type === "whatsapp"
              ? "bg-success/20 text-foreground rounded-tr-sm border border-success/20"
              : "bg-primary/15 text-foreground rounded-tr-sm border border-primary/20"
            : "bg-card text-foreground rounded-tl-sm border border-border/60",
        )}
      >
        <p>{msg.content}</p>
        <p
          className={cn(
            "text-xs mt-1",
            isUs
              ? "text-right text-muted-foreground/70"
              : "text-muted-foreground/70",
          )}
        >
          {msg.timestamp}
        </p>
      </div>
    </motion.div>
  );
}

function LeadProfilePanel({ conv }: { conv: InboxConversation }) {
  const timeline = getTimeline(conv.pipelineStage);
  const stageCfg = STAGE_CONFIG[conv.pipelineStage];

  const timelineIconMap = {
    send: Send,
    reply: MessageCircle,
    follow: Clock,
    plan: Calendar,
  };

  return (
    <div className="w-64 shrink-0 border-l border-border/50 bg-card/50 flex flex-col overflow-hidden">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Avatar + name */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-xl font-bold text-primary">
              {conv.businessName.charAt(0)}
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">
                {conv.businessName}
              </p>
              <p className="text-xs text-muted-foreground">{conv.ownerName}</p>
            </div>
            <ScoreBadge score={conv.leadScore} />
          </div>

          {/* Stage */}
          <div className="rounded-lg bg-muted/30 border border-border/40 p-3">
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">
              Pipeline Stage
            </p>
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold",
                stageCfg.cls,
              )}
            >
              {stageCfg.label}
            </span>
          </div>

          {/* Contact info */}
          <div className="rounded-lg bg-muted/30 border border-border/40 p-3 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Contact
            </p>
            <div className="flex items-center gap-2 text-xs text-foreground">
              <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
              <span>{conv.city}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground">
              <Phone className="w-3 h-3 text-muted-foreground shrink-0" />
              <span className="truncate">{conv.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground">
              <Mail className="w-3 h-3 text-muted-foreground shrink-0" />
              <span className="truncate">{conv.email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground">
              <Zap className="w-3 h-3 text-muted-foreground shrink-0" />
              <span>{conv.industry}</span>
            </div>
          </div>

          {/* Interaction timeline */}
          <div className="rounded-lg bg-muted/30 border border-border/40 p-3">
            <p className="text-xs font-semibold text-muted-foreground mb-3">
              Interaction Timeline
            </p>
            <div className="space-y-3">
              {timeline.map((entry, i) => {
                const Icon = timelineIconMap[entry.icon];
                return (
                  <div key={entry.label} className="flex gap-2.5">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                          entry.status === "done"
                            ? "bg-success/20"
                            : entry.status === "current"
                              ? "bg-primary/20"
                              : "bg-muted/50",
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-2.5 h-2.5",
                            entry.status === "done"
                              ? "text-success"
                              : entry.status === "current"
                                ? "text-primary"
                                : "text-muted-foreground/40",
                          )}
                        />
                      </div>
                      {i < timeline.length - 1 && (
                        <div
                          className={cn(
                            "w-px h-4 mt-0.5",
                            entry.status === "done"
                              ? "bg-success/30"
                              : "bg-border/40",
                          )}
                        />
                      )}
                    </div>
                    <div className="pb-2">
                      <p
                        className={cn(
                          "text-xs font-medium leading-tight",
                          entry.status === "pending"
                            ? "text-muted-foreground/50"
                            : "text-foreground",
                        )}
                      >
                        {entry.label}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">
                        {entry.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Follow-up schedule */}
          <div className="rounded-lg bg-muted/30 border border-border/40 p-3">
            <p className="text-xs font-semibold text-muted-foreground mb-2">
              Follow-up Schedule
            </p>
            <div className="space-y-2">
              {FOLLOW_UP_SCHEDULE.map((fu) => (
                <div key={fu.day} className="flex items-center gap-2">
                  <ChannelIcon channel={fu.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      Day {fu.day}: {fu.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{fu.date}</p>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-semibold px-1.5 py-0.5 rounded",
                      fu.status === "sent"
                        ? "bg-primary/10 text-primary"
                        : fu.status === "replied"
                          ? "bg-success/10 text-success"
                          : "bg-muted/50 text-muted-foreground",
                    )}
                  >
                    {fu.status === "sent"
                      ? "Sent"
                      : fu.status === "replied"
                        ? "Replied"
                        : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next follow-up */}
          <div className="rounded-lg bg-primary/8 border border-primary/20 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              <p className="text-xs font-semibold text-primary">
                Next Follow-up
              </p>
            </div>
            <p className="text-xs text-foreground">{conv.nextFollowUp}</p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyThreadState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="w-20 h-20 rounded-2xl bg-muted/40 flex items-center justify-center"
      >
        <MessageCircle className="w-9 h-9 text-muted-foreground/40" />
      </motion.div>
      <div className="text-center">
        <p className="text-base font-semibold text-foreground">
          Select a conversation
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Choose a message from the left to view the full thread.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OutreachPage() {
  const [channelFilter, setChannelFilter] = useState<InboxChannel>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [composerText, setComposerText] = useState("");
  const [objectionOpen, setObjectionOpen] = useState(false);
  const [activeObjection, setActiveObjection] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      channelFilter === "all"
        ? MOCK_CONVERSATIONS
        : MOCK_CONVERSATIONS.filter((c) => c.channel === channelFilter),
    [channelFilter],
  );

  const selected = useMemo(
    () => MOCK_CONVERSATIONS.find((c) => c.id === selectedId) ?? null,
    [selectedId],
  );

  const aiSuggestions = useMemo(
    () => AI_SUGGESTIONS[selectedId ?? ""] ?? AI_SUGGESTIONS.default,
    [selectedId],
  );

  const totalUnread = MOCK_CONVERSATIONS.reduce(
    (acc, c) => acc + c.unreadCount,
    0,
  );

  const handleSend = useCallback(() => {
    if (!composerText.trim()) return;
    setComposerText("");
  }, [composerText]);

  const handleSuggestionClick = useCallback((text: string) => {
    setComposerText(text);
  }, []);

  return (
    <div data-ocid="inbox.page" className="h-full flex flex-col bg-background">
      {/* Page header */}
      <div className="px-6 py-4 border-b border-border/50 bg-card shadow-xs shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span>GrowthOS</span>
                  <span>/</span>
                  <span className="text-foreground font-medium">Inbox</span>
                </nav>
              </div>
              <div className="flex items-center gap-2.5 mt-0.5">
                <h1 className="text-xl font-semibold text-foreground font-display">
                  Inbox
                </h1>
                {totalUnread > 0 && (
                  <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/15 font-bold text-xs px-2 py-0.5">
                    {totalUnread} unread
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button
            data-ocid="inbox.compose_button"
            size="sm"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-smooth"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Compose
          </Button>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left sidebar — conversation list */}
        <div className="w-72 shrink-0 flex flex-col border-r border-border/50 bg-card/30">
          {/* Tab switcher */}
          <div className="px-3 pt-3 pb-2 border-b border-border/40">
            <Tabs
              value={channelFilter}
              onValueChange={(v) => setChannelFilter(v as InboxChannel)}
            >
              <TabsList className="w-full h-8 bg-muted/40 p-0.5">
                <TabsTrigger
                  value="all"
                  data-ocid="inbox.filter.all.tab"
                  className="flex-1 text-xs h-7 data-[state=active]:bg-card data-[state=active]:shadow-xs"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="whatsapp"
                  data-ocid="inbox.filter.whatsapp.tab"
                  className="flex-1 text-xs h-7 data-[state=active]:bg-card data-[state=active]:shadow-xs"
                >
                  WhatsApp
                </TabsTrigger>
                <TabsTrigger
                  value="email"
                  data-ocid="inbox.filter.email.tab"
                  className="flex-1 text-xs h-7 data-[state=active]:bg-card data-[state=active]:shadow-xs"
                >
                  Email
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Message list */}
          <ScrollArea className="flex-1">
            {filtered.length === 0 ? (
              <div
                data-ocid="inbox.list.empty_state"
                className="flex flex-col items-center justify-center gap-3 py-16 px-4"
              >
                <MessageCircle className="w-10 h-10 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground text-center">
                  No messages yet
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  data-ocid="inbox.start_outreach_button"
                >
                  Start Outreach
                </Button>
              </div>
            ) : (
              filtered.map((conv, i) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  index={i + 1}
                  isActive={selectedId === conv.id}
                  onClick={() => setSelectedId(conv.id)}
                />
              ))
            )}
          </ScrollArea>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex"
              >
                <EmptyThreadState />
              </motion.div>
            ) : (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex min-h-0"
              >
                {/* Thread panel */}
                <div className="flex-1 flex flex-col min-w-0">
                  {/* Thread header */}
                  <div className="px-5 py-3.5 border-b border-border/50 bg-card/40 flex items-center gap-3 shrink-0">
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center font-bold text-primary text-sm">
                      {selected.businessName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-foreground text-sm">
                          {selected.businessName}
                        </p>
                        <ChannelIcon channel={selected.channel} />
                        <ScoreBadge score={selected.leadScore} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {selected.ownerName} · {selected.city} ·{" "}
                        {selected.industry}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 shrink-0"
                      onClick={() => setSelectedId(null)}
                      data-ocid="inbox.thread.close_button"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 px-5 py-4">
                    <div className="space-y-3">
                      {selected.messages.map((msg, i) => (
                        <MessageBubble key={msg.id} msg={msg} index={i} />
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Reply composer */}
                  <div className="border-t border-border/50 bg-card/40 p-4 shrink-0 space-y-3">
                    {/* Text area + send */}
                    <div className="flex gap-2 items-end">
                      <div className="flex-1 relative">
                        <Textarea
                          data-ocid="inbox.reply.textarea"
                          value={composerText}
                          onChange={(e) => setComposerText(e.target.value)}
                          placeholder={`Reply via ${selected.channel === "whatsapp" ? "WhatsApp" : "Email"}…`}
                          className="resize-none min-h-[72px] pr-10 text-sm bg-background border-border/60 focus:border-primary/40"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
                              handleSend();
                          }}
                        />
                        <button
                          type="button"
                          className="absolute bottom-2.5 right-2.5 text-muted-foreground hover:text-foreground transition-fast"
                          data-ocid="inbox.reply.emoji_button"
                        >
                          <Smile className="w-4 h-4" />
                        </button>
                      </div>
                      <Button
                        onClick={handleSend}
                        disabled={!composerText.trim()}
                        className="gap-2 shrink-0 self-end"
                        data-ocid="inbox.reply.send_button"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send
                      </Button>
                    </div>

                    {/* AI suggestions */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Bot className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-semibold text-primary">
                          AI Reply Suggestions
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {aiSuggestions.map((suggestion, i) => (
                          <button
                            type="button"
                            key={`suggestion-${suggestion.slice(0, 20)}`}
                            data-ocid={`inbox.ai_suggestion.item.${i + 1}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-left text-xs px-3 py-2 rounded-lg bg-primary/6 border border-primary/15 text-foreground hover:bg-primary/12 hover:border-primary/25 transition-fast line-clamp-1"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Objection handling */}
                    <div className="border border-border/40 rounded-lg overflow-hidden">
                      <button
                        type="button"
                        data-ocid="inbox.objection.toggle"
                        onClick={() => setObjectionOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-3 py-2.5 bg-muted/20 hover:bg-muted/40 transition-fast text-sm font-medium text-foreground"
                      >
                        <div className="flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-warning" />
                          Handle Objection
                        </div>
                        {objectionOpen ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>

                      <AnimatePresence>
                        {objectionOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-3 py-3 space-y-2 border-t border-border/40">
                              <div className="flex flex-wrap gap-1.5">
                                {Object.keys(OBJECTION_RESPONSES).map((obj) => (
                                  <button
                                    type="button"
                                    key={obj}
                                    data-ocid={`inbox.objection.${obj.toLowerCase().replace(/\s+/g, "_")}`}
                                    onClick={() =>
                                      setActiveObjection(
                                        activeObjection === obj ? null : obj,
                                      )
                                    }
                                    className={cn(
                                      "text-xs px-2.5 py-1 rounded-full border font-medium transition-fast",
                                      activeObjection === obj
                                        ? "bg-warning/15 text-warning border-warning/30"
                                        : "bg-muted/30 text-muted-foreground border-border/40 hover:bg-muted/60",
                                    )}
                                  >
                                    {obj}
                                  </button>
                                ))}
                              </div>
                              <AnimatePresence>
                                {activeObjection && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.18 }}
                                    className="rounded-lg bg-warning/6 border border-warning/20 p-3"
                                  >
                                    <div className="flex items-start justify-between gap-2 mb-1.5">
                                      <p className="text-xs font-semibold text-warning">
                                        {activeObjection}
                                      </p>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleSuggestionClick(
                                            OBJECTION_RESPONSES[
                                              activeObjection
                                            ],
                                          )
                                        }
                                        className="text-xs text-primary font-semibold hover:underline shrink-0"
                                        data-ocid="inbox.objection.use_response_button"
                                      >
                                        Use this →
                                      </button>
                                    </div>
                                    <p className="text-xs text-foreground leading-relaxed">
                                      {OBJECTION_RESPONSES[activeObjection]}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Lead profile panel */}
                <LeadProfilePanel conv={selected} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
