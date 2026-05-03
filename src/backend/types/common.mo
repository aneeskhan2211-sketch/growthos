module {
  public type Timestamp = Int;
  public type LeadId = Nat;
  public type NoteId = Nat;
  public type ProposalId = Nat;
  public type ClientId = Nat;
  public type TemplateId = Nat;
  public type SuggestionId = Nat;

  public type Counters = {
    var nextLeadId : Nat;
    var nextNoteId : Nat;
    var nextProposalId : Nat;
    var nextClientId : Nat;
    var nextTemplateId : Nat;
    var nextSuggestionId : Nat;
    var nextAutoAgencyActionId : Nat;
    var nextPlanId : Nat;
    var nextListingId : Nat;
    var nextReportId : Nat;
  };

  /// Subscription plan tiers — amounts in Indian Rupees (₹)
  public type PlanTier = {
    #Free;
    #Starter;
    #Growth;
    #Pro;
    #Agency;
  };

  /// Returns the monthly subscription amount in ₹ for a given plan tier.
  /// Free = ₹0, Starter = ₹49, Growth = ₹299, Pro = ₹999, Agency = ₹4999
  public func planTierAmount(tier : PlanTier) : Nat {
    switch tier {
      case (#Free) { 0 };
      case (#Starter) { 49 };
      case (#Growth) { 299 };
      case (#Pro) { 999 };
      case (#Agency) { 4999 };
    };
  };

  /// Stable Text key for a plan tier — used in Map lookups within lib modules.
  public func planTierKey(tier : PlanTier) : Text {
    switch tier {
      case (#Free)    "Free";
      case (#Starter) "Starter";
      case (#Growth)  "Growth";
      case (#Pro)     "Pro";
      case (#Agency)  "Agency";
    };
  };
};
