import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Copy, Edit2, FileText } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { PitchTemplate } from "./mockData";

interface Props {
  templates: PitchTemplate[];
}

const FRAMEWORK_COLORS: Record<string, string> = {
  PAS: "bg-score-critical score-critical",
  AIDA: "bg-primary/10 text-primary",
  "Value-First": "bg-score-warning score-warning",
};

function renderBody(body: string): React.ReactNode {
  return body.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: static template rendering
      <span key={i}>
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: static template rendering
              <strong key={j} className="font-semibold text-foreground">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
        <br />
      </span>
    );
  });
}

export function PitchTemplates({ templates }: Props) {
  const [copied, setCopied] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [edits, setEdits] = useState<Record<string, string>>({});

  const copyTemplate = (tpl: PitchTemplate) => {
    const text = edits[tpl.id] ?? tpl.body;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(tpl.id);
      toast.success("Pitch copied to clipboard");
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div data-ocid="pitch_templates.section">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-primary" />
        <h3 className="font-display font-bold text-foreground">
          Pitch Templates
        </h3>
        <Badge variant="secondary" className="text-xs">
          {templates.length} ready
        </Badge>
      </div>

      <div className="grid gap-4">
        {templates.map((tpl, idx) => {
          const isEditing = editing === tpl.id;
          const body = edits[tpl.id] ?? tpl.body;

          return (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle"
              data-ocid={`pitch_templates.item.${idx + 1}`}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-muted/20 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${FRAMEWORK_COLORS[tpl.framework] ?? "bg-muted"}`}
                  >
                    {tpl.framework}
                  </span>
                  <span className="font-semibold text-sm text-foreground">
                    {tpl.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2.5 text-xs"
                    onClick={() => setEditing(isEditing ? null : tpl.id)}
                    data-ocid={`pitch_templates.edit_button.${idx + 1}`}
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1" />
                    {isEditing ? "Done" : "Edit"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2.5 text-xs"
                    onClick={() => copyTemplate(tpl)}
                    data-ocid={`pitch_templates.copy_button.${idx + 1}`}
                  >
                    {copied === tpl.id ? (
                      <Check className="w-3.5 h-3.5 mr-1 score-success" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 mr-1" />
                    )}
                    Copy
                  </Button>
                </div>
              </div>

              {/* Subject */}
              <div className="px-5 py-2.5 bg-muted/10 border-b border-border/50">
                <span className="text-xs text-muted-foreground">Subject: </span>
                <span className="text-xs font-medium text-foreground">
                  {tpl.subject}
                </span>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                {isEditing ? (
                  <textarea
                    className="w-full text-sm text-foreground bg-muted/20 border border-border rounded-lg p-3 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    rows={8}
                    value={body}
                    onChange={(e) =>
                      setEdits((prev) => ({
                        ...prev,
                        [tpl.id]: e.target.value,
                      }))
                    }
                    data-ocid={`pitch_templates.editor.${idx + 1}`}
                  />
                ) : (
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {renderBody(body)}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
