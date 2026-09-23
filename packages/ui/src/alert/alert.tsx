import { type ReactNode } from "react";
import { classNames } from "../internal/class-names.js";

export type AlertTone = "accent" | "neutral";

export interface AlertProps {
  tone?: AlertTone;
  title: string;
  children?: ReactNode;
}

export function Alert({ tone = "accent", title, children }: AlertProps) {
  return (
    <div
      role="status"
      className={classNames(
        "flex flex-col gap-1.5 border-l-2 py-1 pl-4",
        tone === "accent" ? "border-l-accent" : "border-l-line-strong",
      )}
    >
      <div
        className={classNames(
          "text-control font-medium",
          tone === "accent" ? "text-ink" : "text-ink-secondary",
        )}
      >
        {title}
      </div>
      {children === undefined ? null : (
        <div className="text-small text-ink-muted">{children}</div>
      )}
    </div>
  );
}
