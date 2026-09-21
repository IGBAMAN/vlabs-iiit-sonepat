'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

import { MathText } from '@/ui/Math';
import { StreamingTheoryParagraphs } from '@/ui/StreamingMathText';
import { ALL_CIRCUITS } from '@/labs/circuits';
import {
  type LabContent,
  type LabSection,
  type ProcedureStep,
  type TheorySection,
  type ApparatusSection,
  type ObservationSection,
  type ConclusionSection,
} from '@/labs/lab-content.types';
import { FloatingLabCard } from '@/labs/FloatingLabCard';
import {
  resolveFinalCircuitStepIndex,
  resolveProcedureCircuitStepIndex,
} from '@/labs/resolve-circuit-step-index';
import { type Circuit } from '@/labs/types';
import { type StepMarker } from '@/labs/LabScene';

// ── Dynamic imports (all client-only Three.js) ────────────────────────────
const LabSceneCanvas = dynamic(
  () => import('@/labs/LabScene').then((m) => m.LabSceneCanvas),
  { ssr: false },
);
const TheoryScene = dynamic(
  () => import('@/labs/TheoryScene').then((m) => m.TheoryScene),
  { ssr: false },
);
const ApparatusScene = dynamic(
  () => import('@/labs/ApparatusScene').then((m) => m.ApparatusScene),
  { ssr: false },
);
const CodeLabPage = dynamic(
  () => import('@/labs/CodeLabPage').then((m) => m.CodeLabPage),
  { ssr: false },
);
const SimLabPage = dynamic(
  () => import('@/labs/SimLabPage').then((m) => m.SimLabPage),
  { ssr: false },
);

// ── Fallback circuit ───────────────────────────────────────────────────────
const BREADBOARD_ONLY: Circuit = {
  id: '__breadboard', title: '', description: '',
  components: [{ id: 'bb', type: 'breadboard' }],
  steps: [{ title: '', body: '', show: ['bb'] }],
};

// ── Icons ─────────────────────────────────────────────────────────────────
function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2"/>
    </svg>
  );
}
function CollapseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 2L5 7L9 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 2L9 7L5 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const PARAGRAPH_CLASS =
  'text-[var(--ink)] font-sans text-[13.5px] leading-[1.7] m-0 [&+&]:mt-[calc(var(--spacing-base)*3)]';

function contentStreamKey(section: LabSection, procedureStepIndex: number): string {
  if (section.type === 'procedure') return `${section.id}:${procedureStepIndex}`;
  return section.id;
}

// ── Floating card content per section type ────────────────────────────────
function FloatingCardContent({ section, procedureStepIndex }: {
  section: LabSection;
  procedureStepIndex: number;
}) {
  const streamKey = contentStreamKey(section, procedureStepIndex);

  if (section.type === 'text') {
    return (
      <StreamingTheoryParagraphs
        key={streamKey}
        streamKey={streamKey}
        paragraphs={section.paragraphs}
        paragraphClassName={PARAGRAPH_CLASS}
      />
    );
  }

  if (section.type === 'apparatus') {
    return (
      <>
        <p className="text-[var(--ink)] font-sans text-[13.5px] leading-[1.7] m-0">
          Use the arrows or dots below to inspect each component in 3D.
        </p>
        <div className="flex flex-col gap-[calc(var(--spacing-base)*1.5)] mt-[calc(var(--spacing-base)*3)]">
          {section.items.map((item, i) => (
            <div key={i} className="flex gap-[calc(var(--spacing-base)*3)]">
              <span className="text-[#e6502e] shrink-0 text-[18px] leading-[1.3]">·</span>
              <div>
                <span className="text-[var(--ink)] font-sans text-[13px] font-medium">
                  <MathText text={item.name} />
                </span>
                {item.specification && (
                  <> — <span className="text-[var(--ink-muted)] font-sans text-[12px]"><MathText text={item.specification} /></span></>
                )}
                {item.quantity && <span className="text-[var(--ink-muted)] font-sans text-[12px]"> ×{item.quantity}</span>}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (section.type === 'procedure') {
    const step = section.steps[procedureStepIndex];
    if (!step) return <p className={PARAGRAPH_CLASS}>Select a step to begin.</p>;
    return (
      <StreamingTheoryParagraphs
        key={streamKey}
        streamKey={streamKey}
        paragraphs={step.body.split('\n').filter((line) => line.length > 0)}
        paragraphClassName={PARAGRAPH_CLASS}
      />
    );
  }

  if (section.type === 'observation') {
    return (
      <>
        {section.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[var(--ink)] font-sans text-[13.5px] leading-[1.7] m-0 [&+&]:mt-[calc(var(--spacing-base)*3)]"
          >
            <MathText text={p} />
          </p>
        ))}
        {section.table && (
          <table className="border-collapse font-sans text-[12.5px] mt-[calc(var(--spacing-base)*4)] w-full">
            <thead>
              <tr>{section.table.headers.map((h) => (
                <th
                  key={h}
                  className="border-b border-[var(--color-black-10)] text-[var(--ink-muted)] text-[11px] font-medium tracking-[0.04em] px-[calc(var(--spacing-base)*2)] py-[calc(var(--spacing-base)*1.5)] text-left uppercase"
                >
                  <MathText text={h} />
                </th>
              ))}</tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="border-b border-[var(--color-black-10)] text-[var(--ink)] px-[calc(var(--spacing-base)*2)] py-[calc(var(--spacing-base)*1.5)]"
                  >
                    <MathText text={String(cell)} />
                  </td>
                ))}</tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }

  if (section.type === 'conclusion') {
    return (
      <>
        {section.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-[var(--ink)] font-sans text-[13.5px] leading-[1.7] m-0 [&+&]:mt-[calc(var(--spacing-base)*3)]"
          >
            <MathText text={p} />
          </p>
        ))}
      </>
    );
  }

  return null;
}

// ── Scene renderer per section type ──────────────────────────────────────
function SceneRenderer({ section, circuit, sceneStepIndex, activeMarkers }: {
  section: LabSection;
  circuit: Circuit;
  sceneStepIndex: number;
  activeMarkers: StepMarker[];
}) {
  if (section.type === 'code-lab' || section.type === 'simulation') {
    return null; // These sections are handled by CodeLabPage/SimLabPage directly
  }
  if (section.type === 'text' && section.schematic) {
    return <TheoryScene spec={section.schematic} />;
  }
  if (section.type === 'apparatus') {
    return <ApparatusScene items={section.items} />;
  }
  // For text-only labs (labType === 'text'), do not render a bare breadboard
  // when there is no real circuit — return null so sections show cleanly.
  if (circuit.id === '__breadboard' && section.type !== 'text' && section.type !== 'apparatus') {
    return null;
  }
  // Procedure / observation / conclusion / theory without schematic: show breadboard
  return (
    <LabSceneCanvas
      circuit={circuit}
      activeStepIndex={sceneStepIndex}
      markers={activeMarkers}
    />
  );
}

// ── Main component ─────────────────────────────────────────────────────────
type Props = { content: LabContent };

export function LabPage({ content }: Props) {
  if (content.labType === 'code') return <CodeLabPage content={content} />;
  if (content.labType === 'simulation') return <SimLabPage content={content} />;

  const [collapsed, setCollapsed] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(content.sections[0]?.id ?? '');
  const [expandedProcedureId, setExpandedProcedureId] = useState<string | null>(
    content.sections.find((s) => s.type === 'procedure')?.id ?? null,
  );
  const [procedureStepIndex, setProcedureStepIndex] = useState(0);

  const activeSection = content.sections.find((s) => s.id === activeSectionId) ?? content.sections[0];

  const circuit: Circuit = ALL_CIRCUITS.find((c) => c.id === content.circuitId) ?? BREADBOARD_ONLY;

  const { sceneStepIndex, activeMarkers } = (() => {
    if (activeSection?.type === 'procedure') {
      const step = activeSection.steps[procedureStepIndex];
      if (!step) {
        return {
          sceneStepIndex: resolveFinalCircuitStepIndex(circuit),
          activeMarkers: [] as StepMarker[],
        };
      }
      return {
        sceneStepIndex: resolveProcedureCircuitStepIndex(circuit, procedureStepIndex),
        activeMarkers: step.markers ?? [],
      };
    }

    if (activeSection?.type === 'observation' || activeSection?.type === 'conclusion') {
      return {
        sceneStepIndex: resolveFinalCircuitStepIndex(circuit),
        activeMarkers: [] as StepMarker[],
      };
    }

    return { sceneStepIndex: 0, activeMarkers: [] as StepMarker[] };
  })();

  const handleSectionClick = useCallback((section: LabSection) => {
    setActiveSectionId(section.id);
    if (section.type === 'procedure') {
      setExpandedProcedureId((prev) => (prev === section.id ? null : section.id));
    }
  }, []);

  return (
    <div className="flex h-dvh overflow-hidden bg-[var(--color-neutral)]">
      {/* ── Sidebar ── */}
      <aside
        className="bg-white border-r border-[var(--color-black-10)] flex flex-col shrink-0 overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ width: collapsed ? '0px' : '248px' }}
      >
        {/* Sidebar header */}
        <div className="flex items-center border-b border-[var(--color-black-10)] shrink-0 gap-[calc(var(--spacing-base)*2)] min-h-[52px] px-[calc(var(--spacing-base)*3)] whitespace-nowrap">
          <span className="text-[var(--ink-muted)] font-mono text-[14px]">{'<>'}</span>
          <span className="text-[var(--ink)] font-sans text-[13px] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
            {content.title}
          </span>
          <button
            onClick={() => setCollapsed(true)}
            aria-label="Collapse"
            className="appearance-none bg-transparent items-center border border-[var(--color-black-10)] rounded-[4px] text-[var(--ink-muted)] cursor-pointer flex h-6 justify-center ml-auto transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] w-6 hover:text-[var(--ink)] motion-reduce:transition-none p-0"
          >
            <CollapseIcon />
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center border-b border-[var(--color-black-10)] shrink-0 gap-[calc(var(--spacing-base)*2)] py-[calc(var(--spacing-base)*2)] px-[calc(var(--spacing-base)*3)]">
          <SearchIcon />
          <input
            placeholder="Search"
            className="appearance-none bg-transparent border-none outline-none box-border text-[var(--ink)] flex-1 font-sans text-[12px] placeholder:text-[var(--ink-subtle)] p-0"
          />
          <div className="border border-[var(--color-black-10)] rounded-[3px] text-[var(--ink-muted)] font-sans text-[10px] h-[18px] px-1">
            ⌘S
          </div>
        </div>

        {/* Section nav */}
        <nav className="flex flex-col overflow-y-auto py-[calc(var(--spacing-base)*2)]">
          {content.sections.map((section) => {
            const isActive    = section.id === activeSectionId;
            const isExpanded  = section.id === expandedProcedureId;
            const isProcedure = section.type === 'procedure';
            return (
              <div key={section.id}>
                <button
                  className={`appearance-none bg-transparent border-none outline-none items-center box-border cursor-pointer flex font-sans text-[13.5px] gap-[calc(var(--spacing-base)*3)] py-[calc(var(--spacing-base)*2.5)] px-[calc(var(--spacing-base)*4)] transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap w-full hover:text-[var(--ink)] motion-reduce:transition-none p-0 ${
                    isActive ? 'text-[var(--ink)] font-medium' : 'text-[var(--ink-muted)] font-normal'
                  }`}
                  style={{ padding: `calc(var(--spacing-base) * 2.5) calc(var(--spacing-base) * 4)` }}
                  onClick={() => handleSectionClick(section)}
                >
                  <GridIcon />
                  {section.title}
                  {isProcedure && (
                    <span
                      className="text-[var(--ink-muted)] flex ml-auto transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                      style={{ transform: `rotate(${isExpanded ? '180deg' : '0deg'})` }}
                    >
                      <ChevronDownIcon />
                    </span>
                  )}
                </button>
                {isProcedure && isExpanded && section.type === 'procedure' && (
                  <div className="flex flex-col pb-[calc(var(--spacing-base)*1)]">
                    {section.steps.map((step: ProcedureStep, i: number) => (
                      <button
                        key={i}
                        className={`appearance-none border-none outline-none box-border text-[var(--ink-muted)] cursor-pointer block font-sans text-[12px] overflow-hidden text-left text-ellipsis transition-[background] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap w-full before:content-['–_'] before:text-[var(--ink-subtle)] hover:bg-[var(--color-black-5)] motion-reduce:transition-none ${
                          isActive && procedureStepIndex === i ? 'bg-[var(--color-black-5)]' : 'bg-transparent'
                        }`}
                        style={{ padding: `calc(var(--spacing-base) * 1.5) calc(var(--spacing-base) * 4) calc(var(--spacing-base) * 1.5) calc(var(--spacing-base) * 11)` }}
                        onClick={() => { setActiveSectionId(section.id); setProcedureStepIndex(i); }}
                      >
                        {step.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* ── Scene area (always full screen) ── */}
      <div className="flex-1 min-w-0 overflow-hidden relative">
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            className="appearance-none items-center bg-white border border-[var(--color-black-10)] rounded-[4px] text-[var(--ink-muted)] cursor-pointer flex h-7 justify-center absolute transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] w-7 z-[100] hover:text-[var(--ink)] motion-reduce:transition-none p-0"
            style={{ left: 'calc(var(--spacing-base) * 3)', top: 'calc(var(--spacing-base) * 3)' }}
          >
            <ExpandIcon />
          </button>
        )}

        {/* Scene fills the full area */}
        {activeSection && (
          <SceneRenderer
            section={activeSection}
            circuit={circuit}
            sceneStepIndex={sceneStepIndex}
            activeMarkers={activeMarkers}
          />
        )}

        {/* Floating text card over scene */}
        {activeSection && (
          <FloatingLabCard>
            <FloatingCardContent
              key={contentStreamKey(activeSection, procedureStepIndex)}
              section={activeSection}
              procedureStepIndex={procedureStepIndex}
            />
          </FloatingLabCard>
        )}
      </div>
    </div>
  );
}
