import { type ButtonHTMLAttributes, type ReactNode } from "react";

import { classNames } from "../internal/class-names.js";
import { FOCUS_RING } from "../internal/focus-ring.js";

export type ButtonVariant = "primary" | "secondary" | "quiet";
export type ButtonSize = "small" | "medium";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  medium: "px-5 py-[11px] text-control",
  small: "px-4 py-2 text-small",
};

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-contrast font-medium enabled:hover:opacity-85",
  secondary: "border-line-strong text-ink-body enabled:hover:border-ink-muted",
  quiet: "text-ink-muted enabled:hover:text-ink",
};

export function Button({
  variant = "primary",
  size = "medium",
  className,
  type = "button",
  children,
  ...restProps
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-none border border-transparent font-sans leading-tight transition-[opacity,border-color,color] duration-[120ms]",
        "disabled:cursor-not-allowed disabled:border-line-faint disabled:bg-transparent disabled:font-normal disabled:text-ink-disabled",
        FOCUS_RING,
        SIZE_CLASS[size],
        VARIANT_CLASS[variant],
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}
