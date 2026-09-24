'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { type LabSection, type ProcedureStep } from '@/labs/lab-content.types';

// ── Bespoke icons matching design requirements ───────────────────────────────

function AimIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="2.75" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="0.75" fill="currentColor" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function TheoryIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M2.5 3.25C2.5 2.56 3.06 2 3.75 2H7v11.5H3.75C3.06 13.5 2.5 12.94 2.5 12.25V3.25z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M13.5 3.25C13.5 2.56 12.94 2 12.25 2H9v11.5h3.25c.69 0 1.25-.56 1.25-1.25V3.25z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <line x1="4.5" y1="5" x2="5.5" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="4.5" y1="7.5" x2="5.5" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10.5" y1="5" x2="11.5" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10.5" y1="7.5" x2="11.5" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ApparatusIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <rect
        x="1.5"
        y="2.5"
        width="13"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 2.5V1.5M8 2.5V1.5M11.5 2.5V1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <rect
        x="5"
        y="5.5"
        width="6"
        height="5"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path d="M3.5 6.5H5M3.5 8H5M3.5 9.5H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M11 6.5H12.5M11 8H12.5M11 9.5H12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M11 5.5L13.5 3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="13.5" cy="3.2" r="0.8" fill="currentColor" />
    </svg>
  );
}

function ProcedureIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="2" width="4.5" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9.5" y="2" width="4.5" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="2" y="9.5" width="4.5" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <rect x="9.5" y="9.5" width="4.5" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="4.25" cy="4.25" r="0.8" fill="currentColor" />
      <circle cx="11.75" cy="4.25" r="0.8" fill="currentColor" />
      <circle cx="4.25" cy="11.75" r="0.8" fill="currentColor" />
      <circle cx="11.75" cy="11.75" r="0.8" fill="currentColor" />
    </svg>
  );
}

function ObservationsIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <line x1="2" y1="6.5" x2="14" y2="6.5" stroke="currentColor" strokeWidth="1.1" />
      <line x1="6.5" y1="2.5" x2="6.5" y2="13.5" stroke="currentColor" strokeWidth="1.1" />
      <line x1="10.5" y1="6.5" x2="10.5" y2="13.5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function ConclusionIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M5 8.2l2.1 2.1L11 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GenericSectionIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <line x1="5" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="5" y1="10.5" x2="9" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9.25 9.25L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path
        d="M2.5 4.5L6 7.5L9.5 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className={className}>
      <path
        d="M8.5 3L4.5 7L8.5 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className={className}>
      <path
        d="M5.5 3L9.5 7L5.5 11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path
        d="M11 7H3M6.5 3.5L3 7L6.5 10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Tree branch line component ────────────────────────────────────────────────

function TreeBranchLine({ isLast }: { isLast: boolean }) {
  return (
    <div className="w-[18px] shrink-0 self-stretch relative flex items-center">
      {/* Upper vertical line */}
      <div className="absolute left-[7px] top-0 h-1/2 w-[1.5px] bg-black/[0.15]" />
      {/* Lower vertical line (only if not the last step) */}
      {!isLast && (
        <div className="absolute left-[7px] top-1/2 bottom-0 w-[1.5px] bg-black/[0.15]" />
      )}
      {/* Horizontal tick to right */}
      <div
        className="absolute left-[7px] top-1/2 w-[9px] h-[1.5px] bg-black/[0.15]"
        style={{
          borderBottomLeftRadius: isLast ? '3px' : '0px',
        }}
      />
    </div>
  );
}

// ── Icon resolver ─────────────────────────────────────────────────────────────

export function getSectionIcon(section: LabSection) {
  const title = (section.title || '').toLowerCase();
  const id = (section.id || '').toLowerCase();
  const type = section.type;

  if (id === 'aim' || title.includes('aim') || title.includes('objective')) {
    return <AimIcon />;
  }
  if (type === 'apparatus' || id === 'apparatus' || title.includes('apparatus') || title.includes('component')) {
    return <ApparatusIcon />;
  }
  if (type === 'procedure' || id === 'procedure' || title.includes('procedure') || title.includes('step')) {
    return <ProcedureIcon />;
  }
  if (type === 'observation' || id === 'observation' || title.includes('observation') || title.includes('table')) {
    return <ObservationsIcon />;
  }
  if (type === 'conclusion' || id === 'conclusion' || title.includes('conclusion') || title.includes('result')) {
    return <ConclusionIcon />;
  }
  if (id === 'theory' || title.includes('theory') || type === 'text') {
    return <TheoryIcon />;
  }

  return <GenericSectionIcon />;
}

// ── Props ─────────────────────────────────────────────────────────────────────

export type LabSidebarProps = {
  title: string;
  sections: LabSection[];
  activeSectionId: string;
  onSelectSection: (section: LabSection) => void;
  expandedProcedureId: string | null;
  onToggleExpandProcedure: (sectionId: string) => void;
  procedureStepIndex: number;
  onSelectProcedureStep: (stepIndex: number, section: LabSection) => void;
  collapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
};

// ── Main Component ────────────────────────────────────────────────────────────

export function LabSidebar({
  title,
  sections,
  activeSectionId,
  onSelectSection,
  expandedProcedureId,
  onToggleExpandProcedure,
  procedureStepIndex,
  onSelectProcedureStep,
  collapsed,
  onToggleCollapse,
}: LabSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProcedureFlyout, setHoveredProcedureFlyout] = useState<string | null>(null);
  const [manuallyCollapsedIds, setManuallyCollapsedIds] = useState<Record<string, boolean>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut ⌘S / Ctrl+S to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (collapsed) {
          onToggleCollapse(false);
        }
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [collapsed, onToggleCollapse]);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const query = searchQuery.toLowerCase().trim();

    return sections.filter((sec) => {
      if (sec.title.toLowerCase().includes(query)) return true;
      if (sec.type === 'procedure') {
        return (sec.steps || []).some(
          (step) =>
            (step.label || '').toLowerCase().includes(query) ||
            (step.body || '').toLowerCase().includes(query)
        );
      }
      return false;
    });
  }, [sections, searchQuery]);

  return (
    <aside
      className={`shrink-0 my-3 ml-3 flex flex-col bg-white rounded-[20px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] overflow-visible transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] z-40 select-none ${
        collapsed ? 'w-[58px]' : 'w-[264px]'
      }`}
      style={{
        height: 'calc(100dvh - 24px)',
      }}
    >
      {/* ── EXPANDED VIEW ── */}
      {!collapsed && (
        <div className="flex flex-col h-full w-[264px] min-w-[264px] overflow-hidden rounded-[20px]">
          {/* Back button row to /explore */}
          <div className="px-3 pt-3 pb-1 flex items-center">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-[8px] text-[11.5px] font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--color-black-5)] transition-colors group"
              title="Return to Semester Labs (/explore)"
            >
              <BackArrowIcon className="text-[var(--ink-muted)] group-hover:text-[var(--ink)] transition-transform group-hover:-translate-x-0.5" />
              <span>Explore Labs</span>
            </Link>
          </div>

          {/* Experiment Title Card Pill */}
          <div className="mx-3 mt-1 mb-2 px-2.5 py-1.5 rounded-[12px] bg-[#f7f7f8] border border-black/[0.06] flex items-center justify-between gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-[12px] text-[var(--ink-muted)] font-medium shrink-0">
                {'<>'}
              </span>
              <span
                className="text-[12.5px] font-semibold text-[var(--ink)] truncate"
                title={title}
              >
                {title}
              </span>
            </div>

            <button
              onClick={() => onToggleCollapse(true)}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className="shrink-0 w-5 h-5 flex items-center justify-center rounded-[5px] border border-black/[0.08] bg-white text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-black/[0.15] transition-all cursor-pointer p-0"
            >
              <ChevronLeftIcon />
            </button>
          </div>

          {/* Search bar */}
          <div className="mx-3 mb-2 px-2.5 py-1.5 rounded-[10px] border border-black/[0.08] bg-[#fbfbfb] focus-within:bg-white focus-within:border-black/[0.2] focus-within:shadow-[0_0_0_2px_rgba(0,0,0,0.03)] flex items-center gap-2 transition-all">
            <SearchIcon className="text-[var(--ink-muted)] shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="appearance-none bg-transparent border-none outline-none box-border text-[var(--ink)] flex-1 font-sans text-[12px] placeholder:text-[var(--ink-subtle)] p-0 min-w-0"
            />
            <span className="shrink-0 border border-black/[0.08] bg-white rounded-[4px] text-[var(--ink-muted)] font-sans text-[9.5px] font-medium h-[18px] px-1.5 flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.03)]">
              ⌘S
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5 lab-card-scroll">
            {filteredSections.map((section) => {
              const isActive = section.id === activeSectionId;
              const isProcedure = section.type === 'procedure';

              // Expanded logic:
              // If user is searching: always expand.
              // If procedure is active or matches expandedProcedureId: expanded by default unless manually collapsed by user.
              const isManuallyCollapsed = manuallyCollapsedIds[section.id] === true;
              const isExpanded =
                isProcedure &&
                (searchQuery.trim().length > 0 ||
                  ((isActive || expandedProcedureId === section.id) && !isManuallyCollapsed));

              const handleItemClick = () => {
                if (isProcedure) {
                  if (isActive) {
                    // Clicking while already active toggles accordion
                    setManuallyCollapsedIds((prev) => ({
                      ...prev,
                      [section.id]: !isManuallyCollapsed,
                    }));
                    onToggleExpandProcedure(section.id);
                  } else {
                    // Navigating to procedure section: always expand
                    setManuallyCollapsedIds((prev) => ({
                      ...prev,
                      [section.id]: false,
                    }));
                    onSelectSection(section);
                  }
                } else {
                  onSelectSection(section);
                }
              };

              return (
                <div key={section.id} className="relative">
                  <button
                    onClick={handleItemClick}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] font-sans text-[13px] text-left transition-all cursor-pointer border-none outline-none ${
                      isActive
                        ? 'bg-[#f4f4f5] text-[var(--ink)] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.02)]'
                        : 'bg-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-black/[0.03] font-normal'
                    }`}
                  >
                    <span
                      className={`shrink-0 transition-colors ${
                        isActive ? 'text-[var(--ink)]' : 'text-[var(--ink-muted)]'
                      }`}
                    >
                      {getSectionIcon(section)}
                    </span>
                    <span className="truncate flex-1">{section.title}</span>

                    {isProcedure && (
                      <span
                        className="text-[var(--ink-muted)] transition-transform duration-200"
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      >
                        <ChevronDownIcon />
                      </span>
                    )}
                  </button>

                  {/* Procedure Sub-Steps with Tree Lines */}
                  {isProcedure && isExpanded && section.type === 'procedure' && Array.isArray(section.steps) && (
                    <div className="relative pl-3 pr-1 pt-1 pb-1">
                      <div className="flex flex-col space-y-0.5">
                        {section.steps.map((step: ProcedureStep, i: number) => {
                          const isStepActive = isActive && procedureStepIndex === i;
                          const isLast = i === section.steps.length - 1;
                          const stepLabel = step.label || `Step ${i + 1}`;

                          return (
                            <div key={i} className="flex items-center min-h-[28px]">
                              {/* Continuous tree branch */}
                              <TreeBranchLine isLast={isLast} />

                              <button
                                onClick={() => {
                                  onSelectSection(section);
                                  onSelectProcedureStep(i, section);
                                }}
                                title={stepLabel}
                                className={`flex-1 text-left font-sans text-[12px] py-1 px-2 rounded-[6px] truncate transition-all cursor-pointer border-none outline-none ${
                                  isStepActive
                                    ? 'bg-black/[0.06] text-[var(--ink)] font-semibold'
                                    : 'bg-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-black/[0.03]'
                                }`}
                              >
                                {stepLabel}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}

      {/* ── COLLAPSED VIEW (DOCK / RAIL MATCHING IMAGE 1) ── */}
      {collapsed && (
        <div className="flex flex-col items-center h-full w-[58px] py-3 rounded-[20px] relative overflow-visible">
          {/* Back button to /explore */}
          <Link
            href="/explore"
            className="w-9 h-9 flex items-center justify-center rounded-[10px] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--color-black-5)] transition-colors mb-2 cursor-pointer"
            title="Return to Semester Labs (/explore)"
            aria-label="Back to Semester Labs"
          >
            <BackArrowIcon />
          </Link>

          {/* Expand toggle pill */}
          <button
            onClick={() => onToggleCollapse(false)}
            aria-label="Expand sidebar"
            title="Expand sidebar"
            className="w-10 h-7 flex items-center justify-center gap-0.5 rounded-[8px] border border-black/[0.08] bg-[#f7f7f8] hover:bg-white text-[var(--ink-muted)] hover:text-[var(--ink)] transition-all cursor-pointer p-0 mb-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            <span className="font-mono text-[10px] font-semibold">{'<>'}</span>
            <ChevronRightIcon />
          </button>

          {/* Search button */}
          <button
            onClick={() => {
              onToggleCollapse(false);
              setTimeout(() => searchInputRef.current?.focus(), 80);
            }}
            aria-label="Search"
            title="Search (⌘S)"
            className="w-9 h-9 flex items-center justify-center rounded-[10px] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--color-black-5)] transition-colors mb-3 cursor-pointer p-0"
          >
            <SearchIcon />
          </button>

          <div className="w-6 h-[1px] bg-black/[0.08] mb-2" />

          {/* Section icons with unclipped flyout */}
          <div className="flex flex-col items-center space-y-2 px-2 overflow-visible">
            {sections.map((section) => {
              const isActive = section.id === activeSectionId;
              const isProcedure = section.type === 'procedure';
              const showFlyout = isProcedure && (isActive || hoveredProcedureFlyout === section.id);

              return (
                <div
                  key={section.id}
                  className="relative overflow-visible"
                  onMouseEnter={() => {
                    if (isProcedure) setHoveredProcedureFlyout(section.id);
                  }}
                  onMouseLeave={() => {
                    if (isProcedure) setHoveredProcedureFlyout(null);
                  }}
                >
                  <button
                    onClick={() => onSelectSection(section)}
                    aria-label={section.title}
                    title={section.title}
                    className={`w-9 h-9 flex items-center justify-center rounded-[10px] transition-all cursor-pointer border-none outline-none ${
                      isActive
                        ? 'bg-[#f4f4f5] text-[var(--ink)] font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]'
                        : 'bg-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-black/[0.03]'
                    }`}
                  >
                    {getSectionIcon(section)}
                  </button>

                  {/* ── Floating Flyout for Procedure Steps in Collapsed Mode (Image 1) ── */}
                  {showFlyout && Array.isArray((section as any).steps) && (
                    <div
                      className="absolute left-[calc(100%+12px)] top-[-10px] z-[999] bg-white rounded-[16px] border border-black/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.05)] p-3 min-w-[210px] max-w-[270px] pointer-events-auto animate-in fade-in zoom-in-95 duration-150"
                      onMouseEnter={() => setHoveredProcedureFlyout(section.id)}
                      onMouseLeave={() => setHoveredProcedureFlyout(null)}
                    >
                      {/* Subtle connecting notch */}
                      <div className="absolute -left-2 top-4 w-2 h-0.5 bg-black/[0.15]" />

                      <div className="flex flex-col space-y-1">
                        {(section as any).steps.map((step: ProcedureStep, i: number) => {
                          const isStepActive = isActive && procedureStepIndex === i;
                          const isLast = i === (section as any).steps.length - 1;
                          const stepLabel = step.label || `Step ${i + 1}`;

                          return (
                            <div key={i} className="flex items-center min-h-[26px]">
                              {/* Continuous tree branch */}
                              <TreeBranchLine isLast={isLast} />

                              <button
                                onClick={() => {
                                  onSelectSection(section);
                                  onSelectProcedureStep(i, section);
                                }}
                                title={stepLabel}
                                className={`flex-1 text-left font-sans text-[11.5px] py-1 px-2 rounded-[6px] truncate transition-all cursor-pointer border-none outline-none ${
                                  isStepActive
                                    ? 'bg-black/[0.06] text-[var(--ink)] font-semibold'
                                    : 'bg-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-black/[0.03]'
                                }`}
                              >
                                {stepLabel}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
