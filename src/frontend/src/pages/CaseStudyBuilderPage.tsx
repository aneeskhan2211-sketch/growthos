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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Copy,
  Edit2,
  Link2,
  Plus,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  type CaseStudy,
  type CaseStudyMetric,
  type CreateCaseStudyInput,
  generateShareUrl,
  useCaseStudies,
  useCreateCaseStudy,
  useDeleteCaseStudy,
  usePublishCaseStudy,
  useUpdateCaseStudy,
} from "../hooks/useCaseStudies";

const NICHES = [
  "Salon",
  "Gym",
  "Clinic",
  "Restaurant",
  "Real Estate",
  "Coaching",
  "Other",
];

const EMPTY_FORM: CreateCaseStudyInput = {
  title: "",
  clientName: "",
  niche: "",
  city: "",
  challenge: "",
  solution: "",
  actionsTaken: [""],
  metrics: [{ label: "", before: "", after: "" }],
  results: [],
  beforeMetric: "",
  afterMetric: "",
  testimonial: "",
};

// ─── Shareable Proof Card ────────────────────────────────────────────────────
function ProofCard({
  study,
  onClose,
}: { study: CaseStudy; onClose: () => void }) {
  const url = study.shareToken ? generateShareUrl(study.shareToken) : "";
  const headline = study.metrics[0]
    ? `${study.clientName} grew from ${study.metrics[0].before} to ${study.metrics[0].after} ${study.metrics[0].label.toLowerCase()}`
    : `${study.clientName} achieved remarkable results`;

  const whatsappMsg = encodeURIComponent(
    `Check out this growth story: ${study.title}\n${url}`,
  );
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const copyLink = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Link copied!"));
  };

  return (
    <div className="space-y-4">
      {/* The shareable card */}
      <div
        className="rounded-2xl overflow-hidden shadow-xl"
        style={{ aspectRatio: "1/1", maxWidth: 420, margin: "0 auto" }}
        data-ocid="case_studies.proof_card"
      >
        {/* Gradient background */}
        <div className="w-full h-full bg-gradient-to-br from-primary to-primary/60 p-7 flex flex-col justify-between">
          {/* Top: branding + niche */}
          <div className="flex items-center justify-between">
            <span className="text-primary-foreground/70 text-xs font-semibold tracking-widest uppercase">
              GrowthOS · Client Win
            </span>
            <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 text-xs">
              {study.niche} · {study.city}
            </Badge>
          </div>

          {/* Center: metrics */}
          <div className="space-y-3">
            <p className="text-primary-foreground/80 text-sm font-medium leading-snug">
              {headline}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {study.metrics.slice(0, 4).map((m) => (
                <div
                  key={m.label}
                  className="bg-primary-foreground/10 backdrop-blur rounded-xl p-3"
                >
                  <p className="text-primary-foreground/60 text-[10px] uppercase tracking-wide mb-1">
                    {m.label}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-primary-foreground/60 text-sm font-semibold">
                      {m.before}
                    </span>
                    <ArrowRight className="w-3 h-3 text-primary-foreground/50 shrink-0" />
                    <span className="text-primary-foreground text-sm font-bold">
                      {m.after}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: testimonial or tagline */}
          <div className="space-y-1">
            {study.testimonial ? (
              <p className="text-primary-foreground/80 text-xs italic line-clamp-2">
                "{study.testimonial}"
              </p>
            ) : null}
            <p className="text-primary-foreground/50 text-[10px] tracking-wider uppercase">
              Results achieved with GrowthOS
            </p>
          </div>
        </div>
      </div>

      {/* Share actions */}
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-full gap-2"
          onClick={copyLink}
          data-ocid="case_studies.copy_link_button"
        >
          <Link2 className="w-4 h-4" /> Copy Shareable Link
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            className="gap-2 text-[#25D366] border-[#25D366]/30 hover:bg-[#25D366]/5"
            onClick={() =>
              window.open(`https://wa.me/?text=${whatsappMsg}`, "_blank")
            }
            data-ocid="case_studies.share_whatsapp_button"
          >
            <Share2 className="w-4 h-4" /> WhatsApp
          </Button>
          <Button
            type="button"
            variant="outline"
            className="gap-2 text-[#0A66C2] border-[#0A66C2]/30 hover:bg-[#0A66C2]/5"
            onClick={() => window.open(linkedinUrl, "_blank")}
            data-ocid="case_studies.share_linkedin_button"
          >
            <Share2 className="w-4 h-4" /> LinkedIn
          </Button>
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        className="w-full"
        onClick={onClose}
        data-ocid="case_studies.proof_card.close_button"
      >
        Done
      </Button>
    </div>
  );
}

// ─── Study Card ──────────────────────────────────────────────────────────────
function StudyCard({
  study,
  index,
  onDelete,
  onPublish,
  onShare,
  onEdit,
}: {
  study: CaseStudy;
  index: number;
  onDelete: () => void;
  onPublish: () => void;
  onShare: () => void;
  onEdit: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
    >
      <Card
        className="p-5 space-y-4 hover:shadow-md transition-shadow"
        data-ocid={`case_studies.item.${index + 1}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground truncate text-sm leading-snug">
              {study.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {study.clientName} · {study.niche} · {study.city}
            </p>
          </div>
          <Badge
            variant="outline"
            className={
              study.published
                ? "text-success border-success/30 bg-success/5 shrink-0"
                : "text-muted-foreground shrink-0"
            }
          >
            {study.published ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" /> Published
              </>
            ) : (
              "Draft"
            )}
          </Badge>
        </div>

        {/* Key metrics */}
        {study.metrics.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {study.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="bg-muted/40 rounded-lg p-2.5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                  {m.label}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs text-muted-foreground">
                    {m.before}
                  </span>
                  <ArrowRight className="w-2.5 h-2.5 text-primary" />
                  <span className="text-xs font-bold text-primary">
                    {m.after}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/40 rounded-lg p-2.5">
              <p className="text-[10px] text-muted-foreground">Before</p>
              <p className="text-xs font-medium truncate">
                {study.beforeMetric}
              </p>
            </div>
            <div className="bg-primary/5 border border-primary/15 rounded-lg p-2.5">
              <p className="text-[10px] text-primary">After</p>
              <p className="text-xs font-medium truncate">
                {study.afterMetric}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-8 px-2.5 text-xs"
            onClick={onEdit}
            data-ocid={`case_studies.edit_button.${index + 1}`}
          >
            <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
          </Button>
          {!study.published && (
            <Button
              type="button"
              size="sm"
              variant="default"
              className="h-8 px-3 text-xs"
              onClick={onPublish}
              data-ocid={`case_studies.item.${index + 1}.publish`}
            >
              Publish
            </Button>
          )}
          {study.published && study.shareToken && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 px-2.5 text-xs"
              onClick={onShare}
              data-ocid={`case_studies.item.${index + 1}.share`}
            >
              <Share2 className="w-3.5 h-3.5 mr-1" /> Share
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto"
            onClick={onDelete}
            data-ocid={`case_studies.delete_button.${index + 1}`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Create / Edit Form ──────────────────────────────────────────────────────
function CaseStudyForm({
  initial,
  onSave,
  onClose,
  isSaving,
  isEdit,
}: {
  initial: CreateCaseStudyInput;
  onSave: (data: CreateCaseStudyInput, publish: boolean) => void;
  onClose: () => void;
  isSaving: boolean;
  isEdit?: boolean;
}) {
  const [form, setForm] = useState<CreateCaseStudyInput>(initial);

  const set = <K extends keyof CreateCaseStudyInput>(
    key: K,
    val: CreateCaseStudyInput[K],
  ) => setForm((f) => ({ ...f, [key]: val }));

  // Actions
  const setAction = (i: number, val: string) =>
    set(
      "actionsTaken",
      form.actionsTaken.map((a, idx) => (idx === i ? val : a)),
    );
  const addAction = () => set("actionsTaken", [...form.actionsTaken, ""]);
  const removeAction = (i: number) =>
    set(
      "actionsTaken",
      form.actionsTaken.filter((_, idx) => idx !== i),
    );

  // Metrics
  const setMetric = (i: number, field: keyof CaseStudyMetric, val: string) =>
    set(
      "metrics",
      form.metrics.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)),
    );
  const addMetric = () =>
    set("metrics", [...form.metrics, { label: "", before: "", after: "" }]);
  const removeMetric = (i: number) =>
    set(
      "metrics",
      form.metrics.filter((_, idx) => idx !== i),
    );

  const canSave = form.clientName.trim() && form.niche && form.city.trim();

  return (
    <div className="space-y-5 overflow-y-auto max-h-[72vh] pr-1">
      {/* Basic info */}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 space-y-1.5">
          <Label>Title</Label>
          <Input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Salon Mumbai Growth Story"
            data-ocid="case_studies.title_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Client Name *</Label>
          <Input
            value={form.clientName}
            onChange={(e) => set("clientName", e.target.value)}
            placeholder="Glamour Studio"
            data-ocid="case_studies.client_name_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>City *</Label>
          <Input
            value={form.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Mumbai"
            data-ocid="case_studies.city_input"
          />
        </div>
        <div className="space-y-1.5">
          <Label>Niche *</Label>
          <Select value={form.niche} onValueChange={(v) => set("niche", v)}>
            <SelectTrigger data-ocid="case_studies.niche_select">
              <SelectValue placeholder="Select niche" />
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
      </div>

      {/* Problem */}
      <div className="space-y-1.5">
        <Label>Problem Statement</Label>
        <Textarea
          value={form.challenge}
          onChange={(e) => set("challenge", e.target.value)}
          rows={2}
          placeholder="Describe the client's main challenge…"
          data-ocid="case_studies.challenge_textarea"
        />
      </div>

      {/* Actions taken */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Actions Taken</Label>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            onClick={addAction}
            data-ocid="case_studies.add_action_button"
          >
            <Plus className="w-3 h-3 mr-1" /> Add
          </Button>
        </div>
        <div className="space-y-2">
          {form.actionsTaken.map((action, i) => (
            <div key={action || String(i)} className="flex gap-2">
              <Input
                value={action}
                onChange={(e) => setAction(i, e.target.value)}
                placeholder="e.g. Set up Google Business Profile"
                className="h-8 text-sm"
                data-ocid={`case_studies.action_input.${i + 1}`}
              />
              {form.actionsTaken.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeAction(i)}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Result Metrics */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Result Metrics</Label>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs"
            onClick={addMetric}
            data-ocid="case_studies.add_metric_button"
          >
            <Plus className="w-3 h-3 mr-1" /> Add Row
          </Button>
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-1.5 px-0.5">
            <p className="text-[11px] text-muted-foreground">Label</p>
            <p className="text-[11px] text-muted-foreground">Before</p>
            <p className="text-[11px] text-muted-foreground">After</p>
            <div className="w-8" />
          </div>
          {form.metrics.map((m, i) => (
            <div
              key={m.label || `metric-${i}`}
              className="grid grid-cols-[2fr_1fr_1fr_auto] gap-1.5"
            >
              <Input
                value={m.label}
                onChange={(e) => setMetric(i, "label", e.target.value)}
                placeholder="Monthly Enquiries"
                className="h-8 text-sm"
                data-ocid={`case_studies.metric_label.${i + 1}`}
              />
              <Input
                value={m.before}
                onChange={(e) => setMetric(i, "before", e.target.value)}
                placeholder="5"
                className="h-8 text-sm"
                data-ocid={`case_studies.metric_before.${i + 1}`}
              />
              <Input
                value={m.after}
                onChange={(e) => setMetric(i, "after", e.target.value)}
                placeholder="45"
                className="h-8 text-sm"
                data-ocid={`case_studies.metric_after.${i + 1}`}
              />
              {form.metrics.length > 1 ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeMetric(i)}
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              ) : (
                <div className="w-8" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="space-y-1.5">
        <Label>
          Testimonial Quote{" "}
          <span className="text-muted-foreground text-xs">(optional)</span>
        </Label>
        <Textarea
          value={form.testimonial ?? ""}
          onChange={(e) => set("testimonial", e.target.value)}
          rows={2}
          placeholder='"GrowthOS transformed how we get clients…" — Client Name'
          data-ocid="case_studies.testimonial_textarea"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 justify-end pt-1 sticky bottom-0 bg-background pb-1">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="case_studies.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={!canSave || isSaving}
          onClick={() => onSave(form, false)}
          data-ocid="case_studies.save_draft_button"
        >
          Save as Draft
        </Button>
        <Button
          type="button"
          disabled={!canSave || isSaving}
          onClick={() => onSave(form, true)}
          data-ocid="case_studies.submit_button"
        >
          {isEdit ? "Update & Publish" : "Publish"}
        </Button>
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function CaseStudyBuilderPage() {
  const { data: studies = [], isLoading } = useCaseStudies();
  const createStudy = useCreateCaseStudy();
  const updateStudy = useUpdateCaseStudy();
  const publishStudy = usePublishCaseStudy();
  const deleteStudy = useDeleteCaseStudy();

  const [mode, setMode] = useState<"list" | "create" | "edit" | "share">(
    "list",
  );
  const [editTarget, setEditTarget] = useState<CaseStudy | null>(null);
  const [shareTarget, setShareTarget] = useState<CaseStudy | null>(null);

  const openCreate = () => {
    setEditTarget(null);
    setMode("create");
  };
  const openEdit = (s: CaseStudy) => {
    setEditTarget(s);
    setMode("edit");
  };
  const openShare = (s: CaseStudy) => {
    setShareTarget(s);
    setMode("share");
  };
  const closeDialog = () => {
    setMode("list");
    setEditTarget(null);
    setShareTarget(null);
  };

  const handleSave = async (data: CreateCaseStudyInput, publish: boolean) => {
    if (editTarget) {
      await updateStudy.mutateAsync({ id: editTarget.id, ...data });
      if (publish) await publishStudy.mutateAsync(editTarget.id);
      toast.success("Case study updated");
    } else {
      const result = await createStudy.mutateAsync(data);
      if (publish && result) {
        const id = (result as { id: string }).id;
        if (id) await publishStudy.mutateAsync(String(id)).catch(() => {});
      }
      toast.success(publish ? "Case study published!" : "Saved as draft");
    }
    closeDialog();
  };

  const handlePublish = async (study: CaseStudy) => {
    await publishStudy.mutateAsync(study.id);
    toast.success("Published! Share it to attract more clients.");
    // Auto-open share dialog
    setTimeout(
      () =>
        openShare({
          ...study,
          published: true,
          shareToken: study.shareToken ?? study.id,
        }),
      400,
    );
  };

  const handleDelete = (study: CaseStudy) => {
    deleteStudy.mutate(study.id);
    toast.success("Case study deleted");
  };

  const initialForm: CreateCaseStudyInput = editTarget
    ? {
        title: editTarget.title,
        clientName: editTarget.clientName,
        niche: editTarget.niche,
        city: editTarget.city,
        challenge: editTarget.challenge,
        solution: editTarget.solution,
        actionsTaken: editTarget.actionsTaken.length
          ? editTarget.actionsTaken
          : [""],
        metrics: editTarget.metrics.length
          ? editTarget.metrics
          : [{ label: "", before: "", after: "" }],
        results: editTarget.results,
        beforeMetric: editTarget.beforeMetric,
        afterMetric: editTarget.afterMetric,
        testimonial: editTarget.testimonial ?? "",
      }
    : EMPTY_FORM;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Case Study Builder
          </h1>
          <p className="text-sm text-muted-foreground">
            Document client wins and auto-generate shareable proof cards.
          </p>
        </div>
        <Button
          type="button"
          onClick={openCreate}
          data-ocid="case_studies.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-2" /> New Case Study
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          className="flex items-center justify-center h-40"
          data-ocid="case_studies.loading_state"
        >
          <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && studies.length === 0 && (
        <Card
          className="flex flex-col items-center justify-center py-16 gap-4"
          data-ocid="case_studies.empty_state"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-7 h-7 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-foreground">
              Document your first client win
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Turn real client results into shareable proof cards that attract
              more leads.
            </p>
          </div>
          <Button
            type="button"
            onClick={openCreate}
            data-ocid="case_studies.empty_state.create_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Create Case Study
          </Button>
        </Card>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {studies.map((study, i) => (
          <StudyCard
            key={study.id}
            study={study}
            index={i}
            onDelete={() => handleDelete(study)}
            onPublish={() => handlePublish(study)}
            onShare={() => openShare(study)}
            onEdit={() => openEdit(study)}
          />
        ))}
      </div>

      {/* Create / Edit dialog */}
      <Dialog
        open={mode === "create" || mode === "edit"}
        onOpenChange={(o) => !o && closeDialog()}
      >
        <DialogContent className="max-w-xl" data-ocid="case_studies.dialog">
          <DialogHeader>
            <DialogTitle>
              {mode === "edit" ? "Edit Case Study" : "New Case Study"}
            </DialogTitle>
          </DialogHeader>
          <AnimatePresence mode="wait">
            <motion.div
              key={editTarget?.id ?? "new"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <CaseStudyForm
                initial={initialForm}
                onSave={handleSave}
                onClose={closeDialog}
                isSaving={createStudy.isPending || updateStudy.isPending}
                isEdit={mode === "edit"}
              />
            </motion.div>
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Share / Proof Card dialog */}
      <Dialog
        open={mode === "share" && !!shareTarget}
        onOpenChange={(o) => !o && closeDialog()}
      >
        <DialogContent
          className="max-w-sm"
          data-ocid="case_studies.share_dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Copy className="w-4 h-4" /> Shareable Proof Card
            </DialogTitle>
          </DialogHeader>
          {shareTarget && (
            <ProofCard study={shareTarget} onClose={closeDialog} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
