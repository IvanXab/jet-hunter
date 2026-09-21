import { classNames } from "../internal/class-names.js";
import { FOCUS_RING } from "../internal/focus-ring.js";
import { buildPaginationItems } from "../internal/pagination-items.js";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  return (
    <nav className="flex items-center gap-1.5">
      {buildPaginationItems(page, pageCount).map((item) =>
        item.kind === "gap" ? (
          <span
            className="min-w-8 text-center font-mono text-caption text-ink-muted"
            key={item.id}
          >
            …
          </span>
        ) : (
          <button
            key={item.page}
            type="button"
            aria-current={item.page === page ? "page" : undefined}
            className={classNames(
              "h-8 min-w-8 cursor-pointer border px-1.5 font-mono text-caption",
              FOCUS_RING,
              item.page === page
                ? "border-line-strong bg-line-soft text-ink"
                : "border-line-faint bg-transparent text-ink-muted",
            )}
            onClick={() => {
              onPageChange(item.page);
            }}
          >
            {item.page}
          </button>
        ),
      )}
    </nav>
  );
}
