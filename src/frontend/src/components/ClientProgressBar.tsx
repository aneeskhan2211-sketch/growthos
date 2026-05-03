import useConversionEngine from "@/hooks/useConversionEngine";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

interface Step {
  id: string;
  label: string;
  icon: string;
  completed: boolean;
}

type StepStatus = "done" | "next" | "future";

function stepStatus(steps: Step[], idx: number): StepStatus {
  if (steps[idx].completed) return "done";
  const prevDone = idx === 0 || steps[idx - 1].completed;
  return prevDone ? "next" : "future";
}

export function ClientProgressBar() {
  const { dailyMessagesUsed } = useConversionEngine();
  const navigate = useNavigate();

  const steps: Step[] = [
    { id: "leads", label: "Leads generated", icon: "🔍", completed: true },
    {
      id: "messages",
      label: "Messages sent",
      icon: "💬",
      completed: dailyMessagesUsed > 0,
    },
    { id: "reply", label: "Reply received", icon: "📩", completed: false },
    { id: "deal", label: "Deal closed", icon: "🤝", completed: false },
  ];

  const completedCount = steps.filter((s) => s.completed).length;
  const completionPct = Math.round((completedCount / 4) * 100);

  const nextStepIdx = steps.findIndex((s) => !s.completed);
  const nextStep = nextStepIdx >= 0 ? steps[nextStepIdx] : null;

  const nextStepRoutes: Record<string, string> = {
    leads: "/leads",
    messages: "/leads",
    reply: "/inbox",
    deal: "/crm",
  };

  const nextStepLabels: Record<string, string> = {
    leads: "Get your first leads",
    messages: "Send first message",
    reply: "Get reply now",
    deal: "Close your first deal",
  };

  const handleNextStep = () => {
    if (!nextStep) return;
    navigate({ to: nextStepRoutes[nextStep.id] as "/" });
  };

  return (
    <div
      data-ocid="client_progress.card"
      className="bg-card rounded-2xl border border-border/40 p-4 space-y-4"
    >
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Your path to your first client
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-start gap-0">
        {steps.map((step, idx) => {
          const status = stepStatus(steps, idx);
          const isLast = idx === steps.length - 1;
          return (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                {/* Icon bubble */}
                <div
                  className={[
                    "w-9 h-9 rounded-full flex items-center justify-center text-[16px] border-2 transition-all duration-300",
                    status === "done"
                      ? "bg-green-100 border-green-400 dark:bg-green-500/15 dark:border-green-500"
                      : status === "next"
                        ? "bg-primary/10 border-primary"
                        : "bg-muted/40 border-border/40",
                  ].join(" ")}
                >
                  {status === "done" ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                      aria-hidden="true"
                    >
                      <polyline points="2 7 5.5 10.5 12 3.5" />
                    </svg>
                  ) : status === "next" ? (
                    <span className="animate-pulse">{step.icon}</span>
                  ) : (
                    <span className="opacity-30">{step.icon}</span>
                  )}
                </div>
                {/* Label */}
                <p
                  className={[
                    "text-[9px] font-semibold text-center leading-tight max-w-[56px]",
                    status === "done"
                      ? "text-green-600 dark:text-green-400"
                      : status === "next"
                        ? "text-primary"
                        : "text-muted-foreground/50",
                  ].join(" ")}
                >
                  {step.label}
                </p>
              </div>
              {/* Connector */}
              {!isLast && (
                <div className="flex-1 h-0.5 mx-1 mb-5 rounded-full bg-border/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-400 dark:bg-green-500 transition-all duration-500"
                    style={{ width: step.completed ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${completionPct}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />
        </div>
        <p className="text-[12px] text-muted-foreground font-medium">
          You are{" "}
          <span className="font-bold text-foreground">{completionPct}%</span>{" "}
          closer to your first client
        </p>
      </div>

      {/* CTA */}
      {nextStep && (
        <motion.button
          type="button"
          data-ocid="client_progress.primary_button"
          onClick={handleNextStep}
          className="w-full h-10 rounded-xl bg-primary/10 border border-primary/30 text-primary text-[13px] font-bold hover:bg-primary/15 transition-colors duration-150 active:scale-[0.98]"
          whileTap={{ scale: 0.98 }}
        >
          {nextStepLabels[nextStep.id]}
        </motion.button>
      )}
    </div>
  );
}
