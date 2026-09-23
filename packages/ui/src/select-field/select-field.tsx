import { useId, type SelectHTMLAttributes } from "react";
import { classNames } from "../internal/class-names.js";
import { FIELD_CONTROL_CLASS } from "../internal/field.js";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "children"
> {
  label: string;
  options: readonly SelectOption[];
}

export function SelectField({
  label,
  options,
  className,
  ...restProps
}: SelectFieldProps) {
  const selectId = useId();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-small text-ink-muted" htmlFor={selectId}>
        {label}
      </label>
      <div className="relative flex">
        <select
          id={selectId}
          className={classNames(
            FIELD_CONTROL_CLASS,
            "appearance-none pr-8",
            className,
          )}
          {...restProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 size-1.5 -translate-y-[70%] rotate-45 border-r border-b border-ink-muted"
        />
      </div>
    </div>
  );
}
