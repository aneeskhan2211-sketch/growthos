import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle2,
  Globe,
  Loader2,
  Plus,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateLead } from "../../hooks/useLeads";
import { scoreColor } from "../../types/outreach";
import type { MockLead } from "./mockData";

interface Props {
  leads: MockLead[];
  niche: string;
  city: string;
}

export function GeneratedLeadsTable({ leads, niche, city }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [added, setAdded] = useState<Set<number>>(new Set());
  const createLead = useCreateLead();

  const toggle = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === leads.length) setSelected(new Set());
    else setSelected(new Set(leads.map((l) => l.id)));
  };

  const addToCRM = async () => {
    const toAdd = leads.filter((l) => selected.has(l.id) && !added.has(l.id));
    let successCount = 0;
    for (const lead of toAdd) {
      try {
        await createLead.mutateAsync({
          businessName: lead.businessName,
          city: lead.city,
          phone: lead.phone,
          website: lead.website ?? "",
          rating: lead.rating,
          leadScore: BigInt(lead.leadScore),
          address: `${lead.city}, India`,
          notes: `Detected: ${lead.detectedProblem}`,
          industry: niche,
        });
        setAdded((prev) => new Set([...prev, lead.id]));
        successCount++;
      } catch {
        // continue
      }
    }
    if (successCount > 0) {
      toast.success(`${successCount} leads added to CRM`, {
        description: "You can now view them in the CRM pipeline",
      });
    }
  };

  const displayLeads = leads.slice(0, 25);

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle"
      data-ocid="generated_leads.table"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
        <div>
          <h3 className="font-semibold text-foreground">Generated Leads</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {niche} businesses in {city} — sorted by lead score
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {selected.size} selected
          </span>
          <Button
            size="sm"
            onClick={addToCRM}
            disabled={selected.size === 0 || createLead.isPending}
            data-ocid="generated_leads.add_to_crm_button"
          >
            {createLead.isPending ? (
              <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-1.5" />
            )}
            Add to CRM
          </Button>
        </div>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[24px_1fr_80px_80px_1fr_80px] gap-3 px-5 py-2.5 bg-muted/20 border-b border-border text-xs font-medium text-muted-foreground">
        <Checkbox
          id="select-all-leads"
          checked={selected.size === displayLeads.length}
          onCheckedChange={selectAll}
          data-ocid="generated_leads.select_all_checkbox"
        />
        <span>Business</span>
        <span>Score</span>
        <span>Rating</span>
        <span>Problem</span>
        <span>Website</span>
      </div>

      {/* Rows */}
      <div className="max-h-72 overflow-y-auto">
        {displayLeads.map((lead, idx) => {
          const isSelected = selected.has(lead.id);
          const isAdded = added.has(lead.id);
          const sc = scoreColor(lead.leadScore);
          return (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              className={`grid grid-cols-[24px_1fr_80px_80px_1fr_80px] gap-3 px-5 py-2.5 border-b border-border/50 text-sm items-center transition-smooth ${
                isSelected ? "bg-primary/5" : "hover:bg-muted/20"
              }`}
              data-ocid={`generated_leads.item.${idx + 1}`}
            >
              <Checkbox
                id={`lead-check-${lead.id}`}
                checked={isSelected}
                onCheckedChange={() => toggle(lead.id)}
                disabled={isAdded}
                data-ocid={`generated_leads.checkbox.${idx + 1}`}
              />
              <div className="min-w-0">
                <div className="font-medium text-foreground truncate">
                  {lead.businessName}
                </div>
                <div className="text-xs text-muted-foreground">
                  {lead.phone}
                </div>
              </div>
              <span className={`font-bold text-sm ${sc}`}>
                {lead.leadScore}
              </span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs">{lead.rating}</span>
              </div>
              <Badge
                variant="outline"
                className="text-xs truncate border-border"
              >
                <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                <span className="truncate">{lead.detectedProblem}</span>
              </Badge>
              <div>
                {isAdded ? (
                  <CheckCircle2 className="w-4 h-4 text-success score-success" />
                ) : lead.website ? (
                  <Globe className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <span className="text-xs text-destructive">None</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="px-5 py-3 bg-muted/10 text-xs text-muted-foreground">
        Showing 25 of 50 leads. Add to CRM to unlock all.
      </div>
    </div>
  );
}
