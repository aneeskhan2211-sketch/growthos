# Design Brief

**GrowthOS — Premium SaaS Dashboard for Digital Marketing Agencies**

## Tone & Intent
Refined, trustworthy, mission-focused. Every interaction is high-stakes: finding qualified leads, closing deals, managing client ROI. Visual language: premium without pretension. Manually crafted precision. No AI generic defaults.

## Color Palette
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary (Electric Blue) | 0.53 0.22 253 | Actions, CTAs, active states |
| Premium Accent (Enhanced Blue) | 0.58 0.28 253 | Premium features, highlighted flows |
| Success (Emerald) | 0.56 0.15 170 | Wins, closed deals, positive metrics |
| Warning (Amber) | 0.68 0.18 86 | Alerts, review flags, follow-ups |
| Milestone Bronze | 0.55 0.12 40 | First achievement badge |
| Milestone Silver | 0.85 0.05 0 | Mid-level milestone unlock |
| Milestone Gold | 0.68 0.15 86 | Premium achievement badge |
| Sidebar (Deep Navy) | 0.22 0.02 253 | Navigation anchor, app foundation |
| Background | 0.99 0 0 (light) / 0.12 0 0 (dark) | Content canvas |

## Typography
**Display:** Fraunces 400/700 (editorial, warm serif for headings, 24–32px, +0.5px letter-spacing)
**Body:** Inter 400/700 (modern clarity, 14–16px, neutral sans-serif)
**Mono:** JetBrainsMono 400/700 (technical code blocks, 12–14px)
**Scale:** H1 32px (Fraunces 700), H2 24px (Fraunces 700), H3 18px (Fraunces 600), P 16px (Inter 400), Small 14px (Inter 400)

## Structural Zones
| Zone | Light | Dark | Detail |
|------|-------|------|--------|
| Sidebar | 0.22 0.02 253 | 0.15 0.01 253 | 240px, white text, icon-first, active rounded corners |
| Header | 0.99 0 0 | 0.16 0 0 | Breadcrumb, search, notifications, settings, 64px height |
| Content | 0.99 0 0 | 0.12 0 0 | Card grid, 8px gaps, 1400px max-width |
| Cards | 0.98 0 0 | 0.16 0 0 | Shadow-card, 20px padding, 5% gradient overlay |
| Modals | glass | glass | Shadow-premium, 8px blur, 24px padding |
| Footer | 0.95 0 0 | 0.14 0 0 | Border-top, status info, 12px type, 48px height

## Premium Surface Treatments
- **KPI Cards**: Gradient (primary + success, 5–8%), shadow-card, 20px padding, rounded-lg
- **Modals**: Glass (0.8 + 8px blur) modals only; shadow-premium; escape on backdrop
- **Hover States**: Hover-lift (translateY -2px + enhanced shadow), 200ms duration
- **Button Hierarchy**: Primary (blue), Secondary (gray), Tertiary (text), Destructive (red), Success (green)
- **Card Layering**: No full-page gradients; depth via shadow hierarchy (xs → subtle → elevated → premium)
- **Lead Status**: Color + icon badge; never color-only

## Motion & Timing
- **Base**: 0.3s cubic-bezier(0.4, 0, 0.2, 1) for state/entrance/layout
- **Hover Lift**: 200ms, translateY(-2px) cards; -1px buttons
- **Entrance**: Fade-in-item (300ms, 4px slide up)
- **Streak Pulse**: 1.5s symmetric scale (1.0 → 1.05 → 1.0)
- **Milestone Unlock**: 600ms cubic-bezier scale bounce + rotate ±10°
- **Slide-in**: 400ms off-canvas sidebars/modals
- **Choreography**: Max 2 simultaneous; 50–100ms stagger

## Spacing & Rhythm
- **8px Grid**: Multiples of 8px (8, 16, 24, 32, 40, 48, 56, 64px)
- **Card**: 20px padding; Modals 24px
- **Gap**: 16px between cards
- **Sidebar**: 240px (32 units)
- **Header**: 64px (8 units)
- **Max-width**: 1400px; breakpoints sm 640, md 768, lg 1024, xl 1280, 2xl 1400px
- **Leading**: 1.5 body (16px); 1.2 headlines (Fraunces)

## Anti-Patterns
- ❌ Gradient backgrounds on main content canvas (white/neutral only)
- ❌ Rainbow palette — max 5 semantic colors + 3 milestone badges
- ❌ Skeuomorphic depth (only use shadow hierarchy, no bevels)
- ❌ Animation without choreography (all transitions purposeful, <600ms)
- ❌ Color-only affordances (always pair color + shape/icon/text weight)
- ❌ Glass morphism outside modals (use solid cards for standard content)
- ❌ Over-saturated UI elements (keep chroma ≤0.25 for primary accent)
- ❌ Misaligned spacing (every edge aligned to 8px grid)

## Signature Details
**Premium Gradients**: Soft overlays (primary + success, 5–8%) on KPI cards create depth without distraction.
**Shadow Hierarchy**: xs → subtle → elevated → premium; each serves distinct layering.
**Milestone Progression**: Bronze → Silver → Gold unlock with animation (scale + rotate).
**Typography**: Fraunces (warm, editorial) + Inter (neutral, readable) create visual contrast.
**Lead Scoring**: Color (red/amber/green) + icon (8–12px) + numeric; never color-only.
**Hover**: Cards lift -2px; buttons use icon scale or color shift (stability).

## Lead Generation Extensions
**Scoring**: 0–30 (critical red), 31–60 (warning amber), 61–100 (success green); pair with icon + numeric.
**Timeline**: Vertical checkpoints (Day 1/2/4) with status dots (pending gray, sent blue, delivered green); fade-in on new.
**Progress**: Linear bar (4px, gradient fill), smooth update, percent label (14px Inter bold).
**Contact History**: Horizontal scrollable badges (avatar, timestamp, preview 2-line); fade-in stagger.

## Constraints
- **Contrast**: FG–BG ≥0.7 luminance; FG–primary ≥0.45
- **Dark Mode**: Text ≥0.88L; no light-on-bright
- **Chroma**: Primary/accent ≤0.25; neutrals 0.0 (pure gray)
- **Spacing**: Every edge aligned to 8px (8, 16, 24, 32, 40, 48, 56, 64px)
- **Animation**: Entrance 300–400ms; hover 150–200ms; state ≤300ms
- **Button**: Minimum 44px height; text + icon or color + shape
- **Cards**: Shadow only (xs–premium), no opacity blending
- **Typography**: Max 3 families (display + body + mono); 4 sizes (H1, H2, H3, P/small)
