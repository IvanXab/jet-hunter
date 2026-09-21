import { useId } from "react";

import { PEER_FOCUS_RING } from "../internal/focus-ring.js";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  label: string;
  options: readonly RadioOption[];
  value: string;
  onValueChange: (value: string) => void;
}

export function RadioGroup({
  label,
  options,
  value,
  onValueChange,
}: RadioGroupProps) {
  const name = useId();

  return (
    <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
      <legend className="text-small text-ink-muted">{label}</legend>
      {options.map((option) => (
        <label
          className="flex cursor-pointer items-center gap-3"
          key={option.value}
        >
          <input
            type="radio"
            className="peer sr-only"
            name={name}
            value={option.value}
            checked={option.value === value}
            onChange={() => {
              onValueChange(option.value);
            }}
          />
          <span
            aria-hidden="true"
            className={`flex size-[14px] items-center justify-center rounded-full border border-line-strong peer-checked:border-accent peer-checked:[&>span]:bg-accent ${PEER_FOCUS_RING}`}
          >
            <span className="size-1.5 rounded-full bg-transparent" />
          </span>
          <span className="text-control text-ink-muted peer-checked:text-ink">
            {option.label}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
