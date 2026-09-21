import { type ReactNode } from "react";

import { classNames } from "../internal/class-names.js";

export interface DataTableColumn<Row> {
  key: string;
  header: string;
  width?: string;
  mono?: boolean;
  render: (row: Row) => ReactNode;
}

export interface DataTableProps<Row> {
  columns: readonly DataTableColumn<Row>[];
  rows: readonly Row[];
  getRowKey: (row: Row) => string;
}

export function DataTable<Row>({
  columns,
  rows,
  getRowKey,
}: DataTableProps<Row>) {
  const gridTemplateColumns = columns
    .map((column) => column.width ?? "minmax(0, 1fr)")
    .join(" ");

  return (
    <div className="flex flex-col" role="table">
      <div
        role="row"
        className="grid border-b border-line pb-3"
        style={{ gridTemplateColumns }}
      >
        {columns.map((column) => (
          <div
            key={column.key}
            role="columnheader"
            className="font-mono text-micro tracking-meta text-ink-muted"
          >
            {column.header}
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div
          key={getRowKey(row)}
          role="row"
          className="grid items-center border-b border-line-soft py-[15px] hover:bg-surface"
          style={{ gridTemplateColumns }}
        >
          {columns.map((column) => (
            <div
              key={column.key}
              role="cell"
              className={classNames(
                column.mono === true
                  ? "font-mono text-label tracking-caps text-ink-muted"
                  : "text-control text-ink-body",
              )}
            >
              {column.render(row)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
