import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Rocket,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Lead } from "../../backend";
import { LeadStatus } from "../../backend";
import { useLeads } from "../../hooks/useLeads";
import { useCreateOutreachCampaign } from "../../hooks/useOutreach";
import { useRecordDailyAction } from "../../hooks/usePremium";
import { scoreColor } from "../../types/outreach";

interface Props {
  niche: string;
  city?: string;
}

type AcquisitionPhase = "idle" | "preview" | "pitches" | "launched";

function generatePitch(lead: Lead, niche: string): string {
  const score = Number(lead.leadScore);
  let problem = "weak online presence";
  if (!lead.website) problem = "no website";
  else if (score >= 80) problem = "no active ads running";
  else if (score >= 70) problem = "low Google ranking";
  return `Hi ${lead.businessName}, I noticed your ${niche.toLowerCase()} business in ${lead.city} could benefit from digital marketing. Many similar businesses are losing 30+ customers/month due to ${problem}. We help ${niche.toLowerCase()} businesses get 3x more clients through SEO, Google Ads, and social media. Can we schedule a quick 10-min call this week?`;
}

export function OneClickAcquisition({ niche }: Props) {
  const { data: leads, isLoading } = useLeads();
  const createCampaign = useCreateOutreachCampaign();
  const recordAction = useRecordDailyAction();
  const [phase, setPhase] = useState<AcquisitionPhase>("idle");
  const [pitches, setPitches] = useState<Record<string, string>>({});
  const [isLaunching, setIsLaunching] = useState(false);

  const topLeads = (leads ?? [])
    .filter((l) => Number(l.leadScore) >= 70 && l.status === LeadStatus.new_)
    .sort((a, b) => Number(b.leadScore) - Number(a.leadScore))
    .slice(0, 5);

  const handleGetClients = () => {
    if (topLeads.length === 0) {
      toast.info("No high-priority leads found. Add more leads first.");
      return;
    }
    setPhase("preview");
  };

  const handleGeneratePitches = () => {
    const generated: Record<string, string> = {};
    for (const lead of topLeads) {
      generated[lead.id.toString()] = generatePitch(lead, niche || "Business");
    }
    setPitches(generated);
    setPhase("pitches");
  };

  const handleLaunchOutreach = async () => {
    setIsLaunching(true);
    let count = 0;
    for (const lead of topLeads) {
      try {
        await createCampaign.mutateAsync({
          leadId: lead.id,
          businessName: lead.businessName,
          channels: ["whatsapp", "email"],
        });
        count++;
      } catch {
        // continue
      }
    }
    await recordAction.mutateAsync("launch_outreach");
    setIsLaunching(false);
    setPhase("launched");
    toast.success(`🚀 Outreach launched for ${count} leads!`, {
      description:
        "Messages are being scheduled. Check Outreach tracker for updates.",
    });
  };

  if (isLoading) {
    return <Skeleton className="h-48 w-full rounded-xl" />;
  }

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle"
      data-ocid="one_click.panel"
    >
      {/* Header */}
      <div className="gradient-premium px-6 py-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground">
                One-Click Client Acquisition
              </h3>
              <p className="text-xs text-muted-foreground">
                {topLeads.length} high-priority leads ready for outreach
              </p>
            </div>
          </div>
          {phase === "idle" && (
            <Button
              className="h-10 font-semibold shadow-elevated"
              onClick={handleGetClients}
              data-ocid="one_click.get_clients_button"
            >
              <Zap className="w-4 h-4 mr-2" />
              Get Clients Now
            </Button>
          )}
          {phase === "launched" && (
            <Badge className="bg-success/20 text-success border-success/30">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              Outreach Active
            </Badge>
          )}
        </div>
      </div>

      {/* Phase: idle */}
      {phase === "idle" && (
        <div className="px-6 py-8 text-center">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-3">
            <Rocket className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">
            Click{" "}
            <span className="font-semibold text-foreground">
              "Get Clients Now"
            </span>{" "}
            to automatically find, pitch, and outreach your top leads.
          </p>
        </div>
      )}

      {/* Phase: preview */}
      {(phase === "preview" || phase === "pitches" || phase === "launched") && (
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground text-sm">
              Found {topLeads.length} high-priority leads ready for outreach
            </span>
          </div>

          {/* Lead preview list */}
          <div className="space-y-2">
            {topLeads.map((lead, idx) => {
              const sc = scoreColor(Number(lead.leadScore));
              return (
                <motion.div
                  key={lead.id.toString()}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/50"
                  data-ocid={`one_click.lead.${idx + 1}`}
                >
                  <span className={`font-bold text-sm w-8 text-center ${sc}`}>
                    {Number(lead.leadScore)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground text-sm truncate">
                      {lead.businessName}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span>{lead.city}</span>
                      {!lead.website && (
                        <span className="flex items-center gap-1 text-destructive">
                          <AlertCircle className="w-3 h-3" /> No website
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> {lead.rating}
                      </span>
                    </div>
                  </div>
                  {phase === "pitches" && pitches[lead.id.toString()] && (
                    <Badge variant="secondary" className="text-xs shrink-0">
                      <MessageSquare className="w-3 h-3 mr-1" /> Pitch ready
                    </Badge>
                  )}
                  {phase === "launched" && (
                    <Badge className="bg-success/20 text-success border-success/30 text-xs shrink-0">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Sent
                    </Badge>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Pitch preview */}
          {phase === "pitches" &&
            topLeads[0] &&
            pitches[topLeads[0].id.toString()] && (
              <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  Sample pitch — {topLeads[0].businessName}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {pitches[topLeads[0].id.toString()]}
                </p>
              </div>
            )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            {phase === "preview" && (
              <Button
                className="flex-1 h-10"
                onClick={handleGeneratePitches}
                data-ocid="one_click.generate_pitches_button"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Generate Pitches
              </Button>
            )}
            {phase === "pitches" && (
              <Button
                className="flex-1 h-10"
                onClick={handleLaunchOutreach}
                disabled={isLaunching}
                data-ocid="one_click.launch_outreach_button"
              >
                {isLaunching ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Rocket className="w-4 h-4 mr-2" />
                )}
                Launch Outreach
              </Button>
            )}
            {phase === "launched" && (
              <Button
                variant="outline"
                className="flex-1 h-10"
                onClick={() => setPhase("idle")}
                data-ocid="one_click.reset_button"
              >
                Start New Campaign
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
