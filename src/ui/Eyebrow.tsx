export type EyebrowProps = {
  children: string;
};

export function Eyebrow({ children }: EyebrowProps) {
  return (
    <p className="inline-flex items-center text-start font-[family-name:var(--font-sans),sans-serif] text-lg leading-6 font-medium tracking-[-0.04em] text-[color:var(--ink-muted)] gap-2">
      <span
        className="h-[7px] w-[14px] shrink-0 rounded-[1px] bg-[var(--color-blue)]"
        aria-hidden
      />
      {children}
    </p>
  );
}
