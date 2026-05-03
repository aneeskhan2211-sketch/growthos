import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink, Globe, Plus, Rocket, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useDeleteSeoPage,
  useGenerateSeoPages,
  usePublishSeoPage,
  useSeoPages,
} from "../hooks/useBulkSeoGenerator";

const NICHES = [
  "Salon",
  "Gym",
  "Clinic",
  "Restaurant",
  "Real Estate",
  "Coaching",
];
const CITIES = [
  "Mumbai",
  "Pune",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Other",
];

interface Chip {
  niche: string;
  city: string;
}

export default function BulkSeoGeneratorPage() {
  const { data: pages = [], isLoading } = useSeoPages();
  const generatePages = useGenerateSeoPages();
  const publishPage = usePublishSeoPage();
  const deletePage = useDeleteSeoPage();

  const [showAdd, setShowAdd] = useState(false);
  const [chips, setChips] = useState<Chip[]>([]);
  const [pickedNiche, setPickedNiche] = useState("Salon");
  const [pickedCity, setPickedCity] = useState("Mumbai");

  const addChip = () => {
    if (chips.length >= 20) return;
    const exists = chips.some(
      (c) => c.niche === pickedNiche && c.city === pickedCity,
    );
    if (exists) {
      toast.error("That niche+city pair is already added.");
      return;
    }
    setChips((prev) => [...prev, { niche: pickedNiche, city: pickedCity }]);
  };

  const removeChip = (idx: number) =>
    setChips((prev) => prev.filter((_, i) => i !== idx));

  const handleGenerate = async () => {
    if (!chips.length) return;
    const requests = chips.map((c) => ({
      niche: c.niche,
      city: c.city,
      area: "",
      targetKeyword: `${c.niche.toLowerCase()} marketing ${c.city.toLowerCase()}`,
    }));
    try {
      await generatePages.mutateAsync(requests);
      toast.success(
        `${chips.length} SEO page${chips.length !== 1 ? "s" : ""} generated`,
      );
      setChips([]);
      setShowAdd(false);
    } catch {
      toast.error("Generation failed. Please try again.");
    }
  };

  const totalPages = pages.length;
  const published = pages.filter((p) => p.published).length;
  const drafts = totalPages - published;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Bulk SEO Page Generator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Generate multiple niche+city landing pages at once. Pages are
            accessible at{" "}
            <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
              /seo-page/[niche]-[city]
            </code>
          </p>
        </div>
        <Button
          type="button"
          onClick={() => setShowAdd(true)}
          data-ocid="seo_generator.open_modal_button"
          className="shrink-0"
        >
          <Plus className="w-4 h-4 mr-2" /> Generate Pages
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Pages", value: totalPages, color: "text-foreground" },
          { label: "Published", value: published, color: "text-success" },
          { label: "Draft", value: drafts, color: "text-muted-foreground" },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div
          className="flex items-center justify-center h-40"
          data-ocid="seo_generator.loading_state"
        >
          <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && pages.length === 0 && (
        <Card
          className="flex flex-col items-center justify-center h-48 gap-3"
          data-ocid="seo_generator.empty_state"
        >
          <Globe className="w-8 h-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            No SEO pages yet. Generate your first batch.
          </p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setShowAdd(true)}
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Create Pages
          </Button>
        </Card>
      )}

      {/* Pages table */}
      {!isLoading && pages.length > 0 && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Slug / Title
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Niche
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    City
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page, i) => (
                  <tr
                    key={page.id}
                    className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                    data-ocid={`seo_generator.item.${i + 1}`}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground truncate max-w-xs">
                        {page.title}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        /{page.slug}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs">
                        {page.niche}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {page.city}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          page.published
                            ? "text-success border-success/30 bg-success/5"
                            : "text-muted-foreground border-border"
                        }
                      >
                        {page.published ? "Published" : "Draft"}
                      </Badge>
                      {page.published && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          /seo-page/{page.slug}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs text-muted-foreground"
                          onClick={() =>
                            window.open(`/seo-page/${page.slug}`, "_blank")
                          }
                          data-ocid={`seo_generator.item.${i + 1}.preview_button`}
                          aria-label="Preview page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                        {!page.published && (
                          <Button
                            type="button"
                            size="sm"
                            variant="default"
                            className="h-7 px-2.5 text-xs"
                            onClick={() => {
                              publishPage.mutate(page.id);
                              toast.success("Page published!");
                            }}
                            data-ocid={`seo_generator.item.${i + 1}.publish_button`}
                          >
                            <Rocket className="w-3 h-3 mr-1" /> Publish
                          </Button>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-destructive hover:text-destructive"
                          onClick={async () => {
                            try {
                              await deletePage.mutateAsync(page.id);
                              toast.success("Page deleted");
                            } catch {
                              toast.error("Failed to delete page");
                            }
                          }}
                          data-ocid={`seo_generator.item.${i + 1}.delete_button`}
                          aria-label="Delete page"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Generate dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent className="max-w-lg" data-ocid="seo_generator.dialog">
          <DialogHeader>
            <DialogTitle>Generate SEO Pages</DialogTitle>
          </DialogHeader>

          <div className="space-y-5 mt-2">
            {/* Niche + City picker */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Select Niche + City
              </p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Niche
                  </Label>
                  <Select value={pickedNiche} onValueChange={setPickedNiche}>
                    <SelectTrigger
                      className="h-9"
                      data-ocid="seo_generator.niche_select"
                    >
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
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    City
                  </Label>
                  <Select value={pickedCity} onValueChange={setPickedCity}>
                    <SelectTrigger
                      className="h-9"
                      data-ocid="seo_generator.city_select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col justify-end">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-9"
                    onClick={addChip}
                    disabled={chips.length >= 20}
                    data-ocid="seo_generator.add_chip_button"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {chips.length >= 20 && (
                <p className="text-xs text-amber-500">
                  Maximum 20 pages per batch reached.
                </p>
              )}
            </div>

            {/* Chips list */}
            {chips.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  {chips.length} page{chips.length !== 1 ? "s" : ""} selected
                </p>
                <div className="flex flex-wrap gap-2">
                  {chips.map((chip, idx) => (
                    <span
                      key={`${chip.niche}-${chip.city}-${idx}`}
                      className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-medium"
                      data-ocid={`seo_generator.chip.${idx + 1}`}
                    >
                      {chip.niche} • {chip.city}
                      <button
                        type="button"
                        onClick={() => removeChip(idx)}
                        className="text-primary/60 hover:text-primary transition-colors"
                        aria-label={`Remove ${chip.niche} ${chip.city}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {chips.length === 0 && (
              <div className="border border-dashed border-border rounded-lg p-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Add at least one niche+city pair to continue.
                </p>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowAdd(false);
                  setChips([]);
                }}
                data-ocid="seo_generator.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={chips.length === 0 || generatePages.isPending}
                onClick={handleGenerate}
                data-ocid="seo_generator.confirm_button"
              >
                {generatePages.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Generating…
                  </span>
                ) : (
                  <>
                    Generate {chips.length > 0 ? chips.length : ""} Page
                    {chips.length !== 1 ? "s" : ""}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
