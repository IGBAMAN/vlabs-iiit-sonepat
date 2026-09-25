"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { type ComponentData } from "./components.data";

// Dynamically import the 3D viewer with SSR disabled
const EceComponentViewer = dynamic(
  () =>
    import("@/labs/previews/EceComponentViewer").then(
      (m) => m.EceComponentViewer,
    ),
  { ssr: false },
);

function BackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 3L5.5 8L10.5 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ComponentShowcase({ data }: { data: ComponentData }) {
  return (
    <div className="flex flex-col min-h-dvh bg-white lg:flex-row overflow-hidden">
      {/* ── Left: 3D Viewer ── */}
      <div className="relative w-full h-[50vh] lg:h-dvh lg:w-[55%] bg-[#f7f6f3] border-b lg:border-b-0 lg:border-r border-[rgba(0,0,0,0.08)] flex-shrink-0">
        <EceComponentViewer
          kind={data.kind}
          background="#f7f6f3"
          autoRotate={true}
          zoom={true}
        />

        {/* Helper overlay */}
        <div className="absolute bottom-[calc(var(--spacing-base)*4)] left-1/2 -translate-x-1/2 text-black/30 font-sans text-[11px] pointer-events-none">
          drag to rotate · scroll or pinch to zoom · double-click to reset
        </div>
      </div>

      {/* ── Right: Info Panel ── */}
      <div className="flex-1 overflow-y-auto w-full lg:w-[45%]">
        <div className="max-w-[600px] mx-auto p-[calc(var(--spacing-base)*6)] lg:p-[calc(var(--spacing-base)*12)]">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors text-[13px] font-sans font-medium mb-[calc(var(--spacing-base)*8)] no-underline"
          >
            <BackIcon />
            Back to Home
          </Link>

          <h1 className="text-[var(--ink)] font-sans text-3xl font-medium tracking-tight m-0 mb-1">
            {data.name}
          </h1>
          <p className="text-[#a8a7a4] font-sans text-[14px] font-medium tracking-wide uppercase m-0 mb-[calc(var(--spacing-base)*8)]">
            {data.tagline}
          </p>

          <div className="flex flex-col gap-[calc(var(--spacing-base)*4)] mb-[calc(var(--spacing-base)*10)]">
            {data.description.map((paragraph, i) => (
              <p
                key={i}
                className="text-[var(--ink-muted)] font-sans text-[14.5px] leading-relaxed m-0"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="text-[var(--ink)] font-sans text-[15px] font-medium mb-[calc(var(--spacing-base)*4)]">
            Specifications
          </h2>
          <div className="border border-[rgba(0,0,0,0.08)] rounded-[calc(var(--radius-base)*3)] overflow-hidden mb-[calc(var(--spacing-base)*10)]">
            <table className="w-full text-left font-sans text-[13.5px]">
              <tbody>
                {data.specs.map((spec, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-b-0 border-[rgba(0,0,0,0.08)]"
                  >
                    <th className="py-3 px-4 bg-[rgba(0,0,0,0.02)] text-[var(--ink-muted)] font-medium w-1/3">
                      {spec.label}
                    </th>
                    <td className="py-3 px-4 text-[var(--ink)]">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-[var(--ink)] font-sans text-[15px] font-medium mb-[calc(var(--spacing-base)*4)]">
            Practical Tips
          </h2>
          <ul className="flex flex-col gap-3 m-0 pl-4">
            {data.tips.map((tip, i) => (
              <li
                key={i}
                className="text-[var(--ink-muted)] font-sans text-[14px] leading-relaxed"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
