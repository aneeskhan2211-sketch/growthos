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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PAGE_META } from "@/config/metaTags";
import { useMetaTags } from "@/hooks/useMetaTags";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Info,
  Shield,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  useConsentLogs,
  useRecordConsentLog,
  useUpdateConsentStatus,
} from "../hooks/useCompliance";
import type {
  ConsentLog,
  ConsentStatus,
  ConsentType,
} from "../types/compliance";

type FilterTab = "all" | ConsentStatus;

const OPT_OUT_KEYWORDS = [
  "stop",
  "unsubscribe",
  "remove",
  "opt-out",
  "don't contact",
  "nahi chahiye",
];

const CONSENT_TYPE_LABELS: Record<ConsentType, string> = {
  form_submission: "Form Submission",
  reply_first: "Reply First",
  qr_optin: "QR Opt-In",
  manual_override: "Manual Override",
};

function statusBadge(status: ConsentStatus) {
  if (status === "granted")
    return (
      <Badge
        variant="outline"
        className="text-success border-success/30 bg-success/10 text-xs gap-1"
      >
        <CheckCircle2 className="w-3 h-3" /> Granted
      </Badge>
    );
  if (status === "withdrawn")
    return (
      <Badge
        variant="outline"
        className="text-destructive border-destructive/30 bg-destructive/10 text-xs gap-1"
      >
        <XCircle className="w-3 h-3" /> Withdrawn
      </Badge>
    );
  return (
    <Badge
      variant="outline"
      className="text-warning border-warning/30 bg-warning/10 text-xs gap-1"
    >
      <AlertTriangle className="w-3 h-3" /> Pending
    </Badge>
  );
}

function consentTypeBadge(ct: ConsentType) {
  const colors: Record<ConsentType, string> = {
    form_submission: "text-primary border-primary/30 bg-primary/10",
    reply_first: "text-success border-success/30 bg-success/10",
    qr_optin: "text-chart-5 border-chart-5/30 bg-chart-5/10",
    manual_override: "text-warning border-warning/30 bg-warning/10",
  };
  return (
    <Badge variant="outline" className={cn("text-xs", colors[ct])}>
      {CONSENT_TYPE_LABELS[ct]}
    </Badge>
  );
}

function downloadCSV(logs: ConsentLog[]) {
  const headers = [
    "ID",
    "Timestamp",
    "Phone",
    "Email",
    "Consent Type",
    "Status",
    "Template",
    "Notes",
  ];
  const rows = logs.map((l) => [
    l.id.toString(),
    new Date(Number(l.timestamp) / 1_000_000).toISOString(),
    l.phone,
    l.email,
    l.consentType,
    l.status,
    l.messageTemplate,
    `"${l.notes.replace(/"/g, '""')}"`,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `consent_log_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function CompliancePage() {
  useMetaTags(PAGE_META["/compliance"]);
  const { data: logs = [] } = useConsentLogs();
  const updateStatus = useUpdateConsentStatus();
  const recordLog = useRecordConsentLog();

  const [filter, setFilter] = useState<FilterTab>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    email: "",
    consentType: "form_submission" as ConsentType,
    template: "",
    notes: "",
  });

  const filtered =
    filter === "all" ? logs : logs.filter((l) => l.status === filter);

  const granted = logs.filter((l) => l.status === "granted").length;
  const withdrawn = logs.filter((l) => l.status === "withdrawn").length;
  const pending = logs.filter((l) => l.status === "pending").length;
  const consentPct =
    logs.length > 0 ? Math.round((granted / logs.length) * 100) : 0;

  const submitLog = async () => {
    await recordLog.mutateAsync({ ...form, userId: "user_1" });
    setForm({
      phone: "",
      email: "",
      consentType: "form_submission",
      template: "",
      notes: "",
    });
    setShowAddForm(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Consent &amp; Compliance Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Track opt-in consent for every contact. Only consented contacts are
            eligible for outreach.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            data-ocid="compliance.export_button"
            onClick={() => downloadCSV(logs)}
          >
            <Download className="w-4 h-4 mr-1.5" />
            Export CSV
          </Button>
          <Button
            size="sm"
            data-ocid="compliance.add_consent_button"
            onClick={() => setShowAddForm(true)}
          >
            + Add Consent Log
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Contacts",
            value: logs.length,
            icon: Shield,
            color: "text-foreground",
            bg: "bg-muted/40",
          },
          {
            label: "Consented",
            value: `${consentPct}%`,
            icon: ShieldCheck,
            color: "text-success",
            bg: "bg-success/10",
          },
          {
            label: "Opted Out",
            value: withdrawn,
            icon: ShieldAlert,
            color: "text-destructive",
            bg: "bg-destructive/10",
          },
          {
            label: "Pending Consent",
            value: pending,
            icon: AlertTriangle,
            color: "text-warning",
            bg: "bg-warning/10",
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
              <p className={cn("text-2xl font-bold", color)}>{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Consent Log Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-base">Consent Log</CardTitle>
            <div className="flex gap-1" data-ocid="compliance.filter_tabs">
              {(["all", "granted", "withdrawn", "pending"] as FilterTab[]).map(
                (tab) => (
                  <button
                    type="button"
                    key={tab}
                    data-ocid={`compliance.filter.${tab}`}
                    onClick={() => setFilter(tab)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-lg font-medium transition-colors capitalize",
                      filter === tab
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    )}
                  >
                    {tab}{" "}
                    {tab === "all"
                      ? `(${logs.length})`
                      : tab === "granted"
                        ? `(${granted})`
                        : tab === "withdrawn"
                          ? `(${withdrawn})`
                          : `(${pending})`}
                  </button>
                ),
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="px-3 py-2.5 text-left text-xs text-muted-foreground font-medium">
                    Timestamp
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs text-muted-foreground font-medium">
                    Contact
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs text-muted-foreground font-medium">
                    Type
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs text-muted-foreground font-medium">
                    Status
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs text-muted-foreground font-medium">
                    Template
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs text-muted-foreground font-medium">
                    Notes
                  </th>
                  <th className="px-3 py-2.5 text-left text-xs text-muted-foreground font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-3 py-8 text-center text-muted-foreground text-xs"
                      data-ocid="compliance.empty_state"
                    >
                      No consent logs match the current filter
                    </td>
                  </tr>
                )}
                {filtered.map((log, i) => (
                  <tr
                    key={log.id.toString()}
                    data-ocid={`compliance.log.item.${i + 1}`}
                    className="border-t border-border"
                  >
                    <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(
                        Number(log.timestamp) / 1_000_000,
                      ).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="text-xs font-medium text-foreground">
                        {log.phone || log.email}
                      </p>
                      {log.phone && log.email && (
                        <p className="text-[11px] text-muted-foreground">
                          {log.email}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      {consentTypeBadge(log.consentType)}
                    </td>
                    <td className="px-3 py-2.5">{statusBadge(log.status)}</td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground font-mono">
                      {log.messageTemplate}
                    </td>
                    <td className="px-3 py-2.5 text-xs text-muted-foreground max-w-[160px] truncate">
                      {log.notes}
                    </td>
                    <td className="px-3 py-2.5">
                      {log.status === "granted" && (
                        <Button
                          variant="outline"
                          size="sm"
                          data-ocid={`compliance.withdraw_button.${i + 1}`}
                          className="text-xs h-7 text-destructive border-destructive/30 hover:bg-destructive/10"
                          onClick={() =>
                            updateStatus.mutate({
                              id: log.id,
                              status: "withdrawn",
                            })
                          }
                        >
                          Withdraw
                        </Button>
                      )}
                      {log.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          data-ocid={`compliance.grant_button.${i + 1}`}
                          className="text-xs h-7 text-success border-success/30 hover:bg-success/10"
                          onClick={() =>
                            updateStatus.mutate({
                              id: log.id,
                              status: "granted",
                            })
                          }
                        >
                          Grant
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Opt-out Detection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-warning" />
            Opt-Out Auto-Detection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            GrowthOS automatically detects opt-out keywords in replies and
            immediately stops outreach. Contacts sending these keywords are
            moved to "Withdrawn" status.
          </p>
          <div className="flex flex-wrap gap-2">
            {OPT_OUT_KEYWORDS.map((kw) => (
              <Badge
                key={kw}
                variant="outline"
                className="font-mono text-xs text-destructive border-destructive/30 bg-destructive/5"
              >
                {kw}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/5 border border-warning/20 text-sm">
            <AlertTriangle className="w-4 h-4 text-warning shrink-0" />
            <span className="text-muted-foreground">
              <span className="font-semibold text-warning">{withdrawn}</span>{" "}
              opt-outs detected and honoured this week
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
        <p>
          GrowthOS enforces opt-in consent. No outreach is sent to contacts
          without explicit consent on record. Data is labeled as{" "}
          <strong>"Based on publicly available data and heuristics"</strong>.
        </p>
      </div>

      {/* Add Consent Log Modal */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-md" data-ocid="compliance.dialog">
          <DialogHeader>
            <DialogTitle>Record Consent Log</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="cp-phone">Phone</Label>
                <Input
                  id="cp-phone"
                  data-ocid="compliance.phone_input"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cp-email">Email</Label>
                <Input
                  id="cp-email"
                  data-ocid="compliance.email_input"
                  placeholder="contact@business.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Consent Type</Label>
              <Select
                value={form.consentType}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, consentType: v as ConsentType }))
                }
              >
                <SelectTrigger data-ocid="compliance.consent_type_select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(
                    Object.entries(CONSENT_TYPE_LABELS) as [
                      ConsentType,
                      string,
                    ][]
                  ).map(([val, label]) => (
                    <SelectItem key={val} value={val}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cp-template">Template Name</Label>
              <Input
                id="cp-template"
                data-ocid="compliance.template_input"
                placeholder="e.g. salon_intro_v2"
                value={form.template}
                onChange={(e) =>
                  setForm((f) => ({ ...f, template: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cp-notes">Notes</Label>
              <Textarea
                id="cp-notes"
                data-ocid="compliance.notes_textarea"
                placeholder="How was consent obtained?"
                rows={2}
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button
                variant="outline"
                data-ocid="compliance.cancel_button"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="compliance.submit_button"
                onClick={submitLog}
                disabled={recordLog.isPending || (!form.phone && !form.email)}
              >
                {recordLog.isPending ? "Saving…" : "Record Consent"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
