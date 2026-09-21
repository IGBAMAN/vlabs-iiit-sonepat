'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { color } from '@/tokens';
import { ALL_EXPERIMENTS, type ExploreExperiment } from '@/sections/explore/explore.data';

type SearchResult = ExploreExperiment & { subjectTitle: string; semesterLabel: string };

// ─── Search logic ─────────────────────────────────────────────────────────────
function searchSubjects(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_EXPERIMENTS.filter((s) => {
    return (
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.subjectTitle.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.circuitId.toLowerCase().includes(q)
    );
  }).slice(0, 6);
}

// ─── Slanted input shell ──────────────────────────────────────────────────────
const SEARCH_H = 32;
const BEVEL_W = 15;

// ─── Slant shape paths (same math as ButtonShape) ────────────────────────────
function buildShapePaths(w: number, h: number) {
  const taperH = 15.477;
  const taperTopOffset = 4;
  const straight = Math.max(h - taperTopOffset - taperH, 0);
  const bw = BEVEL_W;

  const stroke = [
    `M4 0.5`,
    `H${w - bw}`,
    `h${bw - 4} a3.5 3.5 0 0 1 3.5 3.5`,
    `v${straight}`,
    `a5.5 5.5 0 0 1 -1.416 3.684`,
    `l-8.547 9.477`,
    `a5.5 5.5 0 0 1 -4.084 1.816`,
    `H4`,
    `a3.5 3.5 0 0 1 -3.5 -3.5`,
    `V4`,
    `a3.5 3.5 0 0 1 3.5 -3.5`,
    `Z`,
  ].join(' ');

  return stroke;
}

// ─── SearchIcon SVG (magnifying glass) ───────────────────────────────────────
function SearchIcon() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M9.5 9.5L12.5 12.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function MenuSearch() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = searchSubjects(query);
  const showOverlay = open && query.trim().length > 0;

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
        setActiveIdx(-1);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Keyboard: Escape closes, arrows navigate, Enter navigates
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
        setActiveIdx(-1);
        inputRef.current?.blur();
        return;
      }
      if (!showOverlay) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, -1));
      } else if (e.key === 'Enter' && activeIdx >= 0) {
        e.preventDefault();
        const hit = results[activeIdx];
        navigate(hit);
      }
    },
    [showOverlay, results, activeIdx],
  );

  function navigate(card: SearchResult) {
    setOpen(false);
    setQuery('');
    setActiveIdx(-1);
    router.push(card.labRoute ?? '/explore');
  }

  // Inline dimensions for the SVG shape border
  const inputW = 200;
  const shapePath = buildShapePaths(inputW, SEARCH_H);

  return (
    <div ref={wrapRef} className="relative flex items-center">
      {/* SearchIconWrap */}
      <span className="absolute left-[10px] top-1/2 -translate-y-1/2 flex shrink-0 items-center text-[var(--ink-muted)] pointer-events-none">
        <SearchIcon />
      </span>

      {/* SearchInput */}
      <input
        ref={inputRef}
        aria-autocomplete="list"
        aria-controls={showOverlay ? 'search-results' : undefined}
        aria-expanded={showOverlay}
        aria-label="Search circuits, labs and components"
        autoComplete="off"
        className="w-[200px] h-[32px] bg-transparent border-none rounded-none font-mono text-[calc(var(--font-base)*3)] font-medium tracking-[0] uppercase outline-none pl-[32px] pr-[12px] text-[var(--ink)] caret-[var(--ink)] transition-[width] duration-md ease-standard placeholder:text-[var(--ink-subtle)] placeholder:font-normal motion-reduce:transition-none"
        onBlur={() => {
          setTimeout(() => {
            if (!wrapRef.current?.contains(document.activeElement)) {
              setOpen(false);
            }
          }, 120);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIdx(-1);
          if (!open) setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="SEARCH"
        role="combobox"
        spellCheck={false}
        value={query}
      />

      {/* Slanted border shape — SVG absolutely positioned over the input */}
      <svg
        className="absolute inset-0 pointer-events-none"
        fill="none"
        height={SEARCH_H}
        viewBox={`0 0 ${inputW} ${SEARCH_H}`}
        width={inputW}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={shapePath}
          stroke={color('black-20')}
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </svg>

      {/* Results dropdown */}
      {showOverlay && (
        <div
          className="absolute left-0 top-[calc(100%+8px)] min-w-[320px] overflow-hidden rounded-[calc(var(--radius-base)*3)] border border-[var(--line)] bg-[var(--surface)] z-modal"
          id="search-results"
          role="listbox"
          style={{
            boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.10)',
          }}
        >
          {results.length === 0 ? (
            <div className="text-center font-sans text-[0.8125rem] text-[var(--ink-muted)] p-[16px]">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((card, i) => (
              <button
                className="flex w-full flex-col items-start gap-[2px] border-none bg-none px-[16px] py-[12px] text-left cursor-pointer transition-[background] duration-xs ease-[ease] hover:bg-[var(--color-black-5)] data-[active]:bg-[var(--color-black-5)] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-[var(--line)]"
                data-active={i === activeIdx ? '' : undefined}
                key={card.id}
                onMouseDown={(e) => {
                  e.preventDefault();
                  navigate(card);
                }}
                onMouseEnter={() => setActiveIdx(i)}
                role="option"
                aria-selected={i === activeIdx}
              >
                <span className="font-sans text-[0.8125rem] font-medium leading-[1.3] text-[var(--ink)]">
                  {card.title}
                </span>
                <span className="font-sans text-[0.75rem] leading-[1.3] text-[var(--ink-muted)]">
                  {card.subjectTitle} · {card.tags.slice(0, 3).join(', ')}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
