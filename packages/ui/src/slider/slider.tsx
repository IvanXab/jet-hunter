import { useId } from "react";
import { FOCUS_RING } from "../internal/focus-ring.js";

export interface SliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  readout?: string;
  ticks?: readonly string[];
}

const THUMB_CLASS =
  "[&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:w-[3px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:bg-ink [&::-moz-range-thumb]:h-[13px] [&::-moz-range-thumb]:w-[3px] [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-ink";

export function Slider({
  label,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  readout,
  ticks,
}: SliderProps) {
  const sliderId = useId();
  const filled = max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between">
        <label className="text-control text-ink-secondary" htmlFor={sliderId}>
          {label}
        </label>
        <div className="font-mono text-caption text-ink">
          {readout ?? String(value)}
        </div>
      </div>
      <input
        id={sliderId}
        type="range"
        className={`m-0 h-[3px] w-full cursor-pointer appearance-none bg-line ${THUMB_CLASS} ${FOCUS_RING}`}
        min={min}
        max={max}
        step={step}
        value={value}
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-accent) ${String(filled)}%, var(--color-line) ${String(filled)}%)`,
        }}
        onChange={(event) => {
          onValueChange(Number(event.target.value));
        }}
      />
      {ticks === undefined ? null : (
        <div className="flex justify-between font-mono text-micro text-ink-muted">
          {ticks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
      )}
    </div>
  );
}
