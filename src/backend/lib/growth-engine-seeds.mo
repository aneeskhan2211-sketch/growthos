import List "mo:core/List";
import GE "../types/growth-engine";
import Lib "../lib/growth-engine";

module {
  // Seed timestamp — a fixed past date (Jan 2024) for realistic data
  let seedTime : Int = 1706745600000000000;

  public func seedAll(
    counters : GE.GrowthEngineCounters,
    templates : List.List<GE.WhatsAppTemplate>,
    pages : List.List<GE.LandingPage>,
    scripts : List.List<GE.ConversionScript>,
    audits : List.List<GE.SeoAuditRecord>,
    reports : List.List<GE.GrowthReport>,
  ) {
    seedTemplates(counters, templates);
    seedLandingPages(counters, pages);
    seedScripts(counters, scripts);
    seedAudits(counters, audits);
    seedReports(counters, reports);
  };

  func seedTemplates(counters : GE.GrowthEngineCounters, templates : List.List<GE.WhatsAppTemplate>) {
    // 1. Approved — lead outreach
    let t0 = Lib.createWhatsAppTemplate(
      counters,
      templates,
      "Lead Outreach - Digital Audit Offer",
      #lead_outreach,
      "Hi {{BusinessName}}, we analysed your online presence in {{City}} and found you may be missing potential customers from Google search. Would you like a free growth audit? Takes only 15 minutes.",
      ["BusinessName", "City"],
      seedTime,
    );
    ignore Lib.updateTemplateStatus(templates, t0.id, #approved, null);

    // 2. Approved — follow-up
    let t1 = Lib.createWhatsAppTemplate(
      counters,
      templates,
      "Follow-Up Day 3",
      #follow_up,
      "Hi {{BusinessName}}, just following up on my earlier message. We recently helped a {{Category}} business in {{City}} increase leads by 40% in 60 days. Happy to share how — 15-min call this week?",
      ["BusinessName", "Category", "City"],
      seedTime,
    );
    ignore Lib.updateTemplateStatus(templates, t1.id, #approved, null);

    // 3. Pending — proposal sharing
    let _t2 = Lib.createWhatsAppTemplate(
      counters,
      templates,
      "Proposal Share Link",
      #proposal_sharing,
      "Hi {{BusinessName}}, your personalised growth proposal is ready! It includes a 90-day roadmap to get more customers in {{City}}. View it here: {{ProposalLink}} — let me know if you have questions.",
      ["BusinessName", "City", "ProposalLink"],
      seedTime,
    );
    // status remains #pending — submitted for review, not yet approved

    // 4. Rejected — too generic
    let t3 = Lib.createWhatsAppTemplate(
      counters,
      templates,
      "Generic Hello",
      #lead_outreach,
      "Hello, are you interested in growing your business? Reply YES for more info.",
      [],
      seedTime,
    );
    ignore Lib.updateTemplateStatus(templates, t3.id, #rejected, ?"Template too generic — must include business name and specific value proposition per WhatsApp policy.");

    // 5. Paused — seasonal offer
    let t4 = Lib.createWhatsAppTemplate(
      counters,
      templates,
      "Festival Season Offer",
      #lead_outreach,
      "Hi {{BusinessName}}, this festive season, we're offering a free 30-day trial of our lead generation system for {{Category}} businesses in {{City}}. No contract. Want to try it?",
      ["BusinessName", "Category", "City"],
      seedTime,
    );
    ignore Lib.updateTemplateStatus(templates, t4.id, #paused, null);
  };

  func seedLandingPages(counters : GE.GrowthEngineCounters, pages : List.List<GE.LandingPage>) {
    // 1. Salon in Mumbai — published
    let p0 = Lib.createLandingPage(
      counters,
      pages,
      #salon,
      "Mumbai",
      "Digital Marketing for Salons",
      "₹10,000–₹25,000/month",
      seedTime,
    );
    ignore Lib.updateLandingPageStatus(pages, p0.id, #published, seedTime + 86400000000000);
    ignore Lib.incrementLandingPageLeads(pages, p0.id);
    ignore Lib.incrementLandingPageLeads(pages, p0.id);
    ignore Lib.incrementLandingPageLeads(pages, p0.id);

    // 2. Gym in Delhi — published
    let p1 = Lib.createLandingPage(
      counters,
      pages,
      #gym,
      "Delhi",
      "Member Acquisition & Retention for Gyms",
      "₹10,000–₹25,000/month",
      seedTime,
    );
    ignore Lib.updateLandingPageStatus(pages, p1.id, #published, seedTime + 86400000000000);
    ignore Lib.incrementLandingPageLeads(pages, p1.id);
    ignore Lib.incrementLandingPageLeads(pages, p1.id);

    // 3. Medical in Chennai — draft
    ignore Lib.createLandingPage(
      counters,
      pages,
      #medical,
      "Chennai",
      "Patient Acquisition for Clinics & Hospitals",
      "₹25,000–₹50,000/month",
      seedTime,
    );
    // stays as #draft
  };

  func seedScripts(counters : GE.GrowthEngineCounters, scripts : List.List<GE.ConversionScript>) {
    // 1. Digital marketing services — mid tier
    ignore Lib.createConversionScript(
      counters,
      scripts,
      "Digital Marketing Services",
      "Not getting enough leads from online channels",
      "mid",
      seedTime,
    );

    // 2. SEO / website services — budget tier
    ignore Lib.createConversionScript(
      counters,
      scripts,
      "SEO & Website Optimisation",
      "Not ranking on Google, losing customers to competitors",
      "budget",
      seedTime,
    );
  };

  func seedAudits(counters : GE.GrowthEngineCounters, audits : List.List<GE.SeoAuditRecord>) {
    ignore Lib.createSeoAudit(counters, audits, "https://sunrisedental.com", seedTime);
    ignore Lib.createSeoAudit(counters, audits, "http://peakperformancegym.io", seedTime);
  };

  func seedReports(counters : GE.GrowthEngineCounters, reports : List.List<GE.GrowthReport>) {
    // Client 0 (TechSpark IT Solutions) — March report
    ignore Lib.generateGrowthReport(
      counters,
      reports,
      0,
      "2024-13",
      "2024-03",
      47,
      38,
      185000,
      seedTime,
    );

    // Client 0 — April report (better month)
    ignore Lib.generateGrowthReport(
      counters,
      reports,
      0,
      "2024-17",
      "2024-04",
      61,
      45,
      248000,
      seedTime + 2592000000000000,
    );
  };
};
