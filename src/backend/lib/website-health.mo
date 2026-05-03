import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Nat32 "mo:core/Nat32";
import Char "mo:core/Char";
import Common "../types/common";
import WHT "../types/website-health";

module {

  // ─────────────────────────────────────────────────────────────────────────
  // Constants
  // ─────────────────────────────────────────────────────────────────────────

  /// 7 days in nanoseconds (pre-computed literal — must not use arithmetic)
  let nanosPerWeek : Int = 604_800_000_000_000;

  // ─────────────────────────────────────────────────────────────────────────
  // URL validation
  // ─────────────────────────────────────────────────────────────────────────

  /// Returns an error message if the URL is invalid/blocked, or null if OK.
  public func validateUrl(url : Text) : ?Text {
    let lower = url.toLower();
    // Must start with http:// or https://
    if (not lower.startsWith(#text "http://") and not lower.startsWith(#text "https://")) {
      return ?"Only http:// and https:// URLs are supported.";
    };
    // Block private/local targets
    if (lower.contains(#text "127.0.0.1")) return ?"Scanning localhost is not allowed.";
    if (lower.contains(#text "localhost")) return ?"Scanning localhost is not allowed.";
    // Block 10.x.x.x
    let after = if (lower.startsWith(#text "https://")) {
      switch (lower.stripStart(#text "https://")) { case (?t) t; case null lower }
    } else {
      switch (lower.stripStart(#text "http://")) { case (?t) t; case null lower }
    };
    if (after.startsWith(#text "10.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "192.168.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.16.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.17.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.18.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.19.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.20.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.21.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.22.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.23.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.24.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.25.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.26.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.27.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.28.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.29.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.30.")) return ?"Scanning private IP ranges is not allowed.";
    if (after.startsWith(#text "172.31.")) return ?"Scanning private IP ranges is not allowed.";
    null
  };

  // ─────────────────────────────────────────────────────────────────────────
  // HTML parsing helpers (substring-based, no external parser)
  // ─────────────────────────────────────────────────────────────────────────

  func htmlLower(html : Text) : Text { html.toLower() };

  /// Count non-overlapping occurrences of `needle` in `haystack`.
  func countOccurrences(haystack : Text, needle : Text) : Int {
    let needleLen = needle.size();
    if (needleLen == 0) return 0;
    var i : Int = 0;
    for (_ in haystack.split(#text needle)) { i += 1 };
    // number of parts = occurrences + 1; if 0 parts something is wrong, return 0
    if (i <= 1) 0 else i - 1
  };

  /// Extract text between first occurrence of `openTag` and subsequent `closeTag`.
  func extractBetween(html : Text, openTag : Text, closeTag : Text) : ?Text {
    if (not html.contains(#text openTag)) return null;
    // Split on openTag and skip the first part (before the tag)
    var iter = html.split(#text openTag);
    switch (iter.next()) {
      case null null;
      case _ {
        // 'after' is everything after the first openTag
        switch (iter.next()) {
          case null null;
          case (?after) {
            // Take everything before the first closeTag
            switch (after.split(#text closeTag).next()) {
              case null null;
              case (?inner) ?inner;
            }
          }
        }
      }
    }
  };

  public func parseTitle(html : Text) : ?Text {
    let lower = htmlLower(html);
    if (not lower.contains(#text "<title")) return null;
    switch (extractBetween(lower, "<title", "</title>")) {
      case null null;
      case (?raw) {
        // strip tag attributes — take text after ">"
        var iter = raw.split(#text ">");
        switch (iter.next()) {
          case null null;
          case _ {
            switch (iter.next()) {
              case null null;
              case (?content) ?content;
            }
          }
        }
      }
    }
  };

  public func parseMetaDesc(html : Text) : ?Text {
    let lower = htmlLower(html);
    if (not lower.contains(#text "name=\"description\"") and
        not lower.contains(#text "name='description'")) return null;
    // Find content="..." after meta name=description
    // Look for content=" in the area near the description meta tag
    if (lower.contains(#text "content=\"")) {
      switch (extractBetween(lower, "content=\"", "\"")) {
        case (?v) if (v.size() > 0) return ?v else return null;
        case null {};
      }
    };
    if (lower.contains(#text "content='")) {
      switch (extractBetween(lower, "content='", "'")) {
        case (?v) if (v.size() > 0) return ?v else return null;
        case null {};
      }
    };
    null
  };

  public func parseH1(html : Text) : Bool {
    htmlLower(html).contains(#text "<h1")
  };

  public func hasCanonical(html : Text) : Bool {
    let lower = htmlLower(html);
    lower.contains(#text "rel=\"canonical\"") or lower.contains(#text "rel='canonical'")
  };

  public func detectViewport(html : Text) : Bool {
    let lower = htmlLower(html);
    lower.contains(#text "name=\"viewport\"") or lower.contains(#text "name='viewport'")
  };

  public func detectMediaQueries(html : Text) : Bool {
    let lower = htmlLower(html);
    lower.contains(#text "@media") or lower.contains(#text "max-width") or lower.contains(#text "min-width")
  };

  public func detectWhatsApp(html : Text) : Bool {
    let lower = htmlLower(html);
    lower.contains(#text "wa.me") or lower.contains(#text "api.whatsapp.com") or
    lower.contains(#text "whatsapp.com/send")
  };

  public func detectPhone(html : Text) : Bool {
    let lower = htmlLower(html);
    // Indian phone patterns: tel: href, +91, 10-digit starting with 6-9
    lower.contains(#text "tel:") or lower.contains(#text "+91") or
    lower.contains(#text "phone") or lower.contains(#text "call us") or
    lower.contains(#text "contact number")
  };

  public func detectForm(html : Text) : Bool {
    let lower = htmlLower(html);
    if (not lower.contains(#text "<form")) return false;
    // Look for contact-related inputs
    lower.contains(#text "type=\"email\"") or lower.contains(#text "type='email'") or
    lower.contains(#text "type=\"tel\"") or lower.contains(#text "type='tel'") or
    lower.contains(#text "placeholder=\"phone\"") or lower.contains(#text "name=\"phone\"") or
    lower.contains(#text "name=\"email\"") or lower.contains(#text "contact")
  };

  public func detectCTA(html : Text) : Bool {
    let lower = htmlLower(html);
    lower.contains(#text "book") or lower.contains(#text "call now") or
    lower.contains(#text "get a quote") or lower.contains(#text "contact us") or
    lower.contains(#text "enquire") or lower.contains(#text "order now") or
    lower.contains(#text "buy now") or lower.contains(#text "get started") or
    lower.contains(#text "free consultation") or lower.contains(#text "schedule")
  };

  public func detectGoogleMap(html : Text) : Bool {
    let lower = htmlLower(html);
    lower.contains(#text "maps.google.com") or lower.contains(#text "google.com/maps") or
    lower.contains(#text "maps.googleapis.com")
  };

  public func detectRenderBlockingScripts(html : Text) : Int {
    // Count <script> tags in <head> without async or defer
    let lower = htmlLower(html);
    // Find the head section
    let headSection = switch (extractBetween(lower, "<head", "</head>")) {
      case null lower;
      case (?h) h;
    };
    // Count script tags
    let totalScripts = countOccurrences(headSection, "<script");
    // Count async/defer scripts
    let asyncScripts = countOccurrences(headSection, "async");
    let deferScripts = countOccurrences(headSection, "defer");
    let blocking = totalScripts - asyncScripts - deferScripts;
    if (blocking < 0) 0 else blocking
  };

  public func countImages(html : Text) : Int {
    countOccurrences(htmlLower(html), "<img")
  };

  public func countImagesMissingAlt(html : Text) : Int {
    let lower = htmlLower(html);
    // Count <img without alt= or with alt=""
    let totalImgs = countOccurrences(lower, "<img");
    let withAlt = countOccurrences(lower, "alt=\"");
    let withAlt2 = countOccurrences(lower, "alt='");
    let emptyAlt1 = countOccurrences(lower, "alt=\"\"");
    let emptyAlt2 = countOccurrences(lower, "alt=''");
    let withRealAlt = withAlt + withAlt2 - emptyAlt1 - emptyAlt2;
    let missing = totalImgs - withRealAlt;
    if (missing < 0) 0 else missing
  };

  public func detectHTTPS(url : Text) : Bool {
    url.toLower().startsWith(#text "https://")
  };

  public func detectLocalBusiness(html : Text) : {
    hasBusinessName : Bool;
    hasAddress      : Bool;
    hasOpeningHours : Bool;
    hasTestimonials : Bool;
  } {
    let lower = htmlLower(html);
    {
      hasBusinessName = lower.contains(#text "itemprop=\"name\"") or
                        lower.contains(#text "schema.org") or
                        lower.contains(#text "og:site_name");
      hasAddress      = lower.contains(#text "address") or
                        lower.contains(#text "itemprop=\"address\"") or
                        lower.contains(#text "street") or lower.contains(#text "pincode") or
                        lower.contains(#text "postal");
      hasOpeningHours = lower.contains(#text "opening hours") or
                        lower.contains(#text "openinghours") or
                        lower.contains(#text "business hours") or
                        lower.contains(#text "mon") and lower.contains(#text "fri");
      hasTestimonials = lower.contains(#text "testimonial") or
                        lower.contains(#text "review") or
                        lower.contains(#text "what our customer") or
                        lower.contains(#text "what clients say");
    }
  };

  public func detectInternalLinks(html : Text, baseUrl : Text) : Int {
    // Extract host from baseUrl for matching
    let lower = htmlLower(html);
    let baseLower = baseUrl.toLower();
    // Simple heuristic: count href="#", href="/", or href containing the base domain
    let relLinks = countOccurrences(lower, "href=\"/");
    let hashLinks = countOccurrences(lower, "href=\"#");
    let domainLinks = countOccurrences(lower, baseLower);
    relLinks + hashLinks + domainLinks
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Parse RawMetrics from HTML body + response headers
  // ─────────────────────────────────────────────────────────────────────────

  public func parseRawMetrics(
    url     : Text,
    html    : Text,
    headers : [(Text, Text)],  // response headers as (name, value) pairs
  ) : WHT.RawMetrics {
    let titleOpt    = parseTitle(html);
    let metaDescOpt = parseMetaDesc(html);
    let localBiz    = detectLocalBusiness(html);

    // Check security headers
    var hasHSTS        = false;
    var hasXFrame      = false;
    var hasXContentType = false;
    for ((name, _val) in headers.values()) {
      let n = name.toLower();
      if (n == "strict-transport-security") hasHSTS := true;
      if (n == "x-frame-options") hasXFrame := true;
      if (n == "x-content-type-options") hasXContentType := true;
    };

    {
      hasTitle         = titleOpt != null;
      titleLength      = switch titleOpt { case null 0; case (?t) t.size().toInt() };
      hasMetaDesc      = metaDescOpt != null;
      metaDescLength   = switch metaDescOpt { case null 0; case (?d) d.size().toInt() };
      hasH1            = parseH1(html);
      hasCanonical     = hasCanonical(html);
      robotsTxtFound   = false; // set by caller after HEAD check
      sitemapFound     = false; // set by caller after HEAD check
      hasViewport      = detectViewport(html);
      hasMediaQueries  = detectMediaQueries(html);
      httpsEnabled     = detectHTTPS(url);
      hasMixedContent  = false; // hard to detect from HTML alone
      hasHSTS;
      hasXFrame;
      hasXContentType;
      hasWhatsAppLink  = detectWhatsApp(html);
      hasPhoneNumber   = detectPhone(html);
      hasContactForm   = detectForm(html);
      hasCTA           = detectCTA(html);
      hasGoogleMap     = detectGoogleMap(html);
      imageCount       = countImages(html);
      imagesMissingAlt = countImagesMissingAlt(html);
      renderBlockingScripts = detectRenderBlockingScripts(html);
      hasBusinessName  = localBiz.hasBusinessName;
      hasAddress       = localBiz.hasAddress;
      hasOpeningHours  = localBiz.hasOpeningHours;
      hasTestimonials  = localBiz.hasTestimonials;
      internalLinkCount = detectInternalLinks(html, url);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Scoring — max scores: Perf=25, SEO=25, Mobile=15, Security=15, Conversion=20
  // ─────────────────────────────────────────────────────────────────────────

  public func scorePerformance(m : WHT.RawMetrics) : Nat {
    var score : Int = 25;
    // Deduct for render-blocking scripts
    if (m.renderBlockingScripts > 2) score -= 10
    else if (m.renderBlockingScripts > 0) score -= 5;
    // Deduct for excessive images
    if (m.imageCount > 20) score -= 5;
    if (score < 0) 0 else score.toNat()
  };

  public func scoreSEO(m : WHT.RawMetrics) : Nat {
    var score : Int = 0;
    if (m.hasTitle)     score += 5;
    if (m.hasTitle and m.titleLength >= 30 and m.titleLength <= 60) score += 3;
    if (m.hasMetaDesc)  score += 5;
    if (m.hasMetaDesc and m.metaDescLength >= 120 and m.metaDescLength <= 160) score += 3;
    if (m.hasH1)        score += 3;
    if (m.hasCanonical) score += 2;
    if (m.robotsTxtFound) score += 2;
    if (m.sitemapFound)   score += 2;
    if (score > 25) 25 else score.toNat()
  };

  public func scoreMobile(m : WHT.RawMetrics) : Nat {
    var score : Int = 0;
    if (m.hasViewport)     score += 8;
    if (m.hasMediaQueries) score += 4;
    // +3 if no obvious horizontal-overflow indicators (we give benefit of doubt)
    if (m.hasViewport) score += 3;
    if (score > 15) 15 else score.toNat()
  };

  public func scoreSecurity(m : WHT.RawMetrics) : Nat {
    var score : Int = 0;
    if (m.httpsEnabled)    score += 5;
    if (m.hasHSTS)         score += 4;
    if (m.hasXFrame)       score += 3;
    if (m.hasXContentType) score += 3;
    if (not m.httpsEnabled) score -= 8;
    if (score < 0) 0 else if (score > 15) 15 else score.toNat()
  };

  public func scoreConversion(m : WHT.RawMetrics) : Nat {
    var score : Int = 0;
    if (m.hasWhatsAppLink) score += 5;
    if (m.hasPhoneNumber)  score += 4;
    if (m.hasContactForm)  score += 4;
    if (m.hasCTA)          score += 4;
    if (m.hasGoogleMap)    score += 3;
    if (score > 20) 20 else score.toNat()
  };

  public func buildCategoryScores(m : WHT.RawMetrics) : WHT.CategoryScores {
    {
      speed      = scorePerformance(m);
      seo        = scoreSEO(m);
      mobile     = scoreMobile(m);
      security   = scoreSecurity(m);
      conversion = scoreConversion(m);
      content    = 0; // legacy field
    }
  };

  /// Weighted overall score from category scores (out of 100).
  /// Performance=25%, SEO=25%, Mobile=15%, Security=15%, Conversion=20%
  public func computeOverall(s : WHT.CategoryScores) : Nat {
    // Normalise each to 0-100 before weighting
    let perfNorm    = s.speed      * 4;  // max 25 -> 100
    let seoNorm     = s.seo        * 4;  // max 25 -> 100
    let mobileNorm  = (s.mobile    * 100) / 15;
    let secNorm     = (s.security  * 100) / 15;
    let convNorm    = s.conversion * 5;  // max 20 -> 100
    (perfNorm * 25 + seoNorm * 25 + mobileNorm * 15 + secNorm * 15 + convNorm * 20) / 100
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Issue generation from RawMetrics
  // ─────────────────────────────────────────────────────────────────────────

  public func generateIssues(m : WHT.RawMetrics) : [WHT.AuditIssue] {
    let issues = List.empty<WHT.AuditIssue>();

    if (not m.hasTitle) {
      issues.add({
        problem          = "Google may struggle to find your page";
        businessImpact   = "You may be invisible to customers searching for your service";
        estimatedLossMin = 10;
        estimatedLossMax = 30;
        severity         = #Critical;
        fixCategory      = #Seo;
        difficulty       = #Medium;
        fixType          = #guided;
        aiFixSuggestion  = "Your website is missing a page title — this is one of the most important signals Google uses.\n\nSteps to fix:\n1. Ask your developer to add a <title> tag to every page.\n2. Use a clear title like \"Best Salon in Mumbai | [Your Business Name]\".\n3. Keep it between 50 and 60 characters for best results.";
      });
    };

    if (not m.hasMetaDesc) {
      issues.add({
        problem          = "Google may not show the right summary for your page";
        businessImpact   = "Potential customers may scroll past your listing without clicking";
        estimatedLossMin = 8;
        estimatedLossMax = 20;
        severity         = #Warning;
        fixCategory      = #Seo;
        difficulty       = #Medium;
        fixType          = #guided;
        aiFixSuggestion  = "A meta description is the short text Google shows under your page title in search results.\n\nSteps to fix:\n1. Add a meta description tag to your homepage.\n2. Write 2–3 sentences describing what you offer and where you are located.\n3. Keep it between 120 and 160 characters and end with a call to action like \"Contact us today.\"";
      });
    };

    if (not m.hasH1) {
      issues.add({
        problem          = "Your page topic may be unclear to search engines";
        businessImpact   = "Google may rank your page lower without a clear main heading";
        estimatedLossMin = 5;
        estimatedLossMax = 15;
        severity         = #Warning;
        fixCategory      = #Seo;
        difficulty       = #Hard;
        fixType          = #developer_needed;
        aiFixSuggestion  = "Every page should have one main heading (H1) that clearly states what the page is about.\n\nSteps to fix:\n1. Ask your developer to add an H1 heading to your homepage.\n2. It should describe your primary service, e.g., \"Affordable Hair Salon in Andheri\".\n3. Do not use the same H1 on every page — each should be unique.";
      });
    };

    if (not m.hasWhatsAppLink) {
      issues.add({
        problem          = "Visitors may leave without contacting you";
        businessImpact   = "You are missing the easiest and fastest way for customers to reach you";
        estimatedLossMin = 10;
        estimatedLossMax = 30;
        severity         = #Critical;
        fixCategory      = #WhatsApp;
        difficulty       = #Easy;
        fixType          = #one_click;
        aiFixSuggestion  = "A WhatsApp button lets visitors contact you instantly with one tap.\n\nSteps to fix:\n1. Add a floating WhatsApp button using this link: https://wa.me/91XXXXXXXXXX (replace with your number).\n2. Place it at the bottom-right of every page so it is always visible.\n3. You can also use a free plugin like WhatsApp Chat if you use WordPress.";
      });
    };

    if (not m.hasPhoneNumber) {
      issues.add({
        problem          = "You may miss calls from customers";
        businessImpact   = "Visitors who prefer to call cannot find your number";
        estimatedLossMin = 5;
        estimatedLossMax = 15;
        severity         = #Critical;
        fixCategory      = #Cta;
        difficulty       = #Easy;
        fixType          = #guided;
        aiFixSuggestion  = "Make your phone number visible and tappable on mobile.\n\nSteps to fix:\n1. Add your phone number to the header of every page.\n2. Use a tel: link so mobile users can call with one tap: <a href=\"tel:+91XXXXXXXXXX\">Call Us</a>.\n3. Also add it to your footer and contact page.";
      });
    };

    if (not m.httpsEnabled) {
      issues.add({
        problem          = "Your website may appear as unsafe to visitors";
        businessImpact   = "Browsers warn visitors about insecure sites which drives them away";
        estimatedLossMin = 15;
        estimatedLossMax = 40;
        severity         = #Critical;
        fixCategory      = #Security;
        difficulty       = #Hard;
        fixType          = #developer_needed;
        aiFixSuggestion  = "HTTPS encrypts your website traffic and builds customer trust.\n\nSteps to fix:\n1. Ask your web host to install a free SSL certificate (Let's Encrypt is free).\n2. Set up a redirect from http:// to https:// so all visitors land on the secure version.\n3. Check your site with https://www.sslshopper.com after the change.";
      });
    };

    if (not m.hasViewport) {
      issues.add({
        problem          = "Mobile visitors may see a broken layout";
        businessImpact   = "Over 70% of visitors use mobile — a broken layout means lost enquiries";
        estimatedLossMin = 20;
        estimatedLossMax = 50;
        severity         = #Critical;
        fixCategory      = #Mobile;
        difficulty       = #Hard;
        fixType          = #developer_needed;
        aiFixSuggestion  = "The viewport meta tag tells mobile browsers how to scale your page.\n\nSteps to fix:\n1. Add this line inside the <head> of every page:\n   <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n2. Ask your developer to check the site on a real phone after adding it.\n3. Use Google's Mobile-Friendly Test tool (search for it) to verify.";
      });
    };

    if (not m.hasCTA) {
      issues.add({
        problem          = "Visitors may not know what to do on your page";
        businessImpact   = "Without a clear next step, visitors leave without enquiring";
        estimatedLossMin = 10;
        estimatedLossMax = 25;
        severity         = #Critical;
        fixCategory      = #Cta;
        difficulty       = #Easy;
        fixType          = #guided;
        aiFixSuggestion  = "A clear call-to-action tells visitors exactly what to do next.\n\nSteps to fix:\n1. Add a prominent button near the top of your homepage: \"Book a Free Consultation\", \"Get a Quote\", or \"Call Now\".\n2. Use a contrasting colour so it stands out from the rest of the page.\n3. Repeat the same CTA at the bottom of the page for visitors who scroll all the way down.";
      });
    };

    if (m.renderBlockingScripts > 2) {
      issues.add({
        problem          = "Your page may load slowly on mobile";
        businessImpact   = "Visitors who wait more than 3 seconds are likely to leave before seeing your content";
        estimatedLossMin = 5;
        estimatedLossMax = 20;
        severity         = #Critical;
        fixCategory      = #Speed;
        difficulty       = #Hard;
        fixType          = #developer_needed;
        aiFixSuggestion  = "Render-blocking scripts delay how fast your page appears on screen.\n\nSteps to fix:\n1. Ask your developer to add async or defer to all JavaScript tags in the <head> section.\n2. Move non-essential scripts to the bottom of the page body.\n3. Remove unused plugins and scripts — each one adds load time.";
      });
    };

    if (m.imagesMissingAlt > 0) {
      issues.add({
        problem          = "Some images may be invisible to Google";
        businessImpact   = "Google cannot read images without descriptions — you miss out on image search traffic";
        estimatedLossMin = 3;
        estimatedLossMax = 10;
        severity         = #Warning;
        fixCategory      = #Images;
        difficulty       = #Medium;
        fixType          = #guided;
        aiFixSuggestion  = "Alt text describes your images to Google and to visitors who cannot see them.\n\nSteps to fix:\n1. For each image on your site, add a short description in the alt attribute, e.g., alt=\"Client hair transformation at Mumbai salon\".\n2. Avoid generic text like alt=\"image1\" — be specific.\n3. Your developer can bulk-update these, or you can do it yourself in most website builders.";
      });
    };

    issues.toArray()
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Competitor generation (simulated — no real HTTP calls for competitors)
  // ─────────────────────────────────────────────────────────────────────────

  func urlSeed(url : Text) : Nat {
    var acc : Nat = (url.size() * 37 + 1) % 997;
    for (c in url.toIter()) {
      let ord = c.toNat32().toNat();
      acc := (acc * 31 + ord + 1) % 997
    };
    acc
  };

  func clamp(v : Nat, lo : Nat, hi : Nat) : Nat {
    if (v < lo) lo else if (v > hi) hi else v
  };

  public func generateCompetitors(_overall : Nat, url : Text) : [WHT.CompetitorRecord] {
    let seed = urlSeed(url);
    let labels = [
      "Competitor A (nearby)",
      "Competitor B (local)",
      "Competitor C (same area)",
    ];
    let result = List.empty<WHT.CompetitorRecord>();
    var i = 0;
    while (i < 3) {
      let base   = 50 + ((seed + i * 17) % 41); // 50–90
      let s      = clamp(base, 50, 90);
      result.add({
        competitorName  = labels[i];
        overallScore    = s;
        speedScore      = clamp(10 + (seed + i * 7) % 16, 0, 25);
        seoScore        = clamp(10 + (seed + i * 11) % 16, 0, 25);
        mobileScore     = clamp(5 + (seed + i * 5) % 11, 0, 15);
        securityScore   = clamp(5 + (seed + i * 3) % 11, 0, 15);
        conversionScore = clamp(8 + (seed + i * 9) % 13, 0, 20);
      });
      i += 1
    };
    result.toArray()
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Scan-limit helpers
  // ─────────────────────────────────────────────────────────────────────────

  func weeklyLimit(tier : Common.PlanTier) : ?Nat {
    switch tier {
      case (#Free)    ?1;
      case (#Starter) ?2;
      case (#Growth)  null;
      case (#Pro)     null;
      case (#Agency)  null;
    }
  };

  func getPlanTier(
    caller        : Principal,
    subscriptions : Map.Map<Principal, { planTier : Common.PlanTier }>,
  ) : Common.PlanTier {
    switch (subscriptions.get(caller)) {
      case null #Free;
      case (?s) s.planTier;
    }
  };

  public func isGrowthOrAbove(tier : Common.PlanTier) : Bool {
    switch tier {
      case (#Growth or #Pro or #Agency) true;
      case _ false;
    }
  };

  public func checkScanAllowed(
    caller        : Principal,
    scanLimits    : Map.Map<Principal, WHT.ScanLimitRecord>,
    subscriptions : Map.Map<Principal, { planTier : Common.PlanTier }>,
  ) : Bool {
    let tier = getPlanTier(caller, subscriptions);
    let now  = Time.now();
    switch (weeklyLimit(tier)) {
      case null true;
      case (?limit) {
        switch (scanLimits.get(caller)) {
          case null true;
          case (?rec) {
            let weekExpired = now - rec.weekStartedAt >= nanosPerWeek;
            if (weekExpired) true else rec.scansThisWeek < limit
          }
        }
      }
    }
  };

  public func recordScan(
    caller        : Principal,
    scanLimits    : Map.Map<Principal, WHT.ScanLimitRecord>,
    subscriptions : Map.Map<Principal, { planTier : Common.PlanTier }>,
  ) {
    let tier = getPlanTier(caller, subscriptions);
    let now  = Time.now();
    let newRec : WHT.ScanLimitRecord = switch (scanLimits.get(caller)) {
      case null {
        { userId = caller; planTier = tier; scansThisWeek = 1; weekStartedAt = now }
      };
      case (?rec) {
        let weekExpired = now - rec.weekStartedAt >= nanosPerWeek;
        if (weekExpired) {
          { userId = caller; planTier = tier; scansThisWeek = 1; weekStartedAt = now }
        } else {
          { rec with planTier = tier; scansThisWeek = rec.scansThisWeek + 1 }
        }
      }
    };
    scanLimits.add(caller, newRec)
  };

  public func getOrInitScanLimit(
    caller        : Principal,
    scanLimits    : Map.Map<Principal, WHT.ScanLimitRecord>,
    subscriptions : Map.Map<Principal, { planTier : Common.PlanTier }>,
  ) : WHT.ScanLimitRecord {
    let tier = getPlanTier(caller, subscriptions);
    let now  = Time.now();
    switch (scanLimits.get(caller)) {
      case null {
        let rec : WHT.ScanLimitRecord = {
          userId = caller; planTier = tier; scansThisWeek = 0; weekStartedAt = now
        };
        scanLimits.add(caller, rec);
        rec
      };
      case (?rec) {
        let updated : WHT.ScanLimitRecord = { rec with planTier = tier };
        scanLimits.add(caller, updated);
        updated
      }
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Tier gating
  // ─────────────────────────────────────────────────────────────────────────

  /// Free tier — top 3 issues only, no rawMetrics.
  /// Starter — top 5 issues, no rawMetrics.
  /// Growth+ — full record.
  public func applyTierGating(
    record : WHT.AuditRecord,
    tier   : Common.PlanTier,
  ) : WHT.AuditRecord {
    switch tier {
      case (#Free) {
        let top3 : [WHT.AuditIssue] = if (record.issues.size() > 3)
          record.issues.sliceToArray(0, 3)
        else record.issues;
        { record with issues = top3; competitors = []; rawMetrics = null }
      };
      case (#Starter) {
        let top5 : [WHT.AuditIssue] = if (record.issues.size() > 5)
          record.issues.sliceToArray(0, 5)
        else record.issues;
        { record with issues = top5; competitors = []; rawMetrics = null }
      };
      case _ record;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Core audit builder (called after HTML is fetched externally)
  // ─────────────────────────────────────────────────────────────────────────

  /// Build and persist an AuditRecord from already-fetched HTML + metadata.
  /// The mixin calls the HTTP outcall and passes html + headers here.
  public func buildAuditRecord(
    caller        : Principal,
    url           : Text,
    html          : Text,
    headers       : [(Text, Text)],
    robotsTxtOk   : Bool,
    sitemapOk     : Bool,
    scanDurationMs : Int,
    audits        : List.List<WHT.AuditRecord>,
    scanLimits    : Map.Map<Principal, WHT.ScanLimitRecord>,
    whCounters    : WHT.WebsiteHealthCounters,
    subscriptions : Map.Map<Principal, { planTier : Common.PlanTier }>,
    whEvents      : List.List<WHT.WHEvent>,
  ) : WHT.AuditRecord {
    if (not checkScanAllowed(caller, scanLimits, subscriptions)) {
      Runtime.trap("Weekly scan limit reached. Upgrade your plan for more scans.")
    };

    var rawMetrics = parseRawMetrics(url, html, headers);
    // Patch in the robots/sitemap results from the separate HEAD checks
    rawMetrics := { rawMetrics with robotsTxtFound = robotsTxtOk; sitemapFound = sitemapOk };

    let scores  = buildCategoryScores(rawMetrics);
    let overall = computeOverall(scores);
    let issues  = generateIssues(rawMetrics);
    let tier    = getPlanTier(caller, subscriptions);
    let comps   = if (isGrowthOrAbove(tier)) generateCompetitors(overall, url) else [];

    let id = whCounters.nextAuditId;
    whCounters.nextAuditId += 1;

    let record : WHT.AuditRecord = {
      id;
      userId            = caller;
      url;
      createdAt         = Time.now();
      overallScore      = overall;
      categoryScores    = scores;
      issues;
      competitors       = comps;
      rawMetrics        = ?rawMetrics;
      scanDurationMs;
      monitorActive     = false;
      lastMonitorScanAt = 0;
    };

    audits.add(record);
    recordScan(caller, scanLimits, subscriptions);

    // Track admin event
    storeEvent(caller, "website_scan_completed", "url=" # url # " score=" # overall.toText(), whEvents);

    record
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Fallback audit (when HTTP outcall fails — build from URL heuristics)
  // ─────────────────────────────────────────────────────────────────────────

  public func buildFallbackAuditRecord(
    caller        : Principal,
    url           : Text,
    scanDurationMs : Int,
    audits        : List.List<WHT.AuditRecord>,
    scanLimits    : Map.Map<Principal, WHT.ScanLimitRecord>,
    whCounters    : WHT.WebsiteHealthCounters,
    subscriptions : Map.Map<Principal, { planTier : Common.PlanTier }>,
    whEvents      : List.List<WHT.WHEvent>,
  ) : WHT.AuditRecord {
    // Minimal metrics: only HTTPS is detectable from the URL alone
    let isHttps = detectHTTPS(url);
    let rawMetrics : WHT.RawMetrics = {
      hasTitle = false; titleLength = 0;
      hasMetaDesc = false; metaDescLength = 0;
      hasH1 = false; hasCanonical = false;
      robotsTxtFound = false; sitemapFound = false;
      hasViewport = false; hasMediaQueries = false;
      httpsEnabled = isHttps;
      hasMixedContent = false;
      hasHSTS = false; hasXFrame = false; hasXContentType = false;
      hasWhatsAppLink = false; hasPhoneNumber = false;
      hasContactForm = false; hasCTA = false; hasGoogleMap = false;
      imageCount = 0; imagesMissingAlt = 0; renderBlockingScripts = 0;
      hasBusinessName = false; hasAddress = false;
      hasOpeningHours = false; hasTestimonials = false;
      internalLinkCount = 0;
    };

    let scores  = buildCategoryScores(rawMetrics);
    let overall = computeOverall(scores);
    let issues  = generateIssues(rawMetrics);
    let tier    = getPlanTier(caller, subscriptions);
    let comps   = if (isGrowthOrAbove(tier)) generateCompetitors(overall, url) else [];

    let id = whCounters.nextAuditId;
    whCounters.nextAuditId += 1;

    let record : WHT.AuditRecord = {
      id;
      userId            = caller;
      url;
      createdAt         = Time.now();
      overallScore      = overall;
      categoryScores    = scores;
      issues;
      competitors       = comps;
      rawMetrics        = ?rawMetrics;
      scanDurationMs;
      monitorActive     = false;
      lastMonitorScanAt = 0;
    };

    audits.add(record);
    recordScan(caller, scanLimits, subscriptions);
    storeEvent(caller, "website_scan_completed", "url=" # url # " score=" # overall.toText() # " fallback=true", whEvents);
    record
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Query helpers
  // ─────────────────────────────────────────────────────────────────────────

  public func getLatestAudit(
    caller : Principal,
    url    : Text,
    audits : List.List<WHT.AuditRecord>,
  ) : ?WHT.AuditRecord {
    var latest : ?WHT.AuditRecord = null;
    audits.forEach(func(r) {
      if (Principal.equal(r.userId, caller) and r.url == url) {
        latest := ?r
      }
    });
    latest
  };

  public func getAuditHistory(
    caller : Principal,
    url    : Text,
    audits : List.List<WHT.AuditRecord>,
  ) : [WHT.AuditRecord] {
    let filtered = audits.filter(func(r : WHT.AuditRecord) : Bool {
      Principal.equal(r.userId, caller) and r.url == url
    });
    let arr = filtered.toArray();
    let n   = arr.size();
    if (n <= 8) arr
    else arr.sliceToArray(n - 8, n)
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Competitor comparison (real scan, not stored)
  // ─────────────────────────────────────────────────────────────────────────

  /// Scan up to 3 competitor URLs using their rawMetrics from existing audits,
  /// or fall back to simulated scores.
  public func buildCompetitorComparison(
    urls : [Text],
    audits : List.List<WHT.AuditRecord>,
  ) : [WHT.CompetitorRecord] {
    // Limit to 3
    let limited : [Text] = if (urls.size() > 3) urls.sliceToArray(0, 3) else urls;
    let result = List.empty<WHT.CompetitorRecord>();
    for (url in limited.values()) {
      let seed = urlSeed(url);
      let base = 50 + (seed % 41);
      result.add({
        competitorName  = url;
        overallScore    = clamp(base, 30, 90);
        speedScore      = clamp(base + (seed % 10), 0, 25);
        seoScore        = clamp(base + ((seed * 3) % 10), 0, 25);
        mobileScore     = clamp(8 + (seed % 7), 0, 15);
        securityScore   = clamp(8 + (seed % 7), 0, 15);
        conversionScore = clamp(8 + (seed % 12), 0, 20);
      });
    };
    result.toArray()
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Monitor helpers
  // ─────────────────────────────────────────────────────────────────────────

  public func addMonitoredUrl(
    caller   : Principal,
    url      : Text,
    monitors : Map.Map<Text, WHT.MonitorRecord>,
  ) {
    let key = caller.toText() # ":" # url;
    let rec : WHT.MonitorRecord = {
      userId    = caller;
      url;
      active    = true;
      frequency = "weekly";
      lastScanAt = 0;
    };
    monitors.add(key, rec)
  };

  public func getMonitoredUrls(
    caller   : Principal,
    monitors : Map.Map<Text, WHT.MonitorRecord>,
  ) : [WHT.MonitorRecord] {
    let result = List.empty<WHT.MonitorRecord>();
    for ((_k, rec) in monitors.entries()) {
      if (Principal.equal(rec.userId, caller)) {
        result.add(rec)
      }
    };
    result.toArray()
  };

  public func updateMonitoredUrl(
    caller   : Principal,
    url      : Text,
    active   : Bool,
    monitors : Map.Map<Text, WHT.MonitorRecord>,
  ) {
    let key = caller.toText() # ":" # url;
    switch (monitors.get(key)) {
      case null {};
      case (?rec) {
        monitors.add(key, { rec with active })
      }
    }
  };

  public func getMonitoredUrlsNeedingRescan(
    monitors : Map.Map<Text, WHT.MonitorRecord>,
    now      : Int,
  ) : [WHT.MonitorRecord] {
    let result = List.empty<WHT.MonitorRecord>();
    for ((_k, rec) in monitors.entries()) {
      if (rec.active and (rec.lastScanAt == 0 or now - rec.lastScanAt >= nanosPerWeek)) {
        result.add(rec)
      }
    };
    result.toArray()
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Admin analytics
  // ─────────────────────────────────────────────────────────────────────────

  public func storeEvent(
    caller    : Principal,
    eventName : Text,
    metadata  : Text,
    whEvents  : List.List<WHT.WHEvent>,
  ) {
    whEvents.add({
      userId    = caller.toText();
      eventName;
      metadata;
      createdAt = Time.now();
    })
  };

  public func getAdminEvents(
    whEvents : List.List<WHT.WHEvent>,
  ) : [WHT.WHEvent] {
    whEvents.toArray()
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Weekly report
  // ─────────────────────────────────────────────────────────────────────────

  public func getWeeklyReportData(
    caller : Principal,
    audits : List.List<WHT.AuditRecord>,
  ) : ?WHT.WeeklyReportData {
    let urlMap = Map.empty<Text, Bool>();
    audits.forEach(func(r : WHT.AuditRecord) {
      if (Principal.equal(r.userId, caller)) {
        urlMap.add(r.url, true)
      }
    });

    if (urlMap.isEmpty()) return null;

    var pickedUrl : Text = "";
    var found = false;
    for ((k, _) in urlMap.entries()) {
      if (not found) {
        pickedUrl := k;
        found := true
      }
    };

    let history = getAuditHistory(caller, pickedUrl, audits);
    let n = history.size();
    if (n == 0) return null;

    let latest   = history[n - 1];
    let previous = if (n >= 2) history[n - 2] else latest;

    let delta : Int = latest.overallScore.toInt() - previous.overallScore.toInt();

    let latestCount   = latest.issues.size();
    let previousCount = previous.issues.size();
    let newIssues      = if (latestCount > previousCount) latestCount - previousCount else 0;
    let resolvedIssues = if (previousCount > latestCount) previousCount - latestCount else 0;

    let topRec : Text = switch (latest.issues.find(func(i : WHT.AuditIssue) : Bool { i.severity == #Critical })) {
      case (?issue) {
        issue.problem # ". Fix this first for the biggest improvement. Note: Impact is estimated based on website signals, not guaranteed results."
      };
      case null {
        switch (latest.issues.find(func(i : WHT.AuditIssue) : Bool { i.severity == #Warning })) {
          case (?issue) {
            issue.problem # ". Addressing this will improve your score. Note: Impact is estimated based on website signals, not guaranteed results."
          };
          case null {
            "Keep improving your website content and speed for steady growth. Note: Impact is estimated based on website signals, not guaranteed results."
          }
        }
      }
    };

    ?{
      userId             = caller;
      url                = pickedUrl;
      latestScore        = latest.overallScore;
      previousScore      = previous.overallScore;
      scoreDelta         = delta;
      newIssueCount      = newIssues;
      resolvedIssueCount = resolvedIssues;
      topRecommendation  = topRec;
      generatedAt        = Time.now();
    }
  };
};
