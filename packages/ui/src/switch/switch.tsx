import { FOCUS_RING } from "../internal/focus-ring.js";

export interface SwitchProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onText?: string;
  offText?: string;
}

export function Switch({
  label,
  checked,
  onCheckedChange,
  onText = "ВКЛ",
  offText = "ВЫКЛ",
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`group flex w-full cursor-pointer items-center justify-between gap-4 border-0 border-b border-line-soft bg-transparent py-[13px] text-left ${FOCUS_RING}`}
      onClick={() => {
        onCheckedChange(!checked);
      }}
    >
      <span className="font-sans text-control text-ink-secondary">{label}</span>
      <span className="flex items-center gap-[14px]">
        <span className="font-mono text-micro tracking-meta text-ink-disabled group-aria-checked:text-ink">
          {checked ? onText : offText}
        </span>
        <span
          aria-hidden="true"
          className="flex h-1 w-10 justify-start bg-line group-aria-checked:justify-end"
        >
          <span className="h-full w-[14px] bg-ink-disabled group-aria-checked:bg-accent" />
        </span>
      </span>
    </button>
  );
}
