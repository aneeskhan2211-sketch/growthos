import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Copy,
  ExternalLink,
  IndianRupee,
  Linkedin,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import {
  useAffiliateStats,
  useCommissions,
  useMonthlyEarnings,
  usePayoutRequests,
  useRequestPayout,
} from "../hooks/useAffiliate";
import type { CommissionStatus } from "../hooks/useAffiliate";

const COMMISSION_TIERS = [
  { plan: "Starter", rate: "20%", perReferral: "₹9.80", color: "bg-muted" },
  {
    plan: "Growth",
    rate: "25%",
    perReferral: "₹74.75",
    color: "bg-primary/10",
  },
  { plan: "Pro", rate: "28%", perReferral: "₹279.72", color: "bg-primary/20" },
  {
    plan: "Agency",
    rate: "30%",
    perReferral: "₹1,499.70",
    color: "bg-primary/30",
  },
];

const STATUS_COLORS: Record<string, string> = {
  paid: "text-success border-success/30 bg-success/10",
  approved: "text-primary border-primary/30 bg-primary/10",
  pending: "text-warning border-warning/30 bg-warning/10",
  rejected: "text-destructive border-destructive/30 bg-destructive/10",
};

const PAGE_SIZE = 10;
const FILTERS: CommissionStatus[] = ["all", "pending", "paid"];

export default function AffiliateCommissionPage() {
  const { data: stats, isLoading: statsLoading } = useAffiliateStats();
  const [filter, setFilter] = useState<CommissionStatus>("all");
  const [page, setPage] = useState(1);
  const { data: commissions = [], isLoading: comLoading } =
    useCommissions(filter);
  const { data: monthlyEarnings = [] } = useMonthlyEarnings();
  const { data: payoutRequests = [] } = usePayoutRequests();
  const requestPayout = useRequestPayout();
  const [showPayout, setShowPayout] = useState(false);
  const [bankForm, setBankForm] = useState({
    accountName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    upiId: "",
  });

  const paged = commissions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(commissions.length / PAGE_SIZE));
  const pendingAmt = stats?.pendingPayouts ?? 0;
  const referralLink =
    stats?.referralLink ?? "https://growthos.app/ref/user123";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const handlePayout = async () => {
    await requestPayout.mutateAsync(bankForm);
    setShowPayout(false);
    setBankForm({
      accountName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      upiId: "",
    });
    toast.success("Payout request submitted!");
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Join GrowthOS and grow your business! ${referralLink}`)}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`;

  const kpiCards = [
    {
      label: "Total Earnings",
      value: statsLoading
        ? null
        : `₹${(stats?.totalEarned ?? 0).toLocaleString("en-IN")}`,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
      ocid: "affiliate.total_earned",
    },
    {
      label: "Pending Payout",
      value: statsLoading ? null : `₹${pendingAmt.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "text-warning",
      bg: "bg-warning/10",
      ocid: "affiliate.pending_payout",
    },
    {
      label: "Paid Out",
      value: statsLoading
        ? null
        : `₹${(stats?.paidOut ?? 0).toLocaleString("en-IN")}`,
      icon: Wallet,
      color: "text-success",
      bg: "bg-success/10",
      ocid: "affiliate.paid_out",
    },
    {
      label: "Conversion Rate",
      value: statsLoading ? null : `${stats?.conversionRate ?? 0}%`,
      icon: Users,
      color: "text-primary",
      bg: "bg-primary/10",
      ocid: "affiliate.conversion_rate",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Affiliate Commission
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Earn up to 30% recurring commission on every referral that upgrades.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <Card
            key={kpi.label}
            className="p-4 hover:shadow-md transition-shadow"
            data-ocid={kpi.ocid}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                {kpi.value === null ? (
                  <Skeleton className="h-7 w-20 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-foreground mt-1 truncate">
                    {kpi.value}
                  </p>
                )}
              </div>
              <span className={`p-2 rounded-lg shrink-0 ${kpi.bg}`}>
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Commission Rates + Monthly Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission rates */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-foreground mb-1">
            Your Commission Rates
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Earn more by referring high-tier plans
          </p>
          <div className="space-y-2">
            {COMMISSION_TIERS.map((tier) => (
              <div
                key={tier.plan}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${tier.color}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {tier.plan}
                  </span>
                  <Badge variant="outline" className="text-xs px-1.5">
                    {tier.rate}
                  </Badge>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {tier.perReferral}/referral
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly earnings bar chart */}
        <Card className="p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Monthly Earnings (Last 6 Months)
          </h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={monthlyEarnings}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                formatter={(v: number) => [
                  `₹${v.toLocaleString("en-IN")}`,
                  "Earnings",
                ]}
                contentStyle={{
                  background: "oklch(var(--card))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="earnings" radius={[4, 4, 0, 0]}>
                {monthlyEarnings.map((entry, i) => (
                  <Cell
                    key={entry?.month ?? i}
                    fill="oklch(var(--success))"
                    opacity={i === monthlyEarnings.length - 1 ? 1 : 0.7}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Referral link + Payout */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Your Referral Link
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Share this link to earn commissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#25d366]/10 text-[#25d366] hover:bg-[#25d366]/20 transition-colors font-medium"
              data-ocid="affiliate.share_whatsapp"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 fill-current"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={linkedinShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 transition-colors font-medium"
              data-ocid="affiliate.share_linkedin"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            readOnly
            value={referralLink}
            className="text-xs font-mono bg-muted/50"
            data-ocid="affiliate.referral_link"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleCopyLink}
            data-ocid="affiliate.copy_link_button"
            className="shrink-0"
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="link"
            className="text-xs shrink-0 px-2"
            onClick={() => {
              window.location.href = "/referral";
            }}
            data-ocid="affiliate.milestones_link"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1" />
            Milestones
          </Button>
        </div>
        <Separator />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Available to payout</p>
            <p className="text-2xl font-bold text-foreground">
              ₹{pendingAmt.toLocaleString("en-IN")}
            </p>
            {pendingAmt < 500 && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Minimum ₹500 required to request payout
              </p>
            )}
          </div>
          <Button
            type="button"
            disabled={pendingAmt < 500 || requestPayout.isPending}
            onClick={() => setShowPayout(true)}
            data-ocid="affiliate.request_payout_button"
            className="gap-2"
          >
            <IndianRupee className="w-4 h-4" />
            Request Payout
          </Button>
        </div>

        {/* Pending payout requests */}
        {payoutRequests.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Pending payout requests
            </p>
            <div className="space-y-2">
              {payoutRequests.map((req, i) => (
                <div
                  key={req.requestId}
                  className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-muted/40"
                  data-ocid={`affiliate.payout_request.${i + 1}`}
                >
                  <span className="text-foreground font-medium">
                    ₹{req.amount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-muted-foreground">
                    {new Date(req.createdAt).toLocaleDateString("en-IN")}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-xs text-warning border-warning/30 bg-warning/10"
                  >
                    {req.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Commission History Table */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border flex-wrap gap-3">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Commission History
            </h2>
            <p className="text-xs text-muted-foreground">
              {commissions.length} records
            </p>
          </div>
          <div className="flex gap-1">
            {FILTERS.map((f) => (
              <Button
                key={f}
                type="button"
                size="sm"
                variant={filter === f ? "default" : "ghost"}
                className="h-7 text-xs capitalize"
                onClick={() => {
                  setFilter(f);
                  setPage(1);
                }}
                data-ocid={`affiliate.filter.${f}`}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {/* Table header */}
        <div className="hidden md:grid grid-cols-5 gap-4 px-5 py-2.5 bg-muted/30 text-xs font-medium text-muted-foreground border-b border-border">
          <span>Date</span>
          <span className="col-span-2">Referred User</span>
          <span>Plan / Commission</span>
          <span className="text-right">Status</span>
        </div>

        <div className="divide-y divide-border">
          {comLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: stable skeleton rows
                  key={`skel-row-${i}`}
                  className="flex items-center gap-4 px-5 py-3"
                >
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))
            : paged.map((c, i) => (
                <div
                  key={c.id}
                  className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 items-center px-5 py-3.5 hover:bg-muted/20 transition-colors"
                  data-ocid={`affiliate.commission.${(page - 1) * PAGE_SIZE + i + 1}`}
                >
                  <span className="text-xs text-muted-foreground">
                    {new Date(c.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })}
                  </span>
                  <span className="text-sm font-medium text-foreground col-span-1 md:col-span-2 truncate">
                    {c.referredUserName}
                  </span>
                  <div>
                    <span className="text-xs font-medium text-foreground">
                      {c.plan}
                    </span>
                    <p className="text-xs text-success font-semibold">
                      +₹{c.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="outline"
                      className={`text-xs ${STATUS_COLORS[c.status]}`}
                    >
                      {c.status}
                    </Badge>
                  </div>
                </div>
              ))}

          {!comLoading && commissions.length === 0 && (
            <div
              className="flex flex-col items-center justify-center h-32 text-center px-5"
              data-ocid="affiliate.empty_state"
            >
              <TrendingUp className="w-8 h-8 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">
                No commissions yet
              </p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                Share your referral link to start earning
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                data-ocid="affiliate.pagination_prev"
              >
                Previous
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                data-ocid="affiliate.pagination_next"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Payout Dialog */}
      <Dialog open={showPayout} onOpenChange={setShowPayout}>
        <DialogContent data-ocid="affiliate.dialog">
          <DialogHeader>
            <DialogTitle>Request Payout</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Amount to be paid:{" "}
            <span className="font-semibold text-foreground">
              ₹{pendingAmt.toLocaleString("en-IN")}
            </span>
          </p>
          <div className="space-y-3 mt-1">
            {[
              {
                key: "accountName",
                label: "Account Holder Name",
                placeholder: "Anees Chaudhary",
              },
              {
                key: "accountNumber",
                label: "Account Number",
                placeholder: "XXXX XXXX XXXX",
              },
              {
                key: "ifscCode",
                label: "IFSC Code",
                placeholder: "HDFC0001234",
              },
              { key: "bankName", label: "Bank Name", placeholder: "HDFC Bank" },
              {
                key: "upiId",
                label: "UPI ID (optional)",
                placeholder: "phone@upi",
              },
            ].map((f) => (
              <div key={f.key} className="space-y-1.5">
                <Label className="text-xs">{f.label}</Label>
                <Input
                  value={bankForm[f.key as keyof typeof bankForm]}
                  onChange={(e) =>
                    setBankForm((b) => ({ ...b, [f.key]: e.target.value }))
                  }
                  placeholder={f.placeholder}
                  data-ocid={`affiliate.payout.${f.key}_input`}
                />
              </div>
            ))}
            <div className="flex gap-3 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPayout(false)}
                data-ocid="affiliate.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={
                  !bankForm.accountName ||
                  !bankForm.accountNumber ||
                  requestPayout.isPending
                }
                onClick={handlePayout}
                data-ocid="affiliate.confirm_button"
              >
                {requestPayout.isPending ? "Submitting…" : "Submit Request"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
