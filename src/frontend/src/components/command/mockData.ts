// Mock data generation for leads, pitches, and campaign plans

export interface MockLead {
  id: number;
  businessName: string;
  category: string;
  city: string;
  phone: string;
  email: string;
  website: string | null;
  rating: number;
  leadScore: number;
  detectedProblem: string;
}

const BUSINESS_PREFIXES: Record<string, string[]> = {
  Restaurant: [
    "Spice Garden",
    "Royal Kitchen",
    "Flavour Hub",
    "Heritage Dhaba",
    "Saffron Palace",
    "The Food Court",
    "Masala Magic",
    "Curry House",
    "Blue Plate",
    "Golden Fork",
  ],
  Salon: [
    "Glam Studio",
    "Style Zone",
    "Trendy Cuts",
    "Luxe Hair",
    "Bella Beauty",
    "Urban Clips",
    "Elite Salon",
    "Crown Looks",
    "Chic Hair",
    "Mirror Mirror",
  ],
  Gym: [
    "Power Fitness",
    "Iron Zone",
    "FitLife",
    "Peak Gym",
    "Strong Body",
    "Muscle Hub",
    "Elite Fitness",
    "Pro Gym",
    "Steel Body",
    "Flex Zone",
  ],
  Retail: [
    "Style Store",
    "City Mart",
    "Value Shop",
    "Trend Zone",
    "Mega Store",
    "Urban Fashion",
    "The Boutique",
    "Smart Shop",
    "Priya Stores",
    "Metro Retail",
  ],
  Healthcare: [
    "City Clinic",
    "Health Plus",
    "Care Center",
    "Wellness Hub",
    "MediCare",
    "Healthy Life",
    "Prime Hospital",
    "Doctor's Den",
    "Cure Point",
    "Life Care",
  ],
  "Real Estate": [
    "Dream Homes",
    "Prime Properties",
    "City Realty",
    "Green Build",
    "Sky Estates",
    "Urban Homes",
    "Apex Realty",
    "Galaxy Builders",
    "Empire Properties",
    "Golden Gate",
  ],
  Education: [
    "Bright Minds",
    "Excel Academy",
    "Knowledge Hub",
    "Success Point",
    "Star Coaching",
    "Merit Center",
    "Elite Classes",
    "Top Tutors",
    "Wisdom School",
    "Learn Pro",
  ],
  Other: [
    "Growth Co",
    "Service Pro",
    "City Business",
    "Prime Services",
    "Excel Corp",
    "Smart Solutions",
    "Top Ventures",
    "Ace Services",
    "Prime Works",
    "Alpha Co",
  ],
};

const PROBLEMS = [
  "no_website",
  "low_rating",
  "no_ads",
  "weak_seo",
  "no_google_profile",
];

const PROBLEM_LABELS: Record<string, string> = {
  no_website: "No website found",
  low_rating: "Low customer rating",
  no_ads: "No active ads running",
  weak_seo: "Weak SEO presence",
  no_google_profile: "Incomplete Google profile",
};

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateMockLeads(
  niche: string,
  city: string,
  count: number,
): MockLead[] {
  const nicheKey = niche || "Other";
  const prefixes = BUSINESS_PREFIXES[nicheKey] ?? BUSINESS_PREFIXES.Other;
  const leads: MockLead[] = [];

  for (let i = 0; i < count; i++) {
    const seed = i + city.length * 31 + niche.length * 17;
    const r1 = seededRandom(seed);
    const r2 = seededRandom(seed + 1);
    const r3 = seededRandom(seed + 2);
    const r4 = seededRandom(seed + 3);
    const r5 = seededRandom(seed + 4);

    const prefixIdx = Math.floor(r1 * prefixes.length);
    const name = `${prefixes[prefixIdx]} ${city}`;
    const hasWebsite = r2 > 0.5;
    const rating = Number.parseFloat((3.2 + r3 * 1.6).toFixed(1));
    const leadScore = Math.floor(60 + r4 * 35);
    const problemIdx = Math.floor(r5 * PROBLEMS.length);
    const problem = PROBLEMS[problemIdx];
    const slug = name.toLowerCase().replace(/\s+/g, "").slice(0, 16);

    leads.push({
      id: i + 1,
      businessName: name,
      category: nicheKey,
      city,
      phone: `+91${Math.floor(7000000000 + seededRandom(seed + 5) * 2999999999)}`,
      email: `info@${slug}.com`,
      website: hasWebsite ? `www.${slug}.com` : null,
      rating,
      leadScore,
      detectedProblem: PROBLEM_LABELS[problem] ?? problem,
    });
  }

  return leads.sort((a, b) => b.leadScore - a.leadScore);
}

export interface PitchTemplate {
  id: string;
  name: string;
  framework: string;
  subject: string;
  body: string;
}

export function generatePitchTemplates(
  niche: string,
  city: string,
): PitchTemplate[] {
  return [
    {
      id: "pas",
      name: "Problem–Agitate–Solve",
      framework: "PAS",
      subject: `Most ${niche} businesses in ${city} are losing clients to competitors`,
      body: `Hi **[Business Name]**,

I came across your ${niche} business in **${city}** and noticed something important — your business could be missing out on **dozens of new clients every month**.

Most ${niche.toLowerCase()} businesses in ${city} struggle with weak online presence, no active ads, and poor Google rankings. This means potential customers are choosing competitors instead.

Our agency specializes in helping ${niche.toLowerCase()} businesses like yours get **3x more inbound leads** within 60 days. We handle your SEO, Google Ads, and social media — so you can focus on running your business.

Would you be open to a quick 10-minute call this week?

Best,
[Your Name]`,
    },
    {
      id: "aida",
      name: "Attention–Interest–Desire–Action",
      framework: "AIDA",
      subject: `[Business Name] — 3x more customers in ${city} is possible`,
      body: `Hi **[Business Name]**,

**Attention:** Your competitors in ${city} are getting 5x more Google traffic than you right now.

**Interest:** We've helped 20+ ${niche.toLowerCase()} businesses in India grow their customer base through targeted digital marketing.

**Desire:** Imagine having a steady stream of new clients every month — no cold calling, no referral chasing. Just consistent inbound leads from Google and social media.

**Action:** Reply to this message and I'll share a free audit of your current online presence — completely free, no strings attached.

Looking forward to helping you grow,
[Your Name]`,
    },
    {
      id: "direct",
      name: "Direct Value Pitch",
      framework: "Value-First",
      subject: `Free marketing audit for your ${niche} business in ${city}`,
      body: `Hi **[Business Name]**,

I've done a quick analysis of ${niche.toLowerCase()} businesses in **${city}**, and I noticed your business has room to grow online.

Here's what I found:
• **[Detected Problem]** — this is costing you potential clients daily
• Your Google ranking for local searches can be significantly improved
• Competitors are running ads and capturing demand you're missing

I'd love to share a **free, personalized growth plan** for your business — no cost, no commitment.

Can I send it over?

Thanks,
[Your Name]`,
    },
  ];
}

export interface CampaignWeek {
  week: number;
  title: string;
  tasks: string[];
}

export interface CampaignPlan {
  title: string;
  duration: string;
  weeks: CampaignWeek[];
  expectedROI: string;
}

export function generateCampaignPlan(
  niche: string,
  city: string,
  budget: number,
): CampaignPlan {
  const budgetStr =
    budget >= 100000 ? "₹1L+" : `₹${(budget / 1000).toFixed(0)}k`;
  return {
    title: `30-Day ${niche} Client Acquisition Plan — ${city}`,
    duration: "30 Days",
    weeks: [
      {
        week: 1,
        title: "Identify & Reach Out",
        tasks: [
          `Scrape top 50 ${niche.toLowerCase()} businesses in ${city}`,
          "Score leads by revenue potential (website, SEO, ads gaps)",
          "Send Day 1 cold outreach to 20 high-priority leads",
          "Set up WhatsApp template messages",
        ],
      },
      {
        week: 2,
        title: "Follow Up & Qualify",
        tasks: [
          "Send Day 2 follow-up to non-responders",
          "Schedule discovery calls with interested prospects",
          "Send personalized proposals to 5 qualified leads",
          "Launch retargeting ads campaign",
        ],
      },
      {
        week: 3,
        title: "Close & Onboard",
        tasks: [
          "Send Day 4 final message to remaining leads",
          "Follow up on proposal responses",
          "Close 1–2 clients at target budget",
          "Onboard new clients with welcome package",
        ],
      },
      {
        week: 4,
        title: "Scale & Repeat",
        tasks: [
          "Scrape next batch of 50 leads",
          "Start delivery for onboarded clients",
          "Request referrals from new clients",
          "Analyze outreach response rates and optimize",
        ],
      },
    ],
    expectedROI: `${budgetStr} retainer × 1–3 new clients = ₹${(budget / 1000).toFixed(0)}k–₹${((budget * 3) / 1000).toFixed(0)}k MRR by day 30`,
  };
}
