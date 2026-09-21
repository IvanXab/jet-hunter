import { classNames } from "../internal/class-names.js";
import { FOCUS_RING } from "../internal/focus-ring.js";

export interface SideNavItem {
  id: string;
  label: string;
  count?: string;
}

export interface SideNavProps {
  items: readonly SideNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function SideNav({ items, activeId, onSelect }: SideNavProps) {
  return (
    <nav className="flex flex-col">
      {items.map((item) => {
        const active = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            aria-current={active ? "page" : undefined}
            className={`flex cursor-pointer items-center gap-3 border-0 border-b border-line-soft bg-transparent py-3 text-left ${FOCUS_RING}`}
            onClick={() => {
              onSelect(item.id);
            }}
          >
            <span
              aria-hidden="true"
              className={classNames(
                "h-[14px] w-[2px]",
                active ? "bg-accent" : "bg-transparent",
              )}
            />
            <span
              className={classNames(
                "flex-1 font-sans text-control",
                active ? "text-ink" : "text-ink-muted",
              )}
            >
              {item.label}
            </span>
            {item.count === undefined ? null : (
              <span className="font-mono text-label text-ink-muted">
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
