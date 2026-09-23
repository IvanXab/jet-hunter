import { type ReactNode } from "react";
import { classNames } from "../internal/class-names.js";

export type BadgeTone = "default" | "accent" | "muted" | "disabled";

export interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
}

const TONE_CLASS: Record<BadgeTone, string> = {
  default: "text-ink border-line-strong",
  accent: "text-accent border-accent",
  muted: "text-ink-muted border-line",
  disabled: "text-ink-disabled border-line-faint",
};

export function Badge({ tone = "default", children }: BadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center border px-2.5 py-[5px] font-mono text-micro tracking-caps",
        TONE_CLASS[tone],
      )}
    >
      {children}
    </span>
  );
}
