import { type ReactNode } from "react";

import { classNames } from "../internal/class-names.js";
import { FOCUS_RING } from "../internal/focus-ring.js";

export interface TopNavItem {
  id: string;
  label: string;
}

export interface TopNavProps {
  brand: string;
  items: readonly TopNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  actions?: ReactNode;
}

export function TopNav({
  brand,
  items,
  activeId,
  onSelect,
  actions,
}: TopNavProps) {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-6 border border-line px-[22px] py-4">
      <div className="flex flex-wrap items-center gap-7">
        <div className="flex items-center gap-3 text-large font-medium text-ink">
          <span
            aria-hidden="true"
            className="size-2.5 rotate-45 border border-ink"
          />
          <span>{brand}</span>
        </div>
        <div className="flex flex-wrap gap-[22px]">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={item.id === activeId ? "page" : undefined}
              className={classNames(
                "cursor-pointer border-0 border-b bg-transparent pb-[3px] font-sans text-control",
                FOCUS_RING,
                item.id === activeId
                  ? "border-b-accent text-ink"
                  : "border-b-transparent text-ink-muted",
              )}
              onClick={() => {
                onSelect(item.id);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {actions === undefined ? null : (
        <div className="flex items-center gap-3">{actions}</div>
      )}
    </nav>
  );
}
