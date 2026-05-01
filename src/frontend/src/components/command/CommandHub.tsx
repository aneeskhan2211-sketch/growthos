import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  MessageSquare,
  RefreshCw,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useClients } from "../../hooks/useClients";
import { useLeads } from "../../hooks/useLeads";
import { useOutreachCampaigns } from "../../hooks/useOutreach";
import type { OnboardingPrefs } from "../../types/premium";
import { CampaignPlanAccordion } from "./CampaignPlanAccordion";
import { EarningsProjection } from "./EarningsProjection";
import { OneClickAcquisition } from "./OneClickAcquisition";
import { PitchTemplates } from "./PitchTemplates";
import {
  generateCampaignPlan,
  generateMockLeads,
  generatePitchTemplates,
} from "./mockData";

interface Props {
  prefs: OnboardingPrefs;
  onRestartOnboarding: () => void;
}

export function CommandHub({ prefs, onRestartOnboarding }: Props) {
  const { data: leads = [] } = useLeads();
  const { data: clients = [] } = useClients();
  const { data: campaigns = [] } = useOutreachCampaigns();

  const pitchTemplates = generatePitchTemplates(prefs.niche, prefs.city);
  const campaignPlan = generateCampaignPlan(
    prefs.niche,
    prefs.city,
    prefs.targetBudget,
  );
  const mockLeads = generateMockLeads(prefs.niche, prefs.city, 50);

  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const budgetLabel =
    prefs.targetBudget >= 100000
      ? "₹1L+"
      : prefs.targetBudget > 0
        ? `₹${prefs.targetBudget / 1000}k`
        : "—";

  return (
    <div className="p-6 space-y-8 max-w-[1200px]" data-ocid="command_hub.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-lg gradient-premium flex items-center justify-center">
              <Zap className="w-4 h-4 text-premium-accent" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Command Center
            </h1>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {prefs.niche && (
              <Badge variant="outline" className="text-xs border-border">
                <Target className="w-3 h-3 mr-1.5" />
                {prefs.niche}
              </Badge>
            )}
            {prefs.city && (
              <Badge variant="outline" className="text-xs border-border">
                📍 {prefs.city}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs border-border">
              <TrendingUp className="w-3 h-3 mr-1.5" />
              {budgetLabel} target
            </Badge>
            <Badge className="bg-success/20 text-success border-success/30 text-xs">
              <Sparkles className="w-3 h-3 mr-1.5" /> Ready
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRestartOnboarding}
            className="gap-1.5 text-xs"
            data-ocid="command_hub.restart_onboarding_button"
          >
            <RefreshCw className="w-3 h-3" />
            Re-run Setup
          </Button>
          <Link to="/settings">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs"
              data-ocid="command_hub.settings_button"
            >
              <Settings className="w-3 h-3" />
              Settings
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* KPI Strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        data-ocid="command_hub.kpi_section"
      >
        {[
          {
            label: "Total Leads",
            value: leads.length,
            icon: Users,
            cls: "gradient-kpi",
            iconCls: "text-primary",
            link: "/leads",
          },
          {
            label: "Active Campaigns",
            value: activeCampaigns,
            icon: MessageSquare,
            cls: "gradient-premium",
            iconCls: "text-premium-accent",
            link: "/outreach",
          },
          {
            label: "Active Clients",
            value: clients.length,
            icon: BarChart3,
            cls: "gradient-success",
            iconCls: "text-success",
            link: "/clients",
          },
          {
            label: "Leads Generated",
            value: mockLeads.length,
            icon: Zap,
            cls: "bg-muted/30",
            iconCls: "text-muted-foreground",
            link: "/leads",
          },
        ].map((kpi, idx) => (
          <Link key={kpi.label} to={kpi.link as "/"}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className={`${kpi.cls} border border-border rounded-xl p-4 shadow-subtle hover:shadow-elevated transition-smooth cursor-pointer`}
              data-ocid={`command_hub.kpi.${idx + 1}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <kpi.icon className={`w-4 h-4 ${kpi.iconCls}`} />
                <span className="text-xs text-muted-foreground">
                  {kpi.label}
                </span>
              </div>
              <div className="font-display text-2xl font-bold text-foreground tabular-nums">
                {kpi.value}
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        <Link to="/leads" data-ocid="command_hub.find_leads_button">
          <Button className="w-full h-11 gap-2 text-sm font-semibold bg-primary hover:bg-primary/90">
            <Zap className="w-4 h-4" />
            Find Leads Now
            <ArrowRight className="w-4 h-4 ml-auto" />
          </Button>
        </Link>
        <Link to="/outreach" data-ocid="command_hub.send_outreach_button">
          <Button
            variant="outline"
            className="w-full h-11 gap-2 text-sm border-border hover:border-primary/40 transition-smooth"
          >
            <MessageSquare className="w-4 h-4 text-primary" />
            Send Outreach
            <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
          </Button>
        </Link>
        <Link to="/proposals" data-ocid="command_hub.create_proposal_button">
          <Button
            variant="outline"
            className="w-full h-11 gap-2 text-sm border-border hover:border-success/40 transition-smooth"
          >
            <BarChart3 className="w-4 h-4 text-success" />
            Create Proposal
            <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
          </Button>
        </Link>
      </motion.div>

      {/* One-Click Acquisition */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <OneClickAcquisition niche={prefs.niche} />
      </motion.div>

      {/* Earnings Projection */}
      {prefs.targetBudget > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <EarningsProjection
            niche={prefs.niche}
            city={prefs.city}
            budget={prefs.targetBudget}
            leadCount={50}
          />
        </motion.div>
      )}

      {/* Two-column: Pitch Templates + Campaign Plan */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PitchTemplates templates={pitchTemplates} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
        >
          <CampaignPlanAccordion plan={campaignPlan} />
        </motion.div>
      </div>
    </div>
  );
}
