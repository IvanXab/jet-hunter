import { type ReactNode } from "react";

export interface ChipProps {
  children: ReactNode;
}

export function Chip({ children }: ChipProps) {
  return (
    <span className="inline-flex items-center border border-line px-3 py-1.5 text-caption text-ink-secondary">
      {children}
    </span>
  );
}
