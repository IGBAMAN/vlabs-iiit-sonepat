"use client";

import { useState } from "react";

import { spacing } from "@/tokens";
import { Container } from "@/ui/Container";

import { SubjectCard } from "./SubjectCard";
import { SubjectModal } from "./SubjectModal";
import { type ExploreSemester, type ExploreSubject } from "./explore.data";

// ── Chevron icon ──────────────────────────────────────────────────────────
function Chevron() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// ── Single semester block ─────────────────────────────────────────────────
function SemesterItem({
  semester,
  defaultOpen,
  onSubjectClick,
}: {
  semester: ExploreSemester;
  defaultOpen: boolean;
  onSubjectClick: (subject: ExploreSubject) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="flex flex-col">
      <button
        className={[
          "flex items-center w-full bg-transparent border-none cursor-pointer",
          "gap-[calc(var(--spacing-base)*4)] justify-between text-left",
          "pt-[calc(var(--spacing-base)*5)] pb-[calc(var(--spacing-base)*4)]",
          "focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--color-blue)]",
          "focus-visible:outline-offset-2 focus-visible:rounded-[4px]",
        ].join(" ")}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className="text-[var(--ink-muted)] font-[family-name:var(--font-sans),sans-serif] font-normal"
          style={{
            fontSize: "clamp(2.5rem, 1.7453rem + 2.8195vw, 3rem)",
            lineHeight: "clamp(2.875rem, 1.9326rem + 3.5244vw, 3.5rem)",
          }}
        >
          {semester.label}
        </span>
        <span
          className={[
            "flex shrink-0 text-[var(--ink-muted)]",
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "motion-reduce:transition-none",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
          aria-hidden
        >
          <Chevron />
        </span>
      </button>

      {open && (
        <div
          className={[
            "grid gap-[calc(var(--spacing-base)*6)] grid-cols-1",
            "pb-[calc(var(--spacing-base)*2)]",
            "min-[921px]:grid-cols-3",
          ].join(" ")}
        >
          {semester.subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={onSubjectClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Exported section ──────────────────────────────────────────────────────
type Props = { semesters: readonly ExploreSemester[] };

export function SemesterAccordion({ semesters }: Props) {
  const [activeSubject, setActiveSubject] = useState<ExploreSubject | null>(
    null,
  );

  return (
    <>
      <section
        className="flex flex-col gap-[calc(var(--spacing-base)*6)] pb-[calc(var(--spacing-base)*20)]"
        aria-label="Explore by semester"
      >
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: spacing(2),
            }}
          >
            {semesters.map((semester, index) => (
              <SemesterItem
                key={semester.id}
                semester={semester}
                defaultOpen={index === 0}
                onSubjectClick={setActiveSubject}
              />
            ))}
          </div>
        </Container>
      </section>

      {activeSubject && (
        <SubjectModal
          subject={activeSubject}
          onClose={() => setActiveSubject(null)}
        />
      )}
    </>
  );
}
