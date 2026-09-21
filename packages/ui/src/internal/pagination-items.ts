export type PaginationItem =
  { kind: "page"; page: number } | { kind: "gap"; id: string };

export function buildPaginationItems(
  page: number,
  pageCount: number,
): PaginationItem[] {
  const pages = new Set<number>([1, pageCount, page - 1, page, page + 1]);
  const visible = [...pages]
    .filter((candidate) => candidate >= 1 && candidate <= pageCount)
    .sort((left, right) => left - right);

  const items: PaginationItem[] = [];
  let previous = 0;

  for (const current of visible) {
    if (previous !== 0 && current - previous > 1) {
      items.push({ kind: "gap", id: `gap-${String(previous)}` });
    }
    items.push({ kind: "page", page: current });
    previous = current;
  }

  return items;
}
