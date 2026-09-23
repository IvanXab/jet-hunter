import { PEER_FOCUS_RING } from "../internal/focus-ring.js";

export interface CheckboxProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Checkbox({
  label,
  checked,
  disabled = false,
  onCheckedChange,
}: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 border-b border-line-soft py-[11px]">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(event) => {
          onCheckedChange(event.target.checked);
        }}
      />
      <span
        aria-hidden="true"
        className={`flex size-[15px] items-center justify-center border border-line-strong peer-checked:border-accent peer-checked:bg-accent peer-checked:[&>span]:bg-accent-mark ${PEER_FOCUS_RING}`}
      >
        <span className="size-[5px] bg-transparent" />
      </span>
      <span className="flex-1 text-control text-ink-secondary peer-disabled:text-ink-disabled">
        {label}
      </span>
    </label>
  );
}
