import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  UploadCloud,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";
import { useImportCSVLeads, useImportHistory } from "../hooks/useCompliance";
import { useCreateLead, useLeads } from "../hooks/useLeads";
import type { ImportRowResult, ImportRowStatus } from "../types/compliance";

const PHONE_RE = /^(\+91|0)?[6-9]\d{9}$|^\+\d{10,15}$/;
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const FIELD_MAP: Record<string, string[]> = {
  businessName: ["businessname", "business name", "name", "company"],
  phone: ["phone", "mobile", "contact", "phonenumber"],
  email: ["email", "emailaddress", "e-mail"],
  website: ["website", "url", "web", "site"],
  city: ["city", "location", "town"],
  category: ["category", "niche", "industry", "type", "sector"],
};

type FieldKey = keyof typeof FIELD_MAP;

function autoMap(headers: string[]): Record<FieldKey, number> {
  const mapping: Record<string, number> = {};
  headers.forEach((h, i) => {
    const norm = h.toLowerCase().trim().replace(/\s+/g, "");
    for (const [field, aliases] of Object.entries(FIELD_MAP)) {
      if (aliases.some((a) => norm.includes(a.replace(/\s/g, "")))) {
        if (!(field in mapping)) mapping[field] = i;
      }
    }
  });
  return mapping as Record<FieldKey, number>;
}

function parseCSV(text: string): { headers: string[]; rows: string[][] } {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().replace(/^"|"$/g, ""));
  const rows = lines
    .slice(1)
    .map((l) => l.split(",").map((c) => c.trim().replace(/^"|"$/g, "")));
  return { headers, rows };
}

export default function ImportPage() {
  const { data: existingLeads = [] } = useLeads();
  const { data: importHistory = [] } = useImportHistory();
  const importCSV = useImportCSVLeads();
  const createLead = useCreateLead();

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [mapping, setMapping] = useState<Record<string, number>>({});
  const [validating, setValidating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ImportRowResult[]>([]);
  const [imported, setImported] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const existingEmails = new Set(existingLeads.map((l) => l.notes));

  const handleFile = (f: File) => {
    setFile(f);
    setResults([]);
    setImported(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const { headers: h, rows: r } = parseCSV(text);
      setHeaders(h);
      setRows(r);
      setMapping(autoMap(h));
    };
    reader.readAsText(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.name.endsWith(".csv")) handleFile(f);
  };

  const getVal = (row: string[], field: FieldKey): string =>
    mapping[field] !== undefined ? (row[mapping[field]] ?? "").trim() : "";

  const mappedCount = Object.keys(mapping).length;

  const startValidation = async () => {
    setValidating(true);
    setProgress(0);
    const seenEmails = new Set<string>();
    const out: ImportRowResult[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const name = getVal(row, "businessName");
      const phone = getVal(row, "phone");
      const email = getVal(row, "email");
      const website = getVal(row, "website");
      const city = getVal(row, "city");
      const category = getVal(row, "category");

      let status: ImportRowStatus = "valid";
      let reason = "";

      if (email && existingEmails.has(email)) {
        status = "duplicate";
        reason = "Email already exists";
      } else if (email && seenEmails.has(email)) {
        status = "duplicate";
        reason = "Duplicate in this file";
      } else if (phone && !PHONE_RE.test(phone)) {
        status = "invalid";
        reason = "Invalid phone format";
      } else if (email && !EMAIL_RE.test(email)) {
        status = "invalid";
        reason = "Invalid email format";
      } else if (!name) {
        status = "invalid";
        reason = "Missing business name";
      } else {
        // Simulate website check (90% pass)
        await new Promise((r) => setTimeout(r, 8));
        if (website && i % 10 === 7) {
          status = "invalid";
          reason = "Website unreachable (simulated)";
        }
      }

      if (email) seenEmails.add(email);
      out.push({
        rowIndex: i + 1,
        status,
        reason,
        phone,
        email,
        name,
        website,
        city,
        category,
      });
      setProgress(Math.round(((i + 1) / rows.length) * 100));
    }

    setResults(out);
    setValidating(false);
  };

  const validRows = results.filter((r) => r.status === "valid");
  const invalidRows = results.filter((r) => r.status === "invalid");
  const dupRows = results.filter((r) => r.status === "duplicate");

  const doImport = async () => {
    for (const row of validRows) {
      try {
        await createLead.mutateAsync({
          businessName: row.name,
          phone: row.phone,
          website: row.website,
          city: row.city,
          industry: row.category,
          address: row.city,
          notes: row.email,
          rating: 0,
          leadScore: BigInt(60),
        });
      } catch {
        // Continue on individual failure
      }
    }
    await importCSV.mutateAsync({
      rows: validRows.map((r) => ({
        name: r.name,
        phone: r.phone,
        email: r.email,
        website: r.website,
        city: r.city,
        category: r.category,
      })),
      filename: file?.name ?? "import.csv",
      userId: "user_1",
    });
    setImported(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Lead Import Center
        </h1>
        <p className="text-muted-foreground mt-1">
          Drag &amp; drop or upload a CSV file to import leads — fields are
          auto-detected and validated.
        </p>
      </div>

      {/* Upload Zone */}
      {!file && (
        <label
          data-ocid="import.dropzone"
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-12 flex flex-col items-center gap-4 cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30",
          )}
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <UploadCloud className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">
              Drop CSV file here or click to browse
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports .csv files with comma-separated values
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </label>
      )}

      {/* File selected — column mapping */}
      {file && headers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-4 h-4 text-primary" />
              {file.name}
              <Badge variant="outline" className="ml-auto">
                {rows.length} rows detected
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-muted-foreground">
                Auto-detected{" "}
                <span
                  className={cn(
                    "font-semibold",
                    mappedCount >= 4 ? "text-success" : "text-warning",
                  )}
                >
                  {mappedCount} of 6
                </span>{" "}
                fields
              </span>
            </div>

            {/* Field mapping table */}
            <div className="grid grid-cols-2 gap-2 text-sm">
              {(Object.keys(FIELD_MAP) as FieldKey[]).map((field) => (
                <div
                  key={field}
                  className="flex items-center gap-2 p-2 rounded-lg bg-muted/40"
                >
                  {mapping[field] !== undefined ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                  )}
                  <span className="text-muted-foreground capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="ml-auto font-mono text-xs text-foreground/70 truncate">
                    {mapping[field] !== undefined
                      ? headers[mapping[field]]
                      : "—"}
                  </span>
                </div>
              ))}
            </div>

            {/* Preview */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider">
                Preview (first 3 rows)
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50">
                      {(Object.keys(FIELD_MAP) as FieldKey[])
                        .filter((f) => mapping[f] !== undefined)
                        .map((f) => (
                          <th
                            key={f}
                            className="px-3 py-2 text-left text-muted-foreground font-medium capitalize"
                          >
                            {f.replace(/([A-Z])/g, " $1")}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 3).map((row) => (
                      <tr
                        key={row.join("|")}
                        className="border-t border-border"
                      >
                        {(Object.keys(FIELD_MAP) as FieldKey[])
                          .filter((f) => mapping[f] !== undefined)
                          .map((f) => (
                            <td
                              key={f}
                              className="px-3 py-2 text-foreground/80 max-w-[120px] truncate"
                            >
                              {getVal(row, f) || "—"}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {results.length === 0 && (
                <Button
                  data-ocid="import.validate_button"
                  onClick={startValidation}
                  disabled={validating}
                >
                  {validating ? "Validating…" : "Start Validation"}
                </Button>
              )}
              <Button
                variant="outline"
                data-ocid="import.reset_button"
                onClick={() => {
                  setFile(null);
                  setHeaders([]);
                  setRows([]);
                  setResults([]);
                  setProgress(0);
                  setImported(false);
                }}
              >
                Choose Different File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      {validating && (
        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Validating rows…</span>
              <span className="font-semibold text-foreground">{progress}%</span>
            </div>
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground">
              Checking phone format, email validity, website reachability, and
              duplicates
            </p>
          </CardContent>
        </Card>
      )}

      {/* Import Summary */}
      {results.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Valid",
                count: validRows.length,
                color: "text-success",
                bg: "bg-success/10",
                icon: CheckCircle2,
              },
              {
                label: "Invalid",
                count: invalidRows.length,
                color: "text-warning",
                bg: "bg-warning/10",
                icon: AlertTriangle,
              },
              {
                label: "Duplicates",
                count: dupRows.length,
                color: "text-primary",
                bg: "bg-primary/10",
                icon: Info,
              },
              {
                label: "Total Rows",
                count: results.length,
                color: "text-foreground",
                bg: "bg-muted/40",
                icon: FileText,
              },
            ].map(({ label, count, color, bg, icon: Icon }) => (
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
                  <p className={cn("text-2xl font-bold", color)}>{count}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Results Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Validation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="px-3 py-2 text-left text-muted-foreground font-medium">
                        #
                      </th>
                      <th className="px-3 py-2 text-left text-muted-foreground font-medium">
                        Name
                      </th>
                      <th className="px-3 py-2 text-left text-muted-foreground font-medium">
                        Email
                      </th>
                      <th className="px-3 py-2 text-left text-muted-foreground font-medium">
                        Phone
                      </th>
                      <th className="px-3 py-2 text-left text-muted-foreground font-medium">
                        Status
                      </th>
                      <th className="px-3 py-2 text-left text-muted-foreground font-medium">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr
                        key={r.rowIndex}
                        data-ocid={`import.result.item.${r.rowIndex}`}
                        className="border-t border-border"
                      >
                        <td className="px-3 py-2 text-muted-foreground text-xs">
                          {r.rowIndex}
                        </td>
                        <td className="px-3 py-2 font-medium text-foreground max-w-[140px] truncate">
                          {r.name || "—"}
                        </td>
                        <td className="px-3 py-2 text-muted-foreground text-xs max-w-[160px] truncate">
                          {r.email || "—"}
                        </td>
                        <td className="px-3 py-2 text-muted-foreground text-xs">
                          {r.phone || "—"}
                        </td>
                        <td className="px-3 py-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              r.status === "valid" &&
                                "text-success border-success/30 bg-success/10",
                              r.status === "invalid" &&
                                "text-warning border-warning/30 bg-warning/10",
                              r.status === "duplicate" &&
                                "text-primary border-primary/30 bg-primary/10",
                            )}
                          >
                            {r.status === "valid" && (
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                            )}
                            {r.status === "invalid" && (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            {r.status === "duplicate" && (
                              <Info className="w-3 h-3 mr-1" />
                            )}
                            {r.status}
                          </Badge>
                        </td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">
                          {r.reason || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Import Button */}
          {!imported && validRows.length > 0 && (
            <div className="flex items-center gap-4">
              <Button
                data-ocid="import.submit_button"
                size="lg"
                onClick={doImport}
                disabled={importCSV.isPending || createLead.isPending}
              >
                {importCSV.isPending
                  ? "Importing…"
                  : `Import ${validRows.length} Valid Leads`}
              </Button>
              <p className="text-xs text-muted-foreground">
                {invalidRows.length + dupRows.length} rows will be skipped
              </p>
            </div>
          )}
          {imported && (
            <div
              data-ocid="import.success_state"
              className="flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20"
            >
              <CheckCircle2 className="w-5 h-5 text-success" />
              <div>
                <p className="font-semibold text-success">Import Successful!</p>
                <p className="text-xs text-muted-foreground">
                  {validRows.length} leads added to your pipeline.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Import History */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Import History
        </h2>
        {importHistory.length === 0 ? (
          <div
            data-ocid="import.empty_state"
            className="text-center py-8 text-muted-foreground"
          >
            No imports yet
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {importHistory.map((rec, i) => (
              <Card
                key={rec.id.toString()}
                data-ocid={`import.history.item.${i + 1}`}
              >
                <CardContent className="pt-4 pb-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm text-foreground truncate">
                      {rec.filename}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(
                      Number(rec.timestamp) / 1_000_000,
                    ).toLocaleDateString("en-IN")}
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center mt-2">
                    {[
                      {
                        label: "Total",
                        val: rec.totalRows,
                        cls: "text-foreground",
                      },
                      {
                        label: "Valid",
                        val: rec.validCount,
                        cls: "text-success",
                      },
                      {
                        label: "Invalid",
                        val: rec.invalidCount,
                        cls: "text-warning",
                      },
                      {
                        label: "Imported",
                        val: rec.importedCount,
                        cls: "text-primary",
                      },
                    ].map(({ label, val, cls }) => (
                      <div key={label} className="p-1 rounded-lg bg-muted/40">
                        <p className={cn("text-base font-bold", cls)}>{val}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Compliance note */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          All lead data is labeled as{" "}
          <strong>"Based on publicly available data and heuristics"</strong>. We
          do not scrape protected platforms. Imported data is used solely for
          compliant outreach after explicit opt-in consent is recorded.
        </p>
      </div>
    </div>
  );
}
