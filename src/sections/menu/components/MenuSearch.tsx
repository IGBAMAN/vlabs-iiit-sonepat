"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { color } from "@/tokens";
import { SEARCH_INDEX } from "@/sections/explore/search-index.data"; // ← swap for your real SEARCH_INDEX export
import { type SearchIndexEntry } from "@/sections/explore/search-index.types";
import { CircuitPreview } from "@/sections/explore/CircuitPreview";

// ─── Icons ─────────────────────────────────────────────────────────────────
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden fill="none" height="1em" viewBox="0 0 14 14" width="1em" className={className}>
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

function FilterIcon() {
  return (
    <svg aria-hidden fill="none" height="14" viewBox="0 0 14 14" width="14">
      <path
        d="M1.5 2.5h11M3.5 7h7M5.5 11.5h3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden fill="none" height="10" viewBox="0 0 10 10">
      <path
        d="M1 1l8 8M9 1l-8 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}

function CircuitIcon() {
  // Generic breadboard-ish placeholder for preview cards without a real thumbnail.
  return (
    <svg aria-hidden fill="none" height="100%" viewBox="0 0 64 40" width="100%">
      <rect
        height="36"
        rx="3"
        stroke={color("black-20")}
        strokeWidth="1"
        width="60"
        x="2"
        y="2"
      />
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle
            cx={7 + col * 5.4}
            cy={7 + row * 5.2}
            fill={color("black-20")}
            key={`${row}-${col}`}
            r="0.8"
          />
        )),
      )}
    </svg>
  );
}

// ─── Text highlighting ───────────────────────────────────────────────────────
function highlight(text: string, query: string): ReactNode {
  if (!query.trim()) return text;
  const idx = text.toLowerCase().indexOf(query.trim().toLowerCase());
  if (idx === -1) return text;
  const end = idx + query.trim().length;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-[3px] bg-[#dcfce7] px-[3px] py-[1px] text-[#15803d]">
        {text.slice(idx, end)}
      </mark>
      {text.slice(end)}
    </>
  );
}

function excerpt(text: string, query: string, radius = 60): string {
  const idx = text.toLowerCase().indexOf(query.trim().toLowerCase());
  if (idx === -1) return text.slice(0, radius * 2);
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + query.length + radius);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

// ─── Grouping ────────────────────────────────────────────────────────────────
interface ResultGroup {
  circuitId: string;
  header: SearchIndexEntry;
  breadcrumb: string;
  snippets: SearchIndexEntry[];
}

function groupMatches(matches: SearchIndexEntry[]): ResultGroup[] {
  const byCircuit = new Map<string, SearchIndexEntry[]>();
  matches.forEach((m) => {
    const arr = byCircuit.get(m.circuitId) ?? [];
    arr.push(m);
    byCircuit.set(m.circuitId, arr);
  });

  const groups: ResultGroup[] = [];
  byCircuit.forEach((entries, circuitId) => {
    const header =
      entries.find((e) => e.section === "Title") ??
      entries.find((e) => e.section === "Description") ??
      entries[0];
    const snippets = entries.filter((e) => e.section !== "Title").slice(0, 3);
    groups.push({
      circuitId,
      header,
      breadcrumb: `${header.semesterLabel} > ${header.subjectTitle}`,
      snippets,
    });
  });

  return groups.slice(0, 8);
}

// ─── Component ────────────────────────────────────────────────────────────────
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedSemesters, setSelectedSemesters] = useState<string[]>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const semesterOptions = useMemo(
    () => Array.from(new Set(SEARCH_INDEX.map((e) => e.semesterLabel))),
    [],
  );

  // Global ⌘K / Ctrl+K toggle, Escape to close.
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setQuery("");
        setActiveIdx(0);
        setFilterMenuOpen(false);
      }, 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter((e) => {
      if (
        selectedSemesters.length &&
        !selectedSemesters.includes(e.semesterLabel)
      )
        return false;
      return (
        e.text.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, selectedSemesters]);

  const groups = useMemo(() => groupMatches(matches), [matches]);

  // Flatten groups into a navigable list: each group header + its snippets.
  const flatItems = useMemo(
    () =>
      groups.flatMap((g) => [
        { group: g, entry: g.header },
        ...g.snippets.map((s) => ({ group: g, entry: s })),
      ]),
    [groups],
  );

  const previewCards = useMemo(() => groups.slice(0, 4), [groups]);

  const navigate = useCallback(
    (entry: SearchIndexEntry) => {
      setOpen(false);
      router.push(entry.labRoute);
    },
    [router],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!flatItems.length) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatItems[activeIdx]) {
        e.preventDefault();
        navigate(flatItems[activeIdx].entry);
      }
    },
    [flatItems, activeIdx, navigate],
  );

  function toggleSemester(label: string) {
    setSelectedSemesters((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
    );
  }

  return (
    <>
      {/* Trigger — sits in the menu bar */}
      <button
        aria-label="Search circuits, labs and components"
        className="flex h-[32px] w-[200px] items-center gap-[8px] rounded-[calc(var(--radius-base)*2)] border border-[var(--line)] bg-transparent px-[12px] text-[var(--ink-subtle)] transition-colors duration-xs ease-[ease] hover:text-[var(--ink-muted)]"
        onClick={() => setOpen(true)}
        type="button"
      >
        <SearchIcon className="text-[0.875rem]" />
        <span className="flex-1 text-left font-sans text-[0.8125rem]">
          Search…
        </span>
        <span className="flex items-center gap-[2px] rounded-[4px] border border-[var(--line)] px-[5px] py-[1px] font-mono text-[0.6875rem] text-[var(--ink-subtle)]">
          ⌘K
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[400] flex items-start justify-center bg-white/20 pt-[12vh] backdrop-blur-[6px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            className="flex max-h-[75vh] w-[min(760px,92vw)] flex-col gap-[12px]"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            {/* Input row */}
            <div 
              className="flex shrink-0 items-center gap-[10px] rounded-[16px] border border-[var(--line)] bg-white px-[20px] py-[14px] shadow-sm"
            >
              <span className="text-[var(--ink-muted)]">
                <SearchIcon className="text-[1.125rem]" />
              </span>
              <input
                ref={inputRef}
                aria-autocomplete="list"
                aria-controls="palette-results"
                aria-expanded={matches.length > 0}
                autoComplete="off"
                className="flex-1 border-none bg-transparent font-sans text-[1rem] text-[var(--ink)] outline-none placeholder:text-[var(--ink-subtle)]"
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIdx(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                role="combobox"
                spellCheck={false}
                value={query}
              />
              <div className="flex items-center gap-[4px]">
                <span className="flex h-[24px] min-w-[24px] items-center justify-center rounded-[6px] border border-[var(--line)] bg-[#f9fafb] px-[6px] font-sans text-[0.8125rem] text-[var(--ink-subtle)] shadow-sm">
                  ⌘
                </span>
                <span className="flex h-[24px] min-w-[24px] items-center justify-center rounded-[6px] border border-[var(--line)] bg-[#f9fafb] px-[6px] font-sans text-[0.8125rem] text-[var(--ink-subtle)] shadow-sm">
                  K
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div 
              className="flex min-h-[400px] flex-1 flex-col overflow-hidden rounded-[16px] border border-[var(--line)] bg-white shadow-lg"
            >
              {/* Filter pills */}
              <div className="relative flex flex-wrap items-center gap-[8px] border-b border-[var(--line)] px-[20px] py-[10px]">
                <span className="font-sans text-[0.75rem] text-[var(--ink-muted)]">
                  Searching For
                </span>
                {selectedSemesters.map((label) => (
                  <span
                    className="flex items-center gap-[6px] rounded-full border border-[var(--line)] bg-[#f3f4f6] px-[10px] py-[4px] font-sans text-[0.75rem] text-[var(--ink)]"
                    key={label}
                  >
                    {label}
                    <button
                      aria-label={`Remove ${label} filter`}
                      onClick={() => toggleSemester(label)}
                      className="text-[var(--ink-subtle)] hover:text-[var(--ink)]"
                      type="button"
                    >
                      <CloseIcon />
                    </button>
                  </span>
                ))}
                <button
                  aria-expanded={filterMenuOpen}
                  className="ml-auto flex h-[24px] w-[24px] items-center justify-center rounded-[4px] text-[var(--ink-subtle)] hover:text-[var(--ink)]"
                  onClick={() => setFilterMenuOpen((o) => !o)}
                  type="button"
                >
                  <FilterIcon />
                </button>

                {filterMenuOpen && (
                  <div
                    className="absolute right-[16px] top-[calc(100%+4px)] z-10 min-w-[160px] rounded-[calc(var(--radius-base)*2)] border border-[var(--line)] bg-[var(--surface)] p-[6px]"
                    style={{
                      boxShadow:
                        "0 4px 6px rgba(0,0,0,0.04), 0 10px 40px rgba(0,0,0,0.10)",
                    }}
                  >
                    {semesterOptions.map((label) => (
                      <button
                        className="flex w-full items-center justify-between rounded-[4px] px-[8px] py-[6px] text-left font-sans text-[0.8125rem] text-[var(--ink)] hover:bg-[var(--color-black-5)]"
                        key={label}
                        onClick={() => {
                          toggleSemester(label);
                          setFilterMenuOpen(false);
                        }}
                        type="button"
                      >
                        {label}
                        {selectedSemesters.includes(label) && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Results */}
              <div
                className="flex-1 overflow-y-auto px-[20px] py-[16px]"
                id="palette-results"
                role="listbox"
              >
                {!query.trim() && (
                  <div className="flex h-full flex-col items-center justify-center py-[32px] text-center opacity-80">
                    <div className="mb-[8px] rounded-full bg-[rgba(0,0,0,0.05)] p-[8px] text-[var(--ink-muted)]">
                      <SearchIcon className="text-[1.125rem]" />
                    </div>
                    <p className="font-sans text-[0.75rem] font-medium text-[var(--ink)]">
                      Search VLabs
                    </p>
                    <p className="mt-[4px] max-w-[240px] font-sans text-[0.6875rem] text-[var(--ink-subtle)]">
                      Find experiments, theories, procedures, and apparatus items across all semesters.
                    </p>
                  </div>
                )}

                {query.trim() && (
                  <p className="mb-[12px] font-sans text-[0.8125rem] text-[var(--ink-muted)]">
                    Results for &ldquo;{query}&rdquo;
                  </p>
                )}

                {query.trim() && groups.length === 0 && (
                  <p className="py-[24px] text-center font-sans text-[0.8125rem] text-[var(--ink-muted)]">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}

                {groups.map((g) => {
                  let runningIdx = flatItems.findIndex(
                    (f) => f.entry.id === g.header.id,
                  );
                  return (
                    <div className="mb-[16px]" key={g.circuitId}>
                      <button
                        className="block w-full rounded-[8px] px-[12px] py-[8px] text-left data-[active]:bg-[#f9fafb] hover:bg-[#f9fafb] transition-colors"
                        data-active={
                          flatItems[activeIdx]?.entry.id === g.header.id
                            ? ""
                            : undefined
                        }
                        onClick={() => navigate(g.header)}
                        onMouseEnter={() => setActiveIdx(runningIdx)}
                        role="option"
                        aria-selected={
                          flatItems[activeIdx]?.entry.id === g.header.id
                        }
                        type="button"
                      >
                        <div className="mb-[2px] font-sans text-[0.625rem] text-[var(--ink-subtle)]">
                          {g.breadcrumb}
                        </div>
                        <div className="font-serif text-[1rem] font-semibold text-[var(--ink)] tracking-tight">
                          {g.header.experimentNumber ? `${g.header.experimentNumber}. ` : ""}
                          {g.header.experimentTitle}
                        </div>
                      </button>

                      {g.snippets.map((s) => {
                        const idx = flatItems.findIndex(
                          (f) => f.entry.id === s.id,
                        );
                        return (
                          <button
                            className="block w-full rounded-[8px] px-[12px] py-[8px] text-left data-[active]:bg-[#f9fafb] hover:bg-[#f9fafb] transition-colors"
                            data-active={
                              flatItems[activeIdx]?.entry.id === s.id
                                ? ""
                                : undefined
                            }
                            key={s.id}
                            onClick={() => navigate(s)}
                            onMouseEnter={() => setActiveIdx(idx)}
                            role="option"
                            aria-selected={
                              flatItems[activeIdx]?.entry.id === s.id
                            }
                            type="button"
                          >
                            <div className="pb-[4px] font-sans text-[0.625rem] text-[var(--ink-subtle)]">
                              {g.breadcrumb} &gt; {g.header.experimentNumber ? `${g.header.experimentNumber}. ` : ""}{g.header.experimentTitle} &gt; {s.section}
                            </div>
                            <div className="border-l-[2px] border-[var(--line)] pl-[10px] font-serif text-[0.8125rem] text-[var(--ink)] text-left leading-relaxed">
                              {highlight(excerpt(s.text, query), query)}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Description preview cards */}
              {previewCards.length > 0 && (
                <div className="border-t border-[var(--line)] px-[20px] py-[14px]">
                  <p className="mb-[10px] font-sans text-[0.8125rem] text-[var(--ink-muted)]">
                    Description
                  </p>
                  <div className="flex gap-[12px] overflow-x-auto pb-[4px]">
                    {previewCards.map((g) => {
                      const desc =
                        g.snippets.find((s) => s.section === "Description")
                          ?.text ?? g.header.text;
                      return (
                        <button
                          className="flex w-[140px] shrink-0 flex-col rounded-[12px] border border-[var(--line)] bg-white p-[6px] text-left shadow-sm transition-all hover:bg-[#f9fafb]"
                          key={g.circuitId}
                          onClick={() => navigate(g.header)}
                          type="button"
                        >
                          <div className="relative h-[76px] w-full overflow-hidden rounded-[8px] bg-[#f9fafb]">
                            <div className="pointer-events-none absolute inset-0">
                              <CircuitPreview circuitId={g.circuitId} />
                            </div>
                          </div>
                          <div className="flex flex-col gap-[2px] px-[2px] pt-[8px]">
                            <span className="font-sans text-[0.75rem] font-medium text-[var(--ink)]">
                              {g.header.experimentTitle}
                            </span>
                            <span className="line-clamp-2 font-sans text-[0.625rem] leading-snug text-[var(--ink-muted)]">
                              {desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="border-t border-[var(--line)] px-[16px] py-[10px] text-center font-sans text-[0.625rem] text-[var(--ink-subtle)]">
                Can&rsquo;t find the experiment you&rsquo;re looking for? Contact{" "}
                <a
                  className="text-[var(--ink-muted)] underline"
                  href="mailto:support@technicalsociety.iiitsonepat.ac.in"
                >
                  support@technicalsociety.iiitsonepat.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
