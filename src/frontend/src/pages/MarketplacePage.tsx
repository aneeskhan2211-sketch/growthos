import { PaywallTrigger } from "@/components/PaywallTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAutoAgency } from "@/hooks/useAutoAgency";
import { useSubscription } from "@/hooks/useSubscription";
import type {
  MarketplaceListing,
  MarketplaceListingType,
} from "@/types/auto-agency";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Format helpers ────────────────────────────────────────────────────────────

function formatINR(n: bigint): string {
  const num = Number(n);
  if (num >= 100_000) return `₹${(num / 100_000).toFixed(1)}L`;
  if (num >= 1_000) return `₹${(num / 1_000).toFixed(1)}k`;
  return `₹${num}`;
}

function formatStars(avgRating: bigint): string {
  return (Number(avgRating) / 10).toFixed(1);
}

// ─── Tag color palette ─────────────────────────────────────────────────────────

const TAG_PALETTES = [
  "bg-primary/10 text-primary",
  "bg-success/10 text-success",
  "bg-warning/10 text-warning",
  "bg-accent/10 text-accent-foreground",
  "bg-destructive/10 text-destructive",
  "bg-secondary text-secondary-foreground",
];

function tagColor(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++)
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_PALETTES[Math.abs(hash) % TAG_PALETTES.length];
}

// ─── Plan tier check ──────────────────────────────────────────────────────────

const PLAN_TIER: Record<string, number> = {
  free: 0,
  starter: 1,
  growth: 2,
  pro: 3,
  agency: 4,
};

function getPlanTier(plan: string): number {
  return PLAN_TIER[String(plan).toLowerCase()] ?? 0;
}

// ─── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ label }: { label: string }) {
  return (
    <div
      className="col-span-2 md:col-span-3 flex flex-col items-center justify-center py-16 gap-3 text-center"
      data-ocid="marketplace.empty_state"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.5"
        stroke="currentColor"
        className="text-muted-foreground/40"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className="text-xs text-muted-foreground/60">
        Check back soon for new listings
      </p>
    </div>
  );
}

// ─── Star display ──────────────────────────────────────────────────────────────

function StarRating({
  avgRating,
  reviewCount,
}: { avgRating: bigint; reviewCount: bigint }) {
  const rating = Number(avgRating) / 10;
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const starPositions = ["s1", "s2", "s3", "s4", "s5"] as const;

  return (
    <span
      className="inline-flex items-center gap-1 marketplace-rating"
      aria-label={`${rating} stars`}
    >
      {starPositions.map((key, i) => (
        <svg
          key={key}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={
            i < full
              ? "currentColor"
              : i === full && half
                ? "url(#half)"
                : "none"
          }
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="none" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.1,8.2 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.2" />
        </svg>
      ))}
      <span className="text-xs font-semibold">{formatStars(avgRating)}</span>
      <span className="text-xs text-muted-foreground">
        ({String(reviewCount)})
      </span>
    </span>
  );
}

// ─── BuyLeads Card ─────────────────────────────────────────────────────────────

function BuyLeadsCard({
  listing,
  index,
  planTier,
}: {
  listing: MarketplaceListing;
  index: number;
  planTier: number;
}) {
  function handleBuy() {
    if (planTier < 3) return; // gated by PaywallTrigger outer
    toast.success("Purchase initiated", {
      description: `Opening checkout for "${listing.title}"`,
    });
  }

  const card = (
    <motion.div
      className="marketplace-listing shadow-card hover:shadow-elevated transition-hover cursor-pointer group"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      data-ocid={`marketplace.buy_leads.item.${index + 1}`}
    >
      {/* Header */}
      <div className="marketplace-listing-header">
        <h3 className="marketplace-listing-title line-clamp-2 flex-1 mr-2">
          {listing.title}
        </h3>
        <span className="marketplace-listing-price shrink-0">
          {formatINR(listing.price)}
        </span>
      </div>

      {/* Description */}
      <p className="marketplace-listing-desc text-truncate-3">
        {listing.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {listing.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className={`inline-block px-2 py-0.5 rounded text-[11px] font-600 font-semibold ${tagColor(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="marketplace-listing-footer">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground font-medium">
            {listing.sellerName}
          </span>
          <StarRating
            avgRating={listing.avgRating}
            reviewCount={listing.reviewCount}
          />
        </div>
        <button
          type="button"
          className="marketplace-action-btn"
          onClick={handleBuy}
          data-ocid={`marketplace.buy_now_button.${index + 1}`}
          aria-label={`Buy ${listing.title}`}
        >
          Buy Now
        </button>
      </div>
    </motion.div>
  );

  if (planTier >= 3) return card;

  return (
    <PaywallTrigger feature="high-score-leads" requiredPlan="pro" asDiv>
      {card}
    </PaywallTrigger>
  );
}

// ─── SellService Card ─────────────────────────────────────────────────────────

function SellServiceCard({
  listing,
  index,
  currentUserId,
  planTier,
}: {
  listing: MarketplaceListing;
  index: number;
  currentUserId: string;
  planTier: number;
}) {
  const isOwn = listing.sellerId === currentUserId;

  function handleContact() {
    toast.success("Message sent", {
      description: `Reached out to ${listing.sellerName}`,
    });
  }

  const card = (
    <motion.div
      className="marketplace-listing shadow-card hover:shadow-elevated transition-hover group"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      data-ocid={`marketplace.sell_services.item.${index + 1}`}
    >
      {/* Header */}
      <div className="marketplace-listing-header">
        <h3 className="marketplace-listing-title line-clamp-2 flex-1 mr-2">
          {listing.title}
        </h3>
        <span className="marketplace-listing-price shrink-0">
          {formatINR(listing.price)}
        </span>
      </div>

      {/* Description */}
      <p className="marketplace-listing-desc text-truncate-3">
        {listing.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {listing.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${tagColor(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="marketplace-listing-footer">
        <div className="flex flex-col gap-0.5">
          {isOwn ? (
            <Badge variant="outline" className="text-xs">
              Your Listing
            </Badge>
          ) : (
            <span className="text-xs text-muted-foreground font-medium">
              {listing.sellerName}
            </span>
          )}
          {!isOwn && (
            <StarRating
              avgRating={listing.avgRating}
              reviewCount={listing.reviewCount}
            />
          )}
        </div>

        {isOwn ? (
          <button
            type="button"
            className="marketplace-action-btn"
            onClick={() => toast.info("Edit listing — coming soon")}
            data-ocid={`marketplace.edit_button.${index + 1}`}
          >
            Edit
          </button>
        ) : (
          <button
            type="button"
            className="marketplace-action-btn"
            onClick={handleContact}
            data-ocid={`marketplace.contact_button.${index + 1}`}
          >
            Contact
          </button>
        )}
      </div>
    </motion.div>
  );

  if (planTier >= 3) return card;
  return (
    <PaywallTrigger feature="ai-proposal" requiredPlan="pro" asDiv>
      {card}
    </PaywallTrigger>
  );
}

// ─── HireFreelancer Card ───────────────────────────────────────────────────────

function HireFreelancerCard({
  listing,
  index,
  planTier,
}: {
  listing: MarketplaceListing;
  index: number;
  planTier: number;
}) {
  const hourlyRate = Math.round(Number(listing.price) / 10);

  function handleHire() {
    if (planTier < 3) return;
    toast.success("Hire request sent", {
      description: `Contacted ${listing.sellerName}`,
    });
  }

  const card = (
    <motion.div
      className="marketplace-listing shadow-card hover:shadow-elevated transition-hover group"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -2 }}
      data-ocid={`marketplace.hire_freelancers.item.${index + 1}`}
    >
      {/* Header row */}
      <div className="flex items-start gap-3 mb-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-sm font-bold text-primary">
          {listing.sellerName.slice(0, 1).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="marketplace-listing-title truncate">
            {listing.sellerName}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {listing.title}
          </p>
        </div>
        <span className="marketplace-listing-price shrink-0">
          ₹{hourlyRate}/hr
        </span>
      </div>

      {/* Description */}
      <p className="marketplace-listing-desc text-truncate-2 mb-3">
        {listing.description}
      </p>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {listing.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${tagColor(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="marketplace-listing-footer">
        <StarRating
          avgRating={listing.avgRating}
          reviewCount={listing.reviewCount}
        />
        <button
          type="button"
          className="marketplace-action-btn"
          onClick={handleHire}
          data-ocid={`marketplace.hire_now_button.${index + 1}`}
          aria-label={`Hire ${listing.sellerName}`}
        >
          Hire Now
        </button>
      </div>
    </motion.div>
  );

  if (planTier >= 3) return card;
  return (
    <PaywallTrigger feature="bulk-messages" requiredPlan="pro" asDiv>
      {card}
    </PaywallTrigger>
  );
}

// ─── Create Listing Form ───────────────────────────────────────────────────────

function CreateListingForm({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success("Listing created!", {
      description: "Your service is now live on the marketplace.",
    });
    onClose();
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-ocid="marketplace.create_listing.dialog"
    >
      <motion.div
        className="w-full max-w-lg bg-card rounded-t-2xl p-6 pb-8 shadow-premium"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold font-display">Create Listing</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-fast"
            data-ocid="marketplace.create_listing.close_button"
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="listing-title" className="text-sm font-semibold">
              Title
            </label>
            <input
              id="listing-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Local SEO Setup — Full Package"
              className="h-11 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="marketplace.create_listing.title.input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="listing-description"
              className="text-sm font-semibold"
            >
              Description
            </label>
            <textarea
              id="listing-description"
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What do you offer? What results does the client get?"
              className="px-3 py-2.5 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              data-ocid="marketplace.create_listing.description.textarea"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="listing-price" className="text-sm font-semibold">
                Price (₹)
              </label>
              <input
                id="listing-price"
                type="number"
                required
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 9999"
                className="h-11 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="marketplace.create_listing.price.input"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="listing-tags" className="text-sm font-semibold">
                Tags
              </label>
              <input
                id="listing-tags"
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="seo, local, google"
                className="h-11 px-3 rounded-lg bg-input border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="marketplace.create_listing.tags.input"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              data-ocid="marketplace.create_listing.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 btn-primary-glow"
              disabled={submitting}
              data-ocid="marketplace.create_listing.submit_button"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                  Creating…
                </span>
              ) : (
                "Publish Listing"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Tab definitions ───────────────────────────────────────────────────────────

const TABS: { id: MarketplaceListingType; label: string }[] = [
  { id: "buyLeads", label: "Buy Leads" },
  { id: "sellService", label: "Sell Services" },
  { id: "hireFreelancer", label: "Hire Freelancers" },
];

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const { marketplaceListings } = useAutoAgency();
  const { data: subscription } = useSubscription();
  const [activeTab, setActiveTab] =
    useState<MarketplaceListingType>("buyLeads");
  const [showCreateForm, setShowCreateForm] = useState(false);

  const planTier = getPlanTier(String(subscription?.plan ?? "free"));
  const currentUserId = "user_001"; // mock current user

  const filtered = (marketplaceListings ?? []).filter(
    (l) => l.listingType === activeTab && l.isActive,
  );

  return (
    <div className="min-h-screen bg-background" data-ocid="marketplace.page">
      {/* Page header */}
      <div className="bg-card border-b border-border shadow-subtle px-4 pt-6 pb-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold font-display">Marketplace</h1>
            {activeTab === "sellService" &&
              (planTier >= 3 ? (
                <Button
                  size="sm"
                  className="btn-primary-glow gap-1.5"
                  onClick={() => setShowCreateForm(true)}
                  data-ocid="marketplace.create_listing_button"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Listing
                </Button>
              ) : (
                <PaywallTrigger feature="ai-proposal" requiredPlan="pro" asDiv>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 opacity-60"
                    data-ocid="marketplace.create_listing_button"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Listing
                  </Button>
                </PaywallTrigger>
              ))}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Buy leads, sell services, hire talent
          </p>

          {/* Tab switcher */}
          <div
            className="marketplace-tabs"
            role="tablist"
            aria-label="Marketplace categories"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`marketplace-tab${activeTab === tab.id ? " active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                data-ocid={`marketplace.tab.${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-3xl mx-auto px-4 py-5 mobile-safe-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {/* Tab meta info */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-muted-foreground font-medium">
                {filtered.length} listing{filtered.length !== 1 ? "s" : ""}{" "}
                available
              </p>
              {planTier < 3 && (
                <span className="status-premium inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.1 6.2L22 9.3l-5 4.8L18.2 21 12 17.8 5.8 21 7 14.1l-5-4.8 6.9-1.1z" />
                  </svg>
                  Pro plan to purchase
                </span>
              )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.length === 0 && (
                <EmptyState label="No listings yet — check back soon" />
              )}

              {activeTab === "buyLeads" &&
                filtered.map((listing, i) => (
                  <BuyLeadsCard
                    key={listing.listingId}
                    listing={listing}
                    index={i}
                    planTier={planTier}
                  />
                ))}

              {activeTab === "sellService" &&
                filtered.map((listing, i) => (
                  <SellServiceCard
                    key={listing.listingId}
                    listing={listing}
                    index={i}
                    currentUserId={currentUserId}
                    planTier={planTier}
                  />
                ))}

              {activeTab === "hireFreelancer" &&
                filtered.map((listing, i) => (
                  <HireFreelancerCard
                    key={listing.listingId}
                    listing={listing}
                    index={i}
                    planTier={planTier}
                  />
                ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Create listing form modal */}
      <AnimatePresence>
        {showCreateForm && (
          <CreateListingForm onClose={() => setShowCreateForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
