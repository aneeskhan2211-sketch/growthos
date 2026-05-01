import List "mo:core/List";
import Time "mo:core/Time";
import GE "../types/growth-engine";
import Lib "../lib/growth-engine";
import Seeds "../lib/growth-engine-seeds";

mixin () {
  // ── Growth engine state ───────────────────────────────────────────────────

  let growthTemplates = List.empty<GE.WhatsAppTemplate>();
  let growthLandingPages = List.empty<GE.LandingPage>();
  let growthScripts = List.empty<GE.ConversionScript>();
  let growthAudits = List.empty<GE.SeoAuditRecord>();
  let growthReports = List.empty<GE.GrowthReport>();

  let growthEngineCounters : GE.GrowthEngineCounters = {
    var nextTemplateId = 0;
    var nextLandingPageId = 0;
    var nextScriptId = 0;
    var nextAuditId = 0;
    var nextReportId = 0;
  };

  // ── Seed guard ────────────────────────────────────────────────────────────

  var growthEngineSeedInitialized : Bool = false;

  func ensureGrowthEngineSeeded() {
    if (growthEngineSeedInitialized) return;
    growthEngineSeedInitialized := true;
    Seeds.seedAll(
      growthEngineCounters,
      growthTemplates,
      growthLandingPages,
      growthScripts,
      growthAudits,
      growthReports,
    );
  };

  // ── WhatsApp Templates ────────────────────────────────────────────────────

  public query func listWhatsAppTemplates() : async [GE.WhatsAppTemplate] {
    ensureGrowthEngineSeeded();
    Lib.listTemplates(growthTemplates);
  };

  public shared ({ caller }) func createWhatsAppTemplate(
    name : Text,
    category : GE.WhatsAppTemplateCategory,
    body : Text,
    variables : [Text],
  ) : async GE.WhatsAppTemplate {
    ensureGrowthEngineSeeded();
    Lib.createWhatsAppTemplate(growthEngineCounters, growthTemplates, name, category, body, variables, Time.now());
  };

  public shared ({ caller }) func submitTemplateForApproval(id : GE.WhatsAppTemplateId) : async Bool {
    ensureGrowthEngineSeeded();
    // Simulate submission: sets status to #pending and records submittedAt
    let idx = growthTemplates.findIndex(func(t) { t.id == id });
    switch (idx) {
      case (?i) {
        let existing = growthTemplates.at(i);
        growthTemplates.put(i, { existing with status = #pending; submittedAt = ?Time.now() });
        true;
      };
      case null { false };
    };
  };

  public shared ({ caller }) func updateTemplateApprovalStatus(
    id : GE.WhatsAppTemplateId,
    status : GE.WhatsAppTemplateStatus,
    rejectionReason : ?Text,
  ) : async Bool {
    ensureGrowthEngineSeeded();
    Lib.updateTemplateStatus(growthTemplates, id, status, rejectionReason);
  };

  // ── Landing Pages ─────────────────────────────────────────────────────────

  public shared ({ caller }) func createLandingPage(
    niche : GE.LandingPageNiche,
    city : Text,
    serviceDesc : Text,
    targetBudget : Text,
  ) : async GE.LandingPage {
    ensureGrowthEngineSeeded();
    Lib.createLandingPage(growthEngineCounters, growthLandingPages, niche, city, serviceDesc, targetBudget, Time.now());
  };

  public shared ({ caller }) func publishLandingPage(id : GE.LandingPageId) : async Bool {
    ensureGrowthEngineSeeded();
    Lib.updateLandingPageStatus(growthLandingPages, id, #published, Time.now());
  };

  public query func listLandingPages() : async [GE.LandingPage] {
    ensureGrowthEngineSeeded();
    Lib.listLandingPages(growthLandingPages);
  };

  public query func getLandingPage(id : GE.LandingPageId) : async ?GE.LandingPage {
    ensureGrowthEngineSeeded();
    Lib.getLandingPage(growthLandingPages, id);
  };

  // ── Conversion Scripts ────────────────────────────────────────────────────

  public shared ({ caller }) func createConversionScript(
    serviceType : Text,
    painPoint : Text,
    budgetTier : Text,
  ) : async GE.ConversionScript {
    ensureGrowthEngineSeeded();
    Lib.createConversionScript(growthEngineCounters, growthScripts, serviceType, painPoint, budgetTier, Time.now());
  };

  public query func listConversionScripts() : async [GE.ConversionScript] {
    ensureGrowthEngineSeeded();
    Lib.listScripts(growthScripts);
  };

  // ── SEO Audits ────────────────────────────────────────────────────────────

  public shared ({ caller }) func runSeoAudit(url : Text) : async GE.SeoAuditRecord {
    ensureGrowthEngineSeeded();
    Lib.createSeoAudit(growthEngineCounters, growthAudits, url, Time.now());
  };

  public query func listSeoAudits() : async [GE.SeoAuditRecord] {
    ensureGrowthEngineSeeded();
    Lib.listAudits(growthAudits);
  };

  // ── Growth Reports ────────────────────────────────────────────────────────

  public shared ({ caller }) func generateGrowthReport(
    clientId : Nat,
    weekOf : Text,
    monthOf : Text,
    leadsGenerated : Nat,
    conversionRate : Nat,
    revenueImpact : Nat,
  ) : async GE.GrowthReport {
    ensureGrowthEngineSeeded();
    Lib.generateGrowthReport(
      growthEngineCounters,
      growthReports,
      clientId,
      weekOf,
      monthOf,
      leadsGenerated,
      conversionRate,
      revenueImpact,
      Time.now(),
    );
  };

  public query func listGrowthReports(clientId : Nat) : async [GE.GrowthReport] {
    ensureGrowthEngineSeeded();
    Lib.listReportsByClient(growthReports, clientId);
  };
};
