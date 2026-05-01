import React from "react";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, label: "Sign Up" },
  { number: 2, label: "Verify" },
  { number: 3, label: "Consent" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isCurrent = step.number === currentStep;
        const isFuture = step.number > currentStep;

        return (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center gap-1.5">
              {/* Circle */}
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  text-xs font-semibold transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-accent text-white"
                      : isCurrent
                        ? "bg-accent text-white shadow-[0_0_16px_rgba(91,108,255,0.3)]"
                        : "bg-surface border border-border text-text-muted"
                  }
                `}
              >
                {isCompleted ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              {/* Label */}
              <span
                className={`
                  text-[11px] font-medium transition-colors
                  ${
                    isCompleted
                      ? "text-accent"
                      : isCurrent
                        ? "text-text-primary"
                        : "text-text-muted"
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  w-16 h-[2px] mx-1 mb-5 rounded-full transition-colors
                  ${isCompleted ? "bg-accent" : "bg-border"}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
