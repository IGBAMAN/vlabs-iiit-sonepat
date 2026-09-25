"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import { Body } from "@/ui";

import { CircuitModel } from "./CircuitModel";
import { type ExploreSubject, type ExploreExperiment } from "./explore.data";

// ── Component ─────────────────────────────────────────────────────────────
type Props = {
  subject: ExploreSubject;
  onClose: () => void;
};

export function SubjectModal({ subject, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const activeExp: ExploreExperiment = subject.experiments[activeIndex];

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleOpenLab() {
    if (activeExp.labRoute) {
      router.push(activeExp.labRoute);
    }
  }

  const modal = (
    <div
      className={[
        "fixed inset-0 z-[300] flex items-center justify-center",
        "bg-[rgba(28,28,28,0.55)] backdrop-blur-[4px]",
        "p-[calc(var(--spacing-base)*4)]",
      ].join(" ")}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal
      aria-label={subject.title}
    >
      <div
        className={[
          "relative flex flex-col overflow-hidden bg-white rounded-[4px]",
          "max-h-[calc(100vh-calc(var(--spacing-base)*8))]",
          "max-w-[calc(100vw-calc(var(--spacing-base)*8))]",
          "w-[min(100%,900px)]",
          "min-[921px]:flex-row min-[921px]:min-h-[520px]",
        ].join(" ")}
      >
        {/* Close button */}
        <button
          className={[
            "absolute right-[calc(var(--spacing-base)*2)] top-[calc(var(--spacing-base)*2)]",
            "z-[1] cursor-pointer text-[length:20px] leading-none",
            "p-[calc(var(--spacing-base)*3)]",
            "text-[var(--ink-muted)]",
            "transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            "hover:text-[var(--ink)]",
            "focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-blue)]",
            "focus-visible:outline-offset-2 focus-visible:rounded-[2px]",
            "motion-reduce:transition-none",
            "native-button-reset box-border",
          ].join(" ")}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {/* ── Left: preview of selected experiment ── */}
        <div
          className={[
            "flex flex-col shrink-0 w-full",
            "p-[calc(var(--spacing-base)*6)]",
            "min-[921px]:w-[340px]",
          ].join(" ")}
        >
          <div className="bg-[var(--color-neutral)] border border-[var(--color-black-10)] rounded-[4px] h-[260px] overflow-hidden w-full">
            <CircuitModel circuitId={activeExp.circuitId} />
          </div>

          <div className="flex flex-col gap-[calc(var(--spacing-base)*2)] mt-[calc(var(--spacing-base)*4)]">
            <span className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[13px] font-normal">
              Experiment - {activeIndex + 1}
            </span>
            <h2
              className="text-[var(--ink)] font-[family-name:var(--font-serif),serif] font-normal"
              style={{
                fontSize: "clamp(2.5rem, 1.7453rem + 2.8195vw, 3rem)",
                lineHeight: "clamp(2.875rem, 1.9326rem + 3.5244vw, 3.5rem)",
              }}
            >
              {activeExp.title}
            </h2>
            <Body size="sm" muted>
              {activeExp.description}
            </Body>

            {activeExp.labRoute ? (
              <button
                className={[
                  "native-button-reset box-border w-full text-center cursor-pointer",
                  "bg-[var(--ink)] text-white rounded-[4px]",
                  "font-[family-name:var(--font-sans),sans-serif] text-[13px] font-medium",
                  "mt-[calc(var(--spacing-base)*4)]",
                  "py-[calc(var(--spacing-base)*2.5)] px-[calc(var(--spacing-base)*5)]",
                  "transition-opacity duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:opacity-[0.82]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-blue)] focus-visible:outline-offset-2",
                  "motion-reduce:transition-none",
                ].join(" ")}
                onClick={handleOpenLab}
              >
                Open Lab →
              </button>
            ) : (
              <span
                className={[
                  "inline-block mt-[calc(var(--spacing-base)*3)]",
                  "border border-[var(--color-black-10)] rounded-[20px]",
                  "text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[11px]",
                  "py-[calc(var(--spacing-base)*1)] px-[calc(var(--spacing-base)*3)]",
                ].join(" ")}
              >
                Coming soon
              </span>
            )}
          </div>
        </div>

        {/* ── Right: numbered list of all experiments ── */}
        <div
          className={[
            "flex flex-1 flex-col overflow-y-auto",
            "border-t border-[var(--color-black-10)]",
            "p-[calc(var(--spacing-base)*6)]",
            "min-[921px]:border-l min-[921px]:border-[var(--color-black-10)] min-[921px]:border-t-0",
          ].join(" ")}
        >
          <h2
            className="text-[var(--ink)] font-[family-name:var(--font-serif),serif] font-normal mb-[calc(var(--spacing-base)*4)]"
            style={{
              fontSize: "clamp(2.5rem, 1.7453rem + 2.8195vw, 3rem)",
              lineHeight: "clamp(2.875rem, 1.9326rem + 3.5244vw, 3.5rem)",
            }}
          >
            List of Experiments
          </h2>

          {subject.experiments.map((exp, i) => (
            <div key={exp.id}>
              <button
                className={[
                  "native-button-reset box-border w-full cursor-pointer rounded-[4px]",
                  "flex flex-col gap-[calc(var(--spacing-base)*1)]",
                  "p-[calc(var(--spacing-base)*3)] text-left",
                  "transition-[background] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  i === activeIndex
                    ? "bg-[var(--color-neutral)]"
                    : "bg-transparent",
                  "hover:bg-[var(--color-neutral)]",
                  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-blue)] focus-visible:outline-offset-2",
                  "motion-reduce:transition-none",
                ].join(" ")}
                onClick={() => setActiveIndex(i)}
              >
                <span className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] text-[12px]">
                  Experiment - {i + 1}
                </span>
                <span
                  className="text-[var(--ink)] font-[family-name:var(--font-serif),serif] font-normal"
                  style={{
                    fontSize: "clamp(1.125rem, 0.9372rem + 0.7519vw, 1.375rem)",
                    lineHeight: "clamp(1.5rem, 1.3122rem + 0.7519vw, 1.75rem)",
                  }}
                >
                  {exp.title}
                </span>
              </button>
              {i < subject.experiments.length - 1 && (
                <div className="border-t border-[var(--color-black-10)] mx-[calc(var(--spacing-base)*3)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
