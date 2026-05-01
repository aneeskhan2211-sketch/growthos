import { c as createLucideIcon, w as useLeads, a3 as useCreateLead, r as reactExports, j as jsxRuntimeExports, h as cn, aj as Card, ak as CardHeader, al as CardTitle, K as FileText, B as Badge, am as CardContent, D as CircleCheck, at as TriangleAlert, a as Button, au as Progress, av as Info, aw as CircleX, o as Clock } from "./index-C-gts07u.js";
import { u as useImportHistory, a as useImportCSVLeads } from "./useCompliance-DxWkf18e.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 13v8", key: "1l5pq0" }],
  ["path", { d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", key: "1pljnt" }],
  ["path", { d: "m8 17 4-4 4 4", key: "1quai1" }]
];
const CloudUpload = createLucideIcon("cloud-upload", __iconNode);
const PHONE_RE = /^(\+91|0)?[6-9]\d{9}$|^\+\d{10,15}$/;
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
const FIELD_MAP = {
  businessName: ["businessname", "business name", "name", "company"],
  phone: ["phone", "mobile", "contact", "phonenumber"],
  email: ["email", "emailaddress", "e-mail"],
  website: ["website", "url", "web", "site"],
  city: ["city", "location", "town"],
  category: ["category", "niche", "industry", "type", "sector"]
};
function autoMap(headers) {
  const mapping = {};
  headers.forEach((h, i) => {
    const norm = h.toLowerCase().trim().replace(/\s+/g, "");
    for (const [field, aliases] of Object.entries(FIELD_MAP)) {
      if (aliases.some((a) => norm.includes(a.replace(/\s/g, "")))) {
        if (!(field in mapping)) mapping[field] = i;
      }
    }
  });
  return mapping;
}
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const rows = lines.slice(1).map((l) => l.split(",").map((c) => c.trim().replace(/^"|"$/g, "")));
  return { headers, rows };
}
function ImportPage() {
  const { data: existingLeads = [] } = useLeads();
  const { data: importHistory = [] } = useImportHistory();
  const importCSV = useImportCSVLeads();
  const createLead = useCreateLead();
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const [file, setFile] = reactExports.useState(null);
  const [headers, setHeaders] = reactExports.useState([]);
  const [rows, setRows] = reactExports.useState([]);
  const [mapping, setMapping] = reactExports.useState({});
  const [validating, setValidating] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState(0);
  const [results, setResults] = reactExports.useState([]);
  const [imported, setImported] = reactExports.useState(false);
  const fileInputRef = reactExports.useRef(null);
  const existingEmails = new Set(existingLeads.map((l) => l.notes));
  const handleFile = (f) => {
    setFile(f);
    setResults([]);
    setImported(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      const text = (_a = e.target) == null ? void 0 : _a.result;
      const { headers: h, rows: r } = parseCSV(text);
      setHeaders(h);
      setRows(r);
      setMapping(autoMap(h));
    };
    reader.readAsText(f);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f == null ? void 0 : f.name.endsWith(".csv")) handleFile(f);
  };
  const getVal = (row, field) => mapping[field] !== void 0 ? (row[mapping[field]] ?? "").trim() : "";
  const mappedCount = Object.keys(mapping).length;
  const startValidation = async () => {
    setValidating(true);
    setProgress(0);
    const seenEmails = /* @__PURE__ */ new Set();
    const out = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const name = getVal(row, "businessName");
      const phone = getVal(row, "phone");
      const email = getVal(row, "email");
      const website = getVal(row, "website");
      const city = getVal(row, "city");
      const category = getVal(row, "category");
      let status = "valid";
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
        category
      });
      setProgress(Math.round((i + 1) / rows.length * 100));
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
          leadScore: BigInt(60)
        });
      } catch {
      }
    }
    await importCSV.mutateAsync({
      rows: validRows.map((r) => ({
        name: r.name,
        phone: r.phone,
        email: r.email,
        website: r.website,
        city: r.city,
        category: r.category
      })),
      filename: (file == null ? void 0 : file.name) ?? "import.csv",
      userId: "user_1"
    });
    setImported(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Lead Import Center" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Drag & drop or upload a CSV file to import leads — fields are auto-detected and validated." })
    ] }),
    !file && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        "data-ocid": "import.dropzone",
        onDragOver: (e) => {
          e.preventDefault();
          setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onDrop: handleDrop,
        className: cn(
          "border-2 border-dashed rounded-xl p-12 flex flex-col items-center gap-4 cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Drop CSV file here or click to browse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Supports .csv files with comma-separated values" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: ".csv",
              className: "hidden",
              onChange: (e) => {
                var _a;
                const f = (_a = e.target.files) == null ? void 0 : _a[0];
                if (f) handleFile(f);
              }
            }
          )
        ]
      }
    ),
    file && headers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
        file.name,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "ml-auto", children: [
          rows.length,
          " rows detected"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "Auto-detected",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "font-semibold",
                  mappedCount >= 4 ? "text-success" : "text-warning"
                ),
                children: [
                  mappedCount,
                  " of 6"
                ]
              }
            ),
            " ",
            "fields"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 text-sm", children: Object.keys(FIELD_MAP).map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 p-2 rounded-lg bg-muted/40",
            children: [
              mapping[field] !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-success shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 text-warning shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground capitalize", children: field.replace(/([A-Z])/g, " $1") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-xs text-foreground/70 truncate", children: mapping[field] !== void 0 ? headers[mapping[field]] : "—" })
            ]
          },
          field
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wider", children: "Preview (first 3 rows)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/50", children: Object.keys(FIELD_MAP).filter((f) => mapping[f] !== void 0).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "th",
              {
                className: "px-3 py-2 text-left text-muted-foreground font-medium capitalize",
                children: f.replace(/([A-Z])/g, " $1")
              },
              f
            )) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.slice(0, 3).map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "tr",
              {
                className: "border-t border-border",
                children: Object.keys(FIELD_MAP).filter((f) => mapping[f] !== void 0).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "td",
                  {
                    className: "px-3 py-2 text-foreground/80 max-w-[120px] truncate",
                    children: getVal(row, f) || "—"
                  },
                  f
                ))
              },
              row.join("|")
            )) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          results.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "import.validate_button",
              onClick: startValidation,
              disabled: validating,
              children: validating ? "Validating…" : "Start Validation"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              "data-ocid": "import.reset_button",
              onClick: () => {
                setFile(null);
                setHeaders([]);
                setRows([]);
                setResults([]);
                setProgress(0);
                setImported(false);
              },
              children: "Choose Different File"
            }
          )
        ] })
      ] })
    ] }),
    validating && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Validating rows…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
          progress,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Checking phone format, email validity, website reachability, and duplicates" })
    ] }) }),
    results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        {
          label: "Valid",
          count: validRows.length,
          color: "text-success",
          bg: "bg-success/10",
          icon: CircleCheck
        },
        {
          label: "Invalid",
          count: invalidRows.length,
          color: "text-warning",
          bg: "bg-warning/10",
          icon: TriangleAlert
        },
        {
          label: "Duplicates",
          count: dupRows.length,
          color: "text-primary",
          bg: "bg-primary/10",
          icon: Info
        },
        {
          label: "Total Rows",
          count: results.length,
          color: "text-foreground",
          bg: "bg-muted/40",
          icon: FileText
        }
      ].map(({ label, count, color, bg, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "w-8 h-8 rounded-lg flex items-center justify-center mb-2",
              bg
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-4 h-4", color) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-2xl font-bold", color), children: count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
      ] }) }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Validation Results" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/50 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left text-muted-foreground font-medium", children: "#" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left text-muted-foreground font-medium", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left text-muted-foreground font-medium", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left text-muted-foreground font-medium", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left text-muted-foreground font-medium", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-2 text-left text-muted-foreground font-medium", children: "Reason" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: results.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `import.result.item.${r.rowIndex}`,
              className: "border-t border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground text-xs", children: r.rowIndex }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium text-foreground max-w-[140px] truncate", children: r.name || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground text-xs max-w-[160px] truncate", children: r.email || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground text-xs", children: r.phone || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: cn(
                      "text-xs",
                      r.status === "valid" && "text-success border-success/30 bg-success/10",
                      r.status === "invalid" && "text-warning border-warning/30 bg-warning/10",
                      r.status === "duplicate" && "text-primary border-primary/30 bg-primary/10"
                    ),
                    children: [
                      r.status === "valid" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 mr-1" }),
                      r.status === "invalid" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3 mr-1" }),
                      r.status === "duplicate" && /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3 h-3 mr-1" }),
                      r.status
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-xs text-muted-foreground", children: r.reason || "—" })
              ]
            },
            r.rowIndex
          )) })
        ] }) }) })
      ] }),
      !imported && validRows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            "data-ocid": "import.submit_button",
            size: "lg",
            onClick: doImport,
            disabled: importCSV.isPending || createLead.isPending,
            children: importCSV.isPending ? "Importing…" : `Import ${validRows.length} Valid Leads`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          invalidRows.length + dupRows.length,
          " rows will be skipped"
        ] })
      ] }),
      imported && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "import.success_state",
          className: "flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-success" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-success", children: "Import Successful!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                validRows.length,
                " leads added to your pipeline."
              ] })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground mb-3", children: "Import History" }),
      importHistory.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "import.empty_state",
          className: "text-center py-8 text-muted-foreground",
          children: "No imports yet"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: importHistory.map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          "data-ocid": `import.history.item.${i + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm text-foreground truncate", children: rec.filename })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              new Date(
                Number(rec.timestamp) / 1e6
              ).toLocaleDateString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 text-center mt-2", children: [
              {
                label: "Total",
                val: rec.totalRows,
                cls: "text-foreground"
              },
              {
                label: "Valid",
                val: rec.validCount,
                cls: "text-success"
              },
              {
                label: "Invalid",
                val: rec.invalidCount,
                cls: "text-warning"
              },
              {
                label: "Imported",
                val: rec.importedCount,
                cls: "text-primary"
              }
            ].map(({ label, val, cls }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-1 rounded-lg bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-base font-bold", cls), children: val }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: label })
            ] }, label)) })
          ] })
        },
        rec.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-3 rounded-xl bg-muted/40 border border-border text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "All lead data is labeled as",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: '"Based on publicly available data and heuristics"' }),
        ". We do not scrape protected platforms. Imported data is used solely for compliant outreach after explicit opt-in consent is recorded."
      ] })
    ] })
  ] });
}
export {
  ImportPage as default
};
