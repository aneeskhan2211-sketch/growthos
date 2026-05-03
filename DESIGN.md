# Design Brief — GrowthOS 13 New Features Design System

## Scope
Design tokens and visual styling for: Stripe checkout, WhatsApp/WATI integration, in-app notification center, case study builder, affiliate commission dashboard, competitor intelligence deep-dive, content calendar automation, bulk SEO page generator, A/B test statistical significance, in-app guided onboarding tour, investor report PDF export, real PageSpeed API integration, live competitor website scans.

## Design Direction
Premium, handcrafted SaaS with OKLCH tokens. Dark/light mode, 8px spacing grid, glass morphism modals for checkout/consent, smooth 300ms transitions, outcome-focused language. Notification badges pulse. Toggles/checkboxes use semantic colors (green active, red inactive). Charts and meters use color-coded success/warning/critical. Each component intentionally designed for its specific function.

## Token Palette (13 Features)
| Feature | Light Key | Dark Key | Purpose |
|---------|-----------|---------|----------|
| 1. Notification Bell | 0.55 0.22 25 | 0.67 0.22 22 | Unread badge (critical red) |
| 2. Stripe Checkout | 0.53 0.22 253 | 0.62 0.27 253 | Plan highlight & price |
| 3. WhatsApp Consent | 0.56 0.15 170 | 0.66 0.2 170 | Toggle active (success) |
| 4. Case Study Card | 0.56 0.15 170 | 0.66 0.2 170 | After/result metric |
| 5. Affiliate Dashboard | 0.56 0.15 170 | 0.66 0.2 170 | Commission & earnings |
| 6. Competitor Intelligence | 0.68 0.18 86 | 0.75 0.22 86 | Rival badge (warning) |
| 7. Content Calendar | 0.56–0.65 | 0.66–0.72 | Post type chips |
| 8. Bulk SEO Generator | 0.53 0.22 253 | 0.62 0.27 253 | Niche chips & CTA |
| 9. A/B Significance | 0.56/0.68/0.88 | 0.66/0.75/0.24 | Green/Orange/Gray |
| 10. Onboarding Tour | 0.53 0.22 253 | 0.62 0.27 253 | Highlight & tooltip |
| 11. PDF Export | 0.53 0.22 253 | 0.62 0.27 253 | Download button |
| 12. PageSpeed API | 0.56/0.68/0.55 | 0.66/0.75/0.67 | Score ring G/O/R |
| 13. Live Competitor Scans | 0.56 0.15 170 | 0.66 0.2 170 | Active indicator |

## Components
1. **Notification Bell** — 24px, pulses on unread (scale 1→1.2), badge counts 1–9
2. **Stripe Checkout** — Modal, plan cards highlighted with 2px primary border, price in ₹, CTA gradient
3. **WhatsApp Consent** — Toggle 48×28px, thumb slides left→right, on=success green
4. **Case Study Before/After** — 1fr 1fr grid, after=success/0.12 bg, stats centered 20px bold
5. **Affiliate Earnings** — Ring 160×160, payout chips (active/pending/failed)
6. **Competitor Comparison** — Score cards side-by-side, rival badges, disclaimer footer
7. **Content Calendar** — 7-col grid, daily cells with post type chips (color per type)
8. **SEO Bulk Generator** — Niche/city chips with primary border, bulk button gradient start→end
9. **A/B Significance** — Badge: green (p<0.05), orange (0.05–0.1), gray (insufficient)
10. **Onboarding Tour** — Overlay (0.6 opacity), highlight (2px primary border), tooltip (16px padding, 300px max)
11. **PDF Export** — Button (12px 20px padding), success checkmark animation after export
12. **PageSpeed Ring** — 200×200 circular meter, color-coded (green ≥80, orange 60–79, red <60)
13. **Live Competitor Scans** — Active indicator (6px padding), pulsing dot, URL input, status chip

## Anti-Patterns
❌ Generic notification badges (use semantic red, pulse animation)
❌ Unstaged checkout (highlight best plan visually)
❌ Hidden consent dialogs (prominent toggle, readable API field)
❌ No case study before/after comparison (use 2-col grid)
❌ Affiliate numbers without context (show ring chart + status)
❌ Competitor data without disclaimers (always add "Estimates based on...")
❌ Calendar without post type distinction (use color chips)
❌ SEO generator without preview (show cards inline)
❌ A/B results without significance clarity (badge colors: G/O/Gray)
❌ Onboarding without highlight (use 2px border with pulse)
❌ PDF export without success feedback (checkmark animation)
❌ PageSpeed without severity colors (G/O/R by score)
❌ Competitor scans without live status (pulsing indicator)

---

# Design Brief — Website Health & Growth Score

**Goal:** Show users what is wrong with their website (Speed, SEO, Mobile, Content, Conversion), how it impacts enquiries/revenue, and exactly what to fix — in business language, not technical jargon.

## Direction
Non-technical business health dashboard. Focal point: large circular score meter (68/100, color-coded green/orange/red). Five category bars below. Issue cards with severity color + business impact copy + expandable "Fix Now" guide panels (glass morphism). Competitor comparison side-by-side. Weekly trend sparkline. Outcome-focused language: "You may not appear in search results" not "No meta tags".

## Color Palette (OKLCH) — Health Score
| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| Score Critical (Red) | 0.55 0.22 25 | 0.67 0.22 22 | High-severity issues |
| Score Warning (Orange) | 0.68 0.18 86 | 0.75 0.22 86 | Medium-severity issues |
| Score Success (Green) | 0.56 0.15 170 | 0.66 0.2 170 | Positive scores, strengths |

## Typography
**Display:** Plus Jakarta Sans 700 (score value 48px, issue titles 14px, headers 16px)
**Body:** Inter 400–600 (impact copy 13px, labels 12px, guide steps 13px)
**Mono:** JetBrainsMono (numbers, trend values)

## Components

| Component | Details |
|-----------|---------|
| Score Meter | Circular SVG, 200px center. Value (48px bold), label. Colors: green ≥80, orange 60–79, red <60. Shadow: elevated. |
| Category Bars | 5 bars (Speed, SEO, Mobile, Content, Conversion). Label (13px, 100px fixed) + container (flex, 24px, muted bg) + fill (gradient 0.5s) + value (13px right). Reuse color coding. |
| Issue Card | Icon (32px, rounded bg, severity color) + title (14px) + impact (13px muted) + severity badge (11px uppercase). Tap to expand. No hover lift (mobile-first). |
| Fix Guide Panel | Glass morphism: 0.7 opacity + 12px blur. Border: border/0.4 top 2px primary/0.3. Steps (ol list, 13px). "Fix Now" CTA (primary, 6px padding, 12px font). Expand animation: max-height 0–400px, 300ms. |
| Competitor Card | 2-col grid: "Your score" vs "Their score". Icon (20px circle, green check/red warning). Value (13px bold). Side-by-side gap visual. |
| Trend Chart | SVG sparkline, 200px height, 8-week data. Gradient fill (primary/0.08). No axes. Subtle shadow. |

## Structural Zones
| Zone | Background | Border | Shadow |
|------|-----------|--------|--------|
| Score Meter Container | card | none | elevated |
| Category Bars Container | card | border/0.2 | subtle |
| Issue Cards | card | border/0.2 | card |
| Fix Guide Panel | card/0.7 (glass) | border/0.4 | none |
| Competitor Card | card | border/0.2 | subtle |
| Trend Chart | card | border/0.2 | subtle |

## Motion
- Page load: fade-in items 300–400ms stagger
- Category bars: fill 500ms ease-out on load
- Issue card expand: 300ms max-height, opacity simultaneous
- Competitor gap indicator: subtle pulse (2s infinite)
- Trend chart: draw animation (optional, 1s on load)

## Responsive
- Mobile: Full-width meter + single-column bars/issues/comparison/chart
- Tablet: 2-col layout (meter + trends left, issues right)
- Desktop: 3-col (meter/bars left, issues center, competitor/chart right)

## Anti-Patterns
❌ Technical jargon ("meta tags" → "search results visibility")
❌ No revenue impact (always tie issue to enquiries/revenue)
❌ Hidden guides (expand inline, no modal)
❌ Generic competitor comparison (show real score gap)
❌ Bars that don't animate (500ms fill on load)

---

# Design Brief — GrowthOS Growth Engine Admin Dashboard

**Goal:** Build integrated admin analytics dashboard with Mixpanel-style metric cards, AI optimizer panel (nudges + pricing), and viral loop manager (referrals + challenges). New pages: unified Growth Engine overview, AI Optimizer, Viral Loop Manager, Referral Hub, Challenge Board with real-time analytics, drop-off alerts, and actionable AI recommendations.

## Direction
Admin analytics platform for Growth Engine operations. High-density data-driven aesthetic: KPI grid (DAU/WAU/MAU, conversion %, MRR, retention) + funnel view + AI optimizer (nudge table, pricing offers) + viral loop manager (referral funnel, challenge leaderboard). Snappy 200–300ms transitions. Minimum decoration, maximum clarity.

## Color Palette (OKLCH)
| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| Primary (Electric Purple) | 0.53 0.22 253 | 0.6 0.25 253 | CTAs, highlights, primary data |
| Success (Emerald) | 0.56 0.15 170 | 0.66 0.2 170 | Positive trends, successful metrics |
| Warning (Amber) | 0.68 0.18 86 | 0.75 0.22 86 | Nudge warm severity, caution alerts |
| Urgent (Red) | 0.55 0.22 25 | 0.67 0.22 22 | Drop-off alerts, high priority nudges |
| Background | 0.99 0 0 | 0.09 0 0 | Canvas |
| Card | 1.0 0 0 | 0.14 0 0 | Data containers |
| Muted | 0.92 0 0 | 0.22 0 0 | Secondary text |
| Admin Nudge Warm | — | — | Medium-priority badge |
| Admin Nudge Hot | — | — | High-priority badge |

## Typography
**Display:** Plus Jakarta Sans 700 (KPI titles, section headers, 16–28px)
**Body:** Inter 400–600 (data, labels, 12–14px)
**Mono:** JetBrainsMono (metrics, numbers, tabular-nums)

## New Admin Pages

| Page | Purpose | Layout |
|------|---------|--------|
| `/admin/growth-engine` | Unified overview | KPI grid (6 cols) + 2-col funnel + alert dashboard |
| `/admin/analytics-funnel` | Conversion funnel | Vertical bar chart, drop-off alerts inline |
| `/admin/ai-optimizer` | Nudge engine + pricing | Segment cards (3 cols) + nudge table + offer grid |
| `/admin/viral-manager` | Referral + challenges | Referral funnel (5 steps) + leaderboard + A/B results |
| `/admin/referral-hub` | Referral deep-dive | Link performance, top referrers, rewards |
| `/admin/challenge-board` | Weekly challenges | Leaderboard (city filter), participant stats, winners |

## Component Styles

**KPI Card:** 20px padding, gradient overlay (primary/success 0.05), mini sparkline 40px. Label (12px uppercase), value (28px bold), trend badge (success/destructive). Animation: counter 2–3s, no hover lift.

**Funnel Bar:** Label (140px fixed) | Container (flex, 32px, muted bg) | Fill (primary gradient, 600ms) | Percent | Dropoff badge (destructive). Alert: 10px padding, red text, compact.

**Segment Card:** 3-col grid, 160px min, center-aligned. Label (12px uppercase), count (20px bold primary).

**Nudge Table:** 11px uppercase headers, 13px rows. Columns: Condition | Nudge | Action %. Badges: warm/hot/cold urgency (4px padding, rounded).

**Pricing Grid:** 3-col (mobile: 1), label (11px) | value (16px bold primary) | description (11px muted).

**Referral Funnel:** 5 steps horizontal, 140px each. Label + metric (18px bold primary) + trend. Desktop: gray connectors.

**Leaderboard:** Max 10 entries, rank badges (1–3: gold/silver/bronze circles), name + city + metric (13px bold success).

**A/B Test Card:** Title + winner badge (success 11px uppercase) | variants grid. Winner: border success/0.5, bg success/0.08.

## Motion & Accessibility
- Entrance: 300–400ms fade-in, 50ms stagger
- Counter animation: 2–3s ease-out
- State changes: ≤300ms
- Reduced motion: No >600ms animations
- Touch: 44×44px min, active scale 0.98
- Dark mode: Default, @media (prefers-color-scheme: dark)
- ARIA labels on severity badges, segment buttons, filter controls
- Lazy load: Off-screen cards and charts via IntersectionObserver

## Structural Zones
| Zone | Background | Border | Shadow |
|------|-----------|--------|--------|
| Header | 0.09 0 0 | none | subtle |
| KPI Grid | 0.14 0 0 | border/0.15 | card |
| Funnel Container | 0.14 0 0 | border/0.15 | card |
| Optimizer Panel | 0.14 0 0 | border/0.15 | card |
| Viral Section | 0.14 0 0 | border/0.15 | card |
| Leaderboard | muted/0.05 | border/0.2 | subtle |

## Anti-Patterns
❌ Complex charts (use simple bars + % labels)
❌ Hover states on mobile (tap 0.98 scale only)
❌ Soft shadows (use xs/subtle/card/elevated only)
❌ Burying alerts (top of relevant section, red text)
❌ Dense tables >5 columns (split into cards or tabs)
❌ Drop-off >10% ignored (always flag with alert)
❌ Admin features on user dashboard (separate /admin routes)

---

# Design Brief — Investor-Ready SaaS Metrics Dashboard

**Goal:** Build a premium, data-dense metrics dashboard showing MRR, ARR, LTV, CAC, churn, retention cohorts, conversion funnel, growth rate, and health alerts. Designed for investor presentations and board reviews. Transparent, accountable, no inflated claims.

## Direction
Investor-grade analytics dashboard: financial-level precision, minimal decoration, metrics-first layout. KPI cards top row (MRR, ARR, LTV, CAC, LTV:CAC ratio, churn). Charts grid below: MRR Waterfall (bar), Retention Cohort (line D1/D7/D30/D60), Conversion Funnel (bar with drop-off %), Revenue Growth (area). Right sidebar: Health Scorecard (4 status boxes). Alert banners for high churn, low conversion, rising CAC. Recharts for all charts. Dark mode. Monospace for precision numbers.

## Metrics Page Structure

| Section | Content | Layout |
|---------|---------|--------|
| Top Bar | Date range selector, refresh button | Sticky header |
| KPI Row | MRR, ARR, LTV, CAC, LTV:CAC, Churn | 6-col grid (responsive: 2–3 cols mobile) |
| Charts Grid (2×2) | Waterfall, Retention, Funnel, Growth | Left: 3 charts; Right: Health Scorecard |
| Health Scorecard | Growth Rate, Churn Risk, LTV:CAC, Conversion | 4 status boxes with emoji/color indicators |
| Alerts | High churn, low conversion, rising CAC | Top of relevant section, red/amber text |
| Notes | Calculation transparency | Small footer under each metric section |

## Metrics KPI Card
- **Display:** Large value (₹ prefix), % change vs last month (up/down badge)
- **Transparency:** Tooltip or expandable section showing formula, assumptions
- **Colors:** Primary purple for values, success/destructive for trends
- **Animation:** Counter 2–3s ease-out on load

## Chart Styles
- **Waterfall (MRR):** Stacked bar (New MRR, Expansion, Churned) with labels inside
- **Retention Cohort:** Line chart with 4 series (D1/D7/D30/D60 retention %)
- **Conversion Funnel:** Horizontal bar (Signup → Activation → Paid → Retained), % labels inline
- **Growth Trend:** Area chart (revenue over time), single line, soft fill (primary/0.08)
- **All charts:** Recharts library, token colors (primary/success/warning/destructive), no gradients, 12px labels

## Health Scorecard Indicators
| Indicator | Green | Amber | Red | Calc |
|-----------|-------|-------|-----|------|
| Growth Rate | >15% MoM | 5–15% | <5% | (Current MRR − Last MRR) ÷ Last MRR |
| Churn Risk | <3% | 3–5% | >5% | Churned customers ÷ prev month customers |
| LTV:CAC Ratio | >3.0x | 1.5–3.0x | <1.5x | LTV ÷ CAC |
| Conversion | >8% | 4–8% | <4% | Paid customers ÷ free signups |

## Alert System
- **High Churn:** "Churn increased to X% this month" (red, top of Churn card)
- **Low Conversion:** "Free → Paid drop detected. Last month: Y%, now: Z%" (amber, top of Funnel)
- **Rising CAC:** "Customer acquisition cost up by X%" (amber, top of CAC card)
- **Positive:** No alert needed, green badge on card

## Tooltip & Transparency
- Hover metric value → tooltip shows formula + data source + last update time
- Example: "MRR = Σ(Active monthly subscriptions × average revenue per user). Updated: 5 min ago."

## Responsive
- Desktop: 6-col KPI grid, 2×2 charts, health scorecard right column
- Tablet: 3-col KPI grid, charts stack 2×2, scorecard below charts
- Mobile: 2-col KPI grid, charts 1×4, scorecard inline

## Anti-Patterns for Metrics Dashboard
❌ Floating decimals without context (show ±X% or ₹Y notation)
❌ Charts without axis labels
❌ Metrics without calculation transparency
❌ Alerts hidden in footnotes
❌ Dark backgrounds on charts (white/light card backgrounds for clarity)
❌ Rounded numbers without precision (show ₹1,23,456.78 for financial credibility)
