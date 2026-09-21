import { classNames } from "../internal/class-names.js";

export type ActivityTone = "default" | "accent";

export interface ActivityEntry {
  id: string;
  time: string;
  text: string;
  tone?: ActivityTone;
}

export interface ActivityLogProps {
  title: string;
  entries: readonly ActivityEntry[];
}

export function ActivityLog({ title, entries }: ActivityLogProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="border-b border-line pb-3 font-mono text-micro tracking-[0.2em] text-ink-muted">
        {title}
      </div>
      {entries.map((entry) => (
        <div
          className="flex items-baseline gap-3 border-b border-line-soft py-[11px]"
          key={entry.id}
        >
          <div className="min-w-[34px] font-mono text-micro text-ink-muted">
            {entry.time}
          </div>
          <div
            className={classNames(
              "flex-1 text-small",
              entry.tone === "accent" ? "text-accent" : "text-ink-secondary",
            )}
          >
            {entry.text}
          </div>
        </div>
      ))}
    </div>
  );
}
