import { classNames } from "../internal/class-names.js";

export type MeterTone = "default" | "muted" | "accent";

export interface MeterProps {
  label: string;
  value: number;
  readout?: string;
  tone?: MeterTone;
}

const TONE_CLASS: Record<MeterTone, string> = {
  default: "bg-ink",
  muted: "bg-ink-muted",
  accent: "bg-accent",
};

export function Meter({ label, value, readout, tone = "default" }: MeterProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="flex flex-col gap-[7px]">
      <div className="flex items-baseline justify-between">
        <div className="text-small text-ink-muted">{label}</div>
        <div className="font-mono text-label text-ink">
          {readout ?? `${String(clamped)}%`}
        </div>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-[2px] bg-line"
      >
        <div
          className={classNames("h-full", TONE_CLASS[tone])}
          style={{ width: `${String(clamped)}%` }}
        />
      </div>
    </div>
  );
}
