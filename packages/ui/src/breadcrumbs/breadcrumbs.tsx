import { FOCUS_RING } from "../internal/focus-ring.js";

export interface BreadcrumbItem {
  id: string;
  label: string;
  onSelect?: () => void;
}

export interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const lastIndex = items.length - 1;

  return (
    <nav className="flex flex-wrap items-center gap-3 text-small">
      {items.map((item, index) => (
        <span className="flex items-center gap-3" key={item.id}>
          {index === lastIndex || item.onSelect === undefined ? (
            <span
              className="text-ink"
              aria-current={index === lastIndex ? "page" : undefined}
            >
              {item.label}
            </span>
          ) : (
            <button
              type="button"
              className={`cursor-pointer border-0 bg-transparent p-0 font-sans text-small text-ink-muted hover:text-ink ${FOCUS_RING}`}
              onClick={item.onSelect}
            >
              {item.label}
            </button>
          )}
          {index === lastIndex ? null : (
            <span className="text-ink-disabled" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
