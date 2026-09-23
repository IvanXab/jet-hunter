import { type MouseEvent } from "react";
import { classNames } from "../internal/class-names.js";
import { FOCUS_RING } from "../internal/focus-ring.js";

export interface SideNavItem {
  id: string;
  label: string;
  count?: string;
  href?: string;
}

export interface SideNavProps {
  items: readonly SideNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  label?: string;
}

const ITEM_CLASS = `flex cursor-pointer items-center gap-3 border-0 bg-transparent py-2.5 text-left no-underline ${FOCUS_RING}`;

function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  const hasModifier =
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

  return event.button === 0 && !hasModifier;
}

function SideNavItemContent({
  item,
  active,
}: {
  item: SideNavItem;
  active: boolean;
}) {
  return (
    <>
      <span
        className={classNames(
          "flex-1 font-sans text-large",
          active ? "text-accent" : "text-ink-muted",
        )}
      >
        {item.label}
      </span>
      {item.count === undefined ? null : (
        <span className="font-mono text-label text-ink-muted">
          {item.count}
        </span>
      )}
    </>
  );
}

export function SideNav({ items, activeId, onSelect, label }: SideNavProps) {
  return (
    <nav aria-label={label} className="flex flex-col">
      {items.map((item) => {
        const active = item.id === activeId;
        const content = <SideNavItemContent item={item} active={active} />;

        if (item.href === undefined) {
          return (
            <button
              key={item.id}
              type="button"
              aria-current={active ? "page" : undefined}
              className={ITEM_CLASS}
              onClick={() => {
                onSelect(item.id);
              }}
            >
              {content}
            </button>
          );
        }

        return (
          <a
            key={item.id}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={ITEM_CLASS}
            onClick={(event) => {
              if (!isPlainLeftClick(event)) {
                return;
              }
              event.preventDefault();
              onSelect(item.id);
            }}
          >
            {content}
          </a>
        );
      })}
    </nav>
  );
}
