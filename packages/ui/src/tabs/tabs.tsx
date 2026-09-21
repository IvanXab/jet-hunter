import { classNames } from "../internal/class-names.js";
import { FOCUS_RING } from "../internal/focus-ring.js";

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  items: readonly TabItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function Tabs({ items, activeId, onSelect }: TabsProps) {
  return (
    <div className="flex border border-line" role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={item.id === activeId}
          className={classNames(
            "flex-1 cursor-pointer border-0 px-1.5 py-3 font-sans text-small font-medium",
            FOCUS_RING,
            item.id === activeId
              ? "bg-line-soft text-ink"
              : "bg-transparent text-ink-muted",
          )}
          onClick={() => {
            onSelect(item.id);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
