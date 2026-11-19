import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

export type ProgressOrientation = 'horizontal' | 'vertical';
export type ProgressMode = 'controlled' | 'steps' | 'scroll';

export interface ProgressBarProps {
  value?: number; // 0 to 100 (for controlled mode)
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  orientation?: ProgressOrientation;
  mode?: ProgressMode;
  currentStep?: number;
  totalSteps?: number;
  targetRef?: React.RefObject<HTMLElement | null>;
  trackColor?: string;
  fillColor?: string;
  thickness?: number; // in px
  height?: number | string; // for vertical mode
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  label,
  showPercentage = true,
  size = 'md',
  orientation = 'horizontal',
  mode = 'controlled',
  currentStep = 1,
  totalSteps = 4,
  targetRef,
  trackColor,
  fillColor,
  thickness,
  height = 180,
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Passive scroll progress tracking
  useEffect(() => {
    if (mode !== 'scroll') return;

    const calculateScroll = () => {
      if (targetRef && targetRef.current) {
        const el = targetRef.current;
        const total = el.scrollHeight - el.clientHeight;
        if (total <= 0) {
          setScrollProgress(0);
          return;
        }
        const current = el.scrollTop;
        const pct = Math.min(100, Math.max(0, (current / total) * 100));
        setScrollProgress(pct);
      } else {
        const win = window;
        const doc = document.documentElement;
        const total = doc.scrollHeight - win.innerHeight;
        if (total <= 0) {
          setScrollProgress(0);
          return;
        }
        const current = win.scrollY || doc.scrollTop;
        const pct = Math.min(100, Math.max(0, (current / total) * 100));
        setScrollProgress(pct);
      }
    };

    calculateScroll();
    const targetElement = targetRef?.current || window;
    targetElement.addEventListener('scroll', calculateScroll, { passive: true });

    return () => {
      targetElement.removeEventListener('scroll', calculateScroll);
    };
  }, [mode, targetRef]);

  // Compute final fill percentage
  let computedPercentage = value;
  if (mode === 'steps') {
    computedPercentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  } else if (mode === 'scroll') {
    computedPercentage = scrollProgress;
  }

  const clampedValue = Math.min(100, Math.max(0, computedPercentage));

  const horizontalThickness = thickness ? `${thickness}px` : size === 'sm' ? '6px' : size === 'lg' ? '16px' : '10px';
  const verticalThickness = thickness ? `${thickness}px` : size === 'sm' ? '14px' : size === 'lg' ? '28px' : '20px';

  // Vertical orientation layout
  if (orientation === 'vertical') {
    const containerHeight = typeof height === 'number' ? `${height}px` : height;

    return (
      <div className={`inline-flex flex-col items-center gap-2 select-none ${className}`}>
        {/* Track Container */}
        <div
          className="relative overflow-hidden flex flex-col justify-end"
          style={{
            height: containerHeight,
            width: verticalThickness,
            borderRadius: 'var(--theme-radius-sm, 9999px)',
            backgroundColor: trackColor || 'var(--theme-surface-alt, rgba(0, 0, 0, 0.12))',
            boxShadow: 'var(--theme-input-shadow, inset 0 1px 3px rgba(0,0,0,0.15))',
          }}
        >
          {/* Fill Bar from bottom to top */}
          <div
            className="w-full transition-all duration-200 ease-out flex items-center justify-center"
            style={{
              height: `${clampedValue}%`,
              borderRadius: 'var(--theme-radius-sm, 9999px)',
              background: fillColor || 'var(--theme-primary-bg, var(--theme-accent, #3B82F6))',
              boxShadow: 'var(--theme-primary-shadow)',
            }}
          />
        </div>

        {/* Labels below */}
        {(label || showPercentage) && (
          <div className="flex flex-col items-center text-center">
            {showPercentage && (
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: 'var(--theme-text)' }}
              >
                {Math.round(clampedValue)}%
              </span>
            )}
            {label && (
              <span
                className="text-[11px] font-medium mt-0.5"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                {label}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Horizontal orientation layout
  return (
    <div className={`w-full flex flex-col gap-1.5 text-left ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs">
          {label && (
            <span
              className="font-medium"
              style={{ color: 'var(--theme-text)' }}
            >
              {label}
            </span>
          )}
          {showPercentage && (
            <span
              className="font-mono font-medium"
              style={{ color: 'var(--theme-text-muted)' }}
            >
              {Math.round(clampedValue)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Track */}
      <div
        className="w-full overflow-hidden"
        style={{
          height: horizontalThickness,
          borderRadius: 'var(--theme-radius-sm, 9999px)',
          backgroundColor: trackColor || 'var(--theme-surface-alt, rgba(0, 0, 0, 0.1))',
          boxShadow: 'var(--theme-input-shadow, inset 0 1px 2px rgba(0,0,0,0.1))',
        }}
      >
        <div
          className="h-full transition-all duration-200 ease-out"
          style={{
            width: `${clampedValue}%`,
            borderRadius: 'var(--theme-radius-sm, 9999px)',
            background: fillColor || 'var(--theme-primary-bg, var(--theme-accent, #3B82F6))',
            boxShadow: 'var(--theme-primary-shadow)',
          }}
        />
      </div>
    </div>
  );
};

export interface StepItem {
  id: string;
  title: string;
  subtitle?: string;
}

export interface StepTrackerProps {
  steps: StepItem[];
  currentStep: number; // 0-based index
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const StepTracker: React.FC<StepTrackerProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`w-full text-left ${className}`}>
      <div className="relative flex items-center justify-between">
        {/* Connecting track line */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 z-0"
          style={{
            backgroundColor: 'var(--theme-border, #E5E7EB)',
          }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
              onClick={() => onStepClick?.(idx)}
            >
              <div
                className="w-7 h-7 flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  borderRadius: 'var(--theme-radius-sm, 9999px)',
                  border: '2px solid var(--theme-border, #E5E7EB)',
                  backgroundColor:
                    isCompleted || isCurrent
                      ? 'var(--theme-primary-bg, #3B82F6)'
                      : 'var(--theme-surface, #FFFFFF)',
                  color:
                    isCompleted || isCurrent
                      ? 'var(--theme-primary-text, #FFFFFF)'
                      : 'var(--theme-text-muted, #6B7280)',
                  boxShadow: isCurrent
                    ? 'var(--theme-shadow-hover)'
                    : 'var(--theme-shadow-surface)',
                }}
              >
                {isCompleted ? <Check size={14} strokeWidth={3} /> : idx + 1}
              </div>

              <div className="mt-2 text-center">
                <div
                  className="text-xs font-semibold"
                  style={{
                    color: isCurrent
                      ? 'var(--theme-text)'
                      : 'var(--theme-text-muted)',
                  }}
                >
                  {step.title}
                </div>
                {step.subtitle && (
                  <div
                    className="text-[10px] hidden sm:block"
                    style={{ color: 'var(--theme-text-muted)' }}
                  >
                    {step.subtitle}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
