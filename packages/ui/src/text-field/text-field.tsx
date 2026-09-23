import { useId, type InputHTMLAttributes } from "react";
import { classNames } from "../internal/class-names.js";
import { FIELD_CONTROL_CLASS } from "../internal/field.js";

export interface TextFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id"
> {
  label: string;
  hint?: string;
  error?: string;
}

export function TextField({
  label,
  hint,
  error,
  className,
  ...restProps
}: TextFieldProps) {
  const inputId = useId();
  const messageId = `${inputId}-message`;
  const message = error ?? hint;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-small text-ink-muted" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className={classNames(
          FIELD_CONTROL_CLASS,
          error !== undefined && "border-accent",
          className,
        )}
        aria-invalid={error !== undefined}
        aria-describedby={message === undefined ? undefined : messageId}
        {...restProps}
      />
      {message === undefined ? null : (
        <div
          id={messageId}
          className={classNames(
            "text-caption",
            error === undefined ? "text-ink-muted" : "text-accent",
          )}
        >
          {message}
        </div>
      )}
    </div>
  );
}
