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
  };
};
