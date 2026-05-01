import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Loader2,
  MapPin,
  Sparkles,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  useCompleteOnboarding,
  useSaveOnboardingPrefs,
} from "../../hooks/usePremium";
import type { OnboardingPrefs } from "../../types/premium";
import { EarningsProjection } from "./EarningsProjection";
import { GeneratedLeadsTable } from "./GeneratedLeadsTable";
import { generateMockLeads } from "./mockData";

const NICHES = [
  "Restaurant",
  "Salon",
  "Gym",
  "Retail",
  "Healthcare",
  "Real Estate",
  "Education",
  "Other",
];
const BUDGETS: { label: string; value: number }[] = [
  { label: "₹10,000 / month", value: 10000 },
  { label: "₹25,000 / month", value: 25000 },
  { label: "₹50,000 / month", value: 50000 },
  { label: "₹1,00,000+ / month", value: 100000 },
];

interface Props {
  initialPrefs?: OnboardingPrefs;
  onComplete: () => void;
}

type WizardStep = 1 | 2 | 3 | "generating" | "results";

export function OnboardingWizard({ onComplete }: Props) {
  const [step, setStep] = useState<WizardStep>(1);
  const [niche, setNiche] = useState("");
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState(0);
  const [generatingProgress, setGeneratingProgress] = useState(0);

  const savePrefs = useSaveOnboardingPrefs();
  const completeOnboarding = useCompleteOnboarding();

  const mockLeads = generateMockLeads(niche, city, 50);

  useEffect(() => {
    if (step !== "generating") return;
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 8;
      if (progress >= 100) {
        clearInterval(interval);
        setGeneratingProgress(100);
        setTimeout(() => setStep("results"), 300);
      } else {
        setGeneratingProgress(progress);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [step]);

  const handleGenerate = async () => {
    setStep("generating");
    setGeneratingProgress(0);
    await savePrefs.mutateAsync({
      niche,
      city,
      targetBudget: budget,
      completedOnboarding: false,
    });
  };

  const handleFinish = async () => {
    await completeOnboarding.mutateAsync();
    onComplete();
  };

  const stepLabels = [
    { num: 1, label: "Your Niche", icon: Building2 },
    { num: 2, label: "Your City", icon: MapPin },
    { num: 3, label: "Target Budget", icon: Wallet },
  ];

  return (
    <div
      className="h-full flex items-center justify-center p-6"
      data-ocid="onboarding.page"
    >
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-premium-accent-light border border-border mb-4">
            <Sparkles className="w-3.5 h-3.5 text-premium-accent" />
            <span className="text-xs font-semibold text-premium-accent">
              AI-Powered Setup
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome to GrowthOS Command Center
          </h1>
          <p className="text-muted-foreground">
            Answer 3 questions and we'll generate 50 leads, 3 pitch templates,
            and your first campaign.
          </p>
        </motion.div>

        {/* Step Indicators */}
        {step !== "generating" && step !== "results" && (
          <div className="flex items-center justify-center gap-0 mb-8">
            {stepLabels.map((s, idx) => {
              const stepNum = s.num as WizardStep;
              const isDone = typeof step === "number" && step > s.num;
              const isCurrent = step === stepNum;
              const Icon = s.icon;
              return (
                <div key={s.num} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-smooth ${
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isDone
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span className="text-xs font-semibold hidden sm:block">
                      {s.label}
                    </span>
                  </div>
                  {idx < stepLabels.length - 1 && (
                    <div
                      className={`w-8 h-px mx-1 ${isDone ? "bg-primary/40" : "bg-border"}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepCard key="step1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-premium flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-premium-accent" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    What niche do you serve?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    We'll find businesses that need your services most
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="niche-select" className="text-sm font-medium">
                  Business Niche
                </Label>
                <Select value={niche} onValueChange={setNiche}>
                  <SelectTrigger
                    id="niche-select"
                    data-ocid="onboarding.niche.select"
                    className="h-11"
                  >
                    <SelectValue placeholder="Select a niche..." />
                  </SelectTrigger>
                  <SelectContent>
                    {NICHES.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="w-full mt-6 h-11"
                disabled={!niche}
                onClick={() => setStep(2)}
                data-ocid="onboarding.step1.next_button"
              >
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </StepCard>
          )}

          {step === 2 && (
            <StepCard key="step2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-premium flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-premium-accent" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Which city are you targeting?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    We'll scrape local businesses in your area
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="city-input" className="text-sm font-medium">
                  Target City
                </Label>
                <Input
                  id="city-input"
                  placeholder="e.g. Mumbai, Delhi, Bangalore..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-11"
                  data-ocid="onboarding.city.input"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 h-11"
                  onClick={() => setStep(1)}
                  data-ocid="onboarding.step2.back_button"
                >
                  Back
                </Button>
                <Button
                  className="flex-1 h-11"
                  disabled={!city.trim()}
                  onClick={() => setStep(3)}
                  data-ocid="onboarding.step2.next_button"
                >
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </StepCard>
          )}

          {step === 3 && (
            <StepCard key="step3">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gradient-premium flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-premium-accent" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Target client budget?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    This helps us calculate your earnings potential
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {BUDGETS.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBudget(b.value)}
                    data-ocid={`onboarding.budget.${b.value}`}
                    className={`p-4 rounded-xl border-2 text-left transition-smooth cursor-pointer ${
                      budget === b.value
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/40"
                    }`}
                  >
                    <div className="font-semibold text-sm">{b.label}</div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 h-11"
                  onClick={() => setStep(2)}
                  data-ocid="onboarding.step3.back_button"
                >
                  Back
                </Button>
                <Button
                  className="flex-1 h-11"
                  disabled={!budget}
                  onClick={handleGenerate}
                  data-ocid="onboarding.step3.generate_button"
                >
                  <Sparkles className="w-4 h-4 mr-2" /> Generate My Leads
                </Button>
              </div>
            </StepCard>
          )}

          {step === "generating" && (
            <StepCard key="generating">
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto rounded-2xl gradient-premium flex items-center justify-center mb-4 shadow-premium">
                  <Loader2 className="w-8 h-8 text-premium-accent animate-spin" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Generating your leads...
                </h2>
                <p className="text-muted-foreground mb-6">
                  Scanning {city} for top {niche} businesses
                </p>
                <div className="w-full max-w-xs mx-auto">
                  <div className="progress-bar mb-2">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${generatingProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(generatingProgress)}% complete
                  </p>
                </div>
                <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {generatingProgress > 20 && (
                    <p className="fade-in-item">
                      ✓ Found {niche} businesses in {city}
                    </p>
                  )}
                  {generatingProgress > 50 && (
                    <p className="fade-in-item">
                      ✓ Scoring leads by revenue potential
                    </p>
                  )}
                  {generatingProgress > 75 && (
                    <p className="fade-in-item">
                      ✓ Generating personalized pitches
                    </p>
                  )}
                  {generatingProgress > 90 && (
                    <p className="fade-in-item">✓ Building campaign plan</p>
                  )}
                </div>
              </div>
            </StepCard>
          )}

          {step === "results" && (
            <div key="results" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Leads Generated", value: "50", icon: "🎯" },
                    { label: "Pitch Templates", value: "3", icon: "✉️" },
                    { label: "Campaign Ready", value: "1", icon: "🚀" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-card border border-border rounded-xl p-4 text-center shadow-subtle"
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="font-display text-2xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <EarningsProjection
                  niche={niche}
                  city={city}
                  budget={budget}
                  leadCount={50}
                />

                <GeneratedLeadsTable
                  leads={mockLeads}
                  niche={niche}
                  city={city}
                />

                <Button
                  className="w-full h-12 text-base font-semibold mt-4"
                  onClick={handleFinish}
                  disabled={completeOnboarding.isPending}
                  data-ocid="onboarding.finish_button"
                >
                  {completeOnboarding.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Enter Command Center
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="bg-card border border-border rounded-2xl p-8 shadow-elevated"
    >
      {children}
    </motion.div>
  );
}
