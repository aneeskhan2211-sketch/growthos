import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useState } from "react";
import { CommandHub } from "../components/command/CommandHub";
import { OnboardingWizard } from "../components/command/OnboardingWizard";
import { useOnboardingPrefs } from "../hooks/usePremium";

export default function CommandCenterPage() {
  const { data: prefs, isLoading } = useOnboardingPrefs();
  const [forceWizard, setForceWizard] = useState(false);

  const handleRestart = useCallback(() => setForceWizard(true), []);
  const handleWizardComplete = useCallback(() => setForceWizard(false), []);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4" data-ocid="command_center.loading_state">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const showWizard = forceWizard || !prefs?.completedOnboarding;

  if (showWizard) {
    return (
      <OnboardingWizard
        initialPrefs={prefs}
        onComplete={handleWizardComplete}
      />
    );
  }

  return <CommandHub prefs={prefs!} onRestartOnboarding={handleRestart} />;
}
