import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Time "mo:core/Time";
import T "../types/content-seo-onboarding-pdf-pagespeed";

module {

  // ─────────────────────────────────────────────────────────────────────────
  // Niche template data
  // ─────────────────────────────────────────────────────────────────────────

  func nicheLabel(niche : Text) : Text {
    let n = niche.toLower();
    if (n == "salon") "Salon"
    else if (n == "gym") "Gym"
    else if (n == "clinic") "Clinic"
    else if (n == "restaurant") "Restaurant"
    else if (n == "real_estate" or n == "real estate") "Real Estate"
    else if (n == "coaching") "Coaching"
    else niche
  };

  func nicheAction(niche : Text) : Text {
    let n = niche.toLower();
    if (n == "salon") "book a styling session"
    else if (n == "gym") "start a free trial"
    else if (n == "clinic") "book a consultation"
    else if (n == "restaurant") "reserve a table"
    else if (n == "real_estate" or n == "real estate") "schedule a site visit"
    else if (n == "coaching") "enroll today"
    else "get in touch"
  };

  func nicheService(niche : Text) : Text {
    let n = niche.toLower();
    if (n == "salon") "hair & beauty service"
    else if (n == "gym") "fitness membership"
    else if (n == "clinic") "health consultation"
    else if (n == "restaurant") "dining experience"
    else if (n == "real_estate" or n == "real estate") "property listing"
    else if (n == "coaching") "coaching program"
    else "service"
  };

  // 5 hook variants per niche, indexed by day mod 5
  func hookVariants(niche : Text, city : Text, idx : Nat) : Text {
    let n = niche.toLower();
    let nicheTag = nicheLabel(niche);
    let variants : [Text] = if (n == "salon") [
      "Transform your look at " # city # "'s top salon this week 💇‍♀️",
      "Before & after: see real results from our " # city # " clients ✨",
      "Weekend special: look stunning without spending a fortune 💅",
      "Why " # city # " clients keep coming back to us — watch this 🎬",
      "Your hair deserves the best. See what's possible 🌟",
    ] else if (n == "gym") [
      "Real transformations happening in " # city # " right now 💪",
      "From zero to fit — watch this " # city # " member's journey 🏋️",
      "Your first week is FREE. Here's what you'll get 🎯",
      "Why " # city # "'s busiest professionals train with us ⚡",
      "No gym intimidation. Just real results. Here's proof 🔥",
    ] else if (n == "clinic") [
      "Patient results speak louder than ads — see for yourself 🏥",
      "Common symptoms " # city # " residents ignore (don't make this mistake) ⚕️",
      "Book a consultation before the week fills up 📋",
      "Trusted by families across " # city # " for 5+ years 🩺",
      "Your health is the best investment. Start today 💊",
    ] else if (n == "restaurant") [
      "The dish everyone in " # city # " is talking about 🍽️",
      "Fresh ingredients. Real flavour. See how we cook 👨‍🍳",
      "Weekend table is filling fast — reserve yours now 🍷",
      "Taste " # city # "'s favourite " # nicheService(niche) # " 🌶️",
      "Behind the kitchen: a look at how we prepare every dish 🎬",
    ] else if (n == "real_estate" or n == "real estate") [
      "This property in " # city # " won't last long — take a look 🏡",
      "₹ smart buying guide for " # city # " in 2026 🔑",
      "Virtual tour: your future home in " # city # " 📱",
      "Sold in 7 days — how we helped this " # city # " family 🏠",
      "Don't buy a property without watching this first 📝",
    ] else if (n == "coaching") [
      "From confused to confident — a " # city # " student's story 🎓",
      "Why students in " # city # " choose our coaching 📚",
      "Free demo class this week — limited seats available 🪑",
      "Crack the exam with the right strategy — see how 💡",
      "Results don't lie. Meet our top performers 🏆",
    ] else [
      "Growing your " # nicheTag # " business in " # city # " 🚀",
      "See how local " # nicheTag # " businesses get more enquiries 📈",
      "Simple steps to more customers this month 💼",
      "What's working for " # city # " businesses right now 🎯",
      "Your next client is already searching for you online 🔍",
    ];
    variants[idx % 5]
  };

  func captionVariants(niche : Text, city : Text, day : Nat) : Text {
    let action = nicheAction(niche);
    let service = nicheService(niche);
    let nicheTag = nicheLabel(niche);
    let idx = day % 4;
    let variants : [Text] = [
      "Every great result starts with one step. Ready to " # action # "? Comment 'YES' and we'll share details. 📍 " # city,
      "We don't promise overnight results — we promise consistent, real progress for your " # service # ". DM us to learn more. 📍 " # city,
      "Limited slots this week for our " # city # " clients. Book before it fills up — tap the link in bio. 📍 " # nicheTag # " " # city,
      "Questions? We answer every DM within 2 hours. Reach out now and let's talk about your goals. 📍 " # city,
    ];
    variants[idx]
  };

  func hashtagSets(niche : Text, city : Text) : [[Text]] {
    let cityTag = "#" # city.toLower().replace(#char ' ', "");
    let n = niche.toLower();
    if (n == "salon") [
      [cityTag, "#salon", "#hairstyle", "#beauty", "#haircare", "#mumbaisalon", "#hairtransformation"],
      [cityTag, "#makeupstudio", "#skincare", "#bridalmakeup", "#nailart", "#salonlife"],
      [cityTag, "#haircolor", "#balayage", "#keratintreatment", "#extensions", "#blowdry"],
    ] else if (n == "gym") [
      [cityTag, "#gym", "#fitness", "#workout", "#fitnessmotivation", "#bodybuilding"],
      [cityTag, "#personaltrainer", "#weightloss", "#musclegain", "#crossfit", "#gymlife"],
      [cityTag, "#fatloss", "#strengthtraining", "#yogalife", "#zumba", "#healthylifestyle"],
    ] else if (n == "clinic") [
      [cityTag, "#clinic", "#healthcare", "#doctor", "#health", "#wellness", "#medicaladvice"],
      [cityTag, "#ayurveda", "#homeopathy", "#physiotherapy", "#dentist", "#skinspecialist"],
      [cityTag, "#familydoctor", "#preventivecare", "#healthtips", "#medicalclinic"],
    ] else if (n == "restaurant") [
      [cityTag, "#restaurant", "#foodie", "#yummyfood", "#indianfood", "#foodlover"],
      [cityTag, "#biryani", "#streetfood", "#lunch", "#dinner", "#homestyle", "#cheflife"],
      [cityTag, "#foodphotography", "#instafood", "#dineout", "#cafegram", "#foodiediaries"],
    ] else if (n == "real_estate" or n == "real estate") [
      [cityTag, "#realestate", "#property", "#homesale", "#flats", "#investment"],
      [cityTag, "#luxuryhomes", "#villa", "#plotforsale", "#commercialproperty"],
      [cityTag, "#newlaunch", "#readytomove", "#propertyinvestment", "#rera"],
    ] else if (n == "coaching") [
      [cityTag, "#coaching", "#education", "#students", "#resultsoriented", "#upsc"],
      [cityTag, "#ssc", "#jee", "#neet", "#bankingjobs", "#studymotivation"],
      [cityTag, "#careergoals", "#competitiveexam", "#elearning", "#tutoringlife"],
    ] else [
      [cityTag, "#localbusiness", "#smallbusiness", "#digitalmarketing", "#growthhacking"],
      [cityTag, "#entrepreneur", "#businessgrowth", "#marketing", "#startup"],
      [cityTag, "#leadgeneration", "#socialmedia", "#contentmarketing", "#growthos"],
    ]
  };

  func bodyText(niche : Text, city : Text, postType : Text, day : Nat) : Text {
    let nicheTag = nicheLabel(niche);
    let action = nicheAction(niche);
    let idx = day % 3;
    let bodies : [Text] = [
      "Our " # city # " clients choose us because we focus on results, not promises. Whether it's your first visit or you've been coming for years, you'll leave with exactly what you came for. Tap the link in bio to " # action # ".",
      "Running a " # nicheTag # " business in " # city # " is competitive — but it doesn't have to be overwhelming. Consistent content, clear offers, and fast replies are the three things that separate growing businesses from stuck ones.",
      "We believe in showing our work. Every post, every result, every transformation — this is what happens when the right approach meets the right team. Serving " # city # " with pride.",
    ];
    bodies[idx]
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Content Calendar
  // ─────────────────────────────────────────────────────────────────────────

  public func toPublicPost(p : T.ContentPost) : T.ContentPostPublic {
    {
      id           = p.id;
      niche        = p.niche;
      city         = p.city;
      postType     = p.postType;
      hook         = p.hook;
      body         = p.body;
      caption      = p.caption;
      hashtags     = p.hashtags;
      callToAction = p.callToAction;
      scheduledDay = p.scheduledDay;
      isPosted     = p.isPosted;
    }
  };

  public func toPublicCalendar(c : T.ContentCalendar) : T.ContentCalendarPublic {
    {
      id        = c.id;
      userId    = c.userId;
      niche     = c.niche;
      city      = c.city;
      goal      = c.goal;
      monthYear = c.monthYear;
      posts     = c.posts.map<T.ContentPost, T.ContentPostPublic>(toPublicPost);
      createdAt = c.createdAt;
    }
  };

  /// 10 reels (days 1-10), 8 carousels (days 11-18), 7 stories (days 19-25), 5 ads (days 26-30)
  public func buildCalendar(
    calendarId : Text,
    userId     : Text,
    niche      : Text,
    city       : Text,
    goal       : Text,
    monthYear  : Text,
  ) : T.ContentCalendar {
    let hashSets = hashtagSets(niche, city);
    let action   = nicheAction(niche);

    // Build 30 posts
    let postList = List.empty<T.ContentPost>();

    // 10 reels — days 1..10
    var d = 1;
    while (d <= 10) {
      postList.add({
        id           = calendarId # "-" # d.toText();
        niche;
        city;
        postType     = "reel";
        hook         = hookVariants(niche, city, d - 1);
        body         = bodyText(niche, city, "reel", d);
        caption      = captionVariants(niche, city, d);
        hashtags     = hashSets[(d - 1) % hashSets.size()];
        callToAction = action;
        scheduledDay = d;
        var isPosted = false;
      });
      d += 1;
    };

    // 8 carousels — days 11..18
    while (d <= 18) {
      postList.add({
        id           = calendarId # "-" # d.toText();
        niche;
        city;
        postType     = "carousel";
        hook         = hookVariants(niche, city, d % 5);
        body         = bodyText(niche, city, "carousel", d);
        caption      = captionVariants(niche, city, d);
        hashtags     = hashSets[d % hashSets.size()];
        callToAction = action;
        scheduledDay = d;
        var isPosted = false;
      });
      d += 1;
    };

    // 7 stories — days 19..25
    while (d <= 25) {
      postList.add({
        id           = calendarId # "-" # d.toText();
        niche;
        city;
        postType     = "story";
        hook         = hookVariants(niche, city, d % 5);
        body         = bodyText(niche, city, "story", d);
        caption      = captionVariants(niche, city, d);
        hashtags     = hashSets[d % hashSets.size()];
        callToAction = action;
        scheduledDay = d;
        var isPosted = false;
      });
      d += 1;
    };

    // 5 ads — days 26..30
    while (d <= 30) {
      postList.add({
        id           = calendarId # "-" # d.toText();
        niche;
        city;
        postType     = "ad";
        hook         = hookVariants(niche, city, d % 5);
        body         = bodyText(niche, city, "ad", d);
        caption      = captionVariants(niche, city, d);
        hashtags     = hashSets[d % hashSets.size()];
        callToAction = action;
        scheduledDay = d;
        var isPosted = false;
      });
      d += 1;
    };

    {
      id        = calendarId;
      userId;
      niche;
      city;
      goal;
      monthYear;
      posts     = postList.toArray();
      createdAt = Time.now();
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // SEO Page helpers
  // ─────────────────────────────────────────────────────────────────────────

  /// Build slug: lowercase, replace spaces with hyphens
  func makeSlug(niche : Text, city : Text) : Text {
    niche.toLower().replace(#char ' ', "-") # "-" # city.toLower().replace(#char ' ', "-")
  };

  func nichePainPoints(niche : Text, city : Text) : [Text] {
    let n = niche.toLower();
    if (n == "salon") [
      "Walk-ins are unpredictable and revenue is inconsistent in " # city,
      "Customers don't know you exist unless they pass your door",
      "Competitors are getting online enquiries and you're missing out",
      "No system to follow up with past clients and bring them back",
    ] else if (n == "gym") [
      "New members sign up but drop off within 2-3 months in " # city,
      "Footfall is seasonal — you struggle in off-peak months",
      "Hard to compete with large gym chains without big ad budgets",
      "No clear way to track referrals and reward loyal members",
    ] else if (n == "clinic") [
      "Patients don't find you on Google when searching nearby in " # city,
      "Appointment no-shows waste your time and revenue",
      "Referral network isn't growing as fast as it should be",
      "Patients forget to come back for follow-ups without reminders",
    ] else if (n == "restaurant") [
      "Tables are empty on weekdays even though weekends are packed in " # city,
      "No system to build a loyal repeat customer base",
      "Food delivery apps take 25-30% commission on every order",
      "Social media posts get low reach without a consistent strategy",
    ] else if (n == "real_estate" or n == "real estate") [
      "Serious buyers in " # city # " are hard to find without a digital presence",
      "Property listings expire before the right buyer sees them",
      "Competitors with better online visibility get the enquiries first",
      "Follow-up with cold leads is manual and time-consuming",
    ] else if (n == "coaching") [
      "Students in " # city # " can't find your institute in online searches",
      "Demo class attendance is low because enquiries dry up mid-semester",
      "Larger coaching chains outrank you even with lower quality results",
      "No structured way to collect student reviews and build credibility",
    ] else [
      "New customers in " # city # " can't find your business online",
      "Existing customers aren't being engaged and come back less often",
      "Marketing spend has no clear return on investment",
      "Manual follow-up process loses warm leads over time",
    ]
  };

  func nicheBenefits(niche : Text, city : Text) : [Text] {
    let n = niche.toLower();
    let nicheTag = nicheLabel(niche);
    if (n == "salon") [
      "Attract steady walk-ins and pre-bookings from " # city # " search results",
      "Structured follow-up brings past clients back 2-3x more often",
      "Instagram and Google presence that converts viewers into customers",
      "Track enquiries, bookings, and revenue in one simple dashboard",
    ] else if (n == "gym") [
      "Keep members engaged with automated check-ins and offers in " # city,
      "Convert free trials to paying members with structured follow-up",
      "Local ads that target people searching for gyms near them right now",
      "Referral system that rewards loyal members and grows your base",
    ] else if (n == "clinic") [
      "Rank on Google for '" # n # " near me' searches in " # city,
      "Automated appointment reminders reduce no-shows by up to 40%*",
      "Build patient trust through visible reviews and testimonials",
      "Structured follow-up brings patients back for check-ups on time",
    ] else if (n == "restaurant") [
      "Drive midweek covers with targeted local offers in " # city,
      "Build a repeat customer list that you own — not dependent on apps",
      "Social media content that drives footfall with offers and reels",
      "Track which campaigns bring real diners to your tables",
    ] else if (n == "real_estate" or n == "real estate") [
      "Get serious property enquiries from " # city # " buyers and investors",
      "Virtual tour links and property reels that work while you sleep",
      "Structured follow-up turns cold leads into site visits",
      "Build a reputation that gets you referrals from every closed deal",
    ] else if (n == "coaching") [
      "Fill batch seats faster with targeted digital campaigns in " # city,
      "Demo class conversions improve with structured follow-up messaging",
      "Student results and testimonials shared as social proof posts",
      "Track which marketing channel brings the most enrollments",
    ] else [
      "Get consistent digital enquiries from " # city # " customers",
      "Automated follow-up converts warm leads into paying clients",
      "Clear ROI tracking from first touch to closed deal",
      "Save 2-3 hours per day with automated outreach and reporting",
    ]
  };

  func nicheCaseExample(niche : Text, city : Text) : { before : Text; after : Text } {
    let n = niche.toLower();
    if (n == "salon") {
      { before = "Salon in " # city # " relied on walk-ins only. Revenue was unpredictable, weeks were inconsistent, and there was no way to re-engage past clients.";
        after  = "After setting up Google presence, Instagram reels, and a WhatsApp follow-up sequence: steady weekly enquiries, predictable bookings, and returning clients." }
    } else if (n == "gym") {
      { before = "Gym in " # city # " saw member drop-off every quarter. No system to track leads or convert free trials into paid memberships.";
        after  = "With local ads, structured follow-up, and a referral program: trial-to-member conversion improved, and monthly churn decreased noticeably." }
    } else if (n == "clinic") {
      { before = "Clinic in " # city # " had low online visibility. Most patients came via word-of-mouth only, making growth slow and unpredictable.";
        after  = "After Google profile optimisation, review collection, and appointment reminders: more patients found the clinic online, and no-shows reduced." }
    } else if (n == "restaurant") {
      { before = "Restaurant in " # city # " was fully packed on weekends but nearly empty on weekdays. No digital customer base to activate.";
        after  = "Using Instagram content, local offers, and a customer follow-up list: midweek footfall increased and the restaurant reduced dependence on delivery apps." }
    } else if (n == "real_estate" or n == "real estate") {
      { before = "Real estate agency in " # city # " struggled to generate serious buyer enquiries digitally. Most leads came from expensive print ads.";
        after  = "With targeted digital campaigns, property reels, and structured follow-up: quality enquiry volume increased and time-to-first-contact dropped." }
    } else if (n == "coaching") {
      { before = "Coaching institute in " # city # " filled batches slowly. Students discovered them mainly through offline word of mouth.";
        after  = "After running demo class campaigns and follow-up sequences: batch filling became faster and student enquiry-to-enrollment conversion improved." }
    } else {
      { before = "Business in " # city # " generated most clients through referrals alone. No reliable digital lead source existed.";
        after  = "With a structured digital outreach system and follow-up process: consistent weekly enquiries became the norm instead of the exception." }
    }
  };

  func nichePricingHint(niche : Text) : Text {
    let n = niche.toLower();
    if (n == "salon")           "₹15,000 / ₹25,000 / ₹50,000 — based on services and monthly volume"
    else if (n == "gym")        "₹12,000 / ₹20,000 / ₹40,000 — based on member count and automation"
    else if (n == "clinic")     "₹10,000 / ₹18,000 / ₹35,000 — based on patient volume and services"
    else if (n == "restaurant") "₹8,000 / ₹15,000 / ₹30,000 — based on footfall targets"
    else if (n == "real_estate" or n == "real estate") "₹20,000 / ₹35,000 / ₹70,000 — based on listings and lead targets"
    else if (n == "coaching")   "₹10,000 / ₹18,000 / ₹40,000 — based on batch size and exam category"
    else                         "₹15,000 / ₹29,900 / ₹99,900 — based on usage and features"
  };

  public func toPublicSeoPage(p : T.SeoPage) : T.SeoPagePublic {
    {
      id          = p.id;
      niche       = p.niche;
      city        = p.city;
      slug        = p.slug;
      headline    = p.headline;
      subheadline = p.subheadline;
      painPoints  = p.painPoints;
      benefits    = p.benefits;
      caseExample = p.caseExample;
      pricingHint = p.pricingHint;
      createdAt   = p.createdAt;
      isPublished = p.isPublished;
    }
  };

  public func buildSeoPage(pageId : Text, niche : Text, city : Text) : T.SeoPage {
    let nicheTag = nicheLabel(niche);
    {
      id          = pageId;
      niche;
      city;
      slug        = makeSlug(niche, city);
      headline    = "Get More " # nicheTag # " Customers in " # city;
      subheadline = "Simple, proven system to generate daily enquiries, convert them into bookings, and grow your " # nicheTag.toLower() # " business in " # city # " — without guesswork.";
      painPoints  = nichePainPoints(niche, city);
      benefits    = nicheBenefits(niche, city);
      caseExample = nicheCaseExample(niche, city);
      pricingHint = nichePricingHint(niche);
      createdAt   = Time.now();
      var isPublished = false;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Onboarding Tour helpers
  // ─────────────────────────────────────────────────────────────────────────

  public func defaultTourState(userId : Text) : T.OnboardingTourStateInternal {
    {
      userId;
      var completed      = false;
      var currentStep    = 0;
      var completedSteps = [];
      startedAt          = Time.now();
      var completedAt    = null;
      var skipped        = false;
    }
  };

  public func toPublicTourState(s : T.OnboardingTourStateInternal) : T.OnboardingTourState {
    {
      userId         = s.userId;
      completed      = s.completed;
      currentStep    = s.currentStep;
      completedSteps = s.completedSteps;
      startedAt      = s.startedAt;
      completedAt    = s.completedAt;
      skipped        = s.skipped;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Investor Report disclaimers
  // ─────────────────────────────────────────────────────────────────────────

  public func standardDisclaimers() : [Text] {
    [
      "All monetary values are in Indian Rupees (₹).",
      "MRR = sum of active paid subscription amounts. ARR = MRR × 12.",
      "LTV is estimated using ARPU ÷ monthly churn rate (tier-weighted). Actual LTV depends on individual customer behaviour.",
      "CAC = total recorded marketing spend ÷ new paid customers in the period. Accuracy depends on completeness of spend records entered.",
      "Cohort data and retention rates are estimates based on recorded analytics events and may not reflect all user activity.",
      "Health alerts are informational only. Thresholds: churn > 5% (critical), conversion < 10% (warning), CAC rise > 15% (warning), LTV:CAC < 2× (warning).",
      "This report is generated from platform data and is intended as an internal management tool. It is not a certified financial statement.",
      "Results depend on execution, market conditions, and external factors beyond the platform's control.",
    ]
  };

  // ─────────────────────────────────────────────────────────────────────────
  // PageSpeed JSON parsing
  // ─────────────────────────────────────────────────────────────────────────

  /// Extract a float value associated with "numericValue" following a key search
  func extractNumericValue(json : Text, key : Text) : Float {
    // Look for the key, then find "numericValue" within 300 chars
    let lower = json;
    if (not lower.contains(#text key)) return 0.0;
    // Split on the key and grab the first occurrence
    var parts = lower.split(#text key);
    switch (parts.next()) {
      case null return 0.0;
      case _ {};
    };
    let after = switch (parts.next()) {
      case null return 0.0;
      case (?s) s;
    };
    // Find "numericValue" in the next 500 chars
    let snippet = if (after.size() > 500) {
      let arr = after.toArray();
      Text.fromArray(Array.tabulate<Char>(500, func(i) { arr[i] }))
    } else after;
    if (not snippet.contains(#text "numericValue")) return 0.0;
    var parts2 = snippet.split(#text "numericValue");
    switch (parts2.next()) { case null return 0.0; case _ {} };
    let afterKey = switch (parts2.next()) {
      case null return 0.0;
      case (?s) s;
    };
    // Skip past ':' and optional whitespace, then read digits
    var idx = 0;
    var foundColon = false;
    let chars = afterKey.toArray();
    let numStr = List.empty<Char>();
    for (c in chars.values()) {
      if (not foundColon) {
        if (c == ':') { foundColon := true };
      } else {
        if (c == ' ' or c == '\t' or c == '\n') {}  // skip whitespace after colon
        else if ((c >= '0' and c <= '9') or c == '.' or c == '-') { numStr.add(c) }
        else if (numStr.size() > 0) { /* stop */ idx := chars.size() } // break
      };
      idx += 1;
    };
    let s = Text.fromArray(numStr.toArray());
    if (s == "") 0.0
    else {
      // Parse integer part only (no Float.fromText in mo:core)
      // Extract integer digits before decimal point
      var intPart : Int = 0;
      var sign : Int = 1;
      var fracPart : Float = 0.0;
      var fracDiv : Float = 10.0;
      var inFrac = false;
      for (c in s.toIter()) {
        if (c == '-') { sign := -1 }
        else if (c == '.') { inFrac := true }
        else if (c >= '0' and c <= '9') {
          let digit = c.toNat32().toNat() - 48;
          if (inFrac) {
            fracPart := fracPart + digit.toFloat() / fracDiv;
            fracDiv := fracDiv * 10.0;
          } else {
            intPart := intPart * 10 + digit.toInt();
          }
        }
      };
      (intPart.toFloat() + fracPart) * sign.toFloat()
    }
  };

  /// Extract the performance score (0.0–1.0) and multiply by 100
  func extractScore(json : Text) : Nat {
    // Look for categories.performance.score
    if (not json.contains(#text "\"score\"")) return 0;
    var parts = json.split(#text "\"score\"");
    switch (parts.next()) { case null return 0; case _ {} };
    let after = switch (parts.next()) {
      case null return 0;
      case (?s) s;
    };
    var parts2 = after.split(#text ":");
    switch (parts2.next()) { case null return 0; case _ {} };
    let numPart = switch (parts2.next()) {
      case null return 0;
      case (?s) s;
    };
    // Take first number token
    let numStr = List.empty<Char>();
    var started = false;
    for (c in numPart.toArray().values()) {
      if ((c >= '0' and c <= '9') or c == '.') {
        numStr.add(c);
        started := true;
      } else if (started) {
        // stop at first non-digit
      }
    };
    let s = Text.fromArray(numStr.toArray());
    if (s == "") 0
    else {
      // Parse the number: if <= 1.0 scale to 0-100, else use as-is
      var intPart : Int = 0;
      var fracPart : Float = 0.0;
      var fracDiv : Float = 10.0;
      var inFrac = false;
      for (c in s.toIter()) {
        if (c == '.') { inFrac := true }
        else if (c >= '0' and c <= '9') {
          let digit = c.toNat32().toNat() - 48;
          if (inFrac) {
            fracPart := fracPart + digit.toFloat() / fracDiv;
            fracDiv := fracDiv * 10.0;
          } else {
            intPart := intPart * 10 + digit.toInt();
          }
        }
      };
      let v : Float = intPart.toFloat() + fracPart;
      let scaled = if (v <= 1.0) v * 100.0 else v;
      let n : Int = scaled.toInt();
      if (n < 0) 0 else n.toNat()
    }
  };

  /// Extract text items from a JSON array of audit refs (opportunities/diagnostics)
  func extractAuditItems(json : Text, sectionKey : Text) : [Text] {
    let result = List.empty<Text>();
    if (not json.contains(#text sectionKey)) return [];
    // Look for the section
    var parts = json.split(#text sectionKey);
    switch (parts.next()) { case null return []; case _ {} };
    let section = switch (parts.next()) {
      case null return [];
      case (?s) s;
    };
    // Limit snippet length
    let snippet = if (section.size() > 2000) {
      let arr = section.toArray();
      Text.fromArray(Array.tabulate<Char>(2000, func(i) { arr[i] }))
    } else section;
    // Extract title values: split on "title" then find content between colons and commas
    var titleParts = snippet.split(#text "\"title\"");
    switch (titleParts.next()) { case null {}; case _ {} }; // skip before first title
    for (titlePart in titleParts) {
      // Find value after colon
      var colonParts = titlePart.split(#text ":");
      switch (colonParts.next()) { case null {}; case _ {
        let valuePart = switch (colonParts.next()) {
          case null "";
          case (?v) v;
        };
        // Trim whitespace and extract the quoted string (between first and second quote)
        let trimmed = valuePart.trim(#text " ");
        // Find text between double-quote markers by splitting on the quote char text
        var qParts = trimmed.split(#text "\"");
        switch (qParts.next()) { case null {}; case _ {
          let inner = switch (qParts.next()) {
            case null "";
            case (?s) s;
          };
          if (inner.size() > 3 and inner.size() < 200) {
            result.add(inner);
          };
        } };
      } };
    };
    result.toArray()
  };

  public func parsePageSpeedResponse(
    url     : Text,
    mobile  : Text,
    desktop : Text,
  ) : { #ok : T.PageSpeedResult; #err : Text } {
    if (mobile == "" and desktop == "") {
      return #err "PageSpeed API returned empty responses. The URL may be unreachable or the API quota may be exceeded.";
    };

    let mobileScore  = extractScore(mobile);
    let desktopScore = extractScore(desktop);

    // Core Web Vitals from mobile response (Google reports these)
    let fcp = extractNumericValue(mobile, "first-contentful-paint") / 1000.0; // ms → s
    let lcp = extractNumericValue(mobile, "largest-contentful-paint") / 1000.0;
    let cls = extractNumericValue(mobile, "cumulative-layout-shift");
    let tbt = extractNumericValue(mobile, "total-blocking-time");  // stays in ms
    let tti = extractNumericValue(mobile, "interactive") / 1000.0;
    let fid = tbt; // FID not directly in PSI v5; approximate with TBT

    let opportunities = extractAuditItems(mobile, "opportunities");
    let diagnostics   = extractAuditItems(mobile, "diagnostics");

    #ok {
      url;
      mobileScore;
      desktopScore;
      fcp;
      lcp;
      cls;
      fid;
      tbt;
      tti;
      opportunities;
      diagnostics;
      fetchedAt = Time.now();
    }
  };

  public func validateUrl(url : Text) : Bool {
    let lower = url.toLower();
    if (not lower.startsWith(#text "http://") and not lower.startsWith(#text "https://"))
      return false;
    if (lower.contains(#text "localhost") or lower.contains(#text "127.0.0.1"))
      return false;
    let after = if (lower.startsWith(#text "https://"))
        switch (lower.stripStart(#text "https://")) { case (?t) t; case null lower }
      else
        switch (lower.stripStart(#text "http://")) { case (?t) t; case null lower };
    if (after.startsWith(#text "10.")) return false;
    if (after.startsWith(#text "192.168.")) return false;
    if (after.startsWith(#text "172.")) return false;
    true
  };

};
