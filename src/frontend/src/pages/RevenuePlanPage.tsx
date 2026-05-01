import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  Flame,
  IndianRupee,
  Link2,
  Share2,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useConsentLogs } from "../hooks/useCompliance";
import { useCreateLead, useLeads } from "../hooks/useLeads";
import type { PilotClient } from "../types/compliance";

const NICHES = [
  "Salons",
  "Gyms",
  "Yoga Studios",
  "Restaurants",
  "Clinics",
  "Real Estate",
];

const NICHE_DATA: Record<
  string,
  {
    leads: number;
    replyRate: string;
    pilotClients: number;
    estimatedMRR: number;
  }
> = {
  Salons: { leads: 48, replyRate: "22%", pilotClients: 3, estimatedMRR: 45000 },
  Gyms: { leads: 31, replyRate: "18%", pilotClients: 2, estimatedMRR: 28000 },
  "Yoga Studios": {
    leads: 22,
    replyRate: "25%",
    pilotClients: 1,
    estimatedMRR: 18000,
  },
  Restaurants: {
    leads: 67,
    replyRate: "14%",
    pilotClients: 4,
    estimatedMRR: 52000,
  },
  Clinics: {
    leads: 29,
    replyRate: "20%",
    pilotClients: 2,
    estimatedMRR: 38000,
  },
  "Real Estate": {
    leads: 41,
    replyRate: "17%",
    pilotClients: 3,
    estimatedMRR: 62000,
  },
};

const MOCK_PILOT_CLIENTS: PilotClient[] = [
  {
    leadId: "1",
    businessName: "Glamour Cuts Salon",
    niche: "Salons",
    city: "Mumbai",
    mrrAmount: 12000,
    testimonial:
      "Our bookings went up 3x in the first month. Absolutely worth every rupee.",
    caseStudy:
      "Increased Instagram reach from 500 to 4,200 followers. Google reviews up from 12 to 47.",
    startDate: "2026-03-01",
    status: "active",
  },
  {
    leadId: "2",
    businessName: "FitNation Gym",
    niche: "Gyms",
    city: "Pune",
    mrrAmount: 9999,
    testimonial:
      "We closed 28 new memberships just from the WhatsApp campaign.",
    caseStudy:
      "SEO audit revealed 3 critical issues. Fixed them → 2x organic traffic in 45 days.",
    startDate: "2026-02-15",
    status: "active",
  },
  {
    leadId: "3",
    businessName: "Saffron Restaurant",
    niche: "Restaurants",
    city: "Bangalore",
    mrrAmount: 7500,
    testimonial:
      "The AI-generated content saved us 10 hours/week of work. Worth it.",
    caseStudy:
      "Ran festival campaign for Holi → ₹1.2L in catering orders in 3 days.",
    startDate: "2026-03-20",
    status: "trial",
  },
];

const MILESTONES = [
  { label: "₹10k MRR", target: 10000, badge: "🥉 Bronze" },
  { label: "₹50k MRR", target: 50000, badge: "🥈 Silver" },
  { label: "₹1L MRR", target: 100000, badge: "🥇 Gold" },
];

const DAILY_TASKS = [
  "Contact 10 new leads via WhatsApp or Email",
  "Launch 1 outreach campaign for the top niche",
  "Follow up with 5 leads who haven't replied in 2 days",
];

function FunnelStage({
  label,
  count,
  rate,
  color,
  isLast,
}: {
  label: string;
  count: number;
  rate?: string;
  color: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "px-5 py-3 rounded-xl text-center border min-w-[110px]",
          color,
        )}
      >
        <p className="text-2xl font-bold tabular-nums">{count}</p>
        <p className="text-xs font-medium opacity-80">{label}</p>
      </div>
      {!isLast && (
        <div className="flex flex-col items-center gap-0.5 text-muted-foreground">
          <ArrowRight className="w-4 h-4 rotate-90" />
          {rate && (
            <span className="text-[10px] font-semibold text-primary">
              {rate}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default function RevenuePlanPage() {
  const { data: leads = [] } = useLeads();
  const { data: consentLogs = [] } = useConsentLogs();
  const createLead = useCreateLead();

  const [selectedNiche, setSelectedNiche] = useState("Salons");
  const [pilotClients, setPilotClients] =
    useState<PilotClient[]>(MOCK_PILOT_CLIENTS);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [streak] = useState(7);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [showAddPilot, setShowAddPilot] = useState(false);
  const [auditForm, setAuditForm] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    niche: "Salons",
  });
  const [pilotForm, setPilotForm] = useState({
    businessName: "",
    niche: "Salons",
    city: "",
    mrrAmount: "",
    testimonial: "",
    caseStudy: "",
  });
  const [copied, setCopied] = useState(false);

  const totalMRR = pilotClients
    .filter((p) => p.status === "active")
    .reduce((s, p) => s + p.mrrAmount, 0);
  const targetMRR = 100000;
  const mrrProgress = Math.min((totalMRR / targetMRR) * 100, 100);

  const replies = consentLogs.filter((l) => l.status === "granted").length;
  const niche = NICHE_DATA[selectedNiche] ?? NICHE_DATA.Salons;
  const auditLeadsCount = leads.filter((l) =>
    l.notes?.includes("audit"),
  ).length;

  const referralUrl = useMemo(
    () =>
      `https://growthapp.in/audit/usr-${Math.random().toString(36).slice(2, 8)}`,
    [],
  );

  const copyRef = () => {
    navigator.clipboard.writeText(referralUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleTask = (i: number) => {
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const submitAuditForm = async () => {
    await createLead.mutateAsync({
      businessName: auditForm.businessName,
      phone: auditForm.phone,
      website: "",
      city: "",
      industry: auditForm.niche,
      address: "",
      notes: `audit_lead:${auditForm.email}`,
      rating: 0,
      leadScore: BigInt(70),
    });
    setAuditForm({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      niche: "Salons",
    });
    setShowAuditModal(false);
  };

  const addPilotClient = () => {
    const pilot: PilotClient = {
      leadId: `pilot_${Date.now()}`,
      businessName: pilotForm.businessName,
      niche: pilotForm.niche,
      city: pilotForm.city,
      mrrAmount: Number(pilotForm.mrrAmount),
      testimonial: pilotForm.testimonial,
      caseStudy: pilotForm.caseStudy,
      startDate: new Date().toISOString().slice(0, 10),
      status: "active",
    };
    setPilotClients((prev) => [pilot, ...prev]);
    setPilotForm({
      businessName: "",
      niche: "Salons",
      city: "",
      mrrAmount: "",
      testimonial: "",
      caseStudy: "",
    });
    setShowAddPilot(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          ₹1L/Month Revenue Plan
        </h1>
        <p className="text-muted-foreground mt-1">
          Your acquisition roadmap to sustainable, compliant growth
        </p>
      </div>

      {/* Funnel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Acquisition Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <FunnelStage
              label="Leads"
              count={leads.length}
              rate="22%"
              color="bg-primary/10 border-primary/20 text-primary"
            />
            <FunnelStage
              label="Replied"
              count={replies}
              rate="40%"
              color="bg-success/10 border-success/20 text-success"
            />
            <FunnelStage
              label="Pilots"
              count={pilotClients.filter((p) => p.status !== "churned").length}
              rate="66%"
              color="bg-warning/10 border-warning/20 text-warning"
            />
            <FunnelStage
              label="Paying"
              count={pilotClients.filter((p) => p.status === "active").length}
              rate="MRR"
              color="bg-chart-3/10 border-chart-3/20 text-chart-3"
            />
            <FunnelStage
              label={`₹${(totalMRR / 1000).toFixed(0)}k`}
              count={totalMRR}
              isLast
              color="bg-primary/10 border-primary/30 text-primary"
            />
          </div>
        </CardContent>
      </Card>

      {/* Niche Focus */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-base">Niche Focus</CardTitle>
            <Select value={selectedNiche} onValueChange={setSelectedNiche}>
              <SelectTrigger className="w-44" data-ocid="revenue.niche_select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NICHES.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Leads Found",
                value: niche.leads,
                icon: Users,
                color: "text-primary",
              },
              {
                label: "Reply Rate",
                value: niche.replyRate,
                icon: CheckCircle2,
                color: "text-success",
              },
              {
                label: "Pilot Clients",
                value: niche.pilotClients,
                icon: Star,
                color: "text-warning",
              },
              {
                label: "Est. MRR",
                value: `₹${(niche.estimatedMRR / 1000).toFixed(0)}k`,
                icon: IndianRupee,
                color: "text-primary",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="p-3 rounded-xl bg-muted/40 border border-border text-center"
              >
                <Icon className={cn("w-5 h-5 mx-auto mb-1", color)} />
                <p className={cn("text-xl font-bold", color)}>{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Tracker */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-primary" /> Current MRR
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-4xl font-bold text-primary tabular-nums">
              ₹{totalMRR.toLocaleString("en-IN")}
            </p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress to ₹1L goal</span>
                <span className="font-semibold">{mrrProgress.toFixed(0)}%</span>
              </div>
              <Progress value={mrrProgress} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Trophy className="w-4 h-4 text-warning" /> Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {MILESTONES.map((m) => (
              <div key={m.label} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex-1 text-sm",
                    totalMRR >= m.target
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {m.badge} {m.label}
                </div>
                {totalMRR >= m.target ? (
                  <Badge className="bg-success/10 text-success border-success/30 text-xs">
                    Reached!
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">
                    ₹{((m.target - totalMRR) / 1000).toFixed(0)}k away
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Pilot Clients */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Pilot Clients</CardTitle>
            <Button
              size="sm"
              variant="outline"
              data-ocid="revenue.add_pilot_button"
              onClick={() => setShowAddPilot(true)}
            >
              + Add Client
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {pilotClients.map((client, i) => (
            <div
              key={client.leadId}
              data-ocid={`revenue.pilot.item.${i + 1}`}
              className="p-4 rounded-xl bg-muted/30 border border-border space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-foreground">
                    {client.businessName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {client.niche} · {client.city}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-primary">
                    ₹{client.mrrAmount.toLocaleString("en-IN")}/mo
                  </p>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs mt-1",
                      client.status === "active"
                        ? "text-success border-success/30 bg-success/10"
                        : client.status === "trial"
                          ? "text-warning border-warning/30 bg-warning/10"
                          : "text-muted-foreground border-border",
                    )}
                  >
                    {client.status}
                  </Badge>
                </div>
              </div>
              {client.testimonial && (
                <p className="text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                  "{client.testimonial}"
                </p>
              )}
              {client.caseStudy && (
                <p className="text-xs text-foreground/70">{client.caseStudy}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Lead Magnet */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Link2 className="w-4 h-4 text-primary" />
            Free Audit Lead Magnet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border">
            <code className="text-xs text-primary font-mono flex-1 truncate">
              {referralUrl}
            </code>
            <Button
              size="sm"
              variant="outline"
              data-ocid="revenue.copy_referral_button"
              onClick={copyRef}
              className="shrink-0"
            >
              {copied ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 text-primary" />
              <span>
                <span className="font-semibold text-primary">
                  {auditLeadsCount + 12}
                </span>{" "}
                audit leads captured this month
              </span>
            </div>
            <Button
              size="sm"
              data-ocid="revenue.open_audit_button"
              onClick={() => setShowAuditModal(true)}
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Open Audit Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referral Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Share2 className="w-4 h-4 text-primary" />
            Referral Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-center">
            {[
              {
                label: "Organic",
                count: Math.floor(leads.length * 0.4),
                color: "text-success",
              },
              {
                label: "Lead Magnet",
                count: Math.floor(leads.length * 0.25),
                color: "text-primary",
              },
              {
                label: "Referral",
                count: Math.floor(leads.length * 0.15),
                color: "text-warning",
              },
              {
                label: "Paid Ads",
                count: Math.floor(leads.length * 0.12),
                color: "text-chart-5",
              },
              {
                label: "Manual",
                count: Math.floor(leads.length * 0.08),
                color: "text-muted-foreground",
              },
            ].map(({ label, count, color }) => (
              <div
                key={label}
                className="p-2.5 rounded-lg bg-muted/40 border border-border"
              >
                <p className={cn("text-lg font-bold", color)}>{count}</p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Action Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Flame className="w-4 h-4 text-warning" />
            Daily Action Checklist
            <Badge
              variant="outline"
              className="ml-auto text-warning border-warning/30 bg-warning/10 text-xs"
            >
              🔥 {streak}-day streak
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {DAILY_TASKS.map((task) => (
            <div
              key={task}
              data-ocid={`revenue.task.item.${DAILY_TASKS.indexOf(task) + 1}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border"
            >
              <Checkbox
                id={`task-${DAILY_TASKS.indexOf(task)}`}
                data-ocid={`revenue.task_checkbox.${DAILY_TASKS.indexOf(task) + 1}`}
                checked={completedTasks.has(DAILY_TASKS.indexOf(task))}
                onCheckedChange={() => toggleTask(DAILY_TASKS.indexOf(task))}
              />
              <label
                htmlFor={`task-${DAILY_TASKS.indexOf(task)}`}
                className={cn(
                  "text-sm cursor-pointer flex-1",
                  completedTasks.has(DAILY_TASKS.indexOf(task))
                    ? "line-through text-muted-foreground"
                    : "text-foreground",
                )}
              >
                {task}
              </label>
              {completedTasks.has(DAILY_TASKS.indexOf(task)) && (
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              )}
            </div>
          ))}
          <div className="pt-1 flex items-center gap-2 text-xs text-muted-foreground">
            <span>
              {completedTasks.size}/{DAILY_TASKS.length} tasks completed today
            </span>
            {completedTasks.size === DAILY_TASKS.length && (
              <Badge className="bg-success/10 text-success border-success/30 text-xs">
                All done! 🎉
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audit Form Modal */}
      <Dialog open={showAuditModal} onOpenChange={setShowAuditModal}>
        <DialogContent className="sm:max-w-md" data-ocid="revenue.audit_dialog">
          <DialogHeader>
            <DialogTitle>Free Business Growth Audit</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground -mt-2">
            Get a free audit of your online presence. We'll reach out within 24
            hours.
          </p>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Your Name</Label>
                <Input
                  data-ocid="revenue.audit_name_input"
                  placeholder="Priya Sharma"
                  value={auditForm.name}
                  onChange={(e) =>
                    setAuditForm((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Business Name</Label>
                <Input
                  data-ocid="revenue.audit_business_input"
                  placeholder="Glamour Cuts"
                  value={auditForm.businessName}
                  onChange={(e) =>
                    setAuditForm((f) => ({
                      ...f,
                      businessName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input
                  data-ocid="revenue.audit_phone_input"
                  placeholder="+91 98765 43210"
                  value={auditForm.phone}
                  onChange={(e) =>
                    setAuditForm((f) => ({ ...f, phone: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input
                  data-ocid="revenue.audit_email_input"
                  placeholder="you@business.com"
                  value={auditForm.email}
                  onChange={(e) =>
                    setAuditForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Niche</Label>
              <Select
                value={auditForm.niche}
                onValueChange={(v) => setAuditForm((f) => ({ ...f, niche: v }))}
              >
                <SelectTrigger data-ocid="revenue.audit_niche_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {NICHES.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button
                variant="outline"
                data-ocid="revenue.audit_cancel_button"
                onClick={() => setShowAuditModal(false)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="revenue.audit_submit_button"
                onClick={submitAuditForm}
                disabled={
                  createLead.isPending ||
                  !auditForm.businessName ||
                  !auditForm.phone
                }
              >
                {createLead.isPending ? "Submitting…" : "Request Free Audit"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Pilot Client Modal */}
      <Dialog open={showAddPilot} onOpenChange={setShowAddPilot}>
        <DialogContent className="sm:max-w-md" data-ocid="revenue.pilot_dialog">
          <DialogHeader>
            <DialogTitle>Add Pilot Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Business Name</Label>
                <Input
                  data-ocid="revenue.pilot_name_input"
                  placeholder="Sunrise Salon"
                  value={pilotForm.businessName}
                  onChange={(e) =>
                    setPilotForm((f) => ({
                      ...f,
                      businessName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label>City</Label>
                <Input
                  data-ocid="revenue.pilot_city_input"
                  placeholder="Mumbai"
                  value={pilotForm.city}
                  onChange={(e) =>
                    setPilotForm((f) => ({ ...f, city: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Niche</Label>
                <Select
                  value={pilotForm.niche}
                  onValueChange={(v) =>
                    setPilotForm((f) => ({ ...f, niche: v }))
                  }
                >
                  <SelectTrigger data-ocid="revenue.pilot_niche_select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {NICHES.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>MRR (₹)</Label>
                <Input
                  data-ocid="revenue.pilot_mrr_input"
                  type="number"
                  placeholder="9999"
                  value={pilotForm.mrrAmount}
                  onChange={(e) =>
                    setPilotForm((f) => ({ ...f, mrrAmount: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Testimonial</Label>
              <Textarea
                data-ocid="revenue.pilot_testimonial_textarea"
                rows={2}
                placeholder="Quote from the client…"
                value={pilotForm.testimonial}
                onChange={(e) =>
                  setPilotForm((f) => ({ ...f, testimonial: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label>Case Study Results</Label>
              <Textarea
                data-ocid="revenue.pilot_casestudy_textarea"
                rows={2}
                placeholder="What results did you achieve?"
                value={pilotForm.caseStudy}
                onChange={(e) =>
                  setPilotForm((f) => ({ ...f, caseStudy: e.target.value }))
                }
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button
                variant="outline"
                data-ocid="revenue.pilot_cancel_button"
                onClick={() => setShowAddPilot(false)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="revenue.pilot_submit_button"
                onClick={addPilotClient}
                disabled={!pilotForm.businessName || !pilotForm.mrrAmount}
              >
                Add Client
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
